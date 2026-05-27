"use client";

import { useState, useEffect } from "react";
import { SHOP } from "@/lib/config";

export default function MobileBottomBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg/95 backdrop-blur-md border-t border-border px-4 py-3 flex gap-3">
      <a
        href={SHOP.booking.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary flex-1 text-center py-3"
      >
        Book Now
      </a>
      <a
        href={`tel:${SHOP.phone.replace(/[^+\d]/g, "")}`}
        className="btn-secondary flex-none px-5 py-3"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call
      </a>
    </div>
  );
}
