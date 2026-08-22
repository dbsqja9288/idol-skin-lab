export type AxisKey = "D" | "S" | "P" | "W";
export type Band = "neg" | "mid" | "pos";
export type Score = Record<AxisKey, number>;

export type Lang = "en" | "es";

/** 언어와 무관한 제품 정보. 설명(step/why)은 i18n에 있다. */
export type Product = {
  key: string;
  brand: string;
  name: string;
  price: string;
  c: [string, string];
};

/** 언어와 무관한 인물 정보. 습관 설명은 i18n에 있다. */
export type Idol = {
  key: string;
  n: string;
  g: string;
  i: string;
};

export type Choice = { label: string; sub?: string };
export type Question = { theme: string; q: string; hint: string; a: Choice[] };
export type AxisMeta = { left: string; right: string; title: string; copy: Record<Band, string> };
