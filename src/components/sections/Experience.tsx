"use client";

import { CSSProperties, useCallback, useRef, useState } from "react";
import { EDUCATION, EXPERIENCE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import SectionHeading from "../ui/SectionHeading";

type Stop = {
  when: string;
  title: string;
  place: string;
  detail: string;
  kind: "Work" | "Education";
  highlights?: string[];
  tech?: string[];
};

const [ms, bs] = EDUCATION;
const [bamboo, context4, optum, phoenix] = EXPERIENCE;
const role = (e: (typeof EXPERIENCE)[number], detail: string): Stop => ({
  when: `${e.start} — ${e.end}`,
  title: e.title,
  place: [e.company, e.place].filter(Boolean).join(" · "),
  detail,
  kind: "Work",
  highlights: e.bullets.filter((b) => b !== detail),
  tech: e.tech,
});

// Chronological: education and experience on one path.
const STOPS: Stop[] = [
  { when: "Undergraduate", title: bs.degree, place: bs.school, detail: bs.score, kind: "Education" },
  role(phoenix, phoenix.bullets[0]),
  role(optum, optum.bullets[1]),
  { when: ms.date ?? "", title: ms.degree, place: ms.school, detail: ms.score, kind: "Education" },
  role(context4, context4.bullets[0]),
  role(bamboo, bamboo.bullets[0]),
];

const CSS = `
.xp-path { position: relative; margin-top: 64px; max-width: 980px; margin-inline: auto; }
.xp-spine { position: absolute; left: 150px; top: 6px; bottom: 0; width: 1px; background: var(--line); }
.xp-spine i { position: absolute; inset: 0; background: var(--ink); transform-origin: 0 0; transform: scaleY(var(--p, 0)); }
.xp-stop { position: relative; display: grid; grid-template-columns: 150px minmax(0,1fr); gap: 0 44px; padding-bottom: 56px; }
.xp-when { font: 500 12px/1.4 var(--nf-mono); color: var(--mute); text-align: right; padding-top: 4px; padding-right: 22px;
  transition: color .6s var(--ease); }
.xp-dot { position: absolute; left: 150px; top: 8px; width: 13px; height: 13px; margin-left: -6px; border-radius: 50%;
  background: var(--paper); box-shadow: inset 0 0 0 1.5px var(--faint); transition: background .5s var(--ease), box-shadow .5s, transform .6s var(--ease); }
.xp-body { transform: translateX(-6px); transition: transform .7s var(--ease); }
.xp-title { color: var(--ink-2); transition: color .7s var(--ease); }
.xp-stop.is-lit .xp-title { color: var(--ink); }
.xp-stop.is-lit .xp-when { color: var(--ink); }
.xp-stop.is-lit .xp-dot { background: var(--ink); box-shadow: 0 0 0 5px rgba(13,13,13,.08); transform: scale(1.1); }
.xp-stop.is-lit .xp-body { transform: none; }
.xp-kind { font: 400 11px/1 var(--nf-mono); text-transform: uppercase; letter-spacing: .06em; color: var(--mute); }
.xp-title { margin-top: 8px; font-weight: 700; font-size: clamp(22px, 2.2vw, 32px); letter-spacing: -0.04em; line-height: 1.1; }
.xp-place { margin-top: 6px; font-weight: 500; color: var(--ink-2); }
.xp-detail { margin-top: 10px; max-width: 62ch; color: var(--mute); font-size: 15px; }
.xp-more { margin-top: 14px; }
.xp-more summary { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; list-style: none;
  font: 500 12px/1 var(--nf-mono); text-transform: uppercase; letter-spacing: .04em; color: var(--ink);
  padding: 9px 14px; border-radius: 999px; box-shadow: inset 0 0 0 1px rgba(13,13,13,.2);
  transition: background .4s var(--ease), color .4s var(--ease); }
.xp-more summary::-webkit-details-marker { display: none; }
.xp-more summary::after { content: "+"; font-size: 15px; transition: transform .5s var(--ease); }
.xp-more[open] summary::after { transform: rotate(45deg); }
.xp-more summary:hover { background: var(--ink); color: #fff; }
.xp-list { margin-top: 16px; display: grid; gap: 10px; max-width: 70ch; }
.xp-list li { position: relative; padding-left: 18px; color: var(--ink-2); font-size: 14.5px; line-height: 1.55; }
.xp-list li::before { content: ""; position: absolute; left: 2px; top: .62em; width: 5px; height: 5px; border-radius: 50%;
  background: var(--ink); }
.xp-more[open] .xp-list { animation: xp-in .6s var(--ease) both; }
@keyframes xp-in { from { opacity: 0; transform: translateY(-6px); } }
.xp-tech { margin-top: 14px; display: flex; flex-wrap: wrap; gap: 6px; }
.xp-tech li { font: 400 11.5px/1 var(--nf-mono); padding: 6px 9px; border-radius: 999px; background: var(--card);
  box-shadow: inset 0 0 0 1px var(--line); color: var(--ink-2); }
.xp-next { margin-left: 194px; border-radius: 24px; border: 1.5px dashed rgba(13,13,13,.25); padding: 26px 28px;
  display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.xp-next strong { font-weight: 700; font-size: clamp(22px, 2.2vw, 30px); letter-spacing: -0.04em; }
@media (max-width: 720px) {
  .xp-spine, .xp-dot { left: 6px; }
  .xp-stop { grid-template-columns: minmax(0,1fr); padding-left: 32px; padding-bottom: 44px; }
  .xp-when { text-align: left; padding: 0 0 8px; }
  .xp-next { margin-left: 32px; }
}
`;

export default function Experience() {
  const pathRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLSpanElement>(null);
  const [lit, setLit] = useState(0);

  const onProgress = useCallback((p: number) => {
    spineRef.current?.style.setProperty("--p", p.toFixed(4));
    const path = pathRef.current;
    if (!path) return;
    const h = path.offsetHeight;
    const stops = path.querySelectorAll<HTMLElement>(".xp-stop");
    let count = 0;
    stops.forEach((s) => {
      if (s.offsetTop <= p * h + 8) count++;
    });
    setLit(count);
  }, []);

  useScrollProgress(pathRef, onProgress, "center");

  return (
    <section id="experience" className="section" aria-labelledby="xp-title">
      <style href="xp" precedence="default">
        {CSS}
      </style>
      <div className="wrap">
        <SectionHeading id="xp-title" index="06" label="Experience" lead="Education and experience, one" accent="path." />
        <div ref={pathRef} className="xp-path">
          <div className="xp-spine" aria-hidden="true">
            <i ref={spineRef} />
          </div>
          <ol>
            {STOPS.map((s, i) => (
              <li key={s.title + s.when} className={`xp-stop${i < lit ? " is-lit" : ""}`}>
                <span className="xp-dot" aria-hidden="true" />
                <p className="xp-when">{s.when}</p>
                <div className="xp-body">
                  <p className="xp-kind">{s.kind}</p>
                  <h3 className="xp-title">{s.title}</h3>
                  <p className="xp-place">{s.place}</p>
                  <p className="xp-detail">{s.detail}</p>
                  {s.highlights && s.highlights.length > 0 && (
                    <details className="xp-more">
                      <summary>
                        {s.highlights.length} more highlights
                      </summary>
                      <ul className="xp-list">
                        {s.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                      {s.tech && (
                        <ul className="xp-tech" aria-label="Technologies used">
                          {s.tech.filter(Boolean).map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      )}
                    </details>
                  )}
                </div>
              </li>
            ))}
          </ol>
          <div className="xp-next rv" style={{ "--i": 1 } as CSSProperties}>
            <strong>
              Next — <span className="serif">Your team?</span>
            </strong>
            <a href="#contact" className="btn btn-primary">
              Start a conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
