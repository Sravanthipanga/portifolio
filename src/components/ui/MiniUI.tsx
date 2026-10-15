import { CSSProperties } from "react";
import type { ProjectUI } from "@/lib/data";

/**
 * Illustrative, grayscale mini-interfaces drawn in CSS. They hint at what each
 * project does and are always labelled "Illustrative UI" — never screenshots.
 */

const CSS = `
.mui { position: relative; height: 100%; border-radius: 20px; background: #fafaf8; overflow: hidden;
  box-shadow: inset 0 0 0 1px var(--line); display: flex; flex-direction: column; font-size: 11px; color: var(--ink-2); }
.mui-bar { height: 34px; display: flex; align-items: center; gap: 6px; padding: 0 14px; border-bottom: 1px solid var(--line);
  background: #fff; flex: none; }
.mui-bar i { width: 8px; height: 8px; border-radius: 50%; background: var(--soft); }
.mui-bar span { margin-left: 10px; font: 400 10px/1 var(--nf-mono); color: var(--mute); }
.mui-label { position: absolute; right: 12px; bottom: 10px; font: 400 9.5px/1 var(--nf-mono); text-transform: uppercase;
  letter-spacing: .06em; color: var(--faint); background: #fafaf8; padding: 3px 6px; border-radius: 6px; }
.mui-body { flex: 1; padding: 16px; display: flex; flex-direction: column; gap: 10px; min-height: 0; }
.ln { height: 7px; border-radius: 4px; background: var(--soft); }
.ln.dk { background: #cfccc6; }
.mui-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
.mui-tabs span { padding: 5px 9px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--line); font: 400 10px/1 var(--nf-mono); }
.mui-tabs span.on { background: var(--ink); color: #fff; box-shadow: none; }
.mui-row { display: grid; grid-template-columns: 18px 1.4fr 1fr 64px; gap: 10px; align-items: center; padding: 9px 10px;
  background: #fff; border-radius: 10px; box-shadow: inset 0 0 0 1px var(--line); }
.mui-row b { width: 14px; height: 14px; border-radius: 4px; box-shadow: inset 0 0 0 1.5px #bdbab4; }
.mui-pill { height: 18px; border-radius: 999px; background: var(--soft); }
.mui-pill.dk { background: var(--ink); }
.mui-lock { display: inline-flex; align-items: center; gap: 6px; font: 400 10px/1 var(--nf-mono); color: var(--mute); }
.mui-lock::before { content: ""; width: 9px; height: 9px; border-radius: 2px; box-shadow: inset 0 0 0 1.5px var(--mute); }

.mui-comp { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 10px; }
.mui-comp div { aspect-ratio: 1.25; border-radius: 12px; background: #fff; box-shadow: inset 0 0 0 1px var(--line);
  padding: 10px; display: flex; flex-direction: column; gap: 6px; justify-content: flex-end; }
.mui-comp code { font: 400 9.5px/1 var(--nf-mono); color: var(--mute); }
.mui-compare { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 10px; margin-top: auto; }
.mui-compare div { height: 64px; border-radius: 12px; background: #fff; box-shadow: inset 0 0 0 1px var(--line); padding: 10px;
  display: flex; flex-direction: column; gap: 6px; }

.mui-dag { position: relative; flex: 1; }
.mui-dag svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.mui-node { position: absolute; transform: translate(-50%, -50%); padding: 8px 11px; border-radius: 10px; background: #fff;
  box-shadow: inset 0 0 0 1px var(--line), 0 6px 16px -10px rgba(0,0,0,.3); font: 500 10px/1.1 var(--nf-mono); white-space: nowrap; }
.mui-node.dk { background: var(--ink); color: #fff; box-shadow: none; }

.mui-bars { flex: 1; display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; align-items: end; padding-top: 6px; }
.mui-bars i { display: block; border-radius: 6px 6px 3px 3px; background: #d9d6d0; height: var(--h); transform-origin: bottom;
  animation: mui-grow 1.1s var(--ease) both; animation-delay: calc(var(--k) * 70ms); }
.mui-bars i.dk { background: var(--ink); }
@keyframes mui-grow { from { transform: scaleY(0); } }
.mui-legend { display: flex; gap: 14px; font: 400 10px/1 var(--nf-mono); color: var(--mute); }
.mui-legend span::before { content: ""; display: inline-block; width: 8px; height: 8px; border-radius: 2px; margin-right: 6px;
  background: #d9d6d0; }
.mui-legend span.dk::before { background: var(--ink); }

.mui-code { flex: 1; border-radius: 12px; background: #fff; box-shadow: inset 0 0 0 1px var(--line); padding: 12px 0;
  font: 400 11px/1.9 var(--nf-mono); overflow: hidden; }
.mui-code div { padding: 0 14px; white-space: nowrap; }
.mui-code .del { background: #efedea; color: var(--mute); text-decoration: line-through; text-decoration-color: var(--faint); }
.mui-code .add { background: #e4e2de; color: var(--ink); }
.mui-code .add::before { content: "+ "; } .mui-code .del::before { content: "− "; }
.mui-code .ctx::before { content: "  "; white-space: pre; }
`;

function Claims() {
  return (
    <>
      <div className="mui-tabs">
        {["Screen 1", "2", "3", "4", "5", "6"].map((t, i) => (
          <span key={t} className={i === 0 ? "on" : undefined}>
            {t}
          </span>
        ))}
      </div>
      <span className="mui-lock">role-based access</span>
      {[0.9, 0.7, 0.8, 0.6, 0.75].map((w, i) => (
        <div key={i} className="mui-row">
          <b />
          <div className="ln dk" style={{ width: `${w * 100}%` }} />
          <div className="ln" style={{ width: `${(1.2 - w) * 100}%` }} />
          <div className={`mui-pill${i % 2 ? "" : " dk"}`} />
        </div>
      ))}
    </>
  );
}

function Medicare() {
  const rows = [0.85, 0.62, 0.74, 0.55, 0.8];
  return (
    <>
      <div className="mui-tabs">
        {["Claims", "Members", "Providers"].map((t, i) => (
          <span key={t} className={i === 0 ? "on" : undefined}>
            {t}
          </span>
        ))}
      </div>
      <span className="mui-lock">Medicare · Medicaid</span>
      {rows.map((w, i) => (
        <div key={i} className="mui-row">
          <b />
          <div className="ln dk" style={{ width: `${w * 100}%` }} />
          <div className="ln" style={{ width: `${(1.3 - w) * 70}%` }} />
          <div className={`mui-pill${i === 1 || i === 3 ? "" : " dk"}`} />
        </div>
      ))}
    </>
  );
}

function Components() {
  return (
    <>
      <div className="mui-comp">
        {["<header>", "<table>", "<form>", "<card>", "<modal>", "<chart>"].map((c) => (
          <div key={c}>
            <div className="ln dk" style={{ width: "70%" }} />
            <div className="ln" style={{ width: "45%" }} />
            <code>{c}</code>
          </div>
        ))}
      </div>
      <div className="mui-compare">
        <div>
          <code className="mono" style={{ fontSize: 9.5, color: "var(--mute)" }}>legacy JS</code>
          <div className="ln" />
          <div className="ln" style={{ width: "60%" }} />
        </div>
        <span aria-hidden="true">→</span>
        <div>
          <code className="mono" style={{ fontSize: 9.5, color: "var(--ink)" }}>Angular</code>
          <div className="ln dk" />
          <div className="ln dk" style={{ width: "60%" }} />
        </div>
      </div>
    </>
  );
}

function Pipeline() {
  const nodes: { x: number; y: number; t: string; dk?: boolean }[] = [
    { x: 16, y: 26, t: "HL7/FHIR" },
    { x: 16, y: 74, t: "claims data" },
    { x: 48, y: 50, t: "transform", dk: true },
    { x: 80, y: 26, t: "analytics" },
    { x: 80, y: 74, t: "workflow app" },
  ];
  const edges = [
    [0, 2],
    [1, 2],
    [2, 3],
    [2, 4],
  ];
  return (
    <div className="mui-dag">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {edges.map(([a, b]) => (
          <path
            key={`${a}-${b}`}
            d={`M${nodes[a].x} ${nodes[a].y} C ${(nodes[a].x + nodes[b].x) / 2} ${nodes[a].y}, ${(nodes[a].x + nodes[b].x) / 2} ${nodes[b].y}, ${nodes[b].x} ${nodes[b].y}`}
            fill="none"
            stroke="#bdbab4"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      {nodes.map((n) => (
        <span key={n.t} className={`mui-node${n.dk ? " dk" : ""}`} style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          {n.t}
        </span>
      ))}
    </div>
  );
}

function Queries() {
  const before = [0.82, 0.9, 0.76, 0.95, 0.85, 0.88, 0.8];
  return (
    <>
      <div className="mui-legend">
        <span>before</span>
        <span className="dk">after indexing</span>
      </div>
      <div className="mui-bars">
        {before.map((h, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, alignItems: "end", height: "100%" }}>
            <i style={{ "--h": `${h * 100}%`, "--k": i } as CSSProperties} />
            <i className="dk" style={{ "--h": `${h * 75}%`, "--k": i + 1 } as CSSProperties} />
          </div>
        ))}
      </div>
    </>
  );
}

function Migration() {
  return (
    <div className="mui-code">
      <div className="del">import javax.servlet.http.*;</div>
      <div className="add">import jakarta.servlet.http.*;</div>
      <div className="del">import javax.persistence.Entity;</div>
      <div className="add">import jakarta.persistence.Entity;</div>
      <div className="ctx">&nbsp;</div>
      <div className="ctx">@Entity</div>
      <div className="ctx">public class Record {'{'} … {'}'}</div>
    </div>
  );
}

const TITLES: Record<ProjectUI, string> = {
  claims: "claims / screens",
  components: "ui / components",
  pipeline: "foundry / pipeline",
  queries: "postgres / latency",
  migration: "src / migration.diff",
  medicare: "claims / medicare-medicaid",
};

export default function MiniUI({ kind }: { kind: ProjectUI }) {
  return (
    <div className="mui" role="img" aria-label={`Illustrative interface sketch: ${TITLES[kind]}. Not a real screenshot.`}>
      <style href="miniui" precedence="default">
        {CSS}
      </style>
      <div className="mui-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{TITLES[kind]}</span>
      </div>
      <div className="mui-body" aria-hidden="true">
        {kind === "claims" && <Claims />}
        {kind === "components" && <Components />}
        {kind === "pipeline" && <Pipeline />}
        {kind === "queries" && <Queries />}
        {kind === "migration" && <Migration />}
        {kind === "medicare" && <Medicare />}
      </div>
      <span className="mui-label" aria-hidden="true">
        Illustrative UI
      </span>
    </div>
  );
}
