import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { getCopy } from "@/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "../globals.css";

const c = getCopy("en");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — ${c.meta.tagline}`, template: `%s | ${SITE_NAME}` },
  description: c.meta.description,
  keywords: c.meta.keywords,
  alternates: { canonical: "/", languages: { en: "/", es: "/es" } },
  openGraph: {
    type: "website", siteName: SITE_NAME, locale: "en_US",
    title: `${SITE_NAME} — ${c.meta.tagline}`,
    description: c.meta.description,
  },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} — ${c.meta.tagline}`, description: c.meta.description },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_ADSENSE_CLIENT
      ? { "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT }
      : {},
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
