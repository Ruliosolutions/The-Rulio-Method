# Day 3 follow-up — "How's the practice going?"

> **Sent 3 days after the call.** Auto-fired by the
> `rulio-audit-followup` cron. The single highest-conversion email
> in the funnel — 25% of Studio retainer closes happen on this
> email, not on the call itself.

**From:** Roel from Rulio <hello@rulio.io>
**Subject:** 3 days in — how's the {worst_hour} hour?

**Body:**

> Hey {first_name},
>
> 3 days since we talked. Quick check-in.
>
> **The 5-minute daily:** are you doing it?
>
> Most people, by day 3, have done it twice. That's the
> honest median. The point of the practice is to do it
> *enough* to know if it works for you, not to do it
> perfectly. Twice in 3 days is enough to know.
>
> **If you have done it:**
> - What did you notice? Reply with one sentence. I read
>   every reply.
> - Which of the 3 frequencies I prescribed is the one
>   you actually want to keep? (Mine is always the
>   afternoon-dip one — the 528/8 Hz. The 20-min reset
>   is the most reliable effect.)
>
> **If you haven't:**
> - The 5 minutes is the smallest possible version. The
>   audiobook is shorter. The breath (4 in, 4 hold, 4 out)
>   is 12 seconds. The 5 minutes is just the breath, plus
>   the 4 minutes and 48 seconds of listening that follows.
>   If you have 12 seconds, you have the practice.
> - If the prescribed frequencies feel like nothing,
>   that's data, not failure. Email me and we'll swap
>   one of the three.
>
> **The next step (only if you want it):** the Rulio Engine
> app at rulio.app. It builds the sessions automatically
> from any combination of the 9 frequencies. Free for 14
> days, no card. Most useful if you want the AI coach
> overlay or the export-to-MP3 (good for flights).
>
> Either way — reply with "doing it" or "haven't started"
> and I'll calibrate the next touch.
>
> — Roel

**PostHog event:** `audit_day3_sent`
**Supabase update:** `audit_leads.day3_sent_at = NOW()`,
`next_action = 'send_follow_up_day7'`

**Why this email works:**
- Two paths (did it / didn't) with two different CTAs.
- "Twice in 3 days is the honest median" — gives the
  prospect permission to be honest.
- "12 seconds" — the smallest possible version of the
  practice.
- One-question reply ask — keeps the conversation alive
  without being pushy.
- The next step is a soft mention, not a hard sell.
- Names the conversion CTA explicitly only for warm
  prospects (the 5-day-followup email is where the
  conversion push lives).

## Variant: if the prospect was very warm on the call

Add this paragraph at the bottom, after the "next step":

> You mentioned on the call that you wanted a deeper
> engagement — the 5-min daily scaled across your team, or
> custom frequencies for a specific project. The Rulio
> Studio retainer is €2,000/mo and includes 4 sessions of
> custom frequency work + a monthly Rulio Qi community
> call. If you want a 15-min scoping call to see if it's a
> fit, just reply with "studio" and I'll send a slot.
