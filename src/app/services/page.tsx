import type { Metadata } from "next";
import { SERVICES } from "@/lib/config";

export const metadata: Metadata = {
  title: "Barber Services in Victoria, BC",
  description:
    "Haircuts, fades, beard trims, and grooming services in Victoria, BC. View our full service menu with prices and durations. Book online instantly.",
};

export default function ServicesPage() {
  return (
    <div className="section">
      <h1 className="section-heading">Barber Services in Victoria, BC</h1>
      <p className="section-subheading">
        Expert haircuts, fades, and beard grooming tailored to your style.
        Not sure what to book? Choose &ldquo;Classic Cut&rdquo; and
        we&rsquo;ll customize it for you.
      </p>

      <div className="max-w-4xl mx-auto space-y-12">
        {SERVICES.map((category) => (
          <div key={category.category}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-gold rounded-full" />
              {category.category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.items.map((service) => (
                <div
                  key={service.name}
                  className="card flex flex-col gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{service.name}</h3>
                    {service.description && (
                      <p className="text-sm text-text-muted mt-1">
                        {service.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right">
                      <span className="text-gold font-semibold">
                        {service.price}
                      </span>
                      <br />
                      <span className="text-xs text-text-muted">
                        {service.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Not sure CTA */}
      <div className="max-w-4xl mx-auto mt-12">
        <div className="card bg-gold/5 border-gold/20 text-center py-8">
          <h3 className="text-lg font-semibold mb-2">Not sure what to book?</h3>
          <p className="text-text-muted text-sm">
            Choose &ldquo;Classic Cut&rdquo; or
            &ldquo;Consultation&rdquo; and your barber will customize it for
            you.
          </p>
        </div>
      </div>
    </div>
  );
}
