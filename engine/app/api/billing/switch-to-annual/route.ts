/**
 * POST /api/billing/switch-to-annual
 *
 * Quick path: switch the user's subscription from engine_pro_monthly
 * to engine_pro_annual. Uses the Stripe subscription's
 * subscription_items.update API to swap the price in place.
 *
 * Returns: { url } — redirect back to the customer portal
 *          (Stripe handles the schedule of the switch — prorated)
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
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Get the user's current monthly subscription
  const { data: sub } = await supabaseAdmin
    .from("subscriptions")
    .select("stripe_subscription_id, stripe_price_id")
    .eq("user_id", user.id)
    .eq("status", "active")
    .eq("plan", "engine_pro_monthly")
    .single();

  if (!sub?.stripe_subscription_id) {
    return NextResponse.json(
      { error: "No active monthly subscription to switch." },
      { status: 400 }
    );
  }

  const annualPriceId = process.env.STRIPE_PRICE_ENGINE_PRO_ANNUAL;
  if (!annualPriceId) {
    return NextResponse.json(
      { error: "Annual price not configured." },
      { status: 503 }
    );
  }

  // Get the subscription items, swap the price
  const subscription = await stripe.subscriptions.retrieve(sub.stripe_subscription_id);
  const item = subscription.items.data[0];
  if (!item) {
    return NextResponse.json({ error: "Subscription has no items." }, { status: 500 });
  }

  // Update the subscription with proration (user gets credit for unused time)
  await stripe.subscriptions.update(sub.stripe_subscription_id, {
    items: [{ id: item.id, price: annualPriceId }],
    proration_behavior: "create_prorations",
  });

  // Redirect to the customer portal so the user sees the updated invoice
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "https://rulio.app";
  const portal = await stripe.billingPortal.sessions.create({
    customer: subscription.customer as string,
    return_url: `${baseUrl}/account`,
  });

  return NextResponse.redirect(portal.url);
}
