# Energy Audit — Post-call email (the deliverable)

> **Sent within 5 minutes of the call ending.** Triggered by the
> Calendly `event_ended` webhook or sent manually. This is THE
> deliverable — the prospect's custom frequency prescription,
> typed and sent within the same hour as the call.

**From:** Roel from Rulio <hello@rulio.io>
**Subject:** Your custom frequency prescription (+ the book)

**Body (template — replace {placeholders} with the call's notes):**

> Hey {first_name},
>
> Thanks for the 30 min today. As promised, here's your custom
> frequency prescription.
>
> ## Your prescription
>
> **The worst hour you named:** {worst_hour}
> **The morning block:** {morning_block_frequency}, {morning_block_offset} Hz offset
> **The deep work block:** {deep_work_frequencies} layered, {deep_work_offset} Hz offset
> **The afternoon dip:** {afternoon_frequency}, {afternoon_offset} Hz offset
> **The end-of-day review:** {evening_frequency}, {evening_offset} Hz offset
> **Bedtime:** {bedtime_frequencies} layered, {bedtime_offset} Hz offset
>
> ## The 5-minute daily
>
> 1. Open rulio.io/qi and pick the session for the next 4 hours.
> 2. Headphones on, eyes closed.
> 3. One breath. 4 sec in. 4 hold. 4 out.
> 4. Listen. Do nothing.
> 5. Stand up, return to the day.
>
> Do this for 14 days. After 14 days, the practice will feel
> mechanical. After 30 days, the absence of it will feel like
> an absence. That's the goal.
>
> ## Two attachments
>
> 1. **The Rulio Qi Method** (38 pages, 12 free audio sessions).
>     The working manual for the practice, with the 9
>     solfeggio frequencies explained and the science bit
>     honestly.
> 2. **The Rulio Code Card** (1 page printable). The 9
>     frequencies + the 5-min daily + the layering rules,
>     designed to live next to your monitor.
>
> ## One optional next step
>
> If you want to try the practice with adaptive audio (the
> app builds the sessions automatically from any combination
> of the 9 frequencies, with export to MP3 and an AI coach
> overlay in V1), the Rulio Engine is free for 14 days at
> rulio.app. No credit card.
>
> If the practice sticks and you want a deeper, ongoing
> engagement — the 5-minute daily scaled across your team,
> a Rulio Studio retainer, custom frequencies for specific
> projects — that's a separate conversation. Just reply.
>
> Thanks again, {first_name}. Let me know how the 14 days go.
>
> — Roel
>
> P.S. The "528 Hz repairs DNA" claim is not in the
> peer-reviewed literature. The 2018 study was retracted in
> 2019. I say this in the book too. The frequencies are a
> *musical* system, not a medical one. A relaxation tool,
> not a treatment. If you have a medical condition, please
> see a qualified practitioner.

**Attachments (PDF):**
- `rulio-qi-method.pdf` (the book)
- `rulio-code-card.pdf` (the printable reference)
- Optionally: `prescription-{first-name}-{date}.pdf` (a custom
  one-page summary of just the prospect's prescription, on
  Rulio letterhead)

**PostHog event:** `audit_postcall_sent`
**Supabase update:** `audit_leads.status = 'completed'`,
`audit_leads.completed_at = NOW()`,
`audit_leads.next_action = 'send_follow_up'`

---

# Conversion CTAs (only if the call was warm)

**If the prospect mentioned Studio / retainer during the call:**

Add a line to the email:

> You mentioned wanting something more structured — the
> Rulio Studio retainer is €2,000/mo and includes 4 sessions
> of custom frequency work + a monthly Rulio Qi community
> call. If you want a 15-min scoping call to see if it's a
> fit, just reply with "studio" and I'll send a slot.

**If the prospect asked about the Rulio Engine:**

Add a line:

> You asked about the Rulio Engine — it's free for 14 days
> at rulio.app. No card. The first session ships with the
> 5-minute daily built in.

**If the prospect was a warm 5D Masters ex-client:**

Add a line:

> Heads up — the same Energy Audit is now part of the
> Rulio Studio retainer for €2,000/mo, with 4 sessions
> per quarter. If you want to keep the rhythm going,
> that's the path.

**If the prospect was cool / quiet / skeptical:**

Do NOT add a CTA. Let the prescription do the work. The
follow-up email at day 3 is the right next touch.
