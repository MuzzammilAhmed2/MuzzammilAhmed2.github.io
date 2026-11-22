import { banksphere, plantmind, projects } from "@/data/content";

/** Every /work/[slug] page in one list: used for static params, metadata and share images. */
export const allWork = [
  { slug: banksphere.slug, name: banksphere.name, sector: "Banking · KYC & compliance", summary: banksphere.tagline },
  { slug: plantmind.slug, name: plantmind.name, sector: "Manufacturing · AI operations", summary: plantmind.tagline },
  ...projects.map((p) => ({ slug: p.slug, name: p.name, sector: p.academic ? `Academic · ${p.sector}` : p.sector, summary: p.summary })),
];

export const workBySlug = (slug: string) => allWork.find((w) => w.slug === slug);
