import type { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";
import LandingPage from "@/components/LandingPage";
import { SAANICH_DATA } from "@/lib/landing";

const { metaTitle: TITLE, metaDescription: DESCRIPTION } = SAANICH_DATA;

export const metadata: Metadata = {
  // `absolute` because metaTitle already ends in the brand — without it the
  // layout template appends " | Royal Look Barber Shop" a second time.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/beard-trim-saanich" },
  ...socialMetadata("/beard-trim-saanich", TITLE, DESCRIPTION),
};

export default function BeardTrimSaanichPage() {
  return <LandingPage data={SAANICH_DATA} />;
}
