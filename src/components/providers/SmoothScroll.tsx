"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis, getLenis } from "@/lib/lenis-store";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // In-page anchor links go through Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const hash = href.startsWith("/#") ? href.slice(1) : href.startsWith("#") ? href : null;
      if (!hash || window.location.pathname !== "/") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { duration: 1.4 });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    // Web fonts change line heights → re-measure pins once they're in
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // New page → start at the top (or at the hash), then let ScrollTrigger re-measure.
  useEffect(() => {
    const lenis = getLenis();
    const hash = window.location.hash;
    requestAnimationFrame(() => {
      const el = hash ? document.querySelector(hash) : null;
      if (el) {
        if (lenis) lenis.scrollTo(el as HTMLElement, { immediate: true });
        else el.scrollIntoView();
      } else if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  return <>{children}</>;
}
