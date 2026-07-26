import { SHOP } from "@/lib/config";
import { resolveService, type LandingPageData } from "@/lib/landing";
import { getGoogleStats } from "@/lib/google-reviews";
import Menu from "@/components/ServiceHighlights";
import FAQ from "@/components/FAQ";
import OpenStatus from "@/components/OpenStatus";

/**
 * Page slug → FAQ topic key.
 *
 * The topic keys are shorter than the slugs and the relationship is not a plain
 * transform ("beard-trim-saanich" → "saanich", "skin-fade-victoria" →
 * "skin-fade"), so the mapping is spelled out explicitly. Kept local to this
 * component rather than added to LandingPageData: it is a presentation detail
 * of the FAQ block, not page data.
 *
 * Any slug missing from this map yields `undefined`, which renders the generic
 * homepage FAQ set — see the `faqArea` note below.
 */
const FAQ_AREA_BY_SLUG: Record<string, string | undefined> = {
  "royal-oak-barber-shop": "royal-oak",
  "beard-trim-saanich": "saanich",
  "gordon-head-barber-shop": "gordon-head",
  "cadboro-bay-barber-shop": "cadboro-bay",
  "oak-bay-barber-shop": "oak-bay",
  "cordova-bay-barber-shop": "cordova-bay",
  "skin-fade-victoria": "skin-fade",
  "kids-haircut-victoria": "kids-haircut",
  "hot-towel-shave-victoria": "hot-towel-shave",
};

export default async function LandingPage({ data }: { data: LandingPageData }) {
  const stats = await getGoogleStats();

  // Split h1 into the plain prefix and the italicised emphasis.
  // h1Emphasis carries a trailing period (e.g. "Barber Shop."); strip it to
  // locate the match inside h1, then render the full h1Emphasis in the <em>.
  const emphasisBase = data.h1Emphasis.replace(/\.$/, "");
  const emphasisIdx = data.h1.indexOf(emphasisBase);
  const h1Before = emphasisIdx >= 0 ? data.h1.slice(0, emphasisIdx) : "";

  // Short area label for the intro heading, e.g. "Royal Oak · Victoria, BC" → "Royal Oak".
  const shortArea = data.eyebrow.split("·")[0].trim();

  // Build-time today name used to highlight the current day row in the hours
  // grid — mirrors the same pattern in LocationPreview.tsx (static export site;
  // renders at build time, not client time).
  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const phoneDigits = SHOP.phone.replace(/\D/g, "");

  // Topic key for the FAQ block. An unrecognised slug leaves this `undefined`,
  // which is exactly the no-argument case for FAQ({ area }: { area?: string })
  // — the generic homepage FAQs render, never an empty block.
  const faqArea = FAQ_AREA_BY_SLUG[data.slug];

  // Directions, present on AREA pages only — the service pages have no origin
  // neighbourhood, so the whole block is omitted rather than emptied.
  const gettingHere = data.gettingHere;

  // `route` reads "A → B → C". Split on the arrow so each leg can be rendered
  // as its own unbreakable chunk in a wrapping row: on a narrow phone the line
  // then breaks between legs rather than mid-street-name or off the side.
  // An arrow-less route yields a single leg and renders verbatim.
  const routeLegs = gettingHere
    ? gettingHere.route
        .split("→")
        .map((leg) => leg.trim())
        .filter(Boolean)
    : [];

  // Row styling for the directions list. Mono labels echo the hours grid
  // directly above them; values stay in the sans face because the transit and
  // parking lines are sentences, not tabular data.
  const ghLabel = {
    margin: 0,
    fontFamily: "var(--font-mono)",
    fontSize: 12,
    letterSpacing: "0.04em",
    color: "var(--muted)",
  };
  const ghValue = {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.6,
    color: "var(--ink-2)",
  };

  // ── JSON-LD @graph ──────────────────────────────────────────────────────────
  const serviceNodes = data.emphasizedServices.map((svc) => {
    const resolved = resolveService(svc.configName);
    return {
      "@type": "Service",
      name: `${svc.displayName} — ${SHOP.name}`,
      serviceType: svc.displayName,
      description: svc.description ?? "",
      areaServed: { "@type": "Place", name: data.areaServedName },
      // ID pointer only — the full HairSalon node lives in layout.tsx.
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
      { "@type": "ListItem", position: 1, name: "Home", item: SHOP.siteUrl },
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

      {/* ── Hero: photo · headline · call CTA · trust bar ───────────────── */}
      <section className="hero">
        <div className="hero-photo" aria-hidden="true" />
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">{data.eyebrow}</div>
              <h1 className="serif">
                {h1Before}
                <em>{data.h1Emphasis}</em>
              </h1>
              <div className="hero-cta-row">
                <a
                  href={`tel:${phoneDigits}`}
                  className="btn btn-ghost"
                  data-call-location={data.callLocationPrimary}
                >
                  Call {SHOP.phone}
                </a>
              </div>
              <div className="hero-trust">
                <div className="stat">
                  <div className="n serif">
                    {stats.rating}
                    <span style={{ color: "var(--accent)" }}>★</span>
                  </div>
                  <div className="l">Google · {stats.reviewCount} reviews</div>
                </div>
                <div className="vrule" />
                <div className="stat">
                  <div className="n serif">20+</div>
                  <div className="l">Years combined</div>
                </div>
                <div className="vrule" />
                <div className="stat">
                  <div className="n serif">7</div>
                  <div className="l">Days a week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Locally emphasized services ──────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" />
              <h2 className="serif">
                {shortArea} <em>favourites.</em>
              </h2>
            </div>
            <p className="lede">
              The services {shortArea} clients ask for most, priced straight
              — no surprises at the chair.
            </p>
          </div>

          <div style={{ maxWidth: 640 }}>
            {data.emphasizedServices.map((svc) => {
              const resolved = resolveService(svc.configName);
              return (
                <div className="menu-row" key={svc.configName}>
                  <div>
                    <div className="nm">{svc.displayName}</div>
                    {resolved ? (
                      <div className="dur">{resolved.duration}</div>
                    ) : null}
                    {svc.description ? (
                      <p
                        style={{
                          margin: "8px 0 0",
                          color: "var(--muted)",
                          fontSize: 14,
                          lineHeight: 1.6,
                          maxWidth: "52ch",
                        }}
                      >
                        {svc.description}
                      </p>
                    ) : null}
                  </div>
                  {resolved ? (
                    <span className="pr serif">{resolved.price}</span>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Full services menu (shared with homepage) ───────────────────── */}
      <Menu />

      {/* ── Unique local intro ──────────────────────────────────────────────
          Sits below the two service blocks deliberately. Someone landing from
          "barber {area}" wants how far, how much, and are you open — the
          favourites block and the menu answer those at a glance, so four
          paragraphs of prose ahead of them is a wall. Not pushed to the very
          bottom either: this is the only genuinely page-specific copy on the
          page, and content nobody scrolls to becomes filler.               */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" />
              <h2 className="serif">
                Your barber in <em>{shortArea}.</em>
              </h2>
            </div>
          </div>

          <div style={{ maxWidth: "70ch" }}>
            {data.intro.split("\n\n").map((para, i) => (
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

      {/* ── Good to know (area-specific FAQs, generic fallback) ─────────── */}
      <FAQ area={faqArea} />

      {/* ── Find us: Google Map · NAP · Hours · Call CTA ────────────────── */}
      <section className="section" id="find" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow" />
              <h2 className="serif">
                Find the <em>shop.</em>
              </h2>
            </div>
          </div>

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

              {/* Getting here — area pages only; absent on the service pages */}
              {gettingHere ? (
                <div>
                  <h4 className="eyebrow" style={{ margin: "0 0 14px" }}>
                    Getting here
                  </h4>

                  <dl
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: "10px 18px",
                      alignItems: "baseline",
                      margin: 0,
                    }}
                  >
                    <dt style={ghLabel}>From</dt>
                    <dd style={ghValue}>{gettingHere.from}</dd>

                    {routeLegs.length > 0 ? (
                      <>
                        <dt style={ghLabel}>Route</dt>
                        <dd style={ghValue}>
                          <span
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "0 6px",
                            }}
                          >
                            {routeLegs.map((leg, i) => (
                              <span
                                key={`${i}-${leg}`}
                                style={{ whiteSpace: "nowrap" }}
                              >
                                {i > 0 ? (
                                  <span
                                    style={{
                                      color: "var(--accent)",
                                      marginRight: 6,
                                    }}
                                  >
                                    &rarr;
                                  </span>
                                ) : null}
                                {leg}
                              </span>
                            ))}
                          </span>
                        </dd>
                      </>
                    ) : null}

                    <dt style={ghLabel}>Drive</dt>
                    <dd style={ghValue}>{gettingHere.driveTime}</dd>

                    {gettingHere.transit ? (
                      <>
                        <dt style={ghLabel}>Transit</dt>
                        <dd style={ghValue}>{gettingHere.transit}</dd>
                      </>
                    ) : null}
                  </dl>

                  {gettingHere.note ? (
                    <p className="find-note">{gettingHere.note}</p>
                  ) : null}
                </div>
              ) : null}

              {/* Primary Call CTA — tracked via Analytics delegated listener */}
              <a
                className="btn btn-secondary"
                href={`tel:${phoneDigits}`}
                data-call-location={data.callLocationPrimary}
                style={{ alignSelf: "flex-start" }}
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
