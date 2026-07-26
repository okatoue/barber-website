import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { MENS_HAIRCUT_DATA } from "@/lib/landing";
import { SHOP } from "@/lib/config";

const DESCRIPTION = MENS_HAIRCUT_DATA.metaDescription;

export const metadata: Metadata = {
  title: "Men's Haircut in Victoria",
  description: DESCRIPTION,
  alternates: { canonical: "/mens-haircut-victoria" },
  openGraph: {
    title: `Men's Haircut in Victoria | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

export default function MensHaircutVictoriaPage() {
  return <LandingPage data={MENS_HAIRCUT_DATA} />;
}
