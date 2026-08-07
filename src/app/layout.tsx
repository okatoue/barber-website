import type { Metadata } from "next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import MetaPixel from "@/components/MetaPixel";
import MobileBottomBar from "@/components/MobileBottomBar";
import { SHOP } from "@/lib/config";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const HOME_DESCRIPTION =
  "Royal Look Barber Shop in Broadmead Village, Saanich. Skin fades, beard trims, straight razor and hot towel shaves, kids' cuts. Walk in — call (778) 430-0040.";

// schema.org expects 24-hour "HH:MM"; config keeps the 12-hour display strings.
function to24Hour(time: string): string {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return time;
  const [, h, minutes, period] = match;
  let hour = Number(h) % 12;
  if (period.toUpperCase() === "PM") hour += 12;
  return `${String(hour).padStart(2, "0")}:${minutes}`;
}

export const metadata: Metadata = {
  title: {
    default: "Barber in Broadmead Village | Royal Look Barber Shop",
    template: `%s | ${SHOP.name}`,
  },
  description: HOME_DESCRIPTION,
  metadataBase: new URL(SHOP.siteUrl),
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: SHOP.name,
    title: "Barber in Broadmead Village | Royal Look Barber Shop",
    description: HOME_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "theme-color": "#13132f",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              // HairSalon, NOT BarberShop. schema.org has no BarberShop type —
              // the LocalBusiness > HealthAndBeautyBusiness branch defines only
              // BeautySalon, DaySpa, HairSalon, HealthClub, NailSalon and
              // TattooParlor. The Schema Markup Validator rejected BarberShop
              // outright ("not a type defined by the recognized schema",
              // Jul 2026), which left every property below attached to a type
              // that does not exist. Do not "correct" this back.
              "@type": "HairSalon",
              // @id is an arbitrary identifier, not a type — services/page.tsx
              // and LandingPage.tsx point `provider` at this fragment, so it
              // must stay exactly as-is.
              "@id": `${SHOP.siteUrl}/#barbershop`,
              name: "Royal Look Barber Shop",
              description: SHOP.description,
              url: SHOP.siteUrl,
              telephone: SHOP.phone,
              email: SHOP.email,
              image: [
                `${SHOP.siteUrl}/images/royal-look-interior.jpg`,
                `${SHOP.siteUrl}/images/gallery/gallery-1.jpeg`,
              ],
              priceRange: "$7-$48",
              foundingDate: SHOP.foundedYear,
              currenciesAccepted: "CAD",
              paymentAccepted:
                "Cash, Debit, Visa, Mastercard, Apple Pay, Google Pay",
              geo: {
                "@type": "GeoCoordinates",
                latitude: SHOP.coordinates.lat,
                longitude: SHOP.coordinates.lng,
              },
              hasMap: `https://www.google.com/maps?q=${SHOP.coordinates.lat},${SHOP.coordinates.lng}`,
              areaServed: SHOP.areasServed.map((a) => ({
                "@type": "Place",
                name: a,
              })),
              address: {
                "@type": "PostalAddress",
                streetAddress: SHOP.address.street,
                addressLocality: SHOP.address.city,
                addressRegion: SHOP.address.province,
                postalCode: SHOP.address.postal,
                addressCountry: SHOP.address.country,
              },
              openingHoursSpecification: SHOP.hours
                .filter((h) => h.close)
                .map((h) => ({
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: h.day,
                  opens: to24Hour(h.open),
                  closes: to24Hour(h.close),
                })),
              sameAs: [
                SHOP.social.instagram,
                SHOP.social.facebook,
                SHOP.social.tiktok,
                SHOP.googleBusinessUrl,
              ].filter(Boolean),
            }),
          }}
        />
      </head>
      <body className="min-h-screen">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileBottomBar />
        <Analytics />
        <MetaPixel />
      </body>
    </html>
  );
}
