import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site, banksphere, plantmind, projects } from "@/data/content";
import { allWork, workBySlug } from "@/data/work";
import { banksphereMedia } from "@/lib/media";
import GuidedTour from "@/components/ui/GuidedTour";
import ArchitectureDiagram from "@/components/ui/ArchitectureDiagram";
import FeatureArt from "@/components/ui/FeatureArt";
import ProductLinks from "@/components/ui/ProductLinks";

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
  const title = `${w.name} | ${site.name}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description, siteName: site.name, images: [{ url: `/og/${slug}.png`, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [`/og/${slug}.png`] },
  };
}

function DiagramTag() {
  return (
    <span className="absolute bottom-3 right-3 rounded-full border border-line bg-bg/80 px-2.5 py-1 font-mono text-[12px] uppercase tracking-[0.14em] text-muted">
      Diagram
    </span>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line pt-10 md:grid-cols-[280px_1fr] md:gap-12">
      <h2 className="font-display text-2xl font-medium">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function Footer({ next }: { next: { href: string; name: string } }) {
  return (
    <>
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
      <Link href="/#work" className="mt-12 inline-flex min-h-11 items-center gap-2 font-mono text-[13px] uppercase tracking-[0.18em] text-muted hover:text-text">
        <span aria-hidden>←</span> Back to all work
      </Link>
    </>
  );
}

function Shell({
  kicker,
  title,
  pitch,
  actions,
  lead,
  stack,
  next,
  children,
}: {
  kicker: string;
  title: string;
  /** One line, shown with the action buttons above the fold. */
  pitch?: string;
  actions?: React.ReactNode;
  lead: string;
  stack: string[];
  next: { href: string; name: string };
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-4 pb-24 pt-28 sm:px-6 md:px-10 md:pt-36">
      <Link href="/#work" className="mb-8 inline-flex min-h-6 items-center gap-2 py-2 font-mono pointer-coarse:min-h-11 text-[13px] uppercase tracking-[0.18em] text-muted hover:text-text">
        <span aria-hidden>←</span> All work
      </Link>
      <p className="mb-5 font-mono text-[13px] uppercase tracking-[0.2em] text-accent">{kicker}</p>
      <h1 className="max-w-5xl font-display text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-balance">{title}</h1>
      {pitch && <p className="mt-5 max-w-3xl text-pretty text-xl leading-snug text-text md:text-2xl">{pitch}</p>}
      {actions && <div className="mt-6">{actions}</div>}
      <p className="mt-8 max-w-3xl text-pretty text-lg leading-relaxed text-muted md:text-xl">{lead}</p>
      {stack.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tech stack">
          {stack.map((s) => (
            <li key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-[13px] text-muted">{s}</li>
          ))}
        </ul>
      )}
      <div className="mt-16 md:mt-24">{children}</div>

      <Footer next={next} />
    </article>
  );
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === banksphere.slug) {
    const files = [...banksphere.features.flatMap((f) => (f.media ? [f.media] : [])), banksphere.video];
    const media = banksphereMedia(files);
    return (
      <Shell
        kicker="Featured · Banking · KYC & compliance"
        title={banksphere.name}
        pitch={banksphere.tagline}
        actions={<ProductLinks product={banksphere} />}
        lead={`ID-card OCR, card checks, watchlist screening and a risk score decide approve, officer review or resubmit. A human officer makes every final call.`}
        stack={banksphere.stack}
        next={{ href: `/work/${plantmind.slug}`, name: plantmind.name }}
      >

        {media[banksphere.video] && (
          <div id="demo" className="relative mb-20 aspect-video scroll-mt-28 overflow-hidden rounded-3xl border border-line bg-surface">
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
                  <Image src={`/projects/banksphere/${f.media}`} alt={`BankSphere AI: ${f.title}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-left-top" />
                ) : (
                  <div className="absolute inset-0 p-6">
                    <FeatureArt art={f.art} />
                    <DiagramTag />
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
        pitch={plantmind.tagline}
        actions={<ProductLinks product={plantmind} />}
        lead={plantmind.lead}
        stack={plantmind.stack}
        next={{ href: `/work/${first.slug}`, name: first.name }}
      >

        <div className="relative mb-12 aspect-[16/10] overflow-hidden rounded-3xl border border-white/15 bg-surface shadow-[var(--stage-shadow)]">
          <Image src={`/projects/plantmind/${plantmind.showcase[0].media}`} alt={`PlantMind: ${plantmind.showcase[0].title}`} fill priority sizes="(min-width: 1440px) 1360px, 100vw" className="object-cover object-left-top" />
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
                <Image src={`/projects/plantmind/${f.media}`} alt={`PlantMind: ${f.title}`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-left-top" />
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
  const next = i === projects.length - 1 ? { href: `/work/${banksphere.slug}`, name: banksphere.name } : { href: `/work/${nxt.slug}`, name: nxt.name };
  const stageNo = (id: string) => p.architecture.findIndex((s) => s.id === id) + 1;
  const glance: [string, string | undefined][] = [
    ["Sector", p.academic ? `Academic · ${p.sector}` : p.sector],
    ["My role", p.academic ? "Sole developer (final-year project)" : "Data Engineer / BI Developer, Innolytix"],
    ["Team", p.team],
    ["Duration", p.duration],
  ];

  return (
    <article className="mx-auto max-w-[1440px] 2xl:max-w-[1600px] px-4 pb-24 pt-28 sm:px-6 md:px-10 md:pt-36">
      <Link href="/#work" className="mb-8 inline-flex min-h-6 items-center gap-2 py-2 font-mono pointer-coarse:min-h-11 text-[13px] uppercase tracking-[0.18em] text-muted hover:text-text">
        <span aria-hidden>←</span> All work
      </Link>

      {/* Hero: story on the left, "At a glance" on the right */}
      <header className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:gap-16">
        <div>
          <p className="mb-5 font-mono text-[13px] uppercase tracking-[0.2em] text-accent">{p.index} · {p.sector}</p>
          <h1 className="font-display text-[clamp(2.3rem,5.6vw,5rem)] font-medium leading-[0.98] tracking-[-0.035em] text-balance">{p.name}</h1>
          <p className="mt-6 max-w-3xl text-pretty text-xl leading-snug text-text md:text-2xl">{p.result}</p>
          <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-muted">{p.role}</p>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tech stack">
            {p.stack.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1.5 font-mono text-[13px] text-muted">{t}</li>
            ))}
          </ul>
        </div>
        <aside aria-labelledby="glance" className="h-fit rounded-3xl border border-line bg-surface/80 p-6 lg:mt-10">
          <h2 id="glance" className="font-mono text-[13px] uppercase tracking-[0.16em] text-muted">At a glance</h2>
          <dl className="mt-5 space-y-4">
            {glance.filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="border-t border-line pt-4 first:border-t-0 first:pt-0">
                <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">{k}</dt>
                <dd className="mt-1 text-pretty text-base leading-snug text-text">{v}</dd>
              </div>
            ))}
            <div className="border-t border-line pt-4">
              <dt className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Stack</dt>
              <dd className="mt-1 text-base leading-snug text-text">{p.stack.join(" · ")}</dd>
            </div>
          </dl>
        </aside>
      </header>

      <div className="mt-16 md:mt-20">
        <ArchitectureDiagram stages={p.architecture} hue={p.hue} title={`${p.name} architecture`} />
      </div>

      <div className="mt-16 space-y-16 md:mt-24 md:space-y-20">
        <Block title="The problem">
          <p className="max-w-3xl text-pretty text-lg leading-relaxed text-text md:text-xl">{p.problem}</p>
        </Block>
        <Block title="What I built">
          <ol className="space-y-6">
            {p.highlights.map((h, k) => (
              <li key={k} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line pt-6 first:border-t-0 first:pt-0">
                <span className="font-mono text-sm text-accent">{String(k + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-pretty text-lg leading-relaxed text-text md:text-xl">{h.text}</p>
                  <a href={`#stage-${h.stage}`} className="mt-2 inline-flex font-mono text-[13px] uppercase tracking-[0.12em] text-muted hover:text-accent">
                    Diagram step {stageNo(h.stage)} · {p.architecture[stageNo(h.stage) - 1].label}
                  </a>
                </div>
              </li>
            ))}
          </ol>
        </Block>
        {p.decisions && p.decisions.length > 0 && (
          <Block title="Key decisions">
            <ul className="space-y-5">
              {p.decisions.map((d) => (
                <li key={d} className="max-w-3xl border-l-2 border-accent/60 pl-5 text-pretty text-lg leading-relaxed text-text">{d}</li>
              ))}
            </ul>
          </Block>
        )}
        {p.hardProblem && (
          <Block title="Hard problem">
            <p className="max-w-3xl text-pretty text-lg leading-relaxed text-text md:text-xl">{p.hardProblem}</p>
          </Block>
        )}
        <Block title="Results">
          <ul className="space-y-4">
            {p.results.map((o) => (
              <li key={o} className="flex max-w-3xl gap-3 text-pretty text-lg leading-relaxed text-text md:text-xl">
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
      <Footer next={next} />
    </article>
  );
}
