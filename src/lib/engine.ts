import { AXIS_MAX, QUESTION_WEIGHTS } from "@/data/questions";
import { PRODUCTS } from "@/data/products";
import { IDOLS } from "@/data/idols";
import type { AxisKey, AxisMeta, Band, Idol, Lang, Product, Score } from "@/data/types";
import { getCopy } from "@/i18n";
import type { Copy, StepKey } from "@/i18n/types";

export const AXIS_ORDER: AxisKey[] = ["D", "S", "P", "W"];

/** 코드 16개는 언어와 무관하다 — URL도 두 언어가 공유한다. */
export const ALL_CODES = [
  "DSPW", "DSPT", "DSNW", "DSNT", "DRPW", "DRPT", "DRNW", "DRNT",
  "OSPW", "OSPT", "OSNW", "OSNT", "ORPW", "ORPT", "ORNW", "ORNT",
];

export type Letters = { D: "D" | "O"; S: "S" | "R"; P: "P" | "N"; W: "W" | "T" };

export type AxisView = { key: AxisKey; meta: AxisMeta; pos: number; band: Band; leaning: string };
export type Step = { t: string; s: string };
export type ReasonKey = "D" | "O" | "S" | "R" | "P" | "N" | "W" | "T" | "all";
export type ProductView = Product & {
  /** 카테고리 key — 리포트에서 소제목으로 묶는 데 쓴다 */
  group: StepKey;
  step: string;
  why: string;
  /** 이 제품을 뽑은 글자 */
  reasonKey: ReasonKey;
  reason: string;
};
export type IdolView = Idol & { habit: string; pull: string; method: { name: string; line: string } };

/** 매칭된 아이돌 한 명 + 그 방식을 굴리는 제품 3개 */
export type IdolMatch = { idol: IdolView; kit: ProductView[] };

export type Report = {
  lang: Lang;
  code: string;
  letters: Letters;
  name: string;
  line: string;
  rarity: string;
  axes: AxisView[];
  cards: { tag: string; head: string; body: string }[];
  routine: { am: Step[]; pm: Step[] };
  products: ProductView[];
  /** 사용자 타입에 가장 가까운 아이돌 한 명과 그 방식용 제품 3개 */
  match: IdolMatch;
  /** 나머지 두 명 — 방식만, 제품 없이 */
  others: IdolView[];
};

export function emptyScore(): Score {
  return { D: 0, S: 0, P: 0, W: 0 };
}

/** 선택한 보기 인덱스 배열 → 점수. 문구가 아니라 배점표를 쓰므로 언어와 무관하다. */
export function tally(answers: number[]): Score {
  const score = emptyScore();
  QUESTION_WEIGHTS.forEach((options, i) => {
    const w = options[answers[i]];
    if (!w) return;
    for (const k of AXIS_ORDER) {
      const v = w[k];
      if (typeof v === "number") score[k] += v;
    }
  });
  return score;
}

function band(v: number): Band {
  return v <= -2 ? "neg" : v >= 2 ? "pos" : "mid";
}

export function codeOf(l: Letters): string {
  return `${l.D}${l.S}${l.P}${l.W}`;
}

function rarityOf(code: string, c: Copy): string {
  if (["ORNT", "DRNT"].includes(code)) return c.rarity.rare;
  if (["DSPW", "OSPW"].includes(code)) return c.rarity.demanding;
  return c.rarity.common;
}

function cardsOf(l: Letters, c: Copy) {
  return [
    l.D === "D" ? c.cards.dry : c.cards.oily,
    l.S === "S" ? c.cards.sensitive : c.cards.resistant,
    l.P === "P" ? c.cards.pigment : c.cards.even,
    l.W === "W" ? c.cards.wrinkle : c.cards.tight,
  ];
}

function routineOf(l: Letters, c: Copy): { am: Step[]; pm: Step[] } {
  const r = c.routine;
  const am: Step[] = [
    { t: r.amCleanse, s: l.D === "O" ? r.amCleanseOily : r.amCleanseDry },
    { t: r.amToner, s: r.amTonerSub },
    l.P === "P" ? { t: r.amVitc, s: r.amVitcSub } : { t: r.amSerum, s: r.amSerumSub },
    { t: r.amCream, s: l.D === "D" ? r.amCreamDry : r.amCreamOily },
    { t: r.amSpf, s: r.amSpfSub },
  ];
  const pm: Step[] = [
    { t: r.pmOil, s: r.pmOilSub },
    { t: r.pmSecond, s: r.pmSecondSub },
    l.S === "S" ? { t: r.pmSkipAcid, s: r.pmSkipAcidSub } : { t: r.pmExfo, s: r.pmExfoSub },
    l.W === "W" ? { t: r.pmRetinal, s: r.pmRetinalSub } : { t: r.pmBarrier, s: r.pmBarrierSub },
    { t: r.pmSeal, s: l.D === "D" ? r.pmSealDry : r.pmSealOily },
  ];
  return { am, pm };
}

/** 리포트에 나오는 카테고리 순서. 루틴을 쓰는 순서 그대로다. */
export const STEP_ORDER: StepKey[] = ["cleanse", "toner", "serum", "night", "moisturiser", "spf", "weekly"];

/** 제품 key → 어떤 단계에 속하는지. 언어별 단계명은 copy.productStep에 있다. */
const STEP_OF: Record<string, StepKey> = {
  cleanse_dry: "cleanse", cleanse_oil: "cleanse",
  toner_hydra: "toner", toner_exfo: "toner",
  serum_hydra: "serum", serum_cica: "serum", serum_bright: "serum", serum_vitc: "serum",
  serum_retinal: "night", serum_ferment: "night",
  cream_rich: "moisturiser", cream_light: "moisturiser", cream_barrier: "moisturiser",
  spf_all: "spf", spf_oily: "spf",
  mask_sheet: "weekly", mask_clay: "weekly",
};

function view(p: Product, reasonKey: ReasonKey, c: Copy): ProductView {
  const group = STEP_OF[p.key];
  return {
    ...p,
    group,
    step: c.productStep[group],
    why: c.productWhy[p.key],
    reasonKey,
    reason: c.productReason[reasonKey],
  };
}

/**
 * 어떤 제품을 뽑을지, 그리고 **어느 글자 때문에 뽑았는지**.
 * 이유를 함께 들고 다녀야 카드에 "네 D 때문에 이걸 골랐다"고 말해줄 수 있다.
 */
function productsOf(l: Letters, strongPigment: boolean, c: Copy): ProductView[] {
  const picks: [Product, ReasonKey][] = [];

  picks.push(l.D === "D" ? [PRODUCTS.cleanse_dry, "D"] : [PRODUCTS.cleanse_oil, "O"]);
  picks.push(l.S === "S" ? [PRODUCTS.toner_hydra, "S"] : [PRODUCTS.toner_exfo, "R"]);
  picks.push(l.S === "S" ? [PRODUCTS.serum_cica, "S"] : [PRODUCTS.serum_hydra, "R"]);
  if (l.P === "P") picks.push([strongPigment ? PRODUCTS.serum_vitc : PRODUCTS.serum_bright, "P"]);
  if (l.W === "W") picks.push([l.S === "S" ? PRODUCTS.serum_ferment : PRODUCTS.serum_retinal, "W"]);
  picks.push(
    l.D === "D"
      ? [PRODUCTS.cream_rich, "D"]
      : l.S === "S"
        ? [PRODUCTS.cream_barrier, "S"]
        : [PRODUCTS.cream_light, "O"],
  );
  picks.push(l.D === "O" ? [PRODUCTS.spf_oily, "O"] : [PRODUCTS.spf_all, "all"]);
  picks.push(l.D === "O" && l.S === "R" ? [PRODUCTS.mask_clay, "O"] : [PRODUCTS.mask_sheet, "D"]);

  return picks.map(([p, r]) => view(p, r, c));
}

/** 카테고리별로 묶어 리포트에 넘긴다. 빈 카테고리는 나오지 않는다. */
export function groupProducts(products: ProductView[]) {
  return STEP_ORDER.map((g) => ({ group: g, items: products.filter((p) => p.group === g) })).filter(
    (x) => x.items.length > 0,
  );
}

function idolView(key: string, c: Copy): IdolView {
  return { ...IDOLS[key], ...c.idolCopy[key], method: c.idolMethod[key] };
}

/**
 * 글자 하나가 아이돌 한 명의 '방식'에 대응한다.
 * 실제 인물의 피부 타입을 주장하는 게 아니라, 그 사람이 인터뷰에서 말한 **관리 방식**이
 * 이 타입에 맞는지로 고른다. (본인 피부에 대한 사실 주장은 하지 않는다.)
 */
const IDOL_FOR_LETTER: Record<string, string> = {
  D: "layering", O: "cleansing",
  S: "gentle", R: "hydration",
  P: "spf", N: "depuff",
  W: "spf", T: "depuff",
};

/** 가장 두드러진 축의 글자를 고른다. 점수가 없으면(정적 페이지) 정해진 우선순위를 쓴다. */
function dominantLetter(l: Letters, score?: Score): keyof typeof IDOL_FOR_LETTER {
  if (score) {
    let best: AxisKey = "D";
    for (const k of AXIS_ORDER) if (Math.abs(score[k]) > Math.abs(score[best])) best = k;
    return l[best];
  }
  // 루틴을 가장 크게 가르는 순서: 반응성 → 유분 → 색소 → 탄력
  for (const k of ["S", "D", "P", "W"] as AxisKey[]) {
    if (l[k] === "S" || l[k] === "D" || l[k] === "P" || l[k] === "W") return l[k];
  }
  return l.D;
}

/**
 * 방식별 제품 3개.
 * 어떤 방식이든 **사용자 타입에 맞는 제품**으로 채운다 — 아이돌이 쓴다고 주장하지 않는다.
 */
function kitFor(method: string, l: Letters, strongPigment: boolean): [Product, ReasonKey][] {
  const toner: [Product, ReasonKey] = l.S === "S" ? [PRODUCTS.toner_hydra, "S"] : [PRODUCTS.toner_exfo, "R"];
  const cream: [Product, ReasonKey] =
    l.D === "D" ? [PRODUCTS.cream_rich, "D"] : l.S === "S" ? [PRODUCTS.cream_barrier, "S"] : [PRODUCTS.cream_light, "O"];
  const cleanser: [Product, ReasonKey] = l.D === "D" ? [PRODUCTS.cleanse_dry, "D"] : [PRODUCTS.cleanse_oil, "O"];
  const spf: [Product, ReasonKey] = l.D === "O" ? [PRODUCTS.spf_oily, "O"] : [PRODUCTS.spf_all, "all"];
  const mask: [Product, ReasonKey] =
    l.D === "O" && l.S === "R" ? [PRODUCTS.mask_clay, "O"] : [PRODUCTS.mask_sheet, "D"];
  const bright: [Product, ReasonKey] =
    l.P === "P" ? [strongPigment ? PRODUCTS.serum_vitc : PRODUCTS.serum_bright, "P"] : [PRODUCTS.serum_hydra, "N"];
  const treat: [Product, ReasonKey] = l.S === "S" ? [PRODUCTS.serum_cica, "S"] : [PRODUCTS.serum_hydra, "R"];

  switch (method) {
    case "layering":  return [toner, [PRODUCTS.serum_hydra, l.D === "D" ? "D" : "O"], cream];
    case "cleansing": return [cleanser, toner, mask];
    case "gentle":    return [cleanser, treat, cream];
    case "hydration": return [mask, [PRODUCTS.serum_hydra, "all"], cream];
    case "spf":       return [spf, bright, cream];
    default:          return [toner, cream, mask]; // depuff
  }
}

function matchOf(l: Letters, strongPigment: boolean, c: Copy, score?: Score): { match: IdolMatch; others: IdolView[] } {
  const heroKey = IDOL_FOR_LETTER[dominantLetter(l, score)];
  const pool = [
    IDOL_FOR_LETTER[l.D], IDOL_FOR_LETTER[l.S], IDOL_FOR_LETTER[l.P], IDOL_FOR_LETTER[l.W],
  ].filter((k, i, arr) => k !== heroKey && arr.indexOf(k) === i);

  return {
    match: {
      idol: idolView(heroKey, c),
      kit: kitFor(heroKey, l, strongPigment).map(([p, r]) => view(p, r, c)),
    },
    others: pool.slice(0, 2).map((k) => idolView(k, c)),
  };
}

function assemble(
  lang: Lang, letters: Letters, axes: AxisView[], strongPigment: boolean, score?: Score,
): Report {
  const c = getCopy(lang);
  const code = codeOf(letters);
  const lp = c.letterPhrase;
  const { match, others } = matchOf(letters, strongPigment, c, score);
  return {
    lang,
    code,
    letters,
    name: c.typeNames[code] ?? code,
    line: c.typeLine(lp[letters.D], lp[letters.S], lp[letters.P], lp[letters.W]),
    rarity: rarityOf(code, c),
    axes,
    cards: cardsOf(letters, c),
    routine: routineOf(letters, c),
    products: productsOf(letters, strongPigment, c),
    match,
    others,
  };
}

/** 퀴즈 응답으로 만든 개인 리포트 — 슬라이더가 실제 점수 위치에 선다. */
export function reportFromScore(score: Score, lang: Lang): Report {
  const c = getCopy(lang);
  const letters: Letters = {
    D: score.D >= 0 ? "O" : "D",
    S: score.S >= 0 ? "R" : "S",
    P: score.P >= 0 ? "N" : "P",
    W: score.W >= 0 ? "T" : "W",
  };
  const axes: AxisView[] = AXIS_ORDER.map((k) => {
    const max = AXIS_MAX[k];
    const b = band(score[k]);
    const meta = c.axisMeta[k];
    return {
      key: k,
      meta,
      pos: Math.min(94, Math.max(6, Math.round(((score[k] + max) / (max * 2)) * 100))),
      band: b,
      leaning: b === "neg" ? meta.left : b === "pos" ? meta.right : c.balanced,
    };
  });
  return assemble(lang, letters, axes, score.P <= -4, score);
}

/**
 * 코드만으로 만드는 리포트 — /type/[code] 정적 페이지용.
 * 점수를 모르니 슬라이더는 각 방향의 대표 위치(25 / 75)에 둔다.
 */
export function reportFromCode(code: string, lang: Lang): Report | null {
  if (!ALL_CODES.includes(code)) return null;
  const c = getCopy(lang);
  const letters: Letters = {
    D: code[0] as "D" | "O",
    S: code[1] as "S" | "R",
    P: code[2] as "P" | "N",
    W: code[3] as "W" | "T",
  };
  const negSide: Record<AxisKey, boolean> = {
    D: letters.D === "D", S: letters.S === "S", P: letters.P === "P", W: letters.W === "W",
  };
  const axes: AxisView[] = AXIS_ORDER.map((k) => {
    const meta = c.axisMeta[k];
    return {
      key: k,
      meta,
      pos: negSide[k] ? 25 : 75,
      band: negSide[k] ? ("neg" as Band) : ("pos" as Band),
      leaning: negSide[k] ? meta.left : meta.right,
    };
  });
  return assemble(lang, letters, axes, false);
}
