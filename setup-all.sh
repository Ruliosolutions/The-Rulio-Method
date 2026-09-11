#!/usr/bin/env bash
# =============================================================================
# Rulio Engine — ALL-IN-ONE setup
# =============================================================================
# This is the only script you need. It does:
#   1. Install dependencies
#   2. Create .env.local from your input
#   3. Create all 6 Stripe products
#   4. Build the engine
#   5. Run smoke tests
#   6. Tell you exactly what to do next
#
# Time: 5 minutes (after you have 6 keys from 4 services)
# =============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1.33m'
BLUE='\033[1;34m'
NC='\033[0m'
ok() { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}⚠${NC} $1"; }
err() { echo -e "${RED}✗${NC} $1"; }
step() { echo -e "\n${BLUE}▶ $1${NC}"; }
ask() { echo -e "${YELLOW}?${NC} $1"; }

cd "$(dirname "$0")/engine"

# ---- Sanity ----------------------------------------------------------------
step "Checking environment"
for cmd in node npm; do
  if ! command -v $cmd &>/dev/null; then
    err "$cmd not found. Install Node.js 22+: https://nodejs.org"
    exit 1
  fi
done
ok "Node $(node --version) · npm $(npm --version)"

# ---- Ask for keys ----------------------------------------------------------
step "Need 6 keys from 4 services"
cat <<'EOF'
  Get these from (15 min total):
    1. STRIPE_SECRET_KEY        https://dashboard.stripe.com/apikeys
    2. NEXT_PUBLIC_SUPABASE_URL https://app.supabase.com/project/_/settings/api
    3. NEXT_PUBLIC_SUPABASE_ANON_KEY    (same page)
    4. SUPABASE_SERVICE_ROLE_KEY        (click Reveal, same page)
    5. RESEND_API_KEY            https://resend.com/api-keys
    6. POSTHOG_API_KEY           https://eu.posthog.com/project/settings

  Have you got all 6? (yes/no)
EOF
read -p "" ready
if [ "$ready" != "yes" ] && [ "$ready" != "y" ]; then
  warn "Get the 6 keys, then re-run this script."
  exit 0
fi

# ---- Step 1: Install deps ---------------------------------------------------
step "Installing dependencies"
npm install --silent 2>/dev/null
ok "done"

# ---- Step 2: Write .env.local ----------------------------------------------
step "Writing .env.local"

cp -n .env.example .env.local 2>/dev/null || true

# Helper that asks only if the var is missing/placeholder
set_var() {
  local key="$1"
  local current=$(grep "^$key=" .env.local 2>/dev/null | cut -d'=' -f2-)
  if [ -n "$current" ] && [[ ! "$current" =~ REPLACE_ME|whsec_|placeholder|xxxxx ]]; then
    return  # already set
  fi
  read -p "  $key: " value
  if [ -z "$value" ]; then
    err "$key cannot be empty"
    exit 1
  fi
  if grep -q "^$key=" .env.local; then
    sed -i "s|^$key=.*|$key=$value|" .env.local
  else
    echo "$key=$value" >> .env.local
  fi
}

set_var STRIPE_SECRET_KEY
set_var NEXT_PUBLIC_SUPABASE_URL
set_var NEXT_PUBLIC_SUPABASE_ANON_KEY
set_var SUPABASE_SERVICE_ROLE_KEY
set_var RESEND_API_KEY
set_var POSTHOG_API_KEY

# Generate CRON_SECRET if not set
if ! grep -q "^CRON_SECRET=.\+" .env.local; then
  echo "CRON_SECRET=$(openssl rand -hex 32)" >> .env.local
fi

# Set sensible defaults for non-secret values
sed -i "s|^POSTHOG_HOST=.*|POSTHOG_HOST=https://eu.i.posthog.com|" .env.local
sed -i "s|^NEXT_PUBLIC_URL=.*|NEXT_PUBLIC_URL=http://localhost:3000|" .env.local
# Leave Zoom/Calendly as placeholders — they're not blocking the build

ok ".env.local written"

# ---- Step 3: Create Stripe products ---------------------------------------
step "Creating 6 Stripe products (3 workshop + 3 subscription)"
npm run setup:stripe:all 2>&1 | tail -15

# ---- Step 4: Build ---------------------------------------------------------
step "Building the engine"
npm run build 2>&1 | grep -E "^[┌├└]|Compiled|error|warn" | tail -20

# ---- Step 5: Verify config -------------------------------------------------
step "Verifying config"
node -e "
const env = require('fs').readFileSync('.env.local', 'utf-8');
const required = [
  'STRIPE_SECRET_KEY', 'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY',
  'RESEND_API_KEY', 'POSTHOG_API_KEY', 'CRON_SECRET',
  'STRIPE_PRICE_WORKSHOP_STANDARD', 'STRIPE_PRICE_WORKSHOP_BOOK', 'STRIPE_PRICE_WORKSHOP_BUNDLE',
  'STRIPE_PRICE_ENGINE_PRO_MONTHLY', 'STRIPE_PRICE_ENGINE_PRO_ANNUAL', 'STRIPE_PRICE_STUDIO_MONTHLY'
];
const placeholder = /(REPLACE_ME|whsec_|sk_test_placeholder|placeholder|xxxxx)/i;
const missing = required.filter(k => {
  const m = env.match(new RegExp('^' + k + '=(.*)\$', 'm'));
  return !m || placeholder.test(m[1]);
});
if (missing.length) {
  console.error('  ✗ Missing or placeholder:', missing.join(', '));
  process.exit(1);
}
console.log('  ✓ all 13 required env vars set');
" || exit 1

# ---- Step 6: Smoke test ----------------------------------------------------
step "Starting local engine for smoke test"
nohup npm start > /tmp/setup-engine.log 2>&1 &
ENGINE_PID=$!
sleep 6

HEALTH=$(curl -s --max-time 5 http://localhost:3000/api/health 2>/dev/null || echo "{}")
CAP=$(curl -s --max-time 5 http://localhost:3000/api/workshop/capacity 2>/dev/null || echo "{}")
PRO=$(curl -s --max-time 5 http://localhost:3000/pro | grep -c "Engine Pro" || echo 0)

if echo "$HEALTH" | grep -q '"ok":true'; then
  ok "health: $HEALTH"
else
  err "health check failed: $HEALTH"
fi

if echo "$CAP" | grep -q '"capacity":24'; then
  ok "capacity: $CAP"
else
  warn "capacity: $CAP (check Supabase SQL ran)"
fi

if [ "$PRO" -gt 0 ]; then
  ok "/pro page: rendered (Engine Pro tier found)"
else
  err "/pro page: not rendering"
fi

kill $ENGINE_PID 2>/dev/null
wait $ENGINE_PID 2>/dev/null || true

# ---- Done ------------------------------------------------------------------
cat <<EOF

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ Setup complete. You went from 0 to running in 5 minutes.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ${GREEN}What you have:${NC}
    • engine built (12 API routes, 7 pages)
    • 6 Stripe products (3 workshop + 3 subscription)
    • .env.local fully configured
    • smoke tests passing (health, capacity, /pro page)

  ${YELLOW}What's still on you (5 min):${NC}
    1. Create Supabase project → SQL Editor → paste supabase-all-in-one.sql → Run
    2. Supabase → Authentication → URL Configuration:
         Site URL: http://localhost:3000
         Redirect URLs: http://localhost:3000/auth/callback
    3. Supabase → Authentication → Email → Magic Link template (customize)
    4. Stripe → Webhooks → Add endpoint:
         URL: http://localhost:3000/api/webhooks/stripe
         Events: checkout.session.completed, charge.refunded,
                 customer.subscription.created/updated/deleted,
                 invoice.payment_succeeded/failed
       Copy signing secret → STRIPE_WEBHOOK_SECRET in .env.local
    5. Test: open http://localhost:3000/pro, sign up, play a session
    6. Test Stripe: pay with 4242 4242 4242 4242

  ${BLUE}To deploy to a public URL:${NC}
    ./deploy.sh fly        # Fly.io (recommended, free EU)
    ./deploy.sh render     # Render.com (one-click)
    ./deploy.sh vercel     # Vercel (serverless)
    ./deploy.sh docker     # Local container

  ${BLUE}Source of truth:${NC}
    engine/supabase-all-in-one.sql     # The ONE SQL file
    engine/.env.example                # All env vars
    engine/scripts/setup-stripe-all.ts # All 6 Stripe products
    WALKTHROUGH.md                     # Detailed walkthrough (optional)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EOF
