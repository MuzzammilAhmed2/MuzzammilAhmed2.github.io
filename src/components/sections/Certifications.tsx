"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { certifications } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Certifications() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from(el.querySelectorAll("[data-cert]"), {
        y: 60, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.1,
        scrollTrigger: { trigger: el, start: "top 75%", once: true },
      });
    });
    // Spotlight follows the pointer on featured cards (CSS vars only; no layout)
    const cards = el.querySelectorAll<HTMLElement>("[data-spot]");
    const move = (e: PointerEvent) => {
      const c = e.currentTarget as HTMLElement;
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    cards.forEach((c) => c.addEventListener("pointermove", move));
    return () => {
      mm.revert();
      cards.forEach((c) => c.removeEventListener("pointermove", move));
    };
  }, []);

  const featured = certifications.filter((c) => c.featured);
  const other = certifications.filter((c) => !c.featured);

  return (
    <section ref={root} id="certifications" aria-labelledby="cert-title" className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:px-10 md:py-40">
      <SectionLabel index="06">Certifications</SectionLabel>
      <h2 id="cert-title" className="mb-14 max-w-3xl font-display text-[clamp(2.2rem,4.8vw,4.5rem)] font-medium leading-[1] tracking-[-0.03em] text-balance">
        Certified by Microsoft on the platforms I build with.
      </h2>
      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((c) => (
          <article
            key={c.code}
            data-cert
            data-spot
            className="group relative overflow-hidden rounded-3xl border border-line bg-surface p-8 md:p-10"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(46,230,197,0.14), transparent 60%)" }}
            />
            <div className="relative flex items-start justify-between gap-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{c.issuer}</p>
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="9" r="6" />
                <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
              </svg>
            </div>
            <p className="relative mt-14 font-display text-6xl font-medium tracking-tight md:text-7xl">{c.code}</p>
            <h3 className="relative mt-3 text-lg text-text md:text-xl">{c.name}</h3>
          </article>
        ))}
      </div>
      <ul className="mt-5 grid gap-5 md:grid-cols-2">
        {other.map((c) => (
          <li key={c.name} data-cert className="flex items-center justify-between gap-6 rounded-2xl border border-line px-6 py-5">
            <span className="text-text">{c.name}</span>
            <span className="shrink-0 font-mono text-xs uppercase tracking-[0.16em] text-muted">{c.issuer}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
