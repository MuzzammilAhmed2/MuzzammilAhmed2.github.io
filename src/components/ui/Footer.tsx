import Link from "next/link";
import { site, nav } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-text">{n.label}</Link>
          ))}
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-text">LinkedIn ↗</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-text">GitHub ↗</a>
          <a href={`mailto:${site.email}`} className="normal-case tracking-normal hover:text-text">{site.email}</a>
          {site.cv && <a href={site.cv} download className="hover:text-text">CV ↓</a>}
        </nav>
      </div>
    </footer>
  );
}
