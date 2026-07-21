import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { CADBORO_BAY_DATA } from "@/lib/landing";
import { SHOP } from "@/lib/config";

const DESCRIPTION = CADBORO_BAY_DATA.metaDescription;

export const metadata: Metadata = {
  title: "Cadboro Bay Barber Shop",
  description: DESCRIPTION,
  alternates: { canonical: "/cadboro-bay-barber-shop" },
  openGraph: {
    title: `Cadboro Bay Barber Shop | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

export default function CadboroBayPage() {
  return <LandingPage data={CADBORO_BAY_DATA} />;
}
