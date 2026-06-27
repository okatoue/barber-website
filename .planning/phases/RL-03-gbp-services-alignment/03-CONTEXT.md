# Phase 3: Google Business Profile Services Alignment - Context

**Gathered:** 2026-06-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Off-site work: audit the live Google Business Profile, reconcile it with the website menu (`SERVICES` in `src/lib/config.ts`), and produce a paste-ready deliverable for populating the GBP **Services** section (which research confirmed is currently **empty** — net-new build, not an edit). Output is a repo document; publishing into the GBP dashboard is owner action.

**This phase is effectively zero-code** — all four owner judgment calls landed on "no code change" (see D-01, D-04). The repo artifact is a markdown deliverable, not a feature.

**In scope:**
- A paste-ready GBP deliverable doc in the phase folder (gap table + final service entries + decision notes).
- All 8 site services formatted as GBP entries (name, plain-English description, price field; no phone/URL).

**Out of scope (do NOT do this phase):**
- Any `src/lib/config.ts` service renames (D-01 — kept site-side as-is).
- Touching `googleReviewCount` (D-04 — already auto-managed).
- Adding new services to the menu, incl. "eyebrow trim" (D-03 — not offered).
- Secondary GBP category changes (D-05 — leave primary-only).
- Booking, new pages, GBP posts strategy, review-generation flow — separate concerns / other milestones.

</domain>

<decisions>
## Implementation Decisions

### GBP service naming / site↔GBP consistency (GBP-04)
- **D-01:** Leave `src/lib/config.ts` service names **untouched**. The polished, descriptive names ("Beard Trim", "Hot-Towel Straight-Razor Shave") are used **only in the GBP dashboard entries** — they are NOT mirrored back into the site menu. Rationale: zero code diff/risk; "Hot-Towel Straight-Razor Shave" reads clunky as a price-line item on the site; `src/lib/landing.ts` already shows "Beard Trim" on landing pages via its `displayName`↔`configName` mapping. GBP-04's "renames to apply in config.ts" is therefore **resolved as "no site renames"**, documented as a deliberate owner choice. The existing internal "Trim Beard" (config) vs "Beard Trim" (landing display) split is accepted as-is.

### Service scope on GBP (GBP-03)
- **D-02:** Publish **all 8** site services to the GBP Services section — not just the 5 BrightLocal core. The 5 core (Skin Fade $30, Classic Men's Cut / Regular Hair Cut $28, Kids' Cut $25, Hot-Towel Straight-Razor Shave / Hot Shave $35, Beard Trim or Lineup / Trim Beard $20) **plus** Buzz Cut $20, Senior's Cut $25, Hair Wash $7. Each needs a clear name, a short plain-English description with **no phone numbers or URLs** (Google flags these as spam), and the price for the GBP price field. RESEARCH §3 drafted the 5 core; the 3 extras need new short descriptions.
- **D-03:** "Eyebrow trim" (surfaced in Google's auto-extracted review topics) is **not offered** as a standalone service → exclude from both the site menu and the GBP Services list. No `SERVICES` change.

### Review count & secondary category (adjacent fixes)
- **D-04:** Leave `SHOP.googleReviewCount` (127) **untouched**. The live rating/count is already auto-pulled at build time via `src/lib/google-reviews.ts` (Google Places API New) and refreshed by the **daily cron** in `.github/workflows/deploy.yml`; the `127` literal is only the offline/local-dev fallback. The deployed site (`Hero.tsx`) already renders the live ~122. RESEARCH's "stale → update to 122" finding is therefore **moot for the live site** — no code change. (The "auto-pull from Google" idea the owner raised already exists; it is NOT a deferred idea.)
- **D-05:** GBP **secondary category** — leave **primary-only** ("Barber shop"). No strong second category fits; "Hair salon" would risk diluting relevance. Documented in the deliverable as a deliberate choice, not an oversight (per RESEARCH §4.4).

### Deliverable shape
- **D-06:** Repo output is a **paste-ready `GBP-ALIGNMENT.md`** in the phase folder containing: (a) the GBP-vs-site gap table (GBP-01/02), (b) all 8 final paste-ready service entries — name, plain-English description, price field, no phone/URL (GBP-03), (c) the no-rename resolution note (GBP-04), (d) the secondary-category and review-count notes. RESEARCH.md remains the working notes; this deliverable is the clean, copy-from artifact. Publishing into the GBP dashboard is owner action (off-site).

### Claude's Discretion
- Exact wording/length of the 3 extra service descriptions (Buzz Cut, Senior's Cut, Hair Wash) and any polish to the 5 drafted in RESEARCH §3 — keep them short, plain-English, `en_CA`, no phone/URL, within Google's GBP service-description length limit.
- Exact filename/structure of the deliverable (suggest `03-GBP-ALIGNMENT.md`), and whether to append a brief owner action-checklist plus the "confirm in dashboard" attribute list from RESEARCH §5.
- Category grouping/ordering of the 8 services in the deliverable.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Primary phase inputs
- `.planning/phases/RL-03-gbp-services-alignment/RESEARCH.md` — the GBP audit: current state (§1, Services section empty), website menu (§2), the 5 connect-the-dots entries + drafted descriptions (§3), owner decisions (§4), unverified-in-dashboard attributes to confirm (§5). **The single most important input for this phase.**
- `.planning/REQUIREMENTS.md` — GBP-01 (document GBP state), GBP-02 (gap table), GBP-03 (paste-ready entries, no phone/URL, prices), GBP-04 (site-side renames list — resolved as "none" per D-01).
- `.planning/ROADMAP.md` §Phase 3 — goal, success criteria, and the "descriptions must never contain phone/URL" / owner-only Services editor note.
- `.planning/PROJECT.md` — NAP-consistency constraint; "off-site GBP levers matter more than pages" framing.

### Source of truth & decision-supporting code (read-only)
- `src/lib/config.ts` — `SERVICES` (the 8-item menu to align to; names/prices) and `SHOP` (NAP, `googleReviewCount` fallback). Stays untouched this phase (D-01, D-04).
- `src/lib/google-reviews.ts` — build-time live review fetch with static fallback (explains why D-04 = no change).
- `.github/workflows/deploy.yml` — daily build cron that refreshes the live review count (explains D-04).
- `src/lib/landing.ts` (lines ~95–98) — existing `configName`↔`displayName` mapping that already surfaces "Beard Trim" (supports D-01).
- `src/components/ServiceHighlights.tsx`, `src/components/ReviewsSection.tsx` — where service names / the static review count surface (the ripple a config rename would have hit; left alone per D-01/D-04).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SERVICES` (`src/lib/config.ts`) — authoritative 8-item menu (name + price) that drives the gap table and the GBP entries.
- RESEARCH.md §3 — already-drafted plain-English descriptions for the 5 core services; reuse directly.
- `src/lib/google-reviews.ts` + daily deploy cron — already keep the live review count fresh; no new mechanism needed.

### Established Patterns
- Config-driven content (`src/lib/config.ts`) is the single source of truth; site display names can differ from config keys via mapping (`landing.ts`) rather than renaming the keys.
- Build-time external fetch with a static fallback + scheduled rebuild (the review-count pattern) — relevant context, not modified here.

### Integration Points
- **This phase does not modify application code.** Its only repo write is a new markdown deliverable (`GBP-ALIGNMENT.md`) in the phase folder. Actual publishing happens in the owner's GBP dashboard.

</code_context>

<specifics>
## Specific Ideas

- The 5 BrightLocal GBP service names + drafted descriptions live in RESEARCH §3 — reuse them.
- The 3 extras to add (D-02): Buzz Cut $20, Senior's Cut $25, Hair Wash $7 — need new short descriptions.
- Descriptions must contain **no phone numbers and no URLs** (Google spam flag) — hard rule from ROADMAP/GBP-03.
- `en_CA`, warm neighbourhood brand voice matching the rest of the site (no hype).
- Site config service names stay "Trim Beard" / "Hot Shave"; GBP uses the descriptive "Beard Trim" / "Hot-Towel Straight-Razor Shave" variants only.
- Secondary category note: primary-only is deliberate (D-05).

</specifics>

<deferred>
## Deferred Ideas

- **`ReviewsSection.tsx` review count:** line ~49 renders the *static* `SHOP.googleReviewCount` ("127+") instead of the live `getGoogleReviews()` value used by `Hero.tsx`. Minor accuracy lag; a separate cleanup, not Phase 3 scope.
- **Doc drift:** `PROJECT.md` / `REQUIREMENTS.md` describe deployment as "GitHub Pages", but `.github/workflows/deploy.yml` deploys to **Cloudflare Pages**. Worth correcting in a docs pass.
- **Additional area landing pages** — v2 / SEO-20 (Cordova Bay, Gordon Head, etc.).
- *(Not deferred — already exists:* auto-pulling the review count from Google. Implemented via `google-reviews.ts` + the daily deploy cron.)

</deferred>

---

*Phase: 03-gbp-services-alignment*
*Context gathered: 2026-06-27*
