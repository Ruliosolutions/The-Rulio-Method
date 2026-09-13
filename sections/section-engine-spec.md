# Section 2 — Rulio Engine: Product & Technical Spec

> Owner: `rulio-engine-builder` agent (per Section 1).
> Live prototype reference: <https://ruul-it.vercel.app> (v0.1 "Adaptive Audio Engine", 1,247 waitlist signups at time of writing).
> Sister products: Enerqi Masters AI coach (enerqimasters.com), Rulio Enerqi App, Rulio Gadgets affiliate storefront.

---

## 1. Product positioning

### Positioning statement

Rulio Engine is a **subscription audio app that engineers the listener's nervous-system state in real time** — not a tone generator, not a sleep-tracks library. Where most binaural-beat apps hand the user a static mix and hope for the best, Rulio Engine assembles **adaptive phase-sequences** (e.g., Activate → Calm → Drift → Sleep, already prototyped at ruul-it.vercel.app) that shift the carrier frequency, layer count, and solfeggio harmonics across a programmed brainwave ramp, then layers an optional **Enerqi AI coach** on top to read out intention prompts in sync with the transition. The product is the bridge between Roel's existing Rulio brand (frequency / "enerqi" identity) and a real SaaS revenue line, and the only one of its kind built around a *session*, not a track.

### Target user (3 personas)

| # | Persona | One-line description | Primary outcome | Willingness to pay |
|---|---------|----------------------|-----------------|--------------------|
| 1 | **Anxious Sleeper (Ava, 34)** | Knowledge worker, racing mind at night, has tried Calm & Headspace. | Fall asleep in <15 min, no prescription. | €6.99–€12.99/mo |
| 2 | **Biohacker / Practitioner (Lukas, 41)** | Already uses frequencygenerator.com, mynoise, knows the difference between 4 Hz and 7.83 Hz. | Engineered sessions, exportable for client work, solfeggio accuracy. | €14.99/mo + lifetime €149 |
| 3 | **Enerqi Student (Mira, 28)** | Follows Roel's content, owns the Rulio Enerqi App, wants the AI coach. | A daily practice with a "master" guiding it. | €9.99/mo bundled with Enerqi |

### Brutally honest competitive comparison

| Product | Type | Strengths | Weaknesses (the gap) | Price |
|---------|------|-----------|----------------------|-------|
| **frequencygenerator.com** | Free web tool, 4 layers (sine + noise + binaural + sub) | Free, no signup, instantly usable, includes 528 Hz & 7 chakra sets | No session structure; user must know what to dial; no AI; no account/save; no export; no mobile-optimised lock-screen UI | Free |
| **mynoise.net (Solfeggio generator)** | Web-based "experimental" soundscape, donation-supported | Best-in-class audio engineering, parametric EQs, deep customisation | Donation gate, no app, no session ramps, no AI, UI is dense (intimidating for non-audio people) | Patron/donation |
| **Brainwaves (imoblife / hz)** | Native iOS + Android subscription app, 10+ years on stores | Polished UI, big library, solfeggio + binaural + isochronic, $9.99/mo or $59.99 lifetime | Static tracks, no adaptive ramps, no AI coach, no export, no creator economy, medical-claim copy is borderline ("vagal tone", "neural advantage") — class-action bait | $9.99/mo, $59.99 lifetime |
| **ZENmix** | Native ambient-mixer app + royalty-free creator tier | Clean UX, offline, 139+ sounds, commercial export ($29/mo Creator) | Binaural beats are a bolt-on, not the core; no solfeggio, no AI, no session structure, no coaching layer | Free, $29/mo Creator |

### The gap Rulio fills

1. **Adaptive session logic** — pre-engineered phase ramps (e.g., 15 min Beta → Alpha → Theta → Delta) with crossfades, not a 60-min static loop. *None* of the four competitors do this.
2. **Frequency layering as a first-class UI** — independent volume per layer (carrier, offset, solfeggio, sub-bass, noise, voice prompt) with presets, not a hidden EQ.
3. **Enerqi AI coach overlay** — Roel's IP. An AI that *speaks in sync* with the phase transitions, with intention prompts and breath cues. No competitor has an AI coach; Brainwaves' "verbal sessions" are pre-recorded.
4. **Honest, non-medical framing** — explicit "tool for relaxation, not a treatment" disclaimer. Differentiates Rulio from Brainwaves' regulatory exposure.
5. **Creator / affiliate hooks baked in** — shareable preset links, affiliate device recommendations in-app, Rulio Gadgets cross-sell in the player. None of the four have affiliate infrastructure.

**Net:** Rulio is a *session engine* for the frequency space, not a track store and not a tone calculator.

---

## 2. Feature scope

### MVP (ship in 30 days)

1. **Adaptive phase-sequencer** — visual stepper (e.g., `01/04 Activate → 02/04 Calm → 03/04 Drift → 04/04 Sleep`) with per-phase carrier frequency, offset, and duration editable.
2. **Frequency layer mixer** — 4 independent layers (carrier sine, offset sine, solfeggio, sub-bass) each with its own volume slider and mute/solo.
3. **Presets library (12 hand-tuned presets)** — Sleep, Deep Sleep, Focus, Flow State, Meditation, Anxiety Release, Creative Spark, Study, Pre-Workout, Recovery, Breathwork 4-7-8, Box Breathing. Each preset is a JSON file committed to the repo.
4. **WebAudio real-time playback** — Tone.js-based engine, autoplay-safe (resumes on user gesture), works in Chrome / Safari / Firefox desktop and mobile.
5. **Headphone-detection prompt** — on session start, if `navigator.mediaDevices` is missing OR if no audio output is detected, show a modal: "Binaural beats require headphones."
6. **Stripe-backed subscription gate** — 7-day free trial, then €9.99/mo or €79.99/year, gated via a single `useSubscription()` hook; free tier = 3 presets.
7. **Account + cloud presets** — Supabase auth (email + Google), server-synced "my presets" list per user.
8. **Affiliate link injection** — single in-player banner slot: "Pair this with bone-conduction headphones →" deep-linking to Rulio Gadgets affiliate product.
9. **One-click export (MP3, 128 kbps)** — server-side `ffmpeg` bake of the current preset, watermark-free for paid users, 320 kbps as a paid upsell.
10. **In-app telemetry + Admin dashboard** — anonymous session-completion rate, drop-off phase, most-used preset; visible to Roel at `/admin`.

### V1 (ship in 90 days)

1. **Solfeggio tone generator UI** — pick from 174 / 285 / 396 / 417 / 528 / 639 / 741 / 852 / 963 Hz, individual sine + 2 harmonics (×1, ×2 amplitude) with volume.
2. **Noise layer** — pink / brown / white, independent volume, behind the 4-layer mixer.
3. **AI coach overlay (OpenAI Realtime API or TTS)** — pre-scripted + AI-generated breath cues and intention prompts, time-aligned to phase transitions, in EN / NL / FR.
4. **Personalised session builder** — drag-and-drop phase blocks, save as a custom preset, share via signed URL.
5. **Rulio Enerqi App deep-link** — single sign-on via Supabase, bundled subscription (€14.99/mo), cross-product session history.
6. **Mobile PWA with offline mode** — service worker, downloaded presets playable offline, push notification ("Time for tonight's Sleep session").
7. **iOS TestFlight + Android APK** — Capacitor wrap of the PWA, signed build, app-store-safe disclaimer copy.
8. **Affiliate dashboard** — track clicks + attributed conversions on Rulio Gadgets; per-preset CTR.

### V2+ parking lot

1. **Heart-rate adaptive mode** — read HR via Web Bluetooth (Polar / Apple Watch), shorten the ramp if HR is already < 60 bpm.
2. **Spatial audio mode** — Dolby Atmos / 7.1 head-related panning for solfeggio layers (Tone.js `Panner` with HRTF).
3. **User-generated mix marketplace** — community presets with revenue share 70/30 to the creator.
4. **Native Apple Watch app** — haptic-only phase cues (no audio on the watch).
5. **Voice-cloned Roel coach** — ElevenLabs clone of Roel's voice for the AI layer (requires consent + legal).
6. **B2B "Rulio Engine for Spas"** — multi-seat, branded, royalty-paid deployment to wellness centres.
7. **Integration with smart parking columns (B2B cashflow)** — office-waiting-room audio mode, paid as a hardware add-on.

---

## 3. Audio engine architecture

### 3.1 Core DSP layer

The audio engine is built on three primitives, all realised with the **Web Audio API** and **Tone.js** for ergonomics.

#### A. Binaural beat generator

A binaural beat is the perceptual beat frequency the brain produces when it hears **two pure tones of slightly different frequencies, one in each ear**. If the left ear gets 200 Hz and the right ear gets 218 Hz, the brainstem integrates them and the listener perceives an 18 Hz *amplitude modulation* — in the Beta range, which correlates with active concentration; at 4 Hz (Delta) it correlates with deep sleep.

The math:
- `f_left  = carrier` (e.g., 200 Hz)
- `f_right = carrier + offset` (e.g., 200 + 18 = 218 Hz)
- `perceived_beat = offset` (e.g., 18 Hz)
- The two oscillators must be **hard-panned** L = 100%, R = 100% — otherwise the brain hears them as a single tone and the beat vanishes. This is why binaural beats only work over headphones.

For the phase ramp (Activate → Calm → Drift → Sleep), each phase specifies `carrier` and `offset`, and a crossfade duration. The carrier slides between phases; the offset is what changes the brainwave target.

##### Pseudo-code (runnable shape)

```javascript
// binaural.js — Tone.js, ESM
import * as Tone from 'tone';

export class BinauralBeat {
  /**
   * @param {Object} phase
   * @param {number} phase.carrier     // e.g. 200 Hz
   * @param {number} phase.offset      // e.g. 18 Hz (perceived beat)
   * @param {number} phase.gain        // 0..1 master gain
   */
  constructor(phase) {
    this.left  = new Tone.Oscillator(phase.carrier, 'sine').toDestination();
    this.right = new Tone.Oscillator(phase.carrier + phase.offset, 'sine').toDestination();
    this.panL  = new Tone.Panner(-1).connect(Tone.getDestination());
    this.panR  = new Tone.Panner(+1).connect(Tone.getDestination());
    this.left.connect(this.panL);
    this.right.connect(this.panR);
    this.gain  = new Tone.Gain(phase.gain).toDestination();
    this.panL.connect(this.gain);
    this.panR.connect(this.gain);
  }

  start() { Tone.start();                  // resume on user gesture
            this.left.start(); this.right.start(); }

  /** Smoothly transition to a new phase over `ramp` seconds */
  rampTo(phase, ramp = 30) {
    const now = Tone.now();
    this.left.frequency.rampTo(phase.carrier,              ramp, now);
    this.right.frequency.rampTo(phase.carrier + phase.offset, ramp, now);
    this.gain.gain.rampTo(phase.gain, ramp, now);
  }

  stop() { this.left.stop(); this.right.stop(); this.gain.dispose(); }
}
```

#### B. Solfeggio tone generator

Each solfeggio frequency is a **fundamental sine plus 2 harmonics** at `-12 dB` and `-24 dB` (audible warmth without colouration). The 9 traditional frequencies (174, 285, 396, 417, 528, 639, 741, 852, 963 Hz) are hard-coded in a single lookup; user picks one per layer.

```javascript
export class SolfeggioTone {
  constructor(fundamentalHz, gain = 0.3) {
    const f = fundamentalHz;
    this.osc1 = new Tone.Oscillator(f,        'sine');
    this.osc2 = new Tone.Oscillator(f * 2,    'sine');
    this.osc3 = new Tone.Oscillator(f * 3,    'sine');
    this.merge = new Tone.Gain(gain).toDestination();
    this.osc1.volume =  0;  // dB
    this.osc2.volume = -12;
    this.osc3.volume = -24;
    this.osc1.connect(this.merge);
    this.osc2.connect(this.merge);
    this.osc3.connect(this.merge);
  }
  start() { this.osc1.start(); this.osc2.start(); this.osc3.start(); }
  setGain(g) { this.merge.gain.rampTo(g, 1.0); }
  stop()    { this.osc1.stop();  this.osc2.stop();  this.osc3.stop(); }
}
```

#### C. Layering

Each "layer" (carrier, offset, solfeggio, noise) is wrapped in its own `Tone.Gain` and connected to a single master `Tone.Gain → Tone.Destination`. The mixer UI mutates each layer's `gain.value` in real time. Layer counts are bounded (4 in MVP, 6 in V1) to keep phase ramps tractable.

```
[Osc L]─┐                         ┌─[Master Gain]─[Destination]
        [Panner -1]─┐             │
[Osc R]─┘           [Layer Gain]──┤
                                  │
[Solfeggio osc1]──[Layer Gain]────┤
[Solfeggio osc2]──[Layer Gain]────┤
                                  │
[Noise buffer]───[Layer Gain]─────┘
```

#### D. Head-related panning (optional V2+)

For the spatial-audio upgrade, swap the `Tone.Panner` for `Tone.Panner3D` with `panningModel: 'HRTF'`. This places each solfeggio layer at a different azimuth around the listener's head. Until then, the simple hard-pan (`-1` / `+1`) is correct for binaural beats — HRTF will actually *smear* the beat perception if applied to the two carrier oscillators.

### 3.2 Export pipeline (baked render)

The Web Audio graph is **real-time only**. For an MP3 / M4A / WAV export, we re-construct the same audio graph in **Node.js** using the `node-web-audio-api` package (or, more reliably, an `OfflineAudioContext` emulation in a headless Chromium via Puppeteer), and pipe the rendered PCM to `ffmpeg`.

Recommended approach (MVP):
1. **Client side**: serialise the current preset to a JSON payload (`{ phases, layers, totalDuration }`).
2. **POST** to `/api/export` (Next.js route handler) with the user's auth token.
3. **Server side** (Node, Puppeteer): open a headless page, load the same Web Audio engine, schedule the offline render, capture PCM.
4. **ffmpeg** transcodes the PCM to MP3 (libmp3lame, 128 kbps), M4A (aac, 192 kbps), or WAV (pcm_s16le, 44.1 kHz).
5. Upload to Supabase Storage, return a signed URL with 24-hour expiry.

```
preset.json ─► Puppeteer headless Chrome ─► OfflineAudioContext.render() ─► PCM buffer
                                                                        │
                                                                        ▼
                                                              ffmpeg -i pipe:0 -codec:a libmp3lame -b:a 128k out.mp3
                                                                        │
                                                                        ▼
                                                             Supabase Storage (signed URL)
```

### 3.3 Real-time vs. baked-render trade-offs

| Concern | Real-time (browser Web Audio) | Baked render (server-side ffmpeg) |
|---------|------------------------------|------------------------------------|
| Latency to first sound | ~50 ms (great) | 5–60 s (job queue) |
| Mobile battery | Drains (continuous DSP) | Free (user downloads a file) |
| Offline use | No (needs Web Audio) | Yes (after download) |
| Sharing | URL only | File / signed URL |
| Personalisation | Per-listener | Static file |
| Cost | Client CPU | Server CPU + storage |
| Use case | Live session, coaching overlay | Download for a flight, share, B2B asset |

**Rule of thumb for the MVP:** play real-time in-app; only bake when the user clicks "Export". Queue the bake job, show a spinner, push a notification when ready.

---

## 4. Tech stack recommendation

| Layer | Pick | One-line justification |
|-------|------|------------------------|
| **Frontend** | **Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui** | Same-stack SSR + edge + API routes cut the moving-parts count; Tailwind + shadcn ships clean dark UI fast (matches ruul-it.vercel.app aesthetic). |
| **Audio client** | **Tone.js v15** on top of native Web Audio API | Mature scheduling, HRTF panner, gain ramps; ~50 KB gzipped; well-typed. |
| **Backend / API** | **Next.js Route Handlers (Node 20, edge runtime for cheap reads)** | One deploy unit, no separate service to babysit; edge runtime for the session-preset read path. |
| **Database** | **Postgres on Supabase** | Free tier covers MVP, `pgvector` ready for V2 personalisation, row-level security maps cleanly to per-user presets. |
| **Auth** | **Supabase Auth** (email + Google OAuth) | One fewer vendor vs. Clerk; same Supabase project holds RLS-protected user rows; `auth.uid()` is the canonical user id used in every row. |
| **Payments** | **Stripe** (Checkout + Billing Portal + webhooks) | Industry default for SaaS subscriptions, 7-day free trial implemented as `trial_period_days`, customer portal handles cancellations/refunds without us writing UI. |
| **AI coach** | **OpenAI `gpt-4o-mini` for intent prompts + `tts-1` (or Realtime API in V1)** for voice | Cheap (~$0.15/1k tokens) for short prompts, 11labs/PlayHT-quality voice at <$15 per million characters; voice-clone of Roel parked for V2. |
| **Export worker** | **Fly.io machine running Puppeteer + ffmpeg** (or `node-web-audio-api` if proven stable) | Sub-second cold start vs. AWS Lambda; one machine scales to MVP load; no FFMPEG layer permissions tax. |
| **Hosting** | **Vercel** for the Next.js app | Zero-config Next.js deploys, preview URLs per PR, edge functions in 30+ regions; the export worker lives on Fly, not Vercel (Vercel's 10s function timeout is too short for long bakes). |
| **Observability** | **Sentry (errors) + PostHog (product analytics)** | Sentry for crash-free signal; PostHog self-hostable in EU (Brussels) for GDPR. |
| **Email** | **Resend** with React Email templates | Cheap, clean dev-experience, EU region. |

**Why not the alternatives?**
- **Vite + React** — fine, but we'd lose SSR/edge for the marketing site and the API surface, doubling deploys. For a single-team solo product, Next.js' all-in-one pays off.
- **Python backend** — unnecessary; all DSP is client-side. Node is also the Puppeteer runtime, so the export worker is JS anyway.
- **Clerk** — strong DX, but adds a second identity vendor on top of Supabase; Supabase Auth already covers email + Google + magic link with RLS, which is enough for MVP.
- **Vercel-only for export** — Vercel functions cap at 300 s on Pro and 10 MB response; an 8-hour sleep export is out. Fly.io is the right home for the heavy worker.

---

## 5. MVP build plan (4 weeks)

> Solo build with the `rulio-engine-builder` agent; Roel reviews at each Friday demo. Where a "who" is named it is the agent or Roel, since at MVP scale this is a one-person product.

### Week 1 — "Engine + 1 preset plays in a browser"

- **Ships**
  - Next.js 14 + TS + Tailwind + shadcn/ui scaffold, deployed to Vercel.
  - Supabase project created, schema migration `0001_init` (tables: `users`, `presets`, `sessions`).
  - Supabase Auth wired (email + Google) with middleware-protected `/app/*` routes.
  - Web Audio / Tone.js engine in `/lib/audio/binaural.ts` and `/lib/audio/solfeggio.ts`.
  - One preset (`Sleep`, 4 phases, 15 min) hard-coded in JSON, playing in the browser at `/app/play/sleep`.
  - Headphone prompt modal.
- **Who**
  - `rulio-engine-builder` (agent): scaffold, audio engine, Supabase wiring.
  - Roel: design review of the Sleep preset's phase frequencies.
- **End-of-week demo**
  - "Sign in → click Sleep → 4-phase adaptive audio plays" on Chrome desktop.

### Week 2 — "Mixer + 12 presets + free/paid gate"

- **Ships**
  - 4-layer mixer UI (carrier / offset / solfeggio / sub-bass) with per-layer gain sliders and mute/solo.
  - 12 presets committed (`/lib/presets/*.json`), all 4-layer, all 10–30 min.
  - Stripe Checkout + Billing Portal wired, single `useSubscription()` React hook.
  - Free tier = 3 presets; the other 9 are paywalled.
  - Admin route `/admin` (Roel-only via Supabase role) showing total users, paying users, top 5 presets.
- **Who**
  - `rulio-engine-builder`: mixer UI, Stripe, admin route.
  - `brand-guardian`: copy review of paywall + legal disclaimer ("tool for relaxation, not medical treatment").
- **End-of-week demo**
  - "Sign up → start 7-day trial → all 12 presets unlock → click Focus → mixer UI shows live sliders."

### Week 3 — "Server-side export + affiliate slot"

- **Ships**
  - Fly.io worker running Puppeteer + ffmpeg, accepts `{presetId}` POST, returns signed Supabase Storage URL.
  - Export modal in-app: format dropdown (MP3 128 / M4A 192 / WAV 16-bit), expected-duration estimate, email-when-ready.
  - "Baked file" appears in `/app/library` once ready.
  - One in-player affiliate slot: "Pair with bone-conduction headphones →" deep-linking to Rulio Gadgets.
  - PostHog wired; events: `session_started`, `phase_entered`, `session_completed`, `paywall_hit`, `export_requested`.
- **Who**
  - `rulio-engine-builder`: export pipeline, modal, library page, PostHog.
  - `affiliate-operator`: chooses the affiliate product + UTM scheme.
- **End-of-week demo**
  - "Free user hits the paywall on Focus, up-grades, exports Sleep to MP3, gets the email 4 minutes later, plays the file in their car."

### Week 4 — "Polish, test, launch"

- **Ships**
  - End-to-end Playwright tests for: sign-up, paywall, playback, export.
  - Sentry + PostHog dashboards live, alert rules set.
  - Landing-page rewrite at `/` (replace ruul-it.vercel.app placeholder hero) with FAQ, pricing, science-honest disclaimer.
  - App-store-safe disclaimer copy: "Rulio Engine is a relaxation tool. It is not a medical device and does not diagnose or treat any condition."
  - PWA manifest + service worker, "Add to Home Screen" prompt.
  - Migration of 1,247 waitlist signups from ruul-it.vercel.app into Supabase, single drip email.
- **Who**
  - `rulio-engine-builder`: tests, PWA, FAQ, waitlist migration.
  - `qa-reviewer`: end-to-end test pass, copy review, accessibility audit.
  - Roel: final review, ships.
- **End-of-week demo**
  - "Roel records a Loom walking through the app, posts to LinkedIn, opens the paywall to 100% of users, walks away."

---

## 6. Risks & open questions

1. **Medical-claim exposure** — "528 Hz heals DNA", "solfeggio frequencies repair cells", "Brainwaves app says vagal tone" — all of this is the kind of language that triggers FTC / EU consumer-protection letters *and* App Store rejection. The Rulio Engine UI must use neutral language ("support relaxation", "engineered phase ramp") and the FAQ must explicitly say "not a medical device, not a treatment". Mitigation: `brand-guardian` reviews every string in the player; legal review by a Belgian/EU consumer-law freelancer before public launch (€500–€1,500).
2. **Headphone-only constraint** — binaural beats only work with stereo separation. Users will play it on a Bluetooth speaker and feel cheated. Mitigation: mandatory headphone-prompt modal, in-app badge "headphones recommended" on every session card, refund policy that explicitly excludes "didn't use headphones" claims.
3. **Web Audio autoplay policy on iOS Safari** — iOS requires a user gesture before any audio context can resume. If the user backgrounds the app for >30 s, audio dies silently. Mitigation: detect `visibilitychange` + `pagehide`, show a re-engagement prompt with a "Resume" button; explicitly call `Tone.start()` on every user gesture.
4. **Subscription refund / chargeback rate** — binaural-beat apps have unusually high refund rates (15–25% in industry data) because users don't feel an immediate effect and feel scammed. Mitigation: 7-day *free* trial (no card up-front for the first cohort), in-session telemetry to identify drop-off, an honest "may not work for everyone" disclaimer, and a single email at day 3 ("How is it going? Reply to this email.") that pulls refunds into a conversation instead of a chargeback.
5. **Content moderation if user-generated mixes are enabled (V2)** — the moment we let users share presets, we inherit moderation of (a) frequencies outside the safe audible range, (b) potentially hateful "intention prompts" in the AI layer, (c) copyright on the noise samples. Mitigation: cap layer counts, hard-clamp frequencies to 20 Hz – 8 kHz, and require all AI-generated coach text to pass an OpenAI moderation call before write. **Open question:** do we ship a marketplace at all, or stay curated?
6. **Open question — solfeggio accuracy** — 528 Hz in a browser's Web Audio at 44.1 kHz sample rate is fine, but at 48 kHz with cheap DACs there is audible jitter. Worth a listening test with the $30 Apple USB-C dongle vs. the $300 Chord Mojo before launch.
7. **Open question — Enerqi AI voice licensing** — using a voice-cloned Roel in V2 requires (a) his explicit written consent, (b) a "deepfake" disclosure under EU AI Act Article 50, and (c) an opt-out per session. Park for V2; ship a stock OpenAI voice in V1.
