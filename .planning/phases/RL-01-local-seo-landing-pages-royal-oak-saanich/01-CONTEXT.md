# Phase 1: Local SEO Landing Pages — Royal Oak & Saanich - Context

**Gathered:** 2026-06-26
**Status:** Ready for planning
**Source:** Captured from working session with the user (informal discuss-phase — decisions already settled in conversation)

<domain>
## Phase Boundary

Build two new local-SEO landing pages on the existing Next.js (App Router, `output: "export"` static) site, deployed to royallook.ca:
- `/royal-oak-barber-shop` — H1 "Royal Oak Barber Shop"
- `/beard-trim-saanich` — H1 "Beard Trim in Saanich"

Both are driven by ONE reusable, data-driven landing-page component so future area pages are cheap to add. Each page carries the full local-SEO checklist: unique intro copy, emphasized services pulled from config, local landmarks, embedded Google Map, in-page NAP + call CTAs, per-page canonical, and Service/LocalBusiness JSON-LD. Both routes get added to the sitemap and at least one internal link so they aren't orphaned.

**In scope:** the two pages, the reusable component + its data, a `Royal Oak Transit Exchange` landmark added to config, sitemap entries, per-page canonical + JSON-LD, internal linking, and a passing static-export build.

**Out of scope (do NOT do in this phase):**
- A Broadmead Village landing page — the homepage already owns "Barber in Broadmead Village" (cannibalization). Locked decision.
- The FAQ page (Phase 2) and any GBP work (Phase 3).
- Renaming services in config (e.g., "Trim Beard" → "Beard Trim") — that's proposed in Phase 3. Landing pages MAY display friendlier labels without renaming config keys.
- Online booking, new design system, redesigns.
</domain>

<decisions>
## Implementation Decisions (locked)

### Routes & files
- App Router folders: `src/app/royal-oak-barber-shop/page.tsx` and `src/app/beard-trim-saanich/page.tsx`. Slugs are final.
- Reusable approach: a single presentational component (e.g. `src/components/LandingPage.tsx`) fed by a typed data array (e.g. `src/lib/landing.ts` or an addition to `src/lib/config.ts`). Each page file passes/selects its data entry and exports its own `metadata`. Planner picks exact file locations, consistent with existing `src/lib/` (data) + `src/components/` (UI) split.

### Page content
- **Royal Oak page:** emphasize **Skin Fade** + **Kids' cuts**; reference **Royal Oak Transit Exchange** and Broadmead Village Shopping Centre; unique intro ≥150 words.
- **Saanich page:** emphasize **Beard Trim** + **Hot-Towel / Straight-Razor Shave**; reference Saanich / Broadmead / Royal Oak; unique intro ≥150 words.
- Intros must be genuinely unique — no copy shared between the two pages or with the homepage (SEO-03). Draw tone from the existing `SERVICE_DETAILS` copy in `services/page.tsx`.

### Reuse existing building blocks
- Map: `SHOP.googleMapsEmbed` (same iframe pattern as `location/page.tsx` / `LocationPreview.tsx`).
- NAP: sitewide `Footer` already renders it; ALSO include an in-page address/hours/CTA block (mirror `LocationPreview` `find-grid/find-map/find-info`).
- Call CTA: `tel:` link with a unique `data-call-location` attribute per page (e.g. `royal_oak_page_cta`, `saanich_beard_page_cta`) so GA4 call tracking keeps working (see `analytics.ts` / `Analytics.tsx`).
- Services/prices come from `SERVICES` / `SERVICE_HIGHLIGHTS` in config — no hardcoded price duplicates.

### SEO plumbing
- Each page exports `metadata` with a unique `title` + `description` and `alternates: { canonical: "/<slug>" }` (mirror `services/page.tsx` and `location/page.tsx`).
- Note: `layout.tsx` applies title template `%s | Royal Look Barber Shop`. So page `title: "Royal Oak Barber Shop"` renders as "Royal Oak Barber Shop | Royal Look Barber Shop" — do NOT double-brand in the page title.
- Structured data: emit JSON-LD per page. Prefer a `Service` list (each with `serviceType`, `areaServed`, and `provider` referencing the existing BarberShop node `@id: ${siteUrl}/#barbershop` from `layout.tsx`) and/or a `BreadcrumbList`. Do NOT emit a second full `BarberShop` node reusing the same `@id` (conflict). Researcher/planner to finalize the exact valid shape.
- Sitemap: add both routes to the manual array in `src/app/sitemap.ts` (priority ~0.8, monthly), matching the existing entries.

### Internal linking (no orphan pages)
- At least one internal link to each new page must exist (Footer and/or homepage location/areas section). Keep the header nav unchanged unless trivially clean. Exact placement is Claude's discretion, but orphaned pages are not acceptable.

### Config
- Add a `Royal Oak Transit Exchange` landmark reference usable by the Royal Oak page (extend `landmarks` or add a field). Keep the existing `landmarks` string intact.

### Design system / build
- Reuse existing classes: `section, container, section-head, eyebrow, serif, lede, card, btn-secondary, find-grid, find-map, find-info`. Add new global CSS only if necessary, following `globals.css` conventions.
- Pages must be fully static; `npm run build` (`output: "export"`) must succeed and include both new routes (SEO-08).

## Claude's Discretion
- Exact intro copy (unique, natural, locally specific, ≥150 words, not keyword-stuffed).
- Exact JSON-LD shape (Service list vs LocalBusiness reference) — pick what validates and avoids duplicate `@id`.
- File organization for the reusable component + data array.
- Internal-link placement specifics.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Config / data (source of truth)
- `src/lib/config.ts` — `SHOP` (NAP, hours, `googleMapsEmbed`, `coordinates`, `landmarks`, `areasServed`, `siteUrl`), `SERVICES`, `SERVICE_HIGHLIGHTS`.

### Patterns to mirror
- `src/app/location/page.tsx` — map embed + NAP + `alternates.canonical` + areas-served pattern.
- `src/app/services/page.tsx` — `metadata` export, `SERVICE_DETAILS` tone, design-class usage.
- `src/components/LocationPreview.tsx` — `find-grid/find-map/find-info` layout + `tel:` CTA with `data-call-location`.
- `src/app/layout.tsx` — sitewide `BarberShop` JSON-LD (`@id: ${siteUrl}/#barbershop`), title template, `metadataBase`.
- `src/components/Footer.tsx` — sitewide NAP + areasServed links (candidate internal-link host).
- `src/app/sitemap.ts` — manual route list to extend.
- `src/lib/analytics.ts` / `src/components/Analytics.tsx` — `data-call-location` call tracking.

### Planning docs
- `.planning/REQUIREMENTS.md` — SEO-01…SEO-08.
- `.planning/PROJECT.md` — decisions (homepage stays Broadmead; reusable component).
</canonical_refs>

<specifics>
## Specific Ideas
- Royal Oak page emphasized services: Skin Fade ($30), Kids ($25); supporting: Regular Hair Cut ($28), Buzz Cut ($20).
- Saanich page emphasized services: Trim Beard ($20), Hot Shave ($35) (hot-towel / straight-razor).
- Landmark to add: **Royal Oak Transit Exchange** (BC Transit hub adjacent to Royal Oak / Broadmead Village).
- Keep GA4 call tracking intact — reuse `data-call-location` attributes with new per-page values.
- `en_CA` locale; brand voice matches existing site (warm, neighbourhood, no hype).
</specifics>

<deferred>
## Deferred Ideas
- Additional area pages (Cordova Bay, Gordon Head, etc.) — v2 / SEO-20.
- FAQ page — Phase 2.
- GBP services alignment + config service renames + review-count fix — Phase 3.
</deferred>

---

*Phase: 01-local-seo-landing-pages-royal-oak-saanich*
*Context gathered: 2026-06-26 via working session*
