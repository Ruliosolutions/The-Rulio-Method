/**
 * POST /api/webhooks/stripe
 *
 * Handles Stripe webhook events for the Rulio Engine.
 *
 * Subscriptions:
 *   - customer.subscription.created   → insert subscriptions row
 *   - customer.subscription.updated   → update subscriptions row
 *   - customer.subscription.deleted   → mark canceled
 *   - invoice.payment_succeeded       → confirm active
 *   - invoice.payment_failed          → mark past_due
 *
 * Workshop funnel (legacy):
 *   - checkout.session.completed      → insert workshop_attendees + email
 *   - charge.refunded                 → mark refunded
 *
 * Configure in Stripe Dashboard:
 *   URL: https://rulio.app/api/webhooks/stripe
 *   Events: checkout.session.completed, charge.refunded,
 *           customer.subscription.created, customer.subscription.updated,
 *           customer.subscription.deleted, invoice.payment_succeeded,
 *           invoice.payment_failed
 *   Signing secret → STRIPE_WEBHOOK_SECRET in .env.local
 */

import { NextResponse } from "next/server";
import { verifyWebhookSignature, stripeRequest } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM } from "@/lib/resend";
import { workshopConfirmation, digitalDownloadConfirmation, DIGITAL_PRODUCTS } from "@/lib/email-templates";
import { trackServer, identifyServer } from "@/lib/posthog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PLAN_BY_PRICE: Record<string, string> = {
  [process.env.STRIPE_PRICE_ENGINE_PRO_MONTHLY ?? ""]: "engine_pro_monthly",
  [process.env.STRIPE_PRICE_ENGINE_PRO_ANNUAL ?? ""]: "engine_pro_annual",
  [process.env.STRIPE_PRICE_STUDIO_MONTHLY ?? ""]: "studio_monthly",
  [process.env.STRIPE_PRICE_WORKSHOP_STANDARD ?? ""]: "workshop_standard",
  [process.env.STRIPE_PRICE_WORKSHOP_BOOK ?? ""]: "workshop_book",
  [process.env.STRIPE_PRICE_WORKSHOP_BUNDLE ?? ""]: "workshop_bundle",
};

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) {
    return NextResponse.json(
      { error: "Missing stripe-signature or STRIPE_WEBHOOK_SECRET" },
      { status: 400 }
    );
  }

  const body = await request.text();
  let event: any;
  try {
    const verified = await verifyWebhookSignature(body, sig, secret);
    event = verified.event;
  } catch (err) {
    console.error("[stripe-webhook] signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      // ---- Subscriptions -------------------------------------------
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpsert(event.data.object as any);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object as any);
        break;
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object as any);
        break;
      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as any);
        break;

      // ---- Workshop (legacy) --------------------------------------
      case "checkout.session.completed": {
        const session = event.data.object as any;
        // Only handle if this is a one-time payment (workshop), not a subscription
        if (session.mode === "payment") {
          await handleCheckoutCompleted(session);
        }
        break;
      }
      case "charge.refunded":
        await handleRefund(event.data.object as any);
        break;

      default:
        console.log(`[stripe-webhook] unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error("[stripe-webhook] handler error:", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// =============================================================================
// Subscription handlers
// =============================================================================

async function handleSubscriptionUpsert(sub: any) {
  const userId = sub.metadata?.supabase_user_id;
  if (!userId) {
    console.warn("[stripe-webhook] subscription without supabase_user_id metadata");
    return;
  }

  const priceId = sub.items.data[0]?.price.id;
  const plan = priceId ? PLAN_BY_PRICE[priceId] : null;
  if (!plan) {
    console.warn(`[stripe-webhook] no plan mapped for price ${priceId}`);
    return;
  }

  // Mirror the Stripe customer ID on the profile
  if (typeof sub.customer === "string") {
    await supabaseAdmin
      .from("profiles")
      .update({ stripe_customer_id: sub.customer })
      .eq("id", userId);
  }

  // Upsert the subscription row
  const { error } = await supabaseAdmin.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_subscription_id: sub.id,
      stripe_price_id: priceId,
      plan,
      status: sub.status as any,
      current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
      current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
      cancel_at_period_end: sub.cancel_at_period_end,
      canceled_at: sub.canceled_at ? new Date(sub.canceled_at * 1000).toISOString() : null,
      amount_eur: sub.items.data[0]?.price.unit_amount
        ? Math.round(sub.items.data[0].price.unit_amount / 100)
        : null,
      currency: sub.currency,
    },
    { onConflict: "stripe_subscription_id" }
  );

  if (error) {
    throw new Error(`subscription upsert failed: ${error.message}`);
  }

  // If this is a paid conversion (not a trial), mark trial_converted
  if (sub.status === "active") {
    await supabaseAdmin
      .from("profiles")
      .update({ trial_converted: true })
      .eq("id", userId);
  }

  // PostHog
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("email, first_name")
    .eq("id", userId)
    .single();
  if (profile?.email) {
    identifyServer(profile.email, {
      email: profile.email,
      first_name: profile.first_name,
      current_plan: plan,
    });
    trackServer(profile.email, sub.status === "active" ? "subscription_started" : "subscription_updated", {
      plan,
      status: sub.status,
      amount_eur: sub.items.data[0]?.price.unit_amount
        ? sub.items.data[0].price.unit_amount / 100
        : 0,
    });
  }

  console.log(`[stripe-webhook] ✓ ${plan} → ${sub.status} for ${userId}`);
}

async function handleSubscriptionDeleted(sub: any) {
  await supabaseAdmin
    .from("subscriptions")
    .update({ status: "canceled", canceled_at: new Date().toISOString() })
    .eq("stripe_subscription_id", sub.id);
  console.log(`[stripe-webhook] ✓ subscription canceled: ${sub.id}`);
}

async function handleInvoicePaymentSucceeded(invoice: any) {
  if (!invoice.subscription) return;
  const subId = typeof invoice.subscription === "string"
    ? invoice.subscription
    : invoice.subscription.id;
  await supabaseAdmin
    .from("subscriptions")
    .update({ status: "active" })
    .eq("stripe_subscription_id", subId);
}

async function handleInvoicePaymentFailed(invoice: any) {
  if (!invoice.subscription) return;
  const subId = typeof invoice.subscription === "string"
    ? invoice.subscription
    : invoice.subscription.id;
  await supabaseAdmin
    .from("subscriptions")
    .update({ status: "past_due" })
    .eq("stripe_subscription_id", subId);
  console.warn(`[stripe-webhook] ⚠ payment failed for ${subId}`);
}

// =============================================================================
// Workshop (legacy) handlers
// =============================================================================

async function handleCheckoutCompleted(session: any) {
  const md = session.metadata ?? {};
  const sku = md.sku ?? "workshop-standard";
  const firstName = md.first_name ?? "there";
  const email = session.customer_email ?? session.customer_details?.email ?? "";
  const gumroadReceipt = md.gumroad_receipt ?? null;
  const worstState = md.worst_state ?? null;
  const workshopDate = md.workshop_date ?? null;
  const amountEur = (session.amount_total ?? 0) / 100;

  if (!email) {
    throw new Error("checkout.session.completed without customer_email");
  }

  // ---- Digital product branch --------------------------------------------
  if (DIGITAL_PRODUCTS[sku]) {
    await handleDigitalDownload({ sku, firstName, email, amountEur, sessionId: session.id });
    return;
  }

  const { error: insertError } = await supabaseAdmin
    .from("workshop_attendees")
    .upsert(
      {
        email,
        first_name: firstName,
        sku,
        amount_eur: amountEur,
        stripe_session_id: session.id,
        gumroad_receipt: gumroadReceipt,
        worst_state: worstState,
        workshop_date: workshopDate,
        status: "registered",
      },
      { onConflict: "stripe_session_id" }
    );

  if (insertError) {
    throw new Error(`workshop insert failed: ${insertError.message}`);
  }

  const tmpl = workshopConfirmation({
    firstName,
    workshopDate: formatWorkshopDate(workshopDate),
    workshopTime: "19:00 CET",
    zoomLink: process.env.WORKSHOP_ZOOM_LINK ?? "https://rulio.zoom.us/j/REPLACE_ME",
    ticketSku: sku,
    amountEur,
  });

  const { error: emailError } = await resend.emails.send({
    from: FROM.workshop,
    to: email,
    subject: tmpl.subject,
    html: tmpl.html,
    text: tmpl.text,
  });

  if (emailError) {
    console.error("[stripe-webhook] resend error:", emailError);
  }

  trackServer(email, "workshop_payment_succeeded", {
    sku, amount_eur: amountEur, workshop_date: workshopDate,
  });

  console.log(`[stripe-webhook] ✓ workshop ${sku} €${amountEur} for ${email}`);
}

async function handleRefund(charge: any) {
  const paymentIntentId = typeof charge.payment_intent === "string"
    ? charge.payment_intent
    : charge.payment_intent?.id;
  if (!paymentIntentId) return;

  const sessionsData = await stripeRequest("GET", `/checkout/sessions?payment_intent=${encodeURIComponent(paymentIntentId)}&limit=1`);
  const session = sessionsData?.data?.[0];
  if (!session) return;

  await supabaseAdmin
    .from("workshop_attendees")
    .update({ status: "refunded" })
    .eq("stripe_session_id", session.id);

  console.log(`[stripe-webhook] ✓ refunded workshop ${session.id}`);
}

async function handleDigitalDownload(params: {
  sku: string;
  firstName: string;
  email: string;
  amountEur: number;
  sessionId: string;
}) {
  const { sku, firstName, email, amountEur, sessionId } = params;

  // Log the sale in Supabase (so the user has a list of buyers)
  const { error: logError } = await supabaseAdmin.from("digital_orders").upsert(
    {
      email,
      first_name: firstName,
      sku,
      amount_eur: amountEur,
      stripe_session_id: sessionId,
      status: "paid",
    },
    { onConflict: "stripe_session_id" }
  );
  if (logError) {
    // Table may not exist yet — log and continue, don't block fulfillment
    console.warn("[stripe-webhook] digital_orders upsert failed (table may not exist):", logError.message);
  }

  // Send the download email
  const tmpl = digitalDownloadConfirmation({ firstName, productSku: sku });
  if (!tmpl) {
    console.error(`[stripe-webhook] no email template for sku ${sku}`);
    return;
  }

  const { error: emailError } = await resend.emails.send({
    from: FROM.workshop, // reuse same "Rulio" from address
    to: email,
    subject: tmpl.subject,
    html: tmpl.html,
    text: tmpl.text,
  });

  if (emailError) {
    console.error("[stripe-webhook] digital download email error:", emailError);
  } else {
    console.log(`[stripe-webhook] ✓ digital download sent: ${sku} → ${email}`);
  }

  trackServer(email, "digital_download_purchased", {
    sku, amount_eur: amountEur,
  });
}

function formatWorkshopDate(iso: string | null): string {
  if (!iso) return "the next cohort";
  return new Date(iso + "T19:00:00Z").toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}
