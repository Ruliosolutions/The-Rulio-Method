# Rulio — Reddit + HN Launch Kit (community-friendly)

> **Product:** Rulio — adaptive solfeggio audio for focus, sleep, and energy
> **Founder:** Roel Janssens, Brussels
> **Pricing:** €19/mo or €180/yr · 14 free sessions at `/qi` · €49 lifetime bundle available
> **Voice per channel:** humble + technical on HN · story-led on r/Entrepreneur · evidence-led on r/meditation · quiet-helpful on r/SleepBetter · metric-honest on Indiehackers
> **Disclosure rule for this file:** every post includes an explicit "I'm the founder" line where the platform's norms demand it, and never includes one where it would read as self-promotion.
> **Last revised:** 2026-09-22

---

## How to use this file

Each post below is written to be pasted independently. Do not cross-link them, do not post the same body in two places, do not "splash and dash" — show up in the comments for at least 2 hours after posting and answer every reply. The accounts that worked in the past for the solfeggio / audio-wellness niche are the ones that answer skeptic comments with receipts, not with marketing copy.

A note on subreddit rules before you post: r/Entrepreneur allows self-promotion only when 90% of the post is value and the link is in the comments; r/meditation bans affiliate links entirely and moderates "I'm selling a thing" posts aggressively; r/SleepBetter and r/insomnia are friendlier to "I built this for myself" framing; Indiehackers is the one place where "I built this, here are my numbers" is the entire point. The posts below are tuned to those rules.

A note on timing: HN is highest-signal Tuesday through Thursday between 8am ET and noon ET. Reddit is timezone-fragmented — the best window for English-language founder posts is Tuesday or Wednesday, 9am–11am US Eastern. For r/meditation specifically, late Sunday evening US time captures the global weekly check-in crowd. For Indiehackers, Tuesday morning is when IH ship-of-the-week posts hit the front page and set the conversation for the week.

A note on your account, before you do anything: if your account is younger than 30 days, has fewer than 50 karma, or has zero posting history, your post will get caught in the subreddit auto-filter and either be silently removed or buried at zero upvotes. The fix is two weeks of "real" activity — substantive comments on other people's posts, upvotes of things you actually find useful, no posting of your own — before you ever share your own link. Section 6 of this file has the full warmup checklist.

A note on what success looks like, because the most common founder mistake in this category is measuring the wrong thing: the goal of week one is not "first paid user," it is "do 30 people come back three days in a row." The paid numbers, if they come, will come in months 3–6 from the cohort that returns. Everything below is calibrated to that. The posts that work in this category are the ones that ask for "tell me what you notice" instead of "buy my thing." The ones that ask for "buy my thing" get banned.

A note on legal / regulatory boundaries: do not make health claims. Anywhere. The line between "this practice helps me focus" (a personal testimonial, fine) and "this practice improves focus" (a health claim, regulated) is real, and r/meditation moderators will flag you for crossing it. The post bodies below are written to stay on the personal-testimonial side of that line. Do not rewrite them to make the claims stronger.

---

## Table of contents

1. [Show HN — "5-min solfeggio practice for the 3 PM wall"](#1-show-hn)
2. [r/Entrepreneur — "burned out twice" founder story](#2-rentrepreneur)
3. [r/meditation — honest evidence review](#3-rmeditation)
4. [r/SleepBetter — 5-min practice for falling asleep](#4-rsleepbetter)
5. [Indiehackers — month-1 retrospective](#5-indiehackers)
6. [Posting cadence + account warmup checklist](#6-cadence)
7. [What to do if a post goes sideways](#7-what-to-do-if-a-post-goes-sideways)
8. [Comment reply bank — skeptics and friendly alike](#8-comment-reply-bank)
9. [Alternative titles (for A/B or repost after removal)](#9-alternative-titles)
10. [Post-mortem template + metrics dashboard](#10-post-mortem)
11. [Quick-reference appendix](#appendix)

---

# 1. Show HN

> **Channel:** news.ycombinator.com — submit via show.hn
> **Goal:** get 5–20 substantive technical comments; convert to ~50 free-tier signups; collect honest critique
> **Self-promotion risk:** low — Show HN is literally the right place for this. But the first comment is the entire pitch. Write it well or don't post.
> **Why this format works for Show HN:** the Show HN audience rewards three things — a real working product, a humble founder, and a specific technical question. They punish three things — vague value props, demo videos instead of live products, and founders who argue in the comments. The post below does all three of the rewarding things and none of the punished things.

## Title

```
Show HN: I built a 5-min solfeggio practice for the 3 PM wall
```

(Under the 80-character title limit. Title alone — no tagline, no emoji, no domain name in the title. The phrase "3 PM wall" is doing a lot of work — it tells the HN reader exactly who this is for without saying "knowledge workers," which would feel salesy.)

## URL

```
https://rulio.app
```

(Submit the homepage, not the /pro page. HN penalizes deep links to paid funnels. Let the homepage do its own work. The homepage has a free-tier CTA above the fold and a one-sentence value prop, both of which load in under a second on a fresh device.)

## First comment (the founder comment — paste this immediately after submitting)

---

Hey HN — I'm Roel, founder of Rulio. I built a 5-minute audio practice that targets the afternoon slump that hits most knowledge workers around 3 PM. Live at https://rulio.app; free tier at /qi. Would value a hard look at the technical choices.

**The problem.** For about a year I kept hitting a wall around 3 PM — foggy head, low motivation, the kind of tiredness no amount of coffee fixes. Pomodoros didn't, walks helped a little, nootropics were a wash. What worked: a short audio practice using a single solfeggio frequency (one of nine: 174, 285, 396, 417, 528, 639, 741, 852, 963 Hz), headphones, eyes closed, five minutes. After two weeks of daily use the wall stopped happening. I have an N-of-1 and a few hundred hours of personal use. The audio-wellness category oversells; I'd rather you evaluate with accurate priors.

**What I built.** A web app that wraps the protocol: (1) a curated library of sessions tagged by intent (focus, sleep, anxiety, energy, deep work), each one frequency, one 5-minute track, 3-second ramp-in, 5-second ramp-out; (2) a lightweight recommender driven by a 3-question check-in — not "AI" in the marketing sense, it's a small rule engine with a vector lookup, ~3MB, runs in the browser, no inference cost; (3) a minimal session log (frequency, duration, optional note), no streaks, no leaderboard, no social layer.

Audio is generated server-side (Python + numpy + scipy), cached as static .wav files behind a CDN. Free-tier sessions decode in <100ms on a mid-range phone.

**What's free.** 14 sessions across all nine frequencies, no signup, no card, no upsell modal, no "create an account" trap. Use it forever.

**What's paid.** Engine Pro: €19/month or €180/year, 7-day free trial, no card. Three things the free tier doesn't have: the recommender learns your time-of-day patterns; weekly trend tracking; longer 20-minute deep practice sessions for sleep and meditation.

**What's open source.** The session-generation pipeline at github.com/roeljanssens/rulio-audio (~600 lines of Python). Recommender code is in the same repo. Frontend, auth, Stripe wiring, analytics are not open — those are what I sell.

**Where I want feedback.**

1. The audio has a 3-second ramp-in and 5-second ramp-out envelope, plus a 5 Hz binaural beat layered on top of the carrier for focus sessions. Is there a reason a different envelope shape (exponential ramp, longer fade) is technically better for the "first 30 seconds of focus" UX? I've been guessing on this.

2. The recommender is intentionally dumb — a lookup table over time-of-day, intent, last session. Argument for staying dumb: interpretability. Argument for making it smarter: an embeddings model would learn patterns the lookup can't. What am I missing?

3. Stack is Next.js + Postgres + Stripe + one Python service for audio, on a €6/month Hetzner box. Is there a part of this stack I'll regret in 12 months? Specifically: should the session log live in Postgres, a flat file, or DuckDB?

**What I will not do.** Claim this cures anything. Mechanism story is honest-but-thin. The product works for me and for ~150 people who have written to me. If you try it and feel nothing, you are the data point that matters most.

Happy to answer anything — including the obvious "why this and not a Spotify playlist" question. Honest answer is the playlist didn't exist when I needed it, and I wanted the recommender.

— Roel, Brussels

---

## Posting checklist for HN

- [ ] Submit at 8:00–9:00 AM ET, Tuesday through Thursday.
- [ ] Paste the first comment within 60 seconds of submitting — HN's algorithm rewards fast first-comment engagement, and a post without a founder comment in the first 2 minutes is at a measurable disadvantage.
- [ ] Set a 2-hour comment window in your calendar. Reply to every comment within 30 minutes during that window. Slower than that and the thread cools.
- [ ] Do not edit the title after submission. HN punishes title edits, sometimes by silently downranking the post.
- [ ] Do not ask for upvotes in any form. The "ask specific questions" pattern is what Show HN rewards; the "please upvote if useful" pattern is what gets flagged.
- [ ] Do not respond to drive-by critics in the first 30 minutes. Wait. The thoughtful commenters arrive in waves. Reply to the substantive ones first.
- [ ] If your post hits the front page (top 30), keep replying for at least 6 hours. Front-page threads stay active that long and a quiet founder looks bad.

---

# 2. r/Entrepreneur

> **Channel:** reddit.com/r/Entrepreneur
> **Goal:** spark a real founder-conversation, generate ~3–8 inbound "how did you build the recommender" DMs, no hard selling
> **Self-promotion risk:** moderate — r/Entrepreneur moderates "I'm the founder" posts. The link goes in a top-level comment, not in the post body. The post itself must be 90%+ value.
> **Why this format works for r/Entrepreneur:** the subreddit is full of "I built a SaaS and made $50k MRR" posts. They get upvoted, but they don't generate conversation. The posts that generate conversation are the ones that admit failure — specifically, the ones that admit specific, recoverable failures. "I burned out twice" is the right opener because it's specific and it disarms the skeptical reader who has seen 400 "I crushed it" posts.

## Title

```
I burned out twice in my 30s. The 5-min practice that fixed it became a €19/mo app. Here's what I learned building it.
```

(118 characters including spaces. Under Reddit's 300-character title limit. Tight. The phrase "5-min practice" is doing the work — it's specific, it's not a buzzword, and it's the thing that separates this from the 400 other "I built a meditation app" posts the subreddit has seen. The phrase "Here's what I learned building it" is the explicit promise of value, which is what the subreddit's auto-moderator looks for.)

## Body

---

Disclosure up front: yes, I built the app I'm going to describe. I am not going to link it in this post — I will link it in a top-level comment if the conversation gets there, because that's what the subreddit rules ask for and because I'd rather you read the story first and decide if the product is even interesting. If I link it in the body, the post gets removed and we both lose. If you read this and the product is interesting to you, the link is in the first top-level comment.

The short version: I burned out twice in 18 months. The second time was worse. I was sleeping 9 hours a night and waking up tired. I was eating well. I exercised. None of it touched the 3 PM wall that had become the wallpaper of my workdays. I tried therapy (helpful, not enough), medication (helpful for six months, then not), a standing desk (no), nootropics (mostly no), a four-day week (helped, didn't fix it). I tried the obvious apps — Headspace, Calm, Waking Up — and they helped in the same way that reading a productivity book helps: intellectually, not practically. I didn't need to be told to meditate for 20 minutes. I needed something that fit between two meetings at 3 PM without anyone noticing.

The thing that actually moved the needle was weird and small: a five-minute audio practice with a single tone, headphones on, eyes closed, every afternoon. After two weeks the wall stopped happening. I have no idea if it's placebo. I have no idea what the mechanism is. I have one N-of-1 and a couple hundred hours of personal data and that is the size of my evidence.

The practice is built on solfeggio frequencies — nine tones (174, 285, 396, 417, 528, 639, 741, 852, 963 Hz) that have a long cultural history in sound healing traditions and very little modern clinical evidence behind most of them. I want to be honest about that. There is a small published literature on binaural beats and entrainment that suggests some of these tones may help with focus and relaxation, but the effect sizes are modest and the studies are short. The Stanford / 528 Hz / oxytocin paper from 2018 was retracted, and if you've heard me talk about "528 Hz repairs DNA" you should know that paper is the source and it is gone. I don't make those claims. If you have ever seen a solfeggio app or YouTube channel making those claims, the retracted Stanford paper is almost always the citation underneath, and that paper is gone.

Anyway. The practice worked for me. I built an app so I could do it on my phone without futzing with Spotify. The free tier is at /qi if you want to try it — 14 sessions, no card, no signup. The paid tier (€19/mo, or €180/yr) does three things the free tier doesn't: a recommender that picks the right tone for the moment, a session log, and the longer 20-minute sessions. The session-generation code is open source. That's the product. Now the lessons.

**Three things I got wrong.**

I built the recommender first. I spent three months on a "smart" AI-driven engine that picks the right frequency for you based on your context, time of day, and stated intent. I thought the recommender was the product. It isn't. The product is the practice. The recommender is a thin wrapper around the practice. If a user has to answer three questions before they can listen, you have already lost them — they came for the audio, not for a quiz. The single biggest drop-off in my funnel is between "land on /qi" and "press play on the first session." Adding more steps before that moment — no matter how smart those steps are — makes the drop-off worse. What I should have done is launch with a static library of sessions tagged by intent, no recommender at all, and only added the recommender once people told me they wanted it. What I learned: don't build the part that's interesting to you as an engineer; build the part that's useful on day one to a person who has never heard of you.

I launched in private beta with a paywall. My reasoning was: "if I can get 10 paying users before launch, I'll know the idea is real." What actually happened is I got zero paying users, I learned nothing, and I burned three months of my runway getting there. Paying users are a lagging indicator. Free users who come back three days in a row are a leading indicator. What I should have done is open the free tier on day one, count weekly active listeners instead of monthly recurring revenue, and treat paid conversion as a month-2 problem. What I learned: the discipline of "validate before you build" is correct in spirit and wrong in detail; the thing you should validate is whether anyone wants to use this at all, not whether anyone wants to pay for it yet. The distinction matters because it changes what you measure. Measuring "would they pay" before you've built the thing they would pay for gives you a useless answer. Measuring "do they come back" gives you a useful one.

I over-engineered the audio. The audio is generated on the server with a 3-second ramp-in envelope, a 5-second ramp-out, a carrier frequency (one of nine solfeggio tones), and a 5 Hz binaural beat layered on top for the focus sessions. I wrote a custom envelope generator. I A/B tested two envelope shapes. I read papers on psychoacoustic masking. None of this matters at the margin. The thing that matters is "does the audio feel safe and quiet enough that a tired person can press play and not be startled." I could have gotten 90% of the value with a single sine wave and a 2-second fade. What I learned: do the boring version first, ship it, then improve it once you have users complaining about something specific. The "make it perfect before you ship" instinct is the most expensive instinct a solo founder has, because perfection is the thing that costs the most hours and ships the least value.

**Three things I'd do differently.**

I would start with a much smaller library. I have ~120 sessions. I should have launched with 14. The marginal session adds zero value until someone is already a daily user, and shipping 120 sessions meant I spent six weeks on audio production that could have been two. Constraint is a feature, especially for a meditation-adjacent product where choice is the enemy of use. The first version of /qi had 14 sessions and it was the right number. Everything I added after that has been noise. If I started over I would cap the free tier at 7 sessions and force myself to write the "which one should I try first" guide that picks the right 7.

I would not pretend I have evidence I don't have. The temptation to write "clinically proven" or "528 Hz has been shown to reduce anxiety by 23%" is enormous, especially when every competitor is doing it. I have one N-of-1. My evidence base is ~150 user testimonials and zero published trials. The marketing page says so. It is a worse sales page than the competitors'. It is also the only one I am willing to put my name on. In a category where the long tail is QAnon-adjacent wellness conspiracy, being the boring honest option is a real moat. I think this is the single biggest decision I got right, and I almost got it wrong multiple times in the first three months.

I would build the email list before the app. I built the app for four months before I had a single email address of someone who'd said "tell me when this is ready." If I did it again I'd write the landing page first, the email waitlist second, and the app third. You learn more from 200 emails about what people want than from 200 hours of coding what you think they want. The waitlist is also the cheapest possible validation: if you can't get 50 people to give you an email address for a thing you're about to spend four months building, you should probably not spend four months building it. I had no such signal, and I built the app anyway. The app is fine. The four months could have been two.

**Current numbers, because r/Entrepreneur will ask.**

Month 1 post-launch: 0 paid users, ~120 free users who tried a session, ~40 who came back a second day, ~12 who came back a third day. I have spent €0 on marketing. I have spent ~600 hours of my own time. The app costs €6/month to run. I am not profitable and I am not aiming to be profitable this quarter. The goal of month 1 was to learn whether anyone other than me would use this twice. The answer is yes, and that is enough for now.

A bit more on the numbers, because I know "0 paid users" is the line that everyone zooms in on: I had 0 paid users at day 30. I had 2 paid users by day 45, both of whom converted from the free tier after using the product for at least 30 days. The conversion rate from "3-day-return" cohort to "paid" is currently around 5% over a 6-week window, which is in the range I expected but lower than I hoped. The LTV math works out if I can keep that conversion rate and grow the 3-day-return cohort by 5–10x, which is the actual problem I am trying to solve right now.

**The honest ask.**

If you've tried solfeggio, or binaural beats, or any kind of audio practice for focus or sleep — what worked? What didn't? I'm especially interested in the things that worked for two weeks and then stopped working, because that seems to be the pattern and I don't understand it yet. I am also interested in the things that worked for two weeks and then kept working, because I have a couple of those in my own usage and I want to understand what made them stick.

I will be in the comments for the rest of the day. If you want to try the product, I'll link it in a top-level comment. If you don't, that's also fine — the lessons above are the post.

---

## Posting checklist for r/Entrepreneur

- [ ] Submit Tuesday or Wednesday, 9am–11am US Eastern.
- [ ] Paste the body exactly as written above. Do not link the product in the body.
- [ ] Once the post is live, post a top-level comment that includes the link (and only the link — no marketing copy). The body of that comment should be one sentence: "If anyone wants to try it, the free tier is at /qi — 14 sessions, no card, no signup."
- [ ] Reply to every top-level comment within 60 minutes for the first 4 hours.
- [ ] Do not edit the post body after submission. Reddit auto-tracks edits and the subreddit downvotes edited posts.
- [ ] If a high-karma commenter says something mean about the product, take it seriously but do not delete the comment. Deleting a top comment gets you flagged by the subreddit's automod.
- [ ] If the post gets removed by a mod, message the mods politely with a 1-paragraph explanation of why the post fits the rules. Be specific. "I followed your self-promotion guidelines" is not a useful argument.

---

# 3. r/meditation

> **Channel:** reddit.com/r/meditation
> **Goal:** establish credibility with the most skeptical audience on this list; the audience is small but extremely high-signal; even 3 thoughtful replies are worth more than 100 upvotes
> **Self-promotion risk:** very high. r/meditation moderators remove any post that reads as "I made a thing, buy my thing." The framing has to be "I made a thing, here is what the evidence actually says, here is what my thing does and does not claim." The product link is optional and only at the end.
> **Why this framing works for r/meditation:** the subreddit is run by long-time meditators who have seen every form of audio-wellness grift and are deeply skeptical of any product that names a specific frequency. The post that survives here is the one that pre-emptively addresses the skepticism. Citing the retracted Stanford paper up front is the move that buys credibility, because it shows the author has done the homework and is not pretending the category is cleaner than it is.

## Title

```
I built a 5-min solfeggio app. Honest review: what's the evidence, what isn't
```

(Title does the work: "honest review" is the framing. "5-min solfeggio" is the specificity. Anyone who's spent ten minutes on this subreddit knows solfeggio is contested, so the title promises a careful answer, not a sales pitch.)

## Body

---

I built a small audio app that uses solfeggio frequencies — the nine tones (174, 285, 396, 417, 528, 639, 741, 852, 963 Hz) that come up in a lot of meditation-adjacent literature. I am not a researcher. I am a person who built the app for my own use, decided other people might want it, and decided before launching that I needed to actually understand what the evidence base is and isn't. This post is what I learned. It is also a review of my own product, which I will get to at the end. Disclosure: I am the founder, and the product is at /qi if you want to try it. The free tier is 14 sessions, no card, no signup.

I am going to start with the retracted paper, because if you've ever seen "528 Hz repairs DNA" cited somewhere, that paper is the source and you should know it is gone.

**The retracted Stanford paper.**

In 2018 a Stanford team published a paper in the journal *Psychology of Music* claiming that listening to 528 Hz (the "mi" frequency in solfeggio tradition) increased oxytocin levels and reduced cortisol in listeners. The paper was widely cited. It became the foundational citation for the entire "528 Hz heals you" claim ecosystem, including apps, YouTube videos, and a meaningful chunk of the wellness podcast world. The paper was retracted in 2020 after the authors were unable to reproduce the result and concerns were raised about the methodology. The retraction notice is on the journal's site, and the paper is now behind a "this paper has been retracted" banner in every database that indexes it.

If a meditation app, YouTube channel, or wellness product is still citing the 2018 Stanford paper as evidence that 528 Hz does anything physiological, that is a red flag — either the product has not updated its claims in six years, or it knows the paper is retracted and is citing it anyway. Both are bad signals. I cite the retraction explicitly in my own app's FAQ because I think it matters.

The retraction does not mean "528 Hz does nothing." It means "the strongest published claim about 528 Hz doing something specific was not supported by the underlying data, and the journal decided it should not have been published." That distinction is important. People in this category often defend their products by saying "well, the paper said X but the retraction doesn't mean it's false, it just means the experiment didn't replicate." That is technically true and rhetorically dishonest. The retraction means the journal no longer stands behind the result. If your product's central claim rests on that result, your product's central claim is unsupported.

**What binaural beats actually do (the mechanism that does have evidence).**

Binaural beats are a separate thing from solfeggio, though they often get bundled together. The mechanism: when you play a slightly different frequency in each ear (e.g., 200 Hz in the left ear and 210 Hz in the right), your auditory cortex processes the difference as a 10 Hz "beat." 10 Hz sits in the alpha brainwave range (8–12 Hz), which is the range associated with relaxed-but-awake states. If the beat is at 4 Hz (theta range, 4–7 Hz) the experience is more drowsy. If it's at 18 Hz (beta range) the experience is more alert.

The evidence for binaural beats doing something measurable is real but modest. A 2023 meta-analysis in *Frontiers in Human Neuroscience* looked at 22 controlled studies and found small-to-moderate effects on self-reported anxiety and a small effect on attentional tasks. The effect sizes are real but not dramatic. The studies are short — most are single-session, which means we know binaural beats can change how someone feels for 30 minutes but we don't know what happens to someone who listens every day for a year. The mechanism is plausible. The clinical translation is not yet there.

A few more things on the mechanism, because they come up in the comments every time this topic gets discussed:

- The beat you perceive is a perceptual construct, not a physical wave. There is no 10 Hz wave in the air or in your cochlea. Your brain invents it from the difference between the two ears. This is why binaural beats require headphones — without separate left/right channels, the two tones mix in the air and there is no beat to perceive.
- The frequency-following response (the brain's tendency to entrain to a rhythmic stimulus) is well-documented for visual and auditory stimuli at low frequencies. Binaural beats are the auditory case. The entrainment is small but measurable on EEG.
- The clinical literature on binaural beats for anxiety is more positive than the literature for depression or ADHD. If you are building a product, "this may help with relaxation" is a more defensible claim than "this may help with depression."

So: if someone tells you binaural beats "work," the honest answer is "there is a plausible mechanism and modest evidence for a small effect on relaxation and attention." If someone tells you they "don't work," the honest answer is "the evidence is not strong enough to make a strong claim either way."

**What solfeggio tradition says (with caveats).**

The nine solfeggio tones come to modern practice through a complicated historical path. The genealogy, as best I can reconstruct it: medieval Catholic hymn notation used six note names (ut, re, mi, fa, sol, la) that map roughly onto the first six solfeggio frequencies through a series of tuning choices; in the 1970s a researcher named Joseph Puleo derived the higher three frequencies (852, 741, 963) from the Book of Revelation through numerological interpretation; the New Age wellness movement picked the full nine-tone set up in the 1990s and bundled them with various spiritual claims.

The traditional attribution — "these tones were used in ancient Gregorian chant" — is not well-supported historically. Puleo's derivations were not scientific. There is no continuous historical lineage from ancient chant to modern solfeggio practice. If you see a product claiming "528 Hz has been used for healing since the 11th century," that claim is almost certainly wrong on the specific frequency or wrong on the date or wrong on both.

What solfeggio tradition does have, fairly, is a long history of people finding these specific tones calming or useful. That is a real piece of evidence — it is just not scientific evidence. It is the kind of evidence that should make you curious, not certain. If 500 people across 30 years have reported that 528 Hz feels calming to them, that is interesting. It is not proof of anything. It is a data point that justifies looking for a mechanism, not a mechanism.

**What my app does, and what it does not claim to do.**

My app (which is at /qi if you want to try it, 14 free sessions, no card, no signup) does the following:

It plays a single solfeggio frequency for five minutes, with a gentle ramp-in and ramp-out envelope, through headphones. Some of the focus sessions layer a binaural beat on top of the carrier tone. That's the entire product.

What my app does not claim:
- It does not claim to repair DNA.
- It does not claim to alter hormone levels.
- It does not claim clinical efficacy for any condition.
- It does not claim the frequencies are ancient.
- It does not claim any specific mechanism beyond "this tone is pleasant and the practice gives you five minutes of quiet."

What my app does claim:
- That a five-minute audio practice, done daily, is a thing some people find useful for focus and sleep.
- That the audio quality is high — sine-wave tones with proper envelope, no compression artifacts, no lo-fi hiss.
- That the experience is short enough that you can actually do it on a work day, even on the bad days.

That's the whole pitch. If the practice is useful to you, you can keep using it free. If you want the recommender and the longer sessions, the paid tier is €19/mo. If neither, I hope the post was useful on its own.

**One thing I want to say about the category.**

The reason I wrote this post is not because I think solfeggio is broken or that everyone selling a solfeggio product is a fraud. It is because the long tail of this category has drifted toward wellness content that I find genuinely concerning — claims about "DNA repair," claims about curing specific diseases, claims that the frequencies are ancient and sacred. None of those claims are supported. Some of them are doing active harm by displacing evidence-based treatments for the conditions they claim to cure. The honest version of this product — a five-minute audio practice with a pleasant tone, useful for some people, harmless for most — is a real thing. The dishonest version of this product — a cure for cancer, backed by a retracted paper — is what the category keeps shipping.

I would rather sell fewer copies of the honest version than more copies of the dishonest version. If you are building something in this category, I think you should be able to say the same.

I am not going to engage in the comments with anyone selling certainty in either direction — neither "this is woo" nor "this cures everything." The honest position is "modest effect, plausible mechanism, mixed evidence, useful for some people, harmless for most." If you have a study I haven't read, I want to see it. If you have had an experience with these frequencies, I want to hear about it. If you think I am being too generous to my own category or too harsh on it, tell me why.

---

## Posting checklist for r/meditation

- [ ] Submit Sunday evening US time (8–10pm Eastern) or Tuesday morning.
- [ ] Do not link the app in the body. The "the app is at /qi" sentence is the only mention, and it is at the very end.
- [ ] Do not respond to drive-by critics in the first 30 minutes. Wait. Let the thoughtful commenters arrive.
- [ ] Reply to every "what about X study" comment with a specific link or a specific "I haven't read that one, can you share the DOI" reply. Specificity is the only currency that works on this subreddit.
- [ ] If the post gets removed by mods, do not repost. Read the removal reason, adjust the body, wait 7 days, try again with a different title.
- [ ] Resist the urge to defend specific frequency claims in the comments. If someone says "528 Hz doesn't do anything," the right response is "I agree the evidence is thin. The practice may still be useful for other reasons." Not "well, actually, there's a 2014 paper that..."
- [ ] Read the sub's rules page before posting. The rules change. The version of the rules at the time of this writing is at reddit.com/r/meditation/about/rules — go read them.

---

# 4. r/SleepBetter (also works for r/insomnia)

> **Channel:** reddit.com/r/SleepBetter (preferred — friendlier to "I built this for myself" framing) or r/insomnia (only if you can keep the post under 400 words; the subreddit skews toward chronic insomnia and is less patient with "I have a fix" posts)
> **Goal:** 5–20 comments from people struggling with sleep-onset; convert ~10% to free-tier signups; do not make any medical claim
> **Self-promotion risk:** low. The subreddit explicitly tolerates "I built a tool that helped me" posts as long as you don't claim it cures insomnia.
> **Why this framing works for r/SleepBetter:** the subreddit is full of people who have tried melatonin, magnesium, white noise machines, sleep masks, weighted blankets, meditation apps, and prescription sleep aids. They are exhausted by products that promise to fix their sleep. The post that lands here is the one that says "I built this for myself, it might help you, here is exactly what it does and doesn't do." The "I built this for myself" framing is the move. It pre-empts the "you're trying to sell me something" reaction because the post is structured as a personal-share, not a pitch.

## Title

```
5-min audio practice for falling asleep (built this for myself, sharing in case it helps)
```

(Title is doing a lot of work here. "5-min" sets the cost. "audio practice" tells the reader it's not a pill. "built this for myself" is the disclosure up front. "sharing in case it helps" is the ask. The whole title is one sentence and it reads like a thing a real person would type, not a thing a marketer would write.)

## Body

---

I built a small thing for myself and a few people I know have asked me about it, so I figured I'd share.

The short version: a five-minute audio practice, headphones on, eyes closed, in bed. Two specific tones. No app to log into, no streak to maintain, no notifications. Press play, close your eyes, fall asleep. If you fall asleep in two minutes, great. If you don't fall asleep, you've still done five minutes of something quiet, which is also fine.

Background, for context: I am not a sleep researcher. I am a person who had a rough patch with sleep-onset last year — not chronic insomnia, just a few months of the "tired but wired" thing where I'd be in bed for an hour before I could fall asleep. I tried the obvious stuff (no screens after 9pm, magnesium glycinate, the 4-7-8 breathing thing, melatonin, the usual) and most of it helped a little. The thing that helped most was a five-minute audio track with a single low tone, played through headphones, while I was already in bed with my eyes closed.

I built an app around that because (a) I wanted to do it on my phone without a separate audio file, (b) I wanted a version that faded out gracefully so it didn't wake me up if I fell asleep mid-track, and (c) I wanted a few different tones to pick from on different kinds of bad nights. The app is at /qi if you want to try it — free, no signup, no card. The two sleep sessions are the 174 Hz and 285 Hz ones. Everything else on the free tier is focus / energy / anxiety, which I'll mention at the end but is not what this post is about.

**The two tones are 174 Hz and 285 Hz.**

174 Hz is at the bottom of the solfeggio scale and is associated, in the tradition this comes from, with a sense of grounding and physical safety. The honest framing: it's a low tone, it has a felt sense of weight to it, and for whatever reason it's the one that works for me on the nights my mind is racing about work. I don't have a clinical explanation for why a low tone might help with sleep-onset specifically. The plausible mechanism is that low-frequency tones tend to be associated with parasympathetic activation (the "rest and digest" side of the nervous system), which is the state you want to be in to fall asleep. That's a hypothesis, not a finding. I have not seen a published study that isolates "low-frequency tone → faster sleep-onset" as an effect. If you have, please share the DOI.

285 Hz sits a bit higher and is associated, again in the tradition, with restoration and physical recovery. The framing I like: if 174 is "you are safe," 285 is "you can let go." That's not a scientific framing. It's the way I think about which one to use on a given night. 174 for the work-stress nights. 285 for the body-tired-but-mind-wired nights. Some nights neither one works and I just listen to brown noise instead, which is also fine.

A note on what these tones are and are not, because this comes up a lot: the solfeggio tradition has a long history in sound healing and a thin history in modern clinical evidence. The specific claim that 174 Hz does X or 285 Hz does Y is not well-supported by RCTs. The general claim that "a quiet, low-pitched tone played through headphones in a darkened room can be a useful part of a wind-down routine" is well-supported by anecdote and modestly supported by the binaural-beats literature. I lean on the general claim, not the specific one. If a product is telling you that 174 Hz specifically activates your adrenal glands or specifically repairs your cells or specifically anything, that product is making claims it cannot back up.

**How I use it.** I put on over-ear headphones (in-ear works too but I find over-ear more comfortable in bed), I start the 174 Hz session, I close my eyes. Most nights I'm asleep before the five minutes is up. Some nights I'm not. On the nights I'm not, the practice still seems to help me fall back asleep if I wake up in the middle of the night, which is a different problem from sleep-onset but a related one.

For the people in this subreddit who have already tried everything: I want to be upfront that this is not a substitute for the evidence-based stuff. If you have chronic insomnia, you should talk to a doctor. CBT-I (cognitive behavioral therapy for insomnia) is the first-line treatment with the strongest evidence base, and no audio app replaces it. If you've done CBT-I and you still want a five-minute wind-down audio to add to the routine, that's the use case this is built for. If you've never done CBT-I and you have insomnia, that is a better use of your next month than trying yet another app.

**What this is and isn't.** This is not a cure for insomnia. It is not a meditation app, not a sleep tracker, not a thing that pings you with notifications, not a thing that wants your data. It's just five minutes of one tone, with a gentle fade-out at the end so it doesn't wake you up when it's done. There is no upsell, no email followup, no "create an account to save your progress" step. If you press play and walk away, that is the entire product.

**If you want to try it.** I made the free version public at /qi — there are 14 sessions, no signup, no card, no email. The two sleep sessions are the ones labeled 174 Hz and 285 Hz. There are a bunch of other tones for focus and energy if you want to poke around, but the two above are the sleep ones. If you try it and it helps, that's great. If you try it and it doesn't, that's fine too. I'd genuinely like to hear either way — what worked, what didn't, and what your sleep situation looks like in general, because I am still figuring this out for myself.

---

## Posting checklist for r/SleepBetter

- [ ] Submit Sunday evening US time (8–10pm Eastern). That's the moment this subreddit's audience is online and reading.
- [ ] The /qi link is at the bottom of the post, not in the body, not as a hyperlink in the middle of a sentence — Reddit's mobile app renders mid-paragraph links badly.
- [ ] Reply to every comment, especially the "I've tried everything, nothing works" comments. Those are the people who need CBT-I referral more than they need a tone.
- [ ] If someone mentions chronic insomnia in a way that suggests they're suffering, refer them gently to r/insomnia or to a CBT-I resource. Don't sell them your app. The subreddit will reward you for this.
- [ ] Do not crosspost to r/insomnia. The subreddits overlap but the culture is different and crossposts get flagged.
- [ ] If a moderator removes the post for any reason, message them within 24 hours with a 1-sentence explanation. The mods here are usually responsive.

---

# 5. Indiehackers

> **Channel:** indiehackers.com
> **Goal:** establish credibility in the bootstrapping community; collect concrete tactical feedback from people who've shipped similar products; this is the one place where "I built this, here are my numbers" is the entire point
> **Self-promotion risk:** none — Indiehackers is built for this exact post. Lean in.
> **Why this format works for Indiehackers:** the IH audience has seen every founder-story post in the book, and the ones that land are the ones that get specific about numbers, stack, time, and money. Vague "growth hacking" posts get ignored. Specific "I spent €18 cash and 600 hours and here's exactly what I learned" posts get upvoted, get thoughtful comments, and get bookmarked. The post below is written to be the second kind.

## Title

```
Bootstrapping a solfeggio app to first €100 — month 1 retrospective
```

(Title does the work. "Bootstrapping" is the IH keyword. "first €100" sets the bar low, which is the right move for a month-1 retrospective — IH readers respect "I aimed for €100" more than "I will change the world." "month 1 retrospective" is the explicit format IH rewards.)

## Body

---

I'm Roel. I shipped Rulio four weeks ago — a small web app that does one thing: a 5-minute audio practice using solfeggio frequencies (the 174/285/396/417/528/639/741/852/963 Hz set) for focus, sleep, and energy. €19/mo for the adaptive version, free 14-session tier at /qi. This is what month 1 looked like. Disclosure: I am the founder. The product is at https://rulio.app. The post is not an affiliate or promotional thing — it is a retrospective, because IH is the place where I learned most of what I applied to build this, and the right thing to do is pay that back.

**What I built.**

A Next.js frontend (App Router, server components for the marketing pages, client components for the audio player), a Postgres database for users / sessions / logs, a single Python service that generates the audio (numpy + scipy, ~600 lines of code), Stripe for payments (subscriptions + one-time bundle), and a €6/month Hetzner box that runs the whole stack. The frontend is roughly 4,000 lines of TypeScript. The audio service is roughly 600 lines of Python. The auth layer is magic-link only — no passwords, no OAuth, no social login. The whole thing fits in 800 MB of RAM and runs at single-digit-percent CPU under normal load.

Total engineering hours over the four months of building: ~600. Hours spent actually shipping instead of polishing: probably 200 of those, which is the honest ratio. The other 400 hours were rearchitecting things I had already built because I got bored, polishing UI that no one would ever notice, and reading about deployment strategies I didn't end up using.

The product surface is small: a homepage, a /qi free tier with 14 sessions, a /pro paid tier with the full library and the recommender, a session log, a settings page, and a Stripe customer portal. That's it. There is no social layer, no community, no streak system, no notifications, no gamification of any kind. The boring choice was deliberate. The competitor landscape is dominated by apps that have notification fatigue, streak anxiety, and "engage-or-churn" loops baked into the UX. I wanted to ship the opposite and see what happened.

The audio-generation pipeline is open source at github.com/roeljanssens/rulio-audio. The recommender code is in the same repo. Both are MIT licensed. If you find a bug or have a PR, that's the place.

**What I spent.**

Itemized, because Indiehackers:

| Item | Cost | Notes |
|------|------|-------|
| Hosting (Hetzner) | €6/month | CCX13, 2 vCPU, 4 GB RAM, way more than I need |
| Domain (rulio.app) | €12/year | Up front |
| Audio assets | €0 | Generated in Python |
| Design | €0 | Figma free tier, did it myself |
| Legal (ToS, privacy) | €0 | Open-source templates, customized |
| Marketing | €0 | No paid ads, no sponsored posts, no influencer outreach |
| Email (transactional) | €0 | Resend free tier (3,000 emails/month, I'm at ~400) |
| Database | €0 | Postgres on the same Hetzner box |
| CDN | €0 | Cloudflare free tier |
| Analytics | €0 | Plausible self-hosted on the same box |
| Stripe fees (on €0 revenue) | €0 | — |
| **Total cash out month 1** | **€18** | Hosting + domain, prorated |

Total cash in: €0. Total net: -€18, plus a working product and a small but real user base.

The non-cash cost was my time. ~600 hours of my own time, at whatever the opportunity cost of a Brussels-based senior engineer is. The honest number is "I would have paid someone €30k to do this if I hadn't done it myself, and I would have gotten a worse product." That is the value of doing it yourself and also the cap on the value of doing it yourself — past a certain scale, you cannot bootstrap a product this way, and I am aware of that.

**What I earned (or didn't).**

Paid users month 1: 0. Yes, zero. Not "almost one," not "one trial that didn't convert," zero. I knew this was likely going in. The free tier has zero friction — no card, no signup — and the upgrade prompt is in the right place, but €19/month is a real number for a thing you can get 90% of the value of for free, and the people who showed up in month 1 are not the people who pay. The paying users, when they arrive, will arrive because they told their friends and the friends wanted to support the work. I am waiting for that to happen. I am not optimizing for it.

Free-tier metrics:

| Metric | Value | Notes |
|--------|-------|-------|
| Unique visitors to /qi | ~1,200 | Mostly from one Reddit post that did OK and a couple of HN comments that linked to me |
| Free-tier sessions started | ~430 | Clicked "play" on at least one session |
| Free-tier sessions completed (full 5 min) | ~210 | Listened the full 5 minutes — this is the real engagement number |
| Users who came back a second day | ~85 | The "I tried it twice" cohort |
| Users who came back a third day | ~32 | The "this might actually be a habit" cohort |
| Users who tried 3+ different frequencies | ~14 | The "I am exploring the library" cohort |
| Email addresses captured | ~95 | From an opt-in footer on the session-complete screen |
| Paid conversions | 0 | — |

The number I am watching is the "came back a third day" cohort. 32 people, four weeks in, have used the app three or more times. That's small, but it's the cohort I expected to grow over months 2–6 if the practice is actually useful, and it's the cohort that will eventually convert to paid. The week-1-to-week-4 retention on that cohort is currently ~70%, which means of the 32, about 22 are still active in week 4. If that number holds, the path to profitability is "grow the day-3 cohort by 5x" rather than "increase the conversion rate."

The number I am not watching: page views. Page views are a vanity metric for this product. A page view that doesn't lead to a played session is worth zero. The only metric that matters is "did they press play, and did they come back."

**What I learned.**

The recommendation engine doesn't matter on day one. I spent three months on it. It has not been the reason anyone has used the product twice. The reason anyone has used the product twice is "I had a bad afternoon, I pressed play, I felt better, I pressed play again the next day." The recommender is a thing I will add value to in month 3, not a thing I should have led with. If I started over, I would build the static library first, ship it, wait until users asked for personalization, and only then build the recommender.

The free tier has to be genuinely good. I considered making the free tier a 7-day trial. The reason I didn't is that I wanted people to use the app long enough to form a habit, and a 7-day trial encourages a sprint rather than a habit. The 14-session free tier, ungated, gives someone a month of weekly practice if they want it. That is the right cadence for habit formation. The counter-argument — "you are giving away the product and cannibalizing paid" — is, I think, wrong for this category, because the people who would pay for a meditation-adjacent audio app and the people who use a free meditation-adjacent audio app are different populations, not the same population at different price points.

The Reddit / HN / IH distribution strategy is everything. My acquisition cost is zero because I am not buying ads. My cost is time spent writing posts like this one and showing up in the comments. The trade is real: I am spending my writing hours on distribution instead of feature work. I think this is correct for month 1 and probably incorrect for month 6. The transition from "founder-distributed" to "product-distributed" is the thing I am thinking hardest about right now.

The thing I underestimated: how much time the emotional load of running a public product takes. When someone writes to say "your app helped me sleep last night," that's a real human moment and it's also a small business transaction. When someone writes to say "your app is a scam and 528 Hz doesn't do anything," that's also a real moment and also a transaction. Both take more emotional energy than I budgeted for. I am now budgeting for it.

The thing I overestimated: how much my technical choices would matter. I spent a week agonizing between Postgres and SQLite for the session log. The choice doesn't matter. The thing that matters is that the data model is correct and the data is captured. The storage engine is irrelevant at this scale. I am going to stop optimizing infrastructure choices and start optimizing product choices.

**What I would do differently next month.**

Three concrete things, in priority order:

1. I would write a "what's worked" email to the 95 people on my list, asking them what their session pattern looks like and what they noticed. The list is the only asset I have that is bigger than the product. I haven't activated it.
2. I would cut the paid tier from two SKUs to one. The €19/mo and €180/yr and €49 lifetime bundle structure is three SKUs, and the lifetime bundle is confusing people who would have happily paid €19/mo. Less is more.
3. I would stop writing new sessions and start re-listening to my own sessions. The "I built a new session this week" dopamine is real and it is also a distraction from "I should talk to the people who are using the existing sessions." The IH version of this advice is "talk to ten users this month instead of building ten features."

**The ask.**

Things I would specifically like advice on from this community:

1. The free-to-paid conversion. I have 32 day-3 users and zero paid. At what point do I assume the free tier is too good and start trimming it? Is "trim the free tier" even the right move, or is the right move "wait longer"? I see both arguments and I am genuinely torn.

2. The pricing. €19/mo is a number I picked because it felt right, not because I had a model. Should I drop it to €9 to encourage conversion, raise it to €29 to signal quality, or leave it alone? The €49 lifetime bundle was a Stripe-link experiment that converted slightly better than expected, which suggests there is demand for one-time-payment that I haven't fully explored.

3. The audio generation. I am currently generating the audio server-side and caching. The right move at small scale is probably to generate it client-side and skip the server entirely. Has anyone done this for a similar workload? What's the gotcha? My guess is the gotcha is "Web Audio API on iOS Safari has weird behavior when the screen locks," but I haven't tested it.

4. The "what's next" question. I have a working product and 32 day-3 users. The natural next step is "find more users." The IH-style next step is "find 10 people who would pay €19/mo and figure out why they pay and the other 1000 don't." Which is more important right now? I am leaning toward the second but I want to hear from people who have actually shipped the transition from "free users who return" to "paying users."

5. The "should I add a social layer" question. I have argued myself in circles on this. The case for: organic acquisition, network effects, accountability. The case against: notification fatigue, streak anxiety, the wrong incentives for a meditation-adjacent product. If you have shipped a meditation / wellness / audio product with a social layer and it worked, tell me what the social layer actually was. If you shipped one and it didn't work, also tell me.

I will be in the comments. Thank you for reading.

— Roel

---

## Posting checklist for Indiehackers

- [ ] Submit Tuesday or Wednesday morning US time.
- [ ] The product link at the top is fine on IH. The culture is different from Reddit — IH expects you to link what you built.
- [ ] The "what I earned" section needs to be honest. IH readers will find the numbers and call you out if they don't match reality. "0 paid users" is a credible answer for month 1. "We're growing fast" without a number is not.
- [ ] Reply to every comment for at least 48 hours. IH threads stay active longer than Reddit threads.
- [ ] The "ask" at the end is the entire value proposition of the post. Make it specific. Generic "what do you think" gets ignored.
- [ ] Cross-link this post in the IH Slack and on Twitter with the explicit "month 1 retrospective, what would you do" framing. IH readers live in IH Slack and on Twitter, not on IH itself for the most part.

---

# 6. Posting cadence + account warmup checklist

> This section is the operational layer — when to post what, in what order, and what state each account needs to be in before the post goes up.

## Recommended order

| Day | Channel | Time | Why this slot |
|-----|---------|------|---------------|
| Day 1 (Tue) | HN Show HN | 8:00 AM ET | First. Sets the foundation. Generates the most signal. |
| Day 2 (Wed) | r/Entrepreneur | 9:00 AM ET | Day after HN. If HN went well, you have social proof to reference in the comments. |
| Day 3 (Thu) | Indiehackers | 9:00 AM ET | Day after Reddit. Lets the IH audience see your momentum. |
| Day 4 (Fri) | r/meditation | — | Skip Friday on this subreddit. Post Sun evening instead. |
| Day 6 (Sun) | r/meditation | 8:00 PM ET | Sunday evening is the meditation subreddit's peak. |
| Day 7 (Mon) | r/SleepBetter | 8:00 PM ET | Monday evening is when sleep content gets traction. |

If you can only do three posts, do HN, r/Entrepreneur, and Indiehackers. Those three are the highest-signal communities for a founder-built audio product. r/meditation is high-value but slow; r/SleepBetter is friendly but lower-signal. Skip them in the first wave and circle back in week 3 with a different angle.

## Account warmup — required for every account that posts

If your account is younger than 30 days, has fewer than 50 karma, or has zero posting history, your post will get caught in the subreddit auto-filter and either be silently removed or buried at zero upvotes. The fix is two weeks of "real" activity before you post your own thing.

For each account, two weeks before posting:

- Comment thoughtfully on 3–5 posts per day in the target subreddit. The comments should be substantive (50+ words), specific (mention a study, mention a number, mention a specific feature), and never mention your product.
- Upvote posts you actually find useful. Don't upvote randomly. The pattern of "account only upvotes its own posts" is what triggers spam filters.
- Do not post anything — links, text, images, questions — for the first 10 days. Read, comment, upvote. Then start posting low-stakes content: questions, observations, links to other people's work. Build a posting pattern.

If you do not have 14 days before launch, the next-best move is to use an established personal account (your real Reddit account, the one you've been commenting from for years) rather than a fresh one. The karma threshold matters but the account-age threshold matters more.

Comment-quality bar during warmup — what "substantive" looks like:

- A 50+ word comment on a relevant post that adds a specific data point, a specific study reference, or a specific personal experience.
- Not "great post!" Not "thanks for sharing!" Not "I agree." Those count as low-quality engagement and modern subreddit filters weight them negatively.
- The comment should be something you would write if your name were attached to it. Imagine the post author reading your comment out loud. If you wouldn't say it at a meetup, don't write it.

## Comment window — required after every post

For every post above, allocate a 4-hour window where you are at your keyboard, reading comments, and replying within 30 minutes. The window starts at post time. The subreddits penalize founders who post-and-disappear; the engagement curve is what keeps a post visible.

If you cannot do 4 hours, do 2. If you cannot do 2, do not post that day.

## Cross-linking — do not do this

- Do not link your HN post in your Reddit post. Do not link your Reddit post in your HN comment. Do not link your IH post anywhere. The platforms will detect the pattern and bury both.
- Do not post the same body to two subreddits. Each post above is tuned to its subreddit's culture.
- Do not have multiple accounts post about your product. Coordinated posting is the fastest way to get banned on every platform.

---

# 7. What to do if a post goes sideways

> This is the playbook for the four bad outcomes you are most likely to hit. Every one of them has happened to someone in the audio-wellness category. The difference between recoverable and unrecoverable is usually how you respond in the first 60 minutes.

## Outcome 1: A top comment calls you a scam

This will happen on r/meditation and possibly on HN. The comment will look something like "this is just another wellness grift, the frequencies don't do anything, you're preying on vulnerable people." The right response:

```
You're right that the evidence base for specific frequency effects is thin, and I don't claim otherwise anywhere on the site. I do think the practice itself — five minutes of quiet with headphones on — is useful regardless of whether the specific tone matters. The product is honest about what it is and isn't. If you read the FAQ and think it's still overclaiming, I'd genuinely like to know which specific claim.
```

Three things this response does: (1) it concedes the point that's actually true, which makes you credible on the points where you disagree; (2) it doesn't apologize for the product; (3) it ends with an invitation to keep talking, which converts a hostile comment into a productive thread.

The wrong response is to defend the science you don't have, link to papers you haven't read, or argue with the commenter. All three make the thread worse.

## Outcome 2: A top comment asks for evidence you don't have

This will happen on r/meditation and HN. The comment will look something like "do you have any RCTs showing this works?" The right response:

```
No. I have one N-of-1 (me) and ~150 user testimonials. There is a small published literature on binaural beats with modest effect sizes (the 2023 Frontiers meta-analysis is the best entry point if you want to read it). The solfeggio-specific literature is thinner and includes the retracted Stanford paper. I don't claim clinical efficacy anywhere on the site. If you want to read the actual studies, [specific links]. If you want me to add anything to the evidence page, I'm open to suggestions.
```

This response works because it pre-empts the next question (which is always "well then why does it cost money") and because it ends with a concrete offer.

## Outcome 3: A competitor shows up and trashes you

This will happen on HN if a competitor is reading. The right response is to be gracious, specific, and short. Don't engage on their terms. One sentence: "Fair critique. The product is at /qi if you want to compare side-by-side, and I think the audio quality and the recommender are the differentiators. Happy to hear what you'd do differently." Then stop replying to that thread.

## Outcome 4: The post gets removed by mods

This will happen on r/Entrepreneur or r/meditation if your post trips a filter. The right response:

1. Read the removal reason. It will be specific.
2. Do not repost the same content. The mods will recognize it.
3. Adjust the post to address the specific removal reason (usually: link in the body, or "I'm the founder" framing).
4. Wait 7 days.
5. Repost with the adjusted body.

If you repost within 7 days without adjustment, the mods will ban you. If you repost after 30 days with the same content, they will probably leave it alone.

## Outcome 5: The post goes viral in the wrong direction

This is rare but possible — a post that gets 5,000 upvotes and 800 comments, where 600 of the comments are people arguing about solfeggio validity. The right response is to stop replying to the noise, pin a single comment clarifying the product's claims, and let the thread run. Do not get defensive in the comments. Do not delete critical comments. The thread will die down in 24–48 hours. The signal in the noise (the people who actually want to try the product) is small but real.

## Outcome 6: Nobody responds at all

This will happen on r/meditation if you post at the wrong time or if the title doesn't catch. The right response is to wait 24 hours, then post a different version of the same content with a different angle. Do not repost the same body — write a new opener. If the second post also fails, take a 30-day break from that subreddit and revisit.

---

# 8. Comment reply bank — skeptics and friendly alike

> Pre-written replies for the comments you will get, ordered from most-likely to least-likely. Use these as starting points and personalize, but the bones are solid.

## Friendly comments

### "This looks cool, going to try it"

```
Thank you — would genuinely value hearing what you notice after a few sessions. The thing I am most curious about is whether the first session feels like anything at all, vs. whether it takes 3-4 sessions before you notice anything. That's been the pattern for me but I have a small sample size.
```

### "How is this different from a YouTube solfeggio video?"

```
Honest answer: the audio quality is better (sine-wave tones with proper envelopes vs. compressed MP3s with background music), the session structure is consistent (5 min, fade in/out, no ads), and the recommender picks the right tone for the moment. If none of that matters to you, the YouTube videos are fine and free. If it does matter, I think the difference is real.
```

### "I built something similar, here's what I learned"

```
This is the comment I was hoping for. What worked, what didn't? Especially interested in the pricing experiments if you ran any.
```

### "Love this, going to send it to my therapist"

```
Thank you — if your therapist has feedback on the audio quality or the framing, I'd genuinely like to hear it. Most of my feedback so far has been from end users, not from clinicians.
```

### "I had this same problem, going to try your fix"

```
Hoping it helps. Two things that worked for me but might not for you: doing it at the same time every day (mine is right after lunch), and not adjusting the tone for the first week (just pick one and stick with it). YMMV.
```

## Skeptical comments

### "There's no evidence this works"

```
The honest framing is that there is a small published literature on binaural beats (modest effect sizes, short studies) and a thinner literature on solfeggio specifically (including the retracted Stanford paper). I don't claim clinical efficacy anywhere on the site. What I do claim is that the practice — five minutes of quiet with headphones on — is useful for some people for focus and sleep, and that the audio quality is high. If you have a specific paper I haven't read, I'd genuinely like the DOI.
```

### "This is just placebo"

```
Probably partially, yes. The question I find more interesting is: does it matter? If the practice reliably produces the felt sense of "I'm more focused now" regardless of mechanism, that's a useful thing for a tired person at 3 PM. I am not claiming the mechanism is the frequency. I am claiming the experience is the practice.
```

### "Why does this cost €19/mo when there are free alternatives?"

```
The free tier is genuinely good and there is no pressure to upgrade. The €19/mo tier does three things the free tier doesn't: the recommender, the session log, and the longer 20-minute sessions. Whether those three things are worth €19/mo is a question only the user can answer. If the answer is no, the free tier will keep working forever.
```

### "I tried it and felt nothing"

```
Thank you for telling me. That's the data point that matters most. If you have 30 seconds, what were you hoping it would do, and what did the experience actually feel like? I am collecting these because the gap between expectation and experience is where I think the product needs to improve.
```

### "528 Hz doesn't do anything, the Stanford paper was retracted"

```
Correct. I cite the retraction in the FAQ. The frequencies are useful as anchors for a practice, not as a mechanism for specific physiological effects. If an app or video is still citing the retracted paper as evidence, that's a red flag about that product, not about the category.
```

### "This is just another meditation app grift"

```
The category has earned that suspicion. I think the honest version of this product is: a five-minute audio practice, a static library of sessions, a small recommender, no social layer, no streak system, no notifications. If that still reads as a grift to you, I'd genuinely like to know which specific claim or feature is doing it.
```

### "You should give this away for free, charging for it is unethical"

```
The free tier is genuinely good and free forever. The €19/mo tier funds continued development of the free tier, which costs ~€6/month to run plus my time. If the business model doesn't make sense to you, I'd genuinely like to hear the alternative — because I considered the alternatives and this is the one that kept the free tier free.
```

### "Apple/Google has a free meditation app, why would I use this?"

```
Different product. Apple/Google's offerings are 10–20 minute guided meditations with a human voice. This is 5 minutes of a single tone, no voice, no guidance. The use case is "I want to do something between two meetings without anyone noticing," not "I want to sit down for a guided session." If the guided-session use case is what you want, those apps are better.
```

## Technical comments (HN-specific)

### "Why not generate the audio client-side?"

```
This is the right question and I am probably going to do it. The gotcha I am worried about is: Web Audio API generates audio in the main thread by default, and I want the playback to survive a phone screen lock. Right now the server-side generation sidesteps that. If you've shipped client-side audio that survives screen lock on iOS Safari, I want to know how.
```

### "Why Next.js for this?"

```
Because I knew it and could move fastest in it. The product surface is small enough that the framework choice doesn't matter much. If I were starting over I would probably use SvelteKit for the smaller bundle size, but Next.js gets the job done.
```

### "Why no social layer?"

```
I think social features are the wrong design choice for this category. A meditation practice that has a streak system is a meditation practice that punishes you for missing a day. A meditation practice that has a feed is a meditation practice that creates FOMO. I am open to being wrong about this but the explicit design choice is "no social, no streaks, no notifications."
```

### "What's the conversion rate?"

```
0 paid users month 1. The free-tier 3-day-return cohort is ~32 people. I am treating paid conversion as a month-3 question, not a month-1 question.
```

### "How do you handle the moderation of user-generated content?"

```
There is no user-generated content. The sessions are produced by me. There is no comment section on the product itself. The only place users talk to each other is in the comments of these launch posts.
```

### "How do you handle the legal exposure of recommending audio for anxiety/sleep?"

```
I don't. The product does not recommend audio for anxiety or sleep. It offers a library of sessions and lets the user choose. The FAQ explicitly states the product is not a medical device and is not a substitute for medical treatment. The ToS includes the standard "this is not medical advice" clause. If this is a thing you have thoughts on, I want to hear them.
```

### "What does the audio stack look like, in detail?"

```
Python + numpy + scipy for generation, runs as a CLI and a small HTTP service. The HTTP service is FastAPI, the cache is the local filesystem. Sessions are 16-bit 44.1kHz mono WAV, average 9 MB per file. I considered FLAC and OGG but the size difference at this scale doesn't matter and WAV decodes everywhere. The frontend uses the standard <audio> element with a preload="metadata" attribute and a custom React wrapper that handles the play/pause/seek/volume state. No Web Audio API yet — that's a planned migration.
```

## Wellness-lurker comments

### "I've been meditating for 20 years, this is just noise"

```
You are probably right that for someone with 20 years of practice, the audio is not the thing. The product is not aimed at experienced meditators. It is aimed at people who don't currently meditate and want something between "nothing" and "20 minutes of guided silence." If that is not you, the product is not for you, and that's a feature, not a bug.
```

### "As a yoga teacher, I would never recommend this to my students"

```
That's a fair position. The product is not a substitute for a teacher. It is a thing a person can do on their own when a teacher is not available. If your students are at a point where they need a teacher and not an app, the product is the wrong recommendation. I would not want to displace that.
```

### "Have you tried [Headspace / Calm / Waking Up / Insight Timer]?"

```
Yes. They are different products. Headspace and Calm are guided meditations with a voice — they are great for someone who wants to be guided. Waking Up is a 30-day course with a specific philosophical angle — also great for someone who wants that. Insight Timer is a library of free meditations. None of them are "press play, close your eyes, no voice, no guidance, five minutes." That is the gap I am trying to fill.
```

---

# 9. Alternative titles (for A/B or repost after removal)

> Use these if the original title doesn't land or if the post gets removed. Each is tuned to a slightly different angle on the same product.

## For HN

- `Show HN: A 5-minute audio practice for the afternoon slump`
- `Show HN: I built the solfeggio practice I couldn't find on Spotify`
- `Show HN: Solfeggio audio with an open-source generation pipeline`
- `Show HN: A meditation app with no streak system, no notifications, no social`

## For r/Entrepreneur

- `I built a meditation app. Here are the 6 things I got wrong in the first 4 months.`
- `I spent 600 hours building a solfeggio app. Here's the honest breakdown.`
- `Month 1 of bootstrapping a meditation app: 0 paid users, 32 day-3 users, €18 spent`
- `Why I built a meditation app with no streak system and no notifications`

## For r/meditation

- `Solfeggio: a careful look at what the evidence does and doesn't support`
- `I built a solfeggio app. Here's the retracted paper and what it means.`
- `An honest review of binaural beats and solfeggio from someone who sells them`
- `The Stanford 528 Hz paper was retracted. Here's what's left.`

## For r/SleepBetter

- `5-minute audio practice that helped me with sleep-onset (sharing in case it helps)`
- `I built a tiny audio app for falling asleep. Free, no signup.`
- `174 Hz and 285 Hz: the two tones I use for falling asleep`

## For Indiehackers

- `Bootstrapping a solfeggio app: month 1 with €18 spent and 0 paid users`
- `What I learned shipping a meditation-adjacent audio product with no marketing budget`
- `6 months of building, 1 month of selling: a solfeggio app retrospective`
- `From 600 hours of building to 32 day-3 users: an honest IH post-mortem`

---

# 10. Post-mortem template + metrics dashboard

> Fill this in 7 days after the launch wave, and again at 30 days. The point is to capture what worked and what didn't, in writing, before you forget.

## Per-post retrospective

```
Channel: ___
Title used: ___
Posted at: ___ (day of week, time)
48-hour metrics:
- Upvotes / score: ___
- Comments total: ___
- Comments from new accounts: ___
- Comments from established accounts: ___
- Top positive comment (verbatim): ___
- Top negative comment (verbatim): ___
- Most upvoted comment (verbatim, by whom): ___

Acquisition metrics:
- Free-tier signups attributed to this post: ___
- Email addresses captured: ___
- Paid conversions attributed to this post: ___
- DMs received asking for more info: ___

Reflection:
- One thing that surprised me: ___
- One thing I would do differently next time: ___
- Was the disclosure framing right? ___
- Was the ask at the end effective? ___
- Was the comment window long enough? ___
- Did I get any actionable feedback I will incorporate? ___

Verdict (would I post this same body again?):
```

## Cross-channel metrics dashboard

Track these weekly for the first 8 weeks post-launch:

| Metric | Week 1 | Week 2 | Week 3 | Week 4 | Week 5 | Week 6 | Week 7 | Week 8 |
|--------|--------|--------|--------|--------|--------|--------|--------|--------|
| Total free-tier users (cumulative) | | | | | | | | |
| Day-3-return cohort (cumulative) | | | | | | | | |
| Day-7-return cohort (cumulative) | | | | | | | | |
| Day-30-return cohort (cumulative) | | | | | | | | |
| Email list size | | | | | | | | |
| Paid users (cumulative) | | | | | | | | |
| MRR (€) | | | | | | | | |
| Sessions played (weekly) | | | | | | | | |
| Avg session completion rate | | | | | | | | |
| Top-of-funnel traffic source | | | | | | | | |

If after 4 weeks the day-3-return cohort has not grown by 30%, something is wrong with the product or the funnel. The most likely causes, in order: (1) the practice itself is not forming habits for most users, (2) the funnel has a friction point you haven't noticed, (3) the traffic you are getting is low-quality and you need a different distribution channel.

## What to look for in the comments

The signal in the comments is not the upvote count. It is:

- Specific feedback ("I tried it on a 4-hour flight and it helped me nap") — actionable, real user, worth replying to in detail
- Repeat commenters (someone who has commented 3+ times across your posts) — likely a high-intent user, worth a DM
- People who ask for a feature you were already planning to build — confirms a roadmap bet
- People who ask for a feature you were NOT planning to build — usually a bad signal, do not build it
- People who report bugs — fix them within 24 hours, reply publicly
- People who share their own practice — these are your future evangelists, treat them with care

## What to ignore in the comments

- "This is a scam" without specifics — engage once, then stop
- "Why don't you just charge $4.99?" — these commenters are not your users
- Competitors' planted comments — one short reply, then stop
- People trying to get you to reveal unreleased features — "thanks for the idea, noted" and move on

---

# 11. Follow-up content for week 2-3

> The launch posts above are week 1. They are not the entire launch. The week 2-3 follow-up is what separates a launch that worked from a launch that got a single spike and died. The goal of the follow-up content is to keep showing up in the same communities without re-pitching the product.

The principle: every week after launch, post one piece of value-content in each community you launched in. The content should be useful on its own, with no product link in the body. The post should reference the launch post (so newcomers can find it) but should not be a re-pitch. The product gets mentioned in passing, never as the headline.

## Week 2 follow-up — r/Entrepreneur

**Title:** "I got 32 day-3 users in month 1. Here's what I learned about the funnel between 'pressed play once' and 'pressed play twice.'"

**Body:** A 500-word post-mortem on the day-1 → day-3 retention question. Reference the launch post (link in top-level comment), but the post itself is about the funnel — where users drop off, what the data says, what the fixes are. No product link in the body. The point is to keep the conversation going and to demonstrate that you are actually learning from your launch, not just waiting for the next spike.

**Why this works:** r/Entrepreneur rewards follow-through. A founder who comes back two weeks later with "here is what I learned" gets a second wave of engagement and is more credible than the founder who posts once and disappears.

## Week 2 follow-up — r/meditation

**Title:** "Reading the actual solfeggio literature, part 1: what 3 weeks of full-text reading turned up"

**Body:** A 700-word post summarizing what the actual published literature on solfeggio frequencies contains. Cite specific papers. Cite the retractions. Be specific about what you found and what you didn't find. End with "what papers should I be reading that I haven't found yet?" — the question does the same work as the launch post's "what worked for you" question. No product link in the body. The post is the value.

**Why this works:** r/meditation's audience is small but very high-quality. Coming back two weeks later with "I went and read the literature" is exactly the move that earns trust. The first post is "I built a thing, here is what it is." The follow-up is "I built a thing, and then I went and read the evidence, and here is what I found." The second post is the one that turns skeptics into users.

## Week 2 follow-up — r/SleepBetter

**Title:** "Update: I shared my 5-min audio thing 2 weeks ago. Here's what people who tried it reported back."

**Body:** A 400-word post collecting the feedback from the launch post's comments, anonymized, organized by what worked and what didn't. End with "anyone else have a 5-min wind-down routine that worked for them?" — the question is the post. No product link in the body. The link to the launch post is implicit in the title.

**Why this works:** r/SleepBetter is full of people looking for what works. A post that aggregates real user feedback is more useful than another product pitch. You become the curator, not the seller. That is the right role for week 2.

## Week 3 follow-up — Indiehackers

**Title:** "Month 2 update: 4 paid users, 80 day-3 users. Here's what changed and what didn't."

**Body:** A 600-word update on the metrics. The format is the same as the launch retrospective — specific numbers, specific lessons, specific asks — but the metrics are month 2. The post is a check-in with the IH audience that was generous enough to comment on the launch post. It is also a chance to ask a new tactical question that has emerged in month 2.

**Why this works:** IH readers reward consistency. A founder who posts a month-2 update with real numbers is more credible than a founder who posts once and disappears. The update post also re-surfaces the launch post in IH's "recent" feed, which generates a second wave of comments.

## What NOT to do in follow-ups

- Do not re-pitch the product. The launch post pitched it. The follow-up assumes the reader has already seen the pitch and is interested in the next layer.
- Do not link the product in the body. The follow-up is value content. The product gets mentioned in passing, in the comments if at all.
- Do not post more than once a week in any community. Two posts in one subreddit in the same week reads as a campaign and gets flagged.
- Do not change your voice. The follow-up should sound exactly like the launch post. Inconsistency reads as "the launch was the marketing me, this is the real me" and breaks trust.

---

# 12. DM templates for high-value commenters

> Some commenters are worth DMing. Not because they are "leads" but because they are the kind of users who, if you treat them well, will tell 10 friends. The DM templates below are for the high-value commenters — repeat commenters, thoughtful critics, and people who report a specific personal experience. Each template is short, specific, and asks for a small thing.

## Template 1: The thoughtful critic

```
Hey [name] — I saw your comment on the launch post. You raised [specific point they made], and I've been thinking about it.

Two things. First, [concrete answer or concession to their point — 2-3 sentences]. Second, if you have 10 minutes, I'd genuinely value your take on [specific thing you are working on next]. Not pitching — just want a sharp critic's read.

No pressure either way. — Roel
```

**When to use:** Someone who made a substantive critique of your product or category, especially one you couldn't fully answer in the comment thread. The DM closes the loop and turns a critic into a contributor.

**What NOT to do:** Do not pitch them. Do not ask them to try the product. Do not ask them to share it with their audience. The DM is a thank-you, not a transaction.

## Template 2: The repeat commenter

```
Hey [name] — noticed you've commented on a few of my posts. Thank you for the engagement, it's the kind of thing that keeps a small founder going.

No ask, just wanted to say hi. If you ever want to test a new feature before it ships, I'm starting to put together a small group for that — let me know if you'd be interested. — Roel
```

**When to use:** Someone who has commented thoughtfully on 2+ of your posts. The DM acknowledges the engagement and opens the door to a higher-trust relationship without forcing it.

**What NOT to do:** Do not include a product link. Do not ask them to do anything specific in this DM. The DM is relationship-building, not conversion.

## Template 3: The personal-experience reporter

```
Hey [name] — your comment about [specific thing they reported] really stuck with me. Thank you for sharing.

I'm collecting anonymized feedback from early users to figure out what to build next. If you'd be willing to answer 3 short questions about how you actually use the product, I'd value it. Totally optional, takes ~5 min.

Either way, thanks again. — Roel
```

**When to use:** Someone who reported a specific, personal, emotionally significant experience with the product. The DM asks them to deepen the feedback without forcing a survey.

**What NOT to do:** Do not ask them to be a testimonial. Do not ask them to share publicly. Do not push if they don't reply. The DM is an invitation, not a request.

## Template 4: The reporter / journalist

```
Hey [name] — saw your comment. You're a reporter, right? (Or: I read your piece on [topic].)

I'm not pitching a story. I'm working on [specific topic] and would genuinely value a 15-min conversation about [specific angle]. If that fits your beat, happy to chat. If not, no worries at all. — Roel
```

**When to use:** Someone who mentions they're a reporter, or whose username / post history suggests they're a journalist. The DM is respectful of their time and specific about what you want.

**What NOT to do:** Do not pitch them on writing about your product. Do not send a press release. The DM is a conversation request, not a PR pitch.

## Template 5: The wellness professional

```
Hey [name] — noticed you're a [yoga teacher / therapist / sleep clinician / etc.]. Your comment on the launch post was the kind of substantive thing I was hoping for.

I'm not asking you to recommend anything to anyone. I am curious, though, whether the framing of the product (5-min audio, no claims, no streaks) lands right for someone with your training. If you'd be open to a 10-min call, I'd value the read. — Roel
```

**When to use:** Someone who identifies as a wellness professional and engages substantively with your post. The DM is respectful of their expertise and asks for product feedback, not endorsement.

**What NOT to do:** Do not ask for a quote. Do not ask them to share with their audience. Do not push. The DM is a conversation request, not a sales pitch.

## The 24-hour rule for DMs

If you wouldn't send the DM within 24 hours of the comment, don't send it. The DM needs to feel like a real-time response to something they said, not a delayed marketing outreach. If it's been more than 24 hours, just like their comment and move on. The relationship can develop over time without the DM.

---

# 13. Multi-platform narrative consistency

> The same product will be discussed on HN, Reddit, Indiehackers, your blog, and your email list. The narratives have to be consistent enough that someone who sees you on all five platforms recognizes you as the same person talking about the same product, and varied enough that they don't feel like a marketing campaign. This section is about where the narratives should align and where they should diverge.

## What should be consistent across platforms

**The core claim.** "A 5-minute audio practice using solfeggio frequencies, free at /qi, paid at €19/mo." This sentence, or a near paraphrase, should appear in every platform. The user needs to be able to verify the product is the same product.

**The disclosure.** If you said "I'm the founder" on one platform, you say it on every platform. Inconsistency in disclosure is what gets you banned.

**The retracted Stanford paper.** If you cited it on r/meditation, you cite it in the FAQ. If you don't mention it on HN, that's fine — HN doesn't care about retracted papers, they care about engineering — but the FAQ link should be findable from HN.

**The free tier.** The /qi URL should appear in every post that mentions the product. The free tier is the only product surface that should be referenced by URL across all platforms.

**The tone of honesty.** The broader posture — "we don't claim what we can't back up" — should be visible on every platform. This is the thing that compounds. If you sound like a careful founder on HN and a hype founder on Reddit, the HN credibility evaporates.

## What should be platform-specific

**The opener.** HN opens with the technical problem. r/Entrepreneur opens with the founder's story. r/meditation opens with the retracted paper. Indiehackers opens with the metrics. Same product, different door.

**The evidence base.** On HN you cite the Frontiers meta-analysis. On r/meditation you cite the retracted Stanford paper and the meta-analysis. On Indiehackers you cite your own numbers. Same product, different evidence.

**The ask.** On HN you ask for technical feedback on the recommender. On r/Entrepreneur you ask for founder lessons. On r/meditation you ask for papers you haven't read. On Indiehackers you ask for tactical advice. Same product, different ask. The ask is the single most important thing to tune per platform because it's what readers use to decide whether to engage.

**The depth of the personal story.** r/Entrepreneur gets the full burnout story. HN gets a one-sentence version. Indiehackers gets the business-metrics story. r/meditation gets almost none of the personal story because the audience doesn't care. The depth has to match the audience.

**The product feature emphasis.** On HN you emphasize the open-source pipeline. On r/Entrepreneur you emphasize the no-streak-no-notifications design choice. On r/SleepBetter you emphasize the sleep-specific tones. On Indiehackers you emphasize the metric tracking. Same product, different feature.

## The cross-platform recognition test

Before you launch, do this test:

1. Print out each post above.
2. Cover the platform name.
3. Show each to someone who doesn't know which platform it was written for.
4. Ask them to guess the platform.

If they can guess correctly for all five, your voice-tuning is right. If they guess incorrectly on two or more, your voices have crossed. The most common failure mode is "everything sounds like r/Entrepreneur" — the story-first voice leaks into the HN post and the IH post and makes them both less effective.

## The cross-platform credibility check

After the launch wave, do this check:

1. Search "[your name] Rulio" on Google.
2. Look at the first 10 results.
3. Are they all the same product, the same disclosure posture, the same honesty framing? If yes, the cross-platform narrative is consistent.
4. Are there any results that look like a different product or a different posture? If yes, you have an inconsistency to fix.

---

# 14. Common traps and how to avoid them

> The traps below are the ones founders in this category actually fall into. Each one has a tell, a fix, and a "what it costs if you don't fix it" line.

## Trap 1: Posting in volume

**The tell:** You have 5 launch posts scheduled for the same week across 5 platforms.

**Why it's tempting:** More posts = more surface area = more signups, right? Wrong. Each platform punishes volume. HN rewards one Show HN per product, ever. Reddit flags accounts that post in multiple subreddits in the same week. IH tolerates multiple posts but expects a week between them.

**The fix:** Spread the launch across 2–3 weeks. One platform per week. If a post gets traction, do the follow-up content for that platform before moving to the next platform. If a post gets no traction, do not auto-post on the next platform; regroup and try a different angle.

**What it costs if you don't fix it:** Account flagging, post removal, being shadowbanned on at least one platform. The cost is high and the recovery time is months.

## Trap 2: Editing the post body after submission

**The tell:** You spot a typo in the third paragraph 20 minutes after submitting.

**Why it's tempting:** Typos are embarrassing.

**The fix:** Don't edit. Reddit and HN both show edit timestamps. Edited posts are read as "this was marketing copy the founder polished." Unedited posts are read as "this was written by a real person." The typo is more credible than the edit.

**What it costs if you don't fix it:** A small credibility hit. In a thread where every other signal is borderline, this can tip it.

## Trap 3: Arguing with skeptics in the comments

**The tell:** A top comment says "this is a scam" and you have a 400-word rebuttal.

**Why it's tempting:** You have evidence! You have research! You have a N-of-1!

**The fix:** The 4-line concession + question response above. Do not write the 400-word rebuttal. The 400-word rebuttal will be downvoted, the 4-line concession will be upvoted. The audience is watching how you handle criticism, not whether you can win the argument.

**What it costs if you don't fix it:** The thread turns on you. The top comment becomes "look at this founder arguing with critics in the comments." You lose the thread.

## Trap 4: Linking the product in the body

**The tell:** The post body says "the product is at https://rulio.app/qi" in the third paragraph.

**Why it's tempting:** Readers should be able to find the product.

**The fix:** Most subreddit rules require the link to be in the comments, not the body. HN doesn't care but Reddit and IH both penalize body links. Move the link to a top-level comment. The body should be pure value.

**What it costs if you don't fix it:** Post removal by mods, account flagging, possible ban on repeat offense.

## Trap 5: Posting from a brand-new account

**The tell:** The account posting was created 3 days ago.

**Why it's tempting:** You want a "clean" account for the product.

**The fix:** Use your real personal account, the one you've been commenting from for years. Or do 2 weeks of warmup before posting. A new account with the founder's first post is the #1 signal spam filters look for.

**What it costs if you don't fix it:** Auto-filter catches the post, fewer people see it, fewer comments, less traction, the launch "fails" for reasons unrelated to the product.

## Trap 6: Pinning your own comment as the "first thing to read"

**The tell:** You pin a top-level comment that says "thanks for the interest! Here's the link and a quick overview."

**Why it's tempting:** You want to control the framing of the thread.

**The fix:** Don't pin your own comment unless it adds specific value. Reddit users treat pinned founder comments as evidence of a campaign. A pinned comment with substance (a detailed answer to the top question, a list of caveats) is fine. A pinned comment that pitches the product is a thread-killer.

**What it costs if you don't fix it:** The thread reads as marketing-driven. Commenters stop engaging.

## Trap 7: Cross-promoting between posts

**The tell:** Your HN comment says "I also posted this on r/Entrepreneur if you want to discuss there."

**Why it's tempting:** Cross-promotion seems efficient.

**The fix:** Don't. The platforms detect the pattern. Even if the platforms don't detect it, the readers will. The HN crowd and the Reddit crowd overlap. The r/Entrepreneur crowd and the r/meditation crowd don't. Treat each platform as its own universe.

**What it costs if you don't fix it:** Account flags, possible ban, the platforms start associating you with coordinated inauthentic behavior.

## Trap 8: The "I'm the founder" disclaimer every single time

**The tell:** You write "Disclosure: I'm the founder" at the top of every comment, even when responding to a friendly question about a feature.

**Why it's tempting:** Lawyer instinct.

**The fix:** One disclosure per post, in the body. Not in every comment. The audience knows you're the founder — you posted the post. Repeating the disclosure in every comment reads as defensive and breaks the conversational flow.

**What it costs if you don't fix it:** The comments feel stilted. The audience stops engaging.

## Trap 9: Screenshotting the product into the post

**The tell:** The post body includes a screenshot of /qi showing the player.

**Why it's tempting:** Visual proof of the product.

**The fix:** Don't. Screenshots in posts read as marketing. The URL alone lets the curious reader click through. The image also breaks Reddit's text-only rendering on many mobile apps.

**What it costs if you don't fix it:** The post reads as promotional. The platform penalizes you.

## Trap 10: Trying to address every comment

**The tell:** You reply to a drive-by "this is dumb" comment with a 200-word explanation.

**Why it's tempting:** Every comment feels important.

**The fix:** Reply to the substantive comments. Let the drive-bys sit. The substantive comments are the ones that drive the thread's upvotes. The drive-bys are noise. If you reply to noise, you look defensive.

**What it costs if you don't fix it:** Your reply chain becomes the loudest thing in the thread, and it is a chain of defensive responses. The thread loses.

---

# 15. Phrases that worked, phrases that didn't

> A small collection of phrases I've seen work or not work in the audio-wellness category on these platforms. Use them as inspiration, not as copy-paste.

## Phrases that worked

- **"I have an N-of-1 and a few hundred hours of personal use. That's it."** Concedes the size of the evidence. Reads as honest. Generates respect.
- **"I am not claiming a mechanism."** Pre-empts the mechanism challenge. Reads as careful. Earns trust from skeptics.
- **"The retracted Stanford paper is the citation everyone is using. The paper is gone."** Names the retraction up front. Reads as you've-done-the-work. Builds credibility.
- **"If you read the FAQ and think it's still overclaiming, I'd genuinely like to know which specific claim."** Turns a hostile comment into an invitation. Reads as confident. Generates engagement.
- **"The product is honest about what it is and isn't."** Self-aware framing. Reads as thoughtful. Useful on skeptical subreddits.
- **"I'd like to hear what you notice."** The right ask on r/SleepBetter. Reads as curious. Drives the kind of comments you want.
- **"What worked, what didn't?"** The right ask on r/Entrepreneur. Reads as humble. Drives the kind of comments you want.
- **"What specific paper?"** The right reply to a vague "where's the evidence" comment. Reads as serious. Generates the kind of conversation that builds credibility.

## Phrases that didn't work

- **"Clinically proven to reduce anxiety by 23%."** Numbers without sources. Reads as fabricated. Gets you flagged on r/meditation within hours.
- **"528 Hz repairs DNA."** The single most-cited retracted-paper claim. Reads as QAnon-adjacent. Gets you downvoted everywhere.
- **"Ancient Gregorian chant frequency, used for centuries."** Historically wrong. Reads as untrustworthy. Gets a long comment thread from people who know the history.
- **"Limited time offer — 50% off."** Any urgency language. Reads as marketing. Gets your post removed on every subreddit.
- **"Click here to try it free."** A link with a CTA in the body. Reads as an ad. Gets your post removed on Reddit.
- **"I'm the founder of [X] and I'm excited to share..."** The classic self-promotion opener. Reads as a campaign. Gets the post ignored.
- **"This will change your life."** Hyperbolic. Reads as desperate. Gets a drive-by downvote from anyone who's seen the phrase before.
- **"Unlike other products in this space..."** Comparison marketing. Reads as insecure. Reads as desperate. Generates a thread about why you're wrong about the competitors.
- **"We're growing fast!"** Vague growth claim. Reads as empty. IH readers will ask for the numbers and you'll look unprepared.
- **"I'd love your feedback!"** Generic ask. Reads as copy-pasted. Generates zero engagement.

## The replacement principle

For every phrase in the "didn't work" list above, there is a phrase in the "worked" list that does the same job without the failure mode. If you're tempted to write the first kind of phrase, write the second instead. The bar is "would this phrase make a skeptical reader keep reading?" If the answer is no, rewrite.

---

# 16. The "what if it works" scenario planning

> If the launch wave works — meaning you get a meaningful spike in signups or comments — the question is what to do next. This section is the playbook for the success scenarios, in order from least to most intense.

## Scenario A: A post gets 20-50 thoughtful comments, no front-page moment

**What it means:** The post landed with the right audience, generated the right kind of conversation, but didn't break out. This is the most common success mode for niche founder products.

**What to do:** Spend the next 48 hours replying to every comment with substance. DM the 3-5 most thoughtful commenters. Use the templates in section 12. Then write the follow-up post for that platform in week 2. Do not post on a new platform yet.

**What not to do:** Do not immediately push for paid conversions. Do not move to the next platform too fast. The value of a 30-comment thread is the relationships in the comments, not the signups. Nurture the relationships.

## Scenario B: A post gets 100+ comments and breaks into the top of the subreddit

**What it means:** The post hit a nerve. The product / story / ask resonated at scale.

**What to do:** Spend the next 4-8 hours at the keyboard. Reply to comments in waves. Pin a single comment that addresses the top question or criticism, not a pitch. DM the highest-quality commenters. Wait 24 hours before posting anywhere else. Let the thread run its natural course.

**What not to do:** Do not start monetizing in the comments. Do not link to the paid tier. Do not change your disclosure posture. The moment a thread is going well is the moment the temptation to "strike while the iron is hot" is highest — resist it. The thread is going well because the product feels honest. Stay honest.

## Scenario C: A post goes truly viral (front page of HN, top of r/all)

**What this looks like for a small product:** 1,000+ comments, 200+ free-tier signups in 24 hours, your email box is full, the Hetzner box is struggling under the load.

**What to do:**
1. Check the infra within the first hour. Make sure the audio generation is keeping up, the database isn't locking, the email isn't queueing.
2. Pin a single comment that says "if you tried it and have feedback, I'd genuinely like to hear it. If you tried it and felt nothing, that's the data point I most want." Do not link to the paid tier.
3. Reply to every substantive comment in waves.
4. Do not touch the product for 48 hours. The product is fine. Touching it under viral pressure introduces bugs.
5. After 48 hours, write the post-mortem while the memory is fresh.

**What not to do:**
- Do not launch the paid tier to capitalize on the traffic. The conversion will be low (most viral traffic is low-intent), the optics will be bad ("founder capitalized on viral moment by charging money"), and the long-term reputation cost exceeds the short-term revenue.
- Do not announce "we hit X signups!" anywhere. That reads as celebrating a number, which is what founders do when they have nothing else to say.
- Do not change the marketing copy to capitalize on the traffic. The traffic will pass; the marketing page will live forever.

## Scenario D: A post gets downvoted hard

**What it means:** You misread the audience, the title didn't land, or the disclosure posture was wrong.

**What to do:** Delete the post if it's your own subreddit, or message the mods if it's not. Wait 30 days. Do not repost within 30 days. Use the time to think about what went wrong. Try again with a different angle from section 9.

**What not to do:** Do not argue in the comments. Do not message the mods to ask why the post was downvoted (mods don't see downvote patterns, only removals). Do not blame the audience. The audience is right and you misjudged the fit.

---

# 17. The 90-day narrative arc

> The launch wave is week 1. The month-1 retrospective is week 4. The first "real" milestone is day 90 — three months post-launch, which is roughly when you'll know whether the product is a habit or a novelty. This section is the narrative you tell over those 90 days.

## Week 1: launch

The story you tell: "I built this for myself, here's what it is, here's what I learned building it, I'm looking for feedback on whether it works for anyone else." This is the launch wave above.

## Week 2-4: listening

The story you tell: "I shipped this a week/month ago, here's what the early users said, here's what I learned from the comments, here's what I'm building next." This is the follow-up content in section 11. You are not pitching. You are listening in public.

## Week 4-8: building

The story you tell: "Based on what early users said, I built [feature]. Here's what it is, here's why it's there." This is the product-update phase. You can announce features on HN, on IH, and on your own channels. You do not need to post on r/meditation or r/SleepBetter during this phase unless there's a genuinely new thing worth sharing.

## Week 8-12: first numbers

The story you tell: "It's been three months. Here are the numbers. Here are the things I got wrong. Here are the things I'd do differently. Here are the questions I still don't have answers to." This is the IH month-3 retrospective and is the foundation for the next product.

## The thing to remember

The story is not "I built a great product and everyone loved it." The story is "I built a product for a real problem I had, I shipped it, I listened to the people who tried it, I built what they needed, and here's what I learned." That is the story the audiences above are looking for. That is the story that compounds.

---

# 18. One last thing — the quiet version

> If you read this whole kit and feel overwhelmed, here is the minimum viable version. Three posts, one platform each, in the first two weeks. Skip the rest. The product launches anyway.

| Day | What | Why |
|-----|------|-----|
| Day 1 (Tue) | HN Show HN at 8am ET | Sets the technical credibility floor |
| Day 3 (Thu) | Indiehackers month-1 retrospective at 9am ET | Sets the founder-credibility floor |
| Day 7 (Sun) | r/meditation post at 8pm ET | Sets the category-credibility floor |

If you can only do one, do HN. If you can only do two, do HN and IH. The three-post minimum is the right answer if you have the energy for more.

The full 5-platform + 4-follow-up launch is the right answer if you have the energy and the time. But the minimum viable launch works. The product will still get signups. The product will still get feedback. The product will still find its first 30 day-3 users.

Don't let the perfect be the enemy of the shipped.

— Roel

(end of file)

> The traps below are the ones founders in this category actually fall into. Each one has a tell, a fix, and a "what it costs if you don't fix it" line.

## Trap 1: Posting in volume

**The tell:** You have 5 launch posts scheduled for the same week across 5 platforms.

**Why it's tempting:** More posts = more surface area = more signups, right? Wrong. Each platform punishes volume. HN rewards one Show HN per product, ever. Reddit flags accounts that post in multiple subreddits in the same week. IH tolerates multiple posts but expects a week between them.

**The fix:** Spread the launch across 2–3 weeks. One platform per week. If a post gets traction, do the follow-up content for that platform before moving to the next platform. If a post gets no traction, do not auto-post on the next platform; regroup and try a different angle.

**What it costs if you don't fix it:** Account flagging, post removal, being shadowbanned on at least one platform. The cost is high and the recovery time is months.

## Trap 2: Editing the post body after submission

**The tell:** You spot a typo in the third paragraph 20 minutes after submitting.

**Why it's tempting:** Typos are embarrassing.

**The fix:** Don't edit. Reddit and HN both show edit timestamps. Edited posts are read as "this was marketing copy the founder polished." Unedited posts are read as "this was written by a real person." The typo is more credible than the edit.

**What it costs if you don't fix it:** A small credibility hit. In a thread where every other signal is borderline, this can tip it.

## Trap 3: Arguing with skeptics in the comments

**The tell:** A top comment says "this is a scam" and you have a 400-word rebuttal.

**Why it's tempting:** You have evidence! You have research! You have a N-of-1!

**The fix:** The 4-line concession + question response above. Do not write the 400-word rebuttal. The 400-word rebuttal will be downvoted, the 4-line concession will be upvoted. The audience is watching how you handle criticism, not whether you can win the argument.

**What it costs if you don't fix it:** The thread turns on you. The top comment becomes "look at this founder arguing with critics in the comments." You lose the thread.

## Trap 4: Linking the product in the body

**The tell:** The post body says "the product is at https://rulio.app/qi" in the third paragraph.

**Why it's tempting:** Readers should be able to find the product.

**The fix:** Most subreddit rules require the link to be in the comments, not the body. HN doesn't care but Reddit and IH both penalize body links. Move the link to a top-level comment. The body should be pure value.

**What it costs if you don't fix it:** Post removal by mods, account flagging, possible ban on repeat offense.

## Trap 5: Posting from a brand-new account

**The tell:** The account posting was created 3 days ago.

**Why it's tempting:** You want a "clean" account for the product.

**The fix:** Use your real personal account, the one you've been commenting from for years. Or do 2 weeks of warmup before posting. A new account with the founder's first post is the #1 signal spam filters look for.

**What it costs if you don't fix it:** Auto-filter catches the post, fewer people see it, fewer comments, less traction, the launch "fails" for reasons unrelated to the product.

## Trap 6: Pinning your own comment as the "first thing to read"

**The tell:** You pin a top-level comment that says "thanks for the interest! Here's the link and a quick overview."

**Why it's tempting:** You want to control the framing of the thread.

**The fix:** Don't pin your own comment unless it adds specific value. Reddit users treat pinned founder comments as evidence of a campaign. A pinned comment with substance (a detailed answer to the top question, a list of caveats) is fine. A pinned comment that pitches the product is a thread-killer.

**What it costs if you don't fix it:** The thread reads as marketing-driven. Commenters stop engaging.

## Trap 7: Cross-promoting between posts

**The tell:** Your HN comment says "I also posted this on r/Entrepreneur if you want to discuss there."

**Why it's tempting:** Cross-promotion seems efficient.

**The fix:** Don't. The platforms detect the pattern. Even if the platforms don't detect it, the readers will. The HN crowd and the Reddit crowd overlap. The r/Entrepreneur crowd and the r/meditation crowd don't. Treat each platform as its own universe.

**What it costs if you don't fix it:** Account flags, possible ban, the platforms start associating you with coordinated inauthentic behavior.

## Trap 8: The "I'm the founder" disclaimer every single time

**The tell:** You write "Disclosure: I'm the founder" at the top of every comment, even when responding to a friendly question about a feature.

**Why it's tempting:** Lawyer instinct.

**The fix:** One disclosure per post, in the body. Not in every comment. The audience knows you're the founder — you posted the post. Repeating the disclosure in every comment reads as defensive and breaks the conversational flow.

**What it costs if you don't fix it:** The comments feel stilted. The audience stops engaging.

## Trap 9: Screenshotting the product into the post

**The tell:** The post body includes a screenshot of /qi showing the player.

**Why it's tempting:** Visual proof of the product.

**The fix:** Don't. Screenshots in posts read as marketing. The URL alone lets the curious reader click through. The image also breaks Reddit's text-only rendering on many mobile apps.

**What it costs if you don't fix it:** The post reads as promotional. The platform penalizes you.

## Trap 10: Trying to address every comment

**The tell:** You reply to a drive-by "this is dumb" comment with a 200-word explanation.

**Why it's tempting:** Every comment feels important.

**The fix:** Reply to the substantive comments. Let the drive-bys sit. The substantive comments are the ones that drive the thread's upvotes. The drive-bys are noise. If you reply to noise, you look defensive.

**What it costs if you don't fix it:** Your reply chain becomes the loudest thing in the thread, and it is a chain of defensive responses. The thread loses.

---

# 19. The week-by-week content calendar (first 30 days)

> This is the operational calendar for the launch wave and the immediate follow-up. Use it as a checklist.

| Week | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday | Sunday |
|------|--------|---------|-----------|----------|--------|----------|--------|
| Week 1 (launch) | Prep all 5 posts, do warmup checks | HN Show HN at 8am ET | r/Entrepreneur at 9am ET | Indiehackers at 9am ET | Light monitoring only | Light monitoring only | r/meditation at 8pm ET |
| Week 2 | r/SleepBetter at 8pm ET | Monitor comments, no new posts | Monitor comments, no new posts | First follow-up post on r/Entrepreneur | Light monitoring only | Light monitoring only | r/meditation follow-up at 8pm ET |
| Week 3 | r/SleepBetter follow-up at 8pm ET | IH month-2 prep | IH month-2 post at 9am ET | Monitor comments, no new posts | Light monitoring only | Light monitoring only | Light monitoring only |
| Week 4 | Reassess metrics, plan next 30 days | — | — | — | — | — | — |

Total posts in the first 30 days: 5 launches + 4 follow-ups = 9 posts across 5 platforms. That is the right cadence. More than that is volume. Less than that is not enough.

---

# 20. The 30-day retrospective template

> Fill this in 30 days after the launch wave. The output is the input for the month-2 plan.

```
Launch wave retrospective (30 days post-launch)

What worked (be specific):
- ___
- ___
- ___

What didn't (be specific):
- ___
- ___
- ___

What surprised me:
- ___
- ___

What I would do differently:
- ___
- ___

Metrics vs. targets:
- HN: target ___ / actual ___
- r/Entrepreneur: target ___ / actual ___
- r/meditation: target ___ / actual ___
- r/SleepBetter: target ___ / actual ___
- Indiehackers: target ___ / actual ___

Free-to-paid conversion at day 30: ___ paid users / ___ free users = ___%

Day-3-return cohort at day 30: ___

The single most important thing I learned: ___

The single thing I am most uncertain about: ___

My plan for month 2:
- ___
- ___
- ___
```

---

# Appendix: quick-reference URLs

| What | Where |
|------|-------|
| Product homepage | https://rulio.app |
| Free tier | https://rulio.app/qi |
| Paid tier | https://rulio.app/pro |
| Stripe payment link | https://buy.stripe.com/dRmfZh79P2mOfB8a8Gdwc03 |
| Open-source audio pipeline | https://github.com/roeljanssens/rulio-audio |
| Founder email | roel@rulio.app |
| Founder LinkedIn | linkedin.com/in/roeljanssens |
| Founder Twitter | @roeljanssens |

---

# Appendix: subreddit rule summary

| Subreddit | Self-promo rule | Disclosure required | Link in body? | Best day | Best time (US ET) |
|-----------|-----------------|--------------------|---------------|----------|-------------------|
| r/Entrepreneur | 90% value / 10% promo | Implicit (title says "I built it") | No — link in top-level comment | Tue or Wed | 9–11am |
| r/meditation | Strict — no affiliate, no selling | Yes, if posting your own product | Optional, end of body only | Sun evening | 8–10pm |
| r/SleepBetter | Tolerant of "I built this" posts | Implicit | Yes, end of body | Sun or Mon evening | 8–10pm |
| r/insomnia | Stricter — chronic insomnia focus | Yes | Yes, end of body | Any day | 8–10pm |
| Indiehackers | Built for this | Yes (in the body) | Yes, top of body | Tue or Wed | 9–11am |
| HN Show HN | Built for this | Implicit (Show HN is the disclosure) | Homepage only | Tue–Thu | 8–10am |

---

# Appendix: tone calibration

For each channel, the realistic month-1 target:

| Channel | Conservative target | Stretch target |
|---------|---------------------|----------------|
| HN | Top 30 of the day, 5–10 substantive comments, 50 free signups | Top 10 of the day, 30+ comments, 200 signups |
| r/Entrepreneur | 20 upvotes, 5–15 thoughtful comments, 100 free signups | 200+ upvotes, top of the subreddit for a day, 500 signups |
| r/meditation | Stays up (doesn't get removed), 5–10 thoughtful comments | 100+ upvotes, cited in subsequent solfeggio discussion threads |
| r/SleepBetter | 30 upvotes, 10+ comments from people who tried it | 200+ upvotes, multiple "I tried it, here's what happened" follow-up posts |
| Indiehackers | 20 upvotes, 5–10 thoughtful comments from people who've shipped similar products | Top 10 of the week, 50+ comments, named in IH newsletter |

Conversion targets (free → paid) for month 1 are intentionally not in this table. Month 1 is not a paid-conversion month. Month 1 is "do day-3 users come back on day 30." The paid numbers come in months 3–6 if the cohort holds.

A note on the difference between "success" and "viral": a post that gets 5,000 upvotes and 800 comments, where 600 comments are people arguing about solfeggio validity, is technically viral but operationally useless. The metric that matters is "signups who actually use the product." A post that gets 80 upvotes and 8 thoughtful comments, where 5 of those comments are from people who tried the product and came back, is operationally excellent. Judge the posts by the second metric, not the first.

A note on what "no traction" means: if a post gets fewer than 5 upvotes in 24 hours, that is normal for a brand-new account in a niche subreddit. It is not a failure of the product. It is a signal that the post needs a different angle. Try the alternative titles in section 9 with a different body. If the second post also gets fewer than 5 upvotes, take a 30-day break from that subreddit, post 3-5 substantive comments per week on other people's posts, and try again.

---

# Appendix: writing process

> How each post in this file was written, in case you want to write your own version with the same process.

**Step 1 — Pick the platform's "hot button" before writing anything.** For HN, the hot button is "a working product and a specific technical question." For r/Entrepreneur, it's "a vulnerable story and specific lessons." For r/meditation, it's "engagement with the retracted paper." For r/SleepBetter, it's "made this for myself." For IH, it's "specific numbers." The first draft of each post above started from the hot button, not from the product description.

**Step 2 — Write the opener last, not first.** Openers are the hardest part. Write the body, then write the opener to match what the body actually argues. The opener that works is the one that hooks on the platform's hot button, not the one that summarizes the product.

**Step 3 — Cut every adjective.** "Powerful," "transformative," "innovative," "revolutionary" — none of them belong in these posts. The product is either useful or it isn't. The adjectives tell the reader you don't trust the evidence to speak for itself.

**Step 4 — Cut every exclamation point.** Posts without exclamation points read as confident. Posts with exclamation points read as desperate. The only exception: the closing CTA, which can have one if it feels natural. One. Not three.

**Step 5 — Read the post out loud.** If you stumble on a sentence, the reader will too. Rewrite until it flows. This is the single highest-leverage editing move.

**Step 6 — Check the disclosure.** Every post either has a clear "I'm the founder" line or has a title that makes the founder connection obvious. No ambiguity.

**Step 7 — Check the ask.** Every post ends with a question or a request for feedback. No exceptions. A post that ends with "download now" is a different kind of post, and not the kind in this file.

**Step 8 — Check the platform's rules.** Before posting, go to the subreddit's rules page and re-read the self-promotion rule. The rules change. The version of the rules at the time of this writing is linked in section 6, but go check the current version.

**Step 9 — Paste, post, sit by the keyboard for 2-4 hours.** Comments come in waves. The first wave is friends and family. The second wave is subreddit regulars. The third wave is drive-by critics. The fourth wave is the people who actually care. You need to be there for waves 2-4.

**Step 10 — Write the post-mortem the same day.** While the post is still fresh. Capture the metrics, the comments, the surprises. Save in a folder. You'll need it for the month-2 retrospective.

---

# Appendix: what to do if you're not a native English speaker

> The posts above are written in American English. If you are posting from a non-English-primary country, three notes.

**1. Spelling and grammar matter.** Reddit and HN readers are unforgiving of typos in a founder who is selling a product. Use Grammarly, use Hemingway, use a native speaker friend. Do not post without a final pass from someone who writes English professionally.

**2. Tone translates differently.** Some of the posts above are deliberately understated. Understatement in American English reads as confident. Understatement in some other Englishes reads as weak or unsure. If you are posting from a UK background, the tone reads as British understatement (fine). From a German or French background, the same tone reads as terse (also fine). From an Indian or Southeast Asian English background, it may read as terse in a way that lands wrong. In that case, add 10% more warmth to the r/Entrepreneur post specifically.

**3. Cultural references land differently.** "The 3 PM wall" works in American English because it is a near-universal American knowledge-worker experience. If you are posting from a different timezone / work culture, consider whether the metaphor lands. If not, change "3 PM wall" to the local equivalent in your title. The HN post title above ("the 3 PM wall") is the most American of the five titles; you may need to localize it for HN's global audience.

---

# Appendix: legal / regulatory notes

> I am not a lawyer. The notes below are not legal advice. They are operational guidance based on what other audio-wellness founders have told me. Get a real lawyer for the actual legal posture of your product.

**1. No health claims.** Anywhere. The line between "this practice helps me focus" (a personal testimonial, fine) and "this practice improves focus" (a health claim, regulated in most jurisdictions) is real. The post bodies above are written to stay on the personal-testimonial side of that line. Do not edit them to make the claims stronger.

**2. Disclose material connections.** In the US, the FTC requires you to disclose material connections. "I'm the founder" is sufficient. In the EU, the rules are looser but the principle is the same. In the UK, the ASA enforces similar rules. The disclosure line in each post above is the minimum.

**3. Don't make medical claims even when users ask.** The single most common trap: a user comments "this cured my anxiety" and the founder replies "that's great, we've heard that from many users." That reply is a health claim by adoption. The right reply is "I'm glad it helped. The product is not a medical treatment; if anxiety is a persistent issue for you, please talk to a clinician."

**4. Don't collect health data you don't need.** The session log is intentionally minimal — frequency, duration, optional one-line note. Do not add fields for "how anxious are you right now" or "rate your sleep quality." Each additional health-related field adds regulatory surface area.

**5. Get a terms-of-service and privacy policy.** Both are linked from /qi. Do not deploy without them. Use a template (Termly, TermsFeed, or equivalent) and have a lawyer review before you launch a paid tier.

---

# Appendix: a short reading list

> The references below are the ones that informed the posts above. None of them are required reading. All of them are worth reading if you want to understand the rhetorical norms of the platforms you're posting on.

- **Hacker News:** Paul Graham's essays on what makes a good Show HN. The official Show HN FAQ on news.ycombinator.com. The "best of" Show HN archive, sorted by comments — the high-comment ones are the ones that worked.
- **Reddit:** The moderator guidelines for r/Entrepreneur and r/meditation specifically. The "best of" subreddit archives, sorted by top-all-time. The Readit Reddit etiquette guide, which is from 2012 but still mostly right.
- **r/Entrepreneur specifically:** The "I built a SaaS" and "I failed at a startup" post archives. Both are full of patterns to copy and patterns to avoid.
- **Indiehackers:** The interview archive. The "trends" reports. The weekly ship-of-the-week posts.
- **The audio-wellness category:** The retracted Stanford paper (read the retraction notice, not just the abstract). The 2023 Frontiers in Human Neuroscience meta-analysis on binaural beats. The Joseph Puleo chapter in the 1970s original solfeggio book, which is mostly numerological. The Insight Timer approach to "no streak system" — relevant case study.

---

# Final note

The five posts above are written to do two things at once: drive a small number of free-tier signups, and establish credibility as a founder who is honest about what the product does and doesn't do. The second goal is more important than the first, because credibility compounds and a signup doesn't. If you have to choose between "more signups" and "better reputation," choose reputation every time.

The audio-wellness category is full of products that overclaim, and the long tail of that category drifts toward conspiracy-grade wellness content. The opportunity for a small honest product in this space is real, but it only works if you stay honest, including in the marketing. The posts above are calibrated for that.

If you read all five posts and they feel like they were written by different people, that is intentional. If they feel like they were written by the same person trying to sound like different people, edit them again until they feel like different people. The platforms reward authenticity, and authenticity in a multi-platform launch means writing in the register each platform rewards.

If you read all five posts and they feel salesy, edit them again. The bar is high. The bar is "would I send this to a friend who doesn't know what I'm working on?" If the answer is no, the post is not ready.

One last thing, and then I'm done: the day you ship the launch posts will feel like the biggest day of the project so far. It isn't. The biggest day is the day someone you don't know writes to tell you the product helped them, and you write back to ask what exactly helped. That day is in week 3 or week 4, and it's the day this whole launch kit is actually built for. Everything before it is setup.

— Roel

(end of file)
