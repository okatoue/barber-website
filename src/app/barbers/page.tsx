import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BARBERS, SHOP, type Barber } from "@/lib/config";

const BARBERS_DESCRIPTION = `Meet the barbers at ${SHOP.name} in ${SHOP.address.city}, ${SHOP.address.province} — experienced in skin fades, classic cuts, beards, and hot shaves. Walk in or call to book with your preferred barber.`;

export const metadata: Metadata = {
  title: "Our Barbers",
  description: BARBERS_DESCRIPTION,
  alternates: { canonical: "/barbers" },
  openGraph: {
    title: `Our Barbers | ${SHOP.name}`,
    description: BARBERS_DESCRIPTION,
  },
};

function blurb(b: Barber): string {
  if (b.bio) return b.bio;
  const specs = b.specialties.slice(0, 3).join(", ").toLowerCase();
  return `${b.name} brings ${b.years} on the chair to ${SHOP.name}, with a focus on ${specs}. Come in for a cut dialed to exactly what you're after.`;
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
      image: `${SHOP.siteUrl}${b.image}`,
      // HairSalon, not BarberShop — see the note in layout.tsx. BarberShop is
      // not a schema.org type.
      worksFor: { "@type": "HairSalon", name: SHOP.name, url: SHOP.siteUrl },
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
            <h1 className="serif">
              Meet the <em>team</em>
            </h1>
          </div>
        </div>

        <div className="team-grid">
          {BARBERS.map((b) => (
            <article key={b.slug} className="team-card">
              <div className="portrait">
                <Image
                  src={b.image}
                  alt={b.imageAlt}
                  fill
                  sizes="(min-width: 980px) 33vw, (min-width: 681px) 50vw, 100vw"
                  style={{ objectFit: "cover" }}
                />
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

        {/* Closing copy carrying real internal links. Per the Jul 2026 audit
            this page is thin (~860 chars) and earned 102 impressions with zero
            clicks, so it needs substance and outbound links — and /services
            needs the inbound one. */}
        <p
          style={{
            maxWidth: "60ch",
            marginTop: 32,
            color: "var(--muted)",
            fontSize: 17,
            lineHeight: 1.7,
          }}
        >
          Both barbers work from the same{" "}
          <Link href="/services">service menu</Link> — skin fades, classic
          cuts, beard shaping and hot towel shaves, with the price and the time
          each one takes. Ask for Zaki or Aymen by name when you come in, or
          walk in and take whoever is free. We&rsquo;re{" "}
          <Link href="/location">inside Broadmead Village</Link>, just to the
          left of Starbucks, seven days a week.
        </p>
      </div>
    </section>
  );
}
