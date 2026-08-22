import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use" };

export default function Terms() {
  return (
    <div className="prose">
      <p className="eyebrow">Legal</p>
      <h1>Terms of Use</h1>
      <p className="lead">Use the site freely. Just do not mistake it for a doctor.</p>

      <h2>Not medical advice</h2>
      <p>
        {SITE_NAME} provides general cosmetic guidance for informational purposes. It does not diagnose, treat or prevent any
        condition. Persistent acne, eczema, rosacea, or any pigmentation that is changing in size, colour or shape should be
        assessed by a qualified dermatologist. Nothing here replaces that.
      </p>

      <h2>Patch testing</h2>
      <p>
        Introduce any new product to a small area first and wait 24 hours. Discontinue anything that stings, burns or causes a
        rash. You are responsible for what you apply to your skin.
      </p>

      <h2>Products and prices</h2>
      <p>
        Recommendations reflect our reading of publicly available formulation information. We do not manufacture, stock or ship
        anything, and we are not party to your purchase. Prices shown are indicative and set by the retailer.
      </p>

      <h2>Affiliate relationships</h2>
      <p>
        Some outbound product links are affiliate links and may earn us a commission at no additional cost to you. This is
        disclosed on the results page and in the footer of every page.
      </p>

      <h2>Third-party names</h2>
      <p>
        Brand names, product names and artist names are the property of their respective owners and are used here for
        identification and commentary only. No affiliation or endorsement is implied.
      </p>

      <h2>Liability</h2>
      <p>
        The site is provided &ldquo;as is&rdquo;. To the fullest extent permitted by law, we are not liable for any loss arising
        from use of it or from products purchased through links on it.
      </p>

      <h2>Contact</h2>
      <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
    </div>
  );
}
