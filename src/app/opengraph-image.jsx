import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div style={{
      background: "#1A1A2E",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px",
    }}>
      <div style={{ color: "#F7FAF8", fontSize: 64, fontWeight: "bold", textAlign: "center" }}>
        Star India Accreditation
      </div>
      <div style={{ color: "#9CA3AF", fontSize: 32, marginTop: 24, textAlign: "center" }}>
        BIS • EPR • WPC • TEC • LMPC • BEE • ISO • CDSCO
      </div>
      <div style={{ color: "#4ADE80", fontSize: 24, marginTop: 32 }}>
        12+ Years | 10,000+ Clients | 0% Failure Rate
      </div>
    </div>
  );
}