// ============================================================
// SHOP CONFIGURATION — Edit this file to update all site content
// ============================================================

export const SHOP = {
  name: "Royal Look",
  tagline: "Premium Barber Shop in Victoria, BC",
  description:
    "Modern fades, beard trims, and classic cuts. Book with your preferred barber in seconds.",
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
  googleMapsEmbed:
    "https://maps.google.com/maps?q=777+Royal+Oak+Dr+%23530,+Victoria,+BC+V8X+4V1&t=&z=15&ie=UTF8&iwloc=&output=embed",
  walkIns: true,
  landmarks: "",
  areasServed: ["Downtown", "Fairfield", "Oak Bay", "Esquimalt", "Saanich"],
  social: {
    instagram: "https://www.instagram.com/royal10look/",
    facebook: "https://www.facebook.com/p/Royal-Look-barber-shop-61581458855102/",
    tiktok: "",
  },
  booking: {
    url: "https://www.fresha.com/book-now/royal-look-victoria",
    label: "Book Now",
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
  bookingUrl: string;
};

export const BARBERS: Barber[] = [
  {
    name: "Zak",
    slug: "zakaria",
    years: "12 yrs",
    bio: "",
    specialties: ["Skin Fades", "Modern Styles", "Designs"],
    image: "/images/barber-marcus.jpg",
    bookingUrl:
      "https://www.fresha.com/book-now/royal-look-victoria?staff=zakaria",
  },
  {
    name: "Aymen",
    slug: "aymen",
    years: "10 yrs",
    bio: "",
    specialties: ["Scissor Cuts", "Classic Styles", "Beards"],
    image: "/images/barber-james.jpg",
    bookingUrl:
      "https://www.fresha.com/book-now/royal-look-victoria?staff=aymen",
  },
];

// ============================================================
// FAQ
// ============================================================

export const FAQ_ITEMS = [
  {
    question: "Do you take walk-ins?",
    answer:
      "Yes! We welcome walk-ins whenever we have availability. For guaranteed times, we recommend booking online through Fresha — it takes about 30 seconds.",
  },
  {
    question: "What's the difference between a fade and a taper?",
    answer:
      "A fade blends the hair down to the skin for a sharper contrast, while a taper gradually shortens the hair but doesn't go all the way to the skin. Not sure which to pick? Your barber will help you decide.",
  },
  {
    question: "How long does a haircut take?",
    answer:
      "A classic cut takes about 30–45 minutes. Skin fades take 45–60 minutes. Combos (cut + beard) take 60–75 minutes. We never rush — every cut gets the time it needs.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "We ask for at least 12 hours' notice if you need to cancel or reschedule. Late cancellations or no-shows may incur a fee. You can manage your booking anytime through Fresha.",
  },
  {
    question: "Do you cut kids' hair?",
    answer:
      "Absolutely. We take kids aged 3 and up. Our barbers are patient and experienced with young clients. Kids cuts start at $25.",
  },
];

// ============================================================
// POLICIES
// ============================================================

export const POLICIES = [
  {
    title: "Late Arrivals",
    content:
      "If you're more than 10 minutes late, your appointment may need to be rescheduled to avoid impacting other clients. Please call us if you're running behind and we'll do our best to accommodate you.",
  },
  {
    title: "Cancellations",
    content:
      "We require at least 12 hours' notice for cancellations or reschedules. You can manage your booking anytime through Fresha. Late cancellations (under 12 hours) may be charged 50% of the service fee.",
  },
  {
    title: "No-Shows",
    content:
      "Missed appointments without notice will be charged the full service fee. Repeated no-shows may require a deposit for future bookings. We understand things come up — just let us know in advance.",
  },
  {
    title: "Kids",
    content:
      "We welcome children aged 3 and up. A parent or guardian must remain in the shop during the appointment. Kids who are unable to sit still may need to reschedule for another day.",
  },
  {
    title: "Payment",
    content:
      "We accept cash, debit, Visa, Mastercard, and Apple Pay / Google Pay. All payments are handled in-shop at the time of service. Tips are appreciated but never expected.",
  },
];

// ============================================================
// BEFORE & AFTER
// ============================================================

export const BEFORE_AFTER = [
  {
    id: 1,
    caption: "Skin Fade Transformation",
    before: "/images/before-1.png",
    after: "/images/after-1.png",
  },
  {
    id: 2,
    caption: "Beard Reshape + Lineup",
    before: "/images/before-2.png",
    after: "/images/after-2.png",
  },
  {
    id: 3,
    caption: "Textured Crop Fade",
    before: "/images/before-3.png",
    after: "/images/after-3.png",
  },
];

// ============================================================
// NAV LINKS
// ============================================================

export const NAV_LINKS_LEFT = [
  { label: "Services", href: "/services" },
  { label: "Barbers", href: "/#barbers" },
];

export const NAV_LINKS_RIGHT = [
  { label: "Reviews", href: "/#reviews" },
  { label: "Location", href: "/location" },
];
