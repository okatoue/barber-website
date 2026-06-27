// ============================================================
// SHOP CONFIGURATION — Edit this file to update all site content
// ============================================================

export const SHOP = {
  name: "Royal Look Barber Shop",
  tagline: "Premium Barber Shop in Victoria, BC",
  description:
    "Modern fades, beard trims, and classic cuts. Walk in 7 days a week or call to book your preferred barber.",
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
  googleReviewCount: 127,
  googleReviewUrl: "https://g.page/royallook/review",
  googleBusinessUrl: "https://share.google/4qBkDMqE3hSbidIZQ",
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
    tiktok: "",
  },
  siteUrl: "https://royallook.ca",
} as const;

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
  image: string;
};

export const BARBERS: Barber[] = [
  {
    name: "Zak",
    slug: "zakaria",
    years: "12 yrs",
    bio: "",
    specialties: ["Skin Fades", "Modern Styles", "Designs"],
    image: "/images/barber-marcus.jpg",
  },
  {
    name: "Aymen",
    slug: "aymen",
    years: "10 yrs",
    bio: "",
    specialties: ["Scissor Cuts", "Classic Styles", "Beards"],
    image: "/images/barber-james.jpg",
  },
];

// ============================================================
// FAQ
// ============================================================

export type FaqItem = {
  question: string;
  answer: string;
  category: string;
  homepage?: boolean;
};

function findService(name: string): Service {
  for (const cat of SERVICES) {
    const item = cat.items.find((s) => s.name === name);
    if (item) return item;
  }
  throw new Error(`Service "${name}" not found in SERVICES`);
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Do you take walk-ins?",
    answer:
      "Yes! We welcome walk-ins whenever we have availability — no appointment needed. Just stop by during our open hours and we'll get you in.",
    category: "Visiting",
    homepage: true,
  },
  {
    question: "How long does a haircut take?",
    answer: `A regular cut takes about ${findService("Regular Hair Cut").duration} and is ${findService("Regular Hair Cut").price}. A skin fade takes ${findService("Skin Fade").duration} at ${findService("Skin Fade").price}. We never rush — every cut gets the time it needs.`,
    category: "Pricing",
    homepage: true,
  },
  {
    question: "Do you cut kids' hair?",
    answer: `Absolutely. We take kids aged 3 and up. Our barbers are patient and experienced with young clients. Kids cuts are ${findService("Kids").price} and take about ${findService("Kids").duration}.`,
    category: "Kids",
    homepage: true,
  },
  {
    question: "What's the difference between a fade and a taper?",
    answer:
      "A fade blends the hair down to the skin for a sharper contrast, while a taper gradually shortens the hair but doesn't go all the way to the skin. Not sure which to pick? Your barber will help you decide.",
    category: "Services",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "We ask for at least 12 hours' notice if you need to cancel or reschedule. Late cancellations or no-shows may incur a fee. Just give us a call to cancel or reschedule.",
    category: "Visiting",
  },
  {
    question: "How does a skin fade work?",
    answer: `Our barbers blend the hair by hand from low to mid to high, fading it right down to the skin for a sharp, clean finish. A skin fade takes ${findService("Skin Fade").duration} and is ${findService("Skin Fade").price}.`,
    category: "Services",
  },
  {
    question: "What beard services do you offer?",
    answer: `We shape the beard and do a clean lineup along the cheeks and neck — a beard trim takes ${findService("Trim Beard").duration} at ${findService("Trim Beard").price}. We also offer a hot towel and straight-razor finish for a closer, more precise edge.`,
    category: "Services",
  },
  {
    question: "Is a straight-razor shave safe and sanitary?",
    answer: `Absolutely. We use a fresh single-use blade for every client, along with a clean hot-towel setup to soften the skin before we start. Our hot shave takes ${findService("Hot Shave").duration} and is ${findService("Hot Shave").price}.`,
    category: "Services",
  },
  {
    question: "Is there parking nearby?",
    answer: SHOP.landmarks,
    category: "Visiting",
  },
];

// ============================================================
// NAV LINKS
// ============================================================

export const NAV_LINKS_LEFT = [
  { label: "Services", href: "/services" },
  { label: "Barbers", href: "/barbers" },
];

export const NAV_LINKS_RIGHT = [
  { label: "Reviews", href: "/#reviews" },
  { label: "Location", href: "/location" },
];
