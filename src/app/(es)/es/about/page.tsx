import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/Prose";

export const metadata: Metadata = {
  title: "Quiénes somos",
  description: "Quién hace Idol Skin Lab, de dónde viene el método de diagnóstico y cómo se paga el sitio.",
  alternates: { canonical: "/es/about", languages: { en: "/about", es: "/es/about" } },
};

export default function Page() {
  return <AboutPage lang="es" />;
}
