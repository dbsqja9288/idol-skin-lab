import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Who makes Idol Skin Lab, where the diagnosis framework comes from, and how the site pays for itself.",
};

export default function About() {
  return (
    <div className="prose">
      <p className="eyebrow">About</p>
      <h1>Why this exists</h1>
      <p className="lead">
        Most skin quizzes ask four questions and hand back &ldquo;combination.&rdquo; That word has never once helped anyone
        decide what to put on their face tonight.
      </p>

      <h2>The framework</h2>
      <p>
        {SITE_NAME} reads skin across four independent axes — oil production, reactivity, pigment response and structural
        ageing — which produces sixteen types rather than four. That four-axis approach follows the dermatological convention
        popularised by Dr. Leslie Baumann. The questions, the product matching and the routines are ours.
      </p>
      <p>
        The reason it matters: dry and sensitive are not the same thing, and treating them the same way is how people end up
        with a shelf of products that fight each other. Separating the axes is what lets the recommendation get specific.
      </p>

      <h2>The products</h2>
      <p>
        Everything recommended here is a Korean formula with real shelf presence in Seoul — not an export-only line built for
        overseas marketplaces. Matching is done against your four letters, not against what pays best. Prices are indicative
        and move with retailer.
      </p>

      <h2>How the site pays for itself</h2>
      <p>
        Some product links are affiliate links: if you buy through one, we earn a small commission and you pay exactly the same
        price. That commission never influences which product gets recommended for a given type — the matching logic is fixed
        in code, and you can see the reasoning on every card.
      </p>

      <h2>About the idol sections</h2>
      <p>
        Habits are described from published interviews and beauty features. No artist, agency or label is affiliated with or
        endorses this site, and no artist imagery is used anywhere on it. If you believe something is misattributed, write to
        us and we will correct or remove it.
      </p>

      <h2>What this is not</h2>
      <p>
        This is cosmetic guidance, not medical advice. Persistent acne, eczema, rosacea or pigmentation that is changing
        belongs with a dermatologist, not with a quiz.
      </p>

      <h2>Contact</h2>
      <p>
        Corrections, product suggestions and complaints: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p style={{ marginTop: 26 }}>
        <Link className="cta" href="/">Read my skin</Link>
      </p>
    </div>
  );
}
