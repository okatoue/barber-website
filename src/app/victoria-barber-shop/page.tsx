import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { VICTORIA_DATA } from "@/lib/landing";
import { SHOP } from "@/lib/config";

const DESCRIPTION = VICTORIA_DATA.metaDescription;

export const metadata: Metadata = {
  title: "Victoria Barber Shop",
  description: DESCRIPTION,
  alternates: { canonical: "/victoria-barber-shop" },
  openGraph: {
    title: `Victoria Barber Shop | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

export default function VictoriaPage() {
  return <LandingPage data={VICTORIA_DATA} />;
}
