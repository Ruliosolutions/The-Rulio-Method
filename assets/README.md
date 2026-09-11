# Rulio brand guide — the R mark

> **The R logo is the brand.** Every surface, every asset, every
> deck, every email uses this mark. This guide is the single
> source of truth for how to use it.

## The mark

The Rulio R is a faceted, crystalline 3D letterform with internal
electric-blue energy trails flowing through and around it. The
mark reads as a single bold "R" at a glance, with a living
plasma interior that signals "this is a technology product that
deals with sound and energy."

It is the only logo. There is no separate wordmark, no
separate symbol, no monogram alternative. The R is the brand.

## Colors

```
Background:    #0c0c0e   deep cosmic black
R letterform:  #5BB8FF   electric blue (primary)
R glow:        #8FD1FF   cyan (accent)
Text:          #F4F1EA   warm off-white
Muted text:    #A1A1AA   soft gray
Rule lines:    rgba(244, 241, 234, 0.12)  12% off-white
```

The two blues are the only chromatic colors in the system.
Everything else is dark, off-white, or muted gray. The blues
are reserved for the R and the energy trails — they should not
appear in body copy, in UI chrome, or in any other element.

## Typography

- **Display / headings:** Fraunces (serif, weight 300–600)
- **Body:** Inter (sans, weight 300–700)
- **Mono / metadata:** JetBrains Mono

No other typefaces. The R mark can be paired with any
typeface in this system; it does not need a custom wordmark
typeface.

## The asset set (in this folder)

| File | Size | Use |
|------|------|-----|
| `rulio-app-icon-1024.png` | 1024×1024 | iOS / Android app icon, PWA, web favicon at large sizes |
| `rulio-favicon-256.png` | 256×256 | Web favicon at all sizes (16, 32, 48, 64, 128, 192, 256) |
| `rulio-og-image-1600x800.png` | 1600×800 | LinkedIn share image, Twitter card, OpenGraph |
| `rulio-ebook-cover-900x1200.png` | 900×1200 | The Rulio Qi Method book cover (3:4 portrait) |
| `rulio-youtube-banner-2560x1440.png` | 2560×1440 | YouTube channel banner (safe area centered) |
| `rulio-business-card-front-1050x600.png` | 1050×600 | Business card front (3.5×2 inch at 300 DPI) |

## Where the R is used

| Surface | Asset |
|---------|-------|
| Canonical portfolio (`roeljanssens.space.minimax.io`) | Favicon + apple-touch-icon + nav logo |
| Rulio Engine web app (`rulio.app`) | Favicon + apple-touch-icon + OG image |
| Rulio Engine landing page (`rulio.engine`) | Top-bar logo + favicon + OG image |
| Rulio Engine booking page | Top-bar logo + favicon |
| The Rulio Qi Method book (Gumroad) | Cover + chapter dividers + the Code Card mark |
| LinkedIn | Profile photo (cropped R), header banner (OG image) |
| YouTube | Channel icon (the R), channel banner |
| Email signature | Inline R (40×40) + "Roel Janssens — Founder, Rulio Studio" |
| Business cards | Front (R + wordmark), back (contact info) |

## Rules (the brand-guardian red lines)

1. **The R is the only logo.** Do not create a separate wordmark
   in any typeface. The R + the wordmark "RULIO" in the system
   typefaces is the only combination.
2. **Never recolor the R.** The two blues are the only chromatic
   colors. The R in grayscale is acceptable for print on dark
   paper, but never recolor to red, green, or any other hue.
3. **Never animate the energy trails.** The mark is a static
   PNG. Animation is the Rulio Engine product's job, not the
   brand mark's job.
4. **The R sits on dark backgrounds only.** The R is designed
   for the cosmic black (#0c0c0e). On a light background, use
   the R inverted to dark gray, not the colored R.
5. **Clear space = the height of the R's bowl.** No other
   element (text, rule, image edge) may enter that clear
   space.
6. **Minimum size = 24px square for digital, 8mm for print.**
   Below those sizes the energy trails become illegible; use
   the favicon variant instead.
7. **The "RULIO" wordmark always sits to the right of the R,
   vertically centered with the R's optical baseline.** Never
   below the R. Never wrapping the R.

## Where the R is NOT used

- Inside long-form body copy (the R is a brand mark, not a
  decorative element).
- As a favicon for the ebook (use the sphere-mark favicon
  from the existing portfolio; the R is for the Rulio Engine
  product, the sphere is for the studio).
- On third-party client work (Spiritual Wendy, Orbitech,
  etc.) — those are client brands, not Rulio.

## Production checklist (Section 3 rebrand migration)

When the rebrand is executed:

1. Replace `assets/branding/icon-512.png` on the canonical
   portfolio with `rulio-app-icon-1024.png` (resized to 512).
2. Regenerate the favicon set (16/32/48/64/96/128/192/256)
   from `rulio-favicon-256.png`.
3. Replace `apple-touch-icon.png` with `rulio-app-icon-1024.png`
   (resized to 180).
4. Replace `og-image.jpg` with `rulio-og-image-1600x800.png`.
5. Update the nav block to use the R as the logo (instead of
   the sphere).
6. Update the email signature to inline the R (40×40) with
   "Roel Janssens — Founder, Rulio Studio".
7. Update the YouTube channel icon and banner.
8. Update the LinkedIn profile photo.

The `migration/rebrand.sh` script handles items 1–4
automatically (the file-path string replacement); items 5–8
require manual upload to each platform.
