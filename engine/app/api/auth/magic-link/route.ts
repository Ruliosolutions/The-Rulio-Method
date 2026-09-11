/**
 * POST /api/auth/magic-link
 *
 * Sends a magic link to the user's email. The link authenticates them
 * without a password. On first send, a profile is auto-created with
 * a 7-day trial.
 *
 * Implementation: uses Supabase Admin's `generateLink` (which doesn't
 * send the email itself) and then sends the link via Resend. This
 * sidesteps Supabase's built-in email provider config requirement.
 *
 * Body: { email, firstName?, referrer? }
 * Returns: { ok: true } (we don't reveal whether the email was sent
 *                       for security, to prevent email enumeration)
 *
 * No auth required — this is the signup entry point.
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM } from "@/lib/resend";
import { trackServer } from "@/lib/posthog";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: { email?: string; firstName?: string; referrer?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, firstName, referrer } = body;
  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { error: "Valid email required" },
      { status: 400 }
    );
  }

  const normalizedEmail = email.toLowerCase().trim();
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  const redirectTo = `${baseUrl}/auth/callback`;

  // Step 1: generate the magic link via Supabase (no email sent)
  const { data: linkData, error: genError } = await supabaseAdmin.auth.admin.generateLink({
    type: "magiclink",
    email: normalizedEmail,
    options: {
      redirectTo,
      data: {
        first_name: firstName,
        referrer: referrer ?? "direct",
      },
    },
  });

  if (genError) {
    console.error("[magic-link] generateLink error:", genError);
    return NextResponse.json({ ok: true });
  }

  const actionLink = linkData?.properties?.action_link;
  if (!actionLink) {
    console.error("[magic-link] no action_link in response");
    return NextResponse.json({ ok: true });
  }

  // Step 2: send the link via Resend
  const firstNameForEmail = firstName || "there";
  const html = magicLinkEmail(firstNameForEmail, actionLink);
  const text = magicLinkText(firstNameForEmail, actionLink);

  try {
    await resend.emails.send({
      from: FROM.engine,
      to: normalizedEmail,
      subject: "Your Rulio sign-in link",
      html,
      text,
    });
  } catch (sendErr: any) {
    console.error("[magic-link] resend send error:", sendErr);
    return NextResponse.json({ ok: true });  // don't reveal to user
  }

  // Step 3: log + track
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const userAgent = request.headers.get("user-agent") ?? null;

  try {
    await supabaseAdmin.rpc("log_magic_link_event", {
      p_email: normalizedEmail,
      p_event: "sent",
      p_ip: ip,
      p_user_agent: userAgent,
    });
  } catch (logErr) {
    // RPC might not exist — that's ok
  }

  // Upsert the profile row with first_name if provided
  if (firstName) {
    try {
      const userId = linkData?.user?.id;
      if (userId) {
        await supabaseAdmin.from("profiles").upsert({
          id: userId,
          email: normalizedEmail,
          first_name: firstName,
          referrer: referrer ?? "direct",
        }, { onConflict: "id" });
      }
    } catch (profileErr) {
      // Non-fatal
    }
  }

  trackServer(normalizedEmail, "magic_link_sent", {
    first_name: firstName ?? null,
    referrer: referrer ?? "direct",
  });

  return NextResponse.json({ ok: true });
}

function magicLinkEmail(firstName: string, link: string): string {
  return `<!DOCTYPE html>
<html><body style="font-family:Inter,system-ui,sans-serif;background:#0c0c0e;color:#f4f1ea;padding:32px;margin:0;">
<div style="max-width:520px;margin:0 auto;">
<p style="font-family:JetBrains Mono,monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#a1a1aa;margin:0 0 24px;">Rulio</p>
<h1 style="font-family:Fraunces,Georgia,serif;font-weight:400;font-size:28px;line-height:1.2;margin:0 0 16px;">Hey ${escapeHtml(firstName)}.</h1>
<p style="font-size:15px;line-height:1.6;color:#f4f1ea;margin:0 0 24px;">Click below to sign in to Rulio. The link expires in 1 hour.</p>
<p style="margin:0 0 32px;">
  <a href="${link}" style="background:#5BB8FF;color:#0c0c0e;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:600;display:inline-block;font-size:15px;">Sign in to Rulio →</a>
</p>
<p style="font-size:13px;color:#a1a1aa;margin:0 0 8px;">Or copy this link into your browser:</p>
<p style="font-size:12px;color:#8FD1FF;word-break:break-all;background:rgba(91,184,255,0.05);padding:12px;border-radius:6px;margin:0 0 32px;">${link}</p>
<p style="font-size:13px;color:#a1a1aa;margin:0 0 4px;">If you didn't request this, you can safely ignore the email.</p>
<p style="font-size:13px;color:#666;margin:32px 0 0;">— Roel @ Rulio</p>
</div>
</body></html>`;
}

function magicLinkText(firstName: string, link: string): string {
  return `Hey ${firstName}.

Click below to sign in to Rulio. The link expires in 1 hour.

  ${link}

If you didn't request this, you can safely ignore the email.

— Roel @ Rulio`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
