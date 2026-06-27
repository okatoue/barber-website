# Phase 2: FAQ Page with FAQPage Schema - Context

**Gathered:** 2026-06-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Add a dedicated, indexable FAQ page at `/faq` on the existing Next.js (App Router, `output: "export"` static) site that answers the seven BrightLocal topics, emits valid `FAQPage` JSON-LD, and sets a per-page canonical. Content is driven from an expanded, config-driven `FAQ_ITEMS`. The homepage FAQ becomes a curated subset (visual teaser) rather than a byte-identical duplicate of `/faq`. `/faq` is linked from the footer (and the homepage teaser) and added to `src/app/sitemap.ts`; the static build must stay green and include `/faq`.

**In scope:**
- New route `src/app/faq/page.tsx` (static), with unique `metadata` (`title`, `description`) + `alternates.canonical: "/faq"`.
- Expanded FAQ content covering all 7 BrightLocal topics, config-driven.
- `FAQPage` JSON-LD emitted on `/faq` (and removed from the homepage — see decisions).
- Homepage FAQ trimmed to a curated 3–4-question subset.
- Footer link (+ homepage "see all FAQs" link) and a `sitemap.ts` entry.

**Out of scope (do NOT do this phase):**
- Google Business Profile work / config service renames — Phase 3.
- Booking, redesigns, new design system, or FAQ rich-result chasing (Google restricts FAQ rich results to gov/health sites — value here is topical relevance + voice/AI-overview eligibility, not the search accordion).
- New area landing pages — Phase 1 shipped; further areas are v2 (SEO-20).
</domain>

<decisions>
## Implementation Decisions

### FAQPage schema ownership
- **D-01:** `/faq` is the **sole owner** of `FAQPage` JSON-LD. The homepage FAQ (`src/components/FAQ.tsx`) **drops its `faqJsonLd` `<script>` block** and becomes a visual-only teaser. Rationale: one canonical `FAQPage` on the site, no two-FAQPage-block ambiguity. (FAQPage markup on `/faq` must match `/faq`'s visible questions/answers — FAQ-02.)

### Homepage FAQ subset
- **D-02:** The homepage keeps a **curated 3–4-question teaser** focused on conversion (walk-ins, kids' cuts, and timing/pricing are the priority topics). The full 7-topic set lives only on `/faq`. The homepage subset must not be a byte-identical duplicate of `/faq` (FAQ-03). Exact 3–4 questions are Claude's discretion within that conversion focus.
- Homepage presentation may keep its current accordion style (just trimmed + schema removed) — only `/faq`'s layout is specified below.

### /faq layout
- **D-03:** `/faq` renders a **static, all-answers-visible list grouped by category** (e.g. Visiting / Services / Kids — exact category names Claude's discretion). No click-to-expand required; all answer text is in the initial HTML for crawlability and scannability. Reuse existing design-system classes (`section`, `container`, `section-head`, `eyebrow`, `serif`, `lede`, `faq-*` or equivalent); add CSS only if necessary, following `globals.css` conventions.

### Answer content & specificity
- **D-04:** Pricing/timing answers **cite exact prices and durations pulled from `SERVICES` in `src/lib/config.ts`** (not hardcoded literals), so answers stay in sync with the menu. Cover all 7 topics with genuinely useful 1–3 sentence answers (FAQ-01), in the existing warm/neighbourhood `en_CA` brand voice.

### Linking & data model
- **D-05:** Link `/faq` from the **footer**, plus a "See all FAQs" link on the homepage teaser. **Header nav stays unchanged** (consistent with Phase 1's "keep header nav clean" stance). Add `/faq` to the manual array in `src/app/sitemap.ts` (mirror existing entries).
- **D-06:** Data-model split (full set vs homepage subset) is the planner's call — e.g. an expanded `FAQ_ITEMS` with category + a `homepage`/subset flag, or a full array plus a curated subset list. Whatever keeps a single source of truth and avoids duplicated answer strings.

### Claude's Discretion
- Exact 3–4 homepage questions (within the walk-ins / kids / timing-pricing conversion focus).
- Category names and grouping on `/faq`.
- Whether `/faq` is a new server component or adapts the existing `FAQ.tsx`; whether the homepage teaser stays a client accordion or also goes static.
- Exact `metadata` `title`/`description` copy (respect the `%s | Royal Look Barber Shop` template — don't double-brand).
- The precise FAQ_ITEMS data structure.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### FAQ source of truth (current state)
- `src/lib/config.ts` §FAQ (`FAQ_ITEMS`, ~line 176) — the 5 current items to expand to cover all 7 BrightLocal topics; also `SERVICES` (prices/durations to cite per D-04) and `SHOP`.
- `src/components/FAQ.tsx` — current homepage accordion (client component) that emits the `FAQPage` JSON-LD to be **removed** here and trimmed to a subset.
- `src/app/page.tsx` — homepage mounts `<FAQ />` (line ~20); homepage teaser change happens here / in `FAQ.tsx`.

### Patterns to mirror (metadata, canonical, design)
- `src/app/services/page.tsx` and `src/app/location/page.tsx` — `metadata` export + `alternates.canonical` pattern for the new `/faq` page; design-class usage and brand tone.
- `src/app/layout.tsx` — title template `%s | Royal Look Barber Shop`, `metadataBase`, sitewide `BarberShop` JSON-LD (`@id: ${siteUrl}/#barbershop`).
- `src/components/Footer.tsx` — footer link host for `/faq`.
- `src/app/sitemap.ts` — manual route array to extend with `/faq`.
- `src/app/globals.css` — `faq-*` and `section`/`container` class conventions.

### Planning docs
- `.planning/REQUIREMENTS.md` — FAQ-01…FAQ-04 (the 7 topics, FAQPage validity, config-driven subset, nav/footer + sitemap + clean build).
- `.planning/ROADMAP.md` §Phase 2 — goal, success criteria, and the rich-results caveat.
- `.planning/PROJECT.md` — decision: dedicated `/faq` owns full FAQ + schema; homepage becomes curated subset.
- `.planning/phases/RL-01-local-seo-landing-pages-royal-oak-saanich/01-CONTEXT.md` — Phase 1 conventions (config-driven content, canonical pattern, title-template no-double-brand, keep header nav clean).
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `FAQ.tsx` accordion markup + `faq-*` CSS — adaptable for both the trimmed homepage teaser and (optionally) the `/faq` page.
- `FAQ_ITEMS` (config) — single content source to expand; keeps `/faq` and homepage in sync.
- `SERVICES` (config) — prices/durations to cite in pricing/timing answers (D-04).
- `services/page.tsx` / `location/page.tsx` — copy-paste-shaped `metadata` + canonical scaffolding for a static route page.

### Established Patterns
- Config-driven content (`src/lib/config.ts`) + presentational components (`src/components/`) — new FAQ content lives in config, not in JSX.
- Per-page `metadata` with `alternates.canonical`; title template applied in `layout.tsx`.
- Manual `sitemap.ts` array (not generated) — add `/faq` explicitly.
- JSON-LD via `<script type="application/ld+json" dangerouslySetInnerHTML>` (as in `FAQ.tsx` today).

### Integration Points
- Homepage (`src/app/page.tsx` → `FAQ.tsx`): trim to subset + remove JSON-LD + add "see all FAQs" link.
- New `src/app/faq/page.tsx`: full grouped static FAQ + FAQPage JSON-LD + canonical.
- `Footer.tsx`: add `/faq` link. `sitemap.ts`: add `/faq` entry.
</code_context>

<specifics>
## Specific Ideas

- The 7 BrightLocal topics to cover on `/faq` (FAQ-01): walk-ins vs appointments, kids' cuts approach, skin-fade technique, beard-trim options, straight-razor shave hygiene, parking, and typical timing/pricing ranges.
- Homepage teaser priority topics: walk-ins, kids' cuts, timing/pricing (3–4 items).
- Pricing/timing answers cite exact figures from `SERVICES` config.
- `en_CA` locale; warm, neighbourhood brand voice (no hype), matching existing site copy.
- FAQPage markup on `/faq` must mirror the visible Q&A exactly (FAQ-02).
</specifics>

<deferred>
## Deferred Ideas

- Google Business Profile services alignment + config service renames (e.g. "Trim Beard" → "Beard Trim") — Phase 3.
- Additional area landing pages — v2 / SEO-20.
- FAQ rich-result (search accordion) eligibility — out of reach (Google limits to gov/health since 2023); not pursued.

None of the discussion strayed outside phase scope.
</deferred>

---

*Phase: 02-faq-page-with-faqpage-schema*
*Context gathered: 2026-06-27*
