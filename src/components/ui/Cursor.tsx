"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches || !dot.current || !ring.current) return;

    const html = document.documentElement;
    html.classList.add("has-custom-cursor");
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    let state = "";
    const setState = (next: string, text = "") => {
      if (next === state) return;
      state = next;
      if (label.current) label.current.textContent = text;
      const r = ring.current!;
      if (next === "view") {
        gsap.to(r, { scale: 2.6, backgroundColor: "rgba(46,230,197,1)", borderColor: "rgba(46,230,197,0)", duration: 0.35, ease: "power3.out" });
        gsap.to(label.current, { opacity: 1, scale: 1 / 2.6, duration: 0.25 });
        gsap.to(dot.current, { scale: 0, duration: 0.2 });
      } else if (next === "link") {
        gsap.to(r, { scale: 1.7, backgroundColor: "rgba(46,230,197,0.12)", borderColor: "rgba(46,230,197,0.9)", duration: 0.3, ease: "power3.out" });
        gsap.to(label.current, { opacity: 0, duration: 0.15 });
        gsap.to(dot.current, { scale: 0.5, duration: 0.2 });
      } else {
        gsap.to(r, { scale: 1, backgroundColor: "rgba(46,230,197,0)", borderColor: "rgba(232,236,239,0.35)", duration: 0.3, ease: "power3.out" });
        gsap.to(label.current, { opacity: 0, duration: 0.15 });
        gsap.to(dot.current, { scale: 1, duration: 0.2 });
      }
    };

    const onMove = (e: PointerEvent) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2, overwrite: "auto" });
      const t = e.target as HTMLElement;
      const view = t.closest<HTMLElement>("[data-cursor='view']");
      if (view) return setState("view", view.dataset.cursorLabel ?? "View");
      if (t.closest("a, button, [role='button'], label, select, [data-cursor='link']")) return setState("link");
      setState("");
    };
    const onLeave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    const onDown = () => gsap.to(ring.current, { scale: "-=0.25", duration: 0.15, yoyo: true, repeat: 1 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    return () => {
      html.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={ring}
        className="fixed left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(232,236,239,0.35)] will-change-transform"
      >
        <span ref={label} className="font-mono text-[11px] font-semibold uppercase tracking-widest text-accent-ink opacity-0" />
      </div>
      <div ref={dot} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent will-change-transform" />
    </div>
  );
}
