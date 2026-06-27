import type { Metadata } from "next";
import { FAQ_ITEMS } from "@/lib/config";

export const metadata: Metadata = {
  title: "Barber FAQ — Victoria, BC",
  description:
    "Answers to common questions about haircuts, fades, beard trims, and visiting our barber shop in Broadmead Village, Saanich. Walk-ins welcome 7 days a week.",
  alternates: { canonical: "/faq" },
};

const CATEGORY_ORDER = ["Visiting", "Pricing", "Kids", "Services"];

export default function FaqPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Questions &amp; Answers · Victoria, BC</div>
            <h1 className="serif">
              Frequently asked <em>questions.</em>
            </h1>
          </div>
          <p className="lede">
            Everything you need to know before your visit — walk-ins, pricing,
            and what to expect at the shop.
          </p>
        </div>

        {CATEGORY_ORDER.map((category) => {
          const items = FAQ_ITEMS.filter((item) => item.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category} style={{ marginBottom: 48 }}>
              <div className="eyebrow" style={{ padding: "0 4px 16px" }}>
                {category}
              </div>
              <div className="faq-list">
                {items.map((item) => (
                  <div key={item.question} className="faq-item">
                    <h3
                      className="serif"
                      style={{
                        fontSize: 18,
                        padding: "24px 4px 8px",
                        margin: 0,
                        lineHeight: 1.3,
                        color: "var(--ink)",
                      }}
                    >
                      {item.question}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        padding: "0 4px 26px",
                        color: "var(--muted)",
                        fontSize: 15,
                        lineHeight: 1.65,
                        maxWidth: "70ch",
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
