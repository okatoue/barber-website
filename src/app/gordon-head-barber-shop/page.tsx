import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { GORDON_HEAD_DATA } from "@/lib/landing";

const { metaTitle: TITLE, metaDescription: DESCRIPTION } = GORDON_HEAD_DATA;

export const metadata: Metadata = {
  // `absolute` because metaTitle already ends in the brand — without it the
  // layout template appends " | Royal Look Barber Shop" a second time.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/gordon-head-barber-shop" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function GordonHeadPage() {
  return <LandingPage data={GORDON_HEAD_DATA} />;
}
