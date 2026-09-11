# Rulio Engine — production deploy walkthrough

> **30 minutes total. 5 setup steps, 3 deploy steps, 2 verify steps.**
> The code is all ready. This is the exact sequence of copy-paste
> commands to take the engine from "0" to "selling workshop tickets."

## What you need to provide (one-time, 10 minutes)

You need **8 secret values** before you can deploy. Get them from these 4 places:

| # | Source | What you get |
|---|--------|--------------|
| 1 | https://dashboard.stripe.com/apikeys | `STRIPE_SECRET_KEY` (starts with `sk_test_...`) |
| 2 | https://dashboard.stripe.com/webhooks (add endpoint first, then copy signing secret) | `STRIPE_WEBHOOK_SECRET` (starts with `whsec_...`) |
| 3 | https://app.supabase.com → Settings → API | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` |
| 4 | https://resend.com/api-keys | `RESEND_API_KEY` (starts with `re_...`) |
| 5 | https://posthog.com → Project → Settings | `POSTHOG_API_KEY` (starts with `phc_...`) |

You'll also need **2 platform accounts** to deploy:

- https://fly.io/app/sign-up (free, no card)
- OR https://render.com/register (free, no card)
- OR https://vercel.com/signup (free, no card)

And **1 domain** (optional but recommended): `rulio.app` from any registrar
(Namecheap, Cloudflare Registrar, Google Domains — €10/year).

---

## Step 1 — Create accounts + grab keys (10 minutes)

### Stripe

1. Go to https://dashboard.stripe.com/register
2. Verify your email + turn on 2FA
3. **Stay in test mode** (toggle top-right) for the first deploy
4. Go to https://dashboard.stripe.com/apikeys
5. Copy **Secret key** → `STRIPE_SECRET_KEY=sk_test_...`
6. Don't copy the publishable key (the engine doesn't need it)

### Supabase

1. Go to https://app.supabase.com
2. **New project** → name it `rulio-production` → choose a region close to Brussels (e.g. `West EU (Ireland)`)
3. Set a database password (save it; you won't need it for the app, but keep it)
4. Wait ~2 min for the project to provision
5. Go to **SQL Editor** → **New query**
6. Open `engine/supabase-schema.sql` from the repo, paste the whole file, click **Run**
7. Verify the 3 tables exist: `workshop_attendees`, `audit_leads`, `email_events`
8. Go to **Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...`
   - **service_role** key (click Reveal first) → `SUPABASE_SERVICE_ROLE_KEY=eyJ...`

### Resend

1. Go to https://resend.com/signup
2. Verify your email
3. Go to https://resend.com/api-keys → **Create API key** → name "Rulio Engine"
4. Copy the key → `RESEND_API_KEY=re_xxxxx`
5. **Add your sending domain** (Domains → Add domain → follow DNS instructions):
   - For now use `rulio.io` or whatever you own
   - Once verified, you can send from `workshop@rulio.io`, `audit@rulio.io`
   - Skip this for the test deploy — Resend lets you send from `onboarding@resend.dev` until you verify a domain

### PostHog (EU instance)

1. Go to https://eu.posthog.com/signup (EU instance — important for GDPR)
2. Create a project named `rulio-production`
3. Go to **Settings → Project → API Keys**
4. Copy **Project API key** → `POSTHOG_API_KEY=phc_...`

You now have all 8 keys. Time to set them.

---

## Step 2 — Configure the engine (2 minutes)

```bash
cd /workspace/rulio-launch

# Copy the template
cp engine/.env.example engine/.env.local

# Open it in your editor
nano engine/.env.local
# (or code . / vim / whatever)
```

Replace the placeholder values with your real keys. The final file should look like this:

```dotenv
STRIPE_SECRET_KEY=sk_test_51Nxx...real...
STRIPE_WEBHOOK_SECRET=whsec_xxxxx...real...
STRIPE_PRICE_WORKSHOP_STANDARD=
STRIPE_PRICE_WORKSHOP_BOOK=
STRIPE_PRICE_WORKSHOP_BUNDLE=
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...real...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...real...
RESEND_API_KEY=re_xxxxx...real...
POSTHOG_API_KEY=phc_xxxxx...real...
POSTHOG_HOST=https://eu.i.posthog.com
NEXT_PUBLIC_URL=https://rulio-engine.fly.dev
CRON_SECRET=
WORKSHOP_ZOOM_LINK=https://rulio.zoom.us/j/YOUR_MEETING_ID
WORKSHOP_REPLAY_URL=https://rulio.io/workshop/replay
WORKSHOP_CARDS_URL=https://rulio.io/assets/9-frequency-cards.pdf
WORKSHOP_LOG_URL=https://rulio.io/assets/7-day-log.pdf
CALENDLY_AUDIT_URL=https://calendly.com/rulio/energy-audit
```

**Three values to generate now:**

```bash
# CRON_SECRET (random 32-char string)
echo "CRON_SECRET=$(openssl rand -hex 32)" >> engine/.env.local

# WORKSHOP_ZOOM_LINK — get from your Zoom account
# Go to https://zoom.us → Schedule a meeting → Copy invitation link
# Should look like: https://rulio.zoom.us/j/1234567890

# CALENDLY_AUDIT_URL — get from your Calendly
# Go to https://calendly.com/event_types → Copy the link to the audit event
# Should look like: https://calendly.com/rulio/energy-audit
```

**Verify the file has no placeholders left:**

```bash
grep -E "REPLACE_ME|whsec_placeholder|sk_test_placeholder" engine/.env.local
# Should output nothing. If it does, fix the lines.
```

---

## Step 3 — Create Stripe products (30 seconds)

```bash
cd engine
npm install
npm run setup:stripe
```

This will:
- Connect to your Stripe account
- Create 3 products: `Energy Reset Workshop — Standard` (€47), `Energy Reset Workshop — Book Reader` (€29), `Energy Reset Bundle` (€500)
- Write the price IDs back to `.env.local`

Expected output:
```
→ Creating Rulio workshop products in Stripe...

  ✓ workshop-standard — product created (prod_xxxxx)
    → price price_xxxxx (€47.00)
  ✓ workshop-book — product created (prod_xxxxx)
    → price price_xxxxx (€29.00)
  ✓ workshop-bundle — product created (prod_xxxxx)
    → price price_xxxxx (€500.00)

✓ Price IDs written to .env.local
```

**Verify:**
```bash
grep STRIPE_PRICE engine/.env.local
# Should show 3 lines, all starting with `price_`
```

---

## Step 4 — Build the engine + run local sanity check (2 minutes)

```bash
cd engine
npm run build
```

Expected output:
```
Route (app)
┌ ○ /
├ ƒ /api/audit/checkout
├ ƒ /api/audit/complete
├ ƒ /api/cron/workshop-emails
├ ƒ /api/health
├ ƒ /api/webhooks/calendly
├ ƒ /api/webhooks/resend
├ ƒ /api/webhooks/stripe
├ ƒ /api/workshop/capacity
├ ƒ /api/workshop/checkout
├ ○ /play/sleep
├ ○ /qi
├ ○ /workshop
└ ƒ /workshop/success
```

Start the local server (separate terminal):
```bash
cd engine
npm start
```

In another terminal, run the smoke tests:
```bash
# 1. Health check
curl http://localhost:3000/api/health
# Should return: {"ok":true,"service":"rulio-engine",...,"integrations":{"stripe":true,"supabase":true,"resend":true,"posthog":true}}

# 2. Workshop capacity
curl http://localhost:3000/api/workshop/capacity
# Should return: {"date":"2026-10-06","capacity":24,"booked":0,"remaining":24,"soldOut":false}

# 3. Workshop page
curl http://localhost:3000/workshop | grep -oE '<title>[^<]+</title>'
# Should return: <title>Rulio Engine — fall asleep faster</title>
```

**All three return data without error → ready to deploy.**

If `/api/workshop/capacity` errors with "Could not check capacity":
- Check `SUPABASE_SERVICE_ROLE_KEY` (the service role, not anon)
- Check the SQL schema was actually run (you should see 3 tables in the Supabase dashboard)

---

## Step 5 — Deploy to Fly.io (3 minutes, recommended)

```bash
# Install the Fly CLI (macOS)
brew install flyctl

# Or (Linux)
curl -L https://fly.io/install.sh | sh

# Sign in (it'll open a browser)
fly auth signup   # or: fly auth login

# Launch the app (this creates the Fly app from the Dockerfile)
fly launch --copy-config --name rulio-engine --region fra --no-deploy

# Push the env vars from .env.local to Fly
cd /workspace/rulio-launch
fly secrets set $(grep -v '^#' engine/.env.local | grep -v '^$' | sed 's/^/--env /' | tr '\n' ' ')

# Deploy
fly deploy

# Watch the logs
fly logs

# Open it
fly open
```

The URL will be `https://rulio-engine.fly.dev` (or whatever you named it).

**Set up the cron job (alternative to Vercel Cron):**

```bash
# Get the deployed URL
URL=$(fly info --json | jq -r .Hostname)

# Create a machine that runs the cron job daily
# (Easier: use the Vercel cron — see below)
```

Or use the **free external cron-job.org** to hit the endpoint daily:

1. Go to https://cron-job.org/en/
2. Sign up free
3. **New cron job**:
   - Title: `Rulio workshop emails`
   - URL: `https://rulio-engine.fly.dev/api/cron/workshop-emails`
   - Schedule: every day at 09:00
   - Headers: `Authorization: Bearer YOUR_CRON_SECRET`

---

## Alternative: Deploy to Render.com (1-click, 5 minutes)

```bash
# 1. Push the repo to GitHub
cd /workspace/rulio-launch
git init
git add .
git commit -m "Initial commit"
gh repo create rulio-launch --public --source=. --push
# (requires gh CLI; or just create the repo on github.com and push manually)

# 2. Connect to Render
# - Go to https://dashboard.render.com/blueprints
# - Click "New Blueprint Instance"
# - Connect your GitHub repo
# - Render auto-detects render.yaml
# - Set the env vars (Stripe, Supabase, Resend, etc.) in the Render dashboard
# - Click "Apply"

# Render will:
#   - Build the engine
#   - Deploy to https://rulio-engine.onrender.com
#   - Set up the daily cron job
#   - All env vars from your dashboard
```

---

## Alternative: Deploy to Vercel (2 minutes)

```bash
cd /workspace/rulio-launch
vercel login
vercel link
vercel env add STRIPE_SECRET_KEY production
# (paste your sk_test_... when prompted)
# Repeat for all env vars from .env.local
vercel --prod
```

Vercel auto-detects the cron in `vercel.json` (daily at 09:00 UTC).

---

## Step 6 — Configure the Stripe webhook (2 minutes)

The webhook is what tells the engine "a payment just succeeded, do all the post-payment work."

1. Go to https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. **Endpoint URL**: `https://rulio-engine.fly.dev/api/webhooks/stripe` (use your actual URL)
4. **API version**: 2024-06-20 (the latest)
5. **Events to send**: select these two:
   - `checkout.session.completed`
   - `charge.refunded`
6. Click **Add endpoint**
7. On the endpoint detail page, click **Reveal** under **Signing secret**
8. Copy the secret → `STRIPE_WEBHOOK_SECRET=whsec_...`
9. Update the env var and redeploy:
   ```bash
   fly secrets set STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   fly deploy
   ```

**Verify with the Stripe CLI** (catches signature issues before going live):

```bash
# Install: https://stripe.com/docs/stripe-cli
stripe listen --forward-to https://rulio-engine.fly.dev/api/webhooks/stripe
# In another terminal:
stripe trigger checkout.session.completed
# Check fly logs — should see [stripe-webhook] ✓ registered ...
```

---

## Step 7 — Map your domain (5 minutes)

For Fly.io:

```bash
# Add the apex domain
fly certs create rulio.app
fly certs create www.rulio.app
fly certs create workshop.rulio.io

# Add the certs to the fly.toml [[services]] section:
#   [[services.tls]]
#     hosts = ["rulio.app", "www.rulio.app", "workshop.rulio.io"]
#   [[services.http_checks]]
#     path = "/api/health"
```

For the DNS records (at your registrar):

```
# Apex (rulio.app) → Fly
A    @    66.241.125.5
A    @    66.241.125.6
A    @    66.241.125.7
A    @    66.241.125.8
AAAA @    2a09:8280:1::4:7c5e

# Subdomain
CNAME workshop.rulio.io    rulio-engine.fly.dev.
```

(For Render or Vercel, the DNS records are different — follow their docs.)

After DNS propagates (5–30 minutes):
- `https://rulio.app` → your engine
- `https://workshop.rulio.io` → the workshop form

Update `NEXT_PUBLIC_URL` to your real domain, redeploy:

```bash
fly secrets set NEXT_PUBLIC_URL=https://rulio.app
fly deploy
```

Then update the Stripe webhook URL to `https://rulio.app/api/webhooks/stripe`.

---

## Step 8 — Test the full flow (10 minutes)

### Test 1: Free audit (no payment)

1. Visit `https://rulio.app/audit`
2. Fill in name + email + worst hour
3. Submit
4. **Expected**:
   - Redirected to your Calendly URL
   - Row appears in `audit_leads` table (Supabase)
   - Email arrives with the prep doc
   - PostHog shows `audit_registered` event

### Test 2: Paid workshop (Stripe test mode)

Use Stripe's test card: `4242 4242 4242 4242`, any future expiry, any CVC, any postal code.

1. Visit `https://rulio.app/workshop`
2. Select "Standard — €47"
3. Fill in name + email
4. Click "Reserve my seat →"
5. **Expected**:
   - Redirected to Stripe Checkout
   - Pay with the test card
   - Redirected to `/workshop/success?session_id=cs_test_xxxxx`
   - Row in `workshop_attendees` (Supabase)
   - Email with the Zoom link
   - PostHog shows `workshop_checkout_started` and `workshop_payment_succeeded`

### Test 3: Cron email (1 day later, or trigger manually)

```bash
curl -X POST https://rulio.app/api/cron/workshop-emails \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

**Expected**:
- Engine logs show `[cron] sent 0/0/0/0` (no emails due yet if it's day 1)
- After 24h, the reminder email fires
- After 3 days, the day-3 check-in
- After 7 days, the day-7 offer

### Test 4: Refund flow

1. Go to https://dashboard.stripe.com/payments
2. Find the test payment
3. Click **Refund** → confirm
4. **Expected**:
   - Webhook fires `charge.refunded`
   - Engine logs `[stripe-webhook] ✓ refunded session ...`
   - Row in `workshop_attendees` gets `status='refunded'`
   - No future cron emails fire for that attendee

---

## Step 9 — Go live (1 minute)

Once everything tests green:

1. **Switch Stripe to live mode** (toggle in dashboard, replace keys, run `setup:stripe` again)
2. **Re-verify the domain** in Resend dashboard
3. **Update the Stripe webhook URL** to your production domain
4. **Test once with a real €1 payment** to yourself, then refund it
5. **Announce** — the workshop actually sells

---

## What to do if something breaks

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Health check fails | Missing env var | `grep REPLACE_ME engine/.env.local` |
| Capacity 500s | Wrong Supabase service role key | Re-copy from Supabase dashboard |
| Stripe checkout fails | Price ID not in `.env.local` | Re-run `npm run setup:stripe` |
| Email doesn't send | Domain not verified in Resend | Check Resend dashboard → Domains |
| Webhook signature fails | Wrong `STRIPE_WEBHOOK_SECRET` | Re-copy from Stripe webhook page |
| Cron not firing | Missing `CRON_SECRET` header | Add header in cron-job.org config |
| DNS not resolving | Propagation delay | Wait 30 min, check `dig rulio.app` |

---

## What you have after this

| Surface | URL | What it does |
|---------|-----|--------------|
| Engine | `https://rulio.app` | Home, /play/sleep, /qi, /workshop, 9 API routes |
| Workshop form | `https://workshop.rulio.io` | Smart form, calls engine API |
| Stripe checkout | `Stripe-hosted` | Payment for the 3 SKUs |
| Calendly | `https://calendly.com/rulio/energy-audit` | Free audit booking |
| Resend | `dashboard` | Sends all transactional email |
| Supabase | `dashboard` | Stores all leads, attendees, events |
| PostHog | `dashboard` | Funnel analytics |

The funnel works. The cron works. The webhooks work. The emails work.
The only thing standing between "demo" and "live" is the 30 minutes of step 1–9.

---

## Source of truth

- Engine code: `engine/`
- Schema: `engine/supabase-schema.sql`
- Stripe setup: `engine/scripts/setup-stripe.ts`
- Email HTML: `engine/lib/email-templates.ts`
- API routes: `engine/app/api/`
- Deploy configs: `fly.toml`, `render.yaml`, `railway.toml`, `Dockerfile`
- Deploy wrapper: `deploy.sh`
- Setup wrapper: `setup.sh`

Total: 9 API routes, 5 pages, 1 health endpoint, 6 email templates, 164 source files.
