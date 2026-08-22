import Link from "next/link";
import type { Lang } from "@/data/types";
import { ALL_CODES } from "@/lib/engine";
import { getCopy, path } from "@/i18n";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

/** **굵게** 만 처리하는 아주 작은 마크다운. 번역문에서 글자를 강조할 때만 쓴다. */
function bold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <b key={i}>{part}</b> : part));
}

export function TypeIndexPage({ lang }: { lang: Lang }) {
  const c = getCopy(lang);
  const t = c.typeIndex;
  return (
    <div className="prose">
      <p className="eyebrow">{t.eyebrow}</p>
      <h1>{t.title}</h1>
      <p className="lead">{t.lede}</p>

      <h2>{t.howTitle}</h2>
      <ul>
        {t.how.map((line, i) => (
          <li key={i}>{bold(line)}</li>
        ))}
      </ul>

      <h2>{t.listTitle}</h2>
      <div className="typegrid">
        {ALL_CODES.map((code) => (
          <Link key={code} href={path(lang, `/type/${code}`)} prefetch={false}>
            <b>{code}</b>
            <span>{c.typeNames[code]}</span>
          </Link>
        ))}
      </div>

      <h2>{t.unsureTitle}</h2>
      <p>{t.unsureBody}</p>
      <p style={{ marginTop: 22 }}>
        <Link className="cta" href={path(lang, "")}>
          {c.typePage.cta}
        </Link>
      </p>
      <p style={{ marginTop: 40, fontSize: 13, opacity: 0.75 }}>{t.credit}</p>
    </div>
  );
}

const ABOUT = {
  en: {
    eyebrow: "About",
    title: "Why this exists",
    lead: "Most skin quizzes ask four questions and hand back “combination.” That word has never once helped anyone decide what to put on their face tonight.",
    blocks: [
      ["The framework",
        `${SITE_NAME} reads skin across four independent axes — oil production, reactivity, pigment response and structural ageing — which produces sixteen types rather than four. That four-axis approach follows the dermatological convention popularised by Dr. Leslie Baumann. The questions, the product matching and the routines are ours.`,
        "The reason it matters: dry and sensitive are not the same thing, and treating them the same way is how people end up with a shelf of products that fight each other. Separating the axes is what lets the recommendation get specific."],
      ["The products",
        "Everything recommended here is a Korean formula with real shelf presence in Seoul — not an export-only line built for overseas marketplaces. Matching is done against your four letters, not against what pays best. Prices are indicative and move with retailer.",
        "Where you can buy them depends on where you are. Olive Young Global ships to more than sixty countries; YesStyle and Stylevana reach almost everywhere else. We show the retailers that actually deliver to your region."],
      ["How the site pays for itself",
        "Some product links are affiliate links: if you buy through one, we earn a small commission and you pay exactly the same price. That commission never influences which product gets recommended for a given type — the matching logic is fixed in code, and you can see the reasoning on every card.", ""],
      ["About the idol sections",
        "Habits are described from published interviews and beauty features. No artist, agency or label is affiliated with or endorses this site, and no artist imagery is used anywhere on it. If you believe something is misattributed, write to us and we will correct or remove it.", ""],
      ["What this is not",
        "This is cosmetic guidance, not medical advice. Persistent acne, eczema, rosacea or pigmentation that is changing belongs with a dermatologist, not with a quiz.", ""],
      ["Contact", "Corrections, product suggestions and complaints:", ""],
    ],
  },
  es: {
    eyebrow: "Quiénes somos",
    title: "Por qué existe esto",
    lead: "Casi todos los tests de piel hacen cuatro preguntas y te devuelven «mixta». Esa palabra no ha ayudado nunca a nadie a decidir qué ponerse en la cara esta noche.",
    blocks: [
      ["El método",
        `${SITE_NAME} lee la piel en cuatro ejes independientes — producción de grasa, reactividad, respuesta al pigmento y envejecimiento estructural — y eso da dieciséis tipos en lugar de cuatro. Ese planteamiento de cuatro ejes sigue la convención dermatológica popularizada por la Dra. Leslie Baumann. Las preguntas, la selección de productos y las rutinas son nuestras.`,
        "Por qué importa: seca y sensible no son lo mismo, y tratarlas igual es como se acaba con un estante lleno de productos que se pelean entre sí. Separar los ejes es lo que permite que la recomendación sea concreta."],
      ["Los productos",
        "Todo lo que se recomienda aquí es una fórmula coreana que de verdad se vende en Seúl, no una línea creada solo para exportar. La selección se hace según tus cuatro letras, no según lo que más comisión deja. Los precios son orientativos y varían según la tienda.",
        "Dónde puedes comprarlos depende de dónde estés. Olive Young Global envía a más de sesenta países; YesStyle y Stylevana llegan a casi todo lo demás. Mostramos las tiendas que realmente entregan en tu región."],
      ["Cómo se paga este sitio",
        "Algunos enlaces de producto son de afiliado: si compras por uno, ganamos una pequeña comisión y tú pagas exactamente el mismo precio. Esa comisión nunca influye en qué producto se recomienda para cada tipo — la lógica está fija en el código y puedes leer el motivo en cada ficha.", ""],
      ["Sobre las secciones de idols",
        "Los hábitos están descritos a partir de entrevistas y reportajes de belleza publicados. Ningún artista, agencia o sello está afiliado a este sitio ni lo respalda, y no se usa ninguna imagen de artistas. Si crees que algo está mal atribuido, escríbenos y lo corregimos o lo retiramos.", ""],
      ["Lo que esto no es",
        "Esto es orientación cosmética, no consejo médico. El acné persistente, el eccema, la rosácea o unas manchas que están cambiando son cosa de un dermatólogo, no de un test.", ""],
      ["Contacto", "Correcciones, sugerencias de producto y quejas:", ""],
    ],
  },
} as const;

export function AboutPage({ lang }: { lang: Lang }) {
  const a = ABOUT[lang];
  const c = getCopy(lang);
  return (
    <div className="prose">
      <p className="eyebrow">{a.eyebrow}</p>
      <h1>{a.title}</h1>
      <p className="lead">{a.lead}</p>
      {a.blocks.map(([head, p1, p2], i) => (
        <section key={i}>
          <h2>{head}</h2>
          <p>
            {p1}
            {head === "Contact" || head === "Contacto" ? (
              <>
                {" "}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </>
            ) : null}
          </p>
          {p2 ? <p>{p2}</p> : null}
        </section>
      ))}
      <p style={{ marginTop: 26 }}>
        <Link className="cta" href={path(lang, "")}>
          {c.typePage.cta}
        </Link>
      </p>
    </div>
  );
}
