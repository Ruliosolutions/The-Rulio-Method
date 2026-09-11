/**
 * POST /api/webhooks/calendly
 *
 * Handles Calendly webhooks for the Energy Audit funnel.
 *
 * Calendly sends:
 *   - invitee.created       → user just booked
 *   - invitee.canceled      → user canceled
 *
 * Configure in Calendly:
 *   Webhook URL: https://rulio.app/api/webhooks/calendly
 *   Events: invitee.created, invitee.canceled
 *   Scope:   Rulio Energy Audit (or all events if you only have one)
 *
 * Security: Calendly signs webhooks with a shared secret. For MVP we
 * accept unsigned (the URL is non-guessable); tighten before going live.
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM } from "@/lib/resend";
import { trackServer } from "@/lib/posthog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CalendlyPayload = {
  event: "invitee.created" | "invitee.canceled";
  payload: {
    name?: string;
    email: string;
    scheduled_event?: {
      start_time: string;
      end_time: string;
      name?: string;
    };
    tracking?: {
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
    };
    questions_and_answers?: Array<{
      question: string;
      answer: string;
    }>;
    reschedule_url?: string;
  };
};

export async function POST(request: Request) {
  let body: CalendlyPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { event, payload } = body;
  const email = payload.email?.toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  if (event === "invitee.created") {
    await handleCreated(email, payload);
  } else if (event === "invitee.canceled") {
    await handleCanceled(email);
  } else {
    console.log(`[calendly] unhandled event: ${event}`);
  }

  return NextResponse.json({ received: true });
}

async function handleCreated(email: string, payload: CalendlyPayload["payload"]) {
  const startTime = payload.scheduled_event?.start_time;
  const firstName = payload.name?.split(" ")[0] ?? "there";

  // Upsert the audit_leads row
  const { error } = await supabaseAdmin.from("audit_leads").upsert(
    {
      email,
      first_name: firstName,
      calendly_event: startTime,
      utm_source: payload.tracking?.utm_source ?? null,
      utm_medium: payload.tracking?.utm_medium ?? null,
      utm_campaign: payload.tracking?.utm_campaign ?? null,
      status: "scheduled",
      // Capture the worst hour if Calendly collected it
      worst_hour:
        payload.questions_and_answers?.find((q) =>
          /worst|hardest|tough/i.test(q.question)
        )?.answer ?? null,
    },
    { onConflict: "email" }
  );

  if (error) {
    console.error("[calendly] supabase upsert failed:", error);
    return;
  }

  // Send the audit prep email (resend, in case Calendly is the first signal)
  const tmpl = auditPrepEmail({
    firstName,
    auditDate: formatDate(startTime),
    auditTime: formatTime(startTime),
    rescheduleUrl: payload.reschedule_url ?? "https://calendly.com/rulio/energy-audit",
  });
  const { error: sendError } = await resend.emails.send({
    from: FROM.audit,
    to: email,
    subject: tmpl.subject,
    html: tmpl.html,
    text: tmpl.text,
  });
  if (sendError) {
    console.error("[calendly] resend error:", sendError);
  }

  // Track in PostHog
  trackServer(email, "audit_booked", {
    calendly_event: startTime,
    utm_source: payload.tracking?.utm_source,
    utm_medium: payload.tracking?.utm_medium,
    utm_campaign: payload.tracking?.utm_campaign,
  });

  console.log(`[calendly] ✓ audit booked for ${email} at ${startTime}`);
}

async function handleCanceled(email: string) {
  const { error } = await supabaseAdmin
    .from("audit_leads")
    .update({ status: "lost" })
    .eq("email", email);

  if (error) {
    console.error("[calendly] supabase update failed:", error);
    return;
  }

  // Send a soft rebook nudge (only if they canceled the most recent)
  const tmpl = {
    subject: "Sorry to miss you — want to rebook?",
    html: `<p>Hey,</p><p>You just canceled the Energy Audit. If now isn't a good time, no worries — the link is here when you're ready: <a href="https://calendly.com/rulio/energy-audit">calendly.com/rulio/energy-audit</a>.</p><p>— Roel</p>`,
    text: `Hey,\n\nYou just canceled the Energy Audit. If now isn't a good time, no worries — the link is here when you're ready: https://calendly.com/rulio/energy-audit\n\n— Roel`,
  };
  await resend.emails.send({
    from: FROM.audit,
    to: email,
    subject: tmpl.subject,
    html: tmpl.html,
    text: tmpl.text,
  });

  trackServer(email, "audit_canceled");
  console.log(`[calendly] ✓ audit canceled for ${email}`);
}

function formatDate(iso?: string): string {
  if (!iso) return "your booked slot";
  return new Date(iso).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

function formatTime(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit", minute: "2-digit", timeZoneName: "short",
  });
}

// Local template (the audit confirmation template is in lib/email-templates.ts;
// this is the prep doc, sent by Calendly as a "you booked" reminder)
function auditPrepEmail(data: {
  firstName: string;
  auditDate: string;
  auditTime: string;
  rescheduleUrl: string;
}) {
  const subject = `Energy Audit booked — ${data.auditDate}`;
  const text = `Hey ${data.firstName},

Your 30-min Energy Audit is booked for ${data.auditDate} at ${data.auditTime}.

Before the call, please read the 2-page prep doc: https://rulio.io/audit-prep

It covers the 4 questions we'll work through and the format. Takes 4 minutes to read, saves 10 minutes of fumbling on the call.

If you need to reschedule: ${data.rescheduleUrl}

— Roel`;
  const html = `<!doctype html><html><body style="font-family:Inter,system-ui,sans-serif;background:#0c0c0e;color:#f4f1ea;padding:32px;"><h1 style="font-family:Fraunces,serif;font-weight:400;">Audit booked.</h1><p>Hey ${data.firstName},</p><p>Your 30-min Energy Audit is booked for <strong>${data.auditDate} at ${data.auditTime}</strong>.</p><p>Before the call, please read the 2-page prep doc: <a href="https://rulio.io/audit-prep" style="color:#5BB8FF;">rulio.io/audit-prep</a></p><p>It covers the 4 questions we'll work through and the format. Takes 4 minutes to read, saves 10 minutes of fumbling on the call.</p><p>If you need to reschedule: <a href="${data.rescheduleUrl}" style="color:#5BB8FF;">${data.rescheduleUrl}</a></p><p>— Roel</p></body></html>`;
  return { subject, html, text };
}
