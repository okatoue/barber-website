import Image from "next/image";
import { SHOP } from "@/lib/config";
import { GALLERY_PHOTOS as PHOTOS } from "@/lib/gallery";

export default function Gallery() {
  return (
    <section className="section" id="work" style={{ paddingTop: 0 }}>
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
                // All lazy: on the homepage and landing pages the gallery sits
                // well below the fold, and eager here emitted ~600 KB of
                // image preloads that competed with the hero (LCP).
                loading="lazy"
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
