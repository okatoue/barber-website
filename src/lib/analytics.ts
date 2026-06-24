// ============================================================
// ANALYTICS CONFIG — Google Analytics 4
// ============================================================
// Your GA4 Measurement ID. Override in production by setting the
// NEXT_PUBLIC_GA_ID environment variable; otherwise this default is used.
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ?? "G-JR69RPGJ8Y";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
