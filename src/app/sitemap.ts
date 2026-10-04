import type { MetadataRoute } from "next";
import { SHOP } from "@/lib/config";

export const dynamic = "force-static";

// No lastModified: the site rebuilds daily (to refresh the review count), and a
// build-time new Date() stamped every URL as changed every day — which teaches
// Google to ignore lastmod entirely. Omitting it is better than a false one.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SHOP.siteUrl;
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/barbers`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/location`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/gallery`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/royal-oak-barber-shop`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/beard-trim-saanich`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/gordon-head-barber-shop`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cordova-bay-barber-shop`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/cadboro-bay-barber-shop`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/oak-bay-barber-shop`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/skin-fade-victoria`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/kids-haircut-victoria`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/hot-towel-shave-victoria`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
