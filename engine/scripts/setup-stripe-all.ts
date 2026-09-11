/**
 * setup-stripe-all.ts
 *
 * Creates ALL 6 Rulio products in Stripe (workshop tickets + subscriptions)
 * and writes the price IDs back to .env.local. One command does it all.
 *
 * Run with: npx tsx scripts/setup-stripe-all.ts
 *   (or)  npm run setup:stripe:all
 *
 * Requires STRIPE_SECRET_KEY in .env.local.
 */

import { config } from "dotenv";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";
import Stripe from "stripe";

config({ path: resolve(process.cwd(), ".env.local") });

const apiKey = process.env.STRIPE_SECRET_KEY;
if (!apiKey) {
  console.error("✗ STRIPE_SECRET_KEY is not set. Add it to .env.local and try again.");
  process.exit(1);
}

const stripe = new Stripe(apiKey, { apiVersion: "2024-06-20" });

const PRODUCTS = [
  // Workshop (one-time)
  {
    name: "Energy Reset Workshop — Standard",
    sku: "workshop-standard",
    envKey: "STRIPE_PRICE_WORKSHOP_STANDARD",
    description: "90-min live workshop + 9 frequency cards + 7-day practice log",
    amount: 4700,
  },
  {
    name: "Energy Reset Workshop — Book Reader",
    sku: "workshop-book",
    envKey: "STRIPE_PRICE_WORKSHOP_BOOK",
    description: "Same as Standard, requires proof of book purchase (€29)",
    amount: 2900,
  },
  {
    name: "Energy Reset Bundle",
    sku: "workshop-bundle",
    envKey: "STRIPE_PRICE_WORKSHOP_BUNDLE",
    description: "Workshop + 6-month Engine Pro + 2 × 30-min private sessions",
    amount: 50000,
  },
  // Engine Pro (recurring)
  {
    name: "Rulio Engine Pro — Monthly",
    sku: "engine-pro-monthly",
    envKey: "STRIPE_PRICE_ENGINE_PRO_MONTHLY",
    description: "Engine Pro subscription, billed monthly",
    amount: 1900,
    recurring: { interval: "month" as const },
  },
  {
    name: "Rulio Engine Pro — Annual",
    sku: "engine-pro-annual",
    envKey: "STRIPE_PRICE_ENGINE_PRO_ANNUAL",
    description: "Engine Pro subscription, billed annually (save €48)",
    amount: 18000,
    recurring: { interval: "year" as const },
  },
  // Studio (recurring)
  {
    name: "Rulio Studio — Monthly",
    sku: "studio-monthly",
    envKey: "STRIPE_PRICE_STUDIO_MONTHLY",
    description: "Studio retainer, billed monthly, application only",
    amount: 200000,
    recurring: { interval: "month" as const },
  },
];

async function main() {
  console.log("→ Creating 6 Rulio products in Stripe...\n");

  const priceIds: Record<string, string> = {};

  for (const p of PRODUCTS) {
    // Check if product already exists by metadata.sku
    const existing = await stripe.products.search({
      query: `metadata['sku']:'${p.sku}'`,
    });

    let product: Stripe.Product;
    if (existing.data.length > 0 && existing.data[0]) {
      product = existing.data[0];
      console.log(`  ✓ ${p.sku.padEnd(24)} product exists (${product.id})`);
    } else {
      product = await stripe.products.create({
        name: p.name,
        description: p.description,
        metadata: { sku: p.sku },
        tax_code: "txcd_10000000",
      });
      console.log(`  ✓ ${p.sku.padEnd(24)} product created (${product.id})`);
    }

    // Check if a price already exists for this product + amount
    const prices = await stripe.prices.list({
      product: product.id,
      active: true,
      limit: 10,
    });
    let price = prices.data.find(
      (pr) => pr.unit_amount === p.amount && pr.currency === "eur" &&
        ((!p.recurring && !pr.recurring) ||
         (p.recurring && pr.recurring && pr.recurring.interval === p.recurring.interval))
    );

    if (!price) {
      const priceParams: Stripe.PriceCreateParams = {
        product: product.id,
        unit_amount: p.amount,
        currency: "eur",
        metadata: { sku: p.sku },
      };
      if (p.recurring) {
        priceParams.recurring = p.recurring;
      }
      price = await stripe.prices.create(priceParams);
    }
    priceIds[p.envKey] = price.id;
    const priceLabel = p.recurring ? `€${(p.amount / 100).toFixed(2)}/${p.recurring.interval}` : `€${(p.amount / 100).toFixed(2)}`;
    console.log(`    → price ${price.id} (${priceLabel})`);
  }

  // Write back to .env.local
  const envPath = resolve(process.cwd(), ".env.local");
  let envContent = existsSync(envPath)
    ? readFileSync(envPath, "utf-8")
    : "";

  for (const [envKey, priceId] of Object.entries(priceIds)) {
    const re = new RegExp(`^${envKey}=.*$`, "m");
    if (re.test(envContent)) {
      envContent = envContent.replace(re, `${envKey}=${priceId}`);
    } else {
      envContent += `\n${envKey}=${priceId}\n`;
    }
  }

  writeFileSync(envPath, envContent, "utf-8");
  console.log(`\n✓ All 6 price IDs written to .env.local`);
  console.log("\nNext steps:");
  console.log("  1. Go to https://dashboard.stripe.com/webhooks");
  console.log("  2. Add endpoint: " + (process.env.NEXT_PUBLIC_URL || "https://rulio.app") + "/api/webhooks/stripe");
  console.log("  3. Subscribe to: checkout.session.completed, charge.refunded,");
  console.log("     customer.subscription.created, customer.subscription.updated,");
  console.log("     customer.subscription.deleted, invoice.payment_succeeded, invoice.payment_failed");
  console.log("  4. Copy the signing secret → STRIPE_WEBHOOK_SECRET in .env.local");
  console.log("  5. Restart the engine: npm start");
}

main().catch((err) => {
  console.error("✗ setup-stripe-all failed:", err);
  process.exit(1);
});
