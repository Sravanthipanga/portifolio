"use client";

import { CSSProperties, useRef, useState } from "react";
import { PROJECTS } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionHeading from "../ui/SectionHeading";
import TechLogo from "../ui/TechLogo";
import MiniUI from "../ui/MiniUI";

const TECH_ICON: Record<string, string> = {
  "Java 18": "java",
  Go: "go",
  Microservices: "nodes",
  Java: "java",
  "Spring Boot": "springboot",
  React: "react",
  "RESTful APIs": "api",
  "Tailwind CSS Modules": "tailwindcss",
  Angular: "angular",
  JavaScript: "javascript",
  "Palantir Foundry": "palantir",
  "HL7/FHIR": "contract",
  PostgreSQL: "postgresql",
  GitHub: "github",
  GraphQL: "graphql",
  "Jakarta EE": "box",
};

const CSS = `
.wk-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px 48px; }
.wk { display: flex; gap: 10px; height: min(78svh, 600px); margin-top: 56px; }
.wk-p { position: relative; flex: 1 1 0; min-width: 76px; border-radius: 28px; background: var(--card); overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--line); transition: flex-grow .9s var(--ease), box-shadow .6s var(--ease); }
.wk-rv { opacity: 0; transform: translateY(24px); }
.wk-rv.is-in { opacity: 1; transform: none; transition: flex-grow .9s var(--ease), box-shadow .6s var(--ease),
  opacity .9s var(--ease) calc(var(--i, 0) * 80ms), transform .9s var(--ease) calc(var(--i, 0) * 80ms); }
.wk-p.is-open { flex-grow: 8; box-shadow: inset 0 0 0 1px var(--line), 0 40px 90px -40px rgba(13,13,13,.35); }

.wk-spine { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: space-between;
  padding: 22px 0; text-align: center; transition: opacity .4s var(--ease); }
.wk-p.is-open .wk-spine { opacity: 0; pointer-events: none; }
.wk-num { font: 500 12px/1 var(--nf-mono); color: var(--mute); }
.wk-vt { writing-mode: vertical-rl; transform: rotate(180deg); font-weight: 700; font-size: 20px; letter-spacing: -0.03em;
  white-space: nowrap; }
.wk-plus { width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; font-size: 20px; line-height: 1;
  box-shadow: inset 0 0 0 1px rgba(13,13,13,.2); transition: transform .6s var(--ease), background .4s, color .4s; }
.wk-p:hover .wk-plus, .wk-spine:focus-visible .wk-plus { transform: rotate(90deg); background: var(--ink); color: #fff; }

.wk-open { position: absolute; inset: 0; width: max(100%, 700px); display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 28px; padding: clamp(24px, 2.6vw, 40px); opacity: 0; visibility: hidden;
  transition: opacity .5s var(--ease), visibility 0s .5s; }
.wk-p.is-open .wk-open { opacity: 1; visibility: visible; transition: opacity .7s var(--ease) .25s, visibility 0s; }
.wk-info { display: flex; flex-direction: column; min-width: 0; }
.wk-kick { display: flex; gap: 12px; font: 400 12px/1 var(--nf-mono); text-transform: uppercase; color: var(--mute); }
.wk-kick b { color: var(--ink); font-weight: 500; }
.wk-title { margin-top: 18px; font-weight: 700; font-size: clamp(30px, 3vw, 46px); letter-spacing: -0.045em; line-height: 1; }
.wk-desc { margin-top: 16px; color: var(--ink-2); font-size: 14.5px; line-height: 1.6; }
.wk-phase { margin-top: 14px; padding: 12px 14px; border-radius: 14px; background: var(--paper);
  box-shadow: inset 0 0 0 1px var(--line); font-size: 13.5px; line-height: 1.55; color: var(--ink-2); }
.wk-phase b { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; font: 500 11px/1 var(--nf-mono);
  text-transform: uppercase; letter-spacing: .05em; color: var(--ink); }
.wk-phase b::before { content: "→"; }
/* The phase note replaces the feature bullets (they repeat the description) so the card never overflows. */
.wk-info.has-phase .wk-feats { display: none; }
.wk-feats { margin-top: 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 16px; font-size: 13px; }
.wk-feats li { display: flex; gap: 8px; color: var(--ink-2); }
.wk-feats li::before { content: ""; flex: none; width: 5px; height: 5px; margin-top: 7px; border-radius: 50%; background: var(--ink); }
.wk-tech { margin-top: auto; padding-top: 20px; display: flex; flex-wrap: wrap; gap: 6px; }
.wk-tech .chip img, .wk-tech .chip svg { width: 14px; height: 14px; }
.wk-ui { min-width: 0; clip-path: inset(0 0 0 100% round 20px); transition: clip-path 1.1s var(--ease) .15s; }
.wk-p.is-open .wk-ui { clip-path: inset(0 0 0 0 round 20px); }

@media (max-width: 1180px) {
  .wk-open { grid-template-columns: minmax(0, 1fr); width: max(100%, 440px); }
  .wk-ui { display: none; }
}
@media (max-width: 900px) {
  .wk { flex-direction: column; height: auto; }
  .wk-p { flex: none; min-width: 0; }
  .wk-spine { position: relative; flex-direction: row; justify-content: flex-start; gap: 16px; padding: 20px 22px; width: 100%; text-align: left; }
  .wk-p.is-open .wk-spine { opacity: 1; pointer-events: auto; }
  .wk-vt { writing-mode: horizontal-tb; transform: none; flex: 1; font-size: 20px; }
  .wk-p.is-open .wk-plus { transform: rotate(45deg); background: var(--ink); color: #fff; }
  .wk-fold { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .7s var(--ease); }
  .wk-p.is-open .wk-fold { grid-template-rows: 1fr; }
  .wk-fold > div { overflow: hidden; min-height: 0; }
  .wk-open { position: relative; inset: auto; width: 100%; padding: 0 22px 24px; gap: 22px; }
  .wk-open .wk-title { display: none; }
  .wk-ui { display: block; height: 240px; }
}
@media (max-width: 480px) {
  .wk-feats { grid-template-columns: 1fr; }
}
`;

export default function Work() {
  const [open, setOpen] = useState(0);
  // Reveal state lives in React: a class added straight to the DOM (like the
  // global .rv observer does) would be wiped when hovering re-renders a panel.
  const listRef = useRef<HTMLUListElement>(null);
  const shown = useInView(listRef, { threshold: 0.1 });

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <style href="work" precedence="default">
        {CSS}
      </style>
      <div className="wrap">
        <div className="wk-head">
          <SectionHeading id="work-title" index="03" label="Selected work" lead="Things I've" accent="built." />
          <p className="lede rv" style={{ maxWidth: "40ch", "--i": 2 } as CSSProperties}>
            Platforms and modernizations from my roles at Optum and Context4 Healthcare, in the résumé&apos;s own words.
          </p>
        </div>

        <ul ref={listRef} className="wk">
          {PROJECTS.map((p, i) => {
            const isOpen = open === i;
            return (
              <li
                key={p.id}
                className={`wk-p wk-rv${shown ? " is-in" : ""}${isOpen ? " is-open" : ""}`}
                style={{ "--i": i } as CSSProperties}
                onMouseEnter={() => setOpen(i)}
              >
                <button
                  type="button"
                  className="wk-spine"
                  aria-expanded={isOpen}
                  aria-controls={`wk-${p.id}`}
                  onFocus={() => setOpen(i)}
                  onClick={() => setOpen(i)}
                >
                  <span className="wk-num">{p.index}</span>
                  <span className="wk-vt">{p.title}</span>
                  <span className="wk-plus" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="wk-fold">
                  <div>
                    <div className="wk-open" id={`wk-${p.id}`} role="region" aria-label={p.title}>
                      <div className={`wk-info${p.nextPhase ? " has-phase" : ""}`}>
                        <p className="wk-kick">
                          <b>{p.index}</b>
                          <span>{p.kicker}</span>
                        </p>
                        <h3 className="wk-title">{p.title}</h3>
                        <p className="wk-desc">{p.description}</p>
                        {p.nextPhase && (
                          <p className="wk-phase">
                            <b>Next phase · {p.nextPhase.title}</b>
                            {p.nextPhase.text}
                          </p>
                        )}
                        <ul className="wk-feats">
                          {p.features.map((f) => (
                            <li key={f}>{f}</li>
                          ))}
                        </ul>
                        <ul className="wk-tech" aria-label="Technologies">
                          {p.tech.map((t) => (
                            <li key={t} className="chip">
                              <TechLogo icon={TECH_ICON[t] ?? "check"} size={14} />
                              {t}
                            </li>
                          ))}
                        </ul>
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 18, alignSelf: "flex-start" }}>
                            View on GitHub <span aria-hidden="true">↗</span>
                          </a>
                        )}
                      </div>
                      <div className="wk-ui">
                        <MiniUI kind={p.ui} />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
