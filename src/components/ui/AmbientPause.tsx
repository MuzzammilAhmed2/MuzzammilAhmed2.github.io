"use client";

import { useEffect } from "react";

/**
 * Decorative glows animate only while they are on screen. Off-screen ones are paused,
 * which keeps the GPU free for the content being scrolled (blank-screen fix, 2026-11-25).
 */
export default function AmbientPause() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-ambient]");
    if (!("IntersectionObserver" in window) || !els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute("data-on", e.isIntersecting)),
      { rootMargin: "100px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
