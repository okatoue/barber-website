import type { MetadataRoute } from "next";
import { SHOP } from "@/lib/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SHOP.siteUrl;
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/barbers`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/location`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/royal-oak-barber-shop`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/beard-trim-saanich`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];
}
