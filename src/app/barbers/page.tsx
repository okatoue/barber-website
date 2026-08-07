import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { BARBERS, SHOP, findService, type Barber } from "@/lib/config";

// No "book" anywhere in this string: the shop has no booking app and no
// appointment system, so the old "call to book with your preferred barber"
// promised something that does not exist. Kept under 160 characters.
const BARBERS_DESCRIPTION = `Meet Zaki and Aymen, the barbers at ${SHOP.name} in ${SHOP.address.city} — skin fades, scissor cuts, beards. Walk in 7 days a week and ask by name.`;

export const metadata: Metadata = {
  title: "Our Barbers in Victoria, BC",
  description: BARBERS_DESCRIPTION,
  alternates: { canonical: "/barbers" },
  openGraph: {
    title: `Our Barbers in Victoria, BC | ${SHOP.name}`,
    description: BARBERS_DESCRIPTION,
  },
};

function blurb(b: Barber): string {
  if (b.bio) return b.bio;
  const specs = b.specialties.slice(0, 3).join(", ").toLowerCase();
  return `${b.name} brings ${b.years} on the chair to ${SHOP.name}, with a focus on ${specs}. Come in for a cut dialed to exactly what you're after.`;
}

// Shared prose styling, same values the /services copy sections use so the two
// pages read as one voice rather than two.
const PROSE: CSSProperties = {
  margin: "0 0 20px",
  color: "var(--muted)",
  fontSize: 17,
  lineHeight: 1.7,
};

// ── Per-barber expansion ────────────────────────────────────────────────────
// Keyed by slug and rendered directly under each bio in the card. The bios
// themselves are the owner's words and live in config — nothing here restates
// or contradicts one. Everything below is craft: what the specialty actually
// involves and what to say when you sit down. No new biographical claims.
const BARBER_DETAIL: Record<string, string> = {
  zakaria:
    "Twelve years on the chair shows up in the blend. The sides come down to bare skin, then travel back up through the guards with no visible step anywhere in the gradient — which is why a skin fade is the longest cut on the menu. Ask for him for a fade, a modern shape, or line work, and mention a design when you sit down rather than at the end, so there is time to plan it.",
  aymen:
    "Ten years on the chair, and the work leans traditional. Come to him for scissor work if you are growing your hair out or keeping length on top — the weight comes out and the ends get tidied without the length going with them. On a beard, the cheek line and the neckline are most of the job: too high on the cheek and it reads thin, too high on the neck and it reads like a collar.",
};

// Guard, matching the one on /services: a barber added to config without copy
// here would otherwise ship a card that is thinner than the rest of the page.
for (const b of BARBERS) {
  if (!BARBER_DETAIL[b.slug]) {
    throw new Error(
      `/barbers has no expansion copy for "${b.slug}". Add an entry to BARBER_DETAIL in app/barbers/page.tsx.`
    );
  }
}

// ── Which barber ────────────────────────────────────────────────────────────
// Mirrors the "Choosing between them" block on /services. The split between
// the two is drawn from their listed specialties and nothing else.
const CHOOSING = [
  {
    heading: "Start from what you want cut",
    body: "If the decision is mostly about the sides — how short, how sharp, whether the bottom goes down to bare skin — that is Zaki. If it is about the top, or about a beard, that is Aymen. Everything else comes out the same from either chair: a regular cut, a buzz cut, a kids' cut, a senior cut.",
  },
  {
    heading: "No preference is a real answer",
    body: "Most people who walk in do not ask for anyone, and that is the quickest way through the door. Both barbers start the same way, with a short conversation before any clippers come out. A preference is something you end up with after a few visits, not something you need to arrive with.",
  },
  {
    heading: "Say how you want it to sit",
    body: "A photo does more work than a description, whichever chair you land in. So does telling your barber how much time you are willing to spend on it in the morning. If you have none of that worked out, say so — nobody expects you to know the words for it.",
  },
];

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

const phoneDigits = SHOP.phone.replace(/\D/g, "");

export default function BarbersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />

      {/* ── The two barbers ───────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">In the chair · Victoria, BC</div>
              <h1 className="serif">
                Meet the barbers in <em>Broadmead.</em>
              </h1>
            </div>
            <p className="lede">
              Two barbers, twenty-two years on the chair between them, and no
              booking app. Walk in and ask for either by name.
            </p>
          </div>

          <div style={{ maxWidth: "70ch", marginBottom: 48 }}>
            <p style={PROSE}>
              Zaki and Aymen work the two chairs. They cut from the same{" "}
              <Link href="/services">service menu</Link> at the same prices — a
              skin fade is {findService("Skin Fade").price} in either chair —
              but they came up differently, and each has regulars who ask for
              him by name.
            </p>
            <p style={{ ...PROSE, margin: 0 }}>
              There is no appointment system, so a preference is not something
              you arrange in advance. You give the name at the counter and wait
              for that chair.
            </p>
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
                    {/* h2, not h3: on this page the barbers are the sections.
                        The .name class carries the styling either way. */}
                    <h2 className="name serif">{b.name}</h2>
                    <span className="yrs">{b.years} on the chair</span>
                  </div>
                  <p className="t-bio">{blurb(b)}</p>
                  <p className="t-bio">{BARBER_DETAIL[b.slug]}</p>
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

      {/* ── Which barber ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">If you&rsquo;re not sure</div>
              <h2 className="serif">
                Which barber should you <em>ask for?</em>
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
        </div>
      </section>

      {/* ── Walk-ins with a preferred barber ──────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Walk-ins</div>
              <h2 className="serif">
                Asking for a barber by <em>name.</em>
              </h2>
            </div>
          </div>

          <div style={{ maxWidth: "70ch" }}>
            <p style={PROSE}>
              Walk in, say the name at the counter, and wait for that chair.
              There is nothing to fill in beforehand and no list to get onto.
              How long you wait depends on when you come: weekday mornings are
              the quietest stretch of the week, afternoons and early evenings
              are the busy ones.
            </p>
            <p style={{ ...PROSE, margin: 0 }}>
              Who is on changes through the week, which is the better reason to
              call ahead. The wait is a guess, but who is behind the chairs
              today is something we can tell you straight. Call {SHOP.phone}{" "}
              before you set off, or find us{" "}
              <Link href="/location">
                inside Broadmead Village Shopping Centre
              </Link>
              .
            </p>
          </div>

          <div className="team-cta">
            <h3>Walk in and ask for either.</h3>
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
                data-call-location="barbers_page_cta"
              >
                Call {SHOP.phone}
              </a>
              <Link className="btn btn-ghost" href="/services">
                Prices &amp; services
              </Link>
              <Link className="btn btn-ghost" href="/location">
                Find us
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
