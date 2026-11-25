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

  const cert: Record<string, string> = { "Microsoft Fabric": "DP‑700 certified", "Power BI / DAX": "PL‑300 certified" };
  const rest = skills
    .map((g) => ({ group: g.group, items: g.items.filter((s) => !covered.has(s)) }))
    .filter((g) => g.items.length);

  return (
    <section ref={root} id="skills" aria-labelledby="skills-title" className="relative isolate overflow-hidden border-y border-line bg-band">
      <Ambient variant="b" />
      <div className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-4 py-20 sm:px-6 md:px-10 md:py-24 xl:py-32">
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

      <ul data-skill-row className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
        {coreSkills.map((c, i) => (
          <li
            key={c.name}
            className="glow-card relative flex flex-col overflow-hidden rounded-3xl border border-accent/30 bg-surface p-6 transition-colors duration-300 hover:border-accent md:p-7"
          >
            {i === 0 && (
              <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-2-rgb)/0.3),transparent_65%)]" />
            )}
            <p className="relative font-display text-2xl font-medium tracking-tight md:text-[1.7rem]">
              {i === 0 ? <span className="grad-text">{c.name}</span> : c.name}
            </p>
            {cert[c.name] && (
              <span className="relative mt-3 w-fit rounded-full border border-accent-2/50 bg-accent-2/10 px-2.5 py-1 font-mono text-[12px] uppercase tracking-[0.1em] text-accent-2">
                {cert[c.name]}
              </span>
            )}
            <ul className="relative mt-4 flex flex-wrap gap-2" aria-label={`${c.name} skills`}>
              {c.note.split(/,\s*/).map((n) => (
                <li key={n} className="rounded-full border border-line bg-bg/50 px-3 py-1 text-[14px] text-text/90">{n}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <h3 className="mb-4 mt-12 font-mono text-[13px] uppercase tracking-[0.16em] text-muted">Also worked with</h3>
      <ul data-skill-row className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 md:gap-4">
        {rest.map((g) => (
          <li key={g.group} className="glow-card rounded-3xl border border-line bg-surface/70 p-5 md:p-6">
            <h4 className="font-display text-lg font-medium tracking-tight">{g.group}</h4>
            <p className="mt-2 text-[15px] leading-[1.6] text-muted">{g.items.join(" · ")}</p>
          </li>
        ))}
      </ul>
      </div>
    </section>
  );
}
