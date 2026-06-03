"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/config";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section" id="faq" style={{ paddingTop: 0 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow" />
            <h2 className="serif">
              Good to <em>know.</em>
            </h2>
          </div>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </button>
                <div className="faq-a">
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
