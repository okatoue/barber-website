// The hero backdrop is the LCP element on the homepage and every landing page.
// It used to be a CSS background-image, which the browser's preload scanner
// can't see and which gets no fetch priority — Lighthouse showed it downloaded
// by ~1.8s but not painted until ~8.7s (Oct 2026). A real <img> in the HTML
// with fetchPriority="high" is discovered immediately.
//
// <picture> rather than srcset: phones must get the 900px file regardless of
// pixel density (a 3x phone would otherwise pick the 1920px one). Same 680px
// breakpoint as the rest of globals.css. Plain <img> because next/image is
// unoptimized in this static export and can't art-direct.
export default function HeroPhoto() {
  return (
    <div className="hero-photo" aria-hidden="true">
      <picture>
        <source
          media="(max-width: 680px)"
          srcSet="/images/interior-mobile.webp"
        />
        <img
          src="/images/interior.webp"
          alt=""
          width={1920}
          height={1478}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>
  );
}
