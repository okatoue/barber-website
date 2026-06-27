# Phase 3: Google Business Profile Services Alignment - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-27
**Phase:** 03-gbp-services-alignment
**Areas discussed:** Config service renames, Eyebrow trim service, GBP list breadth, Deliverable & adjacent fixes (review count)

---

## Config service renames (GBP-04)

| Option | Description | Selected |
|--------|-------------|----------|
| Split: rename Beard, keep Hot Shave | Rename "Trim Beard"→"Beard Trim" in config everywhere; keep concise "Hot Shave" on site, full name on GBP only | |
| Rename both in config | Rename both names in config.ts, rippling through ~5 call sites; site and GBP read byte-identical | |
| No site changes at all | Leave config.ts untouched; polished names used only on GBP; zero code diff | ✓ |

**User's choice:** No site changes at all
**Notes:** GBP-04's "site renames" requirement resolves to "none — deliberate". Context grounding: "site↔GBP consistency" is clarity, not a ranking signal (NAP consistency = name/address/phone). Code ripple confirmed: a rename would touch config.ts (SERVICES + duration array + 2 `findService()` FAQ calls), `ServiceHighlights.tsx`, and `landing.ts` — which already maps `configName:"Trim Beard"`→`displayName:"Beard Trim"`.

---

## Eyebrow trim service

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — add it | Add to SERVICES (price + duration) and as a 6th GBP entry | |
| No — ignore it | Not a standalone service; leave off menu and GBP | ✓ |
| Included in other services | Done as part of cut/lineup; mention in a description but no standalone entry | |

**User's choice:** No — ignore it
**Notes:** Surfaced via Google's auto-extracted review topics (customers mention it), but owner confirmed it's not an offered service. No SERVICES change.

---

## GBP list breadth

| Option | Description | Selected |
|--------|-------------|----------|
| All 8 — full menu | 5 core + Buzz Cut $20, Senior's Cut $25, Hair Wash $7 | ✓ |
| Just the 5 core | Only the 5 BrightLocal services | |
| 5 core + Buzz/Senior only | Add the two cut variants, skip Hair Wash | |

**User's choice:** All 8 — full menu
**Notes:** Maximizes relevance surface; mirrors the full site menu. The 3 extras need new short descriptions (RESEARCH §3 only drafted the 5 core).

---

## Deliverable artifact

| Option | Description | Selected |
|--------|-------------|----------|
| Paste-ready GBP doc | Clean GBP-ALIGNMENT.md: gap table + all 8 entries + secondary-category note; RESEARCH.md stays as working notes | ✓ |
| RESEARCH.md is enough | Extend RESEARCH.md in place; no new doc | |
| Doc + checklist | Paste-ready doc plus an owner action-checklist | |

**User's choice:** Paste-ready GBP doc
**Notes:** Single source to copy each entry from into the GBP dashboard. (Whether to also append an owner checklist left to Claude's discretion.)

---

## Adjacent fix — stale review count

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — update to 122 | Change googleReviewCount 127→122 in config.ts | |
| Leave it — doc only | Keep config untouched; note discrepancy in deliverable | |
| I'll re-check the count first | Note it; owner verifies live number before setting | |
| **Other (user):** "Can you have it automatically pull from google?" → then "leave it as is, I'm pretty sure there is already a script that runs and updates it automatically" | Investigated and confirmed | ✓ |

**User's choice:** Leave as-is — auto-pull already exists
**Notes:** User's instinct was correct. Verification found `src/lib/google-reviews.ts` (build-time Google Places API fetch with `SHOP.googleReviewCount` as fallback only) + `.github/workflows/deploy.yml` daily cron (`0 11 * * *`) that rebuilds/redeploys. The deployed site (`Hero.tsx`) already shows the live ~122; the `127` literal is only the offline fallback. RESEARCH's "stale → update" finding is moot for the live site. No code change.

---

## Claude's Discretion

- Exact wording/length of the 3 extra service descriptions (Buzz Cut, Senior's Cut, Hair Wash) and any polish to the 5 drafted in RESEARCH §3 (short, plain-English, `en_CA`, no phone/URL, within Google's length limit).
- Deliverable filename/structure (suggested `03-GBP-ALIGNMENT.md`); whether to append an owner action-checklist + the RESEARCH §5 "confirm in dashboard" attribute list.
- Category grouping/ordering of the 8 services in the deliverable.

## Deferred Ideas

- `ReviewsSection.tsx` renders the static `SHOP.googleReviewCount` ("127+") instead of the live value — minor accuracy cleanup, not Phase 3 scope.
- Doc drift: PROJECT.md/REQUIREMENTS.md say "GitHub Pages" but deploy targets **Cloudflare Pages** — fix in a docs pass.
- Additional area landing pages — v2 / SEO-20.
- (Not deferred — already implemented: auto-pulling the review count from Google.)
