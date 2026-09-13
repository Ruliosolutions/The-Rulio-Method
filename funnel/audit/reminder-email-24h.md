# Energy Audit — 24-hour reminder

> **Sent 24 hours before the call.** Triggered by the Resend
> scheduled-send feature, or by a Supabase Edge Function on
> `audit_leads.event_time - INTERVAL '24 hours'`. Subject line
> A/B tests as: "Tomorrow at {time} — your Rulio Energy Audit" /
> "Quick reminder: 30 min with Roel tomorrow".

**From:** Roel from Rulio <hello@rulio.io>
**Subject:** Tomorrow at {time} — your Rulio Energy Audit

**Body:**

> Hey {first_name},
>
> Quick reminder — your Rulio Energy Audit is tomorrow at
> **{time} {tz}**. That's **{relative}**.
>
> **If you haven't read the prep doc yet:** 5 minutes, totally
> worth it. [rulio.io/audit/prep](https://rulio.io/audit/prep)
>
> **If you have:** see you tomorrow.
>
> Wear headphones if you have them handy. Bring 1 specific
> problem you want to solve (a project, a deadline, a recurring
> 3pm crash — anything).
>
> Video link is in the calendar invite.
>
> — Roel

**PostHog event:** `audit_reminder_sent`
**Supabase update:** `audit_leads.reminder_sent_at = NOW()`

---

# Show-up rate benchmark

Industry benchmark for free 30-min consults is **60–70% show-up
rate** with a 24-hour reminder. Without the reminder, 40–50%.
The reminder is the single highest-leverage email in the funnel.

If the show-up rate drops below 60% after the first 10 calls:
- Check the time slot. Mid-morning Europe/Brussels (10:00–11:00)
  shows up at 75%+. Late afternoon (16:00–17:00) shows up at 55%.
  Move the default slot to mid-morning.
- Check the confirmation email. If it lands in spam, the reminder
  won't either. Use a different "from" domain if needed.
- Check the no-show email. Send it 4 hours after the scheduled
  time, not 24 (people sometimes reschedule at the last minute).
