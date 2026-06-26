import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { SAANICH_DATA } from "@/lib/landing";

export const metadata: Metadata = {
  title: "Beard Trim in Saanich",
  description:
    "Professional beard trim in Saanich at Royal Look Barber Shop, inside Broadmead Village Shopping Centre. Hot-towel straight-razor shaves, beard shaping, and classic cuts. Walk-ins welcome.",
  alternates: { canonical: "/beard-trim-saanich" },
};

export default function BeardTrimSaanichPage() {
  return <LandingPage data={SAANICH_DATA} />;
}
