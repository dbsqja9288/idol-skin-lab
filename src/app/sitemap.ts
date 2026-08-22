import type { MetadataRoute } from "next";
import { ALL_CODES } from "@/lib/engine";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = ["", "/type", "/about", "/legal/privacy", "/legal/terms"];
  return [
    ...fixed.map((p) => ({
      url: `${SITE_URL}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.6,
    })),
    ...ALL_CODES.map((code) => ({
      url: `${SITE_URL}/type/${code}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
