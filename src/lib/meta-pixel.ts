// ============================================================
// META PIXEL CONFIG — Facebook / Instagram ads
// ============================================================
// Your Meta Pixel (dataset) ID from Events Manager. Unlike GA there is
// no default: set NEXT_PUBLIC_FB_PIXEL_ID at build time to switch the
// pixel on. Left unset, <MetaPixel /> renders nothing and no Meta
// script is loaded at all.
//
// This site is a static export, so the value is inlined at build time —
// set it in the deploy workflow's env, not on the host.
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
