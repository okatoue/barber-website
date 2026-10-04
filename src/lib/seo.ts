import type { Metadata } from "next";
import { SHOP } from "@/lib/config";

// Next.js replaces (not merges) the layout's openGraph object whenever a page
// sets its own, so a page that only passed { title, description } shipped with
// no og:image, og:type, og:site_name or og:url — and no twitter:image either.
// Every page builds its social tags through this helper instead.
const SHARE_IMAGE = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: `${SHOP.name}, Broadmead Village, Victoria BC`,
};

export function socialMetadata(
  path: string,
  title: string,
  description: string
): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: "en_CA",
      siteName: SHOP.name,
      url: path,
      title,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
