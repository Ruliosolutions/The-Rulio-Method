-- Rulio Energy Audit — Supabase schema.
--
-- Run this in the Supabase SQL editor to create the table and
-- RLS policies for the Energy Audit funnel. The booking page
-- inserts into `audit_leads` on submit; post-call email and
-- follow-ups read/update the same table.

-- ============================================================
-- Table: audit_leads
-- ============================================================

create table if not exists public.audit_leads (
  id uuid primary key default gen_random_uuid(),

  -- Intake (filled in by the booking page, step 1)
  name text not null,
  email text not null,
  company text not null,
  role text not null check (role in (
    'Founder / CEO',
    'Operator / Head of',
    'Engineer / IC',
    'Creator / Solopreneur',
    'Other'
  )),
  worst_hour text not null,
  source text check (source in (
    'LinkedIn',
    'Referral from a Rulio contact',
    '5D Masters (rebrand)',
    'The Rulio Qi Method book',
    'Search',
    'Other'
  )),
  notes text,

  -- Calendly (filled in by the webhook on event_scheduled)
  calendly_event_uri text unique,
  calendly_event_time timestamptz,
  calendly_invitee_uri text,
  reschedule_url text,

  -- Status
  status text not null default 'booked' check (status in (
    'booked',         -- intake submitted, awaiting Calendly
    'scheduled',      -- Calendly event_scheduled fired
    'completed',      -- call happened, prescription sent
    'no_show',        -- call didn't happen
    'rescheduled',    -- rescheduled to a new time
    'cancelled'       -- cancelled
  )),
  next_action text check (next_action in (
    'send_confirmation',
    'send_reminder_24h',
    'send_follow_up',      -- day 3
    'send_follow_up_day7',
    'no_show_followup',
    'none'
  )),

  -- Post-call (filled in by Roel after the call)
  prescription text,
  prescription_frequencies jsonb,
  -- example: [
  --   { "block": "morning", "carrier": 396, "offset": 4 },
  --   { "block": "deep_work", "carriers": [417, 852], "offsets": [6, 14] },
  --   { "block": "afternoon_dip", "carrier": 528, "offset": 8 },
  --   { "block": "evening_review", "carrier": 852, "offset": 14 },
  --   { "block": "bedtime", "carriers": [174, 528], "offset": 0.5 }
  -- ]
  converted_to text check (converted_to in (
    'studio_retainer',
    'rulio_engine_pro',
    'enerqi_pro',
    'none'
  )),
  converted_at timestamptz,
  mrr_eur numeric(10, 2),
  notes_internal text,

  -- Audit
  confirmation_sent_at timestamptz,
  reminder_sent_at timestamptz,
  postcall_sent_at timestamptz,
  day3_sent_at timestamptz,
  day7_sent_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists audit_leads_email_idx on public.audit_leads (email);
create index if not exists audit_leads_status_idx on public.audit_leads (status);
create index if not exists audit_leads_next_action_idx on public.audit_leads (next_action);
create index if not exists audit_leads_calendly_time_idx on public.audit_leads (calendly_event_time);
create index if not exists audit_leads_created_idx on public.audit_leads (created_at desc);

-- ============================================================
-- Triggers: keep updated_at fresh
-- ============================================================

create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists audit_leads_set_updated_at on public.audit_leads;
create trigger audit_leads_set_updated_at
  before update on public.audit_leads
  for each row execute function public.set_updated_at();

-- ============================================================
-- RLS (Row-Level Security) — open insert, owner-only read
-- ============================================================

alter table public.audit_leads enable row level security;

-- Anyone can insert (the booking page is public)
drop policy if exists audit_leads_insert_public on public.audit_leads;
create policy audit_leads_insert_public on public.audit_leads
  for insert with check (true);

-- Only authenticated "service_role" can read/update
-- (i.e., the Resend webhook + Roel's admin client)
drop policy if exists audit_leads_service_all on public.audit_leads;
create policy audit_leads_service_all on public.audit_leads
  for all to service_role using (true) with check (true);

-- ============================================================
-- View: weekly audit funnel
-- ============================================================

create or replace view public.audit_funnel_weekly as
select
  date_trunc('week', created_at) as week,
  count(*) as total_leads,
  count(*) filter (where status = 'scheduled') as scheduled,
  count(*) filter (where status = 'completed') as completed,
  count(*) filter (where status = 'no_show') as no_show,
  count(*) filter (where converted_to = 'studio_retainer') as to_retainer,
  count(*) filter (where converted_to in ('rulio_engine_pro', 'enerqi_pro')) as to_subscription,
  coalesce(sum(mrr_eur) filter (where converted_at is not null), 0) as mrr_closed_eur
from public.audit_leads
group by 1
order by 1 desc;

-- ============================================================
-- Test: insert a sample row
-- ============================================================

-- insert into public.audit_leads (name, email, company, role, worst_hour, source)
-- values ('Test User', 'test@example.com', 'Test Co', 'Founder / CEO', '3pm', 'LinkedIn')
-- returning *;
