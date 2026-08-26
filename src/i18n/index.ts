import type { Lang } from "@/data/types";
import type { Copy } from "./types";
import { en } from "./en";
import { es } from "./es";
import { ko } from "./ko";

export type { Copy } from "./types";

const COPY: Record<Lang, Copy> = { en, es, ko };

/** 지원 언어. 새 언어를 추가하면 이 배열과 COPY에만 넣으면 된다. */
export const LANGS: Lang[] = ["en", "es", "ko"];

export function getCopy(lang: Lang): Copy {
  return COPY[lang] ?? en;
}

/** 언어별 URL 접두어. 영어는 루트라 접두어가 없다 (기존 주소를 그대로 지키기 위해). */
export function prefix(lang: Lang): string {
  return lang === "en" ? "" : `/${lang}`;
}

/** 해당 언어에서 어떤 경로를 써야 하는지 */
export function path(lang: Lang, rest: string): string {
  const p = prefix(lang) + rest;
  return p === "" ? "/" : p;
}

export function isLang(v: string): v is Lang {
  return (LANGS as string[]).includes(v);
}
