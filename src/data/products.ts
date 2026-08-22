import type { Product } from "./types";

/**
 * 제품 라이브러리 — 브랜드·제품명·가격·보틀 색상만. 언어와 무관하다.
 * 단계(step)와 추천 이유(why)는 src/i18n/{en,es}.ts 에 있다.
 * 링크는 src/lib/affiliate.ts 가 만든다.
 */
export const PRODUCTS: Record<string, Product> = {
  cleanse_dry:   { key: "cleanse_dry",   brand: "Round Lab",         name: "1025 Dokdo Cleanser",                      price: "~$14",     c: ["#DCEBF5", "#A8CFE4"] },
  cleanse_oil:   { key: "cleanse_oil",   brand: "Isntree",           name: "Yam Root Vegan Milk Cleanser",             price: "~$18",     c: ["#EAF3DF", "#B9D69B"] },
  toner_hydra:   { key: "toner_hydra",   brand: "Anua",              name: "Heartleaf 77% Soothing Toner",             price: "~$20",     c: ["#E6F2EC", "#9FCBB8"] },
  toner_exfo:    { key: "toner_exfo",    brand: "Some By Mi",        name: "AHA BHA PHA 30 Days Miracle Toner",        price: "~$19",     c: ["#E7E4F5", "#B0A7DF"] },
  serum_hydra:   { key: "serum_hydra",   brand: "Torriden",          name: "DIVE-IN Low Molecular Hyaluronic Serum",    price: "~$17",     c: ["#E2F1FA", "#93C7E8"] },
  serum_cica:    { key: "serum_cica",    brand: "Dr.Jart+",          name: "Cicapair Serum",                           price: "~$45",     c: ["#E4EFE0", "#8FBC85"] },
  serum_bright:  { key: "serum_bright",  brand: "Beauty of Joseon",  name: "Glow Serum Propolis Niacinamide",          price: "~$17",     c: ["#FBF0D8", "#E9C874"] },
  serum_vitc:    { key: "serum_vitc",    brand: "Goodal",            name: "Green Tangerine Vita C Dark Spot Serum",   price: "~$26",     c: ["#FDEBD5", "#F2AE5F"] },
  serum_retinal: { key: "serum_retinal", brand: "medicube",          name: "Age-R Retinal Collagen Ampoule",           price: "~$32",     c: ["#F6E3EA", "#D89BB4"] },
  serum_ferment: { key: "serum_ferment", brand: "Missha",            name: "Time Revolution Night Repair Ampoule",     price: "~$40",     c: ["#EAE1F2", "#A38FC4"] },
  cream_rich:    { key: "cream_rich",    brand: "Illiyoon",          name: "Ceramide Ato Concentrate Cream",           price: "~$16",     c: ["#F3EEE6", "#CBB9A2"] },
  cream_light:   { key: "cream_light",   brand: "Laneige",           name: "Water Bank Blue Hyaluronic Gel",           price: "~$34",     c: ["#E1EEFA", "#8FBBE4"] },
  cream_barrier: { key: "cream_barrier", brand: "Round Lab",         name: "1025 Dokdo Cream",                         price: "~$25",     c: ["#E9F1F7", "#A9C6DD"] },
  spf_all:       { key: "spf_all",       brand: "Beauty of Joseon",  name: "Relief Sun Rice Probiotics SPF50",         price: "~$18",     c: ["#FBF3E1", "#EAD09A"] },
  spf_oily:      { key: "spf_oily",      brand: "Round Lab",         name: "Birch Juice Moisturizing Sun Cream",       price: "~$22",     c: ["#EFF6F0", "#B4D5BC"] },
  mask_sheet:    { key: "mask_sheet",    brand: "Mediheal",          name: "N.M.F Aquaring Ampoule Mask",              price: "~$25 / 10", c: ["#F5E8F0", "#D6A9C6"] },
  mask_clay:     { key: "mask_clay",     brand: "Innisfree",         name: "Super Volcanic Clay Mask 2X",              price: "~$20",     c: ["#EDE9E4", "#B6ADA2"] },
};
