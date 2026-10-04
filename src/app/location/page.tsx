import type { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";
import Link from "next/link";
import { SHOP, AREA_LINK_LIST } from "@/lib/config";
import OpenStatus from "@/components/OpenStatus";

const LOCATION_DESCRIPTION = `Visit ${SHOP.name} at 777 Royal Oak Dr in Broadmead Village, ${SHOP.address.city} ${SHOP.address.province}. Map, hours, parking, and directions. Walk in seven days a week.`;

// Targets directions/parking intent, not "barber shop Victoria" — the homepage
// owns that term and this title used to compete with it.
const LOCATION_TITLE = "Directions & Parking — Broadmead Village | Royal Look";

export const metadata: Metadata = {
  title: { absolute: LOCATION_TITLE },
  description: LOCATION_DESCRIPTION,
  alternates: { canonical: "/location" },
  ...socialMetadata("/location", LOCATION_TITLE, LOCATION_DESCRIPTION),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SHOP.siteUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "Location",
      item: `${SHOP.siteUrl}/location`,
    },
  ],
};

// Shared inline styles for the editorial body paragraphs.
const paraStyle = {
  margin: "0 0 20px",
  color: "var(--muted)",
  fontSize: 16,
  lineHeight: 1.65,
} as const;

const DIRECTIONS = [
  {
    label: "By car",
    body: "We're at the Royal Oak interchange off Highway 17 (the Pat Bay Highway), about fifteen minutes north of downtown Victoria. Follow Royal Oak Drive to Broadmead Village and pull into the lot out front.",
  },
  {
    label: "By transit",
    body: "The Royal Oak Transit Exchange — a major BC Transit hub on Royal Oak Drive, with connections across Saanich and to downtown — is a couple of minutes away. Hop off there and the shop is right inside the Village.",
  },
  {
    label: "Parking",
    body: "Free parking in the plaza lot right out front — no meters, no permits. Pull in, park, and walk to the door, just to the left of Starbucks.",
  },
];

export default function LocationPage() {
  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });
  const phoneDigits = SHOP.phone.replace(/\D/g, "");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ── Head + intro ─────────────────────────────────────────────── */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">
                {SHOP.address.city}, {SHOP.address.province}
              </div>
              <h1 className="serif">
                Find us in <em>Broadmead Village.</em>
              </h1>
            </div>
          </div>

          <div style={{ maxWidth: "70ch" }}>
            <p style={paraStyle}>
              {SHOP.name} is tucked inside Broadmead Village Shopping Centre,
              right at the Royal Oak crossroads in Saanich — the everyday
              Village where Victoria comes for groceries, coffee, and errands.
              You&rsquo;ll find us just to the left of Starbucks, with free
              parking in the lot right out front.
            </p>
            <p style={paraStyle}>
              The location makes a fresh cut easy to fit into the day.
              We&rsquo;re a couple of minutes from the Royal Oak Transit
              Exchange, a short hop off Highway 17, and within an easy drive of
              Broadmead, Cordova Bay, Gordon Head, Cadboro Bay, Oak Bay, and the
              rest of Greater Victoria.
            </p>
            <p style={paraStyle}>
              The shop is open every day of the week — nine to seven Monday
              through Friday and nine to five on weekends. Walk in whenever it
              suits you, or call ahead and we&rsquo;ll tell you straight how
              busy we are.
            </p>
          </div>
        </div>
      </section>

      {/* ── Map · NAP · Hours · Call CTA ─────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="find-grid">
            <div className="find-map">
              <iframe
                src={SHOP.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${SHOP.name} location on Google Maps`}
              />
            </div>

            <div className="find-info">
              <h3 className="serif">{SHOP.name}</h3>

              <div className="addr">
                {SHOP.address.street}
                <br />
                {SHOP.address.city}, {SHOP.address.province} &middot;{" "}
                {SHOP.address.postal}
                <br />
                <a
                  href={`tel:${phoneDigits}`}
                  style={{ color: "var(--accent)" }}
                  data-call-location="location_page_address"
                >
                  {SHOP.phone}
                </a>
                <br />
                <a
                  href={`mailto:${SHOP.email}`}
                  style={{ color: "var(--accent)" }}
                >
                  {SHOP.email}
                </a>
              </div>

              {SHOP.landmarks && <p className="find-note">{SHOP.landmarks}</p>}

              <OpenStatus variant="pill" />

              <div className="hours-grid">
                {SHOP.hours.map((h) => {
                  const isToday = h.day === todayName;
                  return (
                    <div key={h.day} style={{ display: "contents" }}>
                      <span className={`day ${isToday ? "today" : ""}`}>
                        {h.day}
                      </span>
                      <span />
                      <span className={`hrs ${isToday ? "today" : ""}`}>
                        {h.open} &mdash; {h.close}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="hero-cta-row">
                <a
                  className="btn btn-secondary"
                  href={SHOP.directionsUrl}
                  target="_blank"
                  rel="noopener"
                  data-directions-location="location_page_cta"
                >
                  Get directions
                </a>
                <a
                  className="btn btn-ghost"
                  href={`tel:${phoneDigits}`}
                  data-call-location="location_page_cta"
                >
                  Call {SHOP.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Getting here ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Directions</div>
              <h2 className="serif">
                Getting <em>here.</em>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DIRECTIONS.map((d) => (
              <div
                key={d.label}
                style={{ borderTop: "1px solid var(--hairline)", paddingTop: 20 }}
              >
                <h3
                  className="serif"
                  style={{ fontSize: 24, margin: "0 0 8px" }}
                >
                  {d.label}
                </h3>
                <p
                  style={{
                    margin: 0,
                    color: "var(--muted)",
                    fontSize: 15,
                    lineHeight: 1.6,
                  }}
                >
                  {d.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Neighbourhoods we serve (internal links) ─────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Areas we serve</div>
              <h2 className="serif">
                Across <em>Greater Victoria.</em>
              </h2>
            </div>
          </div>

          <p style={{ ...paraStyle, maxWidth: "60ch" }}>
            We&rsquo;re the closest proper barber shop for a good stretch of the
            region. Wherever you&rsquo;re coming from, there&rsquo;s a page with
            the details for your neighbourhood — and the{" "}
            <Link href="/services">full service menu</Link> if you want the
            prices and times before you set off.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {AREA_LINK_LIST.map(({ area, href }) => (
              <a
                key={area}
                className="btn btn-ghost"
                href={href}
                style={{ justifyContent: "space-between" }}
              >
                {area}
                <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
