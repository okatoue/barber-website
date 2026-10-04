import type { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";
import LandingPage from "@/components/LandingPage";
import { CORDOVA_BAY_DATA } from "@/lib/landing";

const { metaTitle: TITLE, metaDescription: DESCRIPTION } = CORDOVA_BAY_DATA;

export const metadata: Metadata = {
  // `absolute` because metaTitle already ends in the brand — without it the
  // layout template appends " | Royal Look Barber Shop" a second time.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/cordova-bay-barber-shop" },
  ...socialMetadata("/cordova-bay-barber-shop", TITLE, DESCRIPTION),
};

export default function CordovaBayPage() {
  return <LandingPage data={CORDOVA_BAY_DATA} />;
}
