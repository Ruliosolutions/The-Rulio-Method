-- ============================================================================
-- Rulio Engine — ALL-IN-ONE Supabase setup
-- Run this ONCE in the Supabase SQL Editor: https://app.supabase.com/project/_/sql/new
-- Creates: 7 tables, 2 views, 2 triggers, RLS policies, default config
-- ============================================================================

create extension if not exists "pgcrypto";

-- ============================================================================
-- 1. WORKSHOP + AUDIT (the funnel)
-- ============================================================================
create table if not exists public.workshop_attendees (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text,
  sku text not null check (sku in ('workshop-standard', 'workshop-book', 'workshop-bundle')),
  amount_eur int not null,
  stripe_session_id text unique not null,
  gumroad_receipt text,
  worst_state text,
  workshop_date date,
  status text not null default 'registered' check (status in ('registered', 'attended', 'no_show', 'refunded')),
  attended boolean default false,
  replay_watched boolean default false,
  bundle_engine_pro_claimed boolean default false,
  bundle_sessions_used int default 0,
  created_at timestamptz default now()
);
create index if not exists workshop_attendees_email_idx on public.workshop_attendees(email);
create index if not exists workshop_attendees_date_idx on public.workshop_attendees(workshop_date);
create index if not exists workshop_attendees_status_idx on public.workshop_attendees(status);

create table if not exists public.audit_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text,
  worst_hour text,
  referrer text,
  calendly_event text,
  status text not null default 'scheduled' check (status in ('scheduled', 'showed', 'no_show', 'converted', 'lost')),
  converted_to text check (converted_to is null or converted_to in ('engine-pro', 'studio-retainer', 'workshop')),
  showup_at timestamptz,
  created_at timestamptz default now()
);
create index if not exists audit_leads_email_idx on public.audit_leads(email);
create index if not exists audit_leads_status_idx on public.audit_leads(status);

create table if not exists public.email_events (
  id uuid primary key default gen_random_uuid(),
  attendee_id uuid references public.workshop_attendees(id) on delete cascade,
  template_id text,
  provider text default 'resend',
  event_type text not null,
  recipient text not null,
  subject text,
  link_clicked text,
  email_id text,
  occurred_at timestamptz default now()
);
create index if not exists email_events_attendee_idx on public.email_events(attendee_id);
create index if not exists email_events_template_idx on public.email_events(template_id);
create index if not exists email_events_type_idx on public.email_events(event_type);

-- ============================================================================
-- 2. AUTH + SUBSCRIPTIONS
-- ============================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text,
  avatar_url text,
  trial_started_at timestamptz,
  trial_ends_at timestamptz,
  trial_converted boolean default false,
  stripe_customer_id text unique,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists profiles_email_idx on public.profiles(email);
create index if not exists profiles_stripe_customer_idx on public.profiles(stripe_customer_id);
create index if not exists profiles_trial_ends_idx on public.profiles(trial_ends_at) where trial_ends_at is not null and trial_converted = false;

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  stripe_subscription_id text unique,
  stripe_price_id text,
  plan text not null check (plan in ('engine_pro_monthly', 'engine_pro_annual', 'studio_monthly', 'workshop_standard', 'workshop_book', 'workshop_bundle')),
  status text not null check (status in ('trialing', 'active', 'past_due', 'canceled', 'incomplete', 'incomplete_expired', 'unpaid')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  canceled_at timestamptz,
  amount_eur int,
  currency text default 'eur',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, plan)
);
create index if not exists subscriptions_user_idx on public.subscriptions(user_id);
create index if not exists subscriptions_stripe_sub_idx on public.subscriptions(stripe_subscription_id);
create index if not exists subscriptions_status_idx on public.subscriptions(status);
create index if not exists subscriptions_period_end_idx on public.subscriptions(current_period_end);

create table if not exists public.sessions_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id text not null,
  brainwave_band text,
  source text default 'engine',
  duration_seconds int,
  completed boolean default false,
  created_at timestamptz default now()
);
create index if not exists sessions_log_user_idx on public.sessions_log(user_id);
create index if not exists sessions_log_created_idx on public.sessions_log(created_at);
create index if not exists sessions_log_user_recent_idx on public.sessions_log(user_id, created_at desc);

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
-- 3. ROW-LEVEL SECURITY
-- ============================================================================
alter table public.workshop_attendees enable row level security;
alter table public.audit_leads enable row level security;
alter table public.email_events enable row level security;
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.sessions_log enable row level security;
alter table public.magic_link_events enable row level security;

-- profiles
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

-- subscriptions
drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own" on public.subscriptions for select using (auth.uid() = user_id);

-- sessions_log
drop policy if exists "sessions_log_select_own" on public.sessions_log;
create policy "sessions_log_select_own" on public.sessions_log for select using (auth.uid() = user_id);
drop policy if exists "sessions_log_insert_own" on public.sessions_log;
create policy "sessions_log_insert_own" on public.sessions_log for insert with check (auth.uid() = user_id);

-- magic_link_events
drop policy if exists "magic_link_events_select_own" on public.magic_link_events;
create policy "magic_link_events_select_own" on public.magic_link_events for select using (auth.uid() = user_id);

-- ============================================================================
-- 4. TRIGGERS
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
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
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute procedure public.set_updated_at();
drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at before update on public.subscriptions
  for each row execute procedure public.set_updated_at();

-- ============================================================================
-- 5. VIEWS
-- ============================================================================
create or replace view public.user_subscription_status as
select
  p.id as user_id, p.email, p.trial_started_at, p.trial_ends_at, p.trial_converted,
  coalesce(
    (select plan from public.subscriptions s
     where s.user_id = p.id and s.status in ('active', 'trialing')
     order by case s.plan
       when 'studio_monthly' then 1
       when 'engine_pro_annual' then 2
       when 'engine_pro_monthly' then 3 end limit 1),
    'free'
  ) as current_plan,
  coalesce(
    (select status from public.subscriptions s
     where s.user_id = p.id and s.status in ('active', 'trialing') order by created_at desc limit 1),
    'none'
  ) as current_status,
  case
    when exists (
      select 1 from public.subscriptions s
      where s.user_id = p.id and s.status = 'active'
        and s.plan in ('engine_pro_monthly', 'engine_pro_annual', 'studio_monthly')
    ) then true
    when p.trial_ends_at > now() and p.trial_converted = false then true
    else false
  end as has_pro_access
from public.profiles p;

create or replace view public.workshop_capacity as
select workshop_date,
  count(*) filter (where status != 'refunded') as booked,
  24 - count(*) filter (where status != 'refunded') as remaining
from public.workshop_attendees where workshop_date >= current_date
group by workshop_date order by workshop_date;

-- ============================================================================
-- 6. HELPER FUNCTIONS
-- ============================================================================
create or replace function public.get_or_create_stripe_customer(p_user_id uuid, p_email text)
returns text language plpgsql security definer set search_path = public as $$
declare v_customer_id text;
begin
  select stripe_customer_id into v_customer_id from public.profiles where id = p_user_id;
  return v_customer_id;
end; $$;

create or replace function public.log_magic_link_event(
  p_email text, p_event text, p_user_id uuid default null, p_ip inet default null, p_user_agent text default null
) returns void language sql security definer as $$
  insert into public.magic_link_events (email, event, user_id, ip_address, user_agent)
  values (p_email, p_event, p_user_id, p_ip, p_user_agent);
$$;

-- ============================================================================
-- 7. WEBHOOK → STRIPE CUSTOMER LINKER
-- A helper that the Stripe webhook calls to save the customer ID after
-- the first checkout session. The trigger in step 4 is only for auth.users.
-- ============================================================================
create or replace function public.link_stripe_customer(p_user_id uuid, p_customer_id text)
returns void language sql security definer as $$
  update public.profiles set stripe_customer_id = p_customer_id where id = p_user_id;
$$;

-- ============================================================================
-- DONE. You should now have 7 tables, 2 views, RLS, and 2 triggers active.
-- Verify in Table Editor: workshop_attendees, audit_leads, email_events,
-- profiles, subscriptions, sessions_log, magic_link_events
-- ============================================================================
