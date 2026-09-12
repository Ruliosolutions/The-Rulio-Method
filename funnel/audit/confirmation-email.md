# Energy Audit — Confirmation email

> **Sent on booking.** Triggered by Calendly's `event_scheduled`
> webhook, or sent manually within 5 minutes of the booking. Subject
> line A/B tests as: "Your Rulio Energy Audit is booked" /
> "See you {date} — your Energy Audit is confirmed" — track which
> one gets a higher show-up rate.

**From:** Roel from Rulio <hello@rulio.io>
**Reply-to:** hello@rulio.io
**Subject:** Your Rulio Energy Audit is booked

**Body:**

> Hey {first_name},
>
> Your 30-min Rulio Energy Audit is booked for **{date} at {time} {tz}**.
> Calendar invite is in your inbox.
>
> **Three things to do now:**
>
> 1. 📅 **Add the call to your calendar.** The invite has the
>    video link.
> 2. 📖 **Read the 5-min prep doc.** It takes 5 minutes and
>    makes the call 10× more useful. [Read it →](https://rulio.io/audit/prep)
> 3. 🎧 **If you have headphones handy, wear them.** We'll
>    listen to a sample session live so you can feel the
>    difference.
>
> **What to expect (30 min):**
>
> - 5 min — your current state: energy, focus, sleep, the worst
>   hour of your day.
> - 10 min — your schedule: a walk through tomorrow, identifying
>   the hour that hurts most.
> - 10 min — the prescription: which 3 of the 9 solfeggio
>   frequencies match, when, how to layer them.
> - 5 min — the daily: a single 5-minute practice you can
>   actually stick to.
>
> **The deliverable:** A custom 5-minute daily practice written
> for your specific schedule, typed live on the call into your
> copy of the Rulio Code Card. You'll leave the call with it.
>
> No pitch. No upsell. If after the call you want the Rulio
> Engine app or a Studio retainer, that's a separate
> conversation.
>
> See you {day-of-week}.
>
> — Roel
> Rulio Studio · Brussels · rulio.io

**PostHog event:** `audit_confirmation_sent`
**Supabase update:** `audit_leads.confirmation_sent_at = NOW()`
**Trigger next:** day-3 follow-up email cron

---

# Email deliverability notes

- Send via Resend (EU region, GDPR-compliant).
- DKIM/SPF already set up on `rulio.io` (Section 3 W1-5 rebrand action).
- Plain-text alternative: same content, no HTML.
- "From" name is "Roel from Rulio", not "Rulio Studio noreply".
- Reply-to is `hello@rulio.io` — Roel reads every reply.
