import type { Copy } from "./types";

export const en: Copy = {
  lang: "en",
  htmlLang: "en",
  label: "EN",

  meta: {
    tagline: "The skin read idols get before comeback week",
    description:
      "A K-beauty skin diagnosis in ten questions. Four clinical axes, sixteen skin types, and the Korean formulas matched to yours — plus the routines K-pop idols actually use.",
    keywords: [
      "korean skincare quiz", "k-beauty skin type", "skin type test", "idol skincare routine",
      "glass skin", "kbeauty products", "skin diagnosis", "korean skincare routine",
    ],
  },

  nav: { test: "Take the test", types: "All 16 types", about: "About" },

  footer: {
    disclaimer:
      "gives cosmetic guidance, not medical advice. Persistent acne, eczema or pigmentation belongs with a dermatologist.",
    affiliate:
      "Some product links are affiliate links — if you buy through them we earn a small commission at no extra cost to you. It never changes which products get recommended.",
    idols:
      "Idol routines are described from published interviews. No artist, agency or label is affiliated with or endorses this site, and no artist imagery is used.",
    contact: "Questions or corrections:",
    links: { about: "About", types: "All types", privacy: "Privacy", terms: "Terms", contact: "Contact" },
  },

  intro: {
    eyebrow: "Backstage skin consultation · Seoul",
    h1: ["I prep idol skin for ", "comeback week", ". Let me read yours."],
    lede:
      "I'm the one backstage with the fridge full of sheet masks, ten minutes before the cameras. Answer the same ten questions I'd ask you in the chair and I'll tell you what your skin is actually asking for — and which Korean formulas answer it.",
    cta: "Read my skin",
    meta: "Free · about 90 seconds · no sign-up, no email required",
    cred: [
      { n: "16", t: "types, read the way we read skin in a Seoul treatment room — four axes, not four vague labels" },
      { n: "90s", t: "the same questions I'd ask you in the chair, minus the wait for an appointment" },
      { n: "AM/PM", t: "a layering order you can run tonight, in the order idols actually run it" },
    ],
    face: { tzone: "T-ZONE", cheeks: "CHEEKS", jaw: "JAW" },
  },

  quiz: {
    back: "← Back",
    oneMoment: "One moment",
    loading: [
      "Reading your barrier",
      "Weighing how you hold pigment",
      "Checking your sun history",
      "Pulling formulas off the Seoul shelf",
      "Writing it up",
    ],
  },

  questions: [
    {
      theme: "Hydration",
      q: "Two hours after cleansing, nothing on your face. Tell me how it feels.",
      hint: "This is the first thing I check in the chair. Do it on an ordinary day — not after a flight.",
      a: [
        { label: "Tight, and it flakes when I smile", sub: "Nose and cheeks especially" },
        { label: "Comfortable, maybe a little tight", sub: "No flaking, no shine" },
        { label: "Comfortable, with a soft glow at the nose", sub: "Everywhere else feels level" },
        { label: "Already shiny across the forehead and nose", sub: "I could blot it right now" },
      ],
    },
    {
      theme: "Oil control",
      q: "It is 4pm. What is your T-zone doing?",
      hint: "T-zone means forehead, nose and chin. Backstage this is the hour everything shows.",
      a: [
        { label: "Still matte, maybe a bit dull", sub: "Powder would look cakey on me" },
        { label: "A soft sheen, nothing dramatic", sub: "Reads as glow, not grease" },
        { label: "Visibly shiny, makeup has moved", sub: "One blotting sheet fixes it" },
        { label: "Slick, and my pores look bigger", sub: "Two or three blots" },
      ],
    },
    {
      theme: "Breakouts",
      q: "How often do you actually get spots?",
      hint: "Count the clogged bumps you can feel but barely see. Those count.",
      a: [
        { label: "Almost never", sub: "Maybe once a year" },
        { label: "Around my cycle, and they clear fast", sub: "Predictable timing" },
        { label: "A few a month, usually chin or jaw", sub: "Some leave a mark" },
        { label: "Something is always congested somewhere", sub: "Blackheads plus inflamed spots" },
      ],
    },
    {
      theme: "Reactivity",
      q: "You put a brand-new serum on tonight. What usually happens?",
      hint: "Think about the last three new things you introduced, not the best case.",
      a: [
        { label: "Nothing at all — my skin takes anything", sub: "I have never patch-tested" },
        { label: "A little tingle now and then, it passes", sub: "Settled by morning" },
        { label: "Stinging or redness fairly often", sub: "I have learned to go slowly" },
        { label: "Burning, itching or small bumps, reliably", sub: "Fragrance and alcohol are out" },
      ],
    },
    {
      theme: "Reactivity",
      q: "Cold wind, a hot shower, spicy food — how does your face take it?",
      hint: "I am watching for flushing, and how long it takes to settle.",
      a: [
        { label: "No visible change", sub: "I never go blotchy" },
        { label: "A quick flush that fades in minutes", sub: "Only in extreme weather" },
        { label: "I flush easily and it lingers", sub: "Cheeks mostly" },
        { label: "Standing redness, visible capillaries", sub: "Sometimes warm and prickly" },
      ],
    },
    {
      theme: "Pigment",
      q: "When a spot finally heals, what does it leave behind?",
      hint: "This one answer tells me more about your melanin than anything else on the list.",
      a: [
        { label: "Nothing — clear within a week" },
        { label: "A pink mark that fades in a few weeks" },
        { label: "A brown mark that stays for months" },
        { label: "I rarely break out, so I could not say" },
      ],
    },
    {
      theme: "Pigment",
      q: "Take your face to a window. In daylight, what do you see?",
      hint: "Cheekbones, upper lip and forehead are where it shows first.",
      a: [
        { label: "Even tone, no patches", sub: "Freckle-free" },
        { label: "A few freckles, holding steady", sub: "They darken a little in summer" },
        { label: "Sun spots or uneven patches building", sub: "More every year" },
        { label: "Melasma-style patches", sub: "Symmetrical, cheeks or upper lip" },
      ],
    },
    {
      theme: "Sun history",
      q: "Across your whole life so far — how much sun has this face had?",
      hint: "Be honest about your teens. Most photodamage is banked before twenty.",
      a: [
        { label: "Daily SPF since I was a teenager", sub: "I look for shade without thinking" },
        { label: "SPF most days now, patchy before that", sub: "A couple of holiday burns" },
        { label: "SPF only when it is obviously sunny", sub: "I have tanned on purpose" },
        { label: "Years of sun, real burns, tanning beds", sub: "Catching up now" },
      ],
    },
    {
      theme: "Firmness",
      q: "Relax your face completely. Any lines around the eyes or mouth?",
      hint: "Relaxed means not smiling and not squinting. Most people cheat on this one.",
      a: [
        { label: "None", sub: "Lines only when I smile" },
        { label: "One or two faint ones in harsh light", sub: "Nothing set" },
        { label: "Yes, fine lines that stay put", sub: "Under the eyes especially" },
        { label: "Set lines and some slackness", sub: "Jaw and nasolabial folds" },
      ],
    },
    {
      theme: "Lifestyle",
      q: "Last six months — which of these is closest to the truth?",
      hint: "Sleep, stress and smoke move skin further than any serum on my shelf.",
      a: [
        { label: "Seven-plus hours, low stress, no smoking", sub: "Steady" },
        { label: "Decent sleep, ordinary work stress", sub: "Nothing extreme" },
        { label: "Bad sleep or high stress most weeks", sub: "My face has noticed" },
        { label: "Late nights, high stress, drinking or smoke", sub: "Running on fumes" },
      ],
    },
  ],

  axisMeta: {
    D: {
      left: "Dry", right: "Oily", title: "Oil production",
      copy: {
        neg: "Your barrier isn't making enough of its own lipids, so water leaves faster than it arrives. For you, sealing matters more than treating.",
        mid: "You're in the combination band — an oilier T-zone over comfortable cheeks. Treat the zones differently instead of treating the whole face the same way.",
        pos: "You make plenty of sebum. Long term that protects you, but it needs regular gentle clearing or the pores close over.",
      },
    },
    S: {
      left: "Sensitive", right: "Resistant", title: "Reactivity",
      copy: {
        neg: "Your barrier reacts before it tolerates. One new product at a time, fourteen days apart, and treat added fragrance as an active ingredient.",
        mid: "Reasonably tolerant. You can use most actives — just stagger the strong ones across different nights rather than stacking them.",
        pos: "A resilient barrier. You can build up to retinoids and acids faster than most people I see. Your risk is doing too much because you can.",
      },
    },
    P: {
      left: "Pigment-prone", right: "Even-toned", title: "Pigment response",
      copy: {
        neg: "Your melanocytes fire at any provocation — a spot, a scratch, ten minutes of sun. Here prevention beats correction, and sunscreen is the treatment.",
        mid: "You mark, but it clears. Keep one brightening active in rotation and you'll stay ahead of it.",
        pos: "Your tone holds even and marks clear quickly. Spend your routine budget on texture and firmness instead of brightening.",
      },
    },
    W: {
      left: "Wrinkle-prone", right: "Tight", title: "Structural ageing",
      copy: {
        neg: "Sun and lifestyle load are showing as lines. Two levers actually move this: collagen support at night, and sunscreen you never skip.",
        mid: "Early stage — this is the window where prevention is cheap. Daily SPF plus one mid-strength night active is enough.",
        pos: "Firm, well-protected skin. Nothing to correct yet. Keep doing exactly what you're doing.",
      },
    },
  },
  balanced: "Balanced",

  typeNames: {
    DSPW: "The Fragile Porcelain", DSPT: "The Quiet Reactive", DSNW: "The Thin Veil", DSNT: "The Delicate Calm",
    DRPW: "The Sun-Marked Matte", DRPT: "The Steady Parchment", DRNW: "The Weathered Silk", DRNT: "The Clean Matte",
    OSPW: "The Restless Glow", OSPT: "The Reactive Dew", OSNW: "The Tired Shine", OSNT: "The Sensitive Gloss",
    ORPW: "The Marked Luminous", ORPT: "The Resilient Dew", ORNW: "The Loose Glow", ORNT: "The Glass Standard",
  },

  letterPhrase: {
    D: "runs dry", O: "runs oily", S: "reacts fast", R: "tolerates well",
    P: "holds pigment", N: "stays even", W: "shows lines", T: "stays firm",
  },
  typeLine: (a, b, c, d) =>
    `Skin that ${a}, ${b}, ${c} and ${d}. One of sixteen types — and those four letters decide every product I put in front of you below.`,

  rarity: {
    rare: "Roughly 1 in 14 people test this way",
    demanding: "One of the most demanding types we see",
    common: "Shared by about 6% of people who take this",
  },

  sections: {
    resultEyebrow: "Your Idol Skin Lab result",
    pageEyebrow: "Idol Skin Lab · skin type",
    axesTitle: "Your four axes",
    axesNoteQuiz:
      "Every face I see sits somewhere on these four sliders. Here's where yours sits — the further from centre, the harder your routine should lean that way.",
    axesNotePage:
      "Every face I see sits somewhere on these four sliders. Here's where this type sits — the further from centre, the harder the routine should lean that way.",
    cardsTitle: "What this means day to day",
    cardsNote: "The four things I'd say before you got out of the chair.",
    routineTitle: "Your layering order",
    routineNote:
      "Korean routines are about sequence and viscosity, not product count. Thinnest first — always. This is the order I work in.",
    morning: "Morning", morningSub: "Protect & seal — 5 to 7 minutes",
    evening: "Evening", eveningSub: "Clear & repair — 8 to 10 minutes",
    productsTitle: "Matched for you",
    productsNote:
      "Eight products, chosen against your four letters — not a bestseller list. Every other type gets a different shelf, and each card says which of your letters put it there. Prices indicative.",
    affiliateNote: "Some links are affiliate links. Your price is the same either way.",
    idolsTitle: "Borrowed from the idols",
    idolsNote:
      "Habits K-pop artists have described in interviews and beauty features — filtered down to the ones that make sense for this type. Method only: no photos, no endorsement.",
  },

  cards: {
    dry: { tag: "Texture", head: "Flaking before lunch", body: "Dry skin loses water through the day, so by midday foundation grabs at the dry patches. Hydrate in thin layers rather than reaching for a heavier cream." },
    oily: { tag: "Texture", head: "Shine comes back fast", body: "Oil rebuilds within hours. Blot, don't re-powder — powder over sebum is exactly what turns into visible texture by evening." },
    sensitive: { tag: "Tolerance", head: "Fragrance is an active", body: "On a reactive barrier, added fragrance behaves like an ingredient with a dose. Cut it before you cut anything else." },
    resistant: { tag: "Tolerance", head: "You can build faster", body: "A resilient barrier gets to retinoids and acids sooner. Still add one at a time, so you know which one worked." },
    pigment: { tag: "Tone", head: "Never pick a spot", body: "Your skin answers inflammation with pigment. A picked spot is a four-month mark. An unpicked one is a two-week one." },
    even: { tag: "Tone", head: "Spend it elsewhere", body: "Marks clear on their own, so brightening serums are optional for you. Put that money into texture, firmness and sunscreen." },
    wrinkle: { tag: "Structure", head: "Nights are for collagen", body: "Lines that stay when your face is relaxed answer to consistent night actives — never to occasional strong ones." },
    tight: { tag: "Structure", head: "Prevention window", body: "There is nothing to correct yet, which makes sunscreen the highest-return product in your routine by a wide margin." },
  },

  routine: {
    amCleanse: "Water rinse or light cleanse",
    amCleanseOily: "A low-pH gel wash — overnight sebum needs lifting.",
    amCleanseDry: "Lukewarm water only. Nothing has soiled your skin overnight.",
    amToner: "Hydrating toner", amTonerSub: "Pat in two thin layers, palms flat, until tacky.",
    amVitc: "Vitamin C or niacinamide", amVitcSub: "Antioxidants in the morning are pigment prevention, not correction.",
    amSerum: "Hydrating serum", amSerumSub: "Whatever your skin feels short of that day.",
    amCream: "Moisturiser", amCreamDry: "Cream weight — you need the lipid seal.", amCreamOily: "Gel or lotion weight only.",
    amSpf: "SPF 50, two fingers' worth", amSpfSub: "The step that outperforms everything above it. Reapply if you are outside.",
    pmOil: "Oil cleanse", pmOilSub: "Massage onto dry skin for 60 seconds. SPF is not water-soluble.",
    pmSecond: "Second cleanse", pmSecondSub: "Low-pH foam or gel. Your face should feel clean, never squeaky.",
    pmSkipAcid: "Skip acids tonight if you used them yesterday", pmSkipAcidSub: "Alternate. Reactive skin needs recovery nights between actives.",
    pmExfo: "Exfoliating toner, 2–3 nights a week", pmExfoSub: "Chemical, never a scrub.",
    pmRetinal: "Retinal or ferment ampoule", pmRetinalSub: "Start twice weekly, build to nightly over six weeks.",
    pmBarrier: "Barrier serum", pmBarrierSub: "Keep the barrier fed while you sleep.",
    pmSeal: "Seal",
    pmSealDry: "Cream, then a thin sleeping mask on dry patches.",
    pmSealOily: "Gel-cream. Do not skip it because you are oily — dehydrated oily skin makes more oil.",
  },

  productStep: {
    cleanse: "Cleanse", toner: "Toner", serum: "Serum", night: "Night active",
    moisturiser: "Moisturiser", spf: "Sunscreen", weekly: "Weekly treatment",
  },

  productStepNote: {
    cleanse: "Everything downstream depends on this step being right for your barrier.",
    toner: "In a Korean routine the toner is a treatment layer, not a wipe-down.",
    serum: "The one step aimed squarely at your dominant concern.",
    night: "Repair happens while you sleep. This is where the real change comes from.",
    moisturiser: "Weight matters more than brand here — too heavy congests, too light leaks.",
    spf: "The highest-return product in your routine, on every one of the sixteen types.",
    weekly: "Once or twice a week, to keep the daily steps working.",
  },

  productReason: {
    D: "Because your barrier runs dry",
    O: "Because you produce real sebum",
    S: "Because your skin reacts before it tolerates",
    R: "Because your barrier can take it",
    P: "Because you hold pigment",
    N: "Because your tone stays even",
    W: "Because lines are already setting",
    T: "Because you are still in the prevention window",
    all: "Everyone. Every type.",
  },

  productWhy: {
    cleanse_dry:
      "Your barrier is already short on lipids, so the wrong cleanser undoes the whole routine before it starts. This one sits at skin pH and lifts the day off without taking the fats with it — you step out of the bathroom comfortable instead of tight, which is the first thing that changes for dry skin.",
    cleanse_oil:
      "Strip an oily face and it answers by making more oil an hour later. This milk texture dissolves sebum and sunscreen and then stops, so you get properly clean without the squeak that starts the rebound cycle. Shine at 4pm goes down over a few weeks, not overnight.",
    toner_hydra:
      "Reactive skin does better with a toner that treats rather than one that tightens. Heartleaf extract at 77% takes the heat out of low-grade redness while it hydrates, so you can layer actives on top of a calm base instead of an already-irritated one.",
    toner_exfo:
      "Your barrier tolerates acids, so a daily low-dose blend is the cheapest way to stop congestion becoming a spot. Three acid types work at three depths at once — it keeps pores clear without the sting of a weekly strong peel, and texture smooths out in about a month.",
    serum_hydra:
      "Hydration is the step most people get wrong by using one heavy layer. Five molecular weights of hyaluronic acid reach different depths at the same time, so water goes where it is actually missing instead of sitting on the surface and evaporating.",
    serum_cica:
      "When skin flares before it tolerates, the fix is not a gentler version of the same thing — it is centella, which calms the reaction itself. This is the serum that lets a sensitive face finally build a routine, because it stops the cycle of reacting, retreating and starting over.",
    serum_bright:
      "Your skin answers inflammation with pigment, and once a mark sets it takes months. Niacinamide at 2% interrupts the transfer before it happens, so you are stopping marks rather than fading them. Propolis handles the healing alongside it.",
    serum_vitc:
      "You mark strongly, so you need the corrective end of the range, not the gentle one. This is a stabilised vitamin C derivative — it does the brightening work of pure ascorbic acid without the sting or the oxidation, which means you can actually keep using it long enough to see the change.",
    serum_retinal:
      "Retinal converts to retinoic acid in one step instead of two, so it works measurably faster than retinol at the same irritation cost. Your barrier can take it, which means you can go straight to the effective ingredient rather than spending six months building up to it.",
    serum_ferment:
      "You need collagen support but your skin reacts to the usual retinoids. Fermented yeast filtrate is Korea's long answer to exactly that problem — firmness without the purge, applied nightly rather than cautiously twice a week.",
    cream_rich:
      "A dry barrier does not need more water, it needs the lipids to hold water in. This is ceramide-dominant and completely unscented, and it is what estheticians reach for when a face is flaking under makeup — the change shows in about four days.",
    cream_light:
      "Skipping moisturiser because you are oily is what makes you oilier — dehydrated skin compensates with sebum. This gel weight seals without adding a single point of shine, which is the compromise oily skin usually cannot find.",
    cream_barrier:
      "Sensitive skin usually gets pushed toward heavy creams that congest. This one is mineral-water based with a light lipid seal — it calms without weight, so you keep the barrier fed without giving yourself something new to react to.",
    spf_all:
      "This is the product that outperforms everything else in your routine, so it has to be one you will actually wear every day. No white cast, no film, nothing that pills under makeup — it is the most-worn Korean filter for exactly that reason.",
    spf_oily:
      "Most sunscreens fail on oily skin by pilling or sliding by noon. This one has a watery finish that sets and stays put under makeup, which turns sunscreen from a daily negotiation into something you stop thinking about.",
    mask_sheet:
      "The single habit that separates idol skin from everyone else's is not a product, it is frequency. Keep these cold in the fridge and the ten minutes stops feeling like effort — that is the whole trick, and it works on your type because your barrier wants volume of hydration, not weight.",
    mask_clay:
      "Your combination of oil and a resilient barrier is exactly what clay is for. Jeju volcanic clay pulls congestion out of the pore without over-drying the rest of the face, once or twice a week — enough to keep pores from closing over, not enough to trigger rebound oil.",
  },

  idolCopy: {
    hydration: {
      habit: "Has repeatedly described sheet-masking most nights and keeping the masks cold — she has talked about doing it while watching something, so the ten minutes never feel like a chore.",
      pull: "The routine that survives is the one you can do lying down.",
    },
    gentle: {
      habit: "Known for going bare-faced on off days and keeping cleansing deliberately gentle — the philosophy is that skin needs recovery time between full-glam schedules.",
      pull: "Rest days are a skincare step, not a gap in one.",
    },
    spf: {
      habit: "Has spoken about sunscreen as the non-negotiable — reapplied through outdoor schedules rather than applied once in the morning and forgotten.",
      pull: "Everything else is optional. This one isn't.",
    },
    layering: {
      habit: "Her much-copied approach is thin layers of watery essence patted in until they absorb, then sealed — volume of hydration without weight on the skin.",
      pull: "Seven thin layers beat one thick one.",
    },
    cleansing: {
      habit: "Has emphasised removing every trace of stage makeup first — an oil-based melt followed by a low-pH wash, before anything treatment-related goes on.",
      pull: "Nothing you apply matters if the day is still on your face.",
    },
    depuff: {
      habit: "Cold-water and ice-based depuffing before early call times, paired with a minimal-product philosophy — fewer things, used consistently.",
      pull: "Cold first, product second.",
    },
  },

  share: {
    prompt: (code) => `You are ${code}. Post it — your friends will want to know theirs.`,
    text: (code, name) =>
      `I just got ${code} — “${name}” — on Idol Skin Lab. Ten questions and it read my skin better than the last three products I bought. Find your type: `,
    tags: (code) => `#IdolSkinType #KBeauty #KPopSkincare #SkinType${code}`,
    copied: "Caption copied — paste it",
    linkCopied: "Link copied",
    manualCopy: "Press ⌘C to copy",
    copyLink: "Copy link",
  },

  callout: {
    title: "Want me to walk you through week one?",
    body: "I'll send a four-week build for your type — what to add, what night to add it on, and a nudge when your actives are due to run out.",
    placeholder: "you@email.com",
    button: "Send it",
    sent: "Sent ✓",
  },
  restart: "Read my skin again",

  typeIndex: {
    eyebrow: "The full map",
    title: "All sixteen types",
    lede: "Four axes, two outcomes each — that is sixteen ways a face can be. Most quizzes give you four labels and call it a diagnosis. This is the map I actually work from.",
    howTitle: "How to read the letters",
    how: [
      "**D / O** — Dry or Oily. How much lipid your barrier makes on its own.",
      "**S / R** — Sensitive or Resistant. Whether your skin reacts before it tolerates.",
      "**P / N** — Pigment-prone or Non-pigmented. What a healed spot leaves behind.",
      "**W / T** — Wrinkle-prone or Tight. Where you sit on structural ageing.",
    ],
    listTitle: "The sixteen",
    unsureTitle: "Not sure which is yours?",
    unsureBody:
      "Ten questions settle it — including the two that most people get wrong about their own face. It takes about ninety seconds and asks for nothing.",
    credit:
      "The four-axis framing follows the dermatological convention popularised by Dr. Leslie Baumann. The product matching, routines and copy here are our own.",
    metaTitle: "All 16 skin types",
    metaDescription:
      "The full map: sixteen skin types across four axes — oil, reactivity, pigment and firmness. Find yours and see the Korean routine that fits it.",
  },

  typePage: {
    notYouTitle: "Not sure this is you?",
    notYouBody: "Ten questions decide it properly — including the two most people get wrong about their own face.",
    cta: "Read my skin",
  },
};
