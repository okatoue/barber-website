import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { GORDON_HEAD_DATA } from "@/lib/landing";
import { SHOP } from "@/lib/config";

const DESCRIPTION = GORDON_HEAD_DATA.metaDescription;

export const metadata: Metadata = {
  title: "Gordon Head Barber Shop",
  description: DESCRIPTION,
  alternates: { canonical: "/gordon-head-barber-shop" },
  openGraph: {
    title: `Gordon Head Barber Shop | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

export default function GordonHeadPage() {
  return <LandingPage data={GORDON_HEAD_DATA} />;
}
