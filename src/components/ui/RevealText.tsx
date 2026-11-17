"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap, MOTION_OK } from "@/lib/gsap";

type Props = {
  as?: "h1" | "h2" | "h3" | "p";
  children: string;
  className?: string;
  /** "scroll" reveals when scrolled into view; "manual" waits for `play` to become true */
  mode?: "scroll" | "manual";
  play?: boolean;
  by?: "words" | "chars";
  delay?: number;
};

/** SplitType + GSAP line-masked reveal. Text is fully readable without JS or with reduced motion. */
export default function RevealText({ as: Tag = "h2", children, className, mode = "scroll", play = true, by = "words", delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const split = useRef<SplitType | null>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      split.current = new SplitType(el, { types: `lines,${by}`, lineClass: "split-line" });
      const targets = by === "chars" ? split.current.chars : split.current.words;
      gsap.set(targets, { yPercent: 110 });
      tween.current = gsap.to(targets, {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: by === "chars" ? 0.018 : 0.045,
        delay,
        paused: true,
        onComplete: () => split.current?.revert(),
        ...(mode === "scroll" ? { scrollTrigger: { trigger: el, start: "top 85%", once: true } } : {}),
      });
      if (mode === "scroll") tween.current.paused(false);
      return () => {
        tween.current?.scrollTrigger?.kill();
        tween.current?.kill();
        split.current?.revert();
      };
    });
    return () => mm.revert();
  }, [by, mode, delay]);

  useEffect(() => {
    if (mode === "manual" && play) tween.current?.play();
  }, [mode, play]);

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {children}
    </Tag>
  );
}
