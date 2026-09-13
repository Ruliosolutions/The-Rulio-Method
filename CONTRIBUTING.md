# Contributing

Thanks for your interest in Rulio. The repo is a working product, not a community project — most of it is intentionally closed-source at the launch stage.

## What you CAN help with

- **Bug reports** — open an issue with reproduction steps
- **Frequency science** — if you have published research on solfeggio / binaural beats / 528 Hz claims (especially the retracted Stanford 2018 paper), open an issue or PR with citations
- **Translations** — the launch kit (`launch-kit/`) is English-only; if you want to translate Issue 1 of the Substack to another language, open a PR
- **Documentation fixes** — typos, broken links, unclear instructions

## What you should NOT do

- Open a PR to add a feature. The product direction is intentionally narrow (5-min protocol, not "wellness platform").
- Open a PR to add crypto / NFT / AI-art-generator integrations.
- Pitch me your affiliate program in an issue.
- Resell or repackage the source code (AGPL-3.0-or-later — see LICENSE).

## Process

1. Open an issue first describing what you want to change
2. Wait for maintainer (Roel) to confirm the change fits the product
3. Fork + branch + PR
4. CI must pass: `npm run build` + the secret-scan workflow
5. PR gets reviewed within 7 days or closed

## Local setup

```bash
cd engine
cp .env.production.example .env.local
# Fill in your own keys (Stripe test mode is fine)
npm install
npm run dev
```

## Code style

- TypeScript strict mode
- Tailwind for styling (no styled-components)
- Functional components only
- Server Actions for forms, Route Handlers for APIs
- File names: kebab-case for routes, PascalCase for components

## Commit messages

Imperative, lowercase, under 72 chars:
- `add /shop page with stripe payment links`
- `fix: webhook signature verification for payment_intent events`
- `chore: bump stripe to 16.12`

---

For everything else, just email roel@rulio.app.
