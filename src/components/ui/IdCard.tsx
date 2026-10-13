"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";
import { CERTIFICATIONS, EDUCATION, EXPERIENCE, PROFILE, PROJECTS } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/hooks";

const CSS = `
.lanyard { position: absolute; left: 50%; top: calc(-1 * var(--section-y)); width: 300px; margin-left: -150px;
  transform-origin: 50% 0; will-change: transform; z-index: 2; }
.lanyard-strap { position: relative; margin: 0 auto; width: 30px; height: calc(var(--section-y) + 56px);
  background: #161616; overflow: hidden; border-radius: 0 0 3px 3px;
  box-shadow: inset 2px 0 0 rgba(255,255,255,.06), inset -2px 0 0 rgba(0,0,0,.4); }
.lanyard-strap-text { position: absolute; left: 0; top: 0; width: 30px; display: flex; flex-direction: column;
  align-items: center; animation: strap-run 18s linear infinite; }
.lanyard-strap-text span { writing-mode: vertical-rl; transform: rotate(180deg); white-space: nowrap;
  font: 600 10px/30px var(--nf-mono); letter-spacing: .2em; color: rgba(255,255,255,.72); text-transform: uppercase;
  padding-block: 12px; }
@keyframes strap-run { from { transform: translateY(0); } to { transform: translateY(-50%); } }
.lanyard-clip { position: relative; margin: -2px auto 0; width: 44px; height: 34px; }
.lanyard-clip::before { content: ""; position: absolute; left: 4px; right: 4px; top: 0; height: 16px; border-radius: 4px;
  background: linear-gradient(180deg, #e4e4e4, #9a9a9a 55%, #cfcfcf); box-shadow: 0 1px 2px rgba(0,0,0,.35); }
.lanyard-clip::after { content: ""; position: absolute; left: 50%; top: 14px; width: 16px; height: 22px; margin-left: -8px;
  border: 3px solid #a8a8a8; border-top: 0; border-radius: 0 0 10px 10px; }

.idcard { position: relative; width: 300px; height: 412px; perspective: 1400px; margin-top: -8px; cursor: pointer;
  border-radius: 22px; }
.idcard-inner { position: absolute; inset: 0; transform-style: preserve-3d; transition: transform 1s var(--ease); }
.idcard.is-flipped .idcard-inner { transform: rotateY(180deg); }
.idcard-face { position: absolute; inset: 0; border-radius: 22px; background: #fff; overflow: hidden;
  -webkit-backface-visibility: hidden; backface-visibility: hidden;
  box-shadow: inset 0 0 0 1px var(--line), 0 40px 80px -36px rgba(13,13,13,.45), 0 8px 18px -10px rgba(13,13,13,.2); }
.idcard-face::before { content: ""; position: absolute; left: 50%; top: 12px; width: 46px; height: 8px; margin-left: -23px;
  border-radius: 99px; background: var(--paper); box-shadow: inset 0 1px 2px rgba(0,0,0,.25); z-index: 2; }
.idcard-back { transform: rotateY(180deg); padding: 44px 26px 22px; display: flex; flex-direction: column; }

.idcard-band { height: 88px; background: var(--ink); color: #fff; display: flex; align-items: flex-start;
  justify-content: space-between; padding: 30px 20px 0; font: 600 11px/1 var(--nf-mono); letter-spacing: .18em; }
.idcard-band b { font-weight: 600; opacity: .55; letter-spacing: .04em; }
.idcard-photo { position: relative; width: 128px; height: 156px; margin: -40px auto 0; border-radius: 18px; padding: 3px;
  background: linear-gradient(145deg, #f2f2f2, #8c8c8c 45%, #dcdcdc 70%, #6f6f6f);
  box-shadow: 0 0 0 7px #fff, 0 0 0 8px var(--line), 0 26px 40px -18px rgba(13,13,13,.5); }
.idcard-photo::after { content: ""; position: absolute; inset: -22px; border-radius: 34px; z-index: -1;
  background: radial-gradient(closest-side, rgba(13,13,13,.10), transparent); }
.idcard-photo-in { width: 100%; height: 100%; border-radius: 15px; overflow: hidden; background: #fff; }
.idcard-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform .9s var(--ease); }

.idcard-name { margin-top: 16px; text-align: center; font-weight: 700; font-size: 21px; letter-spacing: -0.03em; line-height: 1.1; }
.idcard-role { margin-top: 4px; text-align: center; font: 500 11px/1.2 var(--nf-mono); letter-spacing: .08em;
  text-transform: uppercase; color: var(--mute); }
.idcard-rows { margin: 14px 22px 0; display: grid; gap: 5px; font-size: 12px; }
.idcard-rows div { display: flex; justify-content: space-between; gap: 10px; border-top: 1px dashed var(--line); padding-top: 5px; }
.idcard-rows dt { font-family: var(--nf-mono); color: var(--mute); text-transform: uppercase; font-size: 10px; letter-spacing: .06em; }
.idcard-rows dd { font-weight: 600; color: var(--ink); text-align: right; }
.idcard-foot { position: absolute; left: 22px; right: 22px; bottom: 16px; display: flex; align-items: flex-end;
  justify-content: space-between; }
.idcard-barcode { height: 30px; width: 150px; display: flex; gap: 1.5px; align-items: stretch; }
.idcard-barcode i { background: var(--ink); }
.idcard-holo { width: 40px; height: 40px; border-radius: 50%; position: relative; overflow: hidden;
  background: conic-gradient(from 0deg, #f5f5f5, #b9b9b9, #ececec, #8d8d8d, #f5f5f5, #c4c4c4, #f5f5f5);
  box-shadow: inset 0 0 0 1px rgba(0,0,0,.12); }
.idcard-holo::after { content: ""; position: absolute; inset: 0;
  background: linear-gradient(115deg, transparent 30%, rgba(255,255,255,.95) 48%, transparent 62%);
  transform: translateX(-120%); animation: holo 3.6s var(--ease) infinite; }
@keyframes holo { 55%, 100% { transform: translateX(120%); } }

.idcard-back h3 { font: 600 11px/1 var(--nf-mono); letter-spacing: .18em; text-transform: uppercase; color: var(--mute); }
.idcard-back ul { margin-top: 16px; display: grid; gap: 11px; }
.idcard-back li { display: grid; grid-template-columns: 18px 1fr; gap: 6px; font-size: 13.5px; line-height: 1.4; color: var(--ink-2); }
.idcard-back li::before { content: "→"; color: var(--faint); }
.idcard-sign { margin-top: auto; font-family: var(--nf-serif); font-style: italic; font-size: 30px; line-height: 1;
  border-bottom: 1px solid var(--line); padding-bottom: 6px; }
.idcard-found { margin-top: 10px; font: 400 10.5px/1.5 var(--nf-mono); color: var(--mute); word-break: break-all; }
.idcard-hint { display: block; margin: 14px auto 0; padding: 8px 12px; border-radius: 999px; font: 400 11px/1 var(--nf-mono);
  color: var(--mute); transition: background .4s var(--ease), color .4s; }
.idcard-hint:hover { background: var(--ink); color: #fff; }
.idcard:hover .idcard-photo img { transform: scale(1.07); }

@media (max-width: 960px) {
  .lanyard { position: relative; left: auto; top: auto; margin: 0 auto; }
  .lanyard-strap { height: 96px; }
}
@media (max-width: 360px) {
  .lanyard { transform: scale(.92); }
}
`;

/** Deterministic barcode from the name. */
function bars(seed: string) {
  const out: number[] = [];
  for (let i = 0; i < 44; i++) {
    const c = seed.charCodeAt(i % seed.length);
    out.push(((c * (i + 7)) % 3) + 1);
  }
  return out;
}

export default function IdCard() {
  const rigRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const lastPointer = useRef<string>("mouse");

  // Damped pendulum: pointer velocity -> angular impulse, spring back, idle sway.
  useEffect(() => {
    const rig = rigRef.current;
    if (!rig || prefersReducedMotion()) return;
    const section = rig.closest("section") ?? document.body;
    let theta = 0;
    let omega = 0;
    let lastX: number | null = null;
    let lastMove = 0;
    let running = false;
    let frame = 0;
    let prev = performance.now();

    const step = (t: number) => {
      const dt = Math.min(0.033, (t - prev) / 1000);
      prev = t;
      const idle = t - lastMove > 1200;
      const target = idle ? Math.sin(t / 1400) * 1.6 : 0;
      const alpha = -38 * (theta - target) - 4.2 * omega;
      omega += alpha * dt;
      theta = Math.max(-22, Math.min(22, theta + omega * dt));
      rig.style.transform = `rotate(${theta.toFixed(3)}deg)`;
      if (running) frame = requestAnimationFrame(step);
    };

    const onMove = (e: globalThis.PointerEvent) => {
      if (lastX !== null) {
        const dx = e.clientX - lastX;
        omega += Math.max(-60, Math.min(60, dx * 0.9));
      }
      lastX = e.clientX;
      lastMove = performance.now();
    };
    const onLeave = () => {
      lastX = null;
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        prev = performance.now();
        frame = requestAnimationFrame(step);
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    io.observe(section);
    section.addEventListener("pointermove", onMove as EventListener);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      section.removeEventListener("pointermove", onMove as EventListener);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const onEnter = (e: PointerEvent) => {
    lastPointer.current = e.pointerType;
    if (e.pointerType === "mouse") setFlipped(true);
  };
  const onLeave = (e: PointerEvent) => {
    if (e.pointerType === "mouse") setFlipped(false);
  };
  const onDown = (e: PointerEvent) => {
    lastPointer.current = e.pointerType;
  };
  const onClick = () => {
    if (lastPointer.current !== "mouse") setFlipped((f) => !f);
  };

  const strap = `${PROFILE.name} · ${PROFILE.role} · `;
  const ms = EDUCATION[0];
  const current = EXPERIENCE[0];

  return (
    <div className="lanyard" ref={rigRef}>
      <style href="idcard" precedence="default">
        {CSS}
      </style>
      <div className="lanyard-strap" aria-hidden="true">
        <div className="lanyard-strap-text">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i}>{strap}</span>
          ))}
        </div>
      </div>
      <div className="lanyard-clip" aria-hidden="true" />

      <div
        className={`idcard${flipped ? " is-flipped" : ""}`}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onPointerDown={onDown}
        onClick={onClick}
      >
        <div className="idcard-inner">
          <div className="idcard-face" aria-hidden={flipped}>
            <div className="idcard-band">
              <span>DEVELOPER ID</span>
              <b>{PROFILE.initials}</b>
            </div>
            <div className="idcard-photo">
              <div className="idcard-photo-in">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/portrait-bust.webp" alt={`Portrait of ${PROFILE.name}`} width={480} height={600} />
              </div>
            </div>
            <p className="idcard-name">{PROFILE.name}</p>
            <p className="idcard-role">{PROFILE.role}</p>
            <dl className="idcard-rows">
              <div>
                <dt>ID No.</dt>
                <dd>SP-2019</dd>
              </div>
              <div>
                <dt>Dept.</dt>
                <dd>Full-stack &amp; back-end</dd>
              </div>
              <div>
                <dt>Valid till</dt>
                <dd>{ms.date}</dd>
              </div>
            </dl>
            <div className="idcard-foot" aria-hidden="true">
              <div className="idcard-barcode">
                {bars(PROFILE.name).map((w, i) => (
                  <i key={i} style={{ width: w, opacity: i % 5 === 0 ? 0 : 1 }} />
                ))}
              </div>
              <div className="idcard-holo" />
            </div>
          </div>

          <div className="idcard-face idcard-back" aria-hidden={!flipped}>
            <h3>What I am</h3>
            <ul>
              <li>
                {PROFILE.role} · 6+ years · now at {current.company}
              </li>
              <li>
                {ms.degree}, {ms.school} · {ms.score}
              </li>
              <li>{PROJECTS.slice(0, 3).map((p) => p.title).join(" · ")}</li>
              <li>{CERTIFICATIONS.length} certifications · Microsoft &amp; AWS</li>
              <li>Recognized for technical leadership and mentoring</li>
            </ul>
            <p className="idcard-sign">{PROFILE.name}</p>
            <p className="idcard-found">If found, say hello · {PROFILE.email}</p>
          </div>
        </div>
      </div>
      <button type="button" className="idcard-hint" aria-pressed={flipped} onClick={() => setFlipped((f) => !f)}>
        {flipped ? "Flip to front ↺" : "Flip card ↻"}
      </button>
    </div>
  );
}
