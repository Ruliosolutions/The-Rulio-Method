# Rulio — adaptive solfeggio audio for focus, sleep, and energy

Rulio is a practice tool, not a medical device. The 5-minute solfeggio protocol: pick your worst hour, match it to a frequency, run it for 5 days, notice.

**Live:** https://rulio.app · **B2B:** https://rulio-b2b.vercel.app

## What's in this repo

```
rulio-launch/
├── engine/                Next.js 14 app (the production Rulio Engine)
│   ├── app/               Pages + API routes (shop, pro, qi, webhooks)
│   ├── lib/               Stripe, Supabase, Resend, PostHog wrappers
│   ├── public/downloads/  Generated PDFs for digital products
│   └── scripts/           Stripe setup + helpers
├── qi-sessions/           The 14 solfeggio audio sessions (source)
├── ebook/                 "The Rulio Qi Method" manuscript
├── launch-kit/            Sales & marketing content (1-9)
│   ├── 01-etsy-listings.md       5 Etsy listings
│   ├── 02-social-content.md      7 days of social posts
│   ├── 03-substack-newsletter.md 3 Substack issues
│   ├── 04-lead-magnet.md         8-page PDF content
│   ├── 05-cold-outreach.md       10 partner profiles + pitches
│   ├── 06-product-hunt.md        PH launch kit
│   ├── 07-stripe-payment-links.md All 5 live Stripe Payment Links
│   ├── 08-money-playbook.md      24h action plan
│   └── 09-shipped-this-round.md  Round summary
├── dist-*/                Static deploys (landing, shop, affiliate, etc.)
├── scripts/               Helpers (PDF generation, deploy scripts)
├── assets/                Brand assets (R mark, banners)
├── PUBLISH-30-DAY-PLAN.md 30-day launch calendar
├── LAUNCH.md              9-step publication checklist
└── deploy-*.sh            Vercel / Fly / Render deploy scripts
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

© 2026 Rulio Studio · Brussels · Roel Janssens.
Source code: AGPL-3.0-or-later. Brand assets: all rights reserved.
Solfeggio content: CC-BY-4.0.

---

Not a medical device. Not a treatment. A practice tool.
