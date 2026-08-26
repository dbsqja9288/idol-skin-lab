import { Fragment } from "react";
import Link from "next/link";
import { groupProducts, type Report } from "@/lib/engine";
import { activeStores, brandFor, linkFor, nameFor, priceFor, storeLabel } from "@/lib/affiliate";
import { getCopy, path } from "@/i18n";
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
  const c = getCopy(report.lang);
  const s = c.sections;
  const stores = activeStores(report.lang);
  const Heading = variant === "quiz" ? "h2" : "h1";

  return (
    <div className="rpt">
      <div className="rpt-hero">
        <p className="eyebrow">{variant === "quiz" ? s.resultEyebrow : s.pageEyebrow}</p>
        <p className="code">
          {report.code.split("").map((ch, i) => (
            <Fragment key={i}>
              {i > 0 ? <span>·</span> : null}
              {ch}
            </Fragment>
          ))}
        </p>
        <Heading className="typename">{report.name}</Heading>
        <p className="typeline">{report.line}</p>
        <span className="rarity">{report.rarity}</span>
      </div>

      {variant === "quiz" ? <ShareRow code={report.code} name={report.name} lang={report.lang} /> : null}

      <section className="sec">
        <div className="sec-head">
          <h2>{s.axesTitle}</h2>
          <p>{variant === "quiz" ? s.axesNoteQuiz : s.axesNotePage}</p>
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
          <h2>{s.cardsTitle}</h2>
          <p>{s.cardsNote}</p>
        </div>
        <div className="cards">
          {report.cards.map((card) => (
            <div className="card" key={card.head}>
              <span className="tag">{card.tag}</span>
              <h3>{card.head}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <AdSlot slot={2} />

      <section className="sec">
        <div className="sec-head">
          <h2>{s.routineTitle}</h2>
          <p>{s.routineNote}</p>
        </div>
        <div className="routine">
          <div className="rcol">
            <h3>{s.morning}</h3>
            <p className="sub">{s.morningSub}</p>
            <Steps steps={report.routine.am} />
          </div>
          <div className="rcol">
            <h3>{s.evening}</h3>
            <p className="sub">{s.eveningSub}</p>
            <Steps steps={report.routine.pm} />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="sec-head">
          <h2>{s.productsTitle}</h2>
          <p>{s.productsNote}</p>
        </div>

        {groupProducts(report.products).map(({ group, items }) => (
          <div className="prod-group" key={group}>
            <div className="group-head">
              <h3>{c.productStep[group]}</h3>
              <p>{c.productStepNote[group]}</p>
            </div>
            <div className="prods">
              {items.map((p) => (
                <ProductCard key={p.key} p={p} stores={stores} lang={report.lang} />
              ))}
            </div>
          </div>
        ))}

        <p className="aff-note">{s.affiliateNote}</p>
      </section>

      <section className="sec">
        <div className="sec-head">
          <h2>{c.idolMatch.title}</h2>
          <p>{c.idolMatch.note}</p>
        </div>

        <article className="match">
          <div className="match-top">
            <div className="ava" style={{ background: "var(--glow-a)" }}>{report.match.idol.i}</div>
            <div>
              <p className="eyebrow">{c.idolMatch.matchEyebrow}</p>
              <h3>{report.match.idol.n}</h3>
              <p className="grp">{report.match.idol.g}</p>
            </div>
          </div>
          <div className="method">
            <p className="method-label">{c.idolMatch.methodLabel}</p>
            <p className="method-name">{report.match.idol.method.name}</p>
            <p className="method-line">{report.match.idol.method.line}</p>
          </div>
          <p className="habit">{report.match.idol.habit}</p>
          <p className="pull">{report.match.idol.pull}</p>
        </article>

        <div className="group-head kit-head">
          <h3>{c.idolMatch.kitTitle}</h3>
          <p>{c.idolMatch.kitNote}</p>
        </div>
        <div className="prods">
          {report.match.kit.map((p) => (
            <ProductCard key={`kit-${p.key}`} p={p} stores={stores} lang={report.lang} />
          ))}
        </div>

        {report.others.length ? (
          <>
            <div className="group-head kit-head">
              <h3>{c.idolMatch.alsoTitle}</h3>
              <p>{c.idolMatch.alsoNote}</p>
            </div>
            <div className="idols">
              {report.others.map((d, i) => (
                <article className="idol" key={d.key}>
                  <div className="ava" style={{ background: ["var(--glow-b)", "var(--glow-c)"][i] }}>{d.i}</div>
                  <div>
                    <h3>{d.n}</h3>
                    <p className="grp">{d.g} · {d.method.name}</p>
                    <p className="habit">{d.habit}</p>
                    <p className="pull">{d.pull}</p>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}

        <p className="aff-note">{s.affiliateNote}</p>
      </section>

      {variant === "page" ? (
        <div className="callout">
          <h2>{c.typePage.notYouTitle}</h2>
          <p>{c.typePage.notYouBody}</p>
          <p style={{ marginTop: 20 }}>
            <Link className="cta" href={path(report.lang, "")}>
              {c.typePage.cta}
            </Link>
          </p>
        </div>
      ) : null}
    </div>
  );
}

function ProductCard({
  p, stores, lang,
}: {
  p: import("@/lib/engine").ProductView;
  stores: import("@/lib/affiliate").StoreKey[];
  lang: import("@/data/types").Lang;
}) {
  return (
    <article className="prod">
      <div className="bottle" style={{ background: `linear-gradient(160deg, ${p.c[0]}, ${p.c[1]})` }}>
        <b>{p.brand}</b>
      </div>
      <div className="info">
        <p className="reason">{p.reason}</p>
        <p className="brand">{brandFor(p, lang)}</p>
        <p className="name">{nameFor(p, lang)}</p>
        <p className="why">{p.why}</p>
        <p className="price">{priceFor(p, lang)}</p>
      </div>
      <div className="shop">
        {stores.map((k) => (
          <a key={k} href={linkFor(p, k, lang)} target="_blank" rel="nofollow sponsored noopener">
            {storeLabel(k)}
          </a>
        ))}
      </div>
    </article>
  );
}

function Steps({ steps }: { steps: { t: string; s: string }[] }) {
  return (
    <ul className="steps">
      {steps.map((step, i) => (
        <li key={step.t}>
          <span className="n">{i + 1}</span>
          <span className="c">
            <strong>{step.t}</strong>
            <span>{step.s}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
