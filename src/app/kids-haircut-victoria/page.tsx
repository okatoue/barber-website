import type { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";
import LandingPage from "@/components/LandingPage";
import { KIDS_CUT_DATA } from "@/lib/landing";

const { metaTitle: TITLE, metaDescription: DESCRIPTION } = KIDS_CUT_DATA;

export const metadata: Metadata = {
  // `absolute` because metaTitle already ends in the brand — without it the
  // layout template appends " | Royal Look Barber Shop" a second time.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/kids-haircut-victoria" },
  ...socialMetadata("/kids-haircut-victoria", TITLE, DESCRIPTION),
};

export default function KidsHaircutVictoriaPage() {
  return <LandingPage data={KIDS_CUT_DATA} />;
}
