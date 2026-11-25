"use client";

import Link from "next/link";
import type { ProductLinks as Links } from "@/data/content";
import { contactHref, prefillContact } from "@/lib/contact-prefill";

type Product = {
  links: Links;
  honesty: string;
  walkthrough: string;
  demoNote?: string;
};

const primary =
  "btn-glow inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 py-3 font-medium text-accent-ink transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";
const secondary =
  "inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface/60 px-5 py-3 text-text transition-colors hover:border-text focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

/**
 * The buttons that let a visitor open a product: live demo, code, video.
 * A button renders only when its link exists. With no public repo, "Code walkthrough on request"
 * opens the contact form with the product prefilled.
 */
export default function ProductLinks({ product, size = "md", className = "" }: { product: Product; size?: "sm" | "md"; className?: string }) {
  const { links, honesty, walkthrough, demoNote } = product;
  const text = size === "sm" ? "text-[15px]" : "text-base";
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex flex-wrap items-center gap-3">
        {links.demo && (
          <a href={links.demo} target="_blank" rel="noopener" className={`${primary} ${text}`}>
            Open live demo <span aria-hidden>↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
        {links.repo && (
          <a href={links.repo} target="_blank" rel="noopener" className={`${secondary} ${text}`}>
            View code <span aria-hidden>↗</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
        {links.video && (
          <Link href={links.video} className={`${secondary} ${text}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden focusable="false"><path d="M7 4v16l13-8z" fill="currentColor" /></svg>
            Watch the 90-second demo
          </Link>
        )}
        {!links.repo && (
          <Link href={contactHref(walkthrough)} onClick={() => prefillContact(walkthrough)} className={`${secondary} ${text}`}>
            Code walkthrough on request <span aria-hidden>→</span>
          </Link>
        )}
      </div>
      <p className="flex items-baseline gap-2 font-mono text-[13px] uppercase leading-relaxed tracking-[0.12em] text-muted">
        <span className="h-1.5 w-1.5 shrink-0 -translate-y-0.5 rounded-full bg-accent" aria-hidden />
        <span>
          {honesty}
          {links.demo && demoNote ? `. ${demoNote}` : ""}
        </span>
      </p>
    </div>
  );
}
