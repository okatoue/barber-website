# Phase 3 Research — GBP Services Audit & "Connect the Dots"

**Date:** 2026-06-26
**Method:** Read-only inspection of the live public Google Maps listing (signed-in owner view, but **no edits made**), cross-referenced against `src/lib/config.ts` (`SHOP`, `SERVICES`). Owner-only Services *editor* not opened — publishing happens in the dashboard as an owner action.
**Source:** Google Maps place — Royal Look Barber Shop (place id `0x548f738004ee3a41:0x41df978b9274788d`, `/g/11x_nj8zt8`).

---

## 1. Current GBP state (what's actually there)

| Field | On GBP (live) | In website config | Match? |
|---|---|---|---|
| Name | Royal Look Barber Shop | Royal Look Barber Shop | ✅ |
| Primary category | **Barber shop** (only one shown) | — | ✅ (correct primary) |
| Secondary category | **none visible** | — | ⚠️ opportunity (see §4) |
| Address | 777 Royal Oak Dr #530, Victoria, BC V8X 4V1 | same | ✅ exact NAP match |
| "Located in" | Broadmead Village Shopping Centre | landmark text matches | ✅ |
| Phone | (778) 430-0040 | (778) 430-0040 | ✅ |
| Website | royallook.ca | royallook.ca | ✅ |
| Hours | "Closed · Opens 9 a.m." | opens 9:00 AM | ✅ consistent |
| Rating / reviews | **4.9 · 122 reviews** | googleReviewCount: **127** | ❌ **stale in config** |
| Accessibility | Wheelchair-accessible icon shown | — | ✅ present |
| Owner posts | Active — "hot towel shave" post 1 day ago | — | ✅ good signal |
| Plus code | FJW9+QP Victoria | coords match | ✅ |

### The headline finding — GBP **Services list is empty**
The "Services" entry in the panel is **just a link to `royallook.ca/services`** (verified: both the "Services" link and its action link resolve to `https://royallook.ca/services`). There are **no structured GBP service items** (no named services with descriptions/prices). So BrightLocal's task is a **net-new build of the Services section**, not an edit — exactly the gap they flagged.

### Bonus signal — Google's auto-extracted review topics
Google surfaces these from customer reviews (not owner-set, but they show demand and what people search): **beard trim (6), eyebrow trim (2), fade (5), skilled barber (7)**, +6 more. Two takeaways:
- "fade" and "beard trim" are already the dominant associations → confirms the right services to feature.
- **"eyebrow trim"** shows up but is **NOT on the website menu or service list** → a real service customers mention that's currently invisible in your structured data (see §4 decision).

---

## 2. Website menu (`SERVICES` in config.ts) — the source of truth to align to

Haircuts: Regular Hair Cut $28 · Skin Fade $30 · Kids $25 · Senior $25 · Buzz Cut $20
Grooming: Trim Beard $20 · Hot Shave $35 · Hair Wash $7

---

## 3. Connect-the-dots: BrightLocal's 5 GBP services → your menu

| BrightLocal GBP service | Maps to website item | Price (price field) | Plain-English description (no phone/URL) |
|---|---|---|---|
| **Skin Fade** | Skin Fade | $30 | A clipper fade blended down to the skin — low, mid, or high — finished sharp and tailored to how you like it to grow out. |
| **Classic Men's Cut** | Regular Hair Cut | $28 | A traditional men's haircut with scissors and clippers, cut to your length and styled before you leave. Every cut includes a quick consultation. |
| **Kids' Cut** | Kids | $25 | Patient, friendly haircuts for kids and teens, from first cuts to regular school trims. We take kids aged 3 and up. |
| **Hot-Towel Straight-Razor Shave** | Hot Shave | $35 | Warm lather and a hot towel to soften the skin, finished with a straight razor for the closest, smoothest result. |
| **Beard Trim or Lineup** | Trim Beard | $20 | Beard shaping and trims that keep facial hair tidy and defined, finished with a clean lineup along the cheeks and neck. |

**Optional additional GBP services** (you offer them; adding rounds out the list): Buzz Cut $20, Senior's Cut $25, Hair Wash $7.

---

## 4. Decisions for the owner (the "dots" that need a human call)

1. **Review count is stale.** Config says 127; GBP shows **122**. (Review counts can dip when Google filters some out.) → Update `googleReviewCount` to 122 in `config.ts` so the site doesn't overstate. *(small code change)*
2. **"Eyebrow trim" gap.** Customers mention it in reviews but it's not on your menu or services. Do you actually offer it? If yes → add it to `SERVICES` (with a price) **and** as a 6th GBP service. If no → ignore.
3. **Service-name consistency (site ↔ GBP).** Your menu uses "Trim Beard" / "Hot Shave"; GBP/BrightLocal use "Beard Trim or Lineup" / "Hot-Towel Straight-Razor Shave." Recommend renaming in `config.ts` to the clearer GBP wording so site and profile read identically. *(small code change — this is requirement GBP-04)*
4. **Secondary category.** Only "Barber shop" is set. No strong second category fits (don't add "Hair salon" — it can dilute relevance). Recommendation: **leave primary-only.** Documented so it's a deliberate choice, not an oversight.

---

## 5. Not yet verified (needs the owner dashboard — read-only check, no edits)

The public "About" tab attributes wouldn't extract cleanly. Confirm these in **Manage your Business Profile → Edit profile**:
- Attributes: appointments/walk-ins, "Identifies as…" (e.g., owner attributes), payment types, restroom, parking.
- That **Services is genuinely empty** (public view strongly implies it; dashboard is the source of truth).

---

## 6. Honest framing

Populating Services is a real, cheap relevance win and directly answers BrightLocal — but on its own it's a minor signal. The bigger levers visible here are already healthy (**4.9 across 122 reviews, active owner posts, exact-match NAP, menu photos**). Keep the review flow going; that's what moves the map pack more than the Services list.

---

## Output artifacts this research feeds
- **GBP-01/02:** §1–§3 above (current state + gap table).
- **GBP-03:** §3 table = paste-ready entries (names, descriptions, prices; no phone/URL).
- **GBP-04:** §4.3 = the `config.ts` renames; §4.1 = review-count fix; §4.2 = eyebrow-trim decision.
