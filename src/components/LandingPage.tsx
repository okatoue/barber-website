import { SHOP } from "@/lib/config";
import { resolveService, type LandingPageData } from "@/lib/landing";

export default function LandingPage({ data }: { data: LandingPageData }) {
  // Split h1 into the plain prefix and the italicised emphasis.
  // h1Emphasis carries a trailing period (e.g. "Barber Shop."); strip it to
  // locate the match inside h1, then render the full h1Emphasis in the <em>.
  const emphasisBase = data.h1Emphasis.replace(/\.$/, "");
  const emphasisIdx = data.h1.indexOf(emphasisBase);
  const h1Before = emphasisIdx >= 0 ? data.h1.slice(0, emphasisIdx) : "";

  // Build-time today name used to highlight the current day row in the hours
  // grid — mirrors the same pattern in LocationPreview.tsx (static export site;
  // renders at build time, not client time).
  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  // ── JSON-LD @graph ──────────────────────────────────────────────────────────
  const phoneDigits = SHOP.phone.replace(/\D/g, "");

  const serviceNodes = data.emphasizedServices.map((svc) => {
    const resolved = resolveService(svc.configName);
    return {
      "@type": "Service",
      name: `${svc.displayName} — ${SHOP.name}`,
      serviceType: svc.displayName,
      description: svc.description ?? "",
      areaServed: { "@type": "Place", name: data.areaServedName },
      // ID pointer only — the full BarberShop node lives in layout.tsx.
      // Do NOT emit "@type"/"name"/"address" here (RESEARCH Pitfall 4).
      provider: { "@id": `${SHOP.siteUrl}/#barbershop` },
      offers: {
        "@type": "Offer",
        priceCurrency: "CAD",
        // Strip leading "$" so the value is a bare number string.
        price: resolved ? resolved.price.replace("$", "") : "0",
      },
    };
  });

  const breadcrumbNode = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SHOP.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: data.breadcrumbLabel,
        item: `${SHOP.siteUrl}/${data.slug}`,
      },
    ],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [...serviceNodes, breadcrumbNode],
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Per-page JSON-LD — Service entities + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      {/* ── Section 1: Header · Intro · Emphasized Services ─────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">{data.eyebrow}</div>
              <h1 className="serif">
                {h1Before}
                <em>{data.h1Emphasis}</em>
              </h1>
            </div>
          </div>

          {/* Unique multi-paragraph intro — constrained width */}
          <div style={{ maxWidth: "70ch", marginBottom: 48 }}>
            {data.intro.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  margin: "0 0 20px",
                  color: "var(--muted)",
                  fontSize: 16,
                  lineHeight: 1.65,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Emphasized services — prices resolved from config via resolveService */}
          <div className="menu-col" style={{ maxWidth: 820 }}>
            {data.emphasizedServices.map((svc) => {
              const resolved = resolveService(svc.configName);
              return (
                <div key={svc.configName}>
                  <div className="menu-row">
                    <div>
                      <div className="nm">{svc.displayName}</div>
                      {resolved && (
                        <div className="dur">{resolved.duration}</div>
                      )}
                    </div>
                    {resolved && (
                      <span className="pr serif">{resolved.price}</span>
                    )}
                  </div>
                  {svc.description ? (
                    <p
                      style={{
                        margin: "4px 0 8px",
                        color: "var(--muted)",
                        fontSize: 15,
                        lineHeight: 1.6,
                      }}
                    >
                      {svc.description}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 2: Google Map · NAP · Hours · Call CTA ──────────────── */}
      <section className="section">
        <div className="container">
          <div className="find-grid">
            {/* Map */}
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

            {/* NAP + Hours + CTA */}
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
                  data-call-location={data.callLocation}
                >
                  {SHOP.phone}
                </a>
              </div>

              {data.landmark ? (
                <p className="find-note">{data.landmark}</p>
              ) : null}

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

              {/* Primary Call CTA — tracked via Analytics delegated listener */}
              <a
                className="btn btn-secondary"
                href={`tel:${phoneDigits}`}
                data-call-location={data.callLocationPrimary}
              >
                Call {SHOP.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
