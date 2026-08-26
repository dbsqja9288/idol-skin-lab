import type { Metadata } from "next";
import { LEGAL_TITLES, PrivacyPage } from "@/components/pages/Legal";

export const metadata: Metadata = {
  title: LEGAL_TITLES.ko.privacy,
  alternates: { canonical: "/ko/legal/privacy", languages: { en: "/legal/privacy", es: "/es/legal/privacy", ko: "/ko/legal/privacy" } },
};

export default function Page() {
  return <PrivacyPage lang="ko" />;
}
