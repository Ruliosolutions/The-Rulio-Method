# Rulio Qi Sessions — 14 audio sessions

> **Five to twenty-five minutes each. Headphones required.** The free
> audio that ships with *The Rulio Qi Method* book (12 sessions) plus
> 2 extended 25-minute versions for full deep-work blocks.

## What's in here

| File | Purpose |
|------|---------|
| `index.html` | The standalone companion page — in-browser player with all 14 sessions, a brainwave-band filter, individual downloads, and a ZIP-all link. |
| `audio/01-sleep.mp3` … `audio/12-pre-pitch.mp3` | The 12 free 5-min MP3s. |
| `audio/05b-focus-25.mp3` | Extended 25-min focus session. |
| `audio/06b-deep-work-25.mp3` | Extended 25-min deep-work session. |
| `audio/12-sessions.zip` | Single download, 150 MB. |
| `manifest.json` | Machine-readable metadata: solfeggio freqs, carrier, offset, length, instructions, file size, tier (free vs extended). The API contract. |
| `generate.py` | The DSP generator. Re-run to regenerate after tweaking session configs. |

The same `manifest.json` + audio files are also wired into the Rulio
Engine at `engine/public/qi/` so the app's `/qi` route reads from the
single source of truth. No double-bookkeeping.

## The 14 sessions

### Free 12 (ships with the book)

| # | Title | Solfeggio | Carrier | Δ | Sub | Band | Use when |
|---|-------|-----------|---------|---|-----|------|----------|
| 01 | Sleep | 528 | 200 | 0.5 | 40 | delta | lights out |
| 02 | Deep Sleep | 285 | 180 | 1.0 | 35 | delta | 3am wake, need to drop back |
| 03 | Morning Reset | 396 | 220 | 4 | 50 | theta | first 5 min of day |
| 04 | Anxiety Release | 417 | 220 | 6 | 55 | low alpha | chest tightens |
| 05 | Focus | 417 | 220 | 12 | — | alpha | between Pomodoros |
| 06 | Deep Work | 417+852 | 220 | 14 | 60 | low beta | hardest problem of the day |
| 07 | Second Wind | 528 | 200 | 8 | — | alpha | 3pm dip |
| 08 | Creative Spark | 396+741 | 220 | 6 | — | theta | blank page |
| 09 | Connection | 639 | 200 | 10 | — | alpha | before a hard convo |
| 10 | Intuition | 741 | 200 | 12 | — | high alpha | decision is unclear |
| 11 | Evening Review | 852 | 200 | 14 | — | low beta | end of day, journal |
| 12 | Pre-Pitch | 963 | 180 | 18 | — | beta | 5 min before the call |

### Extended 2 (for power users)

| # | Title | Solfeggio | Carrier | Δ | Sub | Band | Use when |
|---|-------|-----------|---------|---|-----|------|----------|
| 05b | Focus (25 min) | 417 | 220 | 12 | — | alpha | full deep-work block |
| 06b | Deep Work (25 min) | 417+852 | 220 | 14 | 60 | low beta | full deep-work block |

The 25-min versions match the Pomodoro length exactly. They are not in
the book — they are a paid add-on for the Rulio Engine Pro tier
(see `../final-report.md` §4 monetization).

## How to listen

1. **Put on headphones.** The binaural-beat effect (the L/R frequency
   difference that entrains your brainwaves) only works when the L
   signal is on one ear and the R signal is on the other. Speakers
   will collapse the effect.
2. **Pick the session that matches your state.** Not the session you
   want — the one you actually need. Tired? Sleep. Wired? Pre-Pitch
   or Intuition. Stuck? Deep Work.
3. **Don't try.** The point of the frequencies is that they do the
   work. Trying to "do the meditation" or "force the focus" is what
   stops the effect from kicking in.
4. **Five minutes is enough.** If you have more time, run the session
   twice, or use a 25-min extended version. If you have less, the
   first 90 seconds are already doing the work.

## How to regenerate

```bash
cd /workspace/rulio-launch/qi-sessions
python3 generate.py
```

Tweak the `SESSIONS` list at the top of `generate.py` to add, remove,
or modify sessions. Each entry is one dict. The DSP is in
`generate_session()` — pure NumPy, no third-party audio libraries
beyond `soundfile` (for streaming WAV write) and `ffmpeg` (for MP3
encode).

The generator writes 60-second WAV chunks then encodes to MP3 to keep
peak RAM around 50 MB even for the 25-min extended versions.

## How to ship

### Option A: Host alongside the ebook (free 12)

Upload `index.html` and `audio/01-sleep.mp3` … `audio/12-pre-pitch.mp3`
to the book landing page (e.g. `rulio.io/qi/`). The companion page is
a single static HTML file + 12 MP3s. Total weight: 82 MB. Use
Cloudflare R2 or Backblaze B2 for cheap storage; serve the MP3s with
`Cache-Control: public, max-age=31536000`.

### Option B: Bundle as a ZIP (all 14)

```bash
cd /workspace/rulio-launch/qi-sessions/audio
zip 14-sessions.zip *.mp3
```

Upload as a single deliverable. The buyer gets a 150 MB zip with
all 14 sessions.

### Option C: Stream from the Rulio Engine app (recommended)

The companion page is also wired into the Rulio Engine web app at
`/qi` route. The app reads `manifest.json` at build time, lists the
14 sessions, and streams the MP3s from `/qi/audio/`. This is the
long-term home and the single source of truth — the standalone
`index.html` is for the book buyers who don't have the app.

## What this is NOT

These are not treatments, not a medical device, not a replacement
for clinical care. They are a relaxation tool.

If you have a history of seizures, are pregnant, or wear a
pacemaker, consult a clinician before use. If you experience
discomfort, stop.

## Source of truth

- Ebook: `../ebook/manuscript.md` (chapter 5–14)
- Engine code: `../engine/app/qi/`
- Engine assets: `../engine/public/qi/`
- Brand guide: `../assets/README.md`
- Strategy doc: `../final-report.md` §2 (engine spec), §4 (monetization)
