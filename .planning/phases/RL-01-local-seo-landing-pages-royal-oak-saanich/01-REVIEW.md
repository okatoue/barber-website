---
phase: RL-01-local-seo-landing-pages-royal-oak-saanich
reviewed: 2026-06-26T21:48:31Z
depth: standard
files_reviewed: 8
files_reviewed_list:
  - src/app/beard-trim-saanich/page.tsx
  - src/app/globals.css
  - src/app/royal-oak-barber-shop/page.tsx
  - src/app/sitemap.ts
  - src/components/Footer.tsx
  - src/components/LandingPage.tsx
  - src/lib/config.ts
  - src/lib/landing.ts
findings:
  critical: 1
  warning: 5
  info: 2
  total: 8
status: issues_found
---

# Phase RL-01: Code Review Report

**Reviewed:** 2026-06-26T21:48:31Z
**Depth:** standard
**Files Reviewed:** 8
**Status:** issues_found

## Narrative Findings (AI reviewer)

## Summary

This phase adds two local-SEO landing pages (`/royal-oak-barber-shop`, `/beard-trim-saanich`) driven by a shared `LandingPage` component and a `LandingPageData` model in `src/lib/landing.ts`, plus sitemap and footer wiring. There are no security vulnerabilities (all rendered content is developer-controlled static data; `tel:`/iframe inputs are sanitized or hardcoded).

The dominant defect is a deliverable correctness failure: the carefully optimized SEO `metaTitle`/`metaDescription` strings in `landing.ts` are **never consumed**, and the page-level metadata that *is* used has already diverged from them — so the pages ship with generic, keyword-poor titles. For a phase whose entire purpose is local SEO, this undermines the core deliverable. Several latent robustness issues (silent string-match and service-lookup failures) and footer link-quality problems round out the findings.

## Critical Issues

### CR-01: Optimized SEO `metaTitle`/`metaDescription` are defined but never applied — pages ship generic titles

**File:** `src/lib/landing.ts:15-16,52-55,80-83`, `src/app/royal-oak-barber-shop/page.tsx:5-10`, `src/app/beard-trim-saanich/page.tsx:5-10`

**Issue:** `LandingPageData` declares `metaTitle` and `metaDescription`, and both data objects populate keyword-rich values (e.g. `"Royal Oak Barber Shop — Skin Fades & Kids' Cuts | Royal Look Victoria BC"` and `"Beard Trim in Saanich — Hot-Towel Straight-Razor Shave | Royal Look Victoria BC"`). A repo-wide grep confirms these fields are read **nowhere** — `LandingPage.tsx` does not export `metadata`, and each route page hardcodes its own `metadata` object instead:

```tsx
// royal-oak-barber-shop/page.tsx
export const metadata: Metadata = {
  title: "Royal Oak Barber Shop",   // <- NOT the optimized metaTitle
  description: "...",
  alternates: { canonical: "/royal-oak-barber-shop" },
};
```

Because the root layout applies `template: "%s | Royal Look Barber Shop"`, the actual rendered `<title>` becomes `"Royal Oak Barber Shop | Royal Look Barber Shop"` — "Barber Shop" duplicated, and the differentiating keywords ("Skin Fades & Kids' Cuts", "Hot-Towel Straight-Razor Shave", "Victoria BC") that the data file was written to carry are silently dropped. The optimized metadata the phase produced is dead code, and the live SEO titles are wrong. This is the primary value of the feature not being delivered.

**Fix:** Pick a single source of truth and apply it. Either drive route metadata from the data object:

```tsx
// royal-oak-barber-shop/page.tsx
import { ROYAL_OAK_DATA } from "@/lib/landing";

export const metadata: Metadata = {
  title: { absolute: ROYAL_OAK_DATA.metaTitle }, // bypass template; metaTitle already includes brand
  description: ROYAL_OAK_DATA.metaDescription,
  alternates: { canonical: `/${ROYAL_OAK_DATA.slug}` },
};
```

(Use `title.absolute` so the layout `%s | …` template does not append a second "Royal Look Barber Shop".) Or, if the shorter hardcoded titles are actually intended, delete the unused `metaTitle`/`metaDescription` fields from `LandingPageData` and both data objects so the model stops advertising values it does not use. Do not leave both diverging definitions in the tree.

## Warnings

### WR-01: `metaDescription` is duplicated verbatim across `landing.ts` and the route pages — and the title already drifted

**File:** `src/lib/landing.ts:54-55,82-83` vs `src/app/royal-oak-barber-shop/page.tsx:7-8`, `src/app/beard-trim-saanich/page.tsx:7-8`

**Issue:** Each page's hardcoded `description` is a byte-for-byte copy of the corresponding `metaDescription` in `landing.ts`, while the `title` does **not** match `metaTitle` (see CR-01). Two copies of the same string with no single source of truth is exactly how the title already fell out of sync; the descriptions will drift next time one side is edited.

**Fix:** Resolve via CR-01 — reference `data.metaDescription` from the route metadata instead of re-typing it, eliminating the second copy.

### WR-02: Most "Areas Served" footer entries render dead, non-navigable links

**File:** `src/components/Footer.tsx:47-59`

**Issue:** Only `"Royal Oak"` and `"Saanich"` map to a real `href`; the other six areas (`Broadmead`, `Cordova Bay`, `Gordon Head`, `Cadboro Bay`, `Oak Bay`, `Victoria`) resolve to `href = undefined`, producing `<a>Broadmead</a>`. React drops the attribute, so these are anchors with no destination that still receive the `.footer ul a:hover` accent-color styling — they look clickable but do nothing. On a footer whose purpose is local-SEO area coverage, six of eight "links" are non-functional and misleading.

**Fix:** Render only the entries that have a destination as links, and the rest as plain text:

```tsx
{SHOP.areasServed.map((area) => {
  const href =
    area === "Royal Oak" ? "/royal-oak-barber-shop"
    : area === "Saanich" ? "/beard-trim-saanich"
    : null;
  return (
    <li key={area}>{href ? <a href={href}>{area}</a> : <span>{area}</span>}</li>
  );
})}
```

### WR-03: `h1` emphasis split fails silently and drops text when the substring is absent

**File:** `src/components/LandingPage.tsx:8-10,80-83`

**Issue:** The heading is split by locating `h1Emphasis` (period stripped) inside `h1`:

```ts
const emphasisBase = data.h1Emphasis.replace(/\.$/, "");
const emphasisIdx = data.h1.indexOf(emphasisBase);
const h1Before = emphasisIdx >= 0 ? data.h1.slice(0, emphasisIdx) : "";
```

If `h1Emphasis` is ever edited so its base no longer occurs in `h1` (a one-character typo, a casing change, or future copy edits), `emphasisIdx` is `-1`, `h1Before` becomes `""`, and the rendered `<h1>` collapses to only `<em>{h1Emphasis}</em>` — the entire non-emphasized prefix vanishes with no error. The logic also implicitly assumes the emphasis is the trailing fragment; any text after it in `h1` would be dropped. This is a fragile content-coupling that turns a copy edit into a silently truncated H1 (an on-page SEO regression).

**Fix:** Store the heading as explicit structured parts rather than recovering them via substring search, e.g. `h1: { before: "Royal Oak ", emphasis: "Barber Shop." }`, and render `before` + `<em>{emphasis}</em>` directly. If the current shape must stay, fall back to rendering the full `h1` (not `""`) when `emphasisIdx < 0`.

### WR-04: `resolveService` returning `null` is swallowed — price disappears from the menu and JSON-LD emits `price: "0"`

**File:** `src/components/LandingPage.tsx:35-38,113-119`, `src/lib/landing.ts:38-44`

**Issue:** Every emphasized service's price/duration is looked up by `configName` against `SHOP` services. The match is exact string equality (`s.name === configName`). When it fails, both consumers degrade silently:
- Visible menu: `{resolved && <span className="pr serif">{resolved.price}</span>}` — the price and duration simply don't render, leaving a nameless row.
- JSON-LD: `price: resolved ? resolved.price.replace("$", "") : "0"` — emits a structured-data `Offer` advertising the service for **0 CAD**.

All current `configName` values resolve, so this is latent, but the coupling is brittle: `"Trim Beard"`, `"Hot Shave"`, `"Kids"` are config-internal names that differ from their display names, so a future rename in `config.ts` or a typo in `landing.ts` would ship a free-of-charge `Offer` in Schema.org markup and a blank price on the page, with no build-time signal.

**Fix:** Fail loudly on an unresolved service rather than emitting `"0"`. For example, throw in `resolveService` (or a build-time assertion) when a referenced `configName` is missing, and omit the `offers` block entirely when no price is resolved instead of substituting `"0"`:

```ts
offers: resolved
  ? { "@type": "Offer", priceCurrency: "CAD", price: resolved.price.replace("$", "") }
  : undefined,
```

### WR-05: "Today" hours highlight is computed at build time on a force-static export, so it is wrong for most visitors

**File:** `src/components/LandingPage.tsx:15-17,182-195`

**Issue:** `todayName` is derived from `new Date()` during rendering. The site is a static export (`sitemap.ts` uses `export const dynamic = "force-static"`, and these landing routes have no dynamic rendering), so `todayName` is frozen to the **build date**. The `.today` accent styling on the hours grid will therefore highlight whatever day the site was last built, not the visitor's actual day — incorrect on six of seven days until the next deploy. The inline comment acknowledges the build-time behavior, but the user-facing effect is still a wrong "today" indicator.

**Fix:** Either drop the per-day highlight on the static landing pages, or compute "today" on the client (small `useEffect`/`suppressHydrationWarning` component) so the highlighted row reflects the viewer's date rather than the build date.

## Info

### IN-01: Footer street/city render as empty `<a>` elements with no `href`

**File:** `src/components/Footer.tsx:17-24`

**Issue:** The address street and city lines are wrapped in `<a>…</a>` with no `href` attribute. A hrefless anchor is non-interactive and semantically meaningless; it is keyboard-unfocusable yet styled as a link.

**Fix:** Use `<span>` (or just text) for the non-link address lines; reserve `<a>` for the `tel:` line, which is correct.

### IN-02: JSON-LD injected via `dangerouslySetInnerHTML` without `</script>` escaping

**File:** `src/components/LandingPage.tsx:69-72`

**Issue:** `JSON.stringify(graph)` does not escape `/`, so a string containing `</script>` would break out of the inline `<script type="application/ld+json">` tag. All inputs are static developer-controlled config today, so this is not currently exploitable, but it is a fragile pattern (mirrored in `layout.tsx`) that becomes an injection vector the moment any of this data is sourced from user input.

**Fix:** Escape the closing tag sequence before injecting, e.g. `JSON.stringify(graph).replace(/</g, "\\u003c")`, or render the JSON-LD through a small shared helper that applies this escaping consistently.

---

_Reviewed: 2026-06-26T21:48:31Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
