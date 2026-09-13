/**
 * POST /api/webhooks/resend
 *
 * Resend sends delivery events here so we can track opens, clicks,
 * and bounces. We log to Supabase for later analysis.
 *
 * Configure in Resend Dashboard:
 *   Webhook URL: https://rulio.app/api/webhooks/resend
 *   Events: email.sent, email.delivered, email.opened, email.clicked, email.bounced
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ResendEvent = {
  type: string;
  created_at: string;
  data: {
    email_id: string;
    to: string | string[];
    from: string;
    subject: string;
    click?: { link: string };
  };
};

export async function POST(request: Request) {
  const payload = (await request.json()) as ResendEvent;
  const { type, data } = payload;

  // Best-effort log. Don't throw — Resend expects 2xx or it retries.
  const to = Array.isArray(data.to) ? data.to[0] : data.to;
  try {
    await supabaseAdmin.from("email_events").insert({
      provider: "resend",
      event_type: type,
      email_id: data.email_id,
      recipient: to,
      subject: data.subject,
      link_clicked: data.click?.link ?? null,
      occurred_at: payload.created_at,
    });
  } catch (err) {
    console.error("[resend-webhook] log failed:", err);
  }

  return NextResponse.json({ received: true });
}
