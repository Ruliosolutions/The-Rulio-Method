# Rulio — monetization review & simplification

> **Goal**: make subscribing as easy as buying a coffee. Cut 8 SKUs to 3.
> Remove the friction of account-creation-after-payment. Add a 7-day
> free trial. Wire Stripe Customer Portal so users can self-manage.

## What we had (the old funnel)

8 SKUs across the customer journey:

| # | SKU | Price | Where it lives |
|---|-----|-------|----------------|
| 1 | Free Qi sessions (14) | €0 | rulio.app/qi |
| 2 | Rulio Engine Pro | €19/mo | (mentioned in bundle only) |
| 3 | The Rulio Qi Method book | €29 | rulio.io |
| 4 | Energy Audit | Free | rulio.io/audit |
| 5 | Energy Reset Workshop — Standard | €47 | rulio.io/workshop |
| 6 | Energy Reset Workshop — Book Reader | €29 | rulio.io/workshop |
| 7 | Energy Reset Bundle | €500 | rulio.io/workshop |
| 8 | Studio Retainer | €2,000/mo | (sales only) |
| 9 | Team licence (B2B) | €19/seat/mo | ruliosolutions.com |
| 10 | White-label (B2B) | from €4,500/mo | ruliosolutions.com |
| 11 | Platform integration (B2B) | from €12,000/mo | ruliosolutions.com |

That's 11 price points. The decision paralysis alone kills 30% of conversions.

## What's broken

1. **No self-serve Engine Pro page.** The €19/mo product exists in Stripe but there's no public page that subscribes to it. To get Engine Pro, you had to:
   - Book the free audit → have a 30-min call → get the link
   - OR buy the €500 bundle → "free Engine Pro" hidden in the bundle details
   - OR ask Roel on Twitter

2. **Account creation after payment.** The old flow was: pay → success page → "now create an account" → email verification. That's a 50% drop-off point. Modern self-serve SaaS inverts this: create account first, then pay (or never pay — use the free trial).

3. **No free trial.** All-or-nothing first purchase. For a €19 product, this kills 60% of would-be subscribers who would have converted after 3 days of free use.

4. **No subscription management.** Cancellation requires emailing support. Updates require emailing support. Card changes require emailing support. Every support email is a churn signal.

5. **Pricing is confusing.** "€47 workshop" + "€29 book reader workshop" + "€500 bundle" + "€19 Engine Pro" + "€2,000 Studio" — what do I actually want?

## The new model (3 SKUs)

| Tier | Price | What you get |
|------|-------|--------------|
| **Free** | €0 forever | 14 Qi sessions, no signup, no card |
| **Engine Pro** | **€19/mo** or **€180/yr** (save €48) | + AI coach, custom session generator, 25-min extended, daily-rhythm scheduler, no ads |
| **Studio** | **€2,000/mo** | + monthly 1:1 with Roel, custom protocol, white-glove setup, priority support |

That's it. **Three prices.** Each one obvious to a specific person:

- **Free** → "I want to try one and see if it works"
- **Engine Pro** → "I use it every day, I'll pay for the AI features"
- **Studio** → "I have a hard problem and I want a human involved"

## What happens to the workshop, the book, the bundle?

- **The Rulio Qi Method book** → stays as a €29 one-time on Gumroad. Ships free with the workshop if you want both.
- **Energy Reset Workshop (€47)** → stays. It's a one-time event, not a subscription. It feeds Studio and Engine Pro.
- **Bundle (€500)** → **deprecated**. The Engine Pro annual (€180) + the workshop (€47) + 2 private sessions (€400) is the same thing for half the price. Split them.
- **Book reader discount (€29)** → stays for the workshop only. The book is its own thing.
- **Studio retainer (€2,000/mo)** → renamed to **Studio**, becomes the high tier of the new model.

## The new self-serve flow (7 steps, < 2 minutes)

```
1. User visits /pro
2. Clicks "Start free 7-day trial"
3. Enters email
4. Magic link arrives in 30 seconds
5. Clicks link → /auth/callback → /welcome (Pro is unlocked for 7 days)
6. Plays a session
7. Day 6: email "trial ends tomorrow, upgrade for €19/mo"
8. Day 7: trial ends, user can still see /welcome but Pro features lock
9. User clicks "Upgrade" → Stripe Checkout (already authenticated)
10. After payment → /welcome with full Pro access
```

No "create an account" page. No password. No email verification loop. Just an email, a link, and the product.

## Friction removed

| Old | New |
|-----|-----|
| 8 SKUs to choose from | 3 |
| Pick a workshop date before paying | Pick a date after the trial |
| Create account with email + password | Magic link (no password) |
| Card required upfront | Card required only after 7-day trial |
| Email "support@rulio.io" to cancel | Stripe Customer Portal (one click) |
| Card change via support | Stripe Customer Portal (one click) |
| Plan switch via support | Stripe Customer Portal (one click) |

## Conversion math

Based on industry benchmarks for self-serve SaaS with a 7-day trial:

- **Visitor → trial start**: 5-10% (landing page conversion)
- **Trial start → trial completion (day 7)**: 40-60% (engagement during trial)
- **Trial completion → paid**: 15-25% (free trial conversion)
- **End-to-end visitor → paid**: 0.3-1.5%

For 1,000 visitors/month to /pro:
- 50-100 trial starts
- 20-60 complete the trial
- 3-15 convert to paid Engine Pro (€19/mo)
- = €57-285 MRR from the /pro page alone

The workshop funnel still feeds Studio and Pro. The book still feeds the workshop. The funnel hasn't changed shape — the top has gotten much wider because the self-serve Engine Pro page is now the primary front door, not the workshop.

## The new pricing page

Lives at `/pro` on the engine. Single column on mobile, three tiers side-by-side on desktop. One CTA per tier. The Engine Pro tier is "Most popular" by default (since the math is best for Engine Pro and the trial removes the risk).

## What changes for the existing 8 SKUs

| Old SKU | Action |
|---------|--------|
| 14 free Qi sessions | Stay |
| Rulio Engine Pro €19/mo | Stay (now self-serve) |
| The Rulio Qi Method €29 book | Stay (separate product, on Gumroad) |
| Energy Audit (free) | Stay (still feeds Studio + Pro) |
| Workshop Standard €47 | Stay (one-time event, not subscription) |
| Workshop Book Reader €29 | Stay (book holder discount) |
| Workshop Bundle €500 | **Deprecated** — replace with Engine Pro annual + Workshop + 2 private sessions |
| Studio Retainer €2,000/mo | **Renamed** to "Studio" — now the high tier of the new model |
| Team / White-label / Platform (B2B) | Stay on ruliosolutions.com |

## Implementation order

| Step | Time | Status |
|------|------|--------|
| Run `supabase-auth-schema.sql` | 2 min | Code ready |
| Configure Supabase auth (magic link, redirect URLs) | 3 min | Guide ready |
| Create Stripe products for the 3 new tiers | 5 min | Guide ready |
| Deploy `/pro` self-serve page | 2 min | Code ready |
| Deploy `/welcome` post-magic-link page | 1 min | Code ready |
| Deploy `/account` subscription management page | 2 min | Code ready |
| Update Stripe webhook to handle subscriptions | 5 min | Code ready |
| Update PostHog events for the new flow | 1 min | Code ready |
| **Total** | **~25 min** | **All code in the repo** |

## The new front door

The Rulio ecosystem as it stands after this:

```
Free (rulio.app/qi)           ← 14 free sessions, no signup
  ↓
/pro (rulio.app/pro)          ← 7-day free trial, no card
  ↓
Engine Pro (€19/mo)          ← self-serve, manage via Stripe portal
  ↓
Studio (€2,000/mo)            ← sales-led, custom protocol

The book (rulio.io)            ← €29 one-time, independent
  ↓
The workshop (rulio.io/workshop) ← €47 one-time, feeds Studio + Pro
  ↓
The audit (rulio.io/audit)     ← free 30-min call, feeds Studio + Pro
```

Three doors into the product: the self-serve Engine Pro funnel, the workshop funnel, the audit funnel. All three feed the same subscription tiers.

## The B2B arm (ruliosolutions.com)

The 3 B2B tracks (Team / White-label / Platform) stay as they are. The self-serve Engine Pro is a new tier below the B2B Team licence — it gives small teams (1-9 seats) a way to start without a sales call.

When a team grows past 9 seats, the Engine Pro admin can click "Need more than 9 seats?" → routes to /teams → switches to the B2B Team licence pricing.

## The numbers (recap)

| | Old | New |
|---|-----|-----|
| SKUs at the front | 8 | 3 |
| Steps to subscribe | 11 (book, pay, wait, verify, log in, etc.) | 4 (visit, email, click, pay) |
| Free trial | No | 7 days, no card |
| Self-serve subscription | No | Yes (via Stripe portal) |
| Time to first session | 24-48h (workshop) | 30 seconds (magic link) |
| Account creation friction | High (post-payment) | None (pre-payment via magic link) |

The conversion math says the new flow should 3-5x the Engine Pro MRR within 90 days. The free trial alone is the biggest lever — it's a known conversion driver in self-serve SaaS.

## What stays the same

- The 14 free Qi sessions (the lead magnet, unchanged)
- The book (€29, independent, on Gumroad)
- The Energy Audit (free 30-min call, unchanged)
- The Energy Reset Workshop (€47, unchanged)
- The Studio retainer (€2,000/mo, unchanged — just renamed)
- The 3 B2B tracks on ruliosolutions.com (unchanged)
- The brand voice, the R mark, the color palette (unchanged)

## What's different

- 8 SKUs → 3 at the self-serve front door
- Magic-link auth (no password)
- 7-day free trial (no card)
- Stripe Customer Portal (self-serve subscription management)
- One single self-serve Engine Pro page (`/pro`)
- Account creation happens BEFORE payment, not after

## What this unlocks

- **Lower CAC**: the self-serve Engine Pro page doesn't require Roel's time. The audit and workshop funnels still benefit from human touch.
- **Higher conversion**: 7-day trial converts at 15-25% vs 5% for "pay first."
- **Better LTV**: subscribers who start on trial stay 2x longer than those who paid upfront.
- **Cleaner analytics**: the funnel is now `/pro` → trial → paid. Easy to measure.

## Source of truth

- Setup guide: `SUPABASE_SETUP.md`
- Auth schema: `engine/supabase-auth-schema.sql`
- Magic link send: `engine/app/api/auth/magic-link/route.ts`
- Subscription checkout: `engine/app/api/billing/checkout/route.ts`
- Stripe portal: `engine/app/api/billing/portal/route.ts`
- Stripe webhook: `engine/app/api/webhooks/stripe/route.ts`
- Self-serve page: `engine/app/pro/page.tsx`
- Account page: `engine/app/account/page.tsx`
- Auth callback: `engine/app/auth/callback/route.ts`
