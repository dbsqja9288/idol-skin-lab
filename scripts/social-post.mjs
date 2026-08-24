/**
 * 스레드(Threads) 자동 게시.
 *
 * 글의 구조:
 *   1) 본문 게시 — 테마별 브랜드 카드 이미지 첨부 (실패하면 텍스트로 자동 전환)
 *   2) 짧은 댓글 2개를 체인으로 단다 (혼잣말 광고처럼 안 보이게)
 *   3) 마지막 세 번째 댓글에 링크
 *      (본문에 링크를 넣으면 광고처럼 읽혀서 도달이 깎인다 — 댓글 링크가 스레드의 관행)
 *
 * 문안·링크문구·카드 주소는 전부 scripts/variants.mjs 한 곳에서 온다.
 *
 * 환경변수:
 *   THREADS_USER_ID / THREADS_ACCESS_TOKEN / SITE_URL
 *   THREADS_IMAGES=off             (카드 없이 텍스트만 올리고 싶을 때)
 *   THREADS_REPLY_LINK=off         (댓글 링크를 끄고 싶을 때)
 *   LANG_OVERRIDE=en|es            (수동 지정. 없으면 UTC 시각으로 자동 — EN 16 / ES 8)
 *   THEME=quiz|routine|spf|idols   (수동 지정)
 *   POST_ID=two-hours              (수동 지정)
 *
 * 토큰이 없으면 초안만 출력하고 정상 종료한다 — 설정 전에도 워크플로가 실패하지 않는다.
 */

import { pickPost, langForHour } from "./variants.mjs";

const USER_ID = process.env.THREADS_USER_ID;
const TOKEN = process.env.THREADS_ACCESS_TOKEN;
const API = "https://graph.threads.net/v1.0";
const IMAGES_ON = process.env.THREADS_IMAGES !== "off";
const REPLY_ON = process.env.THREADS_REPLY_LINK !== "off";

/**
 * 게시 모드 — GitHub 저장소 Variables 의 POST_MODE 로 조절한다 (코드 수정 불필요).
 *   warmup (기본): 신규 계정 워밍업. 하루 3회만 — EN 13:00·23:00, ES 22:00 (UTC).
 *                  댓글은 아예 안 단다 (외부 링크·자기 댓글 = 도달 감점 신호이므로
 *                  팔로워가 붙기 전까지는 본문만). 링크는 프로필 bio가 담당한다.
 *   full        : 하루 96회 전체 스케줄 + 댓글 3단 체인(마지막이 링크).
 * 수동 실행(Run workflow)은 모드와 무관하게 항상 게시된다.
 */
const MODE = (process.env.POST_MODE || "warmup").trim().toLowerCase();
const FORCED = process.env.FORCE_POST === "1";
const WARMUP_HOURS = { en: [13, 23], es: [22] };

if (MODE !== "full" && !FORCED) {
  const h = new Date().getUTCHours();
  const m = new Date().getUTCMinutes();
  const ok = m < 15 && (WARMUP_HOURS[langForHour(h)] ?? []).includes(h);
  if (!ok) {
    console.log(`warmup 모드: 이 슬롯(UTC ${h}:${String(m).padStart(2, "0")})은 건너뜀. 하루 3회만 게시 중 — 전체 전환은 저장소 Variables에 POST_MODE=full.`);
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

const CHAIN_ON = MODE === "full"; // 워밍업 중엔 댓글을 아예 달지 않는다

const v = pickPost({
  lang: process.env.LANG_OVERRIDE?.trim() || undefined,
  theme: process.env.THEME?.trim() || undefined,
  postId: process.env.POST_ID?.trim() || undefined,
});

console.log(`[${v.lang.toUpperCase()}] ${v.label} / "${v.id}"  (UTC ${new Date().getUTCHours()}시)`);
console.log("─".repeat(50));
console.log(v.text);
console.log("─".repeat(50));
if (!CHAIN_ON) v.replies = []; // warmup: 본문만. 링크·자기 댓글은 도달 감점 신호.

console.log(`모드: ${MODE}${FORCED ? " (수동 실행)" : ""}`);
console.log(`카드: ${IMAGES_ON ? v.image : "(끔)"}`);
if (REPLY_ON && v.replies.length) v.replies.forEach((r, i) => console.log(`댓글 ${i + 1}: ${r.replace(/\n/g, " / ")}`));
else console.log(`댓글: (없음 — ${REPLY_ON ? "warmup 모드는 본문만 올린다" : "THREADS_REPLY_LINK=off"})`);

if (!USER_ID || !TOKEN) {
  console.log("\n토큰이 없어 초안만 출력했습니다 (dry-run).");
  process.exit(0);
}

try {
  // 카드가 실제로 접근 가능한지 먼저 확인 — 안 되면 텍스트로 전환
  let image = IMAGES_ON ? v.image : null;
  if (image) {
    try {
      const probe = await fetch(image);
      const type = probe.headers.get("content-type") ?? "";
      if (!probe.ok || !type.startsWith("image/")) {
        console.log(`이미지 접근 불가 (${probe.status} ${type}) — 텍스트로 전환`);
        image = null;
      }
    } catch (e) {
      console.log(`이미지 확인 실패: ${e.message} — 텍스트로 전환`);
      image = null;
    }
  }

  let mainId;
  try {
    mainId = await publish({ text: v.text, image });
  } catch (e) {
    if (!image) throw e;
    console.log(`이미지 게시 거부 — 텍스트로 재시도: ${e.message}`);
    image = null;
    mainId = await publish({ text: v.text });
  }
  console.log(`\n본문 게시 완료 [${v.lang}/${v.theme}/${v.id}]: ${mainId} (카드 ${image ? "첨부" : "없음"})`);

  if (REPLY_ON) {
    // 댓글 체인: 각 댓글이 직전 댓글에 이어 달린다. 마지막 댓글이 링크.
    let prev = mainId;
    for (let i = 0; i < v.replies.length; i++) {
      await new Promise((r) => setTimeout(r, 2500));
      prev = await publish({ text: v.replies[i], replyTo: prev });
      console.log(`댓글 ${i + 1}/${v.replies.length} 완료: ${prev}`);
    }
  }
} catch (e) {
  console.error("\n실패:", e.message);
  process.exit(1);
}
