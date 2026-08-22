import Quiz from "@/components/Quiz";
import { SITE_NAME, SITE_URL } from "@/lib/site";

/** 홈은 정적이고, 퀴즈만 클라이언트에서 돈다. 검색엔진은 히어로 문구를 그대로 읽는다. */
export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "A K-beauty skin diagnosis in ten questions. Four clinical axes, sixteen skin types, and matched Korean formulas.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="stage">
        <Quiz />
      </div>
    </>
  );
}
