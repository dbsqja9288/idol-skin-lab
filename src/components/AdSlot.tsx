"use client";

import { useEffect, useRef } from "react";

/**
 * 광고 자리 — 뿌리찾기의 AdSlot과 같은 방식.
 *
 * 환경변수가 없으면 **아무것도 그리지 않는다.** 값을 넣기 전까지 사이트에 변화가 없고,
 * 애드센스 승인이 난 뒤 Vercel에 값만 넣으면 그 자리에 광고가 나온다.
 *
 *   NEXT_PUBLIC_ADSENSE_CLIENT = ca-pub-0000000000000000
 *   NEXT_PUBLIC_ADSENSE_SLOT   = 1234567890
 *
 * 카카오 애드핏은 넣지 않았다. 애드핏은 국내 광고주 인벤토리라
 * 영어권 방문자에게는 채울 광고가 없다(fill rate가 사실상 0).
 * 한국어 버전을 만들게 되면 그때 뿌리찾기 AdSlot을 그대로 가져오면 된다.
 *
 * ⚠️ 애드센스는 페이지 수가 적으면 '가치가 낮은 콘텐츠'로 거절된다.
 *    /type/[code] 16개가 색인된 뒤에 신청할 것.
 */
const CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

export const ADS_ENABLED = Boolean(CLIENT && SLOT);

export default function AdSlot({ slot = 1 }: { slot?: 1 | 2 | 3 }) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADS_ENABLED || pushed.current) return;
    pushed.current = true;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle ?? []).push({});
    } catch {
      // 광고 차단기가 막은 경우 — 사이트 동작에는 영향이 없다
    }
  }, []);

  if (!ADS_ENABLED) return null;

  return (
    <aside className="ad-frame" aria-label="Advertisement" data-slot={slot}>
      <p>Advertisement</p>
      <div className="ad-box">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client={CLIENT}
          data-ad-slot={SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
