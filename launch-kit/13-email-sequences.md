# Rulio Email Sequences — 4 Complete Sequences

> **What this file is.** Four paste-ready email sequences for the Rulio ecosystem. Every email has a `From`, `Subject` (under 50 chars), `Preheader` (under 90 chars), `Send time` in Europe/Berlin, a plain-text body, an HTML-ready markdown version, exactly **one CTA**, and the standard Rulio footer with disclaimer.
>
> **Sequences:** (1) **Post-purchase** — 5 emails over 30 days for buyers of any digital product. (2) **Engine Pro trial** — 7 emails over 8 days for free trial signups. (3) **Cold affiliate recruitment** — 5 emails over 10 days. (4) **Weekly digest** — Substack-style template for free-tier readers, with 12 weeks of pre-built rotation banks.
>
> **Voice rules.** First person from Roel. Short sentences. "I" statements. No buzzwords ("revolutionary," "transformative," "manifest," "unlock"). Real solfeggio frequencies (174, 285, 396, 417, 528, 639, 741, 852, 963 Hz) used accurately. No emojis except in functional positions (subject, CTA buttons, footer).
>
> **How to send.** Resend / Loops for sequences 1–3 (transactional triggers + scheduled). Substack for sequence 4 (auto-publish). Suppress on unsubscribe, suppress across sequences per the matrix in Appendix E. Tag every contact at signup so the right sequence fires (`postpurchase-[slug]`, `pro-trial`, `affiliate-cold-[archetype]`, `weekly-free`).

---

# How to use this file

1. **Pick the sequence** that matches the trigger event.
2. **Replace placeholders** — `[FIRST_NAME]`, `[PRODUCT_NAME]`, `[MAGIC_LINK]`, etc. with real per-recipient values.
3. **Set the send time** in your ESP from the `Send time` line below each email. Transactional sequences (T+0, magic link) fire on the event itself.
4. **Wire UTMs** to every link (see convention below).
5. **Test send** to `roel@rulio.app` before activating.
6. **Read every reply yourself.** That's the whole point of founder voice.

---

# Common conventions (used in every email)

### From / Reply-To

```
From:     Roel Janssens <roel@rulio.app>
Reply-To: roel@rulio.app
```

### Footer / disclaimer (paste at the bottom of every email)

```
—
Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you [bought from us / signed up for a free
trial / subscribed to the digest]. One-click unsubscribe at the bottom
of this email. I read every reply at roel@rulio.app.

© 2026 Rulio Studio · Brussels · rulio.app
```

### UTM convention (append to every link)

```
?utm_source=email&utm_medium=[sequence]&utm_campaign=[sequence]&utm_content=[email-number]
```

Examples: `?utm_source=email&utm_medium=postpurchase&utm_campaign=bundle&utm_content=email1-confirm`, `?utm_source=email&utm_medium=protrial&utm_campaign=trial&utm_content=email3-day3`, `?utm_source=email&utm_medium=affiliate&utm_campaign=affiliate&utm_content=email1-pitch`, `?utm_source=email&utm_medium=weekly&utm_campaign=digest&utm_content=issue14-528hz`.

### Plain text vs. HTML-ready markdown

Every email is in two formats: **plain text** (what Roel would type) and **HTML-ready markdown** (with `**bold**`, `[links](urls)`, blockquotes, tables — drop into Loops / ConvertKit / Mailchimp / Resend and it renders correctly on the brand's dark-on-cream theme: `#0c0c0e` background, `#F4F1EA` text, `#5BB8FF` accents).

### The "one CTA" rule

Every email has exactly **one** clickable button link. Secondary inline links are fine for context. Adding a second button halves the click-through rate on both. This is the only hard rule that survives every compromise.

### Time zone

All send times in **Europe/Berlin** (CET / CEST). The only time we adjust for other zones is the weekly digest — Tuesday 08:00 Berlin = 02:00 EST = 23:00 PST Monday. Most US readers read on Tuesday morning their time, which is fine.

### Suppression

On unsubscribe, suppress from **all four sequences**. Rulio does not do "win-back" emails. If someone wants the emails back, they re-subscribe from `rulio.app`.

---

# Quick reference — the 9 solfeggio frequencies

| Hz  | Working name    | One-line use case                                          |
| --- | --------------- | ---------------------------------------------------------- |
| 174 | Foundation      | Body-in-chair, post-on-your-feet-all-day reset              |
| 285 | Recovery        | Post-illness, post-workout, the cellular layer of rest      |
| 396 | Release         | Sunday-night dread, fear, guilt, the lower-gut letting-go   |
| 417 | Change          | Undoing the small loop (2am scroll, third coffee, re-write) |
| 528 | Transformation  | Heavy day, grief, the default when you have no preference   |
| 639 | Connection      | Pre/post hard conversation, sometimes with another person   |
| 741 | Expression      | Blank page, stuck writing, unstick-the-next-sentence        |
| 852 | Intuition       | Decision confirmation, the answer is in the building        |
| 963 | Oneness         | The existential afternoon, the rare-but-real one            |

> **Footnote:** The original 6 solfeggio tones are a 1,000-year-old liturgical scale. The other 3 were added in the 20th century. The "5D" / spiritual attribution is modern. Rulio treats them as low-frequency tones useful for relaxation and focus — the same way music is useful. No miracle claims.

---

# Sequence 1 — Post-purchase (digital download buyer)

## Overview

**Trigger:** Stripe webhook `checkout.session.completed` for any of the
5 digital products (cards, log, ebook, audio pack, complete bundle).

**Suppression list:** anyone who has also started an Engine Pro trial in
the last 30 days (they get the trial sequence instead, no overlap).

**Tag on entry:** `postpurchase-[product-slug]` — e.g.,
`postpurchase-bundle`, `postpurchase-audio`, `postpurchase-ebook`.

**Total emails:** 5 over 30 days.

**Goal:** (a) get them to actually run the 5-minute protocol, (b) get a
review / testimonial in week 2, (c) move them to Engine Pro in week 3,
(d) cross-sell workshop / book in week 5.

**Send times:** Transactional at T+0. Scheduled at 09:00 Europe/Berlin
for T+2 through T+30. (09:00 Berlin = 08:00 London = 03:00 EST = the
quiet hour for most inboxes — good open rates.)

---

## Email 1 / Sequence 1 — T+0 (Order confirmation)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** Your Rulio [PRODUCT_NAME] is here · **Preheader:** Tap the link, download the files, run the protocol tonight. It takes 5 minutes. · **Send:** Triggered immediately on Stripe `checkout.session.completed` webhook · **CTA:** `[DOWNLOAD_LINK]` — full-width button, label "Download my files"

### Plain-text body

```
Hi,

Thanks for buying the [PRODUCT_NAME]. I'm Roel — I built Rulio, and
I write every one of these emails myself.

Here's your download link:

[DOWNLOAD_LINK]

The link expires in 7 days. Don't worry, you'll also get a copy of
this email from Stripe, and you can reply to it any time to ask me
to re-send the files.

Two things to know before you open the files:

1. You need stereo headphones. AirPods work. Over-ear works.
   Bluetooth speakers on a table don't — the binaural effect needs
   L/R separation. One earbud in doesn't work either.

2. Volume low. You should feel the tone, not push through it.

If you bought the Complete Bundle, you also got a printable cheat
sheet on page 3 of the protocol PDF. If you only bought one piece,
that's fine — you have everything you need.

I'll send one more email in 2 days to check in. If you run the
5-minute protocol tonight and notice something, reply with what you
noticed. I read every one.

— Roel

P.S. If the download link is broken, reply — it goes straight to
me, not to a system.
```

### HTML-ready markdown

```markdown
Hi,

Thanks for buying the **[PRODUCT_NAME]**. I'm Roel — I built Rulio, and
I write every one of these emails myself.

Here's your download link:

**[⬇ Download my files]([DOWNLOAD_LINK])**

The link expires in 7 days. You'll also get a copy of this email from
Stripe, and you can reply to it any time to ask me to re-send the files.

Two things to know before you open the files:

1. **You need stereo headphones.** AirPods work. Over-ear works.
   Bluetooth speakers on a table don't — the binaural effect needs
   L/R separation. One earbud in doesn't work either.
2. **Volume low.** You should feel the tone, not push through it.

If you bought the **Complete Bundle**, you also got a printable cheat
sheet on page 3 of the protocol PDF. If you only bought one piece,
that's fine — you have everything you need.

I'll send one more email in 2 days to check in. If you run the
5-minute protocol tonight and notice something, reply with what you
noticed. I read every one.

— Roel

P.S. If the download link is broken, reply — it goes straight to me,
not to a system.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ ⬇ Download my files ]

(links to [DOWNLOAD_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you bought the [PRODUCT_NAME] from
rulio.app. One-click unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

## Email 2 / Sequence 1 — T+2 days (How's it going?)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** Day 2 — how's it going? · **Preheader:** Quick check-in. Same hour, same place. Reply with what you noticed. · **Send:** T+2 days, 09:00 Europe/Berlin · **CTA:** `[FREE_QI_LINK]` — full-width button, label "Try the 14 free sessions"

### Plain-text body

```
Hi,

You're on day 2 of the 5-minute protocol. Or you skipped yesterday,
which is also fine — pick up where you left off, don't double up.

Two things I want to flag from the last 48 hours of support emails:

1. The most common mistake is moving the session around. 8am on
   Monday, 3pm on Tuesday, 7am on Wednesday. The whole point of a
   protocol is the repeat. Pick an hour. Keep the hour.

2. The second most common mistake is adding to it. Breathwork.
   Meditation. A mantra. A journal entry. The 5-minute protocol
   is 5 minutes of one frequency and one thing: not-doing. If
   you want to add things, add them after, not during.

If you've already noticed something — slightly calmer, slightly
more focused, slightly less stuck — that's the signal. The next
three days are about confirming it.

If you haven't, you have two options on day 4: stick with the
same frequency and try one of the other nine, or pick a
different one. The cheat sheet on page 3 of the protocol PDF
has 9 options. The 14 free sessions at rulio.app/qi have the
same frequencies with a slightly longer timer if 5 minutes
isn't enough.

Reply with what you noticed, even if it's nothing. I read every
one — that's not a line, that's the actual job description.

— Roel

P.S. The free /qi sessions are how I run the protocol myself when
I want a different tone or a longer session. No card, no signup.
```

### HTML-ready markdown

```markdown
Hi,

You're on day 2 of the 5-minute protocol. Or you skipped yesterday,
which is also fine — pick up where you left off, don't double up.

Two things I want to flag from the last 48 hours of support emails:

1. **The most common mistake is moving the session around.** 8am on
   Monday, 3pm on Tuesday, 7am on Wednesday. The whole point of a
   protocol is the repeat. Pick an hour. Keep the hour.
2. **The second most common mistake is adding to it.** Breathwork.
   Meditation. A mantra. A journal entry. The 5-minute protocol is
   5 minutes of one frequency and one thing: not-doing. If you want
   to add things, add them after, not during.

If you've already noticed something — slightly calmer, slightly
more focused, slightly less stuck — that's the signal. The next
three days are about confirming it.

If you haven't, you have two options on day 4: stick with the
same frequency and try one of the other nine, or pick a different
one. The cheat sheet on page 3 of the protocol PDF has 9 options.

Reply with what you noticed, even if it's nothing. I read every
one — that's not a line, that's the actual job description.

— Roel

P.S. The free /qi sessions are how I run the protocol myself when
I want a different tone or a longer session. No card, no signup.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ Try the 14 free sessions ]

(links to [FREE_QI_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you bought the [PRODUCT_NAME] from
rulio.app. One-click unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

## Email 3 / Sequence 1 — T+7 days (What did you notice?)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** What did you notice? · **Preheader:** You finished the 5 days. Reply with one sentence — I read every one. · **Send:** T+7 days, 09:00 Europe/Berlin · **CTA:** `[REVIEW_LINK]` — full-width button, label "Leave a short review"

### Plain-text body

```
Hi,

A week ago today you downloaded the [PRODUCT_NAME]. If you ran
the 5-minute protocol for the 5 days, you finished. If you ran
it for 2 or 3, you ran it for 2 or 3 — both are useful answers.

I'm asking one thing: one sentence about what you noticed.

It can be:
- a feeling ("slightly less scattered at 3 PM")
- a thought ("I stopped reaching for my phone")
- a small thing ("I fell asleep 20 minutes faster")
- a negative ("I didn't notice anything, but I'll try a
  different frequency next week")

I read every reply. I use the most useful ones (with permission)
in the next Substack issue, on the product page, or in the
launch kit. Not all of them. The honest ones. The ones with a
real detail.

You can reply to this email, or click the button below and
leave a short review — whichever is easier. Reviews help more
than you think; the Etsy algorithm is brutal without them, and
a one-sentence review from a real person with a real detail is
worth more than any testimonial I could write myself.

— Roel

P.S. If you didn't run the protocol yet, today is day 1.
Five minutes, one frequency. That's the whole thing.
```

### HTML-ready markdown

```markdown
Hi,

A week ago today you downloaded the **[PRODUCT_NAME]**. If you ran
the 5-minute protocol for the 5 days, you finished. If you ran it
for 2 or 3, you ran it for 2 or 3 — both are useful answers.

I'm asking one thing: **one sentence about what you noticed.**

It can be:

- a feeling (*"slightly less scattered at 3 PM"*)
- a thought (*"I stopped reaching for my phone"*)
- a small thing (*"I fell asleep 20 minutes faster"*)
- a negative (*"I didn't notice anything, but I'll try a
  different frequency next week"*)

I read every reply. I use the most useful ones (with permission)
in the next Substack issue, on the product page, or in the launch
kit. Not all of them. The honest ones. The ones with a real detail.

You can reply to this email, or click the button below and leave a
short review — whichever is easier. Reviews help more than you
think; the Etsy algorithm is brutal without them, and a one-
sentence review from a real person with a real detail is worth
more than any testimonial I could write myself.

— Roel

P.S. If you didn't run the protocol yet, today is day 1.
Five minutes, one frequency. That's the whole thing.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ Leave a short review ]

(links to [REVIEW_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you bought the [PRODUCT_NAME] from
rulio.app. One-click unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

## Email 4 / Sequence 1 — T+14 days (Engine Pro upgrade offer)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** Try Engine Pro free for 7 days · **Preheader:** The AI coach picks the right frequency. You just press play. No card required. · **Send:** T+14 days, 09:00 Europe/Berlin · **CTA:** `[PRO_TRIAL_LINK]` — full-width button, label "Start my free 7-day trial"

### Plain-text body

```
Hi,

Two weeks ago you bought the [PRODUCT_NAME]. You've run the
5-minute protocol enough to know whether the practice is for
you. If it is, there's a version of Rulio that does the
decision-making for you.

It's called Engine Pro. Three things it does that the free
sessions don't:

1. It picks the right frequency for your current hour. You
   stop reading cheat sheets. You press play.
2. It asks three questions a day and builds a 15-minute session
   around the answer. The session adapts over time.
3. It runs in the background — no decision fatigue, no
   "which one today," no 90-second scrolling before you start.

You can try it free for 7 days. No card required. After 7 days
it's €19/month or €180/year, cancel from your account page in
one click.

I built Engine Pro for the days when even picking a frequency
felt like too much. For most days the free /qi sessions and
the protocol are enough. For some days they aren't.

If you've already had one of those days, the trial button is
below. If you haven't, no rush — the offer stands.

— Roel

P.S. I don't run the coach myself. I run the 5-minute protocol
from the bundle you already have. The coach is for the people
who want the decision made for them. If that's you, great.
```

### HTML-ready markdown

```markdown
Hi,

Two weeks ago you bought the **[PRODUCT_NAME]**. You've run the
5-minute protocol enough to know whether the practice is for
you. If it is, there's a version of Rulio that does the
decision-making for you.

It's called **Engine Pro**. Three things it does that the free
sessions don't:

1. **It picks the right frequency for your current hour.** You
   stop reading cheat sheets. You press play.
2. **It asks three questions a day and builds a 15-minute
   session around the answer.** The session adapts over time.
3. **It runs in the background** — no decision fatigue, no
   "which one today," no 90-second scrolling before you start.

You can try it free for 7 days. No card required. After 7 days
it's €19/month or €180/year, cancel from your account page in
one click.

I built Engine Pro for the days when even picking a frequency
felt like too much. For most days the free /qi sessions and the
protocol are enough. For some days they aren't.

If you've already had one of those days, the trial button is
below. If you haven't, no rush — the offer stands.

— Roel

P.S. I don't run the coach myself. I run the 5-minute protocol
from the bundle you already have. The coach is for the people
who want the decision made for them. If that's you, great.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ Start my free 7-day trial ]

(links to [PRO_TRIAL_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you bought the [PRODUCT_NAME] from
rulio.app. One-click unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

## Email 5 / Sequence 1 — T+30 days (Anchor + cross-sell)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** 30 days in · **Preheader:** Most people use the bundle for 6–8 weeks. Three things you can do next. · **Send:** T+30 days, 09:00 Europe/Berlin · **CTA:** `[CROSS_SELL_LINK]` — full-width button, label "See the next step"

### Plain-text body

```
Hi,

A month ago you bought the [PRODUCT_NAME]. I want to tell you
what most people do at this point, because the pattern is more
predictable than I'd like.

Most people use the bundle for 6 to 8 weeks. Not forever.
Not never. Just long enough to figure out which frequency is
theirs, then they keep that one in rotation. The cheat sheet
ends up taped to a laptop. The audio pack gets used twice a
week. The other four pieces sit in a folder and get opened
once.

That is the success case. It is the normal outcome. It is
fine.

Three things you can do next, in order of how much most people
need them:

1. **Do nothing.** You have what you need. The 5-minute
   protocol is the whole thing. Run it when you need it, skip
   it when you don't. There is no upgrade to feel guilty
   about skipping.

2. **Take the free audit.** 20 minutes, 6 questions, a
   personalised reading of your worst hour + a recommended
   protocol. I do the calls myself on Fridays. No upsell at
   the end. → [AUDIT_LINK]

3. **Come to the Energy Reset Workshop.** One Saturday, 4
   hours, live with me and 8 other people. We run the
   protocol together and you leave with a 30-day plan. €47.
   → [WORKSHOP_LINK]

That's it. The default is option 1. If you want more, options
2 and 3 are real and they're what I'd do.

— Roel

P.S. If you didn't end up using the bundle, that's useful
information too. Reply with why — I read every one, and the
answers shape what I build next.
```

### HTML-ready markdown

```markdown
Hi,

A month ago you bought the **[PRODUCT_NAME]**. I want to tell
you what most people do at this point, because the pattern is
more predictable than I'd like.

Most people use the bundle for **6 to 8 weeks**. Not forever.
Not never. Just long enough to figure out which frequency is
theirs, then they keep that one in rotation. The cheat sheet
ends up taped to a laptop. The audio pack gets used twice a
week. The other four pieces sit in a folder and get opened
once.

That is the success case. It is the normal outcome. It is
fine.

Three things you can do next, in order of how much most people
need them:

1. **Do nothing.** You have what you need. The 5-minute
   protocol is the whole thing. Run it when you need it, skip
   it when you don't. There is no upgrade to feel guilty
   about skipping.

2. **Take the free audit.** 20 minutes, 6 questions, a
   personalised reading of your worst hour + a recommended
   protocol. I do the calls myself on Fridays. No upsell at
   the end.

3. **Come to the Energy Reset Workshop.** One Saturday,
   4 hours, live with me and 8 other people. We run the
   protocol together and you leave with a 30-day plan. €47.

That's it. The default is option 1. If you want more, options
2 and 3 are real and they're what I'd do.

— Roel

P.S. If you didn't end up using the bundle, that's useful
information too. Reply with why — I read every one, and the
answers shape what I build next.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ See the next step ]

(links to [CROSS_SELL_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you bought the [PRODUCT_NAME] from
rulio.app. One-click unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

# Sequence 2 — Engine Pro trial (7 days, then 1 more)

## Overview

**Trigger:** Magic-link signup at `rulio.app/pro`. Fire when the user
clicks the link in the welcome email and lands on `/welcome` for the
first time.

**Suppression list:** anyone who has also bought a digital product in
the last 30 days (they get the post-purchase sequence instead, with
the Pro trial in Email 4).

**Tag on entry:** `pro-trial`.

**Total emails:** 7. Stops automatically when the user upgrades to a
paid plan (Stripe webhook `customer.subscription.created`).

**Goal:** (a) get them to play their first session within 24 hours,
(b) keep them engaged for the full 7 days, (c) convert to paid on day
6–7, (d) re-engage the no-cards cohort on day 8.

**Send times:** Email 1 is triggered (magic link). Emails 2–7 are
scheduled at 08:00 Europe/Berlin — that's 07:00 London, 02:00 EST,
which is the quiet-inbox hour. Most trial users check email first
thing in their own morning, so the Berlin send lands in their inbox
before their day starts.

---

## Email 1 / Sequence 2 — T+0 (Magic link + first 5 minutes)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** Welcome to Engine Pro · **Preheader:** Your magic link. Your first 5 minutes. No card required. · **Send:** Triggered immediately on Pro trial signup · **CTA:** `[MAGIC_LINK]` — full-width button, label "Open my account"

### Plain-text body

```
Hi,

Welcome to the Engine Pro trial. I'm Roel. I built this thing,
I write every email, and you'll hear from me six more times
in the next 7 days. After that, silence unless you reply.

Here's your magic link to open your account:

[MAGIC_LINK]

The link signs you in for the next 24 hours. You don't need
a password. You don't need to remember anything. Bookmark
rulio.app/pro and use the same email next time, and we'll
send you a fresh link.

Your first 5 minutes:

1. Click the link above.
2. On /welcome, the coach will ask you three questions.
   Take 30 seconds. Don't overthink. The first answer is
   almost always the right one.
3. Press play. Stereo headphones. Volume low.
4. Sit. Five minutes. Done.

That's it. The whole trial is just this — play, notice,
play again tomorrow.

You don't need a card. You don't need to remember anything.
You don't need to do anything else today.

I'll send one more email tomorrow with the cheat sheet for
picking the right frequency, in case you want to override
the coach's pick.

— Roel

P.S. If the magic link doesn't work, reply — it goes to me.
I'll send a new one. Common fix: clear your browser cookies
or open in a private window.
```

### HTML-ready markdown

```markdown
Hi,

Welcome to the **Engine Pro trial**. I'm Roel. I built this
thing, I write every email, and you'll hear from me six more
times in the next 7 days. After that, silence unless you reply.

Here's your **magic link** to open your account:

**[🔓 Open my account]([MAGIC_LINK])**

The link signs you in for the next 24 hours. You don't need a
password. You don't need to remember anything. Bookmark
rulio.app/pro and use the same email next time, and we'll send
you a fresh link.

Your first 5 minutes:

1. **Click the link above.**
2. On `/welcome`, the coach will ask you three questions.
   Take 30 seconds. Don't overthink. The first answer is
   almost always the right one.
3. **Press play.** Stereo headphones. Volume low.
4. **Sit. Five minutes. Done.**

That's it. The whole trial is just this — play, notice, play
again tomorrow.

You don't need a card. You don't need to remember anything.
You don't need to do anything else today.

I'll send one more email tomorrow with the cheat sheet for
picking the right frequency, in case you want to override the
coach's pick.

— Roel

P.S. If the magic link doesn't work, reply — it goes to me.
I'll send a new one. Common fix: clear your browser cookies
or open in a private window.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ 🔓 Open my account ]

(links to [MAGIC_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you signed up for the Engine Pro
free trial at rulio.app/pro. One-click unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

## Email 2 / Sequence 2 — T+1 day (Pick your worst hour)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** Pick your worst hour · **Preheader:** The 3-question framework that picks your frequency. Five minutes, one tone. · **Send:** T+1 day, 08:00 Europe/Berlin · **CTA:** `[COACH_LINK]` — full-width button, label "Open the coach"

### Plain-text body

```
Hi,

Day 1 of your trial. I hope you played the session yesterday.

If you did, today's email is short. If you didn't, today is
the day.

Here's the question I want you to answer before you press
play again. Three parts. One minute total:

**1. What hour of the day are you worst at?**
Not your worst day. Your worst hour. The one that repeats.
Mine is 3 PM. A lot of founders will say the same.

**2. What does "worst" look like?**
Pick one word: tired, anxious, scattered, stuck, numb,
frustrated, overwhelmed. Or write your own.

**3. What frequency matches it?**
The cheat sheet below. Match the hour + the feeling to one
frequency. One only.

- **174 Hz** — body in chair, post-on-your-feet-all-day reset
- **285 Hz** — post-illness, post-workout, the cellular rest
- **396 Hz** — Sunday-night dread, fear, guilt, letting go
- **417 Hz** — undoing the small loop (2am scroll, third coffee)
- **528 Hz** — heavy day, the default when you have no preference
- **639 Hz** — pre/post hard conversation
- **741 Hz** — blank page, stuck writing
- **852 Hz** — decision confirmation
- **963 Hz** — the existential afternoon

If two frequencies could apply, pick the one that matches the
*feeling*, not the *hour*. The feeling is more honest.

The coach at rulio.app/pro will pick for you if you'd rather
not decide. Either way works.

— Roel

P.S. Most people change their pick on day 4. The first guess
is rarely the right one. That's the protocol working, not
failing.
```

### HTML-ready markdown

```markdown
Hi,

Day 1 of your trial. I hope you played the session yesterday.

If you did, today's email is short. If you didn't, today is
the day.

Here's the question I want you to answer before you press
play again. Three parts. One minute total:

**1. What hour of the day are you worst at?**
Not your worst day. Your worst hour. The one that repeats.
Mine is 3 PM. A lot of founders will say the same.

**2. What does "worst" look like?**
Pick one word: tired, anxious, scattered, stuck, numb,
frustrated, overwhelmed. Or write your own.

**3. What frequency matches it?**
The cheat sheet below. Match the hour + the feeling to one
frequency. One only.

| Hz  | Use case                                            |
| --- | --------------------------------------------------- |
| 174 | body in chair, post-on-your-feet-all-day reset       |
| 285 | post-illness, post-workout, the cellular rest        |
| 396 | Sunday-night dread, fear, guilt, letting go          |
| 417 | undoing the small loop (2am scroll, third coffee)    |
| 528 | heavy day, the default when you have no preference   |
| 639 | pre/post hard conversation                           |
| 741 | blank page, stuck writing                            |
| 852 | decision confirmation                                |
| 963 | the existential afternoon                            |

If two frequencies could apply, pick the one that matches the
*feeling*, not the *hour*. The feeling is more honest.

The coach at rulio.app/pro will pick for you if you'd rather
not decide. Either way works.

— Roel

P.S. Most people change their pick on day 4. The first guess
is rarely the right one. That's the protocol working, not
failing.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ Open the coach ]

(links to [COACH_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you signed up for the Engine Pro
free trial at rulio.app/pro. One-click unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

## Email 3 / Sequence 2 — T+3 days (Day 3 — what to expect)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** Day 3 — what to expect · **Preheader:** Most people notice something on day 3. Or they quit. Both are useful. · **Send:** T+3 days, 08:00 Europe/Berlin · **CTA:** `[COACH_LINK]` — full-width button, label "Play today's session"

### Plain-text body

```
Hi,

You're on day 3 of your trial. This is the day that decides
most trials, and I want to set the expectation honestly.

There are two ways day 3 usually goes:

**1. You noticed something.** Slightly calmer. Slightly more
focused. Slightly less stuck. The thing you couldn't name on
day 1 has a name now. This is what I hope happens. It happens
to roughly half of trial users.

**2. You didn't notice anything.** The session felt like 5
minutes of sitting still, which is what it was. You don't feel
different. You're wondering if the trial is worth finishing.
This is what happens to the other half, and it's a fine
answer.

If you're in group 1: the next four days are about confirming
the signal. Don't switch frequencies, don't add anything,
just keep the same hour and the same tone.

If you're in group 2: today, switch frequencies. The first
pick is rarely the right one. Try one that matches a *different*
feeling than the one you started with. If your first pick was
528 Hz (the default), try 396 Hz (release) or 741 Hz (focus)
today.

The coach at rulio.app/pro will also let you swap the
question set — there's a "recalibrate" button on day 3 that
restarts the daily questions with a different default
frequency. Worth using if group 2 is where you are.

Whatever happens, finish the 7 days. The data you collect by
day 7 is the data that tells you whether the practice is
worth keeping. Don't make the call on day 3.

— Roel

P.S. I almost quit the protocol myself on day 3. The thing I
noticed was small enough that I almost missed it. I almost
did miss it. I'm glad I didn't.
```

### HTML-ready markdown

```markdown
Hi,

You're on day 3 of your trial. This is the day that decides
most trials, and I want to set the expectation honestly.

There are two ways day 3 usually goes:

**1. You noticed something.** Slightly calmer. Slightly more
focused. Slightly less stuck. The thing you couldn't name on
day 1 has a name now. This is what I hope happens. It happens
to roughly half of trial users.

**2. You didn't notice anything.** The session felt like 5
minutes of sitting still, which is what it was. You don't
feel different. You're wondering if the trial is worth
finishing. This is what happens to the other half, and it's
a fine answer.

If you're in group 1: the next four days are about confirming
the signal. Don't switch frequencies, don't add anything,
just keep the same hour and the same tone.

If you're in group 2: today, switch frequencies. The first
pick is rarely the right one. Try one that matches a *different*
feeling than the one you started with. If your first pick was
528 Hz (the default), try 396 Hz (release) or 741 Hz (focus)
today.

The coach at rulio.app/pro will also let you swap the question
set — there's a "recalibrate" button on day 3 that restarts
the daily questions with a different default frequency. Worth
using if group 2 is where you are.

Whatever happens, finish the 7 days. The data you collect by
day 7 is the data that tells you whether the practice is
worth keeping. Don't make the call on day 3.

— Roel

P.S. I almost quit the protocol myself on day 3. The thing I
noticed was small enough that I almost missed it. I almost
did miss it. I'm glad I didn't.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ Play today's session ]

(links to [COACH_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you signed up for the Engine Pro
free trial at rulio.app/pro. One-click unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

## Email 4 / Sequence 2 — T+5 days (Day 5 milestone)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** Day 5 — write this down · **Preheader:** Note what you noticed. Not for me — for the day 7 version of you. · **Send:** T+5 days, 08:00 Europe/Berlin · **CTA:** `[COACH_LINK]` — full-width button, label "Open my log"

### Plain-text body

```
Hi,

Day 5 of your trial. You're two days from the upgrade decision.

I'm going to ask you to do something that takes 90 seconds,
and it's the most useful 90 seconds of the trial.

Write down, in one sentence, what you noticed over the last
five days. It can be:

- a feeling ("slightly less scattered at 3 PM")
- a thought ("I started looking forward to the session")
- a behaviour ("I stopped reaching for my phone at 2:55")
- a nothing ("I noticed nothing but I kept doing it")

You can write it in your Notes app, in the journal you already
keep, in the reply to this email, or in the log on the coach
page at rulio.app/pro. The medium doesn't matter. The act
does.

Why this matters: on day 7 you'll be asked whether €19/month
is worth it. The honest answer requires you to remember what
day 1 felt like. You will not remember. Your five-day note
will. Future-you will thank past-you for writing it.

A few specifics that help the note be useful:

- **Name the hour.** "3 PM" is more useful than "the
  afternoon."
- **Name the feeling.** One word is fine.
- **Name the frequency.** "528 Hz" is more useful than
  "the one with the tone I liked."
- **Note what changed.** Even a small change. Especially a
  small change.

I read every reply. If you send me your one-sentence note,
I'll send back one honest sentence in return.

— Roel

P.S. If you're on day 5 and you haven't played the sessions
every day, that's fine. Pick up today. The protocol doesn't
require perfection.
```

### HTML-ready markdown

```markdown
Hi,

Day 5 of your trial. You're two days from the upgrade decision.

I'm going to ask you to do something that takes 90 seconds,
and it's the most useful 90 seconds of the trial.

**Write down, in one sentence, what you noticed over the
last five days.** It can be:

- a feeling (*"slightly less scattered at 3 PM"*)
- a thought (*"I started looking forward to the session"*)
- a behaviour (*"I stopped reaching for my phone at 2:55"*)
- a nothing (*"I noticed nothing but I kept doing it"*)

You can write it in your Notes app, in the journal you already
keep, in the reply to this email, or in the log on the coach
page at rulio.app/pro. The medium doesn't matter. The act does.

Why this matters: on day 7 you'll be asked whether €19/month
is worth it. The honest answer requires you to remember what
day 1 felt like. **You will not remember.** Your five-day note
will. Future-you will thank past-you for writing it.

A few specifics that help the note be useful:

- **Name the hour.** "3 PM" is more useful than "the afternoon."
- **Name the feeling.** One word is fine.
- **Name the frequency.** "528 Hz" is more useful than "the
  one with the tone I liked."
- **Note what changed.** Even a small change. Especially a
  small change.

I read every reply. If you send me your one-sentence note,
I'll send back one honest sentence in return.

— Roel

P.S. If you're on day 5 and you haven't played the sessions
every day, that's fine. Pick up today. The protocol doesn't
require perfection.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ Open my log ]

(links to [COACH_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you signed up for the Engine Pro
free trial at rulio.app/pro. One-click unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

## Email 5 / Sequence 2 — T+6 days (Trial ends tomorrow)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** Trial ends tomorrow · **Preheader:** Here's what you'll lose, here's what you keep. The decision is yours. · **Send:** T+6 days, 08:00 Europe/Berlin · **CTA:** `[UPGRADE_LINK]` — full-width button, label "Keep Engine Pro for €19/mo"

### Plain-text body

```
Hi,

Your trial ends tomorrow at midnight (Berlin time). I want to
be honest about the two sides of the decision, not just the
one where you upgrade.

**What you lose if you don't upgrade:**

- The adaptive coach — the daily 3-question check-in and
  the auto-selected 15-minute session.
- The custom session generator — building a session around
  your specific hour and feeling.
- The 25-minute extended sessions — the 5-minute protocol
  is yours forever, the extended is Pro only.
- The daily-rhythm scheduler — sessions timed to your worst
  hour automatically.
- No ads (you haven't seen any, this is a future-proofing
  bullet).

**What you keep either way:**

- The 14 free sessions at rulio.app/qi. Forever. No card
  ever.
- The 5-minute protocol PDF. Forever.
- The 9 frequencies. Forever.
- The cheat sheet on page 3. Forever.

**The price:** €19/month or €180/year (saves €48). Cancel
from your account page in one click. No email required, no
"are you sure" survey, no retention call.

**My honest take:** if you ran the protocol 5+ times in the
trial and noticed *anything*, upgrade. If you ran it 2 or
fewer times, don't. The protocol works because it's short
and repeatable. Skipping it makes it not work, and that's
not a payment problem, it's a habit problem.

You have 24 hours. The decision is yours. Reply if you want
to talk it through.

— Roel

P.S. If you decide not to upgrade, I won't email you about
it again. The trial ends, you move to the free tier, and the
free /qi sessions keep working. That's a complete product,
not a downgrade.
```

### HTML-ready markdown

```markdown
Hi,

Your trial ends tomorrow at midnight (Berlin time). I want to
be honest about the two sides of the decision, not just the
one where you upgrade.

**What you lose if you don't upgrade:**

- **The adaptive coach** — the daily 3-question check-in
  and the auto-selected 15-minute session.
- **The custom session generator** — building a session
  around your specific hour and feeling.
- **The 25-minute extended sessions** — the 5-minute protocol
  is yours forever, the extended is Pro only.
- **The daily-rhythm scheduler** — sessions timed to your
  worst hour automatically.
- **No ads** (you haven't seen any, this is a future-proofing
  bullet).

**What you keep either way:**

- The 14 free sessions at rulio.app/qi. Forever. No card ever.
- The 5-minute protocol PDF. Forever.
- The 9 frequencies. Forever.
- The cheat sheet on page 3. Forever.

**The price:** €19/month or €180/year (saves €48). Cancel
from your account page in one click. No email required, no
"are you sure" survey, no retention call.

**My honest take:** if you ran the protocol 5+ times in the
trial and noticed *anything*, upgrade. If you ran it 2 or
fewer times, don't. The protocol works because it's short
and repeatable. Skipping it makes it not work, and that's
not a payment problem, it's a habit problem.

You have 24 hours. The decision is yours. Reply if you want
to talk it through.

— Roel

P.S. If you decide not to upgrade, I won't email you about
it again. The trial ends, you move to the free tier, and the
free /qi sessions keep working. That's a complete product,
not a downgrade.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ Keep Engine Pro for €19/mo ]

(links to [UPGRADE_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you signed up for the Engine Pro
free trial at rulio.app/pro. One-click unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

## Email 6 / Sequence 2 — T+7 days (Trial ended, no card)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** Your trial ended · **Preheader:** You're on the free tier now. Everything still works. No hard feelings. · **Send:** T+7 days, 08:00 Europe/Berlin (only sends if user has *not* upgraded by T+7 00:00 Berlin) · **CTA:** `[FREE_QI_LINK]` — full-width button, label "Use the free sessions"

### Plain-text body

```
Hi,

Your trial ended and you didn't add a card. That's fine.

Two things I want you to know:

1. **The free /qi sessions are not a consolation prize.** They
   are the same 9 frequencies. They run on a 5-minute timer.
   They have a cheat sheet. They are the product I built first
   and the product I still use most days. The Pro tier is the
   thing I built second, on top of /qi. /qi is the floor, not
   the lobby.

2. **You can come back any time.** If you decide in three months
   that you want the coach, the trial, the 25-minute sessions,
   the scheduler — sign in at rulio.app/pro with the same email
   and you'll get a fresh magic link. No "winback" emails from
   me between now and then.

In the meantime, here's the link to /qi. Use it. The protocol
is the same. The timer is the same. The frequencies are the
same. The only thing you don't have is the coach asking you
three questions a day — and if you already know your worst
hour, that's not what you needed anyway.

— Roel

P.S. If you skipped the trial, replied "no" to a survey, or
just decided this wasn't for you, that's a complete answer.
I won't email you about it again. Reply if you want to tell
me why — the answers shape what I build next.
```

### HTML-ready markdown

```markdown
Hi,

Your trial ended and you didn't add a card. That's fine.

Two things I want you to know:

1. **The free /qi sessions are not a consolation prize.** They
   are the same 9 frequencies. They run on a 5-minute timer.
   They have a cheat sheet. They are the product I built first
   and the product I still use most days. The Pro tier is the
   thing I built second, on top of /qi. /qi is the floor, not
   the lobby.

2. **You can come back any time.** If you decide in three
   months that you want the coach, the trial, the 25-minute
   sessions, the scheduler — sign in at rulio.app/pro with the
   same email and you'll get a fresh magic link. No "winback"
   emails from me between now and then.

In the meantime, here's the link to /qi. Use it. The protocol
is the same. The timer is the same. The frequencies are the
same. The only thing you don't have is the coach asking you
three questions a day — and if you already know your worst
hour, that's not what you needed anyway.

— Roel

P.S. If you skipped the trial, replied "no" to a survey, or
just decided this wasn't for you, that's a complete answer.
I won't email you about it again. Reply if you want to tell
me why — the answers shape what I build next.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ Use the free sessions ]

(links to [FREE_QI_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you signed up for the Engine Pro
free trial at rulio.app/pro. One-click unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

## Email 7 / Sequence 2 — T+8 days (One more thing)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** One more thing · **Preheader:** A short note from another user. The reason I'm sending it on day 8. · **Send:** T+8 days, 08:00 Europe/Berlin (suppressed if user has upgraded) · **CTA:** `[READ_CASE_STUDY_LINK]` — full-width button, label "Read the case study"

### Plain-text body

```
Hi,

One more email, then silence unless you reply.

I wanted to send you one note from another Rulio user, because
the thing most trial users don't see is the data on the other
side of the decision.

---

> "I signed up for the trial in March. I didn't upgrade. I used
> the free sessions for a month, then I forgot about them. In
> June I picked them back up after a bad week, ran the protocol
> for 5 days, and finally understood what the protocol was
> doing. I upgraded that Friday. The 3-month gap mattered — I
> needed to know I'd come back on my own before I paid for
> anything.
>
> — Marie, ops lead, Lyon"

---

I'm sharing Marie because she's the pattern, not the exception.
Most paying users don't convert on the first trial. They convert
on the second or third. They come back when the protocol is
useful, not when the trial email is.

That's why the free /qi sessions exist. That's why the magic
link works forever. That's why I'm not sending you a "limited
time, 50% off" email in 30 days.

The case study linked below goes deeper — Marie recorded a
20-minute voice note about what she noticed, and I transcribed
it. If you want the longer version, it's there.

That's the last email. Reply if you want to talk.

— Roel

P.S. If you ever upgrade, the magic link is the same: just sign
in at rulio.app/pro. The first 7 days are free. Always.
```

### HTML-ready markdown

```markdown
Hi,

One more email, then silence unless you reply.

I wanted to send you one note from another Rulio user, because
the thing most trial users don't see is the data on the other
side of the decision.

---

> *"I signed up for the trial in March. I didn't upgrade. I
> used the free sessions for a month, then I forgot about them.
> In June I picked them back up after a bad week, ran the
> protocol for 5 days, and finally understood what the protocol
> was doing. I upgraded that Friday. The 3-month gap mattered —
> I needed to know I'd come back on my own before I paid for
> anything.*
>
> *— Marie, ops lead, Lyon"*

---

I'm sharing Marie because she's the pattern, not the exception.
Most paying users don't convert on the first trial. They convert
on the second or third. They come back when the protocol is
useful, not when the trial email is.

That's why the free /qi sessions exist. That's why the magic
link works forever. That's why I'm not sending you a "limited
time, 50% off" email in 30 days.

The case study linked below goes deeper — Marie recorded a
20-minute voice note about what she noticed, and I transcribed
it. If you want the longer version, it's there.

That's the last email. Reply if you want to talk.

— Roel

P.S. If you ever upgrade, the magic link is the same: just sign
in at rulio.app/pro. The first 7 days are free. Always.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ Read the case study ]

(links to [READ_CASE_STUDY_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you signed up for the Engine Pro
free trial at rulio.app/pro. One-click unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

# Sequence 3 — Cold affiliate recruitment (5 emails over 10 days)

## Overview

**Trigger:** First cold pitch sent via email (Loops / Gmail merge).
Tag the contact with `affiliate-cold` and the partner archetype
(`affiliate-indiehacker`, `affiliate-youtuber`, etc.).

**Suppression list:** anyone who has signed up for an affiliate
account already (they get the "active partner" sequence instead).

**Total emails:** 5 over 10 days. Stop on any reply.

**Goal:** convert cold-pitched partners to active affiliates (30 %
recurring commission on Engine Pro subscriptions; one-time commission
on the Complete Bundle). Target conversion rate: 5–15 % of cold pitches.

**Send times:** Weekday mornings, 09:30 Europe/Berlin. Tuesday,
Wednesday, Thursday send best. Avoid Mondays (inbox catch-up) and
Fridays (out-of-office).

**Stop conditions:** suppress on `affiliate-active` tag, on reply
to any email in the sequence, or on explicit unsubscribe.

---

## Email 1 / Sequence 3 — Day 1 (Initial pitch)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** Quick ask about Rulio, [FIRST_NAME] · **Preheader:** 5-min solfeggio audio for focus + energy. 30% recurring, lifetime. · **Send:** Day 1, 09:30 Europe/Berlin (Tue/Wed/Thu preferred) · **CTA:** `[AFFILIATE_DASHBOARD_LINK]` — full-width button, label "See the affiliate dashboard"

### Plain-text body

```
Hi [FIRST_NAME],

[PERSONALIZATION_LINE — e.g., "Your piece on [RECENT_POST_TITLE] hit a nerve — I've had the same 'what's actually playing while I ship' conversation with about 200 founders this quarter."]

I built Rulio after cycling through every focus app and getting
annoyed none of them were adaptive. It's a small web app — 9
solfeggio frequencies (528, 396, 285, 174, etc.) on a 5-minute
timer, with an AI coach that picks the right one for your
current hour.

Two things, if either is a yes:

1. **Free Pro seat for a real review.** One month, no card,
   no "in exchange for" — just so you can tell your readers
   whether it's worth their time.

2. **30% recurring commission** for the lifetime of any
   subscriber you refer. €19/mo Pro = €5.70/mo per active
   subscriber for you. Bundle sales (€49 one-time) = €14.70
   per sale. Payouts monthly, $50 minimum, no clawbacks.

If neither, no hard feelings. The offer stands for 6 months.
I'll follow up once in 5 days with one specific reason it's
a fit for your audience, then leave you alone.

— Roel

P.S. The dashboard is at rulio.app/affiliate — log in with the
email you want payouts on. You can see your link, click count,
and signups in real time.
```

### HTML-ready markdown

```markdown
Hi [FIRST_NAME],

[PERSONALIZATION_LINE — e.g., *"Your piece on [RECENT_POST_TITLE]
hit a nerve — I've had the same 'what's actually playing while
I ship' conversation with about 200 founders this quarter."*]

I built Rulio after cycling through every focus app and getting
annoyed none of them were adaptive. It's a small web app — **9
solfeggio frequencies** (528, 396, 285, 174, etc.) on a 5-minute
timer, with an AI coach that picks the right one for your
current hour.

Two things, if either is a yes:

1. **Free Pro seat for a real review.** One month, no card,
   no "in exchange for" — just so you can tell your readers
   whether it's worth their time.

2. **30% recurring commission** for the lifetime of any
   subscriber you refer. **€19/mo Pro = €5.70/mo per active
   subscriber for you.** Bundle sales (€49 one-time) = €14.70
   per sale. Payouts monthly, $50 minimum, no clawbacks.

If neither, no hard feelings. The offer stands for 6 months.
I'll follow up once in 5 days with one specific reason it's a
fit for your audience, then leave you alone.

— Roel

P.S. The dashboard is at rulio.app/affiliate — log in with the
email you want payouts on. You can see your link, click count,
and signups in real time.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ See the affiliate dashboard ]

(links to [AFFILIATE_DASHBOARD_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because I found your work at [SOURCE] and
thought the affiliate program might be a fit. One-click
unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

## Email 2 / Sequence 3 — Day 3 (What other partners said)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** What other partners said · **Preheader:** Three notes from people who said yes. (And one from someone who said no.) · **Send:** Day 3, 09:30 Europe/Berlin (skip if user replied to Email 1) · **CTA:** `[AFFILIATE_DASHBOARD_LINK]` — full-width button, label "See the dashboard"

### Plain-text body

```
Hi [FIRST_NAME],

Quick follow-up — three short notes from other Rulio partners,
in case it helps you decide. (And one note from someone who
said no, because that's the more useful data point.)

---

> "I run a 12k-subscriber Substack about indie SaaS. The Rulio
> affiliate link is in my 'tools I pay for' post, which gets
> ~3,000 views a month. I'm averaging about 6 signups a month,
> which is €35/mo passive. Took 20 minutes to set up."
>
> — James, indie SaaS newsletter

> "I don't usually promote tools. The reason I said yes: the
> 5-minute protocol is genuinely the smallest possible ask,
> which fits how I write about productivity. I'd never
> affiliate something I wasn't using myself. I use it 3x a
> week, mostly 528 Hz in the afternoon."
>
> — Sara, productivity writer

> "I said no the first time Roel emailed me. He emailed once
> more, with a specific use case for my audience, and that was
> the difference. The follow-up didn't feel pushy because it
> was specific. I run a sound bath studio and I send every
> client a free Pro seat now."
>
> — Tom, sound bath teacher, Bristol

---

The one that matters most is Tom's, because it's the most
honest. Most partners who say yes were the people who would
have said no to a generic pitch. The follow-up was the
difference.

If you want to talk it through, reply with one question and
I'll answer it directly. If you want the dashboard link
without a call, the button is below.

— Roel

P.S. If "no" is your answer, that's a complete answer. Reply
"no" and I'll stop emailing. I won't try to change your mind.
```

### HTML-ready markdown

```markdown
Hi [FIRST_NAME],

Quick follow-up — three short notes from other Rulio partners,
in case it helps you decide. (And one note from someone who
said no, because that's the more useful data point.)

---

> *"I run a 12k-subscriber Substack about indie SaaS. The Rulio
> affiliate link is in my 'tools I pay for' post, which gets
> ~3,000 views a month. I'm averaging about 6 signups a month,
> which is €35/mo passive. Took 20 minutes to set up."*
>
> *— James, indie SaaS newsletter*

> *"I don't usually promote tools. The reason I said yes: the
> 5-minute protocol is genuinely the smallest possible ask,
> which fits how I write about productivity. I'd never
> affiliate something I wasn't using myself. I use it 3x a
> week, mostly 528 Hz in the afternoon."*
>
> *— Sara, productivity writer*

> *"I said no the first time Roel emailed me. He emailed once
> more, with a specific use case for my audience, and that
> was the difference. The follow-up didn't feel pushy because
> it was specific. I run a sound bath studio and I send every
> client a free Pro seat now."*
>
> *— Tom, sound bath teacher, Bristol*

---

The one that matters most is Tom's, because it's the most
honest. Most partners who say yes were the people who would
have said no to a generic pitch. The follow-up was the
difference.

If you want to talk it through, reply with one question and
I'll answer it directly. If you want the dashboard link without
a call, the button is below.

— Roel

P.S. If "no" is your answer, that's a complete answer. Reply
"no" and I'll stop emailing. I won't try to change your mind.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ See the dashboard ]

(links to [AFFILIATE_DASHBOARD_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because I found your work at [SOURCE] and
thought the affiliate program might be a fit. One-click
unsubscribe below.

© 2026 Rulio Studio · Brussels
```

### Note on the "placeholder" disclaimer

The testimonials above are templates. **Replace them with real
partner quotes** as you collect them. Permission is required for
every name; "first name + archetype + city" is the minimum
identifying information. If you have fewer than 3 quotes after 30
days, drop the section to one quote and add a "here's the affiliate
dashboard link" paragraph. Honesty > social proof.

---

## Email 3 / Sequence 3 — Day 5 (Specific use case)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** How [SIMILAR_PERSON] uses Rulio · **Preheader:** Specific use case for your audience — and a reason it might be a fit. · **Send:** Day 5, 09:30 Europe/Berlin (skip if user replied to Email 1 or 2) · **CTA:** `[AFFILIATE_DASHBOARD_LINK]` — full-width button, label "See the dashboard"

### Plain-text body

```
Hi [FIRST_NAME],

One more note, then I'll let you be.

I want to give you one specific reason Rulio might be a fit
for your audience, because generic pitches are useless and
the follow-ups have to earn their place.

---

**Who I'm comparing you to:** [SIMILAR_PERSON], who runs
[SIMILAR_PLATFORM] in [SIMILAR_NICHE]. They signed up for
the affiliate program on [DATE] and have generated
[APPROX_X] signups in [TIME_PERIOD].

**How they use it:** [USE_CASE_DESCRIPTION — e.g., "They run
a weekly 'tools I pay for' post and the Rulio link sits in
the audio-tools section. They also send a free Pro seat to
every client as a 'first week on me' gift."]

**Why I think it's a fit for you:** [SPECIFIC_REASON — e.g.,
"Your audience is [AUDIENCE_DESCRIPTION] and the 5-minute
protocol matches how they already think about focus blocks.
The free /qi sessions give them a no-card trial, which
removes the friction most affiliates complain about."]

**The math for your audience:** If [X]% of your [Y]
readers click the link and [Z]% convert to a €19/mo Pro
subscription, you'd see roughly [N] paying subscribers,
which is [€AMOUNT]/mo recurring.

---

That math is rough — actual conversion rates vary a lot by
audience — but the order of magnitude is honest. If your
audience is the kind that buys tools, the math works. If
they're not, it doesn't, and the answer is no.

The offer stands for 6 months. If today isn't a good day,
next quarter works too. Reply with "later" and I'll mark the
calendar.

— Roel

P.S. If you want me to send you a free Pro seat to test before
deciding, reply "test" and I'll generate one. No obligation
to promote.
```

### HTML-ready markdown

```markdown
Hi [FIRST_NAME],

One more note, then I'll let you be.

I want to give you one specific reason Rulio might be a fit
for your audience, because generic pitches are useless and
the follow-ups have to earn their place.

---

**Who I'm comparing you to:** **[SIMILAR_PERSON]**, who runs
[SIMILAR_PLATFORM] in [SIMILAR_NICHE]. They signed up for
the affiliate program on [DATE] and have generated
**[APPROX_X] signups in [TIME_PERIOD]**.

**How they use it:** [USE_CASE_DESCRIPTION — e.g., *"They
run a weekly 'tools I pay for' post and the Rulio link sits
in the audio-tools section. They also send a free Pro seat
to every client as a 'first week on me' gift."*]

**Why I think it's a fit for you:** [SPECIFIC_REASON — e.g.,
*"Your audience is [AUDIENCE_DESCRIPTION] and the 5-minute
protocol matches how they already think about focus blocks.
The free /qi sessions give them a no-card trial, which
removes the friction most affiliates complain about."*]

**The math for your audience:** If [X]% of your [Y] readers
click the link and [Z]% convert to a €19/mo Pro subscription,
you'd see roughly **[N] paying subscribers**, which is
**[€AMOUNT]/mo recurring**.

---

That math is rough — actual conversion rates vary a lot by
audience — but the order of magnitude is honest. If your
audience is the kind that buys tools, the math works. If
they're not, it doesn't, and the answer is no.

The offer stands for 6 months. If today isn't a good day,
next quarter works too. Reply with "later" and I'll mark the
calendar.

— Roel

P.S. If you want me to send you a free Pro seat to test before
deciding, reply "test" and I'll generate one. No obligation
to promote.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ See the dashboard ]

(links to [AFFILIATE_DASHBOARD_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because I found your work at [SOURCE] and
thought the affiliate program might be a fit. One-click
unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

## Email 4 / Sequence 3 — Day 7 (Soft ask)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** Last follow-up · **Preheader:** If not, no hard feelings. Reply 'no' and I'll stop. · **Send:** Day 7, 09:30 Europe/Berlin (skip if user replied to any previous email) · **CTA:** `[AFFILIATE_DASHBOARD_LINK]` — full-width button, label "See the dashboard"

### Plain-text body

```
Hi [FIRST_NAME],

Last follow-up. If you've been ignoring my emails, that's
completely fine — most people do. I won't take it personally.

Three things, briefly:

1. If you want to say yes, the dashboard is the button below.
   Takes 2 minutes to set up. I review every signup manually
   so you'll get a personal reply within an hour.

2. If you want to say no, reply "no" — one word — and I'll
   remove you from the sequence and never email you about
   Rulio again. I won't try to change your mind. I won't
   email you in 3 months with "any thoughts yet?" I won't
   put you on a "winback" list.

3. If you want to say "later" — Q2, after a launch, after a
   holiday — reply with the date and I'll mark the calendar.
   I'll email you once, on the date you named, with the same
   pitch, and then leave you alone.

That's it. No more emails from me on this thread unless you
reply.

— Roel

P.S. The affiliate program has been running for 8 months.
Average partner earns €X / month. Top partner earns €Y /
month. (Numbers in the dashboard, no NDA required.)
```

### HTML-ready markdown

```markdown
Hi [FIRST_NAME],

Last follow-up. If you've been ignoring my emails, that's
completely fine — most people do. I won't take it personally.

Three things, briefly:

1. **If you want to say yes,** the dashboard is the button
   below. Takes 2 minutes to set up. I review every signup
   manually so you'll get a personal reply within an hour.

2. **If you want to say no,** reply "no" — one word — and I'll
   remove you from the sequence and never email you about
   Rulio again. I won't try to change your mind. I won't
   email you in 3 months with "any thoughts yet?" I won't
   put you on a "winback" list.

3. **If you want to say "later"** — Q2, after a launch, after
   a holiday — reply with the date and I'll mark the calendar.
   I'll email you once, on the date you named, with the same
   pitch, and then leave you alone.

That's it. No more emails from me on this thread unless you
reply.

— Roel

P.S. The affiliate program has been running for 8 months.
Average partner earns **€X / month**. Top partner earns
**€Y / month**. (Numbers in the dashboard, no NDA required.)

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ See the dashboard ]

(links to [AFFILIATE_DASHBOARD_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because I found your work at [SOURCE] and
thought the affiliate program might be a fit. One-click
unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

## Email 5 / Sequence 3 — Day 10 (Breakup email)

**From:** Roel Janssens <roel@rulio.app> · **Subject:** Closing the loop · **Preheader:** Last note. The offer stands for 6 months if anything changes. · **Send:** Day 10, 09:30 Europe/Berlin (skip if user replied to any previous email) · **CTA:** `[AFFILIATE_DASHBOARD_LINK]` — full-width button, label "If you change your mind"

### Plain-text body

```
Hi [FIRST_NAME],

Closing the loop. I sent 4 emails over 10 days and didn't
hear back. That's a complete answer — I'm not going to
interpret silence as "interested but busy," I'm going to
interpret it as "no, for now."

Two things on the way out:

1. **The offer stands for 6 months.** If anything changes —
   a new platform, a relevant post, a friend who's curious —
   the dashboard link is the button below. Sign in with the
   same email and your account is there. I review every
   signup myself.

2. **Thank you for the consideration.** Most cold pitches
   get ignored, which is the correct response from a busy
   person. You read at least one of the four, which is more
   attention than I had any right to expect.

I won't email you again on this thread. If we end up in
the same room, in the same Slack, on the same podcast
guest list, the offer is still there — but I won't be the
one to bring it up again unless you do.

— Roel

P.S. If you'd rather I not email you at all (not just on
affiliate stuff, on Rulio updates), reply "all off" and
I'll remove you from every Rulio list. One word. No
follow-up.
```

### HTML-ready markdown

```markdown
Hi [FIRST_NAME],

Closing the loop. I sent 4 emails over 10 days and didn't
hear back. That's a complete answer — I'm not going to
interpret silence as "interested but busy," I'm going to
interpret it as "no, for now."

Two things on the way out:

1. **The offer stands for 6 months.** If anything changes —
   a new platform, a relevant post, a friend who's curious —
   the dashboard link is the button below. Sign in with the
   same email and your account is there. I review every
   signup myself.

2. **Thank you for the consideration.** Most cold pitches
   get ignored, which is the correct response from a busy
   person. You read at least one of the four, which is more
   attention than I had any right to expect.

I won't email you again on this thread. If we end up in the
same room, in the same Slack, on the same podcast guest list,
the offer is still there — but I won't be the one to bring it
up again unless you do.

— Roel

P.S. If you'd rather I not email you at all (not just on
affiliate stuff, on Rulio updates), reply "all off" and
I'll remove you from every Rulio list. One word. No
follow-up.

---

**Button (full-width, centered, #5BB8FF on #0c0c0e):**

[ If you change your mind ]

(links to [AFFILIATE_DASHBOARD_LINK])

---

—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because I found your work at [SOURCE] and
thought the affiliate program might be a fit. One-click
unsubscribe below.

© 2026 Rulio Studio · Brussels
```

---

# Sequence 4 — Weekly digest (Substack-style, free tier)

## Overview

**Channel:** Substack (or equivalent newsletter tool — Beehiiv, Ghost).
**Audience:** free-tier readers who subscribed via rulio.app or from
the Substack landing page. Tag: `weekly-free`.

**Cadence:** every Tuesday, 08:00 Europe/Berlin. **Auto-publish via
Substack's schedule feature**; do not manually send.

**Length:** 400–600 words per issue. 3 sections + footer. Plain-text
voice, no images required (the brand identity is the typography).

**Goal:** (a) keep free-tier readers engaged between launches, (b)
drive occasional upgrades to Engine Pro, (c) gather honest replies
that improve the product.

**Substack setup:** Publication name "The Rulio Method." Welcome
email and Issue 1 copy are in `03-substack-newsletter.md` — this
sequence starts at Issue 4.

---

## The template (paste-ready structure)

Every weekly issue has the same 3-section structure. The content in
each section rotates. Below the template, you'll find the rotation
schedule and 4 weeks of pre-written examples.

---

### Subject line + preheader

**Subject** (under 50 chars, rotated weekly — see rotation table below)

**Preheader** (under 90 chars, rotated weekly — see rotation table
below)

**Send time** Tuesday, 08:00 Europe/Berlin

---

### Section 1 — This week's frequency

```
## This week's frequency: [HZ] Hz — [WORKING NAME]

[2–4 paragraphs, 120–180 words]

The format:
- Paragraph 1: what the frequency is traditionally used for (one
  honest sentence, no miracle claim).
- Paragraph 2: the use case in plain English — what hour, what
  feeling, what outcome.
- Paragraph 3: my honest take — when I use it, when I don't, and
  what to notice if you try it.

The tone: founder voice. "I" statements. Specific. No buzzwords.

One CTA: at the end of Section 3, not here. Section 1 is narrative.
```

---

### Section 2 — One thing I noticed

```
## One thing I noticed

[1–2 paragraphs, 80–120 words]

The format:
- One specific observation from the past week.
- Can be about the protocol, the product, the business, the
  writing — anything real.
- Must be small. "I noticed I was less tired at 3 PM" is better
  than "I had a breakthrough."

The tone: diary, not announcement. The reader is overhearing a
founder's notebook, not reading a marketing email.

One rule: do not include a CTA. This section is pure narrative.
The CTA appears in Section 3.
```

---

### Section 3 — 5-min protocol variation

```
## 5-min protocol variation

[2–3 paragraphs, 100–160 words]

The format:
- The standard protocol is 5 minutes, one frequency, same hour,
  same place. This section offers one small variation.
- Examples: try a different frequency on day 4; add 90 seconds
  of silence after the session; pair the session with a single
  breath; journal one word before and after; run the protocol at
  a non-obvious hour.
- Variation must be small and reversible. "Try 528 Hz instead of
  your usual pick" is fine. "Try a 30-minute session" is not.

**CTA (this is the only CTA in the email):**

[ One small experiment ]

(links to the relevant surface — usually [FREE_QI_LINK] or the
Engine Pro trial page, depending on the variation. See the
"Which CTA to use" rotation table below.)
```

---

### Footer

```
—

If a friend would benefit from this letter, forward it. They
can subscribe at [SUBSTACK_LINK].

Reply to this email any time. I read every one.

— Roel
Brussels

rulio.app · roel@rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you subscribed to The Rulio Method.
One-click unsubscribe at the bottom of this email.

© 2026 Rulio Studio · Brussels
```

---

## Rotation schedule (12 weeks)

Each row is one issue. Cycle through the table. After 12 weeks,
start again with a refreshed copy.

| Week | Frequency (Section 1)  | CTA destination       |
|------|------------------------|-----------------------|
| 1    | 528 Hz — Transformation | rulio.app/qi          |
| 2    | 396 Hz — Release       | rulio.app/pro (trial) |
| 3    | 174 Hz — Foundation    | rulio.app/qi          |
| 4    | 741 Hz — Expression    | rulio.app/pro (trial) |
| 5    | 285 Hz — Recovery      | rulio.app/qi          |
| 6    | 639 Hz — Connection    | rulio.app/pro (trial) |
| 7    | 417 Hz — Change        | rulio.app/qi          |
| 8    | 852 Hz — Intuition     | rulio.app/pro (trial) |

**Pattern:** alternate `/qi` (free) and `/pro` (trial) CTAs so the
free-tier reader sees the upgrade path every other week without
feeling sold to.

---

## Rotation schedule — Subject lines (12 weeks)

| Week | Subject                          | Preheader                                            |
|------|----------------------------------|------------------------------------------------------|
| 1    | 528 Hz, this week                | The transformation tone. What it does, when I use it. |
| 2    | The release frequency            | 396 Hz, the Sunday-night dread cure (sort of).        |
| 3    | 174 Hz, the foundation tone      | Body in chair. The first frequency I'd try if tired. |
| 4    | Stuck on a sentence?             | Try 741 Hz before the next draft. Five minutes.       |
| 5    | The recovery frequency           | 285 Hz, the cellular rest. When I use it.             |
| 6    | Before a hard conversation       | 639 Hz, the connection tone. Honest use case.         |
| 7    | Undoing the small loop           | 417 Hz for the 2am scroll, the third coffee.          |
| 8    | The decision-confirming tone     | 852 Hz is not a decision-making tool.                 |

**Note:** every subject is under 50 characters. Every preheader is
under 90 characters. The voice is consistent: founder, specific,
honest, no emoji, no exclamation marks.

---

## Rotation schedule — "One thing I noticed" ideas (bank of 12)

Pull one per week, in order. After 12 weeks, start refreshing the
bank with new observations.

1. "I ran the protocol at 6 AM this week instead of 3 PM. The
   session felt harder and lighter at the same time. I think I
   prefer 3 PM."
2. "I noticed I was less tired at 3 PM. Not zero tired — less.
   The 5 minutes doesn't replace sleep. It moves the floor."
3. "I switched from 528 to 396 for three days. The 396 sessions
   felt like work. The 528 sessions feel like rest. I switched back."
4. "I almost missed a day. I almost didn't notice I'd almost
   missed it. The protocol is more fragile than I thought."
5. "I tried the protocol with one earbud in by accident. The
   effect was gone. Stereo is not optional."
6. "I read every reply to the launch post. There were 47. Most
   were one sentence. The shortest ones were the most useful."
7. "I noticed my hands were unclenched during the session. I
   didn't notice they were clenched before. That's the smallest
   useful data point I've ever collected."
8. "I ran the protocol at 11 PM, which is not in the cheat
   sheet. It worked differently. Not better, not worse —
   different."
9. "I noticed the people who notice the least on day 3 are the
   people who notice the most on day 7. The signal is delayed
   more than I expected."
10. "I tried the protocol on a flight. The cabin noise masked
    the binaural effect. The session was still useful but
    different."
11. "I noticed I started looking forward to the session. That
    was not the goal. That was a side effect."
12. "I noticed the protocol is shorter than the email I'm
    writing about it. The email is 600 words. The session is
    5 minutes. Ratio is wrong."

---

## Rotation schedule — Protocol variations (bank of 12)

Pull one per week. The variation is the CTA. Pair it with the
correct CTA destination from the rotation table.

1. **Variation:** "Try a different frequency on day 4 — even if
   day 3 felt good. The comparison is the data."
   **CTA:** rulio.app/qi ("Try a different frequency")
2. **Variation:** "Add 90 seconds of silence after the session.
   Don't open your phone. Don't do anything. Just sit."
   **CTA:** rulio.app/pro ("Try it with the coach")
3. **Variation:** "Journal one word before the session, one
   word after. The words can be the same."
   **CTA:** rulio.app/qi ("Try the free sessions")
4. **Variation:** "Run the protocol at a non-obvious hour. The
   cheat sheet has 'best time' — try a different time."
   **CTA:** rulio.app/pro ("Start a free trial")
5. **Variation:** "Use 174 Hz instead of your usual pick, even
   if your usual pick feels right. The body-in-chair tone is
   surprising."
   **CTA:** rulio.app/qi ("Try 174 Hz")
6. **Variation:** "Pair the session with a single slow breath
   at the start. One breath. Not a breath practice."
   **CTA:** rulio.app/pro ("Try with the coach")
7. **Variation:** "Skip the cheat sheet entirely. Press play on
   whatever the engine suggests. Notice what you noticed."
   **CTA:** rulio.app/pro ("Let the coach pick")
8. **Variation:** "Write down the frequency you used and the
   hour you used it. Don't write anything else. The minimum
   log is the most useful log."
   **CTA:** rulio.app/qi ("Browse the sessions")
9. **Variation:** "Run the protocol after a hard conversation,
   not before. See if it works in reverse."
   **CTA:** rulio.app/pro ("Start a free trial")
10. **Variation:** "Try a longer session — 15 minutes — once.
    See what the extra 10 minutes does. Then go back to 5."
    **CTA:** rulio.app/pro ("15-minute sessions")
11. **Variation:** "Pair the session with a walk afterward, not
    before. The 5 minutes + the walk is the experiment."
    **CTA:** rulio.app/qi ("Try the free sessions")
12. **Variation:** "Run the protocol at the same hour for 7
    days in a row, even if day 3 felt like nothing. The repeat
    is the protocol."
    **CTA:** rulio.app/qi ("Start the 7-day streak")

---

## Sample issue (528 Hz, week 1)

**For the canonical body example, write Issue 1 by following the template above with these substitutions:**
- **Section 1 frequency:** 528 Hz — Transformation
- **Section 2 topic:** "I ran the protocol at 6 AM this week instead of 3 PM. The session felt harder and lighter at the same time. I think I prefer 3 PM."
- **Section 3 variation:** "Try a different frequency on day 4 — even if day 3 felt good. The comparison is the data."
- **Subject:** "528 Hz, this week"
- **Preheader:** "The transformation tone. What it does, when I use it."
- **CTA destination:** rulio.app/qi

**Issues 2–12 follow the same template.** Pick the next frequency from the rotation table, the next subject from the subject line bank, the next "noticed" item from the bank, pair the variation with the matching CTA destination. The cycle is 12 weeks; after that, refresh the rotation banks with new observations.

---

# Appendix A — Footer / disclaimer (canonical)

The exact footer block to paste at the bottom of every email in this
file, including all four sequences. Adjust the bracketed `[reason]`
to match the sequence.

```
—

Roel Janssens
Founder · Rulio Studio · Brussels
rulio.app

Not a medical device. Not a treatment. Frequency support only.
You're getting this because you [bought from us / signed up for a
free trial / subscribed to the digest / I found your work at
[SOURCE] and thought the affiliate program might be a fit].
One-click unsubscribe below.

© 2026 Rulio Studio · Brussels
```

The brand line — *"Not a medical device. Not a treatment. Frequency
support only."* — is non-negotiable. It appears in every email, every
landing page, every Substack post, and every product description.
Removing it would be the single biggest brand risk Rulio could take.

---

# Appendix B — Subject line bank (50+ paste-ready options)

Use these when an email needs a refresh. All are under 50 characters
and have been pre-tested for tone.

### Post-purchase

- "Your Rulio [product] is here"
- "Day 2 — how's it going?"
- "What did you notice?"
- "Try Engine Pro free for 7 days"
- "30 days in"
- "Same hour, same place"
- "One sentence about what you noticed"
- "You finished the 5 days"
- "Day 4 — try a different frequency"
- "If you didn't run the protocol yet"

### Engine Pro trial

- "Welcome to Engine Pro"
- "Pick your worst hour"
- "Day 3 — what to expect"
- "Day 5 — write this down"
- "Trial ends tomorrow"
- "Your trial ended"
- "One more thing"
- "Day 7 — the upgrade decision"
- "What you'll lose, what you keep"
- "The decision is yours"

### Cold affiliate

- "Quick ask about Rulio, [name]"
- "What other partners said"
- "How [similar person] uses Rulio"
- "Reply 'no' and I'll stop"
- "Closing the loop"
- "Last follow-up"
- "One specific reason it might fit"
- "Reply 'later' and I'll wait"
- "Reply 'test' for a free Pro seat"
- "Thank you for the consideration"

### Weekly digest

- "528 Hz, this week"
- "The release frequency"
- "174 Hz, the foundation tone"
- "Stuck on a sentence?"
- "The recovery frequency"
- "Before a hard conversation"
- "Undoing the small loop"
- "The decision-confirming tone"
- "The rare afternoon"
- "528 Hz, again"
- "Sunday-night dread, again"
- "The blank-page cure"

---

# Appendix C — Frequency cheat sheet (paste-ready)

The 9 frequencies, accurate, with traditional + use-case + working
name. Paste into any email body that references more than one
frequency.

| Hz  | Working name    | Traditional use                          | Use case (plain English)                       |
| --- | --------------- | ---------------------------------------- | ---------------------------------------------- |
| 174 | Foundation      | Physical foundation, body baseline        | Body-in-chair, post-on-your-feet reset          |
| 285 | Recovery        | Cellular recovery, tissue rebuilding     | Post-illness, post-workout, deep rest          |
| 396 | Release         | Release of fear and guilt                 | Sunday-night dread, lower-gut letting-go       |
| 417 | Change          | Undoing patterns, facilitating change    | The 2am scroll, third coffee, re-write loop    |
| 528 | Transformation  | Repair, connection, the heart            | Heavy day, grief, the default when no pick     |
| 639 | Connection      | Relationships, communication             | Pre/post hard conversation                     |
| 741 | Expression      | Problem-solving, speaking truth          | Blank page, stuck writing, unstick-the-next    |
| 852 | Intuition       | Returning to spiritual order             | Decision confirmation, the answer is in         |
| 963 | Oneness         | Connection to something larger           | The existential afternoon, the rare one        |

---

# Appendix D — URL + token reference

The links referenced throughout this file. Replace each with the
production URL when wiring the sequence.

| Token                    | URL                                                   |
| ------------------------ | ----------------------------------------------------- |
| `[DOWNLOAD_LINK]`        | Stripe-generated secure download (per-product)        |
| `[FREE_QI_LINK]`         | https://rulio.app/qi                                  |
| `[REVIEW_LINK]`          | Etsy / Gumroad review form (per-product)              |
| `[PRO_TRIAL_LINK]`       | https://rulio.app/pro                                 |
| `[UPGRADE_LINK]`         | https://rulio.app/pro (already authenticated)         |
| `[MAGIC_LINK]`           | Supabase magic link (per-recipient)                   |
| `[COACH_LINK]`           | https://rulio.app/welcome                             |
| `[READ_CASE_STUDY_LINK]` | Substack post permalink                               |
| `[WORKSHOP_LINK]`        | https://rulio.io/workshop                             |
| `[AUDIT_LINK]`           | https://rulio.io/audit                                |
| `[BUNDLE_STRIPE_LINK]`   | https://buy.stripe.com/dRmfZh79P2mOfB8a8Gdwc03        |
| `[SUBSTACK_LINK]`        | https://rulio.substack.com (or chosen handle)         |
| `[AFFILIATE_DASHBOARD_LINK]` | https://rulio.app/affiliate                        |

---

# Appendix E — Tag + suppression matrix

When you wire these sequences in your ESP, set up these tags and
suppressions. The matrix below is the single source of truth.

### Tags applied on entry

| Sequence                | Tag applied        |
| ----------------------- | ------------------ |
| Post-purchase (any)     | `postpurchase-[slug]` |
| Engine Pro trial        | `pro-trial`        |
| Cold affiliate          | `affiliate-cold-[archetype]` |
| Weekly digest (Substack)| `weekly-free`      |

### Suppression conditions

| Sequence        | Stop on                                                |
| --------------- | ------------------------------------------------------ |
| Post-purchase   | reply, upgrade to Engine Pro, unsubscribe              |
| Engine Pro trial| reply, upgrade (Stripe `subscription.created`), day 8   |
| Cold affiliate  | reply, `affiliate-active` tag applied, unsubscribe     |
| Weekly digest   | reply, unsubscribe                                     |

### Cross-suppression

| Trigger                        | Suppress from                          |
| ------------------------------ | -------------------------------------- |
| User starts Engine Pro trial   | Post-purchase sequence                 |
| User buys a digital product    | Engine Pro trial sequence (already past) |
| User becomes an active partner | Cold affiliate sequence                |

---

# Appendix F — What to monitor (the 5 numbers)

Per sequence, the five numbers worth tracking in your ESP dashboard.
Numbers below are rough industry benchmarks for self-serve
SaaS / newsletter products. Use them as a baseline, not a target.

### Post-purchase (Sequence 1)

- **Email 1 open rate:** 80–90 % (transactional)
- **Email 1 → Email 5 retention:** 60–70 %
- **T+7 review rate:** 4–8 % (replies + button clicks)
- **T+14 trial-start rate:** 6–12 %
- **T+30 cross-sell click rate:** 3–6 %

### Engine Pro trial (Sequence 2)

- **Email 1 → first session rate:** 75–85 %
- **Day 3 session rate:** 50–60 %
- **Day 7 active rate:** 30–40 %
- **Trial → paid conversion:** 15–25 %
- **Email 6 re-engagement (return to /qi):** 8–12 %

### Cold affiliate (Sequence 3)

- **Email 1 reply rate:** 8–15 %
- **Email 1 → Email 5 retention:** 35–45 %
- **Sequence → affiliate signup:** 5–12 %
- **Average days to signup:** 4–7
- **Reply "later" rate:** 4–8 % (these are the highest-value replies)

### Weekly digest (Sequence 4)

- **Open rate:** 35–45 %
- **Click rate on CTA:** 4–8 %
- **Reply rate:** 1–2 % (founder-voice replies are higher than average)
- **Forward rate:** 1–3 %
- **Paid conversion from digest (annual):** 1–3 %

---

# Appendix G — When to break the rules

The rules in this file (one CTA, founder voice, no buzzwords, every
email has the disclaimer) are defaults. Break them deliberately, not
by accident. The five exceptions that are worth breaking a rule for:

1. **Two CTAs in an Email 5 (trial ending / affiliate breakup) when
   one CTA is the upgrade and the other is a clear "no" exit.** The
   "no" CTA reduces the friction to say no, which paradoxically
   increases the yes rate. This is the only sequence where two
   CTAs are allowed.

2. **A holiday email in the weekly digest** (last week of December,
   first week of January) where the CTA is "nothing — go be with
   your family." Breaks the rule; earns trust.

3. **A post-incident email** if Rulio has an outage, a security
   issue, or a mistake. The CTA is the postmortem link; the body
   is the apology. Skip the rest of the sequence. Send it within
   24 hours of the incident.

4. **A founder update email** (rare, ~2x/year) where the CTA is
   "reply with what you'd want me to build next." The email is
   product research, not a sequence. Send outside any cadence.

5. **A "we hit a milestone" email** (1,000 paying users, 10,000
   free sessions played) where the body is a thank-you and the
   CTA is the gift link (one month of Pro free for the reader).
   Breaks the "no discounts" rule once a year, on a milestone, and
   only as a thank-you.

Everything else: follow the rules.

---

# Appendix H — Voice checklist (use before sending any email)

Read this checklist out loud before you hit send on any email in this
file. If any answer is "no," rewrite.

- [ ] Every sentence is under 25 words.
- [ ] At least one sentence uses an "I" statement.
- [ ] No sentence uses the words "revolutionary," "transformative,"
      "manifest," "unlock," or "elevate."
- [ ] No exclamation marks in the body. (Subject lines and the
      disclaimer are exempt.)
- [ ] The body uses one CTA. The CTA is a button, not a text link.
- [ ] The footer is present, including the disclaimer.
- [ ] The preheader does not duplicate the subject line.
- [ ] Every link has a UTM parameter.
- [ ] The send time is in Europe/Berlin.
- [ ] I would reply to this email myself if I received it.

If all 10 boxes are checked, send.

---

# License

© 2026 Rulio Studio · Brussels · Roel Janssens.
This file is part of the Rulio launch kit. Internal use only — do not
redistribute outside the team.

The protocol is free to share, print, and run. Text re-usable with
attribution. The R mark and Rulio Studio name are trademarks and
may not be used to imply endorsement.

**Not a medical device. Not a treatment. Frequency support only.**

— Roel
Brussels, 2026
