import Quiz from "@/components/Quiz";
import { getCopy } from "@/i18n";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default function Home() {
  const c = getCopy("es");
  const jsonLd = {
    "@context": "https://schema.org", "@type": "WebSite",
    name: SITE_NAME, url: `${SITE_URL}/es`, inLanguage: "es", description: c.meta.description,
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="stage"><Quiz lang="es" /></div>
    </>
  );
}
