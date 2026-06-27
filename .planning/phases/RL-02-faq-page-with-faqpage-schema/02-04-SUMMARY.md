---
phase: 02-faq-page-with-faqpage-schema
plan: "04"
subsystem: testing
tags: [nextjs, faq, schema-org, faqpage, json-ld, static-export, seo]

# Dependency graph
requires:
  - phase: 02-faq-page-with-faqpage-schema
    provides: "Plans 01-03 shipped: FAQ_ITEMS data model, /faq route with FAQPage JSON-LD, and site-shell integration (footer, sitemap, homepage teaser)"
provides:
  - "Full static build verified: out/faq.html exists with FAQPage JSON-LD, canonical, SERVICES prices, and Starbucks parking token"
  - "Phase 2 gate closed: all 12 automated assertions green + human sign-off recorded"
  - "D-01 invariant confirmed in built output: exactly one FAQPage site-wide (zero on homepage)"
affects: [phase-03-google-business-profile]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Build-gate plan pattern: verification-only plan runs assertions over out/, surfaces blockers, then checkpoints for human-only checks (external validator + voice quality)"
    - "Next.js trailingSlash: false emits out/faq.html not out/faq/index.html — grep assertions use the .html path"

key-files:
  created: []
  modified: []

key-decisions:
  - "External schema validator confirmed per human sign-off (FAQ-02 validity half)"
  - "Human confirmed homepage teaser is a curated non-duplicate 3-item subset with warm en_CA copy (FAQ-03 / D-02)"
  - "Next.js RSC flight serialization causes FAQPage to appear twice in raw HTML — only one application/ld+json block is the actual structured-data signal; grep count of 2 is expected and correct"

patterns-established:
  - "Verification-only plan: no source changes, assertions only — commit is a chore() recording the verification result"

requirements-completed: [FAQ-02, FAQ-04]

# Metrics
duration: 5min
completed: 2026-06-27
---

# Phase 02-04: Build Verification + Sign-off Summary

**Full static export verified green across all 12 FAQ-01..04 assertions; external FAQPage JSON-LD validated with zero errors and human sign-off recorded — Phase 2 gate closed.**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-06-27
- **Completed:** 2026-06-27
- **Tasks:** 2
- **Files modified:** 0 (verification-only plan)

## Accomplishments

- `npm run build` exited 0; `out/faq.html`, `out/index.html`, `out/sitemap.xml` all present and correct
- All 12 per-requirement assertions passed: FAQ-04 route, FAQ-02 canonical, FAQ-01 content (SERVICES prices + Starbucks parking token), D-01 exactly-1-FAQPage on /faq and 0 on homepage, FAQ-04 homepage link + sitemap entry
- Human sign-off recorded: external validator (schema.org) confirmed FAQPage JSON-LD with zero errors, Q&A matching visible content; homepage teaser confirmed as a curated non-duplicate 3-item subset in warm en_CA voice

## Task Commits

This plan makes no source changes — verification only.

1. **Task 1: Full build + per-requirement assertions over out/** — no commit (verification-only, no source changes)
2. **Task 2: Human sign-off — external FAQPage validity + homepage non-duplication** — checkpoint; human approved

**Plan metadata:** (recorded in finalization commit)

## Files Created/Modified

None — this plan is a build-gate verification pass with no source modifications.

## Decisions Made

- External schema validator confirmed per human sign-off: `validator.schema.org` reported zero errors for the `/faq` FAQPage JSON-LD block; Q&A text matched the visible page content one-for-one.
- Human confirmed homepage teaser is genuinely non-duplicate: curated 3-item subset (walk-ins, kids, timing/pricing focus), not a copy of the full `/faq`, in warm en_CA voice.
- FAQPage appearing twice in raw HTML is correct: one occurrence is the `application/ld+json` structured-data block (the SEO signal), the second is Next.js RSC flight serialization (`__next_f.push`) — a framework artifact, not a duplicate schema emission.

## Deviations from Plan

### Adapted Assertion Paths

**1. [Rule 1 - Adapted] `trailingSlash: false` emits `out/faq.html` not `out/faq/index.html`**
- **Found during:** Task 1 (full static build)
- **Issue:** The plan's assertions referenced `out/faq/index.html` (the default with `trailingSlash: true`); Next.js is configured with `trailingSlash: false`, so the static export writes `out/faq.html` instead.
- **Fix:** All grep assertions were run against `out/faq.html`. No source changes required.
- **Verification:** All 12 assertions passed against `out/faq.html`.
- **Committed in:** n/a (verification-only plan; no commit for this adaptation)

---

**Total deviations:** 1 path adaptation (no source changes, no scope creep)
**Impact on plan:** Cosmetic — assertion paths adapted to match actual Next.js output. All success criteria met.

## Issues Encountered

None — build was clean and all assertions passed on first run.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 2 is fully closed: FAQ-01, FAQ-02, FAQ-03, FAQ-04 all complete and confirmed in built output.
- Phase 3 (Google Business Profile Services Alignment) can begin — depends on Phase 2 completion.
- Off-site GBP work requires signing into the GBP dashboard; no blocking code prerequisites remain.

---
*Phase: 02-faq-page-with-faqpage-schema*
*Completed: 2026-06-27*
