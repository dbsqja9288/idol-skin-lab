import type { Metadata } from "next";
import { TypeIndexPage } from "@/components/pages/Prose";
import { getCopy } from "@/i18n";

const c = getCopy("ko");
export const metadata: Metadata = {
  title: c.typeIndex.metaTitle,
  description: c.typeIndex.metaDescription,
  alternates: { canonical: "/ko/type", languages: { en: "/type", es: "/es/type", ko: "/ko/type" } },
};

export default function Page() {
  return <TypeIndexPage lang="ko" />;
}
