import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/Prose";

export const metadata: Metadata = {
  title: "소개",
  description: "Idol Skin Lab을 만드는 사람, 진단 방식의 출처, 그리고 이 사이트가 어떻게 유지되는지.",
  alternates: { canonical: "/ko/about", languages: { en: "/about", es: "/es/about", ko: "/ko/about" } },
};

export default function Page() {
  return <AboutPage lang="ko" />;
}
