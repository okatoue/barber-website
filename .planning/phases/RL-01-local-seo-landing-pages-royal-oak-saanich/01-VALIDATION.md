---
phase: 1
slug: local-seo-landing-pages-royal-oak-saanich
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-06-26
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.
> This project has **no test runner**. All validation is static-build-output inspection: run `npm run build` (static export to `out/`) and assert on the generated HTML/XML.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None installed — validation is build-output inspection |
| **Config file** | none |
| **Quick run command** | `npm run build` (exits 0 on success) |
| **Full suite command** | `npm run build` + grep assertions over `out/` HTML and `out/sitemap.xml` |
| **Estimated runtime** | ~30–60 seconds |

---

## Sampling Rate

- **After every task commit:** `npm run build` must exit 0 (no broken route/type error).
- **After every plan wave:** full build + HTML grep assertions for that wave's requirements.
- **Before `/gsd:verify-work`:** full build green + all requirement assertions below pass + JSON-LD validated in Google Rich Results Test.
- **Max feedback latency:** ~60 seconds (one build).

---

## Per-Requirement Verification Map

Task IDs are assigned by the planner; this maps each requirement to its concrete build-output assertion.

| Requirement | Secure/Expected Behavior | Test Type | Automated Command / Assertion |
|-------------|--------------------------|-----------|-------------------------------|
| SEO-01 | `/royal-oak-barber-shop` builds; H1 "Royal Oak Barber Shop"; mentions "Royal Oak Transit Exchange", skin fade, kids | build-output | `out/royal-oak-barber-shop/index.html` contains `<h1`…`Royal Oak Barber Shop`, `Royal Oak Transit Exchange`, `kids` |
| SEO-02 | `/beard-trim-saanich` builds; H1 "Beard Trim in Saanich"; mentions beard trim + hot-towel/straight-razor | build-output | `out/beard-trim-saanich/index.html` contains `<h1`…`Beard Trim in Saanich`, `beard`, `hot` or `straight razor` |
| SEO-03 | Two intros unique (no shared sentence) and each ≥150 words | source diff + word count | Compare intro strings in `src/lib/landing.ts`; no sentence shared with each other or `Hero`/home copy; each ≥150 words |
| SEO-04 | Services/prices match `SERVICES` in config | config cross-ref | Rendered HTML prices match config (`$30` Skin Fade, `$25` Kids, `$20` Trim Beard, `$35` Hot Shave); values sourced from config, not literals |
| SEO-05 | Map iframe + NAP + `tel:` CTA with `data-call-location` per page | build-output | Each `index.html` contains `maps.google.com/maps?q=`, `777 Royal Oak Dr`, `href="tel:`, unique `data-call-location` value |
| SEO-06 | Per-page canonical + valid Service/LocalBusiness JSON-LD | build-output + validator | HTML has `<link rel="canonical" href="https://royallook.ca/<slug>"`; `<script type="application/ld+json">` validates in Google Rich Results Test with `provider @id` referencing `#barbershop` (no duplicate node) |
| SEO-07 | Both pages render from ONE reusable component + correct design classes | code review + build-output | Both `page.tsx` import the same `LandingPage` component; HTML contains `section`, `container`, `section-head`, `find-grid/find-map/find-info` classes (from `services`/`LocationPreview`, NOT the stale `location/page.tsx` token set) |
| SEO-08 | Both URLs in sitemap; clean static export | build-output | `npm run build` exits 0; `out/sitemap.xml` contains both `royallook.ca/royal-oak-barber-shop` and `royallook.ca/beard-trim-saanich` |

---

## Wave 0 Requirements

- [ ] Define `.btn-secondary` in `src/app/globals.css` — referenced in 3 files but **never defined**; CTAs render unstyled without it (blocks SEO-05 visual). Decide color: accent/gold (recommended for a prominent call CTA) vs navy.
- [ ] If the in-page info panel needs `.card`, either define `.card` in `globals.css` or use the existing `find-info` structure (preferred — avoids adding a class).

*No test-framework install needed — this project has no automated test runner.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| JSON-LD is valid + eligible | SEO-06 | Needs Google's external validator | After build, paste each page's `application/ld+json` into Google Rich Results Test / validator.schema.org; expect no errors |
| Intros read as genuinely unique, locally specific, non-spammy | SEO-03 | Quality judgement, not greppable | Human read of both intros; confirm distinct voice, real local detail, no doorway-page keyword stuffing |

---

## Validation Sign-Off

- [ ] Every requirement has a build-output assertion or Wave 0 dependency
- [ ] Sampling continuity: build runs after each task (latency < 60s)
- [ ] Wave 0 covers `.btn-secondary` (and `.card` decision)
- [ ] JSON-LD validated externally before verify-work
- [ ] `nyquist_compliant: true` set in frontmatter (by checker after planning)

**Approval:** pending
