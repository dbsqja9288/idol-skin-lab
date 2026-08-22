import type { AxisKey, AxisMeta, Lang, Question } from "@/data/types";

export type StepKey = "cleanse" | "toner" | "serum" | "night" | "moisturiser" | "spf" | "weekly";

/**
 * 언어 하나가 제공해야 하는 문구 전부.
 *
 * 이 인터페이스를 만족하는 파일을 하나 더 만들면 새 언어가 추가된다.
 * TypeScript가 빠뜨린 항목을 빌드에서 잡아주므로 번역 누락이 배포되지 않는다.
 */
export type Copy = {
  lang: Lang;
  /** <html lang="…"> 에 들어갈 값 */
  htmlLang: string;
  /** 언어 전환 버튼에 보일 이름 */
  label: string;

  meta: {
    tagline: string;
    description: string;
    keywords: string[];
  };

  nav: { test: string; types: string; about: string };

  footer: {
    disclaimer: string;
    affiliate: string;
    idols: string;
    contact: string;
    links: { about: string; types: string; privacy: string; terms: string; contact: string };
  };

  intro: {
    eyebrow: string;
    /** 헤드라인은 강조 부분을 기준으로 셋으로 나눈다 */
    h1: [string, string, string];
    lede: string;
    cta: string;
    meta: string;
    cred: { n: string; t: string }[];
    face: { tzone: string; cheeks: string; jaw: string };
  };

  quiz: {
    back: string;
    oneMoment: string;
    loading: string[];
  };

  questions: Question[];

  axisMeta: Record<AxisKey, AxisMeta>;
  balanced: string;

  typeNames: Record<string, string>;
  letterPhrase: Record<string, string>;
  /** 네 구절을 받아 한 문장으로 만든다 */
  typeLine: (a: string, b: string, c: string, d: string) => string;

  rarity: { common: string; demanding: string; rare: string };

  sections: {
    resultEyebrow: string;
    pageEyebrow: string;
    axesTitle: string;
    axesNoteQuiz: string;
    axesNotePage: string;
    cardsTitle: string;
    cardsNote: string;
    routineTitle: string;
    routineNote: string;
    morning: string;
    morningSub: string;
    evening: string;
    eveningSub: string;
    productsTitle: string;
    productsNote: string;
    /** 제품 목록 끝에 조용히 붙는 제휴 고지 (법적으로 필요하다 — 아래 주석 참고) */
    affiliateNote: string;
    idolsTitle: string;
    idolsNote: string;
  };

  cards: Record<"dry" | "oily" | "sensitive" | "resistant" | "pigment" | "even" | "wrinkle" | "tight", {
    tag: string;
    head: string;
    body: string;
  }>;

  routine: {
    amCleanseOily: string; amCleanseDry: string; amCleanse: string;
    amToner: string; amTonerSub: string;
    amVitc: string; amVitcSub: string; amSerum: string; amSerumSub: string;
    amCream: string; amCreamDry: string; amCreamOily: string;
    amSpf: string; amSpfSub: string;
    pmOil: string; pmOilSub: string;
    pmSecond: string; pmSecondSub: string;
    pmSkipAcid: string; pmSkipAcidSub: string; pmExfo: string; pmExfoSub: string;
    pmRetinal: string; pmRetinalSub: string; pmBarrier: string; pmBarrierSub: string;
    pmSeal: string; pmSealDry: string; pmSealOily: string;
  };

  productStep: Record<StepKey, string>;
  /** 카테고리 소제목 밑에 붙는 한 줄 — 이 단계가 왜 있는지 */
  productStepNote: Record<StepKey, string>;
  /** 어떤 글자 때문에 이 제품이 뽑혔는지 — 카드 위 배지 문구 */
  productReason: Record<string, string>;
  /** 제품 key → 왜 **너의** 피부에 이게 맞는지 */
  productWhy: Record<string, string>;
  /** 인물 key → 습관 설명과 한 줄 */
  idolCopy: Record<string, { habit: string; pull: string }>;

  share: {
    prompt: (code: string) => string;
    text: (code: string, name: string) => string;
    tags: (code: string) => string;
    copied: string;
    linkCopied: string;
    manualCopy: string;
    copyLink: string;
  };

  callout: { title: string; body: string; placeholder: string; button: string; sent: string };
  restart: string;

  typeIndex: {
    eyebrow: string;
    title: string;
    lede: string;
    howTitle: string;
    how: string[];
    listTitle: string;
    unsureTitle: string;
    unsureBody: string;
    credit: string;
    metaTitle: string;
    metaDescription: string;
  };

  typePage: { notYouTitle: string; notYouBody: string; cta: string };
};
