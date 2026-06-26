# Phase 1: Local SEO Landing Pages — Royal Oak & Saanich - Research

**Researched:** 2026-06-26
**Domain:** Next.js App Router static export · Local SEO page patterns · schema.org structured data
**Confidence:** HIGH — all findings are grounded in the actual codebase; no unverified external claims

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Routes: `src/app/royal-oak-barber-shop/page.tsx` and `src/app/beard-trim-saanich/page.tsx`. Slugs are final.
- One reusable presentational component (e.g. `src/components/LandingPage.tsx`) fed by a typed data array (e.g. `src/lib/landing.ts`). Each page exports its own `metadata`. Planner picks exact file locations consistent with `src/lib/` (data) + `src/components/` (UI) split.
- Royal Oak page: emphasize Skin Fade + Kids' cuts; reference Royal Oak Transit Exchange and Broadmead Village Shopping Centre; unique intro ≥150 words.
- Saanich page: emphasize Beard Trim + Hot-Towel / Straight-Razor Shave; reference Saanich / Broadmead / Royal Oak; unique intro ≥150 words.
- Intros must be genuinely unique — no copy shared between the two pages or with the homepage.
- Map: `SHOP.googleMapsEmbed` (same iframe pattern as `LocationPreview.tsx`).
- NAP: sitewide Footer already renders it; ALSO include an in-page address/hours/CTA block (mirror `LocationPreview` `find-grid/find-map/find-info`).
- Call CTA: `tel:` link with a unique `data-call-location` attribute per page (e.g. `royal_oak_page_cta`, `saanich_beard_page_cta`).
- Services/prices come from `SERVICES` / `SERVICE_HIGHLIGHTS` in config — no hardcoded price duplicates.
- Each page exports `metadata` with unique `title` + `description` and `alternates: { canonical: "/<slug>" }`.
- Title template in `layout.tsx`: `%s | Royal Look Barber Shop`. Do NOT double-brand in the page title field.
- Structured data: `Service` list per page with `areaServed` + `provider` referencing `@id: ${siteUrl}/#barbershop`. Do NOT emit a second full `BarberShop` node.
- Sitemap: add both routes with `priority: 0.8`, `changeFrequency: "monthly"`.
- At least one internal link to each new page (Footer and/or homepage location/areas section). Header nav unchanged.
- Add a `Royal Oak Transit Exchange` landmark to `config.ts`.
- Reuse existing classes: `section`, `container`, `section-head`, `eyebrow`, `serif`, `lede`, `card`, `btn-secondary`, `find-grid`, `find-map`, `find-info`. Add new global CSS only if necessary.
- All pages fully static; `npm run build` (`output: "export"`) must succeed including both new routes.

### Claude's Discretion
- Exact intro copy (unique, natural, locally specific, ≥150 words, not keyword-stuffed).
- Exact JSON-LD shape (Service list vs LocalBusiness reference) — pick what validates and avoids duplicate `@id`.
- File organization for the reusable component + data array.
- Internal-link placement specifics.

### Deferred Ideas (OUT OF SCOPE)
- Additional area pages (Cordova Bay, Gordon Head, etc.) — v2 / SEO-20.
- FAQ page — Phase 2.
- GBP services alignment + config service renames + review-count fix — Phase 3.
- A Broadmead Village landing page — homepage already owns that query (cannibalization risk). Locked out.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SEO-01 | `/royal-oak-barber-shop` page with H1 "Royal Oak Barber Shop", skin fades + kids' cuts emphasis, Royal Oak Transit Exchange landmark | New App Router folder; data in `src/lib/landing.ts`; landmark added to `config.ts` |
| SEO-02 | `/beard-trim-saanich` page with H1 "Beard Trim in Saanich", beard trims + hot-towel/straight-razor emphasis | Same component, different `LandingPageData` entry |
| SEO-03 | Each page: unique 150–250 word intro, no shared copy with each other or homepage | Unique `intro` string per `LandingPageData` entry; homepage copy is in `Hero.tsx`, confirmed separate |
| SEO-04 | Services and prices sourced from `SERVICES` in `config.ts`, not hardcoded | Component receives `emphasizedServices` list with names matched to `SERVICES` array at build time |
| SEO-05 | Map embed (`SHOP.googleMapsEmbed`), NAP, `tel:` links with `data-call-location` | Mirror `LocationPreview.tsx` `find-grid`/`find-map`/`find-info` block; Analytics component handles event firing automatically |
| SEO-06 | Per-page canonical + valid `Service`/`LocalBusiness` JSON-LD | `alternates.canonical` in `metadata` export; `@graph`-wrapped JSON-LD `<script>` in Server Component JSX |
| SEO-07 | One reusable data-driven component, existing design system classes | `LandingPage.tsx` + `landing.ts`; use `services/page.tsx` class vocabulary, not `location/page.tsx` |
| SEO-08 | Both URLs in `sitemap.ts`; `npm run build` passes clean static export | Two new entries in `sitemap.ts`; no dynamic routes = no `generateStaticParams()` needed |
</phase_requirements>

---

## Summary

This phase adds two fixed-route static pages to an existing Next.js 16 App Router site with `output: "export"`. The entire implementation is a codebase-only change: no new packages, no server runtime, no infrastructure changes. The site is already configured for static export (`next.config.ts`), already has `metadataBase` set (`layout.tsx`), already has a sitewide BarberShop JSON-LD node (`layout.tsx`), and already has all the CSS classes needed (`globals.css`), with one exception noted below.

The primary pattern to follow is `src/app/services/page.tsx` (for `section`/`container`/`section-head`/`eyebrow`/`serif`/`lede` structure and `metadata` export) combined with `src/components/LocationPreview.tsx` (for the `find-grid`/`find-map`/`find-info` map + NAP block). **Do not mirror `src/app/location/page.tsx`** — that file uses a mix of Tailwind utility classes and undefined custom classes (`btn-secondary`, `card`, `section-heading`, `section-subheading`, `text-gold`) that conflict with the current bespoke design system in `globals.css`.

The one gap in `globals.css` is that `btn-secondary` is referenced in three existing files but never defined. The planner must add its definition (suggested: gold/accent-background variant) as Wave 0 work before the landing pages can use it.

**Primary recommendation:** Build `src/lib/landing.ts` (typed data) + `src/components/LandingPage.tsx` (presentational) as Server Components, one entry per page, each page file thin (just `metadata` export + `<LandingPage data={...} />`). Add JSON-LD `<script>` inside the component using the same `dangerouslySetInnerHTML` pattern as `layout.tsx`.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Page routing + static HTML | Frontend Server (build-time SSG) | — | Next.js App Router with `output: "export"` renders to static HTML at build time |
| `<head>` metadata / canonical | Frontend Server (build-time) | — | `metadata` export processed by Next.js at build; written into exported HTML |
| BarberShop JSON-LD (sitewide) | Frontend Server (layout.tsx) | — | Already in `layout.tsx`; every page inherits it |
| Service JSON-LD (per page) | Frontend Server (page.tsx) | — | Per-page script tag in Server Component; merged with layout's `<head>` at build |
| Map iframe | Browser / Client | — | Lazy-loaded iframe; no server involvement needed |
| Call CTA tracking | Browser / Client (Analytics.tsx) | — | Delegated click listener in `Analytics` component already handles all `tel:` links |
| Sitemap | CDN / Static | — | `sitemap.ts` route exports as `sitemap.xml` at build |
| NAP data | Database / Storage (config.ts) | — | `SHOP` object is the single source of truth; components read it |

---

## Standard Stack

### Core — already installed, no additions needed

| Library | Installed Version | Purpose | Role in This Phase |
|---------|------------------|---------|-------------------|
| next | ^16.1.6 | Framework, routing, metadata, static export | Page routes, `metadata` API, `sitemap.ts` |
| react | ^19.2.4 | UI rendering | Server Components for page + component |
| typescript | ^5.9.3 | Type safety | `LandingPageData` type in `landing.ts` |
| tailwindcss | ^4.1.18 | Utility CSS | `@import "tailwindcss"` already in globals.css; provides responsive utilities |

[VERIFIED: package.json — all packages confirmed present in working directory]

### No new packages required

This phase is entirely config + TypeScript + JSX edits. All styling uses existing globals.css classes and Tailwind utilities already in the bundle. No additional npm installs.

---

## Package Legitimacy Audit

No external packages are installed in this phase.

---

## Architecture Patterns

### System Architecture Diagram

```
config.ts (SHOP, SERVICES)
       │
       ▼
landing.ts  ──────────────────────────────────────────────────┐
  LandingPageData[]                                            │
  (slug, metaTitle, metaDesc, eyebrow,                        │
   h1, intro, emphasizedServices[],                           │
   landmark, callLocation, areaNames[])                        │
       │                                                       │
       ├──► royal-oak-barber-shop/page.tsx                    │
       │      metadata export (title, desc, canonical)         │
       │      └──► <LandingPage data={ROYAL_OAK_DATA} /> ◄────┘
       │                                                       │
       └──► beard-trim-saanich/page.tsx                       │
              metadata export (title, desc, canonical)         │
              └──► <LandingPage data={SAANICH_DATA} /> ◄───────┘
                                    │
                                    ▼
                          LandingPage.tsx (presentational)
                          ┌────────────────────────────────┐
                          │ <script> JSON-LD (@graph)       │
                          │   Service[] + BreadcrumbList    │
                          │   provider: { @id: #barbershop }│
                          │                                 │
                          │ <section.section.container>     │
                          │   section-head: eyebrow + H1    │
                          │   intro paragraph (≥150 words)  │
                          │   emphasized services (cards)    │
                          │                                 │
                          │ find-grid                       │
                          │   find-map: Google Maps iframe   │
                          │   find-info: NAP + hours + CTA  │
                          │   tel: link + data-call-location │
                          └────────────────────────────────┘
                                    │
                          layout.tsx wraps every page:
                          Navbar + Footer (sitewide NAP) + Analytics
                                    │
                          ┌─────────▼──────────┐
                          │  out/<slug>/        │
                          │  index.html         │ ◄─── npm run build
                          │  (static HTML)      │
                          └────────────────────┘

sitemap.ts ──► out/sitemap.xml  (two new entries added)
Footer.tsx ──► internal links to both new pages (areas served column)
```

### Recommended Project Structure

```
src/
├── lib/
│   ├── config.ts        # SHOP (add landmarkRoyalOak field), SERVICES
│   └── landing.ts       # NEW: LandingPageData type + LANDING_PAGES array
├── components/
│   └── LandingPage.tsx  # NEW: presentational component
└── app/
    ├── royal-oak-barber-shop/
    │   └── page.tsx     # NEW: metadata export + <LandingPage />
    ├── beard-trim-saanich/
    │   └── page.tsx     # NEW: metadata export + <LandingPage />
    ├── sitemap.ts       # EDIT: add two entries
    ├── globals.css      # EDIT: add .btn-secondary definition
    ├── layout.tsx       # no change
    └── (existing routes unchanged)
components/
    └── Footer.tsx       # EDIT: add href to Royal Oak + Saanich area links
```

### Pattern 1: Metadata + Canonical (mirror services/page.tsx)

[VERIFIED: src/app/services/page.tsx, src/app/location/page.tsx — read directly]

```typescript
// src/app/royal-oak-barber-shop/page.tsx
import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { ROYAL_OAK_DATA } from "@/lib/landing";

export const metadata: Metadata = {
  title: "Royal Oak Barber Shop",
  // Resolves to "Royal Oak Barber Shop | Royal Look Barber Shop" via layout template
  description:
    "Royal Look Barber Shop serves Royal Oak and Broadmead Village with expert skin fades, kids' cuts, and more. Walk in or call today.",
  alternates: { canonical: "/royal-oak-barber-shop" },
};

export default function RoyalOakPage() {
  return <LandingPage data={ROYAL_OAK_DATA} />;
}
```

**Key constraint:** `alternates: { canonical: "/royal-oak-barber-shop" }` is a relative string. Next.js resolves it against `metadataBase: new URL("https://royallook.ca")` (set in `layout.tsx`) and emits `<link rel="canonical" href="https://royallook.ca/royal-oak-barber-shop" />` in the exported HTML. [VERIFIED: src/app/layout.tsx]

The homepage uses `alternates: { canonical: SHOP.siteUrl }` (absolute URL) as a special case. All other pages use relative strings — match this.

### Pattern 2: Section/Container layout (mirror services/page.tsx)

[VERIFIED: src/app/services/page.tsx, src/app/globals.css — read directly]

```tsx
// In LandingPage.tsx
<section className="section">
  <div className="container">

    {/* Header block */}
    <div className="section-head">
      <div>
        <div className="eyebrow">{data.eyebrow}</div>
        <h1 className="serif">
          Royal Oak <em>Barber Shop.</em>
        </h1>
      </div>
      <p className="lede">{data.tagline}</p>
    </div>

    {/* Intro copy */}
    <p style={{ fontSize: 17, lineHeight: 1.65, maxWidth: "70ch", color: "var(--ink-2)" }}>
      {data.intro}
    </p>

    {/* Emphasized services — using menu-row pattern */}
    <div className="menu-col" style={{ maxWidth: 820, marginTop: 56 }}>
      {data.emphasizedServices.map((svc, i) => (
        <div key={svc.displayName} className="menu-row">
          <div>
            <div className="nm">{svc.displayName}</div>
            <div className="dur">{svc.duration}</div>
          </div>
          <span className="pr serif">{svc.price}</span>
        </div>
      ))}
    </div>

  </div>
</section>
```

`section-head h1`/`h2` are styled to `clamp(40px, 5vw, 64px)` serif with `max-width: 18ch`. The `em` within gets `font-style: italic; color: var(--accent)` (gold). [VERIFIED: globals.css lines 327-336]

### Pattern 3: Map + NAP block (mirror LocationPreview.tsx)

[VERIFIED: src/components/LocationPreview.tsx — read directly]

```tsx
<section className="section">
  <div className="container">
    <div className="find-grid">

      <div className="find-map">
        <iframe
          src={SHOP.googleMapsEmbed}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${SHOP.name} location on Google Maps`}
        />
      </div>

      <div className="find-info">
        <h3 className="serif">{SHOP.name}</h3>
        <div className="addr">
          {SHOP.address.street}<br />
          {SHOP.address.city}, {SHOP.address.province} · {SHOP.address.postal}<br />
          <a
            href={`tel:${SHOP.phone.replace(/\D/g, "")}`}
            style={{ color: "var(--accent)" }}
            data-call-location={data.callLocation}
          >
            {SHOP.phone}
          </a>
        </div>

        <p className="find-note">{data.landmark}</p>

        {/* hours-grid (same pattern as LocationPreview) */}

        {/* Primary CTA */}
        <a
          href={`tel:${SHOP.phone.replace(/\D/g, "")}`}
          className="btn btn-primary"
          data-call-location={`${data.callLocation}_primary`}
        >
          Call {SHOP.phone}
        </a>
      </div>

    </div>
  </div>
</section>
```

**`data-call-location` values:** Use `"royal_oak_page_cta"` and `"saanich_beard_page_cta"`. The `Analytics.tsx` delegated click listener on `document` fires `call_click` events for ANY `tel:` link with a `data-call-location` attribute — no changes to Analytics required. [VERIFIED: src/components/Analytics.tsx lines 23-36]

### Pattern 4: JSON-LD injection (mirror layout.tsx)

[VERIFIED: src/app/layout.tsx lines 67-121 — read directly]

```tsx
// At the top of LandingPage.tsx return, before the visible content
<>
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          // Service entities (one per emphasized service)
          {
            "@type": "Service",
            "name": "Skin Fade — Royal Oak",
            "serviceType": "Skin Fade",
            "description": "Expert skin fade haircuts at Royal Look Barber Shop, serving Royal Oak and Broadmead Village in Victoria, BC.",
            "areaServed": {
              "@type": "Place",
              "name": "Royal Oak",
              "addressRegion": "BC",
              "addressCountry": "CA"
            },
            "provider": {
              "@id": `${SHOP.siteUrl}/#barbershop`
            },
            "offers": {
              "@type": "Offer",
              "price": "30",
              "priceCurrency": "CAD"
            }
          },
          // ... additional Service entities
          // BreadcrumbList
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": SHOP.siteUrl },
              { "@type": "ListItem", "position": 2, "name": "Royal Oak Barber Shop", "item": `${SHOP.siteUrl}/royal-oak-barber-shop` }
            ]
          }
        ]
      })
    }}
  />
  {/* visible page content */}
</>
```

This is a Server Component (no `"use client"` directive), so `dangerouslySetInnerHTML` is fully valid — same as `layout.tsx`. Next.js static export writes this into the HTML `<body>` of `out/royal-oak-barber-shop/index.html`.

### Pattern 5: Sitemap extension (mirror sitemap.ts)

[VERIFIED: src/app/sitemap.ts — read directly]

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SHOP.siteUrl;
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/barbers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/location`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // ADD:
    { url: `${base}/royal-oak-barber-shop`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/beard-trim-saanich`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
```

`export const dynamic = "force-static"` already present — keeps the sitemap in the static export.

### Pattern 6: Data shape for `src/lib/landing.ts`

[VERIFIED: src/lib/config.ts — read directly; shape derived from existing types]

```typescript
import { SERVICES } from "./config";

export type EmphasizedService = {
  displayName: string;   // Friendly label shown on page (e.g. "Beard Trim")
  configName: string;    // Exact name in SERVICES for price/duration lookup
  description: string;   // Short service description for the landing page
};

export type LandingPageData = {
  slug: string;
  metaTitle: string;          // passed to metadata.title (no brand suffix — template adds it)
  metaDescription: string;
  eyebrow: string;            // e.g. "Royal Oak · Victoria, BC"
  h1: string;                 // e.g. "Royal Oak Barber Shop"
  h1Emphasis: string;         // the <em> portion, e.g. "Barber Shop." (italic gold)
  intro: string;              // ≥150-word unique intro paragraph
  emphasizedServices: EmphasizedService[];
  landmark: string;           // area-specific find-note text
  callLocation: string;       // data-call-location value for the NAP tel: link
  callLocationPrimary: string;// data-call-location for the large CTA button
  breadcrumbLabel: string;    // BreadcrumbList item 2 name
  areaServedName: string;     // for JSON-LD areaServed Place name
};

// Prices and durations are resolved at render time by looking up configName in SERVICES
// — never hardcoded. Helper:
export function resolveService(configName: string) {
  for (const cat of SERVICES) {
    const found = cat.items.find((s) => s.name === configName);
    if (found) return found;
  }
  return null;
}
```

Services available in config for price/duration lookup [VERIFIED: src/lib/config.ts]:

| configName | price | duration |
|------------|-------|----------|
| Skin Fade | $30 | 45–60 min |
| Kids | $25 | 20–30 min |
| Regular Hair Cut | $28 | 30–45 min |
| Buzz Cut | $20 | 15–20 min |
| Trim Beard | $20 | 20–30 min |
| Hot Shave | $35 | 30–40 min |
| Senior | $25 | 30–45 min |

**Royal Oak page emphasized services:** Skin Fade ($30), Kids ($25); supporting: Regular Hair Cut ($28).
**Saanich page emphasized services:** Trim Beard ($20), Hot Shave ($35); supporting: Regular Hair Cut ($28).

### Pattern 7: Config extension for Royal Oak landmark

[VERIFIED: src/lib/config.ts line 38-39 — `landmarks` is a `string`, used in LocationPreview.tsx line 56]

The existing `SHOP.landmarks` is: `"Inside Broadmead Village Shopping Centre, just to the left of Starbucks — with free parking in the lot right out front."` — referenced only in `LocationPreview.tsx`. Keep it unchanged.

Add a new field:

```typescript
export const SHOP = {
  // ... existing fields unchanged ...
  landmarks:
    "Inside Broadmead Village Shopping Centre, just to the left of Starbucks — with free parking in the lot right out front.",
  landmarkRoyalOak:
    "Steps from Royal Oak Transit Exchange (BC Transit hub at Royal Oak Ave & Elk Lake Dr) — and right inside Broadmead Village Shopping Centre.",
  // ...
} as const;
```

The `as const` on `SHOP` (line 56 of config.ts) means the TypeScript type is inferred from the literal shape. Adding `landmarkRoyalOak` just extends the inferred type — no type declaration needed.

### Pattern 8: Footer internal linking

[VERIFIED: src/components/Footer.tsx — read directly]

The "Areas Served" column already maps `SHOP.areasServed` but renders items as plain `<a>` with no `href`. Minimally change `Royal Oak` and `Saanich` items to real links:

```tsx
// In Footer.tsx — Areas Served ul
{SHOP.areasServed.map((area) => {
  const href =
    area === "Royal Oak" ? "/royal-oak-barber-shop" :
    area === "Saanich" ? "/beard-trim-saanich" :
    undefined;
  return (
    <li key={area}>
      <a href={href}>{area}</a>
    </li>
  );
})}
```

`href={undefined}` renders as a plain `<a>` with no href (same as current behavior for all other areas). No structural change, no new column, minimal diff.

### Anti-Patterns to Avoid

- **Mirroring `location/page.tsx`:** That file uses a mix of undefined custom classes (`btn-secondary`, `card`, `section-heading`, `section-subheading`, `text-gold`, `text-text-muted`, `bg-surface`, `border-border`) and Tailwind utility classes. After the current redesign, many of those class names no longer exist in globals.css or the Tailwind `@theme`. Use `services/page.tsx` as the template instead.
- **Emitting a second `BarberShop` node:** `layout.tsx` already emits `{ "@type": "BarberShop", "@id": "${siteUrl}/#barbershop" }`. A second script with the same `@id` is a conflict. Per-page JSON-LD must reference it with `{ "@id": "..." }` only (ID pointer, not a full re-emission).
- **Hardcoding prices:** Prices must come from `SERVICES` array in config via `resolveService()`. If prices change, only `config.ts` needs updating.
- **Adding `"use client"` to the page or LandingPage component:** Not needed. The map iframe and `tel:` links are static HTML. `Analytics.tsx` (already `"use client"`) handles all click tracking via its delegated document listener. Server Components can use `dangerouslySetInnerHTML`.
- **Creating dynamic routes (`[slug]/page.tsx`):** These two slugs are fixed. Fixed routes (`royal-oak-barber-shop/page.tsx`) don't need `generateStaticParams()` and build cleanly under `output: "export"`.
- **Double-branding the title:** `layout.tsx` title template is `"%s | Royal Look Barber Shop"`. The page `metadata.title` should be `"Royal Oak Barber Shop"` (not `"Royal Oak Barber Shop | Royal Look Barber Shop"`) — the template appends automatically.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Call tracking | Custom event system in page components | `Analytics.tsx` already installed — just add `data-call-location` to any `tel:` link | Analytics.tsx has a delegated `document` click listener that fires for ALL `tel:` links site-wide — zero extra code needed |
| NAP rendering | Copy/paste address HTML into each page | `SHOP.address`, `SHOP.phone`, `SHOP.hours` from config | Single source of truth; NAP consistency with GBP |
| Price lookup | Hardcode prices in landing page data | `resolveService(configName)` helper that reads `SERVICES` | Prices sourced from config; one edit location |
| Canonical URL | Hardcode absolute canonical in metadata | `alternates: { canonical: "/slug" }` relative string | Next.js resolves against `metadataBase` automatically |
| Open graph metadata | Extra og: tags in page metadata | Layout's `openGraph` defaults plus page `title`/`description` override | Layout already sets og type, locale, siteName |

---

## Common Pitfalls

### Pitfall 1: `btn-secondary` is not defined in globals.css

**What goes wrong:** Three existing files (`location/page.tsx`, `InstagramFeed.tsx`, `ReviewsSection.tsx`) use `className="btn-secondary ..."` but no `.btn-secondary` rule exists in `src/app/globals.css` (confirmed by reading all 992 lines). CTAs render without background, border, or color — visually broken.

**Why it happens:** The redesign added `.btn`, `.btn-primary`, `.btn-ghost` but `btn-secondary` was referenced without being defined.

**How to avoid:** Add to `globals.css` in Wave 0, near the existing btn rules (around line 208):

```css
.btn-secondary {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}
.btn-secondary:hover { background: var(--accent-2); border-color: var(--accent-2); }
```

Alternatively, use `btn-primary` for the call CTA if a gold background is not desired. Either fix must happen before the landing-page CTAs are built.

**Warning signs:** Build passes (CSS classes don't cause build errors) but CTA buttons appear as unstyled links in the browser.

### Pitfall 2: `card` class also undefined

**What goes wrong:** `location/page.tsx` uses `className="card"` but no `.card` rule exists in globals.css (only `.barber-card`, `.work-card`, `.team-card`, `.gallery-item`).

**How to avoid:** The landing pages should NOT use `className="card"`. Use the services-page pattern (`menu-row`, `menu-col`) for service display. If a card container is needed for the info section, use `background: var(--card)` inline or define `.card` in globals.css.

### Pitfall 3: `location/page.tsx` is the wrong template

**What goes wrong:** Copying from `location/page.tsx` pulls in undefined classes and old Tailwind tokens (`text-gold`, `text-text-muted`, `bg-surface`, `border-border`) that don't exist in the current Tailwind 4 `@theme`.

**How to avoid:** Use `services/page.tsx` as the structural template. Use `LocationPreview.tsx` for the map+NAP section (it uses only fully-defined globals.css classes).

### Pitfall 4: JSON-LD `@id` conflict

**What goes wrong:** If `LandingPage.tsx` emits `{ "@type": "BarberShop", "@id": "https://royallook.ca/#barbershop", ... }`, Google's structured data parser sees two nodes with the same `@id`. This is a validation error and can suppress rich results.

**How to avoid:** The `provider` field in each `Service` node must be an ID reference only:
```json
"provider": { "@id": "https://royallook.ca/#barbershop" }
```
Do not include `@type`, `name`, `address`, or any other properties in the `provider` object — only `@id`.

### Pitfall 5: `SHOP as const` type narrowing

**What goes wrong:** When adding `landmarkRoyalOak` to `SHOP`, the `as const` assertion makes the type `typeof SHOP`, which is inferred from the literal. Any code that does `const s: typeof SHOP = SHOP` and then tries to use `s.landmarkRoyalOak` will have TypeScript issues if the type was captured before the new field existed — but since we're adding to the literal, this is fine. The risk is if there's a separate explicit type annotation for `SHOP` somewhere.

**How to avoid:** Grep for explicit type annotations on `SHOP` (e.g., `const SHOP: ShopConfig = {...}`) before adding the field. Based on the current `config.ts`, there is no such annotation — `SHOP` is inferred from its value. Safe to extend.

### Pitfall 6: Static-export canonical in the HTML

**What goes wrong:** Developer assumes relative canonical `"/royal-oak-barber-shop"` will appear literally in the exported HTML, and manually prepends the domain to "verify."

**How to avoid:** Next.js resolves relative canonicals against `metadataBase` at build time. The exported `out/royal-oak-barber-shop/index.html` will contain:
```html
<link rel="canonical" href="https://royallook.ca/royal-oak-barber-shop"/>
```
Verify by inspecting the built HTML, not the source code.

### Pitfall 7: Thin-content / doorway-page risk

**What goes wrong:** Two pages with nearly identical structure and only slightly reworded intros. Google's helpful-content system may classify them as doorway pages or thin content, suppressing indexing.

**How to avoid:**
- Intros must be genuinely different in angle, not just substituted keywords. Royal Oak intro anchors to commuters/families near the transit exchange; Saanich intro anchors to men wanting grooming services and the beard/shave ritual.
- 150 words is the minimum floor; aim for 200–250 naturally written words per intro.
- Each page should link to `/services` and `/location` for depth (already handled by Footer nav).
- Do not use the same opening sentence.

---

## JSON-LD Specification

### Correct shape for Royal Oak page

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Skin Fade — Royal Oak Barber Shop",
      "serviceType": "Skin Fade",
      "description": "Expert skin fade haircuts at Royal Look Barber Shop, serving Royal Oak and Broadmead Village, Victoria BC.",
      "areaServed": { "@type": "Place", "name": "Royal Oak, Victoria BC" },
      "provider": { "@id": "https://royallook.ca/#barbershop" },
      "offers": { "@type": "Offer", "price": "30", "priceCurrency": "CAD" }
    },
    {
      "@type": "Service",
      "name": "Kids' Haircut — Royal Oak Barber Shop",
      "serviceType": "Kids' Haircut",
      "description": "Friendly, patient kids' haircuts at Royal Look Barber Shop in Royal Oak, Victoria BC.",
      "areaServed": { "@type": "Place", "name": "Royal Oak, Victoria BC" },
      "provider": { "@id": "https://royallook.ca/#barbershop" },
      "offers": { "@type": "Offer", "price": "25", "priceCurrency": "CAD" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://royallook.ca" },
        { "@type": "ListItem", "position": 2, "name": "Royal Oak Barber Shop", "item": "https://royallook.ca/royal-oak-barber-shop" }
      ]
    }
  ]
}
```

### Correct shape for Saanich page

Same `@graph` pattern; substitute:
- `areaServed: { "@type": "Place", "name": "Saanich, Victoria BC" }`
- Services: Trim Beard ($20) + Hot Shave ($35)
- BreadcrumbList item 2: `"name": "Beard Trim in Saanich"`, `"item": "https://royallook.ca/beard-trim-saanich"`

### Why `@graph` wrapper

The `@graph` array allows multiple schema.org entities in a single `<script>` tag, linked by shared context. This is the Google-recommended pattern when a page has multiple related entities. [ASSUMED — from schema.org/Google documentation training knowledge; recommend validating with schema.org Validator at https://validator.schema.org after implementation]

### `provider: { "@id": "..." }` — why only the ID

Schema.org allows an entity to be referenced by `@id` alone, without repeating its properties. The BarberShop node in `layout.tsx` is the "source of truth" node. Per-page `Service` nodes link to it via the `@id` pointer. Google's structured data parser merges these across the page's JSON-LD scripts. This avoids the duplicate-`@id` conflict. [ASSUMED — consistent with schema.org JSON-LD specification; confirm with Google Rich Results Test after implementation]

---

## Static Export Behavior — Verified Facts

[VERIFIED: next.config.ts, src/app/layout.tsx, src/app/sitemap.ts — read directly]

| Behavior | What Happens | Evidence |
|----------|-------------|---------|
| Fixed routes `app/royal-oak-barber-shop/page.tsx` | Exported to `out/royal-oak-barber-shop/index.html` at build time | Standard Next.js App Router static export behavior for fixed (non-dynamic) routes |
| `alternates: { canonical: "/royal-oak-barber-shop" }` | Resolved to `https://royallook.ca/royal-oak-barber-shop` in exported HTML | `metadataBase: new URL("https://royallook.ca")` in layout.tsx; Next.js resolves relative canonicals against it |
| `dangerouslySetInnerHTML` in Server Component | Works; rendered to HTML at build time | Same pattern used in `layout.tsx` for sitewide JSON-LD |
| `sitemap.ts` with `dynamic = "force-static"` | Included in export as `out/sitemap.xml` | Already used; adding two URL entries is a straightforward array append |
| `generateStaticParams()` | NOT needed | These are fixed routes, not dynamic `[slug]` routes |
| `output: "export"` in next.config.ts | No server-side code allowed at runtime | Already enforced; all new code is static-compatible |

---

## Internal Linking — Decision

**Recommended approach:** Update `Footer.tsx` "Areas Served" column only.

The Footer already renders `SHOP.areasServed` (currently: Royal Oak, Broadmead, Cordova Bay, Gordon Head, Cadboro Bay, Saanich, Oak Bay, Victoria). Currently all items are plain `<a>` tags with no `href`. Add `href` to Royal Oak and Saanich only.

**Why this approach:**
- Minimal diff — 3 lines changed
- Footers appear on every page, so both new pages immediately receive inbound links from 4+ existing pages
- No structural changes to homepage, nav, or other sections
- The Footer "Pages" column could also gain links, but the Areas Served column is more semantically accurate

**Alternative considered (not recommended for this phase):** Add an "Areas We Serve" section on the homepage with links. This is more visible but is a homepage content change that risks the homepage's Broadmead focus. Defer to v2 unless the planner determines it's safe.

---

## Local SEO Content Guidance

[ASSUMED — from training knowledge; cross-reference with Google Search Central documentation before writing final copy]

**Doorway-page test:** Each page must have standalone value for a user landing on it directly from search — not just funnel them elsewhere. Both pages pass this test because: (1) they answer the search intent ("barber in Royal Oak" / "beard trim Saanich") on-page, (2) they show the map and hours so the user can walk in, (3) they list relevant services with prices.

**Uniqueness thresholds:**
- Intro paragraphs: No sentence shared between the two pages or the homepage hero copy.
- Emphasized services: Different for each page (haircut focus vs. grooming focus).
- Landmarks and local references: Royal Oak page references Transit Exchange + Broadmead Village Shopping Centre. Saanich page references the broader Saanich municipality + Royal Oak neighborhood context.

**Keyword placement (practical):**
- H1: exact target phrase ("Royal Oak Barber Shop", "Beard Trim in Saanich")
- First 50 words of intro: include the target phrase naturally once
- `alt` attribute on any images (if added): include area name
- Page `<title>` (after template): "Royal Oak Barber Shop | Royal Look Barber Shop"
- Meta description: include target phrase + call to action

**Tone guidance:** Match `SERVICE_DETAILS` in `services/page.tsx` — neighbourhood-warm, factual, no hype. Reference: "Popular with guys across Broadmead and Royal Oak", "A real barbershop experience most quick-cut chains nearby don't offer." [VERIFIED: src/app/services/page.tsx lines 21, 36]

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|-----------------|--------|
| Pages API (`pages/`) JSON-LD via `next/head` + `<script>` in `<Head>` | App Router Server Component with `dangerouslySetInnerHTML` in `<head>` or `<body>` | In App Router, `<head>` tags go via `metadata` API; JSON-LD script can go in `<body>` (valid HTML5); layout.tsx uses this pattern already |
| `getStaticProps` for static pages | Server Component default (no data fetching needed for config-driven pages) | Config is imported directly; no async data needed |
| `next-sitemap` package | Native `sitemap.ts` App Router route | Already in use; native is sufficient |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `@graph` is the recommended multi-entity JSON-LD pattern per Google | JSON-LD Specification | Low risk — `@graph` is a standard JSON-LD 1.1 construct; Google's Rich Results Test will flag if wrong |
| A2 | `provider: { "@id": "..." }` alone (without re-emitting BarberShop properties) prevents duplicate-`@id` conflict | JSON-LD Specification | Low risk — this is standard JSON-LD reference behavior; validate with schema.org Validator |
| A3 | `btn-secondary` intended as a gold/accent-background call button | Pitfalls | Medium risk — if the intended color is different, CTA button will look wrong; verify with user or check git history for original intent |
| A4 | Local SEO content guidelines (uniqueness thresholds, doorway-page criteria) | Local SEO Content Guidance | Low risk — Google's current guidance consistently penalizes thin/templated content; the ≥150-word unique intro requirement already guards against this |

---

## Open Questions (RESOLVED)

1. **`btn-secondary` color intent**
   - What we know: class is used in 3 places, not defined in globals.css
   - What's unclear: whether it was intended as gold (accent) background, navy outline, or another style
   - Recommendation: Define as `background: var(--accent); color: var(--bg)` (gold, contrasting) matching the visual hierarchy of a prominent call CTA. If the planner disagrees, `btn-primary` (navy) is the safe fallback.
   - RESOLVED: Define `.btn-secondary` with `background: var(--accent); color: var(--bg)` (gold). Implemented in Plan 01-01 Task 1.

2. **`card` class for info panels**
   - What we know: `location/page.tsx` uses `.card` but it's undefined; `services/page.tsx` doesn't use it
   - What's unclear: whether to define `.card` or use different structure
   - Recommendation: Do not use `.card` on landing pages. Use the `find-info` structure (already defined) for the info panel. If a card wrapper is needed elsewhere, define `.card { background: var(--card); border: 1px solid var(--hairline); padding: 28px; }` in globals.css.
   - RESOLVED: Do NOT use `.card`; use the existing `find-info` structure for the info panel. Implemented in Plan 01-02 Task 1.

3. **Should `areaServed` in JSON-LD use `Place` or `City`?**
   - What we know: Royal Oak and Saanich are neighbourhoods/municipalities, not cities per se; "Royal Oak" is a district; "Saanich" is a municipality (District of Saanich)
   - What's unclear: whether schema.org `City` or `Place` is more accurate
   - Recommendation: Use `"@type": "Place"` for both — more general, always valid, never wrong. `City` would be technically inaccurate for a district.
   - RESOLVED: Use `"@type": "Place"` for `areaServed`. Implemented in Plan 01-02 Task 2.

---

## Environment Availability

Step 2.6: SKIPPED — this phase has no external dependencies. All capabilities are implemented in the Next.js codebase with already-installed packages. No new CLIs, databases, or services required.

---

## Validation Architecture

> `workflow.nyquist_validation` key not found in `.planning/config.json` (no config.json exists) — treating as enabled.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — all validation is build-output inspection |
| Config file | None |
| Quick run command | `npm run build` |
| Full validation | `npm run build` + HTML inspection of `out/` |

No test runner (Jest, Vitest, Playwright) is installed in this project. Validation is done by inspecting the static output after `npm run build`.

### Phase Requirements → Validation Map

| Req ID | Behavior | Validation Type | Command / Method |
|--------|----------|----------------|-----------------|
| SEO-01 | `/royal-oak-barber-shop` exists, H1 = "Royal Oak Barber Shop", contains "Royal Oak Transit Exchange", "skin fade", "kids" | Build output inspection | After `npm run build`: inspect `out/royal-oak-barber-shop/index.html` for `<h1>Royal Oak Barber Shop`, "Royal Oak Transit Exchange", "skin", "kids" |
| SEO-02 | `/beard-trim-saanich` exists, H1 = "Beard Trim in Saanich", contains "beard trim", "hot-towel" or "straight-razor" | Build output inspection | Inspect `out/beard-trim-saanich/index.html` for `<h1>Beard Trim in Saanich`, beard/shave keywords |
| SEO-03 | Intros are unique across both pages and homepage; each ≥150 words | Manual diff + word count | Compare intro strings in `src/lib/landing.ts` directly; word count tool or manual count; no shared sentences |
| SEO-04 | Services/prices match config values | Config cross-reference | Inspect rendered `index.html` for `$30` (Skin Fade), `$25` (Kids), `$20` (Trim Beard), `$35` (Hot Shave); verify these match `SERVICES` in config.ts |
| SEO-05 | Map iframe present; NAP present; `tel:` links with `data-call-location` | Build output inspection | Search `index.html` for `maps.google.com/maps?q=`, `777 Royal Oak Dr`, `778`, `href="tel:`, `data-call-location` |
| SEO-06 | Per-page canonical tag; valid JSON-LD | Build output + external validator | In HTML: `<link rel="canonical" href="https://royallook.ca/royal-oak-barber-shop"/>`. JSON-LD: paste `<script type="application/ld+json">` content into https://validator.schema.org or Google Rich Results Test |
| SEO-07 | Built from one reusable component; uses correct design classes | Code review | Both `page.tsx` files import `LandingPage` from the same component; HTML contains `.section`, `.container`, `.section-head`, `.find-grid`, `.find-map`, `.find-info` class attributes |
| SEO-08 | Both URLs in sitemap.xml; build exits 0 | Build output inspection | `npm run build` exits with code 0; `out/sitemap.xml` contains `royallook.ca/royal-oak-barber-shop` and `royallook.ca/beard-trim-saanich` |

### Wave 0 Gaps

- [ ] Define `.btn-secondary` in `src/app/globals.css` — no CTA styling exists without it (SEO-05)
- [ ] Optionally define `.card` in `src/app/globals.css` if the info panel design needs it

*(No test framework setup needed — this project has no automated test runner)*

---

## Security Domain

This phase adds purely presentational static pages with no user input, no auth, no API calls, and no data persistence. ASVS categories are not applicable:

| ASVS Category | Applies | Reason |
|---------------|---------|--------|
| V2 Authentication | No | No auth |
| V3 Session Management | No | No sessions; static site |
| V4 Access Control | No | All pages publicly accessible by design |
| V5 Input Validation | No | No user input on these pages |
| V6 Cryptography | No | No cryptographic operations |

No known threat patterns apply to static HTML pages with an embedded Google Maps iframe (iframe is served from Google's own domain; no user data processed).

---

## Sources

### Primary (HIGH confidence — read directly from codebase)
- `src/lib/config.ts` — SHOP shape, SERVICES array, service names/prices/durations, siteUrl
- `src/app/layout.tsx` — title template, metadataBase, sitewide BarberShop JSON-LD `@id`, script tag pattern
- `src/app/sitemap.ts` — existing entry format, `dynamic = "force-static"` pattern
- `src/components/LocationPreview.tsx` — find-grid/find-map/find-info layout, iframe pattern, `data-call-location`, hours rendering
- `src/components/Analytics.tsx` — delegated click handler for all `tel:` links
- `src/components/Footer.tsx` — Areas Served column structure (internal link candidate)
- `src/app/services/page.tsx` — metadata export pattern, section/container/section-head/eyebrow/serif/lede structure
- `src/app/location/page.tsx` — `alternates.canonical` pattern, `data-call-location` usage (also documents the mismatch pitfall)
- `src/app/globals.css` — full class inventory (992 lines read); confirmed: `.btn-secondary` and `.card` absent
- `src/app/page.tsx` — homepage structure (confirms no landing page exists here)
- `next.config.ts` — `output: "export"`, `images: { unoptimized: true }`
- `package.json` — installed versions (Next.js ^16.1.6, React ^19.2.4, Tailwind ^4.1.18)

### Tertiary (ASSUMED — from training knowledge, not verified via external tool this session)
- schema.org JSON-LD `@graph` pattern for multi-entity structured data
- `provider: { "@id": "..." }` ID-reference technique for avoiding duplicate node conflicts
- Google's helpful-content system and doorway-page criteria
- Next.js canonical resolution behavior (relative string + `metadataBase`)

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages confirmed in package.json; no new installs
- Architecture: HIGH — patterns traced directly from existing source files
- JSON-LD shape: MEDIUM — schema.org JSON-LD is well-established, but exact Google interpretation tagged ASSUMED; validate with Rich Results Test post-implementation
- Pitfalls: HIGH — btn-secondary absence confirmed by reading all 992 lines of globals.css; location/page.tsx class mismatch confirmed by cross-referencing with globals.css definitions

**Research date:** 2026-06-26
**Valid until:** 2026-12-26 (stable Next.js static export APIs; schema.org changes rarely)
