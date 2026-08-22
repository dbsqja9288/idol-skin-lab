/**
 * 사이트 주소를 한 곳에서 정한다.
 * sitemap·robots·구조화 데이터·OG 이미지·공유 링크가 전부 이 값을 쓴다.
 *
 *  1) NEXT_PUBLIC_SITE_URL — 직접 넣은 값이 있으면 무조건 우선
 *  2) Vercel이 알려주는 배포 주소 — 도메인 사기 전까지 이게 자동으로 쓰인다
 *  3) 로컬 개발 중이면 localhost
 *
 * 도메인을 사면 CANONICAL 한 줄만 바꾸거나 NEXT_PUBLIC_SITE_URL을 넣으면 된다.
 */
const CANONICAL = ""; // 예: "https://idolskinlab.com" — 도메인 확정되면 여기

function resolve(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  if (CANONICAL) return CANONICAL;

  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolve();
export const SITE_NAME = "Idol Skin Lab";
export const SITE_TAGLINE = "The skin read idols get before comeback week";
export const CONTACT_EMAIL = "dbsqja9288@gmail.com";
