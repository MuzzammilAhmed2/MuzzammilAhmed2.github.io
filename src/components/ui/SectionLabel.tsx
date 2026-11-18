export default function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="mb-6 flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.2em] text-muted">
      <span className="font-medium text-accent-2">{index}</span>
      <span className="h-px w-8 bg-gradient-to-r from-accent-2 to-accent" aria-hidden />
      {children}
    </p>
  );
}
