import Image from "next/image";
import { SHOP } from "@/lib/config";

const PHOTOS = [
  "/images/gallery/gallery-1.jpeg",
  "/images/gallery/gallery-2.jpeg",
  "/images/gallery/gallery-3.jpeg",
  "/images/gallery/gallery-4.jpeg",
  "/images/gallery/gallery-5.jpeg",
  "/images/gallery/gallery-6.jpeg",
  "/images/gallery/gallery-7.jpeg",
  "/images/gallery/gallery-8.jpeg",
  "/images/gallery/gallery-11.jpeg",
  "/images/gallery/gallery-12.jpeg",
  "/images/gallery/gallery-9.jpg",
  "/images/gallery/gallery-10.jpg",
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
          {PHOTOS.map((src, i) => (
            <div key={src} className="gallery-item">
              <Image
                src={src}
                alt={`Haircut and grooming at ${SHOP.name} in ${SHOP.address.city}, ${SHOP.address.province}`}
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
