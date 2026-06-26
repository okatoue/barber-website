import { SERVICES, SHOP, type Service } from "./config";

// ============================================================
// TYPES
// ============================================================

export type EmphasizedService = {
  displayName: string;
  configName: string;
  description?: string;
};

export type LandingPageData = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  h1Emphasis: string;
  intro: string;
  emphasizedServices: EmphasizedService[];
  landmark: string;
  callLocation: string;
  callLocationPrimary: string;
  breadcrumbLabel: string;
  areaServedName: string;
};

// ============================================================
// HELPER
// ============================================================

/**
 * Look up a service by its config name across all SERVICES categories.
 * Returns the matching Service object, or null if not found.
 * Use this to resolve price and duration — never hardcode those values in the data below.
 */
export function resolveService(configName: string): Service | null {
  for (const category of SERVICES) {
    const item = category.items.find((s) => s.name === configName);
    if (item) return item;
  }
  return null;
}

// ============================================================
// PAGE DATA
// ============================================================

export const ROYAL_OAK_DATA: LandingPageData = {
  slug: "royal-oak-barber-shop",
  metaTitle:
    "Royal Oak Barber Shop — Skin Fades & Kids' Cuts | Royal Look Victoria BC",
  metaDescription:
    "Royal Oak Barber Shop inside Broadmead Village Shopping Centre. Expert skin fades, kids' haircuts, and classic cuts. Steps from Royal Oak Transit Exchange. Walk-ins welcome seven days a week.",
  eyebrow: "Royal Oak · Victoria, BC",
  h1: "Royal Oak Barber Shop",
  h1Emphasis: "Barber Shop.",
  intro: `Royal Oak Barber Shop at Broadmead Village is the neighbourhood spot for men and kids who want a clean, precise cut without travelling far. Whether you step off a bus at the Royal Oak Transit Exchange on Royal Oak Drive or drive in from a side street, the shop is easy to reach — with free parking in the lot right out front.

Skin fades are a cornerstone of what we do here. Our barbers blend hair down to the skin with careful, unhurried technique, shaping each fade to suit your face and the look you have in mind. Whether it's a mid-fade, a high-and-tight, or something more tapered, every finish is a clean one.

Kids' cuts are handled with the same focus. We see children aged three and up, and our barbers are patient and straightforward, which helps younger clients settle in quickly. There's no rush, and first-timers are always welcome.

Royal Look sits inside Broadmead Village Shopping Centre, steps from the transit exchange and surrounded by everyday amenities. There's no need to make a separate trip — a fresh cut fits easily into an errand run. The shop is open every day of the week, nine to seven Monday through Friday and nine to five on weekends. Give us a call to check availability, or simply come in.`,
  emphasizedServices: [
    { displayName: "Skin Fade", configName: "Skin Fade" },
    { displayName: "Kids' Haircut", configName: "Kids" },
    { displayName: "Regular Hair Cut", configName: "Regular Hair Cut" },
  ],
  landmark: SHOP.landmarkRoyalOak,
  callLocation: "royal_oak_page_cta",
  callLocationPrimary: "royal_oak_page_cta_primary",
  breadcrumbLabel: "Royal Oak Barber Shop",
  areaServedName: "Royal Oak, Victoria BC",
};

export const SAANICH_DATA: LandingPageData = {
  slug: "beard-trim-saanich",
  metaTitle:
    "Beard Trim in Saanich — Hot-Towel Straight-Razor Shave | Royal Look Victoria BC",
  metaDescription:
    "Professional beard trim in Saanich at Royal Look Barber Shop, inside Broadmead Village Shopping Centre. Hot-towel straight-razor shaves, beard shaping, and classic cuts. Walk-ins welcome.",
  eyebrow: "Saanich · Victoria, BC",
  h1: "Beard Trim in Saanich",
  h1Emphasis: "in Saanich.",
  intro: `A proper Beard Trim in Saanich is easier to find than most people expect. Royal Look Barber Shop is right inside Broadmead Village Shopping Centre in the Royal Oak neighbourhood — the same Village that draws Saanich residents for groceries, pharmacy runs, and coffee. Fitting in a beard appointment on the same trip is straightforward: free parking is right out front.

Our beard trim is a focused service. Your barber checks your beard line, discusses the shape you want, then scissors and shaves the edges clean with a steady hand. We do not rush through grooming. If the line needs more definition or you want more bulk removed, we adjust on the spot.

For clients who want to go further, our hot-towel straight-razor shave is one of the most-requested services at the shop. The hot towel softens the skin and opens the pores, the straight razor delivers a closer finish than any cartridge blade, and the combination leaves your face smooth and settled. It takes thirty to forty minutes and the results speak for themselves.

Both services can be combined with a haircut or booked on their own. Royal Look is open every day of the week, with weekday hours running nine to seven. Come in when it suits you, or call ahead to check how busy we are — we will give you a straight answer.`,
  emphasizedServices: [
    { displayName: "Beard Trim", configName: "Trim Beard" },
    {
      displayName: "Hot-Towel Straight-Razor Shave",
      configName: "Hot Shave",
    },
    { displayName: "Regular Hair Cut", configName: "Regular Hair Cut" },
  ],
  landmark: SHOP.landmarks,
  callLocation: "saanich_beard_page_cta",
  callLocationPrimary: "saanich_beard_page_cta_primary",
  breadcrumbLabel: "Beard Trim in Saanich",
  areaServedName: "Saanich, Victoria BC",
};
