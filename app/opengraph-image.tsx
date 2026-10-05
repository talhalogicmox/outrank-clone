import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "DevPulse | Modern Dev Articles";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#090d16",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#f8fafc",
          position: "relative",
        }}
      >
        {/* Subtle decorative background gradient */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(9, 13, 22, 0) 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Brand header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span style={{ fontSize: "36px", fontWeight: "bold", letterSpacing: "-0.5px" }}>
            DevPulse
          </span>
        </div>

        {/* Hero title & tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
            }}
          >
            Stay Sharp. Build Better.
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#94a3b8",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            In-depth articles on Next.js, TypeScript, DevOps, Design, AI, and career growth.
          </div>
        </div>

        {/* Footer meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "20px",
            color: "#64748b",
          }}
        >
          <span>devpulse.example.com</span>
          <span>•</span>
          <span>By developers for developers</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
