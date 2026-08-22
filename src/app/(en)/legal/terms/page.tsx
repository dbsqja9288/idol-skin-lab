import type { Metadata } from "next";
import { LEGAL_TITLES, TermsPage } from "@/components/pages/Legal";

export const metadata: Metadata = {
  title: LEGAL_TITLES.en.terms,
  alternates: { canonical: "/legal/terms", languages: { en: "/legal/terms", es: "/es/legal/terms" } },
};

export default function Page() {
  return <TermsPage lang="en" />;
}
