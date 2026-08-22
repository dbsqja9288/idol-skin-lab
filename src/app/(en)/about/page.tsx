import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/Prose";

export const metadata: Metadata = {
  title: "About",
  description: "Who makes Idol Skin Lab, where the diagnosis framework comes from, and how the site pays for itself.",
  alternates: { canonical: "/about", languages: { en: "/about", es: "/es/about" } },
};

export default function Page() {
  return <AboutPage lang="en" />;
}
