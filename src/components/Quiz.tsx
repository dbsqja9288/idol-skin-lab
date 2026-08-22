"use client";

import { useCallback, useEffect, useState } from "react";
import { QUESTION_COUNT } from "@/data/questions";
import type { Lang } from "@/data/types";
import { getCopy } from "@/i18n";
import { reportFromScore, tally } from "@/lib/engine";
import ReportView from "./Report";

type Stage = "intro" | "quiz" | "loading" | "report";

export default function Quiz({ lang }: { lang: Lang }) {
  const c = getCopy(lang);
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
        if (idx + 1 < QUESTION_COUNT) setIdx(idx + 1);
        else {
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
        if (s + 1 < c.quiz.loading.length) return s + 1;
        clearInterval(t);
        go("report");
        return s;
      });
    }, 620);
    return () => clearInterval(t);
  }, [stage, go, c.quiz.loading.length]);

  // A–D 키로 답하기
  useEffect(() => {
    if (stage !== "quiz") return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase().charCodeAt(0) - 65;
      if (k >= 0 && k < c.questions[idx].a.length) pick(k);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, idx, pick, c.questions]);

  function restart() {
    setIdx(0);
    setAnswers([]);
    go("intro");
  }

  if (stage === "intro") {
    return (
      <div className="screen on">
        <div className="intro">
          <p className="eyebrow">{c.intro.eyebrow}</p>
          <h1>
            {c.intro.h1[0]}
            <em>{c.intro.h1[1]}</em>
            {c.intro.h1[2]}
          </h1>
          <p className="lede">{c.intro.lede}</p>

          <button
            className="cta"
            onClick={() => {
              setIdx(0);
              setAnswers([]);
              go("quiz");
            }}
          >
            {c.intro.cta}
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden="true">
              <path d="M3 8.5h11M9.5 4l4.5 4.5L9.5 13" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <p className="meta">{c.intro.meta}</p>

          <FaceDiagram labels={c.intro.face} />

          <div className="credlist">
            {c.intro.cred.map((x) => (
              <div key={x.n}>
                <strong>{x.n}</strong>
                <span>{x.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (stage === "quiz") {
    const q = c.questions[idx];
    return (
      <div className="screen on">
        <div className="qtop">
          <button className="back" onClick={() => (idx === 0 ? go("intro") : (setIdx(idx - 1), setAnswers(answers.slice(0, idx - 1))))}>
            {c.quiz.back}
          </button>
          <div className="bar">
            <i style={{ width: `${(idx / QUESTION_COUNT) * 100}%` }} />
          </div>
          <span className="qcount">
            {String(idx + 1).padStart(2, "0")} / {String(QUESTION_COUNT).padStart(2, "0")}
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
          <p className="eyebrow">{c.quiz.oneMoment}</p>
          <p className="step">{c.quiz.loading[loadStep]}</p>
        </div>
      </div>
    );
  }

  const report = reportFromScore(tally(answers), lang);
  return (
    <div className="screen on">
      <ReportView report={report} variant="quiz" />
      <div className="callout">
        <h2>{c.callout.title}</h2>
        <p>{c.callout.body}</p>
        <MailRow placeholder={c.callout.placeholder} button={c.callout.button} sentLabel={c.callout.sent} />
      </div>
      <div className="restart">
        <button onClick={restart}>{c.restart}</button>
      </div>
    </div>
  );
}

function MailRow({ placeholder, button, sentLabel }: { placeholder: string; button: string; sentLabel: string }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="mailrow"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <input type="email" placeholder={placeholder} aria-label={placeholder} required disabled={sent} />
      <button type="submit">{sent ? sentLabel : button}</button>
    </form>
  );
}

function FaceDiagram({ labels }: { labels: { tzone: string; cheeks: string; jaw: string } }) {
  return (
    <div className="face-wrap" aria-hidden="true">
      <svg viewBox="-6 0 318 210" fill="none">
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
          <text x="256" y="37">{labels.tzone}</text>
          <line x1="106" y1="108" x2="42" y2="88" stroke="var(--line)" strokeWidth="1" />
          <circle cx="106" cy="108" r="2.6" fill="var(--accent)" />
          <text x="4" y="84">{labels.cheeks}</text>
          <line x1="150" y1="168" x2="248" y2="182" stroke="var(--line)" strokeWidth="1" />
          <circle cx="150" cy="168" r="2.6" fill="var(--accent)" />
          <text x="252" y="186">{labels.jaw}</text>
        </g>
      </svg>
    </div>
  );
}
