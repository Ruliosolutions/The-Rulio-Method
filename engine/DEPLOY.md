# Rulio Engine — deployment guide

> **Goal:** take the engine from "running on your laptop" to "selling
> workshop tickets in production." Time: 30 minutes.

## 0. Prerequisites

- A Stripe account (free, no monthly fee) — https://dashboard.stripe.com
- A Supabase project (free tier) — https://app.supabase.com
- A Resend account (free tier, 100 emails/day) — https://resend.com
- A Vercel account (free tier) — https://vercel.com
- A custom domain (`rulio.app` or similar) — for production

## 1. Set up Supabase (5 minutes)

1. Create a new Supabase project: https://app.supabase.com
2. Go to **SQL Editor** → **New query**
3. Paste the contents of `supabase-schema.sql` and click **Run**
4. Verify the 3 tables exist: `workshop_attendees`, `audit_leads`, `email_events`
5. Go to **Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (click "Reveal" first) → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Set up Stripe (10 minutes)

1. Get your **Secret key** from https://dashboard.stripe.com/apikeys
2. Add to `.env.local`: `STRIPE_SECRET_KEY=sk_test_...`
3. Run the setup script:
   ```bash
   cd engine
   npm install
   npm run setup:stripe
   ```
4. The script creates the 3 products (Standard €47, Book Reader €29,
   Bundle €500) and writes the price IDs back to `.env.local`.
5. **Switch to live mode** before going to production: toggle the
   "Test mode" switch in the Stripe Dashboard, copy the live secret
   key, run `setup:stripe` again in live mode.
6. **Add a webhook**:
   - Go to https://dashboard.stripe.com/webhooks
   - Click **Add endpoint**
   - URL: `https://rulio.app/api/webhooks/stripe` (or your domain)
   - Events: `checkout.session.completed`, `charge.refunded`
   - Click **Add endpoint**
   - Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`

## 3. Set up Resend (5 minutes)

1. Get an API key from https://resend.com/api-keys
2. Add to `.env.local`: `RESEND_API_KEY=re_...`
3. **Verify your sending domains**:
   - `rulio.io` (or your domain) — for `workshop@rulio.io`, `audit@rulio.io`
   - Resend will ask you to add DNS records; follow their guide
4. Test it works:
   ```bash
   curl -X POST http://localhost:3000/api/cron/workshop-emails \
     -H "Authorization: Bearer YOUR_CRON_SECRET"
   ```

## 4. Set up Vercel (5 minutes)

1. Push the `rulio-launch/engine/` directory to a GitHub repo
2. Import to Vercel: https://vercel.com/new
3. Set the **Root directory** to `engine` (not the repo root)
4. Add the env vars from `.env.local` to Vercel (Settings → Environment Variables)
5. Click **Deploy**
6. Vercel will give you a URL like `rulio-engine-xyz.vercel.app`

## 5. Map your domain (5 minutes)

1. In Vercel, go to **Settings → Domains**
2. Add `rulio.app` and `www.rulio.app`
3. Vercel will give you DNS records; add them at your registrar
4. Update `.env` → `NEXT_PUBLIC_URL=https://rulio.app`
5. Update the Stripe webhook URL → `https://rulio.app/api/webhooks/stripe`
6. Redeploy

## 6. Set up the email cron (5 minutes)

You need a daily POST to `https://rulio.app/api/cron/workshop-emails`.

**Option A: Vercel Cron (easiest)**

Add to `vercel.json`:
```json
{
  "crons": [
    { "path": "/api/cron/workshop-emails", "schedule": "0 9 * * *" }
  ]
}
```
Push. Vercel Cron is free and runs the job daily at 09:00 UTC.

**Option B: cron-job.org (no Vercel)**

Create an account → New cron job:
- URL: `https://rulio.app/api/cron/workshop-emails`
- Schedule: daily at 09:00
- Headers: `Authorization: Bearer ${CRON_SECRET}`

**Option C: GitHub Actions (no infra)**

Add `.github/workflows/cron.yml`:
```yaml
on:
  schedule: [{ cron: "0 9 * * *" }]
jobs:
  email-cron:
    runs-on: ubuntu-latest
    steps:
      - run: |
          curl -X POST ${{ secrets.ENGINE_URL }}/api/cron/workshop-emails \
            -H "Authorization: Bearer ${{ secrets.CRON_SECRET }}"
```

## 7. Test the full flow (10 minutes)

1. **Free registration test** (no Stripe):
   - Go to the workshop form
   - Submit with your own email
   - Check that the row is in `workshop_attendees` (Supabase)
   - Check that you receive the confirmation email (Resend)

2. **Paid registration test** (Stripe test mode):
   - Use test card: `4242 4242 4242 4242` (any future date, any CVC)
   - Submit the form
   - Should redirect to Stripe Checkout
   - Complete the payment
   - Should redirect back to `/workshop/success?session_id=...`
   - Check `workshop_attendees` for the new row
   - Check email for the confirmation

3. **Webhook test**:
   - Use Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   - Or trigger a test event from the Stripe dashboard
   - Check the engine logs for `[stripe-webhook] ✓ registered ...`

4. **Cron test**:
   ```bash
   curl -X POST http://localhost:3000/api/cron/workshop-emails \
     -H "Authorization: Bearer YOUR_CRON_SECRET"
   ```
   Check the engine logs and the `email_events` table.

## 8. Go live

1. Switch Stripe to live mode (toggle in dashboard, replace keys, run `setup:stripe` again)
2. Update the Stripe webhook URL to production
3. Update the Cron job URL to production
4. Test once with a real €1 payment, then refund it
5. The form at `rulio.app/workshop` is now selling tickets

## Troubleshooting

**Form submits but nothing happens** — check the engine logs. The most
common cause is a missing env var.

**Stripe checkout 500s** — check `STRIPE_SECRET_KEY` and the price IDs
in `.env.local`. Run `setup:stripe` again if needed.

**Email doesn't send** — check `RESEND_API_KEY` and the verified domain
in Resend dashboard. Check the engine logs for the Resend error.

**Capacity says wrong number** — check that the `workshop_date` in
`workshop_attendees` matches the next Tuesday (the API computes it
from the first Tuesday of the next month).

**Webhook signature fails** — the signing secret in `.env.local` must
match the one Stripe shows. Reset it if needed.

## Source of truth

- Schema: `supabase-schema.sql`
- Stripe products: created by `scripts/setup-stripe.ts`
- Email templates: `lib/email-templates.ts`
- API routes: `app/api/...`
- Cron job: `app/api/cron/workshop-emails/route.ts`
