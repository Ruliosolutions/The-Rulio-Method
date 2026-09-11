# Rulio Digital — Stripe Payment Links (LIVE)

All 5 products created in **Stripe LIVE mode** — real money, no platform fees (3.5% + €0.25 per transaction).

## Products & Links

| # | Product | Price | Payment Link | Link ID |
|---|---------|-------|--------------|---------|
| 1 | 9 Solfeggio Frequency Cards (PDF) | €9 | https://buy.stripe.com/3cIeVdbq53qS9cKgx4dwc02 | plink_1UDZWEGXrKWvdV2zSji5L4cL |
| 2 | 7-Day Qi Practice Log (PDF) | €7 | https://buy.stripe.com/8x2aEX2Tz2mO2Om94Cdwc04 | plink_1UDZWFGXrKWvdV2zDMtibbGh |
| 3 | Rulio Qi Method (ebook) | €19 | https://buy.stripe.com/6oU5kD3XDbXocoW6Wudwc01 | plink_1UDZWDGXrKWvdV2zi4yZHVDr |
| 4 | 14-Day Solfeggio Audio Pack (MP3) | €29 | https://buy.stripe.com/5kQ9ATfGl3qSgFc3Kidwc00 | plink_1UDZWDGXrKWvdV2zoAMczjtQ |
| 5 | **Complete Bundle** (all 4, 40% off) | **€49** | https://buy.stripe.com/dRmfZh79P2mOfB8a8Gdwc03 | plink_1UDZWEGXrKWvdV2zCHTft730 |

## How to share these right now

- **Twitter/LinkedIn** — paste the link in a post: "Just put the Rulio bundle on direct sale → https://buy.stripe.com/dRmfZh79P2mOfB8a8Gdwc03"
- **Substack** — embed the link in a CTA
- **Email signature** — add the bundle link
- **DM replies** — when someone asks "where do I get it?", send the link

## Files to send after purchase (manual for now, automated later)

When a customer pays, Stripe sends you an email. Forward the right files:

| Product | Files to send |
|---------|---------------|
| 9 Solfeggio Cards | `assets/cards/9-solfeggio-cards-A5.pdf` + `assets/cards/9-solfeggio-cards-letter.pdf` |
| Qi Practice Log | `assets/logs/qi-practice-log.pdf` |
| Ebook | `ebook/rulio-qi-method.pdf` (the enhanced ebook in this repo) |
| Audio Pack | `qi-sessions/14-day-pack/` (zip the 14 MP3s) |
| Complete Bundle | All 4 above |

> **Status:** Manual fulfillment is fine for the first 100 sales. After that, switch to automated via Stripe webhook → email delivery.

## Next step

Add the /shop page to the engine so these products have a branded checkout at rulio.app/shop. (Already deployed.)
