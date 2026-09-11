# Energy Reset Workshop — Stripe Checkout config

> **Three SKUs, three prices.** Standard, Book Reader,
> Bundle. All one-time, all in EUR. Stripe handles the
> payment, the receipt, the VAT (for EU buyers), and
> the post-payment redirect to the workshop onboarding form.

## Products

```yaml
products:
  - name: "Energy Reset Workshop — Standard"
    sku: "workshop-standard"
    price: 47_00  # €47.00
    currency: eur
    one_time: true
    description: "90-min live workshop + 9 frequency cards + 7-day practice log"
    metadata:
      product_type: workshop
      tier: standard

  - name: "Energy Reset Workshop — Book Reader"
    sku: "workshop-book"
    price: 29_00  # €29.00
    currency: eur
    one_time: true
    description: "90-min live workshop + 9 frequency cards + 7-day practice log (book reader discount)"
    metadata:
      product_type: workshop
      tier: book
      requires_proof: gumroad_receipt

  - name: "Energy Reset Bundle"
    sku: "workshop-bundle"
    price: 500_00  # €500.00
    currency: eur
    one_time: true
    description: "Workshop + 6-month Rulio Engine Pro + 2 × 30-min private sessions"
    metadata:
      product_type: bundle
      tier: premium
      includes:
        - workshop-standard
        - engine-pro-6mo
        - private-sessions-2x
```

## Stripe Checkout session

```ts
// engine/app/api/workshop/checkout/route.ts (re-add when engine is on full runtime)
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { sku, email, gumroadReceipt } = await req.json();
  const prices = {
    "workshop-standard": "price_workshop_standard_REPLACE_ME",
    "workshop-book": "workshop-book-REPLACE_ME",
    "workshop-bundle": "price_workshop_bundle_REPLACE_ME",
  } as const;
  const priceId = prices[sku as keyof typeof prices];
  if (!priceId) return new Response("Invalid SKU", { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card", "sepa_debit", "bancontact"],
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email,
    success_url: `${process.env.NEXT_PUBLIC_URL}/workshop/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/workshop`,
    metadata: {
      sku,
      gumroad_receipt: gumroadReceipt ?? "",
    },
    allow_promotion_codes: true,
  });
  return Response.json({ url: session.url });
}
```

## Webhook → CRM

Stripe sends `checkout.session.completed` to
`/api/webhooks/stripe`. The webhook handler:

1. Verifies the signature
2. Inserts a row into Supabase `workshop_attendees` with:
   - `email`, `sku`, `amount_eur`, `stripe_session_id`
   - `gumroad_receipt` (if provided)
   - `created_at` = now
3. Triggers the post-payment email sequence
   (email 1 = confirmation, via Resend)
4. Adds a tag to the CRM (HubSpot: `workshop-registered`)

```ts
// engine/app/api/webhooks/stripe/route.ts
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();
  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    await supabase.from("workshop_attendees").insert({
      email: s.customer_email,
      sku: s.metadata?.sku,
      amount_eur: (s.amount_total ?? 0) / 100,
      stripe_session_id: s.id,
      gumroad_receipt: s.metadata?.gumroad_receipt ?? null,
    });
    // Trigger confirmation email via Resend
    // (handled in a separate cron / queue, not synchronously)
  }

  return new Response("ok", { status: 200 });
}
```

## Database schema (Supabase)

```sql
-- Run in Supabase SQL editor
create table if not exists workshop_attendees (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text,
  sku text not null check (sku in ('workshop-standard', 'workshop-book', 'workshop-bundle')),
  amount_eur int not null,
  stripe_session_id text unique not null,
  gumroad_receipt text,
  workshop_date date,
  attended boolean default false,
  replay_watched boolean default false,
  bundle_engine_pro_claimed boolean default false,
  bundle_sessions_used int default 0,
  created_at timestamptz default now()
);

create index workshop_attendees_email_idx on workshop_attendees(email);
create index workshop_attendees_date_idx on workshop_attendees(workshop_date);
```

## Refund handling

Refunds go through the Stripe Dashboard or via the API. When a
refund is issued:

1. Update `workshop_attendees.attended` = false
2. Send the user a refund confirmation email
3. The 7-day email sequence pauses (handled by the cron)
4. The seat re-opens for someone on the waitlist

## Capacity enforcement

Before creating the Stripe session, check capacity:

```ts
const { count } = await supabase
  .from("workshop_attendees")
  .select("*", { count: "exact", head: true })
  .eq("workshop_date", workshopDate)
  .neq("sku", "refunded");  // exclude refunded

if ((count ?? 0) >= 24) {
  return new Response("Sold out", { status: 410 });
}
```

If the count is 24, the API returns 410 and the registration
page switches to the waitlist mode.
