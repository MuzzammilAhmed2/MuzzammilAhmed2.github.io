import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a fully static site (used for GitHub Pages). Vercel builds normally.
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStatic && { output: "export", images: { unoptimized: true }, trailingSlash: true }),
};

export default nextConfig;
