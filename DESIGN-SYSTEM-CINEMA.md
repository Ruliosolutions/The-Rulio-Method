# Rulio — The Frequency Room (Design System)

> Adapted from "The Digital Projectionist" (Google Stitch reference). Pitch-black depths + electric blue neon. For solfeggio, not cinema — but the cinematic metaphor (private screening room for your attention) holds.

## North Star
"The Digital Projectionist" → **"The Frequency Room"** — a private screening room for your attention. Editorial, immersive, moody. No app-in-a-box feel.

---

## 1. Colors

Pitch-black surfaces + electric blue/cyan neon. No flat borders — separation comes from background shifts.

### Surfaces (tonal layering, light-not-shadow)
| Token | Hex | Use |
|---|---|---|
| `surface-dim` | `#0c0c0e` | Page background ("black hole") |
| `surface-lowest` | `#08080a` | Deepest background |
| `surface-low` | `#131316` | Section background (Related Films → "Free vs Pro") |
| `surface` | `#18181c` | Mid background |
| `surface-container` | `#1f1f23` | Main content cards |
| `surface-container-high` | `#2a2a2f` | Elevated cards |
| `surface-container-highest` | `#353539` | Top-level floating panels |
| `surface-variant` | `#2a2a2f` | Glass base |

### Brand neon
| Token | Hex | Use |
|---|---|---|
| `primary` | `#5BB8FF` | Electric blue (main CTA, links, focus) |
| `primary-bright` | `#8FD1FF` | Cyan (italic accent, secondary highlights) |
| `primary-deep` | `#2a8ed6` | Depth (gradient stop, hover) |
| `tertiary` | `#8FD1FF` | Success, "New" badges |

### Text
| Token | Hex | Use |
|---|---|---|
| `on-surface` | `#F4F1EA` | Primary text (warm off-white, never #FFF) |
| `on-surface-variant` | `#a1a1aa` | Metadata, captions, secondary |

### The Gradient
`linear-gradient(135deg, #2a8ed6 0%, #5BB8FF 50%, #8FD1FF 100%)` — the "glowing neon" CTA. Used on `.btn-primary` and frequency poster headers.

---

## 2. The "No-Line" Rule
**Borders are prohibited for sectioning.** To separate content, use background shifts (e.g., a "Related Sessions" section wrapped in `surface-low` while sitting on `surface-dim`).

Fallback when accessibility requires a stroke:
- Use `outline-variant` = `rgba(91, 184, 255, 0.20)` (was `#5c3f45` for pink, adapted to blue tint)

---

## 3. Typography

| Role | Font | Use |
|---|---|---|
| Display / Headlines | **Space Grotesk** | "Movie Poster" moments — wide apertures, modern geometry, authoritative |
| Body / Labels | **Inter** | Metadata, neutral, disappears |

### Hierarchy
- Primary text: `on-surface` (#F4F1EA) — never pure white
- Secondary: `on-surface-variant` (#a1a1aa) — pulled back, doesn't compete

---

## 4. Elevation — Tonal Layering
**No drop shadows.** Use light, not shadow, to define space.

- Place `surface-container-high` card over `surface` background → subtle #131313 to #2a2a2a shift = edge without a line
- Floating elements (FAB, nav): ambient shadow tinted with `primary` at 10% opacity (light spill from neon sign)
- Example shadow: `0 0 32px rgba(91, 184, 255, 0.35)` on `.btn-primary`

---

## 5. Components

### Buttons (pill-shaped, `border-radius: 9999px`)

| Variant | Style | Use |
|---|---|---|
| **Primary** | Gradient (`primary` → `primary-bright`), `on-surface` text | Main CTAs |
| **Secondary (glass)** | `rgba(91, 184, 255, 0.06)` + `backdrop-filter: blur(20px)` | Lower-emphasis actions |
| **Tertiary (text)** | `primary` color, no background | "See All", low-emphasis |

### Cards & Lists
- **No dividers.** Use `12px` or `16px` spacing for "Gutter of Silence"
- **Frequency poster cards**: `20px` rounded corners + `inset 0 0 0 1px rgba(91,184,255,0.10)` for the inner glow

### Glassmorphic nav (top bar)
- `background: rgba(31, 31, 35, 0.6)`
- `backdrop-filter: blur(24px) saturate(140%)`
- Pill shape (`border-radius: 9999px`)
- Floating top of page, `position: sticky`

---

## 6. Spacing & Radius

| Spacing | Value | Use |
|---|---|---|
| `--s-2` | 8px | Tight |
| `--s-4` | 16px | Default |
| `--s-6` | 24px | Section internal |
| `--s-10` | 40px | Between cards |
| `--s-16` | 64px | Between sections |
| `--s-20` | 80px | Hero top/bottom |

| Radius | Value | Use |
|---|---|---|
| `--r-sm` | 8px | Brand mark |
| `--r-md` | 12px | Inputs |
| `--r-lg` | 20px | Cards |
| `--r-full` | 9999px | Buttons, nav, badges |

---

## 7. Do / Don't

**Do:**
- Use extreme vertical white space (`64px` or `80px`) to separate genres/categories
- Allow frequency posters to bleed with `surface-dim` fade gradients
- Use `tertiary` (cyan) sparingly for success/new — cool contrast to the hot blue

**Don't:**
- Use pure white (#FFFFFF) for text — always `on-surface` (#F4F1EA)
- Use drop shadows on dark surfaces — they muddy
- Use sharp corners — everything `md` to `full` roundedness

---

## 8. Files

- `dist-cinema/index.html` — full landing page using this system
- `engine/app/globals.css` — engine's design tokens (for parity if/when deployed)

---

## 9. Why these choices for Rulio

The "screening room" metaphor maps to what solfeggio does: it asks you to sit still, alone, with headphones, for 5 minutes. That's a private ritual, not a feed. The pitch-black + neon combination respects that — it says "you're here, alone, with one thing."

The "no border" rule prevents the dashboard-of-cards feeling that most wellness apps fall into. The tonal layering creates depth without noise.

The `tertiary` cyan (vs hot pink) is a deliberate brand choice — solfeggio is calmer, more contemplative, not edgy or romantic. Blue = focus; cyan = highlight; warm off-white = human.

---

© 2026 Rulio Studio
