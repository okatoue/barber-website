---
phase: 02-faq-page-with-faqpage-schema
plan: "01"
subsystem: config
tags: [typescript, config, faq, schema, seo]

requires:
  - phase: 01-local-seo-landing-pages-royal-oak-saanich
    provides: config-driven content pattern, SERVICES shape with price/duration fields

provides:
  - FaqItem type (question, answer, category, homepage?) exported from src/lib/config.ts
  - findService() helper for SERVICES price/duration lookups in config.ts
  - FAQ_ITEMS FaqItem[] covering all seven BrightLocal FAQ topics
  - homepage subset markers (3 items flagged homepage: true — walk-ins, timing/pricing, kids)

affects: [02-02-faq-page, 02-03-homepage-faq-teaser]

tech-stack:
  added: []
  patterns:
    - "findService() private helper: flatten SERVICES to look up Service by name, used in FAQ answer template literals"
    - "FaqItem type: single array with category + optional homepage flag (D-06 Option A)"

key-files:
  created: []
  modified:
    - src/lib/config.ts

key-decisions:
  - "Option A data model (D-06): single FAQ_ITEMS array with category string and optional homepage boolean — simpler, no duplication, consistent with SHOP.walkIns boolean-flag pattern"
  - "findService() placed in FAQ section of config.ts after SERVICES, before FAQ_ITEMS — private (not exported), throws on miss for fast failure at module load"
  - "Parking answer references SHOP.landmarks directly (no inline copy) — DRY, stays in sync if address wording changes"
  - "Timing/pricing item uses category Pricing (Claude discretion per D-03) to distinguish it from operational Visiting items"

requirements-completed: [FAQ-01, FAQ-03]

duration: 3min
completed: 2026-06-27
---

# Phase 02 Plan 01: FAQ Data Model Summary

**Typed `FaqItem[]` with `findService()` helper in `config.ts` covering all seven BrightLocal FAQ topics with prices/durations sourced from `SERVICES`**

## Performance

- **Duration:** 3 min
- **Started:** 2026-06-27T10:15:12Z
- **Completed:** 2026-06-27T10:18:08Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments

- Exported `FaqItem` type (question, answer, category, homepage?) and annotated `FAQ_ITEMS: FaqItem[]`
- Added private `findService(name)` helper that flattens `SERVICES` for price/duration lookups
- Expanded `FAQ_ITEMS` from 5 to 9 items, covering all seven BrightLocal FAQ topics (FAQ-01)
- Three items flagged `homepage: true` (walk-ins, timing/pricing, kids) as the homepage curated subset (D-02)
- All pricing/timing answers interpolate from `SERVICES` — no hardcoded dollar/duration literals (D-04)
- Parking answer references `SHOP.landmarks` directly — DRY, no duplicate copy

## Task Commits

Each task was committed atomically:

1. **Task 1: Add FaqItem type, findService helper, and restructure existing items** - `6ea583a` (feat)
2. **Task 2: Author the four net-new BrightLocal topic answers** - `aaa5702` (feat)

## Files Created/Modified

- `src/lib/config.ts` — Added `FaqItem` type, `findService()` helper, annotated `FAQ_ITEMS: FaqItem[]`, expanded to 9 items covering all 7 BrightLocal topics with category grouping and homepage flags

## Decisions Made

- **Option A data model (D-06):** Single `FAQ_ITEMS` array with `category` field and optional `homepage` boolean. Simpler than a separate subset list; consistent with the existing `SHOP.walkIns` boolean-flag pattern. 02-02 (full FAQ page) uses all items; 02-03 (homepage teaser) filters by `homepage: true`.
- **`findService()` private helper:** Defined in the FAQ section after `SERVICES`, not exported. Throws on a miss so a typo in a service name fails loudly at module load rather than silently emitting `undefined`.
- **Parking answer uses `SHOP.landmarks` directly:** The variable already contains the exact copy — free parking out front + Broadmead Village + left of Starbucks. Referencing it directly keeps a single source of truth.
- **Category "Pricing" for the timing answer:** Distinguishes the pricing/duration question from operational Visiting items (walk-ins, cancellation, parking). Other categories: "Visiting", "Services", "Kids".

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `FaqItem` type and `FAQ_ITEMS` are ready for 02-02 (full `/faq` page) and 02-03 (homepage teaser)
- `findService()` is not exported — 02-02 and 02-03 consume `FAQ_ITEMS` directly, not the helper
- No blockers

---
*Phase: 02-faq-page-with-faqpage-schema*
*Completed: 2026-06-27*

## Self-Check: PASSED

- `src/lib/config.ts` — exists and modified
- Commit `6ea583a` — confirmed in git log
- Commit `aaa5702` — confirmed in git log
- `npx tsc --noEmit` — passes with no errors
- All 7 BrightLocal topics present in FAQ_ITEMS — verified
- 3+ items with `homepage: true` — verified (3 items)
- No hardcoded dollar literals in kids/timing/skin-fade/beard/shave answers — verified
- No HTML tags or `</script>` in any FAQ answer — verified
