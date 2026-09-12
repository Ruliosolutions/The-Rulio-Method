/**
 * GET /api/affiliate/click?ref=PARTNER_ID&dest=/pro
 *
 * Affiliate link click tracker. Sets a `rulio_ref` cookie (30 days),
 * tracks the click in PostHog, then redirects to the destination.
 *
 * The cookie is read by /api/billing/checkout and the magic-link handler
 * to attach the referral to the resulting subscription / signup.
 *
 * Usage:  https://rulio.app/api/affiliate/click?ref=PARTNER&dest=/pro
 * Marketing link:  https://rulio.app/?ref=PARTNER
 *   (handled by middleware that rewrites to /api/affiliate/click)
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { trackServer } from "@/lib/posthog";

export const runtime = "nodejs";

const VALID_PARTNERS = new Set([
  // Add partner IDs here as you onboard them
  // "indie-hackers",
  // "yc-batch-w26",
  // "antler-belgium",
  // "calm-business",
  // "headspace-for-work",
  // "acquired-academy",
  // "techstars-belgium",
  // "dynamite-circle",
  // "naval",
  // "wait-but-why",
]);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ref = url.searchParams.get("ref") ?? "";
  const dest = url.searchParams.get("dest") ?? "/pro";

  // Validate the partner ID
  if (!ref || !(VALID_PARTNERS as Set<string>).has(ref)) {
    // Unknown partner — just redirect, don't track
    return NextResponse.redirect(new URL(dest, url.origin));
  }

  // Set the referral cookie (30 days)
  const cookieStore = cookies();
  cookieStore.set("rulio_ref", ref, {
    httpOnly: false,  // accessible to client JS for analytics
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  // Track the click
  trackServer(`partner:${ref}`, "affiliate_click", {
    partner: ref,
    destination: dest,
    user_agent: request.headers.get("user-agent") ?? null,
    referer: request.headers.get("referer") ?? null,
  });

  return NextResponse.redirect(new URL(dest, url.origin));
}
