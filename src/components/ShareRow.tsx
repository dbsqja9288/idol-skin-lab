"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/data/types";
import { getCopy, path } from "@/i18n";

/**
 * 결과 공유 줄.
 *
 * 인스타그램은 웹 공유 인텐트가 없어서 캡션을 클립보드에 넣어준다.
 * 붙여넣기만 하면 되므로 실제로는 이게 제일 잘 쓰인다.
 */
export default function ShareRow({ code, name, lang }: { code: string; name: string; lang: Lang }) {
  const c = getCopy(lang);
  const [url, setUrl] = useState("");
  const [flash, setFlash] = useState<string | null>(null);

  // 배포 주소는 브라우저에서만 확실히 알 수 있다 (도메인이 바뀌어도 따라간다)
  useEffect(() => setUrl(window.location.origin + path(lang, "/type/" + code)), [code, lang]);

  const text = c.share.text(code, name);
  const caption = `${text}${url}\n\n${c.share.tags(code)}`;

  async function copy(payload: string, label: string) {
    let ok = true;
    try {
      await navigator.clipboard.writeText(payload);
    } catch {
      ok = false;
    }
    setFlash(ok ? label : c.share.manualCopy);
    setTimeout(() => setFlash(null), 2600);
  }

  return (
    <div className="share">
      <p className="prompt">{c.share.prompt(code)}</p>
      <div className="btns">
        <a
          className="sbtn"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener"
        >
          <IconFacebook />
          Facebook
        </a>
        <a
          className="sbtn"
          href={`https://www.threads.net/intent/post?text=${encodeURIComponent(caption)}`}
          target="_blank"
          rel="noopener"
        >
          <IconThreads />
          Threads
        </a>
        <button className={`sbtn${flash ? " done" : ""}`} onClick={() => copy(caption, c.share.copied)}>
          <IconInstagram />
          {flash ?? "Instagram"}
        </button>
        <button className="sbtn" onClick={() => copy(url, c.share.linkCopied)}>
          <IconLink />
          {c.share.copyLink}
        </button>
      </div>
    </div>
  );
}

function IconFacebook() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}
function IconThreads() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12.2 21.5c-5.3 0-8.7-3.6-8.7-9.5s3.4-9.5 8.7-9.5c3.9 0 6.6 1.9 7.7 5" />
      <path d="M8.6 14.4c0-1.7 1.6-2.7 3.9-2.7 3.1 0 4.6 1.4 4.6 3.6 0 2.3-1.6 3.6-3.4 3.6-1.9 0-3-1.1-3.2-2.7-.3-2.7 1.6-4.6 4.6-4.6" />
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <rect x="2.8" y="2.8" width="18.4" height="18.4" rx="5.4" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconLink() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
      <path d="M10.6 13.4a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.3 1.3" />
      <path d="M13.4 10.6a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.3-1.3" />
    </svg>
  );
}
