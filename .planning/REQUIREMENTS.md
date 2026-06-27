# Requirements: Royal Look Barber Shop Website

**Defined:** 2026-06-26
**Core Value:** Show up in local search for the areas Royal Look serves and make it dead-simple to call or walk in.

## v1 Requirements

Requirements for the current milestone (local-SEO landing pages). Each maps to a roadmap phase.

### Local SEO Landing Pages

- [x] **SEO-01**: A landing page exists at `/royal-oak-barber-shop` titled "Royal Oak Barber Shop", emphasizing skin fades and kids' cuts, and referencing the Royal Oak Transit Exchange landmark.
- [x] **SEO-02**: A landing page exists at `/beard-trim-saanich` titled "Beard Trim in Saanich", emphasizing beard trims and hot-towel / straight-razor shaves.
- [x] **SEO-03**: Each page has a unique 150–250 word intro written for its area/service — no copy shared between pages or with the homepage (avoids thin/duplicate content).
- [x] **SEO-04**: Each page surfaces the relevant services and prices from `SERVICES` in `src/lib/config.ts` (not hardcoded duplicates).
- [x] **SEO-05**: Each page embeds the Google Map (`SHOP.googleMapsEmbed`), shows NAP, and has obvious call/book CTAs (`tel:` links with analytics `data-call-location`).
- [x] **SEO-06**: Each page sets a per-page canonical and emits valid `Service` / `LocalBusiness` JSON-LD structured data.
- [x] **SEO-07**: The pages are built from one reusable, data-driven landing-page component and match the existing design system (`section`, `container`, `section-head`, `eyebrow`, `serif`, `lede`, `card`, `btn-secondary`, `find-*`).
- [x] **SEO-08**: Both routes are added to `src/app/sitemap.ts`, and `npm run build` completes a clean static export including the two new routes.

### FAQ Page

- [x] **FAQ-01**: A dedicated, indexable FAQ page exists at `/faq` answering all seven BrightLocal topics — walk-ins vs appointments, kids' cuts approach, skin-fade technique, beard-trim options, straight-razor shave hygiene, parking, and typical timing/pricing ranges — with genuinely useful 1–3 sentence answers.
- [x] **FAQ-02**: The `/faq` page emits valid `FAQPage` JSON-LD whose questions/answers match the visible content, and sets a per-page canonical.
- [x] **FAQ-03**: FAQ content is config-driven (expanded `FAQ_ITEMS`); the homepage FAQ shows a curated subset rather than a byte-identical duplicate of `/faq` (avoids duplicate-page concerns).
- [x] **FAQ-04**: `/faq` is linked from the nav/footer and added to `src/app/sitemap.ts`; `npm run build` completes a clean static export including `/faq`.

### Google Business Profile Services (off-site, with optional config tweak)

- [x] **GBP-01**: Current GBP state is documented — primary/secondary categories, existing Services list + descriptions (or "none present"), and relevant attributes.
- [x] **GBP-02**: A gap table reconciles GBP services against the website `SERVICES`, flagging mismatched names and missing entries.
- [x] **GBP-03**: Paste-ready GBP service entries exist for Skin Fade, Classic Men's Cut, Kids' Cut, Hot-Towel Straight-Razor Shave, and Beard Trim or Lineup — clear names, short plain-English descriptions, **no phone numbers or URLs**, prices noted for the GBP price field.
- [x] **GBP-04**: Any site-side renames for site↔GBP consistency are listed for `config.ts` (e.g., "Trim Beard" → "Beard Trim", "Hot Shave" → "Hot-Towel Straight-Razor Shave"). Resolved as "no renames" per D-01 — deliberate owner choice.

## v2 Requirements

Deferred to future milestones. Tracked but not in the current roadmap.

### More Area Pages

- **SEO-20**: Additional area landing pages (e.g., Cordova Bay, Gordon Head) once the first two prove out.

### Off-Site (not a website task)

- **SEO-21**: Google Business Profile completeness + review-generation flow + consistent NAP citations (the larger local-ranking levers; tracked here as a reminder, executed outside the codebase).

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Standalone "Barber in Broadmead Village" page | Homepage already targets that query; a duplicate cannibalizes it |
| Online booking integration | Shop runs on walk-ins + phone; booking was removed deliberately |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| SEO-01 | Phase 1 | Complete |
| SEO-02 | Phase 1 | Complete |
| SEO-03 | Phase 1 | Complete |
| SEO-04 | Phase 1 | Complete |
| SEO-05 | Phase 1 | Complete |
| SEO-06 | Phase 1 | Complete |
| SEO-07 | Phase 1 | Complete |
| SEO-08 | Phase 1 | Complete |
| FAQ-01 | Phase 2 | Complete |
| FAQ-02 | Phase 2 | Complete |
| FAQ-03 | Phase 2 | Complete |
| FAQ-04 | Phase 2 | Complete |
| GBP-01 | Phase 3 | Complete |
| GBP-02 | Phase 3 | Complete |
| GBP-03 | Phase 3 | Complete |
| GBP-04 | Phase 3 | Complete |

**Coverage:**
- v1 requirements: 16 total
- Mapped to phases: 16
- Unmapped: 0

---
*Requirements defined: 2026-06-26*
*Last updated: 2026-06-26 after bootstrapping GSD planning*
