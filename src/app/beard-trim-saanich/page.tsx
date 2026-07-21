import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { SAANICH_DATA } from "@/lib/landing";
import { SHOP } from "@/lib/config";

const DESCRIPTION = SAANICH_DATA.metaDescription;

export const metadata: Metadata = {
  title: "Beard Trim in Saanich",
  description: DESCRIPTION,
  alternates: { canonical: "/beard-trim-saanich" },
  openGraph: {
    title: `Beard Trim in Saanich | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

export default function BeardTrimSaanichPage() {
  return <LandingPage data={SAANICH_DATA} />;
}
