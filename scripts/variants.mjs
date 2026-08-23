/**
 * 소셜 문안 한 곳에서 관리하기.
 *
 * 하루 96회 — 영어 64회 + 스페인어 32회. 15분 간격, 시각(UTC)으로 언어가 갈린다.
 *
 * 글의 구조 (스팸으로 안 보이게 하기 위한 설계):
 *   본문    — 1인칭 후킹으로 시작, 링크 없음. 호기심만 남긴다.
 *   댓글 1·2 — 짧은 후속 코멘트 두 개가 스레드로 이어진다 (대화가 있어 보이게).
 *   댓글 3  — 마지막에 링크가 달린다. (social-post.mjs가 자동으로)
 *   사진    — 테마별 브랜드 카드가 붙는다. 끄려면 THREADS_IMAGES=off
 *
 * ⚠️ 보이스 규칙 — 화자는 실제 운영자(청담에서 12년간 아이돌 피부·메이크업을
 *    맡아온 전문가, 본인 동의하에 운영 참여)다. "12년", "청담"은 실제 경력이라 쓴다.
 *    단, 실제 경력을 넘어서는 주장(실명 고객, 특정 아이돌 이름, 없는 수상 이력)은
 *    절대 쓰지 않는다. 관찰·의견·습관 화법은 자유.
 *
 * 문안을 바꾸려면 이 파일만 고치면 된다.
 */

const SITE = (process.env.SITE_URL || "https://idol-skin-lab.vercel.app").replace(/\/+$/, "");

/** 언어별 게시 시각 (UTC). 나머지 16칸이 영어다. 각 시각에 15분 간격으로 4회씩 나간다. */
const ES_HOURS = [2, 4, 7, 12, 15, 17, 20, 22];
const SLOTS_PER_HOUR = 4; // :00 :15 :30 :45

export function langForHour(hour) {
  return ES_HOURS.includes(hour) ? "es" : "en";
}

function slotIndex(hour, minute, lang) {
  const hours = lang === "es" ? ES_HOURS : Array.from({ length: 24 }, (_, h) => h).filter((h) => !ES_HOURS.includes(h));
  const hi = hours.indexOf(hour);
  const quarter = Math.min(SLOTS_PER_HOUR - 1, Math.max(0, Math.floor(minute / 15)));
  return hi < 0 ? 0 : hi * SLOTS_PER_HOUR + quarter;
}

/** 첫 댓글에 달릴 링크 문구 — 테마별로 달라서 매번 같은 댓글이 반복되지 않는다 */
const REPLY = {
  en: {
    quiz: (u) => `The full read is free — ten questions, 90 seconds, no sign-up:\n${u}/`,
    routine: (u) => `The layering order matched to your exact type (free, 90 sec):\n${u}/`,
    spf: (u) => `Find out which of the sixteen types you are — free, no sign-up:\n${u}/type`,
    idols: (u) => `The 90-second version of that consultation, free:\n${u}/`,
  },
  es: {
    quiz: (u) => `La lectura completa es gratis — diez preguntas, 90 segundos, sin registro:\n${u}/es`,
    routine: (u) => `El orden de capas para tu tipo exacto (gratis, 90 seg):\n${u}/es`,
    spf: (u) => `Descubre cuál de los dieciséis tipos eres — gratis, sin registro:\n${u}/es/type`,
    idols: (u) => `La versión de 90 segundos de esa consulta, gratis:\n${u}/es`,
  },
};

/**
 * 링크 전에 달리는 짧은 후속 댓글 2개 — 본문 게시 직후 스레드로 이어진다.
 * 혼자 떠드는 티가 안 나게, 본문에서 못다 한 한 줄 + 개인적 습관/의견으로 구성.
 */
const REPLY_EXTRAS = {
  en: {
    quiz: [
      `The four axes, if you want to self-check tonight: oil, reactivity, pigment, firmness. Most product labels only speak to the first one.`,
      `I misread my own skin for years — treated "sensitive" when the real problem was dry. The letters are what fixed it.`,
    ],
    routine: [
      `If you only change one thing this week: reorder what you already own, thinnest to thickest. Costs nothing.`,
      `And give it two weeks before you judge. Skin answers in fortnights, not mornings.`,
    ],
    spf: [
      `Two fingers' worth for the face. Everyone I've ever checked was using about a third of that.`,
      `Cloudy days count. UVA doesn't care about the weather — it barely drops.`,
    ],
    idols: [
      `None of this needs a dressing room. The habits travel better than the products do.`,
      `The tired-night version of a routine is the one that decides your skin. Design for that night, not your best one.`,
    ],
  },
  es: {
    quiz: [
      `Los cuatro ejes, por si quieres autoevaluarte esta noche: grasa, reactividad, pigmento, firmeza. Las etiquetas solo hablan del primero.`,
      `Yo leí mal mi propia piel durante años — trataba «sensible» cuando el problema real era sequedad. Las letras lo arreglaron.`,
    ],
    routine: [
      `Si solo cambias una cosa esta semana: reordena lo que ya tienes, de lo más ligero a lo más denso. No cuesta nada.`,
      `Y dale dos semanas antes de juzgar. La piel responde en quincenas, no en mañanas.`,
    ],
    spf: [
      `Dos dedos para la cara. Todas las personas que he revisado usaban como un tercio de eso.`,
      `Los días nublados cuentan. A los rayos UVA el clima les da igual — apenas bajan.`,
    ],
    idols: [
      `Nada de esto necesita un camerino. Los hábitos viajan mejor que los productos.`,
      `La versión de noche-cansada de tu rutina es la que decide tu piel. Diseña para esa noche, no para la mejor.`,
    ],
  },
};

/* ==================================================================
   영어 32개 — 주제 4개 × 8개. 본문에 링크 없음.
   ================================================================== */
const EN = {
  quiz: {
    label: "Skin type quiz",
    posts: [
      { id: "guess-shelf", text: `Twelve years reading idol skin in Cheongdam, and I can usually guess someone's bathroom shelf from two answers.\n\nNot because I'm psychic — because "dry" and "sensitive" get treated like the same problem, and they never are. Korean estheticians read four separate axes: oil, reactivity, pigment, firmness.\n\nSixteen types. Most people are treating the wrong one.` },
      { id: "two-hours", text: `My favourite skincare question is one almost nobody asks themselves.\n\nTwo hours after cleansing, with nothing on your face — how does it feel?\n\nTight-and-flaking is a completely different product list from comfortable-with-a-glow. That single answer moves half the routine.` },
      { id: "mark", text: `I always ask what a spot leaves behind after it heals.\n\nNothing → spend your budget on texture.\nA brown mark that stays for months → sunscreen is your treatment, not your afterthought.\n\nSame breakout. Opposite routines.` },
      { id: "combination", text: `"Combination skin" is the least useful phrase in beauty, and I'll die on this hill.\n\nIt has never once helped anyone decide what to put on their face tonight. Four axes instead of four labels gives you sixteen types — and a routine that actually names products.` },
      { id: "sixteen", text: `The four-letter thing sounds like a gimmick until you watch it work.\n\nD/O — how much oil your barrier makes\nS/R — whether it reacts before it tolerates\nP/N — what a healed spot leaves behind\nW/T — where you sit on firmness\n\nSixteen types, not four. Which letters are you?` },
      { id: "built-it", text: `I've spent twelve years giving this consultation in person, in a studio in Cheongdam. So I built the version I always wished existed: ninety seconds, ten questions, nothing to sign up for.\n\nAt the end — your four letters, an AM/PM layering order, and the Korean formulas matched to your barrier, with the reason for each one.` },
      { id: "wrong-half", text: `The two mistakes I see most often:\n\nCalling yourself sensitive when you're actually dry. Calling yourself oily when you're actually dehydrated.\n\nBoth send you to the wrong half of the shelf for years.` },
      { id: "not-a-mood", text: `Your skin isn't a mood. I keep saying this.\n\nIt's four measurements — and once you know which side of each axis you're on, the product aisle stops being a guessing game and starts being a filter.` },
    ],
  },
  routine: {
    label: "Layering",
    posts: [
      { id: "thinnest", text: `Twelve years prepping skin for cameras taught me this: what makes Korean routines work isn't the number of steps. I promise.\n\nIt's viscosity. Thinnest first, always. Watery essence before serum, serum before cream. Put the cream on first and everything above it is decoration.` },
      { id: "seven-layers", text: `People ask how idol skin looks lit from inside instead of coated.\n\nSeven thin layers beat one thick one. Pat a watery essence in until it absorbs, then go again — the volume of hydration without the weight.` },
      { id: "oily-moisturiser", text: `Every time someone tells me they skip moisturiser because they're oily, I age a year.\n\nDehydrated skin compensates by making more sebum. Gel-cream weight, every night. The shine you're fighting is partly the fix you skipped.` },
      { id: "sixty-seconds", text: `Twelve years of doing idol makeup means twelve years of taking it OFF. The step I refuse to negotiate on: oil cleanse on DRY skin, sixty seconds, before any water touches your face.\n\nSunscreen isn't water-soluble. Go straight to the foaming wash and you're spreading it around, not removing it.` },
      { id: "squeaky", text: `If your face squeaks after washing, we need to talk.\n\nSqueaky means the cleanser stripped the lipids your barrier spent all night making. Low pH, no sulfates — and stop before it feels tight.` },
      { id: "one-at-a-time", text: `The advice nobody wants and everybody needs: one new product at a time, two weeks apart.\n\nAdd three at once and your face reacts — now you have to remove all three and start over. Slow is the fast way here.` },
      { id: "ph", text: `The number that decides whether a cleanser helps or hurts you is printed on the back, in small type.\n\nYour skin sits around pH 5. A cleanser at pH 9 strips it and takes hours to recover from. Low-pH isn't a marketing word — it's the whole difference.` },
      { id: "four-steps", text: `A four-step routine done every night beats a ten-step routine done on Sundays. I will keep repeating this.\n\nSkin responds to repetition, not intensity. Build the shortest routine you'll actually finish when you're tired.` },
    ],
  },
  spf: {
    label: "Sunscreen",
    posts: [
      { id: "one-product", text: `Twelve years in this job, and if I could only keep one product from my entire shelf, it wouldn't be a serum.\n\nSunscreen outperforms everything layered above it, and it's the only step that works on all sixteen skin types. Two fingers' worth. Reapplied.` },
      { id: "teens", text: `After twelve years of looking at faces up close for a living, the ones that stop me are the ones that started SPF at fifteen.\n\nMost photodamage is banked before twenty — which is why "I use SPF now" and "I've used it since my teens" look visibly different at thirty-five, even on the same routine today.` },
      { id: "pigment", text: `If your spots heal into brown marks that stay for months, hear me out: sunscreen isn't skincare for you. It's the treatment.\n\nYour melanocytes fire at any provocation. Prevention is cheap. Correction takes a year.` },
      { id: "no-cast", text: `I remember when wearing sunscreen felt like a punishment. Korean formulas ended that.\n\nNo white cast, no tacky film, nothing that pills under makeup. Once it stops feeling like a chore, you actually wear it — which was the whole point.` },
      { id: "reapply", text: `Applying sunscreen once at 8am and calling yourself protected is like brushing your teeth on Monday for the week.\n\nReapplication is the part disciplined routines get right and everyone else skips.` },
      { id: "cheap", text: `The highest-return product in almost every routine I've ever reviewed costs about $18.\n\nIt is not the serum.` },
      { id: "window", text: `The one that surprises everyone: window glass blocks UVB, not UVA.\n\nUVA is the one that reaches deeper and does the ageing. Sit by a window all day and you're getting a quiet dose — every day, for years.` },
      { id: "math", text: `I did the math so you don't have to.\n\nRetinol to fade one sun spot: six months, about $40.\nSunscreen to never get it: $18, no waiting.\n\nThe cheap step is the one you do first.` },
    ],
  },
  idols: {
    label: "Idol habits",
    posts: [
      { id: "lying-down", text: `The routine that survives is the one you can do lying down. This is the closest thing I have to a philosophy.\n\nCold sheet mask, something on the screen, ten minutes. It never feels like a chore — so it actually happens.` },
      { id: "rest-days", text: `Bare-faced rest days are a skincare step, not a gap in one.\n\nSkin that carries full coverage and hot lighting five days a week needs the other two to recover. Doing less — on purpose, on schedule.` },
      { id: "cold-first", text: `Cold first, product second.\n\nIce water before an early morning does more for a puffy face in three minutes than any de-puffing serum does in three weeks. It's free. It's what actually gets used.` },
      { id: "remove-first", text: `Nothing you apply matters if the day is still on your face. I'll say it as many times as it takes.\n\nMakeup, SPF, sebum — an oil melt, then a low-pH wash, before a single treatment step goes on.` },
      { id: "fridge", text: `The sheet masks live in the fridge, by the box. Not as a luxury — as friction removal.\n\nIf grabbing one takes four seconds, you use it on the tired nights too. That's the entire trick.` },
      { id: "consistency", text: `I've done idol skin in Cheongdam for twelve years, so believe me on this: they don't have better skin than you. They have someone reading it correctly every week and adjusting.\n\nThe products are mostly ones you can already buy. The difference is that nothing is guesswork.` },
      { id: "calendar", text: `Twelve years backstage, and I can tell you: nobody is doing anything exotic.\n\nOrdinary things, done at a frequency most people never reach. That's the entire gap — not the shelf, the calendar.` },
      { id: "removal", text: `The part nobody posts: most of what happens before a comeback is removal, not addition.\n\nCut the actives fighting each other. Cut the fragrance. Pull exfoliation back to twice a week. The skin calms down — and the camera is kind.` },
    ],
  },
};

/* ==================================================================
   스페인어 24개 — 주제 4개 × 6개. 본문에 링크 없음.
   ================================================================== */
const ES = {
  quiz: {
    label: "Test de tipo de piel",
    posts: [
      { id: "adivinar", text: `Doce años leyendo la piel de idols en Cheongdam, y casi siempre puedo adivinar el estante del baño de alguien con dos respuestas.\n\nNo es magia: es que «seca» y «sensible» se tratan como el mismo problema, y nunca lo son. En Corea la piel se lee en cuatro ejes: grasa, reactividad, pigmento, firmeza.\n\nDieciséis tipos. La mayoría trata el equivocado.` },
      { id: "dos-horas", text: `Mi pregunta favorita de skincare es una que casi nadie se hace.\n\nDos horas después de limpiarte la cara, sin nada puesto, ¿cómo la notas?\n\nTirante-y-descamada es una lista de productos opuesta a cómoda-con-brillo. Esa sola respuesta decide media rutina.` },
      { id: "marca", text: `Siempre pregunto qué deja atrás un grano cuando por fin se cura.\n\nNada → invierte en textura.\nUna marca marrón que dura meses → el protector solar es tu tratamiento, no un extra.\n\nEl mismo grano. Rutinas opuestas.` },
      { id: "mixta", text: `«Piel mixta» es la frase menos útil de toda la cosmética, y lo sostengo.\n\nNo ha ayudado nunca a nadie a decidir qué ponerse en la cara esta noche. Cuatro ejes en vez de cuatro etiquetas dan dieciséis tipos — y una rutina que sí nombra productos.` },
      { id: "dieciseis", text: `Lo de las cuatro letras suena a truco hasta que lo ves funcionar.\n\nD/O — cuánta grasa fabrica tu barrera\nS/R — si reacciona antes de tolerar\nP/N — qué deja atrás un grano curado\nW/T — dónde estás en firmeza\n\n¿Cuáles son las tuyas?` },
      { id: "la-construi", text: `Llevo doce años haciendo esta consulta en persona, en un estudio de Cheongdam. Así que construí la versión que siempre quise que existiera: noventa segundos, diez preguntas, sin registro.\n\nAl final — tus cuatro letras, un orden de capas para mañana y noche, y las fórmulas coreanas que le corresponden a tu barrera, con el porqué de cada una.` },
    ],
  },
  routine: {
    label: "Capas",
    posts: [
      { id: "mas-ligero", text: `Lo que de verdad hace funcionar una rutina coreana no es el número de pasos. Te lo prometo.\n\nEs la densidad. Lo más ligero primero, siempre. Esencia acuosa antes que sérum, sérum antes que crema. Con la crema primero, todo lo de arriba es decoración.` },
      { id: "siete-capas", text: `Me preguntan mucho por qué la piel de las idols parece iluminada desde dentro y no cubierta.\n\nSiete capas finas ganan a una gruesa. Esencia acuosa a palmaditas hasta que absorba, y repites — volumen de hidratación sin peso.` },
      { id: "grasa-hidratante", text: `Cada vez que alguien me dice que se salta la hidratante por tener piel grasa, envejezco un año.\n\nLa piel deshidratada compensa fabricando más sebo. Gel-crema, todas las noches. El brillo contra el que peleas es en parte el paso que te saltaste.` },
      { id: "sesenta-segundos", text: `El paso que no negocio: aceite sobre piel SECA, sesenta segundos, antes de que el agua toque tu cara.\n\nEl protector solar no se disuelve en agua. Ir directa a la espuma es repartirlo, no retirarlo.` },
      { id: "chirrido", text: `Si tu cara chirría después de lavarla, tenemos que hablar.\n\nEse chirrido es el limpiador llevándose los lípidos que tu barrera fabricó durante la noche. pH bajo, sin sulfatos — y para antes de que tire.` },
      { id: "uno-cada-vez", text: `El consejo que nadie quiere y todo el mundo necesita: un producto nuevo cada vez, con dos semanas de margen.\n\nAñade tres a la vez y tu cara reacciona — ahora quitas los tres y empiezas de cero. Ir despacio es ir rápido.` },
    ],
  },
  spf: {
    label: "Protector solar",
    posts: [
      { id: "un-producto", text: `Si solo pudiera quedarme con un producto de todo mi estante, no sería un sérum.\n\nEl protector solar rinde más que todo lo que lleva encima, y es el único paso que funciona en los dieciséis tipos de piel. Dos dedos. Reaplicado.` },
      { id: "adolescencia", text: `Las caras que me detienen son las que empezaron con protector a los quince.\n\nCasi todo el fotodaño se acumula antes de los veinte — por eso «ahora uso protector» y «lo uso desde adolescente» se ven distintas a los treinta y cinco, incluso con la misma rutina de hoy.` },
      { id: "pigmento", text: `Si tus granos dejan marcas marrones que duran meses, escúchame: el protector no es cuidado para ti. Es el tratamiento.\n\nTus melanocitos se disparan con cualquier estímulo. Prevenir es barato. Corregir tarda un año.` },
      { id: "sin-velo", text: `Me acuerdo de cuando ponerse protector solar era un castigo. Las fórmulas coreanas acabaron con eso.\n\nSin velo blanco, sin película pegajosa, sin apelmazarse bajo el maquillaje. Cuando deja de costar, te lo pones de verdad — que era de lo que iba todo.` },
      { id: "reaplicar", text: `Ponerte protector a las ocho de la mañana y darte por protegida es como lavarte los dientes el lunes para toda la semana.\n\nLa reaplicación es la parte que las rutinas disciplinadas hacen bien y el resto se salta.` },
      { id: "barato", text: `El producto más rentable de casi todas las rutinas que he revisado cuesta unos 18 dólares.\n\nNo es el sérum.` },
    ],
  },
  idols: {
    label: "Hábitos de idols",
    posts: [
      { id: "tumbada", text: `La rutina que sobrevive es la que puedes hacer tumbada. Es lo más parecido que tengo a una filosofía.\n\nMascarilla fría, algo en la pantalla, diez minutos. Nunca cuesta — así que de verdad ocurre.` },
      { id: "dias-descanso", text: `Los días sin maquillaje son un paso de la rutina, no un hueco en ella.\n\nUna piel que aguanta cobertura completa y focos cinco días a la semana necesita los otros dos para recuperarse. Menos — a propósito, en el calendario.` },
      { id: "frio-primero", text: `Primero el frío, después el producto.\n\nAgua helada antes de un madrugón hace más por una cara hinchada en tres minutos que cualquier sérum en tres semanas. Es gratis. Es lo que de verdad se usa.` },
      { id: "retirar", text: `Nada de lo que te apliques importa si el día sigue en tu cara. Lo repetiré las veces que haga falta.\n\nMaquillaje, protector, sebo — aceite que lo disuelve y después pH bajo, antes de un solo paso de tratamiento.` },
      { id: "nevera", text: `Las mascarillas viven en la nevera, por cajas. No como lujo: para quitar fricción.\n\nSi cogerla tarda cuatro segundos, también la usas las noches de cansancio. Ese es todo el truco.` },
      { id: "constancia", text: `Doce años cuidando piel de idols en Cheongdam me enseñaron esto: no tienen mejor piel que tú. Tienen a alguien que se la lee bien cada semana y ajusta.\n\nLos productos son casi todos los que ya puedes comprar. La diferencia es que nada se deja al azar.` },
    ],
  },
};

const POOLS = { en: EN, es: ES };

/** 언어별 문안을 주제가 번갈아 나오는 순서로 편다 (같은 주제가 연달아 나가지 않게) */
function flatten(lang) {
  const groups = POOLS[lang];
  const out = [];
  const keys = Object.keys(groups);
  const max = Math.max(...keys.map((k) => groups[k].posts.length));
  for (let i = 0; i < max; i++) {
    for (const k of keys) {
      const p = groups[k].posts[i];
      if (p) out.push({ theme: k, label: groups[k].label, ...p });
    }
  }
  return out;
}

/**
 * 어떤 글을 올릴지 고른다.
 * (날짜 × 하루개수 + 슬롯번호) % 풀크기 — 한 바퀴 다 돌기 전에는 반복이 없다.
 */
export function pickPost({ lang, theme, postId, hour, minute, day } = {}) {
  const now = new Date();
  const h = typeof hour === "number" ? hour : now.getUTCHours();
  const m = typeof minute === "number" ? minute : now.getUTCMinutes();
  const useLang = lang && POOLS[lang] ? lang : langForHour(h);

  const pool = flatten(useLang);
  const perDay = (useLang === "es" ? ES_HOURS.length : 24 - ES_HOURS.length) * SLOTS_PER_HOUR;
  const dayIndex = typeof day === "number" ? day : Math.floor(now.getTime() / 86_400_000);
  const slot = Math.max(0, slotIndex(h, m, useLang));

  let post = pool[(dayIndex * perDay + slot) % pool.length];

  if (theme || postId) {
    const found = pool.find((p) => (!theme || p.theme === theme) && (!postId || p.id === postId));
    if (found) post = found;
  }

  return {
    lang: useLang,
    theme: post.theme,
    label: post.label,
    id: post.id,
    /** 본문 — 링크 없음 */
    text: post.text,
    /** 본문 아래에 순서대로 달릴 댓글 체인 — 짧은 코멘트 2개, 마지막이 링크 */
    replies: [...REPLY_EXTRAS[useLang][post.theme], REPLY[useLang][post.theme](SITE)],
    /** (구버전 호환) 링크 댓글 하나만 */
    reply: REPLY[useLang][post.theme](SITE),
    /** 테마별 브랜드 카드 이미지 (사이트 public/cards/ 에서 서빙) */
    image: `${SITE}/cards/${useLang}-${post.theme}.jpg`,
  };
}

export const THEME_KEYS = Object.keys(EN);
export const POOL_SIZES = { en: flatten("en").length, es: flatten("es").length };
