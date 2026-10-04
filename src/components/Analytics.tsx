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

  // Track taps on any "Call" or "Get directions" button. One delegated
  // listener catches every tel: link and every data-directions-location
  // link on the site — current and future. The data-*-location attribute
  // tells us which button was tapped.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (typeof window.gtag !== "function") return;
      // Directions taps — the GBP's biggest action, so measure the site's too.
      const dir = target?.closest?.("a[data-directions-location]");
      if (dir) {
        window.gtag("event", "directions_click", {
          directions_location: dir.getAttribute("data-directions-location"),
        });
        return;
      }
      const link = target?.closest?.('a[href^="tel:"]');
      if (!link) return;
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
      {/* The ~150 KB gtag.js library waits for the page to finish loading —
          it cost ~0.8s of main-thread blocking during render (Lighthouse,
          Oct 2026). Nothing is lost: the tiny inline init below defines
          gtag() as a dataLayer queue right away, so the first page_view and
          any early clicks are queued and sent once the library arrives. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
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
