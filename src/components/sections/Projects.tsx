"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { projects } from "@/data/content";
import ProjectVisual from "@/components/ui/ProjectVisual";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Projects() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop: vertical scroll drives a horizontal gallery
    mm.add(`(min-width: 768px) and ${MOTION_OK}`, () => {
      const t = track.current!;
      const distance = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      // Each card's cover grows from a reveal mask as it slides in
      t.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
        const mask = card.querySelector("[data-mask]");
        const img = card.querySelector("[data-img]");
        if (!mask || !img) return;
        gsap.fromTo(mask, { scaleX: 1 }, {
          scaleX: 0, ease: "power2.inOut",
          scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true },
        });
        gsap.fromTo(img, { scale: 1.25 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });
    });

    // Mobile: vertical stack with reveal on enter
    mm.add(`(max-width: 767px) and ${MOTION_OK}`, () => {
      track.current!.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
        if (!card.querySelector("[data-mask]")) return;
        gsap.fromTo(card.querySelector("[data-mask]"), { scaleY: 1 }, {
          scaleY: 0, duration: 1.1, ease: "expo.inOut",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
        gsap.fromTo(card.querySelector("[data-img]"), { scale: 1.2 }, {
          scale: 1, duration: 1.6, ease: "expo.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={section} aria-labelledby="projects-title" className="relative overflow-hidden md:motion-safe:h-[100svh]">
      <div
        ref={track}
        className="flex flex-col gap-6 px-4 py-20 sm:px-6 md:grid md:grid-cols-2 md:gap-8 md:px-10 md:motion-safe:flex md:motion-safe:h-full md:motion-safe:w-max md:motion-safe:flex-row md:motion-safe:items-center md:motion-safe:py-0"
      >
        {/* Intro panel */}
        <div className="flex shrink-0 flex-col justify-center md:col-span-2 md:mb-8 md:motion-safe:mb-0 md:motion-safe:w-[min(34vw,520px)] md:motion-safe:pr-10">
          <SectionLabel index="04">More work</SectionLabel>
          <h2 id="projects-title" className="font-display text-[clamp(2.2rem,4.2vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.03em] text-balance">
            Platforms delivered across <span className="grad-text">four sectors</span>.
          </h2>
          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted">
            Client work at Innolytix, described by sector. Plus the final-year project that started it all.
          </p>
          <p className="mt-10 hidden items-center gap-3 font-mono text-[13px] uppercase tracking-[0.2em] text-muted md:motion-safe:flex" aria-hidden>
            Scroll <span className="inline-block h-px w-10 bg-accent" /> to explore
          </p>
        </div>

        <p className="-mb-2 font-mono text-[13px] uppercase tracking-[0.2em] text-muted md:hidden" aria-hidden>Swipe →</p>
        <div className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:scroll-px-6 sm:px-6 md:contents">
        {projects.map((p) => (
          <article key={p.slug} data-card className="group relative w-[85%] shrink-0 snap-start sm:w-[70%] md:w-auto md:motion-safe:h-[33rem] md:motion-safe:w-[clamp(340px,33vw,460px)] 2xl:motion-safe:h-[36rem] 2xl:motion-safe:w-[520px]">
            <div
              data-cursor="view"
              className="glow-card relative flex h-full flex-col rounded-3xl border border-line bg-surface p-3 transition-colors duration-500 focus-within:border-[color:var(--accent)]/60 hover:border-[color:var(--accent)]/40"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                <div data-img className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] will-change-transform">
                  <ProjectVisual p={p} />
                </div>
                <div data-mask className="absolute inset-0 origin-top bg-bg motion-reduce:hidden md:origin-right" aria-hidden />
                <span className="absolute left-3 right-16 top-3 flex flex-wrap gap-2">
                  {p.academic && (
                    <span className="rounded-full border border-dashed border-line bg-bg/80 px-3 py-1 font-mono text-[13px] uppercase tracking-[0.16em] text-muted backdrop-blur">
                      Academic
                    </span>
                  )}
                  <span className="rounded-full border border-line bg-bg/70 px-3 py-1 font-mono text-[12px] uppercase tracking-[0.12em] text-text backdrop-blur">
                    {p.sector}
                  </span>
                </span>
                <span className="absolute right-4 top-3 font-display text-3xl font-medium text-text/80">{p.index}</span>
              </div>
              <div className="flex flex-1 flex-col px-2 pb-3 pt-5">
                <h3 className="font-display text-xl font-medium leading-tight tracking-tight md:text-[1.4rem]">
                  {/* The title is the link; its ::after stretches over the whole card so the card stays clickable. */}
                  <Link href={`/work/${p.slug}`} className="after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent">
                    {p.name}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-3 text-pretty text-[15px] leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-4" aria-label="Stack">
                  {p.stack.slice(0, 4).map((s) => (
                    <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[13px] text-muted">{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}

        </div>
        <div className="hidden w-[6vw] shrink-0 md:motion-safe:block" aria-hidden />
      </div>
    </section>
  );
}
