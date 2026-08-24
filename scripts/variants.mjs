/**
 * 소셜 문안 한 곳에서 관리하기.
 *
 * 하루 96회 — 영어 64회 + 스페인어 32회. 15분 간격, 시각(UTC)으로 언어가 갈린다.
 *
 * 글의 구조 (스팸으로 안 보이게 하기 위한 설계):
 *   본문    — 1인칭 후킹으로 시작, 링크 없음. 호기심만 남긴다.
 *   댓글 1·2 — 짧은 후속 코멘트 두 개가 스레드로 이어진다 (대화가 있어 보이게).
 *   댓글 3  — 마지막에 링크가 달린다. (social-post.mjs가 자동으로)
 *   사진    — 실제 진단 결과 화면 캡처가 붙는다. 끄려면 THREADS_IMAGES=off
 *
 * 톤 — 서울에 사는 진짜 피부 전문가가 미국인 친구들한테 편하게 말하는 느낌.
 *   소문자 위주, 가벼운 은어(ngl, bestie, fr 정도), 광고 티 안 나게.
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

/** 마지막 댓글에 달릴 링크 문구 — 테마별로 달라서 매번 같은 댓글이 반복되지 않는다 */
const REPLY = {
  en: {
    quiz: (u) => `quiz is here if you want your letters — 10 questions, 90 sec, free, no signup:\n${u}/`,
    routine: (u) => `the exact layering order for your type is in here (free, 90 sec):\n${u}/`,
    spf: (u) => `find out which of the 16 types you are — free, no signup:\n${u}/type`,
    idols: (u) => `the 90-second version of that consultation, free:\n${u}/`,
  },
  es: {
    quiz: (u) => `el test está aquí si quieres tus letras — 10 preguntas, 90 seg, gratis, sin registro:\n${u}/es`,
    routine: (u) => `aquí está el orden exacto de capas para tu tipo (gratis, 90 seg):\n${u}/es`,
    spf: (u) => `descubre cuál de los 16 tipos eres — gratis, sin registro:\n${u}/es/type`,
    idols: (u) => `la versión de 90 segundos de esa consulta, gratis:\n${u}/es`,
  },
};

/**
 * 링크 전에 달리는 짧은 후속 댓글 2개 — 본문 게시 직후 스레드로 이어진다.
 * 혼자 떠드는 티가 안 나게, 본문에서 못다 한 한 줄 + 개인적 습관/의견으로 구성.
 */
const REPLY_EXTRAS = {
  en: {
    quiz: [
      `the four axes if you want to self-check tonight: oil, reactivity, pigment, firmness. product labels only ever talk about the first one.`,
      `i misread my own skin for years btw — treated "sensitive" when the real problem was dry. the letters are what fixed it.`,
    ],
    routine: [
      `if you change one thing this week: reorder what you already own, thinnest to thickest. costs nothing.`,
      `and give it two weeks before you judge. skin answers in weeks, not mornings.`,
    ],
    spf: [
      `two fingers' worth for the face btw. everyone i've ever checked was using about a third of that.`,
      `cloudy days count too — uva does not care about the weather.`,
    ],
    idols: [
      `none of this needs a dressing room. the habits travel better than the products do.`,
      `design your routine for your most tired night, not your best one. that night is the one that decides your skin.`,
    ],
  },
  es: {
    quiz: [
      `los cuatro ejes por si quieres autoevaluarte esta noche: grasa, reactividad, pigmento, firmeza. las etiquetas solo hablan del primero.`,
      `yo leí mal mi propia piel durante años — trataba «sensible» cuando el problema real era sequedad. las letras lo arreglaron.`,
    ],
    routine: [
      `si cambias una sola cosa esta semana: reordena lo que ya tienes, de lo más ligero a lo más denso. no cuesta nada.`,
      `y dale dos semanas antes de juzgar. la piel responde en semanas, no en mañanas.`,
    ],
    spf: [
      `dos dedos para la cara, ojo. todas las personas que he revisado usaban como un tercio de eso.`,
      `los días nublados también cuentan — a los uva el clima les da igual.`,
    ],
    idols: [
      `nada de esto necesita un camerino. los hábitos viajan mejor que los productos.`,
      `diseña tu rutina para tu noche más cansada, no para la mejor. esa noche es la que decide tu piel.`,
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
      { id: "guess-shelf", text: `12 years doing idol skin in cheongdam and i can basically guess your whole bathroom shelf from two answers.\n\nnot psychic — it's just that "dry" and "sensitive" get treated like the same problem and they're... not. we read four things: oil, reactivity, pigment, firmness.\n\n16 types. most people are treating the wrong one.` },
      { id: "two-hours", text: `ok here's my favorite skin question that nobody ever asks themselves:\n\ntwo hours after washing your face, nothing on it — how does it actually feel?\n\ntight and flaky is a completely different shopping list from comfy with a little glow. that one answer changes half your routine, i'm so serious.` },
      { id: "mark", text: `whenever someone shows me a breakout i ask the same thing: what does it leave behind when it heals?\n\nnothing → put your money into texture.\nbrown mark that stays for months → sunscreen IS your treatment, not an afterthought.\n\nsame pimple. opposite routines.` },
      { id: "combination", text: `"combination skin" is the most useless phrase in beauty and i will not be taking questions.\n\nit has never once helped anyone pick what to put on their face tonight. four axes instead of four labels = 16 types, and a routine that actually names products.` },
      { id: "sixteen", text: `the four-letter thing sounds like a gimmick until you watch it work, i promise.\n\nD/O — how much oil your barrier makes\nS/R — does it react before it tolerates\nP/N — what a healed spot leaves behind\nW/T — where you sit on firmness\n\n16 types, not 4. which letters are you?` },
      { id: "built-it", text: `i've been doing this consultation in person for 12 years in cheongdam. so i finally built the version i always wished existed — 90 seconds, 10 questions, no signup, nothing.\n\nat the end you get your four letters, an am/pm order, and the korean formulas that actually match your barrier. with the why for each one.` },
      { id: "wrong-half", text: `the two mistakes i see constantly:\n\ncalling yourself sensitive when you're actually just dry. calling yourself oily when you're actually dehydrated.\n\nboth send you to the wrong half of the store for YEARS.` },
      { id: "not-a-mood", text: `your skin is not a mood. i keep saying this.\n\nit's four measurements — and once you know which side of each one you're on, the skincare aisle stops being a guessing game and starts being a filter.` },
    ],
  },
  routine: {
    label: "Layering",
    posts: [
      { id: "thinnest", text: `12 years prepping skin for cameras and here's the thing nobody tells you: korean routines don't work because of the number of steps.\n\nit's viscosity. thinnest first, always. watery essence before serum, serum before cream. cream first and everything on top is just decoration.` },
      { id: "seven-layers", text: `people always ask how idol skin looks lit from the inside instead of coated.\n\nseven thin layers > one thick one. pat a watery essence in until it absorbs, then go again. all the hydration, none of the weight.` },
      { id: "oily-moisturiser", text: `every time someone tells me they skip moisturizer because they're oily, i age a full year.\n\ndehydrated skin panics and makes MORE sebum. gel-cream, every night. the shine you're fighting is partly the step you skipped, bestie.` },
      { id: "sixty-seconds", text: `12 years of doing idol makeup = 12 years of taking it OFF. the one step i will not negotiate:\n\noil cleanse on DRY skin, a full 60 seconds, before water touches your face. sunscreen isn't water-soluble — go straight to the foam wash and you're just moving it around.` },
      { id: "squeaky", text: `if your face squeaks after washing... we need to talk.\n\nsqueaky = your cleanser just stripped the lipids your barrier spent all night making. low ph, no sulfates, and stop before it feels tight.` },
      { id: "one-at-a-time", text: `the advice nobody wants but everybody needs: ONE new product at a time, two weeks apart.\n\nadd three at once, face freaks out, now you're pulling all three and starting over. slow is literally the fast way here.` },
      { id: "ph", text: `the number that decides if a cleanser helps or wrecks you is printed on the back in tiny letters.\n\nyour skin sits around ph 5. a ph 9 cleanser strips it and it takes hours to recover. "low ph" isn't marketing — it's the whole difference.` },
      { id: "four-steps", text: `a 4-step routine you do every single night beats a 10-step routine you do on sundays. i will die on this hill.\n\nskin responds to repetition, not intensity. build the shortest routine you'll still finish when you're exhausted.` },
    ],
  },
  spf: {
    label: "Sunscreen",
    posts: [
      { id: "one-product", text: `12 years in this job and if i could only keep ONE product off my entire shelf? not a serum.\n\nsunscreen outperforms everything layered on top of it, and it's the only step that works on all 16 skin types. two fingers' worth. reapplied.` },
      { id: "teens", text: `after 12 years of staring at faces up close for a living — the ones that stop me are the ones that started spf at 15.\n\nmost sun damage is banked before 20. that's why "i wear spf now" and "i've worn it since my teens" look completely different at 35, even on the same routine today.` },
      { id: "pigment", text: `if your breakouts heal into brown marks that hang around for months, listen: sunscreen isn't "skincare" for you. it IS the treatment.\n\nyour melanocytes fire at literally any provocation. prevention is cheap. correction takes a year.` },
      { id: "no-cast", text: `i remember when wearing sunscreen felt like a punishment lol. korean formulas ended that era.\n\nno white cast, no sticky film, nothing pilling under makeup. once it stops feeling like a chore you actually wear it — which was the whole point.` },
      { id: "reapply", text: `putting on sunscreen once at 8am and calling yourself protected is like brushing your teeth on monday for the whole week.\n\nreapplication is the part disciplined routines get right and everyone else skips.` },
      { id: "cheap", text: `the highest-return product in almost every routine i've ever reviewed costs like $18.\n\nit's not the serum.` },
      { id: "window", text: `the one that shocks everyone: window glass blocks uvb, not uva.\n\nuva is the one that goes deeper and does the aging. sit by a window all day and you're getting a quiet little dose. every day. for years.` },
      { id: "math", text: `did the math so you don't have to:\n\nretinol to fade one sun spot — 6 months, ~$40.\nsunscreen to never get it — $18, no waiting.\n\nthe cheap step comes first.` },
    ],
  },
  idols: {
    label: "Idol habits",
    posts: [
      { id: "lying-down", text: `the routine that survives is the one you can do lying down. this is my entire philosophy at this point.\n\ncold sheet mask, something on the screen, ten minutes. it never feels like a chore — so it actually happens.` },
      { id: "rest-days", text: `bare-faced rest days ARE a skincare step, not a gap in one.\n\nskin that carries full glam and hot lighting five days a week needs the other two to recover. doing less — on purpose, on schedule.` },
      { id: "cold-first", text: `cold first, product second.\n\nice water before an early call does more for a puffy face in 3 minutes than any depuffing serum does in 3 weeks. it's free. it's what actually gets used.` },
      { id: "remove-first", text: `nothing you put ON matters if the day is still on your face. i'll say it as many times as i have to.\n\nmakeup, spf, sebum — oil melt first, then a low-ph wash, before a single treatment step goes on.` },
      { id: "fridge", text: `the sheet masks live in the fridge, by the box. not as a luxury — as friction removal.\n\nif grabbing one takes 4 seconds, you'll use it on the tired nights too. that's the entire trick.` },
      { id: "consistency", text: `12 years doing idol skin in cheongdam, so trust me on this one: they do not have better skin than you.\n\nthey have someone reading it correctly every week and adjusting. the products are mostly things you can already buy. nothing is guesswork — that's the whole difference.` },
      { id: "calendar", text: `12 years backstage and i promise nobody is doing anything exotic.\n\nordinary things, done at a frequency most people never reach. the gap isn't the shelf. it's the calendar.` },
      { id: "removal", text: `the part nobody posts: most of comeback prep is removal, not addition.\n\ncut the actives fighting each other. cut the fragrance. pull exfoliation back to 2x a week. skin calms down — camera gets kind.` },
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
      { id: "adivinar", text: `doce años cuidando piel de idols en cheongdam y te juro que puedo adivinar tu estante del baño con dos respuestas.\n\nno es magia — es que «seca» y «sensible» se tratan como el mismo problema y no lo son, literal. aquí leemos cuatro cosas: grasa, reactividad, pigmento, firmeza.\n\n16 tipos. la mayoría trata el equivocado.` },
      { id: "dos-horas", text: `mi pregunta favorita de skincare, la que nadie se hace:\n\ndos horas después de lavarte la cara, sin nada puesto — ¿cómo la sientes de verdad?\n\ntirante y descamada es una lista de compras opuesta a cómoda con brillito. esa sola respuesta cambia media rutina, en serio.` },
      { id: "marca", text: `siempre pregunto lo mismo: ¿qué deja un grano cuando por fin se cura?\n\nnada → invierte en textura.\nmancha marrón que dura meses → el protector solar ES tu tratamiento, no un extra.\n\nel mismo grano. rutinas opuestas.` },
      { id: "mixta", text: `«piel mixta» es la frase más inútil de toda la cosmética y no acepto preguntas.\n\njamás ayudó a nadie a decidir qué ponerse en la cara esta noche. cuatro ejes en vez de cuatro etiquetas = 16 tipos, y una rutina que sí nombra productos.` },
      { id: "dieciseis", text: `lo de las cuatro letras suena a truco hasta que lo ves funcionar, te lo prometo.\n\nD/O — cuánta grasa fabrica tu barrera\nS/R — si reacciona antes de tolerar\nP/N — qué deja un grano curado\nW/T — dónde estás en firmeza\n\n¿cuáles son las tuyas?` },
      { id: "la-construi", text: `llevo doce años haciendo esta consulta en persona en cheongdam. así que construí la versión que siempre quise que existiera — 90 segundos, 10 preguntas, sin registro, nada.\n\nal final: tus cuatro letras, el orden de capas mañana/noche, y las fórmulas coreanas que le van a tu barrera. con el porqué de cada una.` },
    ],
  },
  routine: {
    label: "Capas",
    posts: [
      { id: "mas-ligero", text: `doce años preparando piel para cámaras y esto es lo que nadie te dice: las rutinas coreanas no funcionan por el número de pasos.\n\nes la densidad. lo más ligero primero, siempre. esencia acuosa antes que sérum, sérum antes que crema. con la crema primero, todo lo de arriba es decoración.` },
      { id: "siete-capas", text: `me preguntan mucho por qué la piel de las idols se ve iluminada desde dentro y no cubierta.\n\nsiete capas finas > una gruesa. esencia acuosa a palmaditas hasta que absorba, y repites. toda la hidratación, nada del peso.` },
      { id: "grasa-hidratante", text: `cada vez que alguien me dice que se salta la hidratante «porque soy grasa», envejezco un año entero.\n\nla piel deshidratada entra en pánico y fabrica MÁS sebo. gel-crema, todas las noches. el brillo contra el que peleas es en parte el paso que te saltaste.` },
      { id: "sesenta-segundos", text: `doce años haciendo maquillaje de idols = doce años quitándolo. el paso que no negocio:\n\naceite sobre piel SECA, 60 segundos completos, antes de que el agua toque tu cara. el protector no se disuelve en agua — ir directa a la espuma es solo moverlo de sitio.` },
      { id: "chirrido", text: `si tu cara chirría después de lavarla... tenemos que hablar.\n\nchirrido = el limpiador se llevó los lípidos que tu barrera fabricó durante toda la noche. ph bajo, sin sulfatos, y para antes de que tire.` },
      { id: "uno-cada-vez", text: `el consejo que nadie quiere y todo el mundo necesita: UN producto nuevo cada vez, con dos semanas de margen.\n\nañades tres a la vez, la cara se enoja, y ahora quitas los tres y empiezas de cero. ir despacio es literalmente ir rápido.` },
    ],
  },
  spf: {
    label: "Protector solar",
    posts: [
      { id: "un-producto", text: `doce años en esto y si solo pudiera quedarme con UN producto de todo mi estante — no sería un sérum.\n\nel protector solar rinde más que todo lo que lleva encima, y es el único paso que funciona en los 16 tipos. dos dedos. reaplicado.` },
      { id: "adolescencia", text: `después de doce años mirando caras de cerca para vivir, las que me detienen son las que empezaron con protector a los quince.\n\ncasi todo el fotodaño se acumula antes de los veinte. por eso «ahora uso protector» y «lo uso desde adolescente» se ven totalmente distintas a los treinta y cinco.` },
      { id: "pigmento", text: `si tus granos dejan manchas marrones que duran meses, escúchame: el protector no es «cuidado» para ti. ES el tratamiento.\n\ntus melanocitos se disparan con literalmente cualquier cosa. prevenir es barato. corregir tarda un año.` },
      { id: "sin-velo", text: `me acuerdo de cuando ponerse protector era un castigo jaja. las fórmulas coreanas acabaron con esa era.\n\nsin velo blanco, sin película pegajosa, sin apelmazarse bajo el maquillaje. cuando deja de costar, te lo pones de verdad — que era el punto.` },
      { id: "reaplicar", text: `ponerte protector a las 8am y darte por protegida es como lavarte los dientes el lunes para toda la semana.\n\nla reaplicación es la parte que las rutinas disciplinadas hacen bien y el resto se salta.` },
      { id: "barato", text: `el producto más rentable de casi todas las rutinas que he revisado cuesta como 18 dólares.\n\nno es el sérum.` },
    ],
  },
  idols: {
    label: "Hábitos de idols",
    posts: [
      { id: "tumbada", text: `la rutina que sobrevive es la que puedes hacer tumbada. a estas alturas es toda mi filosofía.\n\nmascarilla fría, algo en la pantalla, diez minutos. nunca se siente como tarea — así que de verdad pasa.` },
      { id: "dias-descanso", text: `los días sin maquillaje SON un paso de la rutina, no un hueco.\n\nuna piel que aguanta glam completo y focos cinco días a la semana necesita los otros dos para recuperarse. menos — a propósito, en el calendario.` },
      { id: "frio-primero", text: `primero el frío, después el producto.\n\nagua helada antes de un madrugón hace más por una cara hinchada en 3 minutos que cualquier sérum en 3 semanas. es gratis. es lo que de verdad se usa.` },
      { id: "retirar", text: `nada de lo que te pongas importa si el día sigue en tu cara. lo repito las veces que haga falta.\n\nmaquillaje, protector, sebo — aceite que lo derrite y después ph bajo, antes de un solo paso de tratamiento.` },
      { id: "nevera", text: `las mascarillas viven en la nevera, por cajas. no como lujo — para quitar fricción.\n\nsi cogerla tarda 4 segundos, también la usas las noches de cansancio. ese es todo el truco.` },
      { id: "constancia", text: `doce años cuidando piel de idols en cheongdam, así que créeme: no tienen mejor piel que tú.\n\ntienen a alguien que se la lee bien cada semana y ajusta. los productos son casi todos los que ya puedes comprar. nada es al azar — esa es toda la diferencia.` },
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
    /** 테마별 카드 이미지 — 실제 진단 결과 화면 캡처 (사이트 public/cards/ 에서 서빙) */
    image: `${SITE}/cards/${useLang}-${post.theme}.jpg`,
  };
}

export const THEME_KEYS = Object.keys(EN);
export const POOL_SIZES = { en: flatten("en").length, es: flatten("es").length };
