/** Drifting coloured glows behind a section. Purely decorative; transform-only CSS animation. */
export default function Ambient({ variant = "a" }: { variant?: "a" | "b" | "c" }) {
  const spots = {
    a: [
      { cls: "blob-a -left-[10%] top-[5%] h-[38vmax] w-[38vmax]", c: "--aura-violet", o: 0.3 },
      { cls: "blob-b -right-[12%] bottom-[0%] h-[34vmax] w-[34vmax]", c: "--aura-blue", o: 0.26 },
    ],
    b: [
      { cls: "blob-b -right-[8%] top-[10%] h-[40vmax] w-[40vmax]", c: "--aura-pink", o: 0.24 },
      { cls: "blob-a -left-[14%] bottom-[5%] h-[36vmax] w-[36vmax]", c: "--aura-orange", o: 0.2 },
    ],
    c: [
      { cls: "blob-a left-[20%] -top-[10%] h-[42vmax] w-[42vmax]", c: "--aura-blue", o: 0.24 },
      { cls: "blob-b right-[10%] -bottom-[15%] h-[40vmax] w-[40vmax]", c: "--aura-pink", o: 0.24 },
    ],
  }[variant];
  return (
    <div aria-hidden data-ambient className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {spots.map((s, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${s.cls}`}
          style={{ background: `radial-gradient(circle at center, rgb(var(${s.c}) / ${s.o}), transparent 65%)` }}
        />
      ))}
    </div>
  );
}
