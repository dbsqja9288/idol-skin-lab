import { ImageResponse } from "next/og";

export const alt = "Idol Skin Lab — the skin read idols get before comeback week";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** 공유 카드. 스레드·페이스북·카톡에 링크를 붙였을 때 나오는 그림이다. */
export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "0 90px",
          background: "linear-gradient(135deg, #FFD8E4 0%, #FFF7F8 42%, #E4DBFB 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 34 }}>
          <div style={{ width: 30, height: 30, borderRadius: 99, background: "#E8608C" }} />
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#2E1B24", fontWeight: 700 }}>IDOL SKIN LAB</div>
        </div>
        <div style={{ fontSize: 74, lineHeight: 1.1, color: "#2E1B24", fontWeight: 700, letterSpacing: -2 }}>
          The skin read idols get
        </div>
        <div style={{ fontSize: 74, lineHeight: 1.1, color: "#B23A63", fontWeight: 700, letterSpacing: -2 }}>
          before comeback week.
        </div>
        <div style={{ fontSize: 28, color: "#6E5661", marginTop: 34 }}>
          Ten questions · sixteen skin types · matched K-beauty formulas
        </div>
      </div>
    ),
    size,
  );
}
