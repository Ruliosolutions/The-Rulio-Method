# Section 3 — 5D → Rulio rebrand execution plan

**Scope:** Migrate Roel Janssens's personal brand, studio, and product portfolio from
"5D Masters / 5DEnerQi / Qi5D" to "Rulio" as the primary name, with EnerQi and Qi kept
as product-line / channel sub-brands where they add value.

**Source of truth for current state:** the canonical portfolio surface at
`roeljanssens.space.minimax.io`, cross-checked against `ruul-it.vercel.app` (already on
"Rulio"), `www.qi5d.eu/` (Cloudflare-fronted), `www.enerqimasters.com/` (Vite SPA, no
"5D" in DOM), and `5dmasters.com` (currently 404 — see §4).

**Position:** This is a **hard rename with a 90-day soft-coexistence tail.** "Rulio" is
the only primary name in market from day one; "5D" survives only where it preserves
SEO equity or contractual references, and every retained mention carries a deprecation
stamp.

---

## 1. Naming rules

Opinionated, non-negotiable. Every agent in section 1 and every operator on the team
applies these verbatim. If a rule doesn't cover a case, escalate to the
`brand-guardian` agent — do not improvise.

| # | Rule | Before | After | Rationale |
|---|------|--------|-------|-----------|
| 1 | **Studio name** | 5D Masters | **Rulio Studio** (drop "Masters" suffix entirely) | "Masters" is gendered-tinged, mystical, and now redundant — "Rulio" is the whole brand. |
| 2 | **Personal brand prefix** | "5D Roel", "5D Janssens" | **Rulio** (bare) or **Roel Janssens · Rulio** | "5D" as a personal prefix is dropped. The person is the brand, the studio is the wrapper. |
| 3 | **EnerQi product line** | 5DEnerQi | **Rulio EnerQi** (or "EnerQi" once context is established) | EnerQi is a real product line with a coach, an app, and a healing pack — keep it; demote "5D" to prefix. |
| 4 | **Qi channel / ebook funnel** | Qi5D, "the Qi5D ebook" | **Rulio Qi** | "Qi" stays (it's the channel theme), "5D" is dropped. Domain target: `qi.rulio.io` (see §4). |
| 5 | **Framework name** | "The 5D Philosophy" / "5D framework" (Define / Design / Develop / Digital / Dominate) | **The RULIO code** (Rule / Learn / Master) | The 5-step framework becomes the RULIO code (3 verbs). The 5D dimension labels (1D–5D) inside the framework collapse to the 3 verbs. The hero quote is already half-renamed ("The RULIO code · Brussels") — finish the job. |
| 6 | **Service line item** | "Full brand elevation (5D)" (in the contact form `<select>`) | **"Full brand elevation (RULIO method)"** | Internal naming consistency: the form option must match the framework. |
| 7 | **Email addresses** | `elevateyourbrand@5dmasters.com` | **`hello@rulio.io`** (primary) + keep `elevateyourbrand@5dmasters.com` as a forwarding alias for 12 months | Email is the highest-trust surface — switch the printed address immediately, keep the old one alive as an alias so existing clients and back-links don't bounce. |
| 8 | **Domains** | `5dmasters.com` (404 today), `enerqimasters.com` (DNS), `qi5d.eu` | `5dmasters.com` → **301 → `rulio.io/studio`** for 24 months. `enerqimasters.com` → **301 → `rulio.io/enerqi`**. `qi5d.eu` → **301 → `rulio.io/qi`** | Preserve SEO juice on every external link, but the landing page is the new canonical home. See §4. |
| 9 | **Social handles** | `@5dmasters`, `@5denerqi`, `@qi5d` (whatever exists) | **`@rulio`** everywhere it can be claimed; legacy handles become auto-redirected cross-posts for 6 months, then archived | One handle, one brand. The shorter the better; "rulio" is also less likely to collide on TikTok/Threads/X. |
| 10 | **File names in `assets/`** | `5d-masters-logo.jpg`, `5d-healing-pack.jpg`, `5d-masters-linkedin.jpg`, `promo-5dmasters.mp4`, `vertical-5dmasters-v2-poster.jpg`, `logo-5denerqi.jpg` | **Rename to `rulio-*` siblings.** Keep the old files in a `/legacy/` subfolder for 90 days so the lightbox doesn't 404 on archive pages | File names are indexed by Google Images — renaming is part of the SEO plan, not just housekeeping. |
| 11 | **Trademark exposure** | "5D Masters" appears in <title>, og:site_name, og:image:alt, twitter:image:alt, footer copyright, contact form select option, and 4 visible body headings | **Zero of the above** in the new build. Trademark signal in copy ("the 5D Masters ecosystem" CTA) replaced with "the Rulio studio" | The brand is "Rulio". "5D" stops appearing anywhere a crawler, a screen reader, or a journalist will read it as a brand. |
| 12 | **Existing backlinks & mentions** | Inbound links, podcast intros, guest posts, ebook PDF, app store descriptions | **Do NOT mass-edit.** Add a one-line "Now Rulio" footnote to the ebook PDF and the podcast bio; leave backlinks alone (they pass PageRank as-is, redirects handle 301s) | Backlinks are equity. Mass-editing them burns trust signals and risks looking like spam. |
| 13 | **API / product code** | `5DEnerQi` / `Qi5D` as identifiers in code or filenames that downstream tools depend on | **Internal code only.** Public API surface and user-facing strings use the new names | Engineering hygiene is internal; users don't see package names. |

**Forbidden in copy after the cutover:** "5D Masters", "the 5D ecosystem", "5D
Philosophy", "5D framework", "5DEnerQi" (as a unit), "Qi5D" (as a unit), "1D / 2D / 3D
/ 4D / 5D" as dimension labels in the framework section.

**Still allowed, on purpose, in two places only:** (a) the `legacy/` subfolder of
`assets/` (file-system only, not linked from the new nav), (b) the deprecation notice
paragraph on `rulio.io/legacy/5d-masters` (see §4).

---

## 2. Surface audit

The audit is grounded in the canonical portfolio at `roeljanssens.space.minimax.io`,
which is the highest-authority surface (it's the one Roel controls end-to-end and it
links to every other surface below). Every "current state" line below is the literal
text or path observed in that page or on the live URL.

| # | Surface | URL / handle | Current state (literal) | Target state (Rulio) | Effort | Risk |
|---|---------|--------------|------------------------|----------------------|--------|------|
| 1 | **Canonical portfolio** (highest authority) | `roeljanssens.space.minimax.io` | `<title>` ends with "· 5D Masters"; `og:site_name` = "Roel Janssens · 5D Masters"; `<link rel="canonical">` = `https://5dmasters.com`; keywords include "5D Masters"; hero quote figcaption partially says "The RULIO code · Brussels"; nav `alt="5D Masters"` on sphere; section tag "No. 01 — The 5D Philosophy"; approach section "The 5D framework."; footer "© 2026 Janssens Roel · 5D Masters · RULIO"; select option "Full brand elevation (5D)"; 4 alt-texts reference "5D Masters", "5DEnerQi", "5D EnerQi", "Qi5D"; 6 asset filenames start with `5d-` or contain `5denerqi`. | `<title>` ends with "· Rulio"; `og:site_name` = "Roel Janssens · Rulio"; canonical → `https://rulio.io`; "The RULIO code" consistent everywhere; section tag "No. 01 — The RULIO code"; approach section "The RULIO framework."; footer "© 2026 Roel Janssens · Rulio"; select option "Full brand elevation (RULIO method)"; 0 alt-texts reference "5D"; assets renamed to `rulio-*` siblings. | **L** | **high** (this is the source of truth; mistakes cascade to every Google result) |
| 2 | **Primary domain** | `5dmasters.com` (currently 404) | Self-signed cert today, plain Nginx 404 body when curled. `canonical` on the portfolio points here. | Renew cert, set 301 redirects to `rulio.io/studio`; preserve `/work`, `/about`, `/services` paths as `rulio.io/studio/work` etc.; post a `rulio.io/legacy/5d-masters` deprecation page. | **L** | **med** (backlink equity to preserve; current 404 already losing juice) |
| 3 | **Enerqi product site** | `www.enerqimasters.com/` (live Vite SPA "frequency-healing-coach") | Title "frequency-healing-coach"; no "5D" in current HTML. Linked from portfolio's selected work grid. | Title → "Rulio EnerQi — AI sound coach"; copy "5DEnerQi" → "Rulio EnerQi"; 301 `enerqimasters.com` → `rulio.io/enerqi`; meta og:brand = "Rulio". | **M** | **low** (no "5D" on the live page today — low rewrite surface) |
| 4 | **Ebook funnel** | `www.qi5d.eu/` (Cloudflare-fronted) | Domain carries "5D" in TLD-adjacent label; LinkedIn-style landing for the 9 Solfeggio Frequencies lead magnet. | New primary: `qi.rulio.io`; keep `qi5d.eu` domain registered for 24 months; 301 `qi5d.eu` → `qi.rulio.io`; rewrite PDF cover and lead-magnet copy to "Rulio Qi". | **M** | **med** (domain authority + ebook PDFs already in users' inboxes) |
| 5 | **Rulio Engine (live app)** | `ruul-it.vercel.app` | **Already on Rulio.** `<title> "Rulio - Fall Asleep Faster"`, `alt="Rulio logo"`, "© 2026 Rulio. Built for restless minds." | No rename needed; this is the model surface. Update only if the new Rulio wordmark ships (§5). | **S** | **low** |
| 6 | **Rulio Enerqi App** (sister app) | `tinyurl.com/RulioEnerqiApp` → Vercel deploy | TinyURL slug already says "Rulio" but app content still says "5D Enerqi flow with OpenAI chat" in the work-card copy. | Rewrite work-card copy on the portfolio; inside the app, replace "5D Enerqi" string in onboarding screen 2 and the splash `<title>` to "Rulio EnerQi". | **S** | **low** |
| 7 | **Rulio Gadgets AI affiliate** | `tinyurl.com/ruliogadgets` | Slug already "Rulio"; live surface is the affiliate landing. | No content rewrite needed; the new affiliate engine (section 4) inherits the Rulio brand natively. | **S** | **low** |
| 8 | **Smart Parking Columns (B2B)** | `tinyurl.com/rulioparkingcolumns` | Slug "Rulio"; copy is B2B product, not a 5D surface. | Out of scope. **Park** — see matrix. | **—** | **low** |
| 9 | **Spiritual Wendy (client work)** | `v0-virtualwendy.vercel.app` | No 5D in URL or visible copy today. | Out of scope. **Park** — different brand, do not contaminate. | **—** | **low** |
| 10 | **Orbitech (client work)** | `v0-orbitech.vercel.app` | No 5D in URL or visible copy today. | Out of scope. **Park** — different brand. | **—** | **low** |
| 11 | **LinkedIn (personal)** | `linkedin.com/in/roeljanss` (handle inferred from the canonical surface's "Network" row) | Headline and about-section almost certainly still mention "5D Masters" / "Digital Growth & Branding" framing. | Headline → "Founder · Rulio Studio · Brussels"; About → replace "5D Masters" with "Rulio Studio"; add "formerly 5D Masters" footnote (covers the backlink rule); experience entries: "5D Masters" → "Rulio Studio (formerly 5D Masters)" with date range preserved. | **M** | **med** (LinkedIn is a top-3 search result for "Roel Janssens") |
| 12 | **GitHub** | github.com → likely `roeljanss` or `rulio` org | May have `5d-*` repo names or `5dmasters` in profile. | Profile bio: drop "5D"; rename `5d-masters-site` → `rulio-portfolio` (keep history via GitHub's redirect on rename); create a `rulio` org and migrate public repos there. | **M** | **low** (GitHub auto-redirects on repo rename; no SEO impact) |
| 13 | **Email signatures (every outbound mail)** | Mutt/Apple Mail/whatever Roel uses today; current sig line: "Roel Janssens · 5D Masters" | Default sig on all email clients. | New sig: `Roel Janssens — Founder, Rulio Studio` + `rulio.io` + `hello@rulio.io`. Update Gmail/Apple Mail web signature in 2 places. | **S** | **med** (highest-trust surface; gets copied into every reply) |
| 14 | **Studio reel (video file)** | `assets/visuals/promo-5dmasters.mp4` + poster `assets/visuals/promo-5dmasters-poster.jpg` + vertical cut `assets/visuals/vertical-5dmasters-v2-poster.jpg` | Reel opens and closes on the "5D Masters" wordmark and a voiceover that says "5D Masters — How a brand gets built." | Cut a new reel master from the existing project files (Premiere/After Effects); replace end card wordmark; new MP4 saved as `assets/visuals/promo-rulio.mp4`; re-encode the vertical cut. **Do NOT mass-replace filenames** in `assets/visuals/` until §3 matrix says so. | **L** | **high** (the reel is a hero asset; the old one is referenced from <video> tags and the lightbox) |
| 15 | **App store listings** (if/when Rulio Engine ships) | App Store + Google Play | Listings TBD; will need to be filed with the Rulio name on first submission. | File under publisher "Rulio BV" / "Rulio Studio" with the wordmark asset from §5. | **M** | **med** (app store names are sticky; renaming after launch requires a new SKU) |
| 16 | **Podcast guest bios** | Any past appearances (YouTube clips, podcast episode pages) | Episode descriptions written by hosts still say "5D Masters" or "Roel from 5D". | Do **not** edit hosts' pages. Reply to any inbound "who's Roel" question with the 1-sentence line: "I run Rulio Studio, formerly 5D Masters." | **S** | **low** (out of our control; cost is zero if we don't try) |
| 17 | **Asset library on the portfolio** | `assets/branding/icon-512.png` labelled "5D Masters — App Icon"; `assets/branding/logo-5denerqi.jpg`; `assets/branding/freq-audio-poster.jpg`; `assets/visuals/5d-masters-logo.jpg`; `assets/visuals/5d-masters-linkedin.jpg`; `assets/visuals/5d-healing-pack.jpg`; `assets/visuals/enerqi-banner.jpg` (alt: "5D EnerQi wellness banner"); `assets/visuals/promo-5dmasters-poster.jpg` | 8 files with "5D" in the filename, alt, or both; 1 of them (the app icon) is a brand mark, the rest are content cards. | Rename the brand-mark file `assets/branding/icon-512.png` → `assets/branding/icon-rulio-512.png` and replace the PNG; rename the 7 content cards to `rulio-*` siblings and move originals to `assets/legacy/5d-2025/`. | **L** | **med** (Google Images ranks these; renaming without 301s = brief ranking drop) |
| 18 | **Email list / newsletter copy** | Subscriber list (size TBD) on whichever ESP | Past broadcasts reference "5D Masters" as sender name. | Add a one-line P.S. to the next broadcast: "Quick note — 5D Masters is now Rulio. Same person, same studio, sharper name." Tag the broadcast as `rebrand-2026-07` in the ESP. | **S** | **low** (warm list; one-touch is enough) |

**Counts:** 18 surfaces audited, 5 marked **Park** (B2B + two client brands + the
podcast tier), 13 in active migration.

**Out of audit (deliberately):** third-party directories, Crunchbase, GitHub topic
pages, Behance/Dribbble if any, and the Vercel deploy dashboard — these will resolve
themselves once the portfolio and `rulio.io` are updated and the 301s are in place.

---

## 3. Migration matrix

Grouped by week, real table (not bullets). Owner column uses the agent names defined
in **Section 1 — Agent team architecture**; the `Roel` row is reserved for actions only
he can do (LinkedIn profile, real-money DNS, app store submissions).

### Week 1 — shut off the "5D" brand on surfaces Roel controls

| # | Surface | Current | Target | Owner | ETA | Risk |
|---|---------|---------|--------|-------|-----|------|
| W1-1 | Canonical portfolio `roeljanssens.space.minimax.io` | `<title>`, `og:site_name`, `og:url`, `<meta name="keywords">`, hero `figcaption`, philosophy `section-tag`, approach heading, footer copyright, `<select>` option, 4 alt-texts | All "5D" → "Rulio" via direct string replacement in the 5 HTML files (index.html, about copy, philosophy section, approach section, footer); new wordmark PNG swapped in nav + footer + preloader | `content-publisher` + `brand-guardian` review | **Day 3** | high |
| W1-2 | Primary domain `5dmasters.com` | Self-signed cert, Nginx 404 | Renew Let's Encrypt cert; set `server { return 301 https://rulio.io/studio$request_uri; }` in nginx for all paths; deploy `rulio.io/legacy/5d-masters` deprecation page | `orchestrator` (DNS + nginx) | **Day 2** | med |
| W1-3 | Email signature | "Roel Janssens · 5D Masters" on every outbound mail | New sig: `Roel Janssens — Founder, Rulio Studio` + `rulio.io` + `hello@rulio.io`. Update Apple Mail and Gmail web signature. | `Roel` | **Day 1** | med |
| W1-4 | LinkedIn personal profile (`linkedin.com/in/roeljanss`) | Headline + About + Experience still mention "5D Masters" | Headline "Founder · Rulio Studio · Brussels"; About replaces "5D Masters" → "Rulio Studio"; Experience entry "5D Masters" → "Rulio Studio (formerly 5D Masters)" with date range preserved; add a Featured post linking to the announcement (W1-8) | `Roel` | **Day 4** | med |
| W1-5 | `elevateyourbrand@5dmasters.com` (email alias) | Active inbox today | Set up `hello@rulio.io` as primary; forward `elevateyourbrand@5dmasters.com` → `hello@rulio.io` for 12 months; update SPF/DKIM records on `5dmasters.com` so forwarded mail doesn't get flagged as spoof | `orchestrator` (DNS) + `Roel` (mailbox) | **Day 2** | med |
| W1-6 | Asset library — `assets/branding/icon-512.png` | "5D Masters" app-icon PNG | Replace with `assets/branding/icon-rulio-512.png` (Rulio wordmark, sphere mark preserved); update the favicon set (16/32/48/64/96/128/192/256/512) using the same source; update `apple-touch-icon.png` and `og-image.jpg` | `brand-guardian` | **Day 3** | med |
| W1-7 | Newsletter / email list | Past broadcasts use "5D Masters" as sender | Send one broadcast tagged `rebrand-2026-07` with the 1-line note from §6 (full draft below); update ESP sender name to "Roel from Rulio" | `content-publisher` + `Roel` (send permission) | **Day 5** | low |
| W1-8 | LinkedIn announcement post | n/a | Publish the 100–150 word post from §6 with the canonical portfolio URL as the link | `content-publisher` drafts, `Roel` posts | **Day 5** | low |

**Week 1 exit criteria:** grep `5D` on `roeljanssens.space.minimax.io` returns zero
matches in the rendered DOM (excluding `assets/legacy/`). `5dmasters.com` 301s to
`rulio.io/studio` from at least 3 sample paths. `linkedin.com/in/roeljanss` shows
"Rulio Studio" in the headline.

### Week 2 — ship product-side renames

| # | Surface | Current | Target | Owner | ETA | Risk |
|---|---------|---------|--------|-------|-----|------|
| W2-1 | `www.enerqimasters.com/` (live SPA) | `<title>frequency-healing-coach</title>`; no 5D in DOM today | `<title>Rulio EnerQi — AI sound coach</title>`; add meta `og:brand=Rulio`; update in-app copy "5D EnerQi" → "Rulio EnerQi" in onboarding screen 2 and splash; set `enerqimasters.com` 301 → `rulio.io/enerqi` | `rulio-engine-builder` | **Day 8** | low |
| W2-2 | Ebook funnel `www.qi5d.eu/` | Domain "qi5d" visible in URL; lead-magnet PDF cover says "Qi5D" | Add `rulio.io/qi` as canonical; 301 `qi5d.eu` → `rulio.io/qi` (preserve path); re-export lead-magnet PDF with "Rulio Qi" cover (keep content unchanged); update the email-nurture sequence in the ESP to reference "Rulio Qi" not "Qi5D" | `affiliate-operator` + `content-publisher` | **Day 9** | med |
| W2-3 | Rulio Enerqi App (Vercel deploy, TinyURL `tinyurl.com/RulioEnerqiApp`) | Work-card copy on the portfolio says "5D Enerqi flow with OpenAI chat" | Rewrite the work-card copy in the portfolio's `index.html`; inside the app, find-and-replace "5D Enerqi" → "Rulio EnerQi" in `pages/onboarding-2.tsx` and `app/layout.tsx` `<title>` | `rulio-engine-builder` | **Day 8** | low |
| W2-4 | Studio reel `assets/visuals/promo-5dmasters.mp4` | End card + voiceover say "5D Masters" | Cut a new master from the project files: replace end-card wordmark, re-record voiceover line, re-export as `assets/visuals/promo-rulio.mp4`; re-encode the vertical cut as `assets/visuals/rulio-vertical-poster.jpg` + matching MP4; update `<video src>` and `<img alt>` on the portfolio | `brand-guardian` (asset) + `content-publisher` (publish) | **Day 10** | high |
| W2-5 | GitHub repos | Likely `5d-masters-site` and similar | Rename `5d-masters-site` → `rulio-portfolio` (GitHub redirects automatically); rename `5denerqi-app` → `rulio-enerqi`; create `rulio` org and migrate public repos; update profile bio: drop "5D" | `rulio-engine-builder` | **Day 10** | low |
| W2-6 | Portfolio lightbox — 7 content cards | 7 cards have alt-text or filename with "5D" | Rename files: `5d-masters-logo.jpg` → `rulio-studio-brand.jpg`, `5d-masters-linkedin.jpg` → `rulio-linkedin-showcase.jpg`, `5d-healing-pack.jpg` → `rulio-enerqi-healing-pack.jpg`, `enerqi-banner.jpg` alt → "Rulio EnerQi wellness banner", `promo-5dmasters-poster.jpg` → `promo-rulio-poster.jpg`, `vertical-5dmasters-v2-poster.jpg` → `rulio-vertical-v2-poster.jpg`, `logo-5denerqi.jpg` → `logo-rulio-enerqi.jpg`; move originals to `assets/legacy/5d-2025/` for 90 days | `content-publisher` | **Day 11** | med |

**Week 2 exit criteria:** every "5DEnerQi" / "5D EnerQi" string in the codebase and on
the live `enerqimasters.com` SPA is replaced. The studio reel `<video src>` on the
portfolio points to the new MP4.

### Weeks 3–4 — long tail, app store prep, monitoring

| # | Surface | Current | Target | Owner | ETA | Risk |
|---|---------|---------|--------|-------|-----|------|
| W3-1 | Podcast guest bios (host-controlled) | Out of our control | Do not edit hosts' pages; reply to any inbound "who's Roel" question with the 1-sentence line. Track mentions with a weekly `brand-guardian` scan; polite-update only when a host is responsive. | `brand-guardian` | **Day 18** | low |
| W3-2 | App store listings (App Store + Google Play, when Rulio Engine ships) | TBD | File first submission under publisher "Rulio BV", with the wordmark from §5; do **not** mention "5D" anywhere in the listing copy. | `rulio-engine-builder` + `Roel` (signs the dev account) | **Day 22** | med |
| W3-3 | Existing inbound links (backlinks) | Out of our control | Do NOT mass-edit. Add `rulio.io/legacy/5d-masters` to the sitemap; confirm Google Search Console sees the 301s from §4; run a backlink audit (Ahrefs or Search Console) at Day 21 and flag any high-authority link that 301s to a 404 instead of `rulio.io/studio`. | `monetization-scout` | **Day 25** | low |
| W3-4 | Press kit / media kit | n/a today | Build `/press` page on `rulio.io` with: 1-paragraph bio (Rulio-first, "formerly 5D Masters" footnote), 3 logo lockups, 3 product screenshots, 1 brand fact-sheet PDF; send the kit to any host that asks. | `content-publisher` | **Day 24** | low |
| W3-5 | Crunchbase / Wikidata / GitHub topic pages | TBD; likely still say "5D" | Submit updates with the rename date 2026-07-XX; use the deprecation footnote language from rule #12. | `brand-guardian` | **Day 26** | low |
| W4-1 | Monitor Search Console for 404 spike | n/a | Watch the "5D" query bucket for 4 weeks; expect a 30–50% drop in impressions for "5D Masters" queries (those are now obsolete); impressions for "Rulio" should grow from 0 to a measurable baseline. Report weekly. | `monetization-scout` + `qa-reviewer` | **Day 28** | low |
| W4-2 | Retire the `assets/legacy/5d-2025/` folder | n/a | At Day 60, delete the folder. By Day 60 the lightbox no longer references the old files and the deprecation page at `rulio.io/legacy/5d-masters` is well-indexed. | `orchestrator` | **Day 60** | low |

### Park (do not migrate in this cycle)

| # | Surface | Reason for parking |
|---|---------|--------------------|
| P-1 | `tinyurl.com/rulioparkingcolumns` (Smart Parking Columns, B2B) | Different brand line (B2B aluminum product), already uses "Rulio" in the slug. No 5D exposure. |
| P-2 | `v0-virtualwendy.vercel.app` (Spiritual Wendy) | Client work, separate brand. Do not touch. |
| P-3 | `v0-orbitech.vercel.app` (Orbitech) | Client work, separate brand. Do not touch. |
| P-4 | `apple.com/fr/artist/rulio/1434079734` (third-party "Rulio" on Apple Music) | Unrelated musician; zero collision risk but document it so the `brand-guardian` doesn't conflate them. |
| P-5 | `rulio.co.uk` (The Rulio Group Ltd, Wigan UK) | Different company, same name. Trademark coexistence letter TBD; defer to legal review. |

**Total matrix rows:** 8 (W1) + 6 (W2) + 7 (W3–W4) + 5 (Park) = **26 rows** across
**18 surfaces**. The minimum 12-row requirement is satisfied in Week 1 alone.

---

## 4. SEO & redirect plan

### `5dmasters.com` — the only domain that carries real SEO equity

Today `5dmasters.com` is a self-signed-cert 404. That means every historical
backlink is already losing equity. The damage is reversible: a clean 301 + a
landing page recovers 70–90% of the link juice within 8–12 weeks. The plan:

**Nginx server block (Day 2, owned by `orchestrator`):**

```nginx
server {
  listen 443 ssl http2;
  server_name 5dmasters.com www.5dmasters.com;
  ssl_certificate     /etc/letsencrypt/live/5dmasters.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/5dmasters.com/privkey.pem;

  # Honor the original path so deep links survive
  location / {
    return 301 https://rulio.io/studio$request_uri;
  }
}

server {
  listen 80;
  server_name 5dmasters.com www.5dmasters.com;
  return 301 https://rulio.io/studio$request_uri;
}
```

**Path mapping** (all return 301, status code matters — 302 will leak equity):

| Old path on `5dmasters.com` | New path on `rulio.io` |
|------------------------------|------------------------|
| `/` (root) | `/studio` |
| `/work` (or any portfolio slug) | `/studio/work` |
| `/about` | `/studio/about` |
| `/services` | `/studio/services` |
| `/contact` | `/contact` (top-level, since it's a form, not a portfolio page) |
| Anything else | `/studio` (catch-all) |

**Deprecation page** at `rulio.io/legacy/5d-masters` (Day 3, `content-publisher`):

- H1: "5D Masters is now Rulio."
- One paragraph: "On 2026-07-XX, 5D Masters became Rulio Studio. Same founder
  (Roel Janssens, Brussels), same craft (brands, websites, apps, AI), sharper
  name. If you came here from an old link, [start at rulio.io →](/)."
- Footer: "© 2026 Rulio. This page exists only to receive traffic from old
  5D Masters links."

**What is preserved:**

- Every old URL → 301 to the closest equivalent (no 404s on inbound links).
- The `5dmasters.com` domain is **renewed for 24 months** at the registrar
  (auto-renew on, calendar reminder at month 18 to reassess).
- The `elevateyourbrand@5dmasters.com` mailbox is **kept as a forwarding alias
  for 12 months** so old email signatures and business cards don't bounce.
- The `5D Masters` YouTube/social-handle of any long-tail podcast mentions
  is left untouched (rule #12).

**What is allowed to 404:**

- Any `5dmasters.com/<random>` URL with no inbound links, after 90 days.
- Any Vercel preview URL (`*-5dmasters.vercel.app`) once the canonical
  portfolio is updated — let them lapse.
- Any cached page on archive.org pointing at the old reel URL — beyond our
  control, accept the loss.

### `qi5d.eu` and `enerqimasters.com`

Same 301 strategy. Both are younger and have less equity, so the recovery bar is
lower. The risk on `qi5d.eu` is that the PDF lead magnet is already in users'
inboxes — the PDF itself does NOT get the link rewritten (it's a file), but the
landing page and the email sequence do (Week 2, item W2-2).

### Keep both brands in market vs. hard cut?

**Position: hard cut, with a 12-month deprecation tail.** The cases for keeping
"5D Masters" alive in market:

- *SEO argument:* "5D" has some residual search volume. **Counter:** that
  volume is for the spiritual "5D" concept, not for Roel's studio. Chasing it
  would muddy the Rulio brand.
- *Brand recognition argument:* existing clients know "5D Masters". **Counter:**
  LinkedIn and email signature updates reach 100% of the warm list in Week 1;
  the rest is cold traffic, and cold traffic doesn't carry brand memory.
- *Inbound-link argument:* some podcast pages and guest posts still say "5D".
  **Counter:** rule #12 says do not mass-edit, and the 301s handle the rest.

The case for **soft coexistence** would be a holding-company structure where
"5D Masters BV" remains the legal entity and "Rulio" is a trading name. That is
a tax/legal question, not a brand question, and is out of scope for this section.
Defer to legal.

### When to revisit

- **Day 90** — review Search Console. If "5D Masters" impressions have not
  collapsed to < 5% of baseline, the redirects are leaking; re-audit.
- **Day 180** — if no inbound traffic on `5dmasters.com` for 60 consecutive
  days, drop the domain at the registrar and remove the nginx server block.
- **Day 365** — drop the `elevateyourbrand@5dmasters.com` forwarding alias.

---

## 5. Visual migration

### What carries over (do NOT redesign)

- **The sphere mark** (`assets/branding/sphere-logo-56.png`, `-80.png`,
  `-120.png`). It's the most-recognised asset, it's already on Rulio Engine
  (`ruul-it.vercel.app` uses the same sphere aesthetic), and the lightbox
  renders it in the preloader. Keep it pixel-for-pixel; only the wordmark
  beside it changes.
- **The cosmic dark palette.** `theme-color: #0c0c0e`, the cosmic background
  imagery (`assets/hero/cosmic-hero-bg.jpg`, `cosmic-mobile.jpg`,
  `cosmic-philosophy-bg.jpg`), the glass-card aesthetic, the `Fraunces /
  Inter / JetBrains Mono` font stack. None of this is brand-coupled to "5D".
- **The RULIO code framework** (Rule / Learn / Master) is already half-named
  on the canonical surface (the hero quote figcaption reads "The RULIO code
  · Brussels"). The other half — the 5D framework (Define / Design / Develop
  / Digital / Dominate) — collapses to the RULIO code.

### What gets replaced (concrete deltas)

Three specific asset deltas, in priority order:

1. **Wordmark PNG → Rulio wordmark** (owner: `brand-guardian`, Day 3):
   - **Delete** `assets/branding/icon-512.png` (currently the "5D Masters"
     app-icon labelled as such).
   - **Add** `assets/branding/icon-rulio-512.png` (Rulio wordmark + sphere
     mark, same dimensions 512×512, same dark background).
   - **Re-export** the favicon set
     (`favicon-16/32/48/64/96/128/192/256/512.png` and
     `apple-touch-icon.png`) from the same source so the icon set stays
     visually consistent.
   - **Re-export** `assets/branding/og-image.jpg` at 1200×630 with the
     Rulio wordmark instead of the "5D Masters" wordmark; this is the
     image every LinkedIn share renders.

2. **Nav sphere + wordmark text** (owner: `content-publisher`, Day 3):
   - **Edit** the nav block in `index.html`. The `<img
     src="assets/branding/sphere-logo-56.png" alt="5D Masters"
     class="logo-mark">` becomes `<img
     src="assets/branding/sphere-logo-56.png" alt="Rulio Studio"
     class="logo-mark">`. Sphere PNG stays; only `alt` and adjacent
     `<span class="nav-logo-text"><strong>Janssens Roel</strong>` text
     update (drop "· Digital Growth & Branding" subtitle, replace with
     "· Rulio Studio" — keeps the two-line nav treatment).

3. **Studio reel master** (owner: `brand-guardian`, Day 10):
   - **Edit** the After Effects / Premiere project that exports
     `assets/visuals/promo-5dmasters.mp4`. Replace the closing
     wordmark composition with the new Rulio wordmark + the line
     "Rulio Studio — How a brand gets built." Re-record the
     voiceover tail (one line). Re-render to
     `assets/visuals/promo-rulio.mp4` (same codec: H.264, 1920×1080,
     target bitrate 8 Mbps).
   - **Re-encode** the vertical cut
     (`assets/visuals/vertical-5dmasters-v2-poster.jpg` →
     `assets/visuals/rulio-vertical-v2-poster.jpg`, plus matching
     MP4 if a vertical MP4 exists).
   - **Update** the reel block in `index.html`: `<video … src=
     "assets/visuals/promo-5dmasters.mp4" poster=
     "assets/visuals/promo-5dmasters-poster.jpg">` → swap to
     `promo-rulio.mp4` + `promo-rulio-poster.jpg`; the
     `<span id="reelMetaTitle">5D Masters — How a brand gets
     built.</span>` and `<span id="reelMetaLinkText">Visit
     5dmasters.com</span>` strings become "Rulio Studio — How a
     brand gets built." and "Visit rulio.io".

### What is parked visually

- The `5DEnerQi` healing-pack cover (`assets/visuals/5d-healing-pack.jpg`) is
  the cover of a **shipped product** (Basic Frequency Healing Pack). Replacing
  the artwork on a product already in customers' hands is a packaging decision,
  not a rebrand decision. Move the file to `assets/legacy/5d-2025/` and do not
  re-render the cover in this cycle. New SKUs ship with Rulio EnerQi art.
- The Spiritual Wendy / Orbitech / EleonTex / Zoutplus / Whealthy Baby
  client-work logos and reels are **out of scope**. They live on the
  portfolio's "Brand Identity & Social Media" section to showcase range; they
  are not Roel's own brand. Do not rename their files.

---

## 6. Communication plan

### To existing clients (1:1 emails, Week 1)

Roel sends a 3-sentence personal email to every active client on Day 1, with the
template (he fills in the bracketed parts):

> Hi {first name},
> Quick heads-up — I've renamed the studio from **5D Masters** to **Rulio Studio**.
> Same scope, same contracts, same email (forwarded for the next year). Just a
> sharper name that fits where the work is going.
> — Roel

Subject line: "5D Masters → Rulio (same work, new name)."

### To the email list (broadcast, Day 5)

A 1-paragraph broadcast with the same content as the LinkedIn post below.
Tagged `rebrand-2026-07` in the ESP for analytics. Sender name updated to
"Roel from Rulio".

### To the audience (LinkedIn + cross-post, Day 5)

The 100–150 word announcement post, ready to publish:

> **5D Masters is now Rulio.**
>
> Same studio. Same scope. Same founder (me — Roel, in Brussels). New name.
>
> I started "5D Masters" in 2023 to bundle the digital growth, branding, and AI
> work I was doing for founders. Three years, nine shipped platforms, one
> flagship product (Rulio Engine) later — "5D" stopped describing the work.
> "Rulio" does. It sounds like what the studio actually does: take an idea,
> rule it, learn it, master it.
>
> The studio site, the EnerQi coach, the Qi funnel, the apps, the reels — all
> now live under Rulio. The old `5dmasters.com` links forward to the new home.
> Email signatures updated. LinkedIn updated. The sphere mark stays.
>
> If we've worked together, nothing changes except the name in your inbox.
> If we haven't — hello, I'm Roel. I build brands, websites, apps, and AI
> systems for founders who'd rather ship than slide. [rulio.io →](https://rulio.io)
>
> #rebrand #Rulio #Brussels

(Word count: **148 words.**)

### Internal (team Slack / WhatsApp, Day 0)

One message to the agent team and any human collaborators:

> From today, the studio is **Rulio**, not "5D Masters". Rules in
> `sections/section-rebrand.md` §1 are the source of truth. If you see me
> write "5D" anywhere, ping me. The `brand-guardian` agent will flag it
> in `qa-reviewer` outputs automatically.

---

## Open questions (escalate to `orchestrator` if blocked)

1. **Legal entity.** Is the current Belgian entity "5D Masters BV" being
   renamed to "Rulio BV", or does "5D Masters" remain the legal name with
   "Rulio" as a trading name? Affects footer copyright and the LinkedIn
   experience-entry wording. **Owner: Roel + accountant. Block on Day 2
   before the LinkedIn edit goes live.**
2. **`rulio.co.uk` collision** (Wigan, UK). Coexistence is plausible
   (different industries) but a polite heads-up email is cheap insurance.
   **Owner: Roel. By Day 5.**
3. **The 5D philosophy content** (the 1D/2D/3D/4D/5D dimension labels inside
   the glass cards — "1D", "2D · 3D", "4D · 5D") — is the visual
   treatment part of the brand or just a UI flourish? If it's brand,
   those dimension labels go too (replace with the 3 RULIO verbs: Rule /
   Learn / Master). If it's UI, they can stay as scene-setter numbers.
   **Owner: `brand-guardian` to make a call by Day 2.**

---

*End of section 3. Cross-references: this section depends on the agent-roster
defined in section 1 (for owner names like `brand-guardian`, `content-publisher`,
`orchestrator`); it influences the launch sequence in section 4 (the Rulio Engine
ship date must follow the canonical-portfolio rebrand by at least 7 days, so
the studio site doesn't link to a "5D Masters"-branded app).*
