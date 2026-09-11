/**
 * GET /api/affiliate/dashboard?ref=PARTNER_ID&key=PARTNER_API_KEY
 *
 * Affiliate dashboard API. Returns the partner's stats:
 *   - clicks (last 30 days, from PostHog)
 *   - signups (last 30 days, from profiles)
 *   - paid conversions (last 30 days, from subscriptions)
 *   - MRR generated
 *   - commission owed (30% of paid subscriptions)
 *
 * Auth: simple API key in query string (for the MVP dashboard).
 * Production: switch to JWT or signed cookie.
 */

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

// Partner API keys — set in .env.local as PARTNER_KEY_<ID>=secret
function getPartnerKey(partnerId: string): string | null {
  const envKey = `PARTNER_KEY_${partnerId.toUpperCase().replace(/-/g, "_")}`;
  return process.env[envKey] ?? null;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const ref = url.searchParams.get("ref") ?? "";
  const key = url.searchParams.get("key") ?? "";

  if (!ref || !key) {
    return NextResponse.json(
      { error: "Missing ?ref=PARTNER_ID&key=API_KEY" },
      { status: 400 }
    );
  }

  const expectedKey = getPartnerKey(ref);
  if (!expectedKey || expectedKey !== key) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Get signups referred by this partner (last 30 days)
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data: signups } = await supabaseAdmin
    .from("profiles")
    .select("id, email, first_name, created_at, trial_converted")
    .eq("utm_source", ref)
    .gte("created_at", since);

  const { data: subs } = await supabaseAdmin
    .from("subscriptions")
    .select("user_id, plan, status, amount_eur, current_period_start, current_period_end")
    .in("user_id", (signups ?? []).map((s) => s.id))
    .eq("status", "active");

  // Compute metrics
  const totalSignups = signups?.length ?? 0;
  const trialConversions = signups?.filter((s) => s.trial_converted).length ?? 0;
  const activeSubs = subs?.length ?? 0;

  // 30% commission on monthly plans, 30% × first month of annual
  // (industry standard for affiliate programs)
  const monthlyMRR = subs
    ?.filter((s) => s.plan === "engine_pro_monthly")
    .reduce((a, s) => a + (s.amount_eur ?? 0), 0) ?? 0;
  const annualFirstMonth = subs
    ?.filter((s) => s.plan === "engine_pro_annual")
    .reduce((a, s) => a + Math.round((s.amount_eur ?? 0) / 12), 0) ?? 0;
  const studioMRR = subs
    ?.filter((s) => s.plan === "studio_monthly")
    .reduce((a, s) => a + (s.amount_eur ?? 0), 0) ?? 0;

  const grossMRR = monthlyMRR + annualFirstMonth + studioMRR;
  const commission = Math.round(grossMRR * 0.3);

  return NextResponse.json({
    partner: ref,
    period: { from: since, to: new Date().toISOString() },
    clicks: "see_posthog",  // PostHog tracks the raw click events
    signups: totalSignups,
    trial_conversions: trialConversions,
    trial_conversion_rate: totalSignups > 0 ? trialConversions / totalSignups : 0,
    active_subscriptions: activeSubs,
    gross_mrr_eur: grossMRR,
    commission_eur: commission,
    breakdown: {
      monthly: { count: subs?.filter((s) => s.plan === "engine_pro_monthly").length ?? 0, mrr: monthlyMRR },
      annual: { count: subs?.filter((s) => s.plan === "engine_pro_annual").length ?? 0, first_month_revenue: annualFirstMonth },
      studio: { count: subs?.filter((s) => s.plan === "studio_monthly").length ?? 0, mrr: studioMRR },
    },
  });
}
