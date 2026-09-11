# Rulio Engine

Adaptive binaural-beat & solfeggio frequency app. Flagship product of the Rulio
studio, scaffolded per **Section 2 §5 (Week 1 build)** of the Rulio launch
strategy doc.

## What this is

A runnable Next.js 14 + TypeScript + Tone.js + Tailwind app that ships a single
working preset: **Sleep** — a 4-phase adaptive ramp from Beta → Alpha → Theta →
Delta over 60 minutes, with a 528 Hz solfeggio layer and a 60 Hz sub-bass.

This is the Week 1 deliverable. The full feature scope (V1, V2+) is in
`../sections/section-engine-spec.md`.

## Run it

```bash
cd engine
cp .env.example .env.local   # then fill in the values (Supabase, Stripe, etc.)
npm install
npm run dev
# open http://localhost:3000/play/sleep
```

You should see the Sleep preset, the 4-phase stepper, the headphone prompt,
and a Start Session button. Clicking Start kicks off the Web Audio engine;
audio is real binaural beats + solfeggio via Tone.js.

## Brand assets

The R mark (the faceted "R" with electric-blue energy trails) is the
brand. See `../assets/README.md` for the full brand guide. The app icon
is at `../assets/rulio-app-icon-1024.png`; the favicon is at
`../assets/rulio-favicon-256.png`. Update `app/layout.tsx` to point
metadataBase, OG image, and favicon to the R-mark assets.

## Architecture (Week 1)

```
app/
  layout.tsx               — root layout, dark theme, OG metadata
  globals.css              — Tailwind + dark theme
  play/sleep/page.tsx      — the player UI
  api/export/route.ts      — server-side export stub (returns 202)
lib/
  audio/
    binaural.ts            — BinauralBeat class (Section 2 §3.1.A)
    solfeggio.ts           — SolfeggioTone class (Section 2 §3.1.B)
    engine.ts              — SessionEngine orchestrator (§3.1.C layering)
    useSession.ts          — React hook for the player
  presets/
    sleep.ts               — the 4-phase Sleep preset JSON
```

## Next moves (per Section 2 §5)

- **Week 2:** 4-layer mixer UI, 12 presets, Stripe gate, free tier = 3 presets,
  `/admin` route for Roel.
- **Week 3:** Fly.io Puppeteer + ffmpeg export worker, in-app affiliate slot,
  PostHog events.
- **Week 4:** E2E Playwright tests, Sentry, landing-page rewrite, PWA
  manifest, waitlist migration from `ruul-it.vercel.app`.

## Important constraints

- **Web Audio is browser-only.** All audio code must be inside `"use client"`
  boundaries or behind dynamic imports.
- **iOS Safari requires a user gesture before any audio context can resume.**
  Always call `await Tone.start()` inside a click handler.
- **Binaural beats only work over stereo headphones.** The Sleep page shows
  a mandatory headphone prompt on session start.
- **Not a medical device.** The footer disclaimer is non-negotiable —
  "Rulio Engine is a relaxation tool. It is not a medical device."

## Source of truth

- Strategy doc: `../final-report.md`
- Agent team + naming rules: `../sections/section-agent-team.md`
- Rebrand: `../sections/section-rebrand.md`
- Monetization: `../sections/section-monetization.md`
- Brand guide: `../assets/README.md`
