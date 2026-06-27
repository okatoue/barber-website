---
phase: 02-faq-page-with-faqpage-schema
plan: 03
subsystem: ui
tags: [faq, json-ld, sitemap, footer, next.js, typescript]

# Dependency graph
requires:
  - phase: 02-01
    provides: FAQ_ITEMS with homepage flag and FaqItem type in config.ts
  - phase: 02-02
    provides: /faq page as sole FAQPage JSON-LD owner
provides:
  - Homepage FAQ.tsx trimmed to homepage-flagged subset (no JSON-LD emitted)
  - "See all FAQs" link from homepage teaser to /faq
  - Footer Pages column link to /faq
  - /faq sitemap entry at priority 0.7
affects: [02-04, seo-audit, structured-data-verification]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Homepage FAQ teaser filters full FAQ_ITEMS via homepage flag — single source of truth, no duplication"
    - "FAQPage JSON-LD is sole-owner on /faq; homepage FAQ is visual-only"

key-files:
  created: []
  modified:
    - src/components/FAQ.tsx
    - src/components/Footer.tsx
    - src/app/sitemap.ts

key-decisions:
  - "homepage-flagged subset (3 items) rendered via FAQ_ITEMS.filter((item) => item.homepage) — avoids prop-drilling or separate array"
  - "See all FAQs link uses inline style (textAlign/marginTop) — FAQ.tsx uses plain CSS, no Tailwind utilities"
  - "/faq sitemap entry uses priority 0.7 matching /location — consistent with informational page tier"

patterns-established:
  - "Teaser-to-full-page pattern: homepage subset + CTA link to dedicated page"

requirements-completed: [FAQ-03, FAQ-04]

# Metrics
duration: 8min
completed: 2026-06-27
---

# Phase 2 Plan 03: Wire /faq into Site Shell + Trim Homepage FAQ Summary

**Homepage FAQ de-duplicated to a 3-item visual teaser (no JSON-LD), with a "See all FAQs" CTA; /faq linked from footer and added to sitemap at priority 0.7**

## Performance

- **Duration:** ~8 min
- **Started:** 2026-06-27
- **Completed:** 2026-06-27
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments

- Removed `faqJsonLd` const and `<script type="application/ld+json">` from FAQ.tsx — /faq is now the sole FAQPage schema owner (D-01)
- Filtered homepage FAQ rendering to `FAQ_ITEMS.filter((item) => item.homepage)` — 3-item curated subset replaces the full 9-item list (D-02)
- Added "See all FAQs →" anchor below `.faq-list` linking to `/faq` with centered inline style (D-05)
- Added `/faq` link to Footer Pages column alongside Menu / Barbers / Location (D-05 / FAQ-04)
- Added `/faq` sitemap entry (`changeFrequency: "monthly"`, `priority: 0.7`) to match the informational-page tier (FAQ-04)
- Header nav (Navbar.tsx / NAV_LINKS_LEFT / NAV_LINKS_RIGHT) left untouched as required (D-05)

## Task Commits

Each task was committed atomically:

1. **Task 1: Trim FAQ.tsx to homepage subset, remove FAQPage JSON-LD** - `467cfcb` (feat)
2. **Task 2: Add "See all FAQs" link to homepage FAQ teaser** - `30ecd62` (feat)
3. **Task 3: Link /faq from footer and add to sitemap** - `af954ff` (feat)

## Files Created/Modified

- `src/components/FAQ.tsx` - Removed FAQPage JSON-LD, filtered to homepage subset, added /faq CTA link
- `src/components/Footer.tsx` - Added `<li><a href="/faq">FAQ</a></li>` to Pages column
- `src/app/sitemap.ts` - Added `/faq` entry (monthly, priority 0.7)

## Decisions Made

- Used `FAQ_ITEMS.filter((item) => item.homepage)` assigned to a module-level const `homepageFaqs` — avoids recomputing on every render and reads clearly
- "See all FAQs" link uses inline style (`textAlign: "center"`, `marginTop: "1.5rem"`) — FAQ.tsx uses plain CSS classes throughout, no Tailwind
- `/faq` sitemap priority set to 0.7 matching `/location` — both are informational pages without direct booking intent

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All three D-01 / D-02 / D-05 decisions are now implemented across the three plans in phase 02
- Plan 02-04 (build verification — confirm homepage HTML has zero FAQPage blocks and /faq has exactly one) is the next and final step
- No blockers

## Self-Check

- [x] `src/components/FAQ.tsx` exists and contains no `application/ld+json`, has `homepage` filter, has `href="/faq"`
- [x] `src/components/Footer.tsx` exists and contains `href="/faq"` FAQ link in Pages column
- [x] `src/app/sitemap.ts` exists and contains `/faq` entry with priority 0.7
- [x] `npx tsc --noEmit` passes with zero errors
- [x] Navbar.tsx unchanged — no `/faq` added to header nav
- [x] Three task commits exist: 467cfcb, 30ecd62, af954ff

## Self-Check: PASSED

---
*Phase: 02-faq-page-with-faqpage-schema*
*Completed: 2026-06-27*
