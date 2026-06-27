# Phase 2: FAQ Page with FAQPage Schema — Pattern Map

**Mapped:** 2026-06-27
**Files analyzed:** 6 (2 CREATE, 4 MODIFY)
**Analogs found:** 6 / 6

---

## File Classification

| New / Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/app/faq/page.tsx` | page (route component) | request-response (static) | `src/app/services/page.tsx` | exact |
| `src/lib/config.ts` | config / data model | N/A (definitions) | itself — `FAQ_ITEMS` + `SERVICES` shapes (lines 64–202) | exact (self-analog) |
| `src/components/FAQ.tsx` | component | request-response (client) | itself — current accordion implementation | exact (self-analog — trim + remove JSON-LD) |
| `src/app/sitemap.ts` | utility / config | batch | itself — existing route entries (lines 9–15) | exact (self-analog) |
| `src/components/Footer.tsx` | component | request-response | itself — "Pages" column `<li><a>` links (lines 31–43) | exact (self-analog) |
| `src/app/globals.css` | style | N/A | itself — `faq-*` + `.section` / `.section-head` conventions | exact (self-analog) |

---

## Pattern Assignments

---

### `src/app/faq/page.tsx` — CREATE (page, request-response / static)

**Analog:** `src/app/services/page.tsx`

**Imports pattern** (`src/app/services/page.tsx` lines 1–2):
```typescript
import type { Metadata } from "next";
import { SERVICES } from "@/lib/config";
```
For the FAQ page, import the expanded `FAQ_ITEMS` (and whatever subset/category helpers are added to config) instead of `SERVICES`.

**Metadata + canonical pattern** (`src/app/services/page.tsx` lines 4–9):
```typescript
export const metadata: Metadata = {
  title: "Barber Services in Victoria, BC",
  description:
    "Haircuts, fades, beard trims, and grooming services in Victoria, BC. View our full service menu with prices and durations. Walk in or call to book.",
  alternates: { canonical: "/services" },
};
```
For `/faq`, change to e.g.:
- `title`: `"Barber FAQ — Victoria, BC"` (no shop-name suffix — title template in `layout.tsx` appends ` | Royal Look Barber Shop` automatically)
- `description`: 1–2 sentence en_CA summary of the FAQ topics
- `alternates: { canonical: "/faq" }`

**Title template context** (`src/app/layout.tsx` lines 35–37):
```typescript
title: {
  default: "Barber in Broadmead Village | Royal Look Barber Shop",
  template: `%s | ${SHOP.name}`,
},
```
`title` strings in sub-pages must NOT include the shop name — the template appends it.

**FAQPage JSON-LD pattern** — move from `src/components/FAQ.tsx` (lines 6–17) to this page:
```typescript
// In src/components/FAQ.tsx (current — MOVE to faq/page.tsx and remove from FAQ.tsx):
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};
```
Emit it in the page's JSX exactly as layout.tsx emits BarberShop JSON-LD (`src/app/layout.tsx` lines 67–121):
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
/>
```

**Static grouped layout pattern** — mirror `src/app/services/page.tsx` section/container shell (lines 56–58, 72–100):
```tsx
// services/page.tsx — section/container/section-head shell
export default function ServicesPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Our Menu · Victoria, BC</div>
            <h1 className="serif">
              Barber services in <em>Victoria.</em>
            </h1>
          </div>
          <p className="lede">…</p>
        </div>

        <div className="menu-grid">
          {SERVICES.map((category) => (
            <div className="menu-col" key={category.category}>
              <h3 className="serif">{category.category}</h3>
              {category.items.map((service) => (/* … */))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```
For `/faq`, substitute `menu-grid` / `menu-col` with `faq-list` (already has CSS) or plain `<dl>` / `<div>` grouped by category — all answers visible in initial HTML (D-03, no accordion required here).

**This is a server component (no `"use client"`)** — `/faq`'s all-answers-visible layout does not need client-side accordion state.

---

### `src/lib/config.ts` — MODIFY (config / data model)

**Analog:** itself — current `FAQ_ITEMS` (lines 176–202) and `ServiceCategory` + `Service` shape (lines 64–127)

**Current `FAQ_ITEMS` shape** (`src/lib/config.ts` lines 176–202):
```typescript
export const FAQ_ITEMS = [
  {
    question: "Do you take walk-ins?",
    answer:
      "Yes! We welcome walk-ins whenever we have availability.",
  },
  // … 4 more items
];
```

**`ServiceCategory` shape for category-model reference** (`src/lib/config.ts` lines 70–74):
```typescript
export type ServiceCategory = {
  category: string;
  items: Service[];
};
export const SERVICES: ServiceCategory[] = [ … ];
```

**Expanded model to implement (D-06):** Planner should choose one of:
- Option A — single array with `category` + optional `homepage: true` flag per item:
  ```typescript
  export type FaqItem = {
    question: string;
    answer: string;
    category: string;      // e.g. "Visiting" | "Services" | "Kids"
    homepage?: boolean;    // true = include in curated homepage subset
  };
  export const FAQ_ITEMS: FaqItem[] = [ … ];  // all 7 BrightLocal topics
  ```
- Option B — full array + a separate curated subset list (index keys or filtered array).

Either keeps a single source of truth. Option A is simpler and consistent with the boolean-flag pattern already present on `SHOP.walkIns`.

**Prices/durations to cite** (D-04) are already in `SERVICES` (`src/lib/config.ts` lines 76–127). Answers that reference pricing must pull from those constants, not hardcode literals. Key values:
- Kids haircut: `$25`, `20–30 min` (`SERVICES[0].items[2]`)
- Skin Fade: `$30`, `45–60 min` (`SERVICES[0].items[1]`)
- Regular Hair Cut: `$28`, `30–45 min` (`SERVICES[0].items[0]`)
- Trim Beard: `$20`, `20–30 min` (`SERVICES[1].items[0]`)
- Hot Shave: `$35`, `30–40 min` (`SERVICES[1].items[1]`)

The 7 BrightLocal topics to cover in the new `FAQ_ITEMS` entries (from CONTEXT.md `<specifics>`): walk-ins vs appointments, kids' cuts, skin-fade technique, beard-trim options, straight-razor shave hygiene, parking, and typical timing/pricing.

---

### `src/components/FAQ.tsx` — MODIFY (component, client / request-response)

**Analog:** itself — current full implementation (lines 1–62)

**What to remove** — the `faqJsonLd` const (lines 6–17) and the `<script>` tag (lines 24–27):
```typescript
// DELETE this block entirely:
const faqJsonLd = { … };

// DELETE from JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
/>
```

**What to keep** — the `"use client"` directive, `useState` accordion, and all `faq-*` class markup (lines 19–62). Trim `FAQ_ITEMS` iteration to only items where `homepage === true` (or whichever subset model is chosen in config).

**"See all FAQs" link to add** — append below `.faq-list` div before closing `</div className="container">`. Mirror the CTA pattern from `src/app/location/page.tsx` lines 120–128:
```tsx
// location/page.tsx CTA anchor pattern:
<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
  <a href={`tel:…`} className="btn-secondary px-8 py-4">…</a>
</div>
```
For FAQ.tsx, a simpler inline link is sufficient:
```tsx
<div style={{ textAlign: "center", marginTop: 32 }}>
  <a href="/faq">See all FAQs →</a>
</div>
```
Style to match existing site link conventions (no Tailwind utility classes — this component uses plain CSS).

**Import change:** If the subset uses a filtered array or `FaqItem[]` type, update the import:
```typescript
// Current (line 4):
import { FAQ_ITEMS } from "@/lib/config";
// After — add FaqItem type if needed:
import { FAQ_ITEMS } from "@/lib/config";
// Then filter: FAQ_ITEMS.filter((item) => item.homepage)
```

---

### `src/app/sitemap.ts` — MODIFY (utility, batch)

**Analog:** itself — existing route entries (lines 6–16)

**Exact pattern to copy** (`src/app/sitemap.ts` lines 9–14):
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SHOP.siteUrl;
  return [
    { url: base,                             lastModified: new Date(), changeFrequency: "weekly",  priority: 1   },
    { url: `${base}/barbers`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/location`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/royal-oak-barber-shop`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/beard-trim-saanich`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // ADD:
    { url: `${base}/faq`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];
}
```
Priority `0.7` matches `/location` — informational page, not a primary conversion route.

---

### `src/components/Footer.tsx` — MODIFY (component, request-response)

**Analog:** itself — "Pages" column `<ul>` (lines 30–43)

**Existing "Pages" column pattern** (`src/components/Footer.tsx` lines 30–43):
```tsx
<div>
  <h4>Pages</h4>
  <ul>
    <li>
      <a href="/#menu">Menu</a>
    </li>
    <li>
      <a href="/barbers">Barbers</a>
    </li>
    <li>
      <a href="/#find">Location</a>
    </li>
  </ul>
</div>
```

**Add one `<li>` entry** to this column:
```tsx
<li>
  <a href="/faq">FAQ</a>
</li>
```
No other changes to Footer.tsx.

---

### `src/app/globals.css` — CONDITIONALLY MODIFY (style)

**Analog:** itself — `faq-*` classes (lines 932–988) + `.section` / `.section-head` conventions (lines 318–348)

**Existing FAQ classes already available** (lines 932–988):
- `.faq-list` — max-width 820 px, border-top
- `.faq-item` — border-bottom hairline
- `.faq-q` — button: full-width flex, 18 px font, `.faq-icon` plus/minus toggle
- `.faq-a` — max-height collapse transition (accordion)
- `.faq-a p` — muted color, 15 px, 1.65 line-height, max 70 ch

**When globals.css must NOT be modified:** If `/faq`'s static all-answers-visible layout reuses `.faq-list` + `.faq-item` with answers always shown (no max-height collapse needed), the existing classes suffice — override inline with `style={{ maxHeight: "none" }}` on `.faq-a` or render answers outside `.faq-a` altogether (e.g. plain `<p>` per item, styled with `.faq-a p` or a new inline style).

**When globals.css MUST be modified:** Only if a new class is needed (e.g. `.faq-category-head` for grouped category headings on `/faq`). If added, follow the established convention:
```css
/* After line 988 — new class example: */
.faq-category-head {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  padding: 32px 4px 12px;
  border-top: 1px solid var(--hairline);
}
```
(Same style as `.eyebrow` at lines 71–77 — reuse that class instead if possible to avoid adding CSS.)

---

## Shared Patterns

### Metadata + alternates.canonical
**Source:** `src/app/services/page.tsx` lines 4–9
**Apply to:** `src/app/faq/page.tsx`
```typescript
export const metadata: Metadata = {
  title: "…",           // short title without shop name — template appends it
  description: "…",
  alternates: { canonical: "/faq" },
};
```

### JSON-LD `<script>` emission
**Source:** `src/app/layout.tsx` lines 67–121 (BarberShop) and `src/components/FAQ.tsx` lines 24–27 (FAQPage)
**Apply to:** `src/app/faq/page.tsx` (FAQPage JSON-LD moves here from FAQ.tsx)
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdObject) }}
/>
```

### Section / container shell
**Source:** `src/app/services/page.tsx` lines 56–58
**Apply to:** `src/app/faq/page.tsx`
```tsx
<section className="section">
  <div className="container">
    <div className="section-head"> … </div>
    {/* content */}
  </div>
</section>
```

### Design system typography classes
**Source:** `src/app/globals.css`
**Apply to:** `src/app/faq/page.tsx`
| Class | Purpose | CSS line |
|---|---|---|
| `.serif` | Headings (h1, h2) | 60 |
| `.eyebrow` | Mono uppercase label above heading | 71 |
| `.lede` | Sub-heading descriptive paragraph | 343 |
| `.section-head` | Flex row: heading left, lede right | 321 |
| `.faq-list` | FAQ items wrapper | 932 |
| `.faq-item` | Per-question row | 937 |
| `.faq-a p` | Answer text styles | 978 |

### Config-driven content (single source of truth)
**Source:** `src/lib/config.ts` — `FAQ_ITEMS`, `SERVICES`, `SHOP`
**Apply to:** `src/app/faq/page.tsx`, `src/components/FAQ.tsx`
All question/answer strings live in `FAQ_ITEMS`; pricing/duration values are derived from `SERVICES`, not hardcoded in JSX.

---

## No Analog Found

None. All six files have direct analogs in the codebase (most are self-analogs — the files already exist and are being modified).

---

## Metadata

**Analog search scope:** `src/app/`, `src/components/`, `src/lib/`, `src/app/globals.css`
**Files read:** 9 (`config.ts`, `FAQ.tsx`, `services/page.tsx`, `location/page.tsx`, `layout.tsx`, `Footer.tsx`, `sitemap.ts`, `globals.css` (targeted), `page.tsx`)
**Pattern extraction date:** 2026-06-27
