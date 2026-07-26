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

// Homepage intro. Lives in its own section rather than inside the hero, so the
// hero stays headline + call CTA + trust bar, the same shape the landing pages
// use. Written from what the shop actually is — the barbers and their years
// come from BARBERS in config, the location detail from SHOP.landmarks.
const HOME_INTRO = [
  `Royal Look is a walk-in barber shop inside Broadmead Village Shopping Centre, just to the left of Starbucks, with free parking in the lot right out front. There is no booking app and no appointment system. You come in, you wait if there is a wait, and you leave with a proper haircut. We are open seven days a week.`,

  `Two barbers work the chairs. Zaki has twelve years behind him and is the one to ask for if you want a skin fade, a modern shape, or line work cut into it. Aymen has ten, and leans traditional — scissor work, classic shapes, and beards. If you have a preference, it is worth a quick call to find out who is on.`,

  `The work splits roughly three ways. Fades are what the shop is best known for, blended by hand down to the skin and shaped to your hairline rather than to a guard number. Classic cuts are the steady half of the day — scissor or clipper, finished clean around the ears and neck. Then there is grooming: beard shaping and lineups, and a hot towel straight razor shave for anyone who wants the full thing.`,

  `Kids are welcome from about three years old, and nothing here works well rushed, so we do not rush it. Nine to seven Monday through Friday, nine to five on weekends. Walk in whenever it suits you, or call ahead and we will tell you straight how many people are ahead of you.`,
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" />
              <h2 className="serif">
                Inside the <em>shop.</em>
              </h2>
            </div>
          </div>

          <div style={{ maxWidth: "70ch" }}>
            {HOME_INTRO.map((para, i) => (
              <p
                key={i}
                style={{
                  margin: "0 0 20px",
                  color: "var(--muted)",
                  fontSize: 17,
                  lineHeight: 1.7,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      <Menu />
      <Gallery />
      <FAQ />
      <FindUs />
    </>
  );
}
