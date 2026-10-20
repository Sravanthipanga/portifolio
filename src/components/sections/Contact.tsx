"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

const CSS = `
.ct { padding-bottom: 40px; }
.ct-h { font-weight: 700; letter-spacing: -0.05em; line-height: .95; font-size: clamp(44px, 9vw, 150px); margin-top: 26px; }
.ct-h .ct-line { display: block; }
.ct-ch { display: inline-block; will-change: transform; }
.ct-ch.hop { animation: ct-hop .6s var(--ease); }
@keyframes ct-hop { 0% { transform: none; } 35% { transform: translateY(-0.16em); } 65% { transform: translateY(0.03em); } 100% { transform: none; } }
.ct-row { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 32px; align-items: end; margin-top: clamp(40px, 8vh, 80px); }
.ct-email { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; }
.ct-email a { font-weight: 600; font-size: clamp(22px, 3.4vw, 48px); letter-spacing: -0.035em; line-height: 1.1;
  text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: .18em; overflow-wrap: anywhere;
  transition: text-decoration-color .4s; text-decoration-color: rgba(13,13,13,.35); }
.ct-email a:hover { text-decoration-color: var(--ink); }
.ct-copy { height: 36px; padding: 0 14px; border-radius: 999px; font: 500 12px/1 var(--nf-mono); box-shadow: inset 0 0 0 1px rgba(13,13,13,.25);
  transition: background .4s var(--ease), color .4s; }
.ct-copy:hover, .ct-copy.ok { background: var(--ink); color: #fff; }
.ct-links { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 26px; }
.ct-badge { width: 150px; height: 150px; position: relative; display: grid; place-items: center; }
.ct-badge svg { position: absolute; inset: 0; animation: ct-spin 22s linear infinite; }
.ct-badge text { font: 500 11.5px var(--nf-mono); letter-spacing: .2em; text-transform: uppercase; fill: var(--ink); }
.ct-badge span { width: 54px; height: 54px; border-radius: 50%; background: var(--ink); color: #fff; display: grid; place-items: center;
  font-size: 20px; transition: transform .6s var(--ease); }
.ct-badge:hover span { transform: rotate(-45deg) scale(1.08); }
@keyframes ct-spin { to { transform: rotate(360deg); } }
.ft { margin-top: clamp(64px, 12vh, 120px); padding-top: 22px; border-top: 1px solid var(--line); display: flex; flex-wrap: wrap;
  justify-content: space-between; gap: 12px; font-size: 13px; color: var(--mute); }
.ft a { color: var(--ink); }
.ft a:hover { text-decoration: underline; text-underline-offset: 3px; }
@media (max-width: 720px) {
  .ct-row { grid-template-columns: minmax(0,1fr); }
  .ct-badge { width: 120px; height: 120px; }
}
`;

function HopLine({ text, base }: { text: string; base: number }) {
  return (
    <span className="ct-line rv-mask" style={{ "--i": base } as CSSProperties}>
      <span aria-hidden="true">
        {text.split("").map((c, i) =>
          c === " " ? (
            " "
          ) : (
            <span key={i} className="ct-ch">
              {c}
            </span>
          ),
        )}
      </span>
    </span>
  );
}

export default function Contact() {
  const { scrollToTarget } = useScroll();
  const [copied, setCopied] = useState(false);
  const headRef = useRef<HTMLHeadingElement>(null);

  // Letters hop as the cursor passes over them.
  useEffect(() => {
    const h = headRef.current;
    if (!h) return;
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (!t.classList.contains("ct-ch") || t.classList.contains("hop")) return;
      t.classList.add("hop");
    };
    const onEnd = (e: Event) => (e.target as HTMLElement).classList.remove("hop");
    h.addEventListener("pointerover", onOver);
    h.addEventListener("animationend", onEnd);
    return () => {
      h.removeEventListener("pointerover", onOver);
      h.removeEventListener("animationend", onEnd);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = PROFILE.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="section ct" aria-labelledby="ct-title">
      <style href="contact" precedence="default">
        {CSS}
      </style>
      <div className="wrap">
        <p className="tag rv">
          <span>08 — Contact</span>
        </p>
        <h2 id="ct-title" ref={headRef} className="ct-h" aria-label="Let's build something together.">
          <HopLine text="Let's build" base={1} />
          <span className="ct-line rv-mask serif" style={{ "--i": 2 } as CSSProperties}>
            <span aria-hidden="true">
              {"something together.".split("").map((c, i) =>
                c === " " ? (
                  " "
                ) : (
                  <span key={i} className="ct-ch">
                    {c}
                  </span>
                ),
              )}
            </span>
          </span>
        </h2>

        <div className="ct-row">
          <div>
            <div className="ct-email rv" style={{ "--i": 1 } as CSSProperties}>
              <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
              <button type="button" className={`ct-copy${copied ? " ok" : ""}`} onClick={copy}>
                {copied ? "Copied ✓" : "Copy"}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied to clipboard" : ""}
              </span>
            </div>
            <div className="ct-links rv" style={{ "--i": 2 } as CSSProperties}>
              <a href={PROFILE.phoneHref} className="btn btn-ghost">
                {PROFILE.phone}
              </a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <a href={`mailto:${PROFILE.email}`} className="ct-badge" aria-hidden="true" tabIndex={-1}>
            <svg viewBox="0 0 150 150" aria-hidden="true">
              <defs>
                <path id="ct-circle" d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
              </defs>
              <text>
                <textPath href="#ct-circle">say hello · say hello · say hello · say hello ·</textPath>
              </text>
            </svg>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <footer className="ft">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("home");
            }}
          >
            Back to top ↑
          </a>
          <span>Built with Next.js</span>
        </footer>
      </div>
    </section>
  );
}
