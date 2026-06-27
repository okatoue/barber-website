import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { CORDOVA_BAY_DATA } from "@/lib/landing";

export const metadata: Metadata = {
  title: "Cordova Bay Barber Shop",
  description:
    "Barber shop for Cordova Bay at Royal Look, inside Broadmead Village Shopping Centre. Classic men's cuts, beard trims, and clean skin fades, minutes from Cordova Bay Road. Walk-ins welcome.",
  alternates: { canonical: "/cordova-bay-barber-shop" },
};

export default function CordovaBayPage() {
  return <LandingPage data={CORDOVA_BAY_DATA} />;
}
