import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a fully static site (used for GitHub Pages). Vercel builds normally.
const isStatic = process.env.STATIC_EXPORT === "1";

// The "Download CV" links only render once the PDF exists in /public.
const hasCv = fs.existsSync(path.join(process.cwd(), "public", "Muzzammil-Ahmed-CV.pdf"));

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_HAS_CV: hasCv ? "1" : "" },
  ...(isStatic && { output: "export", images: { unoptimized: true }, trailingSlash: true }),
};

export default nextConfig;
