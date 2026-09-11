#!/usr/bin/env bash
# =============================================================================
# Rulio Engine — full setup
# =============================================================================
# One-shot script that takes the engine from "0" to "selling workshop
# tickets in production." Run this once. Time: 30-60 minutes.
#
# Prerequisites:
#   - Stripe account (free, no monthly fee)
#   - Supabase project (free tier)
#   - Resend account (free tier, 100 emails/day)
#   - Vercel account (free tier) — `npm i -g vercel`
#   - Stripe CLI (for webhook testing) — https://stripe.com/docs/stripe-cli
#
# Usage:
#   chmod +x setup.sh
#   ./setup.sh
# =============================================================================

set -e
cd "$(dirname "$0")/engine"

echo "=================================================="
echo "  Rulio Engine — full setup"
echo "=================================================="
echo ""

# -----------------------------------------------------------------------------
# 1. Install dependencies
# -----------------------------------------------------------------------------
echo "→ Step 1/7 — Installing dependencies"
npm install --silent
echo "  ✓ done"
echo ""

# -----------------------------------------------------------------------------
# 2. Copy .env.example to .env.local if it doesn't exist
# -----------------------------------------------------------------------------
if [ ! -f .env.local ]; then
  echo "→ Step 2/7 — Creating .env.local from .env.example"
  cp .env.example .env.local
  echo "  ✓ .env.local created. Now fill in the values:"
  echo ""
  echo "    - STRIPE_SECRET_KEY         (https://dashboard.stripe.com/apikeys)"
  echo "    - NEXT_PUBLIC_SUPABASE_URL  (https://app.supabase.com/project/_/settings/api)"
  echo "    - NEXT_PUBLIC_SUPABASE_ANON_KEY"
  echo "    - SUPABASE_SERVICE_ROLE_KEY"
  echo "    - RESEND_API_KEY            (https://resend.com/api-keys)"
  echo ""
  echo "  Then re-run this script."
  exit 1
fi
echo "→ Step 2/7 — .env.local already exists"
echo ""

# -----------------------------------------------------------------------------
# 3. Initialize Supabase schema
# -----------------------------------------------------------------------------
echo "→ Step 3/7 — Supabase schema"
read -p "    Have you created the Supabase tables? (y/n) " supabase_done
if [ "$supabase_done" != "y" ]; then
  echo "    Paste the contents of supabase-schema.sql into:"
  echo "    https://app.supabase.com/project/_/sql/new"
  echo "    Then re-run this script."
  exit 1
fi
echo "  ✓ Supabase tables exist"
echo ""

# -----------------------------------------------------------------------------
# 4. Create Stripe products
# -----------------------------------------------------------------------------
echo "→ Step 4/7 — Creating Stripe products"
npm run setup:stripe
echo "  ✓ Stripe products created"
echo ""

# -----------------------------------------------------------------------------
# 5. Verify config
# -----------------------------------------------------------------------------
echo "→ Step 5/7 — Verifying config"
node -e "
const env = require('fs').readFileSync('.env.local', 'utf-8');
const required = [
  'STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET',
  'STRIPE_PRICE_WORKSHOP_STANDARD', 'STRIPE_PRICE_WORKSHOP_BOOK', 'STRIPE_PRICE_WORKSHOP_BUNDLE',
  'NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY',
  'RESEND_API_KEY', 'NEXT_PUBLIC_URL'
];
const missing = required.filter(k => !new RegExp('^' + k + '=.+$', 'm').test(env) || env.match(new RegExp('^' + k + '=(REPLACE_ME|whsec_)?\$', 'm')));
if (missing.length) {
  console.error('  ✗ Missing or placeholder:', missing.join(', '));
  process.exit(1);
}
console.log('  ✓ all required env vars set');
" || exit 1
echo ""

# -----------------------------------------------------------------------------
# 6. Test the build
# -----------------------------------------------------------------------------
echo "→ Step 6/7 — Testing the build"
npm run build 2>&1 | tail -5
echo "  ✓ build succeeded"
echo ""

# -----------------------------------------------------------------------------
# 7. Deploy to Vercel
# -----------------------------------------------------------------------------
echo "→ Step 7/7 — Deploying to Vercel"
echo "  This will:"
echo "    1. Run 'vercel' to create the project"
echo "    2. Push the env vars to Vercel"
echo "    3. Deploy to production"
echo ""
read -p "    Deploy now? (y/n) " deploy_now
if [ "$deploy_now" = "y" ]; then
  if ! command -v vercel &> /dev/null; then
    echo "    ✗ Vercel CLI not found. Install with: npm i -g vercel"
    exit 1
  fi
  vercel --prod
  echo ""
  echo "  ✓ deployed! Now configure the Stripe webhook:"
  echo "    1. Go to https://dashboard.stripe.com/webhooks"
  echo "    2. Add endpoint: https://YOUR-VERCEL-URL.vercel.app/api/webhooks/stripe"
  echo "    3. Subscribe to: checkout.session.completed, charge.refunded"
  echo "    4. Copy the signing secret → STRIPE_WEBHOOK_SECRET in Vercel env"
  echo "    5. Re-deploy: vercel --prod"
fi

echo ""
echo "=================================================="
echo "  ✓ Setup complete"
echo "=================================================="
echo ""
echo "Next steps:"
echo "  - Test the flow: visit /workshop and submit"
echo "  - Set up the cron: Vercel Cron is configured in vercel.json"
echo "  - Update the static workshop form with your engine URL"
echo "  - Map a custom domain: Vercel → Settings → Domains"
echo ""
echo "Source of truth:"
echo "  - Schema:        engine/supabase-schema.sql"
echo "  - Email HTML:    engine/lib/email-templates.ts"
echo "  - API routes:    engine/app/api/"
echo "  - Deploy guide:  engine/DEPLOY.md"
