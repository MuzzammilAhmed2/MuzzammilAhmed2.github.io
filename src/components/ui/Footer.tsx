import Link from "next/link";
import { site, nav } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1440px] 2xl:max-w-[1600px] flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-muted">
          © {new Date().getFullYear()} {site.name} · {site.location}
          <span className="mt-1 block normal-case tracking-normal">Content and CV © {site.name}. All rights reserved.</span>
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[13px] uppercase tracking-[0.18em] text-muted">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="inline-flex min-h-6 items-center py-1 hover:text-text pointer-coarse:min-h-11">{n.label}</Link>
          ))}
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center py-1 hover:text-text pointer-coarse:min-h-11">LinkedIn ↗</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center py-1 hover:text-text pointer-coarse:min-h-11">GitHub ↗</a>
          <a href={`mailto:${site.email}`} className="inline-flex min-h-6 items-center py-1 normal-case tracking-normal hover:text-text pointer-coarse:min-h-11">{site.email}</a>
          {site.cv && <a href={site.cv} download className="inline-flex min-h-6 items-center py-1 hover:text-text pointer-coarse:min-h-11">CV ↓</a>}
        </nav>
      </div>
    </footer>
  );
}
