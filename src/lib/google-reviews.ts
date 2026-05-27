// ============================================================
// GOOGLE REVIEWS — live rating + review count from Google Places
// ============================================================
//
// Pulls the shop's star rating and total review count from the
// Google Places API (New) so they no longer need to be updated by
// hand. Results are cached for 24h. If the API key / Place ID are
// not configured, or the request fails, it falls back to the values
// in config.ts so the site always renders.
//
// To activate, set these in `.env.local` (see README / SETUP notes):
//   GOOGLE_PLACES_API_KEY=your_key
//   GOOGLE_PLACE_ID=your_place_id
//
// This module is server-only (it reads a secret key). Never import it
// into a "use client" component — pass its result down as a prop.

import "server-only";
import { SHOP } from "@/lib/config";

export type GoogleStats = {
  /** One-decimal string, e.g. "4.9" */
  rating: string;
  /** Total number of Google reviews */
  reviewCount: number;
  /** true when the numbers came from the live API, false when from config */
  live: boolean;
};

const REVALIDATE_SECONDS = 60 * 60 * 24; // refresh at most once per day

const fallback: GoogleStats = {
  rating: SHOP.googleRating,
  reviewCount: SHOP.googleReviewCount,
  live: false,
};

export async function getGoogleStats(): Promise<GoogleStats> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  // Not configured yet — use the hand-entered values from config.ts.
  if (!apiKey || !placeId) return fallback;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount",
        },
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );

    if (!res.ok) return fallback;

    const data: { rating?: number; userRatingCount?: number } =
      await res.json();

    if (typeof data.rating !== "number" || typeof data.userRatingCount !== "number") {
      return fallback;
    }

    return {
      rating: data.rating.toFixed(1),
      reviewCount: data.userRatingCount,
      live: true,
    };
  } catch {
    // Network error, quota, etc. — degrade gracefully.
    return fallback;
  }
}
