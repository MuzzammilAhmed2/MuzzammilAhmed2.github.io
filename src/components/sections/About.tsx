"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { about } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // Count-up numbers
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => {
        const end = Number(n.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: { trigger: n, start: "top 90%", once: true },
          onUpdate: () => { n.textContent = Math.round(obj.v).toLocaleString("en-US"); },
        });
      });
      // Paragraph highlight: words brighten as you read
      gsap.from(el.querySelectorAll("[data-story] p"), {
        opacity: 0.25,
        stagger: 0.3,
        ease: "none",
        scrollTrigger: { trigger: "[data-story]", start: "top 75%", end: "bottom 55%", scrub: true },
      });
      gsap.from(el.querySelectorAll("[data-stat]"), {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-stats]", start: "top 85%", once: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="about" ref={root} aria-labelledby="about-title" className="mx-auto max-w-[1440px] px-4 py-28 sm:px-6 md:px-10 md:py-40">
      <SectionLabel index="01">About</SectionLabel>
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <RevealText
          as="h2"
          className="font-display text-[clamp(2rem,4.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-balance"
        >
          Data that leadership trusts. AI that auditors can follow.
        </RevealText>
        <span id="about-title" className="sr-only">About Muzzammil</span>
        <div data-story className="space-y-6 text-lg leading-relaxed text-muted md:text-xl">
          {about.story.map((p, i) => (
            <p key={i} className={i === 0 ? "text-text" : ""}>{p}</p>
          ))}
        </div>
      </div>

      <dl data-stats className="mt-20 grid grid-cols-2 border-t border-line md:mt-28 lg:grid-cols-4">
        {about.stats.map((s, i) => (
          <div
            key={s.label}
            data-stat
            className={`flex flex-col-reverse gap-3 border-b border-line py-8 pr-4 lg:border-b-0 ${i % 2 === 0 ? "" : "pl-4 border-l lg:pl-6"} ${i >= 2 ? "lg:border-l lg:pl-6" : ""}`}
          >
            <dt className="max-w-[22ch] text-sm leading-snug text-muted">{s.label}</dt>
            <dd className="font-display text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl">
              <span data-count={s.value}>{s.value.toLocaleString("en-US")}</span>
              <span className="text-accent">{s.suffix}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
