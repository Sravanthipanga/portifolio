import { CSSProperties } from "react";
import { CERTIFICATIONS } from "@/lib/data";

const CSS = `
.cert { background: var(--card); border-block: 1px solid var(--line); }
.cert-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(32px, 5vw, 80px); align-items: start; }
.cert-side { position: sticky; top: calc(var(--nav-h) + 24px); }
.cert-count { margin-top: 22px; color: var(--mute); }
.cert-list { border-top: 1px solid var(--line); counter-reset: c; }
.cert-row { position: relative; display: grid; grid-template-columns: 56px minmax(0,1fr) 28px; align-items: center; gap: 16px;
  padding: 28px 18px; border-bottom: 1px solid var(--line); isolation: isolate; outline-offset: -2px; }
.cert-row::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--ink); transform: scaleX(0);
  transform-origin: 0 50%; transition: transform .7s var(--ease); }
.cert-row:hover::before, .cert-row:focus-visible::before { transform: scaleX(1); }
.cert-n { font: 500 13px/1 var(--nf-mono); color: var(--mute); transition: color .5s var(--ease); }
.cert-t { font-weight: 600; font-size: clamp(18px, 1.8vw, 26px); letter-spacing: -0.03em; line-height: 1.15;
  transition: color .5s var(--ease); }
.cert-i { display: block; margin-top: 6px; font: 400 12px/1 var(--nf-mono); text-transform: uppercase; color: var(--mute);
  transition: color .5s var(--ease); }
.cert-a { font-size: 20px; opacity: 0; transform: translateX(-12px); transition: opacity .5s var(--ease), transform .6s var(--ease); }
.cert-row:hover *, .cert-row:focus-visible * { color: #fff; }
.cert-row:hover .cert-i, .cert-row:focus-visible .cert-i, .cert-row:hover .cert-n, .cert-row:focus-visible .cert-n { color: rgba(255,255,255,.6); }
.cert-row:hover .cert-a, .cert-row:focus-visible .cert-a { opacity: 1; transform: none; }
@media (max-width: 860px) {
  .cert-grid { grid-template-columns: minmax(0,1fr); }
  .cert-side { position: relative; top: 0; }
  .cert-row { grid-template-columns: 40px minmax(0,1fr) 20px; padding: 22px 8px; }
}
`;

export default function Certifications() {
  const issuers = Array.from(new Set(CERTIFICATIONS.map((c) => c.issuer)));
  return (
    <section id="certifications" className="section cert" aria-labelledby="cert-title">
      <style href="cert" precedence="default">
        {CSS}
      </style>
      <div className="wrap cert-grid">
        <div className="cert-side">
          <p className="tag rv">
            <span>05 — Certifications</span>
          </p>
          <h2 id="cert-title" className="h-section" style={{ marginTop: 22 }}>
            <span className="rv-mask" style={{ "--i": 1 } as CSSProperties}>
              <span>
                Always <span className="serif">learning.</span>
              </span>
            </span>
          </h2>
          <p className="cert-count rv" style={{ "--i": 2 } as CSSProperties}>
            <span className="mono">{String(CERTIFICATIONS.length).padStart(2, "0")}</span> certifications from{" "}
            {issuers.join(" and ")}.
          </p>
        </div>
        <ol className="cert-list">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.title} className="cert-row rv" tabIndex={0} style={{ "--i": i } as CSSProperties}>
              <span className="cert-n">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="cert-t">{c.title}</span>
                <span className="cert-i">{c.issuer}</span>
              </span>
              <span className="cert-a" aria-hidden="true">
                ↗
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
