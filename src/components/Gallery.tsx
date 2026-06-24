import Image from "next/image";
import { SHOP } from "@/lib/config";

const PHOTOS = [
  {
    src: "/images/gallery/gallery-1.jpeg",
    alt: "Mid skin fade with a sharp beard lineup at Royal Look Barber Shop in Broadmead Village, Saanich",
  },
  {
    src: "/images/gallery/gallery-2.jpeg",
    alt: "Kids' haircut in progress at a Broadmead barbershop in Saanich",
  },
  {
    src: "/images/gallery/gallery-3.jpeg",
    alt: "Young boy getting a fresh haircut at Royal Look Barber Shop near Royal Oak",
  },
  {
    src: "/images/gallery/gallery-4.jpeg",
    alt: "Low skin fade haircut at Royal Look Barber Shop in Broadmead Village, Saanich",
  },
  {
    src: "/images/gallery/gallery-5.jpeg",
    alt: "Mid skin fade finished at a barbershop near Royal Oak, Saanich",
  },
  {
    src: "/images/gallery/gallery-6.jpeg",
    alt: "Classic men's haircut at Royal Look Barber Shop in Broadmead Village, Victoria BC",
  },
  {
    src: "/images/gallery/gallery-7.jpeg",
    alt: "Skin fade with a custom hair design and colour at a Broadmead barbershop in Saanich",
  },
  {
    src: "/images/gallery/gallery-8.jpeg",
    alt: "Low skin fade and beard lineup at Royal Look Barber Shop near Royal Oak",
  },
  {
    src: "/images/gallery/gallery-11.jpeg",
    alt: "High skin fade with a beard lineup at Royal Look Barber Shop in Broadmead Village, Saanich",
  },
  {
    src: "/images/gallery/gallery-12.jpeg",
    alt: "Side view of a low skin fade at a barbershop in Broadmead Village, Saanich",
  },
  {
    src: "/images/gallery/gallery-9.jpg",
    alt: "Straight razor hot towel shave at Royal Look Barber Shop, Royal Oak",
  },
  {
    src: "/images/gallery/gallery-10.jpg",
    alt: "Hot towel shave finished with a straight razor at a Broadmead barbershop",
  },
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
  );
}
