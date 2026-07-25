import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { KIDS_CUT_DATA } from "@/lib/landing";
import { SHOP } from "@/lib/config";

const DESCRIPTION = KIDS_CUT_DATA.metaDescription;

export const metadata: Metadata = {
  title: "Kids' Haircut in Victoria",
  description: DESCRIPTION,
  alternates: { canonical: "/kids-haircut-victoria" },
  openGraph: {
    title: `Kids' Haircut in Victoria | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

export default function KidsHaircutVictoriaPage() {
  return <LandingPage data={KIDS_CUT_DATA} />;
}
