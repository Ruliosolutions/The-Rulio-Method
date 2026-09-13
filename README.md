# Rulio β adaptive solfeggio audio for focus, sleep, and energy

Rulio is a practice tool, not a medical device. The 5-minute solfeggio protocol: pick your worst hour, match it to a frequency, run it for 5 days, notice.

 **B2B:** https://rulio-b2b.vercel.app

## What's in this repo

```
rulio-launch/
βββ engine/                Next.js 14 app (the production Rulio Engine)
β   βββ app/               Pages + API routes (shop, pro, qi, webhooks)
β   βββ lib/               Stripe, Supabase, Resend, PostHog wrappers
β   βββ public/downloads/  Generated PDFs for digital products
β   βββ scripts/           Stripe setup + helpers
βββ qi-sessions/           The 14 solfeggio audio sessions (source)
βββ ebook/                 "The Rulio Qi Method" manuscript
βββ launch-kit/            Sales & marketing content (1-9)
β   βββ 01-etsy-listings.md       5 Etsy listings
β   βββ 02-social-content.md      7 days of social posts
β   βββ 03-substack-newsletter.md 3 Substack issues
β   βββ 04-lead-magnet.md         8-page PDF content
β   βββ 05-cold-outreach.md       10 partner profiles + pitches
β   βββ 06-product-hunt.md        PH launch kit
β   βββ 07-stripe-payment-links.md All 5 live Stripe Payment Links
β   βββ 08-money-playbook.md      24h action plan
β   βββ 09-shipped-this-round.md  Round summary
βββ dist-*/                Static deploys (landing, shop, affiliate, etc.)
βββ scripts/               Helpers (PDF generation, deploy scripts)
βββ assets/                Brand assets (R mark, banners)
βββ PUBLISH-30-DAY-PLAN.md 30-day launch calendar
βββ LAUNCH.md              9-step publication checklist
βββ deploy-*.sh            Vercel / Fly / Render deploy scripts
```

## Live URLs (production)

- Engine: https://engine-topaz-eight.vercel.app
- B2B: https://rulio-b2b.vercel.app
- /shop (standalone): https://cgtizknqy9dxp.space.minimax.io
- Landing: https://worux62cro4wo.space.minimax.io
- /qi (free audio): https://apkeal8qeqnc0.space.minimax.io
- AI Coach: https://8thnamuagw8w3.space.minimax.io
- Affiliate dashboard: https://y0sp2gc5esbtr.space.minimax.io

## Local setup

```bash
cd engine
cp .env.production.example .env.local   # fill in your keys
npm install
npm run dev                             # http://localhost:3000
```

## Deploy

```bash
cd engine
./deploy-vercel.sh      # production
```

## License

Β© 2026 Rulio Studio Β· Brussels Β· Roel Janssens.
Source code: AGPL-3.0-or-later. Brand assets: all rights reserved.
Solfeggio content: CC-BY-4.0.

---

Not a medical device. Not a treatment. A practice tool.
