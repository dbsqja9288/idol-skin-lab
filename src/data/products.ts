import type { Product } from "./types";

/**
 * 제품 라이브러리.
 *
 * 링크는 여기 두지 않는다. `src/lib/affiliate.ts`가 브랜드+제품명으로 스토어별 링크를 만들고,
 * 정확한 상품 페이지를 쓰고 싶을 때만 그 파일의 OVERRIDE에 넣는다.
 * 이렇게 해야 제품을 늘려도 링크 관리가 한 곳에 남는다.
 */
export const PRODUCTS: Record<string, Product> = {
  cleanse_dry: {
    key: "cleanse_dry", step: "Cleanse", brand: "Round Lab", name: "1025 Dokdo Cleanser",
    why: "Low-pH, non-stripping — leaves the barrier lipids where they belong.",
    price: "~$14", c: ["#DCEBF5", "#A8CFE4"],
  },
  cleanse_oil: {
    key: "cleanse_oil", step: "Cleanse", brand: "Isntree", name: "Yam Root Vegan Milk Cleanser",
    why: "Dissolves sebum and SPF without the squeak that triggers rebound oil.",
    price: "~$18", c: ["#EAF3DF", "#B9D69B"],
  },
  toner_hydra: {
    key: "toner_hydra", step: "Toner", brand: "Anua", name: "Heartleaf 77% Soothing Toner",
    why: "Houttuynia cordata calms low-grade redness while it hydrates.",
    price: "~$20", c: ["#E6F2EC", "#9FCBB8"],
  },
  toner_exfo: {
    key: "toner_exfo", step: "Toner", brand: "Some By Mi", name: "AHA BHA PHA 30 Days Miracle Toner",
    why: "A gentle daily acid blend that keeps congestion from becoming a spot.",
    price: "~$19", c: ["#E7E4F5", "#B0A7DF"],
  },
  serum_hydra: {
    key: "serum_hydra", step: "Serum", brand: "Torriden", name: "DIVE-IN Low Molecular Hyaluronic Serum",
    why: "Five weights of hyaluronic acid — hydration that reaches past the surface.",
    price: "~$17", c: ["#E2F1FA", "#93C7E8"],
  },
  serum_cica: {
    key: "serum_cica", step: "Serum", brand: "Dr.Jart+", name: "Cicapair Serum",
    why: "Centella for a barrier that flares before it tolerates.",
    price: "~$45", c: ["#E4EFE0", "#8FBC85"],
  },
  serum_bright: {
    key: "serum_bright", step: "Serum", brand: "Beauty of Joseon", name: "Glow Serum Propolis Niacinamide",
    why: "2% niacinamide interrupts pigment transfer before a mark sets.",
    price: "~$17", c: ["#FBF0D8", "#E9C874"],
  },
  serum_vitc: {
    key: "serum_vitc", step: "Serum", brand: "Goodal", name: "Green Tangerine Vita C Dark Spot Serum",
    why: "A stable vitamin C derivative — brightening without the sting.",
    price: "~$26", c: ["#FDEBD5", "#F2AE5F"],
  },
  serum_retinal: {
    key: "serum_retinal", step: "Night active", brand: "medicube", name: "Age-R Retinal Collagen Ampoule",
    why: "Retinal works faster than retinol at the same irritation cost.",
    price: "~$32", c: ["#F6E3EA", "#D89BB4"],
  },
  serum_ferment: {
    key: "serum_ferment", step: "Night active", brand: "Missha", name: "Time Revolution Night Repair Ampoule",
    why: "Fermented yeast ferment filtrate — Korea's long-standing answer to firmness.",
    price: "~$40", c: ["#EAE1F2", "#A38FC4"],
  },
  cream_rich: {
    key: "cream_rich", step: "Moisturiser", brand: "Illiyoon", name: "Ceramide Ato Concentrate Cream",
    why: "Ceramide-dominant and unscented — the dry-barrier workhorse.",
    price: "~$16", c: ["#F3EEE6", "#CBB9A2"],
  },
  cream_light: {
    key: "cream_light", step: "Moisturiser", brand: "Laneige", name: "Water Bank Blue Hyaluronic Gel",
    why: "Gel-cream weight: seals moisture without adding to the shine.",
    price: "~$34", c: ["#E1EEFA", "#8FBBE4"],
  },
  cream_barrier: {
    key: "cream_barrier", step: "Moisturiser", brand: "Round Lab", name: "1025 Dokdo Cream",
    why: "Mineral-water base with a light lipid seal — calm, not heavy.",
    price: "~$25", c: ["#E9F1F7", "#A9C6DD"],
  },
  spf_all: {
    key: "spf_all", step: "SPF", brand: "Beauty of Joseon", name: "Relief Sun Rice Probiotics SPF50",
    why: "The most-worn Korean chemical filter for a reason — no cast, no film.",
    price: "~$18", c: ["#FBF3E1", "#EAD09A"],
  },
  spf_oily: {
    key: "spf_oily", step: "SPF", brand: "Round Lab", name: "Birch Juice Moisturizing Sun Cream",
    why: "Watery finish that sits under makeup without pilling on oily skin.",
    price: "~$22", c: ["#EFF6F0", "#B4D5BC"],
  },
  mask_sheet: {
    key: "mask_sheet", step: "Weekly", brand: "Mediheal", name: "N.M.F Aquaring Ampoule Mask",
    why: "The sheet mask idols actually keep in the fridge by the box.",
    price: "~$25 / 10", c: ["#F5E8F0", "#D6A9C6"],
  },
  mask_clay: {
    key: "mask_clay", step: "Weekly", brand: "Innisfree", name: "Super Volcanic Clay Mask 2X",
    why: "Jeju clay pulls congestion out of pores without over-drying the rest.",
    price: "~$20", c: ["#EDE9E4", "#B6ADA2"],
  },
};
