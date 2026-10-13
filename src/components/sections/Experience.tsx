"use client";

import { CSSProperties, useCallback, useRef, useState } from "react";
import { EDUCATION, EXPERIENCE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import SectionHeading from "../ui/SectionHeading";

type Stop = { when: string; title: string; place: string; detail: string; kind: "Work" | "Education" };

const [ms, bs] = EDUCATION;
const [bamboo, context4, optum, phoenix] = EXPERIENCE;
const role = (e: (typeof EXPERIENCE)[number], detail: string): Stop => ({
  when: `${e.start} — ${e.end}`,
  title: e.title,
  place: [e.company, e.place].filter(Boolean).join(" · "),
  detail,
  kind: "Work",
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
        <SectionHeading id="xp-title" index="05" label="Experience" lead="Education and experience, one" accent="path." />
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
