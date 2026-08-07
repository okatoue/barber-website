"use client";

import { useState, useEffect } from "react";
import { SHOP } from "@/lib/config";

export default function MobileBottomBar() {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide the bar once the footer (which has its own phone number) scrolls
  // into view, so the sticky bar never overlaps footer content.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) =>
      setFooterVisible(entry.isIntersecting)
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!scrolled || footerVisible) return null;

  return (
    <div className="mobile-callbar">
      <a
        href={`tel:${SHOP.phone.replace(/[^+\d]/g, "")}`}
        className="btn btn-primary"
        data-call-location="mobile_bar"
      >
        <svg
          className="mobile-callbar-icon"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        Call Now
      </a>
    </div>
  );
}
