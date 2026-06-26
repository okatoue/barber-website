# Roadmap: Royal Look Barber Shop Website

## Overview

The site already ranks for its brand and homepage targets "Barber in Broadmead Village". The next step toward local-search visibility is dedicated area/service landing pages that capture the long-tail queries BrightLocal flagged — without cannibalizing the homepage. This milestone ships two such pages (Royal Oak, Saanich beard trim), built from one reusable component, with the full local-SEO checklist (unique copy, map, NAP, CTAs, canonical, structured data, sitemap). A second phase adds a dedicated, indexable FAQ page with FAQPage schema answering the questions BrightLocal flagged — deepening topical relevance and supporting voice / AI-overview search.

## Phases

**Phase Numbering:**

- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Local SEO Landing Pages — Royal Oak & Saanich** - Two unique area/service landing pages with the full local-SEO checklist
- [ ] **Phase 2: FAQ Page with FAQPage Schema** - Dedicated, indexable FAQ page covering BrightLocal's seven topics, with FAQPage structured data
- [ ] **Phase 3: Google Business Profile Services Alignment** - Audit current GBP, reconcile with the website menu, produce five paste-ready service entries

## Phase Details

### Phase 1: Local SEO Landing Pages — Royal Oak & Saanich

**Goal**: Ship two new local-SEO landing pages on royallook.ca — `/royal-oak-barber-shop` and `/beard-trim-saanich` — each with unique area/service-targeted copy, embedded Google Map, NAP, clear call CTAs, per-page canonical, and Service/LocalBusiness structured data. Built from one reusable, data-driven landing-page component, with both routes added to the sitemap and a new Royal Oak Transit Exchange landmark in config. Captures the local search intent BrightLocal flagged without cannibalizing the homepage (which stays the Broadmead Village primary).
**Depends on**: Nothing (first phase)
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, SEO-07, SEO-08
**Success Criteria** (what must be TRUE):

  1. Visiting `/royal-oak-barber-shop` renders a unique page titled "Royal Oak Barber Shop" with a ≥150-word intro emphasizing skin fades + kids' cuts, the Royal Oak Transit Exchange landmark, the map, NAP, and call CTAs.
  2. Visiting `/beard-trim-saanich` renders a unique page titled "Beard Trim in Saanich" with a ≥150-word intro emphasizing beard trims + hot-towel/straight-razor shaves, the map, NAP, and call CTAs.
  3. The two intros share no copy with each other or the homepage, and services/prices are pulled from `SERVICES` in config (not duplicated).
  4. Both URLs appear in the generated `sitemap.xml`, and each page emits a per-page canonical plus valid Service/LocalBusiness JSON-LD.
  5. `npm run build` completes a clean static export that includes both new routes.

**Plans**: 4 plans

Plans:
**Wave 1**

- [x] 01-01-PLAN.md — Foundations: define `.btn-secondary`, add `SHOP.landmarkRoyalOak`, create `src/lib/landing.ts` (types + resolveService + two unique-intro data entries)

**Wave 2** *(blocked on Wave 1 completion)*

- [x] 01-02-PLAN.md — Reusable `LandingPage` Server Component: header/intro/config-priced services + map/NAP/hours/Call CTA + per-page JSON-LD `@graph`

**Wave 3** *(blocked on Wave 2 completion)*

- [ ] 01-03-PLAN.md — Route pages (`/royal-oak-barber-shop`, `/beard-trim-saanich`) with metadata + canonical, sitemap entries, and Footer internal links

**Wave 4** *(blocked on Wave 3 completion)*

- [ ] 01-04-PLAN.md — Build verification + sign-off: full static build, SEO-01..08 assertions over `out/`, external JSON-LD + intro-uniqueness human checkpoint

### Phase 2: FAQ Page with FAQPage Schema

**Goal**: Add a dedicated, indexable FAQ page at `/faq` that answers the questions BrightLocal flagged — walk-ins vs appointments, kids' cuts approach, skin-fade technique, beard-trim options, straight-razor shave hygiene, parking, and typical timing/pricing ranges — and emits valid FAQPage structured data. Expand the config-driven `FAQ_ITEMS` to cover these topics, keep the homepage FAQ as a curated subset (so the two pages aren't identical duplicates), add `/faq` to the nav/footer and sitemap, and set a per-page canonical.
**Depends on**: Phase 1
**Requirements**: FAQ-01, FAQ-02, FAQ-03, FAQ-04
**Success Criteria** (what must be TRUE):

  1. Visiting `/faq` renders a dedicated page that answers all seven topics with genuinely useful 1–3 sentence answers (not one-liners).
  2. `/faq` emits valid `FAQPage` JSON-LD whose questions/answers match the visible content, and sets a per-page canonical.
  3. FAQ content is driven from config (expanded `FAQ_ITEMS`), and the homepage FAQ shows a curated subset rather than a byte-identical duplicate of `/faq`.
  4. `/faq` is linked from the nav/footer and added to `sitemap.ts`; `npm run build` completes a clean static export including `/faq`.

**Note**: Google restricted FAQ *rich results* (the accordion in search) to authoritative gov/health sites in 2023 — don't expect rich snippets here. The value is topical relevance, answer clarity, and voice / AI-overview eligibility.
**Plans**: TBD (set during plan-phase)

Plans:

- [ ] 02-01: TBD — created by /gsd:plan-phase 2

### Phase 3: Google Business Profile Services Alignment

**Goal**: Audit the live Google Business Profile (primary/secondary category, current Services list + descriptions, key attributes) and reconcile it with the website menu in `config.ts`, then produce five clear, plain-English service entries — Skin Fade, Classic Men's Cut, Kids' Cut, Hot-Towel Straight-Razor Shave, Beard Trim or Lineup — with no phone numbers or URLs in the description fields. Output is a gap analysis (what's on GBP vs the site) plus paste-ready GBP copy and any small website menu renames needed for site↔GBP consistency. This is off-site work in the GBP dashboard; the only code touched is optional `config.ts` label tweaks.
**Depends on**: Phase 2
**Requirements**: GBP-01, GBP-02, GBP-03, GBP-04
**Success Criteria** (what must be TRUE):

  1. Research has captured the current GBP state — primary/secondary categories, the existing Services list and descriptions (or confirmed none exist), and relevant attributes.
  2. A gap table maps current GBP services against the website `SERVICES`, flagging mismatched names and missing entries.
  3. Final, paste-ready GBP service entries exist for all five offerings — clear names, short plain-English descriptions, no phone numbers or URLs (per Google guidelines), with prices noted for the GBP price field.
  4. Any site-side renames needed for site↔GBP consistency are listed (e.g., "Trim Beard" → "Beard Trim", "Hot Shave" → "Hot-Towel Straight-Razor Shave") to apply in `config.ts`.

**Note**: The public listing exposes category / some services / attributes without login; the editable Services section is owner-only, so confirming and publishing requires signing into the GBP dashboard. Descriptions must never contain phone/URL or Google flags them as spam.
**Plans**: TBD (set during plan-phase)

Plans:

- [ ] 03-01: TBD — created by /gsd:plan-phase 3

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Local SEO Landing Pages — Royal Oak & Saanich | 2/4 | In Progress|  |
| 2. FAQ Page with FAQPage Schema | 0/TBD | Not started | - |
| 3. Google Business Profile Services Alignment | 0/TBD | Not started | - |
