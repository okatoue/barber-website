import type { Metadata } from "next";
import { socialMetadata } from "@/lib/seo";
import Image from "next/image";
import { SHOP } from "@/lib/config";
import { GALLERY_PHOTOS as PHOTOS } from "@/lib/gallery";

const DESCRIPTION =
  "Photos of our work — skin fades, beard lineups, kids' cuts, and hot towel shaves from our barber shop in Broadmead Village, Saanich. Walk in seven days a week.";

export const metadata: Metadata = {
  title: "Haircut Gallery — Victoria, BC",
  description: DESCRIPTION,
  alternates: { canonical: "/gallery" },
  ...socialMetadata("/gallery", `Haircut Gallery — Victoria, BC | ${SHOP.name}`, DESCRIPTION),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SHOP.siteUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "Gallery",
      item: `${SHOP.siteUrl}/gallery`,
    },
  ],
};

// Shared inline styles for the editorial body paragraphs — same treatment as
// the intro copy on /location.
const paraStyle = {
  margin: "0 0 20px",
  color: "var(--muted)",
  fontSize: 16,
  lineHeight: 1.65,
} as const;

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="eyebrow">Our work · Broadmead Village</div>
              <h1 className="serif">
                Fresh from <em>the chair.</em>
              </h1>
            </div>
            <p className="lede">
              Cuts from the shop at Broadmead Village — fades, beard work, kids&rsquo;
              cuts, and the finish that ties them together.
            </p>
          </div>

          <div style={{ maxWidth: "70ch", marginBottom: 56 }}>
            <p style={paraStyle}>
              Most of what you&rsquo;ll see here is a fade, because that&rsquo;s
              what most people sit down for. Low, mid, or high — the difference
              is where the shortest point sits on the head, and that choice
              changes how the whole cut reads. The blend is worked by hand, guard
              to guard, so there&rsquo;s no visible step between lengths, then
              taken down to the skin at the bottom and cleaned up with the
              trimmer.
            </p>
            <p style={paraStyle}>
              Beard work is the other half of a finish. A lineup along the cheek
              and the neck decides how the beard sits more than the trim itself
              does, so we set those lines with the haircut in mind rather than
              treating them as two separate jobs. The hot towel and straight
              razor shots are the same idea taken further — the towel softens the
              beard and the skin, and the blade takes the hair off level rather
              than skating over it.
            </p>
            <p style={paraStyle}>
              There are kids in here too, and a fade with line work and colour
              shaved into it. The part that never photographs well is the finish:
              ears and neckline cleaned up, edges squared off, hair brushed off
              your collar before you stand up. Walk in and have a look at the
              board — we&rsquo;re inside Broadmead Village Shopping Centre with
              free parking in the lot right out front.
            </p>
          </div>

          <div className="gallery-grid">
            {PHOTOS.map((p, i) => (
              <div key={p.src} className="gallery-item">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 980px) 25vw, (min-width: 681px) 33vw, 50vw"
                  loading={i < 4 ? "eager" : "lazy"}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 56 }}>
            <a
              href={SHOP.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              More on Instagram ↗
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
