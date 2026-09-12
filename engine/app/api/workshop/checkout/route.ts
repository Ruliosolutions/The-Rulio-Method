/**
 * POST /api/workshop/checkout
 *
 * Creates a Stripe Checkout session for a workshop ticket.
 *
 * Body: { sku, email, firstName, gumroadReceipt?, worstState? }
 * Returns: { url } — Stripe-hosted checkout URL
 *
 * Capacity is checked first (24 seats per cohort). If sold out,
 * returns 410 Gone with a waitlist link.
 */

import { NextResponse } from "next/server";
import { stripe, PRICE_IDS, type WorkshopSku } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { trackServer } from "@/lib/posthog";

export const runtime = "nodejs";

const CAPACITY = 24;

export async function POST(request: Request) {
  let body: {
    sku?: WorkshopSku;
    email?: string;
    firstName?: string;
    gumroadReceipt?: string;
    worstState?: string;
    workshopDate?: string; // ISO date, defaults to "next Tuesday 19:00 CET"
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { sku, email, firstName, gumroadReceipt, worstState } = body;
  if (!sku || !email || !firstName) {
    return NextResponse.json(
      { error: "Missing required fields: sku, email, firstName" },
      { status: 400 }
    );
  }

  const priceId = PRICE_IDS[sku];
  if (!priceId) {
    return NextResponse.json(
      {
        error: `Stripe price not configured for SKU ${sku}. Run \`npm run setup:stripe\` first.`,
      },
      { status: 503 }
    );
  }

  // Capacity check — count non-refunded attendees for the next cohort
  const nextCohort = nextWorkshopDate();
  const { count, error: capError } = await supabaseAdmin
    .from("workshop_attendees")
    .select("*", { count: "exact", head: true })
    .eq("workshop_date", nextCohort)
    .neq("status", "refunded");

  if (capError) {
    console.error("[checkout] capacity check failed:", capError);
    return NextResponse.json(
      { error: "Could not check capacity. Please try again." },
      { status: 500 }
    );
  }

  if ((count ?? 0) >= CAPACITY) {
    return NextResponse.json(
      {
        error: "Sold out",
        waitlistUrl: "https://rulio.io/workshop/waitlist",
      },
      { status: 410 }
    );
  }

  // Create the Stripe Checkout session
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "https://rulio.app";
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "sepa_debit", "bancontact"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email,
      success_url: `${baseUrl}/workshop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/workshop`,
      metadata: {
        sku,
        first_name: firstName,
        gumroad_receipt: gumroadReceipt ?? "",
        worst_state: worstState ?? "",
        workshop_date: nextCohort,
      },
      allow_promotion_codes: true,
    });
  } catch (err) {
    console.error("[checkout] stripe error:", err);
    return NextResponse.json(
      { error: "Stripe error. Please try again." },
      { status: 500 }
    );
  }

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe did not return a URL" },
      { status: 500 }
    );
  }

  // Track in PostHog
  trackServer(email, "workshop_checkout_started", {
    sku,
    amount_eur: PRICE_IDS[sku] ? "configured" : "missing", // avoid leaking price IDs
    first_name: firstName,
    gumroad_receipt_provided: !!gumroadReceipt,
  });

  return NextResponse.json({ url: session.url, sessionId: session.id });
}

/**
 * Returns the next workshop date as an ISO date string.
 * Workshop is the first Tuesday of the month at 19:00 CET.
 * If today's first Tuesday has passed, returns next month's first Tuesday.
 */
function nextWorkshopDate(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const firstOfMonth = new Date(Date.UTC(year, month, 1));
  // Day of week: 0 = Sun, 1 = Mon, 2 = Tue
  const offset = (2 - firstOfMonth.getUTCDay() + 7) % 7;
  const firstTuesday = new Date(Date.UTC(year, month, 1 + offset));
  let target = firstTuesday;
  if (firstTuesday <= now) {
    // Roll to next month
    const next = new Date(Date.UTC(year, month + 1, 1));
    const nextOffset = (2 - next.getUTCDay() + 7) % 7;
    target = new Date(Date.UTC(year, month + 1, 1 + nextOffset));
  }
  return target.toISOString().slice(0, 10);
}
