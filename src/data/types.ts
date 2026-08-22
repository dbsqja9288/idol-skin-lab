/** 네 축. 각 축은 두 글자 중 하나로 결론난다. */
export type AxisKey = "D" | "S" | "P" | "W";
export type Band = "neg" | "mid" | "pos";
export type Score = Record<AxisKey, number>;

export type Choice = {
  label: string;
  sub?: string;
  weight: Partial<Score>;
};

export type Question = {
  theme: string;
  q: string;
  hint: string;
  a: Choice[];
};

export type Product = {
  key: string;
  step: string;
  brand: string;
  name: string;
  why: string;
  price: string;
  c: [string, string];
};

export type Idol = {
  key: string;
  n: string;
  g: string;
  i: string;
  habit: string;
  pull: string;
};

export type AxisMeta = {
  left: string;
  right: string;
  title: string;
  copy: Record<Band, string>;
};
