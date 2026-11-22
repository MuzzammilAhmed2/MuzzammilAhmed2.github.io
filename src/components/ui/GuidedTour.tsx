"use client";

import { useEffect, useRef, useState } from "react";
import { tourLessons, type TourLang } from "@/data/tour";

const src = (lang: TourLang, id: string, step: number) => `/projects/banksphere/tour/${lang}/${id}-${step + 1}.mp4`;

export default function GuidedTour() {
  const [lesson, setLesson] = useState(0);
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState<TourLang>("en");
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  const L = tourLessons[lesson];
  const total = tourLessons.reduce((n, l) => n + l.steps.length, 0);
  const position = tourLessons.slice(0, lesson).reduce((n, l) => n + l.steps.length, 0) + step + 1;

  // Load the current clip; keep playing across steps once the viewer has started.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.load();
    if (started) v.play().catch(() => setPlaying(false));
  }, [lesson, step, lang, started]);

  const go = (l: number, s = 0) => {
    setLesson(l);
    setStep(s);
  };

  const next = () => {
    if (step < L.steps.length - 1) setStep(step + 1);
    else if (lesson < tourLessons.length - 1) go(lesson + 1);
    else setPlaying(false);
  };

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (!started) return setStarted(true); // the effect loads and plays
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <div id="tour" className="scroll-mt-28">
      <div>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-accent">Guided tour</p>
            <h2 className="font-display text-3xl font-medium tracking-[-0.03em] md:text-4xl">Walk through BankSphere in 10 short lessons</h2>
            <p className="mt-3 max-w-2xl text-muted">
              Narrated by an AI presenter from the project&apos;s own reviewed tour script, in English and Urdu. All data in the product is synthetic.
            </p>
          </div>
          <div role="group" aria-label="Narration language" className="inline-flex rounded-full border border-line p-1 font-mono text-[13px]">
            {(["en", "ur"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`rounded-full px-4 py-2 transition-colors ${lang === l ? "bg-accent text-accent-ink" : "text-muted hover:text-text"}`}
              >
                {l === "en" ? "English" : "اردو"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* Lessons */}
          <ol className="grid content-start gap-1 sm:grid-cols-2 lg:grid-cols-1" aria-label="Tour lessons">
            {tourLessons.map((l, i) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === lesson ? "step" : undefined}
                  className={`group flex w-full items-baseline gap-4 rounded-xl border px-4 py-3 text-left transition-colors ${
                    i === lesson ? "border-accent/60 bg-surface" : "border-transparent hover:border-line"
                  }`}
                >
                  <span className={`font-mono text-[13px] ${i === lesson ? "text-accent" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={i === lesson ? "text-text" : "text-muted group-hover:text-text"}>{l.title.en}</span>
                  <span className="ml-auto whitespace-nowrap font-mono text-[13px] text-muted">{l.steps.length} clips</span>
                </button>
              </li>
            ))}
          </ol>

          {/* Player */}
          <div className="order-first self-start rounded-2xl border border-line bg-surface p-4 md:p-6 lg:sticky lg:top-24 lg:order-none">
            <div className="grid gap-6 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)] sm:items-start">
              <div className="relative overflow-hidden rounded-xl bg-surface-2">
                <video
                  ref={video}
                  className="aspect-square w-full object-cover"
                  poster="/projects/banksphere/tour/presenter.jpg"
                  preload="none"
                  playsInline
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={next}
                  aria-label={`${L.title.en}, part ${step + 1}`}
                >
                  <source src={src(lang, L.id, step)} type="video/mp4" />
                </video>
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? "Pause narration" : "Play narration"}
                  className="absolute inset-0 grid place-items-center bg-black/0 transition-colors hover:bg-black/20"
                >
                  {!playing && (
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-ink shadow-lg">
                      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden><path d="M7 4v16l13-8z" fill="currentColor" /></svg>
                    </span>
                  )}
                </button>
                <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-1 font-mono text-[13px] uppercase tracking-[0.12em] text-white">
                  AI presenter
                </span>
              </div>

              <div className="flex min-h-full flex-col">
                <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-muted">
                  Lesson {lesson + 1} · part {step + 1} of {L.steps.length}
                </p>
                <h3 className="mt-2 font-display text-2xl font-medium tracking-[-0.02em]" lang={lang} dir={lang === "ur" ? "rtl" : "ltr"}>
                  {L.title[lang]}
                </h3>
                <p
                  aria-live="polite"
                  lang={lang}
                  dir={lang === "ur" ? "rtl" : "ltr"}
                  className={`mt-4 text-pretty leading-relaxed text-text/90 ${lang === "ur" ? "text-lg leading-loose" : ""}`}
                >
                  {L.steps[step][lang]}
                </p>

                <div className="mt-auto flex items-center gap-3 pt-6">
                  <button
                    type="button"
                    onClick={() => (step > 0 ? setStep(step - 1) : lesson > 0 && go(lesson - 1, tourLessons[lesson - 1].steps.length - 1))}
                    disabled={lesson === 0 && step === 0}
                    className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:text-text disabled:opacity-40"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={position === total}
                    className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:text-text disabled:opacity-40"
                  >
                    Next →
                  </button>
                  <span className="ml-auto font-mono text-[13px] text-muted">
                    {position} / {total}
                  </span>
                </div>
                <div className="mt-3 h-px w-full bg-line" aria-hidden>
                  <div className="h-px origin-left bg-accent transition-transform duration-500" style={{ transform: `scaleX(${position / total})` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
