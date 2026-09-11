#!/usr/bin/env bash
# =============================================================================
# Rulio Engine — ONE COMMAND to publish everything permanently
# =============================================================================
# Picks the best free platform and deploys the engine with all your env vars.
# Then prints the final production URL.
#
# Supports:
#   - Vercel (recommended for Next.js, free EU, built-in crons)
#   - Fly.io (free EU region, more control, persistent)
#   - Render (free tier, slow cold starts)
#
# Time: 5 minutes
# Prerequisites:
#   - Node 22+
#   - One account: Vercel, Fly.io, or Render (free signup, 30 sec)
#   - 6 keys already in engine/.env.local (from setup-all.sh)
# =============================================================================

set -e
cd "$(dirname "$0")/engine"

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

if [ ! -f .env.local ]; then
  err ".env.local not found in engine/. Run setup-all.sh first."
  exit 1
fi

# Check for any unreplaced placeholders
if grep -E "REPLACE_ME|FILL_IN|xxxxx|placeholder" .env.local; then
  err ".env.local still has placeholders. Fill them in first."
  exit 1
fi
ok ".env.local is clean (no placeholders)"

if ! command -v node &>/dev/null; then
  err "Node not found. Install Node 22+: https://nodejs.org"
  exit 1
fi
NODE_VER=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VER" -lt 20 ]; then
  err "Node $NODE_VER too old. Need 20+. Update: nvm install 22"
  exit 1
fi
ok "Node $(node -v)"

# ---- Pick platform ---------------------------------------------------------
step "Which platform do you want to deploy to?"
echo "  1) Vercel (recommended — built-in crons, fastest for Next.js)"
echo "  2) Fly.io  (EU region, persistent disk, full Docker control)"
echo "  3) Render  (simplest, free tier, slow cold starts)"
echo "  4) Exit    (I just want to do this manually later)"
echo ""
read -p "Choose [1-4]: " PLATFORM

case "$PLATFORM" in
  1) deploy_vercel ;;
  2) deploy_fly ;;
  3) deploy_render ;;
  4) echo "OK, run one of the platform-specific scripts later: deploy-fly.sh / vercel deploy / etc."
     exit 0 ;;
  *) err "Invalid choice"; exit 1 ;;
esac

# ---- Vercel ----------------------------------------------------------------
deploy_vercel() {
  step "Vercel deploy"

  if ! command -v vercel &>/dev/null; then
    warn "Vercel CLI not found. Installing..."
    npm i -g vercel
  fi

  if ! vercel whoami &>/dev/null; then
    err "Not logged in. Run: vercel login"
    exit 1
  fi
  USER=$(vercel whoami 2>/dev/null)
  ok "Logged in to Vercel as $USER"

  # Push env vars
  step "Pushing env vars to Vercel"
  while IFS= read -r line; do
    [ -z "$line" ] && continue
    [[ "$line" =~ ^# ]] && continue
    KEY="${line%%=*}"
    VAL="${line#*=}"
    echo "  • $KEY"
    vercel env add "$KEY" production <<< "$VAL" >/dev/null 2>&1 || true
  done < .env.local
  ok "Env vars pushed"

  # Deploy
  step "Deploying..."
  cd ..
  DEPLOY_URL=$(vercel deploy --prod --yes 2>&1 | tail -1)
  cd engine

  # Output
  echo ""
  ok "DEPLOYED"
  echo ""
  echo "  Production URL: $DEPLOY_URL"
  echo ""
  echo "  Next steps:"
  echo "  1. Visit $DEPLOY_URL/api/health (should be all green)"
  echo "  2. Update Stripe webhook URL to: $DEPLOY_URL/api/webhooks/stripe"
  echo "  3. Update Supabase redirect URLs to include: $DEPLOY_URL/auth/callback"
  echo "  4. Add cron-job.org jobs for /api/cron/workshop-emails and /api/cron/trial-reminders"
  echo "  5. (Optional) Map your custom domain: vercel domains add rulio.app"
}

# ---- Fly.io ----------------------------------------------------------------
deploy_fly() {
  step "Fly.io deploy"

  if ! command -v fly &>/dev/null; then
    err "Fly CLI not found. Install: https://fly.io/docs/hands-on/install-flyctl/"
    exit 1
  fi

  if ! fly auth whoami &>/dev/null; then
    err "Not logged in. Run: fly auth signup (or fly auth login)"
    exit 1
  fi
  USER=$(fly auth whoami 2>/dev/null | head -1)
  ok "Logged in to Fly.io as $USER"

  cd ..
  APP_NAME="rulio-engine"

  # Create app if missing
  if ! fly apps list 2>/dev/null | grep -q "$APP_NAME"; then
    step "Creating app $APP_NAME"
    fly launch --no-deploy --copy-config --name "$APP_NAME" --region fra 2>&1 | tail -5
  else
    ok "App $APP_NAME already exists"
  fi

  # Push env vars
  step "Pushing env vars to Fly.io"
  fly secrets import < engine/.env.local
  ok "Env vars pushed"

  # Allocate IP + cert
  step "Setting up persistent storage + certs"
  fly volumes create rulio_data --size 1 --region fra 2>&1 | tail -2 || true

  # Deploy
  step "Deploying..."
  fly deploy 2>&1 | tail -10

  # Output
  echo ""
  ok "DEPLOYED"
  echo ""
  echo "  Production URL: https://$APP_NAME.fly.dev"
  echo ""
  echo "  Next steps:"
  echo "  1. Visit https://$APP_NAME.fly.dev/api/health (should be all green)"
  echo "  2. Update Stripe webhook URL to: https://$APP_NAME.fly.dev/api/webhooks/stripe"
  echo "  3. Update Supabase redirect URLs to include: https://$APP_NAME.fly.dev/auth/callback"
  echo "  4. (Optional) Map custom domain:"
  echo "       fly certs create rulio.app"
  echo "       (then add the 4 A records shown at your registrar)"
  echo "  5. (Optional) Set up cron-job.org for /api/cron/workshop-emails"
  echo "       and /api/cron/trial-reminders (or use Vercel Cron with this same codebase)"
}

# ---- Render ----------------------------------------------------------------
deploy_render() {
  step "Render deploy (manual one-time setup)"

  cat <<EOF
${BOLD}Render setup:${NC}

  1. Push this code to GitHub first (if not already):
       git init
       git add .
       git commit -m "Initial Rulio Engine"
       gh repo create rulio-engine --public --source=. --push
       (or upload to github.com manually)

  2. Go to https://dashboard.render.com/select-repo?type=web
     Select your repo
     Use these settings:
       Name: rulio-engine
       Runtime: Docker
       Region: Frankfurt
       Plan: Free

  3. Add ALL env vars from engine/.env.local to the "Environment" section.
     (Copy-paste each KEY=VALUE pair.)

  4. Click "Create Web Service".
     Wait ~5 min for the build.

  5. Your URL will be: https://rulio-engine.onrender.com

  6. Next steps:
     - Update Stripe webhook URL
     - Update Supabase redirect URLs
     - Set up cron-job.org for the daily emails

  7. (Optional) Map custom domain in Render's "Custom Domains" section.

EOF
}

echo ""
ok "All done! Go to your URL to verify the system is live."
