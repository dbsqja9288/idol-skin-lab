import type { Metadata } from "next";
import Link from "next/link";
import { ALL_CODES, TYPE_NAMES } from "@/lib/engine";

export const metadata: Metadata = {
  title: "All 16 skin types",
  description:
    "The full map: sixteen skin types across four axes — oil, reactivity, pigment and firmness. Find yours and see the Korean routine that fits it.",
};

export default function TypeIndex() {
  return (
    <div className="prose">
      <p className="eyebrow">The full map</p>
      <h1>All sixteen types</h1>
      <p className="lead">
        Four axes, two outcomes each — that is sixteen ways a face can be. Most quizzes give you four labels and call it a
        diagnosis. This is the map I actually work from.
      </p>

      <h2>How to read the letters</h2>
      <ul>
        <li><b>D / O</b> — Dry or Oily. How much lipid your barrier makes on its own.</li>
        <li><b>S / R</b> — Sensitive or Resistant. Whether your skin reacts before it tolerates.</li>
        <li><b>P / N</b> — Pigment-prone or Non-pigmented. What a healed spot leaves behind.</li>
        <li><b>W / T</b> — Wrinkle-prone or Tight. Where you sit on structural ageing.</li>
      </ul>

      <h2>The sixteen</h2>
      <div className="typegrid">
        {ALL_CODES.map((code) => (
          <Link key={code} href={`/type/${code}`} prefetch={false}>
            <b>{code}</b>
            <span>{TYPE_NAMES[code]}</span>
          </Link>
        ))}
      </div>

      <h2>Not sure which is yours?</h2>
      <p>
        Ten questions settle it — including the two that most people get wrong about their own face. It takes about ninety
        seconds and asks for nothing.
      </p>
      <p style={{ marginTop: 22 }}>
        <Link className="cta" href="/">Read my skin</Link>
      </p>
      <p style={{ marginTop: 40, fontSize: 13, opacity: 0.75 }}>
        The four-axis framing follows the dermatological convention popularised by Dr. Leslie Baumann. The product matching,
        routines and copy here are our own.
      </p>
    </div>
  );
}
