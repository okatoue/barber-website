"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";

export default function Analytics() {
  const pathname = usePathname();

  // Send a page_view on every route change. We disable GA's automatic
  // page_view (send_page_view: false below) and fire it here instead, so
  // client-side navigations in the App Router are counted correctly.
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", { page_path: pathname });
  }, [pathname]);

  // Track taps on any "Call" button. One delegated listener catches every
  // tel: link on the site — current and future. The data-call-location
  // attribute tells us which button was tapped.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href^="tel:"]');
      if (!link) return;
      if (typeof window.gtag !== "function") return;
      window.gtag("event", "call_click", {
        call_location: link.getAttribute("data-call-location") || "unknown",
        link_url: link.getAttribute("href"),
      });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });`}
      </Script>
    </>
  );
}
