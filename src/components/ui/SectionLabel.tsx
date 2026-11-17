export default function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
      <span className="text-accent">{index}</span>
      <span className="h-px w-8 bg-line" aria-hidden />
      {children}
    </p>
  );
}
