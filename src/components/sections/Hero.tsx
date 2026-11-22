"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { useLoaded } from "@/lib/loader-store";
import { site, marquee, banksphere, plantmind } from "@/data/content";
import RevealText from "@/components/ui/RevealText";
import Magnetic from "@/components/ui/Magnetic";
import ContactIcons from "@/components/ui/ContactIcons";
import Aura from "@/components/ui/Aura";

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
        <Aura />
        <div className="aurora-a absolute -left-[10%] top-[5%] h-[70vmax] w-[70vmax] rounded-full will-change-transform" style={{ background: "radial-gradient(circle at center, rgb(var(--accent-rgb) / calc(0.22 * var(--aurora-strength))), transparent 60%)" }} />
        <div className="aurora-b absolute -right-[20%] top-[20%] h-[60vmax] w-[60vmax] rounded-full will-change-transform" style={{ background: "radial-gradient(circle at center, rgb(var(--accent-3-rgb) / calc(0.14 * var(--aurora-strength))), transparent 60%)" }} />
        <div className="aurora-c absolute bottom-[-30%] left-[25%] h-[50vmax] w-[50vmax] rounded-full will-change-transform" style={{ background: "radial-gradient(circle at center, rgb(var(--accent-2-rgb) / calc(0.12 * var(--aurora-strength))), transparent 60%)" }} />
        <div className="hero-arc absolute -inset-x-[10%] -bottom-[70%] top-[35%] hidden will-change-transform md:block" />
        <div className="noise absolute inset-0 mix-blend-overlay" style={{ opacity: "var(--noise-opacity)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
      </div>

      {/* Right side: portrait once public/me.jpg exists; until then a glass card with the featured project + credentials */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] items-center justify-center pr-10 lg:flex">
        <div className="absolute right-[12%] top-1/2 h-[70%] w-[70%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--accent-rgb)/0.22),rgb(var(--accent-2-rgb)/0.14)_45%,transparent_70%)] blur-2xl" aria-hidden />
        {site.photo ? (
          <div className="relative aspect-[4/5] w-[78%] max-w-[460px] overflow-hidden rounded-[2rem] border border-line [mask-image:linear-gradient(to_bottom,black_70%,transparent)]">
            <Image src={site.photo} alt={`Portrait of ${site.name}`} fill priority sizes="40vw" className="object-cover" />
          </div>
        ) : (
          <div data-hero-fade className="float-y relative flex w-[86%] max-w-[480px] flex-col items-stretch gap-3">
          <Link
            href={`/work/${banksphere.slug}`}
            className="pointer-events-auto relative w-full max-w-[480px] rounded-[1.75rem] border border-line bg-surface/70 p-4 shadow-[var(--stage-shadow)] backdrop-blur-md transition-colors hover:border-accent/50"
          >
            <div className="flex items-center justify-between px-1 pb-3">
              <span className="font-mono text-[13px] uppercase tracking-[0.14em] text-muted">Featured project</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[13px] text-accent">
                Case study <span aria-hidden>→</span>
              </span>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-bg">
              <Image src="/projects/banksphere/kyc.webp" alt="BankSphere AI officer review screen" fill priority={false} sizes="480px" className="object-cover object-left-top" />
            </div>
            <div className="px-1 pt-4">
              <p className="font-display text-2xl font-medium tracking-tight">{banksphere.name}</p>
              <p className="mt-1 text-base text-muted">{banksphere.tagline}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 px-1 pb-1">
              {["DP-700 certified", "PL-300 certified", "Innolytix · Karachi"].map((c) => (
                <span key={c} className="rounded-full border border-line bg-bg/60 px-3 py-1 text-[13px] text-text">{c}</span>
              ))}
            </div>
          </Link>
          <Link
            href="/#plantmind"
            className="group pointer-events-auto flex items-center gap-3 self-start rounded-full border border-line bg-surface/70 py-1.5 pl-1.5 pr-4 backdrop-blur-md transition-colors hover:border-accent-2/60"
          >
            <span className="rounded-full bg-accent-2 px-2.5 py-0.5 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-accent-ink">New</span>
            <span className="text-[15px] text-text">{plantmind.name} · AI for manufacturing</span>
            <span aria-hidden className="text-accent-2 transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          </div>
        )}
      </div>

      <div data-hero-content className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-4 pb-10 pt-32 sm:px-6 md:px-10 md:pb-14 lg:pr-[44%]">
        <div data-hero-fade className="mb-8 inline-flex w-fit items-center gap-3 rounded-full border border-line bg-surface/70 px-4 py-2 backdrop-blur">
          <span className="pulse-dot relative block h-2 w-2 rounded-full bg-accent text-accent" aria-hidden />
          <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-text">Available for freelance &amp; full-time</span>
        </div>

        <RevealText
          as="h1"
          mode="manual"
          play={loaded}
          by="words"
          accent="decisions"
          className="aura-text max-w-[14ch] font-display text-[clamp(2.5rem,6.4vw,6.75rem)] lg:text-[clamp(3.5rem,5.2vw,5.75rem)] font-medium leading-[0.95] tracking-[-0.035em] text-balance"
        >
          {site.heroLine}
        </RevealText>
        <p data-hero-fade className="mt-5 max-w-[30ch] font-display text-[clamp(1.35rem,2.4vw,2.25rem)] leading-tight tracking-[-0.02em] text-muted">
          {site.heroSub}
        </p>
        <span id="hero-title" className="sr-only">{site.name} — {site.role}</span>

        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-[1fr_auto] md:items-end lg:grid-cols-1 lg:items-start">
          <div data-hero-fade className="max-w-xl space-y-2">
            <p className="font-display text-xl text-text md:text-2xl">{site.name}</p>
            <p className="text-pretty text-base leading-relaxed text-muted md:text-lg">
              Data Engineer · BI Developer · Data &amp; AI Consultant at <span className="text-text">Innolytix</span>, Karachi.
              DP-700 &amp; PL-300 certified.
            </p>
          </div>
          <div data-hero-fade className="flex flex-col gap-5 md:items-end lg:items-start">
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link
                href="/#contact"
                className="group inline-flex items-center gap-3 btn-glow rounded-full bg-accent px-7 py-4 text-base font-medium text-accent-ink"
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
            {site.cv && (
            <Magnetic>
              <a
                href={site.cv}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-base text-text transition-colors hover:border-text"
              >
                Download CV <span aria-hidden>↓</span>
              </a>
            </Magnetic>
            )}
          </div>
          <ContactIcons />
          </div>
        </div>

        {/* Below lg the big glass card is hidden — show a compact version so phones still see the featured work */}
        <div data-hero-fade className="mt-8 flex flex-col gap-3 lg:hidden">
          <Link
            href={`/work/${banksphere.slug}`}
            className="flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-3 backdrop-blur-md transition-colors hover:border-accent/50"
          >
            <span className="relative h-20 w-24 shrink-0 self-start overflow-hidden rounded-lg border border-line bg-bg">
              <Image src="/projects/banksphere/kyc.webp" alt="" fill sizes="96px" className="object-cover object-left-top" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-medium leading-tight tracking-tight">{banksphere.name}</span>
              <span className="mt-0.5 block text-[15px] leading-snug text-muted">{banksphere.tagline}</span>
              <span className="mt-1 block font-mono text-[13px] text-accent">
                Case study <span aria-hidden>→</span>
              </span>
            </span>
          </Link>
          <Link
            href="/#plantmind"
            className="group flex w-fit items-center gap-3 rounded-full border border-line bg-surface/70 py-1.5 pl-1.5 pr-4 backdrop-blur-md transition-colors hover:border-accent-2/60"
          >
            <span className="rounded-full bg-accent-2 px-2.5 py-0.5 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-accent-ink">New</span>
            <span className="text-[15px] text-text">{plantmind.name} · AI for manufacturing</span>
            <span aria-hidden className="text-accent-2">→</span>
          </Link>
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
