import type { Metadata } from "next";
import RootShell from "@/components/RootShell";
import { getCopy } from "@/i18n";
import { SITE_NAME, SITE_URL, verificationTags } from "@/lib/site";
import "../globals.css";

const c = getCopy("ko");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — ${c.meta.tagline}`, template: `%s | ${SITE_NAME}` },
  description: c.meta.description,
  keywords: c.meta.keywords,
  alternates: { canonical: "/ko", languages: { en: "/", es: "/es", ko: "/ko" } },
  openGraph: {
    type: "website", siteName: SITE_NAME, locale: "ko_KR",
    title: `${SITE_NAME} — ${c.meta.tagline}`,
    description: c.meta.description,
  },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} — ${c.meta.tagline}`, description: c.meta.description },
  verification: { other: verificationTags() },
};

export default function KoLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ko">{children}</RootShell>;
}
