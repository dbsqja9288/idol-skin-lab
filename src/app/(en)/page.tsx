import Quiz from "@/components/Quiz";
import { getCopy } from "@/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default function Home() {
  const c = getCopy("en");
  const jsonLd = {
    "@context": "https://schema.org", "@type": "WebSite",
    name: SITE_NAME, url: SITE_URL, inLanguage: "en", description: c.meta.description,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="stage"><Quiz lang="en" /></div>
    </>
  );
}
