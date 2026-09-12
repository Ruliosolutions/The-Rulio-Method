# Energy Reset Workshop — email sequence

> **5 emails, 7 days.** The complete post-registration sequence
> for the Energy Reset workshop. Brand-guardian approved.

---

## Email 1 · T+0 · Confirmation

**Subject:** You're in. Here's the Zoom link + 3 things to bring.

```
Hey {firstName},

You're registered for The Energy Reset Workshop.

📅 {date}
🕖 19:00 CET (90 min)
🔗 {zoom_link}
💶 €47 (or €29 with book code)

Three things to bring:

1. Headphones. The binaural-beat effect only works with
   headphones — the L signal goes in one ear, the R signal
   in the other. AirPods, Sony WH-1000XM5, anything.
   Speakers will collapse the effect.

2. A pen. We'll design your protocol live. You'll write
   down your worst state, your hardest hour, and your
   one non-negotiable sleep window. 3 sentences.

3. An open hour after the workshop. No calls, no email.
   The protocol is 5 minutes, 5 times a day. It works
   if you actually run it.

See you Tuesday.

— Roel

P.S. Can't make it live? The replay is yours for 30 days.
But live is better — the protocol design part is the most
useful hour, and you can't get it from a recording.
```

---

## Email 2 · T-24h · Reminder

**Subject:** Tomorrow 19:00 CET — 3 last things

```
Hey {firstName},

Quick reminder for tomorrow's Energy Reset Workshop.

🕖 19:00 CET (90 min)
🔗 {zoom_link}

Three things before we start:

1. Charge your headphones. Nothing worse than the 60 Hz
   sub-bass cutting out at minute 45.

2. Pick your worst state right now. The one that's been
   sitting in your chest this week. Write it in one
   sentence. We'll use it in the live protocol design.

3. Set your phone to "Do Not Disturb" for 90 minutes
   starting 19:00. The workshop is the most useful thing
   you'll do this week. The Slack message can wait.

See you tomorrow.

— Roel
```

---

## Email 3 · T+0 post · Replay + assets

**Subject:** The replay + 9 frequency cards + your 7-day log

```
Hey {firstName},

Thanks for being in the room today. Here's everything
we covered, all in one place.

📼 Workshop replay (30 days): {replay_link}
🎴 9 frequency cards (PDF): {cards_link}
📓 7-day practice log (PDF): {log_link}
🎧 All 14 Qi sessions: https://rulio.app/qi

The 3-sentence homework:

Write down — tonight, before bed:
1. Your worst state (one sentence)
2. Your hardest hour of the day (one sentence)
3. Your one non-negotiable sleep window (one sentence)

Then run the protocol tomorrow. 5 minutes, 5 times.

One thing I want to call out from the workshop: the
frequencies do the work. The point is not to "do the
meditation" or "force the focus." The point is to
let the tones pull you into the right brainwave band.
If you find yourself trying, stop. Put the headphones
on, close your eyes, and let the 528 Hz do its job.

Reply to this email with the 3 sentences if you want
feedback on your protocol. I read every one.

— Roel

P.S. If you want the personalised engine — adaptive
sessions based on your state, the 25-min extended
versions, the AI coach — Engine Pro is 20% off this
week with the code WORKSHOP20. €15.20/mo instead of €19.
```

---

## Email 4 · T+3 · Check-in

**Subject:** Day 3 — how's the protocol going?

```
Hey {firstName},

Three days into the protocol. Quick check-in.

The two most common pitfalls at day 3:

1. "I forgot to run the morning session." — Set a
   phone alarm for the first 7 days. After that, the
   routine is the alarm.

2. "I don't notice anything yet." — That's correct.
   The 7-day log exists because the change is
   invisible on day 1, subtle on day 3, undeniable
   on day 7. Keep going.

The two most common wins at day 3:

1. "I fell asleep in 4 minutes instead of 30." — Yes.
   That's the 528 Hz doing the work.

2. "I had a 90-minute deep-work block that didn't
   require a coffee at minute 60." — Yes. That's the
   417+852 stack with 14 Hz Δ low-beta.

Reply to this email and tell me what's working and
what isn't. I read every one. I'll reply personally
for the first 30 days of any new protocol.

— Roel

P.S. If you have a friend who is a chronic
state-shifter, send them the workshop page. The next
session is {next_date}. €47.
```

---

## Email 5 · T+7 · The offer

**Subject:** Day 7 — time to decide

```
Hey {firstName},

A week in. The data is in.

If the 7-day log is half-full or more: the protocol
is working. The question is what you do next.

If the 7-day log is empty or has 1-2 entries: the
frequencies are not the problem. The system is.
That's exactly what the Energy Reset Bundle is for.

The Energy Reset Bundle (€500, regular €720):

✓ Everything in the Energy Reset Workshop
✓ 6 months of Rulio Engine Pro (adaptive AI sessions,
  25-min extended versions, AI Coach)
✓ 2 × 30-min private sessions with me (your protocol
  + your sleep + your deep-work, refined in real time)

The bundle is for the 3-5% of you who want to go all
in. If you're not in that 3-5%, the standard workshop
+ your own 7-day log is enough.

{cta_link}

One week. The frequencies are working. The question
is whether you keep going alone or you let me
optimise the next 6 months with you.

— Roel
```

---

## Tracking

Each email should have:

- **Open tracking**: via Resend (or Postmark for EU compliance)
- **Click tracking**: UTM parameters on every link
- **Reply parsing**: any reply should auto-create a HubSpot/Salesforce
  lead with tag `workshop-attendee-day-{n}`
- **Unsubscribe**: standard footer, Resend handles

## The 6th email (only if they don't book the bundle)

**T+14 · The audit nudge**

```
Hey {firstName},

Two weeks in. A quick thought.

If the protocol is working and you want to go deeper,
the free 30-min Energy Audit is the next step. We
look at your sleep, your deep-work pattern, and your
hardest state, and I prescribe a custom protocol live
on the call.

{audit_link}

No pitch, no funnel. Just a useful 30 minutes.

— Roel
```

This email is only sent if the bundle wasn't purchased.
Source: `../funnel/audit/audit-agenda.md`.
