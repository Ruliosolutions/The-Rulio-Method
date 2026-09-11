# Rulio — Product Hunt Launch Kit

> **Product:** Rulio — adaptive solfeggio audio for focus, sleep, and energy
> **Founder:** Roel Janssens, Brussels
> **Pricing:** €19/mo or €180/yr • 7-day free trial (no card) • 14 free sessions
> **Voice:** honest, founder-led, vulnerable, no buzzwords
> **Last revised:** 2026-09-08

---

## Table of contents

1. [When to launch](#when-to-launch)
2. [Asset checklist](#asset-checklist)
3. [Product Hunt listing copy](#1-product-hunt-listing-copy)
4. [Maker's first comment](#2-makers-first-comment)
5. [24h maker schedule](#3-24h-maker-schedule)
6. [Screenshot specs](#4-screenshot-specs)
7. [Common PH comments + replies](#5-common-ph-comments--suggested-replies)
8. [Twitter launch thread](#6-twitter-launch-thread)
9. [LinkedIn launch post](#7-linkedin-launch-post)
10. [Email list launch email](#8-email-list-launch-email)
11. [Post-launch 7-day plan](#post-launch-7-day-plan)
12. [Metrics to track](#metrics-to-track)
13. [What NOT to do](#what-not-to-do)
14. [Troubleshooting](#troubleshooting)
15. [Appendix: assets & quick reference](#appendix)

---

## When to launch

| Slot | Choice | Why |
|---|---|---|
| **Best day** | **Tuesday** | Product Hunt traffic peaks Tue–Thu. Most top-5 products of any given week launch Tuesday. |
| **Best time** | **12:01 AM PT** (Pacific Time) | PH's launch day runs midnight to midnight PT. Submitting at 00:01 PT puts you on the front page for the full 24h from the moment the day rolls over. |
| **Avoid** | Mondays (everyone's catching up), Fridays (low traffic, weekend drift), weekends (PH staff offline, low engagement), US/EU holidays (no one logs in) | Self-explanatory — ranking is engagement-driven, and engagement is volume-driven. |

### Why Tuesday specifically

- **Maker crowd is online.** Most PH makers and hunters check in Tuesday morning US time. You'll get eyeballs in the first 4 hours.
- **Compounding curve.** If you reach top 10 by 09:00 PT, the algorithm boosts you through the rest of the day.
- **Recovery day.** If something breaks Tuesday morning, you have 48 hours before Friday's traffic drop to fix it.

### Preparation timeline — 14 days before launch

| Day | Action | Why |
|---|---|---|
| **T-14d** | Pick the launch Tuesday. Lock it in your calendar. Block out 00:00–02:00 PT and 12:00–13:00 PT on launch day. | The schedule is non-negotiable. You cannot launch and then go to a meeting. |
| **T-12d** | Create a private Notion / doc to track everything in this kit. | One source of truth. |
| **T-10d** | Write the description, maker's comment, replies, and all social copy. (This file.) | Writing takes longer than you think. Do it now while you're not stressed. |
| **T-8d** | Take all screenshots in light + dark mode. | Screenshots are the #1 thing that fails to be ready on launch day. |
| **T-7d** | Pre-write the Twitter thread, LinkedIn post, and email in Typefully / Buffer / your ESP. | Scheduling the day-of is asking for typos at 00:30. |
| **T-5d** | Email 10 friends with a specific time slot each. | 10 upvotes in the first 3 hours is the magic number for top-10 ranking. |
| **T-4d** | Identify 3–5 Product Hunt hunters. Draft the hunter email. | Don't ask last-minute — hunters have queues. |
| **T-3d** | Submit the product via maker.producthunt.com. Schedule the launch for your chosen Tuesday. | PH lets you schedule up to ~7d out. |
| **T-2d** | Send the hunter email. Confirm 10 friends have their time slots. | Day-of confirmation = chaos. |
| **T-1d** | Full end-to-end test: rulio.app loads, /pro works, magic-link email arrives, free session plays, Stripe webhook is wired, account dashboard renders. | Find bugs when you have time to fix them. |
| **T-0** | Execute the 24h schedule below. | Go. |

### Hunter (optional but recommended)

A Product Hunt hunter is a top-1% user who "hunts" your product, which gives you a massive visibility boost. Email 3–5 of them 5–7 days before launch. Expect a 20–40% reply rate, and 5–15% conversion to a hunt.

**Who to email:**
- Hunters who have launched products in your category (Wellness, Productivity, Audio, Health)
- Hunters with a public email or a clear DM path
- Hunters who comment thoughtfully on similar products (search PH for "solfeggio", "meditation", "focus app", "binaural")

**Hunter email template:**

> **Subject:** Quick ask — could you hunt Rulio on Tuesday?
>
> Hi [Hunter name],
>
> I'm Roel, founder of Rulio — adaptive solfeggio audio for focus, sleep, and energy. We're launching on Product Hunt next Tuesday and I'd be honored if you'd consider hunting us.
>
> **The product:** a 5-minute audio practice built on solfeggio frequencies (174, 285, 396, 417, 528, 639, 741, 852, 963 Hz) with an AI coach that recommends the right frequency for what you need in the moment. 14 free sessions, no card, then €19/mo.
>
> **Why I think it fits your taste:** [one specific sentence — e.g., "I love how you champion honest, founder-led indie products" or "You seem to genuinely care about mental health tooling, not just productivity porn"].
>
> If you're open to it, here's the draft listing: [link to your PH draft]
>
> Totally understand if your schedule is full — either way, thanks for the work you do on PH.
>
> — Roel
> rulio.app

**Hunter follow-up if no reply in 48h:**

> Hi [name] — bumping this in case it got buried. Either way, no pressure and thanks for reading.

**Do not email more than twice.** Hunters are busy; pestering burns the bridge for next time.

---

## Asset checklist

- [ ] 4 screenshots taken (1279×800, light + dark mode)
- [ ] Optional 5th screenshot (affiliate dashboard) — only if you have real data to show
- [ ] Mobile screenshot of /account captured (375×812)
- [ ] Maker's first comment written and saved in clipboard manager
- [ ] Description copy finalized and pasted into the PH draft
- [ ] Twitter thread drafted and scheduled in Typefully / Buffer
- [ ] LinkedIn post drafted and scheduled
- [ ] Email blast drafted and scheduled in your ESP
- [ ] 10 friends pre-notified with specific time slots
- [ ] Tuesday 12:01 AM PT calendar reminder set
- [ ] Hunter email sent (optional, T-2d)
- [ ] PH draft submitted via maker.producthunt.com (T-3d)
- [ ] rulio.app/pro tested end-to-end (T-1d)
- [ ] 14-free-sessions flow tested on a fresh email
- [ ] Stripe webhook tested (test event 200 OK)
- [ ] Magic-link email arrives and is clickable
- [ ] Privacy policy and terms links work
- [ ] Reply templates saved in a notes file for fast copy-paste on launch day
- [ ] Slack/Discord personal channels pre-loaded with the launch links (so you don't scramble)
- [ ] Coffee / tea / water within arm's reach at 00:00 PT

---

# 1. Product Hunt listing copy

## Tagline (60 char max)

```
Adaptive solfeggio audio for focus, sleep, and energy.
```

*(54 characters — under the 60 limit.)*

### Alternative taglines (use only if you want to A/B test)

- `5-minute solfeggio audio for focus, sleep, and energy.` *(54 chars)*
- `Solfeggio frequencies that actually fit your day.` *(50 chars)*
- `A 5-min audio practice for focus, sleep, and energy.` *(53 chars)*

Pick **one**. PH lets you edit the tagline for the first 30 minutes after launch; after that, it's locked.

## Topics / Tags (5)

1. **Productivity**
2. **Health & Fitness**
3. **Wellness**
4. **Meditation**
5. **Audio**

PH allows up to 5 tags. We use all 5 to maximize the surfaces where Rulio shows up.

## Description (markdown, ~520 words)

### What is Rulio

Rulio is a 5-minute audio practice built on solfeggio frequencies. You pick a goal — focus, sleep, calm, or energy — and the player layers a single frequency (174, 285, 396, 417, 528, 639, 741, 852, or 963 Hz) with brown noise and a soft 432 Hz background. An AI coach watches how each session lands and recommends the next one. There are 14 free sessions to start, no card required.

### Why I built it

I burned out in 2023. I was running a small consulting business in Brussels, sleeping 4–5 hours a night, drinking too much coffee, and coping the way founders cope — by telling myself I'd rest next quarter. The crash was textbook: brain fog by 3 PM, chest tightness on the train, panic on Sunday nights. I tried Calm, Headspace, YouTube frequency videos, binaural beat apps. Most of them wanted 20–45 minutes I didn't have, or they were dressed up as wellness theater with no substance behind the sound.

The thing that actually worked was embarrassingly simple: a single solfeggio frequency in headphones for 5 minutes before deep work, and 10 minutes before bed. Not a meditation. Not a ritual. Just sound. After two weeks I was sleeping better. After six weeks my morning cortisol felt different. After three months I had a sustainable practice — the first one I hadn't abandoned by February.

That's the seed of Rulio. I just wanted a tool that got out of the way: no streak shaming, no 30-day challenges, no "transform your life" copy. Pick a frequency. Hit play. Done.

### What's different

- **5 minutes, not 30.** A session fits between meetings, before a focus block, or right before sleep. No setup, no onboarding flow.
- **14 free sessions, no card.** Try the full library before you decide. No email-gated "free trial" that wants your wallet.
- **€19/mo or €180/yr.** A single founder-built subscription. No upsells, no premium tier hiding the good stuff.
- **AI coach that adapts.** The coach recommends the next frequency based on what you've played and what you said you wanted. It's a recommender, not a chatbot.
- **Honest framing.** Rulio is a wellness tool, not a treatment. We say so on every page. If you have a clinical condition, please see a clinician — Rulio is a complement, not a substitute.

### The free tier

Forever free, no card, no expiry: 14 sessions across the 9 frequencies, the basic player, the AI coach with 5 recommendations per week, and the full account page. Enough to know whether it works for you. The free tier is the same product, not a demo — you'll use the same player, the same coach, the same audio engine. We just cap the number of sessions per month.

### Tech

Next.js 14 on Vercel (edge-compatible), Supabase for auth + Postgres (EU region), Stripe for billing, Resend for transactional email, PostHog (EU) for product analytics. 15 routes, all server-rendered or statically generated. The audio engine runs in the browser via the Web Audio API, so there is no server-side audio processing — frequencies are generated client-side from a base tone. Cold start to first session is under 1.5s on a 4G connection.

### What's next

A B2B white-label at **rulio-b2b.vercel.app** — same engine, your brand, your colors, your domain. For HR teams, therapist practices, yoga studios, and corporate wellness buyers who want a turnkey audio tool without building one. Beta is open; if you know anyone who'd want this, point them my way.

### Try it

👉 **rulio.app/pro** — 14 free sessions, no card, takes 30 seconds to start. If Rulio helps you the way it's helped me, I'd love to know.

---

# 2. Maker's first comment

> **Post this as a comment on your own listing the moment you hit submit.** PH shows maker comments prominently at the top of the comments section, and it's the first thing every visitor reads. Keep it honest. No sales pitch.

---

Hey hunters 👋

I'm Roel — I built Rulio in Brussels over the last few months, mostly nights and weekends while consulting. First time shipping a consumer product in public, so thanks for being here.

**The short story.** I burned out in 2023 — running a small business, sleeping 4 hours, the usual founder story. I tried every meditation and focus app on the market. The problem was always the same: they wanted 30 minutes I didn't have, or they were dressed up as wellness theater with no actual substance behind the sound. The thing that quietly fixed me was a single solfeggio frequency in headphones for 5 minutes before deep work and 10 minutes before bed. Embarrassingly simple. After three months I had a practice I hadn't abandoned.

Rulio is the tool I wished existed: 5-minute audio sessions, 9 solfeggio frequencies, brown noise, a soft 432 Hz bed, and an AI coach that recommends the next session based on what you said you wanted. 14 free sessions to start, no card.

**A few things I'd genuinely love feedback on:**

1. **The 5-minute framing.** Is "5 minutes" the right hook, or does it undersell? Honest answers only.
2. **The AI coach recommendations.** Right now it's a small recommender (5/wk on free, unlimited on paid). Is that useful or annoying?
3. **Pricing.** €19/mo feels fair for what's built, but I'm not married to it. If you think €9 or €14 makes more sense for the market, tell me why.

I'm around all day — reply, DM, email (roel@rulio.app), whatever. No sales pitch from me in the comments. If Rulio helps you, that's enough.

Try it: **rulio.app/pro** (14 free sessions, no card).

— Roel

---

# 3. 24h maker schedule

All times in **Pacific Time (PT)**. PH launch day runs 00:00–23:59 PT.

## T-24h (Monday 00:01 PT)

1. **Email 10 friends** — personal, one-on-one, no group CC. Ask each for a specific time slot (e.g., "could you upvote at 9 AM PT Tuesday?"). 10 upvotes in the first 3 hours is the magic number for breaking into the top 10.
2. **Post a soft teaser on Twitter** — "Tomorrow morning at 00:01 PT, Rulio is on Product Hunt. If you've been waiting for an excuse to try it, this is the excuse. 🧵" Pin this tweet.
3. **Post the same teaser on LinkedIn** — slightly longer, professional tone. Don't pin LinkedIn; it looks spammy.
4. **Schedule the Twitter thread** for 00:10 PT Tuesday (use Typefully or Buffer).
5. **Schedule the LinkedIn post** for 00:30 PT Tuesday.
6. **Schedule the email blast** for 06:00 PT Tuesday.
7. **Final tech check** — rulio.app loads, /pro works, magic-link email arrives, free session plays, Stripe webhook is wired. Run it once end-to-end with a fresh email.

**The 10-friend email template:**

> **Subject:** Tiny favor Tuesday morning?
>
> Hey [name],
>
> I'm launching Rulio — the audio practice I told you about — on Product Hunt this Tuesday at 00:01 PT (so technically Tuesday morning in EU).
>
> Could you do me a tiny favor? If you're up around **[9 AM PT / noon your time]**, click the link and upvote? It takes 10 seconds. No comment needed unless you actually try it and have something to say.
>
> https://www.producthunt.com/rulio
>
> If you do try it, the 14 free sessions are at rulio.app/pro (no card).
>
> Either way — thanks. Means a lot to ship this in public.
>
> — Roel

## T-0 — Tuesday 00:00 PT to 00:30 PT (minute-by-minute)

| Time (PT) | Action | Notes |
|---|---|---|
| **23:50 (Mon)** | Log into maker.producthunt.com. Have the maker's first comment in your clipboard. Have the 5-tweet thread one click from "post". | Don't scramble. |
| **00:00** | Hit "Launch" on the maker dashboard. The day starts. | Submit button is usually pre-armed if you scheduled T-3d. |
| **00:01** | Confirm your product is live on the front page. Screenshot it. | This is your T-0 trophy. |
| **00:02** | Post the Maker's First Comment (paste from clipboard). | First thing every visitor sees. |
| **00:05** | Reply to the first 2–3 comments from friends. Be warm, be specific. Use their first name. | Response time is the engagement signal. |
| **00:10** | Post Tweet 1 of the Twitter thread (scheduled). | Schedule should fire automatically. Verify it went up. |
| **00:15** | Reply to every new comment. Aim for <5 min response time for the first hour. | Set a timer if you have to. |
| **00:20** | Post the LinkedIn launch (scheduled). | Verify. |
| **00:25** | DM 3 of the friends who haven't upvoted yet. Polite, not pushy. | "Hey — did the link work? No worries either way 🙏" |
| **00:30** | First checkpoint: how many upvotes, comments, click-throughs? Adjust tone if needed. | Open the PH dashboard, screenshot the count. |

For the rest of the first hour (00:30–01:00), keep doing the same thing: **reply to every comment within 5 minutes**. The first hour sets the engagement rate, and engagement rate drives ranking. Don't go to sleep. Don't shower. Don't eat.

## T+1h to T+6h (01:00 – 06:00 PT)

- **Hourly check-in** — open the PH dashboard, count upvotes and comments, reply to anything new
- **01:00, 02:00, 03:00, 04:00, 05:00** — quick Twitter posts: "X upvotes in, top 5 of the day so far, thank you 🙏" (max 1 per hour, do not spam)
- **03:00** — short LinkedIn "mid-morning check-in" if you have signal to share (e.g., "3 hours in, top 10, thank you all")
- **06:00** — send the email blast to your list (Subject: "We just launched on Product Hunt")

## T+6h to T+12h (06:00 – 12:00 PT)

- **Reply to every comment** within 30 min (the curve slows down, so you can)
- **09:00** — second Twitter post: short thread of 2 tweets — what's free, what's paid, why I built it
- **10:00** — check in on top-of-day ranking. If you're in top 10, lean in. If you're in top 20, don't panic — most products peak around 14:00 PT.
- **11:00** — DM anyone who commented asking a real question. Personal replies convert to upvotes and trust.

## T+12h — Mid-day check (12:00 PT)

- **Mid-day Twitter post** — single tweet: "Halfway through the day on @ProductHunt. Thank you to everyone who's tried Rulio. If you haven't yet, 14 free sessions, no card: rulio.app/pro"
- **Reply to all comments since 06:00**
- **Post a story update on LinkedIn** — 2–3 sentences, "Halfway through the day, here's what's been interesting"
- **Refresh the affiliate dashboard** — check if any affiliates have shared
- **Coffee.** Real food. Step away from the screen for 15 min.

## T+18h — Evening push (18:00 PT)

- **Twitter post** — quick "8 hours left on PH" reminder, link
- **LinkedIn second post** — short, "If you've been on the fence, today is the day"
- **Reply to comments** as they come in
- **Post a short story on the founder side** — "It's 18:00 PT, here's the day so far: X upvotes, top Y of the day, [one specific thing a user said]"

## T+24h — End-of-day review (Wednesday 00:01 PT)

1. **Screenshot the final ranking** — product position, # of upvotes, # of comments
2. **Write a thank-you comment** on the PH listing — 3–4 sentences, genuine
3. **Post a thank-you tweet** — final tally, thank the hunters, link
4. **Send a personal thank-you email to your top 10 supporters** — no ask, just thanks
5. **Open a `launch-review.md`** — write down: final rank, # upvotes, # comments, click-through rate to rulio.app/pro, conversion free → paid if you can measure it, what surprised you, what you'd do differently next time
6. **Sleep.** You earned it.

---

# 4. Screenshot specs

All screenshots: **1279 × 800 px**, PNG, light mode by default. Capture dark mode too where it shows up well. The first image is the gallery cover — make it the strongest.

## Screenshot 1 — rulio.app/pro (landing / pricing)

- **URL:** rulio.app/pro
- **What to capture:** Above-the-fold: hero headline, the "14 free sessions, no card" line, the pricing table (€19/mo vs €180/yr), one CTA button visible. If you have a hero image or screenshot embedded, leave it visible.
- **Suggested caption:** "The /pro page — 14 free sessions, no card. €19/mo after."
- **Ideal dimensions:** 1279×800
- **File name:** `ph-01-pro-landing.png`
- **Capture mode:** Light mode first. Dark mode as backup.

## Screenshot 2 — Player running a session (rulio.app/qi)

- **URL:** rulio.app/qi (the player route)
- **What to capture:** Mid-session: a frequency name visible (e.g., "528 Hz — Transformation"), the play/pause control, a soft progress bar, the brown noise + tone visualizer if you have one. The audio waveform or frequency visualizer is a strong draw.
- **Suggested caption:** "5-min session in progress. 528 Hz, 432 Hz bed, brown noise. Headphones recommended."
- **Ideal dimensions:** 1279×800
- **File name:** `ph-02-player-running.png`

## Screenshot 3 — AI Coach recommending a frequency

- **URL:** rulio.app/qi or rulio.app/coach (whichever shows the AI coach panel)
- **What to capture:** The AI coach card open, showing a recommendation like "Try 396 Hz for tonight — you said you wanted to wind down" with a "Play this" button. Make sure the recommendation is the focal point.
- **Suggested caption:** "The AI coach. Picks the next session based on what you said you wanted."
- **Ideal dimensions:** 1279×800
- **File name:** `ph-03-ai-coach.png`

## Screenshot 4 — Account page

- **URL:** rulio.app/account
- **What to capture:** Account dashboard — sessions played this week, favorite frequency, subscription status (Free), the "Upgrade" CTA. **Also capture mobile (375×812)** — this is the one that goes in mobile placements and the "show app on phone" placements on PH.
- **Suggested caption:** "Account page — see your sessions, your favorite frequency, your plan."
- **Ideal dimensions:** 1279×800 (desktop) + 375×812 (mobile)
- **File name:** `ph-04-account.png` + `ph-04-account-mobile.png`

## Screenshot 5 (optional) — Affiliate dashboard

- **URL:** rulio.app/affiliate
- **What to capture:** The affiliate dashboard — your referral link, click count, conversion count, payout status. Only use this if you have real data to show (e.g., "12 clicks, 3 conversions in 7 days") — fabricated numbers get called out fast.
- **Suggested caption:** "Affiliate dashboard. Share your link, earn 30% recurring."
- **Ideal dimensions:** 1279×800
- **File name:** `ph-05-affiliate.png` *(only if you have a couple of real affiliate clicks to show)*

### Screenshot capture tips

- Use a real browser, not a design tool. PH visitors want to see the real product.
- Hide the browser chrome. Cmd+Shift+4 on Mac, full-screen on Windows, or use a tool like Cleanshot X / ShareX.
- Use a real email signup — don't fake the data. A demo account with "14 sessions played" looks weird.
- If you have light + dark modes, capture both. PH puts dark-mode screenshots at the top of the gallery for products that have them.
- The first image (gallery cover) is the most important — it should be **Screenshot 1** (the /pro page) because it's the most "marketing-y" and converts the most clicks.
- Use a 16:10 aspect ratio (1279×800) for desktop and 9:19.5 (375×812) for mobile. PH crops to roughly 1.6:1 for the gallery thumbnail.
- File size: keep each PNG under 500 KB. PH compresses anyway; bigger is just slower.

### Screenshot alt-text (for accessibility / SEO)

1. `Rulio pro pricing page showing 14 free sessions, no card, 19 euros per month`
2. `Rulio player running a 528 Hz session with brown noise background`
3. `Rulio AI coach recommending a frequency based on the user's stated goal`
4. `Rulio account dashboard showing weekly sessions, favorite frequency, and subscription status`
5. `Rulio affiliate dashboard showing referral link and conversion stats`

---

# 5. Common PH comments + suggested replies

Keep replies short (2–4 sentences), honest, no defensiveness. If you don't know an answer, say so. Sign your name on the first 3 replies; "— Roel" at the end is enough.

### "How is this different from Calm/Headspace?"

> Great question. Calm and Headspace are great for guided meditation — Rulio isn't meditation, it's a 5-minute audio practice built on solfeggio frequencies. The use case is different: not "I want to sit for 20 minutes and breathe," but "I want a 5-min reset before deep work or before bed." Also: 14 free sessions, no card, vs. their hard paywall. If you already love Calm, Rulio probably isn't for you — and that's okay.
>
> — Roel

### "Is this a treatment for anxiety?"

> No. Rulio is a wellness tool, not a medical treatment. We say so on every page. If you have clinical anxiety, depression, or any condition, please see a clinician — Rulio is a complement, not a substitute. The frequencies are not a clinically proven treatment for any condition, and we don't claim they are.

### "What's your business model?"

> Subscription. €19/mo or €180/yr after a 14-session free trial (no card). One founder-built product, one price, no upsells, no premium tier hiding the good stuff. The whole thing is built and run by me in Brussels.

### "Why €19/mo and not €9/mo?"

> €19/mo is what I need to keep building it full-time without outside funding. At €9/mo I'd have to take ads, sell data, or compromise on the no-card-free-tier promise. I'd rather charge a fair price and keep the product clean. If €19 is too steep, the 14 free sessions are forever — no expiry.

### "Are solfeggio frequencies real?"

> Honest answer: the original 1990s research paper that started the modern solfeggio craze was retracted in 2009. There's no peer-reviewed evidence that 528 Hz "transforms" you or 396 Hz "liberates" you. What I can tell you is that anecdotally, and in my own experience, a single tone in headphones for 5–10 minutes changes my headspace — not magic, but a useful nudge. We frame the frequencies as a tool, not a cure.

### "How do I try it?"

> rulio.app/pro — 14 free sessions, no card, takes 30 seconds to start. If you don't have a card to give, you don't have to. (The free tier never asks for one.)

### "Is this just binaural beats with extra steps?"

> Kind of, yes. Binaural beats need stereo headphones and a carrier frequency. Solfeggio frequencies are single tones — they work with any headphones, even a single earbud. The "extra step" is the AI coach and the framing (focus, sleep, calm, energy) instead of "Alpha waves at 10 Hz."

### "What about Spotify / YouTube / free frequency videos?"

> You can absolutely get the same audio for free on YouTube. What Rulio adds is: an AI coach that picks the right one for what you said you wanted, a clean player that doesn't fight you for attention, no ads, no autoplay to a 30-min compilation, and an account page that tracks what actually worked. If YouTube works for you, keep using YouTube.

### "Will you add [feature X]?"

> Tell me more. We have a public roadmap and I read every reply. If you're asking, someone else is probably asking too. → roel@rulio.app

### "Why Brussels? Why solo?"

> I live in Brussels. I'm a solo founder, which means slower shipping, no growth team, no marketing budget, and a product that doesn't lie to you. The tradeoff feels worth it.

### "Is this iOS / Android / desktop only?"

> Web app — works in any modern browser on desktop, iOS, Android, tablet. No app store download. The audio engine runs in the browser via the Web Audio API. The account page and player are mobile-first.

### "Do you have a refund policy?"

> Yes — if you pay and you don't like it, email me within 14 days and I'll refund you, no questions, no form to fill out. roel@rulio.app.

### "What about data / privacy?"

> Supabase EU (Frankfurt), PostHog EU, Resend US (transactional only). No audio is sent to a server — the frequencies are generated in your browser. We don't sell data. Privacy policy at rulio.app/privacy.

### "Is there a desktop app?"

> Not yet. The web app is the product — it's mobile-first and works offline once a session is loaded. A native desktop app is on the public roadmap but not scheduled. If you'd use one, tell me.

### "What languages are supported?"

> English only today. The interface and the AI coach. Multilingual support (FR/NL first, since I'm in Brussels) is on the roadmap.

### "Can I use this offline / on a plane?"

> Yes, partially. Once a session is loaded in the browser, you can play it without a connection. The AI coach recommendations need a connection.

### "Do you have a referral / affiliate program?"

> Yes — rulio.app/affiliate. 30% recurring for 12 months on any paid plan, paid monthly via Stripe. Anyone can sign up; no minimum.

### "Is this AI-generated music?"

> No. The frequencies are mathematically pure tones (sine waves) generated by the Web Audio API. The AI coach is a recommender, not a generator — it picks from the 9 frequencies, it doesn't compose new ones. No AI music, no hallucinations.

### "What about hearing damage?"

> Rulio plays at low volume by default. We cap output below 70 dB equivalent. If you have a hearing condition, tinnitus, or any ear-related issue, please check with a clinician first. Headphones at low volume for 5–10 minutes is safe for most people.

### "Can I get a discount?"

> The 14 free sessions are free forever — no card. The paid plan is €19/mo. We don't run discount codes because we don't want to train people to wait for discounts. If €19 is too steep, please stay on the free tier; it's the same product, capped.

### "Will you build an iOS / Android app?"

> Possibly, in 2027. The web app works on mobile today (PWA-installable on iOS via "Add to Home Screen"). Native apps are a build-time-vs-distribution tradeoff; right now shipping speed wins.

### "How do you compete with the big players?"

> I don't, and that's fine. Rulio is for the person who wants a 5-minute practice, not a 30-day program. The big players are great; we're a different shape. If you want the whole guided-meditation library, use Calm. If you want a 5-min audio reset, try Rulio.

### "What's the difference between the 9 frequencies?"

> Each frequency is associated with a goal:
> - 174 Hz — grounding
> - 285 Hz — recovery
> - 396 Hz — release / wind-down
> - 417 Hz — change / momentum
> - 528 Hz — focus / deep work
> - 639 Hz — connection
> - 741 Hz — clarity
> - 852 Hz — intuition
> - 963 Hz — calm
>
> Honest caveat: these mappings aren't peer-reviewed. They're a starting frame. The AI coach learns from your actual sessions which frequencies work for which goal for you.

---

# 6. Twitter launch thread (5 tweets)

> **Schedule for 00:10 PT Tuesday.** Use Typefully or Buffer. Pin the first tweet.

### Tweet 1

> We just launched on @ProductHunt 🚀
>
> Rulio — adaptive solfeggio audio for focus, sleep, and energy.
>
> 14 free sessions, no card.
>
> Thread on why I built it 👇

### Tweet 2

> In 2023 I burned out.
>
> 4 hours of sleep. Too much coffee. The Sunday-night panic.
>
> I tried Calm, Headspace, frequency videos, binaural beat apps.
>
> Nothing stuck. They all wanted 30 minutes I didn't have.

### Tweet 3

> The thing that actually worked was embarrassingly simple:
>
> A single solfeggio frequency in headphones for 5 minutes before deep work, 10 minutes before bed.
>
> Not a meditation. Not a ritual. Just sound.
>
> After 3 months I had a practice I hadn't abandoned.

### Tweet 4

> So I built Rulio.
>
> • 5-min sessions, not 30
> • 14 free sessions, no card
> • €19/mo after — single price, no upsells
> • AI coach that picks the next frequency
> • Honest framing — wellness tool, not a treatment
>
> The 9 frequencies: 174, 285, 396, 417, 528, 639, 741, 852, 963 Hz.

### Tweet 5

> If you've been wanting a 5-min focus or sleep practice that doesn't require a 30-min commitment, today is the day.
>
> 14 free sessions, no card: rulio.app/pro
>
> We're on @ProductHunt right now — would love an upvote if you find it useful 🙏
>
> producthunt.com/rulio

---

# 7. LinkedIn launch post (300–500 words)

> **Schedule for 00:30 PT Tuesday.**

---

**I built a thing. It's live on Product Hunt today.**

Three years ago I burned out. Small consulting business in Brussels, 4 hours of sleep, too much coffee, the Sunday-night panic. I tried Calm, Headspace, frequency videos, binaural beat apps. Nothing stuck. They all wanted 30 minutes I didn't have, or they were dressed up as wellness theater with no actual substance behind the sound.

The thing that quietly fixed me was embarrassingly simple: a single solfeggio frequency in headphones for 5 minutes before deep work, and 10 minutes before bed. Not a meditation. Not a ritual. Just sound. After two weeks I was sleeping better. After three months I had a sustainable practice — the first one I hadn't abandoned by February.

That's the seed of Rulio.

**What it is**

Rulio is a 5-minute audio practice built on solfeggio frequencies (174, 285, 396, 417, 528, 639, 741, 852, 963 Hz). You pick a goal — focus, sleep, calm, energy — and the player layers a frequency with brown noise and a soft 432 Hz background. There's an AI coach that watches what you've played and recommends the next session.

**Why it's different**

- **5 minutes, not 30.** A session fits between meetings, before a focus block, or right before sleep.
- **14 free sessions, no card.** Try the full library before you decide. No email-gated "free trial" that wants your wallet.
- **€19/mo or €180/yr.** A single founder-built subscription. No upsells, no premium tier hiding the good stuff.
- **AI coach that adapts.** Recommends the next frequency based on what you've played and what you said you wanted.
- **Honest framing.** Rulio is a wellness tool, not a treatment. We say so on every page.

**Tech**

Next.js 14 on Vercel, Supabase for auth + Postgres, Stripe for billing, Resend for email, PostHog EU for analytics. 15 routes, all server-rendered or statically generated. The audio engine runs client-side in the browser via the Web Audio API — no server audio processing, no round-trip latency.

**What's next**

A B2B white-label at rulio-b2b.vercel.app — same engine, your brand, your colors, your domain. For HR teams, therapist practices, yoga studios, and corporate wellness buyers who want a turnkey audio tool without building one. Beta is open; if you know anyone who'd want this, I'd love an intro.

**Try it**

👉 rulio.app/pro — 14 free sessions, no card, takes 30 seconds to start.

We're live on Product Hunt today — if you find Rulio useful, an upvote would mean a lot to a solo founder shipping in public for the first time.

👉 https://www.producthunt.com/rulio

Thanks for reading.

— Roel

---

# 8. Email list launch email (150–200 words)

> **Schedule for 06:00 PT Tuesday.** From: roel@rulio.app. Reply-to: roel@rulio.app.

**Subject:** We just launched on Product Hunt

**Preview text:** 14 free sessions, no card. It would mean a lot if you'd take a look.

---

Hey,

Quick one: **Rulio is live on Product Hunt today** → https://www.producthunt.com/rulio

Rulio is the 5-minute audio practice I built after burning out in 2023 — solfeggio frequencies (174, 285, 396, 417, 528, 639, 741, 852, 963 Hz) layered with brown noise, an AI coach that picks the next session for you, and 14 free sessions to start (no card).

If you've been waiting for an excuse to try it, today is the day.

If you find it useful, **an upvote on Product Hunt would mean a lot** — it determines whether Rulio gets seen by the next 1,000 people, or the next 100. Both are fine, but the first is better.

👉 https://www.producthunt.com/rulio
👉 Or skip the line and go straight to rulio.app/pro (14 free, no card)

Thanks for being here. It means a lot to ship something in public for the first time and have actual humans on the other end.

— Roel
rulio.app

### Email A/B subject line variants

Track open rate. Send 1/3 to each if your ESP supports it.

- A: `We just launched on Product Hunt` (control)
- B: `Made you a thing — it's on Product Hunt today`
- C: `Rulio is live. 14 free sessions, no card.`

### Email A/B preview text variants

- A: `14 free sessions, no card. It would mean a lot if you'd take a look.`
- B: `5-minute focus and sleep audio. Try it free.`
- C: `The tool I built after burning out. Today only on PH.`

---

# Post-launch 7-day plan

The launch isn't over at T+24h. The 7 days after are where the long-tail signal happens.

| Day | Action |
|---|---|
| **T+1d (Wed)** | Send personal thank-you emails to your top 10 commenters. Reply to every PH comment still trickling in. Post a "lessons from launch day" tweet. |
| **T+2d (Thu)** | Publish a short blog post: "What I learned launching Rulio on Product Hunt." Link to it from the PH listing comment thread. This becomes evergreen content. |
| **T+3d (Fri)** | Review metrics. Write a private launch-review.md (rank, upvotes, comments, conversion, top comments, surprises). |
| **T+4d (Sat)** | Nothing. Rest. The launch is over. |
| **T+5d (Sun)** | DM the 10 friends who upvoted: thanks, no ask. |
| **T+6d (Mon)** | Email the new signups (anyone who hit /pro from the launch): short thank-you, link to the free protocol, no upsell. |
| **T+7d** | Publish the "lessons" post on Indie Hackers / LinkedIn. Tag Product Hunt if appropriate. |
| **T+14d** | Publish the "what I learned" post on Substack if you have one. |
| **T+30d** | One-month retrospective. What stuck, what didn't, would you do it again? |

---

# Metrics to track

Track these in a single spreadsheet. Update hourly on launch day.

| Metric | Source | Target (good launch) | Target (great launch) |
|---|---|---|---|
| **Final rank** | producthunt.com | Top 10 of the day | Top 5 of the day |
| **Total upvotes** | PH dashboard | 200+ | 500+ |
| **Comments** | PH dashboard | 30+ | 80+ |
| **Click-throughs to rulio.app/pro** | UTM-tagged link / PostHog | 200+ | 1000+ |
| **Free signups from launch** | Supabase / PostHog | 100+ | 500+ |
| **Conversion free → paid** | Stripe | 2% | 5% |
| **Time on site (launch day)** | PostHog | 2+ min | 4+ min |
| **Bounce rate (launch day)** | PostHog | <70% | <50% |
| **Twitter impressions on launch tweet** | Twitter analytics | 5,000+ | 20,000+ |
| **LinkedIn impressions on launch post** | LinkedIn analytics | 2,000+ | 10,000+ |
| **Email open rate** | ESP | 35%+ | 50%+ |
| **Email click rate** | ESP | 5%+ | 10%+ |
| **Affiliate clicks** | rulio.app/affiliate dashboard | 20+ | 100+ |

Set up UTM tagging before launch:

- `?utm_source=producthunt&utm_medium=launch&utm_campaign=ph-day-1`
- `?utm_source=twitter&utm_medium=launch&utm_campaign=ph-thread`
- `?utm_source=linkedin&utm_medium=launch&utm_campaign=ph-post`
- `?utm_source=email&utm_medium=launch&utm_campaign=ph-blast`

This lets you attribute every signup to the right channel in PostHog.

---

# What NOT to do

- **Don't ask for upvotes in the maker comment.** PH penalizes this. The maker comment should be a story, not a CTA.
- **Don't offer incentives for upvotes.** ("Upvote and get 3 months free" = ban.)
- **Don't use a clickbait tagline.** "This AI will change your life in 5 minutes" → bounce.
- **Don't launch on a Monday or Friday.** See "When to launch" above.
- **Don't launch without screenshots.** A text-only listing dies in the first 30 minutes.
- **Don't launch without the maker's first comment.** A listing with no maker comment gets 50% fewer comments.
- **Don't DM people asking for upvotes.** "Hey, could you upvote Rulio on PH?" → spam report → account flag.
- **Don't use fake data in screenshots.** "12 conversions" with 0 actual conversions → community callout.
- **Don't go to sleep in the first 3 hours.** The engagement curve is set by T+3h.
- **Don't edit the description after T+30m.** It's locked, and editing looks desperate.
- **Don't post "we hit #X!" tweets** before you actually do. The PH community notices humble-bragging.
- **Don't respond to criticism with defensiveness.** "Why is this just a web app?" is a real question. "Because I want to ship fast" is a real answer.
- **Don't buy upvotes.** The bots are obvious, the community is small, and you will be publicly shamed.
- **Don't repost the same maker comment on Hacker News, Reddit, and Indie Hackers at the same time.** Cross-post one at a time, with platform-appropriate framing.

---

# Troubleshooting

### "My product isn't showing on the front page"

- Wait 5 minutes. PH has a cache.
- Check that you actually clicked "Launch" and the day rolled over to Tuesday PT.
- If it's still not showing after 15 min, email hunters@producthunt.com with a screenshot.

### "I'm getting downvoted"

- Read the comments. If they're constructive, reply. If they're abusive, hide (not delete) and move on.
- Don't reply defensively. "I disagree" → "thanks for the feedback, I'll think about it."

### "Stripe webhook is failing on launch day"

- Check the Stripe dashboard → Events for the most recent event.
- If it's a 500, check the Vercel logs.
- If it's a 401, the webhook secret rotated; re-set it.
- If it's been failing for 30+ min, post a status update on the PH listing: "We're seeing a payment bug, working on it. Free tier still works."

### "Magic-link emails aren't arriving"

- Check Resend → Logs.
- Check that the Supabase auth template uses Resend (not the default SMTP).
- If Resend is down (rare), post a status update and ask people to use a different email provider.

### "Server is slow / 504s"

- Vercel → check the function logs.
- If a single route is hot, throttle it.
- If it's a Supabase issue, check status.supabase.com.
- Post a status update if the outage lasts >15 min.

### "I get a question I don't know the answer to"

- Reply: "Good question. Let me check and get back to you in [hour/day]." Then actually do.
- Don't fake it. The community remembers.

---

# Appendix

## Quick reference

```
LINKS
  rulio.app                  — main site
  rulio.app/pro              — pricing + free trial
  rulio.app/qi               — player
  rulio.app/account          — account dashboard
  rulio.app/affiliate        — affiliate dashboard
  rulio-b2b.vercel.app       — B2B white-label beta
  rulio.app/privacy          — privacy policy
  rulio.app/terms            — terms of service

PH
  Maker dashboard            — maker.producthunt.com
  PH listing URL             — producthunt.com/rulio
  Hunter outreach (optional) — [name + handle, per hunter]

CONTACT
  roel@rulio.app             — replies, refunds, questions
  @roeljanssens              — Twitter
  linkedin.com/in/roeljanssens — LinkedIn
```

## Final asset checklist (printable)

```
[ ] 4 screenshots taken (1279×800, light + dark)
[ ] Maker's first comment written (paste into PH immediately)
[ ] Description copy final (paste into PH listing)
[ ] Twitter thread drafted (schedule for 00:10 PT)
[ ] LinkedIn post drafted (schedule for 00:30 PT)
[ ] Email blast drafted (schedule for 06:00 PT)
[ ] 10 friends pre-notified (with time slots)
[ ] Tuesday 12:01 AM PT calendar reminder set
[ ] Hunter email sent (T-2d, optional)
[ ] PH draft submitted (T-3d)
[ ] rulio.app/pro tested end-to-end
[ ] 14-free-sessions flow tested
[ ] Stripe webhook tested
[ ] Magic-link email arrives and is clickable
[ ] Mobile screenshot of /account captured
[ ] Privacy policy and terms links work
[ ] Reply templates saved in a notes file for fast copy-paste on launch day
[ ] UTM tags set up in PostHog
[ ] Metrics spreadsheet ready
[ ] Coffee / tea / water within arm's reach
```

## One-line summary (for chat / DM)

> Rulio is a 5-min solfeggio audio practice (focus, sleep, calm, energy) — 14 free sessions, no card, €19/mo after. Live on Product Hunt today: https://www.producthunt.com/rulio

---

*End of launch kit. Paste-ready, no TODOs. Good luck Tuesday.*
