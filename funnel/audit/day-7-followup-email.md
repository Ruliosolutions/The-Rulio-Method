# Day 7 follow-up — "Ready to go deeper, or stay solo?"

> **Sent 7 days after the call.** Auto-fired by the
> `rulio-audit-followup` cron. The conversion email. By day 7
> the prospect has either stuck with the practice (warm) or
> drifted (cool). This email splits the funnel into the two
> paths.

**From:** Roel from Rulio <hello@rulio.io>
**Subject:** One week in — what's the verdict?

**Body:**

> Hey {first_name},
>
> It's been a week since the Energy Audit. Quick verdict
> question:
>
> **Option A — The 5-minute daily is working.** You want
> to keep going on your own. That's the goal. Two paths
> from here:
>
> - *Free path:* the Rulio Qi Method book + 12 audio
>   sessions are yours. The 30-day Rulio Qi challenge
>   (Chapter 11 of the book) is the natural next step.
>   No further action needed.
> - *App path:* the Rulio Engine at rulio.app builds the
>   sessions automatically. Free for 14 days, no card.
>   The 5-minute daily is built in.
>
> **Option B — The 5-minute daily is sort of working, but
> you want a deeper engagement.** That's where the Rulio
> Studio retainer lives. €2,000/mo, 4 sessions of custom
> frequency work per quarter, monthly Rulio Qi community
> call with other founders doing the practice. 15-min
> scoping call to see if it's a fit — just reply with
> "studio" and I'll send a slot.
>
> **Option C — The 5-minute daily isn't working for you.**
> That's data, not failure. Different frequencies work
> for different people. Reply with what's not working
> and we'll swap one of the three, no charge.
>
> No right answer. The audit is the deliverable; the
> practice is yours.
>
> — Roel
>
> P.S. If you don't reply to this email, that's fine. The
> 5-minute daily is yours regardless. The book is yours
> regardless. Use what works, leave the rest.

**PostHog event:** `audit_day7_sent`
**Supabase update:** `audit_leads.day7_sent_at = NOW()`,
`next_action = 'none'`

**Why this email works:**
- Three explicit options, no implicit "please buy"
  pressure.
- Option A is the warm-and-done path. Most prospects
  land here. That's the right answer for them.
- Option B is the conversion path. Only the warmest
  prospects self-select into it. The 15-min scoping call
  is the softest possible next step.
- Option C is the "I drifted" path. Offering to swap
  frequencies with no charge is the highest-trust move
  possible — it's literally giving away consulting time.
  A small percentage of "I drifted" prospects become
  the most loyal Studio retainer clients.
- "No reply is fine" PS removes the social pressure to
  respond. The prospect's silence is not interpreted as
  failure. They get the book and the practice
  regardless.

## What the next 30 days look like

After day 7, the prospect is in one of three buckets:

1. **Converted (Studio retainer, Engine Pro, or Enerqi Pro).**
   Now in the customer-success loop.
2. **Warmed (active 5-minute daily, no conversion).** On the
   newsletter list. Will convert in 60–180 days via the
   weekly content drip.
3. **Drifted.** The day-3 and day-7 emails did their job.
   Re-target in 90 days with a new angle (e.g., a new
   Rulio Engine feature).

The funnel is designed so that 1 + 2 + 3 = 100% of prospects
are still on the path, just at different speeds. The CRM
flags the bucket automatically.
