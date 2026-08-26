/**
 * 스레드(Threads) 자동 게시 — v3 (북미 재공략판)
 *
 * 글의 구조:
 *   1) 본문 게시 — 텍스트만. 이미지·링크 없음.
 *      (브랜드 카드는 광고로 읽히고, 링크는 전 형식 중 인게이지먼트 최하위)
 *   2) 2초 뒤, 댓글 하나 — 실제 진단 화면 캡처 + 참여 유도 캡션. 링크 없음.
 *      이미지 접근이 안 되면 캡션만 텍스트로 단다.
 *
 * 문안·캡션·이미지 주소는 전부 scripts/variants.mjs 한 곳에서 온다.
 *
 * 환경변수:
 *   THREADS_USER_ID / THREADS_ACCESS_TOKEN / SITE_URL
 *   POST_MODE=warmup|full          (아래 참고. 기본 warmup)
 *   THREADS_REPLY_LINK=off         (사진 댓글까지 끄고 본문만 올리고 싶을 때)
 *   LANG_OVERRIDE=en|es / THEME / POST_ID  (수동 지정)
 *
 * 토큰이 없으면 초안만 출력하고 정상 종료한다 — 설정 전에도 워크플로가 실패하지 않는다.
 */

import { pickPost, langForHour } from "./variants.mjs";

const USER_ID = process.env.THREADS_USER_ID;
const TOKEN = process.env.THREADS_ACCESS_TOKEN;
const API = "https://graph.threads.net/v1.0";
const REPLY_ON = process.env.THREADS_REPLY_LINK !== "off";

/**
 * 게시 모드 — GitHub 저장소 Variables 의 POST_MODE 로 조절한다 (코드 수정 불필요).
 *   warmup (기본): 하루 2회, 영어만 — UTC 13시(미 동부 아침 9시)·23시(저녁 7시), 정각 슬롯.
 *                  스페인어는 당분간 쉰다 (영어 그래프부터 다시 세운다).
 *   full        : 전체 스케줄(15분 간격, EN+ES). 계정이 자리 잡으면 전환.
 * 수동 실행(Run workflow)은 모드와 무관하게 항상 게시된다.
 */
const MODE = (process.env.POST_MODE || "warmup").trim().toLowerCase();
const FORCED = process.env.FORCE_POST === "1";
const WARMUP_HOURS = { en: [13, 23], es: [] };

if (MODE !== "full" && !FORCED) {
  const h = new Date().getUTCHours();
  const m = new Date().getUTCMinutes();
  const ok = m < 15 && (WARMUP_HOURS[langForHour(h)] ?? []).includes(h);
  if (!ok) {
    console.log(`warmup 모드: 이 슬롯(UTC ${h}:${String(m).padStart(2, "0")})은 건너뜀. 영어 하루 2회만 게시 중 — 전체 전환은 저장소 Variables에 POST_MODE=full.`);
    process.exit(0);
  }
}

/** 이미지 컨테이너는 처리에 시간이 걸리므로 준비될 때까지 확인한다 */
async function waitReady(id, tries = 12) {
  for (let i = 0; i < tries; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const url = new URL(`${API}/${id}`);
    url.searchParams.set("fields", "status,error_message");
    url.searchParams.set("access_token", TOKEN);
    const res = await fetch(url);
    if (!res.ok) continue;
    const data = await res.json();
    if (data.status === "FINISHED") return true;
    if (data.status === "ERROR" || data.status === "EXPIRED") {
      throw new Error(`컨테이너 처리 실패: ${data.error_message ?? data.status}`);
    }
  }
  throw new Error("컨테이너가 준비되지 않음 (타임아웃)");
}

/** 컨테이너 생성 → (이미지면 준비 대기) → 발행. 발행된 글 id를 돌려준다. */
async function publish({ text, image, replyTo }) {
  const create = new URL(`${API}/${USER_ID}/threads`);
  create.searchParams.set("text", text);
  create.searchParams.set("access_token", TOKEN);
  if (image) {
    create.searchParams.set("media_type", "IMAGE");
    create.searchParams.set("image_url", image);
  } else {
    create.searchParams.set("media_type", "TEXT");
  }
  if (replyTo) create.searchParams.set("reply_to_id", replyTo);

  const res = await fetch(create, { method: "POST" });
  if (!res.ok) throw new Error(`컨테이너 생성 실패 ${res.status}: ${await res.text()}`);
  const { id } = await res.json();

  if (image) await waitReady(id);
  else await new Promise((r) => setTimeout(r, 2000));

  const pub = new URL(`${API}/${USER_ID}/threads_publish`);
  pub.searchParams.set("creation_id", id);
  pub.searchParams.set("access_token", TOKEN);
  const done = await fetch(pub, { method: "POST" });
  if (!done.ok) throw new Error(`게시 실패 ${done.status}: ${await done.text()}`);
  return (await done.json()).id;
}

// warmup은 영어 하루 2회 — 날짜×2 + (아침 0 / 밤 1) 순번으로 풀 32개를 16일에 한 바퀴 돈다.
const warmupSeq = (() => {
  if (MODE === "full") return undefined;
  const now = new Date();
  return Math.floor(now.getTime() / 86_400_000) * 2 + (now.getUTCHours() < 18 ? 0 : 1);
})();

const v = pickPost({
  lang: process.env.LANG_OVERRIDE?.trim() || (MODE !== "full" ? "en" : undefined),
  theme: process.env.THEME?.trim() || undefined,
  postId: process.env.POST_ID?.trim() || undefined,
  seq: warmupSeq,
});

console.log(`[${v.lang.toUpperCase()}] ${v.label} / "${v.id}"  (UTC ${new Date().getUTCHours()}시, 모드 ${MODE}${FORCED ? "·수동" : ""})`);
console.log("─".repeat(50));
console.log(v.text);
console.log("─".repeat(50));
if (REPLY_ON) {
  console.log(`사진 댓글: ${v.photoReply.text}`);
  console.log(`이미지: ${v.photoReply.image}`);
} else {
  console.log("댓글: (끔)");
}

if (!USER_ID || !TOKEN) {
  console.log("\n토큰이 없어 초안만 출력했습니다 (dry-run).");
  process.exit(0);
}

try {
  // 1) 본문 — 텍스트만
  const mainId = await publish({ text: v.text });
  console.log(`\n본문 게시 완료 [${v.lang}/${v.theme}/${v.id}]: ${mainId}`);

  // 2) 댓글 하나 — 화면 캡처 + 캡션 (이미지 접근 불가면 캡션만)
  if (REPLY_ON) {
    await new Promise((r) => setTimeout(r, 2500));

    let image = v.photoReply.image;
    try {
      const probe = await fetch(image);
      const type = probe.headers.get("content-type") ?? "";
      if (!probe.ok || !type.startsWith("image/")) {
        console.log(`이미지 접근 불가 (${probe.status} ${type}) — 캡션만 텍스트로`);
        image = null;
      }
    } catch (e) {
      console.log(`이미지 확인 실패: ${e.message} — 캡션만 텍스트로`);
      image = null;
    }

    let replyId;
    try {
      replyId = await publish({ text: v.photoReply.text, image, replyTo: mainId });
    } catch (e) {
      if (!image) throw e;
      console.log(`이미지 댓글 거부 — 텍스트로 재시도: ${e.message}`);
      replyId = await publish({ text: v.photoReply.text, replyTo: mainId });
      image = null;
    }
    console.log(`사진 댓글 완료: ${replyId} (이미지 ${image ? "첨부" : "없음"})`);
  }
} catch (e) {
  console.error("\n실패:", e.message);
  process.exit(1);
}
