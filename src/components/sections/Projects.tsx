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
        <div className="flex shrink-0 flex-col justify-center md:col-span-2 md:mb-8 md:motion-safe:mb-0 md:motion-safe:w-[34vw] md:motion-safe:pr-10">
          <SectionLabel index="03">More work</SectionLabel>
          <h2 id="projects-title" className="font-display text-[clamp(2.4rem,5vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.03em] text-balance">
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
          <article key={p.slug} data-card className="group relative w-[85%] shrink-0 snap-start sm:w-[70%] md:w-auto md:motion-safe:w-[min(46vw,640px)]">
            <Link
              href={`/work/${p.slug}`}
              data-cursor="view"
              className="glow-card block rounded-3xl border border-line bg-surface p-3 transition-colors duration-500 hover:border-[color:var(--accent)]/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <div data-img className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] will-change-transform">
                  <ProjectVisual p={p} />
                </div>
                <div data-mask className="absolute inset-0 origin-top bg-bg motion-reduce:hidden md:origin-right" aria-hidden />
                <span className="absolute left-4 top-4 rounded-full border border-line bg-bg/70 px-3 py-1 font-mono text-[13px] uppercase tracking-[0.16em] text-text backdrop-blur">
                  {p.sector}
                </span>
                <span className="absolute right-4 top-4 font-display text-4xl font-medium text-text/80">{p.index}</span>
              </div>
              <div className="px-3 pb-4 pt-6">
                <h3 className="font-display text-2xl font-medium leading-tight tracking-tight md:text-[1.75rem]">{p.name}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted">{p.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
                  {p.stack.slice(0, 5).map((s) => (
                    <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[13px] text-muted">{s}</li>
                  ))}
                </ul>
              </div>
            </Link>
          </article>
        ))}

        {/* Coming soon */}
        <article data-card className="relative w-[85%] shrink-0 snap-start sm:w-[70%] md:w-auto md:motion-safe:w-[min(32vw,440px)]">
          <div className="flex h-full min-h-[260px] flex-col md:aspect-[16/10] md:h-auto md:min-h-0 items-start justify-between rounded-3xl border border-dashed border-line p-8 md:motion-safe:aspect-auto md:motion-safe:h-[min(70vh,560px)]">
            <span className="rounded-full border border-line px-3 py-1 font-mono text-[13px] uppercase tracking-[0.16em] text-muted">07 · In progress</span>
            <div>
              <p className="font-display text-4xl font-medium tracking-tight md:text-5xl">Coming soon</p>
              <p className="mt-3 max-w-xs text-muted">Something new is being built right now. Want a preview?</p>
              <Link href="/#contact" className="mt-6 inline-flex items-center gap-2 text-accent underline-offset-4 hover:underline">
                Ask me about it <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </article>
        </div>
        <div className="hidden w-[6vw] shrink-0 md:motion-safe:block" aria-hidden />
      </div>
    </section>
  );
}
