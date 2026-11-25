"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** A soft aura that trails the pointer across the page (desktop, motion allowed). */
export default function AuraCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !ok) return;
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const x = gsap.quickTo(el, "x", { duration: 1.1, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 1.1, ease: "power3" });
    const move = (e: PointerEvent) => { x(e.clientX); y(e.clientY); gsap.to(el, { opacity: 1, duration: 0.6, overwrite: "auto" }); };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.6 });
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[520px] w-[520px] rounded-full"
      style={{ background: "radial-gradient(circle, rgb(var(--aura-pink) / 0.16), rgb(var(--aura-blue) / 0.08) 40%, transparent 68%)", opacity: 0 }}
    />
  );
}
