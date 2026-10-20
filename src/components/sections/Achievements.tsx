"use client";

import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";
import CountUp from "../ui/CountUp";
import TechLogo, { BRAND } from "../ui/TechLogo";

const CSS = `
.ach { position: relative; }
.ach-pin { position: sticky; top: 0; height: 100svh; overflow: hidden; display: flex; flex-direction: column;
  justify-content: center; padding-top: var(--nav-h); }
.ach-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
.ach-prog { width: min(240px, 40vw); height: 2px; background: var(--line); border-radius: 2px; overflow: hidden; }
.ach-prog i { display: block; height: 100%; background: var(--ink); transform-origin: 0 50%; transform: scaleX(0); }
.ach-track { display: flex; gap: 20px; margin-top: clamp(28px, 6vh, 56px); padding-inline: var(--gutter);
  padding-block: 20px 40px; will-change: transform; width: max-content;
  padding-left: max(var(--gutter), calc((100vw - var(--max)) / 2)); }
.ach-card { position: relative; flex: none; width: clamp(300px, 40vw, 540px); height: clamp(260px, 36vh, 310px);
  border-radius: 28px; background: var(--card); box-shadow: inset 0 0 0 1px var(--line); padding: 24px 26px;
  display: grid; grid-template-rows: auto 1fr; transition: transform .7s var(--ease), box-shadow .7s var(--ease); }
.ach-card.is-active { transform: translateY(-12px);
  box-shadow: inset 0 0 0 1px var(--line), 0 40px 80px -36px rgba(13,13,13,.4); }
.ach-top { display: flex; justify-content: space-between; align-items: flex-start; }
.ach-logo { position: relative; width: 72px; height: 72px; border-radius: 20px; background: #fff; display: grid; place-items: center;
  box-shadow: inset 0 0 0 1px var(--line); color: var(--ink); }
.ach-logo::before { content: ""; position: absolute; inset: -14px; border-radius: 50%; background: var(--tint, transparent);
  opacity: .10; filter: blur(18px); z-index: -1; transition: opacity .7s var(--ease); }
.ach-card.is-active .ach-logo::before { opacity: .26; }
.ach-idx { font: 500 12px/1 var(--nf-mono); color: var(--mute); }
.ach-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; min-width: 0; }
.ach-txt { min-width: 0; max-width: 58%; }
.ach-label { font: 400 11px/1 var(--nf-mono); text-transform: uppercase; letter-spacing: .06em; color: var(--mute); }
.ach-cap { margin-top: 10px; font-weight: 600; font-size: clamp(16px, 1.4vw, 20px); letter-spacing: -0.02em; line-height: 1.2; }
.ach-detail { margin-top: 8px; font-size: 13px; color: var(--mute); line-height: 1.4; }
.ach-num { font-weight: 700; font-size: clamp(64px, 7vw, 112px); letter-spacing: -0.06em; line-height: .82; white-space: nowrap; }
.ach-end { flex: none; align-self: center; padding: 0 clamp(24px, 6vw, 96px) 0 24px; font-family: var(--nf-serif); font-style: italic;
  font-size: clamp(30px, 3.4vw, 48px); color: var(--mute); white-space: nowrap; }
@media (max-width: 720px) {
  .ach-card { width: 82vw; height: 290px; padding: 20px; }
  .ach-num { font-size: 68px; }
  .ach-txt { max-width: 60%; }
}
`;

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const travel = useRef(0);
  const [height, setHeight] = useState<string>("auto");

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      travel.current = Math.max(0, track.scrollWidth - window.innerWidth);
      setHeight(`calc(100svh + ${travel.current}px)`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const onProgress = useCallback((p: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translate3d(${(-p * travel.current).toFixed(1)}px,0,0)`;
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    const mid = window.innerWidth / 2;
    let best: Element | null = null;
    let bestD = Infinity;
    track.querySelectorAll(".ach-card").forEach((c) => {
      const r = c.getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestD) {
        bestD = d;
        best = c;
      }
    });
    track.querySelectorAll(".ach-card").forEach((c) => c.classList.toggle("is-active", c === best));
  }, []);

  useScrollProgress(sectionRef, onProgress, "pin");

  const total = String(ACHIEVEMENTS.length).padStart(2, "0");

  return (
    <section id="achievements" ref={sectionRef} className="ach" style={{ height }} aria-labelledby="ach-title">
      <style href="ach" precedence="default">
        {CSS}
      </style>
      <div className="ach-pin">
        <div className="wrap ach-head">
          <div>
            <p className="tag">
              <span>07 — Achievements</span>
            </p>
            <h2 id="ach-title" className="h-section" style={{ marginTop: 22 }}>
              Results, <span className="serif">measured.</span>
            </h2>
          </div>
          <div className="ach-prog" aria-hidden="true">
            <i ref={barRef} />
          </div>
        </div>
        <div ref={trackRef} className="ach-track">
          {ACHIEVEMENTS.map((a, i) => (
            <article key={a.caption} className="ach-card" aria-label={`${a.value}${a.suffix} ${a.label}: ${a.caption}`}>
              <div className="ach-top">
                <div className="ach-logo" style={{ "--tint": BRAND[a.icon]?.tint } as CSSProperties}>
                  <TechLogo icon={a.icon} size={38} />
                </div>
                <span className="ach-idx">
                  {String(i + 1).padStart(2, "0")} / {total}
                </span>
              </div>
              <div className="ach-bottom">
                <div className="ach-txt">
                  <p className="ach-label">{a.label}</p>
                  <h3 className="ach-cap">{a.caption}</h3>
                  <p className="ach-detail">{a.detail}</p>
                </div>
                <CountUp value={a.value} suffix={a.suffix} className="ach-num" />
              </div>
            </article>
          ))}
          <p className="ach-end">and counting →</p>
        </div>
      </div>
    </section>
  );
}
