import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { SERVICES, SERVICE_COMBO, SHOP, findService } from "@/lib/config";

const DESCRIPTION =
  "Haircut, skin fade, beard trim and hot towel shave prices in Victoria, BC — what each service includes and how long it takes. Walk in seven days a week.";

export const metadata: Metadata = {
  title: "Barber Services & Prices in Victoria, BC",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Barber Services & Prices in Victoria, BC | ${SHOP.name}`,
    description: DESCRIPTION,
  },
};

const CATEGORY_SUBTITLES: Record<string, string> = {
  Haircuts: "Clippers · scissors · the works",
  Grooming: "Beards · shaves · finishing",
};

const phoneDigits = SHOP.phone.replace(/\D/g, "");

// Prose styling for the three copy sections below. Kept here rather than in
// globals.css because it is page-local, and shared as constants rather than
// repeated inline so the sections cannot drift out of step with each other.
// Note the price/duration line CANNOT reuse the .dur class: that rule is
// scoped `.menu-row .dur`, and these lines live in .menu-col, not a row.
const PROSE: CSSProperties = {
  margin: "0 0 20px",
  color: "var(--muted)",
  fontSize: 17,
  lineHeight: 1.7,
};

const DETAIL_META: CSSProperties = {
  marginTop: 6,
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  letterSpacing: "0.04em",
  color: "var(--muted)",
};

const DETAIL_BODY: CSSProperties = {
  margin: "12px 0 0",
  color: "var(--muted)",
  fontSize: 16,
  lineHeight: 1.6,
  maxWidth: "62ch",
};

const DETAIL_ROW: CSSProperties = {
  padding: "26px 0",
  borderTop: "1px dashed var(--hairline)",
};

// ── Prices & timing ─────────────────────────────────────────────────────────
// Everything here is drawn from what the shop already publishes: the price list
// in SERVICES, the payment/tipping note on the homepage menu, opening hours in
// SHOP.hours, and the FAQ. Nothing about how the shop operates is invented — if
// the owner has not said it, it is not on the page.
const PRICING_NOTES = [
  `One price per service, and no tiers. A skin fade is ${findService("Skin Fade").price} whichever chair you end up in — neither barber charges more than the other, and nothing on the menu carries a surcharge for hair that is thick, long, or further past its last cut than you would like to admit.`,

  `Every haircut includes the two things people expect to be extras. It starts with a short conversation about what you actually want, before any clippers come out, and it finishes clean around the ears and down the neck. Neither is an add-on and neither is rushed.`,

  `The times beside each service are ranges rather than promises. A regular cut runs ${findService("Regular Hair Cut").duration}, a skin fade ${findService("Skin Fade").duration} because the blend gets checked from both sides and under the lights before the top is touched, and a buzz cut is ${findService("Buzz Cut").duration} start to finish. How far your hair has grown out and how much detail you want decide where in the range you land.`,

  `Cash, debit, Visa, Mastercard and Apple Pay. Tips are appreciated and never expected.`,

  `There is no booking app and no appointment system — walk in and you get the next free chair. Weekday mornings are the quietest stretch of the week. Afternoons and early evenings are the busy ones, and weekends are steady all day on a five o'clock close instead of seven. If you would rather not guess, call ahead and we will tell you straight how many people are ahead of you.`,
];

// ── The menu in detail ──────────────────────────────────────────────────────
// Keyed by the exact `name` in SERVICES so the copy and the price list can
// never drift apart: the two guards below break the build if a menu item has no
// entry here, or an entry here names a service the menu no longer carries.
// (The previous version of this page described a "Straight Razor Shave", a
// "Haircut & Fade" and a "Beard Lineup / Edge-Up" — none of which are on the
// menu, so a reader could not find a price for any of them.)
//
// `displayName` is set only where the menu term is terser than what people
// actually search for; the meta line then shows the menu term too, so a reader
// can still find the row in the price list above.
//
// Where a service has its own landing page, the entry here stays a summary and
// links out rather than restating it. The two must not converge.
type ServiceDetail = {
  displayName?: string;
  body: string;
  link?: { href: string; label: string };
};

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "Regular Hair Cut": {
    body: "The standard cut, and the one most people come in for. Clipper, scissor, or both, depending on what your hair does and how you want it to sit. The sides can be tapered short without going down to bare skin — that is the difference between this and a skin fade, and it means the bottom keeps a little coverage. If you have no idea what to ask for, ask for this one and talk it through in the chair. A photo helps more than a description, but nobody expects you to arrive with one.",
  },
  "Skin Fade": {
    body: "The hair at the bottom of the sides and back comes right down to bare skin, then blends up through the guards until it meets the length on top with no visible step anywhere in the gradient. Low, mid or high is a decision about where the shortest part sits, and your barber will show you on your own head rather than guess from a name. It is the longest service on the cutting side of the menu, for the good reason that a blend cannot be hurried. Ask for Zaki if you want line work or a design cut into it.",
    link: {
      href: "/skin-fade-victoria",
      label: "How a skin fade is cut, step by step",
    },
  },
  Kids: {
    displayName: "Kids' haircut",
    body: "Kids' haircuts from about three years old. The haircut is rarely the hard part — it is the sitting still, and the sound of the clippers the first time round. Our barbers cut the shape first and the fine detail second, so if a child has had enough there is already a finished haircut there. Parents are welcome right beside the chair, and it helps if you tell us exactly what you want rather than leave it open: length on top, how short around the ears, whether the fringe stays. Kids who come in asking for a fade get a proper one.",
    link: {
      href: "/kids-haircut-victoria",
      label: "More on kids' cuts and first haircuts",
    },
  },
  Senior: {
    displayName: "Senior cut",
    body: "The same haircut as a regular cut — cut, shape, and a clean finish around the ears and neck — at a reduced rate and at a pace that is not in a hurry. Just mention it when you come in; there is no card to carry and nothing to prove. Most of our senior clients come in first thing on a weekday, which is the easiest time to get a chair straight away and the part of the day when nothing in the shop feels rushed.",
  },
  "Buzz Cut": {
    body: "One length all over, straight off the clipper, no blending. The guard number sets that length — a one is very short and shows scalp, a four leaves noticeably more. If you are unsure, start longer: we can always take more off, and we cannot put it back. The neck and around the ears still get cleaned up at the end, which is most of the difference between this and doing it yourself over a sink. It grows out at one length, so it never really looks wrong — it just gets longer.",
  },
  "Trim Beard": {
    displayName: "Beard trim",
    body: "The beard is shaped to the length you want and the lines along the cheeks and the neck are set clean. Those two lines are most of the job: too high on the cheek and the beard reads thin, too high on the neck and it reads like a collar. A beard trim stands on its own — plenty of clients come in for just this — or it goes on the end of a haircut, in that order, so the beard is shaped to agree with the cut rather than the other way round. Between visits, leave the lines where your barber put them and take stray hairs off with scissors.",
    link: {
      href: "/beard-trim-saanich",
      label: "Beard trims for Saanich clients",
    },
  },
  "Hot Shave": {
    displayName: "Hot towel shave",
    body: "A hot towel to soften the beard and open the pores, lather worked in with a brush, then a straight razor — with the grain first, and across it afterwards wherever the skin will take it. A cool towel closes everything down at the end. Every shave uses a fresh single-use blade, no exceptions. If you are prone to razor bumps or ingrown hairs, say so before your barber starts and he will keep to a single pass rather than chase the closest possible finish. It is the service people want before a wedding, an interview, or anything they will be photographed at.",
    link: {
      href: "/hot-towel-shave-victoria",
      label: "What a traditional shave involves",
    },
  },
  "Hair Wash": {
    body: "An add-on rather than a service in its own right, and not something anyone needs to arrange in advance — come in with your hair however it is and your barber will work with it. Ask when you sit down if you want it. Some people have it first because clean, damp hair is easier to read; others have it at the end to get the clippings off before going back to work.",
  },
};

// Rendered in menu order rather than the order written above, so the detail
// list mirrors the price list and a reader can move between the two.
const MENU_IN_DETAIL = SERVICES.flatMap((category) => category.items).map(
  (item) => {
    const detail = SERVICE_DETAILS[item.name];
    if (!detail) {
      throw new Error(
        `/services has no detail copy for "${item.name}". Add an entry to SERVICE_DETAILS in app/services/page.tsx — otherwise the service ships as a bare price with no explanation.`
      );
    }
    return { item, detail };
  }
);

// Reverse guard: findService throws if a key above is no longer on the menu.
for (const name of Object.keys(SERVICE_DETAILS)) findService(name);

// ── Choosing between them ───────────────────────────────────────────────────
// The upkeep intervals are the shop's own published answers (FAQ_ITEMS: a fade
// holds two to three weeks, a longer scissor cut four to six, a beard wants
// resetting every few weeks). No interval is invented for a service the owner
// has not put a number on.
const CHOOSING = [
  {
    heading: "Start from how often you want to be here",
    body: "A skin fade is at its sharpest for the first fortnight and softens as the skin section grows back in, so it wants revisiting every two to three weeks. A longer scissor cut sits well for four to six. A tapered regular cut lands between the two, and a buzz cut grows out evenly enough that it never looks wrong, it just gets longer. None of those is better than the others — they are different amounts of upkeep, and picking the one that matches how often you can actually get here matters more than picking the sharpest cut in the room.",
  },
  {
    heading: "The top is the real decision",
    body: "Most people describe the sides in detail and leave the top to interpretation, when the top is where the shape actually lives. Thick hair holds a hard weight line and a squared-off shape well; finer or curlier hair usually sits better with some texture cut through it. The most useful thing you can tell your barber is how much time you are willing to spend on it in the morning — that changes the cut more than any photograph does.",
  },
  {
    heading: "Ask for a barber by name",
    body: "Two barbers work the chairs and you can ask for either at the counter — if they are free, you go straight to their chair. Zaki has twelve years behind him and is the one for skin fades, modern shapes and line work. Aymen has ten and leans traditional: scissor work, classic shapes, and beards. If you have a preference it is worth a quick call first to find out who is on.",
  },
];

export default function ServicesPage() {
  // ── JSON-LD @graph ──────────────────────────────────────────────────────────
  // One Service node per menu category (Haircuts, Grooming), each carrying an
  // OfferCatalog of its individual line items. Driven entirely by SERVICES —
  // never hardcode a price or duration here.
  const serviceNodes = SERVICES.map((category) => ({
    "@type": "Service",
    name: `${category.category} — ${SHOP.name}`,
    serviceType: category.category,
    // ID pointer only — the full HairSalon node lives in layout.tsx.
    // Do NOT emit "@type"/"name"/"address" here (RESEARCH Pitfall 4).
    provider: { "@id": `${SHOP.siteUrl}/#barbershop` },
    areaServed: { "@type": "Place", name: SHOP.address.city },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${category.category} Price List`,
      itemListElement: category.items.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service.name },
        priceCurrency: "CAD",
        // Strip leading "$" so the value is a bare number string.
        price: service.price.replace("$", ""),
      })),
    },
  }));

  const breadcrumbNode = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SHOP.siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SHOP.siteUrl}/services`,
      },
    ],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [...serviceNodes, breadcrumbNode],
  };

  return (
    <>
      {/* Per-page JSON-LD — Service/OfferCatalog entities + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
      />

      {/* ── Price list ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Our Menu · Victoria, BC</div>
              <h1 className="serif">
                Barber services in <em>Victoria.</em>
              </h1>
            </div>
            <p className="lede">
              Haircuts, fades, beards and shaves — with the price and the time
              each one takes. Not sure what to ask for? Take the regular hair
              cut and we&rsquo;ll work it out in the chair.
            </p>
          </div>

          <div className="menu-grid">
            {SERVICES.map((category) => (
              <div className="menu-col" key={category.category}>
                <h3 className="serif">{category.category}</h3>
                {CATEGORY_SUBTITLES[category.category] && (
                  <div className="col-sub">
                    {CATEGORY_SUBTITLES[category.category]}
                  </div>
                )}
                {category.items.map((service) => (
                  <div className="menu-row" key={service.name}>
                    <div>
                      <div className="nm">{service.name}</div>
                      <div className="dur">{service.duration}</div>
                    </div>
                    <span className="pr serif">{service.price}</span>
                  </div>
                ))}
                {/* The combo sits under Grooming, matching the homepage menu.
                    Same price source, so the two cannot disagree. */}
                {category.category === "Grooming" && (
                  <div
                    className="menu-row"
                    style={{
                      marginTop: 24,
                      borderTop: "1px solid var(--hairline-strong)",
                      borderBottom: "none",
                      paddingTop: 24,
                    }}
                  >
                    <div>
                      <div className="nm">{SERVICE_COMBO.name}</div>
                      <div className="dur">
                        {SERVICE_COMBO.parts.join(" + ")}
                      </div>
                    </div>
                    <span className="pr serif">{SERVICE_COMBO.price}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="menu-foot">
            <p className="note">
              Walk in 7 days a week, or call ahead — every cut includes a quick
              consultation so you leave with exactly the look you wanted. Cash,
              debit, Visa, Mastercard, Apple Pay.
            </p>
            <a
              className="btn btn-secondary"
              href={`tel:${phoneDigits}`}
              data-call-location="services_page_menu"
            >
              Call {SHOP.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ── Prices & timing ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Prices &amp; timing</div>
              <h2 className="serif">
                What the price <em>covers.</em>
              </h2>
            </div>
          </div>

          <div style={{ maxWidth: "70ch" }}>
            {PRICING_NOTES.map((para, i) => (
              <p key={i} style={PROSE}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── The menu in detail ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">
                What we do · Broadmead &amp; Royal Oak
              </div>
              <h2 className="serif">
                Every service, <em>in detail.</em>
              </h2>
            </div>
            <p className="lede">
              What each one actually involves, who it suits, and what to say
              when you sit down.
            </p>
          </div>

          <div className="menu-col" style={{ maxWidth: 820 }}>
            {MENU_IN_DETAIL.map(({ item, detail }, i) => (
              <div
                key={item.name}
                style={i === 0 ? { ...DETAIL_ROW, borderTop: "none" } : DETAIL_ROW}
              >
                <h3 className="serif" style={{ margin: 0 }}>
                  {detail.displayName ?? item.name}
                </h3>
                <div style={DETAIL_META}>
                  {item.price} · {item.duration}
                  {detail.displayName
                    ? ` · “${item.name}” on the menu above`
                    : ""}
                </div>
                <p style={DETAIL_BODY}>{detail.body}</p>
                {detail.link && (
                  <Link
                    className="team-link"
                    href={detail.link.href}
                    style={{ display: "inline-block", marginTop: 12 }}
                  >
                    {detail.link.label} <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            ))}

            {/* Not a SERVICES line item, so it sits after the loop rather than
                inside it — but it belongs here, since it is the pairing people
                ask for by name. */}
            <div style={DETAIL_ROW}>
              <h3 className="serif" style={{ margin: 0 }}>
                {SERVICE_COMBO.name}
              </h3>
              <div style={DETAIL_META}>
                {SERVICE_COMBO.price} · allow about an hour
              </div>
              <p style={DETAIL_BODY}>
                A haircut and a beard trim taken together — the same money as
                the two on their own, quoted as one line because it is what
                people ask for by name. The haircut goes first and the beard is
                shaped to match it, so the sideburn carries down into the beard
                with no hard break where one stops and the other starts. Add
                the two times together when you are working out how long you
                will be here, and a little more if the haircut is a skin fade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Choosing between them ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">If you&rsquo;re not sure</div>
              <h2 className="serif">
                Choosing between <em>them.</em>
              </h2>
            </div>
          </div>

          <div style={{ maxWidth: "70ch" }}>
            {CHOOSING.map((block) => (
              <div key={block.heading} style={{ marginBottom: 30 }}>
                <h3
                  className="serif"
                  style={{ margin: "0 0 8px", fontSize: 26 }}
                >
                  {block.heading}
                </h3>
                <p style={{ ...PROSE, margin: 0 }}>{block.body}</p>
              </div>
            ))}
          </div>

          <div className="team-cta">
            <h3>Walk in, or call ahead.</h3>
            <p>{SHOP.landmarks}</p>
            <p>
              Open {SHOP.hours[0].open} &ndash; {SHOP.hours[0].close} Monday to
              Friday, {SHOP.hours[5].open} &ndash; {SHOP.hours[5].close}{" "}
              Saturday and Sunday.
            </p>
            <div className="row">
              <a
                className="btn btn-primary"
                href={`tel:${phoneDigits}`}
                data-call-location="services_page_cta"
              >
                Call {SHOP.phone}
              </a>
              <Link className="btn btn-ghost" href="/location">
                Find us
              </Link>
              <Link className="btn btn-ghost" href="/barbers">
                Meet the barbers
              </Link>
              <Link className="btn btn-ghost" href="/faq">
                Common questions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
