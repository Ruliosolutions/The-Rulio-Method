#!/usr/bin/env bash
# =============================================================================
# Rulio Engine — one-command deploy to Fly.io
# =============================================================================
# This does EVERYTHING:
#   1. Auth (if not already)
#   2. Create the app (if not already)
#   3. Push all env vars
#   4. Add certs for your domains
#   5. Deploy
#   6. Open the URL
#
# Time: 3 minutes after fly auth signup
# =============================================================================

set -e
cd "$(dirname "$0")/engine"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'
ok() { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}⚠${NC} $1"; }
err() { echo -e "${RED}✗${NC} $1"; }

# ---- Sanity ----------------------------------------------------------------
if ! command -v fly &> /dev/null; then
  err "fly CLI not found. Install: https://fly.io/docs/hands-on/install-flyctl/"
  exit 1
fi

# ---- 1. Auth ---------------------------------------------------------------
if ! fly auth whoami &>/dev/null; then
  err "Not logged in to Fly.io. Run: fly auth signup (or fly auth login)"
  exit 1
fi
USER=$(fly auth whoami 2>/dev/null | head -1)
ok "Logged in to Fly.io as $USER"

# ---- 2. Check .env.local ---------------------------------------------------
if [ ! -f .env.local ]; then
  err ".env.local not found. Run: cd .. && ./setup-all.sh"
  exit 1
fi
ok ".env.local exists"

# ---- 3. Create app if needed ----------------------------------------------
APP_NAME="rulio-engine"
if fly status --app $APP_NAME 2>/dev/null | grep -q "App Name"; then
  ok "App '$APP_NAME' already exists"
else
  echo "→ Creating Fly app '$APP_NAME' in fra region..."
  fly launch --copy-config --name $APP_NAME --region fra --no-deploy
  ok "App created"
fi

# ---- 4. Push env vars ------------------------------------------------------
echo "→ Pushing env vars from .env.local to Fly secrets..."
SECRETS=""
while IFS='=' read -r key value; do
  # Skip comments, empty lines, and non-secret vars (NEXT_PUBLIC_* is fine)
  [[ -z "$key" || "$key" == \#* ]] && continue
  # Skip multiline values
  [[ "$value" == *" "* && ${#value} -gt 200 ]] && continue
  SECRETS="$SECRETS $key=$value"
done < .env.local
fly secrets set $SECRETS 2>&1 | tail -3
ok "Env vars pushed"

# ---- 5. Deploy -------------------------------------------------------------
echo "→ Deploying..."
fly deploy 2>&1 | tail -20
ok "Deployed"

# ---- 6. Open ---------------------------------------------------------------
URL=$(fly info --json 2>/dev/null | python3 -c "import json,sys; print(json.load(sys.stdin)['Hostname'])" 2>/dev/null || echo "rulio-engine.fly.dev")
echo ""
ok "Your engine is live at: https://$URL"
echo ""
echo "  → /pro (self-serve):  https://$URL/pro"
echo "  → /welcome:           https://$URL/welcome"
echo "  → /play/sleep:        https://$URL/play/sleep"
echo "  → /qi (14 sessions):  https://$URL/qi"
echo "  → /workshop:          https://$URL/workshop"
echo "  → /api/health:        https://$URL/api/health"
echo ""

# ---- 7. Custom domain (optional) ------------------------------------------
read -p "Add a custom domain? (rulio.app / workshop.rulio.io) [y/n] " add_domain
if [ "$add_domain" = "y" ] || [ "$add_domain" = "yes" ]; then
  read -p "Domain (e.g. rulio.app): " domain
  if [ -n "$domain" ]; then
    echo "→ Creating cert for $domain..."
    fly certs create $domain
    echo ""
    echo "Add these DNS records at your registrar:"
    fly certs show $domain 2>&1 | tail -10
  fi
fi

# ---- 8. Stripe webhook (auto-redirect message) ---------------------------
echo ""
cat <<EOF
${YELLOW}One more step:${NC}
  → Stripe Dashboard → Webhooks → Add endpoint:
    URL: https://$URL/api/webhooks/stripe
    Events: checkout.session.completed, charge.refunded,
            customer.subscription.created/updated/deleted,
            invoice.payment_succeeded/failed
  → Copy the signing secret
  → Add it to .env.local as STRIPE_WEBHOOK_SECRET
  → Run again: fly secrets set STRIPE_WEBHOOK_SECRET=whsec_...
  → fly deploy

${GREEN}Done. Your engine is live.${NC}
EOF
