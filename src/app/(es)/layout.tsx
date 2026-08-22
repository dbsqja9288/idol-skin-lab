import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { getCopy } from "@/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "../globals.css";

const c = getCopy("es");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — ${c.meta.tagline}`, template: `%s | ${SITE_NAME}` },
  description: c.meta.description,
  keywords: c.meta.keywords,
  alternates: { canonical: "/es", languages: { en: "/", es: "/es" } },
  openGraph: {
    type: "website", siteName: SITE_NAME, locale: "es_ES",
    title: `${SITE_NAME} — ${c.meta.tagline}`,
    description: c.meta.description,
  },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} — ${c.meta.tagline}`, description: c.meta.description },
};

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>;
}
