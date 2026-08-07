// ============================================================
// SHOP CONFIGURATION — Edit this file to update all site content
// ============================================================

export const SHOP = {
  name: "Royal Look Barber Shop",
  tagline: "Premium Barber Shop in Victoria, BC",
  description:
    "Modern fades, beard trims, and classic cuts. Walk in 7 days a week — no appointment needed. Ask for your preferred barber.",
  phone: "(778) 430-0040",
  email: "royal10look@gmail.com",
  address: {
    street: "777 Royal Oak Dr #530",
    city: "Victoria",
    province: "BC",
    postal: "V8X 4V1",
    country: "CA",
    full: "777 Royal Oak Dr #530, Victoria, BC V8X 4V1",
  },
  hours: [
    { day: "Monday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Tuesday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Wednesday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Thursday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Friday", open: "9:00 AM", close: "7:00 PM" },
    { day: "Saturday", open: "9:00 AM", close: "5:00 PM" },
    { day: "Sunday", open: "9:00 AM", close: "5:00 PM" },
  ],
  googleRating: "4.9",
  googleReviewCount: 155, // fallback when Places API unavailable; update occasionally
  googleReviewUrl: "https://g.page/royallook/review",
  googleBusinessUrl:
    "https://www.google.com/maps/place/Royal+Look+Barber+Shop/data=!4m2!3m1!1s0x0:0x41df978b9274788d?sa=X&ved=1t:2428&hl=en&ictx=111",
  foundedYear: "2025",
  googleMapsEmbed:
    "https://maps.google.com/maps?q=48.496876336605936,-123.38071633357313&t=&z=17&ie=UTF8&iwloc=&output=embed",
  coordinates: { lat: 48.496876336605936, lng: -123.38071633357313 },
  walkIns: true,
  landmarks:
    "Inside Broadmead Village Shopping Centre, just to the left of Starbucks — with free parking in the lot right out front.",
  landmarkRoyalOak:
    "Steps from Royal Oak Transit Exchange (BC Transit hub on Royal Oak Drive) — and right inside Broadmead Village Shopping Centre.",
  areasServed: [
    "Royal Oak",
    "Broadmead",
    "Cordova Bay",
    "Gordon Head",
    "Cadboro Bay",
    "Saanich",
    "Oak Bay",
    "Victoria",
  ],
  social: {
    instagram: "https://www.instagram.com/royal10look/",
    facebook: "https://www.facebook.com/p/Royal-Look-barber-shop-61581458855102/",
    tiktok: "https://www.tiktok.com/@royal.look.barber",
  },
  siteUrl: "https://royallook.ca",
} as const;

// ============================================================
// AREA LINKS — maps each served area to its best-fit page.
// Shared by the footer and the /location "areas we serve" block
// so the two never drift. Keys must match SHOP.areasServed.
// ============================================================

export const AREA_LINKS: Record<string, string> = {
  "Royal Oak": "/royal-oak-barber-shop",
  Broadmead: "/",
  "Cordova Bay": "/cordova-bay-barber-shop",
  "Gordon Head": "/gordon-head-barber-shop",
  "Cadboro Bay": "/cadboro-bay-barber-shop",
  Saanich: "/beard-trim-saanich",
  "Oak Bay": "/oak-bay-barber-shop",
  // Victoria and Broadmead both point at the homepage: it already targets the
  // broad Victoria/Broadmead term, and /victoria-barber-shop was removed (it
  // competed with the homepage for that head term). public/_redirects 301s the
  // old URL here.
  Victoria: "/",
};

// ============================================================
// SERVICES
// ============================================================

export type Service = {
  name: string;
  duration: string;
  price: string;
  description?: string;
};

export type ServiceCategory = {
  category: string;
  items: Service[];
};

export const SERVICES: ServiceCategory[] = [
  {
    category: "Haircuts",
    items: [
      {
        name: "Regular Hair Cut",
        duration: "30–45 min",
        price: "$28",
      },
      {
        name: "Skin Fade",
        duration: "45–60 min",
        price: "$30",
      },
      {
        name: "Kids",
        duration: "20–30 min",
        price: "$25",
      },
      {
        name: "Senior",
        duration: "30–45 min",
        price: "$25",
      },
      {
        name: "Buzz Cut",
        duration: "15–20 min",
        price: "$20",
      },
    ],
  },
  {
    category: "Grooming",
    items: [
      {
        name: "Trim Beard",
        duration: "20–30 min",
        price: "$20",
      },
      {
        name: "Hot Shave",
        duration: "30–40 min",
        price: "$35",
      },
      {
        name: "Hair Wash",
        duration: "10–15 min",
        price: "$7",
      },
    ],
  },
];

// The one pairing the shop quotes as a single line on the menu. It is the sum
// of its two parts ($28 + $20), not a discount — it exists because people ask
// for the pair by name. Rendered by the homepage menu and /services, so the
// price lives here rather than in either component.
export const SERVICE_COMBO = {
  name: "Cut + Beard",
  price: "$48",
  /** Names in SERVICES, in the order they are performed. */
  parts: ["Regular Hair Cut", "Trim Beard"],
} as const;

export const SERVICE_HIGHLIGHTS = [
  { name: "Regular Hair Cut", duration: "30 min", price: "$28" },
  { name: "Skin Fade", duration: "45 min", price: "$30" },
  { name: "Kids", duration: "20 min", price: "$25" },
  { name: "Senior", duration: "30 min", price: "$25" },
  { name: "Buzz Cut", duration: "15 min", price: "$20" },
  { name: "Trim Beard", duration: "20 min", price: "$20" },
  { name: "Hot Shave", duration: "30 min", price: "$35" },
  { name: "Hair Wash", duration: "10 min", price: "$7" },
];

// ============================================================
// BARBERS
// ============================================================

export type Barber = {
  name: string;
  slug: string;
  years: string;
  bio: string;
  specialties: string[];
  /** 3:4 portrait in public/images/barbers/. Cropped from shop photos the
   *  owner supplied, framed on the barber so no client's face is in shot. */
  image: string;
  imageAlt: string;
};

// Bios are the owner's own words, lightly edited for house voice. blurb() in
// app/barbers/page.tsx still generates fallback text from years + specialties,
// but only fires when `bio` is empty — which it no longer is for either barber.
//
// Note `years` is total time on the chair; the bios date their time here. Zaki
// has 12 years but has been in Victoria since 2022; Aymen has 10 but came via
// Montreal. Both are consistent — they cut elsewhere before Royal Look.
export const BARBERS: Barber[] = [
  {
    name: "Zaki",
    slug: "zakaria",
    years: "12 yrs",
    bio: "Zaki comes from a long line of barbers and has been cutting in Victoria since 2022. He's the one regulars ask for when they want line work or a design shaved into the fade.",
    specialties: ["Skin Fades", "Modern Styles", "Designs"],
    image: "/images/barbers/zaki.webp",
    imageAlt:
      "Zaki working on a client at Royal Look Barber Shop in Broadmead Village, Saanich",
  },
  {
    name: "Aymen",
    slug: "aymen",
    years: "10 yrs",
    bio: "Aymen came to Royal Look from Montreal and has been cutting in Canada since 2022. Ask for him if you want a beard trim shaped properly and finished with a solid fade.",
    specialties: ["Scissor Cuts", "Classic Styles", "Beards"],
    image: "/images/barbers/aymen.webp",
    imageAlt:
      "Aymen finishing a cut at Royal Look Barber Shop in Broadmead Village, Saanich",
  },
];

// ============================================================
// FAQ
// ============================================================

// `areas` tags an FAQ to the landing-page topics it genuinely answers, so each
// landing page can render a set relevant to IT rather than the same three
// homepage items everywhere (duplicate content across landing pages).
// Valid keys — area pages: "royal-oak", "saanich", "gordon-head",
// "cadboro-bay", "oak-bay", "cordova-bay"; service pages: "skin-fade",
// "kids-haircut", "hot-towel-shave". FAQ.tsx reads this.
// Every key has at least 3 tagged items, and no two landing pages share more
// than one — that overlap budget is the point of the field.
export type FaqItem = {
  question: string;
  answer: string;
  category: string;
  homepage?: boolean;
  areas?: string[];
};

// Throws rather than returning null: every caller is rendering a price or a
// duration into copy, and a silently missing service would ship a page with a
// hole in it. A wrong name breaks the build instead. (lib/landing.ts has its
// own nullable resolveService for the same lookup where a miss is tolerable.)
export function findService(name: string): Service {
  for (const cat of SERVICES) {
    const item = cat.items.find((s) => s.name === name);
    if (item) return item;
  }
  throw new Error(`Service "${name}" not found in SERVICES`);
}

// Ordered by category to match CATEGORY_ORDER in app/faq/page.tsx, which
// renders every item here and owns the site's only FAQPage JSON-LD. An item
// whose `category` is outside that list would enter the schema but render
// nowhere — keep new items within Visiting / Pricing / Kids / Services.
export const FAQ_ITEMS: FaqItem[] = [
  // ── Visiting ──────────────────────────────────────────────────────────────
  {
    question: "Do you take walk-ins?",
    answer:
      "Yes! We welcome walk-ins whenever we have availability — no appointment needed. Just stop by during our open hours and we'll get you in.",
    category: "Visiting",
    homepage: true,
  },
  {
    question: "How long is the wait if I walk in?",
    answer:
      "It depends on how many chairs are full when you arrive — sometimes you sit straight down, sometimes there are a couple of people ahead of you. Weekdays run nine to seven, so there's more room in the day than on a weekend, when we close at five. If you'd rather not guess, give us a call before you head over and we'll tell you straight what the wait looks like.",
    category: "Visiting",
    areas: ["cordova-bay"],
  },
  {
    question: "Can I ask for a specific barber?",
    answer:
      "Yes. Ask for Zaki or Aymen when you come in, and if they're free you'll go straight to their chair. If you have a preference, it's worth a quick call first — we'll tell you who's working and roughly when they're open.",
    category: "Visiting",
    areas: ["oak-bay"],
  },
  {
    question: "Do I need to wash my hair before I come in?",
    answer: `No — come as you are. Clean or not, dry or damp, your barber will work with it. If you'd rather have it washed at the shop, a hair wash is ${findService("Hair Wash").price} and takes ${findService("Hair Wash").duration}. Just ask when you sit down.`,
    category: "Visiting",
    areas: ["cordova-bay"],
  },
  {
    question: "Is there parking nearby?",
    answer: SHOP.landmarks,
    category: "Visiting",
    areas: ["cadboro-bay"],
  },
  {
    question: "Which shopping centre are you in?",
    answer:
      "Broadmead Village Shopping Centre — we're inside the plaza, just to the left of Starbucks, with free parking in the lot right out front. It's a different centre from Royal Oak Shopping Centre, which is about four minutes away by car: West Saanich Road to Elk Lake Drive, down Royal Oak Drive, then Chatterton Way in. From Cordova Bay Beach it's about ten minutes — Cordova Bay Road onto Royal Oak Drive and the same turn onto Chatterton Way.",
    category: "Visiting",
    areas: ["royal-oak", "cordova-bay"],
  },
  {
    // gordon-head is served by "Which bus routes stop near the shop?" below;
    // tagging both here would put two bus questions on the one page.
    question: "Can I get to the shop by bus?",
    answer:
      "Yes. We're a short walk from the Royal Oak Transit Exchange on Royal Oak Drive, so you can get here on BC Transit without a car. From the exchange, head into Broadmead Village Shopping Centre — we're inside, just to the left of Starbucks. Check the BC Transit schedule for the route that works from your end.",
    category: "Visiting",
    areas: ["royal-oak"],
  },
  {
    question: "Which bus routes stop near the shop?",
    answer:
      "Seven stop near Broadmead Village: 6A, 6B, 32, 39, 70, 72 and 75. From Cordova Bay the 32 takes about 11 minutes and stops right in front of the Village. From Gordon Head take the 39. From Oak Bay it is two legs — the 14, then a transfer to the 70, since the 14 on its own does not come this far. Check BC Transit for times at your end.",
    category: "Visiting",
    areas: ["cordova-bay", "gordon-head", "oak-bay"],
  },
  {
    question: "How long does it take to drive here from Oak Bay?",
    answer:
      "Bay Street to Cook, up Quadra, then Chatterton Way into Broadmead Village — Royal Jubilee Hospital is the landmark at the Oak Bay end of that run. Outside the busy hours it's a straightforward drive. At rush hour give it up to 30 minutes, so if you're coming after work, leave yourself more room than you think you need.",
    category: "Visiting",
    areas: ["oak-bay"],
  },
  {
    question: "When is the drive from Cadboro Bay quickest?",
    answer:
      "Later in the day, which catches most people out. Google Maps puts the trip at about 30 minutes at 3pm and about 22 minutes at 5pm — the mid-afternoon run is the slow one, not the after-work one. The route either way is Sinclair Road to McKenzie Avenue, up Quadra Street, then Chatterton Way into Broadmead Village. Coming from around Cadboro-Gyro Park or UVic, it's the same road out.",
    category: "Visiting",
    areas: ["cadboro-bay"],
  },
  {
    question: "When is the shop quietest?",
    answer:
      "Weekday mornings. We open at nine, and the early part of the day is mostly our senior and retired clients — there's usually a chair free and nothing feels rushed. Afternoons are the busy stretch, on the roads around here as much as in the shop. Evenings fill up with families and people coming off work, Thursday and Friday get busy with students tidying up before the weekend, and weekends are steady all day, with a five o'clock close instead of seven. If you want the shortest wait, come early on a weekday.",
    category: "Visiting",
    areas: ["royal-oak", "cadboro-bay", "gordon-head"],
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "We ask for at least 12 hours' notice if you need to cancel or reschedule. Late cancellations or no-shows may incur a fee. Just give us a call to cancel or reschedule.",
    category: "Visiting",
  },

  // ── Pricing ───────────────────────────────────────────────────────────────
  {
    question: "How long does a haircut take?",
    answer: `A regular cut takes about ${findService("Regular Hair Cut").duration} and is ${findService("Regular Hair Cut").price}. A skin fade takes ${findService("Skin Fade").duration} at ${findService("Skin Fade").price}. We never rush — every cut gets the time it needs.`,
    category: "Pricing",
    homepage: true,
  },
  {
    question: "What's included in a senior cut?",
    answer: `The same haircut as our regular cut — cut, shape, and a clean finish around the ears and neck — at a reduced rate of ${findService("Senior").price}, and at a pace that isn't rushed. It takes ${findService("Senior").duration}. Just mention it when you come in.`,
    category: "Pricing",
    areas: ["oak-bay"],
  },

  // ── Kids ──────────────────────────────────────────────────────────────────
  {
    question: "Do you cut kids' hair?",
    answer: `Absolutely. We take kids aged 3 and up. Our barbers are patient and experienced with young clients. Kids cuts are ${findService("Kids").price} and take about ${findService("Kids").duration}.`,
    category: "Kids",
    homepage: true,
    areas: ["kids-haircut"],
  },
  {
    question: "My child won't sit still for a haircut — what do you suggest?",
    answer:
      "Bring them when they're rested and not hungry, and pick a simple shape — a short, even cut goes on quickly and doesn't ask them to hold a pose. Parents are welcome to stay right beside the chair, and smaller kids can sit on a lap if that settles them. Our barbers have done plenty of first haircuts and won't rush or make a fuss if it takes a few tries.",
    category: "Kids",
    areas: ["kids-haircut", "royal-oak"],
  },
  {
    question: "Can I bring more than one kid in at once?",
    answer:
      "Yes — bring the whole crew. Give us a call before you come and we'll tell you when there's room to take them one after another instead of everyone waiting. If the youngest is nervous, put them in the chair after they've watched an older sibling go first; it works more often than not.",
    category: "Kids",
    areas: ["kids-haircut", "cadboro-bay"],
  },

  // ── Services ──────────────────────────────────────────────────────────────
  {
    question: "I'm not sure what to ask for — can you help me pick?",
    answer:
      "That's a normal question and there's no wrong answer. Bring a photo if you have one, or just tell your barber how you want it to sit and how much work you're willing to put in each morning. We'll talk it through before the clippers come out, and if you're stuck between two ideas we'll point you at the one that suits your hair and the way it grows.",
    category: "Services",
    areas: ["cadboro-bay"],
  },
  {
    question: "What's the difference between a fade and a taper?",
    answer:
      "A fade blends the hair down to the skin for a sharper contrast, while a taper gradually shortens the hair but doesn't go all the way to the skin. Not sure which to pick? Your barber will help you decide.",
    category: "Services",
    areas: ["skin-fade"],
  },
  {
    question: "How does a skin fade work?",
    answer: `Our barbers blend the hair by hand from low to mid to high, fading it right down to the skin for a sharp, clean finish. A skin fade takes ${findService("Skin Fade").duration} and is ${findService("Skin Fade").price}.`,
    category: "Services",
    areas: ["skin-fade", "royal-oak"],
  },
  {
    question: "How often should I come in to keep a fade looking sharp?",
    answer:
      "A skin fade holds its shape for roughly two to three weeks — the tighter the blend, the sooner it grows out of it. A longer scissor cut will sit well for four to six weeks. If you want it kept crisp, come in on a rhythm; if you're happy letting it soften, come in when it starts to bother you.",
    category: "Services",
    areas: ["skin-fade", "gordon-head"],
  },
  {
    question: "Can you do hair designs or patterns?",
    answer:
      "Yes — Zaki does line work and designs shaved into the fade. Mention it before we start so there's time to plan it properly rather than squeeze it in at the end, and bring a picture if you have something specific in mind.",
    category: "Services",
    areas: ["skin-fade"],
  },
  {
    question: "What's a buzz cut, and which guard should I ask for?",
    answer: `A buzz cut is one length all over, straight off the clipper, with no blending. The guard number sets that length — a one is very short, a four leaves noticeably more on top. If you're unsure, start longer; we can always take more off. It takes ${findService("Buzz Cut").duration} and is ${findService("Buzz Cut").price}.`,
    category: "Services",
    areas: ["gordon-head"],
  },
  {
    question: "Do you cut longer styles, or only short ones?",
    answer:
      "Both. Aymen does scissor work for anyone growing their hair out or keeping a longer classic shape — taking the weight out and tidying the ends without losing the length. Tell your barber how long you want to keep it and we'll cut to that, not shorter.",
    category: "Services",
    areas: ["cadboro-bay"],
  },
  {
    question: "What cut works best for thinning hair or a receding hairline?",
    answer:
      "Usually something shorter and evenly balanced. Taking the sides down tighter makes the top read fuller by contrast, and a softer front line draws less attention to a receding hairline than a hard, straight one. Heavy product and long sweeps across the top tend to do the opposite. Tell your barber what's bothering you and they'll cut to play it down rather than highlight it.",
    category: "Services",
    areas: ["oak-bay"],
  },
  {
    question: "What beard services do you offer?",
    answer: `We shape the beard and do a clean lineup along the cheeks and neck — a beard trim takes ${findService("Trim Beard").duration} at ${findService("Trim Beard").price}. We also offer a hot towel and straight-razor finish for a closer, more precise edge.`,
    category: "Services",
    areas: ["saanich"],
  },
  {
    question: "Can I get a beard trim without a haircut?",
    answer: `Yes — a beard trim stands on its own, ${findService("Trim Beard").price} for ${findService("Trim Beard").duration}, and plenty of clients come in for just that. If you want both, we'll do the haircut first and shape the beard to match it. That's the right order for getting the lines to agree with each other.`,
    category: "Services",
    areas: ["saanich"],
  },
  {
    question: "How do I keep my beard tidy between trims?",
    answer:
      "Brush or comb it daily so it lies the way it was cut — that alone keeps the shape honest. Leave the cheek line and the neckline where your barber set them; those are the two lines people creep upward at home, and once they're off it takes weeks to bring them back. Take stray long hairs off with scissors rather than clippers, and come in every few weeks to reset the shape.",
    category: "Services",
    areas: ["saanich", "cordova-bay"],
  },
  {
    question: "Is a straight-razor shave safe and sanitary?",
    answer: `Absolutely. We use a fresh single-use blade for every client, along with a clean hot-towel setup to soften the skin before we start. Our hot shave takes ${findService("Hot Shave").duration} and is ${findService("Hot Shave").price}.`,
    category: "Services",
    areas: ["hot-towel-shave"],
  },
  {
    question: "How long does a straight-razor shave stay smooth?",
    answer:
      "It gets closer than a cartridge razor and usually holds a day longer, because the blade takes the hair off level with the skin instead of skating over it. How long that lasts comes down to how fast your beard grows. Plenty of clients get one ahead of a wedding, an interview, or anything they'll be photographed at.",
    category: "Services",
    areas: ["hot-towel-shave"],
  },
  {
    question: "Will a straight-razor shave irritate my skin?",
    answer:
      "The hot towel is there to prevent exactly that — it softens the beard and relaxes the skin so the blade cuts cleanly instead of dragging. Most irritation comes from a dull blade and too many passes, and we start with a fresh blade every time. If you're prone to razor bumps or ingrown hairs, say so before we begin and we'll shave with the grain rather than against it.",
    category: "Services",
    areas: ["hot-towel-shave"],
  },
];

// ============================================================
// NAV LINKS
// ============================================================
// Single source of truth for the header nav — Navbar.tsx renders this.
// Prefer a real route over a homepage anchor wherever one exists: an
// anchor like "/#menu" navigates a landing-page visitor away to the
// homepage and passes no link signal to /services or /location. "Work"
// points at /gallery for the same reason; the homepage still keeps its
// id="work" gallery section for on-page scrolling.

export const NAV_LINKS = [
  { label: "Menu", href: "/services" },
  { label: "Work", href: "/gallery" },
  { label: "Team", href: "/barbers" },
  { label: "Find Us", href: "/location" },
];
