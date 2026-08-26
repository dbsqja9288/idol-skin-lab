/**
 * 한국판 제품 정보 — 검색어와 가격.
 *
 * 왜 따로 두냐면:
 *   1) 검색어 — 쿠팡/올리브영에서 "Round Lab 1025 Dokdo Cleanser"로 검색하면 안 나온다.
 *      한국 사람이 실제로 치는 말("라운드랩 독도 클렌저")로 넣어야 결과가 나온다.
 *   2) 가격 — 달러 표기는 한국 사용자에게 의미가 없다. 원화로 바꾼다.
 *
 * 여기 없는 제품은 자동으로 영문 브랜드+제품명 검색으로 넘어간다 (링크가 죽지 않는다).
 */
export type KoProduct = { brand: string; name: string; q: string; price: string };

export const KO_PRODUCTS: Record<string, KoProduct> = {
  cleanse_dry:   { brand: "라운드랩", name: "1025 독도 클렌저", q: "라운드랩 1025 독도 클렌저",              price: "1만원대" },
  cleanse_oil:   { brand: "이즈앤트리", name: "마유 비건 밀크 클렌저", q: "이즈앤트리 마유 비건 밀크 클렌저",         price: "2만원대" },
  toner_hydra:   { brand: "아누아", name: "어성초 77 수딩 토너", q: "아누아 어성초 77 토너",                  price: "2만원대" },
  toner_exfo:    { brand: "썸바이미", name: "AHA BHA PHA 30days 미라클 토너", q: "썸바이미 AHA BHA PHA 30days 토너",       price: "2만원대" },
  serum_hydra:   { brand: "토리든", name: "다이브인 저분자 히알루론산 세럼", q: "토리든 다이브인 세럼",                    price: "1만원대" },
  serum_cica:    { brand: "닥터자르트", name: "시카페어 세럼", q: "닥터자르트 시카페어 세럼",                price: "4만원대" },
  serum_bright:  { brand: "조선미녀", name: "글로우 세럼 프로폴리스 나이아신아마이드", q: "조선미녀 글로우 세럼 프로폴리스",          price: "2만원대" },
  serum_vitc:    { brand: "구달", name: "청귤 비타C 잡티 세럼", q: "구달 청귤 비타C 잡티 세럼",               price: "3만원대" },
  serum_retinal: { brand: "메디큐브", name: "에이지알 레티날 콜라겐 앰플", q: "메디큐브 에이지알 레티날 콜라겐 앰플",      price: "3만원대" },
  serum_ferment: { brand: "미샤", name: "타임레볼루션 나이트 리페어 앰플", q: "미샤 타임레볼루션 나이트 리페어 앰플",      price: "4만원대" },
  cream_rich:    { brand: "일리윤", name: "세라마이드 아토 집중 크림", q: "일리윤 세라마이드 아토 집중 크림",         price: "1만원대" },
  cream_light:   { brand: "라네즈", name: "워터뱅크 블루 히알루로닉 젤 크림", q: "라네즈 워터뱅크 블루 히알루로닉 젤크림",    price: "3만원대" },
  cream_barrier: { brand: "라운드랩", name: "1025 독도 크림", q: "라운드랩 1025 독도 크림",                 price: "2만원대" },
  spf_all:       { brand: "조선미녀", name: "릴리프썬 라이스 프로바이오틱스 SPF50", q: "조선미녀 릴리프썬 라이스 프로바이오틱스",   price: "1만원대" },
  spf_oily:      { brand: "라운드랩", name: "자작나무 수분 선크림", q: "라운드랩 자작나무 수분 선크림",            price: "2만원대" },
  mask_sheet:    { brand: "메디힐", name: "NMF 아쿠아링 앰플 마스크", q: "메디힐 NMF 아쿠아링 앰플 마스크",         price: "10매 2만원대" },
  mask_clay:     { brand: "이니스프리", name: "슈퍼 화산송이 클레이 마스크 2X", q: "이니스프리 슈퍼 화산송이 클레이 마스크",    price: "2만원대" },
};
