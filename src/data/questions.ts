import type { Question } from "./types";

/**
 * 열 개의 질문. 무대 뒤 관리사가 의자에 앉은 사람에게 묻는 순서 그대로다.
 *
 * weight는 네 축에 더해지는 점수다.
 *   D  높을수록 유분(Oily), 낮을수록 건성(Dry)
 *   S  높을수록 내성(Resistant), 낮을수록 민감(Sensitive)
 *   P  높을수록 균일(Even), 낮을수록 색소침착(Pigmented)
 *   W  높을수록 탄탄(Tight), 낮을수록 주름(Wrinkle-prone)
 */
export const QUESTIONS: Question[] = [
  {
    theme: "Hydration",
    q: "Two hours after cleansing, nothing on your face. Tell me how it feels.",
    hint: "This is the first thing I check in the chair. Do it on an ordinary day — not after a flight.",
    a: [
      { label: "Tight, and it flakes when I smile", sub: "Nose and cheeks especially", weight: { D: -2 } },
      { label: "Comfortable, maybe a little tight", sub: "No flaking, no shine", weight: { D: -1 } },
      { label: "Comfortable, with a soft glow at the nose", sub: "Everywhere else feels level", weight: { D: 1 } },
      { label: "Already shiny across the forehead and nose", sub: "I could blot it right now", weight: { D: 2 } },
    ],
  },
  {
    theme: "Oil control",
    q: "It is 4pm. What is your T-zone doing?",
    hint: "T-zone means forehead, nose and chin. Backstage this is the hour everything shows.",
    a: [
      { label: "Still matte, maybe a bit dull", sub: "Powder would look cakey on me", weight: { D: -2 } },
      { label: "A soft sheen, nothing dramatic", sub: "Reads as glow, not grease", weight: { D: 0 } },
      { label: "Visibly shiny, makeup has moved", sub: "One blotting sheet fixes it", weight: { D: 1 } },
      { label: "Slick, and my pores look bigger", sub: "Two or three blots", weight: { D: 2 } },
    ],
  },
  {
    theme: "Breakouts",
    q: "How often do you actually get spots?",
    hint: "Count the clogged bumps you can feel but barely see. Those count.",
    a: [
      { label: "Almost never", sub: "Maybe once a year", weight: { D: -1, S: 1 } },
      { label: "Around my cycle, and they clear fast", sub: "Predictable timing", weight: { D: 0 } },
      { label: "A few a month, usually chin or jaw", sub: "Some leave a mark", weight: { D: 1, P: -1 } },
      { label: "Something is always congested somewhere", sub: "Blackheads plus inflamed spots", weight: { D: 2, S: -1, P: -1 } },
    ],
  },
  {
    theme: "Reactivity",
    q: "You put a brand-new serum on tonight. What usually happens?",
    hint: "Think about the last three new things you introduced, not the best case.",
    a: [
      { label: "Nothing at all — my skin takes anything", sub: "I have never patch-tested", weight: { S: 2 } },
      { label: "A little tingle now and then, it passes", sub: "Settled by morning", weight: { S: 1 } },
      { label: "Stinging or redness fairly often", sub: "I have learned to go slowly", weight: { S: -1 } },
      { label: "Burning, itching or small bumps, reliably", sub: "Fragrance and alcohol are out", weight: { S: -2 } },
    ],
  },
  {
    theme: "Reactivity",
    q: "Cold wind, a hot shower, spicy food — how does your face take it?",
    hint: "I am watching for flushing, and how long it takes to settle.",
    a: [
      { label: "No visible change", sub: "I never go blotchy", weight: { S: 2 } },
      { label: "A quick flush that fades in minutes", sub: "Only in extreme weather", weight: { S: 1 } },
      { label: "I flush easily and it lingers", sub: "Cheeks mostly", weight: { S: -1 } },
      { label: "Standing redness, visible capillaries", sub: "Sometimes warm and prickly", weight: { S: -2 } },
    ],
  },
  {
    theme: "Pigment",
    q: "When a spot finally heals, what does it leave behind?",
    hint: "This one answer tells me more about your melanin than anything else on the list.",
    a: [
      { label: "Nothing — clear within a week", weight: { P: 2 } },
      { label: "A pink mark that fades in a few weeks", weight: { P: 1 } },
      { label: "A brown mark that stays for months", weight: { P: -2 } },
      { label: "I rarely break out, so I could not say", weight: { P: 0 } },
    ],
  },
  {
    theme: "Pigment",
    q: "Take your face to a window. In daylight, what do you see?",
    hint: "Cheekbones, upper lip and forehead are where it shows first.",
    a: [
      { label: "Even tone, no patches", sub: "Freckle-free", weight: { P: 2 } },
      { label: "A few freckles, holding steady", sub: "They darken a little in summer", weight: { P: 1 } },
      { label: "Sun spots or uneven patches building", sub: "More every year", weight: { P: -1 } },
      { label: "Melasma-style patches", sub: "Symmetrical, cheeks or upper lip", weight: { P: -2 } },
    ],
  },
  {
    theme: "Sun history",
    q: "Across your whole life so far — how much sun has this face had?",
    hint: "Be honest about your teens. Most photodamage is banked before twenty.",
    a: [
      { label: "Daily SPF since I was a teenager", sub: "I look for shade without thinking", weight: { P: 1, W: 2 } },
      { label: "SPF most days now, patchy before that", sub: "A couple of holiday burns", weight: { P: 0, W: 1 } },
      { label: "SPF only when it is obviously sunny", sub: "I have tanned on purpose", weight: { P: -1, W: -1 } },
      { label: "Years of sun, real burns, tanning beds", sub: "Catching up now", weight: { P: -2, W: -2 } },
    ],
  },
  {
    theme: "Firmness",
    q: "Relax your face completely. Any lines around the eyes or mouth?",
    hint: "Relaxed means not smiling and not squinting. Most people cheat on this one.",
    a: [
      { label: "None", sub: "Lines only when I smile", weight: { W: 2 } },
      { label: "One or two faint ones in harsh light", sub: "Nothing set", weight: { W: 1 } },
      { label: "Yes, fine lines that stay put", sub: "Under the eyes especially", weight: { W: -1 } },
      { label: "Set lines and some slackness", sub: "Jaw and nasolabial folds", weight: { W: -2 } },
    ],
  },
  {
    theme: "Lifestyle",
    q: "Last six months — which of these is closest to the truth?",
    hint: "Sleep, stress and smoke move skin further than any serum on my shelf.",
    a: [
      { label: "Seven-plus hours, low stress, no smoking", sub: "Steady", weight: { W: 2, S: 1 } },
      { label: "Decent sleep, ordinary work stress", sub: "Nothing extreme", weight: { W: 1 } },
      { label: "Bad sleep or high stress most weeks", sub: "My face has noticed", weight: { W: -1, S: -1 } },
      { label: "Late nights, high stress, drinking or smoke", sub: "Running on fumes", weight: { W: -2, S: -1 } },
    ],
  },
];

/** 축이 뽑을 수 있는 최대 절댓값. 슬라이더 위치를 정규화할 때 쓴다. */
export const AXIS_MAX: Record<"D" | "S" | "P" | "W", number> = { D: 7, S: 7, P: 7, W: 8 };
