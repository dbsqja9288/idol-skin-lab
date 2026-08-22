import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReportView from "@/components/Report";
import { ALL_CODES, reportFromCode } from "@/lib/engine";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * 타입별 정적 페이지 16개.
 *
 * 이게 검색 유입의 핵심이다. "ORNT skin type", "oily resistant non-pigmented tight" 같은
 * 롱테일 질의를 잡고, 동시에 애드센스가 요구하는 '색인된 페이지 수'를 채운다.
 * 퀴즈 결과 화면과 같은 컴포넌트를 쓰므로 문구가 갈라지지 않는다.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_CODES.map((code) => ({ code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const report = reportFromCode(code.toUpperCase());
  if (!report) return {};
  const title = `${report.code} — ${report.name}`;
  const description = `${report.line} See the routine, the four axes and the K-beauty products matched to ${report.code}.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/type/${report.code}` },
    openGraph: { title: `${title} | ${SITE_NAME}`, description, url: `${SITE_URL}/type/${report.code}` },
  };
}

export default async function TypePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const report = reportFromCode(code.toUpperCase());
  if (!report) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${report.code} — ${report.name}`,
    description: report.line,
    url: `${SITE_URL}/type/${report.code}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="stage">
        <ReportView report={report} variant="page" />
      </div>
    </>
  );
}
