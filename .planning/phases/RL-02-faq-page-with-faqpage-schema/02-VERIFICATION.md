---
phase: 02-faq-page-with-faqpage-schema
verified: 2026-06-27T00:00:00Z
status: passed
score: 4/4 must-haves verified
overrides_applied: 0
re_verification: false
---

# Phase 02: FAQ Page with FAQPage Schema — Verification Report

**Phase Goal:** Add a dedicated, indexable FAQ page at `/faq` that answers the questions BrightLocal flagged — walk-ins vs appointments, kids' cuts approach, skin-fade technique, beard-trim options, straight-razor shave hygiene, parking, and typical timing/pricing ranges — and emits valid FAQPage structured data. Expand the config-driven `FAQ_ITEMS` to cover these topics, keep the homepage FAQ as a curated subset (so the two pages aren't identical duplicates), add `/faq` to the nav/footer and sitemap, and set a per-page canonical.
**Verified:** 2026-06-27
**Status:** PASSED
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Visiting `/faq` renders a dedicated page that answers all seven topics with genuinely useful 1–3 sentence answers (not one-liners) | ✓ VERIFIED | `src/app/faq/page.tsx` is a server component (no `"use client"`) that renders all 9 `FAQ_ITEMS` grouped by `CATEGORY_ORDER`. All 7 BrightLocal topics are present as distinct items with substantive prose answers (detail below). No accordion collapse — plain `<p>` elements with inline styles render all answers in initial HTML. |
| 2 | `/faq` emits valid `FAQPage` JSON-LD whose questions/answers match the visible content, and sets a per-page canonical | ✓ VERIFIED | `faqJsonLd` in `src/app/faq/page.tsx` is built by `FAQ_ITEMS.map(...)` generating `@context: "https://schema.org"`, `@type: "FAQPage"`, `mainEntity` array of `Question`/`acceptedAnswer` nodes. Same source as the rendered list — structural parity guaranteed. `metadata.alternates.canonical = "/faq"` and `metadataBase: new URL(SHOP.siteUrl)` in `layout.tsx` resolve to `https://royallook.ca/faq`. Human sign-off confirmed external validator (schema.org) reported zero errors. |
| 3 | FAQ content is config-driven (expanded `FAQ_ITEMS`); the homepage FAQ shows a curated subset rather than a byte-identical duplicate of `/faq` | ✓ VERIFIED | `FAQ_ITEMS: FaqItem[]` (9 items) in `src/lib/config.ts` is the single source. `FAQ.tsx` renders `FAQ_ITEMS.filter((item) => item.homepage)` — 3 items (walk-ins, timing/pricing, kids). `FAQPage` appears exactly once in the entire `src/` tree (`src/app/faq/page.tsx`); `FAQ.tsx` has zero `application/ld+json` scripts. Homepage (3 items) vs full page (9 items) is clearly non-duplicate. |
| 4 | `/faq` is linked from the nav/footer and added to `sitemap.ts`; `npm run build` completes a clean static export including `/faq` | ✓ VERIFIED | `Footer.tsx` Pages column: `<a href="/faq">FAQ</a>`. `FAQ.tsx` homepage teaser: `<a href="/faq">See all FAQs →</a>`. `sitemap.ts`: `{ url: "${base}/faq", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 }`. Header nav intentionally left unchanged per D-05 (documented decision). Build confirmed clean and `out/faq.html` present by human sign-off at phase gate 02-04. |

**Score:** 4/4 truths verified

### Seven BrightLocal Topic Coverage

| Topic | FAQ_ITEMS entry | Category | Homepage flag |
|-------|----------------|----------|---------------|
| Walk-ins vs appointments | "Do you take walk-ins?" | Visiting | `homepage: true` |
| Typical timing/pricing ranges | "How long does a haircut take?" (interpolates Regular Hair Cut + Skin Fade from SERVICES) | Pricing | `homepage: true` |
| Kids' cuts approach | "Do you cut kids' hair?" (interpolates Kids price/duration from SERVICES) | Kids | `homepage: true` |
| Skin-fade technique | "How does a skin fade work?" (interpolates Skin Fade price/duration from SERVICES) | Services | — |
| Beard-trim options | "What beard services do you offer?" (interpolates Trim Beard price/duration from SERVICES; mentions hot towel + straight-razor option) | Services | — |
| Straight-razor shave hygiene | "Is a straight-razor shave safe and sanitary?" (interpolates Hot Shave price/duration from SERVICES; single-use blade + hot-towel setup) | Services | — |
| Parking | "Is there parking nearby?" (answer = `SHOP.landmarks` verbatim — "Inside Broadmead Village Shopping Centre, just to the left of Starbucks — with free parking in the lot right out front.") | Visiting | — |

Two bonus items beyond the seven: "What's the difference between a fade and a taper?" and "What's your cancellation policy?" — both present and categorized. Total `FAQ_ITEMS` count: 9.

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `src/lib/config.ts` | Expanded, typed `FAQ_ITEMS` (≥7 topics) with `FaqItem` type, `category` + `homepage` flag, `findService()` helper | ✓ VERIFIED | Exports `FaqItem` type (question, answer, category, homepage?); `findService()` private helper flattens SERVICES and throws on miss; `FAQ_ITEMS: FaqItem[]` with 9 items; 3 items carry `homepage: true`; pricing answers all use template-literal interpolation via `findService()` — no hardcoded `$NN` literals in kids/timing/skin-fade/beard/shave answers |
| `src/app/faq/page.tsx` | Static `/faq` server component: metadata + canonical, category-grouped all-answers-visible list, FAQPage JSON-LD | ✓ VERIFIED | No `"use client"`; exports `metadata` with `alternates.canonical = "/faq"` and title "Barber FAQ — Victoria, BC" (no double-branding); renders by `CATEGORY_ORDER = ["Visiting","Pricing","Kids","Services"]`; answers as plain `<p>` with inline styles (no `.faq-a` accordion); `faqJsonLd` mapped from `FAQ_ITEMS`; exactly one `application/ld+json` script |
| `src/components/FAQ.tsx` | Trimmed visual-only teaser (homepage subset, no JSON-LD) + "See all FAQs" link | ✓ VERIFIED | `const homepageFaqs = FAQ_ITEMS.filter((item) => item.homepage)` at module scope; renders 3-item accordion (walk-ins, timing/pricing, kids); zero `application/ld+json` scripts; `<a href="/faq">See all FAQs →</a>` below `.faq-list` with centered inline style |
| `src/components/Footer.tsx` | Footer Pages-column link to `/faq` | ✓ VERIFIED | `<li><a href="/faq">FAQ</a></li>` present in Pages column alongside Menu / Barbers / Location |
| `src/app/sitemap.ts` | `/faq` sitemap entry at priority 0.7 | ✓ VERIFIED | `{ url: \`${base}/faq\`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 }` — matches the informational-page tier (`/location` also uses 0.7) |

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `src/app/faq/page.tsx` | `FAQ_ITEMS` | `import { FAQ_ITEMS } from "@/lib/config"` | ✓ WIRED | Both visible render and JSON-LD build consume the same imported array — single source of truth |
| `src/app/faq/page.tsx` | `alternates.canonical` | `metadata.alternates = { canonical: "/faq" }` + `metadataBase` in layout | ✓ WIRED | `metadataBase: new URL("https://royallook.ca")` resolves relative canonical to absolute `https://royallook.ca/faq` |
| `src/components/FAQ.tsx` | `FAQ_ITEMS` homepage subset | `FAQ_ITEMS.filter((item) => item.homepage)` | ✓ WIRED | Filters to 3-item curated subset at module scope; accordion renders `homepageFaqs` |
| `src/components/FAQ.tsx` | `/faq` full page | `<a href="/faq">See all FAQs →</a>` | ✓ WIRED | Link present below `.faq-list` in the homepage teaser section |
| Pricing answers in `FAQ_ITEMS` | `SERVICES` figures | `findService(name).price` / `.duration` template literals | ✓ WIRED | `findService()` flattens `SERVICES` at module load; throws on miss so no silent undefined; all 5 pricing-bearing answers use interpolation |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
|----------|--------------|--------|--------------------|--------|
| `src/app/faq/page.tsx` | `FAQ_ITEMS` | `src/lib/config.ts` module constant | Yes — populated from static config with SERVICES lookups | ✓ FLOWING |
| `src/components/FAQ.tsx` | `homepageFaqs` | `FAQ_ITEMS.filter((item) => item.homepage)` | Yes — 3-item subset of config array | ✓ FLOWING |
| `src/app/faq/page.tsx` (JSON-LD) | `faqJsonLd.mainEntity` | `FAQ_ITEMS.map(...)` | Yes — maps same array rendered visibly | ✓ FLOWING |

### Behavioral Spot-Checks

| Behavior | Evidence | Status |
|----------|----------|--------|
| `/faq` page file exists | `src/app/faq/page.tsx` present | ✓ PASS |
| `FAQPage` JSON-LD is sole site-wide occurrence | `grep FAQPage src/**` — 1 hit only (`src/app/faq/page.tsx:15`) | ✓ PASS |
| `FAQ.tsx` has zero `application/ld+json` | Grep confirms no match in `src/components/FAQ.tsx` | ✓ PASS |
| Sitemap includes `/faq` | `src/app/sitemap.ts` line 13: `url: \`${base}/faq\`` | ✓ PASS |
| All 7 BrightLocal topics in `FAQ_ITEMS` | Config.ts items 1, 2, 3, 6, 7, 8, 9 map 1:1 to topics | ✓ PASS |
| No hardcoded price literals in pricing answers | No `$NN` literals in kids/timing/skin-fade/beard/shave strings; all use `findService()` | ✓ PASS |
| No debt markers in modified files | Grep for TBD/FIXME/XXX/TODO/HACK/PLACEHOLDER — no matches in any of the 5 modified files | ✓ PASS |

### Probe Execution

Step 7c: SKIPPED — build verification was completed by the phase's own 02-04 gate plan (human-confirmed, documented in SUMMARY). Task prompt confirms `npm run build` produced a clean static export including `/faq`. No probes declared in PLAN frontmatter.

### Requirements Coverage

| Requirement | Source Plans | Description | Status | Evidence |
|-------------|-------------|-------------|--------|----------|
| FAQ-01 | 02-01, 02-02 | Dedicated, indexable `/faq` page answering all 7 topics with 1–3 sentence answers | ✓ SATISFIED | `src/app/faq/page.tsx` renders all 9 `FAQ_ITEMS` (all 7 topics + 2 bonus); answers are plain `<p>` in initial HTML |
| FAQ-02 | 02-02, 02-04 | `/faq` emits valid `FAQPage` JSON-LD matching visible content; per-page canonical | ✓ SATISFIED | `faqJsonLd` mapped from `FAQ_ITEMS`; `alternates.canonical = "/faq"`; external validator confirmed by human sign-off |
| FAQ-03 | 02-01, 02-03 | Config-driven content; homepage FAQ is curated subset, not byte-identical duplicate | ✓ SATISFIED | `FAQ_ITEMS: FaqItem[]` single source; homepage renders `filter(item => item.homepage)` = 3 of 9 items; zero `FAQPage` JSON-LD on homepage |
| FAQ-04 | 02-03, 02-04 | `/faq` linked from nav/footer; added to `sitemap.ts`; clean static export including `/faq` | ✓ SATISFIED | Footer Pages column: `<a href="/faq">FAQ</a>`; homepage teaser CTA: `<a href="/faq">See all FAQs →</a>`; sitemap entry at priority 0.7; build confirmed |

No orphaned requirements: all four FAQ-01..FAQ-04 appear in plan frontmatter `requirements:` fields.

### Anti-Patterns Found

None. No TBD/FIXME/XXX/TODO/HACK/PLACEHOLDER markers in any of the 5 files modified this phase. No hardcoded price literals in dynamic-answer strings. No stub implementations. No empty returns. No `application/ld+json` outside `src/app/faq/page.tsx`.

### Human Verification Required

None. The one human-required check — external FAQPage JSON-LD validation and non-duplication confirmation — was completed and recorded in plan 02-04 (human approved; schema.org validator reported zero errors; homepage teaser confirmed as a curated non-duplicate 3-item subset in warm `en_CA` voice).

### Gaps Summary

No gaps found. All four success criteria are observably true in the codebase. All phase requirement IDs (FAQ-01 through FAQ-04) are satisfied by specific, substantive, wired code.

**Design decision noted (not a gap):** The phase goal says "nav/footer" and the PLAN decision D-05 explicitly chose to omit the header navbar entry in favour of a footer link + homepage teaser CTA. The footer IS a navigation element; the requirement text "linked from the nav/footer" is satisfied. This decision is documented in 02-03-PLAN.md and 02-03-SUMMARY.md.

---

_Verified: 2026-06-27_
_Verifier: Claude (gsd-verifier)_
