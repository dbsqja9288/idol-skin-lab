import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReportView from "@/components/Report";
import { ALL_CODES, reportFromCode } from "@/lib/engine";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * 타입별 정적 페이지 16개 — 검색 유입의 핵심.
 * 코드(ORNT 등)는 언어와 무관하므로 /type/ORNT 와 /es/type/ORNT 가 짝을 이룬다.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_CODES.map((code) => ({ code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const report = reportFromCode(code.toUpperCase(), "en");
  if (!report) return {};
  const title = `${report.code} — ${report.name}`;
  const description = `${report.line} See the routine, the four axes and the K-beauty products matched to ${report.code}.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/type/${report.code}`,
      languages: { en: `/type/${report.code}`, es: `/es/type/${report.code}` },
    },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url: `${SITE_URL}/type/${report.code}` },
  };
}

export default async function TypePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const report = reportFromCode(code.toUpperCase(), "en");
  if (!report) notFound();

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: `${report.code} — ${report.name}`, description: report.line,
    inLanguage: "en", url: `${SITE_URL}/type/${report.code}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="stage"><ReportView report={report} variant="page" /></div>
    </>
  );
}
