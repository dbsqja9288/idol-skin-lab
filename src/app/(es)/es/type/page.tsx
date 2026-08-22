import type { Metadata } from "next";
import { TypeIndexPage } from "@/components/pages/Prose";
import { getCopy } from "@/i18n";

const c = getCopy("es");
export const metadata: Metadata = {
  title: c.typeIndex.metaTitle,
  description: c.typeIndex.metaDescription,
  alternates: { canonical: "/es/type", languages: { en: "/type", es: "/es/type" } },
};

export default function Page() {
  return <TypeIndexPage lang="es" />;
}
