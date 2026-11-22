"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";
import { banksphere, homeFeatures } from "@/data/content";
import FeatureArt from "@/components/ui/FeatureArt";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Magnetic from "@/components/ui/Magnetic";

const features = homeFeatures;

function Visual({ i, media }: { i: number; media: Record<string, boolean> }) {
  const f = features[i];
  const file = f.media && media[f.media] ? f.media : null;
  return file ? (
    <Image
      src={`/projects/banksphere/${file}`}
      alt={`BankSphere AI — ${f.title}`}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="object-cover object-left-top"
    />
  ) : (
    <div className="absolute inset-0 p-6 md:p-10">
      <FeatureArt art={f.art} />
    </div>
  );
}

export default function BankSphere({ media }: { media: Record<string, boolean> }) {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
      setPinned(true);
      const st = ScrollTrigger.create({
        trigger: pin.current,
        start: "top top",
        end: () => `+=${window.innerHeight * (features.length - 0.4) * 0.75}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const idx = Math.min(features.length - 1, Math.floor(self.progress * features.length));
          setActive(idx);
          gsap.set("[data-bs-progress]", { scaleY: self.progress });
        },
      });
      return () => {
        st.kill();
        setPinned(false);
      };
    });
    return () => mm.revert();
  }, []);

  // The list switches layout when pinning turns on/off — re-measure every trigger after React commits it.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pinned]);

  return (
    <section ref={root} id="work" aria-labelledby="bs-title" className="band-bs relative isolate border-b border-line">
      {/* Light beams sweeping across the band */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {[{ top: "8%", delay: "0s", c: "--accent-2-rgb" }, { top: "38%", delay: "3s", c: "--accent-rgb" }, { top: "70%", delay: "6s", c: "--accent-3-rgb" }].map((b) => (
          <span
            key={b.top}
            className="beam absolute left-0 h-px w-[45%] will-change-transform"
            style={{ top: b.top, animationDelay: b.delay, background: `linear-gradient(90deg, transparent, rgb(var(${b.c}) / 0.7), transparent)` }}
          />
        ))}
      </div>
      <div className="mx-auto max-w-[1440px] px-4 pt-20 sm:px-6 md:px-10 md:pt-28">
        <SectionLabel index="02">Featured product</SectionLabel>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-[13px] uppercase tracking-[0.2em] text-accent">Banking · KYC · Compliance · Azure</p>
            <RevealText
              as="h2"
              by="chars"
              className="font-display text-[clamp(3rem,8.4vw,8.25rem)] font-medium leading-[0.88] tracking-[-0.045em]"
            >
              BankSphere AI
            </RevealText>
            <span id="bs-title" className="sr-only">BankSphere AI — featured project</span>
          </div>
          <div className="space-y-5">
            <p className="text-pretty text-lg leading-relaxed text-muted md:text-xl">
              <span className="text-text">{banksphere.tagline}</span> It onboards customers, screens for financial crime and explains each
              decision to the officer who makes the final call.
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {banksphere.honesty}
            </p>
          </div>
        </div>
      </div>

      {/* Pinned storytelling (desktop) / stacked cards (mobile + reduced motion) */}
      <div ref={pin} className="relative">
        <div className={`mx-auto grid max-w-[1440px] gap-10 px-4 py-14 sm:px-6 md:px-10 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] lg:gap-14 ${pinned ? "lg:min-h-[100svh] lg:items-center lg:py-0" : ""}`}>
          {/* Feature list */}
          <ol className={`relative ${pinned ? "space-y-1 pl-6" : "-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:col-span-2 xl:grid-cols-4"}`}>
            {pinned && (
              <span aria-hidden className="absolute left-0 top-0 h-full w-px bg-line">
                <span data-bs-progress className="block h-full w-full origin-top scale-y-0 bg-accent" />
              </span>
            )}
            {features.map((f, i) => {
              const on = !pinned || i === active;
              return (
                <li
                  key={f.id}
                  aria-current={pinned && i === active ? "step" : undefined}
                  className={`rounded-2xl border transition-[opacity,transform,border-color] duration-500 ${
                    pinned
                      ? `${on ? "translate-x-2 border-line bg-surface/60 opacity-100" : "translate-x-0 border-transparent opacity-65"} px-5 py-2.5`
                      : "glow-card w-[82%] shrink-0 snap-start overflow-hidden border-line bg-surface sm:w-auto"
                  }`}
                >
                  {!pinned && (
                    <div className="border-b border-line bg-bg">
                      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden>
                        <span className="h-2 w-2 rounded-full bg-[#ff6b6b]/70" />
                        <span className="h-2 w-2 rounded-full bg-[#ffd166]/70" />
                        <span className="h-2 w-2 rounded-full bg-accent/70" />
                      </div>
                      <div className="relative aspect-[16/10]">
                        <Visual i={i} media={media} />
                      </div>
                    </div>
                  )}
                  <div className={pinned ? "" : "p-5"}>
                    <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-accent">{f.kicker}</p>
                    <h3 className={`mt-1 font-display font-medium tracking-tight ${pinned ? "text-lg xl:text-xl" : "text-xl md:text-2xl"}`}>{f.title}</h3>
                    {!pinned && <p className="pt-2 text-base leading-[1.6] text-muted">{f.body}</p>}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Visual stage (desktop pinned only) */}
          {pinned && (
            <div data-bs-frame>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/15 bg-surface shadow-[var(--stage-shadow)]">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                <span className="ml-3 font-mono text-[13px] text-muted">banksphere / {features[active].id}</span>
                <span className="ml-auto font-mono text-[13px] text-muted tabular-nums">
                  {String(active + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
                </span>
              </div>
              <div className="relative h-[calc(100%-45px)]">
                {features.map((f, i) => (
                  <div
                    key={f.id}
                    aria-hidden={i !== active}
                    className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                      i === active ? "scale-100 opacity-100" : i < active ? "-translate-y-6 scale-[0.98] opacity-0" : "translate-y-6 scale-[0.98] opacity-0"
                    }`}
                  >
                    <Visual i={i} media={media} />
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mt-6 min-h-[5.5rem]">
              {features.map((f, i) => (
                <p
                  key={f.id}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 text-pretty text-lg leading-relaxed text-muted transition-[opacity,transform] duration-500 ${
                    i === active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  }`}
                >
                  {f.body}
                </p>
              ))}
            </div>
            </div>
          )}
        </div>
      </div>

      {/* See-all link + guided-tour card (the full tour lives on the case study) */}
      <div className="mx-auto grid max-w-[1440px] gap-4 px-4 pb-14 sm:px-6 md:grid-cols-[1fr_auto] md:items-center md:px-10">
        <Link
          href={`/work/${banksphere.slug}#tour`}
          data-cursor="view"
          data-cursor-label="Watch"
          className="glow-card group flex items-center gap-5 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/60 md:p-5"
        >
          <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-surface-2 md:h-20 md:w-20">
            <Image src="/projects/banksphere/tour/presenter.jpg" alt="" fill sizes="80px" className="object-cover" />
            <span className="absolute inset-0 grid place-items-center bg-black/25">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-accent-ink transition-transform group-hover:scale-110">
                <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden><path d="M7 4v16l13-8z" fill="currentColor" /></svg>
              </span>
            </span>
          </span>
          <span>
            <span className="block font-display text-xl font-medium tracking-tight md:text-2xl">Watch the guided tour</span>
            <span className="mt-1 block text-base text-muted">10 short lessons · English &amp; اردو · AI presenter</span>
          </span>
          <span aria-hidden className="ml-auto text-accent transition-transform group-hover:translate-x-1">→</span>
        </Link>
        <Link
          href={`/work/${banksphere.slug}`}
          className="inline-flex items-center gap-2 justify-self-start rounded-full border border-line px-5 py-3 text-text transition-colors hover:border-text md:justify-self-end"
        >
          See all 8 features <span aria-hidden>→</span>
        </Link>
      </div>

      {/* Stack + video + CTA */}
      <div className="mx-auto max-w-[1440px] px-4 pb-24 sm:px-6 md:px-10 md:pb-32">
        <div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <ul className="flex flex-wrap gap-2" aria-label="BankSphere tech stack">
            {banksphere.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-[13px] text-muted">{s}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Link
                href={`/work/${banksphere.slug}`}
                data-cursor="view"
                data-cursor-label="Read"
                className="inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 text-text transition-colors hover:border-text"
              >
                Read the case study
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/#contact" className="inline-flex items-center gap-3 btn-glow rounded-full bg-accent px-6 py-3.5 font-medium text-accent-ink">
                Request a walkthrough <span aria-hidden>→</span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
