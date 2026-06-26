import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { ROYAL_OAK_DATA } from "@/lib/landing";

export const metadata: Metadata = {
  title: "Royal Oak Barber Shop",
  description:
    "Royal Oak Barber Shop inside Broadmead Village Shopping Centre. Expert skin fades, kids' haircuts, and classic cuts. Steps from Royal Oak Transit Exchange. Walk-ins welcome seven days a week.",
  alternates: { canonical: "/royal-oak-barber-shop" },
};

export default function RoyalOakPage() {
  return <LandingPage data={ROYAL_OAK_DATA} />;
}
