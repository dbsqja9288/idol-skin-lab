import { Analytics } from "@vercel/analytics/next";
import type { Lang } from "@/data/types";
import { getCopy } from "@/i18n";
import SiteChrome from "./SiteChrome";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

/**
 * 언어별 루트 레이아웃의 공통 껍데기.
 *
 * <html lang>이 언어마다 달라야 해서 라우트 그룹으로 루트 레이아웃을 둘로 나눴고,
 * 실제 내용은 전부 여기에 모아 두 레이아웃이 갈라지지 않게 했다.
 */
export default function RootShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={getCopy(lang).htmlLang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;0,600;0,700;1,600&family=Karla:ital,wght@0,400;0,500;0,700;1,400&family=Space+Mono:wght@400;700&display=swap"
        />
        {/* 애드센스 로더. 환경변수가 없으면 아예 나가지 않는다. */}
        {ADSENSE_CLIENT && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <SiteChrome lang={lang}>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
