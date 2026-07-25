import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { HOT_SHAVE_DATA } from "@/lib/landing";
import { SHOP } from "@/lib/config";

const DESCRIPTION = HOT_SHAVE_DATA.metaDescription;

export const metadata: Metadata = {
  title: "Hot Towel Shave in Victoria",
  description: DESCRIPTION,
  alternates: { canonical: "/hot-towel-shave-victoria" },
  openGraph: {
    title: `Hot Towel Shave in Victoria | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

export default function HotTowelShaveVictoriaPage() {
  return <LandingPage data={HOT_SHAVE_DATA} />;
}
