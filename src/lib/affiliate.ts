import type { Product } from "@/data/types";

/**
 * 제휴 링크 한 곳에서 만들기.
 *
 * ★ 승인 나면 Vercel → Settings → Environment Variables 에 아래를 넣고 Redeploy 하면 끝이다.
 *   코드는 다시 고칠 일이 없다.
 *
 *   NEXT_PUBLIC_AMAZON_TAG      = idolskinlab-20        (Amazon Associates 추적 ID)
 *   NEXT_PUBLIC_OLIVEYOUNG_CODE = abcd1234              (올리브영 글로벌 인플루언서 코드)
 *   NEXT_PUBLIC_COUPANG_SUB     = idolskin              (쿠팡파트너스 서브아이디 — 선택)
 *   NEXT_PUBLIC_STORES          = amazon,oliveyoung     (노출할 스토어와 순서 — 선택)
 *
 * 값이 없어도 링크는 정상 작동한다. 수익 추적만 안 붙을 뿐이다.
 * 그래서 지금 배포해도 사이트는 완전히 멀쩡하고, 승인 후에 값만 채우면 된다.
 */

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG?.trim();
const OLIVEYOUNG_CODE = process.env.NEXT_PUBLIC_OLIVEYOUNG_CODE?.trim();
const COUPANG_SUB = process.env.NEXT_PUBLIC_COUPANG_SUB?.trim();

export type StoreKey = "amazon" | "oliveyoung" | "coupang";

type Store = {
  label: string;
  /** 브랜드+제품명으로 만드는 검색 링크. 상품이 단종돼도 죽지 않는다. */
  search: (q: string) => string;
};

const STORES: Record<StoreKey, Store> = {
  amazon: {
    label: "Amazon",
    search: (q) =>
      `https://www.amazon.com/s?k=${encodeURIComponent(q)}` +
      (AMAZON_TAG ? `&tag=${encodeURIComponent(AMAZON_TAG)}` : ""),
  },
  oliveyoung: {
    label: "Olive Young",
    search: (q) =>
      `https://global.oliveyoung.com/display/search?query=${encodeURIComponent(q)}` +
      (OLIVEYOUNG_CODE ? `&affiliateCode=${encodeURIComponent(OLIVEYOUNG_CODE)}` : ""),
  },
  coupang: {
    label: "Coupang",
    search: (q) =>
      `https://www.coupang.com/np/search?q=${encodeURIComponent(q)}` +
      (COUPANG_SUB ? `&subId=${encodeURIComponent(COUPANG_SUB)}` : ""),
  },
};

/**
 * 정확한 상품 페이지(딥링크)를 쓰고 싶을 때만 채운다.
 * 비워두면 위 검색 링크가 자동으로 쓰인다 — 그 편이 관리가 편하고 링크가 안 죽는다.
 *
 *   cleanse_dry: { amazon: "https://www.amazon.com/dp/XXXXXXXX?tag=..." },
 */
export const OVERRIDE: Partial<Record<string, Partial<Record<StoreKey, string>>>> = {};

const DEFAULT_ORDER: StoreKey[] = ["amazon", "oliveyoung"];

/** 어느 스토어 버튼을 어떤 순서로 보여줄지. 환경변수로 바꿀 수 있다. */
export function activeStores(): StoreKey[] {
  const raw = process.env.NEXT_PUBLIC_STORES?.trim();
  if (!raw) return DEFAULT_ORDER;
  const picked = raw
    .split(",")
    .map((s) => s.trim() as StoreKey)
    .filter((s) => s in STORES);
  return picked.length ? picked : DEFAULT_ORDER;
}

export function storeLabel(key: StoreKey): string {
  return STORES[key].label;
}

/** 검색어. 콜론·가운뎃점은 스토어 검색을 방해해서 뺀다. */
function queryFor(p: Product): string {
  return `${p.brand} ${p.name}`.replace(/[:·]/g, " ").replace(/\s+/g, " ").trim();
}

export function linkFor(p: Product, key: StoreKey): string {
  return OVERRIDE[p.key]?.[key] ?? STORES[key].search(queryFor(p));
}

/** 제휴 링크가 하나라도 실제로 수익이 붙는 상태인가 — 고지 문구 노출 판단에 쓴다. */
export const AFFILIATE_LIVE = Boolean(AMAZON_TAG || OLIVEYOUNG_CODE || COUPANG_SUB);
