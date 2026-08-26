import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReportView from "@/components/Report";
import { ALL_CODES, reportFromCode } from "@/lib/engine";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_CODES.map((code) => ({ code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const report = reportFromCode(code.toUpperCase(), "ko");
  if (!report) return {};
  const title = `${report.code} — ${report.name}`;
  const description = `${report.line} ${report.code} 타입에 맞는 루틴, 네 개의 축, 그리고 한국 화장품 추천까지 확인해봐.`;
  return {
    title,
    description,
    alternates: {
      canonical: `/ko/type/${report.code}`,
      languages: { en: `/type/${report.code}`, es: `/es/type/${report.code}`, ko: `/ko/type/${report.code}` },
    },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url: `${SITE_URL}/ko/type/${report.code}` },
  };
}

export default async function TypePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const report = reportFromCode(code.toUpperCase(), "ko");
  if (!report) notFound();

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: `${report.code} — ${report.name}`, description: report.line,
    inLanguage: "ko", url: `${SITE_URL}/ko/type/${report.code}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="stage"><ReportView report={report} variant="page" /></div>
    </>
  );
}
