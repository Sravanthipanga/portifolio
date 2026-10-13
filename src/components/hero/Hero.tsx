"use client";

import { CSSProperties, MouseEvent, useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

const CSS = `
.hero { position: relative; min-height: 100svh; overflow: hidden; padding-top: var(--nav-h);
  display: flex; flex-direction: column; }
.hero-stage { position: relative; flex: 1; display: grid; grid-template-columns: minmax(0,1fr) auto minmax(0,1fr);
  align-items: end; gap: 24px; }
.hero-ghost { position: absolute; left: 50%; top: 46%; transform: translate(-50%, -50%); z-index: 0;
  font-weight: 800; letter-spacing: -0.06em; line-height: .8; white-space: nowrap; user-select: none;
  font-size: min(16vw, 280px); color: transparent; -webkit-text-stroke: 1.2px rgba(13,13,13,.16);
  animation: hero-ghost 1.6s var(--ease) both; }
@keyframes hero-ghost { from { transform: translate(-50%, -46%) scale(.96); } }

.hero-video-col { position: relative; grid-column: 2; align-self: end; margin-bottom: -2px; }
.hero-video-wrap { height: min(96svh - var(--nav-h), 1040px); aspect-ratio: 768 / 960;
  mix-blend-mode: multiply; animation: hero-rise 1.4s var(--ease) both .1s;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent),
    linear-gradient(180deg, transparent, #000 6%, #000 94%, transparent);
  -webkit-mask-composite: source-in; mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent),
    linear-gradient(180deg, transparent, #000 6%, #000 94%, transparent);
  mask-composite: intersect; }
@keyframes hero-rise { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
.hero-video { width: 100%; height: 100%; object-fit: cover; background: #fff; }

.hero-copy { position: relative; z-index: 2; grid-column: 1; align-self: end; padding-bottom: clamp(32px, 9vh, 96px); }
.hero-kicker { display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
  font: 400 12px/1.4 var(--nf-mono); text-transform: uppercase; letter-spacing: .04em; color: var(--mute); }
.hero-kicker::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--ink);
  box-shadow: 0 0 0 4px rgba(13,13,13,.08); }
.hero-title { font-weight: 700; letter-spacing: -0.05em; line-height: .95; font-size: clamp(44px, 5.6vw, 96px); }
.hero-sub { margin-top: 18px; max-width: 30ch; color: var(--ink-2); font-size: clamp(15px, 1.15vw, 18px); }

.hero-side { position: relative; z-index: 2; grid-column: 3; align-self: end; justify-self: end;
  padding-bottom: clamp(32px, 9vh, 96px); display: grid; gap: 10px; justify-items: end; }
.hero-ctas { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
.hero-meta { margin-top: 14px; font: 400 12px/1.6 var(--nf-mono); color: var(--mute); text-align: right; }

.hero-sound { position: absolute; z-index: 3; right: 6%; bottom: 22%; width: 46px; height: 46px; border-radius: 50%;
  background: var(--ink); color: #fff; display: grid; place-items: center;
  transition: transform .4s var(--ease); }
.hero-sound:hover { transform: scale(1.08); }
.hero-sound svg { width: 16px; height: 16px; }
.hero-sound.is-blocked::after { content: ""; position: absolute; inset: -6px; border-radius: 50%;
  border: 1.5px solid var(--ink); animation: hero-ping 1.8s var(--ease) infinite; }
@keyframes hero-ping { 0% { transform: scale(.85); opacity: .7; } 100% { transform: scale(1.5); opacity: 0; } }

.hero-reveal { animation: hero-up 1.2s var(--ease) both; animation-delay: calc(.1s + var(--i, 0) * 70ms); }
@keyframes hero-up { from { transform: translateY(24px); } }

@media (max-width: 1080px) {
  .hero-stage { grid-template-columns: minmax(0,1fr) auto; }
  .hero-copy { grid-column: 1; }
  .hero-video-col { grid-column: 2; grid-row: 1 / span 2; }
  .hero-video-wrap { height: min(80svh, 820px); }
  .hero-side { grid-column: 1; grid-row: 2; justify-self: start; justify-items: start; padding-bottom: 48px; }
  .hero-ctas { justify-content: flex-start; }
  .hero-meta { text-align: left; }
  .hero-copy { padding-bottom: 8px; }
}
@media (max-width: 720px) {
  .hero { min-height: auto; }
  .hero-stage { display: flex; flex-direction: column; align-items: stretch; gap: 0; }
  .hero-ghost { top: 30svh; font-size: 16.5vw; }
  .hero-video-col { order: 0; align-self: center; margin-bottom: 0; }
  .hero-video-wrap { height: min(62svh, calc((100vw - 2 * var(--gutter)) * 1.25)); }
  .hero-copy { order: 1; padding: 20px 0 0; }
  .hero-side { order: 2; padding: 20px 0 56px; }
  .hero-sound { bottom: 14px; right: 4px; }
}
`;

function Icon({ on }: { on: boolean }) {
  return on ? (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <rect x="3" y="2.5" width="3.4" height="11" rx="1" />
      <rect x="9.6" y="2.5" width="3.4" height="11" rx="1" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4.5 2.6v10.8a.8.8 0 0 0 1.2.7l8.6-5.4a.8.8 0 0 0 0-1.4L5.7 1.9a.8.8 0 0 0-1.2.7z" />
    </svg>
  );
}

export default function Hero() {
  const { scrollToTarget } = useScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const soundBtnRef = useRef<HTMLButtonElement>(null);
  const [soundOn, setSoundOn] = useState(false);
  const [blocked, setBlocked] = useState(false);
  // The visitor's explicit choice wins over the auto-unlock.
  const userMuted = useRef(false);
  const visible = useRef(true);

  // Try to start with sound; fall back to muted autoplay.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play()
      .then(() => setSoundOn(true))
      .catch(() => {
        v.muted = true;
        setBlocked(true);
        setSoundOn(false);
        v.play().catch(() => {});
      });
  }, []);

  // Unlock sound on the first interaction anywhere (except the sound button itself).
  useEffect(() => {
    if (!blocked) return;
    const unlock = (e: Event) => {
      if (soundBtnRef.current?.contains(e.target as Node)) return;
      const v = videoRef.current;
      setBlocked(false);
      if (!v || userMuted.current) return;
      v.muted = false;
      setSoundOn(true);
      if (visible.current) v.play().catch(() => {});
    };
    const opts = { once: true, capture: true } as const;
    window.addEventListener("pointerdown", unlock, opts);
    window.addEventListener("keydown", unlock, opts);
    window.addEventListener("touchend", unlock, opts);
    return () => {
      window.removeEventListener("pointerdown", unlock, opts);
      window.removeEventListener("keydown", unlock, opts);
      window.removeEventListener("touchend", unlock, opts);
    };
  }, [blocked]);

  // Pause (and silence) when less than 35 % of the hero is visible.
  useEffect(() => {
    const el = sectionRef.current;
    const v = videoRef.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.intersectionRatio >= 0.35;
        if (visible.current) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: [0, 0.35, 0.6, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = v.muted; // muted -> turn sound on
    v.muted = !next;
    userMuted.current = !next;
    setSoundOn(next);
    setBlocked(false);
    if (next && visible.current) v.play().catch(() => {});
  };

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToTarget(id);
  };

  return (
    <section id="home" ref={sectionRef} className="hero" aria-labelledby="hero-title">
      <style href="hero" precedence="default">
        {CSS}
      </style>
      <div className="wrap hero-stage">
        <p className="hero-ghost" aria-hidden="true">
          {PROFILE.firstName.toUpperCase()}
        </p>

        <div className="hero-copy">
          <p className="hero-kicker hero-reveal" style={{ "--i": 0 } as CSSProperties}>
            {PROFILE.name} · {PROFILE.location}
          </p>
          <h1 id="hero-title" className="hero-title hero-reveal" style={{ "--i": 1 } as CSSProperties}>
            {PROFILE.role}
            <span className="serif">.</span>
          </h1>
          <p className="hero-sub hero-reveal" style={{ "--i": 2 } as CSSProperties}>
            {PROFILE.tagline}
          </p>
        </div>

        <div className="hero-video-col">
          <div className="hero-video-wrap">
          <video
            ref={videoRef}
            className="hero-video"
            muted
            loop
            playsInline
            preload="auto"
            aria-label={`Video introduction by ${PROFILE.name}`}
          >
            <source src="/hero/hero.webm" type="video/webm" />
            <source src="/hero/hero.mp4" type="video/mp4" />
          </video>
          </div>
          <button
            ref={soundBtnRef}
            type="button"
            className={`hero-sound${blocked ? " is-blocked" : ""}`}
            onClick={toggleSound}
            aria-pressed={soundOn}
            aria-label={soundOn ? "Mute introduction" : "Play introduction with sound"}
          >
            <Icon on={soundOn} />
          </button>
        </div>

        <div className="hero-side">
          <div className="hero-ctas hero-reveal" style={{ "--i": 3 } as CSSProperties}>
            <a href="#work" className="btn btn-primary" onClick={(e) => go(e, "work")}>
              Explore work
            </a>
            <a href="#contact" className="btn btn-ghost" onClick={(e) => go(e, "contact")}>
              Let&apos;s talk
            </a>
            <a href={PROFILE.resume} download className="btn btn-ghost">
              Résumé <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="hero-meta hero-reveal" style={{ "--i": 4 } as CSSProperties}>
            6+ years · Java · Spring Boot · React · AWS
          </p>
        </div>
      </div>
    </section>
  );
}
