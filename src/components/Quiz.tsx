"use client";

import { useCallback, useEffect, useState } from "react";
import { QUESTIONS } from "@/data/questions";
import { reportFromScore, tally } from "@/lib/engine";
import ReportView from "./Report";

type Stage = "intro" | "quiz" | "loading" | "report";

const LOADING_STEPS = [
  "Reading your barrier",
  "Weighing how you hold pigment",
  "Checking your sun history",
  "Pulling formulas off the Seoul shelf",
  "Writing it up",
];

export default function Quiz() {
  const [stage, setStage] = useState<Stage>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [loadStep, setLoadStep] = useState(0);

  const go = useCallback((next: Stage) => {
    setStage(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const pick = useCallback(
    (i: number) => {
      if (picked !== null) return; // 연타로 두 문항이 한 번에 넘어가는 것을 막는다
      setPicked(i);
      setTimeout(() => {
        const next = [...answers];
        next[idx] = i;
        setAnswers(next);
        setPicked(null);
        if (idx + 1 < QUESTIONS.length) {
          setIdx(idx + 1);
        } else {
          setLoadStep(0);
          go("loading");
        }
      }, 160);
    },
    [answers, idx, picked, go],
  );

  // 분석 화면 — 문구가 순서대로 지나가고 끝나면 리포트로
  useEffect(() => {
    if (stage !== "loading") return;
    const t = setInterval(() => {
      setLoadStep((s) => {
        if (s + 1 < LOADING_STEPS.length) return s + 1;
        clearInterval(t);
        go("report");
        return s;
      });
    }, 620);
    return () => clearInterval(t);
  }, [stage, go]);

  // A–D 키로 답하기
  useEffect(() => {
    if (stage !== "quiz") return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase().charCodeAt(0) - 65;
      if (k >= 0 && k < QUESTIONS[idx].a.length) pick(k);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, idx, pick]);

  function back() {
    if (idx === 0) {
      go("intro");
      return;
    }
    setIdx(idx - 1);
    setAnswers(answers.slice(0, idx - 1));
  }

  if (stage === "intro") {
    return (
      <div className="screen on">
        <div className="intro">
          <p className="eyebrow">Backstage skin consultation · Seoul</p>
          <h1>
            I prep idol skin for <em>comeback week</em>. Let me read yours.
          </h1>
          <p className="lede">
            I&apos;m the one backstage with the fridge full of sheet masks, ten minutes before the cameras. Answer the same ten
            questions I&apos;d ask you in the chair and I&apos;ll tell you what your skin is actually asking for — and which Korean
            formulas answer it.
          </p>

          <button
            className="cta"
            onClick={() => {
              setIdx(0);
              setAnswers([]);
              go("quiz");
            }}
          >
            Read my skin
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
              <path d="M3 8.5h11M9.5 4l4.5 4.5L9.5 13" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="meta">Free · about 90 seconds · no sign-up, no email required</p>

          <FaceDiagram />

          <div className="credlist">
            <div>
              <strong>16</strong>
              <span>types, read the way we read skin in a Seoul treatment room — four axes, not four vague labels</span>
            </div>
            <div>
              <strong>90s</strong>
              <span>the same questions I&apos;d ask you in the chair, minus the wait for an appointment</span>
            </div>
            <div>
              <strong>AM/PM</strong>
              <span>a layering order you can run tonight, in the order idols actually run it</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "quiz") {
    const q = QUESTIONS[idx];
    return (
      <div className="screen on">
        <div className="qtop">
          <button className="back" onClick={back}>
            ← Back
          </button>
          <div className="bar">
            <i style={{ width: `${(idx / QUESTIONS.length) * 100}%` }} />
          </div>
          <span className="qcount">
            {String(idx + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}
          </span>
        </div>
        <div className="qbody">
          <p className="eyebrow qtheme">{q.theme}</p>
          <h2>{q.q}</h2>
          <p className="qhint">{q.hint}</p>
          <div className="opts">
            {q.a.map((o, i) => (
              <button key={o.label} className={`opt${picked === i ? " picked" : ""}`} onClick={() => pick(i)}>
                <span className="key">{String.fromCharCode(65 + i)}</span>
                <span className="txt">
                  {o.label}
                  {o.sub ? <small>{o.sub}</small> : null}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (stage === "loading") {
    return (
      <div className="screen on">
        <div className="loading">
          <div className="pulse" aria-hidden="true" />
          <p className="eyebrow">One moment</p>
          <p className="step">{LOADING_STEPS[loadStep]}</p>
        </div>
      </div>
    );
  }

  const report = reportFromScore(tally(answers));
  return (
    <div className="screen on">
      <ReportView report={report} variant="quiz" />
      <div className="callout">
        <h2>Want me to walk you through week one?</h2>
        <p>
          I&apos;ll send a four-week build for your type — what to add, what night to add it on, and a nudge when your actives are
          due to run out.
        </p>
        <MailRow />
      </div>
      <div className="restart">
        <button
          onClick={() => {
            setIdx(0);
            setAnswers([]);
            go("intro");
          }}
        >
          Read my skin again
        </button>
      </div>
    </div>
  );
}

function MailRow() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="mailrow"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input type="email" placeholder="you@email.com" aria-label="Email address" required disabled={sent} />
      <button type="submit">{sent ? "Sent ✓" : "Send it"}</button>
    </form>
  );
}

function FaceDiagram() {
  return (
    <div className="face-wrap" aria-hidden="true">
      <svg viewBox="0 0 300 210" fill="none">
        <ellipse cx="150" cy="105" rx="72" ry="92" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
        <path d="M150 13c-40 0-72 34-72 76 0 8 1 15 3 22" stroke="var(--accent)" strokeWidth="1.5" opacity=".5" />
        <path d="M150 30c-16 0-27 8-27 8v52h54V38s-11-8-27-8z" fill="var(--accent-soft)" opacity=".85" />
        <rect x="136" y="90" width="28" height="46" rx="12" fill="var(--accent-soft)" opacity=".85" />
        <ellipse cx="106" cy="108" rx="20" ry="17" fill="var(--glow-c)" opacity=".6" />
        <ellipse cx="194" cy="108" rx="20" ry="17" fill="var(--glow-c)" opacity=".6" />
        <ellipse cx="150" cy="168" rx="24" ry="15" fill="var(--glow-b)" opacity=".55" />
        <g fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="1" fill="var(--ink-3)">
          <line x1="150" y1="52" x2="252" y2="34" stroke="var(--line)" strokeWidth="1" />
          <circle cx="150" cy="52" r="2.6" fill="var(--accent)" />
          <text x="256" y="37">T-ZONE</text>
          <line x1="106" y1="108" x2="42" y2="88" stroke="var(--line)" strokeWidth="1" />
          <circle cx="106" cy="108" r="2.6" fill="var(--accent)" />
          <text x="4" y="84">CHEEKS</text>
          <line x1="150" y1="168" x2="248" y2="182" stroke="var(--line)" strokeWidth="1" />
          <circle cx="150" cy="168" r="2.6" fill="var(--accent)" />
          <text x="252" y="186">JAW</text>
        </g>
      </svg>
    </div>
  );
}
