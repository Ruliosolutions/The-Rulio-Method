# Rulio Engine landing page

> Quick Win #4 from the strategy doc. The marketing site at
> `rulio.engine` (or `rulio.io/engine`) that the cold DMs link to.

## Files

- `index.html` — single-file static landing page, dark cosmic theme,
  matches the portfolio's aesthetic (Fraunces / Inter / JetBrains Mono,
  `#0c0c0e` background, sphere mark, soft cyan accent).
- 3 sections + 1 CTA:
  1. **Hero** — "The 9 solfeggio frequencies, engineered for your
     nervous system." Sub-CTA: free 30-min Energy Audit.
  2. **How it works** — the 5-minute daily practice, 6 templates
     (morning / deep work / 3pm / review / bedtime / custom).
  3. **The 9 frequencies** — visual grid of the 9 solfeggio tones.
  4. **Free Energy Audit** — booking CTA + fallback email link.

## How to deploy

### Option A — Vercel (fastest, recommended)

```bash
cd /workspace/rulio-launch/landing-page
# Vercel will serve index.html as the root automatically
npx vercel --prod --name rulio-engine
```

The site will be live at `rulio-engine.vercel.app` in ~ 60 seconds.
Then add the `rulio.engine` domain (or `rulio.io/engine` if you're
using a path).

### Option B — Static host (Netlify, Cloudflare Pages, GitHub Pages)

Drop the contents of `landing-page/` into the deploy root. No build
step required — it's a single HTML file with inline CSS.

### Option C — Local preview

```bash
cd /workspace/rulio-launch/landing-page
python3 -m http.server 8080
# open http://localhost:8080
```

## Wiring

Three things you'll need to wire before sending real traffic:

1. **Calendly link** — search-and-replace `https://calendly.com/rulio/energy-audit`
   in `index.html` with the real Calendly URL Roel sets up.
2. **Email** — `hello@rulio.io` should already be live (Section 3
   W1-5 rebrand action).
3. **Rulio Engine app** — the "Read the manual first" link points
   to `../ebook/manuscript.md`. In production, swap to a hosted PDF
   or a Notion page.

## Tracking pixels to add

- **PostHog** (`<head>`) — capture page views, CTA clicks, time on
  page, scroll depth.
- **Meta Pixel** — if Roel runs paid traffic to this page.
- **Google Analytics 4** — same as above for search traffic.

## Conversion targets

- **5% email capture rate** on the audit section.
- **30% Calendly show-up rate** on booked calls.
- **30% close rate** on Energy Audit → Studio retainer or
  Rulio Engine Pro.

## Honest disclaimer

The bottom of the page carries the "not a medical device" line in
`#a1a1aa` (muted). This is the `brand-guardian` red line: the
disclaimer must appear on every page that mentions the Rulio
Engine. Don't ship without it.
