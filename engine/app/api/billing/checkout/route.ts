/**
 * POST /api/billing/checkout
 *
 * Creates a Stripe Checkout session for a subscription (Engine Pro monthly,
 * Engine Pro annual, or Studio monthly). For workshop tickets, see
 * /api/workshop/checkout — this route is for recurring subscriptions only.
 *
 * The Stripe Customer is created on first checkout and saved to
 * profiles.stripe_customer_id via the webhook.
 *
 * Body: { plan: 'engine_pro_monthly' | 'engine_pro_annual' | 'studio_monthly' }
 * Returns: { url } — Stripe-hosted checkout URL
 *
 * Auth: requires the user to be logged in (we use the auth cookie).
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { trackServer } from "@/lib/posthog";

export const runtime = "nodejs";

const PRICE_IDS = {
  engine_pro_monthly: process.env.STRIPE_PRICE_ENGINE_PRO_MONTHLY ?? "",
  engine_pro_annual: process.env.STRIPE_PRICE_ENGINE_PRO_ANNUAL ?? "",
  studio_monthly: process.env.STRIPE_PRICE_STUDIO_MONTHLY ?? "",
} as const;

type Plan = keyof typeof PRICE_IDS;

export async function POST(request: Request) {
  // 1. Authenticate
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

  // 2. Get the plan
  const { plan } = (await request.json()) as { plan?: Plan };
  if (!plan || !PRICE_IDS[plan]) {
    return NextResponse.json(
      {
        error: `Unknown plan: ${plan}. Available: ${Object.keys(PRICE_IDS).join(", ")}`,
      },
      { status: 400 }
    );
  }
  const priceId = PRICE_IDS[plan];
  if (!priceId) {
    return NextResponse.json(
      {
        error: `Stripe price for ${plan} is not configured. Add STRIPE_PRICE_${plan.toUpperCase()} to .env.local.`,
      },
      { status: 503 }
    );
  }

  // 3. Get or create the Stripe customer
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("stripe_customer_id, email, first_name")
    .eq("id", user.id)
    .single();

  let customerId = profile?.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: profile?.email ?? user.email,
      name: profile?.first_name,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
    await supabaseAdmin
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  // 4. Create the Checkout session
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:3000";
  const session = await stripe.checkout.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${baseUrl}/welcome?subscribed=1`,
    cancel_url: `${baseUrl}/pro`,
    metadata: {
      plan,
      supabase_user_id: user.id,
    },
    subscription_data: {
      metadata: {
        plan,
        supabase_user_id: user.id,
      },
      // No trial here — the 7-day trial is in profiles.trial_ends_at
      // (fired by the magic-link signup trigger). If a user is past
      // their trial, the charge happens immediately.
    },
    allow_promotion_codes: true,
  });

  trackServer(user.email!, "subscription_checkout_started", { plan });

  return NextResponse.json({ url: session.url });
}
