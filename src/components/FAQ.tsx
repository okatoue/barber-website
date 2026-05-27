"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/config";

function FAQItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-medium text-sm md:text-base pr-4 group-hover:text-gold transition-colors">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-gold shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? "max-h-96 pb-5" : "max-h-0"}`}
      >
        <p className="text-sm text-text-muted leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section">
      <h2 className="section-heading">Frequently Asked Questions</h2>
      <p className="section-subheading">
        Everything you need to know before your visit.
      </p>

      <div className="max-w-3xl mx-auto">
        {FAQ_ITEMS.map((item, i) => (
          <FAQItem
            key={i}
            question={item.question}
            answer={item.answer}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
