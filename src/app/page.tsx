import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Menu from "@/components/ServiceHighlights";
import Gallery from "@/components/Gallery";
import FAQ from "@/components/FAQ";
import FindUs from "@/components/LocationPreview";
import { SHOP } from "@/lib/config";

export const metadata: Metadata = {
  // Absolute, no trailing slash — matches the sitemap and JSON-LD homepage URL.
  alternates: { canonical: SHOP.siteUrl },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Menu />
      <Gallery />
      <FAQ />
      <FindUs />
    </>
  );
}
