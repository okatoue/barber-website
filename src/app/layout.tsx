import type { Metadata } from "next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SHOP } from "@/lib/config";
import { getGoogleStats } from "@/lib/google-reviews";
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

export const metadata: Metadata = {
  title: {
    default: `${SHOP.name} — Barber Shop in Victoria, BC`,
    template: `%s | ${SHOP.name}`,
  },
  description: SHOP.description,
  metadataBase: new URL(SHOP.siteUrl),
  openGraph: {
    type: "website",
    locale: "en_CA",
    siteName: SHOP.name,
    title: `${SHOP.name} — Barber Shop in Victoria, BC`,
    description: SHOP.description,
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
  const stats = await getGoogleStats();
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
              "@type": "BarberShop",
              "@id": `${SHOP.siteUrl}/#barbershop`,
              name: SHOP.name,
              description: SHOP.description,
              url: SHOP.siteUrl,
              telephone: SHOP.phone,
              email: SHOP.email,
              image: [
                `${SHOP.siteUrl}/images/royal-look-interior.jpg`,
                `${SHOP.siteUrl}/images/gallery/gallery-1.jpeg`,
              ],
              priceRange: "$",
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
                  opens: h.open,
                  closes: h.close,
                })),
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: stats.rating,
                reviewCount: stats.reviewCount,
              },
              sameAs: [
                SHOP.social.instagram,
                SHOP.social.facebook,
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
      </body>
    </html>
  );
}
