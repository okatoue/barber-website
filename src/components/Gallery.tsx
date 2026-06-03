import Image from "next/image";
import { SHOP } from "@/lib/config";

const PHOTOS = [
  { src: "/images/gallery/gallery-1.jpeg", alt: "Mid skin fade and beard lineup" },
  { src: "/images/gallery/gallery-2.jpeg", alt: "Kids cut" },
  { src: "/images/gallery/gallery-3.jpeg", alt: "Kids cut" },
  { src: "/images/gallery/gallery-4.jpeg", alt: "Low skin fade" },
  { src: "/images/gallery/gallery-5.jpeg", alt: "Mid skin fade" },
  { src: "/images/gallery/gallery-6.jpeg", alt: "Regular haircut" },
  {
    src: "/images/gallery/gallery-7.jpeg",
    alt: "Low skin fade, kids cut, hair design and hair dye",
  },
  { src: "/images/gallery/gallery-8.jpeg", alt: "Low skin fade and beard lineup" },
  { src: "/images/gallery/gallery-11.jpeg", alt: "High skin fade and beard lineup" },
  { src: "/images/gallery/gallery-12.jpeg", alt: "Low skin fade" },
  { src: "/images/gallery/gallery-9.jpg", alt: "Hot towel shave" },
  { src: "/images/gallery/gallery-10.jpg", alt: "Hot towel shave" },
];

export default function Gallery() {
  return (
    <section
      className="section section-warm"
      id="work"
      style={{ paddingTop: 0 }}
    >
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow" />
            <h2 className="serif">
              Fresh from <em>the chair.</em>
            </h2>
          </div>
        </div>

        <div className="gallery-grid">
          {PHOTOS.map((p, i) => (
            <div key={p.src} className="gallery-item">
              <Image
                src={p.src}
                alt={`${p.alt} — ${SHOP.name}, ${SHOP.address.city}, ${SHOP.address.province}`}
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
  );
}
