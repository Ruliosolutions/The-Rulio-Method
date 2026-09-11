# Rulio — Publication-Ready Checklist

This is the final checklist to go from "demo on a sandbox URL" to "permanent, production-ready system you can hand to users."

**Time: 5 minutes if you have the right accounts. 30 minutes if you don't.**

---

## What "publication ready" means

- ✅ Engine has a **permanent URL** that doesn't change
- ✅ All 6 Stripe products are live (or in test mode, ready to flip)
- ✅ Stripe webhook receives events at the permanent URL
- ✅ Magic-link emails are sent and clickable
- ✅ Daily email crons fire at 09:00 Europe/Berlin
- ✅ The 10 public surfaces all load at 200
- ✅ (Optional) Custom domain mapped with SSL
- ✅ (Optional) Live mode in Stripe

---

## The 3 commands you need

```bash
# 1. One-time setup (creates 6 Stripe products, builds engine, smoke tests)
cd /path/to/rulio-launch && ./setup-all.sh

# 2. One-time deploy (picks Vercel / Fly.io / Render, deploys, prints URL)
./publish.sh

# 3. (Optional) Set up the daily email crons
# See "Cron setup" below
```

That's the entire path.

---

## Step-by-step (the long version, with verification checks)

### Step 1: Pre-flight (1 min)

You need:
- A Stripe account (test mode is fine for now)
- A Supabase project with the SQL schema loaded
- A Resend account
- (Optional) PostHog EU account
- A deploy platform account (Vercel recommended)
- A custom domain (optional, for `rulio.app` mapping)

If you have a Stripe account and Supabase project already (you do), you're 80% there.

### Step 2: Run setup-all.sh (5 min)

```bash
cd /path/to/rulio-launch
./setup-all.sh
```

This does:
- Installs npm dependencies
- Reads your 6 keys (interactive prompt if any are missing)
- Creates all 6 Stripe products and writes the price IDs back to `.env.local`
- Builds the engine
- Runs 3 smoke tests
- Prints the next steps

**Verification:** the script ends with all 3 smoke tests showing "✓".

### Step 3: Run publish.sh (5 min)

```bash
./publish.sh
```

Picks Vercel / Fly.io / Render. Pushes your env vars. Deploys. Prints the URL.

**Verification:** visit `https://your-url/api/health` — should be all green.

### Step 4: Update Stripe webhook (2 min)

1. Go to https://dashboard.stripe.com/webhooks
2. **Add endpoint**
3. URL: `https://your-production-url/api/webhooks/stripe`
4. Subscribe to these 7 events:
   - `checkout.session.completed`
   - `charge.refunded`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Save
6. Click **Reveal** next to Signing secret
7. Copy the `whsec_...` value
8. Run: `fly secrets set STRIPE_WEBHOOK_SECRET=whsec_xxxxx` (or `vercel env add STRIPE_WEBHOOK_SECRET production` for Vercel)

### Step 5: Update Supabase auth URLs (1 min)

1. https://app.supabase.com → your project
2. **Authentication → URL Configuration**
3. **Site URL**: `https://your-production-url`
4. **Redirect URLs** (add one per line):
   ```
   https://your-production-url/auth/callback
   ```
5. Save

### Step 6: Set up the daily email crons (3 min)

The system has 2 cron jobs that fire daily at 09:00 Europe/Berlin:

- `POST /api/cron/workshop-emails` — sends workshop reminder, day-3, day-7, post-workshop emails
- `POST /api/cron/trial-reminders` — sends day-6 and day-7 trial expiry emails

**If you deployed to Vercel:** crons auto-run (already in `vercel.json`).

**If you deployed to Fly.io or Render:** use https://cron-job.org (free):

1. Sign up free at https://cron-job.org/en/
2. New cron job:
   - **Title:** `Rulio workshop emails`
   - **URL:** `https://your-production-url/api/cron/workshop-emails`
   - **Schedule:** every day at 09:00
   - **Headers:** `Authorization: Bearer YOUR_CRON_SECRET_VALUE` (from `.env.local`)
3. Save
4. Repeat for `/api/cron/trial-reminders`

### Step 7: Test the full funnel (5 min)

Run this in your browser:

1. Open `https://your-production-url/pro`
2. Sign up with your email
3. Check inbox → click the magic link from "Rulio"
4. Land on `/welcome` → see "7 days remaining"
5. Click **Upgrade now**
6. Pay with test card `4242 4242 4242 4242` (any future date, any CVC, any postal)
7. Land on `/welcome?subscribed=1` → see "Pro active"
8. Visit `/account` → see "Engine Pro · Monthly"
9. Click **Manage billing** → Stripe Customer Portal opens
10. In Supabase → `subscriptions` table → new row with `status='active'`

If all 10 pass → the funnel is **fully live**.

### Step 8: (Optional) Map a custom domain (5 min)

**Vercel:**
```bash
vercel domains add rulio.app
# Follow DNS instructions shown
```

**Fly.io:**
```bash
fly certs create rulio.app
fly certs create www.rulio.app
# Add the 4 A records shown at your registrar
```

After the cert is issued (1-5 min), update:
- `NEXT_PUBLIC_URL` env var to `https://rulio.app`
- Stripe webhook URL to `https://rulio.app/api/webhooks/stripe`
- Supabase redirect URLs to `https://rulio.app/auth/callback`

### Step 9: (Optional) Go live in Stripe (5 min)

When ready to take real money:

1. In Stripe Dashboard → toggle **Test mode** OFF (top-right)
2. **Reveal live key** → copy `sk_live_...`
3. Run: `fly secrets set STRIPE_SECRET_KEY=sk_live_xxxxx` (or Vercel env equivalent)
4. In Stripe (now in live mode) → Webhooks → add a **new** endpoint with the live URL
5. Copy the new live signing secret → set `STRIPE_WEBHOOK_SECRET`
6. Re-run `npm run setup:stripe:all` to create the 6 products in live mode
7. The script writes the new price IDs to `.env.local` → re-deploy
8. Test with a real card for €0.01 → refund

---

## The 10 public surfaces (all need to be 200)

| Surface | URL | What it is |
|---------|-----|------------|
| Landing | https://worux62cro4wo.space.minimax.io | Sales landing page |
| Qi-sessions player | https://apkeal8qeqnc0.space.minimax.io | 14 free audio sessions |
| AI Coach | https://8thnamuagw8w3.space.minimax.io | 3 AI features |
| Energy Audit booking | https://eaaznyg61926p.space.minimax.io | Free 30-min call |
| Workshop form | https://jkt9pisbwrcaj.space.minimax.io | Live cohort registration |
| Press kit | https://ethabh7xva3d0.space.minimax.io | Media kit |
| Partnership deck | https://5jbsqfyw9423p.space.minimax.io | 8-slide pitch |
| Rulio Solutions (B2B) | https://a03jvw0pj6r2d.space.minimax.io | Licensing site |
| Affiliate dashboard | https://y0sp2gc5esbtr.space.minimax.io | Partner self-serve |
| Rulio Engine | `https://your-production-url` | The app (where the magic happens) |

The first 9 are static HTML — they never change. The 10th is the engine URL — this is the one you're publishing permanently.

---

## The 6 Stripe products (all created)

| Product | Price | Use |
|---------|-------|-----|
| Workshop Standard | €47 | Single workshop seat |
| Workshop Book Reader | €29 | Workshop + ebook |
| Workshop Bundle | €500 | Workshop + 10 seats (B2B) |
| Engine Pro Monthly | €19 | Self-serve subscription (most common) |
| Engine Pro Annual | €180 | Annual subscription (save €48) |
| Studio | €2,000/mo | White-label B2B |

---

## The 9 monetization pathways

1. **Free trial** — 7 days, no card required, 14 free sessions
2. **Engine Pro Monthly** — €19/mo, self-serve
3. **Engine Pro Annual** — €180/yr, self-serve
4. **Workshop Standard** — €47 one-time
5. **Workshop + Book** — €29 one-time
6. **Workshop Bundle** — €500 one-time (B2B)
7. **Studio White-Label** — €2,000/mo (B2B)
8. **Affiliate program** — 30% recurring via Partner dashboard
9. **B2B licensing (ruliosolutions.com)** — 3 tracks

---

## What I can do for you next

Just say:
- **"deploy to Vercel"** — I'll guide you through the CLI
- **"deploy to Fly.io"** — same
- **"create the affiliate links"** — generate partner URLs for 10 specific people
- **"launch to Product Hunt"** — write the PH launch post + assets
- **"build the email sequence"** — add a 7-day post-signup nurture
- **"add Sentry"** — wire up error tracking

The system is publication-ready. The rest is launch execution.
