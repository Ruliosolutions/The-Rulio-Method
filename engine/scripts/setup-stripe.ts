/**
 * setup-stripe.ts
 *
 * One-shot script that creates the 3 Rulio workshop products + prices
 * in your Stripe account, then writes the price IDs back to .env.local.
 *
 * Run with: npx tsx scripts/setup-stripe.ts
 *   (or)  npm run setup:stripe
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
  console.error(
    "✗ STRIPE_SECRET_KEY is not set. Add it to .env.local and try again."
  );
  process.exit(1);
}

const stripe = new Stripe(apiKey, { apiVersion: "2024-06-20" });

const PRODUCTS = [
  {
    name: "Energy Reset Workshop — Standard",
    sku: "workshop-standard",
    envKey: "STRIPE_PRICE_WORKSHOP_STANDARD",
    description: "90-min live workshop + 9 frequency cards + 7-day practice log",
    amount: 4700, // €47.00
  },
  {
    name: "Energy Reset Workshop — Book Reader",
    sku: "workshop-book",
    envKey: "STRIPE_PRICE_WORKSHOP_BOOK",
    description: "Same as Standard, requires proof of book purchase (€29)",
    amount: 2900, // €29.00
  },
  {
    name: "Energy Reset Bundle",
    sku: "workshop-bundle",
    envKey: "STRIPE_PRICE_WORKSHOP_BUNDLE",
    description: "Workshop + 6-month Engine Pro + 2 × 30-min private sessions",
    amount: 50000, // €500.00
  },
] as const;

async function main() {
  console.log("→ Creating Rulio workshop products in Stripe...\n");

  const priceIds: Record<string, string> = {};

  for (const p of PRODUCTS) {
    // Check if product already exists by metadata.sku
    const existing = await stripe.products.search({
      query: `metadata['sku']:'${p.sku}'`,
    });

    let product: Stripe.Product;
    if (existing.data.length > 0 && existing.data[0]) {
      product = existing.data[0];
      console.log(`  ✓ ${p.sku} — product already exists (${product.id})`);
    } else {
      product = await stripe.products.create({
        name: p.name,
        description: p.description,
        metadata: { sku: p.sku },
        tax_code: "txcd_10000000", // General - Services
      });
      console.log(`  ✓ ${p.sku} — product created (${product.id})`);
    }

    // Create a price for this product
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: p.amount,
      currency: "eur",
      metadata: { sku: p.sku },
    });
    priceIds[p.envKey] = price.id;
    console.log(`    → price ${price.id} (€${(p.amount / 100).toFixed(2)})`);
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
  console.log(`\n✓ Price IDs written to .env.local`);
  console.log("\nNext steps:");
  console.log("  1. Go to https://dashboard.stripe.com/webhooks");
  console.log("  2. Add endpoint: https://rulio.app/api/webhooks/stripe");
  console.log("  3. Subscribe to events: checkout.session.completed, charge.refunded");
  console.log("  4. Copy the signing secret → STRIPE_WEBHOOK_SECRET in .env.local");
  console.log("  5. Restart the engine: npm run dev");
}

main().catch((err) => {
  console.error("✗ setup-stripe failed:", err);
  process.exit(1);
});
