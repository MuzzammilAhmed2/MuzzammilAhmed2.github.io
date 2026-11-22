import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site, banksphere, plantmind, projects } from "@/data/content";
import { allWork, workBySlug } from "@/data/work";
import { banksphereMedia } from "@/lib/media";
import GuidedTour from "@/components/ui/GuidedTour";
import ProjectVisual from "@/components/ui/ProjectVisual";
import FeatureArt from "@/components/ui/FeatureArt";

export function generateStaticParams() {
  return allWork.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const w = workBySlug(slug);
  if (!w) return {};
  const description = slug === plantmind.slug
    ? "AI operations layer for manufacturing: cited answers from plant documents, live asset risk, human approval gates and a hash-linked audit trail."
    : slug === banksphere.slug
      ? "Governed AI for KYC and compliance in banking: ID-card OCR, watchlist screening and risk scoring, with an officer making every final call."
      : projects.find((p) => p.slug === slug)!.summary;
  const url = `/work/${slug}/`;
  const title = `${w.name} — ${site.name}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description, siteName: site.name, images: [{ url: `/og/${slug}.png`, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [`/og/${slug}.png`] },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line pt-10 md:grid-cols-[280px_1fr] md:gap-12">
      <h2 className="font-display text-2xl font-medium">{title}</h2>
      <div>{children}</div>
    </section>
  );
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
      {stack.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tech stack">
          {stack.map((s) => (
            <li key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-[13px] text-muted">{s}</li>
          ))}
        </ul>
      )}
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
    return (
      <Shell
        kicker="Featured · Banking · KYC & compliance"
        title={banksphere.name}
        lead={`${banksphere.tagline} ID-card OCR, card checks, watchlist screening and a risk score decide approve / officer review / resubmit — with a human officer making every final call.`}
        stack={banksphere.stack}
        next={{ href: `/work/${plantmind.slug}`, name: plantmind.name }}
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

  if (slug === plantmind.slug) {
    const first = projects[0];
    return (
      <Shell
        kicker={`Product · ${plantmind.sectors}`}
        title={plantmind.name}
        lead={`${plantmind.tagline} ${plantmind.lead}`}
        stack={plantmind.stack}
        next={{ href: `/work/${first.slug}`, name: first.name }}
      >
        <p className="mb-10 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-[13px] uppercase tracking-[0.14em] text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-2" aria-hidden />
          {plantmind.honesty}
        </p>

        <div className="relative mb-12 aspect-[16/10] overflow-hidden rounded-3xl border border-white/15 bg-surface shadow-[var(--stage-shadow)]">
          <Image src={`/projects/plantmind/${plantmind.showcase[0].media}`} alt={`PlantMind — ${plantmind.showcase[0].title}`} fill priority sizes="(min-width: 1440px) 1360px, 100vw" className="object-cover object-left-top" />
        </div>

        <ul aria-label="PlantMind in numbers" className="mb-24 grid grid-cols-2 gap-3 md:grid-cols-4">
          {plantmind.facts.map((f) => (
            <li key={f.label} className="rounded-2xl border border-line bg-surface/60 p-5">
              <span className="block font-display text-4xl font-medium tracking-tight md:text-5xl">{f.value}</span>{" "}
              <span className="mt-2 block text-base text-muted">{f.label}</span>
            </li>
          ))}
        </ul>

        <section aria-labelledby="pm-problem" className="mb-24 grid gap-8 md:grid-cols-[280px_1fr]">
          <h2 id="pm-problem" className="font-display text-2xl font-medium">Why I built it</h2>
          <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted md:text-xl">
            <p>
              Mid-size manufacturers in Pakistan, the GCC and South Asia rarely get AI built for them. Enterprise platforms are expensive, tied to one cloud and
              don&apos;t work where their teams already talk: WhatsApp.
            </p>
            <p className="text-text">
              PlantMind puts one private knowledge engine, one approval layer and one audit trail underneath every team, so an alert can travel from a sensor
              to an approved work order with the evidence attached at each step.
            </p>
          </div>
        </section>

        <div className="mb-24 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {plantmind.showcase.slice(1).map((f) => (
            <section key={f.id} aria-labelledby={`pm-${f.id}`}>
              <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface">
                <Image src={`/projects/plantmind/${f.media}`} alt={`PlantMind — ${f.title}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-left-top" />
              </div>
              <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-accent-2">{f.kicker}</p>
              <h2 id={`pm-${f.id}`} className="mt-2 font-display text-2xl font-medium tracking-tight md:text-3xl">{f.title}</h2>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-muted">{f.body}</p>
            </section>
          ))}
        </div>

        <section aria-labelledby="pm-modules" className="mb-24">
          <h2 id="pm-modules" className="mb-10 font-display text-3xl font-medium tracking-tight md:text-4xl">Modules on one shared core</h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {plantmind.modules.map((m) => (
              <li key={m.title} className="glow-card rounded-2xl border border-line bg-surface p-6">
                <h3 className="font-display text-xl font-medium tracking-tight">{m.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{m.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="pm-principles" className="grid gap-12 md:grid-cols-[280px_1fr]">
          <h2 id="pm-principles" className="font-display text-2xl font-medium">Engineering rules</h2>
          <ol className="space-y-8">
            {plantmind.principles.map((h, k) => (
              <li key={k} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-6">
                <span className="font-mono text-sm text-accent-2">{String(k + 1).padStart(2, "0")}</span>
                <p className="text-pretty text-lg leading-relaxed text-text md:text-xl">{h}</p>
              </li>
            ))}
          </ol>
        </section>
        <p className="mt-16 text-base text-muted">All records, documents and telemetry in the demo are clearly labelled synthetic. No real plant or customer data is used.</p>
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
      stack={[]}
      next={i === projects.length - 1 ? { href: `/work/${banksphere.slug}`, name: banksphere.name } : { href: `/work/${nxt.slug}`, name: nxt.name }}
    >
      <div className="relative mb-20 aspect-[16/8] overflow-hidden rounded-3xl border border-line">
        <ProjectVisual p={p} />
      </div>
      <div className="space-y-16 md:space-y-20">
        <Block title="Context">
          <p className="text-pretty text-lg leading-relaxed text-text md:text-xl">{p.context}</p>
        </Block>
        <Block title="My role">
          <p className="text-pretty text-lg leading-relaxed text-text md:text-xl">{p.role}</p>
        </Block>
        <Block title="What I built">
          <ol className="space-y-6">
            {p.highlights.map((h, k) => (
              <li key={k} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-6 first:border-t-0 first:pt-0">
                <span className="font-mono text-sm text-accent">{String(k + 1).padStart(2, "0")}</span>
                <p className="text-pretty text-lg leading-relaxed text-text md:text-xl">{h}</p>
              </li>
            ))}
          </ol>
        </Block>
        <Block title="Stack">
          <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
            {p.stack.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1.5 font-mono text-[13px] text-muted">{t}</li>
            ))}
          </ul>
        </Block>
        <Block title="Outcome">
          <ul className="space-y-4">
            {p.outcome.map((o) => (
              <li key={o} className="flex gap-3 text-pretty text-lg leading-relaxed text-text md:text-xl">
                <span aria-hidden className="mt-1 text-accent-2">✦</span>
                {o}
              </li>
            ))}
          </ul>
        </Block>
      </div>
      {!p.academic && (
        <p className="mt-16 text-base text-muted">Client work delivered at Innolytix. Described by sector to respect client confidentiality.</p>
      )}
    </Shell>
  );
}
