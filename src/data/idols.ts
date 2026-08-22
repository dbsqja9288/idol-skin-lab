import type { Idol } from "./types";

/**
 * 인물 정보 — 이름·그룹·이니셜만. 관리법 설명은 src/i18n/{en,es}.ts 에 있다.
 *
 * 공개된 인터뷰·뷰티 기사에서 본인이 직접 말한 습관만 쓴다.
 * 이미지·초상은 쓰지 않고, 어떤 아티스트도 이 사이트와 제휴하지 않는다.
 */
export const IDOLS: Record<string, Idol> = {
  hydration: { key: "hydration", n: "Jennie",   g: "BLACKPINK",           i: "J" },
  gentle:    { key: "gentle",    n: "IU",       g: "Soloist",             i: "I" },
  spf:       { key: "spf",       n: "Taeyeon",  g: "Girls' Generation",   i: "T" },
  layering:  { key: "layering",  n: "Wonyoung", g: "IVE",                 i: "W" },
  cleansing: { key: "cleansing", n: "Karina",   g: "aespa",               i: "K" },
  depuff:    { key: "depuff",    n: "Rosé",     g: "BLACKPINK",           i: "R" },
};
