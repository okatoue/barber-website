import { SERVICES, SHOP, type Service } from "./config";

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
  landmark: SHOP.landmarks,
  callLocation: "saanich_beard_page_cta",
  callLocationPrimary: "saanich_beard_page_cta_primary",
  breadcrumbLabel: "Beard Trim in Saanich",
  areaServedName: "Saanich, Victoria BC",
};

export const GORDON_HEAD_DATA: LandingPageData = {
  slug: "gordon-head-barber-shop",
  metaTitle: "Gordon Head Barber Shop — Fades from $30 | Royal Look",
  metaDescription:
    "Gordon Head to Broadmead is a straight run down McKenzie, or the 39 bus. Walk in 7 days: skin fade $30, buzz cut $20, regular cut $28. Free parking.",
  eyebrow: "Gordon Head · Victoria, BC",
  h1: "Gordon Head Barber Shop",
  h1Emphasis: "Barber Shop.",
  intro: `Thursday and Friday are the Gordon Head days. That is when the students come in — hair sorted before the weekend starts rather than after it, which is the sensible order and not the one most people manage. It is the most consistent pattern we see from any neighbourhood we serve, and it means the back half of the week is the busier one for anyone coming from the university side of Saanich.

Two things get asked for above everything else: the regular men's cut and the skin fade. The fade is the one that decides your week. It is sharpest in the first two weeks and softens as the skin section grows back in, so if you want it crisp for a Friday, come in on the Thursday rather than the week before. The regular cut holds its shape longer and asks less of you. A buzz cut, if that is genuinely all you need, is quicker than either.

Getting here without a car is straightforward from Gordon Head: the 39 runs across and stops near Broadmead Village. Be clear on the last stretch though, because the stop is not at our door — it is a couple of minutes on foot from the edge of the plaza, and about four from the shop itself. Budget that on top of the ride and you will not be caught out.

By car it is a straight run down McKenzie Avenue to Quadra, then Chatterton Way into the plaza. We are open every day of the week, nine to seven Monday through Friday and nine to five on weekends, which leaves room around lectures, a shift, or the gap between the two. Walk in when it suits you, or call ahead and we will tell you what the wait looks like.`,
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
    driveTime: "a short drive across Saanich",
    transit:
      "The 39 runs from Gordon Head and stops near Broadmead Village — a short walk from the plaza. Check BC Transit for times at your end.",
  },
  landmark: SHOP.landmarks,
  callLocation: "gordon_head_page_cta",
  callLocationPrimary: "gordon_head_page_cta_primary",
  breadcrumbLabel: "Gordon Head Barber Shop",
  areaServedName: "Gordon Head, Victoria BC",
};

export const CADBORO_BAY_DATA: LandingPageData = {
  slug: "cadboro-bay-barber-shop",
  metaTitle: "Cadboro Bay Barber Shop — Kids' & Family Cuts | Royal Look",
  metaDescription:
    "Cadboro Bay families walk in to Royal Look in Broadmead Village — no appointment, 7 days a week. Kids' cuts $25, regular cut $28, beard trim $20.",
  eyebrow: "Cadboro Bay · Victoria, BC",
  h1: "Cadboro Bay Barber Shop",
  h1Emphasis: "Barber Shop.",
  intro: `Here is a piece of local knowledge worth having: from Cadboro Bay, leaving later is faster. Google Maps puts the drive at about twenty-two minutes at five o'clock and about thirty at three. The road is identical either way — Sinclair Road onto McKenzie, McKenzie to Quadra, then Chatterton Way into the Broadmead plaza — so the whole difference is traffic, and it does not run the direction most people assume.

Our Cadboro Bay clients are a full cross-section: students, families, and retirees, spread through the week rather than bunched into one part of it. Students turn up at the weekend. Retirees come through the day, whenever suits them. Families arrive in the evenings, once work is finished. There is no single Cadboro Bay hour — they filter through, and the shop stays open either way.

The mix shows in the work. Senior cuts, the regular men's cut, kids' cuts, and skin fades are the four we do most from this end of town, with beard trims alongside. Whoever is in the chair, the method does not change: the shape agreed before anything comes off, the length cut to what you asked for rather than to what is quick, and the ears and neck finished properly at the end.

Whether you set out from Cadboro-Gyro Park or from the university end of the neighbourhood, it is the same road in. Parking is free in the lot right out front. We are open seven days a week, nine to seven on weekdays and nine to five on weekends, and walk-ins are welcome on all of them — call first if you want to know what the wait looks like.`,
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
  gettingHere: {
    from: "Cadboro-Gyro Park",
    route: "Sinclair Rd → McKenzie Ave → Quadra St → Chatterton Way",
    driveTime: "about 22 minutes at 5pm, about 30 minutes at 3pm",
    note: "Free parking in the lot right out front. Per Google Maps, leaving later beats leaving mid-afternoon.",
  },
  landmark: SHOP.landmarks,
  callLocation: "cadboro_bay_page_cta",
  callLocationPrimary: "cadboro_bay_page_cta_primary",
  breadcrumbLabel: "Cadboro Bay Barber Shop",
  areaServedName: "Cadboro Bay, Victoria BC",
};

export const OAK_BAY_DATA: LandingPageData = {
  slug: "oak-bay-barber-shop",
  metaTitle: "Oak Bay Barber Shop — Walk-Ins, 4.9 Stars | Royal Look",
  metaDescription:
    "From Oak Bay take the 14 then the 70, or drive to Broadmead. Walk in 7 days, no appointment — call (778) 430-0040 first and we'll tell you the wait.",
  eyebrow: "Oak Bay · Victoria, BC",
  h1: "Oak Bay Barber Shop",
  h1Emphasis: "Barber Shop.",
  intro: `Oak Bay is a real drive to Broadmead, and we would rather say so than pretend otherwise. Bay Street to Cook, Cook to Quadra, then Chatterton Way into the plaza. On clear roads it moves; in rush hour the same trip can stretch to thirty minutes. Royal Jubilee Hospital is the landmark most Oak Bay clients set off from, and the run is straightforward from there once you are past the worst of the traffic.

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
  landmark: SHOP.landmarks,
  callLocation: "oak_bay_page_cta",
  callLocationPrimary: "oak_bay_page_cta_primary",
  breadcrumbLabel: "Oak Bay Barber Shop",
  areaServedName: "Oak Bay, Victoria BC",
};

export const CORDOVA_BAY_DATA: LandingPageData = {
  slug: "cordova-bay-barber-shop",
  // The title deliberately does NOT read as a shop located in Cordova Bay.
  // "Cordova Hair and Barbershop" is a real business at Mattick's Farm, and we
  // are ~4km away, so we can never enter the Cordova Bay map pack. This page
  // ranks organic #2–4 under that pack; the click has to be won by being
  // plainly the out-of-area option, not by reading like the local incumbent.
  metaTitle: "Cordova Bay's Barber Option in Broadmead | Royal Look",
  metaDescription:
    "Royal Look is 10 minutes from Cordova Bay, in Broadmead Village — the 32 stops out front. Walk in 7 days, no appointment, free parking. 4.9 stars.",
  eyebrow: "Cordova Bay · Victoria, BC",
  h1: "Cordova Bay Barber Shop",
  h1Emphasis: "Barber Shop.",
  intro: `The Cordova Bay half of our week arrives in two waves. Seniors come through the morning, when the shop is quiet and there is time to talk. Families come after work on weekdays and at any hour over the weekend, usually with at least one child who would rather be somewhere else. Two very different visits, and the shop runs at two different speeds because of it.

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
