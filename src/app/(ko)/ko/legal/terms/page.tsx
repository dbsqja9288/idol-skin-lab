import type { Metadata } from "next";
import { LEGAL_TITLES, TermsPage } from "@/components/pages/Legal";

export const metadata: Metadata = {
  title: LEGAL_TITLES.ko.terms,
  alternates: { canonical: "/ko/legal/terms", languages: { en: "/legal/terms", es: "/es/legal/terms", ko: "/ko/legal/terms" } },
};

export default function Page() {
  return <TermsPage lang="ko" />;
}
