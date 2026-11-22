import type { MetadataRoute } from "next";
import { site, banksphere, plantmind, projects } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/work/${banksphere.slug}/`, lastModified: now, priority: 0.9 },
    { url: `${site.url}/work/${plantmind.slug}/`, lastModified: now, priority: 0.9 },
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}/`, lastModified: now, priority: 0.7 })),
  ];
}

export const dynamic = "force-static";
