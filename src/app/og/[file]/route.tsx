import { renderOg } from "@/lib/og";
import { site } from "@/data/content";
import { allWork, workBySlug } from "@/data/work";

// Pre-rendered share images at /og/<name>.png. A route (not opengraph-image.tsx) so the static
// export writes real .png files that GitHub Pages serves as image/png.
export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ file: "home.png" }, ...allWork.map((w) => ({ file: `${w.slug}.png` }))];
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const name = file.replace(/\.png$/, "");
  if (name === "home") {
    return renderOg({ kicker: "Data · BI · AI", title: site.heroLine, sub: `${site.role}. DP-700 & PL-300 certified.` });
  }
  const w = workBySlug(name);
  if (!w) return new Response("Not found", { status: 404 });
  return renderOg({ kicker: w.sector, title: w.name, sub: w.summary });
}
