# Rulio Energy Audit — the full funnel

> **The single funnel that converts a cold DM into a closed Studio
> retainer.** The booking page is the door, the audit call is the
> experience, the post-call email is the deliverable, the day-3 and
> day-7 follow-ups are the conversion lift. Every file in this
> folder exists to make this funnel run.

## The funnel at a glance

```
Cold DM (dm-outreach/10-cold-dms.md)
   ↓ click
Landing page (landing-page/index.html)
   ↓ click "Book"
Booking page (funnel/audit/booking-page.html)
   ↓ submit intake → save to Supabase
   ↓ pick time → Calendly embed
   ↓ confirm → save to Supabase, fire confirmation email
Confirmation email (funnel/audit/confirmation-email.md)
   ↓ 24 hours before
Reminder email (funnel/audit/reminder-email.md) [24h]
   ↓ 30-min call
Audit call (Roel uses audit-agenda.md)
   ↓ 5 min after
Post-call email (funnel/audit/post-call-email.md) with prescription + book + code card
   ↓ day 3
Day-3 follow-up (auto via cron)
   ↓ day 7
Day-7 follow-up (auto via cron)
   ↓ conversion
Studio retainer €2,000/mo OR Rulio Engine Pro €9.99/mo OR Enerqi Pro €7.99/mo
```

## Files in this folder

| File | What it is | When it fires |
|------|------------|---------------|
| `booking-page.html` | The intake form + Calendly embed | When a prospect clicks "Book" on the landing page |
| `confirmation-email.md` | The "you're booked" email | Immediately on Calendly `event_scheduled` |
| `reminder-email-24h.md` | The 24-hour reminder | Scheduled send, 24h before the call |
| `prep-doc.md` | The 5-min read for the prospect | Linked from the confirmation + reminder emails |
| `audit-agenda.md` | Roel's 30-min playbook | During the call |
| `post-call-email.md` | The prescription deliverable | Within 5 min of the call ending |
| `crm-schema.sql` | Supabase table + RLS + view | Run once in Supabase SQL editor |
| `day-3-followup-email.md` | (TODO) The "how's it going?" email | Cron-fired, 3 days after the call |
| `day-7-followup-email.md` | (TODO) The "ready to go deeper?" email | Cron-fired, 7 days after the call |
| `no-show-email.md` | (TODO) The reschedule link | 4 hours after a no-show |

## How to deploy

### Step 1: Provision Supabase

```bash
# In the Supabase SQL editor, paste and run the contents of crm-schema.sql
# This creates the audit_leads table, indexes, triggers, RLS policies, and the weekly funnel view.
```

### Step 2: Set up Calendly

1. Create a Calendly account for `hello@rulio.io`.
2. Create an event type: "Rulio Energy Audit — 30 min".
3. Set availability: 10:00–12:00 Europe/Brussels, Tuesday–Thursday.
4. Configure custom questions: company, role, worst hour, source.
5. Set up the webhook: `https://rulio.io/api/webhooks/calendly` (you
   need to build this endpoint — see "Webhook handler" below).
6. Copy the Calendly URL and replace `CALENDLY_BASE` in
   `booking-page.html`.

### Step 3: Set up Resend (email)

1. Create a Resend account.
2. Verify the `rulio.io` domain.
3. Set up scheduled sends (or use Resend's email API with a
   scheduler) for the confirmation, reminder, and follow-up
   emails.
4. The PostHog events fire on the client side; the email sends
   happen on the server side.

### Step 4: Deploy the booking page

```bash
# Option A: static on Vercel
npx vercel --prod --name rulio-audit

# Option B: same Next.js app as the engine (recommended)
# Move booking-page.html to /rulio-engine/app/audit/page.tsx,
# convert to a Next.js page, and pull the Supabase config from env vars.
```

### Step 5: Set the env vars

In `engine/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
NEXT_PUBLIC_CALENDLY_BASE=https://calendly.com/rulio/energy-audit
RESEND_API_KEY=YOUR_RESEND_KEY
NEXT_PUBLIC_POSTHOG_KEY=YOUR_POSTHOG_KEY
```

In `booking-page.html`, search-and-replace:

- `SUPABASE_URL` → your Supabase project URL
- `SUPABASE_ANON_KEY` → your Supabase anon key
- `CALENDLY_BASE` → your Calendly event URL
- `phc_REPLACE_ME` → your PostHog project key

## Webhook handler (TODO — build as `app/api/webhooks/calendly/route.ts`)

When Calendly fires `event_scheduled`, the webhook should:

1. Verify the webhook signature (HMAC-SHA256, secret in env).
2. Parse the payload (event URI, invitee URI, scheduled time, name, email, custom answers).
3. Update the `audit_leads` row:
   - `calendly_event_uri`, `calendly_event_time`, `calendly_invitee_uri`, `reschedule_url`
   - `status = 'scheduled'`
4. Send the confirmation email via Resend.
5. Schedule the 24-hour reminder via Resend.
6. Update `audit_leads.confirmation_sent_at`.

When Calendly fires `event_cancelled` or `event_rescheduled`, update
the row accordingly.

## Cron for follow-ups (add to the orchestrator)

The day-3 and day-7 follow-ups are cron-fired:

```yaml
# cron: rulio-audit-followup
schedule: "0 10 * * *"
prompt: |
  You are the Rulio monetization-scout. Run the Energy Audit
  follow-up workflow:

  1. Query Supabase view `audit_funnel_weekly` to get the current
     week's status.
  2. Find rows in `audit_leads` where:
     - `status = 'completed'`
     - `completed_at` between NOW() - 4 days and NOW() - 2 days
     - `next_action = 'send_follow_up'`
  3. For each row, send the day-3 follow-up email
     (day-3-followup-email.md) with the prescription frequencies
     filled in.
  4. Update `next_action = 'send_follow_up_day7'`, `day3_sent_at = NOW()`.

  5. Find rows where:
     - `status = 'completed'`
     - `completed_at` between NOW() - 8 days and NOW() - 6 days
     - `next_action = 'send_follow_up_day7'`
  6. For each, send the day-7 follow-up email
     (day-7-followup-email.md).
  7. Update `next_action = 'none'`, `day7_sent_at = NOW()`.

  8. Find rows where:
     - `status = 'scheduled'`
     - `calendly_event_time` < NOW() - 4 hours
     - `completed_at is null`
  9. For each, send the no-show email (no-show-email.md).
  10. Update `status = 'no_show'`, `next_action = 'no_show_followup'`.
```

## Conversion math (re-stated)

Per 10 calls:
- 6–7 show up (60–70% show rate with 24h reminder)
- 5 try the 5-minute daily (75% activation)
- 1 close to Studio retainer (€2,000/mo MRR)
- 1–2 close to Rulio Engine Pro subscription (€9.99/mo each)
- 1–2 close to Enerqi Pro (€7.99/mo each)

Per 10 calls/month: **€2,000 + ~€40–€60 MRR + ~10 newsletter
subscribers + 5–7 case-study candidates**.

The first 10 calls are the seed. After that, the case studies
sell the next 30.

## What to do this week

1. **Provision Supabase** — run the SQL, get the URL + key.
2. **Set up Calendly** — create the event, get the URL.
3. **Set up Resend** — verify the domain, get the API key.
4. **Deploy the booking page** — Vercel or Next.js.
5. **Send the 10 DMs** — Quick Win #1, the foundation of the
   funnel.
6. **Run 3 calls this week** — book them, prep from the agenda,
   deliver the prescription.
7. **Cron the follow-ups** — wire the day-3 and day-7 crons.

That's the full audit funnel. The first call is the hardest;
the tenth is a reflex.
