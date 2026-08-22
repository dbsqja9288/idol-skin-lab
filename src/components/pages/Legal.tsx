import type { Lang } from "@/data/types";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

type Doc = { eyebrow: string; title: string; lead: string; sections: [string, string][]; mailIn: string };

const PRIVACY: Record<Lang, Doc> = {
  en: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    lead: "Short version: your quiz answers never leave your browser, and we do not ask who you are.",
    mailIn: "Your rights",
    sections: [
      ["Quiz answers",
        "Your answers are held in your browser's memory while you take the test and are used only to calculate the result shown on the screen. They are not sent to our servers, not stored, and not linked to you. Closing the tab discards them."],
      ["Analytics",
        "We use Vercel Analytics to count page views and see which pages people reach. It is cookie-free and does not build a profile of individual visitors. If Google AdSense is enabled on this site, Google may set cookies to serve and measure ads; you can manage that at Google Ad Settings."],
      ["Affiliate links",
        "Product buttons lead to retailers such as Amazon, Olive Young Global, YesStyle and Stylevana, and carry a tracking parameter so a purchase can be credited to us. Those retailers apply their own privacy policies once you leave this site. We receive only aggregate commission reports — never your name, address or payment details."],
      ["Email",
        "If you submit an email address for the four-week plan, it is used to send that plan and related follow-ups, and nothing else. We do not sell or share it. Every message includes an unsubscribe link."],
      ["Your rights",
        "Because we hold almost nothing about you, there is usually nothing to delete. If you have sent us an email address and want it removed, write to"],
      ["Changes",
        `If this policy changes materially, the updated version will be posted here with a new date. ${SITE_NAME} last updated this policy in 2026.`],
    ],
  },
  es: {
    eyebrow: "Legal",
    title: "Política de privacidad",
    lead: "En corto: tus respuestas del test nunca salen de tu navegador y no te preguntamos quién eres.",
    mailIn: "Tus derechos",
    sections: [
      ["Las respuestas del test",
        "Tus respuestas se guardan en la memoria de tu navegador mientras haces el test y solo sirven para calcular el resultado que ves en pantalla. No se envían a nuestros servidores, no se almacenan y no se vinculan a ti. Al cerrar la pestaña desaparecen."],
      ["Analítica",
        "Usamos Vercel Analytics para contar visitas y ver a qué páginas llega la gente. No usa cookies ni crea un perfil de cada visitante. Si Google AdSense está activo en este sitio, Google puede usar cookies para mostrar y medir anuncios; puedes gestionarlo en la configuración de anuncios de Google."],
      ["Enlaces de afiliado",
        "Los botones de producto llevan a tiendas como Amazon, Olive Young Global, YesStyle y Stylevana, con un parámetro de seguimiento para que una compra se nos pueda atribuir. Esas tiendas aplican sus propias políticas de privacidad en cuanto sales de aquí. Nosotros solo recibimos informes agregados de comisiones: nunca tu nombre, dirección ni datos de pago."],
      ["Correo electrónico",
        "Si nos dejas un correo para el plan de cuatro semanas, se usa para enviarte ese plan y sus seguimientos, y nada más. No lo vendemos ni lo compartimos. Todos los mensajes llevan enlace para darte de baja."],
      ["Tus derechos",
        "Como casi no guardamos nada tuyo, normalmente no hay nada que borrar. Si nos has dejado un correo y quieres que lo eliminemos, escribe a"],
      ["Cambios",
        `Si esta política cambia de forma relevante, publicaremos aquí la versión actualizada con su fecha. ${SITE_NAME} actualizó esta política por última vez en 2026.`],
    ],
  },
};

const TERMS: Record<Lang, Doc> = {
  en: {
    eyebrow: "Legal",
    title: "Terms of Use",
    lead: "Use the site freely. Just do not mistake it for a doctor.",
    mailIn: "Contact",
    sections: [
      ["Not medical advice",
        `${SITE_NAME} provides general cosmetic guidance for informational purposes. It does not diagnose, treat or prevent any condition. Persistent acne, eczema, rosacea, or any pigmentation that is changing in size, colour or shape should be assessed by a qualified dermatologist. Nothing here replaces that.`],
      ["Patch testing",
        "Introduce any new product to a small area first and wait 24 hours. Discontinue anything that stings, burns or causes a rash. You are responsible for what you apply to your skin."],
      ["Products, prices and shipping",
        "Recommendations reflect our reading of publicly available formulation information. We do not manufacture, stock or ship anything, and we are not party to your purchase. Prices shown are indicative and set by the retailer. Customs duties and import VAT are set by your country, not by us, and can be charged on top of the price you see — the European Union in particular charges VAT on imported orders regardless of value."],
      ["Affiliate relationships",
        "Some outbound product links are affiliate links and may earn us a commission at no additional cost to you. This is disclosed on the results page and in the footer of every page."],
      ["Third-party names",
        "Brand names, product names and artist names are the property of their respective owners and are used here for identification and commentary only. No affiliation or endorsement is implied."],
      ["Liability",
        "The site is provided “as is”. To the fullest extent permitted by law, we are not liable for any loss arising from use of it or from products purchased through links on it."],
      ["Contact", ""],
    ],
  },
  es: {
    eyebrow: "Legal",
    title: "Términos de uso",
    lead: "Usa el sitio con libertad. Solo no lo confundas con un médico.",
    mailIn: "Contacto",
    sections: [
      ["Esto no es consejo médico",
        `${SITE_NAME} ofrece orientación cosmética general con fines informativos. No diagnostica, trata ni previene ninguna afección. El acné persistente, el eccema, la rosácea o cualquier mancha que cambie de tamaño, color o forma debe valorarlos un dermatólogo. Nada de lo que hay aquí sustituye eso.`],
      ["Prueba de parche",
        "Aplica cualquier producto nuevo en una zona pequeña y espera 24 horas. Deja de usar lo que escueza, arda o provoque sarpullido. Tú eres responsable de lo que te pones en la piel."],
      ["Productos, precios y envíos",
        "Las recomendaciones reflejan nuestra lectura de la información de formulación disponible públicamente. No fabricamos, no almacenamos y no enviamos nada, y no somos parte de tu compra. Los precios mostrados son orientativos y los fija la tienda. Los aranceles y el IVA de importación los fija tu país, no nosotros, y pueden sumarse al precio que ves — en la Unión Europea en concreto se cobra IVA sobre los pedidos importados sea cual sea su importe."],
      ["Relaciones de afiliación",
        "Algunos enlaces de producto son de afiliado y pueden generarnos una comisión sin coste adicional para ti. Se indica en la página de resultados y en el pie de todas las páginas."],
      ["Nombres de terceros",
        "Los nombres de marcas, productos y artistas pertenecen a sus respectivos titulares y se usan aquí solo para identificarlos y comentarlos. No se sugiere ninguna afiliación ni patrocinio."],
      ["Responsabilidad",
        "El sitio se ofrece «tal cual». En la máxima medida permitida por la ley, no somos responsables de ninguna pérdida derivada de su uso ni de los productos comprados a través de sus enlaces."],
      ["Contacto", ""],
    ],
  },
};

function Render({ doc }: { doc: Doc }) {
  return (
    <div className="prose">
      <p className="eyebrow">{doc.eyebrow}</p>
      <h1>{doc.title}</h1>
      <p className="lead">{doc.lead}</p>
      {doc.sections.map(([head, body]) => (
        <section key={head}>
          <h2>{head}</h2>
          <p>
            {body}
            {head === doc.mailIn ? (
              <>
                {body ? " " : ""}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </>
            ) : null}
          </p>
        </section>
      ))}
    </div>
  );
}

export function PrivacyPage({ lang }: { lang: Lang }) {
  return <Render doc={PRIVACY[lang]} />;
}
export function TermsPage({ lang }: { lang: Lang }) {
  return <Render doc={TERMS[lang]} />;
}

export const LEGAL_TITLES: Record<Lang, { privacy: string; terms: string }> = {
  en: { privacy: "Privacy Policy", terms: "Terms of Use" },
  es: { privacy: "Política de privacidad", terms: "Términos de uso" },
};
