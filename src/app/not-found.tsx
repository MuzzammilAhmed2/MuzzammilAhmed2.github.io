import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Page not found — Muzzammil Ahmed" },
  robots: { index: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80svh] max-w-[1440px] flex-col justify-center px-4 sm:px-6 md:px-10">
      <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-accent">404 · Row not found</p>
      <h1 className="mt-4 font-display text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.9] tracking-[-0.04em]">This page left the pipeline.</h1>
      <Link href="/" className="mt-10 inline-flex w-fit btn-glow rounded-full bg-accent px-6 py-3 font-medium text-accent-ink">Back home</Link>
    </section>
  );
}
