-- ============================================================================
-- Rulio Engine — Supabase auth + subscriptions schema
-- Run this AFTER supabase-schema.sql (the workshop/audit tables)
-- Adds: profiles, subscriptions, sessions, usage_events + RLS + triggers
-- ============================================================================

-- Enable required extensions
create extension if not exists "pgcrypto";

-- ============================================================================
-- profiles — mirrors auth.users with app-specific data
-- Auto-created on signup via trigger.
-- ============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text,
  avatar_url text,
  -- Engine Pro trial state
  trial_started_at timestamptz,
  trial_ends_at timestamptz,
  trial_converted boolean default false,
  -- Stripe customer ID (set when user first hits checkout)
  stripe_customer_id text unique,
  -- UTM / source tracking
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists profiles_stripe_customer_idx on public.profiles(stripe_customer_id);
create index if not exists profiles_trial_ends_idx on public.profiles(trial_ends_at)
  where trial_ends_at is not null and trial_converted = false;

-- ============================================================================
-- subscriptions — Engine Pro, Studio, workshop bundles
-- One active subscription per user. Status reflects Stripe state.
-- ============================================================================
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  -- The Stripe subscription ID (sub_...)
  stripe_subscription_id text unique,
  -- The Stripe price ID (price_workshop_standard, price_engine_pro_monthly, etc.)
  stripe_price_id text,
  -- Friendly plan name
  plan text not null check (plan in ('engine_pro_monthly', 'engine_pro_annual', 'studio_monthly', 'workshop_standard', 'workshop_book', 'workshop_bundle')),
  -- Status mirrors Stripe
  status text not null check (status in ('trialing', 'active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'unpaid')),
  -- Period
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  canceled_at timestamptz,
  -- Money (in cents, EUR)
  amount_eur int,
  currency text default 'eur',
  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  -- One active sub per user per plan
  unique (user_id, plan)
);

create index if not exists subscriptions_user_idx on public.subscriptions(user_id);
create index if not exists subscriptions_stripe_sub_idx on public.subscriptions(stripe_subscription_id);
create index if not exists subscriptions_status_idx on public.subscriptions(status);
create index if not exists subscriptions_period_end_idx on public.subscriptions(current_period_end);

-- ============================================================================
-- sessions_log — usage tracking (for active-user billing + analytics)
-- Every time a user plays a Qi session, log it.
-- ============================================================================
create table if not exists public.sessions_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id text not null,         -- e.g. "01-sleep", "06-deep-work", "custom_xyz"
  brainwave_band text,              -- delta, theta, alpha, beta
  source text default 'engine',     -- engine, ai_coach, custom, web
  duration_seconds int,             -- how long they listened
  completed boolean default false,  -- did they finish the session
  created_at timestamptz default now()
);

create index if not exists sessions_log_user_idx on public.sessions_log(user_id);
create index if not exists sessions_log_created_idx on public.sessions_log(created_at);
create index if not exists sessions_log_user_recent_idx on public.sessions_log(user_id, created_at desc);

-- ============================================================================
-- magic_links — track magic link auth events for analytics + abuse prevention
-- ============================================================================
create table if not exists public.magic_link_events (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  event text not null check (event in ('sent', 'clicked', 'expired', 'errored')),
  user_id uuid references auth.users(id) on delete set null,
  ip_address inet,
  user_agent text,
  created_at timestamptz default now()
);

create index if not exists magic_link_events_email_idx on public.magic_link_events(email);
create index if not exists magic_link_events_created_idx on public.magic_link_events(created_at);

-- ============================================================================
-- ROW-LEVEL SECURITY
-- Users can only see/modify their own data.
-- Service role bypasses RLS (used by the server).
-- ============================================================================
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.sessions_log enable row level security;
alter table public.magic_link_events enable row level security;

-- profiles: users can read their own, update their own
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- subscriptions: users can read their own
drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own" on public.subscriptions
  for select using (auth.uid() = user_id);

-- sessions_log: users can read their own, insert their own
drop policy if exists "sessions_log_select_own" on public.sessions_log;
create policy "sessions_log_select_own" on public.sessions_log
  for select using (auth.uid() = user_id);

drop policy if exists "sessions_log_insert_own" on public.sessions_log;
create policy "sessions_log_insert_own" on public.sessions_log
  for insert with check (auth.uid() = user_id);

-- magic_link_events: only service role can write; users can't read others'
drop policy if exists "magic_link_events_select_own" on public.magic_link_events;
create policy "magic_link_events_select_own" on public.magic_link_events
  for select using (auth.uid() = user_id);

-- ============================================================================
-- TRIGGER: auto-create a profile when a user signs up
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, first_name, trial_started_at, trial_ends_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', split_part(new.email, '@', 1)),
    now(),
    now() + interval '7 days'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================================
-- TRIGGER: update updated_at on row changes
-- ============================================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at
  before update on public.subscriptions
  for each row execute procedure public.set_updated_at();

-- ============================================================================
-- VIEW: user_subscription_status — single row per user with their current state
-- Used by the engine to gate Pro features.
-- ============================================================================
create or replace view public.user_subscription_status as
select
  p.id as user_id,
  p.email,
  p.trial_started_at,
  p.trial_ends_at,
  p.trial_converted,
  coalesce(
    (select plan from public.subscriptions s
     where s.user_id = p.id
       and s.status in ('active', 'trialing')
     order by
       case s.plan
         when 'studio_monthly' then 1
         when 'engine_pro_annual' then 2
         when 'engine_pro_monthly' then 3
       end
     limit 1),
    'free'
  ) as current_plan,
  coalesce(
    (select status from public.subscriptions s
     where s.user_id = p.id and s.status in ('active', 'trialing')
     order by created_at desc limit 1),
    'none'
  ) as current_status,
  case
    when exists (
      select 1 from public.subscriptions s
      where s.user_id = p.id
        and s.status = 'active'
        and s.plan in ('engine_pro_monthly', 'engine_pro_annual', 'studio_monthly')
    ) then true
    when p.trial_ends_at > now() and p.trial_converted = false then true
    else false
  end as has_pro_access
from public.profiles p;

-- ============================================================================
-- VIEW: trial_expiring_soon — for the day-6 trial reminder email
-- ============================================================================
create or replace view public.trial_expiring_soon as
select
  p.id as user_id,
  p.email,
  p.first_name,
  p.trial_ends_at,
  p.trial_ends_at - now() as time_remaining
from public.profiles p
where p.trial_ends_at is not null
  and p.trial_converted = false
  and p.trial_ends_at > now()
  and p.trial_ends_at < now() + interval '24 hours';

-- ============================================================================
-- FUNCTION: start_stripe_checkout
-- Called by /api/billing/checkout. Atomic operation.
-- ============================================================================
create or replace function public.get_or_create_stripe_customer(
  p_user_id uuid,
  p_email text
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_customer_id text;
begin
  -- Check if profile already has a Stripe customer
  select stripe_customer_id into v_customer_id
  from public.profiles
  where id = p_user_id;

  if v_customer_id is not null then
    return v_customer_id;
  end if;

  -- Will be created by Stripe on first checkout session, then webhooked back
  -- For now, return null and let the API route handle customer creation
  return null;
end;
$$;

-- ============================================================================
-- FUNCTION: log_magic_link_event
-- Called by /api/auth/magic-link to track sent/clicked/errored.
-- ============================================================================
create or replace function public.log_magic_link_event(
  p_email text,
  p_event text,
  p_user_id uuid default null,
  p_ip inet default null,
  p_user_agent text default null
)
returns void
language sql
security definer
as $$
  insert into public.magic_link_events (email, event, user_id, ip_address, user_agent)
  values (p_email, p_event, p_user_id, p_ip, p_user_agent);
$$;

-- ============================================================================
-- Test data (commented out — uncomment for dev)
-- ============================================================================
-- insert into auth.users (id, email) values
--   ('00000000-0000-0000-0000-000000000001', 'test@example.com');
-- The trigger will auto-create the profile.
