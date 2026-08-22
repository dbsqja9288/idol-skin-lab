import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** 파비콘. 헤더 로고와 같은 모양이라 탭에서 바로 알아본다. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
          background: "#FFF7F8", borderRadius: 8,
        }}
      >
        <div style={{ width: 18, height: 18, borderRadius: 99, background: "#E8608C" }} />
      </div>
    ),
    size,
  );
}
