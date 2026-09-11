/**
 * Stripe client for the Rulio Engine.
 *
 * Uses the Stripe REST API via fetch (edge-compatible) instead of the
 * full Stripe Node SDK, which uses setInterval.unref() at module load
 * and can't run in Cloudflare Workers / Pages edge runtime.
 *
 * The 3 workshop SKUs are referenced by their Stripe Price IDs.
 * Run `npm run setup:stripe` once to create the products in your
 * Stripe account and write the IDs back to .env.local.
 */

const apiKey = process.env.STRIPE_SECRET_KEY;
if (!apiKey) {
  console.warn(
    "[stripe] STRIPE_SECRET_KEY is not set. Workshop checkout will fail until you add it to .env.local."
  );
}

const STRIPE_API = "https://api.stripe.com/v1";

/**
 * Lightweight Stripe API client — fetch-based, edge-compatible.
 * Supports the small subset of Stripe methods the engine actually uses:
 *  - balance.retrieve()        → /balance
 *  - checkout.sessions.create() → POST /checkout/sessions
 *  - checkout.sessions.retrieve() → GET /checkout/sessions/:id
 *  - billingPortal.sessions.create() → POST /billing_portal/sessions
 *  - subscriptions.retrieve()  → GET /subscriptions/:id
 *  - subscriptions.update()    → POST /subscriptions/:id
 *  - webhooks.constructEvent()  → signature verification (manual)
 */
export const stripe = {
  customers: {
    async create(params: Record<string, any>) { return stripeRequest("POST", "/customers", params); },
    async retrieve(id: string) { return stripeRequest("GET", `/customers/${id}`); },
  },
  webhooks: {
    async constructEvent(body: string, sig: string, secret: string) { const r = await verifyWebhookSignature(body, sig, secret); return r.event; },
  },
  async balance_retrieve() {
    return stripeRequest("GET", "/balance");
  },
  checkout: {
    async create(params: Record<string, any>) {
      return stripeRequest("POST", "/checkout/sessions", params);
    },
    async retrieve(id: string) {
      return stripeRequest("GET", `/checkout/sessions/${id}`);
    },
  },
  billingPortal: {
    async create(params: { customer: string; return_url: string }) {
      return stripeRequest("POST", "/billing_portal/sessions", params);
    },
  },
  subscriptions: {
    async retrieve(id: string) {
      return stripeRequest("GET", `/subscriptions/${id}`);
    },
    async update(id: string, params: Record<string, any>) {
      return stripeRequest("POST", `/subscriptions/${id}`, params);
    },
  },
};

async function stripeRequest(
  method: "GET" | "POST" | "DELETE",
  path: string,
  body?: Record<string, any>
) {
  const url = `${STRIPE_API}${path}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey ?? "sk_test_placeholder"}`,
  };
  if (body) {
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  const res = await fetch(url, {
    method,
    headers,
    body: body ? new URLSearchParams(flattenFormData(body)).toString() : undefined,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new StripeError(data?.error?.message ?? `Stripe API error ${res.status}`, res.status, data);
  }
  return data;
}

class StripeError extends Error {
  status: number;
  raw: any;
  constructor(message: string, status: number, raw: any) {
    super(message);
    this.name = "StripeError";
    this.status = status;
    this.raw = raw;
  }
}
export { StripeError, stripeRequest };

/**
 * Flatten nested objects to form-data format Stripe expects.
 * { line_items: [{ price: 'xxx', quantity: 1 }] } →
 *   line_items[0][price]=xxx&line_items[0][quantity]=1
 */
function flattenFormData(obj: Record<string, any>, prefix = ""): string[][] {
  const out: string[][] = [];
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}[${key}]` : key;
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (typeof v === "object") {
          out.push(...flattenFormData(v, `${newKey}[${i}]`));
        } else {
          out.push([`${newKey}[${i}]`, String(v)]);
        }
      });
    } else if (typeof value === "object") {
      out.push(...flattenFormData(value, newKey));
    } else {
      out.push([newKey, String(value)]);
    }
  }
  return out;
}

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

/**
 * Verify a Stripe webhook signature (edge-compatible).
 * Stripe sends a `Stripe-Signature` header in the form:
 *   t=1234567890,v1=abcdef...
 *
 * The signed payload is `${t}.${body}` and the signature is
 * HMAC-SHA256 of that with the webhook secret as key.
 */
export async function verifyWebhookSignature(
  body: string,
  signatureHeader: string,
  secret: string
): Promise<{ event: any }> {
  const parts = signatureHeader.split(",").reduce<Record<string, string>>((acc, p) => {
    const [k, v] = p.split("=");
    acc[k] = v;
    return acc;
  }, {});
  const t = parts.t;
  const v1 = parts.v1;
  if (!t || !v1) {
    throw new Error("Invalid signature header");
  }
  const signedPayload = `${t}.${body}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedPayload));
  const computed = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  if (computed !== v1) {
    throw new Error("Invalid signature");
  }
  return { event: JSON.parse(body) };
}
