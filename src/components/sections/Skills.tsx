"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { skills, coreSkills } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Ambient from "@/components/ui/Ambient";

const covered = new Set(coreSkills.flatMap((c) => c.covers));

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      root.current!.querySelectorAll("[data-skill-row]").forEach((row) => {
        gsap.from(row.querySelectorAll(":scope > li"), {
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

  // Bento layout on large screens: the first core card is the big tile, Power BI and Medallion span two columns.
  const span = (i: number) =>
    i === 0 ? "col-span-2 lg:row-span-2" : i === 2 || i === 5 ? "col-span-2" : "col-span-2 sm:col-span-1";
  const rest = skills
    .map((g) => ({ group: g.group, items: g.items.filter((s) => !covered.has(s)) }))
    .filter((g) => g.items.length);

  return (
    <section ref={root} id="skills" aria-labelledby="skills-title" className="relative isolate overflow-hidden border-y border-line bg-band">
      <Ambient variant="b" />
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:px-10 md:py-32">
      <SectionLabel index="05">Skills &amp; stack</SectionLabel>
      <div className="mb-14 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <RevealText as="h2" accent="boardroom" className="font-display text-[clamp(2.2rem,4.8vw,4.5rem)] font-medium leading-[1] tracking-[-0.03em] text-balance">
          From raw source systems to the boardroom dashboard.
        </RevealText>
        <span id="skills-title" className="sr-only">Skills and stack</span>
        <p className="text-pretty text-base leading-[1.6] text-muted lg:text-lg">
          The whole path — ingestion, modelling, governance, BI and AI — so there&apos;s no hand-off gap between the data team and the people
          who need the answer.
        </p>
      </div>

      <ul data-skill-row className="grid grid-flow-dense grid-cols-2 gap-3 lg:grid-cols-4 md:gap-4">
        {coreSkills.map((c, i) => (
          <li
            key={c.name}
            className={`glow-card relative flex flex-col justify-between overflow-hidden rounded-3xl border border-accent/30 bg-surface p-6 transition-colors duration-300 hover:border-accent md:p-7 ${span(i)}`}
          >
            {i === 0 && (
              <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-2-rgb)/0.35),transparent_65%)]" />
            )}
            <span className="relative w-fit rounded-full border border-accent-2/50 bg-accent-2/10 px-3 py-1 font-mono text-[13px] uppercase tracking-[0.12em] text-accent-2">
              Core
            </span>
            <div className={`relative ${i === 0 ? "mt-10 lg:mt-24" : "mt-6 md:mt-8"}`}>
              <p className={`font-display font-medium tracking-tight ${i === 0 ? "text-4xl md:text-5xl lg:text-6xl" : "text-2xl md:text-3xl"}`}>
                {i === 0 ? <span className="grad-text">{c.name}</span> : c.name}
              </p>
              <p className={`mt-3 leading-[1.6] text-muted ${i === 0 ? "text-lg" : "text-base"}`}>{c.note}</p>
            </div>
          </li>
        ))}
        <li className="col-span-2 pt-6 lg:col-span-4">
          <h3 className="font-mono text-[13px] uppercase tracking-[0.16em] text-muted">Also worked with</h3>
        </li>
        {rest.map((g) => (
          <li key={g.group} className="glow-card col-span-2 rounded-3xl border border-line bg-surface/70 p-5 sm:col-span-1 md:p-6">
            <h4 className="font-display text-xl font-medium tracking-tight">{g.group}</h4>
            <p className="mt-2 text-base leading-[1.6] text-muted">{g.items.join(" · ")}</p>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
