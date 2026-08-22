import { Fragment } from "react";
import Link from "next/link";
import type { Report } from "@/lib/engine";
import { activeStores, linkFor, storeLabel } from "@/lib/affiliate";
import ShareRow from "./ShareRow";
import AdSlot from "./AdSlot";

/**
 * 리포트 본문.
 *
 * 퀴즈 결과(개인화)와 /type/[code] 정적 페이지가 **같은 컴포넌트**를 쓴다.
 * 그래서 문구를 한 번만 고치면 두 곳에 함께 반영된다.
 */
export default function ReportView({
  report,
  variant,
}: {
  report: Report;
  /** quiz = 퀴즈 직후 개인 결과 / page = 검색으로 들어온 타입 소개 페이지 */
  variant: "quiz" | "page";
}) {
  const stores = activeStores();

  return (
    <div className="rpt">
      <div className="rpt-hero">
        <p className="eyebrow">{variant === "quiz" ? "Your Idol Skin Lab result" : "Idol Skin Lab · skin type"}</p>
        <p className="code">
          {report.code.split("").map((c, i) => (
            <Fragment key={i}>
              {i > 0 ? <span>·</span> : null}
              {c}
            </Fragment>
          ))}
        </p>
        <h1 className="typename">{report.name}</h1>
        <p className="typeline">{report.line}</p>
        <span className="rarity">{report.rarity}</span>
      </div>

      {variant === "quiz" ? <ShareRow code={report.code} name={report.name} /> : null}

      <section className="sec">
        <div className="sec-head">
          <h2>Your four axes</h2>
          <p>
            Every face I see sits somewhere on these four sliders. Here&apos;s where {variant === "quiz" ? "yours" : "this type"} sits
            — the further from centre, the harder the routine should lean that way.
          </p>
        </div>
        <div className="axes">
          {report.axes.map((a) => (
            <div className="axis" key={a.key}>
              <div className="lbl">
                <span>{a.meta.left}</span>
                <b>
                  {a.meta.title} · {a.leaning}
                </b>
                <span>{a.meta.right}</span>
              </div>
              <div className="track">
                <i style={{ left: `${a.pos}%` }} />
              </div>
              <p className="note">{a.meta.copy[a.band]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="sec-head">
          <h2>What this means day to day</h2>
          <p>The four things I&apos;d say before you got out of the chair.</p>
        </div>
        <div className="cards">
          {report.cards.map((c) => (
            <div className="card" key={c.tag}>
              <span className="tag">{c.tag}</span>
              <h3>{c.head}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <AdSlot slot={2} />

      <section className="sec">
        <div className="sec-head">
          <h2>Your layering order</h2>
          <p>Korean routines are about sequence and viscosity, not product count. Thinnest first — always. This is the order I work in.</p>
        </div>
        <div className="routine">
          <div className="rcol">
            <h3>Morning</h3>
            <p className="sub">Protect &amp; seal — 5 to 7 minutes</p>
            <Steps steps={report.routine.am} />
          </div>
          <div className="rcol">
            <h3>Evening</h3>
            <p className="sub">Clear &amp; repair — 8 to 10 minutes</p>
            <Steps steps={report.routine.pm} />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="sec-head">
          <h2>Matched for you</h2>
          <p>
            Picked against your four letters, from Korean lines that actually move off the shelf in Myeongdong — not export-only
            labels. Prices indicative.{" "}
            <strong>These are affiliate links: if you buy through them, I earn a small commission at no extra cost to you.</strong>
          </p>
        </div>
        <div className="prods">
          {report.products.map((p) => (
            <article className="prod" key={p.key}>
              <div className="bottle" style={{ background: `linear-gradient(160deg, ${p.c[0]}, ${p.c[1]})` }}>
                <b>{p.brand}</b>
              </div>
              <div className="info">
                <p className="step-lbl">
                  {p.step} · {p.price}
                </p>
                <p className="brand">{p.brand}</p>
                <p className="name">{p.name}</p>
                <p className="why">{p.why}</p>
              </div>
              <div className="shop">
                {stores.map((s) => (
                  <a key={s} href={linkFor(p, s)} target="_blank" rel="nofollow sponsored noopener">
                    {storeLabel(s)}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="sec-head">
          <h2>Borrowed from the idols</h2>
          <p>
            Habits K-pop artists have described in interviews and beauty features — filtered down to the ones that make sense for
            this type. Method only: no photos, no endorsement.
          </p>
        </div>
        <div className="idols">
          {report.idols.map((d, i) => (
            <article className="idol" key={d.key}>
              <div className="ava" style={{ background: ["var(--glow-a)", "var(--glow-b)", "var(--glow-c)"][i] }}>
                {d.i}
              </div>
              <div>
                <h3>{d.n}</h3>
                <p className="grp">{d.g}</p>
                <p className="habit">{d.habit}</p>
                <p className="pull">{d.pull}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {variant === "page" ? (
        <div className="callout">
          <h2>Not sure this is you?</h2>
          <p>Ten questions decide it properly — including the two most people get wrong about their own face.</p>
          <p style={{ marginTop: 20 }}>
            <Link className="cta" href="/">
              Read my skin
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  );
}

function Steps({ steps }: { steps: { t: string; s: string }[] }) {
  return (
    <ul className="steps">
      {steps.map((s, i) => (
        <li key={s.t}>
          <span className="n">{i + 1}</span>
          <span className="c">
            <strong>{s.t}</strong>
            <span>{s.s}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
