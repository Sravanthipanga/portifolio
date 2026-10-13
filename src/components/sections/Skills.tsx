"use client";

import { CSSProperties, useRef, useState } from "react";
import { EXPERIENCE, PROJECTS, SKILL_GROUPS } from "@/lib/data";
import { useInView } from "@/lib/hooks";
import SectionHeading from "../ui/SectionHeading";
import TechLogo, { BRAND, isBrand } from "../ui/TechLogo";

type Tile = {
  n: number;
  symbol: string;
  name: string;
  family: string;
  icon: string;
  usedIn: string[];
};

function makeSymbol(name: string, used: Set<string>): string {
  const words = name.replace(/[^A-Za-z0-9]+/g, " ").trim().split(" ");
  const first = words[0];
  const pool = [first[1], ...words.slice(1).map((w) => w[0]), ...first.slice(2), ...words.slice(1).join("")].filter(Boolean);
  for (const c of pool) {
    const s = first[0].toUpperCase() + c.toLowerCase();
    if (!used.has(s)) {
      used.add(s);
      return s;
    }
  }
  return first.slice(0, 2);
}

const SOURCES = [
  ...PROJECTS.map((p) => ({ label: p.title, text: `${p.description} ${p.tech.join(" ")}` })),
  ...EXPERIENCE.map((e) => ({ label: e.company, text: `${e.bullets.join(" ")} ${e.tech.join(" ")}` })),
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const TILES: Tile[] = (() => {
  const used = new Set<string>();
  let n = 0;
  return SKILL_GROUPS.flatMap((g) =>
    g.skills.map((s) => {
      const re = new RegExp(s.match ?? `\\b${escape(s.name)}\\b`, "i");
      return {
        n: ++n,
        symbol: makeSymbol(s.name, used),
        name: s.name,
        family: g.family,
        icon: s.icon,
        usedIn: SOURCES.filter((src) => re.test(src.text)).map((src) => src.label),
      };
    }),
  );
})();

const FAMILIES = SKILL_GROUPS.map((g) => g.family);

const CSS = `
.sk-head { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 24px 48px; }
.sk-head p.lede { max-width: 42ch; }
.sk-filters { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 40px; }
.sk-chip { height: 34px; padding: 0 14px; border-radius: 999px; font-size: 13px; font-weight: 500; color: var(--ink-2);
  box-shadow: inset 0 0 0 1px var(--line); background: var(--card);
  transition: background .4s var(--ease), color .4s var(--ease); }
.sk-chip:hover { box-shadow: inset 0 0 0 1px rgba(13,13,13,.35); }
.sk-chip[aria-pressed="true"] { background: var(--ink); color: #fff; box-shadow: none; }
.sk-chip small { font-family: var(--nf-mono); font-size: 10px; margin-left: 6px; opacity: .6; }

.sk-body { display: grid; grid-template-columns: minmax(0,1fr) 320px; gap: clamp(20px, 2.5vw, 36px);
  margin-top: 28px; align-items: start; }
.sk-grid { display: grid; grid-template-columns: repeat(8, minmax(0,1fr)); gap: 6px; }
.sk-tile { position: relative; aspect-ratio: 1 / 0.86; text-align: left; border-radius: 12px; background: var(--card);
  box-shadow: inset 0 0 0 1px var(--line); padding: 8px 9px; display: flex; flex-direction: column; min-width: 0;
  opacity: 0; transform: translateY(14px) scale(.96);
  transition: opacity .7s var(--ease), transform .7s var(--ease), background .35s var(--ease), color .35s var(--ease),
    box-shadow .35s var(--ease); transition-delay: var(--d8); }
.sk-grid.is-in .sk-tile { opacity: 1; transform: none; }
.sk-grid.is-in .sk-tile.is-dim { opacity: .18; }
.sk-tile:hover, .sk-tile.is-sel { background: var(--ink); color: #fff; box-shadow: none; transition-delay: 0s; }
.sk-grid.is-in .sk-tile:hover { transform: translateY(-3px); }
.sk-n { font: 500 10px/1 var(--nf-mono); color: var(--mute); }
.sk-sym { margin-top: auto; font-weight: 700; font-size: clamp(18px, 2vw, 30px); letter-spacing: -0.04em; line-height: 1; }
.sk-name { margin-top: 4px; font-size: 10.5px; line-height: 1.15; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sk-fam { margin-top: 2px; font: 400 8.5px/1.1 var(--nf-mono); text-transform: uppercase; letter-spacing: .04em; color: var(--faint);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.sk-tile:hover .sk-n, .sk-tile.is-sel .sk-n, .sk-tile:hover .sk-fam, .sk-tile.is-sel .sk-fam { color: rgba(255,255,255,.55); }

.sk-insp { position: sticky; top: calc(var(--nav-h) + 16px); padding: 26px; border-radius: 26px; min-height: 460px;
  display: flex; flex-direction: column; }
.sk-insp-top { display: flex; justify-content: space-between; font: 400 11px/1 var(--nf-mono); color: var(--mute); }
.sk-logo { position: relative; width: 150px; height: 150px; margin: 26px auto 22px; display: grid; place-items: center;
  animation: sk-pop .7s var(--ease) both; color: var(--ink); }
.sk-logo::before { content: ""; position: absolute; inset: -18%; border-radius: 50%; background: var(--tint, transparent);
  opacity: .14; filter: blur(26px); }
.sk-logo > * { position: relative; }
@keyframes sk-pop { 0% { opacity: 0; transform: scale(.7) rotate(-6deg); } 60% { opacity: 1; transform: scale(1.05); }
  100% { transform: none; } }
.sk-insp h3 { font-weight: 700; font-size: 28px; letter-spacing: -0.04em; line-height: 1.05; }
.sk-insp-fam { margin-top: 6px; font: 400 12px/1 var(--nf-mono); text-transform: uppercase; color: var(--mute); }
.sk-insp-used { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--line); }
.sk-insp-used p { font: 400 11px/1 var(--nf-mono); text-transform: uppercase; color: var(--mute); margin-bottom: 10px; }
.sk-insp-used ul { display: flex; flex-wrap: wrap; gap: 6px; }

@media (max-width: 1080px) {
  .sk-body { grid-template-columns: minmax(0,1fr); }
  .sk-insp { position: relative; top: 0; min-height: 0; }
}
@media (max-width: 720px) {
  .sk-grid { grid-template-columns: repeat(4, minmax(0,1fr)); }
  .sk-tile { transition-delay: var(--d4); }
  .sk-sym { font-size: 24px; }
}
`;

export default function Skills() {
  const [family, setFamily] = useState<string | null>(null);
  const [sel, setSel] = useState<Tile>(TILES[0]);
  const gridRef = useRef<HTMLUListElement>(null);
  const inView = useInView(gridRef, { threshold: 0.05 });

  const brand = BRAND[sel.icon];

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <style href="skills" precedence="default">
        {CSS}
      </style>
      <div className="wrap">
        <div className="sk-head">
          <SectionHeading id="skills-title" index="02" label="Skills" lead="The periodic table of my" accent="stack." />
          <p className="lede rv" style={{ "--i": 2 } as CSSProperties}>
            {TILES.length} elements, straight from my résumé. Hover or focus any tile to inspect it; filter by family.
          </p>
        </div>

        <div className="sk-filters rv" role="group" aria-label="Filter skills by family" style={{ "--i": 3 } as CSSProperties}>
          <button type="button" className="sk-chip" aria-pressed={family === null} onClick={() => setFamily(null)}>
            All<small>{TILES.length}</small>
          </button>
          {FAMILIES.map((f) => (
            <button
              key={f}
              type="button"
              className="sk-chip"
              aria-pressed={family === f}
              onClick={() => setFamily((cur) => (cur === f ? null : f))}
            >
              {f}
              <small>{TILES.filter((t) => t.family === f).length}</small>
            </button>
          ))}
        </div>

        <div className="sk-body">
          <ul ref={gridRef} className={`sk-grid${inView ? " is-in" : ""}`} aria-label="Skills">
            {TILES.map((t, i) => {
              const dim = family !== null && t.family !== family;
              const d8 = (Math.floor(i / 8) + (i % 8)) * 40;
              const d4 = (Math.floor(i / 4) + (i % 4)) * 40;
              return (
                <li key={t.n} style={{ display: "contents" }}>
                  <button
                    type="button"
                    className={`sk-tile${dim ? " is-dim" : ""}${sel.n === t.n ? " is-sel" : ""}`}
                    style={{ "--d8": `${d8}ms`, "--d4": `${d4}ms` } as CSSProperties}
                    onMouseEnter={() => setSel(t)}
                    onFocus={() => setSel(t)}
                    onClick={() => setSel(t)}
                    aria-label={`${t.name}, ${t.family}`}
                  >
                    <span className="sk-n" aria-hidden="true">
                      {t.n}
                    </span>
                    <span className="sk-sym" aria-hidden="true">
                      {t.symbol}
                    </span>
                    <span className="sk-name" aria-hidden="true">
                      {t.name}
                    </span>
                    <span className="sk-fam" aria-hidden="true">
                      {t.family}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <aside className="card sk-insp" aria-live="polite" aria-label="Skill inspector">
            <div className="sk-insp-top">
              <span>No. {String(sel.n).padStart(3, "0")}</span>
              <span>{sel.symbol}</span>
            </div>
            <div key={sel.n} className="sk-logo" style={{ "--tint": brand?.tint } as CSSProperties}>
              <TechLogo icon={sel.icon} size={isBrand(sel.icon) ? 120 : 110} decorative={false} />
            </div>
            <h3>{sel.name}</h3>
            <p className="sk-insp-fam">{sel.family}</p>
            <div className="sk-insp-used">
              <p>{sel.usedIn.length ? "Appears in" : "Listed under"}</p>
              <ul>
                {(sel.usedIn.length ? sel.usedIn : [`Skills · ${sel.family}`]).map((u) => (
                  <li key={u} className="chip">
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
