/**
 * POST /api/billing/portal
 *
 * Creates a Stripe Customer Portal session for the logged-in user.
 * The portal lets them update card, switch plan, cancel, view invoices.
 *
 * Body: none
 * Returns: { url } — Stripe-hosted portal URL
 *
 * Auth: requires login.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
  );
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();

  if (!profile?.stripe_customer_id) {
    return NextResponse.json(
      { error: "No Stripe customer yet. Subscribe first." },
      { status: 400 }
    );
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  const session = await stripe.billingPortal.create({
    customer: profile.stripe_customer_id,
    return_url: `${baseUrl}/account`,
  });

  return NextResponse.json({ url: session.url });
}
