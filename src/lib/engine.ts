import { AXIS_MAX, QUESTIONS } from "@/data/questions";
import { PRODUCTS } from "@/data/products";
import { IDOLS } from "@/data/idols";
import type { AxisKey, AxisMeta, Band, Idol, Product, Score } from "@/data/types";

export const AXIS_ORDER: AxisKey[] = ["D", "S", "P", "W"];

export const AXIS_META: Record<AxisKey, AxisMeta> = {
  D: {
    left: "Dry", right: "Oily", title: "Oil production",
    copy: {
      neg: "Your barrier isn't making enough of its own lipids, so water leaves faster than it arrives. For you, sealing matters more than treating.",
      mid: "You're in the combination band — an oilier T-zone over comfortable cheeks. Treat the zones differently instead of treating the whole face the same way.",
      pos: "You make plenty of sebum. Long term that protects you, but it needs regular gentle clearing or the pores close over.",
    },
  },
  S: {
    left: "Sensitive", right: "Resistant", title: "Reactivity",
    copy: {
      neg: "Your barrier reacts before it tolerates. One new product at a time, fourteen days apart, and treat added fragrance as an active ingredient.",
      mid: "Reasonably tolerant. You can use most actives — just stagger the strong ones across different nights rather than stacking them.",
      pos: "A resilient barrier. You can build up to retinoids and acids faster than most people I see. Your risk is doing too much because you can.",
    },
  },
  P: {
    left: "Pigment-prone", right: "Even-toned", title: "Pigment response",
    copy: {
      neg: "Your melanocytes fire at any provocation — a spot, a scratch, ten minutes of sun. Here prevention beats correction, and sunscreen is the treatment.",
      mid: "You mark, but it clears. Keep one brightening active in rotation and you'll stay ahead of it.",
      pos: "Your tone holds even and marks clear quickly. Spend your routine budget on texture and firmness instead of brightening.",
    },
  },
  W: {
    left: "Wrinkle-prone", right: "Tight", title: "Structural ageing",
    copy: {
      neg: "Sun and lifestyle load are showing as lines. Two levers actually move this: collagen support at night, and sunscreen you never skip.",
      mid: "Early stage — this is the window where prevention is cheap. Daily SPF plus one mid-strength night active is enough.",
      pos: "Firm, well-protected skin. Nothing to correct yet. Keep doing exactly what you're doing.",
    },
  },
};

export const TYPE_NAMES: Record<string, string> = {
  DSPW: "The Fragile Porcelain", DSPT: "The Quiet Reactive", DSNW: "The Thin Veil", DSNT: "The Delicate Calm",
  DRPW: "The Sun-Marked Matte", DRPT: "The Steady Parchment", DRNW: "The Weathered Silk", DRNT: "The Clean Matte",
  OSPW: "The Restless Glow", OSPT: "The Reactive Dew", OSNW: "The Tired Shine", OSNT: "The Sensitive Gloss",
  ORPW: "The Marked Luminous", ORPT: "The Resilient Dew", ORNW: "The Loose Glow", ORNT: "The Glass Standard",
};

export const ALL_CODES = Object.keys(TYPE_NAMES);

const LETTER_PHRASE: Record<string, string> = {
  D: "runs dry", O: "runs oily", S: "reacts fast", R: "tolerates well",
  P: "holds pigment", N: "stays even", W: "shows lines", T: "stays firm",
};

export type Letters = { D: "D" | "O"; S: "S" | "R"; P: "P" | "N"; W: "W" | "T" };

export type AxisView = {
  key: AxisKey;
  meta: AxisMeta;
  /** 0–100. 슬라이더 위치 */
  pos: number;
  band: Band;
  leaning: string;
};

export type Report = {
  code: string;
  letters: Letters;
  name: string;
  line: string;
  rarity: string;
  axes: AxisView[];
  cards: { tag: string; head: string; body: string }[];
  routine: { am: Step[]; pm: Step[] };
  products: Product[];
  idols: Idol[];
};

export type Step = { t: string; s: string };

export function emptyScore(): Score {
  return { D: 0, S: 0, P: 0, W: 0 };
}

/** 선택한 보기 인덱스 배열 → 점수 */
export function tally(answers: number[]): Score {
  const score = emptyScore();
  QUESTIONS.forEach((q, i) => {
    const pick = q.a[answers[i]];
    if (!pick) return;
    for (const k of AXIS_ORDER) {
      const w = pick.weight[k];
      if (typeof w === "number") score[k] += w;
    }
  });
  return score;
}

function band(v: number): Band {
  return v <= -2 ? "neg" : v >= 2 ? "pos" : "mid";
}

function lettersFromScore(score: Score): Letters {
  return {
    D: score.D >= 0 ? "O" : "D",
    S: score.S >= 0 ? "R" : "S",
    P: score.P >= 0 ? "N" : "P",
    W: score.W >= 0 ? "T" : "W",
  };
}

export function codeOf(l: Letters): string {
  return `${l.D}${l.S}${l.P}${l.W}`;
}

function rarityOf(code: string): string {
  if (["ORNT", "DRNT"].includes(code)) return "Roughly 1 in 14 people test this way";
  if (["DSPW", "OSPW"].includes(code)) return "One of the most demanding types we see";
  return "Shared by about 6% of people who take this";
}

function lineOf(l: Letters): string {
  return (
    `Skin that ${LETTER_PHRASE[l.D]}, ${LETTER_PHRASE[l.S]}, ${LETTER_PHRASE[l.P]} and ${LETTER_PHRASE[l.W]}. ` +
    "One of sixteen types — and those four letters decide every product I put in front of you below."
  );
}

function cardsOf(l: Letters) {
  return [
    l.D === "D"
      ? { tag: "Texture", head: "Flaking before lunch", body: "Dry skin loses water through the day, so by midday foundation grabs at the dry patches. Hydrate in thin layers rather than reaching for a heavier cream." }
      : { tag: "Texture", head: "Shine comes back fast", body: "Oil rebuilds within hours. Blot, don't re-powder — powder over sebum is exactly what turns into visible texture by evening." },
    l.S === "S"
      ? { tag: "Tolerance", head: "Fragrance is an active", body: "On a reactive barrier, added fragrance behaves like an ingredient with a dose. Cut it before you cut anything else." }
      : { tag: "Tolerance", head: "You can build faster", body: "A resilient barrier gets to retinoids and acids sooner. Still add one at a time, so you know which one worked." },
    l.P === "P"
      ? { tag: "Tone", head: "Never pick a spot", body: "Your skin answers inflammation with pigment. A picked spot is a four-month mark. An unpicked one is a two-week one." }
      : { tag: "Tone", head: "Spend it elsewhere", body: "Marks clear on their own, so brightening serums are optional for you. Put that money into texture, firmness and sunscreen." },
    l.W === "W"
      ? { tag: "Structure", head: "Nights are for collagen", body: "Lines that stay when your face is relaxed answer to consistent night actives — never to occasional strong ones." }
      : { tag: "Structure", head: "Prevention window", body: "There is nothing to correct yet, which makes sunscreen the highest-return product in your routine by a wide margin." },
  ];
}

function routineOf(l: Letters): { am: Step[]; pm: Step[] } {
  const am: Step[] = [
    { t: "Water rinse or light cleanse", s: l.D === "O" ? "A low-pH gel wash — overnight sebum needs lifting." : "Lukewarm water only. Nothing has soiled your skin overnight." },
    { t: "Hydrating toner", s: "Pat in two thin layers, palms flat, until tacky." },
    l.P === "P"
      ? { t: "Vitamin C or niacinamide", s: "Antioxidants in the morning are pigment prevention, not correction." }
      : { t: "Hydrating serum", s: "Whatever your skin feels short of that day." },
    { t: "Moisturiser", s: l.D === "D" ? "Cream weight — you need the lipid seal." : "Gel or lotion weight only." },
    { t: "SPF 50, two fingers' worth", s: "The step that outperforms everything above it. Reapply if you are outside." },
  ];
  const pm: Step[] = [
    { t: "Oil cleanse", s: "Massage onto dry skin for 60 seconds. SPF is not water-soluble." },
    { t: "Second cleanse", s: "Low-pH foam or gel. Your face should feel clean, never squeaky." },
    l.S === "S"
      ? { t: "Skip acids tonight if you used them yesterday", s: "Alternate. Reactive skin needs recovery nights between actives." }
      : { t: "Exfoliating toner, 2–3 nights a week", s: "Chemical, never a scrub." },
    l.W === "W"
      ? { t: "Retinal or ferment ampoule", s: "Start twice weekly, build to nightly over six weeks." }
      : { t: "Barrier serum", s: "Keep the barrier fed while you sleep." },
    { t: "Seal", s: l.D === "D" ? "Cream, then a thin sleeping mask on dry patches." : "Gel-cream. Do not skip it because you are oily — dehydrated oily skin makes more oil." },
  ];
  return { am, pm };
}

function productsOf(l: Letters, strongPigment: boolean): Product[] {
  const picks: Product[] = [];
  picks.push(l.D === "D" ? PRODUCTS.cleanse_dry : PRODUCTS.cleanse_oil);
  picks.push(l.S === "S" ? PRODUCTS.toner_hydra : PRODUCTS.toner_exfo);
  picks.push(l.S === "S" ? PRODUCTS.serum_cica : PRODUCTS.serum_hydra);
  if (l.P === "P") picks.push(strongPigment ? PRODUCTS.serum_vitc : PRODUCTS.serum_bright);
  if (l.W === "W") picks.push(l.S === "S" ? PRODUCTS.serum_ferment : PRODUCTS.serum_retinal);
  picks.push(l.D === "D" ? PRODUCTS.cream_rich : l.S === "S" ? PRODUCTS.cream_barrier : PRODUCTS.cream_light);
  picks.push(l.D === "O" ? PRODUCTS.spf_oily : PRODUCTS.spf_all);
  picks.push(l.D === "O" && l.S === "R" ? PRODUCTS.mask_clay : PRODUCTS.mask_sheet);
  return picks;
}

function idolsOf(l: Letters): Idol[] {
  return [
    l.D === "D" ? IDOLS.layering : IDOLS.cleansing,
    l.S === "S" ? IDOLS.gentle : IDOLS.hydration,
    l.P === "P" || l.W === "W" ? IDOLS.spf : IDOLS.depuff,
  ];
}

function assemble(letters: Letters, axes: AxisView[], strongPigment: boolean): Report {
  const code = codeOf(letters);
  return {
    code,
    letters,
    name: TYPE_NAMES[code] ?? "Your skin type",
    line: lineOf(letters),
    rarity: rarityOf(code),
    axes,
    cards: cardsOf(letters),
    routine: routineOf(letters),
    products: productsOf(letters, strongPigment),
    idols: idolsOf(letters),
  };
}

/** 퀴즈 응답으로 만든 개인 리포트 — 슬라이더가 실제 점수 위치에 선다. */
export function reportFromScore(score: Score): Report {
  const letters = lettersFromScore(score);
  const axes: AxisView[] = AXIS_ORDER.map((k) => {
    const max = AXIS_MAX[k];
    const raw = ((score[k] + max) / (max * 2)) * 100;
    const b = band(score[k]);
    return {
      key: k,
      meta: AXIS_META[k],
      pos: Math.min(94, Math.max(6, Math.round(raw))),
      band: b,
      leaning: b === "neg" ? AXIS_META[k].left : b === "pos" ? AXIS_META[k].right : "Balanced",
    };
  });
  return assemble(letters, axes, score.P <= -4);
}

/**
 * 코드만으로 만드는 리포트 — /type/[code] 정적 페이지용.
 * 점수를 모르니 슬라이더는 각 방향의 대표 위치(25 / 75)에 둔다.
 */
export function reportFromCode(code: string): Report | null {
  if (!TYPE_NAMES[code]) return null;
  const letters: Letters = {
    D: code[0] as "D" | "O",
    S: code[1] as "S" | "R",
    P: code[2] as "P" | "N",
    W: code[3] as "W" | "T",
  };
  const negSide: Record<AxisKey, boolean> = {
    D: letters.D === "D", S: letters.S === "S", P: letters.P === "P", W: letters.W === "W",
  };
  const axes: AxisView[] = AXIS_ORDER.map((k) => ({
    key: k,
    meta: AXIS_META[k],
    pos: negSide[k] ? 25 : 75,
    band: negSide[k] ? "neg" : "pos",
    leaning: negSide[k] ? AXIS_META[k].left : AXIS_META[k].right,
  }));
  return assemble(letters, axes, false);
}
