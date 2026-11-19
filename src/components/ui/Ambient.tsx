/** Drifting coloured glows behind a section. Purely decorative; transform-only CSS animation. */
export default function Ambient({ variant = "a" }: { variant?: "a" | "b" | "c" }) {
  const spots = {
    a: [
      { cls: "blob-a -left-[10%] top-[5%] h-[38vmax] w-[38vmax]", c: "--accent-rgb", o: 0.22 },
      { cls: "blob-b -right-[12%] bottom-[0%] h-[34vmax] w-[34vmax]", c: "--accent-2-rgb", o: 0.16 },
    ],
    b: [
      { cls: "blob-b -right-[8%] top-[10%] h-[40vmax] w-[40vmax]", c: "--accent-3-rgb", o: 0.14 },
      { cls: "blob-a -left-[14%] bottom-[5%] h-[36vmax] w-[36vmax]", c: "--accent-rgb", o: 0.2 },
    ],
    c: [
      { cls: "blob-a left-[20%] -top-[10%] h-[42vmax] w-[42vmax]", c: "--accent-2-rgb", o: 0.14 },
      { cls: "blob-b right-[10%] -bottom-[15%] h-[40vmax] w-[40vmax]", c: "--accent-3-rgb", o: 0.14 },
    ],
  }[variant];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {spots.map((s, i) => (
        <div
          key={i}
          className={`absolute rounded-full will-change-transform ${s.cls}`}
          style={{ background: `radial-gradient(circle at center, rgb(var(${s.c}) / ${s.o}), transparent 65%)` }}
        />
      ))}
    </div>
  );
}
