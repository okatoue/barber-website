# Royal Look Barber Shop Website

## What This Is

Marketing website for Royal Look Barber Shop, a walk-in barber shop inside Broadmead Village Shopping Centre in Saanich (Royal Oak), Victoria BC. Built with Next.js (App Router, static export to `out/`) and deployed to royallook.ca via GitHub Pages. Its job is to win local search ("barber near me", "barber Royal Oak", "beard trim Saanich"), then convert visitors into walk-ins or phone bookings.

## Core Value

Show up in local search for the neighbourhoods Royal Look serves and make it dead-simple to call or walk in. If everything else fails, a nearby person searching for a barber must find this shop and reach the "Call" button.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- [x] Local-SEO landing pages for the areas/services Royal Look targets — `/royal-oak-barber-shop` + `/beard-trim-saanich` (SEO-01..08). *Shipped in Phase 1; local-ranking impact to be confirmed over time.*

### Active

<!-- Current scope. Building toward these. -->

- [ ] Dedicated FAQ page with FAQPage schema covering BrightLocal's seven topics (see REQUIREMENTS.md)
- [ ] Google Business Profile services audit + alignment with the website menu (off-site; see REQUIREMENTS.md)

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- A standalone "Barber in Broadmead Village" landing page — the homepage already targets that query as its primary keyword; a second page would cannibalize it.
- Online booking — removed previously; the shop runs on walk-ins + phone (call CTAs only).

## Context

- Stack: Next.js App Router, `output: "export"` static site, deployed to GitHub Pages at royallook.ca.
- Content is config-driven: `src/lib/config.ts` holds `SHOP` (NAP, hours, map embed, landmarks, areas served), `SERVICES`, `BARBERS`, `FAQ_ITEMS`.
- Existing routes: `/` (home), `/services`, `/barbers`, `/location`. Sitewide `BarberShop` JSON-LD lives in `src/app/layout.tsx`; NAP is in `src/components/Footer.tsx`.
- SEO driver: BrightLocal recommended dedicated area/service landing pages with unique intros, key services, local landmarks, an embedded Google Map, NAP, and clear call/book CTAs.
- Reality check: for a barber shop, Google Business Profile + reviews + consistent citations move local rankings more than website pages. These pages reinforce relevance; they are not the whole strategy.

## Constraints

- **Tech stack**: Next.js static export — no server runtime; everything must build to static HTML. New pages are `src/app/<route>/page.tsx`.
- **SEO**: Avoid keyword cannibalization with the homepage (Broadmead Village stays the homepage's keyword). Each new page needs genuinely unique copy, not templated boilerplate, or Google treats it as thin/duplicate.
- **NAP consistency**: address/phone string must match Google Business Profile exactly across the site.

## Key Decisions

<!-- Decisions that constrain future work. Add throughout project lifecycle. -->

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Homepage remains the primary "Barber in Broadmead Village" page; no separate Broadmead landing page | Homepage is the strongest page and already titled for that query; a duplicate would split ranking signals (cannibalization) | Applied in Phase 1 — shipped Royal Oak + Saanich pages, no Broadmead page |
| Build area/service landing pages from one reusable, data-driven component | Keeps the two pages (and future areas) consistent and cheap to extend | Applied in Phase 1 — single `LandingPage.tsx` renders both routes from `landing.ts` data |
| Dedicated `/faq` page owns the full FAQ set + FAQPage schema; homepage FAQ becomes a curated subset | The homepage already emits FAQPage schema from `FAQ_ITEMS`; a second identical block would duplicate. Keep one full indexable page and a trimmed homepage teaser | — Pending |

---
*Last updated: 2026-06-26 — Phase 1 complete (two local-SEO landing pages shipped & verified)*
