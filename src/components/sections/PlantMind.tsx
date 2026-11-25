"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { plantmind } from "@/data/content";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import Magnetic from "@/components/ui/Magnetic";
import Ambient from "@/components/ui/Ambient";
import ProductLinks from "@/components/ui/ProductLinks";

const shots = plantmind.showcase;
const STEP_MS = 6500;

/** Second flagship: a product console that cycles through real PlantMind screens. */
export default function PlantMind() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  const running = visible && !paused && !reduced;
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % shots.length), STEP_MS);
    return () => window.clearTimeout(id);
  }, [running, active]);

  return (
    <section ref={root} id="plantmind" aria-labelledby="pm-title" className="relative isolate overflow-hidden border-b border-line">
      <Ambient variant="b" />
      <div className="mx-auto max-w-[1440px] px-4 pt-20 sm:px-6 md:px-10 md:pt-28">
        <SectionLabel index="03">New product</SectionLabel>
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-[13px] uppercase tracking-[0.2em] text-accent-2">{plantmind.sectors}</p>
            <RevealText as="h2" by="chars" className="font-display text-[clamp(3rem,8.4vw,8.25rem)] font-medium leading-[0.88] tracking-[-0.045em]">
              PlantMind
            </RevealText>
            <span id="pm-title" className="sr-only">PlantMind — AI operations layer for manufacturing</span>
          </div>
          <div className="space-y-5">
            <p className="text-pretty text-lg leading-relaxed text-muted md:text-xl">
              <span className="text-text">{plantmind.tagline}</span> {plantmind.lead}
            </p>
            <ProductLinks product={plantmind} />
          </div>
        </div>

        {/* Digital thread: the cross-module flow the product is built around */}
        <ol aria-label="How one alert flows through PlantMind" className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0">
          {plantmind.thread.map((step, i) => (
            <li key={step} className="relative flex items-center gap-3 md:pr-6">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-[13px] text-accent-2">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-base font-medium tracking-tight md:text-lg">{step}</span>
              {i < plantmind.thread.length - 1 && (
                <svg className="ml-auto hidden h-2 flex-1 md:block" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden>
                  <path d="M0 4 H100" stroke="rgb(var(--accent-2-rgb) / 0.7)" strokeWidth="1.5" strokeDasharray="4 8" className="flow-dash" vectorEffect="non-scaling-stroke" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </div>

      {/* Product console */}
      <div
        className="mx-auto mt-12 grid max-w-[1440px] gap-6 px-4 sm:px-6 md:px-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.6fr)] lg:gap-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div role="tablist" aria-label="PlantMind screens" aria-orientation="vertical" className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 lg:flex-col lg:overflow-visible">
          {shots.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.id}
                role="tab"
                id={`pm-tab-${s.id}`}
                aria-selected={on}
                aria-controls="pm-stage"
                onClick={() => setActive(i)}
                className={`group relative w-[78%] shrink-0 snap-start overflow-hidden rounded-2xl border px-5 py-4 text-left transition-[border-color,background-color] duration-500 sm:w-[46%] lg:w-auto ${
                  on ? "border-[color:rgb(var(--accent-2-rgb)/0.45)] bg-surface" : "border-line bg-surface/40 hover:bg-surface/70"
                }`}
              >
                <span className="font-mono text-[13px] uppercase tracking-[0.18em] text-accent-2">{s.kicker}</span>
                <span className="mt-1 block font-display text-lg font-medium tracking-tight xl:text-xl">{s.title}</span>
                <span className={`block text-base leading-[1.6] text-muted lg:transition-[max-height,opacity] lg:duration-500 ${on ? "mt-2 opacity-100 lg:max-h-40" : "mt-2 lg:mt-0 lg:max-h-0 lg:opacity-0"}`}>
                  {s.body}
                </span>
                {/* progress bar for the auto-advance */}
                <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-line">
                  {on && (
                    <span
                      key={`${active}-${running}`}
                      className="block h-full origin-left bg-accent-2"
                      style={{ animation: running ? `pm-progress ${STEP_MS}ms linear both` : undefined, transform: running ? undefined : "scaleX(1)" }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div id="pm-stage" role="tabpanel" aria-labelledby={`pm-tab-${shots[active].id}`} className="relative">
          <div aria-hidden className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_60%_40%,rgb(var(--accent-2-rgb)/0.18),transparent_70%)]" />
          <div className="overflow-hidden rounded-3xl border border-white/15 bg-surface shadow-[var(--stage-shadow)]">
            <div className="flex items-center gap-2 border-b border-line px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent-2/70" />
              <span className="ml-3 truncate font-mono text-[13px] text-muted">plantmind / {shots[active].id}</span>
              <span className="ml-auto font-mono text-[13px] tabular-nums text-muted">
                {String(active + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
              </span>
            </div>
            <div className="relative aspect-[16/10]">
              {shots.map((s, i) => (
                <div
                  key={s.id}
                  aria-hidden={i !== active}
                  className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
                    i === active ? "scale-100 opacity-100" : "scale-[1.02] opacity-0"
                  }`}
                >
                  <Image
                    src={`/projects/plantmind/${s.media}`}
                    alt={`PlantMind — ${s.title}`}
                    fill
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    className="object-cover object-left-top"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Facts + CTA */}
      <div className="mx-auto max-w-[1440px] px-4 pb-24 pt-14 sm:px-6 md:px-10 md:pb-32">
        <ul aria-label="PlantMind in numbers" className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {plantmind.facts.map((f) => (
            <li key={f.label} className="glow-card rounded-2xl border border-line bg-surface/60 p-5">
              <span className="block font-display text-4xl font-medium tracking-tight md:text-5xl">{f.value}</span>{" "}
              <span className="mt-2 block text-base text-muted">{f.label}</span>
            </li>
          ))}
        </ul>
        <div className="mt-12 grid gap-10 border-t border-line pt-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <ul className="flex flex-wrap gap-2" aria-label="PlantMind tech stack">
            {plantmind.stack.map((s) => (
              <li key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-[13px] text-muted">{s}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Link
                href={`/work/${plantmind.slug}`}
                data-cursor="view"
                data-cursor-label="Read"
                className="inline-flex items-center gap-3 rounded-full border border-line px-6 py-3.5 text-text transition-colors hover:border-text"
              >
                Read the case study
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
