import type { Idol } from "./types";

/**
 * 아이돌 관리법.
 *
 * 공개된 인터뷰·뷰티 기사에서 본인이 직접 말한 습관만 옮긴다.
 * 이미지·초상은 쓰지 않고, 어떤 아티스트도 이 사이트와 제휴하지 않는다.
 * 새 인물을 넣을 때는 반드시 출처가 있는 발언만 쓸 것.
 */
export const IDOLS: Record<string, Idol> = {
  hydration: {
    key: "hydration", n: "Jennie", g: "BLACKPINK", i: "J",
    habit:
      "Has repeatedly described sheet-masking most nights and keeping the masks cold — she has talked about doing it while watching something, so the ten minutes never feel like a chore.",
    pull: "The routine that survives is the one you can do lying down.",
  },
  gentle: {
    key: "gentle", n: "IU", g: "Soloist", i: "I",
    habit:
      "Known for going bare-faced on off days and keeping cleansing deliberately gentle — the philosophy is that skin needs recovery time between full-glam schedules.",
    pull: "Rest days are a skincare step, not a gap in one.",
  },
  spf: {
    key: "spf", n: "Taeyeon", g: "Girls' Generation", i: "T",
    habit:
      "Has spoken about sunscreen as the non-negotiable — reapplied through outdoor schedules rather than applied once in the morning and forgotten.",
    pull: "Everything else is optional. This one isn't.",
  },
  layering: {
    key: "layering", n: "Wonyoung", g: "IVE", i: "W",
    habit:
      "Her much-copied approach is thin layers of watery essence patted in until they absorb, then sealed — volume of hydration without weight on the skin.",
    pull: "Seven thin layers beat one thick one.",
  },
  cleansing: {
    key: "cleansing", n: "Karina", g: "aespa", i: "K",
    habit:
      "Has emphasised removing every trace of stage makeup first — an oil-based melt followed by a low-pH wash, before anything treatment-related goes on.",
    pull: "Nothing you apply matters if the day is still on your face.",
  },
  depuff: {
    key: "depuff", n: "Rosé", g: "BLACKPINK", i: "R",
    habit:
      "Cold-water and ice-based depuffing before early call times, paired with a minimal-product philosophy — fewer things, used consistently.",
    pull: "Cold first, product second.",
  },
};
