/**
 * Stripe client for the Rulio Engine.
 *
 * The 3 workshop SKUs are referenced by their Stripe Price IDs.
 * Run `npm run setup:stripe` once to create the products in your
 * Stripe account and write the IDs back to .env.local.
 */

import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY;
if (!apiKey) {
  // Don't throw at import time — the import succeeds even if the key
  // is missing, so the engine still boots in dev. Throwing happens
  // when a route actually tries to use the client.
  console.warn(
    "[stripe] STRIPE_SECRET_KEY is not set. Workshop checkout will fail until you add it to .env.local."
  );
}

export const stripe = new Stripe(apiKey ?? "sk_test_placeholder", {
  apiVersion: "2024-06-20",
  appInfo: { name: "Rulio Engine", version: "0.1.0" },
});

/**
 * Map of SKU → Stripe Price ID. Set these in .env.local after running
 * `npm run setup:stripe`. The workshop form posts `sku` directly.
 */
export const PRICE_IDS = {
  "workshop-standard": process.env.STRIPE_PRICE_WORKSHOP_STANDARD ?? "",
  "workshop-book": process.env.STRIPE_PRICE_WORKSHOP_BOOK ?? "",
  "workshop-bundle": process.env.STRIPE_PRICE_WORKSHOP_BUNDLE ?? "",
} as const;

export type WorkshopSku = keyof typeof PRICE_IDS;
