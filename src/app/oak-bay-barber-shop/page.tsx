import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { OAK_BAY_DATA } from "@/lib/landing";
import { SHOP } from "@/lib/config";

const DESCRIPTION = OAK_BAY_DATA.metaDescription;

export const metadata: Metadata = {
  title: "Oak Bay Barber Shop",
  description: DESCRIPTION,
  alternates: { canonical: "/oak-bay-barber-shop" },
  openGraph: {
    title: `Oak Bay Barber Shop | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

export default function OakBayPage() {
  return <LandingPage data={OAK_BAY_DATA} />;
}
