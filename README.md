# Idol Skin Lab

K-뷰티 피부 진단 사이트. 열 개의 질문으로 네 축(유분·반응성·색소·탄력)을 읽어
16타입 중 하나를 진단하고, 타입에 맞는 한국 화장품과 아이돌 관리법을 리포트로 준다.

영어권 사용자가 타깃이고, 수익은 **제휴 링크가 주력**이다.

## 기술 스택

- **Next.js 16** (App Router) / **React 19** / **TypeScript**
- Tailwind 없음 — 스타일은 `src/app/globals.css` 한 파일. CSS 변수로 라이트/다크 자동 대응
- 외부 DB 없음 — 데이터는 `src/data/*.ts`에 정적으로 관리
- 배포: **Vercel** (main 브랜치 push → 자동 재배포)

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드 검증
```

Node.js 20 이상.

## 폴더 구조

```
src/
├─ app/
│  ├─ layout.tsx           # 헤더·푸터·메타데이터·애드센스 로더
│  ├─ page.tsx             # 홈 (퀴즈)
│  ├─ globals.css          # 전체 스타일 + 테마 변수
│  ├─ type/page.tsx        # 16타입 목록
│  ├─ type/[code]/page.tsx # 타입별 정적 페이지 16개 ← 검색 유입의 핵심
│  ├─ about/, legal/       # 애드센스 심사가 요구하는 페이지들
│  ├─ sitemap.ts, robots.ts
│  ├─ icon.tsx, opengraph-image.tsx
├─ components/
│  ├─ Quiz.tsx             # 퀴즈 진행 (client)
│  ├─ Report.tsx           # 리포트 — 퀴즈 결과와 타입 페이지가 공유
│  ├─ ShareRow.tsx         # 공유 버튼 (client)
│  └─ AdSlot.tsx           # 광고 자리 (환경변수 없으면 안 그림)
├─ lib/
│  ├─ engine.ts            # 채점 · 타입 판정 · 제품/루틴 매칭
│  ├─ affiliate.ts         # 제휴 링크 생성 ← 수익화의 중심
│  └─ site.ts              # 사이트 주소 한 곳에서
└─ data/
   ├─ questions.ts         # 질문 10개 + 배점
   ├─ products.ts          # 제품 17개
   └─ idols.ts             # 아이돌 관리법
```

---

## 배포 (Vercel)

```bash
git init && git add -A && git commit -m "init"
gh repo create idol-skin-lab --public --source=. --push
```

1. [vercel.com/new](https://vercel.com/new) → GitHub 저장소 Import
2. 프레임워크가 **Next.js**로 자동 인식되면 그대로 **Deploy**
3. 이후 `main`에 push할 때마다 자동 재배포 (`push.bat` 더블클릭)

도메인을 사기 전까지는 Vercel 배포 주소가 자동으로 쓰인다. 설정할 게 없다.

---

## 환경변수

Vercel → Settings → Environment Variables. **넣을 때마다 Redeploy가 필요하다.**
하나도 안 넣어도 사이트는 완전히 정상 작동한다.

| Key | 언제 | 없으면 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 도메인 구입 후 | Vercel 주소가 자동으로 쓰임 |
| `NEXT_PUBLIC_AMAZON_TAG` | 아마존 어소시에이트 승인 후 | 링크는 되지만 수익 추적 안 됨 |
| `NEXT_PUBLIC_OLIVEYOUNG_CODE` | 올리브영 인플루언서 승인 후 | 위와 같음 |
| `NEXT_PUBLIC_COUPANG_SUB` | 쿠팡파트너스 (한국어판 만들면) | 위와 같음 |
| `NEXT_PUBLIC_STORES` | 버튼 순서 바꿀 때 | `amazon,oliveyoung` |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | 구글 서치콘솔 등록 | 소유확인 실패 |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | 애드센스 신청 시 | 광고 안 나옴 (지금 상태) |
| `NEXT_PUBLIC_ADSENSE_SLOT` | 애드센스 승인 후 | 광고 안 나옴 |

---

## 수익화 순서

**1순위는 광고가 아니라 제휴다.** 올리브영 글로벌 13%면 $30 제품 하나가
애드센스 방문자 2,000~5,000명치와 맞먹는다. 이 사이트는 마지막에 제품 링크를
누르게 설계돼 있어서, 광고를 먼저 붙이면 그 클릭을 광고가 뺏어간다.

1. **올리브영 글로벌** — <https://global.oliveyoung.com/influencer/main>, 커미션 13%
2. **아마존 어소시에이트** — <https://affiliate-program.amazon.com>, 뷰티 약 3%
   - ⚠️ 가입 시 사이트 주소 필요, **180일 안에 3건 판매**가 없으면 계정이 닫힌다.
     트래픽이 좀 붙은 뒤에 신청할 것
3. **애드센스** — 도메인 연결 + `/type/*` 16개가 색인된 뒤에 신청.
   페이지가 적으면 '가치가 낮은 콘텐츠'로 거절된다
4. 카카오 애드핏은 **넣지 않았다.** 국내 광고주 인벤토리라 영어권 방문자에게
   채울 광고가 없다. 한국어판을 만들면 그때 뿌리찾기의 `AdSlot.tsx`를 가져오면 된다

### 정확한 상품 딥링크를 쓰고 싶을 때

기본은 브랜드+제품명 **검색 링크**다. 상품이 단종돼도 링크가 안 죽어서 관리가 편하다.
특정 상품 페이지로 보내고 싶으면 `src/lib/affiliate.ts`의 `OVERRIDE`에만 넣는다.

```ts
export const OVERRIDE = {
  spf_all: { amazon: "https://www.amazon.com/dp/XXXXXXXX?tag=..." },
};
```

---

## 스레드 자동 게시 (선택)

`.github/workflows/social.yml`이 하루 6회 실행되어 `scripts/social-post.mjs`가 만든
문안을 스레드에 올린다. 주제 4개 × 문안 6개 = 24개라 나흘에 한 바퀴 돈다.
**GitHub Actions는 공개 저장소에서 무료**이고, 스레드 API도 무료다.

토큰이 없으면 초안만 출력하고 끝나므로 설정 전에도 워크플로가 실패하지 않는다.

### 설정

1. [Meta 개발자 콘솔](https://developers.facebook.com)에서 앱 생성 → **Threads API** 추가
2. 장기 액세스 토큰과 사용자 ID 발급
3. GitHub 저장소 → Settings → Secrets and variables → Actions

```
THREADS_USER_ID        (Secret)
THREADS_ACCESS_TOKEN   (Secret)
SITE_URL               (Variable, 도메인 사면 갱신)
```

Actions 탭에서 **Run workflow**로 즉시 테스트할 수 있다. 로컬에서는:

```bash
node scripts/social-post.mjs              # 자동 교대
THEME=idols POST_ID=fridge node scripts/social-post.mjs   # 특정 문안
```

문안을 고치려면 `scripts/variants.mjs`만 보면 된다.

---

## 콘텐츠 추가하기

- **질문** — `src/data/questions.ts`. 배점(`weight`)만 맞추면 채점·리포트에 자동 반영
- **제품** — `src/data/products.ts`에 객체 하나 추가 후 `src/lib/engine.ts`의
  `productsOf()`에서 어느 타입에 붙일지 정한다
- **아이돌** — `src/data/idols.ts`. **공개된 인터뷰에서 본인이 직접 말한 것만** 쓴다.
  이미지·초상은 쓰지 않는다

---

## 주의

피부 진단은 화장품 가이드이며 의료 조언이 아니다. 아이돌 관리법은 공개 인터뷰에서
옮긴 것으로, 어떤 아티스트·소속사도 이 사이트와 제휴하거나 보증하지 않으며
초상 이미지는 사용하지 않는다. 네 축 프레임은 Leslie Baumann의 분류를 따랐고,
제품 매칭·루틴·문구는 자체 작성이다.
