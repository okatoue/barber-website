import { SHOP } from "@/lib/config";
import OpenStatus from "@/components/OpenStatus";

export default function FindUs() {
  const todayName = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <section
      className="section"
      id="find"
      style={{ paddingTop: 0 }}
    >
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow" />
            <h2 className="serif">
              In the corner of <em>Royal Oak.</em>
            </h2>
          </div>
        </div>

        <div className="find-grid">
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

          <div className="find-info">
            <h3 className="serif">{SHOP.name} Barber Shop</h3>
            <div className="addr">
              {SHOP.address.street}
              <br />
              {SHOP.address.city}, {SHOP.address.province} ·{" "}
              {SHOP.address.postal}
              <br />
              <a
                href={`tel:${SHOP.phone.replace(/\D/g, "")}`}
                style={{ color: "var(--accent)" }}
              >
                {SHOP.phone}
              </a>
            </div>

            {SHOP.landmarks && <p className="find-note">{SHOP.landmarks}</p>}

            <p className="find-note">
              Easy to reach from anywhere in Greater Victoria — we&rsquo;re a
              quick trip for Royal Oak, Broadmead, Cordova Bay, Gordon Head,
              Saanich, Oak Bay and beyond.
            </p>

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
                      {h.open} — {h.close}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
