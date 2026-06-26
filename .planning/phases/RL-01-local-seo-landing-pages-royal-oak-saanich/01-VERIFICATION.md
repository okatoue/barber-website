---
phase: 01-local-seo-landing-pages-royal-oak-saanich
verified: 2026-06-26T22:00:00Z
status: passed
score: 5/5 must-haves verified
overrides_applied: 0
human_verification:
  - test: "Run both pages' JSON-LD through an external schema validator (https://validator.schema.org or Google Rich Results Test)"
    expected: "Zero errors for each page. Service nodes present. provider is an @id pointer to https://royallook.ca/#barbershop. No duplicate BarberShop node at the page level."
    why_human: "Cannot invoke external schema validators programmatically. JSON-LD structure has been confirmed correct in the built HTML, but only an external validator can confirm schema.org compliance."
    result: "PASSED — user ran both pages' per-page JSON-LD through an external validator at the 01-04 checkpoint (2026-06-26) and confirmed zero errors for both ('Both pass'). Intro uniqueness/quality also signed off in the same checkpoint."
---

# Phase 01: Local SEO Landing Pages (Royal Oak + Saanich) Verification Report

**Phase Goal:** Ship two new local-SEO landing pages on royallook.ca — /royal-oak-barber-shop and /beard-trim-saanich — each with unique area/service-targeted copy, embedded Google Map, NAP, clear call CTAs, per-page canonical, and Service/LocalBusiness structured data. Built from one reusable, data-driven landing-page component, with both routes added to the sitemap and a new Royal Oak Transit Exchange landmark in config. Captures local search intent without cannibalizing the homepage (which stays the Broadmead Village primary).
**Verified:** 2026-06-26T22:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| #  | Truth                                                                                                                                                                                             | Status     | Evidence                                                                                                                                                                      |
|----|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1  | /royal-oak-barber-shop renders a unique page titled "Royal Oak Barber Shop" with ≥150-word intro emphasizing skin fades + kids' cuts, the Royal Oak Transit Exchange landmark, the map, NAP, and call CTAs | ✓ VERIFIED | Built HTML: `<title>Royal Oak Barber Shop | Royal Look Barber Shop</title>`. Intro is 218 words (4 paragraphs in built HTML). Text explicitly mentions "Royal Oak Transit Exchange on Royal Oak Drive," "Skin fades are a cornerstone," "Kids' cuts are handled." Google Map iframe present (`maps.google.com`). Full NAP (777 Royal Oak Dr #530, Victoria, BC V8X 4V1, (778) 430-0040). Two `tel:` links with `data-call-location="royal_oak_page_cta"` (inline) and `data-call-location="royal_oak_page_cta_primary"` (btn btn-secondary CTA). |
| 2  | /beard-trim-saanich renders a unique page titled "Beard Trim in Saanich" with ≥150-word intro emphasizing beard trims + hot-towel/straight-razor shaves, the map, NAP, and call CTAs              | ✓ VERIFIED | Built HTML: `<title>Beard Trim in Saanich | Royal Look Barber Shop</title>`. Intro is 224 words (4 paragraphs). Text explicitly mentions "Beard Trim in Saanich," "beard trim is a focused service," "hot-towel straight-razor shave." Google Map iframe present. Full NAP identical. Two `tel:` links with `data-call-location="saanich_beard_page_cta"` and `data-call-location="saanich_beard_page_cta_primary"`. |
| 3  | The two intros share no copy with each other or the homepage, and services/prices are pulled from SERVICES in config (not duplicated)                                                              | ✓ VERIFIED | Royal Oak opens: "Royal Oak Barber Shop at Broadmead Village is the neighbourhood spot…". Saanich opens: "A proper Beard Trim in Saanich is easier to find than most people expect." Homepage hero: "Looking for a barber in Broadmead or Royal Oak?" — no sentences shared. `resolveService()` is called in `LandingPage.tsx` for every price/duration; no `$`-prefixed literals appear in JSX. Prices in built HTML ($30, $25, $28 for Royal Oak; $20, $35, $28 for Saanich) match config values. |
| 4  | Both URLs appear in the generated sitemap.xml, and each page emits a per-page canonical plus valid Service/LocalBusiness JSON-LD                                                                   | ✓ VERIFIED | `out/sitemap.xml` contains `<loc>https://royallook.ca/royal-oak-barber-shop</loc>` and `<loc>https://royallook.ca/beard-trim-saanich</loc>` (both with priority 0.8, monthly). Built HTML: `<link rel="canonical" href="https://royallook.ca/royal-oak-barber-shop"/>` and `<link rel="canonical" href="https://royallook.ca/beard-trim-saanich"/>`. Per-page Service @graph in each page's `<main>`: Service nodes with `provider: {"@id": "https://royallook.ca/#barbershop"}` (ID pointer only — no duplicate BarberShop node). BreadcrumbList present. Sitewide LocalBusiness/BarberShop node at `@id: https://royallook.ca/#barbershop` emitted by `layout.tsx` and visible in both built pages' `<head>`. External validator result: documented as zero errors in 04-SUMMARY (cannot be re-run programmatically; see human verification). |
| 5  | `npm run build` completes a clean static export that includes both new routes                                                                                                                     | ✓ VERIFIED | `out/royal-oak-barber-shop.html` and `out/beard-trim-saanich.html` both exist and contain full page content. The `out/` directory reflects a complete 13-page static export. Source confirms `src/app/sitemap.ts` uses `export const dynamic = "force-static"`. |

**Score:** 5/5 truths verified

---

### Required Artifacts

| Artifact                                      | Expected                                                           | Status     | Details                                                                                                                       |
|-----------------------------------------------|--------------------------------------------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------|
| `src/app/globals.css`                         | `.btn-secondary` with accent styling                               | ✓ VERIFIED | Line 232–237: `.btn-secondary { background: var(--accent); color: var(--bg); border-color: var(--accent); }` and `.btn-secondary:hover` using `var(--accent-2)`. Placed after `.btn-ghost:hover`. Existing button classes untouched. |
| `src/lib/config.ts`                           | `SHOP.landmarkRoyalOak` field                                      | ✓ VERIFIED | Line 40–41: `landmarkRoyalOak: "Steps from Royal Oak Transit Exchange (BC Transit hub on Royal Oak Drive) — and right inside Broadmead Village Shopping Centre."`. Sibling `landmarks` field unchanged. |
| `src/lib/landing.ts`                          | `LandingPageData`/`EmphasizedService` types, `resolveService`, `ROYAL_OAK_DATA`, `SAANICH_DATA` (≥60 lines) | ✓ VERIFIED | 108 lines. Exports all required symbols. `resolveService` scans `SERVICES` from config. No `$`-prefixed price literals in either data constant. `ROYAL_OAK_DATA.landmark = SHOP.landmarkRoyalOak`. `SAANICH_DATA.landmark = SHOP.landmarks`. |
| `src/components/LandingPage.tsx`              | Reusable Server Component with JSON-LD @graph (≥90 lines)          | ✓ VERIFIED | 212 lines. No `"use client"` directive. Accepts `{ data: LandingPageData }`. Contains `application/ld+json`, `@graph`, `#barbershop`, `BreadcrumbList`, `find-grid`, `menu-row`, `data-call-location`, `googleMapsEmbed`. No stale tokens (`text-gold`, `bg-surface`, `border-border`, `section-heading`) present. |
| `src/app/royal-oak-barber-shop/page.tsx`      | Route: `metadata` export + `<LandingPage data={ROYAL_OAK_DATA} />` | ✓ VERIFIED | 14 lines. Imports `ROYAL_OAK_DATA`, sets `title: "Royal Oak Barber Shop"`, `alternates: { canonical: "/royal-oak-barber-shop" }`, unique `description`. Renders `<LandingPage data={ROYAL_OAK_DATA} />`. |
| `src/app/beard-trim-saanich/page.tsx`         | Route: `metadata` export + `<LandingPage data={SAANICH_DATA} />`   | ✓ VERIFIED | 14 lines. Imports `SAANICH_DATA`, sets `title: "Beard Trim in Saanich"`, `alternates: { canonical: "/beard-trim-saanich" }`, unique `description`. Renders `<LandingPage data={SAANICH_DATA} />`. |
| `src/app/sitemap.ts`                          | Two new entries (priority 0.8, monthly)                            | ✓ VERIFIED | Lines 14–15: entries for `${base}/royal-oak-barber-shop` and `${base}/beard-trim-saanich` with `changeFrequency: "monthly"`, `priority: 0.8`. Four pre-existing entries retained. `export const dynamic = "force-static"` untouched. |
| `src/components/Footer.tsx`                   | Areas Served links to both new pages                               | ✓ VERIFIED | Conditional href in `areasServed.map`: "Royal Oak" → `"/royal-oak-barber-shop"`, "Saanich" → `"/beard-trim-saanich"`, others → `undefined`. Both hrefs confirmed in `out/index.html` (built footer). |

### Key Link Verification

| From                                         | To                                                    | Via                                       | Status     | Details                                                                                                          |
|----------------------------------------------|-------------------------------------------------------|-------------------------------------------|------------|------------------------------------------------------------------------------------------------------------------|
| `src/lib/landing.ts`                         | `src/lib/config.ts`                                   | `import { SERVICES, SHOP, type Service }` | ✓ WIRED    | Line 1 of landing.ts: `import { SERVICES, SHOP, type Service } from "./config"`. `ROYAL_OAK_DATA.landmark = SHOP.landmarkRoyalOak`. |
| `src/components/LandingPage.tsx`             | `src/lib/landing.ts`                                  | `import { resolveService, type LandingPageData }` | ✓ WIRED | Line 2 of LandingPage.tsx: `import { resolveService, type LandingPageData } from "@/lib/landing"`. resolveService called 6 times in JSX (once per service in @graph + once per service in visible menu). |
| `src/components/LandingPage.tsx`             | `SHOP.googleMapsEmbed`                                | `iframe src={SHOP.googleMapsEmbed}`        | ✓ WIRED    | Line 147: `src={SHOP.googleMapsEmbed}`. Built HTML: `<iframe src="https://maps.google.com/maps?q=48.496...">`. |
| `Service JSON-LD provider`                   | `layout.tsx #barbershop node`                         | `@id: ${SHOP.siteUrl}/#barbershop`         | ✓ WIRED    | Built HTML: `"provider":{"@id":"https://royallook.ca/#barbershop"}`. No `@type`/`name`/`address` in provider. Layout.tsx emits the full BarberShop node once at `@id: https://royallook.ca/#barbershop`. |
| `src/app/royal-oak-barber-shop/page.tsx`     | `src/components/LandingPage.tsx`                      | `<LandingPage data={ROYAL_OAK_DATA} />`   | ✓ WIRED    | Line 13 of page.tsx. Built HTML confirms component rendered with all sections. |
| `src/app/royal-oak-barber-shop/page.tsx`     | canonical `/royal-oak-barber-shop`                    | `alternates: { canonical: "..." }`        | ✓ WIRED    | Built HTML: `<link rel="canonical" href="https://royallook.ca/royal-oak-barber-shop"/>` (absolute, resolved by `metadataBase = new URL("https://royallook.ca")`). |
| `src/components/Footer.tsx`                  | `/royal-oak-barber-shop` and `/beard-trim-saanich`    | Conditional href in areasServed map       | ✓ WIRED    | Built `out/index.html` footer: `<a href="/royal-oak-barber-shop">Royal Oak</a>` and `<a href="/beard-trim-saanich">Saanich</a>`. |

### Data-Flow Trace (Level 4)

| Artifact                   | Data Variable          | Source                              | Produces Real Data | Status     |
|----------------------------|------------------------|-------------------------------------|--------------------|------------|
| `LandingPage.tsx` services | `resolved` (price/duration) | `resolveService(svc.configName)` scanning `SERVICES` from config.ts | Yes — `SERVICES` array has actual prices/durations from config | ✓ FLOWING |
| `LandingPage.tsx` intro    | `data.intro`           | `ROYAL_OAK_DATA.intro` / `SAANICH_DATA.intro` in landing.ts | Yes — 218-word and 224-word strings in source | ✓ FLOWING |
| `LandingPage.tsx` map      | `SHOP.googleMapsEmbed` | `config.ts` SHOP object (coordinate-based URL) | Yes — maps.google.com URL with real coordinates appears in built HTML | ✓ FLOWING |
| `LandingPage.tsx` NAP      | `SHOP.address`, `SHOP.phone` | `config.ts` SHOP object | Yes — "777 Royal Oak Dr #530", "Victoria", "BC", "V8X 4V1", "(778) 430-0040" all confirmed in built HTML | ✓ FLOWING |
| `LandingPage.tsx` JSON-LD prices | `resolved.price` | `resolveService()` → config.ts SERVICES | Yes — built HTML shows `"price":"30"`, `"price":"25"`, `"price":"20"`, `"price":"35"` matching config values | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Evidence | Status |
|----------|----------|--------|
| /royal-oak-barber-shop builds to static HTML | `out/royal-oak-barber-shop.html` exists with full content | ✓ PASS |
| /beard-trim-saanich builds to static HTML | `out/beard-trim-saanich.html` exists with full content | ✓ PASS |
| sitemap.xml contains both slugs | `out/sitemap.xml` confirmed: both `royallook.ca/royal-oak-barber-shop` and `royallook.ca/beard-trim-saanich` entries present | ✓ PASS |
| Canonical tags are absolute URLs | Built HTML: `href="https://royallook.ca/royal-oak-barber-shop"` and `href="https://royallook.ca/beard-trim-saanich"` | ✓ PASS |
| Prices match config values | Built HTML: Skin Fade `$30`, Kids `$25`, Regular `$28`, Beard Trim `$20`, Hot Shave `$35` | ✓ PASS |
| JSON-LD provider is @id only (no duplicate BarberShop) | Built HTML: `"provider":{"@id":"https://royallook.ca/#barbershop"}` — no `"@type":"BarberShop"` in either page's per-page script | ✓ PASS |
| Footer internal links present in homepage | `out/index.html` footer: `href="/royal-oak-barber-shop"` and `href="/beard-trim-saanich"` confirmed | ✓ PASS |

### Probe Execution

Step 7c: SKIPPED — no `scripts/*/tests/probe-*.sh` files exist; this is a Next.js static-export project with no conventional probes.

### Requirements Coverage

| Requirement | Source Plan(s)  | Description                                                          | Status       | Evidence                                                                                  |
|-------------|-----------------|----------------------------------------------------------------------|--------------|-------------------------------------------------------------------------------------------|
| SEO-01      | 01-01, 01-03    | Landing page at /royal-oak-barber-shop, titled "Royal Oak Barber Shop", skin fades/kids/Royal Oak Transit Exchange | ✓ SATISFIED | Built HTML: title, 218-word intro, Royal Oak Transit Exchange in intro and find-note, skin fade mention confirmed |
| SEO-02      | 01-01, 01-03    | Landing page at /beard-trim-saanich, titled "Beard Trim in Saanich", beard trims/hot-towel/straight-razor | ✓ SATISFIED | Built HTML: title, 224-word intro, "beard trim," "hot-towel straight-razor shave" confirmed |
| SEO-03      | 01-01           | Unique 150–250 word intro per page, no shared copy                   | ✓ SATISFIED | Royal Oak: 218 words, distinct opening. Saanich: 224 words, distinct opening. No sentence shared with each other or homepage hero lede. Confirmed from source `landing.ts` and built HTML. |
| SEO-04      | 01-01, 01-02    | Services/prices from SERVICES config, not hardcoded                  | ✓ SATISFIED | `resolveService()` used for all prices in JSX and JSON-LD. No `$`-prefixed literals in `landing.ts` data or `LandingPage.tsx` JSX. |
| SEO-05      | 01-02           | Google Map, NAP, tel: CTAs with data-call-location                   | ✓ SATISFIED | Both pages in built HTML: Google Maps iframe, full NAP, inline tel: with `data-call-location`, primary btn-secondary CTA with `data-call-location`. **Note:** REQUIREMENTS.md shows SEO-05 as `[ ]` (unchecked) and traceability table shows "Pending" — this is a documentation inconsistency. The implementation is complete. |
| SEO-06      | 01-02, 01-03, 01-04 | Per-page canonical + Service/LocalBusiness JSON-LD                | ✓ SATISFIED | Canonicals confirmed absolute in built HTML. Service @graph (3 Service nodes + BreadcrumbList) confirmed in both pages' `<main>`. LocalBusiness covered by sitewide layout.tsx BarberShop node. External validator confirmation documented in 04-SUMMARY (human item below). |
| SEO-07      | 01-01, 01-02    | One reusable component, correct design classes                       | ✓ SATISFIED | `src/components/LandingPage.tsx` is the single component used by both routes. Design classes confirmed in built HTML: `section`, `container`, `section-head`, `eyebrow`, `serif`, `menu-col`, `menu-row`, `find-grid`, `find-map`, `find-info`, `btn btn-secondary`. None of the stale tokens (`text-gold`, `bg-surface`, `border-border`, `section-heading`) appear. |
| SEO-08      | 01-03, 01-04    | Both routes in sitemap.ts + clean static export                      | ✓ SATISFIED | `src/app/sitemap.ts` contains both entries (priority 0.8, monthly). `out/sitemap.xml` confirmed. Both `out/*.html` files exist. |

### Anti-Patterns Found

| File | Issue | Severity | Impact |
|------|-------|----------|--------|
| `src/lib/landing.ts` | `metaTitle` and `metaDescription` fields in `LandingPageData` type and both data objects are dead code — no route page reads them (confirmed by grep: zero references in route pages). Route pages set their own `metadata` exports with hardcoded strings. | WARNING | No SEO requirement fails: the route pages DO set unique titles and unique meta descriptions, which is confirmed in the built HTML. However: (1) the 03-SUMMARY incorrectly claimed descriptions were "sourced from ROYAL_OAK_DATA.metaDescription" — they are hardcoded duplicates; (2) the optimized keyword-rich `metaTitle` values (e.g. "Royal Oak Barber Shop — Skin Fades & Kids' Cuts | Royal Look Victoria BC") are never used — the actual titles are the shorter "Royal Oak Barber Shop | Royal Look Barber Shop"; (3) future copy edits may cause the two copies to drift (the `title` already has). Code review CR-01 and WR-01 document this in detail. |
| `src/components/LandingPage.tsx` | `resolveService` returning `null` sets `price: "0"` in JSON-LD Offer and silently drops price from visible menu. Current data has no mismatches, but any future rename in `SERVICES` config would ship `"price":"0"` in structured data without a build error. (Code review WR-04) | WARNING | No current failure — all configName values resolve correctly. Latent risk only. |
| `src/components/LandingPage.tsx` | h1 emphasis split fails silently if `h1Emphasis` substring is not found in `h1` — entire non-emphasized prefix becomes `""`. (Code review WR-03) | WARNING | No current failure — current data is consistent. Latent risk only. |
| `src/components/LandingPage.tsx` | `todayName` computed at build time via `new Date()`, so the "today" hours-row highlight is frozen to the build date (correct for one day, stale for six). (Code review WR-05) | INFO | UX issue — the highlighted row in the hours grid will be wrong for most visitors. Does not affect any SEO requirement. |
| `src/components/Footer.tsx` | Non-targeted areas (Broadmead, Cordova Bay, Gordon Head, Cadboro Bay, Oak Bay, Victoria) render as `<a href={undefined}>` — React drops the attribute, yielding hrefless anchors that look clickable but do nothing. (Code review WR-02) | WARNING | Does not affect the two targeted areas (Royal Oak and Saanich have correct hrefs). The plan explicitly specified `href={undefined}` for non-targeted areas to preserve existing behavior — this was intentional per the plan's design. |
| `src/components/LandingPage.tsx` | `JSON.stringify` output injected via `dangerouslySetInnerHTML` without escaping `</script>` sequences. All inputs are developer-controlled constants today. (Code review IN-02) | INFO | Not currently exploitable. Mirrors existing pattern in layout.tsx. No user input flows into JSON-LD. |
| `src/components/Footer.tsx` | Address street/city lines wrapped in `<a>` with no `href` — semantically incorrect (hrefless anchors). (Code review IN-01) | INFO | Pre-existing issue outside this phase's scope. No SEO requirement affected. |

**Debt marker scan:** No TBD, FIXME, or XXX markers found in any file modified by this phase.

---

### Meta Description Hypothesis Resolution (Code Review Flag)

**Hypothesis from 01-REVIEW.md CR-01:** The optimized `metaTitle`/`metaDescription` fields in `landing.ts` are unused, and the pages may ship generic or layout-default metadata.

**Finding: HYPOTHESIS PARTIALLY CONFIRMED — but does not affect any SEO requirement.**

1. `metaTitle` is dead code. Both route pages set `title` directly as bare strings (`"Royal Oak Barber Shop"`, `"Beard Trim in Saanich"`). The layout template appends `" | Royal Look Barber Shop"`. The keyword-rich `metaTitle` values in `landing.ts` (e.g. `"Royal Oak Barber Shop — Skin Fades & Kids' Cuts | Royal Look Victoria BC"`) are never applied. The actual rendered titles are shorter than intended.

2. `metaDescription` is NOT consumed from the data object, but the route pages independently set the same text as hardcoded string literals. The descriptions are byte-identical to `landing.ts.metaDescription` as of today's build.

3. **Each landing page ships a UNIQUE meta description** — confirmed in built HTML:
   - Royal Oak: `"Royal Oak Barber Shop inside Broadmead Village Shopping Centre. Expert skin fades, kids' haircuts, and classic cuts. Steps from Royal Oak Transit Exchange. Walk-ins welcome seven days a week."`
   - Saanich: `"Professional beard trim in Saanich at Royal Look Barber Shop, inside Broadmead Village Shopping Centre. Hot-towel straight-razor shaves, beard shaping, and classic cuts. Walk-ins welcome."`
   - Neither is the layout.tsx default (`"Royal Look Barber Shop in Broadmead Village, Saanich. Skin fades, beard trims…"`).

4. **No SEO requirement is blocked.** The success criteria require the page be "titled 'Royal Oak Barber Shop'" and "titled 'Beard Trim in Saanich'" — both are met. The requirements do not mandate the use of the keyword-extended `metaTitle` format. SEO-03 requires unique intros (satisfied), not unique meta descriptions specifically.

5. **Code quality risk:** The `metaTitle` and `metaDescription` fields in `LandingPageData` and both data objects are dead code. The 03-SUMMARY's claim that descriptions were "sourced from ROYAL_OAK_DATA.metaDescription" is inaccurate. This creates two independent sources of truth that have already diverged (title) and will likely diverge further (description) as copy is updated.

---

### Human Verification Required

#### 1. External JSON-LD Validator Confirmation

**Test:** Copy the `<script type="application/ld+json">` block from each built page's `<main>` section (the per-page Service/BreadcrumbList @graph, NOT the sitewide BarberShop block in `<head>`) and paste into https://validator.schema.org.

**Expected:** Zero errors. Service nodes present with `provider` as an `@id` pointer to `https://royallook.ca/#barbershop`. No second `@type: BarberShop` node at the page level. Breadcrumb positions 1 (Home) and 2 (page slug) present.

**Why human:** External web service — cannot be invoked programmatically. Structural correctness has been confirmed from the built HTML: `provider: {"@id": "https://royallook.ca/#barbershop"}` (no @type in provider), prices are bare numeric strings, no duplicate BarberShop node. The 04-SUMMARY records this was completed by the human on 2026-06-26 with zero errors — this item documents that prior sign-off for traceability.

**Note on Service.description:** Both pages' JSON-LD Service nodes include `"description":""` (empty string) because no `EmphasizedService.description` values were populated in `landing.ts`. Schema.org accepts empty string for an optional field, but a validator may flag it as a quality warning. If it does, populating descriptions in the data layer would resolve it.

---

### Gaps Summary

No gaps found. All 5 success criteria are verified against the built static export. All 8 SEO requirements (SEO-01 through SEO-08) are satisfied by the implementation.

**Documentation inconsistency to correct:** `REQUIREMENTS.md` shows SEO-05 as `[ ]` (unchecked) and the traceability table shows it as "Pending." The implementation is complete — both pages have the Google Map, NAP, and `data-call-location` CTAs. The checkbox should be updated to `[x]` and the traceability row to "Complete."

**Code quality items for follow-up (not blockers):**
- Remove or properly wire the `metaTitle`/`metaDescription` dead fields in `LandingPageData` (CR-01/WR-01)
- Guard `resolveService` null return to emit no `offers` node rather than `"price":"0"` (WR-04)
- Harden h1 emphasis split against substring-not-found edge case (WR-03)
- Compute "today" hours highlight client-side or drop it on static pages (WR-05)

---

_Verified: 2026-06-26T22:00:00Z_
_Verifier: Claude (gsd-verifier)_
