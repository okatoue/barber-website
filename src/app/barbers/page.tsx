import type { Metadata } from "next";
import { BARBERS, SHOP, type Barber } from "@/lib/config";

export const metadata: Metadata = {
  title: "Our Barbers",
  description: `Meet the barbers at ${SHOP.name} in ${SHOP.address.city}, ${SHOP.address.province} — experienced in skin fades, classic cuts, beards, and hot shaves. Book with your preferred barber online.`,
  alternates: { canonical: "/barbers" },
};

function blurb(b: Barber): string {
  if (b.bio) return b.bio;
  const specs = b.specialties.slice(0, 3).join(", ").toLowerCase();
  return `${b.name} brings ${b.years} on the chair to ${SHOP.name}, with a focus on ${specs}. Book in for a cut dialed to exactly what you're after.`;
}

const teamJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: BARBERS.map((b, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      name: b.name,
      jobTitle: "Barber",
      knowsAbout: b.specialties,
      worksFor: { "@type": "BarberShop", name: SHOP.name, url: SHOP.siteUrl },
      url: `${SHOP.siteUrl}/barbers`,
    },
  })),
};

export default function BarbersPage() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">In the chair</div>
            <h2 className="serif">
              Meet the <em>team</em>
            </h2>
          </div>
        </div>

        <div className="team-grid">
          {BARBERS.map((b) => (
            <article key={b.slug} className="team-card">
              <div className="portrait">
                <div className="stripe" />
                <div className="center">
                  <div className="mono">portrait — {b.name.toLowerCase()}</div>
                </div>
              </div>
              <div className="t-body">
                <div className="t-head">
                  <h3 className="name serif">{b.name}</h3>
                  <span className="yrs">{b.years} on the chair</span>
                </div>
                <p className="t-bio">{blurb(b)}</p>
                {b.specialties.length > 0 && (
                  <div className="spec-tags">
                    {b.specialties.map((s) => (
                      <span key={s} className="spec-tag">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
