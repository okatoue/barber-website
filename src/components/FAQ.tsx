"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/config";

const homepageFaqs = FAQ_ITEMS.filter((item) => item.homepage);

// Landing pages pass their topic key so each renders FAQs relevant to IT
// rather than the same three homepage items — those identical blocks were a
// large share of the vocabulary the landing pages had in common.
// With no `area`, this is the homepage subset, unchanged.
function faqsForArea(area?: string) {
  if (!area) return homepageFaqs;

  const matched = FAQ_ITEMS.filter((item) => item.areas?.includes(area));
  if (matched.length >= 3) return matched;

  // Unknown or thinly-tagged key: top up with homepage items, no duplicates,
  // so the block never renders sparse.
  const topUp = homepageFaqs.filter((item) => !matched.includes(item));
  return [...matched, ...topUp].slice(0, 3);
}

export default function FAQ({ area }: { area?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  // `area` is fixed for the lifetime of a page, so the list is stable and the
  // index held in `open` keeps pointing at the same item.
  const items = faqsForArea(area);

  return (
    <section className="section" id="faq" style={{ paddingTop: 0 }}>
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
          {items.map((item, i) => {
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
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <a href="/faq">See all FAQs &rarr;</a>
        </div>
      </div>
    </section>
  );
}
