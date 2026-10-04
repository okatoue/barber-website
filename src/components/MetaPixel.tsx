"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { FB_PIXEL_ID } from "@/lib/meta-pixel";

export default function MetaPixel() {
  const pathname = usePathname();
  const isFirstRun = useRef(true);

  // The init snippet below fires the first PageView itself, so skip the
  // mount run here or the landing page counts twice. Every client-side
  // route change after that fires from this effect.
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (!FB_PIXEL_ID) return;
    window.fbq?.("track", "PageView");
  }, [pathname]);

  // Track taps on any "Call" button as a Contact event — a phone call is
  // the closest thing this site has to a conversion. One delegated
  // listener catches every tel: link, current and future, the same way
  // Analytics.tsx does for GA4.
  useEffect(() => {
    if (!FB_PIXEL_ID) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Directions taps map to Meta's standard FindLocation event.
      const dir = target?.closest?.("a[data-directions-location]");
      if (dir) {
        window.fbq?.("track", "FindLocation", {
          directions_location: dir.getAttribute("data-directions-location"),
        });
        return;
      }
      const link = target?.closest?.('a[href^="tel:"]');
      if (!link) return;
      window.fbq?.("track", "Contact", {
        call_location: link.getAttribute("data-call-location") || "unknown",
      });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  if (!FB_PIXEL_ID) return null;

  // This is Meta's standard base code split in two. The inline part defines
  // the fbq() queue immediately, so init, PageView and early Contact events
  // are recorded from the first moment. The ~200 KB fbevents.js library,
  // which the stock snippet injects straight away, is the single biggest
  // main-thread cost on the site (~1.4s blocking, Lighthouse Oct 2026), so it
  // loads after the page has finished loading and then flushes the queue.
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f){if(f.fbq)return;var n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[]}(window);
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <Script
        src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="lazyOnload"
      />
    </>
  );
}
