import type { ArchStage } from "@/data/content";

/**
 * A case study's architecture as real boxes and arrows: sources → ingestion → storage → model → consumers.
 * Text is HTML (not scaled SVG text), so it stays readable at every width. Columns stack on phones.
 */
export default function ArchitectureDiagram({ stages, hue, title }: { stages: ArchStage[]; hue: number; title: string }) {
  const c = `hsl(${hue} 85% var(--viz-l))`;
  return (
    <figure className="relative overflow-hidden rounded-3xl border border-line bg-surface p-4 sm:p-6 lg:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(80% 60% at 90% 0%, hsl(${hue} 85% 52% / 0.16), transparent 60%)` }}
      />
      <figcaption className="relative mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-mono text-[13px] uppercase tracking-[0.16em] text-muted">Architecture</span>
        <span className="sr-only">{title}: </span>
        <span className="font-mono text-[13px] text-muted">
          Data flows <span className="lg:hidden">top to bottom</span>
          <span className="hidden lg:inline">left to right</span>
        </span>
      </figcaption>
      <ol className="relative grid gap-3 lg:grid-cols-5 lg:gap-0">
        {stages.map((s, i) => (
          <li key={s.id} id={`stage-${s.id}`} className="relative flex flex-col lg:flex-row lg:items-stretch">
            <div className="flex-1 rounded-2xl border bg-bg/70 p-4" style={{ borderColor: `hsl(${hue} 85% 60% / 0.35)` }}>
              <p className="flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.12em]" style={{ color: c }}>
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[12px]" style={{ borderColor: c }}>
                  {i + 1}
                </span>
                {s.label}
              </p>
              <ul className="mt-3 space-y-1.5">
                {s.items.map((it) => (
                  <li key={it} className="text-[15px] leading-snug text-text">{it}</li>
                ))}
              </ul>
            </div>
            {i < stages.length - 1 && (
              <svg
                aria-hidden="true"
                focusable="false"
                className="mx-auto h-6 w-4 shrink-0 lg:mx-0 lg:my-auto lg:h-4 lg:w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke={c}
                strokeWidth="2"
              >
                {/* down arrow on phones, right arrow on desktop */}
                <path className="lg:hidden" d="M12 2v18m-6-6 6 6 6-6" />
                <path className="hidden lg:block" d="M2 12h18m-6-6 6 6-6 6" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
