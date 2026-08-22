/**
 * 소셜 문안 한 곳에서 관리하기. (뿌리찾기 scripts/variants.mjs 와 같은 구조)
 *
 * 여기만 고치면 스레드에 나가는 글이 바뀐다.
 * 주제 4개 × 문안 6개 = 24개라, 하루 6회로 돌리면 나흘에 한 바퀴다.
 * 같은 글이 하루에 두 번 나가지 않는다.
 */

const SITE = (process.env.SITE_URL || "https://idol-skin-lab.vercel.app").replace(/\/+$/, "");

/** 주제(테마)별 문안. label은 로그와 수동 실행 선택지에 쓰인다. */
export const THEMES = {
  quiz: {
    label: "Skin type quiz",
    path: "/",
    posts: [
      {
        id: "backstage",
        text: `Korean estheticians don't ask "is your skin dry or oily."\n\nThey read four separate axes — oil, reactivity, pigment, firmness — because dry and sensitive are not the same problem, and treating them the same way is how you end up with a shelf that fights itself.\n\nTen questions, sixteen types:`,
      },
      {
        id: "two-hours",
        text: `The single most useful skincare question, and almost nobody asks it:\n\nTwo hours after cleansing, with nothing on your face — how does it feel?\n\nTight and flaking is a different product list from comfortable-with-a-glow. That one answer moves half the routine.`,
      },
      {
        id: "mark",
        text: `When a spot finally heals, what does it leave behind?\n\nNothing → you can spend your budget on texture.\nA brown mark for months → sunscreen is your treatment, not your afterthought.\n\nSame breakout. Completely different routine.`,
      },
      {
        id: "combination",
        text: `"Combination skin" has never once helped anyone decide what to put on their face tonight.\n\nFour axes instead of four labels gives you sixteen types — and a routine that actually names products.`,
      },
      {
        id: "sixteen",
        text: `Sixteen skin types, not four.\n\nD/O — how much oil your barrier makes\nS/R — whether it reacts before it tolerates\nP/N — what a healed spot leaves behind\nW/T — where you sit on structural ageing\n\nWhich four letters are you?`,
      },
      {
        id: "ninety",
        text: `Ninety seconds, ten questions, no sign-up.\n\nAt the end: your four letters, an AM/PM layering order, and the Korean formulas matched to your barrier — with the reason for each one.`,
      },
    ],
  },

  routine: {
    label: "Layering",
    path: "/",
    posts: [
      {
        id: "thinnest",
        text: `The rule that makes Korean routines work isn't the number of steps.\n\nIt's viscosity. Thinnest first, always. Watery essence before serum before cream. Put the cream on first and everything above it is decoration.`,
      },
      {
        id: "seven-layers",
        text: `Seven thin layers beat one thick one.\n\nPat a watery essence in until it absorbs, then go again. You get the volume of hydration without the weight — which is why idol skin looks lit from inside rather than coated.`,
      },
      {
        id: "oily-moisturiser",
        text: `If you're oily and you skip moisturiser, you're making more oil.\n\nDehydrated skin compensates by producing sebum. Gel-cream weight, every night. The shine you're fighting is partly the fix you skipped.`,
      },
      {
        id: "sixty-seconds",
        text: `Oil cleanse on DRY skin, sixty seconds, before any water touches your face.\n\nSunscreen isn't water-soluble. If you're going straight to the foaming wash, you're spreading it around rather than removing it.`,
      },
      {
        id: "squeaky",
        text: `Your face should feel clean after washing. Never squeaky.\n\nSqueaky means the cleanser stripped the lipids your barrier spent all night making. Low pH, no sulfates, and stop before it feels tight.`,
      },
      {
        id: "one-at-a-time",
        text: `Add one new product at a time, two weeks apart.\n\nNot because you're fragile. Because if you add three and your face reacts, you now have to remove all three and start over. Slow is the fast way here.`,
      },
    ],
  },

  spf: {
    label: "Sunscreen",
    path: "/type",
    posts: [
      {
        id: "highest-return",
        text: `If you only keep one step: sunscreen.\n\nIt outperforms every serum above it in the routine, and it's the only one that works on all sixteen skin types. Two fingers' worth. Reapplied.`,
      },
      {
        id: "teens",
        text: `Most photodamage is banked before you turn twenty.\n\nWhich is why "I use SPF now" and "I've used SPF since I was fifteen" produce visibly different faces at thirty-five — even with the same routine today.`,
      },
      {
        id: "pigment",
        text: `If your spots heal into brown marks that last months, sunscreen isn't skincare for you. It's the treatment.\n\nYour melanocytes fire at any provocation. Prevention is cheap here. Correction takes a year.`,
      },
      {
        id: "no-cast",
        text: `The reason Korean sunscreens took over: they solved the film.\n\nNo white cast, no tacky layer, nothing that pills under makeup. Once it stops feeling like a chore, you actually wear it — which is the whole point.`,
      },
      {
        id: "reapply",
        text: `Applying sunscreen once at 8am and calling it protected is like brushing your teeth on Monday for the week.\n\nReapply through outdoor schedules. That's the part idols are disciplined about and most people aren't.`,
      },
      {
        id: "cheap",
        text: `The highest-return product in almost every routine costs about $18.\n\nIt is not the serum.`,
      },
    ],
  },

  idols: {
    label: "Idol habits",
    path: "/",
    posts: [
      {
        id: "lying-down",
        text: `The skincare routine that survives is the one you can do lying down.\n\nThat's why the sheet mask stuck and the ten-step ritual didn't. Cold mask, something on the screen, ten minutes. It never feels like a chore, so it actually happens.`,
      },
      {
        id: "rest-days",
        text: `Bare-faced rest days are a skincare step, not a gap in one.\n\nSkin that gets full coverage and stage lighting five days a week needs the other two to recover. Doing less, on purpose, on schedule.`,
      },
      {
        id: "cold-first",
        text: `Cold first, product second.\n\nIce water before an early call time does more for a puffy face in three minutes than any de-puffing serum does in three weeks. It's free, and it's what gets used backstage.`,
      },
      {
        id: "remove-first",
        text: `Nothing you apply matters if the day is still on your face.\n\nStage makeup, SPF, sebum — an oil melt then a low-pH wash, before a single treatment step. The most-skipped part of the routine is the part everything else depends on.`,
      },
      {
        id: "fridge",
        text: `The sheet masks live in the fridge, by the box.\n\nNot as a luxury — as friction removal. If getting one takes four seconds, you use it on the tired nights too. That's the entire trick.`,
      },
      {
        id: "consistency",
        text: `Idols don't have better skin than you. They have someone reading it correctly, every week, and adjusting.\n\nThe products are mostly the ones you can already buy. The difference is that nothing is guesswork.`,
      },
    ],
  },
};

const KEYS = Object.keys(THEMES);

/**
 * 어떤 글을 올릴지 고른다.
 *
 * 주제는 시각으로, 문안은 날짜로 교대한다.
 * 이렇게 하면 같은 날 같은 글이 두 번 나가지 않고, 매일 순서가 한 칸씩 밀린다.
 */
export function pickPost({ theme, postId } = {}) {
  const now = new Date();
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", hour: "numeric", hour12: false }).format(now),
  );
  const dayIndex = Math.floor(now.getTime() / 86_400_000);

  const key = theme && THEMES[theme] ? theme : KEYS[Math.floor(hour / 6) % KEYS.length];
  const group = THEMES[key];

  const found = postId ? group.posts.find((p) => p.id === postId) : null;
  const post = found ?? group.posts[dayIndex % group.posts.length];

  return {
    theme: key,
    label: group.label,
    id: post.id,
    text: `${post.text}\n\n${SITE}${group.path}`,
  };
}

export const THEME_KEYS = KEYS;
