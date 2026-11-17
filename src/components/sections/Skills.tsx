"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { skills } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      root.current!.querySelectorAll("[data-skill-row]").forEach((row) => {
        gsap.from(row.querySelectorAll("li"), {
          y: 18, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.025,
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
        gsap.from(row.querySelector("[data-rule]"), {
          scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="skills" aria-labelledby="skills-title" className="mx-auto max-w-[1440px] px-4 py-28 sm:px-6 md:px-10 md:py-40">
      <SectionLabel index="04">Skills &amp; stack</SectionLabel>
      <div className="mb-16 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <RevealText as="h2" className="font-display text-[clamp(2.2rem,4.8vw,4.5rem)] font-medium leading-[1] tracking-[-0.03em] text-balance">
          From raw source systems to the boardroom dashboard.
        </RevealText>
        <span id="skills-title" className="sr-only">Skills and stack</span>
        <p className="text-pretty text-lg leading-relaxed text-muted">
          The whole path — ingestion, modelling, governance, BI and AI — so there&apos;s no hand-off gap between the data team and the people
          who need the answer.
        </p>
      </div>
      <div className="space-y-0">
        {skills.map((g, i) => (
          <div key={g.group} data-skill-row className="relative grid gap-4 py-7 md:grid-cols-[260px_1fr] md:gap-10">
            <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
            <h3 className="flex items-baseline gap-3 font-display text-xl font-medium">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              {g.group}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-text transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
