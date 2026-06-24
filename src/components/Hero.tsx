import { SHOP } from "@/lib/config";
import { getGoogleStats } from "@/lib/google-reviews";

export default async function Hero() {
  const stats = await getGoogleStats();
  return (
    <section className="hero">
      <div className="hero-photo" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">BROADMEAD VILLAGE SHOPPING CENTRE · VICTORIA, BC</div>
            <h1 className="serif">
              Royal Look Barber Shop — Your Barber in{" "}
              <em>Broadmead Village</em>, Saanich
            </h1>
            <p className="lede">
              Looking for a barber in Broadmead or Royal Oak? Royal Look Barber
              Shop offers precision haircuts, skin fades, beard trims, and
              traditional straight razor and hot towel shaves for men and kids
              across Saanich and Greater Victoria. Walk in any day, or call
              ahead to book your preferred barber — we&rsquo;ll get you looking
              sharp.
            </p>
            <div className="hero-cta-row">
              <a
                href={`tel:${SHOP.phone.replace(/\D/g, "")}`}
                className="btn btn-ghost"
                data-call-location="hero"
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
                <div className="l">
                  Google · {stats.reviewCount} reviews
                </div>
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
  );
}
