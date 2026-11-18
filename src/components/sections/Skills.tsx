"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { skills, coreSkills } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";

const covered = new Set(coreSkills.flatMap((c) => c.covers));

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      root.current!.querySelectorAll("[data-skill-row]").forEach((row) => {
        gsap.from(row.querySelectorAll(":scope > li, :scope > div"), {
          y: 18, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.025,
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
        const rule = row.querySelector("[data-rule]");
        if (rule) gsap.from(rule, {
          scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="skills" aria-labelledby="skills-title" className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:px-10 md:py-40">
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
      <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-accent">Core</h3>
      <ul data-skill-row className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {coreSkills.map((c) => (
          <li
            key={c.name}
            className="glow-card rounded-2xl border border-accent/30 bg-surface p-5 transition-colors duration-300 hover:border-accent md:p-6"
          >
            <p className="font-display text-2xl font-medium tracking-tight md:text-3xl">{c.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{c.note}</p>
          </li>
        ))}
      </ul>

      <h3 className="mb-4 mt-14 font-mono text-xs uppercase tracking-[0.2em] text-muted">Also worked with</h3>
      <dl data-skill-row className="relative grid gap-x-10 gap-y-5 pt-6 md:grid-cols-2">
        <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
        {skills.map((g) => {
          const items = g.items.filter((s) => !covered.has(s));
          if (!items.length) return null;
          return (
            <div key={g.group}>
              <dt className="text-sm font-medium text-text">{g.group}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{items.join(" · ")}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
