import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { SKIN_FADE_DATA } from "@/lib/landing";
import { SHOP } from "@/lib/config";

const DESCRIPTION = SKIN_FADE_DATA.metaDescription;

export const metadata: Metadata = {
  title: "Skin Fade in Victoria",
  description: DESCRIPTION,
  alternates: { canonical: "/skin-fade-victoria" },
  openGraph: {
    title: `Skin Fade in Victoria | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

export default function SkinFadeVictoriaPage() {
  return <LandingPage data={SKIN_FADE_DATA} />;
}
