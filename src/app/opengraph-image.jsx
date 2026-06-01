import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div style={{
      background: "#1A1A2E",
      width: "1200px",
      height: "630px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px",
    }}>
      <div style={{
        color: "#F7FAF8",
        fontSize: 80,
        fontWeight: "900",
        textAlign: "center",
        lineHeight: 1.2,
        letterSpacing: "-1px",
      }}>
        Star India Accreditation
      </div>
      <div style={{
        color: "#9CA3AF",
        fontSize: 36,
        marginTop: 30,
        textAlign: "center",
        letterSpacing: "2px",
      }}>
        BIS • EPR • WPC • TEC • LMPC • BEE • ISO • CDSCO
      </div>
      <div style={{
        color: "#4ADE80",
        fontSize: 30,
        marginTop: 40,
        fontWeight: "600",
        letterSpacing: "1px",
      }}>
        12+ Years | 10,000+ Clients | 0% Failure Rate
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}