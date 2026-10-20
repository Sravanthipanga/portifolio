"use client";

import { CSSProperties, useCallback, useRef, useState } from "react";
import { CLAIM_LIFECYCLE, HEALTHCARE_COLUMNS, HEALTHCARE_STANDARDS, PAYER_TYPES } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import SectionHeading from "../ui/SectionHeading";

const CSS = `
.hc-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px 48px; }
.hc-head .lede { max-width: 44ch; }
.hc-toggle { display: inline-flex; align-items: center; gap: 12px; margin-top: 18px; font-size: 14px; font-weight: 500; }
.hc-switch { position: relative; width: 44px; height: 26px; border-radius: 999px; background: var(--soft);
  box-shadow: inset 0 0 0 1px var(--line); transition: background .4s var(--ease); flex: none; }
.hc-switch::after { content: ""; position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%;
  background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,.25); transition: transform .4s var(--ease); }
.hc-toggle[aria-pressed="true"] .hc-switch { background: var(--ink); }
.hc-toggle[aria-pressed="true"] .hc-switch::after { transform: translateX(18px); }
.hc-legend { display: inline-flex; align-items: center; gap: 8px; margin-left: 14px; font: 400 12px/1 var(--nf-mono); color: var(--mute); }
.hc-legend i { width: 12px; height: 12px; border-radius: 4px; background: var(--ink); }

.hc-map { display: grid; grid-template-columns: minmax(0,1fr) 40px minmax(0,1fr) 40px minmax(0,1fr); margin-top: 44px; align-items: stretch; }
.hc-col { padding: 22px; border-radius: 26px; }
.hc-col h3 { font-weight: 700; font-size: clamp(20px, 1.8vw, 26px); letter-spacing: -0.035em; line-height: 1.1; text-align: center; }
.hc-col > p { margin-top: 4px; text-align: center; font: 400 12px/1.4 var(--nf-mono); text-transform: uppercase;
  letter-spacing: .04em; color: var(--mute); }
.hc-col ul { margin-top: 18px; display: grid; gap: 8px; }
.hc-sys { position: relative; padding: 13px 14px; border-radius: 16px; background: var(--paper); text-align: center;
  box-shadow: inset 0 0 0 1px var(--line); transition: background .45s var(--ease), color .45s var(--ease),
  opacity .45s var(--ease), transform .45s var(--ease), box-shadow .45s var(--ease); }
.hc-sys:hover { transform: translateY(-2px); box-shadow: inset 0 0 0 1px rgba(13,13,13,.25); }
.hc-sys b { display: block; font-weight: 600; font-size: 15px; letter-spacing: -0.015em; }
.hc-sys span { display: block; margin-top: 3px; font-size: 12.5px; color: var(--mute); transition: color .45s var(--ease); }
.hc-sys.is-mine { background: var(--ink); color: #fff; box-shadow: none; }
.hc-sys.is-mine span { color: rgba(255,255,255,.7); }
.hc-sys em { display: block; margin-top: 8px; padding-top: 7px; border-top: 1px dashed rgba(255,255,255,.25);
  font: normal 400 11px/1.35 var(--nf-mono); color: rgba(255,255,255,.85); }
.hc-map.is-focus .hc-sys:not(.is-mine) { opacity: .28; }

.hc-link { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; color: var(--faint); }
.hc-link svg { width: 22px; height: 22px; }
.hc-link svg path { stroke-dasharray: 4 3; animation: hc-flow 1.4s linear infinite; }
.hc-link svg:last-child path { animation-direction: reverse; }
@keyframes hc-flow { to { stroke-dashoffset: -14; } }

.hc-life { margin-top: 64px; }
.hc-life h3, .hc-std h3 { font-weight: 700; font-size: clamp(22px, 2vw, 30px); letter-spacing: -0.035em; }
.hc-steps-wrap { position: relative; margin-top: 22px; }
.hc-steps { position: relative; display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 14px; }
.hc-track { position: absolute; left: 10%; right: 10%; top: 50%; height: 2px; background: var(--line); }
.hc-track i { position: absolute; inset: 0; background: var(--ink); transform-origin: 0 50%; transform: scaleX(var(--p, 0)); }
.hc-step { position: relative; z-index: 1; padding: 18px 14px; border-radius: 18px; background: var(--card); text-align: center;
  box-shadow: inset 0 0 0 1px var(--line); transition: background .5s var(--ease), color .5s var(--ease), transform .5s var(--ease); }
.hc-step small { display: inline-grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; margin-bottom: 8px;
  font: 600 12px/1 var(--nf-mono); box-shadow: inset 0 0 0 1px var(--line); transition: background .5s, color .5s; }
.hc-step b { display: block; font-weight: 600; font-size: 15.5px; letter-spacing: -0.015em; }
.hc-step span { display: block; margin-top: 3px; font-size: 12.5px; color: var(--mute); transition: color .5s; }
.hc-step.is-on { background: var(--ink); color: #fff; transform: translateY(-4px); }
.hc-step.is-on small { background: #fff; color: var(--ink); box-shadow: none; }
.hc-step.is-on span { color: rgba(255,255,255,.7); }
.hc-step mark { display: inline-block; margin-top: 8px; padding: 3px 8px; border-radius: 999px; background: transparent;
  font: 400 10.5px/1.2 var(--nf-mono); color: inherit; box-shadow: inset 0 0 0 1px currentColor; opacity: .75; }

.hc-std { margin-top: 56px; padding: 26px; border-radius: 26px; border: 1.5px dashed rgba(13,13,13,.22); text-align: center; }
.hc-std h4 { margin-top: 18px; font: 400 11px/1 var(--nf-mono); text-transform: uppercase; letter-spacing: .06em; color: var(--mute); }
.hc-chips { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-top: 12px; }
.hc-chips li { padding: 8px 16px; border-radius: 999px; font-size: 14px; font-weight: 500; background: var(--card);
  box-shadow: inset 0 0 0 1px var(--line); transition: background .45s var(--ease), color .45s var(--ease), opacity .45s; }
.hc-chips li.is-mine { background: var(--ink); color: #fff; box-shadow: none; }
.hc-std.is-focus .hc-chips li:not(.is-mine) { opacity: .35; }

@media (max-width: 1000px) {
  .hc-map { grid-template-columns: minmax(0,1fr); }
  .hc-link { flex-direction: row; padding: 10px 0; }
  .hc-link svg { transform: rotate(90deg); }
  .hc-col ul { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
@media (max-width: 720px) {
  .hc-steps { grid-template-columns: minmax(0,1fr); }
  .hc-track { left: 50%; right: auto; top: 6%; bottom: 6%; width: 2px; height: auto; }
  .hc-track i { transform-origin: 50% 0; transform: scaleY(var(--p, 0)); }
  .hc-legend { margin: 10px 0 0; display: flex; }
}
@media (max-width: 460px) {
  .hc-col ul { grid-template-columns: minmax(0,1fr); }
  .hc-col { padding: 16px; }
}
`;

function Arrows() {
  return (
    <div className="hc-link" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M3 12h17m-4-4 4 4-4 4" />
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M21 12H4m4-4-4 4 4 4" />
      </svg>
    </div>
  );
}

export default function Healthcare() {
  const [focus, setFocus] = useState(false);
  const [step, setStep] = useState(-1);
  const stepsRef = useRef<HTMLOListElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);

  // The claim travels through the five steps as the section scrolls past.
  const onProgress = useCallback((p: number) => {
    const t = Math.min(1, Math.max(0, (p - 0.1) / 0.6));
    trackRef.current?.style.setProperty("--p", t.toFixed(4));
    setStep(t <= 0 ? -1 : Math.min(CLAIM_LIFECYCLE.length - 1, Math.floor(t * CLAIM_LIFECYCLE.length)));
  }, []);
  useScrollProgress(stepsRef, onProgress, "through");

  return (
    <section id="healthcare" className="section" aria-labelledby="hc-title">
      <style href="healthcare" precedence="default">
        {CSS}
      </style>
      <div className="wrap">
        <div className="hc-head">
          <SectionHeading id="hc-title" index="04" label="Domain" lead="How US healthcare" accent="connects." />
          <div className="rv" style={{ "--i": 2 } as CSSProperties}>
            <p className="lede">
              Providers deliver care and bill for it, payers review, price and pay, and members enroll and get support.
              Here is how the systems fit together, and where my work sits.
            </p>
            <button type="button" className="hc-toggle" aria-pressed={focus} onClick={() => setFocus((f) => !f)}>
              <span className="hc-switch" aria-hidden="true" />
              Show where I&apos;ve worked
            </button>
            <span className="hc-legend">
              <i aria-hidden="true" /> built for, per my résumé
            </span>
          </div>
        </div>

        <div className={`hc-map${focus ? " is-focus" : ""}`}>
          {HEALTHCARE_COLUMNS.map((col, ci) => (
            <div key={col.id} style={{ display: "contents" }}>
              {ci > 0 && <Arrows />}
              <div className="rv card hc-col" style={{ "--i": ci } as CSSProperties}>
                <h3>{col.title}</h3>
                <p>{col.tagline}</p>
                <ul>
                  {col.systems.map((s) => (
                    <li key={s.title} className={`hc-sys${s.mine ? " is-mine" : ""}`}>
                      <b>{s.title}</b>
                      <span>{s.detail}</span>
                      {s.mine && <em>↳ {s.mine}</em>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="hc-life">
          <h3 className="rv">
            The life of a <span className="serif">claim.</span>
          </h3>
          <div className="hc-steps-wrap">
          <span ref={trackRef} className="hc-track" aria-hidden="true">
            <i />
          </span>
          <ol ref={stepsRef} className="hc-steps">
            {CLAIM_LIFECYCLE.map((s, i) => (
              <li key={s.title} className={`hc-step${i <= step ? " is-on" : ""}`}>
                <small>{i + 1}</small>
                <b>{s.title}</b>
                <span>{s.detail}</span>
                {s.mine && <mark>my work</mark>}
              </li>
            ))}
          </ol>
          </div>
        </div>

        <div className="rv">
        <div className={`hc-std${focus ? " is-focus" : ""}`}>
          <h3>Standards, oversight and payer types</h3>
          <h4>Standards &amp; oversight</h4>
          <ul className="hc-chips">
            {HEALTHCARE_STANDARDS.map((c) => (
              <li key={c.label} className={c.mine ? "is-mine" : undefined}>
                {c.label}
              </li>
            ))}
          </ul>
          <h4>Payer types</h4>
          <ul className="hc-chips">
            {PAYER_TYPES.map((c) => (
              <li key={c.label} className={c.mine ? "is-mine" : undefined}>
                {c.label}
              </li>
            ))}
          </ul>
        </div>
        </div>
      </div>
    </section>
  );
}
