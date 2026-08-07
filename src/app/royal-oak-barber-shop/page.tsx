import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { ROYAL_OAK_DATA } from "@/lib/landing";

const { metaTitle: TITLE, metaDescription: DESCRIPTION } = ROYAL_OAK_DATA;

export const metadata: Metadata = {
  // `absolute` because metaTitle already ends in the brand — without it the
  // layout template appends " | Royal Look Barber Shop" a second time.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/royal-oak-barber-shop" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RoyalOakPage() {
  return <LandingPage data={ROYAL_OAK_DATA} />;
}
