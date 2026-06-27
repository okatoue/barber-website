import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { GORDON_HEAD_DATA } from "@/lib/landing";

export const metadata: Metadata = {
  title: "Gordon Head Barber Shop",
  description:
    "Barber shop for Gordon Head and the UVic area at Royal Look, inside Broadmead Village Shopping Centre. Sharp skin fades, quick buzz cuts, and classic cuts. Walk-ins welcome seven days a week.",
  alternates: { canonical: "/gordon-head-barber-shop" },
};

export default function GordonHeadPage() {
  return <LandingPage data={GORDON_HEAD_DATA} />;
}
