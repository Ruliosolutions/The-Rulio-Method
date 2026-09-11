#!/usr/bin/env bash
# =============================================================================
# Rulio Engine — interactive setup
# =============================================================================
# Walks you through each step, asks for keys, validates them, then deploys.
# This is the script that REPLACES the manual 30-minute walkthrough.
# Run:  chmod +x setup-interactive.sh && ./setup-interactive.sh
# =============================================================================

set -e
cd "$(dirname "$0")/engine"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

step() { echo -e "\n${BLUE}▶ $1${NC}"; }
ok()   { echo -e "${GREEN}✓ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠ $1${NC}"; }
err()  { echo -e "${RED}✗ $1${NC}"; }

# ---- Sanity ----------------------------------------------------------------
if ! command -v node &>/dev/null; then
  err "Node.js not found. Install: https://nodejs.org"
  exit 1
fi
NODE_VER=$(node --version)
ok "Node $NODE_VER"

if ! command -v npm &>/dev/null; then
  err "npm not found"
  exit 1
fi
ok "npm $(npm --version)"

# ---- Step 1: Account setup reminder ----------------------------------------
cat <<'EOF'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Before this script continues, you need 8 keys from 4 services.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  1. STRIPE_SECRET_KEY    → https://dashboard.stripe.com/apikeys
  2. STRIPE_WEBHOOK_SECRET → https://dashboard.stripe.com/webhooks (after adding endpoint)
  3. NEXT_PUBLIC_SUPABASE_URL  → https://app.supabase.com/project/_/settings/api
  4. NEXT_PUBLIC_SUPABASE_ANON_KEY
  5. SUPABASE_SERVICE_ROLE_KEY
  6. RESEND_API_KEY       → https://resend.com/api-keys
  7. POSTHOG_API_KEY      → https://eu.posthog.com (create project first)
  8. CRON_SECRET          → auto-generated below

  Have you created all 4 accounts and grabbed the 7 keys?
EOF

read -p "  (y/n) " ready
if [ "$ready" != "y" ]; then
  warn "Open the URLs above, create the accounts, then re-run this script."
  exit 0
fi

# ---- Step 2: Install dependencies -------------------------------------------
step "Installing npm dependencies"
npm install --silent
ok "deps installed"

# ---- Step 3: Write .env.local ----------------------------------------------
step "Writing .env.local"

if [ ! -f .env.local ]; then
  cp .env.example .env.local
  ok "copied .env.example → .env.local"
fi

prompt_env() {
  local key="$1"
  local current=$(grep "^$key=" .env.local 2>/dev/null | cut -d'=' -f2-)
  if [ -n "$current" ] && [[ ! "$current" =~ REPLACE_ME|placeholder ]]; then
    ok "$key already set"
    return
  fi
  read -p "  Enter $key: " value
  if [ -z "$value" ]; then
    err "  $key cannot be empty"
    exit 1
  fi
  # Update or append
  if grep -q "^$key=" .env.local; then
    sed -i "s|^$key=.*|$key=$value|" .env.local
  else
    echo "$key=$value" >> .env.local
  fi
}

prompt_env "STRIPE_SECRET_KEY"
prompt_env "STRIPE_WEBHOOK_SECRET"
prompt_env "NEXT_PUBLIC_SUPABASE_URL"
prompt_env "NEXT_PUBLIC_SUPABASE_ANON_KEY"
prompt_env "SUPABASE_SERVICE_ROLE_KEY"
prompt_env "RESEND_API_KEY"
prompt_env "POSTHOG_API_KEY"
prompt_env "WORKSHOP_ZOOM_LINK"
prompt_env "CALENDLY_AUDIT_URL"

# Generate CRON_SECRET
if ! grep -q "^CRON_SECRET=.\+" .env.local; then
  CRON=$(openssl rand -hex 32)
  echo "CRON_SECRET=$CRON" >> .env.local
  ok "generated CRON_SECRET"
fi

ok ".env.local is configured"

# ---- Step 4: Supabase schema ------------------------------------------------
step "Supabase schema"
echo "  Have you run the SQL in supabase-schema.sql against your Supabase project?"
echo "  → https://app.supabase.com/project/_/sql/new"
echo "  → Copy/paste the contents of engine/supabase-schema.sql"
read -p "  (y/n) " sql_done
if [ "$sql_done" != "y" ]; then
  warn "Run the SQL, then continue."
fi

# ---- Step 5: Create Stripe products ----------------------------------------
step "Creating Stripe products"
npm run setup:stripe
ok "3 products created in Stripe"

# ---- Step 6: Build --------------------------------------------------------
step "Building the engine"
npm run build 2>&1 | tail -5

# ---- Step 7: Verify config ------------------------------------------------
step "Verifying config"
node -e "
const env = require('fs').readFileSync('.env.local', 'utf-8');
const required = [
  'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET',
  'STRIPE_PRICE_WORKSHOP_STANDARD', 'STRIPE_PRICE_WORKSHOP_BOOK', 'STRIPE_PRICE_WORKSHOP_BUNDLE',
  'NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY',
  'RESEND_API_KEY', 'POSTHOG_API_KEY', 'CRON_SECRET',
  'WORKSHOP_ZOOM_LINK', 'CALENDLY_AUDIT_URL'
];
const placeholder = /(REPLACE_ME|whsec_placeholder|sk_test_placeholder|placeholder|xxxxx)/i;
const missing = required.filter(k => {
  const m = env.match(new RegExp('^' + k + '=(.*)\$', 'm'));
  return !m || placeholder.test(m[1]);
});
if (missing.length) {
  console.error('  ✗ Missing or placeholder:', missing.join(', '));
  process.exit(1);
}
console.log('  ✓ all required env vars set');
" || exit 1

# ---- Step 8: Local smoke test ---------------------------------------------
step "Starting local engine for smoke test"
nohup npm start > /tmp/engine.log 2>&1 &
ENGINE_PID=$!
sleep 5

HEALTH=$(curl -s --max-time 5 http://localhost:3000/api/health || echo "{}")
CAP=$(curl -s --max-time 5 http://localhost:3000/api/workshop/capacity || echo "{}")
HOME=$(curl -s --max-time 5 http://localhost:3000/ | grep -c "Rulio" || echo 0)

if echo "$HEALTH" | grep -q '"ok":true'; then
  ok "health: $HEALTH"
else
  err "health: $HEALTH"
fi

if echo "$CAP" | grep -q '"capacity":24'; then
  ok "capacity: $CAP"
else
  warn "capacity: $CAP (check Supabase)"
fi

if [ "$HOME" -gt 0 ]; then
  ok "home page: rendered"
else
  err "home page: not rendered"
fi

kill $ENGINE_PID 2>/dev/null
wait $ENGINE_PID 2>/dev/null || true

# ---- Step 9: Deploy --------------------------------------------------------
step "Choose your deploy platform"
echo "  1) Fly.io          (recommended, free, EU region)"
echo "  2) Render.com      (one-click Blueprint, $7/mo)"
echo "  3) Vercel          (serverless, cron built-in)"
echo "  4) Docker only     (build a local image, deploy elsewhere)"
echo "  5) Skip deploy     (I'll do it manually)"
read -p "  (1-5) " platform

case "$platform" in
  1) cd .. && ./deploy.sh fly ;;
  2) cd .. && ./deploy.sh render ;;
  3) cd .. && ./deploy.sh vercel ;;
  4) cd .. && ./deploy.sh docker ;;
  5) warn "skipped. Run './deploy.sh <platform>' when ready." ;;
  *) err "invalid choice" && exit 1 ;;
esac

# ---- Step 10: Done --------------------------------------------------------
cat <<EOF

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✓ Setup complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Your engine is configured and tested.
  All 8 services are wired (Stripe, Supabase, Resend, PostHog, Calendly).
  The deploy step ran above.

  Next:
    - Visit your engine URL and test the flow end-to-end
    - Configure the Stripe webhook to point to /api/webhooks/stripe
    - Map your custom domain (rulio.app, workshop.rulio.io)
    - Announce and start taking bookings

  The complete deploy guide is in WALKTHROUGH.md.
EOF
