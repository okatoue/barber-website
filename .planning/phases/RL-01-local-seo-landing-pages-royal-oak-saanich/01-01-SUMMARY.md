---
phase: 01-local-seo-landing-pages-royal-oak-saanich
plan: "01"
subsystem: data-layer
tags: [seo, landing-pages, css, config, data-layer]
dependency_graph:
  requires: []
  provides:
    - .btn-secondary CSS token (accent gold styling)
    - SHOP.landmarkRoyalOak config field
    - src/lib/landing.ts (LandingPageData type, EmphasizedService type, resolveService helper, ROYAL_OAK_DATA, SAANICH_DATA)
  affects:
    - src/app/globals.css
    - src/lib/config.ts
tech_stack:
  added: []
  patterns:
    - Config-driven data layer: prices/durations resolved via resolveService() from SERVICES array
    - as const config extension: new field added to SHOP without explicit type annotation
key_files:
  created:
    - src/lib/landing.ts
  modified:
    - src/app/globals.css
    - src/lib/config.ts
decisions:
  - "landmark in ROYAL_OAK_DATA references SHOP.landmarkRoyalOak (new field); SAANICH_DATA references SHOP.landmarks (existing field) — each page gets the contextually relevant direction copy"
  - "resolveService() scans SERVICES categories at call time; no price/duration literals appear in the landing data constants"
  - "EmphasizedService.displayName allows friendly display text (e.g. Kids' Haircut, Beard Trim) while configName keys stay locked to SERVICES item names"
metrics:
  duration_minutes: 12
  completed_date: "2026-06-26"
  tasks_completed: 3
  tasks_total: 3
  files_created: 1
  files_modified: 2
---

# Phase 01 Plan 01: Foundation Data Layer Summary

**One-liner:** Accent-styled `.btn-secondary` token, `SHOP.landmarkRoyalOak` config field, and a typed config-driven `landing.ts` data layer exporting `ROYAL_OAK_DATA`, `SAANICH_DATA`, and `resolveService`.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Define .btn-secondary in globals.css | `11a294f` | src/app/globals.css |
| 2 | Add SHOP.landmarkRoyalOak field to config.ts | `d146abb` | src/lib/config.ts |
| 3 | Create src/lib/landing.ts (types, resolveService, page data) | `a1c5935` | src/lib/landing.ts |

## What Was Built

**Task 1 — `.btn-secondary` CSS rule**
Added `.btn-secondary` and `.btn-secondary:hover` immediately after `.btn-ghost:hover` in `src/app/globals.css`. Uses `var(--accent)` for background/border on rest state and `var(--accent-2)` on hover. Resolves the gap where the class was referenced in three existing files but never defined (RESEARCH Pitfall 1). Existing `.btn`, `.btn-primary`, and `.btn-ghost` rules untouched.

**Task 2 — `SHOP.landmarkRoyalOak`**
Added `landmarkRoyalOak` as a sibling field in the `SHOP` `as const` object in `src/lib/config.ts`. Value: "Steps from Royal Oak Transit Exchange (BC Transit hub on Royal Oak Drive) — and right inside Broadmead Village Shopping Centre." The existing `landmarks` string (Starbucks / free parking reference consumed by `LocationPreview.tsx`) is unchanged byte-for-byte.

**Task 3 — `src/lib/landing.ts`**
Created the typed data layer. Exports:
- `EmphasizedService` type (`displayName`, `configName`, optional `description`)
- `LandingPageData` type (all fields the landing component will consume)
- `resolveService(configName)` — scans `SERVICES` categories for a matching item name; returns `Service | null`
- `ROYAL_OAK_DATA` — Royal Oak Barber Shop page data with skin-fade/kids emphasis, `SHOP.landmarkRoyalOak` landmark, unique 200+ word intro naming the Royal Oak Transit Exchange
- `SAANICH_DATA` — Beard Trim in Saanich page data with beard-trim/hot-shave emphasis, `SHOP.landmarks` landmark, unique 200+ word intro referencing Saanich and Broadmead Village

No `$`-prefixed price literals appear in either data constant — all price/duration resolution goes through `resolveService()`.

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None. Both data entries are fully populated with unique copy. Prices/durations intentionally not rendered in this plan — they will be consumed by the landing component in Plan 02 via `resolveService()`.

## Threat Flags

None. All values are author-controlled build-time constants. No new network endpoints, auth paths, or file access patterns introduced.

## Self-Check: PASSED

- [x] `src/app/globals.css` contains `.btn-secondary` and `.btn-secondary:hover` — VERIFIED
- [x] `src/lib/config.ts` contains `landmarkRoyalOak` with "Royal Oak Transit Exchange" — VERIFIED
- [x] `src/lib/landing.ts` exports `ROYAL_OAK_DATA`, `SAANICH_DATA`, `resolveService` — VERIFIED
- [x] `SHOP.landmarks` unchanged — VERIFIED (LocationPreview.tsx line 56 still reads the original string)
- [x] Commits 11a294f, d146abb, a1c5935 exist in git log — VERIFIED
- [x] `npm run build` exits 0 — VERIFIED (all three tasks)
