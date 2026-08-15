import { SERVICES, SERVICE_COMBO, SHOP, type Service } from "./config";

// ============================================================
// TYPES
// ============================================================

export type EmphasizedService = {
  displayName: string;
  configName: string;
  description?: string;
};

/**
 * Structured directions for an AREA page. Every value here came from the shop
 * owner — no road, landmark, drive time, or bus route in this file is inferred
 * from a map. If the owner did not supply it, the field is left off.
 *
 * Only the five area pages carry this. Service pages (beard trim, skin fade,
 * kids' cuts, hot shave) have no origin neighbourhood, so they omit the field
 * entirely and the renderer skips the block.
 */
export type GettingHere = {
  /** Where the directions start from, e.g. "Royal Oak Shopping Centre" */
  from: string;
  /** Road-by-road route, e.g. "West Saanich Rd → Elk Lake Dr → Royal Oak Dr → Chatterton Way" */
  route: string;
  /** Approximate drive, e.g. "about 4 minutes" */
  driveTime: string;
  /** Transit note. Omit entirely when none was supplied. */
  transit?: string;
  /** Practical note — parking, busiest times. Omit when none. */
  note?: string;
};

/**
 * An in-content link to a related page on this site, rendered directly under
 * the intro prose.
 *
 * This exists because of the `/services` indexing failure (GSC, Jul 2026): that
 * page sat at "Discovered – currently not indexed" for weeks on the strength of
 * a single header-nav link, and Google reads a nav-only link as chrome rather
 * than endorsement. The service landing pages had exactly the same problem —
 * one inbound link each, all of them from `/services` itself.
 *
 * So these are deliberately in the flow of the page, below prose on the same
 * topic, and each one is a real sentence rather than a bare slug. Point them at
 * genuinely adjacent pages only: a link from a page about fades to a page about
 * fades is worth something, a link to everything is worth nothing.
 */
export type RelatedLink = {
  href: string;
  label: string;
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
  gettingHere?: GettingHere;
  /** Omit where no page is genuinely adjacent; the block is skipped entirely. */
  relatedLinks?: RelatedLink[];
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
// Two kinds of page live here: AREA pages (Royal Oak, Saanich, …) and
// SERVICE pages (skin fade, kids, hot shave). Both use LandingPageData.
//
// Note on `eyebrow`: LandingPage.tsx derives its section headings from
// `eyebrow.split("·")[0]` — "Your barber in {X}." and "{X} favourites."
// So the segment BEFORE the "·" must be a place, never a service name.
// Area pages lead with the neighbourhood; service pages lead with
// "Victoria" and put the service second.
//
// Every `description` below is written fresh per page. The same service
// appears on several pages and each instance must say something different
// — reusing phrasing across pages defeats the point of having the pages.
//
// The same goes for `intro`. Each area intro is built around what the owner
// told us about that neighbourhood's clients — who comes in and when — which
// is the one thing a competitor cannot copy off a map. Nothing local in these
// intros is inferred: if the owner did not say it, it is not on the page.
// `gettingHere` is area-pages-only; service pages leave it undefined.

export const ROYAL_OAK_DATA: LandingPageData = {
  slug: "royal-oak-barber-shop",
  metaTitle: "Royal Oak Barber Shop — Walk In 7 Days | Royal Look",
  metaDescription:
    "Royal Look is the barber shop inside Broadmead Village at Royal Oak — walk in 7 days, no appointment. Skin fade $30, kids' cut $25, free parking.",
  eyebrow: "Royal Oak · Victoria, BC",
  h1: "Royal Oak Barber Shop",
  h1Emphasis: "Barber Shop.",
  intro: `Two groups make up most of what we do for Royal Oak: retirees, and parents bringing kids in. That mix sets the pace of the shop. One wants an unhurried chair and a haircut done the way it has always been done; the other wants it finished before a three-year-old runs out of patience. Both happen inside the same half hour more often than you would think.

It shows in what gets asked for. Senior cuts, the regular men's cut, and kids' cuts are the three that fill the chairs here. A senior cut is the same haircut as the regular one, at a gentler pace and a lower rate. A kids' cut is built around a short attention span — the shape first, the fine detail second. Skin fades and beard work get asked for plenty too, but those three are the backbone of a Royal Oak day.

Of all the neighbourhoods we serve, Royal Oak is the one we are actually in. From Royal Oak Shopping Centre it is about four minutes by car — Elk Lake Drive onto Royal Oak Drive, then Chatterton Way into the Broadmead plaza. Parking is free in the lot right out front. The one thing worth knowing is that the roads around here are busiest in the afternoon, so a morning trip moves faster if the timing is yours to pick.

We are open every day: nine to seven Monday through Friday, nine to five Saturday and Sunday. Walk in whenever it suits you. If you would rather not sit and wait, phone first and we will tell you straight how many people are ahead of you.`,
  emphasizedServices: [
    {
      displayName: "Skin Fade",
      configName: "Skin Fade",
      description:
        "Blended by hand through the guards and finished with a foil shaver at the very base, so the skin section comes out clean with no step or line left anywhere in the gradient.",
    },
    {
      displayName: "Kids' Haircut",
      configName: "Kids",
      description:
        "Aged three and up. A nervous child can sit and watch first if they need to; once they settle we work quickly, and we take a break rather than push through a bad stretch.",
    },
    {
      displayName: "Regular Hair Cut",
      configName: "Regular Hair Cut",
      description:
        "A scissor or clipper cut built around your head shape rather than a set number. Your barber reads the growth pattern, takes weight out where it sits heavy, and finishes the neck clean.",
    },
  ],
  gettingHere: {
    from: "Royal Oak Shopping Centre",
    route: "West Saanich Rd → Elk Lake Dr → Royal Oak Dr → Chatterton Way",
    driveTime: "about 4 minutes",
    note: "Free parking in the lot right out front. Traffic around Royal Oak is busiest in the afternoon.",
  },
  relatedLinks: [
    {
      href: "/fade-haircut-royal-oak",
      label: "Fades in Royal Oak — taper, low, mid and high compared",
    },
    {
      href: "/senior-haircut-victoria",
      label: "What the senior rate covers, and when to come in for it",
    },
  ],
  landmark: SHOP.landmarkRoyalOak,
  callLocation: "royal_oak_page_cta",
  callLocationPrimary: "royal_oak_page_cta_primary",
  breadcrumbLabel: "Royal Oak Barber Shop",
  areaServedName: "Royal Oak, Victoria BC",
};

export const SAANICH_DATA: LandingPageData = {
  slug: "beard-trim-saanich",
  metaTitle: "Beard Trim in Saanich — $20, Walk In 7 Days | Royal Look",
  metaDescription:
    "Beard trim $20 in Saanich at Royal Look, inside Broadmead Village. Hot-towel straight-razor shave $35, cut and beard $48. Walk in 7 days, free parking.",
  eyebrow: "Saanich · Victoria, BC",
  h1: "Beard Trim in Saanich",
  h1Emphasis: "in Saanich.",
  intro: `A beard trim is mostly a decision about two lines. The cheek line sets how high the beard sits on the face; the neck line sets where it stops underneath. Length and bulk follow from those two, and getting them wrong is what makes a beard look untidy straight after a trim. Your barber agrees both with you before anything comes off.

The work then runs in that order. The shape is set by eye rather than to a guard number: a beard follows the jaw, and no two jaws are alike. The length is evened through next — clippers on a short beard, scissor-over-comb on a longer one, bulk taken out of the cheeks and the ends levelled. The edges are cut last, so the finish reads deliberate rather than just shorter.

The hot-towel straight-razor shave is a different service. A hot towel goes on first to soften the beard and relax the skin, lather is worked in with a brush, and the razor takes a first pass with the grain before being re-lathered and taken across it. The difference from a cartridge is mechanical: one sharp edge cutting the hair level with the skin in a single stroke, rather than three blades dragged twice over the same patch — so it finishes closer and pulls less. Every shave uses a fresh single-use blade.

Between visits, the two lines are the thing to leave alone; those are the ones people creep upward on at home, and once they are off it takes weeks to bring them back. Comb the beard daily so it lies the way it was cut, and take stray hairs off with scissors rather than clippers. Royal Look is in the Royal Oak neighbourhood of Saanich, inside Broadmead Village Shopping Centre, with free parking right out front. Beard work stands on its own or gets added to a haircut, and we take walk-ins every day of the week.`,
  emphasizedServices: [
    {
      displayName: "Beard Trim",
      configName: "Trim Beard",
      description:
        "Cheek line and neck line set by eye, then the length evened through with clippers or scissors depending on how long you wear it. The shape is agreed before anything comes off.",
    },
    {
      displayName: "Hot-Towel Straight-Razor Shave",
      configName: "Hot Shave",
      description:
        "Hot towel first to soften the beard, lather worked in with a brush, then a straight razor with a fresh single-use blade — with the grain, then across it for a closer finish.",
    },
    {
      displayName: "Regular Hair Cut",
      configName: "Regular Hair Cut",
      description:
        "The standard men's cut, and the one most often paired with beard work so the sideburn and the beard line are finished together rather than in two separate sittings.",
    },
  ],
  relatedLinks: [
    {
      href: "/hot-towel-shave-victoria",
      label: "Taking it all off instead: the hot-towel straight-razor shave",
    },
    {
      href: "/mens-haircut-victoria",
      label: "Pairing it with a haircut — the order, and the price",
    },
  ],
  landmark: SHOP.landmarks,
  callLocation: "saanich_beard_page_cta",
  callLocationPrimary: "saanich_beard_page_cta_primary",
  breadcrumbLabel: "Beard Trim in Saanich",
  areaServedName: "Saanich, Victoria BC",
};

export const GORDON_HEAD_DATA: LandingPageData = {
  slug: "gordon-head-barber-shop",
  // Title/h1/breadcrumb read as the out-of-area option on purpose — see CORDOVA_BAY_DATA below.
  metaTitle: "Gordon Head's Barber Option in Broadmead | Royal Look",
  metaDescription:
    "Royal Look is in Broadmead Village, 15 minutes from Gordon Head down McKenzie or on the 39 bus. Walk in 7 days: skin fade $30, buzz cut $20. Free parking.",
  eyebrow: "Gordon Head · Victoria, BC",
  h1: "Serving Gordon Head from Broadmead",
  h1Emphasis: "from Broadmead.",
  intro: `Thursday and Friday are the Gordon Head days at Royal Look. That is when the students come in — hair sorted before the weekend starts rather than after it, which is the sensible order and not the one most people manage. It is the most consistent pattern we see from any neighbourhood we serve, and it means the back half of the week is the busier one for anyone coming from the university side of Saanich. The shop is not in Gordon Head itself: we are over at Royal Oak, inside Broadmead Village Shopping Centre, so the trip is part of the plan.

Two things get asked for above everything else: the regular men's cut and the skin fade. The fade is the one that decides your week. It is sharpest in the first two weeks and softens as the skin section grows back in, so if you want it crisp for a Friday, come in on the Thursday rather than the week before. The regular cut holds its shape longer and asks less of you. A buzz cut, if that is genuinely all you need, is quicker than either.

Getting here without a car is straightforward from Gordon Head: the 39 runs across and stops near Broadmead Village. Be clear on the last stretch though, because the stop is not at our door — it is a couple of minutes on foot from the edge of the plaza, and about four from the shop itself. Budget that on top of the ride and you will not be caught out.

By car it is a straight run down McKenzie Avenue to Quadra, then Chatterton Way into the plaza — about fifteen minutes. We are open every day of the week, nine to seven Monday through Friday and nine to five on weekends, which leaves room around lectures, a shift, or the gap between the two. Walk in when it suits you, or call ahead and we will tell you what the wait looks like.`,
  emphasizedServices: [
    {
      displayName: "Skin Fade",
      configName: "Skin Fade",
      description:
        "The height is the decision that matters — low sits under the temple, mid at it, high carries the contrast well up the side. Your barber matches the top length to whichever you pick.",
    },
    {
      displayName: "Buzz Cut",
      configName: "Buzz Cut",
      description:
        "One guard straight over, no blending, and out of the chair faster than anything else we do. Not sure of the number? We start longer than you think you want and take it down.",
    },
    {
      displayName: "Regular Hair Cut",
      configName: "Regular Hair Cut",
      description:
        "For hair you want kept longer and looking natural — scissor work through the top, a soft taper at the sides, nothing blunt or over-shaped. It grows out without an awkward stage.",
    },
  ],
  gettingHere: {
    from: "UVic",
    route: "McKenzie Ave → Quadra St → Chatterton Way",
    driveTime: "about 15 minutes",
    transit:
      "The 39 runs from Gordon Head and stops near Broadmead Village — a short walk from the plaza. Check BC Transit for times at your end.",
  },
  relatedLinks: [
    {
      href: "/fade-haircut-royal-oak",
      label: "Which fade to ask for — taper, low, mid and high",
    },
  ],
  landmark: SHOP.landmarks,
  callLocation: "gordon_head_page_cta",
  callLocationPrimary: "gordon_head_page_cta_primary",
  breadcrumbLabel: "Gordon Head",
  areaServedName: "Gordon Head, Victoria BC",
};

export const CADBORO_BAY_DATA: LandingPageData = {
  slug: "cadboro-bay-barber-shop",
  // Out-of-area framing for the same reason as CORDOVA_BAY_DATA below (salons
  // on Cadboro Bay Rd and Sinclair Rd hold that map pack): the title, h1 and
  // breadcrumb read as the Broadmead option, not as a shop in Cadboro Bay.
  metaTitle: "Cadboro Bay's Barber Option in Broadmead | Royal Look",
  metaDescription:
    "Cadboro Bay families walk in to Royal Look in Broadmead Village — no appointment, 7 days a week. Kids' cuts $25, regular cut $28, beard trim $20.",
  eyebrow: "Cadboro Bay · Victoria, BC",
  h1: "Serving Cadboro Bay from Broadmead",
  h1Emphasis: "from Broadmead.",
  intro: `Here is a piece of local knowledge worth having: from Cadboro Bay, leaving later is faster. Google Maps puts the drive to Royal Look at about twenty-two minutes at five o'clock and about thirty at three. The road is identical either way — Sinclair Road onto McKenzie, McKenzie to Quadra, then Chatterton Way into the Broadmead plaza — so the whole difference is traffic, and it does not run the direction most people assume.

The clients who come to us from Cadboro Bay are a full cross-section: students, families, and retirees, spread through the week rather than bunched into one part of it. Students turn up at the weekend. Retirees come through the day, whenever suits them. Families arrive in the evenings, once work is finished. There is no single Cadboro Bay hour — they filter through, and the shop stays open either way.

The mix shows in the work. Senior cuts, the regular men's cut, kids' cuts, and skin fades are the four we do most for people coming from that end of town, with beard trims alongside. Whoever is in the chair, the method does not change: the shape agreed before anything comes off, the length cut to what you asked for rather than to what is quick, and the ears and neck finished properly at the end.

Whether you set out from Cadboro-Gyro Park or from the university end of the neighbourhood, it is the same road in. Parking is free in the lot right out front. We are open seven days a week, nine to seven on weekdays and nine to five on weekends, and walk-ins are welcome on all of them — call first if you want to know what the wait looks like.`,
  emphasizedServices: [
    {
      displayName: "Regular Hair Cut",
      configName: "Regular Hair Cut",
      description:
        "The same cut, the same way, every visit. We keep the proportions consistent from one visit to the next and only change the length when you ask us to change it.",
    },
    {
      displayName: "Kids' Haircut",
      configName: "Kids",
      description:
        "School trims, summer cuts, and everything between. Tell us the length you want and we hold to it — no surprise decisions get made while a child is sitting in the chair.",
    },
    {
      displayName: "Beard Trim",
      configName: "Trim Beard",
      description:
        "Maintenance rather than a redesign. We hold the shape you already wear, take off the stray growth, and clean up the edges so the whole thing looks deliberate again.",
    },
  ],
  gettingHere: {
    from: "Cadboro-Gyro Park",
    route: "Sinclair Rd → McKenzie Ave → Quadra St → Chatterton Way",
    driveTime: "about 22 minutes at 5pm, about 30 minutes at 3pm",
    note: "Free parking in the lot right out front. Per Google Maps, leaving later beats leaving mid-afternoon.",
  },
  relatedLinks: [
    {
      href: "/mens-haircut-victoria",
      label: "What a men's cut costs here, and what is included",
    },
  ],
  landmark: SHOP.landmarks,
  callLocation: "cadboro_bay_page_cta",
  callLocationPrimary: "cadboro_bay_page_cta_primary",
  breadcrumbLabel: "Cadboro Bay",
  areaServedName: "Cadboro Bay, Victoria BC",
};

export const OAK_BAY_DATA: LandingPageData = {
  slug: "oak-bay-barber-shop",
  // The title, h1 and breadcrumb deliberately do NOT read as a shop located in
  // Oak Bay. "Oak Bay Barber Shoppe" — formerly trading as exactly "Oak Bay
  // Barber Shop" — is a real, still-operating business in Estevan Village, so
  // this page has to read plainly as the out-of-area option rather than as the
  // local incumbent: "Serving Oak Bay from Broadmead", not the "<Area> Barber
  // Shop" pattern the other area pages use. Same reasoning as CORDOVA_BAY_DATA.
  // NOTE: "4.9 stars" is now a literal in CORDOVA_BAY_DATA.metaDescription only
  // — update it there if the Google rating moves.
  metaTitle: "Oak Bay's Barber Option in Broadmead | Royal Look",
  metaDescription:
    "Royal Look is in Broadmead Village — from Oak Bay take the 14 then the 70, or drive. Walk in 7 days, no appointment. Call (778) 430-0040 for the wait.",
  eyebrow: "Oak Bay · Victoria, BC",
  h1: "Serving Oak Bay from Broadmead",
  h1Emphasis: "from Broadmead.",
  intro: `Oak Bay is a real drive out to Royal Look in Broadmead, and we would rather say so than pretend otherwise. Bay Street to Cook, Cook to Quadra, then Chatterton Way into the plaza. On clear roads it moves; in rush hour the same trip can stretch to thirty minutes. Royal Jubilee Hospital is the landmark most Oak Bay clients set off from, and the run is straightforward from there once you are past the worst of the traffic.

On the bus it is two legs rather than one: the 14 out of Oak Bay, then a transfer to the 70, which stops near Broadmead Village. The 14 by itself does not come this far, so check the connection before you set out.

The Oak Bay clients who make the trip sort themselves into three groups, each keeping its own hours. Students come at the weekend. Families and office workers come in the evenings, once work is done. Given the distance, a phone call before you set out is the single most useful thing you can do — thirty minutes is a long way to travel to sit and wait.

Two services account for most of it. The regular men's cut is traditional barbering: scissor work through the sides, a graduated taper, a neckline finished the way you have always worn it. The skin fade is the sharper end of the same skill, blended by hand down to bare skin and shaped to your hairline rather than to a template. If you want the easier version of the regular cut, a senior cut is the same haircut at a gentler pace and a reduced rate.

We are open every day of the week, nine to seven Monday through Friday and nine to five on weekends, and no appointment is needed. Ask for Zaki or Aymen by name if you have a preference — call ahead and we will tell you who is working and roughly when they are free.`,
  emphasizedServices: [
    {
      displayName: "Regular Hair Cut",
      configName: "Regular Hair Cut",
      description:
        "Traditional barbering — scissor-over-comb through the sides, a graduated taper at the back, and a neckline squared off or rounded to whatever shape you have always worn.",
    },
    {
      displayName: "Skin Fade",
      configName: "Skin Fade",
      description:
        "A quieter version of the fade if you want one: kept low and close to the ear, so it reads sharp up close but stays conservative from across a room.",
    },
    {
      displayName: "Senior Cut",
      configName: "Senior",
      description:
        "An unhurried cut at a pace that suits — less time held in one position, careful work through finer or thinning hair, and the ears and neck tidied properly at the end.",
    },
  ],
  gettingHere: {
    from: "Royal Jubilee Hospital",
    route: "Bay St → Cook St → Quadra St → Chatterton Way",
    driveTime: "up to 30 minutes in rush hour",
    transit:
      "By bus it is two legs: the 14 out of Oak Bay, then a transfer to the 70, which stops near Broadmead Village. The 14 on its own does not come this far — check BC Transit for the connection.",
    note: "Free parking in the lot right out front.",
  },
  relatedLinks: [
    {
      href: "/senior-haircut-victoria",
      label: "More on the senior cut and the quietest time to have one",
    },
    {
      href: "/mens-haircut-victoria",
      label: "The regular men's cut, and what the price covers",
    },
  ],
  landmark: SHOP.landmarks,
  callLocation: "oak_bay_page_cta",
  callLocationPrimary: "oak_bay_page_cta_primary",
  breadcrumbLabel: "Oak Bay",
  areaServedName: "Oak Bay, Victoria BC",
};

export const CORDOVA_BAY_DATA: LandingPageData = {
  slug: "cordova-bay-barber-shop",
  // The title, h1 and breadcrumb deliberately do NOT read as a shop located in
  // Cordova Bay. "Cordova Hair and Barbershop" is a real business at Mattick's
  // Farm, and we are ~4km away, so we can never enter the Cordova Bay map pack.
  // This page ranks organic #2–4 under that pack; the click has to be won by
  // being plainly the out-of-area option, not by reading like the local
  // incumbent — hence "Serving Cordova Bay from Broadmead" rather than the
  // "<Area> Barber Shop" pattern the other area pages use.
  metaTitle: "Cordova Bay's Barber Option in Broadmead | Royal Look",
  metaDescription:
    "Royal Look is 10 minutes from Cordova Bay, in Broadmead Village — the 32 stops out front. Walk in 7 days, no appointment, free parking. 4.9 stars.",
  eyebrow: "Cordova Bay · Victoria, BC",
  h1: "Serving Cordova Bay from Broadmead",
  h1Emphasis: "from Broadmead.",
  intro: `The Cordova Bay half of Royal Look's week arrives in two waves. Seniors come through the morning, when the shop is quiet and there is time to talk. Families come after work on weekdays and at any hour over the weekend, usually with at least one child who would rather be somewhere else. Two very different visits, and the shop runs at two different speeds because of it.

The service list follows the same split. Senior cuts and the regular men's cut, kids' cuts, and the hot-towel straight-razor shave are what Cordova Bay asks for most. The shave is the outlier there and the one worth planning around — it runs slower than any haircut on the menu, so it sits better in a morning than squeezed into the end of a working day. Beard trims and skin fades cover most of the rest.

If you would rather not drive, the 32 is the easy answer: about eleven minutes, and it stops right in front of Broadmead plaza rather than a walk away. Driving, it is roughly ten minutes from Cordova Bay Beach — Cordova Bay Road onto Royal Oak Drive, then Chatterton Way into the plaza, with free parking in the lot out front.

We are open seven days, nine to seven on weekdays and nine to five on weekends, and we take walk-ins on all of them. If you want the quiet end of the day rather than the busy one, give us a call before you set out and we will tell you honestly how it looks.`,
  emphasizedServices: [
    {
      displayName: "Regular Hair Cut",
      configName: "Regular Hair Cut",
      description:
        "The bulk comes down gradually rather than in one pass, so nothing is left sitting in a hard line. Four to six weeks is the usual stretch before it wants doing again.",
    },
    {
      displayName: "Beard Trim",
      configName: "Trim Beard",
      description:
        "On a longer beard most of the work is scissor-over-comb: bulk taken out of the cheeks, the ends evened up, and the neck line dropped to sit where the jaw meets the throat.",
    },
    {
      displayName: "Skin Fade",
      configName: "Skin Fade",
      description:
        "Sharpest in the first couple of weeks, then the skin section fills back in and the contrast softens. Two to three weeks is the interval that keeps it looking freshly cut.",
    },
  ],
  gettingHere: {
    from: "Cordova Bay Beach",
    route: "Cordova Bay Rd → Royal Oak Dr → Chatterton Way",
    driveTime: "about 10 minutes",
    transit: "Bus 32 stops right in front of Broadmead plaza — about 11 minutes.",
    note: "Free parking in the lot right out front.",
  },
  relatedLinks: [
    {
      href: "/senior-haircut-victoria",
      label: "The senior rate, and why mornings suit it best",
    },
  ],
  landmark: SHOP.landmarks,
  callLocation: "cordova_bay_page_cta",
  callLocationPrimary: "cordova_bay_page_cta_primary",
  breadcrumbLabel: "Cordova Bay",
  areaServedName: "Cordova Bay, Victoria BC",
};

// ============================================================
// SERVICE PAGES
// ============================================================

export const SKIN_FADE_DATA: LandingPageData = {
  slug: "skin-fade-victoria",
  metaTitle: "Skin Fade in Victoria BC | Royal Look Barber Shop",
  metaDescription:
    "Skin fades at Royal Look Barber Shop in Victoria, BC — low, mid, or high, blended by hand down to the skin inside Broadmead Village. Walk in seven days a week.",
  eyebrow: "Victoria · Skin Fade",
  h1: "Skin Fade in Victoria",
  h1Emphasis: "in Victoria.",
  intro: `A skin fade is a haircut that runs out to nothing. The hair at the bottom of the sides and back is taken right down to bare skin, then blended upward through progressively longer guards until it meets whatever length you keep on top. Done properly there is no visible step anywhere in that gradient — just a change you cannot put a finger on.

Getting there takes time. Your barber maps the hairline first, settles with you on where the fade should sit — low around the ear, mid at the temple, or high above it — then works up through the guards in stages, checking the blend from both sides and under the lights before touching the top. The very base is finished with a foil shaver, which is what actually leaves skin rather than close-to-skin. Expect the better part of an hour in the chair.

Skin fades suit most hair types, but the top is where the real decision gets made. Thick hair holds a hard weight line and a squared-off shape well; finer or curlier hair usually sits better with some texture cut through it. If you are not certain what you want, bring a photo — a barber reads more from an image than from a description.

A fade is at its sharpest in the first two weeks and softens as the skin section grows back in, which is why it wants revisiting every two to three weeks. Royal Look is inside Broadmead Village Shopping Centre at Royal Oak, with free parking in the lot right out front. Walk in any day of the week, or call ahead and we will tell you straight how busy we are.`,
  emphasizedServices: [
    {
      displayName: "Skin Fade",
      configName: "Skin Fade",
      description:
        "Hairline mapped first, guards worked up in stages, the weight line set where you want it, then the top cut to match. Nothing is signed off until the gradient reads even in every light.",
    },
    {
      displayName: "Beard Trim",
      configName: "Trim Beard",
      description:
        "Ask for it alongside the fade and your barber carries the sideburn straight down into the beard, so there is no hard break where the haircut stops and the beard starts.",
    },
    {
      displayName: "Regular Hair Cut",
      configName: "Regular Hair Cut",
      description:
        "If you would rather not go down to bare skin, ask for this instead — the same shaping and blending, stopped at a guard length so the sides keep a little coverage.",
    },
  ],
  relatedLinks: [
    {
      href: "/fade-haircut-royal-oak",
      label: "Not sure you want bare skin? Taper, low, mid and high compared",
    },
  ],
  landmark: SHOP.landmarks,
  callLocation: "skin_fade_page_cta",
  callLocationPrimary: "skin_fade_page_cta_primary",
  breadcrumbLabel: "Skin Fade in Victoria",
  areaServedName: "Victoria, BC",
};

export const KIDS_CUT_DATA: LandingPageData = {
  slug: "kids-haircut-victoria",
  metaTitle: "Kids' Haircuts in Victoria BC | Royal Look Barber Shop",
  metaDescription:
    "Kids' haircuts from age three at Royal Look Barber Shop in Victoria, BC. Patient barbers, fades and school trims, inside Broadmead Village. Walk in any day.",
  eyebrow: "Victoria · Kids' Haircuts",
  h1: "Kids' Haircuts in Victoria",
  h1Emphasis: "in Victoria.",
  intro: `We cut children's hair from age three up, and the haircut itself is rarely the hard part. What makes a kids' cut different is everything around it — how long a child can sit still, whether the sound of the clippers frightens them, and whether the barber notices the moment it is time to stop fussing over detail and finish.

Our barbers keep it unhurried but efficient. A nervous child can watch someone else go first, or hold the clippers switched off for a minute before they come anywhere near their head. Once they settle we move quickly: the shape gets cut first and the fine detail second, and we take a break when one is needed rather than push through a bad stretch. Most cuts are done inside half an hour.

Parents are welcome right beside the chair, and we would far rather you told us exactly what you want than left it to interpretation — length on top, how short around the ears, whether the fringe stays. Kids often come in asking for a fade or a lineup they have seen at school, and we will do that properly rather than talk them out of it. First haircuts are welcome too.

Royal Look is inside Broadmead Village Shopping Centre at Royal Oak, with free parking in the lot right out front, so a haircut fits into a trip you were making anyway. We are open every day of the week and take walk-ins. If you would rather come in when it is quiet, call first and we will tell you honestly what the wait looks like.`,
  emphasizedServices: [
    {
      displayName: "Kids' Haircut",
      configName: "Kids",
      description:
        "Built around a short attention span — the shape comes first and the fine detail second. We would rather a child left happy than sat still for an extra ten minutes.",
    },
    {
      displayName: "Skin Fade",
      configName: "Skin Fade",
      description:
        "Plenty of kids ask for one and we will cut it properly, though we run the clippers slower and talk through each step so nobody is caught out by the noise or the feel of it.",
    },
    {
      displayName: "Buzz Cut",
      configName: "Buzz Cut",
      description:
        "The easy option for an active kid or the start of summer. One length all over, a quick tidy at the neck, and back out of the chair within a few minutes.",
    },
  ],
  relatedLinks: [
    {
      href: "/fade-haircut-royal-oak",
      label: "The fade they are asking for, explained",
    },
  ],
  landmark: SHOP.landmarks,
  callLocation: "kids_cut_page_cta",
  callLocationPrimary: "kids_cut_page_cta_primary",
  breadcrumbLabel: "Kids' Haircuts in Victoria",
  areaServedName: "Victoria, BC",
};

export const HOT_SHAVE_DATA: LandingPageData = {
  slug: "hot-towel-shave-victoria",
  metaTitle: "Hot Towel Shave in Victoria BC | Royal Look Barber Shop",
  metaDescription:
    "Hot towel straight-razor shave at Royal Look Barber Shop in Victoria, BC. Fresh single-use blade every time, inside Broadmead Village. Walk in 7 days a week.",
  eyebrow: "Victoria · Hot Towel Shave",
  h1: "Hot Towel Shave in Victoria",
  h1Emphasis: "in Victoria.",
  intro: `The hot towel shave is the one service on our menu that has not changed in a hundred years, and there is a reason for that. A straight razor takes the hair off at the surface of the skin in a single stroke — closer than any cartridge manages, and without the dragging that comes of pulling three blades across the same patch twice over.

The sequence matters as much as the blade. A hot towel goes on first to soften the beard and open the pores, lather is worked in with a brush, and the first pass runs with the grain. Then it is re-lathered and taken across the grain wherever the skin will take it. A cool towel closes everything down at the end and balm settles the face. The whole thing runs thirty to forty minutes, and it is not a service worth rushing.

Every shave uses a fresh single-use blade, no exceptions. If your skin is prone to irritation or you get ingrown hairs, say so before your barber starts and he will keep to one pass with the grain rather than chase the closest possible finish. A traditional shave is hard on skin done carelessly and very easy on it done well.

It is the service people tend to want before something that matters — a wedding, an interview, a photograph — though there is nothing stopping you making it a standing part of the month. You will find us in the Broadmead Village plaza on Royal Oak Drive, immediately left of Starbucks, with parking free in the lot outside. We are open seven days a week and take walk-ins; call ahead if you want to check the wait.`,
  emphasizedServices: [
    {
      displayName: "Hot Towel Shave",
      configName: "Hot Shave",
      description:
        "Towel, lather, razor, then a cool towel to close at the end. It runs slower than anything else on the menu, and the sit-down is as much the point of it as the finish.",
    },
    {
      displayName: "Beard Trim",
      configName: "Trim Beard",
      description:
        "The option if you want to keep the beard but lose the shagginess — the same razor work along the cheeks and neck, with the beard itself shaped rather than taken off.",
    },
    {
      displayName: "Regular Hair Cut",
      configName: "Regular Hair Cut",
      description:
        "Worth adding while you are already in the chair. The cut goes first and the shave after, so the neckline and the jaw get finished together in one clean pass.",
    },
  ],
  relatedLinks: [
    {
      href: "/beard-trim-saanich",
      label: "Keeping the beard instead: how a beard trim is shaped",
    },
  ],
  landmark: SHOP.landmarks,
  callLocation: "hot_shave_page_cta",
  callLocationPrimary: "hot_shave_page_cta_primary",
  breadcrumbLabel: "Hot Towel Shave in Victoria",
  areaServedName: "Victoria, BC",
};

// ── The three pages below close the commercial-intent gap in the Jul 2026 SEO
// report (§4): six bare service terms held average position ~1.1 across 193
// impressions and returned zero clicks, while the geo-modified versions of the
// same terms did not rank at all. `skin fade` and `beard trim` already had
// pages; `fade haircut` (38 impressions), `barber haircut` (35) and `men's
// haircut` (9) had none, and the senior cut had no page despite being one of
// the three services that fill the chairs here.
//
// Each one is pinned to a place in its title and h1, because that is the half
// of the query that currently ranks nowhere. `fade haircut` takes Royal Oak
// rather than Victoria: the shop is already #1 in the Local Pack for `royal oak
// barber`, so the neighbourhood is the stronger modifier of the two.

export const FADE_HAIRCUT_DATA: LandingPageData = {
  slug: "fade-haircut-royal-oak",
  metaTitle:
    "Fade Haircut in Royal Oak — Taper, Low, Mid & High | Royal Look Victoria BC",
  metaDescription:
    "Fade haircuts in Royal Oak from $28. Taper, low, mid and high fades blended by hand inside Broadmead Village. No appointment — walk in seven days a week.",
  eyebrow: "Royal Oak · Fade Haircut",
  h1: "Fade Haircut in Royal Oak",
  h1Emphasis: "in Royal Oak.",
  intro: `“Fade” covers a range rather than one haircut, and most of the confusion at the counter comes from that. At one end is a taper: the hair gets shorter as it goes down but never leaves the guard, so the bottom keeps some coverage. At the other is a skin fade, taken right out to bare scalp. Everything people mean by “a fade” sits somewhere on that line, and picking your spot on it is the whole conversation.

The second decision is height — where on the head the shortest part sits. A low fade stays down around the ear and the nape, which reads tidy without announcing itself. A mid fade comes up to the temple. A high fade carries the contrast well up the side and makes the top look considerably heavier by comparison. Height changes the shape of a face more than length does, which is why your barber will look at your head rather than at a name for it.

What you keep on top is the part people leave to chance, and it is the part that decides whether the fade looks right in a month. A short crop over a high fade is a haircut with almost no maintenance and a short life — it wants doing every fortnight. Length left on top over a low taper will still look deliberate at six weeks. Neither is the better answer; they are different amounts of coming back, and it is worth saying out loud which one you actually want before the clippers start.

Royal Oak is the neighbourhood we are in rather than one we drive to, so this is the short trip. We are inside Broadmead Village Shopping Centre, a walk from the Royal Oak Transit Exchange, with free parking out front. Ask for Zaki if you want line work or a design cut into the fade — twelve years in and it is the thing regulars come to him for. No appointments, seven days a week; ring ahead if you would rather know the wait before you set off.`,
  emphasizedServices: [
    {
      displayName: "Skin Fade",
      configName: "Skin Fade",
      description:
        "The far end of the range — the bottom taken out to bare scalp and blended up with no step left in it. The sharpest version, and the one with the shortest shelf life at two to three weeks.",
    },
    {
      displayName: "Regular Hair Cut",
      configName: "Regular Hair Cut",
      description:
        "Where a tapered fade lives. The sides come down gradually but stop at a guard rather than the skin, so the finish is softer up close and holds its shape four to six weeks.",
    },
    {
      displayName: "Buzz Cut",
      configName: "Buzz Cut",
      description:
        "No blend at all — one guard from front to back, then the neck and ears cleaned up. Worth knowing about, because plenty of people ask for a fade when this is what they actually want.",
    },
  ],
  relatedLinks: [
    {
      href: "/skin-fade-victoria",
      label: "Going all the way to the skin: how a skin fade is cut",
    },
    {
      href: "/royal-oak-barber-shop",
      label: "Everything else we do for Royal Oak",
    },
  ],
  landmark: SHOP.landmarkRoyalOak,
  callLocation: "fade_haircut_page_cta",
  callLocationPrimary: "fade_haircut_page_cta_primary",
  breadcrumbLabel: "Fade Haircut in Royal Oak",
  areaServedName: "Royal Oak, Victoria BC",
};

export const MENS_HAIRCUT_DATA: LandingPageData = {
  slug: "mens-haircut-victoria",
  metaTitle:
    "Men's Haircut in Victoria BC — $28, Walk In 7 Days | Royal Look Barber Shop",
  metaDescription:
    "Men's haircuts in Victoria, BC for $28 at Royal Look in Broadmead Village. One price, no tiers, no appointment. Open seven days — walk in and take the next chair.",
  eyebrow: "Victoria · Men's Haircut",
  h1: "Men's Haircut in Victoria",
  h1Emphasis: "in Victoria.",
  intro: `A men's haircut here is ${resolveService("Regular Hair Cut")?.price ?? "$28"} and takes ${resolveService("Regular Hair Cut")?.duration ?? "30–45 min"}. That is the whole price. There are no tiers, no surcharge for hair that is thick or long or further past its last cut than you would care to admit, and it costs the same whichever of the two chairs you end up in. We would rather publish the number than make you ask for it.

Two things are in that price that people expect to be extras. The first is a conversation before any clippers come out — what you want, how it should sit, and how much time you are willing to give it in the mornings, which changes the cut more than a photograph does. The second is the finish: clean around the ears and down the neck at the end. Neither is an add-on and neither gets rushed when the shop is busy.

The cut itself is clipper, scissor, or both, and which one depends on your hair rather than on a house style. Thick hair holds a hard weight line and a squared-off shape; finer or curlier hair usually sits better with some texture cut through it so it does not read flat. If you want the sides shorter without going out to bare skin, that is a taper, and it is this haircut — the skin fade is a separate line on the menu because it takes longer, not because it is a better cut.

Ask for a barber by name if you have a preference. Zaki has twelve years behind him and leans modern — fades, sharper shapes, line work. Aymen has ten, came to us from Montreal, and leans traditional: scissor work, classic shapes, and beards. There is no booking system and no app. Walk in, take the next free chair, and pay with cash, debit, Visa, Mastercard or Apple Pay. We are on Royal Oak Drive inside Broadmead Village, open nine to seven on weekdays and nine to five at weekends.`,
  emphasizedServices: [
    {
      displayName: "Regular Hair Cut",
      configName: "Regular Hair Cut",
      description:
        "The standard men's cut and the one most people are here for. Cut to your head shape rather than to a number, with the weight taken out wherever it sits heavy.",
    },
    {
      displayName: "Skin Fade",
      configName: "Skin Fade",
      description:
        "The same haircut with the sides carried out to bare skin instead of stopping at a guard. It is the longer service on the menu because a blend cannot be hurried.",
    },
    {
      displayName: "Beard Trim",
      configName: "Trim Beard",
      description:
        `Added to the cut it comes to ${SERVICE_COMBO.price} for the pair — the sum of the two, not a discount. The haircut goes first so the sideburn carries down into the beard without a break.`,
    },
  ],
  relatedLinks: [
    {
      href: "/services",
      label: "The full price list, and what each service includes",
    },
    {
      href: "/senior-haircut-victoria",
      label: "The same cut at the senior rate",
    },
  ],
  landmark: SHOP.landmarks,
  callLocation: "mens_haircut_page_cta",
  callLocationPrimary: "mens_haircut_page_cta_primary",
  breadcrumbLabel: "Men's Haircut in Victoria",
  areaServedName: "Victoria, BC",
};

export const SENIOR_HAIRCUT_DATA: LandingPageData = {
  slug: "senior-haircut-victoria",
  metaTitle:
    "Senior Haircut in Victoria BC — $25, No Appointment | Royal Look Barber Shop",
  metaDescription:
    "Senior haircuts in Victoria, BC for $25 at Royal Look in Broadmead Village. The same cut, an unhurried pace, no card to carry. Walk in seven days a week.",
  eyebrow: "Victoria · Senior Haircut",
  h1: "Senior Haircuts in Victoria",
  h1Emphasis: "in Victoria.",
  intro: `A senior cut is ${resolveService("Senior")?.price ?? "$25"} and takes ${resolveService("Senior")?.duration ?? "30–45 min"}. It is not a shorter or simpler version of the regular haircut — it is the same cut, the same shape, and the same clean finish around the ears and the neck, at a reduced rate and at a pace that is not in a hurry. Nothing is left out to justify the lower number.

There is no card to carry and nothing to prove. Mention it when you sit down and that is the rate. We do not ask for identification, we do not run a scheme you have to sign up to, and nobody is going to make a thing of it in front of a full shop.

The pace is the part that actually matters, and it is why the timing is worth knowing. Most of our senior clients come in first thing on a weekday: we open at nine, the shop is quiet, there is usually a chair free straight away, and nothing about the half hour feels rushed. Afternoons are the busy stretch — on the roads around Royal Oak as much as in here — so if you would rather not sit and wait, the morning is the answer. Weekends are steady all day and we close at five rather than seven.

Finer and thinning hair asks for different handling than the sales pitch suggests, and both barbers are used to it. Taking the sides down a little tighter makes the top read fuller by contrast, and a softer front line draws less attention to a receding hairline than a hard straight one. Tell your barber what is bothering you and it will be cut to play that down. We are inside Broadmead Village Shopping Centre on Royal Oak Drive, just left of Starbucks, with free parking directly outside — and if you would like to know the wait before you leave the house, phone and we will tell you honestly.`,
  emphasizedServices: [
    {
      displayName: "Senior Cut",
      configName: "Senior",
      description:
        "The regular haircut at a reduced rate and an unhurried pace — less time held in one position, and careful work through hair that has gone finer than it used to be.",
    },
    {
      displayName: "Regular Hair Cut",
      configName: "Regular Hair Cut",
      description:
        "The same service without the reduced rate, listed here so you can see there is no difference in the cut itself — only in what it costs and how quickly it is done.",
    },
    {
      displayName: "Hair Wash",
      configName: "Hair Wash",
      description:
        "Ask at the chair if you want one. Some have it first because clean, damp hair is easier to read; others have it at the end to get the clippings off before heading home.",
    },
  ],
  relatedLinks: [
    {
      href: "/mens-haircut-victoria",
      label: "The regular men's cut, and what the price covers",
    },
    {
      href: "/royal-oak-barber-shop",
      label: "Getting here from Royal Oak and Broadmead",
    },
  ],
  landmark: SHOP.landmarks,
  callLocation: "senior_haircut_page_cta",
  callLocationPrimary: "senior_haircut_page_cta_primary",
  breadcrumbLabel: "Senior Haircuts in Victoria",
  areaServedName: "Victoria, BC",
};
