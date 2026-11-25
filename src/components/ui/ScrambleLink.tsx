"use client";

import Link from "next/link";
import { useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/";

type Props = {
  href: string;
  text: string;
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

/** A link whose label scrambles and resolves on hover / keyboard focus. */
export default function ScrambleLink({ href, text, className, external, onClick }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);

  const label = useRef<HTMLSpanElement>(null);

  // The real label never changes: it is hidden while an aria-hidden overlay on top of it scrambles,
  // then shown again. Screen readers, find-in-page and copy always get the real text.
  const run = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    const real = label.current;
    if (!el || !real) return;
    cancelAnimationFrame(raf.current);
    let frame = 0;
    const total = text.length * 2.5;
    real.style.visibility = "hidden";
    const step = () => {
      el.textContent = text
        .split("")
        .map((ch, i) => (ch === " " || i * 2.5 < frame ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
        .join("");
      if (frame++ < total) raf.current = requestAnimationFrame(step);
      else {
        el.textContent = "";
        real.style.visibility = "";
      }
    };
    step();
  };

  const inner = (
    <span className="relative inline-block">
      <span ref={label}>{text}</span>
      <span ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 whitespace-nowrap" />
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} onPointerEnter={run} onFocus={run} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onPointerEnter={run} onFocus={run} onClick={onClick}>
      {inner}
    </Link>
  );
}
