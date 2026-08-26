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
  ko: {
    eyebrow: "법적 고지",
    title: "개인정보 처리방침",
    lead: "짧게 말하면: 테스트 답변은 브라우저 밖으로 나가지 않고, 당신이 누구인지 묻지 않습니다.",
    mailIn: "이용자의 권리",
    sections: [
      ["테스트 답변",
        "답변은 테스트를 진행하는 동안 브라우저 메모리에만 있으며, 화면에 보여줄 결과를 계산하는 데만 쓰입니다. 서버로 전송되지 않고, 저장되지 않으며, 이용자와 연결되지 않습니다. 탭을 닫으면 사라집니다."],
      ["분석 도구",
        "페이지 조회수와 유입 경로를 세기 위해 Vercel Analytics를 사용합니다. 쿠키를 쓰지 않으며 개별 방문자의 프로필을 만들지 않습니다. 이 사이트에 Google AdSense가 적용된 경우, Google이 광고 게재와 측정을 위해 쿠키를 설정할 수 있으며 이는 Google 광고 설정에서 관리할 수 있습니다."],
      ["제휴 링크",
        "제품 버튼은 쿠팡, 올리브영, 네이버쇼핑, Amazon, YesStyle 등의 판매처로 연결되며, 구매가 저희 실적으로 잡히도록 추적 파라미터가 붙습니다. 이 사이트를 벗어난 뒤에는 해당 판매처의 개인정보 처리방침이 적용됩니다. 저희는 합산된 수수료 내역만 받으며, 이용자의 이름·주소·결제 정보는 받지 않습니다."],
      ["이메일",
        "4주 플랜을 위해 이메일 주소를 남기면, 그 플랜과 관련 후속 안내를 보내는 데만 사용합니다. 판매하거나 공유하지 않습니다. 모든 메일에 수신 거부 링크가 있습니다."],
      ["이용자의 권리",
        "저희가 보관하는 정보가 거의 없어 삭제할 것도 대개 없습니다. 이메일 주소를 남겼고 삭제를 원하시면 아래로 연락 주세요:"],
      ["변경 사항",
        `이 방침이 중요하게 바뀌면 갱신본을 날짜와 함께 여기에 게시합니다. ${SITE_NAME}는 2026년에 이 방침을 마지막으로 갱신했습니다.`],
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
  ko: {
    eyebrow: "법적 고지",
    title: "이용약관",
    lead: "자유롭게 쓰세요. 다만 의사로 착각하지는 마시고요.",
    mailIn: "연락처",
    sections: [
      ["의학적 조언이 아닙니다",
        `${SITE_NAME}는 정보 제공을 목적으로 한 일반적인 화장품 안내를 제공합니다. 어떤 질환도 진단·치료·예방하지 않습니다. 지속되는 여드름, 아토피, 주사(rosacea), 또는 크기·색·모양이 변하는 색소침착은 피부과 전문의의 진료를 받으셔야 합니다. 이 사이트의 어떤 내용도 그것을 대신하지 않습니다.`],
      ["패치 테스트",
        "새 제품은 먼저 좁은 부위에 발라보고 24시간 기다리세요. 따갑거나 화끈거리거나 발진이 생기면 사용을 중단하세요. 피부에 무엇을 바를지는 이용자 본인의 책임입니다."],
      ["제품·가격·배송",
        "추천은 공개된 성분 정보를 저희가 해석한 결과입니다. 저희는 제품을 제조·보관·배송하지 않으며, 이용자의 구매 계약 당사자가 아닙니다. 표시된 가격은 참고용이며 판매처가 정합니다. 해외 배송의 경우 관세와 수입 부가세는 해당 국가가 정하며 표시 가격에 추가로 부과될 수 있습니다."],
      ["제휴 관계",
        "일부 외부 제품 링크는 제휴 링크이며, 이용자에게 추가 비용 없이 저희에게 수수료가 발생할 수 있습니다. 이 사실은 결과 페이지와 모든 페이지 하단에 고지되어 있습니다."],
      ["제3자 명칭",
        "브랜드명, 제품명, 아티스트명은 각 권리자의 자산이며 여기서는 식별과 논평 목적으로만 사용됩니다. 어떠한 제휴나 보증 관계도 의미하지 않습니다."],
      ["책임의 한계",
        "이 사이트는 «있는 그대로» 제공됩니다. 법이 허용하는 최대 범위에서, 이 사이트의 이용이나 링크를 통해 구매한 제품으로 인한 손해에 대해 책임지지 않습니다."],
      ["연락처", ""],
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
  ko: { privacy: "개인정보 처리방침", terms: "이용약관" },
};
