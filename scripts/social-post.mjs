/**
 * 스레드(Threads) 자동 게시. (뿌리찾기 scripts/social-post.mjs 를 영어 문안용으로 옮긴 것)
 *
 * 문안은 scripts/variants.mjs 한 곳에서 관리한다.
 *
 * 환경변수:
 *   THREADS_USER_ID / THREADS_ACCESS_TOKEN / SITE_URL
 *   THEME=quiz|routine|spf|idols   (수동 지정. 없으면 시각에 따라 자동 교대)
 *   POST_ID=backstage              (수동 지정. 없으면 날짜에 따라 자동 교대)
 *
 * 토큰이 없으면 초안만 출력하고 정상 종료한다 — 설정 전에도 워크플로가 실패하지 않는다.
 */

import { pickPost } from "./variants.mjs";

const USER_ID = process.env.THREADS_USER_ID;
const TOKEN = process.env.THREADS_ACCESS_TOKEN;
const API = "https://graph.threads.net/v1.0";

async function post(text) {
  const create = new URL(`${API}/${USER_ID}/threads`);
  create.searchParams.set("text", text);
  create.searchParams.set("media_type", "TEXT");
  create.searchParams.set("access_token", TOKEN);

  const res = await fetch(create, { method: "POST" });
  if (!res.ok) throw new Error(`컨테이너 생성 실패 ${res.status}: ${await res.text()}`);
  const { id } = await res.json();

  // 컨테이너가 서버에서 준비될 시간을 준다
  await new Promise((r) => setTimeout(r, 2000));

  const publish = new URL(`${API}/${USER_ID}/threads_publish`);
  publish.searchParams.set("creation_id", id);
  publish.searchParams.set("access_token", TOKEN);

  const done = await fetch(publish, { method: "POST" });
  if (!done.ok) throw new Error(`게시 실패 ${done.status}: ${await done.text()}`);
  return done.json();
}

const v = pickPost({
  theme: process.env.THEME?.trim() || undefined,
  postId: process.env.POST_ID?.trim() || undefined,
});

console.log(`${v.label} / 문구 "${v.id}"`);
console.log("─".repeat(50));
console.log(v.text);
console.log("─".repeat(50));

if (!USER_ID || !TOKEN) {
  console.log("\n토큰이 없어 초안만 출력했습니다 (dry-run).");
  process.exit(0);
}

try {
  const res = await post(v.text);
  console.log(`\n게시 완료 [${v.theme}/${v.id}]: ${res.id}`);
} catch (e) {
  console.error("\n실패:", e.message);
  process.exit(1);
}
