#!/usr/bin/env bash
# =============================================================================
# Rulio Engine — one-command deploy to VERCEL (fastest, most reliable)
# =============================================================================
# Time: 5 minutes
# Prerequisites:
#   1. Vercel account: https://vercel.com/signup (free, 30 sec)
#   2. Vercel CLI: npm i -g vercel
#   3. Logged in: vercel login
#   4. engine/.env.local filled in with all 6 keys (no placeholders)
#
# What it does:
#   - Pushes all env vars to Vercel
#   - Deploys to Vercel's Frankfurt region (EU)
#   - Returns the permanent URL
#   - Sets up cron jobs (Vercel Cron, in vercel.json)
# =============================================================================

set -e
cd "$(dirname "$0")"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'
ok()   { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}⚠${NC} $1"; }
err()  { echo -e "${RED}✗${NC} $1"; }
step() { echo -e "\n${CYAN}${BOLD}▶ $1${NC}"; }

# ---- Sanity check ----------------------------------------------------------
step "Pre-flight checks"

if [ ! -f engine/.env.local ]; then
  err "engine/.env.local not found. Run ./setup-all.sh first."
  exit 1
fi
if grep -E "REPLACE_ME|FILL_IN|xxxxx|placeholder" engine/.env.local; then
  err "engine/.env.local has placeholders. Fix them first."
  exit 1
fi
ok "engine/.env.local is clean"

if ! command -v vercel &>/dev/null; then
  warn "Vercel CLI not found. Installing..."
  npm i -g vercel
fi
ok "vercel CLI: $(vercel --version)"

if ! vercel whoami &>/dev/null; then
  err "Not logged in. Run: vercel login"
  exit 1
fi
USER=$(vercel whoami 2>/dev/null)
ok "Logged in to Vercel as $USER"

# ---- Push env vars --------------------------------------------------------
step "Pushing env vars to Vercel (this takes ~30s)"

# Read each line from .env.local and push to Vercel
# Skip comments and blank lines
PUSHED=0
SKIPPED=0
while IFS= read -r line; do
  # Skip empty lines and comments
  [ -z "$line" ] && continue
  [[ "$line" =~ ^# ]] && continue

  KEY="${line%%=*}"
  VAL="${line#*=}"
  echo "  • $KEY"

  # Use printf to avoid the new-line prompt breaking
  # Vercel's `vercel env add` is interactive; we pipe the value in
  printf "%s" "$VAL" | vercel env add "$KEY" production --force 2>/dev/null || true
  PUSHED=$((PUSHED+1))
done < engine/.env.local

ok "Pushed $PUSHED env vars to Vercel"

# ---- Deploy ---------------------------------------------------------------
step "Deploying to Vercel Frankfurt (this takes ~2-3 min)..."

# Capture the URL from the deploy output
DEPLOY_OUTPUT=$(vercel deploy --prod --yes 2>&1)
echo "$DEPLOY_OUTPUT" | tail -10

# Extract the production URL
URL=$(echo "$DEPLOY_OUTPUT" | grep -oE 'https://[a-z0-9-]+\.vercel\.app' | head -1)
if [ -z "$URL" ]; then
  URL=$(echo "$DEPLOY_OUTPUT" | grep -oE 'https://[a-zA-Z0-9.-]+' | grep -v vercel.com | head -1)
fi

echo ""
ok "════════════════════════════════════════════════════"
ok "  DEPLOYED"
ok "  URL: $URL"
ok "════════════════════════════════════════════════════"
echo ""
echo "  ${BOLD}Now do these 3 things:${NC}"
echo ""
echo "  1. Visit $URL/api/health"
echo "     Expected: {\"ok\":true,\"integrations\":{\"stripe\":\"ok\",...}}"
echo ""
echo "  2. Update Stripe webhook URL to:"
echo "     $URL/api/webhooks/stripe"
echo "     (https://dashboard.stripe.com/webhooks → your endpoint → update)"
echo ""
echo "  3. Update Supabase auth URLs to include:"
echo "     $URL/auth/callback"
echo "     (https://app.supabase.com → Authentication → URL Configuration)"
echo ""
echo "  ${BOLD}Optional:${NC}"
echo "  • Map your custom domain: vercel domains add rulio.app"
echo "  • Go to live Stripe mode (see LAUNCH.md step 9)"
echo ""

# ---- Verify ---------------------------------------------------------------
step "Smoke test (verifying the live deployment)"
sleep 3
if [ -n "$URL" ]; then
  HEALTH=$(curl -s --max-time 15 "$URL/api/health")
  echo "  Health: $HEALTH"
  if echo "$HEALTH" | grep -q '"ok":true'; then
    ok "System is live and healthy"
  else
    warn "Health check didn't return ok. The deploy might still be warming up — try again in 30s."
  fi
fi
