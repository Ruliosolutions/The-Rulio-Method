/**
 * GET /api/health
 *
 * Returns the engine status. Used by the static workshop form
 * (and external monitoring) to check if the API is reachable.
 *
 * Returns the integration status — actually verifies each
 * service responds, not just whether the key is set.
 */

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const checks: Record<string, "ok" | "fail" | "missing"> = {
    stripe: "missing",
    supabase: "missing",
    resend: "missing",
  };
  const errors: Record<string, string> = {};

  // Stripe
  if (process.env.STRIPE_SECRET_KEY) {
    try {
      await stripe.balance_retrieve();
      checks.stripe = "ok";
    } catch (e: any) {
      checks.stripe = "fail";
      errors.stripe = e?.message ?? String(e);
    }
  }

  // Supabase
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    try {
      const { error } = await supabaseAdmin.from("profiles").select("id", { count: "exact", head: true });
      if (error) {
        checks.supabase = "fail";
        errors.supabase = error.message;
      } else {
        checks.supabase = "ok";
      }
    } catch (e: any) {
      checks.supabase = "fail";
      errors.supabase = e?.message ?? String(e);
      if (e?.cause) errors.supabase_cause = String(e.cause?.message ?? e.cause);
      if (e?.cause?.code) errors.supabase_code = e.cause.code;
      if (e?.cause?.errno) errors.supabase_errno = e.cause.errno;
    }
  }

  // Resend
  if (process.env.RESEND_API_KEY) {
    try {
      await resend.apiKeys.list();
      checks.resend = "ok";
    } catch (e: any) {
      checks.resend = "fail";
      errors.resend = e?.message ?? String(e);
    }
  }

  const allOk = Object.values(checks).every((c) => c === "ok");

  return NextResponse.json(
    {
      ok: allOk,
      service: "rulio-engine",
      version: "0.2.0",
      env: process.env.NODE_ENV ?? "development",
      integrations: checks,
      errors: Object.keys(errors).length > 0 ? errors : undefined,
      timestamp: new Date().toISOString(),
    },
    { status: allOk ? 200 : 503 }
  );
}
