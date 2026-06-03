import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Menu from "@/components/ServiceHighlights";
import Gallery from "@/components/Gallery";
import FindUs from "@/components/LocationPreview";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Menu />
      <Gallery />
      <FindUs />
    </>
  );
}
