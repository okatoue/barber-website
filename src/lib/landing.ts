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

export const ROYAL_OAK_DATA: LandingPageData = {
  slug: "royal-oak-barber-shop",
  metaTitle:
    "Royal Oak Barber Shop — Skin Fades & Kids' Cuts | Royal Look Victoria BC",
  metaDescription:
    "Royal Oak barber shop inside Broadmead Village, steps from the transit exchange. Expert skin fades, kids' cuts, and classic cuts. Walk in seven days a week.",
  eyebrow: "Royal Oak · Victoria, BC",
  h1: "Royal Oak Barber Shop",
  h1Emphasis: "Barber Shop.",
  intro: `Royal Oak Barber Shop at Broadmead Village is the neighbourhood spot for men and kids who want a clean, precise cut without travelling far. Whether you step off a bus at the Royal Oak Transit Exchange on Royal Oak Drive or drive in from a side street, the shop is easy to reach — with free parking in the lot right out front.

Skin fades are a cornerstone of what we do here. Our barbers blend hair down to the skin with careful, unhurried technique, shaping each fade to suit your face and the look you have in mind. Whether it's a mid-fade, a high-and-tight, or something more tapered, every finish is a clean one.

Kids' cuts are handled with the same focus. We see children aged three and up, and our barbers are patient and straightforward, which helps younger clients settle in quickly. There's no rush, and first-timers are always welcome.

Royal Look sits inside Broadmead Village Shopping Centre, steps from the transit exchange and surrounded by everyday amenities. There's no need to make a separate trip — a fresh cut fits easily into an errand run. The shop is open every day of the week, nine to seven Monday through Friday and nine to five on weekends. Give us a call to check availability, or simply come in.`,
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
    "Beard trim in Saanich at Royal Look, inside Broadmead Village. Hot-towel straight-razor shaves, beard shaping, and classic cuts. Walk in seven days a week.",
  eyebrow: "Saanich · Victoria, BC",
  h1: "Beard Trim in Saanich",
  h1Emphasis: "in Saanich.",
  intro: `A proper Beard Trim in Saanich is easier to find than most people expect. Royal Look Barber Shop is right inside Broadmead Village Shopping Centre in the Royal Oak neighbourhood — the same Village that draws Saanich residents for groceries, pharmacy runs, and coffee. Fitting in a beard appointment on the same trip is straightforward: free parking is right out front.

Our beard trim is a focused service. Your barber checks your beard line, discusses the shape you want, then scissors and shaves the edges clean with a steady hand. We do not rush through grooming. If the line needs more definition or you want more bulk removed, we adjust on the spot.

For clients who want to go further, our hot-towel straight-razor shave is one of the most-requested services at the shop. The hot towel softens the skin and opens the pores, the straight razor delivers a closer finish than any cartridge blade, and the combination leaves your face smooth and settled. It takes thirty to forty minutes and the results speak for themselves.

Both services can be combined with a haircut or booked on their own. Royal Look is open every day of the week, with weekday hours running nine to seven. Come in when it suits you, or call ahead to check how busy we are — we will give you a straight answer.`,
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
  landmark: SHOP.landmarks,
  callLocation: "saanich_beard_page_cta",
  callLocationPrimary: "saanich_beard_page_cta_primary",
  breadcrumbLabel: "Beard Trim in Saanich",
  areaServedName: "Saanich, Victoria BC",
};

export const GORDON_HEAD_DATA: LandingPageData = {
  slug: "gordon-head-barber-shop",
  metaTitle:
    "Gordon Head Barber Shop — Skin Fades & Student Cuts | Royal Look Victoria BC",
  metaDescription:
    "Barber shop for Gordon Head and the UVic area at Royal Look in Broadmead Village. Sharp skin fades, buzz cuts, and classic cuts. Walk in seven days a week.",
  eyebrow: "Gordon Head · Victoria, BC",
  h1: "Gordon Head Barber Shop",
  h1Emphasis: "Barber Shop.",
  intro: `For Gordon Head residents and University of Victoria students, Royal Look is a short drive across Saanich — out to Broadmead Village near the Royal Oak interchange, with free parking in the lot right out front. Swing by on the way to or from campus; no appointment needed.

Skin fades are what most students come in for, and our barbers take the time to get them right — blended clean down to the skin, shaped to suit your hairline and the length you want left on top. Mid-fade, high-and-tight, or a softer taper, every finish is a sharp one.

When you just need to look tidy before class or a shift, a buzz cut is quick, even, and easy to maintain — in and out without the wait. We also handle classic scissor cuts for anyone who wants something more grown-out and natural.

Royal Look is open every day of the week, nine to seven Monday through Friday and nine to five on weekends, so a cut fits easily around lectures, work, or the weekend. Give us a call to check how busy we are, or simply walk in.`,
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
  landmark: SHOP.landmarks,
  callLocation: "gordon_head_page_cta",
  callLocationPrimary: "gordon_head_page_cta_primary",
  breadcrumbLabel: "Gordon Head Barber Shop",
  areaServedName: "Gordon Head, Victoria BC",
};

export const CADBORO_BAY_DATA: LandingPageData = {
  slug: "cadboro-bay-barber-shop",
  metaTitle:
    "Cadboro Bay Barber Shop — Family Cuts & Beard Trims | Royal Look Victoria BC",
  metaDescription:
    "Barber shop for Cadboro Bay families at Royal Look in Broadmead Village. Classic cuts, kids' haircuts, and beard trims. Walk in seven days a week.",
  eyebrow: "Cadboro Bay · Victoria, BC",
  h1: "Cadboro Bay Barber Shop",
  h1Emphasis: "Barber Shop.",
  intro: `Royal Look is a short drive from Cadboro Bay Village, out past the university end of Cadboro Bay Road to Broadmead Village Shopping Centre at Royal Oak. It's an easy trip whether you're coming from the beach at Gyro Park or just passing through on the way somewhere else — with free parking in the lot right out front.

Most of what we do here is the dependable, well-proportioned men's cut — scissor or clipper, finished clean around the ears and neck, at a pace that isn't rushed. It's the kind of haircut a family can rely on visit after visit, without surprises.

We also see plenty of kids from Cadboro Bay and the surrounding streets, from first haircuts through to regular school trims. Our barbers are patient with younger clients, so there's no stress for parents or kids in the chair.

For dads and older brothers, our beard trim keeps things tidy without changing the shape you already like — a quick check of the line, then a clean edge-up by hand. Royal Look is open seven days a week, nine to seven on weekdays and nine to five on weekends. Walk in whenever suits you, or call ahead and we'll tell you straight how busy it is.`,
  emphasizedServices: [
    {
      displayName: "Regular Hair Cut",
      configName: "Regular Hair Cut",
      description:
        "The same cut, the same way, every visit. We keep the proportions consistent from one appointment to the next and only change the length when you ask us to change it.",
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
  landmark: SHOP.landmarks,
  callLocation: "cadboro_bay_page_cta",
  callLocationPrimary: "cadboro_bay_page_cta_primary",
  breadcrumbLabel: "Cadboro Bay Barber Shop",
  areaServedName: "Cadboro Bay, Victoria BC",
};

export const OAK_BAY_DATA: LandingPageData = {
  slug: "oak-bay-barber-shop",
  metaTitle: "Oak Bay Barber Shop — Classic Cuts & Skin Fades | Royal Look Victoria BC",
  metaDescription:
    "Barber shop for Oak Bay at Royal Look in Broadmead Village. Classic gentleman's cuts, clean skin fades, and senior cuts. Walk in seven days a week.",
  eyebrow: "Oak Bay · Victoria, BC",
  h1: "Oak Bay Barber Shop",
  h1Emphasis: "Barber Shop.",
  intro: `Oak Bay Village and the Avenue are a short drive from Broadmead Village Shopping Centre, where Royal Look sits at Royal Oak — free parking right out front, so a stop on the way past Willows Beach or the Uplands costs you nothing but a few minutes.

Oak Bay has always had a taste for a properly done classic cut, and that's exactly what we specialize in — scissor work and a clean taper, finished the old-fashioned way with no shortcuts taken.

For anyone after something sharper, our skin fades are blended by hand down to the skin, shaped to suit your hairline rather than a one-size template. Low, mid, or high, every fade leaves clean.

We also see a good number of long-time Oak Bay residents in for our senior cut — an easier, more comfortable haircut at a gentler pace. Royal Look is open every day of the week, nine to seven Monday through Friday and nine to five on weekends. Call ahead to check the wait, or just walk in.`,
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
  landmark: SHOP.landmarks,
  callLocation: "oak_bay_page_cta",
  callLocationPrimary: "oak_bay_page_cta_primary",
  breadcrumbLabel: "Oak Bay Barber Shop",
  areaServedName: "Oak Bay, Victoria BC",
};

export const CORDOVA_BAY_DATA: LandingPageData = {
  slug: "cordova-bay-barber-shop",
  metaTitle:
    "Cordova Bay Barber Shop — Classic Cuts & Beard Trims | Royal Look Victoria BC",
  metaDescription:
    "Barber shop for Cordova Bay at Royal Look in Broadmead Village. Classic men's cuts, beard trims, and clean skin fades. Walk in seven days a week.",
  eyebrow: "Cordova Bay · Victoria, BC",
  h1: "Cordova Bay Barber Shop",
  h1Emphasis: "Barber Shop.",
  intro: `Royal Look is the closest proper barber shop to Cordova Bay — just a few minutes inland from Cordova Bay Road, inside Broadmead Village Shopping Centre at Royal Oak. There's free parking right out front, so a fresh cut slots easily into a grocery run or a trip past Mattick's Farm.

Our bread and butter is the classic men's cut: a clean, well-proportioned scissor or clipper cut, finished tidy around the ears and neck, done at an unhurried pace. It's the kind of dependable haircut a neighbourhood relies on, week in and week out.

We also do careful beard work — checking your line, talking through the shape you want, then trimming and edging it clean by hand. And if you'd rather a more modern finish, our barbers cut sharp skin fades to whatever length suits you.

Royal Look is open seven days a week, nine to seven on weekdays and nine to five on weekends. Walk in whenever it suits you, or call ahead and we'll give you a straight answer on the wait.`,
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
  landmark: SHOP.landmarks,
  callLocation: "cordova_bay_page_cta",
  callLocationPrimary: "cordova_bay_page_cta_primary",
  breadcrumbLabel: "Cordova Bay Barber Shop",
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
    "Hot towel straight-razor shave at Royal Look Barber Shop in Victoria, BC. Fresh single-use blade every time, inside Broadmead Village. Walk in seven days a week.",
  eyebrow: "Victoria · Hot Towel Shave",
  h1: "Hot Towel Shave in Victoria",
  h1Emphasis: "in Victoria.",
  intro: `The hot towel shave is the one service on our menu that has not changed in a hundred years, and there is a reason for that. A straight razor takes the hair off at the surface of the skin in a single stroke — closer than any cartridge manages, and without the dragging that comes of pulling three blades across the same patch twice over.

The sequence matters as much as the blade. A hot towel goes on first to soften the beard and open the pores, lather is worked in with a brush, and the first pass runs with the grain. Then it is re-lathered and taken across the grain wherever the skin will take it. A cool towel closes everything down at the end and balm settles the face. The whole thing runs thirty to forty minutes, and it is not a service worth rushing.

Every shave uses a fresh single-use blade, no exceptions. If your skin is prone to irritation or you get ingrown hairs, say so before your barber starts and he will keep to one pass with the grain rather than chase the closest possible finish. A traditional shave is hard on skin done carelessly and very easy on it done well.

It is the service people tend to want before something that matters — a wedding, an interview, a photograph — though there is nothing stopping you making it a standing part of the month. Royal Look is inside Broadmead Village Shopping Centre at Royal Oak, with free parking in the lot right out front. We are open seven days a week and take walk-ins; call ahead if you want to check the wait.`,
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
  landmark: SHOP.landmarks,
  callLocation: "hot_shave_page_cta",
  callLocationPrimary: "hot_shave_page_cta_primary",
  breadcrumbLabel: "Hot Towel Shave in Victoria",
  areaServedName: "Victoria, BC",
};
