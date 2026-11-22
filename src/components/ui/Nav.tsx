"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/content";
import ScrambleLink from "./ScrambleLink";
import Magnetic from "./Magnetic";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last);
      setScrolled(y > 24);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled && !open ? "border-line bg-bg/75 backdrop-blur-xl" : "border-transparent bg-transparent"}`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 sm:px-6 md:px-10 md:py-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="sr-only">{site.name} — home</span>
            <span className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface font-display text-sm font-semibold text-text transition-colors group-hover:border-accent">
              MA
            </span>
            <span className="hidden font-mono text-[13px] uppercase tracking-[0.18em] text-muted sm:inline">
              Data · BI · AI
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 rounded-full border border-line bg-bg/70 px-2 py-1.5 backdrop-blur-md md:flex">
            {nav.map((n) => (
              <ScrambleLink
                key={n.href}
                href={n.href}
                text={n.label}
                className="inline-flex min-h-9 items-center rounded-full px-4 py-2 font-mono text-[13px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-text"
              />
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {site.cv && (
            <a
              href={site.cv}
              download
              className="rounded-full border border-line px-4 py-2.5 font-mono text-[13px] uppercase tracking-[0.16em] text-muted transition-colors hover:border-text hover:text-text"
            >
              CV ↓
            </a>
            )}
            <Magnetic>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 btn-glow rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-transform hover:scale-[1.03]"
              >
                Let&apos;s talk
                <span aria-hidden>→</span>
              </Link>
            </Magnetic>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-[60] grid h-11 w-11 place-items-center rounded-full border border-line bg-surface md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-px w-5 bg-text transition-transform duration-300 ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-5 bg-text transition-transform duration-300 ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      {open && (
          <div
            id="mobile-menu"
            className="menu-in fixed inset-0 z-[55] flex flex-col justify-between bg-bg px-6 pb-10 pt-28 md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {nav.map((n, i) => (
                <div key={n.href} className="menu-item-in" style={{ animationDelay: `${0.05 * i + 0.1}s` }}>
                  <Link href={n.href} onClick={() => setOpen(false)} className="font-display text-5xl font-medium tracking-tight">
                    {n.label}
                  </Link>
                </div>
              ))}
            </nav>
            <div className="space-y-2 font-mono text-sm text-muted">
              <a href={`mailto:${site.email}`} className="block break-all hover:text-accent">{site.email}</a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="block hover:text-accent">LinkedIn ↗</a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="block hover:text-accent">GitHub ↗</a>
              {site.cv && <a href={site.cv} download className="block hover:text-accent">Download CV ↓</a>}
            </div>
          </div>
      )}
    </>
  );
}
