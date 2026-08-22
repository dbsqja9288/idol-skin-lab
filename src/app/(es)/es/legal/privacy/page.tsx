import type { Metadata } from "next";
import { LEGAL_TITLES, PrivacyPage } from "@/components/pages/Legal";

export const metadata: Metadata = {
  title: LEGAL_TITLES.es.privacy,
  alternates: { canonical: "/es/legal/privacy", languages: { en: "/legal/privacy", es: "/es/legal/privacy" } },
};

export default function Page() {
  return <PrivacyPage lang="es" />;
}
