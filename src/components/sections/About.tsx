"use client";

import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { about } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Ambient from "@/components/ui/Ambient";

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
        opacity: 0.7,
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
    <section id="about" ref={root} aria-labelledby="about-title" className="relative isolate overflow-hidden border-y border-line bg-band">
      <Ambient variant="a" />
      <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:px-10 md:py-24 xl:py-32">
      <SectionLabel index="01">About</SectionLabel>
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <RevealText
          as="h2"
          accent="traced"
          className="font-display text-[clamp(2rem,4.6vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.03em] text-balance"
        >
          {about.heading}
        </RevealText>
        <span id="about-title" className="sr-only">About Muzzammil</span>
        <div data-story className="space-y-6 text-base leading-[1.6] text-muted lg:text-lg">
          {about.story.map((p, i) => (
            <p key={i} className={i === 0 ? "text-text" : ""}>{p}</p>
          ))}
        </div>
      </div>

      </div>

      {/* Stats strip */}
      <div className="border-t border-line bg-bg/50">
        <dl data-stats className="mx-auto grid max-w-[1440px] grid-cols-2 gap-3 px-4 py-10 sm:px-6 md:gap-4 md:px-10 md:py-14 lg:grid-cols-4">
          {about.stats.map((s) => (
            <div
              key={s.label}
              data-stat
              className="glow-card flex flex-col-reverse gap-3 rounded-2xl border border-line bg-surface p-5 md:p-7"
            >
              <dt className="max-w-[24ch] text-[15px] leading-snug text-muted md:text-base">{s.label}</dt>
              <dd className="font-display text-[2.6rem] font-medium leading-none tracking-tight min-[360px]:text-5xl sm:text-6xl md:text-7xl">
                <span data-count={s.value} className="grad-text">{s.value.toLocaleString("en-US")}</span>
                <span className="text-accent">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
