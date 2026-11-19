/**
 * Aura-photo style haze: soft colour fields blended with `screen`, drifting slowly,
 * plus a rotating conic halo. Transform-only animation; no filters, so it stays cheap.
 */
export default function Aura({ halo = true, className = "" }: { halo?: boolean; className?: string }) {
  const fields = [
    { cls: "aura-1 left-[-15%] top-[-20%] h-[75vmax] w-[75vmax]", c: "--aura-pink", o: 0.55 },
    { cls: "aura-2 right-[-20%] top-[0%] h-[70vmax] w-[70vmax]", c: "--aura-blue", o: 0.5 },
    { cls: "aura-3 left-[10%] bottom-[-35%] h-[65vmax] w-[65vmax]", c: "--aura-orange", o: 0.42 },
    { cls: "aura-2 right-[15%] bottom-[-30%] h-[55vmax] w-[55vmax]", c: "--aura-violet", o: 0.45 },
  ];
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {fields.map((f, i) => (
        <div
          key={i}
          className={`absolute rounded-full mix-blend-screen will-change-transform ${f.cls}`}
          style={{ background: `radial-gradient(circle at center, rgb(var(${f.c}) / ${f.o}), rgb(var(${f.c}) / ${f.o * 0.35}) 35%, transparent 68%)` }}
        />
      ))}
      {halo && (
        <div className="absolute right-[-6%] top-1/2 hidden aspect-square w-[58vw] max-w-[900px] -translate-y-1/2 lg:block">
          <div className="aura-halo h-full w-full rounded-full will-change-transform" />
        </div>
      )}
    </div>
  );
}
