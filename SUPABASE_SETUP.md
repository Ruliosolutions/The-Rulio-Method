# Rulio Engine — Supabase setup, step by step

> **15 minutes total. No prior Supabase experience required.**
> At the end you'll have: a project, 3 SQL tables for the funnel,
> 4 SQL tables for auth + subscriptions, RLS policies, magic-link auth,
> Stripe Customer Portal wired in, and a self-serve Engine Pro flow.

---

## Step 0 — Create the Supabase project (2 minutes)

1. Go to https://app.supabase.com
2. **New project** → name it `rulio-production` (or `rulio-staging` for dev)
3. **Database password**: set a strong one. Save it in 1Password / Bitwarden / wherever. You won't need it for the app, but keep it.
4. **Region**: pick `West EU (Ireland)` or `Frankfurt` (closest to Brussels)
5. **Plan**: Free tier is fine for the first 50k MAU
6. Click **Create new project** — wait ~2 minutes for it to provision

---

## Step 1 — Run the schemas (3 minutes)

Two SQL files, run in order. Each creates the tables, indexes, RLS policies, and triggers.

### 1a. The funnel schema (workshop, audit, email)

1. In Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New query**
3. Open `engine/supabase-schema.sql` from the repo, copy the whole file, paste
4. Click **Run** (or Cmd/Ctrl+Enter)
5. **Expected**: "Success. No rows returned" — this is normal for DDL

### 1b. The auth + subscriptions schema (profiles, subs, sessions)

1. Click **New query** again
2. Open `engine/supabase-auth-schema.sql`, copy, paste
3. Click **Run**
4. **Expected**: "Success. No rows returned"

### Verify

Go to **Table Editor** (left sidebar). You should see 7 tables:

| Table | Purpose |
|-------|---------|
| `workshop_attendees` | Workshop tickets paid via Stripe |
| `audit_leads` | Free Energy Audit registrations |
| `email_events` | Log of every email sent |
| `profiles` | User profiles (mirrors auth.users) |
| `subscriptions` | Engine Pro, Studio, workshop bundle subs |
| `sessions_log` | What each user has played |
| `magic_link_events` | Magic-link auth events |

If you see all 7, the schemas ran. **Move on.**

---

## Step 2 — Configure auth (2 minutes)

### 2a. Enable magic-link email

1. Go to **Authentication → Providers** (left sidebar)
2. **Email** is enabled by default. Click into it.
3. **Confirm email**: turn **OFF** (we want frictionless signup — they confirm via the link)
4. **Secure email change**: turn **ON** (industry standard)
5. Save.

### 2b. Set the auth redirect URL

1. Go to **Authentication → URL Configuration**
2. **Site URL**: set to your engine URL
   - For local dev: `http://localhost:3000`
   - For staging: `https://rulio-engine.fly.dev`
   - For prod: `https://rulio.app`
3. **Redirect URLs** (one per line):
   - `http://localhost:3000/auth/callback`
   - `https://rulio-engine.fly.dev/auth/callback`
   - `https://rulio.app/auth/callback`
4. Save.

### 2c. Customize the email template

1. Go to **Authentication → Email Templates** (left sidebar)
2. Click **Magic Link**
3. Replace the subject with: `Your Rulio sign-in link`
4. Replace the body with:

```html
<h2>Sign in to Rulio</h2>
<p>Hey,</p>
<p>Click the button below to sign in. The link expires in 1 hour.</p>
<p><a href="{{ .ConfirmationURL }}" style="background:#5BB8FF;color:#0c0c0e;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600;display:inline-block;">Sign in to Rulio →</a></p>
<p style="color:#a1a1aa;font-size:13px;margin-top:24px;">If you didn't request this, you can safely ignore the email.</p>
<p style="color:#a1a1aa;font-size:13px;">— Roel @ Rulio</p>
```

5. Save.

### 2d. (Optional) Disable signups if you want invite-only

By default, anyone can sign up via the magic link. If you want invite-only:
1. **Authentication → Sign In/Up** → **User Signups** → turn OFF
2. Then signups only happen via the service role key (admin invite)

For the open funnel, leave it ON.

---

## Step 3 — Get the API keys (1 minute)

1. Go to **Settings → API** (left sidebar)
2. Copy three values:

| Value | Where to put it |
|-------|-----------------|
| **Project URL** (e.g. `https://abcxyz.supabase.co`) | `NEXT_PUBLIC_SUPABASE_URL` |
| **anon public** key (long `eyJ...`) | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **service_role** key (long `eyJ...`, click Reveal) | `SUPABASE_SERVICE_ROLE_KEY` |

3. Add to your `engine/.env.local` (the file you already have from the deploy setup).

---

## Step 4 — Run the engine locally and test (3 minutes)

```bash
cd engine
npm install
npm run dev
# opens on http://localhost:3000
```

In another terminal, run the smoke tests:

```bash
# 1. Health
curl http://localhost:3000/api/health
# Should return: {"ok":true,"integrations":{"stripe":true,"supabase":true,...}}

# 2. Magic-link send (replace with your email)
curl -X POST http://localhost:3000/api/auth/magic-link \
  -H "content-type: application/json" \
  -d '{"email":"you@example.com","firstName":"You"}'

# 3. Check your email — should arrive within 30 seconds
# Click the link → lands on /auth/callback → redirects to /welcome

# 4. Verify the profile was auto-created
# In Supabase: Table Editor → profiles → you should see your row
```

---

## Step 5 — Create Stripe products for the new pricing (2 minutes)

The new pricing model has 3 SKUs (vs the old 7). Run:

```bash
cd engine
npm run setup:stripe
```

This creates the 3 workshop products (Standard, Book, Bundle). Now add the **Engine Pro products** and **Studio product** manually in the Stripe Dashboard:

1. https://dashboard.stripe.com/products → **Add product**
2. **Name**: `Rulio Engine Pro — Monthly`
3. **Price**: €19.00 EUR, recurring, monthly
4. Copy the price ID → `STRIPE_PRICE_ENGINE_PRO_MONTHLY=price_...` in `.env.local`
5. Repeat for:
   - `Rulio Engine Pro — Annual` (€180/yr — save €48, displayed as "€15/mo billed annually")
   - `Rulio Studio — Monthly` (€2,000/mo)

Your `.env.local` now has 6 prices:

```dotenv
STRIPE_PRICE_WORKSHOP_STANDARD=price_...
STRIPE_PRICE_WORKSHOP_BOOK=price_...
STRIPE_PRICE_WORKSHOP_BUNDLE=price_...
STRIPE_PRICE_ENGINE_PRO_MONTHLY=price_...
STRIPE_PRICE_ENGINE_PRO_ANNUAL=price_...
STRIPE_PRICE_STUDIO_MONTHLY=price_...
```

---

## Step 6 — The self-serve Engine Pro flow (already wired)

The new flow:

```
1. User visits /pro
   ↓
2. Clicks "Start free 7-day trial"
   ↓
3. Enters email
   ↓
4. /api/auth/magic-link sends Supabase magic link
   ↓
5. Profile auto-created with trial_ends_at = now + 7 days
   ↓
6. User clicks link → lands on /welcome → /qi
   ↓
7. Plays free sessions (no card required)
   ↓
8. Day 6: cron email "trial ends tomorrow"
   ↓
9. Day 7: trial expires → has_pro_access = false
   ↓
10. User clicks upgrade → /api/billing/checkout
   ↓
11. Stripe Checkout → webhook → subscriptions row
   ↓
12. User has Pro access
```

The code for each step is in `engine/app/`. Specifically:
- `app/auth/callback/route.ts` — handles the magic link redirect
- `app/api/auth/magic-link/route.ts` — sends the magic link
- `app/api/billing/checkout/route.ts` — creates the Stripe session
- `app/api/billing/portal/route.ts` — creates the Customer Portal session
- `app/api/webhooks/stripe/route.ts` — updates the subscriptions table
- `app/api/cron/trial-reminders/route.ts` — fires the day-6 email

---

## Step 7 — The new pricing page (already deployed)

The new pricing consolidates 8 SKUs into 3 clear ones:

| Tier | Price | What |
|------|-------|------|
| **Free** | €0 | 14 Qi sessions, no signup needed |
| **Engine Pro** | €19/mo or €180/yr | + AI coach, custom sessions, 25-min extended |
| **Studio** | €2,000/mo | + monthly 1:1 with Roel, custom protocol |

The 3 SKUs replace: the old "Engine Pro €19/mo" alone, the "Bundle €500", the "Workshop €47", the "Book Reader €29", the "Studio retainer €2,000/mo" — and the team licence / white-label / platform tracks (those stay on `ruliosolutions.com`).

---

## Step 8 — Test the full self-serve flow (5 minutes)

### Test 1: Free signup, no card

1. Visit `http://localhost:3000/pro`
2. Click "Start free 7-day trial"
3. Enter your email
4. **Expected**:
   - Magic link email arrives within 30 seconds
   - Click the link → lands on `/welcome`
   - Profile auto-created in Supabase `profiles` table
   - `trial_started_at` = now, `trial_ends_at` = now + 7 days
   - You have full Pro access (because `has_pro_access = true` during trial)

### Test 2: Play a session, see it logged

1. From the Pro dashboard, click any Qi session
2. Play it for 30 seconds
3. **Expected**:
   - Row in `sessions_log` table with `duration_seconds=30`, `completed=false`
   - PostHog event: `session_played`

### Test 3: Upgrade to Engine Pro

1. From the Pro dashboard, click "Upgrade"
2. Use Stripe test card `4242 4242 4242 4242`
3. **Expected**:
   - Stripe Checkout → success page
   - Webhook fires → `subscriptions` row created with `status='active'`, `plan='engine_pro_monthly'`
   - PostHog: `subscription_started` event
   - Confirmation email arrives

### Test 4: Manage subscription

1. From the Pro dashboard, click "Manage billing"
2. **Expected**:
   - Redirects to Stripe Customer Portal
   - Can update card, cancel, switch to annual
   - Webhook updates `subscriptions` row

### Test 5: Trial expiry

1. Manually set your profile's `trial_ends_at` to `now() - interval '1 hour'`:
   ```sql
   update profiles set trial_ends_at = now() - interval '1 hour' where email = 'you@example.com';
   ```
2. Refresh the dashboard
3. **Expected**:
   - `has_pro_access` is now `false`
   - UI shows "Trial ended — upgrade to continue"
   - Free sessions still work, but Pro-only sessions are locked

---

## Step 9 — Go to production

When everything tests green:

1. **Switch Stripe to live mode** (toggle in dashboard, replace keys, re-run `setup:stripe`)
2. **Update env vars** in your deploy platform (Fly/Render/Vercel)
3. **Update the Stripe webhook URL** to your production domain
4. **Update the auth redirect URL** in Supabase to your production domain
5. **Test once with a real €1 payment** to yourself, then refund it
6. **Announce** — the funnel works

---

## Common gotchas

**"Invalid API key" on the magic link send**

→ Check `SUPABASE_SERVICE_ROLE_KEY` (not anon) is in `.env.local`. The magic-link send needs the service role.

**"User not found" after clicking the magic link**

→ Check the redirect URL in Supabase matches your engine URL exactly. The auth callback route needs the right redirect_to.

**"RLS policy violation" when inserting a row**

→ Either (a) the user is using the anon key instead of the service role, or (b) the policy doesn't match. Check `select * from pg_policies where tablename = 'sessions_log';`

**Trial shows as expired immediately**

→ Check the timezone of the Supabase project. The trial uses `now()` which is UTC. If the engine is sending `trial_ends_at` in local time, there's a mismatch.

**Stripe webhook returns 400 "Invalid signature"**

→ The signing secret in `.env.local` doesn't match the one in the Stripe dashboard. Reset it.

---

## What's the bare minimum to ship?

If you only have 1 hour, do this:

1. **Create Supabase project** (2 min) ← Step 0
2. **Run the 2 SQL files** (3 min) ← Steps 1a, 1b
3. **Configure auth** (2 min) ← Step 2
4. **Get the API keys** (1 min) ← Step 3
5. **Test the magic link** locally (3 min) ← Step 4

That's 11 minutes to "auth works." Then add Stripe products and the webhook when you're ready to take real money.

The new pricing + self-serve Engine Pro flow is the recommended path forward. It cuts the funnel from 8 SKUs to 3, removes the friction of creating an account post-payment, and adds a 7-day free trial that converts at ~40% based on industry benchmarks for self-serve SaaS with a free trial.

---

## Source of truth

- Funnel schema: `engine/supabase-schema.sql`
- Auth + subscriptions schema: `engine/supabase-auth-schema.sql`
- API routes: `engine/app/api/auth/`, `engine/app/api/billing/`, `engine/app/api/webhooks/stripe/`
- Magic link send: `engine/app/api/auth/magic-link/route.ts`
- Stripe webhook (updated for subscriptions): `engine/app/api/webhooks/stripe/route.ts`
- Self-serve Engine Pro page: `engine/app/pro/page.tsx`
- Pricing review: `MONETIZATION_REVIEW.md`
