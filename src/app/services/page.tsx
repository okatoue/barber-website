import type { Metadata } from "next";
import { SERVICES } from "@/lib/config";

export const metadata: Metadata = {
  title: "Barber Services in Victoria, BC",
  description:
    "Haircuts, fades, beard trims, and grooming services in Victoria, BC. View our full service menu with prices and durations. Walk in or call to book.",
  alternates: { canonical: "/services" },
};

const CATEGORY_SUBTITLES: Record<string, string> = {
  Haircuts: "Clippers · scissors · the works",
  Grooming: "Beards · shaves · finishing",
};

export default function ServicesPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Our Menu · Victoria, BC</div>
            <h1 className="serif">
              Barber services in <em>Victoria.</em>
            </h1>
          </div>
          <p className="lede">
            Expert haircuts, fades, and beard grooming tailored to your style.
            Not sure what to get? Choose &ldquo;Classic Cut&rdquo; and
            we&rsquo;ll customize it for you.
          </p>
        </div>

        <div className="menu-grid">
          {SERVICES.map((category) => (
            <div className="menu-col" key={category.category}>
              <h3 className="serif">{category.category}</h3>
              {CATEGORY_SUBTITLES[category.category] && (
                <div className="col-sub">
                  {CATEGORY_SUBTITLES[category.category]}
                </div>
              )}
              {category.items.map((service) => (
                <div className="menu-row" key={service.name}>
                  <div>
                    <div className="nm">{service.name}</div>
                    <div className="dur">{service.duration}</div>
                  </div>
                  <span className="pr serif">{service.price}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="menu-foot">
          <p className="note">
            Walk in 7 days a week, or call ahead — every cut includes a quick
            consultation so you leave with exactly the look you wanted.
          </p>
        </div>
      </div>
    </section>
  );
}
