/**
 * POST /api/audit/checkout
 *
 * Creates a Stripe Checkout session for the free 30-min Energy Audit.
 * Uses Stripe's `mode: 'payment'` with a €0 line item so we still
 * get a session record (and the email capture) for free.
 *
 * Body: { firstName, email, worstHour, referrer? }
 * Returns: { url } — Stripe-hosted "session" page (basically a
 *              redirect to the booking calendar)
 */

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM } from "@/lib/resend";
import { auditConfirmation } from "@/lib/email-templates";
import { trackServer } from "@/lib/posthog";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: {
    firstName?: string;
    email?: string;
    worstHour?: string;
    referrer?: string;
    calendlyEvent?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { firstName, email, worstHour, referrer, calendlyEvent } = body;
  if (!email || !firstName) {
    return NextResponse.json(
      { error: "Missing required fields: firstName, email" },
      { status: 400 }
    );
  }

  // For the free audit, we just capture the lead and send a Calendly link
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "https://rulio.app";
  const calendlyUrl = process.env.CALENDLY_AUDIT_URL ?? "https://calendly.com/rulio/energy-audit";

  // Insert lead into Supabase (no Stripe session for free)
  const { error: insertError } = await supabaseAdmin
    .from("audit_leads")
    .insert({
      email,
      first_name: firstName,
      worst_hour: worstHour ?? null,
      referrer: referrer ?? null,
      calendly_event: calendlyEvent ?? null,
      status: "scheduled",
      created_at: new Date().toISOString(),
    });

  if (insertError) {
    console.error("[audit-checkout] supabase insert failed:", insertError);
    return NextResponse.json(
      { error: "Could not save lead. Please try again." },
      { status: 500 }
    );
  }

  // Send the audit confirmation email
  const tmpl = auditConfirmation({
    firstName,
    auditDate: "your booked slot",
    auditTime: "(see Calendly)",
    zoomLink: calendlyUrl,
  });
  await resend.emails.send({
    from: FROM.audit,
    to: email,
    subject: tmpl.subject,
    html: tmpl.html,
    text: tmpl.text,
  });

  // Track in PostHog
  trackServer(email, "audit_registered", {
    worst_hour: worstHour ?? null,
    referrer: referrer ?? null,
  });

  return NextResponse.json({
    url: `${calendlyUrl}?email=${encodeURIComponent(email)}&name=${encodeURIComponent(firstName)}`,
  });
}
