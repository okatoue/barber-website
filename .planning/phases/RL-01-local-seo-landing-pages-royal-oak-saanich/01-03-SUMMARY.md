---
phase: 01-local-seo-landing-pages-royal-oak-saanich
plan: "03"
subsystem: routing
tags: [seo, landing-pages, sitemap, footer, routing, canonical]
dependency_graph:
  requires:
    - src/lib/landing.ts (ROYAL_OAK_DATA, SAANICH_DATA — Plan 01-01)
    - src/components/LandingPage.tsx (default export — Plan 01-02)
    - src/lib/config.ts (SHOP.siteUrl, SHOP.areasServed)
  provides:
    - src/app/royal-oak-barber-shop/page.tsx (Royal Oak route with metadata + canonical)
    - src/app/beard-trim-saanich/page.tsx (Saanich route with metadata + canonical)
    - src/app/sitemap.ts (two new entries — priority 0.8, monthly)
    - src/components/Footer.tsx (Areas Served links to both new pages)
  affects:
    - out/sitemap.xml (two new royallook.ca/<slug> entries)
    - out/index.html (footer now contains href="/royal-oak-barber-shop" and href="/beard-trim-saanich")
tech_stack:
  added: []
  patterns:
    - Next.js App Router static route (src/app/<slug>/page.tsx)
    - Metadata export with relative alternates.canonical resolved by metadataBase
    - Layout title template ("%s | Royal Look Barber Shop") — no brand suffix in page title field
    - Sitemap.ts array extension with priority 0.8 / changeFrequency "monthly"
    - Footer map with conditional href (undefined keeps plain <a> for non-linked areas)
key_files:
  created:
    - src/app/royal-oak-barber-shop/page.tsx
    - src/app/beard-trim-saanich/page.tsx
  modified:
    - src/app/sitemap.ts
    - src/components/Footer.tsx
decisions:
  - "metadata.title uses bare page title only ('Royal Oak Barber Shop') — layout template appends '| Royal Look Barber Shop'; no double-branding"
  - "Footer href computed inline in the map (undefined for non-targeted areas) — minimal diff, zero new columns or components"
  - "description sourced from ROYAL_OAK_DATA.metaDescription / SAANICH_DATA.metaDescription to stay DRY and consistent with the data layer"
metrics:
  duration_minutes: 4
  completed_date: "2026-06-26"
  tasks_completed: 3
  tasks_total: 3
  files_created: 2
  files_modified: 2
---

# Phase 01 Plan 03: Routes, Sitemap, and Footer Links Summary

**One-liner:** Two thin Next.js route files (metadata + relative canonical + LandingPage render), two sitemap.ts entries at priority 0.8, and conditional Footer href map — both new pages now live at royallook.ca/<slug> with absolute canonicals and no orphan pages.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Create both route page.tsx files (metadata + canonical + LandingPage) | `67b114a` | src/app/royal-oak-barber-shop/page.tsx, src/app/beard-trim-saanich/page.tsx |
| 2 | Add both routes to sitemap.ts | `5997ef3` | src/app/sitemap.ts |
| 3 | Add Footer internal links (no orphan pages) | `d8a73f2` | src/components/Footer.tsx |

## What Was Built

**Task 1 — Route page.tsx files**

Created two thin Server Component route files following the pattern from `src/app/services/page.tsx`.

`src/app/royal-oak-barber-shop/page.tsx`: Exports `metadata` with `title: "Royal Oak Barber Shop"` (no brand suffix — layout template appends `| Royal Look Barber Shop`), `description` from `ROYAL_OAK_DATA.metaDescription`, and `alternates: { canonical: "/royal-oak-barber-shop" }` (relative string resolved to `https://royallook.ca/royal-oak-barber-shop` by `metadataBase` in layout). Default export renders `<LandingPage data={ROYAL_OAK_DATA} />`.

`src/app/beard-trim-saanich/page.tsx`: Same pattern. `title: "Beard Trim in Saanich"`, `description` from `SAANICH_DATA.metaDescription`, `alternates: { canonical: "/beard-trim-saanich" }`. Renders `<LandingPage data={SAANICH_DATA} />`.

Both pages build to static HTML (`out/royal-oak-barber-shop.html`, `out/beard-trim-saanich.html`) with correct `<link rel="canonical" href="https://royallook.ca/<slug>">` tags confirmed in built output.

**Task 2 — Sitemap entries**

Appended two entries to the returned array in `src/app/sitemap.ts`:
- `{ url: "${base}/royal-oak-barber-shop", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 }`
- `{ url: "${base}/beard-trim-saanich", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 }`

The four pre-existing entries (home, barbers, services, location) and `export const dynamic = "force-static"` are untouched. Both new URLs confirmed in `out/sitemap.xml` after build.

**Task 3 — Footer internal links**

In the `SHOP.areasServed.map` within `Footer.tsx`, replaced the static `<a>{area}</a>` render with a computed `href` variable: `"Royal Oak"` maps to `"/royal-oak-barber-shop"`, `"Saanich"` maps to `"/beard-trim-saanich"`, all other areas get `undefined`. This produces `<a href="/royal-oak-barber-shop">` and `<a href="/beard-trim-saanich">` while leaving all other area items as plain `<a>` with no href — identical to existing behavior. Both hrefs confirmed in `out/index.html` after build.

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None. Both route files are fully wired: they import real data from `ROYAL_OAK_DATA` / `SAANICH_DATA` (Plan 01-01) and render the fully-built `LandingPage` component (Plan 01-02). Sitemap entries are real URLs. Footer links point to real routes.

## Threat Flags

None. Two new static routes compiled from author-controlled build-time constants (no user input, no runtime data flow). Pattern is identical to existing static routes (`/services`, `/barbers`, `/location`). T-1-04 (canonical + sitemap URL correctness) already accepted in the plan's threat register.

## Self-Check: PASSED

- [x] `src/app/royal-oak-barber-shop/page.tsx` exists — VERIFIED
- [x] `src/app/beard-trim-saanich/page.tsx` exists — VERIFIED
- [x] `ROYAL_OAK_DATA` and `"/royal-oak-barber-shop"` in royal-oak page.tsx — VERIFIED
- [x] `SAANICH_DATA` and `"/beard-trim-saanich"` in beard-trim page.tsx — VERIFIED
- [x] `out/royal-oak-barber-shop.html` contains `rel="canonical" href="https://royallook.ca/royal-oak-barber-shop"` — VERIFIED
- [x] `out/beard-trim-saanich.html` contains `rel="canonical" href="https://royallook.ca/beard-trim-saanich"` — VERIFIED
- [x] `out/sitemap.xml` contains `https://royallook.ca/royal-oak-barber-shop` — VERIFIED
- [x] `out/sitemap.xml` contains `https://royallook.ca/beard-trim-saanich` — VERIFIED
- [x] `out/index.html` contains `href="/royal-oak-barber-shop"` and `href="/beard-trim-saanich"` — VERIFIED
- [x] Commits `67b114a`, `5997ef3`, `d8a73f2` exist — VERIFIED
- [x] `npm run build` exits 0 (all 13 static pages generated) — VERIFIED
