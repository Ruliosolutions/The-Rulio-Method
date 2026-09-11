/**
 * POST /api/cron/workshop-emails
 *
 * Cron job that fires the 5-email workshop sequence based on the
 * created_at timestamp of each workshop_attendee.
 *
 * Schedule with a cron (or Vercel Cron, or external cron-job.org):
 *   0 9 * * * → POST https://rulio.app/api/cron/workshop-emails
 *
 * For each attendee, checks if any of the 5 emails is due:
 *   - reminder: created_at + workshop_date - 24h  (one-time)
 *   - day-3:    created_at + 3 days              (one-time)
 *   - day-7:    created_at + 7 days              (one-time)
 *   - post:     workshop_date + 1 day            (one-time, after workshop)
 *
 * Each email is tracked in email_events; if it's already there
 * (type='sent' for that template_id), skip.
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM } from "@/lib/resend";
import {
  workshopReminder,
  workshopDay3,
  workshopDay7,
  workshopPostWorkshop,
} from "@/lib/email-templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Vercel cron auth — set CRON_SECRET in env, send it as Bearer token
const CRON_SECRET = process.env.CRON_SECRET;

export async function POST(request: Request) {
  if (CRON_SECRET) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const now = new Date();
  const sentCounts = { reminder: 0, day3: 0, day7: 0, post: 0 };

  // Pull all registered (not refunded) attendees
  const { data: attendees, error } = await supabaseAdmin
    .from("workshop_attendees")
    .select("*")
    .eq("status", "registered");

  if (error) {
    console.error("[cron] supabase error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }

  for (const att of attendees ?? []) {
    const created = new Date(att.created_at);
    const workshop = att.workshop_date
      ? new Date(att.workshop_date + "T19:00:00Z")
      : null;

    // 1. Reminder: 24h before workshop
    if (workshop) {
      const reminderAt = new Date(workshop.getTime() - 24 * 60 * 60 * 1000);
      if (now >= reminderAt && now < workshop) {
        const sent = await alreadySent(att.id, "reminder");
        if (!sent) {
          await sendAndLog(
            att,
            workshopReminder({
              firstName: att.first_name ?? "there",
              workshopDate: workshop.toLocaleDateString("en-GB", {
                weekday: "long", day: "numeric", month: "long", year: "numeric",
              }),
              workshopTime: "19:00 CET",
              zoomLink: process.env.WORKSHOP_ZOOM_LINK ?? "https://rulio.zoom.us/j/REPLACE_ME",
            }),
            "reminder"
          );
          sentCounts.reminder++;
        }
      }
    }

    // 2. Day-3 check-in
    const day3At = new Date(created.getTime() + 3 * 24 * 60 * 60 * 1000);
    if (now >= day3At) {
      const sent = await alreadySent(att.id, "day3");
      if (!sent) {
        await sendAndLog(
          att,
          workshopDay3({ firstName: att.first_name ?? "there" }),
          "day3"
        );
        sentCounts.day3++;
      }
    }

    // 3. Day-7 offer
    const day7At = new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000);
    if (now >= day7At) {
      const sent = await alreadySent(att.id, "day7");
      if (!sent) {
        await sendAndLog(
          att,
          workshopDay7({
            firstName: att.first_name ?? "there",
            bundleLink: `${process.env.NEXT_PUBLIC_URL ?? "https://rulio.app"}/workshop/bundle?email=${att.email}`,
          }),
          "day7"
        );
        sentCounts.day7++;
      }
    }

    // 4. Post-workshop (day after workshop)
    if (workshop) {
      const postAt = new Date(workshop.getTime() + 24 * 60 * 60 * 1000);
      if (now >= postAt) {
        const sent = await alreadySent(att.id, "post");
        if (!sent) {
          await sendAndLog(
            att,
            workshopPostWorkshop({
              firstName: att.first_name ?? "there",
              replayLink: process.env.WORKSHOP_REPLAY_URL ?? "https://rulio.io/workshop/replay",
              cardsLink: process.env.WORKSHOP_CARDS_URL ?? "https://rulio.io/assets/9-frequency-cards.pdf",
              logLink: process.env.WORKSHOP_LOG_URL ?? "https://rulio.io/assets/7-day-log.pdf",
            }),
            "post"
          );
          sentCounts.post++;
        }
      }
    }
  }

  return NextResponse.json({ ok: true, sent: sentCounts });
}

async function alreadySent(attendeeId: string, templateId: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from("email_events")
    .select("id")
    .eq("attendee_id", attendeeId)
    .eq("template_id", templateId)
    .limit(1);
  if (error) {
    console.error("[cron] alreadySent check failed:", error);
    return false;
  }
  return (data ?? []).length > 0;
}

async function sendAndLog(
  att: { id: string; email: string; first_name: string },
  tmpl: { subject: string; html: string; text: string },
  templateId: string
) {
  const { error: sendError } = await resend.emails.send({
    from: FROM.workshop,
    to: att.email,
    subject: tmpl.subject,
    html: tmpl.html,
    text: tmpl.text,
  });
  if (sendError) {
    console.error(`[cron] send failed for ${att.email} (${templateId}):`, sendError);
    return;
  }
  await supabaseAdmin.from("email_events").insert({
    attendee_id: att.id,
    template_id: templateId,
    provider: "resend",
    event_type: "sent",
    recipient: att.email,
    subject: tmpl.subject,
    occurred_at: new Date().toISOString(),
  });
}
