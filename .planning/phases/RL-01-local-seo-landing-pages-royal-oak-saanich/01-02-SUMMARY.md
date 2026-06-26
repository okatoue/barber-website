---
phase: 01-local-seo-landing-pages-royal-oak-saanich
plan: "02"
subsystem: ui-component
tags: [seo, landing-pages, server-component, json-ld, schema-org]
dependency_graph:
  requires:
    - src/lib/landing.ts (LandingPageData type, resolveService, ROYAL_OAK_DATA, SAANICH_DATA)
    - src/lib/config.ts (SHOP — NAP, hours, googleMapsEmbed, siteUrl)
    - src/app/globals.css (.btn-secondary, .find-grid, .find-map, .find-info, .menu-col, .menu-row, .section, .section-head, .eyebrow)
  provides:
    - src/components/LandingPage.tsx (reusable Server Component for landing pages)
  affects:
    - src/app/royal-oak-barber-shop/page.tsx (Plan 03 will import this component)
    - src/app/beard-trim-saanich/page.tsx (Plan 03 will import this component)
tech_stack:
  added: []
  patterns:
    - Server Component (no "use client") consuming LandingPageData prop
    - JSON-LD @graph via dangerouslySetInnerHTML (same pattern as layout.tsx)
    - resolveService() for config-driven prices — no hardcoded price literals in JSX
    - provider @id pointer to sitewide #barbershop node (no duplicate BarberShop emission)
    - data-call-location on all tel: links for Analytics.tsx delegated call_click tracking
key_files:
  created:
    - src/components/LandingPage.tsx
  modified: []
decisions:
  - "JSON-LD Service.provider emits only { '@id': '#barbershop' } — no @type/name/address — to avoid the duplicate BarberShop node pitfall documented in RESEARCH Pitfall 4"
  - "h1Emphasis carries the trailing period (e.g. 'Barber Shop.'); the component strips it to locate the split point in data.h1, then renders the full h1Emphasis inside <em>"
  - "data.intro is split on double-newlines to render as separate <p> elements for correct paragraph spacing"
  - "OpenStatus pill omitted per plan discretion — static export means the build-time date is stale for time-of-day status anyway; hours-grid already conveys all hour info"
metrics:
  duration_minutes: 10
  completed_date: "2026-06-26"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 0
---

# Phase 01 Plan 02: LandingPage Component Summary

**One-liner:** Reusable `LandingPage` Server Component with config-driven services (via `resolveService`), Google Map + NAP + hours block, `data-call-location` CTAs, and a per-page JSON-LD `@graph` (Service nodes + BreadcrumbList referencing `#barbershop` by `@id` only).

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Build LandingPage.tsx visible UI (header, intro, services, map, NAP, CTA) | `5b44b14` | src/components/LandingPage.tsx |
| 2 | Emit per-page JSON-LD @graph (Service entities + BreadcrumbList) | `5b44b14` | src/components/LandingPage.tsx |

*Both tasks written in a single atomic commit — the JSON-LD graph is defined at the top of the component function alongside the visible UI.*

## What Was Built

**Task 1 — Visible UI**

Created `src/components/LandingPage.tsx` as a Server Component (no `"use client"`). Accepts a single `{ data }: { data: LandingPageData }` prop. Renders two `<section className="section">` blocks:

- **Section 1 (Header + Intro + Services):** `section-head` with `.eyebrow` and `h1.serif`. The `h1` is split at `data.h1Emphasis` (which carries a trailing period); the emphasis portion is wrapped in `<em>` for italic gold styling. Below the header, `data.intro` is split on `\n\n` and rendered as multiple `<p>` elements (constrained to `maxWidth: "70ch"`). Emphasized services render as `menu-col` / `menu-row` entries with `.nm`, `.dur` (from `resolveService`), and `.pr.serif` price (from `resolveService`) — no `$`-prefixed price literals in the JSX.

- **Section 2 (Map + NAP + Hours + CTA):** `find-grid` containing a `find-map` iframe (`src={SHOP.googleMapsEmbed}`, verbatim attributes from `LocationPreview.tsx`) and a `find-info` block: `h3.serif` shop name, `.addr` with full street/city/province/postal NAP and an inline `tel:` link carrying `data-call-location={data.callLocation}`, `find-note` for `data.landmark`, `hours-grid` mapping `SHOP.hours` with today highlight, and a primary `<a className="btn btn-secondary">` CTA with `data-call-location={data.callLocationPrimary}`.

No stale token classes used: `text-gold`, `bg-surface`, `border-border`, `section-heading`, `card` are all absent.

**Task 2 — JSON-LD @graph**

At the top of the component's JSX (wrapped in a fragment), a `<script type="application/ld+json">` tag emits a `@graph` array built at render time:

- One `Service` node per `data.emphasizedServices` entry: `name` = `displayName — Royal Look Barber Shop`, `serviceType`, `description` (optional, defaults to `""`), `areaServed` = `{ "@type": "Place", "name": data.areaServedName }`, `provider` = `{ "@id": "${SHOP.siteUrl}/#barbershop" }` (ID pointer only — no duplicate BarberShop node), `offers` = `{ "@type": "Offer", "priceCurrency": "CAD", "price": <stripped numeric string> }`.
- One `BreadcrumbList` node with ListItem position 1 → Home (`SHOP.siteUrl`) and position 2 → page (`${SHOP.siteUrl}/${data.slug}`).

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. All data fields are consumed from the fully-populated `LandingPageData` entries created in Plan 01. Prices and durations resolve through `resolveService()` at build time from `SERVICES` config.

## Threat Flags

None. JSON-LD is built from author-controlled build-time constants only (`SHOP`, `SERVICES`, `LandingPageData` literals) — no user or runtime input flows into `dangerouslySetInnerHTML`. Identical pattern to the sitewide script in `layout.tsx` (T-1-02 already accepted). The Google Maps iframe uses `referrerPolicy="no-referrer-when-downgrade"` matching existing site behavior (T-1-03 accepted).

## Self-Check: PASSED

- [x] `src/components/LandingPage.tsx` exists (212 lines) — VERIFIED
- [x] No `"use client"` directive — VERIFIED (`grep -q 'use client' src/components/LandingPage.tsx` returns no match)
- [x] Contains `data-call-location`, `googleMapsEmbed`, `resolveService`, `find-grid`, `menu-row` — VERIFIED
- [x] Contains `application/ld+json`, `@graph`, `#barbershop`, `BreadcrumbList` — VERIFIED
- [x] No `$`-prefixed price literals in JSX (prices come from `resolveService`) — VERIFIED
- [x] `btn btn-secondary` primary CTA present — VERIFIED
- [x] Commit `5b44b14` exists — VERIFIED
- [x] `npm run build` exits 0 — VERIFIED (11 static pages generated successfully)
