/**
 * 소셜 문안 한 곳에서 관리하기 — v3 (북미 재공략판)
 *
 * 글의 구조 (조사 근거: Buffer 5,200만 건 분석 · HeyOrca 2026 훅 연구):
 *   본문      — 텍스트만. 링크 없음, 카드 없음. 검증된 훅 6패턴으로 쓴다:
 *               고백형 / 호기심 갭 / 직접 언급 / 경고형 / 장면형 / 시간 절약.
 *   댓글 1개  — 실제 진단 화면 캡처 + 참여를 유도하는 캡션. 링크 없음.
 *               (링크는 전 형식 중 인게이지먼트 최하위 2.34% — 프로필 bio가 담당한다)
 *
 * 언어 — 당분간 영어만. warmup 모드에서 하루 2회(미 동부 아침·밤).
 *   스페인어 문안은 보존돼 있고 ES 슬롯을 다시 열면 재가동된다.
 *
 * ⚠️ 보이스 규칙 — 화자는 실제 운영자(청담에서 12년간 아이돌 피부·메이크업을
 *    맡아온 전문가, 본인 동의하에 운영 참여)다. "12년"은 실제 경력이라 쓰되
 *    **모든 글이 아니라 일부에만** 넣는다 (자랑처럼 읽히지 않게).
 *    실제 경력을 넘어서는 주장(실명 고객, 특정 아이돌 이름)은 절대 쓰지 않는다.
 *    소문자 위주, 이모지 없음, 광고 문구 없음.
 *
 * 문안을 바꾸려면 이 파일만 고치면 된다.
 */

const SITE = (process.env.SITE_URL || "https://idol-skin-lab.vercel.app").replace(/\/+$/, "");

/** 언어별 게시 시각 (UTC). 나머지가 영어다. 각 시각에 15분 간격으로 4회씩(=full 모드). */
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

/**
 * 본문 아래 딱 하나 달리는 댓글 — 실제 화면 캡처 + 참여 유도 캡션.
 * 링크는 넣지 않는다. 질문으로 끝나야 답글이 달린다.
 */
const PHOTO_REPLY = {
  en: {
    quiz: {
      caption: `this is the actual first screen of the reading i built — the two-hour question. drop your answer below, i'll tell you what it usually means`,
      image: (u) => `${u}/cards/en-quiz.jpg`,
    },
    routine: {
      caption: `this is what the four axes look like when they're read out. mine lands oily + resistant. curious where everyone else sits`,
      image: (u) => `${u}/cards/en-routine.jpg`,
    },
    spf: {
      caption: `this is what the four letters look like when they come back — this one is roughly 1 in 14 people. anyone else land on a matte type?`,
      image: (u) => `${u}/cards/en-spf.jpg`,
    },
    idols: {
      caption: `the little consultation i built — the same ten questions i ask in the chair, about 90 seconds. what would you want yours to tell you?`,
      image: (u) => `${u}/cards/en-idols.jpg`,
    },
  },
  es: {
    quiz: {
      caption: `esta es la primera pantalla de la lectura que construí — la pregunta de las dos horas. deja tu respuesta y te digo qué suele significar`,
      image: (u) => `${u}/cards/es-quiz.jpg`,
    },
    routine: {
      caption: `así se ven los cuatro ejes ya leídos. el mío cae en graso + resistente. me da curiosidad dónde cae el resto`,
      image: (u) => `${u}/cards/es-routine.jpg`,
    },
    spf: {
      caption: `así se ven las cuatro letras cuando vuelven — este tipo es más o menos 1 de cada 14 personas. ¿alguien más con tipo mate?`,
      image: (u) => `${u}/cards/es-spf.jpg`,
    },
    idols: {
      caption: `la pequeña consulta que construí — las mismas diez preguntas que hago en persona, unos 90 segundos. ¿qué querrías que te dijera la tuya?`,
      image: (u) => `${u}/cards/es-idols.jpg`,
    },
  },
};

/* ==================================================================
   영어 32개 — 주제 4개 × 8개. 각 글에 [훅 패턴]을 주석으로 남겼다.
   본문에 링크·이모지·홍보 문구 없음.
   ================================================================== */
const EN = {
  quiz: {
    label: "Skin type quiz",
    posts: [
      // [고백형] 전문가가 자기 피부를 6년 틀리게 읽은 이야기 — 방어를 푸는 오프너
      { id: "six-years", text: `i treated my own skin as sensitive for about six years.\n\nbought everything labeled calming. wondered why none of it did anything.\n\nturns out it was just dry. a dry barrier reacts to things a hydrated one shrugs off — so it looks sensitive without being sensitive.\n\nchanged the cleanser. the "sensitivity" left in three weeks.` },
      // [호기심 갭] 질문을 먼저 던져 독자가 자기 답을 만들게 한다
      { id: "quiet-question", text: `there's one question i ask that makes almost everyone go quiet for a second.\n\ntwo hours after you wash your face, with nothing on it — how does it actually feel?\n\ntight and papery is a completely different product list from comfortable with a bit of shine.\n\nmost people have never checked. that one answer moves half the routine.` },
      // [직접 언급] "복합성이라고 들어본 사람"을 호명
      { id: "combination", text: `if someone has ever told you that you have "combination skin" —\n\nthat word has never once helped anyone decide what to put on their face tonight. it just means oily in one place, not oily in another. which is most faces.\n\noil, reactivity, pigment, firmness. four separate things. read them separately and the aisle stops being a guessing game.` },
      // [장면형] 상담실 장면으로 열고, 경력은 배경으로만
      { id: "she-wasnt", text: `a client sat down last week and the first thing she said was "my skin is so sensitive."\n\nso i asked what happens when she washes it. squeaky, she said. like properly clean.\n\nthat squeak is the sound of a stripped barrier. twelve years in and it's still the most common thing i correct in the first five minutes.\n\nshe wasn't sensitive. she was over-washed.` },
      // [호기심 갭] 네 글자 시스템을 별자리 농담으로 낮춰 들어간다
      { id: "sixteen", text: `four letters, sixteen types. sounds like astrology until you watch it work.\n\nD or O — how much oil your barrier makes\nS or R — does it react before it tolerates\nP or N — what a healed spot leaves behind\nW or T — where you sit on firmness\n\nread them separately and suddenly the aisle is a filter, not a lottery.` },
      // [경고형] 잘못된 자가진단이 돈을 태우는 이야기
      { id: "wrong-half", text: `the two self-diagnoses that quietly waste the most money:\n\ncalling yourself sensitive when you're just dry. calling yourself oily when you're actually dehydrated.\n\nboth send you to the wrong half of the store for years. i've watched people spend thousands correcting the wrong problem.` },
      // [장면형/호기심] 두 가지 답으로 선반을 맞히는 관찰
      { id: "two-answers", text: `i can usually guess someone's bathroom shelf from two answers. not a party trick — it's that most shelves are built for a label, not a face.\n\ntell me what your skin does two hours after washing, and what a spot leaves behind when it heals.\n\nthat's half the reading right there.` },
      // [직접 언급] 기분이 아니라 측정이라는 재프레임
      { id: "not-a-mood", text: `your skin isn't a mood. it's four measurements.\n\nonce you know which side of each one you're on, you stop asking "is this product good" and start asking "is this product for me."\n\ndifferent question. much cheaper question.` },
    ],
  },
  routine: {
    label: "Layering",
    posts: [
      // [시간 절약] 한 줄로 끝내는 형식 자체가 약속
      { id: "thinnest", text: `the whole korean layering thing in one line:\n\nthinnest first. always.\n\nwatery essence, then serum, then cream. put the cream on first and everything above it is decoration.\n\nthat's it. that's the secret.` },
      // [호기심 갭] "속에서 빛나는 피부"의 시시한 진짜 답
      { id: "seven-layers", text: `people ask how idol skin looks lit from the inside instead of coated.\n\nthe boring true answer: several thin layers of the same watery essence beat one thick layer of anything.\n\npat, wait until it absorbs, repeat. hydration volume without the weight.` },
      // [경고형] 지성이 보습을 건너뛰면 생기는 일
      { id: "oily-moisturiser", text: `every time someone tells me they skip moisturizer because they're oily, i age a full year.\n\ndehydrated skin panics and makes MORE oil. gel-cream weight, every night.\n\nthe shine you're fighting is partly the step you skipped.` },
      // [장면형] 12년 = 지우는 일이었다는 배경
      { id: "sixty-seconds", text: `twelve years of putting makeup on faces means twelve years of taking it off.\n\nthe one step i won't negotiate: oil cleanse on dry skin, a full sixty seconds, before any water touches your face.\n\nsunscreen isn't water-soluble. go straight to the foam wash and you're just relocating it.` },
      // [직접 언급/경고] 뽀득거리는 사람을 호명
      { id: "squeaky", text: `if your face squeaks after washing, we need to talk.\n\nthat squeak is the sound of the lipids your barrier spent all night making — leaving.\n\nlow ph, no sulfates, and stop before it feels tight.` },
      // [경고형] 세 개 한꺼번에 넣으면 처음부터 다시
      { id: "one-at-a-time", text: `the advice nobody wants: one new product at a time, two weeks apart.\n\nadd three at once, your face reacts, and now you're pulling all three and starting from zero.\n\nslow is the fast way. i say this every day and watch people not do it.` },
      // [호기심 갭] 뒷면의 작은 숫자 하나
      { id: "ph", text: `the number that decides whether a cleanser helps you or wrecks you is printed on the back, in letters nobody reads.\n\nyour skin sits around ph 5. a ph 9 wash strips it, and it takes hours to recover.\n\n"low ph" isn't marketing. it's the whole difference.` },
      // [고백형] 10단계 루틴을 짜주던 시절의 실패
      { id: "four-steps", text: `i used to build ten-step routines for people because it felt thorough.\n\nalmost nobody made it past week two.\n\na four-step routine done every tired night beats a ten-step routine done on sundays. skin responds to repetition, not intensity. took me years to accept that.` },
    ],
  },
  spf: {
    label: "Sunscreen",
    posts: [
      // [장면형] 12년 차의 단 하나의 선택
      { id: "one-product", text: `twelve years in this job, and if i could only keep one product off my entire shelf — it wouldn't be a serum.\n\nsunscreen outperforms everything layered above it, and it's the only step that works on all sixteen skin types.\n\ntwo fingers' worth. reapplied.` },
      // [장면형] 가까이서 본 얼굴들의 차이
      { id: "teens", text: `the faces that stop me are the ones that started sunscreen at fifteen.\n\nmost sun damage is banked before twenty. that's why "i wear spf now" and "i've worn it since my teens" look completely different at thirty-five — even on the same routine today.` },
      // [직접 언급/경고] 갈색 자국 남는 사람을 호명
      { id: "pigment", text: `if your breakouts heal into brown marks that hang around for months, sunscreen isn't skincare for you. it's the treatment.\n\nyour melanocytes fire at basically any provocation — a spot, a scratch, ten minutes of sun.\n\nprevention costs about $18. correction takes a year.` },
      // [고백형] 선크림이 벌칙이던 시절
      { id: "no-cast", text: `i remember when wearing sunscreen felt like a punishment. white film, sticky, pilling under makeup.\n\nkorean formulas ended that era — and honestly, that's the entire reason people actually wear them.\n\na sunscreen you don't hate is the effective one.` },
      // [경고형] 월요일에 이 닦기 비유
      { id: "reapply", text: `applying sunscreen once at 8am and calling yourself protected is like brushing your teeth on monday for the whole week.\n\nreapplication is the part disciplined routines get right and everyone else skips.` },
      // [호기심 갭] 두 줄짜리 — 짧아서 저장되는 글
      { id: "cheap", text: `the highest-return product in almost every routine i've ever reviewed costs about $18.\n\nit's not the serum.` },
      // [호기심 갭] 창문 유리의 함정
      { id: "window", text: `the one that surprises everyone: window glass blocks uvb, not uva.\n\nuva is the one that goes deeper and does the ageing. sit by a window all day and you're collecting a quiet dose.\n\nevery day. for years.` },
      // [시간 절약] 계산을 대신 해준다
      { id: "math", text: `did the math so you don't have to:\n\nretinol to fade one sun spot — six months, about $40.\nsunscreen to never get it — $18, no waiting.\n\nthe cheap step comes first.` },
    ],
  },
  idols: {
    label: "Idol habits",
    posts: [
      // [장면형] 12년 백스테이지에서 나온 철학
      { id: "lying-down", text: `the routine that survives is the one you can do lying down. after twelve years backstage, this is the closest thing i have to a philosophy.\n\ncold sheet mask, something on the screen, ten minutes.\n\nit never feels like a chore — so it actually happens.` },
      // [직접 언급] 쉬는 날도 단계라는 재프레임
      { id: "rest-days", text: `bare-faced rest days ARE a skincare step, not a gap in one.\n\nskin that carries full glam and hot lighting five days a week needs the other two to recover.\n\ndoing less — on purpose, on schedule.` },
      // [시간 절약] 공짜 3분이 세럼 3주를 이긴다
      { id: "cold-first", text: `cold first, product second.\n\nice water before an early call does more for a puffy face in three minutes than any depuffing serum does in three weeks.\n\nit's free. it's what actually gets used.` },
      // [경고형] 지우기 전엔 아무것도 소용없다
      { id: "remove-first", text: `nothing you put ON matters if the day is still on your face.\n\nmakeup, spf, sebum — an oil melt first, then a low-ph wash, before a single treatment step goes on.\n\ni'll repeat this until i retire.` },
      // [시간 절약/장면] 냉장고 마스크의 진짜 이유
      { id: "fridge", text: `the sheet masks live in the fridge, by the box. not as a luxury — as friction removal.\n\nif grabbing one takes four seconds, you use it on the tired nights too.\n\nthat's the entire trick.` },
      // [장면형/경고] 아이돌 피부의 진실 — 유일하게 경력을 정면으로 쓰는 글
      { id: "consistency", text: `idols don't have better skin than you. i've read theirs up close for twelve years, so believe me on this one.\n\nthey have someone reading it correctly every week and adjusting. the products are mostly things you can already buy.\n\nthe difference is that nothing is guesswork.` },
      // [호기심 갭] 백스테이지의 시시한 비밀
      { id: "calendar", text: `backstage, nobody is doing anything exotic.\n\nordinary things, done at a frequency most people never reach.\n\nthe gap isn't the shelf. it's the calendar.` },
      // [호기심 갭] 컴백 준비는 빼는 일
      { id: "removal", text: `the part nobody posts: most of comeback prep is removal, not addition.\n\ncut the actives fighting each other. cut the fragrance. pull exfoliation back to twice a week.\n\nskin calms down. camera gets kind.` },
    ],
  },
};

/* ==================================================================
   스페인어 24개 — 보존용. ES 슬롯을 다시 열기 전까지는 나가지 않는다.
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
export function pickPost({ lang, theme, postId, hour, minute, day, seq } = {}) {
  const now = new Date();
  const h = typeof hour === "number" ? hour : now.getUTCHours();
  const m = typeof minute === "number" ? minute : now.getUTCMinutes();
  const useLang = lang && POOLS[lang] ? lang : langForHour(h);

  const pool = flatten(useLang);
  const perDay = (useLang === "es" ? ES_HOURS.length : 24 - ES_HOURS.length) * SLOTS_PER_HOUR;
  const dayIndex = typeof day === "number" ? day : Math.floor(now.getTime() / 86_400_000);
  const slot = Math.max(0, slotIndex(h, m, useLang));

  // seq가 오면 풀을 그 순번으로 직접 돈다 — warmup처럼 하루 게시 수가
  // 풀 크기의 약수가 되는 경우(64 ≡ 0 mod 32) 같은 글만 반복되는 걸 막는다.
  let post = pool[(typeof seq === "number" ? seq : dayIndex * perDay + slot) % pool.length];

  if (theme || postId) {
    const found = pool.find((p) => (!theme || p.theme === theme) && (!postId || p.id === postId));
    if (found) post = found;
  }

  const photo = PHOTO_REPLY[useLang][post.theme];

  return {
    lang: useLang,
    theme: post.theme,
    label: post.label,
    id: post.id,
    /** 본문 — 텍스트만. 링크·이미지 없음. */
    text: post.text,
    /** 본문 아래 하나 달리는 댓글: 실제 화면 캡처 + 참여 유도 캡션. 링크 없음. */
    photoReply: { text: photo.caption, image: photo.image(SITE) },
  };
}

export const THEME_KEYS = Object.keys(EN);
export const POOL_SIZES = { en: flatten("en").length, es: flatten("es").length };
