"use client";

import { CSSProperties, MouseEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { useScroll } from "@/lib/scroll";

const CSS = `
.nav { position: fixed; inset: 0 0 auto 0; z-index: 60; pointer-events: none; }
.nav-progress { position: absolute; left: 0; top: 0; height: 2px; width: 100%; background: var(--ink);
  transform-origin: 0 50%; transform: scaleX(0); }
.nav-row { display: flex; align-items: center; justify-content: space-between; gap: 16px;
  height: var(--nav-h); }
.nav-brand { display: flex; align-items: center; gap: 12px; pointer-events: auto; min-width: 0; }
.nav-mark { width: 42px; height: 42px; border-radius: 50%; flex: none; display: grid; place-items: center;
  font: 700 14px/1 var(--nf-sans); letter-spacing: -0.02em; box-shadow: inset 0 0 0 1.5px var(--ink);
  background: transparent; color: var(--ink);
  transition: background .5s var(--ease), color .5s var(--ease), transform .9s var(--ease); }
.nav-brand:hover .nav-mark { transform: rotate(360deg); }
.nav.is-scrolled .nav-mark { background: var(--ink); color: #fff; }
.nav-name { font-weight: 600; letter-spacing: -0.02em; white-space: nowrap;
  transition: opacity .5s var(--ease), transform .5s var(--ease); }
.nav.is-scrolled .nav-name { opacity: 0; transform: translateX(-8px); pointer-events: none; }

.nav-pill { position: relative; display: flex; align-items: center; gap: 2px; padding: 5px; border-radius: 999px;
  pointer-events: auto; transition: background .5s var(--ease), box-shadow .5s var(--ease); }
.nav.is-scrolled .nav-pill, .nav.is-scrolled .nav-menu-btn { background: rgba(255,255,255,.72);
  -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
  box-shadow: inset 0 0 0 1px var(--line), 0 10px 30px -16px rgba(13,13,13,.25); }
.nav-ind { position: absolute; top: 5px; left: 0; height: calc(100% - 10px); border-radius: 999px; background: var(--ink);
  transition: transform .6s var(--ease), width .6s var(--ease), opacity .3s; opacity: 0; }
.nav-link { position: relative; z-index: 1; padding: 9px 15px; border-radius: 999px; font-size: 14px; font-weight: 500;
  color: var(--ink-2); transition: color .4s var(--ease); }
.nav-link:hover { color: var(--ink); }
.nav-link[aria-current="true"] { color: #fff; }

.nav-menu-btn { display: none; pointer-events: auto; height: 42px; padding: 0 18px; border-radius: 999px;
  font-size: 14px; font-weight: 600; box-shadow: inset 0 0 0 1px rgba(13,13,13,.2); align-items: center; gap: 8px; }
.nav-menu-btn i { display: block; width: 14px; height: 1.5px; background: currentColor; position: relative; }
.nav-menu-btn i::after { content: ""; position: absolute; left: 0; top: 4px; width: 9px; height: 1.5px; background: currentColor; }

.nav-overlay { position: fixed; inset: 0; z-index: 70; background: var(--paper); pointer-events: none;
  clip-path: circle(0% at calc(100% - 52px) 38px); transition: clip-path .8s var(--ease);
  display: flex; flex-direction: column; padding: 0 var(--gutter) 40px; }
.nav-overlay.is-open { clip-path: circle(150% at calc(100% - 52px) 38px); pointer-events: auto; }
.nav-overlay-top { height: var(--nav-h); display: flex; align-items: center; justify-content: space-between; }
.nav-overlay ol { margin-top: 4vh; display: grid; gap: 4px; }
.nav-overlay li { overflow: hidden; }
.nav-overlay ol a { display: flex; align-items: baseline; gap: 16px; font-weight: 700; letter-spacing: -0.045em;
  font-size: clamp(40px, 11vw, 64px); line-height: 1.1; transform: translateY(105%);
  transition: transform .8s var(--ease); transition-delay: calc(.12s + var(--i) * 60ms); }
.nav-overlay.is-open ol a { transform: none; }
.nav-overlay ol a small { font: 400 12px/1 var(--nf-mono); letter-spacing: 0; color: var(--mute); }
.nav-overlay-foot { margin-top: auto; display: grid; gap: 6px; color: var(--mute); font-size: 14px; }

@media (max-width: 880px) {
  .nav-pill { display: none; }
  .nav-menu-btn { display: inline-flex; }
}
`;

export default function Navigation() {
  const { scrollToTarget, lock } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const indRef = useRef<HTMLSpanElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Scroll state + progress bar (no React re-render per frame).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      setScrolled(y > 40);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Active section.
  useEffect(() => {
    const ids = ["home", ...NAV.map((n) => n.id), "certifications"];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          // Certifications has no nav entry; it sits between Work and Experience.
          setActive(id === "home" ? "" : id === "certifications" ? "work" : id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Slide the indicator under the active link.
  const placeIndicator = useCallback(() => {
    const ind = indRef.current;
    const pill = pillRef.current;
    if (!ind || !pill) return;
    const link = pill.querySelector<HTMLAnchorElement>(`a[data-id="${active}"]`);
    if (!link) {
      ind.style.opacity = "0";
      return;
    }
    ind.style.opacity = "1";
    ind.style.width = `${link.offsetWidth}px`;
    ind.style.transform = `translateX(${link.offsetLeft}px)`;
  }, [active]);

  useLayoutEffect(() => {
    placeIndicator();
    window.addEventListener("resize", placeIndicator);
    document.fonts?.ready.then(placeIndicator);
    return () => window.removeEventListener("resize", placeIndicator);
  }, [placeIndicator]);

  // Mobile overlay: lock scroll, Esc to close, focus management.
  useEffect(() => {
    lock(open);
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lock]);

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (open) {
      setOpen(false);
      lock(false);
    }
    scrollToTarget(id);
  };

  return (
    <>
      <style href="nav" precedence="default">
        {CSS}
      </style>
      <header ref={navRef} className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <div ref={barRef} className="nav-progress" aria-hidden="true" />
        <div className="wrap nav-row">
          <a href="#home" className="nav-brand" onClick={(e) => go(e, "home")} title="Back to top">
            <span className="nav-mark" aria-hidden="true">
              {PROFILE.initials}
            </span>
            <span className="nav-name">{PROFILE.name}</span>
          </a>

          <nav aria-label="Primary">
            <div ref={pillRef} className="nav-pill">
              <span ref={indRef} className="nav-ind" aria-hidden="true" />
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  data-id={n.id}
                  className="nav-link"
                  aria-current={active === n.id ? "true" : undefined}
                  onClick={(e) => go(e, n.id)}
                >
                  {n.label}
                </a>
              ))}
            </div>
          </nav>

          <button
            ref={menuBtnRef}
            type="button"
            className="nav-menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <i aria-hidden="true" /> Menu
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`nav-overlay${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="nav-overlay-top">
          <span className="nav-mark" aria-hidden="true" style={{ background: "var(--ink)", color: "#fff" }}>
            {PROFILE.initials}
          </span>
          <button
            type="button"
            className="nav-menu-btn"
            style={{ display: "inline-flex" }}
            onClick={() => {
              setOpen(false);
              menuBtnRef.current?.focus();
            }}
          >
            Close
          </button>
        </div>
        <ol>
          {NAV.map((n, i) => (
            <li key={n.id}>
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={`#${n.id}`}
                style={{ "--i": i } as CSSProperties}
                onClick={(e) => go(e, n.id)}
              >
                <small>{String(i + 1).padStart(2, "0")}</small>
                {n.label}
              </a>
            </li>
          ))}
        </ol>
        <div className="nav-overlay-foot">
          <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          <span>{PROFILE.location}</span>
        </div>
      </div>
    </>
  );
}
