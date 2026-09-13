/**
 * Resend client for transactional email.
 *
 * The Rulio Engine sends:
 * - Workshop confirmation (T+0)
 * - Workshop reminder (T-24h, via cron)
 * - Workshop replay + assets (T+0 post-workshop)
 * - 7-day check-in (T+3, via cron)
 * - Day-7 offer (T+7, via cron)
 *
 * Templates live in `lib/email-templates.ts`.
 */

import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.warn(
    "[resend] RESEND_API_KEY is not set. Confirmation emails will fail silently until you add it to .env.local."
  );
}

export const resend = new Resend(apiKey ?? "re_placeholder");

export const FROM = {
  workshop: "Roel @ Rulio <workshop@rulio.io>",
  audit: "Roel @ Rulio <audit@rulio.io>",
  engine: "Rulio Engine <engine@rulio.io>",
} as const;
