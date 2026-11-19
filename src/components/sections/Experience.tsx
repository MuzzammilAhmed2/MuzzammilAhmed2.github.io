"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { experience } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Ambient from "@/components/ui/Ambient";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo("[data-tl-line]", { scaleY: 0 }, {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: "[data-tl]", start: "top 70%", end: "bottom 60%", scrub: true },
      });
      root.current!.querySelectorAll("[data-tl-item]").forEach((item) => {
        gsap.from(item, {
          y: 50, opacity: 0, duration: 1.1, ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="experience" aria-labelledby="exp-title" className="relative isolate overflow-hidden">
      <Ambient variant="c" />
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:px-10 md:py-40">
        <SectionLabel index="05">Experience</SectionLabel>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <RevealText as="h2" accent="full-time" className="font-display text-[clamp(2.2rem,4.8vw,4.5rem)] font-medium leading-[1] tracking-[-0.03em] text-balance">
              Intern to full-time in three months.
            </RevealText>
            <span id="exp-title" className="sr-only">Experience timeline</span>
            <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted">
              Joined Innolytix as a Data Engineering intern in September 2025 and moved to a full-time Data Engineer / BI Developer role in
              December 2025.
            </p>
          </div>

          <ol data-tl className="relative space-y-14 pl-8 md:pl-12">
            <span aria-hidden className="absolute left-[5px] top-2 h-[calc(100%-1rem)] w-px bg-line">
              <span data-tl-line className="block h-full w-full origin-top bg-gradient-to-b from-accent-2 via-accent-2 to-accent" />
            </span>
            {experience.map((e, i) => (
              <li key={e.role} data-tl-item className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-8 top-1.5 h-[11px] w-[11px] rounded-full border-2 md:-left-12 ${i === 0 ? "border-accent-2 bg-accent-2 shadow-[0_0_18px_rgb(var(--accent-2-rgb)/0.8)]" : "border-accent-2 bg-bg"}`}
                />
                <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-accent">{e.period}</p>
                <h3 className="mt-2 font-display text-2xl font-medium tracking-tight md:text-3xl">{e.role}</h3>
                <p className="mt-1 text-muted">{e.company}</p>
                <ul className="mt-5 space-y-3">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-base leading-[1.6] text-muted">
                      <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
