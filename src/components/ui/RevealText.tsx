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
  /** One word/phrase in `children` to paint with the teal→violet gradient */
  accent?: string;
};

/** SplitType + GSAP line-masked reveal. Text is fully readable without JS or with reduced motion. */
export default function RevealText({ as: Tag = "h2", children, className, mode = "scroll", play = true, by = "words", delay = 0, accent }: Props) {
  const ref = useRef<HTMLElement>(null);
  const split = useRef<SplitType | null>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const playRef = useRef(play);
  playRef.current = play;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      let cancelled = false;
      let io: IntersectionObserver | null = null;
      const setup = () => {
      if (cancelled || split.current) return;
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
      else if (playRef.current) tween.current.play();
      };
      // Splitting measures layout, so do it once fonts are in and (for scroll reveals) only as the text nears the viewport.
      // The hero (manual) splits straight away, while the loader still covers it, so it never flashes.
      // Touch screens have no loader, so the hero headline is shown as-is for a fast first paint.
      if (mode === "manual" && window.matchMedia("(pointer: coarse)").matches) return;
      if (mode === "manual") setup();
      const fonts = document.fonts?.ready ?? Promise.resolve();
      if (mode === "scroll") fonts.then(() => {
        if (cancelled) return;
        io = new IntersectionObserver((entries) => {
          if (entries.some((e) => e.isIntersecting)) { io?.disconnect(); setup(); }
        }, { rootMargin: "0px 0px 30% 0px" });
        io.observe(el);
      });
      return () => {
        cancelled = true;
        io?.disconnect();
        tween.current?.scrollTrigger?.kill();
        tween.current?.kill();
        split.current?.revert();
        split.current = null;
      };
    });
    return () => mm.revert();
  }, [by, mode, delay]);

  useEffect(() => {
    if (mode === "manual" && play) tween.current?.play();
  }, [mode, play]);

  const at = accent ? children.indexOf(accent) : -1;
  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={className}>
      {at < 0 ? children : (
        <>
          {children.slice(0, at)}
          <span className="grad-text">{accent}</span>
          {children.slice(at + accent!.length)}
        </>
      )}
    </Tag>
  );
}
