import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { CORDOVA_BAY_DATA } from "@/lib/landing";
import { SHOP } from "@/lib/config";

const DESCRIPTION = CORDOVA_BAY_DATA.metaDescription;

export const metadata: Metadata = {
  title: "Cordova Bay Barber Shop",
  description: DESCRIPTION,
  alternates: { canonical: "/cordova-bay-barber-shop" },
  openGraph: {
    title: `Cordova Bay Barber Shop | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

export default function CordovaBayPage() {
  return <LandingPage data={CORDOVA_BAY_DATA} />;
}
