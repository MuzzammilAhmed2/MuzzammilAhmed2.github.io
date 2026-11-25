"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { services } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Magnetic from "@/components/ui/Magnetic";
import Ambient from "@/components/ui/Ambient";

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from(root.current!.querySelectorAll("[data-svc]"), {
        y: 48, clipPath: "inset(0% 0% 100% 0%)", duration: 1.2, ease: "expo.out", stagger: 0.12, clearProps: "clipPath",
        scrollTrigger: { trigger: "[data-svc-grid]", start: "top 80%", once: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="services" aria-labelledby="svc-title" className="relative isolate mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-4 py-20 sm:px-6 md:px-10 md:py-40">
      <Ambient variant="a" />
      <SectionLabel index="08">Freelance services</SectionLabel>
      <div className="mb-16 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <RevealText as="h2" accent="Power BI" className="font-display text-[clamp(2.2rem,4.8vw,4.5rem)] font-medium leading-[1] tracking-[-0.03em] text-balance">
          Freelance: data platforms, Power BI &amp; AI document solutions
        </RevealText>
        <span id="svc-title" className="sr-only">Freelance services</span>
        <p className="text-pretty text-lg leading-relaxed text-muted">
          I take on a small number of freelance projects alongside my full‑time role. Here&apos;s where I can help most.
        </p>
      </div>
      <div data-svc-grid className="grid gap-5 lg:grid-cols-3">
        {services.map((s, i) => (
          <article
            key={s.title}
            data-svc
            className="glow-card group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-8 transition-[transform,border-color] duration-500 hover:-translate-y-1.5 hover:border-accent/50"
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 group-hover:scale-x-100" />
            <span className="font-mono text-[13px] tracking-[0.12em] text-accent-2">0{i + 1}</span>
            <h3 className="mt-10 font-display text-2xl font-medium leading-tight tracking-tight md:text-3xl">{s.title}</h3>
            <p className="mt-4 flex-1 text-pretty leading-relaxed text-muted">{s.body}</p>
            <ul className="mt-8 space-y-2 border-t border-line pt-6">
              {s.points.map((pt) => (
                <li key={pt} className="flex items-center gap-3 text-base text-text">
                  <span aria-hidden className="text-accent">✦</span>
                  {pt}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div data-svc className="mt-16 flex justify-center md:mt-20">
        <Magnetic>
          <Link href="/#contact" className="inline-flex items-center gap-3 btn-glow rounded-full bg-accent px-8 py-4 text-base font-medium text-accent-ink">
            Tell me about your project <span aria-hidden>→</span>
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
