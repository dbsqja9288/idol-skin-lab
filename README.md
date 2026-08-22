# Idol Skin Lab

K-뷰티 피부 진단 사이트. 열 개의 질문으로 네 축(유분·반응성·색소·탄력)을 읽어
16타입 중 하나를 진단하고, 타입에 맞는 한국 화장품과 아이돌 관리법을 리포트로 준다.

영어(`/`)와 스페인어(`/es`) 두 언어를 지원한다. 수익은 **제휴 링크가 주력**이다.

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
│  ├─ globals.css          # 전체 스타일 + 테마 변수
│  ├─ robots.ts
│  ├─ (en)/                # 영어판 — 루트 경로 그대로 (/)
│  │  ├─ layout.tsx        #   <html lang="en"> + 메타데이터
│  │  ├─ page.tsx          #   홈 (퀴즈)
│  │  ├─ type/page.tsx     #   16타입 목록
│  │  ├─ type/[code]/      #   타입별 정적 페이지 16개 ← 검색 유입의 핵심
│  │  ├─ about/, legal/    #   애드센스 심사가 요구하는 페이지들
│  │  ├─ sitemap.ts        #   두 언어 42개 URL + hreflang
│  │  └─ icon.tsx, opengraph-image.tsx
│  └─ (es)/es/             # 스페인어판 — /es 아래 같은 구조
│     └─ layout.tsx, page.tsx, type/, about/, legal/
├─ components/
│  ├─ RootShell.tsx        # 두 루트 레이아웃의 공통 껍데기
│  ├─ SiteChrome.tsx       # 헤더·푸터·언어 전환 (client)
│  ├─ Quiz.tsx             # 퀴즈 진행 (client)
│  ├─ Report.tsx           # 리포트 — 퀴즈 결과와 타입 페이지가 공유
│  ├─ ShareRow.tsx         # 공유 버튼 (client)
│  ├─ AdSlot.tsx           # 광고 자리 (환경변수 없으면 안 그림)
│  └─ pages/               # 산문 페이지 (소개·약관) 두 언어 공용
├─ i18n/
│  ├─ types.ts             # 언어 하나가 제공해야 하는 문구 계약
│  ├─ en.ts / es.ts        # ← 문구를 고치려면 여기만 본다
│  └─ index.ts             # getCopy(lang), path(lang, rest)
├─ lib/
│  ├─ engine.ts            # 채점 · 타입 판정 · 제품/루틴 매칭
│  ├─ affiliate.ts         # 제휴 링크 생성 ← 수익화의 중심
│  └─ site.ts              # 사이트 주소 한 곳에서
└─ data/
   ├─ questions.ts         # 질문 **배점만** (문구는 i18n에)
   ├─ products.ts          # 제품 17개 (브랜드·가격만)
   └─ idols.ts             # 인물 이름만
```

## 언어

영어(`/`)와 스페인어(`/es`)를 지원한다. 라우트 그룹으로 루트 레이아웃을 둘로 나눠
`<html lang>`이 언어마다 정확히 나가고, `sitemap.xml`이 42개 URL에 hreflang을 붙인다.

- **문구를 고칠 때** — `src/i18n/en.ts` 또는 `es.ts`만 보면 된다
- **언어를 추가할 때** — `src/i18n/`에 파일 하나 만들고 `index.ts`의 `LANGS`에 넣은 뒤,
  `src/app/(xx)/` 라우트 그룹을 복사한다. 빠뜨린 문구는 TypeScript가 빌드에서 잡아준다
- 채점 배점은 `src/data/questions.ts` 한 곳에만 있어서 언어가 늘어도 결과가 갈라지지 않는다

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
| `NEXT_PUBLIC_AMAZON_TAG` | 아마존 US 승인 후 | 링크는 되지만 수익 추적 안 됨 |
| `NEXT_PUBLIC_AMAZON_ES_TAG` | 아마존 스페인 승인 후 (별도 가입) | 위와 같음 |
| `NEXT_PUBLIC_AMAZON_MX_TAG` | 아마존 멕시코 승인 후 (별도 가입) | 위와 같음 |
| `NEXT_PUBLIC_OLIVEYOUNG_PARAM` | 올리브영 승인 후 (`affiliateCode=xxx` 형태) | 위와 같음 |
| `NEXT_PUBLIC_YESSTYLE_PARAM` | YesStyle 승인 후 | 위와 같음 |
| `NEXT_PUBLIC_STYLEVANA_PARAM` | Stylevana 승인 후 | 위와 같음 |
| `NEXT_PUBLIC_STORES_EN` / `_ES` | 버튼 순서 바꿀 때 | EN `amazon,oliveyoung` / ES `yesstyle,oliveyoung,stylevana` |
| `NEXT_PUBLIC_SEARCH_YESSTYLE` 등 | 스토어가 검색 URL 형식을 바꿨을 때 | 코드의 기본 형식 |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | 구글 서치콘솔 등록 | 소유확인 실패 |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | 애드센스 신청 시 | 광고 안 나옴 (지금 상태) |
| `NEXT_PUBLIC_ADSENSE_SLOT` | 애드센스 승인 후 | 광고 안 나옴 |

---

## 수익화 순서

**1순위는 광고가 아니라 제휴다.** 올리브영 글로벌 13%면 $30 제품 하나가
애드센스 방문자 2,000~5,000명치와 맞먹는다. 이 사이트는 마지막에 제품 링크를
누르게 설계돼 있어서, 광고를 먼저 붙이면 그 클릭을 광고가 뺏어간다.

1. **올리브영 글로벌** — <https://global.oliveyoung.com/influencer/main>, 커미션 13%.
   60개국 이상 배송하고 스페인·멕시코·칠레도 들어간다. 단, 신청서가 **SNS 채널을 요구**한다
   (웹사이트 칸이 없다). 인스타그램 계정이 먼저 필요하다
2. **YesStyle / Stylevana** — 전 세계 배송. 아르헨티나·칠레·콜롬비아·페루에는
   아마존 마켓플레이스가 아예 없어서, **스페인어판의 1순위는 여기다**
3. **아마존 어소시에이트** — <https://affiliate-program.amazon.com>, 뷰티 약 3%
   - ⚠️ **마켓플레이스마다 계정이 별개다.** `.com` 태그는 `.es`에서 한 푼도 안 붙는다
   - ⚠️ 가입 시 사이트 주소 필요, **180일 안에 3건 판매**가 없으면 계정이 닫힌다.
     트래픽이 좀 붙은 뒤에 신청할 것
4. **애드센스** — 도메인 연결 + `/type/*` 32개가 색인된 뒤에 신청.
   페이지가 적으면 '가치가 낮은 콘텐츠'로 거절된다
5. 카카오 애드핏은 **넣지 않았다.** 국내 광고주 인벤토리라 영어권·스페인어권 방문자에게
   채울 광고가 없다. 한국어판을 만들면 그때 뿌리찾기의 `AdSlot.tsx`를 가져오면 된다

### 검색 URL 확인 (한 번만, 30초)

기본은 브랜드+제품명 **검색 링크**다. 상품이 단종돼도 안 죽어서 관리가 편하다.
다만 스토어가 검색 URL 형식을 바꿀 수 있으니, 각 스토어에서 아무거나 한 번 검색해
주소창을 확인하고 다르면 `NEXT_PUBLIC_SEARCH_*` 환경변수로 갈아끼우면 된다.

### 정확한 상품 딥링크를 쓰고 싶을 때

특정 상품 페이지로 보내고 싶으면 `src/lib/affiliate.ts`의 `OVERRIDE`에만 넣는다.

```ts
export const OVERRIDE = {
  spf_all: { amazon: "https://www.amazon.com/dp/XXXXXXXX?tag=..." },
};
```

---

## 스레드 자동 게시 (선택)

`.github/workflows/social.yml`이 **매시 정각(UTC)에 하루 24회** 실행되어
`scripts/social-post.mjs`가 만든 문안을 스레드에 올린다.

**언어는 시각으로 갈린다 — 영어 16회 + 스페인어 8회.**

| | 게시 시각 (UTC) | 노린 시간대 |
| --- | --- | --- |
| 스페인어 (8회) | 02 · 04 · 07 · 12 · 15 · 17 · 20 · 22 | 스페인 저녁, 멕시코·중남미 저녁 |
| 영어 (16회) | 나머지 전부 | 미국 동부 출근길·점심·퇴근길·취침 전 |

문안 풀은 **영어 32개 / 스페인어 24개**. 하루에 쓰는 만큼 순서대로 소진하므로
영어는 이틀, 스페인어는 사흘에 한 바퀴 돈다. **같은 글이 하루에 두 번 나가지 않는다.**

스레드 API 한도는 24시간당 250개라 24회는 여유가 크다. 진짜 상한은 API가 아니라
사람이 질리는 속도이므로, 2주쯤 돌려보고 지표를 보고 줄이거나 늘린다.
줄이려면 `scripts/variants.mjs`의 `ES_HOURS`와 workflow의 cron만 고치면 된다.

**GitHub Actions는 공개 저장소에서 무료**이고, 스레드 API도 무료다.
토큰이 없으면 초안만 출력하고 끝나므로 설정 전에도 워크플로가 실패하지 않는다.

### 설정

1. [Meta 개발자 콘솔](https://developers.facebook.com)에서 앱 생성 → **Threads API** 추가
2. 장기 액세스 토큰과 사용자 ID 발급 (스레드 계정은 인스타그램 계정에 딸려 있다)
3. GitHub 저장소 → Settings → Secrets and variables → Actions

```
THREADS_USER_ID        (Secret)
THREADS_ACCESS_TOKEN   (Secret)
SITE_URL               (Variable, 도메인 사면 갱신)
```

Actions 탭에서 **Run workflow**로 즉시 테스트할 수 있다. 언어·주제·문구를 골라서
수동 실행할 수도 있다. 로컬에서는:

```bash
node scripts/social-post.mjs                          # 지금 시각에 맞춰 자동
LANG_OVERRIDE=es node scripts/social-post.mjs         # 스페인어 강제
THEME=idols POST_ID=nevera node scripts/social-post.mjs   # 특정 문안
```

문안을 고치려면 `scripts/variants.mjs`만 보면 된다. 영어는 `EN`, 스페인어는 `ES` 객체다.

---

## 콘텐츠 추가하기

- **질문** — 배점은 `src/data/questions.ts`, 문구는 `src/i18n/{en,es}.ts`.
  두 파일의 배열 순서가 같아야 한다
- **제품** — `src/data/products.ts`에 객체를 추가하고, 설명은 두 언어의 `productWhy`에,
  단계는 `engine.ts`의 `STEP_OF`에, 어느 타입에 붙일지는 `productsOf()`에 넣는다
- **아이돌** — 이름은 `src/data/idols.ts`, 습관 설명은 두 언어의 `idolCopy`.
  **공개된 인터뷰에서 본인이 직접 말한 것만** 쓰고, 이미지·초상은 쓰지 않는다

---

## 주의

피부 진단은 화장품 가이드이며 의료 조언이 아니다. 아이돌 관리법은 공개 인터뷰에서
옮긴 것으로, 어떤 아티스트·소속사도 이 사이트와 제휴하거나 보증하지 않으며
초상 이미지는 사용하지 않는다. 네 축 프레임은 Leslie Baumann의 분류를 따랐고,
제품 매칭·루틴·문구는 자체 작성이다.
