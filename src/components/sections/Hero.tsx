"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { useLoaded } from "@/lib/loader-store";
import { site, marquee } from "@/data/content";
import RevealText from "@/components/ui/RevealText";
import Magnetic from "@/components/ui/Magnetic";
import ContactIcons from "@/components/ui/ContactIcons";

export default function Hero() {
  const loaded = useLoaded();
  const root = useRef<HTMLElement>(null);
  const aurora = useRef<HTMLDivElement>(null);

  // Fade-up the supporting UI once the loader is gone
  useEffect(() => {
    if (!loaded || !root.current) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from(root.current!.querySelectorAll("[data-hero-fade]"), {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.5,
      });
      // Parallax the aurora + headline away as you scroll
      gsap.to(aurora.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-content]", {
        yPercent: -12,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    });
    return () => mm.revert();
  }, [loaded]);

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Animated gradient + grain */}
      <div ref={aurora} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-a absolute -left-[10%] top-[5%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(46,230,197,0.22),transparent_60%)] will-change-transform" />
        <div className="aurora-b absolute -right-[20%] top-[20%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(108,140,255,0.20),transparent_60%)] will-change-transform" />
        <div className="aurora-c absolute bottom-[-30%] left-[25%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle_at_center,rgba(46,230,197,0.10),transparent_60%)] will-change-transform" />
        <div className="noise absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      <div data-hero-content className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-4 pb-10 pt-32 sm:px-6 md:px-10 md:pb-14">
        <div data-hero-fade className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-line bg-surface/70 px-4 py-2 backdrop-blur">
          <span className="pulse-dot relative block h-2 w-2 rounded-full bg-accent text-accent" aria-hidden />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text">Available for freelance &amp; full-time</span>
        </div>

        <RevealText
          as="h1"
          mode="manual"
          play={loaded}
          by="words"
          className="max-w-[17ch] font-display text-[clamp(2.5rem,6.4vw,6.75rem)] font-medium leading-[0.95] tracking-[-0.035em] text-balance"
        >
          {site.heroLine}
        </RevealText>
        <span id="hero-title" className="sr-only">{site.name} — {site.role}</span>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[1fr_auto] md:items-end">
          <div data-hero-fade className="max-w-xl space-y-2">
            <p className="font-display text-xl text-text md:text-2xl">{site.name}</p>
            <p className="text-pretty text-base leading-relaxed text-muted md:text-lg">
              Data Engineer · BI Developer · Data &amp; AI Consultant at <span className="text-text">Innolytix</span>, Karachi.
              DP-700 &amp; PL-300 certified.
            </p>
          </div>
          <div data-hero-fade className="flex flex-col gap-5 md:items-end">
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-medium text-accent-ink"
              >
                Start a project
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link
                href="/#work"
                className="inline-flex items-center gap-3 rounded-full border border-line px-7 py-4 text-base text-text transition-colors hover:border-text"
              >
                See the work
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href={site.cv}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-base text-text transition-colors hover:border-text"
              >
                Download CV <span aria-hidden>↓</span>
              </a>
            </Magnetic>
          </div>
          <ContactIcons />
          </div>
        </div>
      </div>

      {/* Stack marquee */}
      <div data-hero-fade className="relative border-y border-line bg-bg/60 py-4 backdrop-blur" aria-label="Core stack">
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="marquee-track flex w-max gap-10 font-mono text-sm uppercase tracking-[0.18em] text-muted">
            {[...marquee, ...marquee].map((m, i) => (
              <li key={i} aria-hidden={i >= marquee.length} className="flex items-center gap-10 whitespace-nowrap">
                {m}
                <span className="text-accent" aria-hidden>✦</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
