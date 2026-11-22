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
    gsap.set(label.current, { xPercent: -50, yPercent: -50, opacity: 0 });
    const lx = gsap.quickTo(label.current, "x", { duration: 0.45, ease: "power3" });
    const ly = gsap.quickTo(label.current, "y", { duration: 0.45, ease: "power3" });

    let state = "";
    // Read theme colours at hover time so the cursor follows the active theme
    const css = (v: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
    const acc = (a: number) => `rgba(${css("--accent-rgb").split(/\s+/).join(",")},${a})`;
    const txt = (a: number) => {
      const h = css("--text").replace("#", "");
      const n = parseInt(h.length === 3 ? h.replace(/./g, "$&$&") : h, 16);
      return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
    };
    const setState = (next: string, text = "") => {
      if (next === state) return;
      state = next;
      if (label.current) label.current.textContent = text;
      const r = ring.current!;
      if (next === "view") {
        gsap.to(r, { scale: 2.2, backgroundColor: acc(1), borderColor: acc(0), duration: 0.35, ease: "power3.out" });
        gsap.to(label.current, { opacity: 1, duration: 0.25 });
        gsap.to(dot.current, { scale: 0, duration: 0.2 });
      } else if (next === "link") {
        gsap.to(r, { scale: 1.7, backgroundColor: acc(0.12), borderColor: acc(0.9), duration: 0.3, ease: "power3.out" });
        gsap.to(label.current, { opacity: 0, duration: 0.15 });
        gsap.to(dot.current, { scale: 0.5, duration: 0.2 });
      } else {
        gsap.to(r, { scale: 1, backgroundColor: acc(0), borderColor: txt(0.35), duration: 0.3, ease: "power3.out" });
        gsap.to(label.current, { opacity: 0, duration: 0.15 });
        gsap.to(dot.current, { scale: 1, duration: 0.2 });
      }
    };

    let px = -1, py = -1;
    const pick = (t: HTMLElement | null) => {
      if (!t) return setState("");
      const view = t.closest<HTMLElement>("[data-cursor='view']");
      if (view) return setState("view", view.dataset.cursorLabel ?? "View");
      if (t.closest("a, button, [role='button'], label, select, [data-cursor='link']")) return setState("link");
      setState("");
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      dx(px); dy(py); rx(px); ry(py); lx(px); ly(py);
      gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2, overwrite: "auto" });
      pick(e.target as HTMLElement);
    };
    // Content moves under a still pointer while scrolling: re-check what is under it
    const onScroll = () => { if (px >= 0) pick(document.elementFromPoint(px, py) as HTMLElement | null); };
    const onLeave = () => gsap.to([dot.current, ring.current, label.current], { opacity: 0, duration: 0.2 });
    const onDown = () => gsap.to(ring.current, { scale: "-=0.25", duration: 0.15, yoyo: true, repeat: 1 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    return () => {
      html.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={ring}
        className="fixed left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--text)_35%,transparent)] will-change-transform"
      />
      {/* Label lives outside the scaled ring so its text renders crisp */}
      <span
        ref={label}
        className="fixed left-0 top-0 font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-[#05070d] opacity-0 will-change-transform"
      />
      <div ref={dot} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent will-change-transform" />
    </div>
  );
}
