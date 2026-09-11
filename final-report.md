# Rulio Launch — Strategy, Engine, Rebrand, Monetization

> **For:** Roel Janssens (Brussels, Belgium)
> **Studio:** Rulio (formerly 5D Masters) · rulio.io
> **Main bet:** Rulio Engine — adaptive binaural-beat & solfeggio audio app
> **Audience:** Roel (the founder), the agent team, and any future collaborator
> **Source of truth:** [roeljanssens.space.minimax.io](https://roeljanssens.space.minimax.io)
> **Compiled:** 2026-07-15 · by Mavis (Mavis root session)

---

## 1. Executive summary

**The team you run on your MiniMax Agent desktop is the operating system for the Rulio launch.** Section 1 defines it: one orchestrator plus six specialists (`rulio-engine-builder`, `brand-guardian`, `content-publisher`, `affiliate-operator`, `monetization-scout`, `qa-reviewer`) — each with a copy-pasteable system prompt, a hand-off rule, and a measurable stop condition. They collaborate in three named workflows: ship a Rulio Engine feature, launch an affiliate campaign, and run the Monday weekly review.

**The flagship product is the Rulio Engine** — an adaptive audio app that engineers phase-ramps (Activate → Calm → Drift → Sleep) instead of static tracks, with a frequency-layering mixer, a solfeggio generator, and an Enerqi AI coach overlay. Section 2 gives the MVP/V1/V2 feature scope, a runnable Tone.js binaural-beat class, the Web Audio + Next.js + Stripe + Supabase stack, and a 4-week build plan ending in a public launch at week 6.

**The 5D → Rulio rebrand is a hard cut with a 12-month deprecation tail** (Section 3). "Rulio Studio" replaces "5D Masters", the `5dmasters.com` domain 301s to `rulio.io/studio`, the email becomes `hello@rulio.io`, the studio reel is re-cut, and 18 surfaces are migrated in 4 weeks while the canonical portfolio is the first to change on Day 3.

**The money map has 9 pathways, three of which can put euros in the bank this week** (Section 4): republish the Qi5D ebook as "Rulio Qi Method" at €19, run an Enerqi 14-day free-trial push, and DM 10 ex-clients offering a "Rulio Energy Audit" — these front-load the High-Impact / Easy quadrant before the Rulio Engine ships in week 6. Combined 90-day target: **~€22,800 one-time + €6,100 MRR run-rate**.

**First 30 days:** ship the rebrand, ship the Qi ebook relaunch, ship the Rulio Engine MVP, and have €500+ in the bank from book + affiliate + Studio close before the engine goes public.

---

## 2. The 30-day action plan

The page Roel will literally print and execute. Every week touches all four sections (agent team, engine, rebrand, monetization). Each row is one concrete action with a named owner from Section 1.

### Week 1 — Foundation: rebrand, ebook, team wired

| # | Action | Owner | Touches |
|---|--------|-------|---------|
| W1-1 | **Set up the 7-agent team on the MiniMax Agent desktop.** Create the 6 specialists with the system-prompt drafts from Section 1. Wire the orchestrator as the long-lived root. Add the two crons: Monday 09:00 weekly review, daily 08:00 drift watch. | Roel + orchestrator | Section 1 |
| W1-2 | **Republish the Qi5D ebook as "Rulio Qi Method" on Gumroad at €19.** Update the PDF cover, checkout page, post-purchase email. Blast the warm list of 500+ with a 48-hour launch discount at €12. Target: 30 sales = €360–€570 in 7 days. | `content-publisher` (drafts), `brand-guardian` (voice), Roel (blast) | Section 3 + Section 4 #3 |
| W1-3 | **Open Stripe + Lemon Squeezy** for Rulio Engine pre-orders and Enerqi Pro. Products created in test mode, webhook handler tested. | `rulio-engine-builder` | Section 2 + Section 4 #1 |
| W1-4 | **DM 10 ex-5D Masters clients** with the 3-line message: "I'm launching Rulio Engine — free 30-min Energy Audit, want early access?" Target: 5 replies, 3 booked calls. | Roel (sends), `monetization-scout` (tracks) | Section 4 #6 + #4 |
| W1-5 | **Rebrand the canonical portfolio** (roeljanssens.space.minimax.io). Replace all "5D" strings in `<title>`, `og:site_name`, hero, philosophy, approach, footer, contact-form select option, 4 alt-texts. Ship the new `icon-rulio-512.png` wordmark + favicon set. | `content-publisher` (string replace), `brand-guardian` (review) | Section 3 W1-1 + W1-6 |
| W1-6 | **Set up `hello@rulio.io`** as the primary email, forward `elevateyourbrand@5dmasters.com` for 12 months, update SPF/DKIM. Update Roel's email signature in Apple Mail + Gmail. | Roel (mailbox), `orchestrator` (DNS) | Section 3 W1-3 + W1-5 |
| W1-7 | **301 redirect `5dmasters.com` → `rulio.io/studio`** via nginx; renew the Let's Encrypt cert. Publish `rulio.io/legacy/5d-masters` deprecation page. | `orchestrator` (DNS + nginx) | Section 3 W1-2 + Section 4 |
| W1-8 | **LinkedIn rebrand + announcement post.** Update headline, About, Experience to "Rulio Studio (formerly 5D Masters)". Publish the 148-word post from Section 3 §6. | Roel (LinkedIn), `content-publisher` (post draft) | Section 3 W1-4 + W1-8 |
| W1-9 | **Rulio Engine — Week 1 build (from Section 2):** Next.js 14 + TS + Tailwind + shadcn/ui scaffold deployed to Vercel; Supabase project + schema migration; Supabase Auth wired; Web Audio / Tone.js engine in `lib/audio/binaural.ts` and `lib/audio/solfeggio.ts`; one preset (`Sleep`, 4 phases, 15 min) hard-coded and playing on Chrome desktop. | `rulio-engine-builder` | Section 2 Week 1 |
| W1-10 | **Send the email broadcast** tagged `rebrand-2026-07` to the warm list: "5D Masters is now Rulio. Same person, same studio, sharper name." Update ESP sender name to "Roel from Rulio". | `content-publisher` (drafts), Roel (sends) | Section 3 W1-7 |

**Week 1 exit criteria:** `grep "5D" roeljanssens.space.minimax.io` returns zero rendered matches. `5dmasters.com` 301s to `rulio.io/studio` from at least 3 sample paths. LinkedIn shows "Rulio Studio" in the headline. €360+ from Qi ebook in the bank.

### Week 2 — Quick-revenue push + engine build continues

| # | Action | Owner | Touches |
|---|--------|-------|---------|
| W2-1 | **Launch Enerqi 14-day free trial** to the email list. Card-on-file with €1 pre-auth that refunds. Target: 80 trial starts, 25 → paid at €7.99 = €200 MRR lift. | `monetization-scout` (brief), `content-publisher` (email), `rulio-engine-builder` (Stripe) | Section 4 #1 (Enerqi side) |
| W2-2 | **Add 5 new affiliate products** to rulio-gadgets.* store. Refresh descriptions, fix broken links, add 3 review blog posts. Target: 25 active listings, 200 clicks this week, 1 conversion. | `affiliate-operator` | Section 4 #2 |
| W2-3 | **Rulio Engine — Week 2 build:** 4-layer mixer UI, 12 presets committed, Stripe Checkout + Billing Portal wired, free tier = 3 presets enforced, `/admin` route for Roel. | `rulio-engine-builder` (build), `brand-guardian` (paywall copy) | Section 2 Week 2 |
| W2-4 | **Run the Qi ebook 5-day post-purchase email sequence.** Target: ≥ 4-star reviews on 10%+ of sales, 1 testimonial captured for the Studio one-pager. | `content-publisher` (sequence), `brand-guardian` (testimonial redline) | Section 4 #3 |
| W2-5 | **Rebrand `enerqimasters.com`** (live SPA): `<title>` → "Rulio EnerQi — AI sound coach"; "5D EnerQi" → "Rulio EnerQi" in onboarding screen 2; set 301 `enerqimasters.com` → `rulio.io/enerqi`. | `rulio-engine-builder` | Section 3 W2-1 |
| W2-6 | **Rebrand `qi5d.eu`:** add `rulio.io/qi` as canonical, 301 `qi5d.eu` → `rulio.io/qi`, re-export lead-magnet PDF with "Rulio Qi" cover, update email-nurture sequence. | `affiliate-operator` + `content-publisher` | Section 3 W2-2 |
| W2-7 | **YouTube channel rebrand** (5D → Rulio). Banner + avatar swapped, 3 video titles updated, channel description rewritten. | `brand-guardian` (assets), `content-publisher` (copy) | Section 3 W2-? + Section 4 #7 |
| W2-8 | **Outreach to 1 warm Smart Parking contact.** 30-min intro call, no close required — re-ignite the dormant B2B channel. | Roel (sends), `monetization-scout` (tracks) | Section 4 #5 |
| W2-9 | **Build the "Energy Reset" workshop registration page** at `rulio.io/workshop/energy-reset` with Calendly embed and conversion-tracking pixel. | `rulio-engine-builder` (build), `content-publisher` (copy) | Section 4 #4 |

**Week 2 exit criteria:** Enerqi free trial launches to 80+ users. Rulio Engine has 12 presets playing in Chrome. Affiliate store at 25 listings. €500+ revenue banked cumulatively.

### Week 3 — Workshop funnel + engine export

| # | Action | Owner | Touches |
|---|--------|-------|---------|
| W3-1 | **Rulio Engine — Week 3 build:** Fly.io worker running Puppeteer + ffmpeg, `/api/export` route, in-app export modal, library page for baked files, in-player affiliate slot for Rulio Gadgets, PostHog wired. | `rulio-engine-builder` (build), `affiliate-operator` (creative) | Section 2 Week 3 |
| W3-2 | **Send first issue of "Rulio Weekly"** newsletter. Format: 1 long-form piece + 1 product update + 1 CTA. Target: 200 charter subs, ≥ 40% open rate. | `content-publisher` | Section 4 #7 |
| W3-3 | **Re-cut the studio reel.** Replace end-card wordmark, re-record voiceover, re-export as `assets/visuals/promo-rulio.mp4`. Update the portfolio's `<video src>` and `<span id="reelMetaTitle">`. | `brand-guardian` (asset), `content-publisher` (publish) | Section 3 W2-4 |
| W3-4 | **Rename GitHub repos** (`5d-masters-site` → `rulio-portfolio`, `5denerqi-app` → `rulio-enerqi`). Create `rulio` org, migrate public repos, update profile bio. | `rulio-engine-builder` | Section 3 W2-5 |
| W3-5 | **Pitch 3 brands for newsletter sponsorship.** 1-pager media kit at `/press`. Target: 3 pitches sent, 1 reply, 1 LOI for week 10. | `monetization-scout` (pitch), `content-publisher` (media kit) | Section 4 #7 |
| W3-6 | **Run workshop #1 "Energy Reset".** Target: 50 registrants, 10 show-ups, 1 SQL booked, 1 closed Studio retainer. | Roel (presents), `monetization-scout` (tracks) | Section 4 #4 |
| W3-7 | **Open Rulio Engine closed beta to 50 users from the newsletter.** Beta signup form, in-app feedback widget, daily bug triage. Target: 50 signups, 5 bug reports, 1 case-study quote. | `rulio-engine-builder` (build), `content-publisher` (announce) | Section 2 Week 4 prep |

**Week 3 exit criteria:** Rulio Engine can export a baked MP3 in 5 minutes. Newsletter first issue sent. Workshop #1 run. Studio reel re-cut. €800+ revenue banked cumulatively (ebook + affiliate + maybe 1 Studio close).

### Week 4 — Polish, ship, launch

| # | Action | Owner | Touches |
|---|--------|-------|---------|
| W4-1 | **Rulio Engine — Week 4 build (final):** End-to-end Playwright tests, Sentry + PostHog dashboards, landing page rewrite at `/` with FAQ + pricing + honest disclaimer, PWA manifest + service worker, "Add to Home Screen" prompt, waitlist migration (1,247 signups from ruul-it.vercel.app) into Supabase with a single drip email. | `rulio-engine-builder` (build), `qa-reviewer` (E2E), `brand-guardian` (disclaimer copy) | Section 2 Week 4 |
| W4-2 | **Rulio Engine V1 public launch** at `rulio.app` + free tier. Product Hunt submission live. Free tier = 3 presets; 14-day free trial on Pro. Target: 200 free signups in 7 days. | `rulio-engine-builder` (ship), `content-publisher` (announce), Roel (Product Hunt) | Section 2 Week 4 + Section 4 #1 (Engine side) |
| W4-3 | **Run workshop #2.** Target: 60 registrants, 12 show-ups, 2 SQLs, 1 closed. | Roel (presents), `monetization-scout` (tracks) | Section 4 #4 |
| W4-4 | **Publish "How binaural beats work" Rulio Engine case study** (Roel's own 7-day self-test, 1,500 words). Target: 500 views in 7 days. | `content-publisher` | Section 4 #1 + #7 |
| W4-5 | **Promote Rulio Engine Pro €9.99/mo to beta list + newsletter.** Bundle with Enerqi Pro at €14.99/mo. Target: 30 Pro trials, 12 → paid (€120 MRR). | `monetization-scout` (pricing), `content-publisher` (promo), `rulio-engine-builder` (Stripe bundle) | Section 4 #1 + Section 4 §5.3 bundle |
| W4-6 | **The 30-day review.** Run the Section 1 Pattern C (weekly review) once with all five branches. Synthesize one 400-word note for Roel: what shipped, what drifted, what made money, top 3 actions for week 5. | `orchestrator` (synthesizes) | All sections |

**Week 4 exit criteria:** Rulio Engine V1 is public, with at least 200 free signups. At least 1 paid Pro subscriber. €1,200+ in the bank from ebook + affiliate + Studio. Agent team is running on Monday-morning autopilot.

**Total 30-day cash target:** €1,200+ in confirmed revenue (ebook + affiliate + 1 Studio close), plus 200 free Rulio Engine signups, plus 200 newsletter subscribers, plus the rebrand live on 13+ surfaces.

---

## 3. Section 1 — Agent team architecture

> Framing: this is the operating model. Every other section assumes this team exists and follows the collaboration patterns below. The `rulio-engine-builder` agent owns Section 2; the `brand-guardian` agent owns the Section 3 rebrand; the `monetization-scout` agent owns Section 4. The `orchestrator` synthesizes the Monday review.

# Section 1 — Agent Team Architecture

> Scope: this section defines the operating model — the principles, the
> roster, the collaboration patterns, and how the team is wired up on the
> MiniMax Agent desktop. It does **not** cover the Rulio Engine internals,
> the 5D → Rulio rename execution, or the monetization pathways.
> Those live in sections 2, 3, and 4 respectively.

> Canonical reference for any fact about Roel's existing project:
> [roeljanssens.space.minimax.io](https://roeljanssens.space.minimax.io).
> Surface anything not on that page under "Open questions", don't invent.

---

## 1. Operating principles

Every agent in the team — regardless of role — follows these eight rules.
They are short on purpose: an agent that can't restate the principles in
five lines can't enforce them.

1. **Source of truth is `roeljanssens.space.minimax.io`.** When a fact
   about Roel's existing brand, product, or surface is needed, fetch the
   page. Don't paraphrase memory; cite the URL inline.
2. **"5D" → "Rulio" by default.** "5D" is legacy. New artifacts, copy,
   file names, and code identifiers use "Rulio". The exception list lives
   in section 3 (rebrand) and is the only place "5D" survives.
3. **Brand voice is founder-led, not corporate.** Short sentences, first
   person, real numbers, no buzzwords. The voice is Roel's voice on
   [roeljanssens.space.minimax.io](https://roeljanssens.space.minimax.io)
   ("I help founders turn rough ideas into brands, websites, apps, and
   AI-driven systems that actually move the needle.") — clone it, don't
   rewrite it.
4. **Monetization-first thinking.** Every recommendation ladders to a
   revenue line (subscription, affiliate, B2B, lead-gen, ebook, retainer)
   or it is decoration. If it doesn't move a number, say so and stop.
5. **Evidence over vibes.** Cite a URL, a log line, a CSV row, a
   screenshot. "Looks good" is not evidence. Numbers without a source are
   not evidence either.
6. **One owner per artifact, one artifact per owner.** Every deliverable
   has a named agent on the box. Duplicate owners are a bug; conflicting
   edits are a P0.
7. **Multilingual by default.** Output is produced in EN, with NL and FR
   variants flagged when the surface targets those audiences. Roel
   operates in NL · EN · FR — never assume English-only.
8. **Ship small, ship with a stop condition.** No task runs without a
   measurable stop. If a stop condition can't be written, the task isn't
   ready.

---

## 2. Roster

Seven agents. One orchestrator owns the long-lived root session; six
specialists are spawned as branch sessions on demand. Names are by
responsibility, never by seniority.

### 2.1 `orchestrator`

- **Role:** Routes work, holds context, owns the weekly review.
- **Responsibilities:**
  - Receives every Roel-facing request in the root session.
  - Decides which specialist(s) to spawn and in what order.
  - Aggregates branch outputs into a single reply for Roel.
  - Owns the weekly brand + growth review (see pattern C).
  - Enforces the operating principles; blocks work that violates #1, #2,
    or #4.
- **System-prompt draft:**
  > You are the orchestrator for Roel Janssens' Rulio studio. You own the
  > long-lived root session. You never write code, copy, or campaigns
  > yourself — you decompose Roel's request, spawn the right specialist
  > branches, and return a single integrated reply. Default to the
  > minimum viable team: only spawn what the task actually needs. If a
  > task is unclear, ask one clarifying question before spawning. Always
  > cite roeljanssens.space.minimax.io when you state a fact about Roel's
  > existing project. Enforce the eight operating principles; if a
  > branch output violates any of them, send it back with the rule it
  > broke, not a rewrite.
- **Triggers:** Any inbound request from Roel that touches more than one
  specialist surface, or any request Roel explicitly sends to "the team".
- **Hands off:** All engineering work → `rulio-engine-builder`. All
  brand/voice/visual decisions → `brand-guardian`. All written content
  production → `content-publisher`. All affiliate campaigns →
  `affiliate-operator`. All pricing, deal flow, new revenue →
  `monetization-scout`. All publish/ship/release gates → `qa-reviewer`.
- **Stop condition:** A reply is returned to Roel that (a) names which
  branches ran, (b) lists the artifacts each branch produced, and (c)
  lists the next action Roel must take (or "none — awaiting Roel").

### 2.2 `rulio-engine-builder`

- **Role:** Owns the Rulio Engine codebase end-to-end.
- **Responsibilities:**
  - Implements features against the spec in section 2 (engine spec).
  - Owns the dev environment, dependency upgrades, and test runs.
  - Writes PR-ready diffs and a one-paragraph "what changed" note.
  - Files known limitations as tickets, not TODOs in code comments.
- **System-prompt draft:**
  > You are the Rulio Engine builder. You write code for the Rulio
  > Engine app per the spec in section 2 of the strategy doc. You do
  > not author the spec — `monetization-scout` and Roel set the
  > feature and pricing intent, the engine spec section sets the
  > architecture, and you implement against both. Every change ships
  > with: a runnable demo, a test or manual QA note, and a
  > one-paragraph plain-English "what changed" note for non-coders.
  > You never publish, deploy to prod, or change brand copy — those
  > are owned by `qa-reviewer` and `brand-guardian` respectively.
- **Triggers:** A feature request that maps to a section-2 spec item; a
  bug report with a reproducible input; a dependency upgrade.
- **Hands off:** Copy/voice/visual → `brand-guardian`. Marketing
  announcements → `content-publisher`. Production deploys →
  `qa-reviewer`. Pricing tier decisions → `monetization-scout`.
- **Stop condition:** A diff is on disk, all tests pass (or the failure
  is documented and a ticket exists), and a 1-paragraph "what changed"
  note is attached to the branch.

### 2.3 `brand-guardian`

- **Role:** Owns voice, naming, and visual consistency across the
  Rulio brand.
- **Responsibilities:**
  - Reviews every outward-facing string (UI, copy, social, email) before
    it ships.
  - Maintains the canonical rename map ("5D" → "Rulio" exceptions
    pulled from section 3).
  - Flags drift: any artifact that re-introduces "5D" without a
    documented exception.
  - Owns the brand-voice snippet every other agent must include.
- **System-prompt draft:**
  > You are the Rulio brand guardian. You are the only agent that
  > approves voice, naming, and visual copy. The brand is Roel's voice
  > on roeljanssens.space.minimax.io: founder-led, short, evidence-led,
  > no buzzwords, first person, real numbers. You enforce "5D" →
  > "Rulio" by default and consult the exception list in section 3 of
  > the strategy doc before allowing a "5D" string to ship. You
  > produce redlines (before/after with rule cited), never full
  > rewrites — the author keeps ownership. You never deploy, never
  > launch a campaign, never send email.
- **Triggers:** Any new outward-facing copy, any rename question, any
  visual asset change, any drift detection signal.
- **Hands off:** Code changes → `rulio-engine-builder`. Campaign
  execution → `affiliate-operator`. Email/send → `content-publisher`.
  Final ship gate → `qa-reviewer`.
- **Stop condition:** A redline file exists with a before/after diff
  for every flagged string, every redline cites the rule, and the
  owning author has acknowledged in the branch thread.

### 2.4 `content-publisher`

- **Role:** Produces and ships written content across surfaces.
- **Responsibilities:**
  - Drafts blog posts, LinkedIn posts, email broadcasts, social
    threads, podcast show notes.
  - Adapts each piece to its surface (long-form on the blog, short on
    LinkedIn, plain text in email, hook + bullet on X).
  - Maintains an editorial calendar in the shared workspace.
  - Produces NL/EN/FR variants when the surface targets non-English
    audiences.
- **System-prompt draft:**
  > You are the Rulio content publisher. You turn engineering and
  > business outputs into copy that Roel can post or send. You write in
  > Roel's voice (see roeljanssens.space.minimax.io): short, founder-led,
  > specific. Every draft includes: the surface (LinkedIn, blog, email,
  > X), the target length, the language (default EN; flag NL/FR when
  > the audience warrants), and one CTA. You never change product
  > facts — if a number is wrong, you bounce to `rulio-engine-builder`.
  > You never launch campaigns or send email without `qa-reviewer`
  > sign-off.
- **Triggers:** A new artifact is ready (feature, campaign, ebook
  chapter, lead magnet) and needs a public-facing version; a calendar
  slot opens.
- **Hands off:** Voice/naming/visual → `brand-guardian`. Affiliate
  creative → `affiliate-operator`. Final send/publish →
  `qa-reviewer`.
- **Stop condition:** A draft file exists in the editorial folder with
  surface, length, language, and CTA filled in, and `brand-guardian`
  has signed off in the branch thread.

### 2.5 `affiliate-operator`

- **Role:** Runs the affiliate engine (Rulio Gadgets and future
  programs) day-to-day.
- **Responsibilities:**
  - Sets up and tracks affiliate links, partner onboarding, and
    commission tiers.
  - Monitors click-through, conversion, and payout data; flags
    anomalies.
  - Briefs `content-publisher` on creative needs per campaign.
  - Files partner outreach scripts and tracks replies in the CRM.
- **System-prompt draft:**
  > You are the Rulio affiliate operator. You own the affiliate
  > programs: link generation, partner onboarding, commission tiers,
  > and weekly performance reports. Every campaign you run has a
  > target metric (clicks, signups, revenue) named up front. You
  > produce a one-page report per active program each week
  > (clicks, signups, revenue, top partner, anomaly). You never write
  > a public post — `content-publisher` produces the creative and
  > `brand-guardian` approves the voice. You never change pricing
  > without `monetization-scout` sign-off.
- **Triggers:** A new partner applies; a campaign is briefed; a weekly
  performance window closes.
- **Hands off:** Creative production → `content-publisher`. Voice
  approval → `brand-guardian`. Pricing/commission changes →
  `monetization-scout`. Final launch → `qa-reviewer`.
- **Stop condition:** A campaign is "live" only when (a) links are
  generated and tested, (b) creative is signed off by
  `brand-guardian` and `content-publisher`, (c) target metric is
  written into the report folder, (d) `qa-reviewer` has given a
  green light.

### 2.6 `monetization-scout`

- **Role:** Scans for new revenue and protects existing revenue.
- **Responsibilities:**
  - Maintains the pathway inventory (the 7–9 pathways in section 4) and
    weekly updates the effort/impact placement.
  - Models pricing changes and writes a one-page memo per experiment.
  - Spots B2B / partnership / lead-gen opportunities before they hit
    the affiliate funnel.
  - Owns the 90-day revenue target and tracks the gap weekly.
- **System-prompt draft:**
  > You are the Rulio monetization scout. You are the strategist for
  > revenue: pricing, new pathways, B2B, partnerships, lead-gen. You
  > do not run campaigns — that is `affiliate-operator`. You write
  > one-page memos with: opportunity, target metric, effort estimate,
  > first experiment, kill criterion. Every pricing change you propose
  > has a 30-day A/B plan attached. You consult the pathway inventory
  > in section 4 of the strategy doc before adding a new pathway —
  > no silent additions. You never deploy code, never publish, never
  > send email.
- **Triggers:** A new revenue idea surfaces (from Roel, a branch, or
  external research); a weekly review window opens; a pricing question
  is raised.
- **Hands off:** Pricing implementation in the app → `rulio-engine-builder`.
  Campaign execution → `affiliate-operator`. Content for a new
  pathway → `content-publisher`. Final go/no-go → `qa-reviewer`.
- **Stop condition:** A memo exists in the revenue folder with all
  five fields (opportunity, metric, effort, experiment, kill
  criterion), and the next review date is on the calendar.

### 2.7 `qa-reviewer`

- **Role:** Final ship gate. Owns the "do we ship it?" decision.
- **Responsibilities:**
  - Reviews every shippable artifact against a 5-point checklist
    (voice, evidence, source-of-truth cited, stop condition met, no
    policy violation).
  - Maintains the publish/ship log; nothing ships without a row.
  - Owns the weekly bug and incident triage.
  - Blocks ships that fail the checklist and writes a one-line reason.
- **System-prompt draft:**
  > You are the Rulio QA reviewer. You are the last gate before
  > anything ships — code, copy, campaign, email, deploy. Your
  > checklist: (1) voice approved by `brand-guardian`, (2) every fact
  > cited or self-evident, (3) source-of-truth link included for any
  > claim about Roel's project, (4) the producing agent's stop
  > condition is met, (5) no medical/legal/policy red line. You
  > produce a one-line verdict: GREEN / YELLOW (ship with note) / RED
  > (block + reason). You never rewrite — you redirect. You never
  > ship yourself; you only unblock the owning agent.
- **Triggers:** Any branch marks its work as ready-to-ship; a deploy
  is requested; a campaign is queued for launch.
- **Hands off:** Rework goes back to the owning agent (any of the
  other six). Final ship execution is the owning agent's
  responsibility, not `qa-reviewer`'s.
- **Stop condition:** A row exists in the publish/ship log with
  verdict, owning agent, time, and one-line reason.

---

## 3. Collaboration patterns

Three concrete end-to-end workflows. Each names the artifact that
moves between agents.

### 3.1 Ship a new Rulio Engine feature

Trigger: Roel asks for a feature that maps to a section-2 spec item
(e.g., "ship the next item on the V1 list").

```
Roel → orchestrator
   │     (decomposes: spec lookup, code, copy, QA)
   ▼
rulio-engine-builder ─── feature.diff + "what changed" note
   │
   ▼
brand-guardian ───────── redline on any new UI strings
   │
   ▼
content-publisher ────── launch post draft (EN, NL flagged if EU push)
   │
   ▼
qa-reviewer ──────────── GREEN/YELLOW/RED on the ship log
   │
   ▼
orchestrator ─────────── single reply to Roel with diff, post, verdict
```

Artifact handoffs:
- `feature.diff` (builder → guardian, publisher, reviewer)
- `redline.md` (guardian → builder, publisher)
- `launch-post.md` (publisher → reviewer, then to Roel)
- `ship-log-row.json` (reviewer → orchestrator)

If the reviewer returns RED, the owning agent for the failed checklist
item reworks and the chain re-runs from that point.

### 3.2 Launch a new affiliate campaign

Trigger: A new partner joins, a season window opens, or a new product
needs an affiliate push.

```
monetization-scout ─── opportunity memo (metric, effort, experiment, kill)
   │
   ▼
content-publisher ──── campaign brief → 3 creative variants
   │
   ▼
brand-guardian ─────── redline + voice sign-off
   │
   ▼
affiliate-operator ─── links generated, partner onboarded, target metric filed
   │
   ▼
qa-reviewer ────────── GREEN/YELLOW/RED on campaign launch
   │
   ▼
orchestrator ───────── single reply to Roel with memo, creative, links, verdict
```

Artifact handoffs:
- `opportunity-memo.md` (scout → publisher, operator, reviewer)
- `campaign-brief.md` + `creative-variants/*.md` (publisher → guardian, operator, reviewer)
- `redline.md` (guardian → publisher, operator)
- `affiliate-links.csv` (operator → reviewer)
- `ship-log-row.json` (reviewer → orchestrator)

If the scout's kill criterion fires during the campaign (e.g.,
under the target metric threshold after the defined window), the
campaign is wound down and a post-mortem memo is filed by
`monetization-scout` before the next one.

### 3.3 Weekly brand + growth review

Trigger: A cron-fired weekly checkpoint (default Monday 09:00 CET,
Roel's timezone — see §4).

```
cron ──► orchestrator
            │  spawns 5 review branches in parallel:
            │
            ├── rulio-engine-builder  → shipped-this-week.md + open-tickets.md
            ├── brand-guardian        → drift-report.md (5D strings found?)
            ├── content-publisher     → editorial-status.md (drafts, sent, scheduled)
            ├── affiliate-operator    → program-report.md (clicks, signups, revenue)
            ├── monetization-scout    → revenue-gap.md (target vs actual, by pathway)
            │
            ▼
        qa-reviewer ── reviews the aggregate for policy / source-of-truth
            │
            ▼
        orchestrator ── synthesizes into one Roel-facing weekly note
                          (≤ 400 words, top 3 actions for the week)
```

Artifact handoffs:
- Five branch reports, all written to `/workspace/.mavis/plans/plan_85a94215/workspace/weekly/`
- One synthesized `weekly-review.md` returned to Roel
- Top-3 actions queued as next-week tasks in the orchestrator's todo

The orchestrator's stop condition: Roel receives a single weekly note
that names what shipped, what drifted, what made money, and the three
actions for the coming week. Anything more than 400 words is a
failure of the synthesis.

---

## 4. On the MiniMax Agent desktop specifically

Wiring notes for the actual deployment. No fiction; everything here is
a primitive the desktop supports today.

- **Root session owner.** `orchestrator` owns the long-lived root
  session. Roel talks to `orchestrator` directly; `orchestrator` is
  the only agent Roel addresses by default. Specialists are
  implementable as separate `agent create` entries on the roster.
- **Branch spawning.** When a request needs a specialist, the
  orchestrator spawns a branch via the `communicate` tool with
  `spawn: { agent_name: "<specialist>" }` and passes the task as the
  first user message. Each branch returns a single artifact file path
  plus a one-paragraph summary; the orchestrator aggregates them.
- **Parallelism.** Pattern C (weekly review) uses five parallel
  branches. The orchestrator dispatches them in a single
  `communicate` block with multiple `spawn` calls, then waits.
- **Memory routing.** Three-question test applies:
  - Project-only lessons (e.g., "this studio's brand voice file lives
    at `assets/brand/voice.md`") → `AGENTS.md` in the project
    workspace.
  - Cross-project lessons (e.g., "always pair a content draft with a
    surface/length/language/CTA header before review") → agent
    memory in `~/.mavis/agents/<agent>/memory/MEMORY.md`.
  - User-level lessons (e.g., "Roel prefers short replies, founder
    voice, NL/EN/FR aware") → user memory, with reason audit.
  - Task-scoped notes (e.g., "reviewer found 3 red lines on this
    campaign") → scratchpad in the plan workspace, never durable.
- **Cron usage.** Two recurring tasks, both owned by `orchestrator`:
  - **Weekly review** — Monday 09:00 Europe/Brussels. Spawns the
    five-branch review from pattern C.
  - **Drift watch** — Daily 08:00 Europe/Brussels. Spawns
    `brand-guardian` to scan the workspace for any "5D" string
    outside the exception list and to redline if found.
  All other agents are event-driven (spawned by the orchestrator on
  demand), not cron-driven, to keep the surface area small.
- **Decision rule for the orchestrator.** Before spawning any
  specialist, the orchestrator answers three questions in this order:
  1. Does the request touch more than one specialist's hands-off
     boundary? If yes, multi-agent.
  2. Does the request map to a single owned responsibility? If yes,
     one agent, no branching.
  3. Is the request ambiguous? If yes, ask Roel one clarifying
     question; do not spawn until answered.
  The default is "one agent, no branch". Branching is the exception,
  not the rule.
- **Workspace layout.** Shared artifacts live under
  `/workspace/.mavis/plans/<plan_id>/workspace/` with the convention
  `weekly/`, `campaigns/`, `engine/`, `brand/`, `revenue/`. Each
  branch writes to its domain folder and returns the file path. The
  orchestrator never writes domain artifacts itself; it only writes
  to the synthesized `weekly-review.md` and the per-request reply.
- **Failure handling.** If a branch returns RED from `qa-reviewer` or
  returns no artifact within its stop-condition window, the
  orchestrator retries once with the previous thread as context, then
  escalates to Roel with a one-paragraph summary of what blocked.
  No silent retries beyond two.

---

## Open questions

- The exact cron schedule and timezone for the daily drift watch
  should be confirmed with Roel (default above is a proposal, not a
  decision).
- Whether `affiliate-operator` and `monetization-scout` should remain
  two agents or merge into one `revenue-operator` is a design call
  Roel can make once the first campaign lands. Current split is
  strategy (scout) vs. execution (operator).
- Section 2 will name the Rulio Engine's actual stack; this section
  intentionally does not, since the engine spec owns that surface.
- The brand-voice snippet referenced in every system prompt is a
  short pull from [roeljanssens.space.minimax.io](https://roeljanssens.space.minimax.io)
  and should be versioned alongside the agent definitions, not
  hard-coded inside them.

---

## 4. Section 2 — Rulio Engine product & technical spec

> Framing: this is the spec the `rulio-engine-builder` agent implements. The product is a *session engine* for the frequency space, not a track store and not a tone calculator. Differentiation: adaptive phase ramps, layering UI, Enerqi AI coach overlay, non-medical framing, affiliate hooks. 4-week build, public launch in week 6.

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

---

## 5. Section 3 — 5D → Rulio rebrand execution plan

> Framing: this is the migration matrix the `brand-guardian` and `content-publisher` agents execute in weeks 1–4. 18 surfaces audited, 26 migration rows, hard cut with a 12-month deprecation tail. Section 4's ebook, Studio, and content pathways cannot launch until this section's week 1 and week 2 work lands.

# Section 3 — 5D → Rulio rebrand execution plan

**Scope:** Migrate Roel Janssens's personal brand, studio, and product portfolio from
"5D Masters / 5DEnerQi / Qi5D" to "Rulio" as the primary name, with EnerQi and Qi kept
as product-line / channel sub-brands where they add value.

**Source of truth for current state:** the canonical portfolio surface at
`roeljanssens.space.minimax.io`, cross-checked against `ruul-it.vercel.app` (already on
"Rulio"), `www.qi5d.eu/` (Cloudflare-fronted), `www.enerqimasters.com/` (Vite SPA, no
"5D" in DOM), and `5dmasters.com` (currently 404 — see §4).

**Position:** This is a **hard rename with a 90-day soft-coexistence tail.** "Rulio" is
the only primary name in market from day one; "5D" survives only where it preserves
SEO equity or contractual references, and every retained mention carries a deprecation
stamp.

---

## 1. Naming rules

Opinionated, non-negotiable. Every agent in section 1 and every operator on the team
applies these verbatim. If a rule doesn't cover a case, escalate to the
`brand-guardian` agent — do not improvise.

| # | Rule | Before | After | Rationale |
|---|------|--------|-------|-----------|
| 1 | **Studio name** | 5D Masters | **Rulio Studio** (drop "Masters" suffix entirely) | "Masters" is gendered-tinged, mystical, and now redundant — "Rulio" is the whole brand. |
| 2 | **Personal brand prefix** | "5D Roel", "5D Janssens" | **Rulio** (bare) or **Roel Janssens · Rulio** | "5D" as a personal prefix is dropped. The person is the brand, the studio is the wrapper. |
| 3 | **EnerQi product line** | 5DEnerQi | **Rulio EnerQi** (or "EnerQi" once context is established) | EnerQi is a real product line with a coach, an app, and a healing pack — keep it; demote "5D" to prefix. |
| 4 | **Qi channel / ebook funnel** | Qi5D, "the Qi5D ebook" | **Rulio Qi** | "Qi" stays (it's the channel theme), "5D" is dropped. Domain target: `qi.rulio.io` (see §4). |
| 5 | **Framework name** | "The 5D Philosophy" / "5D framework" (Define / Design / Develop / Digital / Dominate) | **The RULIO code** (Rule / Learn / Master) | The 5-step framework becomes the RULIO code (3 verbs). The 5D dimension labels (1D–5D) inside the framework collapse to the 3 verbs. The hero quote is already half-renamed ("The RULIO code · Brussels") — finish the job. |
| 6 | **Service line item** | "Full brand elevation (5D)" (in the contact form `<select>`) | **"Full brand elevation (RULIO method)"** | Internal naming consistency: the form option must match the framework. |
| 7 | **Email addresses** | `elevateyourbrand@5dmasters.com` | **`hello@rulio.io`** (primary) + keep `elevateyourbrand@5dmasters.com` as a forwarding alias for 12 months | Email is the highest-trust surface — switch the printed address immediately, keep the old one alive as an alias so existing clients and back-links don't bounce. |
| 8 | **Domains** | `5dmasters.com` (404 today), `enerqimasters.com` (DNS), `qi5d.eu` | `5dmasters.com` → **301 → `rulio.io/studio`** for 24 months. `enerqimasters.com` → **301 → `rulio.io/enerqi`**. `qi5d.eu` → **301 → `rulio.io/qi`** | Preserve SEO juice on every external link, but the landing page is the new canonical home. See §4. |
| 9 | **Social handles** | `@5dmasters`, `@5denerqi`, `@qi5d` (whatever exists) | **`@rulio`** everywhere it can be claimed; legacy handles become auto-redirected cross-posts for 6 months, then archived | One handle, one brand. The shorter the better; "rulio" is also less likely to collide on TikTok/Threads/X. |
| 10 | **File names in `assets/`** | `5d-masters-logo.jpg`, `5d-healing-pack.jpg`, `5d-masters-linkedin.jpg`, `promo-5dmasters.mp4`, `vertical-5dmasters-v2-poster.jpg`, `logo-5denerqi.jpg` | **Rename to `rulio-*` siblings.** Keep the old files in a `/legacy/` subfolder for 90 days so the lightbox doesn't 404 on archive pages | File names are indexed by Google Images — renaming is part of the SEO plan, not just housekeeping. |
| 11 | **Trademark exposure** | "5D Masters" appears in <title>, og:site_name, og:image:alt, twitter:image:alt, footer copyright, contact form select option, and 4 visible body headings | **Zero of the above** in the new build. Trademark signal in copy ("the 5D Masters ecosystem" CTA) replaced with "the Rulio studio" | The brand is "Rulio". "5D" stops appearing anywhere a crawler, a screen reader, or a journalist will read it as a brand. |
| 12 | **Existing backlinks & mentions** | Inbound links, podcast intros, guest posts, ebook PDF, app store descriptions | **Do NOT mass-edit.** Add a one-line "Now Rulio" footnote to the ebook PDF and the podcast bio; leave backlinks alone (they pass PageRank as-is, redirects handle 301s) | Backlinks are equity. Mass-editing them burns trust signals and risks looking like spam. |
| 13 | **API / product code** | `5DEnerQi` / `Qi5D` as identifiers in code or filenames that downstream tools depend on | **Internal code only.** Public API surface and user-facing strings use the new names | Engineering hygiene is internal; users don't see package names. |

**Forbidden in copy after the cutover:** "5D Masters", "the 5D ecosystem", "5D
Philosophy", "5D framework", "5DEnerQi" (as a unit), "Qi5D" (as a unit), "1D / 2D / 3D
/ 4D / 5D" as dimension labels in the framework section.

**Still allowed, on purpose, in two places only:** (a) the `legacy/` subfolder of
`assets/` (file-system only, not linked from the new nav), (b) the deprecation notice
paragraph on `rulio.io/legacy/5d-masters` (see §4).

---

## 2. Surface audit

The audit is grounded in the canonical portfolio at `roeljanssens.space.minimax.io`,
which is the highest-authority surface (it's the one Roel controls end-to-end and it
links to every other surface below). Every "current state" line below is the literal
text or path observed in that page or on the live URL.

| # | Surface | URL / handle | Current state (literal) | Target state (Rulio) | Effort | Risk |
|---|---------|--------------|------------------------|----------------------|--------|------|
| 1 | **Canonical portfolio** (highest authority) | `roeljanssens.space.minimax.io` | `<title>` ends with "· 5D Masters"; `og:site_name` = "Roel Janssens · 5D Masters"; `<link rel="canonical">` = `https://5dmasters.com`; keywords include "5D Masters"; hero quote figcaption partially says "The RULIO code · Brussels"; nav `alt="5D Masters"` on sphere; section tag "No. 01 — The 5D Philosophy"; approach section "The 5D framework."; footer "© 2026 Janssens Roel · 5D Masters · RULIO"; select option "Full brand elevation (5D)"; 4 alt-texts reference "5D Masters", "5DEnerQi", "5D EnerQi", "Qi5D"; 6 asset filenames start with `5d-` or contain `5denerqi`. | `<title>` ends with "· Rulio"; `og:site_name` = "Roel Janssens · Rulio"; canonical → `https://rulio.io`; "The RULIO code" consistent everywhere; section tag "No. 01 — The RULIO code"; approach section "The RULIO framework."; footer "© 2026 Roel Janssens · Rulio"; select option "Full brand elevation (RULIO method)"; 0 alt-texts reference "5D"; assets renamed to `rulio-*` siblings. | **L** | **high** (this is the source of truth; mistakes cascade to every Google result) |
| 2 | **Primary domain** | `5dmasters.com` (currently 404) | Self-signed cert today, plain Nginx 404 body when curled. `canonical` on the portfolio points here. | Renew cert, set 301 redirects to `rulio.io/studio`; preserve `/work`, `/about`, `/services` paths as `rulio.io/studio/work` etc.; post a `rulio.io/legacy/5d-masters` deprecation page. | **L** | **med** (backlink equity to preserve; current 404 already losing juice) |
| 3 | **Enerqi product site** | `www.enerqimasters.com/` (live Vite SPA "frequency-healing-coach") | Title "frequency-healing-coach"; no "5D" in current HTML. Linked from portfolio's selected work grid. | Title → "Rulio EnerQi — AI sound coach"; copy "5DEnerQi" → "Rulio EnerQi"; 301 `enerqimasters.com` → `rulio.io/enerqi`; meta og:brand = "Rulio". | **M** | **low** (no "5D" on the live page today — low rewrite surface) |
| 4 | **Ebook funnel** | `www.qi5d.eu/` (Cloudflare-fronted) | Domain carries "5D" in TLD-adjacent label; LinkedIn-style landing for the 9 Solfeggio Frequencies lead magnet. | New primary: `qi.rulio.io`; keep `qi5d.eu` domain registered for 24 months; 301 `qi5d.eu` → `qi.rulio.io`; rewrite PDF cover and lead-magnet copy to "Rulio Qi". | **M** | **med** (domain authority + ebook PDFs already in users' inboxes) |
| 5 | **Rulio Engine (live app)** | `ruul-it.vercel.app` | **Already on Rulio.** `<title> "Rulio - Fall Asleep Faster"`, `alt="Rulio logo"`, "© 2026 Rulio. Built for restless minds." | No rename needed; this is the model surface. Update only if the new Rulio wordmark ships (§5). | **S** | **low** |
| 6 | **Rulio Enerqi App** (sister app) | `tinyurl.com/RulioEnerqiApp` → Vercel deploy | TinyURL slug already says "Rulio" but app content still says "5D Enerqi flow with OpenAI chat" in the work-card copy. | Rewrite work-card copy on the portfolio; inside the app, replace "5D Enerqi" string in onboarding screen 2 and the splash `<title>` to "Rulio EnerQi". | **S** | **low** |
| 7 | **Rulio Gadgets AI affiliate** | `tinyurl.com/ruliogadgets` | Slug already "Rulio"; live surface is the affiliate landing. | No content rewrite needed; the new affiliate engine (section 4) inherits the Rulio brand natively. | **S** | **low** |
| 8 | **Smart Parking Columns (B2B)** | `tinyurl.com/rulioparkingcolumns` | Slug "Rulio"; copy is B2B product, not a 5D surface. | Out of scope. **Park** — see matrix. | **—** | **low** |
| 9 | **Spiritual Wendy (client work)** | `v0-virtualwendy.vercel.app` | No 5D in URL or visible copy today. | Out of scope. **Park** — different brand, do not contaminate. | **—** | **low** |
| 10 | **Orbitech (client work)** | `v0-orbitech.vercel.app` | No 5D in URL or visible copy today. | Out of scope. **Park** — different brand. | **—** | **low** |
| 11 | **LinkedIn (personal)** | `linkedin.com/in/roeljanss` (handle inferred from the canonical surface's "Network" row) | Headline and about-section almost certainly still mention "5D Masters" / "Digital Growth & Branding" framing. | Headline → "Founder · Rulio Studio · Brussels"; About → replace "5D Masters" with "Rulio Studio"; add "formerly 5D Masters" footnote (covers the backlink rule); experience entries: "5D Masters" → "Rulio Studio (formerly 5D Masters)" with date range preserved. | **M** | **med** (LinkedIn is a top-3 search result for "Roel Janssens") |
| 12 | **GitHub** | github.com → likely `roeljanss` or `rulio` org | May have `5d-*` repo names or `5dmasters` in profile. | Profile bio: drop "5D"; rename `5d-masters-site` → `rulio-portfolio` (keep history via GitHub's redirect on rename); create a `rulio` org and migrate public repos there. | **M** | **low** (GitHub auto-redirects on repo rename; no SEO impact) |
| 13 | **Email signatures (every outbound mail)** | Mutt/Apple Mail/whatever Roel uses today; current sig line: "Roel Janssens · 5D Masters" | Default sig on all email clients. | New sig: `Roel Janssens — Founder, Rulio Studio` + `rulio.io` + `hello@rulio.io`. Update Gmail/Apple Mail web signature in 2 places. | **S** | **med** (highest-trust surface; gets copied into every reply) |
| 14 | **Studio reel (video file)** | `assets/visuals/promo-5dmasters.mp4` + poster `assets/visuals/promo-5dmasters-poster.jpg` + vertical cut `assets/visuals/vertical-5dmasters-v2-poster.jpg` | Reel opens and closes on the "5D Masters" wordmark and a voiceover that says "5D Masters — How a brand gets built." | Cut a new reel master from the existing project files (Premiere/After Effects); replace end card wordmark; new MP4 saved as `assets/visuals/promo-rulio.mp4`; re-encode the vertical cut. **Do NOT mass-replace filenames** in `assets/visuals/` until §3 matrix says so. | **L** | **high** (the reel is a hero asset; the old one is referenced from <video> tags and the lightbox) |
| 15 | **App store listings** (if/when Rulio Engine ships) | App Store + Google Play | Listings TBD; will need to be filed with the Rulio name on first submission. | File under publisher "Rulio BV" / "Rulio Studio" with the wordmark asset from §5. | **M** | **med** (app store names are sticky; renaming after launch requires a new SKU) |
| 16 | **Podcast guest bios** | Any past appearances (YouTube clips, podcast episode pages) | Episode descriptions written by hosts still say "5D Masters" or "Roel from 5D". | Do **not** edit hosts' pages. Reply to any inbound "who's Roel" question with the 1-sentence line: "I run Rulio Studio, formerly 5D Masters." | **S** | **low** (out of our control; cost is zero if we don't try) |
| 17 | **Asset library on the portfolio** | `assets/branding/icon-512.png` labelled "5D Masters — App Icon"; `assets/branding/logo-5denerqi.jpg`; `assets/branding/freq-audio-poster.jpg`; `assets/visuals/5d-masters-logo.jpg`; `assets/visuals/5d-masters-linkedin.jpg`; `assets/visuals/5d-healing-pack.jpg`; `assets/visuals/enerqi-banner.jpg` (alt: "5D EnerQi wellness banner"); `assets/visuals/promo-5dmasters-poster.jpg` | 8 files with "5D" in the filename, alt, or both; 1 of them (the app icon) is a brand mark, the rest are content cards. | Rename the brand-mark file `assets/branding/icon-512.png` → `assets/branding/icon-rulio-512.png` and replace the PNG; rename the 7 content cards to `rulio-*` siblings and move originals to `assets/legacy/5d-2025/`. | **L** | **med** (Google Images ranks these; renaming without 301s = brief ranking drop) |
| 18 | **Email list / newsletter copy** | Subscriber list (size TBD) on whichever ESP | Past broadcasts reference "5D Masters" as sender name. | Add a one-line P.S. to the next broadcast: "Quick note — 5D Masters is now Rulio. Same person, same studio, sharper name." Tag the broadcast as `rebrand-2026-07` in the ESP. | **S** | **low** (warm list; one-touch is enough) |

**Counts:** 18 surfaces audited, 5 marked **Park** (B2B + two client brands + the
podcast tier), 13 in active migration.

**Out of audit (deliberately):** third-party directories, Crunchbase, GitHub topic
pages, Behance/Dribbble if any, and the Vercel deploy dashboard — these will resolve
themselves once the portfolio and `rulio.io` are updated and the 301s are in place.

---

## 3. Migration matrix

Grouped by week, real table (not bullets). Owner column uses the agent names defined in
**Section 1 — Agent team architecture**; the `Roel` row is reserved for actions only
he can do (LinkedIn profile, real-money DNS, app store submissions).

### Week 1 — shut off the "5D" brand on surfaces Roel controls

| # | Surface | Current | Target | Owner | ETA | Risk |
|---|---------|---------|--------|-------|-----|------|
| W1-1 | Canonical portfolio `roeljanssens.space.minimax.io` | `<title>`, `og:site_name`, `og:url`, `<meta name="keywords">`, hero `figcaption`, philosophy `section-tag`, approach heading, footer copyright, `<select>` option, 4 alt-texts | All "5D" → "Rulio" via direct string replacement in the 5 HTML files (index.html, about copy, philosophy section, approach section, footer); new wordmark PNG swapped in nav + footer + preloader | `content-publisher` + `brand-guardian` review | **Day 3** | high |
| W1-2 | Primary domain `5dmasters.com` | Self-signed cert, Nginx 404 | Renew Let's Encrypt cert; set `server { return 301 https://rulio.io/studio$request_uri; }` in nginx for all paths; deploy `rulio.io/legacy/5d-masters` deprecation page | `orchestrator` (DNS + nginx) | **Day 2** | med |
| W1-3 | Email signature | "Roel Janssens · 5D Masters" on every outbound mail | New sig: `Roel Janssens — Founder, Rulio Studio` + `rulio.io` + `hello@rulio.io`. Update Apple Mail and Gmail web signature. | `Roel` | **Day 1** | med |
| W1-4 | LinkedIn personal profile (`linkedin.com/in/roeljanss`) | Headline + About + Experience still mention "5D Masters" | Headline "Founder · Rulio Studio · Brussels"; About replaces "5D Masters" → "Rulio Studio"; Experience entry "5D Masters" → "Rulio Studio (formerly 5D Masters)" with date range preserved; add a Featured post linking to the announcement (W1-8) | `Roel` | **Day 4** | med |
| W1-5 | `elevateyourbrand@5dmasters.com` (email alias) | Active inbox today | Set up `hello@rulio.io` as primary; forward `elevateyourbrand@5dmasters.com` → `hello@rulio.io` for 12 months; update SPF/DKIM records on `5dmasters.com` so forwarded mail doesn't get flagged as spoof | `orchestrator` (DNS) + `Roel` (mailbox) | **Day 2** | med |
| W1-6 | Asset library — `assets/branding/icon-512.png` | "5D Masters" app-icon PNG | Replace with `assets/branding/icon-rulio-512.png` (Rulio wordmark, sphere mark preserved); update the favicon set (16/32/48/64/96/128/192/256/512) using the same source; update `apple-touch-icon.png` and `og-image.jpg` | `brand-guardian` | **Day 3** | med |
| W1-7 | Newsletter / email list | Past broadcasts use "5D Masters" as sender | Send one broadcast tagged `rebrand-2026-07` with the 1-line note from §6 (full draft below); update ESP sender name to "Roel from Rulio" | `content-publisher` + `Roel` (send permission) | **Day 5** | low |
| W1-8 | LinkedIn announcement post | n/a | Publish the 100–150 word post from §6 with the canonical portfolio URL as the link | `content-publisher` drafts, `Roel` posts | **Day 5** | low |

**Week 1 exit criteria:** grep `5D` on `roeljanssens.space.minimax.io` returns zero
matches in the rendered DOM (excluding `assets/legacy/`). `5dmasters.com` 301s to
`rulio.io/studio` from at least 3 sample paths. `linkedin.com/in/roeljanss` shows
"Rulio Studio" in the headline.

### Week 2 — ship product-side renames

| # | Surface | Current | Target | Owner | ETA | Risk |
|---|---------|---------|--------|-------|-----|------|
| W2-1 | `www.enerqimasters.com/` (live SPA) | `<title>frequency-healing-coach</title>`; no 5D in DOM today | `<title>Rulio EnerQi — AI sound coach</title>`; add meta `og:brand=Rulio`; update in-app copy "5D EnerQi" → "Rulio EnerQi" in onboarding screen 2 and splash; set `enerqimasters.com` 301 → `rulio.io/enerqi` | `rulio-engine-builder` | **Day 8** | low |
| W2-2 | Ebook funnel `www.qi5d.eu/` | Domain "qi5d" visible in URL; lead-magnet PDF cover says "Qi5D" | Add `rulio.io/qi` as canonical; 301 `qi5d.eu` → `rulio.io/qi` (preserve path); re-export lead-magnet PDF with "Rulio Qi" cover (keep content unchanged); update the email-nurture sequence in the ESP to reference "Rulio Qi" not "Qi5D" | `affiliate-operator` + `content-publisher` | **Day 9** | med |
| W2-3 | Rulio Enerqi App (Vercel deploy, TinyURL `tinyurl.com/RulioEnerqiApp`) | Work-card copy on the portfolio says "5D Enerqi flow with OpenAI chat" | Rewrite the work-card copy in the portfolio's `index.html`; inside the app, find-and-replace "5D Enerqi" → "Rulio EnerQi" in `pages/onboarding-2.tsx` and `app/layout.tsx` `<title>` | `rulio-engine-builder` | **Day 8** | low |
| W2-4 | Studio reel `assets/visuals/promo-5dmasters.mp4` | End card + voiceover say "5D Masters" | Cut a new master from the project files: replace end-card wordmark, re-record voiceover line, re-export as `assets/visuals/promo-rulio.mp4`; re-encode the vertical cut as `assets/visuals/rulio-vertical-poster.jpg` + matching MP4; update `<video src>` and `<img alt>` on the portfolio | `brand-guardian` (asset) + `content-publisher` (publish) | **Day 10** | high |
| W2-5 | GitHub repos | Likely `5d-masters-site` and similar | Rename `5d-masters-site` → `rulio-portfolio` (GitHub redirects automatically); rename `5denerqi-app` → `rulio-enerqi`; create `rulio` org and migrate public repos; update profile bio: drop "5D" | `rulio-engine-builder` | **Day 10** | low |
| W2-6 | Portfolio lightbox — 7 content cards | 7 cards have alt-text or filename with "5D" | Rename files: `5d-masters-logo.jpg` → `rulio-studio-brand.jpg`, `5d-masters-linkedin.jpg` → `rulio-linkedin-showcase.jpg`, `5d-healing-pack.jpg` → `rulio-enerqi-healing-pack.jpg`, `enerqi-banner.jpg` alt → "Rulio EnerQi wellness banner", `promo-5dmasters-poster.jpg` → `promo-rulio-poster.jpg`, `vertical-5dmasters-v2-poster.jpg` → `rulio-vertical-v2-poster.jpg`, `logo-5denerqi.jpg` → `logo-rulio-enerqi.jpg`; move originals to `assets/legacy/5d-2025/` for 90 days | `content-publisher` | **Day 11** | med |

**Week 2 exit criteria:** every "5DEnerQi" / "5D EnerQi" string in the codebase and on
the live `enerqimasters.com` SPA is replaced. The studio reel `<video src>` on the portfolio points to the new MP4.

### Weeks 3–4 — long tail, app store prep, monitoring

| # | Surface | Current | Target | Owner | ETA | Risk |
|---|---------|---------|--------|-------|-----|------|
| W3-1 | Podcast guest bios (host-controlled) | Out of our control | Do not edit hosts' pages; reply to any inbound "who's Roel" question with the 1-sentence line. Track mentions with a weekly `brand-guardian` scan; polite-update only when a host is responsive. | `brand-guardian` | **Day 18** | low |
| W3-2 | App store listings (App Store + Google Play, when Rulio Engine ships) | TBD | File first submission under publisher "Rulio BV", with the wordmark from §5; do **not** mention "5D" anywhere in the listing copy. | `rulio-engine-builder` + `Roel` (signs the dev account) | **Day 22** | med |
| W3-3 | Existing inbound links (backlinks) | Out of our control | Do NOT mass-edit. Add `rulio.io/legacy/5d-masters` to the sitemap; confirm Google Search Console sees the 301s from §4; run a backlink audit (Ahrefs or Search Console) at Day 21 and flag any high-authority link that 301s to a 404 instead of `rulio.io/studio`. | `monetization-scout` | **Day 25** | low |
| W3-4 | Press kit / media kit | n/a today | Build `/press` page on `rulio.io` with: 1-paragraph bio (Rulio-first, "formerly 5D Masters" footnote), 3 logo lockups, 3 product screenshots, 1 brand fact-sheet PDF; send the kit to any host that asks. | `content-publisher` | **Day 24** | low |
| W3-5 | Crunchbase / Wikidata / GitHub topic pages | TBD; likely still say "5D" | Submit updates with the rename date 2026-07-XX; use the deprecation footnote language from rule #12. | `brand-guardian` | **Day 26** | low |
| W4-1 | Monitor Search Console for 404 spike | n/a | Watch the "5D" query bucket for 4 weeks; expect a 30–50% drop in impressions for "5D Masters" queries (those are now obsolete); impressions for "Rulio" should grow from 0 to a measurable baseline. Report weekly. | `monetization-scout` + `qa-reviewer` | **Day 28** | low |
| W4-2 | Retire the `assets/legacy/5d-2025/` folder | n/a | At Day 60, delete the folder. By Day 60 the lightbox no longer references the old files and the deprecation page at `rulio.io/legacy/5d-masters` is well-indexed. | `orchestrator` | **Day 60** | low |

### Park (do not migrate in this cycle)

| # | Surface | Reason for parking |
|---|---------|--------------------|
| P-1 | `tinyurl.com/rulioparkingcolumns` (Smart Parking Columns, B2B) | Different brand line (B2B aluminum product), already uses "Rulio" in the slug. No 5D exposure. |
| P-2 | `v0-virtualwendy.vercel.app` (Spiritual Wendy) | Client work, separate brand. Do not touch. |
| P-3 | `v0-orbitech.vercel.app` (Orbitech) | Client work, separate brand. Do not touch. |
| P-4 | `apple.com/fr/artist/rulio/1434079734` (third-party "Rulio" on Apple Music) | Unrelated musician; zero collision risk but document it so the `brand-guardian` doesn't conflate them. |
| P-5 | `rulio.co.uk` (The Rulio Group Ltd, Wigan UK) | Different company, same name. Trademark coexistence letter TBD; defer to legal review. |

**Total matrix rows:** 8 (W1) + 6 (W2) + 7 (W3–W4) + 5 (Park) = **26 rows** across
**18 surfaces**. The minimum 12-row requirement is satisfied in Week 1 alone.

---

## 4. SEO & redirect plan

### `5dmasters.com` — the only domain that carries real SEO equity

Today `5dmasters.com` is a self-signed-cert 404. That means every historical
backlink is already losing equity. The damage is reversible: a clean 301 + a
landing page recovers 70–90% of the link juice within 8–12 weeks. The plan:

**Nginx server block (Day 2, owned by `orchestrator`):**

```nginx
server {
  listen 443 ssl http2;
  server_name 5dmasters.com www.5dmasters.com;
  ssl_certificate     /etc/letsencrypt/live/5dmasters.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/5dmasters.com/privkey.pem;

  # Honor the original path so deep links survive
  location / {
    return 301 https://rulio.io/studio$request_uri;
  }
}

server {
  listen 80;
  server_name 5dmasters.com www.5dmasters.com;
  return 301 https://rulio.io/studio$request_uri;
}
```

**Path mapping** (all return 301, status code matters — 302 will leak equity):

| Old path on `5dmasters.com` | New path on `rulio.io` |
|------------------------------|------------------------|
| `/` (root) | `/studio` |
| `/work` (or any portfolio slug) | `/studio/work` |
| `/about` | `/studio/about` |
| `/services` | `/studio/services` |
| `/contact` | `/contact` (top-level, since it's a form, not a portfolio page) |
| Anything else | `/studio` (catch-all) |

**Deprecation page** at `rulio.io/legacy/5d-masters` (Day 3, `content-publisher`):

- H1: "5D Masters is now Rulio."
- One paragraph: "On 2026-07-XX, 5D Masters became Rulio Studio. Same founder
  (Roel Janssens, Brussels), same craft (brands, websites, apps, AI), sharper
  name. If you came here from an old link, [start at rulio.io →](/)."
- Footer: "© 2026 Rulio. This page exists only to receive traffic from old
  5D Masters links."

**What is preserved:**

- Every old URL → 301 to the closest equivalent (no 404s on inbound links).
- The `5dmasters.com` domain is **renewed for 24 months** at the registrar
  (auto-renew on, calendar reminder at month 18 to reassess).
- The `elevateyourbrand@5dmasters.com` mailbox is **kept as a forwarding alias
  for 12 months** so old email signatures and business cards don't bounce.
- The `5D Masters` YouTube/social-handle of any long-tail podcast mentions
  is left untouched (rule #12).

**What is allowed to 404:**

- Any `5dmasters.com/<random>` URL with no inbound links, after 90 days.
- Any Vercel preview URL (`*-5dmasters.vercel.app`) once the canonical
  portfolio is updated — let them lapse.
- Any cached page on archive.org pointing at the old reel URL — beyond our
  control, accept the loss.

### `qi5d.eu` and `enerqimasters.com`

Same 301 strategy. Both are younger and have less equity, so the recovery bar is
lower. The risk on `qi5d.eu` is that the PDF lead magnet is already in users'
inboxes — the PDF itself does NOT get the link rewritten (it's a file), but the
landing page and the email sequence do (Week 2, item W2-2).

### Keep both brands in market vs. hard cut?

**Position: hard cut, with a 12-month deprecation tail.** The cases for keeping
"5D Masters" alive in market:

- *SEO argument:* "5D" has some residual search volume. **Counter:** that
  volume is for the spiritual "5D" concept, not for Roel's studio. Chasing it
  would muddy the Rulio brand.
- *Brand recognition argument:* existing clients know "5D Masters". **Counter:**
  LinkedIn and email signature updates reach 100% of the warm list in Week 1;
  the rest is cold traffic, and cold traffic doesn't carry brand memory.
- *Inbound-link argument:* some podcast pages and guest posts still say "5D".
  **Counter:** rule #12 says do not mass-edit, and the 301s handle the rest.

The case for **soft coexistence** would be a holding-company structure where
"5D Masters BV" remains the legal entity and "Rulio" is a trading name. That is
a tax/legal question, not a brand question, and is out of scope for this section.
Defer to legal.

### When to revisit

- **Day 90** — review Search Console. If "5D Masters" impressions have not
  collapsed to < 5% of baseline, the redirects are leaking; re-audit.
- **Day 180** — if no inbound traffic on `5dmasters.com` for 60 consecutive
  days, drop the domain at the registrar and remove the nginx server block.
- **Day 365** — drop the `elevateyourbrand@5dmasters.com` forwarding alias.

---

## 5. Visual migration

### What carries over (do NOT redesign)

- **The sphere mark** (`assets/branding/sphere-logo-56.png`, `-80.png`,
  `-120.png`). It's the most-recognised asset, it's already on Rulio Engine
  (`ruul-it.vercel.app` uses the same sphere aesthetic), and the lightbox
  renders it in the preloader. Keep it pixel-for-pixel; only the wordmark
  beside it changes.
- **The cosmic dark palette.** `theme-color: #0c0c0e`, the cosmic background
  imagery (`assets/hero/cosmic-hero-bg.jpg`, `cosmic-mobile.jpg`,
  `cosmic-philosophy-bg.jpg`), the glass-card aesthetic, the `Fraunces /
  Inter / JetBrains Mono` font stack. None of this is brand-coupled to "5D".
- **The RULIO code framework** (Rule / Learn / Master) is already half-named
  on the canonical surface (the hero quote figcaption reads "The RULIO code
  · Brussels"). The other half — the 5D framework (Define / Design / Develop
  / Digital / Dominate) — collapses to the RULIO code.

### What gets replaced (concrete deltas)

Three specific asset deltas, in priority order:

1. **Wordmark PNG → Rulio wordmark** (owner: `brand-guardian`, Day 3):
   - **Delete** `assets/branding/icon-512.png` (currently the "5D Masters"
     app-icon labelled as such).
   - **Add** `assets/branding/icon-rulio-512.png` (Rulio wordmark + sphere
     mark, same dimensions 512×512, same dark background).
   - **Re-export** the favicon set
     (`favicon-16/32/48/64/96/128/192/256/512.png` and
     `apple-touch-icon.png`) from the same source so the icon set stays
     visually consistent.
   - **Re-export** `assets/branding/og-image.jpg` at 1200×630 with the
     Rulio wordmark instead of the "5D Masters" wordmark; this is the
     image every LinkedIn share renders.

2. **Nav sphere + wordmark text** (owner: `content-publisher`, Day 3):
   - **Edit** the nav block in `index.html`. The `<img
     src="assets/branding/sphere-logo-56.png" alt="5D Masters"
     class="logo-mark">` becomes `<img
     src="assets/branding/sphere-logo-56.png" alt="Rulio Studio"
     class="logo-mark">`. Sphere PNG stays; only `alt` and adjacent
     `<span class="nav-logo-text"><strong>Janssens Roel</strong>` text
     update (drop "· Digital Growth & Branding" subtitle, replace with
     "· Rulio Studio" — keeps the two-line nav treatment).

3. **Studio reel master** (owner: `brand-guardian`, Day 10):
   - **Edit** the After Effects / Premiere project that exports
     `assets/visuals/promo-5dmasters.mp4`. Replace the closing
     wordmark composition with the new Rulio wordmark + the line
     "Rulio Studio — How a brand gets built." Re-record the
     voiceover tail (one line). Re-render to
     `assets/visuals/promo-rulio.mp4` (same codec: H.264, 1920×1080,
     target bitrate 8 Mbps).
   - **Re-encode** the vertical cut
     (`assets/visuals/vertical-5dmasters-v2-poster.jpg` →
     `assets/visuals/rulio-vertical-v2-poster.jpg`, plus matching
     MP4 if a vertical MP4 exists).
   - **Update** the reel block in `index.html`: `<video … src=
     "assets/visuals/promo-5dmasters.mp4" poster=
     "assets/visuals/promo-5dmasters-poster.jpg">` → swap to
     `promo-rulio.mp4` + `promo-rulio-poster.jpg`; the
     `<span id="reelMetaTitle">5D Masters — How a brand gets
     built.</span>` and `<span id="reelMetaLinkText">Visit
     5dmasters.com</span>` strings become "Rulio Studio — How a
     brand gets built." and "Visit rulio.io".

### What is parked visually

- The `5DEnerQi` healing-pack cover (`assets/visuals/5d-healing-pack.jpg`) is
  the cover of a **shipped product** (Basic Frequency Healing Pack). Replacing
  the artwork on a product already in customers' hands is a packaging decision,
  not a rebrand decision. Move the file to `assets/legacy/5d-2025/` and do not
  re-render the cover in this cycle. New SKUs ship with Rulio EnerQi art.
- The Spiritual Wendy / Orbitech / EleonTex / Zoutplus / Whealthy Baby
  client-work logos and reels are **out of scope**. They live on the
  portfolio's "Brand Identity & Social Media" section to showcase range; they
  are not Roel's own brand. Do not rename their files.

---

## 6. Communication plan

### To existing clients (1:1 emails, Week 1)

Roel sends a 3-sentence personal email to every active client on Day 1, with the
template (he fills in the bracketed parts):

> Hi {first name},
> Quick heads-up — I've renamed the studio from **5D Masters** to **Rulio Studio**.
> Same scope, same contracts, same email (forwarded for the next year). Just a
> sharper name that fits where the work is going.
> — Roel

Subject line: "5D Masters → Rulio (same work, new name)."

### To the email list (broadcast, Day 5)

A 1-paragraph broadcast with the same content as the LinkedIn post below.
Tagged `rebrand-2026-07` in the ESP for analytics. Sender name updated to
"Roel from Rulio".

### To the audience (LinkedIn + cross-post, Day 5)

The 100–150 word announcement post, ready to publish:

> **5D Masters is now Rulio.**
>
> Same studio. Same scope. Same founder (me — Roel, in Brussels). New name.
>
> I started "5D Masters" in 2023 to bundle the digital growth, branding, and AI
> work I was doing for founders. Three years, nine shipped platforms, one
> flagship product (Rulio Engine) later — "5D" stopped describing the work.
> "Rulio" does. It sounds like what the studio actually does: take an idea,
> rule it, learn it, master it.
>
> The studio site, the EnerQi coach, the Qi funnel, the apps, the reels — all
> now live under Rulio. The old `5dmasters.com` links forward to the new home.
> Email signatures updated. LinkedIn updated. The sphere mark stays.
>
> If we've worked together, nothing changes except the name in your inbox.
> If we haven't — hello, I'm Roel. I build brands, websites, apps, and AI
> systems for founders who'd rather ship than slide. [rulio.io →](https://rulio.io)
>
> #rebrand #Rulio #Brussels

(Word count: **148 words.**)

### Internal (team Slack / WhatsApp, Day 0)

One message to the agent team and any human collaborators:

> From today, the studio is **Rulio**, not "5D Masters". Rules in
> `sections/section-rebrand.md` §1 are the source of truth. If you see me
> write "5D" anywhere, ping me. The `brand-guardian` agent will flag it
> in `qa-reviewer` outputs automatically.

---

## Open questions (escalate to `orchestrator` if blocked)

1. **Legal entity.** Is the current Belgian entity "5D Masters BV" being
   renamed to "Rulio BV", or does "5D Masters" remain the legal name with
   "Rulio" as a trading name? Affects footer copyright and the LinkedIn
   experience-entry wording. **Owner: Roel + accountant. Block on Day 2
   before the LinkedIn edit goes live.**
2. **`rulio.co.uk` collision** (Wigan, UK). Coexistence is plausible
   (different industries) but a polite heads-up email is cheap insurance.
   **Owner: Roel. By Day 5.**
3. **The 5D philosophy content** (the 1D/2D/3D/4D/5D dimension labels inside
   the glass cards — "1D", "2D · 3D", "4D · 5D") — is the visual
   treatment part of the brand or just a UI flourish? If it's brand,
   those dimension labels go too (replace with the 3 RULIO verbs: Rule /
   Learn / Master). If it's UI, they can stay as scene-setter numbers.
   **Owner: `brand-guardian` to make a call by Day 2.**

---

*End of section 3. Cross-references: this section depends on the agent-roster
defined in section 1 (for owner names like `brand-guardian`, `content-publisher`,
`orchestrator`); it influences the launch sequence in section 4 (the Rulio Engine
ship date must follow the canonical-portfolio rebrand by at least 7 days, so
the studio site doesn't link to a "5D Masters"-branded app).*

---

## 6. Section 4 — Multi-path monetization matrix

> Framing: this is the 9-pathway money map the `monetization-scout` and `affiliate-operator` agents own. Three High-Impact / Easy pathways put €500+ in the bank this week. The flagship Rulio Engine pathway ships in week 6 with the workshop funnel feeding SQLs to Studio retainers.

# Section 4 — Multi-path Monetization Matrix

> Author: General (producer) — for Roel Janssens, Rulio ecosystem
> Companion sections: section-agent-team.md (operating model), section-engine-spec.md (flagship product), section-rebrand.md (5D → Rulio migration)
> This section does **not** define the agent team or the engine spec. It is the money map: what gets sold, in what order, at what price, with a 90-day target, and what to watch out for.

---

## 1. Pathway inventory

Nine revenue pathways, covering all nine required categories. Each row is one bet — the rest of the section references these names.

| # | Pathway (name) | One-line description | Status | Primary metric | 90-day target | Dependencies |
|---|----------------|----------------------|--------|----------------|---------------|--------------|
| 1 | **Rulio App Portfolio** (Rulio Engine + Enerqi) | Subscription apps for adaptive audio (Engine) and AI energy coaching (Enerqi) | **Hybrid**: Enerqi is existing, Rulio Engine V1 ships in week 6 | MRR (Stripe + App Store) | **€2,100 MRR** combined (Rulio Engine €1,500 + Enerqi €600) | Section 2: Rulio Engine V1 ships by week 6; Stripe + Lemon Squeezy live; App Store / PWA listing with medical disclaimer |
| 2 | **Rulio Gadgets AI** (affiliate engine) | Curated AI-tools storefront at rulio-gadgets.* — commissions on click-through | **Existing** | Affiliate clicks + commission € | **3,000 clicks/mo, €450 commission over 90 days** | 20+ live product listings; SEO content cadence (1 blog post / week); disclosure policy published |
| 3 | **Rulio Qi Method** (digital product) | "Rulio Qi Method" ebook / mini-course (refactor of Qi5D) on Gumroad | **Existing** (requires rebrand per section 3) | Ebook units sold, gross revenue | **200 downloads × €19 = €3,800 gross** | Rebrand complete (Qi5D → Rulio Qi); Gumroad page live; checkout email sequence; warm-list blast of 500+ |
| 4 | **Rulio Workshop Funnel** (lead-gen funnel) | Free 90-min "Energy Reset" webinar → upsell to Rulio Studio retainer and Rulio Engine Pro | **New** | Registrations → show-up → SQL → closed clients | **4 workshops, 200 total registrants, 20% show-up, 6 SQLs, 2 closed at €2,000/mo = €4,000 MRR** | Email list ≥ 1,000; Zoom or StreamYard; registration page; 5-day pre-workshop email sequence; Calendly for SQL booking |
| 5 | **Smart Parking Columns** (B2B service) | IoT smart-parking column hardware + SaaS dashboard for municipalities and private operators | **Existing** | B2B deal value (ACV), pilots signed | **1 new pilot signed, €12,000 pilot contract** | Warm B2B pipeline from prior BD; 1 municipal RFP; hardware supplier agreement; demo environment |
| 6 | **Rulio Studio Retainer** (agency retainer) | Done-for-you "energy infrastructure" consulting for founders / leadership teams (rebrand of 5D Masters Studio) | **Existing** (rebrand per section 3) | Retainer value (clients × monthly fee) | **2 retainer clients × €2,000/mo = €4,000 MRR** | Case-study one-pagers (3); workshop funnel as SQL source; Roel's network of 50+ founder contacts |
| 7 | **Rulio Content** (content monetization) | Beehiiv newsletter ("Rulio Weekly") + YouTube long-form + Shorts — sponsored issues, affiliate inserts, lead magnet | **New** (formalize under Rulio brand) | Subscribers, sponsored issue revenue | **2,000 newsletter subs, 1,500 YouTube subs, 1 sponsored issue at €300** | 3×/week publishing cadence; YouTube channel rebrand (per section 3); 1-page media kit; 5 warm brand intros for sponsors |
| 8 | **YouTube AdSense + Podcast Ads** (ads) | Programmatic ads on Rulio YouTube channel + guest spots on wellness / founder podcasts | **New** (depends on #7) | CPM × views, guest-spot reach | **€150 from YouTube AdSense over 90 days** (small at this audience size; structural, not target) | 50+ videos shipped; monetization enabled at 1,000 subs + 4,000 watch hrs; podcast outreach list of 20 shows |
| 9 | **Rulio × Mindvalley-style Partnership** (partnership) | Co-marketing / distribution deal with an established player (Mindvalley, Endel, Brain.fm, Calm Business) | **New** | Signed LOIs, joint campaigns, referral revenue | **1 signed LOI, 1 co-branded lead magnet live** (revenue ≥ €0 in 90 days; the asset is the relationship) | Rulio Engine V1 with public landing page; 1-page partnership deck; 3 warm intros via Roel's network |

**Coverage check** — all 9 categories are represented:

- Subscription app → #1 Rulio App Portfolio
- Affiliate engine → #2 Rulio Gadgets AI
- Digital product → #3 Rulio Qi Method
- Lead-gen funnel → #4 Rulio Workshop Funnel
- B2B service → #5 Smart Parking Columns
- Agency retainer → #6 Rulio Studio Retainer
- Content monetization → #7 Rulio Content
- Partnership → #9 Rulio × Mindvalley-style Partnership
- Ads → #8 YouTube AdSense + Podcast Ads

**90-day combined target** (if all pathways land their number):

- Recurring MRR: **€2,100 (apps) + €4,000 (Studio) = €6,100 MRR**
- One-time / project: **€3,800 (ebook) + €450 (affiliate) + €12,000 (parking pilot) + €300 (sponsorship) + €150 (AdSense) = €16,700**
- **Total 90-day target: ~€22,800 + €6,100 MRR run-rate**

The €6,100 MRR is the number Roel should be able to defend at the 90-day review. The €22,800 one-time is what makes the quarter cash-positive.

---

## 2. Effort vs impact matrix

**Axes**
- **Impact** = expected 90-day euros (MRR contribution + one-time) at realistic conversion, **not** aspirational. Threshold: ≥ €3,000 = High; < €3,000 = Low.
- **Effort** = time-to-first-euro from today (week 0). **Easy** = first revenue / pipeline motion in ≤ 2 weeks; **Hard** = first revenue / pipeline motion > 2 weeks.

| Quadrant | Pathway | Reasoning (one sentence) |
|----------|---------|--------------------------|
| **High impact / Easy** (do these in weeks 1–2) | #3 Rulio Qi Method (ebook) | Already-built asset, just rebrands and re-prices — should be first dollar in the bank within 7 days. |
| | #1 Rulio App Portfolio — Enerqi side | Enerqi is already live; a 14-day free-trial push to an existing list is a one-week campaign. |
| | #6 Rulio Studio Retainer | The hardest part is closing, not building — if Roel DMs 10 warm ex-clients in week 1, two closings at €2,000/mo is in range. |
| **High impact / Hard** (invest months 1–3) | #1 Rulio App Portfolio — Rulio Engine side | Flagship product, but V1 ships week 6 and Pro tier monetization needs the workshop funnel behind it. |
| | #4 Rulio Workshop Funnel | Builds the SQL engine that powers both Rulio Engine and Studio, but needs 3 weeks of setup before the first workshop. |
| **Low impact / Easy** (do opportunistically) | #2 Rulio Gadgets AI | Already running, marginal effort to refresh listings, but €450 over 90 days is real but not transformative. |
| | #7 Rulio Content (newsletter + YT) | Cheap to start (a Substack + a YouTube account), but subscriber growth is the slow part — the value compounds past 90 days. |
| **Low impact / Hard** (deprioritize; park or prune) | #8 YouTube AdSense + Podcast Ads | Requires 50+ videos and 4,000 watch-hours before monetization unlocks; €150 in 90 days is structural seed, not target. |
| | #5 Smart Parking Columns | Real money (€12k pilot) but B2B hardware sales cycles are 60–180 days and dependent on external RFPs — pursue opportunistically, not as a 90-day bet. |
| | #9 Rulio × Mindvalley-style Partnership | Strategic value, but no revenue in 90 days even with a signed LOI; invest 4 hours/week, do not block on it. |

**Visual 2×2**

```
            HIGH IMPACT                LOW IMPACT
        ┌──────────────────────┬──────────────────────┐
  EASY  │ • Rulio Qi Ebook     │ • Rulio Gadgets AI   │
        │ • Enerqi App push    │ • Rulio Content      │
        │ • Rulio Studio       │   (newsletter + YT)  │
        │   Retainer           │                      │
        ├──────────────────────┼──────────────────────┤
  HARD  │ • Rulio Engine App   │ • YouTube AdSense    │
        │ • Rulio Workshop     │ • Smart Parking      │
        │   Funnel             │   Columns            │
        │                      │ • Mindvalley-style   │
        │                      │   Partnership        │
        └──────────────────────┴──────────────────────┘
```

**Operating rule** — every Monday morning, Roel picks the next 3 actions from the High-Impact cells first. The Low-Impact cells are tasks that happen *between* the High-Impact ones, not in place of them.

---

## 3. Sequenced rollout (90-day, week-by-week)

Format per week: **Action — pathway — measurable output**. Each week has 2–3 actions.

### Week 1 (Jul 15–21) — Foundation sprint
1. **Republish Qi5D ebook as "Rulio Qi Method"** on Gumroad at €19 — pathway #3 — *output: Gumroad page live, checkout tested, blast email drafted.*
2. **Open Stripe + Lemon Squeezy** for Rulio Engine pre-orders and Enerqi Pro — pathway #1 — *output: products created in Stripe, test-mode checkout working.*
3. **DM 10 ex-5D Masters clients** offering a free 30-min "Rulio Energy Audit" — pathway #6 (seed for #4) — *output: 10 DMs sent, target 5 replies, 3 booked calls.*

### Week 2 (Jul 22–28) — Quick-revenue push
1. **Send Qi ebook blast** to warm list (500+) — pathway #3 — *output: 30+ sales = €570+ in 7 days.*
2. **Launch Enerqi 14-day free trial** to email list — pathway #1 (Enerqi) — *output: 80 trial starts, target 25 → paid at €7.99 = €200 MRR lift.*
3. **Add 5 new affiliate products** to Rulio Gadgets AI store — pathway #2 — *output: 25 active listings, first 200 clicks.*

### Week 3 (Jul 29 – Aug 4) — Engine MVP build + content engine on
1. **Rulio Engine MVP: binaural-beat generator + 5 starter presets** — pathway #1 (Engine) — *output: web app running at rulio.app, 5 presets live, free tier enforced.*
2. **Send first issue of "Rulio Weekly"** newsletter — pathway #7 — *output: 200 subs (charter list), open rate ≥ 40%.*
3. **YouTube channel rebrand: "5D" → "Rulio"** per section 3 — pathway #7 (foundational) — *output: rebrand live, banner + avatar swapped, 3 video titles updated.*

### Week 4 (Aug 5–11) — Workshop funnel build
1. **Build "Energy Reset" workshop registration page** (Carrd or Vercel) — pathway #4 — *output: page live, Calendly embed, conversion-tracking pixel installed.*
2. **Run Qi ebook 5-day post-purchase email sequence** — pathway #3 — *output: ≥ 4-star reviews on 10%+ of sales, 1 testimonial captured for Studio one-pager.*
3. **Outreach to 1 warm Smart Parking contact** — pathway #5 — *output: 1 intro call booked, even if no close yet.*

### Week 5 (Aug 12–18) — First workshop + Engine beta
1. **Run workshop #1 "Energy Reset"** — pathway #4 — *output: 50 registrants, 10 show-ups, 1 SQL booked, 1 closed Studio retainer.*
2. **Open Rulio Engine closed beta** to 50 users from newsletter — pathway #1 (Engine) — *output: 50 beta signups, 5 bug reports, 1 case-study quote captured.*
3. **Pitch 3 brands for newsletter sponsorship** — pathway #7 — *output: 3 pitches sent, target 1 reply, 1 LOI for week 10.*

### Week 6 (Aug 19–25) — Engine soft launch
1. **Rulio Engine V1 web-app public launch** + free tier — pathway #1 (Engine) — *output: 200 free signups, Product Hunt submission live.*
2. **Run workshop #2** — pathway #4 — *output: 60 registrants, 12 show-ups, 2 SQLs, 1 closed.*
3. **Publish Rulio Engine case study** (Roel-as-user 7-day self-test) — pathway #7 + #1 — *output: 1,500-word post live, 500 views in 7 days.*

### Week 7 (Aug 26 – Sep 1) — Conversion push
1. **Promote Rulio Engine Pro €9.99 tier** to beta list + newsletter — pathway #1 (Engine) — *output: 30 Pro trials, target 12 → paid (€120 MRR).*
2. **Send Mindvalley / Endel partnership 1-pager** to 3 warm intros — pathway #9 — *output: 3 LOI requests out, 1 reply.*
3. **Run workshop #3** — pathway #4 — *output: 60 registrants, 1 closed Studio retainer (cumulative target: 2).*

### Week 8 (Sep 2–8) — Monetization review
1. **Audit MRR by pathway** in a 1-page dashboard — pathway *all* — *output: dashboard live, Rulio Engine €200 MRR, Enerqi €300 MRR, Studio €4,000 MRR.*
2. **Refine pricing** based on week 6–7 conversion data (test €7.99 vs €9.99 Pro) — pathway #1 — *output: A/B test running, ≥ 200 impressions per arm.*
3. **Workshop #4** — pathway #4 — *output: 60 registrants, 2 SQLs, even if no close this week.*

### Week 9 (Sep 9–15) — Studio push + podcast tour
1. **DM 5 new Studio prospects** from workshop funnel + LinkedIn — pathway #6 — *output: 5 DMs, target 2 calls, 1 closed.*
2. **Book 2 podcast guest spots** for the Rulio Engine story — pathway #8 — *output: 2 booking confirmations for Oct/Nov.*
3. **Publish "How binaural beats work" YouTube long-form** (10-min) — pathway #7 — *output: 1 video, 1,000 views in 14 days.*

### Week 10 (Sep 16–22) — Sponsorship + scale
1. **First sponsored newsletter issue** — pathway #7 — *output: €300 in revenue, 1 sponsor onboarded, 1,000-sub milestone.*
2. **Smart Parking Columns pilot proposal** drafted — pathway #5 — *output: 1 proposal sent to warm lead, 1 reply.*
3. **Rulio Engine preset library: +5 presets** (Sleep, Focus, Energy, Calm, Creativity) — pathway #1 — *output: 25 total presets, +20% Pro conversion expected.*

### Week 11 (Sep 23–29) — Partnership + cross-sell
1. **Mindvalley/Endel follow-up**; if warm, propose co-branded lead magnet — pathway #9 — *output: 1 signed LOI, 1 co-branded PDF designed.*
2. **Cross-sell: Rulio Engine Pro + Enerqi Pro bundle at €14.99/mo** (save €3) — pathway #1 — *output: bundle page live, 20 bundle trials started.*
3. **Workshop #5 (or "Office Hours" format)** — pathway #4 — *output: 40 attendees, 1 closed Studio client from cumulative funnel.*

### Week 12 (Sep 30 – Oct 6) — Quarter close
1. **90-day review: total MRR, total pipeline, top 3 lessons** — pathway *all* — *output: 1-page review doc, Rulio Engine + Enerqi + Studio MRR combined ≥ €6,100, Qi ebook ≥ 200 sales.*
2. **Rulio Engine V1.1: custom preset builder (Premium wedge)** — pathway #1 — *output: builder in beta, Premium tier €19.99 live with 5 founding users.*
3. **Q4 OKR planning** — *output: 1 page, targets for €10k MRR by day 180 and 4 new partnership LOIs.*

**Total actions across 12 weeks: 35** (3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 + 3). Each action has an owner (Roel) and a measurable output. The plan deliberately front-loads the High-Impact / Easy quadrant in weeks 1–2 to bank cash before the Rulio Engine launch in week 6.

---

## 4. Quick wins (this week, 7 days)

These are 5 actions Roel can take **Monday through Sunday this week** to generate revenue or pipeline. They are concrete enough to put on a calendar.

1. **DM 10 ex-5D Masters clients** with a 3-line message: *"I'm launching the Rulio Engine — a binaural-beat app I built from the work we did together. Can I give you a free 30-min 'Energy Audit' and early access?"* Target: **5 replies, 3 booked calls → seeds the Studio retainer pipeline (pathway #6) and validates workshop funnel demand (pathway #4).**

2. **Republish the Qi5D ebook as "Rulio Qi Method"** on Gumroad at €19 (per section 3 rebrand). Today: update the PDF cover and checkout page; tomorrow: blast the warm list of 500+ with a 48-hour launch discount at €12. Target: **30 sales this week = €360–€570 in 7 days (pathway #3).**

3. **Add 3 affiliate products to rulio-gadgets.*** today* — pick the top-converting from last quarter, refresh the descriptions, fix any broken affiliate links. Target: **100 clicks this week, 1 conversion (pathway #2).**

4. **Stand up the Rulio Engine landing page** at rulio.app with an email-capture form and a Stripe "Pro €9.99/mo" button in test mode. Don't ship the app — ship the *promise*. Send the link to the 10 DMs from action #1. Target: **20 free signups this week, 5 "notify me on launch" intents (pathway #1).**

5. **Send 5 personalized B2B pitches** to former Smart Parking Columns contacts with one sentence: *"We are re-launching the Smart Parking product under the Rulio brand. 30-min call to share the 2026 roadmap?"* Target: **1 reply, 1 booked call, no close needed this week — just re-ignite the channel (pathway #5).**

**Why these five, in this order:** actions 1, 2, and 4 are High-Impact / Easy (book revenue + pipeline within 7 days). Action 3 keeps a low-effort revenue stream warm. Action 5 is a low-yield 90-day bet but takes 90 minutes total and prevents a dormant channel from going cold.

---

## 5. Pricing experiments

Three tiers per app. Each tier is justified in one sentence. Bundle math is given at the end so Roel can defend the cross-sell.

### 5.1 Rulio Engine (flagship audio app)

| Tier | Price | Feature breakdown | Justification (one sentence) |
|------|-------|-------------------|------------------------------|
| **Free** | **€0** | 3 starter presets; 5-min sessions; 1 layer (binaural only, carrier + offset); watermarked mp3 export; 1 device. | Zero-friction entry that proves the core "this feels different" moment, with the single-layer cap being the structural nudge to Pro. |
| **Pro** | **€9.99/mo or €89/yr** | 25+ presets; 60-min sessions; 2 layers (binaural + solfeggio); AI coach preview (3 prompts/day); clean mp3 export; 3 devices. | A "habit" price (under €10) that unlocks the two-layer experience most users actually want, with the AI coach preview as a soft on-ramp to Premium. |
| **Premium** | **€19.99/mo or €189/yr** | Everything in Pro; 3 layers (binaural + solfeggio + ambient/noise); unlimited AI coach; clean WAV export; custom preset builder; offline mode; 5 devices; early access to V1.1 features. | A 2× Pro price for ~2× the surface area (an extra layer, an extra export format, an extra builder), where the *custom preset builder* is the creator-anchor that turns listeners into makers. |

### 5.2 Rulio Enerqi (AI energy coach app)

| Tier | Price | Feature breakdown | Justification (one sentence) |
|------|-------|-------------------|------------------------------|
| **Free** | **€0** | Daily 1-tap check-in; 1 pillar (Energy) tracked; basic 0–100 energy score; 7-day history. | Establishes the 5-pillar framework as a daily habit, with the multi-pillar paywall creating a natural reason to upgrade within 14 days. |
| **Pro** | **€7.99/mo or €79/yr** | All 5 pillars tracked (Energy, Sleep, Mood, Focus, Movement); weekly AI recommendations; full journal history; data export. | A just-below-the-Rulio-Engine price so the bundle math lands cleanly (see below), and the full framework is what most users actually need. |
| **Premium** | **€14.99/mo or €149/yr** | Everything in Pro; Enerqi Masters AI Coach (unlimited prompts); monthly 1:1 review (30-min video); beta features first. | Anchors the AI coach as the premium differentiator; the 1:1 review is the high-touch ceiling that supports the higher price without cannibalising Pro. |

### 5.3 Bundle pricing (cross-sell)

| Bundle | Price | Discount | Justification |
|--------|-------|----------|---------------|
| **Rulio Engine Pro + Enerqi Pro** | **€14.99/mo** (vs €17.98 standalone) | Save €3/mo (≈17%) | Below the Premium Engine price — the bundle feels like an obvious trade-up, and the AI coach preview in Engine Pro is the soft hand-off into Enerqi Pro. |
| **Rulio Engine Premium + Enerqi Premium** | **€29.99/mo** (vs €34.98 standalone) | Save €5/mo (≈14%) | Smaller percentage discount to avoid anchoring the standalone Premium tier downward; targets founders and creator-anchored power users. |

**Recommended launch price for week 6 public release of Rulio Engine V1**: **Pro at €9.99/mo with a 14-day free trial** (no card-or-card, but card-on-file with €1 auth that refunds). The 14-day free trial is the lever that gets the user past the "is this actually different from Brain.fm?" objection.

---

## 6. Risks

Four honest monetization risks, with mitigation and an owner.

| # | Risk | What goes wrong | Mitigation | Owner |
|---|------|-----------------|------------|-------|
| 1 | **Medical-claim compliance** | Binaural beats + solfeggio "healing frequencies" are not medical devices, but marketing language like "treats anxiety" or "heals insomnia" can violate EU Unfair Commercial Practices Directive and FTC Section 5 in the US. Worst case: app-store removal + ad-account ban. | All copy reviewed against a "no medical claim" checklist: avoid "treats / cures / heals / clinically proven"; require an explicit "not a medical device — not intended to diagnose or treat any condition" disclaimer on the App Store / Play Store / web checkout; legal review of the launch copy and any user testimonials before they go public. | `brand-guardian` agent + Roel sign-off |
| 2 | **App-store / platform dependency** | iOS App Store has historically rejected "frequency healing" apps, and Google Play has tightened wellness claims in 2024–2025. A rejection at launch costs 7–14 days of momentum. | Ship as a PWA first (week 6), pursue native iOS/Android only after the V1 web app proves retention; use conservative App Store copy ("audio wellness app, not a medical device"); have a 2-week buffer in the week 6–8 launch window. | `rulio-engine-builder` agent |
| 3 | **Affiliate-program TOS exposure** | Rulio Gadgets AI depends on Amazon Associates + 2–3 partner programs. Affiliate programs can claw back commissions on return rates, ban cloaked links, or terminate accounts for "incentivized clicks." Loss of one program = 20–40% of affiliate revenue gone overnight. | Disclose "#ad" / "affiliate" on every link (legally required anyway); rotate across 3 networks so no single partner exceeds 50% of affiliate revenue; cap any single product's commission share at 25% of the affiliate pot; monthly TOS compliance check. | `affiliate-operator` agent |
| 4 | **Subscription refund / chargeback rates** | A 14-day free trial with no card friction attracts abuse (multiple emails, stolen cards); refund rates > 5% trigger Stripe / payment-processor scrutiny and reserve holds. | Card-fingerprint + email-throttle on trials (one trial per email + per device fingerprint); €1 pre-auth that refunds (kills stolen-card casual abuse); monitor refund rate weekly with a kill threshold of 5% — if breached, shorten the trial to 7 days and require a phone-verification step. | `monetization-scout` agent + `qa-reviewer` weekly audit |

**Bonus risk to watch** (not in the 4 but worth flagging): the Rulio Qi ebook currently sits on a domain that contains "Qi5D" — until the rebrand is complete (section 3), the ebook's SEO juice lives on a name we are migrating away from. The week's 1–2 rebrand of the ebook to "Rulio Qi Method" is therefore not just a marketing task; it is a risk-mitigation task.

---

## Appendix — source references

- roeljanssens.space.minimax.io (canonical brand surface for the rename)
- rulio.app / ruul-it.vercel.app (Rulio Engine live prototype)
- enerqimasters.com (Rulio Enerqi AI coach)
- rulio-gadgets.* (Rulio Gadgets AI affiliate storefront)
- qi5d.eu → to be migrated to rulioqi.com (per section 3 rebrand)
- 5dmasters.com → to be redirected to rulio.studio (per section 3 rebrand)

> Cross-references: agents in `section-agent-team.md` own each pathway. The flagship product spec lives in `section-engine-spec.md`. The 5D → Rulio rename plan in `section-rebrand.md` is a hard dependency on pathways #1, #3, #6, and #7.

---

## 7. Cross-section synthesis

Where the four sections reinforce each other, where they conflict, and what the conflicts mean.

### 7.1 Reinforcements (the 4 sections are designed to interlock)

1. **The agent team is the operating system for everything else.** Section 1's 7 agents are the named owners of every action in Section 2 (engine), every migration row in Section 3 (rebrand), and every pathway in Section 4 (monetization). The Monday weekly review (Pattern C) is the *single* meeting that surfaces drift, revenue gap, and content pipeline — without it the other three sections decay into ad-hoc work. The reinforcement is structural: the team is the load-bearing wall.

2. **The rebrand unblocks monetization, in a specific order.** Section 3 Week 1 (canonical portfolio, email signature, LinkedIn, domain 301) is a hard prerequisite for Section 4 Week 1 (Qi ebook relaunch, "Rulio" branding on the sales page) and Week 2 (Enerqi free-trial push from the email list). If the rebrand slips a week, the ebook relaunch loses the LinkedIn announcement as a funnel — the "5D → Rulio" hook has to land the same week the offer goes out. Conversely, the Rulio Engine V1 launch in Section 2 Week 4 (public release) MUST follow the portfolio rebrand by at least 7 days — otherwise the studio site links to a "5D Masters"-branded app, which is a brand-coherence failure that `qa-reviewer` should block.

3. **The Rulio Engine is the 90-day centerpiece, not a 30-day centerpiece.** Section 2 specs a 4-week build; Section 4 plans the public launch in week 6. The 2-week gap is intentional: weeks 5–6 are the workshop funnel's first run (which builds the SQL engine for the engine itself) and the waitlist migration from the 1,247 ruul-it.vercel.app signups (which provides the launch-day demand spike). Without those 2 weeks, the engine ships to a cold audience.

4. **The workshop funnel is the connective tissue between Section 2 and Section 4.** Workshop #1 (week 5) feeds the first closed Studio retainer (pathway #6) and validates demand for Rulio Engine Pro. The Rulio Engine's V1 launch in week 6 then has 50+ warm workshop attendees to upsell, instead of relying on cold signups. The two products are not parallel — they are sequential and they feed each other.

### 7.2 Conflicts (where the sections disagree, and what to do)

1. **"5D" in the RULIO code framework (Rule / Learn / Master).** The portfolio currently has 1D/2D/3D/4D/5D dimension labels inside the glass cards (Section 3 §1 rule #5 says they collapse to the 3 RULIO verbs; but the visual section-tag still says "No. 01 — The RULIO code"). The Section 3 open question #3 explicitly flags this: are the dimension labels brand or UI? **Resolution:** treat them as brand (they reference "5D" in copy). `brand-guardian` replaces the glass-card dimension labels with the 3 verbs by Day 2 of the rebrand. If kept, they re-introduce the "5D" string that the `drift-watch` cron is hunting.

2. **Rebrand week 1 vs. Rulio Engine build week 1.** Section 2 Week 1 requires shipping a Vercel deploy, a Supabase migration, and the Web Audio engine — that's 5 days of `rulio-engine-builder` time. Section 3 Week 1 also requires `rulio-engine-builder` to ship the canonical portfolio rebrand on Day 3 (string-replace in HTML) and the `icon-rulio-512.png` on Day 3. Both land on Day 3. **Resolution:** portfolio rebrand is a 2-hour string-replace + favicon swap (smaller surface than the engine build), so it goes first on Day 3 morning; the engine deploy lands Day 3 afternoon. No conflict in practice; just sequence.

3. **Engine launch window vs. platform rejection risk.** Section 2 ships V1 in week 4 (build complete), but Section 4's public launch is week 6 because Section 4 §6 risk #2 flags App Store rejection as a 7–14 day delay. The engine is *publicly accessible* on rulio.app in week 4, but the *marketing push* (Product Hunt, paid ads, full newsletter blast) is week 6. **Resolution:** soft launch in week 4 to the waitlist + workshop funnel only; full launch in week 6. The orchestrator's Monday review tracks the soft-launch → full-launch conversion.

4. **Pricing experiment vs. brand voice.** Section 4 §5 proposes A/B testing €7.99 vs €9.99 for Rulio Engine Pro in week 8. Section 1's `brand-guardian` enforces "founder-led, evidence-led, no buzzwords, real numbers" voice — and a 30% price difference on the same product is a brand-coherence question, not just a conversion question. **Resolution:** the A/B test runs (data wins), but the test is for "new users only," and the brand surfaces all show €9.99 as the canonical price. Returning users see their original price. `brand-guardian` reviews the A/B copy before it goes live.

### 7.3 Open questions the synthesis surfaces

- **Legal entity rename** (Section 3 open question #1). The 30-day plan assumes "5D Masters BV → Rulio BV" is in flight, but if the Belgian entity keeps the old name, the LinkedIn Experience entry wording changes and the footer copyright line changes. **Owner: Roel + accountant. Deadline: Day 2.**
- **`rulio.co.uk` collision** (Section 3 open question #2). A UK "Rulio Group Ltd" already exists in Wigan. Trademark coexistence is plausible (different industries), but a polite heads-up email is cheap insurance. **Owner: Roel. Deadline: Day 5.**
- **Voice-clone of Roel for the AI coach** (Section 2 risk #7). The spec parks this for V2, but it is the single highest-leverage product feature if it ships. **Owner: Roel (consent) + legal. Deadline: before any marketing of V2.**

---

## 8. Risks and open questions

Top 5 risks across the four sections, ranked by impact × probability, with a named mitigation owner (an agent from Section 1 or Roel himself).

| # | Risk | Impact × probability | Owner | Mitigation |
|---|------|----------------------|-------|------------|
| 1 | **Medical-claim compliance** — the entire Rulio Engine and Enerqi app is built on a category (binaural beats, "healing frequencies") that the FTC, EU UCPD, and App Store have all actively cracked down on. One bad landing page or testimonial and the app is gone, the ad account is banned, or the payment processor holds funds. | High × Med | `brand-guardian` + Roel (sign-off) | Strict "no medical claim" copy checklist (avoid *treats / cures / heals / clinically proven*); explicit "not a medical device, not a treatment" disclaimer on every checkout, App Store / Play listing, and the landing page; legal review of launch copy + testimonials by an EU consumer-law freelancer (€500–€1,500). |
| 2 | **Rebrand breaks the launch funnel** — if the Week 1 portfolio rebrand slips, the Section 4 ebook relaunch and Enerqi free-trial push lose the LinkedIn announcement hook, and the Section 2 Rulio Engine launch in week 6 lands on a "5D Masters"-branded studio site (a coherence failure `qa-reviewer` will block). | High × Med | `orchestrator` (sequencing) | Treat the rebrand Week 1 as a hard dependency: nothing in Section 4 Week 1 (ebook, DMs, Stripe) launches until the portfolio + LinkedIn + email signature are confirmed. The orchestrator's Monday review tracks the dependency explicitly. |
| 3 | **Subscription refund / chargeback rate** — binaural-beat apps have 15–25% refund rates in industry data; > 5% triggers Stripe scrutiny and reserve holds. | Med × High | `monetization-scout` (modeling) + `qa-reviewer` (weekly audit) | 7-day *free* trial (no card up-front for the first cohort), €1 pre-auth that refunds on Pro upgrade, in-session drop-off telemetry, single "how is it going?" email at day 3 to pull refunds into a conversation before they become chargebacks. Kill threshold: 5% refund rate, shorten trial to 7 days + phone verification. |
| 4 | **Headphone-only constraint** — binaural beats are a stereo-separation effect; on a Bluetooth speaker they vanish. Users who play it on a speaker and feel cheated will refund and leave a 1-star review. | Med × High | `rulio-engine-builder` (UX) + `brand-guardian` (disclaimer copy) | Mandatory headphone-prompt modal on session start; "headphones recommended" badge on every session card; refund policy that explicitly excludes "didn't use headphones" claims; FAQ entry explaining why. |
| 5 | **Studio reel re-cut is high-effort, high-risk** — the studio reel (Section 3 W2-4) is a hero asset referenced from `<video>` tags and the lightbox. A bad re-export or a missed `<video src>` swap leaves the portfolio broken for everyone. | High × Low | `brand-guardian` (asset) + `qa-reviewer` (deploy) | Cut the new MP4 in week 2, but don't swap the `<video src>` until week 3. Two-week buffer between "the file exists" and "the portfolio points at it." `qa-reviewer` smoke-tests the portfolio on Chrome / Safari / Firefox after the swap. |

**Other open questions** (lower priority, all surfaced in their respective sections):

- Whether to merge `affiliate-operator` and `monetization-scout` into one `revenue-operator` after the first campaign lands (Section 1 open question).
- The exact cron timezone for the daily `drift-watch` scan (Section 1 open question).
- Whether to ship a user-generated preset marketplace at all, or stay curated (Section 2 risk #5).
- 528 Hz listening test on cheap DACs vs. high-end (Section 2 risk #6).
- Trademark coexistence with `rulio.co.uk` (Section 3 open question #2).

---

## 9. Appendix — sources

- [roeljanssens.space.minimax.io](https://roeljanssens.space.minimax.io) — canonical brand surface, source of truth for the studio's positioning, services, and current state.
- [ruul-it.vercel.app](https://ruul-it.vercel.app) — live Rulio Engine prototype (v0.1 "Adaptive Audio Engine", 1,247 waitlist signups at time of writing).
- [enerqimasters.com](https://enerqimasters.com) — Rulio Enerqi AI coach (live Vite SPA).
- [qi5d.eu](https://qi5d.eu) — 9 Solfeggio Frequencies lead-magnet funnel (to be migrated to `rulio.io/qi` per Section 3).
- [5dmasters.com](https://5dmasters.com) — primary domain (currently 404; to be 301'd to `rulio.io/studio` per Section 3).
- [tinyurl.com/ruliogadgets](https://tinyurl.com/ruliogadgets) — Rulio Gadgets AI affiliate storefront.
- [tinyurl.com/RulioEnerqiApp](https://tinyurl.com/RulioEnerqiApp) — Rulio Enerqi App (Vercel deploy).
- [tinyurl.com/rulioparkingcolumns](https://tinyurl.com/rulioparkingcolumns) — Smart Parking Columns (B2B, parked for this cycle).
- [v0-virtualwendy.vercel.app](https://v0-virtualwendy.vercel.app) — Spiritual Wendy (client work, parked).
- [v0-orbitech.vercel.app](https://v0-orbitech.vercel.app) — Orbitech (client work, parked).
- [linkedin.com/in/roeljanss](https://linkedin.com/in/roeljanss) — Roel's personal LinkedIn.

**Competitor research (Section 2 §1):**

- [frequencygenerator.com](https://frequencygenerator.com)
- [mynoise.net (Solfeggio generator)](https://mynoise.net/NoiseMachines/solfeggioTonesGenerator.php)
- [Brainwaves (imoblife / hz)](https://play.google.com/store/apps/details?id=com.project.rbxproject)
- [ZENmix](https://zenmix.io/binaural-beat-generator)

**Compiled by:** Mavis (Mavis root session, 2026-07-15) — from the four-section team plan delivered on `plan_85a94215`.

---

*End of report. The 30-day action plan in §2 is the page to print and execute. The 30-day exit criteria — Rulio Engine V1 public, 200+ free signups, 1+ paid Pro subscriber, €1,200+ banked from ebook + affiliate + Studio, agent team running on Monday-morning autopilot — are the four numbers to defend at the day-30 review.*
