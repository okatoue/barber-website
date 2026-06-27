---
phase: RL-02-faq-page-with-faqpage-schema
reviewed: 2026-06-27T00:00:00Z
depth: standard
files_reviewed: 5
files_reviewed_list:
  - src/app/faq/page.tsx
  - src/app/sitemap.ts
  - src/components/FAQ.tsx
  - src/components/Footer.tsx
  - src/lib/config.ts
findings:
  critical: 0
  warning: 4
  info: 5
  total: 9
status: issues_found
---

# Phase RL-02: Code Review Report

**Reviewed:** 2026-06-27T00:00:00Z
**Depth:** standard
**Files Reviewed:** 5
**Status:** issues_found

## Summary

Reviewed the FAQ page (`/faq`) with its `FAQPage` JSON-LD schema, the sitemap, the
homepage FAQ accordion, the Footer, and the shared `config.ts` data source.

Verified positives: `metadataBase` is set in `layout.tsx`, so the FAQ page's relative
`canonical: "/faq"` resolves to an absolute URL correctly; the sitemap enumerates every
existing route (no orphans, no missing pages); and FAQ schema is emitted only on `/faq`
(not duplicated on the homepage accordion), which matches Google's guidance against
duplicate `FAQPage` markup.

No Critical/BLOCKER issues found — there is no user-controlled input, no injection into
a query/command/path, and no crash path on normal data. The dominant concerns are: a
latent desync between the emitted JSON-LD and the visible FAQ content (an SEO-policy
risk), several non-functional `<a>` elements in the Footer, and an unescaped
`dangerouslySetInnerHTML` JSON-LD sink that is safe only because the data is currently
static and developer-controlled.

## Warnings

### WR-01: FAQ JSON-LD can desync from visible content (Google FAQPage policy risk)

**File:** `src/app/faq/page.tsx:16` and `src/app/faq/page.tsx:47-49`
**Issue:** The structured data is built from **all** of `FAQ_ITEMS`
(`FAQ_ITEMS.map(...)`), but the visible page only renders items whose `category` appears
in the hardcoded `CATEGORY_ORDER = ["Visiting", "Pricing", "Kids", "Services"]`
(`CATEGORY_ORDER.map(...)` then `filter(item.category === category)`). Today every item's
category is in that list, so the two are consistent. But the moment someone adds a
`FaqItem` with a new category (e.g. `"Booking"`) — or renames a category in `config.ts`
without updating `CATEGORY_ORDER` — that item silently disappears from the rendered page
while remaining in the JSON-LD. Google's FAQPage rich-result policy requires that every
Q&A in the markup be **visibly present** on the page; emitting hidden questions can cost
the rich result or trigger a manual action.
**Fix:** Derive the visible list and the schema from the same source so they cannot drift.
For example, iterate `CATEGORY_ORDER` for both, and append any unrecognized categories so
nothing is silently dropped:
```tsx
const orderedItems = [
  ...CATEGORY_ORDER.flatMap((c) => FAQ_ITEMS.filter((i) => i.category === c)),
  ...FAQ_ITEMS.filter((i) => !CATEGORY_ORDER.includes(i.category)),
];
// build faqJsonLd from orderedItems, and render from orderedItems
```
Alternatively, assert at build time that every `FAQ_ITEMS` category is present in
`CATEGORY_ORDER`.

### WR-02: Footer renders `<a>` elements with no (or undefined) `href`

**File:** `src/components/Footer.tsx:18`, `src/components/Footer.tsx:21`, `src/components/Footer.tsx:50-60`
**Issue:** Several anchors have no usable `href`:
- Lines 18 and 21 wrap the street and city/postal text in bare `<a>...</a>` with no
  `href`. An anchor without `href` is not a link, is not keyboard-focusable, and has no
  link semantics — it is invalid usage of `<a>`.
- In "Areas Served" (lines 50-60), `href` is `undefined` for every area except
  `"Royal Oak"` and `"Saanich"`. So 6 of the 8 areas (Broadmead, Cordova Bay, Gordon
  Head, Cadboro Bay, Oak Bay, Victoria) render as `<a>Broadmead</a>` — they look like
  links (footer link styling) but do nothing on click and are not focusable. This is a
  real UX/accessibility defect, not just style.
**Fix:** Use a `<span>` for non-navigational text, and conditionally render an anchor only
when a destination exists:
```tsx
// street / city
<li><span>{SHOP.address.street}</span></li>

// areas served
{SHOP.areasServed.map((area) => {
  const href = area === "Royal Oak" ? "/royal-oak-barber-shop"
             : area === "Saanich"   ? "/beard-trim-saanich"
             : null;
  return (
    <li key={area}>{href ? <a href={href}>{area}</a> : <span>{area}</span>}</li>
  );
})}
```

### WR-03: JSON-LD injected via `dangerouslySetInnerHTML` without escaping `<`/`</script>`

**File:** `src/app/faq/page.tsx:29-32`
**Issue:** `JSON.stringify` escapes quotes and backslashes but does **not** escape `<`,
`>`, `&`, or the sequence `</script>`. Because the payload is written through
`dangerouslySetInnerHTML`, any FAQ question/answer that ever contains `</script>` (or a
`<` that a parser mishandles) would break out of the `<script type="application/ld+json">`
element — a stored-XSS / markup-injection sink. Today the data comes entirely from the
static, developer-controlled `FAQ_ITEMS` in `config.ts` (no `<` characters present), so
this is not currently exploitable — but it is a latent injection point that fails the
moment FAQ copy is sourced from a CMS, form, or any non-static origin.
**Fix:** Escape the HTML-significant characters before injecting:
```tsx
const json = JSON.stringify(faqJsonLd).replace(/</g, "\\u003c");
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
```

### WR-04: Heading hierarchy skips `<h2>` on the FAQ page (accessibility)

**File:** `src/app/faq/page.tsx:37-39`, `src/app/faq/page.tsx:52-54`, `src/app/faq/page.tsx:58-69`
**Issue:** The page goes from `<h1>` ("Frequently asked questions.") directly to the
per-question `<h3>` elements. The category labels that sit between them
("Visiting", "Pricing", etc.) are rendered as `<div className="eyebrow">`, not headings.
Skipping the `<h2>` level breaks the document outline for screen-reader and assistive-tech
users navigating by heading (WCAG 1.3.1 / 2.4.6).
**Fix:** Promote the category label to an `<h2>` (it is the natural section heading), so
the outline reads h1 → h2 (category) → h3 (question). Keep the `eyebrow` class for styling:
```tsx
<h2 className="eyebrow" style={{ padding: "0 4px 16px", margin: 0 }}>{category}</h2>
```

## Info

### IN-01: React list keyed by array index in homepage FAQ

**File:** `src/components/FAQ.tsx:24-32`
**Issue:** `homepageFaqs.map((item, i) => ...)` uses `key={i}`, and the open/closed state
also stores the index (`open === i`). The list is static so this is low-risk today, but it
is inconsistent with `faq/page.tsx:57`, which correctly keys by `item.question`. Index
keys can cause state to attach to the wrong item if the list ever becomes reorderable.
**Fix:** Key by a stable identifier: `key={item.question}` and track open state by question
(or keep index but key by question). Align with the static FAQ page's approach.

### IN-02: Internal navigation uses plain `<a>` instead of `next/link`

**File:** `src/components/FAQ.tsx:45`, `src/components/Footer.tsx:34-44`
**Issue:** Internal links ("See all FAQs", `/#menu`, `/barbers`, `/#find`, `/faq`) use raw
`<a href>`, which triggers a full document reload and skips Next.js prefetching.
`Navbar.tsx` already uses `next/link`, so this is an inconsistency that degrades
client-side navigation UX.
**Fix:** Use `import Link from "next/link"` and replace internal `<a href="/faq">` with
`<Link href="/faq">` (anchor-only `/#menu` hash links can stay as `<a>` or use `Link`).

### IN-03: Barber image paths and bios look like leftover placeholder data

**File:** `src/lib/config.ts:153-170`
**Issue:** Zak's image is `"/images/barber-marcus.jpg"` and Aymen's is
`"/images/barber-james.jpg"` — the filenames (marcus/james) do not match the barber names
(Zak/Aymen), suggesting unedited template placeholders that will render the wrong photos.
Both barbers also have `bio: ""`. Since `config.ts` is the single source of truth that
feeds the barbers page, this surfaces as visible content.
**Fix:** Point each barber at a correctly named image asset (e.g. `barber-zak.jpg`,
`barber-aymen.jpg`) and confirm the files exist in `public/images/`; fill in or
intentionally omit the bios.

### IN-04: `tel:` link omits country code

**File:** `src/components/Footer.tsx:26`
**Issue:** `SHOP.phone.replace(/\D/g, "")` produces `"7784300040"`. For reliable dialing
(especially from international or VoIP clients), `tel:` links should be in E.164 form with
the country code.
**Fix:** Prefix the country code, e.g. `tel:+1${SHOP.phone.replace(/\D/g, "")}` →
`tel:+17784300040`.

### IN-05: `findService` throws at module-evaluation time (wide blast radius)

**File:** `src/lib/config.ts:183-189` (used at `201`, `207`, `225`, `230`, `235`)
**Issue:** `findService` throws if a name is not found, and it is invoked at module load
while building `FAQ_ITEMS`. A typo or a rename in `SERVICES` that is not mirrored in the
FAQ strings will throw during import of `config.ts`, crashing **every** page that imports
it — not just the FAQ page. Fail-fast is defensible, but the failure mode is an
app-wide build/render crash from a content edit.
**Fix:** Acceptable as a deliberate build-time guard; if a softer failure is preferred,
fall back to a sentinel (e.g. return the price/duration as `""` or a TODO marker) and log,
rather than throwing during module evaluation.

---

_Reviewed: 2026-06-27T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
