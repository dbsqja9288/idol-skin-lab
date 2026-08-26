import type { Lang, Product } from "@/data/types";
import { KO_PRODUCTS } from "@/data/ko-products";

/**
 * 제휴 링크를 한 곳에서 만든다.
 *
 * ★ 승인 나면 Vercel → Settings → Environment Variables 에 값만 넣고 Redeploy 하면 끝.
 *   코드는 다시 고칠 일이 없다. 값이 없어도 링크는 정상 작동하고 수익 추적만 안 붙는다.
 *
 *   NEXT_PUBLIC_AMAZON_TAG       = idolskinlab-20     (Amazon US)
 *   NEXT_PUBLIC_AMAZON_ES_TAG    = xxxxx-21           (Amazon 스페인 — 별도 가입 필요)
 *   NEXT_PUBLIC_AMAZON_MX_TAG    = xxxxx-20           (Amazon 멕시코 — 별도 가입 필요)
 *   NEXT_PUBLIC_OLIVEYOUNG_PARAM = affiliateCode=xxx  (올리브영 글로벌)
 *   NEXT_PUBLIC_YESSTYLE_PARAM   = ref=xxx            (YesStyle)
 *   NEXT_PUBLIC_STYLEVANA_PARAM  = aff=xxx            (Stylevana)
 *   NEXT_PUBLIC_COUPANG_PARAM    = subId=xxx          (쿠팡파트너스)
 *
 * ⚠️ 아마존은 **마켓플레이스마다 계정이 별개다.** amazon.com 태그는 amazon.es에서
 *    한 푼도 붙지 않는다. 스페인·멕시코는 각각 따로 가입해야 하고,
 *    아르헨티나·칠레·콜롬비아·페루에는 아마존 마켓플레이스 자체가 없다.
 *    그래서 스페인어판은 YesStyle과 Stylevana를 앞에 세운다.
 *
 * ⚠️ 검색 URL 형식은 스토어가 바꿀 수 있다. 한 번만 실제로 검색해서 주소창을 확인하고,
 *    다르면 아래 SEARCH_* 환경변수로 갈아끼우면 된다 (배포 없이 30초).
 *      NEXT_PUBLIC_SEARCH_YESSTYLE = https://www.yesstyle.com/en/search.html?q={q}
 */

const env = (k: string) => process.env[k]?.trim() || "";

export type StoreKey = "amazon" | "amazon_es" | "amazon_mx" | "oliveyoung" | "oliveyoung_kr" | "naver" | "yesstyle" | "stylevana" | "coupang";

type Store = {
  label: string;
  /** {q} 자리에 인코딩된 검색어가 들어간다 */
  template: string;
  /** 링크 뒤에 붙일 제휴 파라미터 (key=value 형태) */
  param: string;
};

function store(label: string, fallbackTemplate: string, templateEnv: string, param: string): Store {
  return { label, template: env(templateEnv) || fallbackTemplate, param };
}

const STORES: Record<StoreKey, Store> = {
  amazon: store("Amazon", "https://www.amazon.com/s?k={q}", "NEXT_PUBLIC_SEARCH_AMAZON",
    env("NEXT_PUBLIC_AMAZON_TAG") ? `tag=${encodeURIComponent(env("NEXT_PUBLIC_AMAZON_TAG"))}` : ""),
  amazon_es: store("Amazon ES", "https://www.amazon.es/s?k={q}", "NEXT_PUBLIC_SEARCH_AMAZON_ES",
    env("NEXT_PUBLIC_AMAZON_ES_TAG") ? `tag=${encodeURIComponent(env("NEXT_PUBLIC_AMAZON_ES_TAG"))}` : ""),
  amazon_mx: store("Amazon MX", "https://www.amazon.com.mx/s?k={q}", "NEXT_PUBLIC_SEARCH_AMAZON_MX",
    env("NEXT_PUBLIC_AMAZON_MX_TAG") ? `tag=${encodeURIComponent(env("NEXT_PUBLIC_AMAZON_MX_TAG"))}` : ""),
  oliveyoung: store("Olive Young", "https://global.oliveyoung.com/display/search?query={q}", "NEXT_PUBLIC_SEARCH_OLIVEYOUNG",
    env("NEXT_PUBLIC_OLIVEYOUNG_PARAM")),
  yesstyle: store("YesStyle", "https://www.yesstyle.com/en/search.html?q={q}", "NEXT_PUBLIC_SEARCH_YESSTYLE",
    env("NEXT_PUBLIC_YESSTYLE_PARAM")),
  stylevana: store("Stylevana", "https://www.stylevana.com/en_US/catalogsearch/result/?q={q}", "NEXT_PUBLIC_SEARCH_STYLEVANA",
    env("NEXT_PUBLIC_STYLEVANA_PARAM")),
  coupang: store("쿠팡", "https://www.coupang.com/np/search?q={q}", "NEXT_PUBLIC_SEARCH_COUPANG",
    env("NEXT_PUBLIC_COUPANG_PARAM")),
  oliveyoung_kr: store("올리브영", "https://www.oliveyoung.co.kr/store/search/getSearchMain.do?query={q}", "NEXT_PUBLIC_SEARCH_OLIVEYOUNG_KR",
    env("NEXT_PUBLIC_OLIVEYOUNG_KR_PARAM")),
  naver: store("네이버쇼핑", "https://search.shopping.naver.com/search/all?query={q}", "NEXT_PUBLIC_SEARCH_NAVER",
    env("NEXT_PUBLIC_NAVER_PARAM")),
};

/**
 * 언어별 스토어 노출 순서.
 *
 * 영어권  — 아마존 US가 압도적으로 익숙하다. 올리브영이 요율은 높지만 배송이 낯설다.
 * 스페인어권 — 아마존은 스페인·멕시코에만 있고 남미 대부분은 못 쓴다.
 *              YesStyle과 Stylevana가 전 세계 배송이라 여기가 1순위가 된다.
 */
const DEFAULT_ORDER: Record<Lang, StoreKey[]> = {
  en: ["amazon", "oliveyoung"],
  es: ["yesstyle", "oliveyoung", "stylevana"],
  // 한국은 쿠팡이 압도적이다. 올리브영은 국내몰(kr)로 따로 잡는다 —
  // global.oliveyoung.com은 해외배송용이라 한국 사용자에겐 맞지 않는다.
  ko: ["coupang", "oliveyoung_kr", "naver"],
};

/** 환경변수로 덮어쓸 수 있다: NEXT_PUBLIC_STORES_ES="yesstyle,amazon_es,oliveyoung" */
export function activeStores(lang: Lang): StoreKey[] {
  const raw = env(`NEXT_PUBLIC_STORES_${lang.toUpperCase()}`);
  if (raw) {
    const picked = raw.split(",").map((s) => s.trim() as StoreKey).filter((s) => s in STORES);
    if (picked.length) return picked;
  }
  return DEFAULT_ORDER[lang] ?? DEFAULT_ORDER.en;
}

export function storeLabel(key: StoreKey): string {
  return STORES[key].label;
}

/**
 * 제품 key → 스토어별 고정 링크. 비워두면 브랜드+제품명 검색 링크가 자동으로 쓰인다.
 * 검색 링크는 상품이 단종돼도 죽지 않아서 관리가 편하다. 꼭 필요할 때만 채울 것.
 *
 *   spf_all: { amazon: "https://www.amazon.com/dp/XXXXXXXX?tag=..." },
 */
export const OVERRIDE: Partial<Record<string, Partial<Record<StoreKey, string>>>> = {
  // ── 쿠팡파트너스 실제 링크를 여기에 붙인다 ──────────────────────────
  // 파트너스에서 상품 링크를 만들면 link.coupang.com/a/XXXXXX 형태로 나온다.
  // 그건 이미 추적 코드가 박힌 완성형 주소라 param을 따로 붙이면 안 되고,
  // 아래처럼 통째로 넣으면 검색 링크 대신 그 주소가 쓰인다.
  //
  //   spf_all:     { coupang: "https://link.coupang.com/a/XXXXXX" },
  //   cleanse_dry: { coupang: "https://link.coupang.com/a/YYYYYY" },
  //
  // 안 채운 제품은 자동으로 한글 검색 링크가 나가므로 하나씩 채워도 된다.
};

/**
 * 검색어. 콜론·가운뎃점은 스토어 검색을 방해해서 뺀다.
 *
 * 한국어판은 한글 검색어를 쓴다 — 쿠팡에서 "Round Lab 1025 Dokdo Cleanser"를 치면
 * 결과가 거의 안 나오지만 "라운드랩 독도 클렌저"는 바로 나온다.
 */
function queryFor(p: Product, lang?: Lang): string {
  const raw = (lang === "ko" && KO_PRODUCTS[p.key]?.q) || `${p.brand} ${p.name}`;
  return raw.replace(/[:·]/g, " ").replace(/\s+/g, " ").trim();
}

/** 한국어판에서 보여줄 브랜드·제품명 (한글). 없으면 영문 그대로. */
export function brandFor(p: Product, lang: Lang): string {
  return (lang === "ko" && KO_PRODUCTS[p.key]?.brand) || p.brand;
}
export function nameFor(p: Product, lang: Lang): string {
  return (lang === "ko" && KO_PRODUCTS[p.key]?.name) || p.name;
}

/** 한국어판에서 보여줄 가격 (원화). 없으면 기존 달러 표기를 그대로 쓴다. */
export function priceFor(p: Product, lang: Lang): string {
  return (lang === "ko" && KO_PRODUCTS[p.key]?.price) || p.price;
}

export function linkFor(p: Product, key: StoreKey, lang?: Lang): string {
  const fixed = OVERRIDE[p.key]?.[key];
  if (fixed) return fixed;

  const s = STORES[key];
  const url = s.template.replace("{q}", encodeURIComponent(queryFor(p, lang)));
  if (!s.param) return url;
  return url + (url.includes("?") ? "&" : "?") + s.param;
}
