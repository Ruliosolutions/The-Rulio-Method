/**
 * POST /api/cron/trial-reminders
 *
 * Fires the day-6 "trial ends tomorrow" email and the day-7 "trial ended"
 * email. Reads the `trial_expiring_soon` view from Supabase for the
 * day-6 candidates, and queries `profiles` for users whose trial ended
 * in the last 24 hours.
 *
 * Schedule: daily at 09:00 UTC (Vercel Cron: 0 9 * * *)
 *
 * Vercel Cron in vercel.json:
 *   { "path": "/api/cron/trial-reminders", "schedule": "0 9 * * *" }
 *
 * Auth: Bearer CRON_SECRET (env)
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM } from "@/lib/resend";
import { trackServer } from "@/lib/posthog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CRON_SECRET = process.env.CRON_SECRET;

export async function POST(request: Request) {
  if (CRON_SECRET) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const now = new Date();
  const sentCounts = { day6_reminder: 0, day7_expired: 0, error: 0 };

  // ---- Day 6: trial ends in < 24h -----------------------------------------
  const { data: day6 } = await supabaseAdmin
    .from("trial_expiring_soon")
    .select("*")
    .lt("time_remaining", "24:00:00")
    .gt("time_remaining", "0:00:00");

  for (const user of day6 ?? []) {
    try {
      const tmpl = {
        subject: "Your free trial ends tomorrow",
        html: trialEndingEmail(user.first_name ?? "there"),
        text: trialEndingText(user.first_name ?? "there"),
      };
      await resend.emails.send({
        from: FROM.engine,
        to: user.email,
        subject: tmpl.subject,
        html: tmpl.html,
        text: tmpl.text,
      });
      // Log to email_events so we don't re-send
      await supabaseAdmin.from("email_events").insert({
        attendee_id: user.user_id,
        template_id: "trial_day6",
        provider: "resend",
        event_type: "sent",
        recipient: user.email,
        subject: tmpl.subject,
        occurred_at: new Date().toISOString(),
      });
      trackServer(user.email, "trial_reminder_sent", { days_remaining: 1 });
      sentCounts.day6_reminder++;
    } catch (err) {
      console.error(`[trial-reminders] day-6 send failed for ${user.email}:`, err);
      sentCounts.error++;
    }
  }

  // ---- Day 7: trial ended in the last 24h ---------------------------------
  const { data: day7 } = await supabaseAdmin
    .from("profiles")
    .select("id, email, first_name, trial_ends_at, trial_converted")
    .lt("trial_ends_at", now.toISOString())
    .gt("trial_ends_at", new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString())
    .eq("trial_converted", false);

  for (const user of day7 ?? []) {
    try {
      const tmpl = {
        subject: "Your trial ended — here's what you missed",
        html: trialEndedEmail(user.first_name ?? "there"),
        text: trialEndedText(user.first_name ?? "there"),
      };
      await resend.emails.send({
        from: FROM.engine,
        to: user.email,
        subject: tmpl.subject,
        html: tmpl.html,
        text: tmpl.text,
      });
      await supabaseAdmin.from("email_events").insert({
        attendee_id: user.id,
        template_id: "trial_day7",
        provider: "resend",
        event_type: "sent",
        recipient: user.email,
        subject: tmpl.subject,
        occurred_at: new Date().toISOString(),
      });
      trackServer(user.email, "trial_ended_email_sent");
      sentCounts.day7_expired++;
    } catch (err) {
      console.error(`[trial-reminders] day-7 send failed for ${user.email}:`, err);
      sentCounts.error++;
    }
  }

  return NextResponse.json({ ok: true, sent: sentCounts });
}

function trialEndingEmail(firstName: string): string {
  return `<!DOCTYPE html><html><body style="font-family:Inter,system-ui,sans-serif;background:#0c0c0e;color:#f4f1ea;padding:32px;">
<h1 style="font-family:Fraunces,serif;font-weight:400;">Hey ${firstName},</h1>
<p>Your free trial ends in <strong>24 hours</strong>. After that, Pro features lock.</p>
<p>To keep them — adaptive AI coach, custom session generator, 25-min extended — pick a plan:</p>
<p><a href="https://rulio.app/pro" style="background:#5BB8FF;color:#0c0c0e;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600;display:inline-block;">Pick a plan →</a></p>
<p style="color:#a1a1aa;font-size:14px;">€19/mo · €180/yr (save €48) · cancel anytime.</p>
<p style="color:#a1a1aa;font-size:13px;margin-top:32px;">— Roel @ Rulio</p>
</body></html>`;
}

function trialEndingText(firstName: string): string {
  return `Hey ${firstName},

Your free trial ends in 24 hours. After that, Pro features lock.

To keep them — adaptive AI coach, custom session generator, 25-min extended — pick a plan:

  https://rulio.app/pro

€19/mo · €180/yr (save €48) · cancel anytime.

— Roel @ Rulio`;
}

function trialEndedEmail(firstName: string): string {
  return `<!DOCTYPE html><html><body style="font-family:Inter,system-ui,sans-serif;background:#0c0c0e;color:#f4f1ea;padding:32px;">
<h1 style="font-family:Fraunces,serif;font-weight:400;">Your trial ended.</h1>
<p>Hey ${firstName},</p>
<p>Your 7-day free trial ended. The 14 free Qi sessions still work, but the AI coach, custom session generator, and 25-min extended are now Pro-only.</p>
<p>Pick a plan to unlock them again:</p>
<p><a href="https://rulio.app/pro" style="background:#5BB8FF;color:#0c0c0e;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600;display:inline-block;">Resume Pro →</a></p>
<p style="color:#a1a1aa;font-size:14px;">€19/mo or €180/yr · cancel anytime · magic-link login, no new account needed.</p>
<p style="color:#a1a1aa;font-size:13px;margin-top:32px;">— Roel @ Rulio</p>
</body></html>`;
}

function trialEndedText(firstName: string): string {
  return `Your trial ended.

Hey ${firstName},

Your 7-day free trial ended. The 14 free Qi sessions still work, but the AI coach, custom session generator, and 25-min extended are now Pro-only.

Pick a plan to unlock them again:

  https://rulio.app/pro

€19/mo or €180/yr · cancel anytime · magic-link login, no new account needed.

— Roel @ Rulio`;
}
