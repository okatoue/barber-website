import type { Metadata } from "next";
import { SHOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "Location — Barber Shop in Victoria, BC",
  description: `Visit ${SHOP.name} at ${SHOP.address.full}. Open 7 days a week. Book your appointment online.`,
  alternates: { canonical: "/location" },
};

export default function LocationPage() {
  return (
    <div className="section">
      <h1 className="section-heading">Barber Shop in Victoria, BC</h1>
      <p className="section-subheading">
        Come visit us at our shop.
      </p>

      <div className="max-w-5xl mx-auto">
        {/* Map */}
        <div className="aspect-video rounded-xl overflow-hidden bg-surface border border-border mb-10">
          <iframe
            src={SHOP.googleMapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Shop location on Google Maps"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address */}
          <div className="card">
            <h2 className="font-semibold text-gold text-sm uppercase tracking-wider mb-4">
              Address
            </h2>
            <address className="not-italic text-text-muted text-sm leading-relaxed">
              <p className="font-semibold text-text text-base mb-1">
                {SHOP.name}
              </p>
              <p>{SHOP.address.street}</p>
              <p>
                {SHOP.address.city}, {SHOP.address.province}{" "}
                {SHOP.address.postal}
              </p>
              <p className="mt-3">
                <a
                  href={`tel:${SHOP.phone.replace(/[^+\d]/g, "")}`}
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  {SHOP.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${SHOP.email}`}
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  {SHOP.email}
                </a>
              </p>
            </address>
          </div>

          {/* Hours */}
          <div className="card">
            <h2 className="font-semibold text-gold text-sm uppercase tracking-wider mb-4">
              Hours
            </h2>
            <ul className="space-y-2 text-sm">
              {SHOP.hours.map((h) => {
                const today =
                  new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                  }) === h.day;
                return (
                  <li
                    key={h.day}
                    className={`flex justify-between ${today ? "text-gold font-semibold" : "text-text-muted"}`}
                  >
                    <span>{h.day}</span>
                    <span>
                      {h.open} - {h.close}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Getting here */}
          <div className="card">
            <h2 className="font-semibold text-gold text-sm uppercase tracking-wider mb-4">
              Getting Here
            </h2>
            <div className="space-y-4 text-sm text-text-muted">
              <div>
                <h3 className="font-semibold text-text mb-1">Address</h3>
                <p>{SHOP.address.full}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href={`tel:${SHOP.phone.replace(/[^+\d]/g, "")}`}
            className="btn-secondary px-8 py-4"
          >
            Call {SHOP.phone}
          </a>
        </div>

        {/* Areas served */}
        {SHOP.areasServed.length > 0 && (
          <div className="text-center mt-12">
            <h3 className="text-sm font-semibold text-gold uppercase tracking-wider mb-3">
              Areas We Serve
            </h3>
            <p className="text-text-muted text-sm">
              {SHOP.areasServed.join(" · ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
