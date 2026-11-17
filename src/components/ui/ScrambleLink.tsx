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

  const run = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    let frame = 0;
    const total = text.length * 2.5;
    const step = () => {
      el.textContent = text
        .split("")
        .map((ch, i) => (ch === " " || i * 2.5 < frame ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
        .join("");
      if (frame++ < total) raf.current = requestAnimationFrame(step);
      else el.textContent = text;
    };
    step();
  };

  const inner = (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden className="inline-block">
        {text}
      </span>
    </>
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
