import Hero from "@/components/Hero";
import Menu from "@/components/ServiceHighlights";
import Work from "@/components/BeforeAfterSlider";
import FindUs from "@/components/LocationPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Menu />
      <Work />
      <FindUs />
    </>
  );
}
