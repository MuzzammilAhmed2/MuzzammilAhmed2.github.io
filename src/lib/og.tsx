import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/content";

// Share images (Open Graph + Twitter), rendered at build time in the site theme and fonts.
export const ogSize = { width: 1200, height: 630 };

const font = (pkg: string, file: string) => fs.readFileSync(path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

export function renderOg({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  const long = title.length > 38;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#050507",
          backgroundImage:
            "radial-gradient(circle at 88% 8%, rgba(40,110,255,0.55), transparent 45%), radial-gradient(circle at 70% 105%, rgba(34,200,238,0.35), transparent 45%), radial-gradient(circle at 0% 100%, rgba(255,115,35,0.28), transparent 38%)",
          color: "#f7f7f8",
          fontFamily: "Grotesk",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              border: "3px solid #5b9dff",
              backgroundColor: "#111117",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            MA
          </div>
          <div style={{ fontFamily: "Mono", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#22d3ee" }}>{kicker}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: long ? 68 : 92, fontWeight: 500, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>{title}</div>
          {sub && <div style={{ fontSize: 32, color: "#bdbdca", lineHeight: 1.3, maxWidth: 980 }}>{sub}</div>}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, color: "#bdbdca" }}>
          <div style={{ display: "flex", color: "#f7f7f8", fontWeight: 500 }}>{site.name}</div>
          <div style={{ display: "flex", fontFamily: "Mono", fontSize: 20 }}>{site.url.replace(/^https?:\/\//, "")}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Grotesk", data: font("space-grotesk", "space-grotesk-latin-500-normal.woff"), weight: 500, style: "normal" },
        { name: "Grotesk", data: font("space-grotesk", "space-grotesk-latin-700-normal.woff"), weight: 700, style: "normal" },
        { name: "Mono", data: font("jetbrains-mono", "jetbrains-mono-latin-500-normal.woff"), weight: 500, style: "normal" },
      ],
    },
  );
}
