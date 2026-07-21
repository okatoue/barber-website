import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { ROYAL_OAK_DATA } from "@/lib/landing";
import { SHOP } from "@/lib/config";

const DESCRIPTION = ROYAL_OAK_DATA.metaDescription;

export const metadata: Metadata = {
  title: "Royal Oak Barber Shop",
  description: DESCRIPTION,
  alternates: { canonical: "/royal-oak-barber-shop" },
  openGraph: {
    title: `Royal Oak Barber Shop | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

export default function RoyalOakPage() {
  return <LandingPage data={ROYAL_OAK_DATA} />;
}
