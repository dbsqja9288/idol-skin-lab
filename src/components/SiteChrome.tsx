"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/data/types";
import { LANGS, getCopy, path } from "@/i18n";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

/**
 * 헤더와 푸터. 언어 전환 버튼이 여기 있다.
 *
 * 전환할 때 같은 페이지의 다른 언어판으로 간다 — /type/ORNT 를 보고 있으면
 * /es/type/ORNT 로 넘어간다. 처음으로 돌려보내면 사람들이 그냥 나가버린다.
 */
export default function SiteChrome({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const c = getCopy(lang);
  const pathname = usePathname() || "/";

  /** 현재 경로에서 언어 접두어를 뗀 '순수 경로' */
  const bare = lang === "en" ? pathname : pathname.replace(/^\/es/, "") || "/";
  const rest = bare === "/" ? "" : bare;

  const nav = [
    { href: path(lang, ""), label: c.nav.test },
    { href: path(lang, "/type"), label: c.nav.types },
    { href: path(lang, "/about"), label: c.nav.about },
  ];

  const footLinks = [
    { href: path(lang, "/about"), label: c.footer.links.about },
    { href: path(lang, "/type"), label: c.footer.links.types },
    { href: path(lang, "/legal/privacy"), label: c.footer.links.privacy },
    { href: path(lang, "/legal/terms"), label: c.footer.links.terms },
  ];

  return (
    <>
      <div className="aura" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>

      <div className="site">
        <header className="site-head">
          <div className="in">
            <Link className="logo" href={path(lang, "")}>
              <svg width="24" height="24" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1.4" />
                <circle cx="13" cy="13" r="6.2" fill="var(--accent)" />
                <circle cx="10.4" cy="10.4" r="1.9" fill="var(--surface)" opacity=".85" />
              </svg>
              <b>{SITE_NAME}</b>
            </Link>

            <div className="head-right">
              <nav className="site-nav">
                {nav.map((n) => (
                  <Link key={n.href} href={n.href} prefetch={false}>
                    {n.label}
                  </Link>
                ))}
              </nav>
              <div className="langs" role="group" aria-label="Language">
                {LANGS.map((l) => (
                  <Link
                    key={l}
                    href={path(l, rest)}
                    prefetch={false}
                    hrefLang={l}
                    aria-current={l === lang ? "true" : undefined}
                    className={l === lang ? "on" : undefined}
                  >
                    {getCopy(l).label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </header>

        <main className="site-main">{children}</main>

        <footer className="site-foot">
          <div className="in">
            <p>
              <strong>{SITE_NAME}</strong> {c.footer.disclaimer}
            </p>
            <p>{c.footer.affiliate}</p>
            <p>{c.footer.idols}</p>
            <p>
              {c.footer.contact} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </p>
            <nav className="foot-nav">
              {footLinks.map((l) => (
                <Link key={l.href} href={l.href} prefetch={false}>
                  {l.label}
                </Link>
              ))}
              <a href={`mailto:${CONTACT_EMAIL}`}>{c.footer.links.contact}</a>
            </nav>
            <p style={{ opacity: 0.7, fontSize: 12 }}>
              © {new Date().getFullYear()} {SITE_NAME}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
