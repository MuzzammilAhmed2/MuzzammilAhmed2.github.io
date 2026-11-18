import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { banksphere, projects } from "@/data/content";
import { banksphereMedia } from "@/lib/media";
import GuidedTour from "@/components/ui/GuidedTour";
import ProjectVisual from "@/components/ui/ProjectVisual";
import FeatureArt from "@/components/ui/FeatureArt";

export function generateStaticParams() {
  return [{ slug: banksphere.slug }, ...projects.map((p) => ({ slug: p.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === banksphere.slug) {
    return { title: banksphere.name, description: banksphere.tagline, alternates: { canonical: `/work/${slug}` } };
  }
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: p.summary, alternates: { canonical: `/work/${slug}` } };
}

function Shell({
  kicker,
  title,
  lead,
  stack,
  next,
  children,
}: {
  kicker: string;
  title: string;
  lead: string;
  stack: string[];
  next: { href: string; name: string };
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-[1440px] px-4 pb-24 pt-36 sm:px-6 md:px-10 md:pt-44">
      <Link href="/#work" className="mb-12 inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.18em] text-muted hover:text-text">
        <span aria-hidden>←</span> All work
      </Link>
      <p className="mb-5 font-mono text-[13px] uppercase tracking-[0.2em] text-accent">{kicker}</p>
      <h1 className="max-w-5xl font-display text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-balance">{title}</h1>
      <p className="mt-8 max-w-3xl text-pretty text-xl leading-relaxed text-muted md:text-2xl">{lead}</p>
      <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tech stack">
        {stack.map((s) => (
          <li key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-[13px] text-muted">{s}</li>
        ))}
      </ul>
      <div className="mt-16 md:mt-24">{children}</div>

      <div className="mt-24 grid gap-6 border-t border-line pt-12 md:grid-cols-2">
        <div>
          <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-muted">Want something like this?</p>
          <Link href="/#contact" className="mt-3 inline-flex items-center gap-3 font-display text-3xl font-medium text-text hover:text-accent md:text-4xl">
            Let&apos;s talk <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="md:text-right">
          <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-muted">Next project</p>
          <Link href={next.href} data-cursor="view" data-cursor-label="Next" className="mt-3 inline-block font-display text-2xl font-medium text-text hover:text-accent md:text-3xl">
            {next.name}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === banksphere.slug) {
    const files = [...banksphere.features.map((f) => f.media!), banksphere.video];
    const media = banksphereMedia(files);
    const first = projects[0];
    return (
      <Shell
        kicker="Featured · Banking · KYC & compliance"
        title={banksphere.name}
        lead={`${banksphere.tagline} ID-card OCR, card checks, watchlist screening and a risk score decide approve / officer review / resubmit — with a human officer making every final call.`}
        stack={banksphere.stack}
        next={{ href: `/work/${first.slug}`, name: first.name }}
      >
        <p className="mb-10 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {banksphere.honesty}
        </p>

        {media[banksphere.video] && (
          <div className="relative mb-20 aspect-video overflow-hidden rounded-3xl border border-line bg-surface">
            <video
              src={`/projects/banksphere/${banksphere.video}`}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
              aria-label="BankSphere AI screen recording"
            />
          </div>
        )}

        <div className="mb-20">
          <GuidedTour />
        </div>

        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {banksphere.features.map((f) => (
            <section key={f.id} aria-labelledby={`f-${f.id}`}>
              <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface">
                {f.media && media[f.media] ? (
                  <Image src={`/projects/banksphere/${f.media}`} alt={`BankSphere AI — ${f.title}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-left-top" />
                ) : (
                  <div className="absolute inset-0 p-6">
                    <FeatureArt art={f.art} />
                  </div>
                )}
              </div>
              <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-accent">{f.kicker}</p>
              <h2 id={`f-${f.id}`} className="mt-2 font-display text-2xl font-medium tracking-tight md:text-3xl">{f.title}</h2>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-muted">{f.body}</p>
            </section>
          ))}
        </div>
      </Shell>
    );
  }

  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) notFound();
  const p = projects[i];
  const nxt = projects[(i + 1) % projects.length];

  return (
    <Shell
      kicker={`${p.index} · ${p.sector}`}
      title={p.name}
      lead={p.description}
      stack={p.stack}
      next={i === projects.length - 1 ? { href: `/work/${banksphere.slug}`, name: banksphere.name } : { href: `/work/${nxt.slug}`, name: nxt.name }}
    >
      <div className="relative mb-20 aspect-[16/8] overflow-hidden rounded-3xl border border-line">
        <ProjectVisual p={p} />
      </div>
      <div className="grid gap-12 md:grid-cols-[280px_1fr]">
        <h2 className="font-display text-2xl font-medium">What I delivered</h2>
        <ol className="space-y-8">
          {p.highlights.map((h, k) => (
            <li key={k} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-6">
              <span className="font-mono text-sm text-accent">{String(k + 1).padStart(2, "0")}</span>
              <p className="text-pretty text-lg leading-relaxed text-text md:text-xl">{h}</p>
            </li>
          ))}
        </ol>
      </div>
      {p.sector !== "Final year project" && (
        <p className="mt-16 text-base text-muted">Client work delivered at Innolytix. Described by sector to respect client confidentiality.</p>
      )}
    </Shell>
  );
}
