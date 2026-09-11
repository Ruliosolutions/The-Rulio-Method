-- ============================================================================
-- Rulio Engine — Supabase schema
-- Run this in the Supabase SQL editor: https://app.supabase.com/project/_/sql
-- ============================================================================

-- Enable required extensions
create extension if not exists "pgcrypto";

-- ============================================================================
-- workshop_attendees
-- One row per Stripe checkout.session.completed event for a workshop ticket.
-- Capacity counts run on this table.
-- ============================================================================
create table if not exists workshop_attendees (
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

create index if not exists workshop_attendees_email_idx on workshop_attendees(email);
create index if not exists workshop_attendees_date_idx on workshop_attendees(workshop_date);
create index if not exists workshop_attendees_status_idx on workshop_attendees(status);

-- ============================================================================
-- audit_leads
-- One row per free Energy Audit registration. (Stripe checkout at €0 is skipped
-- for the free audit; we insert directly from /api/audit/checkout.)
-- ============================================================================
create table if not exists audit_leads (
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

create index if not exists audit_leads_email_idx on audit_leads(email);
create index if not exists audit_leads_status_idx on audit_leads(status);

-- ============================================================================
-- email_events
-- Logs every email we send, both from the immediate webhook (T+0 confirm)
-- and from the cron (reminder, day3, day7, post). Used to dedupe so each
-- template fires once per attendee.
-- ============================================================================
create table if not exists email_events (
  id uuid primary key default gen_random_uuid(),
  attendee_id uuid references workshop_attendees(id) on delete cascade,
  template_id text,            -- 'confirm', 'reminder', 'day3', 'day7', 'post'
  provider text default 'resend',
  event_type text not null,    -- 'sent', 'delivered', 'opened', 'clicked', 'bounced'
  recipient text not null,
  subject text,
  link_clicked text,
  email_id text,               -- Resend's message ID
  occurred_at timestamptz default now()
);

create index if not exists email_events_attendee_idx on email_events(attendee_id);
create index if not exists email_events_template_idx on email_events(template_id);
create index if not exists email_events_type_idx on email_events(event_type);

-- ============================================================================
-- Row-level security
-- Service-role key bypasses RLS. The anon key should NOT be able to read
-- workshop_attendees or audit_leads (those contain PII). For the qi-sessions
-- manifest, use the anon key on a public read-only table.
-- ============================================================================
alter table workshop_attendees enable row level security;
alter table audit_leads enable row level security;
alter table email_events enable row level security;

-- No public SELECT/UPDATE/DELETE policies. Only the service role can read/write.
-- (We don't add any policy; the service role bypasses RLS automatically.)

-- ============================================================================
-- Capacity view — useful for monitoring
-- ============================================================================
create or replace view workshop_capacity as
select
  workshop_date,
  count(*) filter (where status != 'refunded') as booked,
  24 - count(*) filter (where status != 'refunded') as remaining
from workshop_attendees
where workshop_date >= current_date
group by workshop_date
order by workshop_date;

-- ============================================================================
-- Test data (commented out — uncomment for dev)
-- ============================================================================
-- insert into workshop_attendees (email, first_name, sku, amount_eur, stripe_session_id, workshop_date)
-- values ('test@example.com', 'Test', 'workshop-standard', 47, 'cs_test_' || gen_random_uuid()::text, current_date);
