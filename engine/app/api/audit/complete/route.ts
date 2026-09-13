/**
 * POST /api/audit/complete
 *
 * Marks an Energy Audit as completed (showed up + ran the call).
 * Called manually by Roel from the /admin page, OR triggered by
 * a Calendly "no-show" check at +10 min past the scheduled time.
 *
 * Body: { email, outcome, notes? }
 *   - outcome: 'converted' | 'lost' | 'followup'
 *   - converted_to: 'engine-pro' | 'studio-retainer' | 'workshop' | null
 *
 * On converted, fires the post-call email + starts the day-3 + day-7
 * follow-up sequence (which the cron picks up).
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM } from "@/lib/resend";
import { trackServer } from "@/lib/posthog";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { email, outcome, notes, convertedTo } = (await request.json()) as {
    email?: string;
    outcome?: "converted" | "lost" | "followup";
    notes?: string;
    convertedTo?: "engine-pro" | "studio-retainer" | "workshop" | null;
  };

  if (!email || !outcome) {
    return NextResponse.json(
      { error: "Missing required fields: email, outcome" },
      { status: 400 }
    );
  }

  const status =
    outcome === "converted"
      ? "converted"
      : outcome === "lost"
        ? "lost"
        : "showed";

  const { error: updateError } = await supabaseAdmin
    .from("audit_leads")
    .update({
      status,
      converted_to: convertedTo ?? null,
      notes: notes ?? null,
      showup_at: new Date().toISOString(),
    })
    .eq("email", email);

  if (updateError) {
    console.error("[audit-complete] supabase update failed:", updateError);
    return NextResponse.json(
      { error: "DB error" },
      { status: 500 }
    );
  }

  // Send the post-call email (different copy per outcome)
  const tmpl = postCallEmail({
    firstName: email.split("@")[0],
    outcome,
    convertedTo: convertedTo ?? null,
  });
  await resend.emails.send({
    from: FROM.audit,
    to: email,
    subject: tmpl.subject,
    html: tmpl.html,
    text: tmpl.text,
  });

  trackServer(email, "audit_completed", { outcome, convertedTo });
  console.log(`[audit-complete] ✓ ${email} marked ${outcome}`);

  return NextResponse.json({ ok: true });
}

function postCallEmail(data: {
  firstName: string;
  outcome: "converted" | "lost" | "followup";
  convertedTo: string | null;
}) {
  const subject =
    data.outcome === "converted"
      ? "Your custom protocol + the next step"
      : data.outcome === "lost"
        ? "Thanks for the call — keep the protocol"
        : "The protocol + when we should talk next";
  const text = `Hey ${data.firstName},

${
  data.outcome === "converted"
    ? "Thanks for the call. The custom protocol we put together is yours — start tomorrow morning. The next step is the Energy Reset Workshop where I'll refine it in real-time with you + 23 others. Workshop link: https://rulio.io/workshop\n\nCode WORKSHOP20 for 20% off. — Roel"
    : data.outcome === "lost"
      ? "Thanks for the call. The protocol is yours regardless. Run it for 7 days, then decide. Workshop link if you want the group version: https://rulio.io/workshop — Roel"
      : "Thanks for the call. The protocol is yours. Let's check back in 7 days — I'll send the follow-up. Workshop link: https://rulio.io/workshop — Roel"
}

— Roel`;
  const html = `<!doctype html><html><body style="font-family:Inter,system-ui,sans-serif;background:#0c0c0e;color:#f4f1ea;padding:32px;"><h1 style="font-family:Fraunces,serif;font-weight:400;">${
    data.outcome === "converted" ? "Your custom protocol" : "Thanks for the call"
  }</h1><p>Hey ${data.firstName},</p><p>${
    data.outcome === "converted"
      ? "Thanks for the call. The custom protocol we put together is yours — start tomorrow morning. The next step is the Energy Reset Workshop where I'll refine it in real-time with you + 23 others."
      : data.outcome === "lost"
        ? "Thanks for the call. The protocol is yours regardless. Run it for 7 days, then decide."
        : "Thanks for the call. The protocol is yours. Let's check back in 7 days — I'll send the follow-up."
  }</p><p><a href="https://rulio.io/workshop" style="background:#5BB8FF;color:#0c0c0e;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600;">Workshop link →</a></p><p>— Roel</p></body></html>`;
  return { subject, html, text };
}
