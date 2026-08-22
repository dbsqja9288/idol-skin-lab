import type { MetadataRoute } from "next";
import { ALL_CODES } from "@/lib/engine";
import { LANGS, path } from "@/i18n";
import { SITE_URL } from "@/lib/site";

/** 두 언어 전부를 넣고, 각 URL에 hreflang 대체본을 달아준다. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/type", "/about", "/legal/privacy", "/legal/terms", ...ALL_CODES.map((c) => `/type/${c}`)];

  return LANGS.flatMap((lang) =>
    routes.map((r) => ({
      url: `${SITE_URL}${path(lang, r)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : r.startsWith("/type/") ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(LANGS.map((l) => [l, `${SITE_URL}${path(l, r)}`])),
      },
    })),
  );
}
