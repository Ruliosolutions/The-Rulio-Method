#!/usr/bin/env bash
# =============================================================================
# Rulio Engine — one-command deploy
# =============================================================================
# Auto-detects the platform and deploys. Supports:
#   - fly.io        (./deploy.sh fly)
#   - render        (./deploy.sh render)
#   - railway       (./deploy.sh railway)
#   - docker        (./deploy.sh docker)
#   - vercel        (./deploy.sh vercel)
#
# Prerequisites:
#   - The matching CLI installed (fly, render, railway, docker, vercel)
#   - Already authenticated (fly auth login, render login, etc.)
#   - .env.local filled in
# =============================================================================

set -e
cd "$(dirname "$0")/engine"

PLATFORM="${1:-help}"

case "$PLATFORM" in
  fly)
    echo "→ Deploying to Fly.io"
    if ! command -v fly &> /dev/null; then
      echo "  ✗ fly CLI not found. Install: https://fly.io/docs/hands-on/install-flyctl/"
      exit 1
    fi
    # Read env vars from .env.local and push to fly secrets
    if [ -f .env.local ]; then
      echo "  → Pushing secrets to Fly..."
      fly secrets set $(grep -v '^#' .env.local | grep -v '^$' | sed 's/^/--env /' | tr '\n' ' ')
    fi
    fly deploy
    ;;

  render)
    echo "→ Deploying to Render"
    if ! command -v render &> /dev/null; then
      echo "  ✗ render CLI not found. Install: https://render.com/docs/cli"
      exit 1
    fi
    render blueprint launch
    ;;

  railway)
    echo "→ Deploying to Railway"
    if ! command -v railway &> /dev/null; then
      echo "  ✗ railway CLI not found. Install: npm i -g @railway/cli"
      exit 1
    fi
    railway up
    ;;

  docker)
    echo "→ Building Docker image"
    if ! command -v docker &> /dev/null; then
      echo "  ✗ docker not found. Install: https://docs.docker.com/engine/install/"
      exit 1
    fi
    cd ..
    docker build -f engine/Dockerfile -t rulio-engine .
    echo "  ✓ built rulio-engine:latest"
    echo ""
    echo "  Run it locally:"
    echo "    docker run -p 3000:3000 --env-file engine/.env.local rulio-engine"
    ;;

  vercel)
    echo "→ Deploying to Vercel"
    if ! command -v vercel &> /dev/null; then
      echo "  ✗ vercel CLI not found. Install: npm i -g vercel"
      exit 1
    fi
    cd ..
    # Push env vars to Vercel
    if [ -f engine/.env.local ]; then
      echo "  → Pushing env vars to Vercel..."
      while IFS='=' read -r key value; do
        [[ -z "$key" || "$key" == \#* ]] && continue
        vercel env add "$key" production <<< "$value" 2>/dev/null || true
      done < engine/.env.local
    fi
    vercel --prod
    ;;

  help|*)
    echo "Usage: $0 [platform]"
    echo ""
    echo "Platforms:"
    echo "  fly       — Fly.io (free tier, EU region, recommended)"
    echo "  render    — Render.com Blueprint (one-click)"
    echo "  railway   — Railway.app (auto-detect, $5/mo)"
    echo "  docker    — Build a local Docker image (no deploy)"
    echo "  vercel    — Vercel (serverless, cron built-in)"
    echo ""
    echo "Before deploying:"
    echo "  1. cp engine/.env.example engine/.env.local"
    echo "  2. Fill in the values (Stripe, Supabase, Resend)"
    echo "  3. ./deploy.sh <platform>"
    ;;
esac
