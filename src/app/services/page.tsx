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

const SERVICE_DETAILS: { name: string; description: string }[] = [
  {
    name: "Skin Fade",
    description:
      "A skin fade blended by hand for a sharp, clean finish — low, mid, or high, cut to how you like it. Popular with guys across Broadmead and Royal Oak who want a look that grows out clean.",
  },
  {
    name: "Haircut & Fade",
    description:
      "Classic men's haircuts finished with a tapered or faded edge, tailored to your preference. A neighbourhood cut for Broadmead Village and the wider Saanich area.",
  },
  {
    name: "Beard Trim",
    description:
      "Beard shaping and trims that keep your facial hair tidy and defined. Finished with a clean lineup along the cheeks and neck.",
  },
  {
    name: "Straight Razor Shave",
    description:
      "A traditional straight razor shave for the closest, smoothest finish you can get. A real barbershop experience most quick-cut chains nearby don't offer.",
  },
  {
    name: "Hot Towel Shave",
    description:
      "Warm lather and a hot towel to soften the skin, finished with a straight razor. Relaxing, precise, and one of the standout services at the shop.",
  },
  {
    name: "Kids' Haircut",
    description:
      "Patient, friendly haircuts for kids and teens, whether it's a first cut or a regular trim for school. A no-stress chair for younger clients in the Broadmead and Royal Oak community.",
  },
  {
    name: "Beard Lineup / Edge-Up",
    description:
      "Crisp edge-ups for your hairline and beard, finished with detail. Quick and sharp to keep you tidy between full cuts.",
  },
];

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

        <div className="section-head" style={{ marginTop: 80 }}>
          <div>
            <div className="eyebrow">What we do · Broadmead &amp; Royal Oak</div>
            <h2 className="serif">Our services in detail</h2>
          </div>
        </div>

        <div className="menu-col" style={{ maxWidth: 820 }}>
          {SERVICE_DETAILS.map((service, i) => (
            <div
              key={service.name}
              style={{
                padding: "22px 0",
                borderTop: i === 0 ? "none" : "1px dashed var(--hairline)",
              }}
            >
              <h3 className="serif">{service.name}</h3>
              <p
                style={{
                  margin: "8px 0 0",
                  color: "var(--muted)",
                  fontSize: 16,
                  lineHeight: 1.55,
                  maxWidth: "62ch",
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
