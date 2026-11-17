"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { markLoaded } from "@/lib/loader-store";
import { getLenis } from "@/lib/lenis-store";

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Only play the intro once per browser session
    let seen = false;
    try {
      seen = sessionStorage.getItem("intro-seen") === "1";
      sessionStorage.setItem("intro-seen", "1");
    } catch {}

    if (reduce || seen) {
      setGone(true);
      markLoaded();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    getLenis()?.stop();
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.style.overflow = "";
        getLenis()?.start();
        setGone(true);
      },
    });
    tl.to(counter, {
      v: 100,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        if (bar.current) bar.current.style.transform = `scaleX(${counter.v / 100})`;
      },
    })
      .to("[data-loader-fade]", { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" })
      .add(() => markLoaded())
      .to(root.current, { yPercent: -100, duration: 1.0, ease: "expo.inOut" }, "<0.1");

    return () => {
      tl.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      data-loader
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-6 md:p-10"
    >
      <div data-loader-fade className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted">
        <span>Muzzammil Ahmed</span>
        <span>Portfolio © 2026</span>
      </div>
      <div data-loader-fade className="flex items-end justify-between gap-6">
        <p className="max-w-xs font-mono text-xs uppercase leading-relaxed tracking-[0.2em] text-muted">
          Loading pipelines<br />Validating models<br />Warming up dashboards
        </p>
        <span
          ref={count}
          className="font-display text-[22vw] font-medium leading-[0.8] tracking-tighter text-text tabular-nums md:text-[14vw]"
        >
          000
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-line">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  );
}
