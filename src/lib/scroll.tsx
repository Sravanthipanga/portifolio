"use client";

import Lenis from "lenis";
import { createContext, ReactNode, useCallback, useContext, useEffect, useRef } from "react";
import { prefersReducedMotion } from "./hooks";

type ScrollApi = {
  scrollToTarget: (target: string | number) => void;
  lock: (locked: boolean) => void;
};

const ScrollContext = createContext<ScrollApi>({ scrollToTarget: () => {}, lock: () => {} });

export function useScroll(): ScrollApi {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
    lenisRef.current = lenis;
    let frame = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      frame = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToTarget = useCallback((target: string | number) => {
    const el = typeof target === "string" ? document.getElementById(target.replace(/^#/, "")) : null;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(el ?? (typeof target === "number" ? target : 0), { duration: 1.4 });
    } else if (el) {
      el.scrollIntoView({ behavior: "auto" });
    } else {
      window.scrollTo({ top: typeof target === "number" ? target : 0 });
    }
    if (el) {
      // Move keyboard focus to the section for screen-reader and keyboard users.
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    }
  }, []);

  const lock = useCallback((locked: boolean) => {
    const lenis = lenisRef.current;
    if (lenis) {
      if (locked) lenis.stop();
      else lenis.start();
    }
    document.documentElement.style.overflow = locked ? "hidden" : "";
  }, []);

  return <ScrollContext.Provider value={{ scrollToTarget, lock }}>{children}</ScrollContext.Provider>;
}
