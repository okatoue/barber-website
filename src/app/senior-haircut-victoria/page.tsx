import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { SENIOR_HAIRCUT_DATA } from "@/lib/landing";
import { SHOP } from "@/lib/config";

const DESCRIPTION = SENIOR_HAIRCUT_DATA.metaDescription;

export const metadata: Metadata = {
  title: "Senior Haircuts in Victoria",
  description: DESCRIPTION,
  alternates: { canonical: "/senior-haircut-victoria" },
  openGraph: {
    title: `Senior Haircuts in Victoria | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

export default function SeniorHaircutVictoriaPage() {
  return <LandingPage data={SENIOR_HAIRCUT_DATA} />;
}
