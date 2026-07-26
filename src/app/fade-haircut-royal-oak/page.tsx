import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { FADE_HAIRCUT_DATA } from "@/lib/landing";
import { SHOP } from "@/lib/config";

const DESCRIPTION = FADE_HAIRCUT_DATA.metaDescription;

export const metadata: Metadata = {
  title: "Fade Haircut in Royal Oak",
  description: DESCRIPTION,
  alternates: { canonical: "/fade-haircut-royal-oak" },
  openGraph: {
    title: `Fade Haircut in Royal Oak | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

export default function FadeHaircutRoyalOakPage() {
  return <LandingPage data={FADE_HAIRCUT_DATA} />;
}
