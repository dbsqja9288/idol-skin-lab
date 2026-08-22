import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { CONTACT_EMAIL, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "A K-beauty skin diagnosis in ten questions. Four clinical axes, sixteen skin types, and the Korean formulas matched to yours — plus the routines K-pop idols actually use.",
  keywords: [
    "korean skincare quiz", "k-beauty skin type", "skin type test", "idol skincare routine",
    "glass skin", "kbeauty products", "skin diagnosis", "korean skincare routine",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: "Ten questions. Sixteen skin types. The Korean formulas your barrier is actually asking for.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: "Ten questions. Sixteen skin types. Matched K-beauty formulas.",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    other: {
      // 애드센스 소유권 확인의 메타태그 방식. 값이 없으면 아무것도 안 나간다.
      ...(ADSENSE_CLIENT ? { "google-adsense-account": ADSENSE_CLIENT } : {}),
    },
  },
};

const NAV = [
  { href: "/", label: "Take the test" },
  { href: "/type", label: "All 16 types" },
  { href: "/about", label: "About" },
];

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/type", label: "All types" },
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: `mailto:${CONTACT_EMAIL}`, label: "Contact" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
        <div className="aura" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        <div className="site">
          <header className="site-head">
            <div className="in">
              <Link className="logo" href="/">
                <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                  <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1.4" />
                  <circle cx="13" cy="13" r="6.2" fill="var(--accent)" />
                  <circle cx="10.4" cy="10.4" r="1.9" fill="var(--surface)" opacity=".85" />
                </svg>
                <b>{SITE_NAME}</b>
              </Link>
              <nav className="site-nav">
                {NAV.map((n) => (
                  <Link key={n.href} href={n.href} prefetch={false}>
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main className="site-main">{children}</main>

          <footer className="site-foot">
            <div className="in">
              <p>
                <strong>{SITE_NAME}</strong> gives cosmetic guidance, not medical advice. Persistent acne, eczema or pigmentation
                belongs with a dermatologist.
              </p>
              <p>
                Some product links are affiliate links — if you buy through them we earn a small commission at no extra cost to you.
                It never changes which products get recommended.
              </p>
              <p>
                Idol routines are described from published interviews. No artist, agency or label is affiliated with or endorses
                this site, and no artist imagery is used.
              </p>
              <p>
                Questions or corrections: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </p>
              <nav className="foot-nav">
                {FOOTER_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} prefetch={false}>
                    {l.label}
                  </Link>
                ))}
              </nav>
              <p style={{ opacity: 0.7, fontSize: 12 }}>© {new Date().getFullYear()} {SITE_NAME}</p>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
