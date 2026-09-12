# No-show email — "Missed you, want to reschedule?"

> **Sent 4 hours after the scheduled call time, if the call
> didn't happen and the prospect hasn't rescheduled.** Auto-fired
> by the `rulio-audit-followup` cron. The single most important
> email for keeping the pipeline warm — a no-show who reschedules
> is still a 60%+ show-up rate on the second try.

**From:** Roel from Rulio <hello@rulio.io>
**Subject:** Missed you today — easy reschedule

**Body:**

> Hey {first_name},
>
> Looks like we missed each other today. No worries —
> stuff happens.
>
> **Easy reschedule:** [Book a new 30-min slot →]({reschedule_url})
>
> The prep doc is still useful if you want to read it
> before the next call: [rulio.io/audit/prep](https://rulio.io/audit/prep)
>
> If the timing isn't right and you want to put this on
> the back-burner, no pressure — I'll send you a check-in
> in 30 days. Just reply "later" and I'll put you in the
> queue.
>
> — Roel

**PostHog event:** `audit_no_show_sent`
**Supabase update:** `audit_leads.status = 'no_show'`,
`next_action = 'no_show_followup'`

## Day 7 follow-up for no-shows

If the prospect doesn't reschedule within 7 days, send a
second, lighter-touch email:

> Hey {first_name},
>
> Following up on the Energy Audit we missed. If you
> still want it, the slot is here:
> [{reschedule_url}]({reschedule_url})
>
> If not, no worries — the Rulio Qi Method book is yours
> either way. [Download →](https://rulio.io/qi)
>
> — Roel

**PostHog event:** `audit_no_show_followup_sent`
**Supabase update:** `next_action = 'none'`

After that, the prospect drops off the active funnel and
goes onto the 90-day re-target list. Re-target with a
specific offer (e.g., "the Rulio Engine just shipped V1
with a feature you specifically asked about").

## Conversion math on no-shows

- 30% reschedule after the no-show email.
- 50% of reschedules show up.
- 25% of those close to Studio retainer.

So 30% × 50% × 25% = ~ 4% of no-shows eventually close to
Studio retainer. Worth the email.

The remaining 96% are still in the newsletter funnel.
Even if they never buy the retainer, they may buy the
Rulio Engine subscription or the next product. Don't
write them off.
