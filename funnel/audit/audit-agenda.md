# The 30-min Rulio Energy Audit — Roel's playbook

> **The 30-minute session is the entire funnel.** The deliverable
> is the prescription, not the call. Use this agenda verbatim. Don't
> improvise the structure — the structure is the trust.

## Pre-call (T-5 min)

- Open Calendly event, confirm the prospect's name, company, role,
  worst hour, and notes (the intake form fields are passed in the
  Calendly `a1` parameter).
- Skim the CRM row in Supabase (table `audit_leads`).
- Have the following open in tabs: the prospect's LinkedIn profile,
  the company's website, the Rulio Qi Method book (`ebook/manuscript.md`),
  the Rulio Code Card (`ebook/rulio-code-card.md`).
- **Do not prep a custom session yet.** The 30 min is structured; if
  you start with a session you skip the diagnosis.

## T+0 — Welcome (1 min)

**Say:** "Hey {first_name}, thanks for booking. This is a 30-min
call. I want to learn about your current state, walk through your
schedule, and leave you with a custom 5-minute daily practice.
Last 5 minutes I'll send you the prescription and the book. Any
questions before we start?"

**Listen.** The first thing they say is the most useful. Don't
interrupt.

## T+1 — Current state (5 min)

**Ask (in this order):**

1. "What's the worst hour of your day? When does focus break?"
2. "What have you tried? (Headspace, Calm, nootropics, white
   noise, anything else.)"
3. "How long has this been a problem — weeks, months, years?"
4. "On a 0–10 scale, where's your energy at 3pm today?"
5. "Anything medical I should know about? (Sleep disorder,
   anxiety, anything being treated.)"

**Listen for the gap.** If they say "I've tried everything" —
that's a person who is looking for a *system*, not a product. If
they say "I don't really have a problem" — they booked the call
because someone referred them, not because they need help. Adjust
the prescription accordingly.

## T+6 — Schedule walk (10 min)

**Ask:** "Walk me through tomorrow. Hour by hour. What are the
3 hardest blocks?"

**Listen and write down (in your notes, not on screen):**
- The block that requires the most focus
- The block that requires the most social / energy
- The block that is the worst right now (the answer to Q1)
- The wind-down before bed

**This becomes the prescription.** You are not picking the
frequencies yet — you are gathering the inputs.

## T+16 — The prescription (10 min)

**Now** look up the Rulio Code Card. Pick the 3 frequencies that
match the prospect's schedule:

- **Morning block** (first 2 hours of work) → 396 Hz (4 Hz offset)
  OR 417 Hz (6 Hz offset) depending on whether the block is
  emotional (dealing with people) or creative (first draft,
  design, code).
- **Deep work** (the focus block from T+6) → 417 Hz + 852 Hz
  layered. 5 min before, then Pomodoro.
- **Afternoon dip** (the worst hour from T+1) → 528 Hz at 8 Hz
  offset. 20 min, eyes closed, then a walk.
- **End-of-day review** → 852 Hz at 14 Hz offset. 5 min, then
  5 min of journaling.
- **Bedtime** → 174 Hz + 528 Hz layered. 10 min, lights out.

**Explain the 4-4-4 breath** (4 sec in, 4 sec hold, 4 sec out).
This is 80% of the work. The frequencies are 20%.

**Write the prescription on the Rulio Code Card live, on screen.**
Share your screen, open the PDF, type into the "My frequencies"
section. The prospect watches the prescription being built for
them in real time. This is the moment the call becomes valuable.

## T+26 — The 5-minute daily (4 min)

**Walk them through the 5-minute daily:**

> 1. Open the Rulio Qi audio companion (rulio.io/qi).
> 2. Pick the session for the next 4 hours.
> 3. Headphones on, eyes closed.
> 4. One breath. 4 in. 4 hold. 4 out.
> 5. Listen. Do nothing.
> 6. Stand up, return to the day.

**Be explicit:** "Don't add anything. Don't optimise it. Just
do the 5 minutes for 14 days. After 14 days, if it sticks, we'll
talk about what to layer on."

## T+30 — The send (the deliverable)

**While you're still on the call:**

1. Send the **post-call email** with the prescription attached
   (the email has a mailto: link with the prescription
   pre-formatted).
2. Send the **Rulio Qi Method book** as a free gift (use the
   `ebook/manuscript.md` PDF).
3. Send the **Rulio Code Card** PDF.
4. If the prospect is warm (came from a referral, a warm ex-client,
   a 5D Masters rebrand), mention the next step:
   - If they liked the prescription → Rulio Engine Pro (€9.99/mo,
     14 days free). Don't push; mention.
   - If they want a deeper, ongoing engagement → Studio retainer
     (€2,000/mo). Mention only if asked.

**Say:** "I'll send you an email in the next 5 minutes with
everything we discussed. If you have any questions, just reply.
Thanks {first_name}."

**End the call.**

## Post-call (T+5 min)

1. **Send the post-call email** (`post-call-email.md`) with:
   - The custom prescription (typed, not handwritten).
   - The Rulio Qi Method book as a PDF.
   - The Rulio Code Card as a PDF.
   - One CTA: "If you want to try the practice, the Rulio Engine
     app is free for 14 days at rulio.app."
2. **Update the Supabase row** in `audit_leads`:
   - `prescription` (text)
   - `prescription_frequencies` (JSON: array of 3 frequencies with offsets)
   - `status` → "completed"
   - `completed_at` → timestamp
   - `next_action` → "send_follow_up" (so the cron knows to send
     the day-3 follow-up)
3. **Log the call** in the CRM notes field:
   - What they tried
   - The worst hour
   - The prescription
   - Anything you noticed (skepticism, urgency, fit)

## Day 3 follow-up (auto)

The cron `rulio-drift-watch` doesn't handle this — this is a
follow-up, not a drift scan. Instead, write a separate cron:

```yaml
# cron: rulio-audit-followup
schedule: "0 10 * * *"  # every day at 10am
prompt: |
  You are the Rulio monetization-scout. Find all rows in Supabase
  table `audit_leads` where `status` = 'completed' AND
  `completed_at` >= NOW() - INTERVAL '4 days' AND
  `completed_at` < NOW() - INTERVAL '2 days' AND
  `next_action` = 'send_follow_up'.

  For each row, send the day-3 follow-up email
  (../funnel/audit/day-3-followup-email.md) with the prescription
  frequencies filled in. Update the row to `next_action` =
  'send_follow_up_day7'.
```

## Day 7 follow-up (auto)

Same cron, day 7. Send the "how's it going?" email. This is the
churn-prevention moment. The prescription has had a week to work.
Either they stuck with it (warm → upgrade path) or they didn't
(cool → no path, do not push).

## What to do if the prospect doesn't show

Send the no-show email (4 hours after the scheduled time) with a
reschedule link. Update the row to `next_action` = 'no_show_followup'.
If no reply in 7 days, close the row.

## Conversion math

- **Audit → Studio retainer** target: 30% (3 of 10 booked calls
  close to €2,000/mo).
- **Audit → Rulio Engine Pro** target: 50% (5 of 10 buy a
  subscription).
- **Audit → no action** target: 20% (2 of 10 neither retain
  nor subscribe — fine, they're the warm-list seed for the
  newsletter and the next product).

If you hit these numbers on 10 calls/month, the Energy Audit
funnel alone is generating:
- 3 Studio retainers × €2,000 = €6,000 MRR
- 5 Rulio Engine Pro × €9.99 = €50 MRR
- **Total: €6,050 MRR / month, all from the Energy Audit funnel**

That's the entire 90-day Studio retainer target in one funnel
running at one audit/week.
