import type { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";
import LandingPage from "@/components/LandingPage";
import { SKIN_FADE_DATA } from "@/lib/landing";

const { metaTitle: TITLE, metaDescription: DESCRIPTION } = SKIN_FADE_DATA;

export const metadata: Metadata = {
  // `absolute` because metaTitle already ends in the brand — without it the
  // layout template appends " | Royal Look Barber Shop" a second time.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/skin-fade-victoria" },
  ...socialMetadata("/skin-fade-victoria", TITLE, DESCRIPTION),
};

export default function SkinFadeVictoriaPage() {
  return <LandingPage data={SKIN_FADE_DATA} />;
}
