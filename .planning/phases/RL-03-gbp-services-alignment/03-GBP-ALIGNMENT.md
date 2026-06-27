# GBP Services Alignment — Royal Look Barber Shop

**Phase:** 03-gbp-services-alignment
**Date:** 2026-06-27
**Purpose:** Paste-ready deliverable for populating the Google Business Profile Services section. Copy each entry directly into the GBP dashboard. Requirements covered: GBP-01, GBP-02, GBP-03, GBP-04.

---

## 1. Current GBP State (GBP-01)

| Field | Live GBP Value | Notes |
|-------|---------------|-------|
| Business name | Royal Look Barber Shop | Exact match with website |
| Primary category | **Barber shop** | Correct — no change needed |
| Secondary category | **None visible** | Deliberate — see Decision Notes §4 (D-05) |
| Services section | **EMPTY** | Just a link to royallook.ca/services — no structured service items exist |
| Address | 777 Royal Oak Dr #530, Victoria, BC V8X 4V1 | Exact NAP match |
| Located in | Broadmead Village Shopping Centre | Consistent with site landmarks |
| Phone | (778) 430-0040 | Exact NAP match |
| Website | royallook.ca | Exact NAP match |
| Hours | Opens 9 a.m. daily | Consistent with site config |
| Rating / reviews | 4.9 · ~122 reviews | Live count auto-pulled at build — see D-04 |
| Wheelchair accessible | Yes (icon shown) | Present |
| Owner posts | Active (hot towel shave post) | Good signal |

### The Headline Finding

The GBP **Services section is empty** — the "Services" panel link resolves to royallook.ca/services but no structured GBP service items (names, descriptions, prices) have been added. This is a **net-new build**, not an edit, and is the gap BrightLocal flagged.

### Google's Auto-Extracted Review Topics

Google surfaces these from customer reviews (demand signal, not owner-set): **beard trim (6), eyebrow trim (2), fade (5), skilled barber (7)**, plus six more. Key takeaways:

- "Fade" and "beard trim" are the dominant associations — confirms the right services to feature prominently.
- "Eyebrow trim" appears but is not offered as a standalone service — see D-03 in Decision Notes.

---

## 2. GBP vs Website Gap Table (GBP-02)

All eight website services from `SERVICES` in `src/lib/config.ts`, reconciled against GBP:

| Website service (config name) | GBP entry name | Price | Currently on GBP? | Note |
|-------------------------------|----------------|-------|-------------------|------|
| Regular Hair Cut | Classic Men's Cut | $28 | No — Services section empty | GBP name is more descriptive; site name unchanged (D-01) |
| Skin Fade | Skin Fade | $30 | No — Services section empty | Names match exactly |
| Kids | Kids' Cut | $25 | No — Services section empty | GBP name adds context; site name unchanged (D-01) |
| Senior | Senior's Cut | $25 | No — Services section empty | GBP name adds context; site name unchanged (D-01) |
| Buzz Cut | Buzz Cut | $20 | No — Services section empty | Names match exactly |
| Trim Beard | Beard Trim or Lineup | $20 | No — Services section empty | GBP name is more descriptive; site name unchanged (D-01) |
| Hot Shave | Hot-Towel Straight-Razor Shave | $35 | No — Services section empty | GBP name is more descriptive; site name unchanged (D-01) |
| Hair Wash | Hair Wash | $7 | No — Services section empty | Names match exactly |

All eight rows are new additions — the GBP Services section has never been populated.

---

## 3. Paste-Ready GBP Service Entries (GBP-03, D-02)

Copy each three-line block directly into the GBP dashboard under **Edit profile → Services**. Add the service name, paste the description into the description field, and enter the price. No phone numbers or URLs appear in any description field (Google flags these as spam).

---

**Service:** Skin Fade
**Description:** A clipper fade blended down to the skin — low, mid, or high — finished sharp and tailored to how you like it to grow out.
**Price:** $30

---

**Service:** Classic Men's Cut
**Description:** A traditional men's haircut with scissors and clippers, cut to your length and styled before you leave. Every cut includes a quick consultation.
**Price:** $28

---

**Service:** Kids' Cut
**Description:** Patient, friendly haircuts for kids and teens, from first cuts to regular school trims. We take kids aged 3 and up.
**Price:** $25

---

**Service:** Hot-Towel Straight-Razor Shave
**Description:** Warm lather and a hot towel to soften the skin, finished with a straight razor for the closest, smoothest result.
**Price:** $35

---

**Service:** Beard Trim or Lineup
**Description:** Beard shaping and trims that keep facial hair tidy and defined, finished with a clean lineup along the cheeks and neck.
**Price:** $20

---

**Service:** Buzz Cut
**Description:** Single-guard all-over clipper cut taken to one length for a clean, even, low-maintenance look. Quick and tidy.
**Price:** $20

---

**Service:** Senior's Cut
**Description:** An unhurried, comfortable cut for older clients, scissor or clipper, neatened around the ears and neck.
**Price:** $25

---

**Service:** Hair Wash
**Description:** A quick shampoo and towel dry, on its own or added before a cut, to leave hair clean and fresh.
**Price:** $7

---

## 4. Decision Notes

These are deliberate "no code change" choices — not oversights.

### GBP-04 / D-01 — No site renames

`src/lib/config.ts` service names stay exactly as-is (`Trim Beard`, `Hot Shave`, `Regular Hair Cut`, `Kids`, `Senior`). The more descriptive GBP names ("Beard Trim or Lineup", "Hot-Towel Straight-Razor Shave", "Classic Men's Cut", "Kids' Cut", "Senior's Cut") are used **only in the GBP dashboard entries** above — they are not mirrored back into the site menu.

Rationale: zero code diff and zero risk; the polished names read naturally in the GBP context but would look clunky as price-line items on the website. Additionally, `src/lib/landing.ts` already surfaces "Beard Trim" on area landing pages via its `configName`↔`displayName` mapping, so the site display is already handled without a config rename.

**GBP-04 resolution: no renames to apply to `config.ts`. Closed.**

### D-03 — Eyebrow trim excluded

"Eyebrow trim" surfaces in Google's auto-extracted review topics (2 mentions), which shows customers associate it with the shop. However, it is **not offered as a standalone service** — it is not on the website menu and will not be added to the GBP Services list. No `SERVICES` change.

If the shop begins offering eyebrow trims as a distinct paid service in future, add it to `SERVICES` in `config.ts` and return to add a ninth GBP entry.

### D-05 — Primary-only category (no secondary)

The GBP is set to **primary-only: "Barber shop"**. No strong second category fits — "Hair salon" would dilute relevance and risk pulling in the wrong search queries. Leaving primary-only is the deliberate recommendation, not an oversight.

### D-04 — Review count: no code change

`SHOP.googleReviewCount` in `src/lib/config.ts` is set to `127`. This is the **offline/local-dev fallback only**. The live rating and review count (~122 at time of audit) is auto-pulled at build time via `src/lib/google-reviews.ts` using the Google Places API, and the site is rebuilt daily by the cron job in `.github/workflows/deploy.yml`. The deployed site at royallook.ca already renders the live count — the `127` literal never appears in production.

The audit finding ("stale — update to 122") is therefore moot for the live site. No code change needed.

---

## 5. Owner Action Checklist

Steps to publish the eight entries above into the GBP dashboard:

- [ ] Sign in to Google Business Profile at business.google.com
- [ ] Open **Edit profile → Services**
- [ ] Confirm the Services section is currently empty (the public view strongly implies it; this is the source of truth)
- [ ] For each of the 8 entries in Section 3 above: add a new service, paste the **Service** name, paste the **Description** text, and enter the **Price**
- [ ] Save each entry
- [ ] While in Edit profile, confirm the following attributes that could not be extracted from the public view:
  - Appointments accepted / Walk-ins welcome
  - "Identifies as…" attributes (if applicable)
  - Payment types accepted
  - Restroom availability
  - Parking details (free lot is referenced on the site — confirm on GBP)
- [ ] After saving, check the public GBP listing to confirm the Services section now shows all 8 entries

**No changes are needed to the website** — `src/lib/config.ts`, any component, or any page file. This deliverable covers everything required for GBP-01 through GBP-04.
