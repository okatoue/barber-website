---
phase: RL-02-faq-page-with-faqpage-schema
plan: "02"
subsystem: ui
tags: [nextjs, faq, schema-org, faqpage, json-ld, seo, structured-data]

requires:
  - phase: RL-02-faq-page-with-faqpage-schema
    provides: "FAQ_ITEMS FaqItem type in src/lib/config.ts (plan 02-01)"

provides:
  - "Static /faq server component at src/app/faq/page.tsx"
  - "Per-page canonical /faq and non-double-branded title"
  - "All 9 FAQ_ITEMS rendered grouped by category with answers always visible"
  - "Sole FAQPage JSON-LD for the site, generated from FAQ_ITEMS"

affects: [RL-02-faq-page-with-faqpage-schema]

tech-stack:
  added: []
  patterns:
    - "Server component page with metadata + alternates.canonical (mirrors services/page.tsx)"
    - "FAQPage JSON-LD built by mapping config array, emitted via dangerouslySetInnerHTML"
    - "Category-grouped static FAQ list using .faq-list/.faq-item with all answers visible (no accordion)"

key-files:
  created:
    - src/app/faq/page.tsx
  modified: []

key-decisions:
  - "CATEGORY_ORDER defined explicitly as ['Visiting','Pricing','Kids','Services'] for predictable rendering order"
  - "Answers rendered as plain <p> with inline styles (matching .faq-a p spec) instead of .faq-a — avoids max-height:0 collapse"
  - "JSON-LD faqJsonLd const defined at module scope (same pattern as FAQ.tsx); FAQ.tsx copy to be removed in 02-03"

patterns-established:
  - "FAQ page pattern: server component + category-grouped list + all-visible answers + FAQPage JSON-LD from same source"

requirements-completed: [FAQ-01, FAQ-02]

duration: 2min
completed: 2026-06-27
---

# Phase 2 Plan 02: FAQ Page (Rendering + FAQPage JSON-LD) Summary

**Static /faq server component rendering all 9 FAQ_ITEMS grouped by category with always-visible answers and a sole FAQPage JSON-LD, both sourced from the same FAQ_ITEMS config array.**

## Performance

- **Duration:** 2 min
- **Started:** 2026-06-27T10:23:13Z
- **Completed:** 2026-06-27T10:24:50Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Created `src/app/faq/page.tsx` as a server component (no `"use client"`) with per-page canonical `/faq` and title "Barber FAQ — Victoria, BC" (no double-branding)
- All 9 FAQ_ITEMS rendered in category groups (Visiting / Pricing / Kids / Services) with every answer visible in initial HTML — plain `<p>` elements with inline styles mirroring `.faq-a p`, no `.faq-a` accordion wrapper
- FAQPage JSON-LD built by mapping FAQ_ITEMS to Question/acceptedAnswer/Answer nodes, emitted as `application/ld+json` script — markup and structured data share a single source of truth (FAQ-02 compliance)

## Task Commits

Each task was committed atomically:

1. **Task 1: Static category-grouped /faq page with metadata + canonical** - `8ba0bbc` (feat)
2. **Task 2: Emit sole FAQPage JSON-LD from FAQ_ITEMS** - `d1fdf69` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `src/app/faq/page.tsx` — Static server component: `metadata` export with canonical `/faq`, category-grouped FAQ rendering, and FAQPage JSON-LD

## Decisions Made

- **CATEGORY_ORDER explicit array** — `["Visiting", "Pricing", "Kids", "Services"]` defined as a module-level constant so rendering order is deterministic rather than derived from first-occurrence in FAQ_ITEMS.
- **Plain `<p>` instead of `.faq-a`** — `.faq-a` has `max-height: 0; overflow: hidden` (accordion collapse). To satisfy D-03 (all answers visible in initial HTML), answers are rendered as plain `<p>` with inline styles copying `.faq-a p` values: `color: var(--muted)`, `fontSize: 15`, `lineHeight: 1.65`, `maxWidth: 70ch`, `padding: 0 4px 26px`.
- **`faqJsonLd` at module scope** — mirrors FAQ.tsx pattern; `JSON.stringify` of a plain object at build time. The FAQ.tsx copy of FAQPage JSON-LD remains until plan 02-03 removes it.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

**FAQ.tsx still contains FAQPage JSON-LD** — at the end of plan 02-02, there are two FAQPage `@type` occurrences in `src/`: `src/app/faq/page.tsx` (new, authoritative) and `src/components/FAQ.tsx` (legacy, to be removed). This is expected: the plan explicitly states "the homepage copy is removed in 02-03." D-01 (single FAQPage site-wide) will be satisfied upon completion of plan 02-03.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- `src/app/faq/page.tsx` is ready and serves all 9 FAQ_ITEMS with FAQPage JSON-LD
- Plan 02-03 should remove the `faqJsonLd` const and `<script>` block from `src/components/FAQ.tsx` and filter its rendered items to `homepage: true` only
- Plan 02-04 should add `/faq` to `src/app/sitemap.ts` and `src/components/Footer.tsx`

---
*Phase: RL-02-faq-page-with-faqpage-schema*
*Completed: 2026-06-27*

## Self-Check: PASSED

- `src/app/faq/page.tsx` exists: PASS
- `git log` shows commit `8ba0bbc` (Task 1) and `d1fdf69` (Task 2): PASS
- `npx tsc --noEmit` passes with no errors: PASS
- `metadata.alternates.canonical` = `"/faq"`: PASS
- Title does not contain "Royal Look": PASS
- No `.faq-a` wrapper in answer rendering: PASS
- FAQPage JSON-LD present with `application/ld+json` script: PASS
- `mainEntity` mapped from `FAQ_ITEMS.map(...)`: PASS
