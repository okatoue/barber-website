import type { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";
import LandingPage from "@/components/LandingPage";
import { CADBORO_BAY_DATA } from "@/lib/landing";

const { metaTitle: TITLE, metaDescription: DESCRIPTION } = CADBORO_BAY_DATA;

export const metadata: Metadata = {
  // `absolute` because metaTitle already ends in the brand — without it the
  // layout template appends " | Royal Look Barber Shop" a second time.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/cadboro-bay-barber-shop" },
  ...socialMetadata("/cadboro-bay-barber-shop", TITLE, DESCRIPTION),
};

export default function CadboroBayPage() {
  return <LandingPage data={CADBORO_BAY_DATA} />;
}
