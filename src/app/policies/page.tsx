import type { Metadata } from "next";
import { POLICIES, SHOP } from "@/lib/config";

export const metadata: Metadata = {
  title: "Policies",
  description: `${SHOP.name} booking policies — cancellations, late arrivals, no-shows, and payment information.`,
};

export default function PoliciesPage() {
  return (
    <div className="section">
      <h1 className="section-heading">Shop Policies</h1>
      <p className="section-subheading">
        Please review our policies before your visit. We appreciate your
        understanding.
      </p>

      <div className="max-w-3xl mx-auto space-y-6">
        {POLICIES.map((policy, i) => (
          <div key={i} className="card">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-3">
              <span className="w-2 h-2 bg-gold rounded-full" />
              {policy.title}
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              {policy.content}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-text-muted text-sm mb-4">
          Questions? Give us a call.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={`tel:${SHOP.phone.replace(/[^+\d]/g, "")}`}
            className="btn-secondary"
          >
            Call {SHOP.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
