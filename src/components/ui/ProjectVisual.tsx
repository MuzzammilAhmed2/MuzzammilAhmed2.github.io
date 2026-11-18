import type { Project } from "@/data/content";

/** Generated cover art: the project's data flow as a glowing pipeline. Not a screenshot. */
export default function ProjectVisual({ p }: { p: Project }) {
  const c = `hsl(${p.hue} 85% var(--viz-l))`;
  const n = p.nodes.length;
  return (
    <div className="absolute inset-0 overflow-hidden bg-surface-2">
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(120% 90% at 85% 10%, hsl(${p.hue} 80% 50% / 0.28), transparent 55%), radial-gradient(90% 70% at 0% 100%, hsl(${(p.hue + 40) % 360} 80% 55% / 0.16), transparent 60%)` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <svg viewBox="0 0 500 300" className="absolute inset-0 h-full w-full" aria-hidden>
        {p.nodes.map((label, i) => {
          const x = 80 + (i * 340) / (n - 1);
          const y = 150 + (i % 2 === 0 ? -34 : 34);
          const next = i < n - 1 ? { x: 80 + ((i + 1) * 340) / (n - 1), y: 150 + ((i + 1) % 2 === 0 ? -34 : 34) } : null;
          return (
            <g key={label}>
              {next && (
                <path
                  d={`M${x} ${y} C${(x + next.x) / 2} ${y} ${(x + next.x) / 2} ${next.y} ${next.x} ${next.y}`}
                  fill="none"
                  stroke={c}
                  strokeWidth="1.5"
                  strokeDasharray="4 8"
                  className="flow-dash"
                  opacity="0.8"
                />
              )}
              <circle cx={x} cy={y} r="9" fill="var(--bg)" stroke={c} strokeWidth="1.5" />
              <circle cx={x} cy={y} r="3" fill={c} />
              <text
                x={x}
                y={i % 2 === 0 ? y - 22 : y + 32}
                textAnchor="middle"
                fontSize="11"
                fill="var(--text)"
                fontFamily="var(--font-jetbrains)"
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="noise absolute inset-0 opacity-[0.06] mix-blend-overlay" />
    </div>
  );
}
