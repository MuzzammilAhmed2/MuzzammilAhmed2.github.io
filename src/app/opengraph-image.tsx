import { ImageResponse } from "next/og";

export const alt = "Muzzammil Ahmed — Data Engineer · BI Developer · Data & AI Consultant";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0b0d10",
          backgroundImage: "radial-gradient(circle at 15% 20%, rgba(46,230,197,0.28), transparent 45%), radial-gradient(circle at 90% 80%, rgba(108,140,255,0.25), transparent 45%)",
          color: "#e8ecef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#2ee6c5" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#2ee6c5" }} />
          Available for freelance & full-time
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>Muzzammil Ahmed</div>
          <div style={{ fontSize: 38, marginTop: 24, color: "#8f9aa5" }}>Data Engineer · BI Developer · Data & AI Consultant</div>
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 21, color: "#e8ecef" }}>
          {["Microsoft Fabric", "Azure", "Power BI", "Snowflake", "GenAI / RAG", "DP-700", "PL-300"].map((t) => (
            <div key={t} style={{ display: "flex", border: "1px solid #222a33", borderRadius: 999, padding: "8px 16px" }}>{t}</div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

export const dynamic = "force-static";
