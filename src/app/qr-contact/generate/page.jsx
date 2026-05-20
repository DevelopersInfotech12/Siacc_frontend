"use client";
import Navbar from "@/app/Components/Navbar";
import { useEffect, useRef, useState } from "react";

// ── Change this to your live domain when deploying ───────────
const QR_URL = "https://siacc.co.in/qr-contact";
// ─────────────────────────────────────────────────────────────

function generateQRMatrix(url) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(url)}&color=0a6daa&bgcolor=ffffff&qzone=1&format=png&ecc=H`;
}

const font = "'Poppins', system-ui, sans-serif";

const T = {
    teal: "#1E88C8",
    titleblue: "#0a6daa",
    orange: "#F97316",
    white: "#FFFFFF",
    border: "#E2E8F0",
    slate: "#0D1B2A",
    muted: "#94A3B8",
    cream: "#F8FAFC",
    font,
};

export default function QRGeneratePage() {
    const [copied, setCopied] = useState(false);
    const [imgReady, setImgReady] = useState(false);
    const imgRef = useRef(null);

    const qrSrc = generateQRMatrix(QR_URL);

    function handleDownload() {
        if (!imgRef.current) return;

        const canvas = document.createElement("canvas");
        canvas.width = 420;
        // Reduced height since URL row is removed
        canvas.height = 490;
        const ctx = canvas.getContext("2d");

        // White background
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 420, 490);

        // Blue header
        ctx.fillStyle = "#0a6daa";
        ctx.fillRect(0, 0, 420, 72);
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.font = "bold 15px Arial";
        ctx.fillText("STAR INDIA ACCREDITATION (SIACC)", 210, 30);
        ctx.font = "13px Arial";
        ctx.fillText("Scan for Free Certification Consultation", 210, 54);

        // QR image — moved up slightly since URL row is gone
        const img = imgRef.current;
        ctx.drawImage(img, 70, 84, 280, 280);

        // Divider — sits directly below QR
        ctx.strokeStyle = "#E2E8F0";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, 374); ctx.lineTo(380, 374);
        ctx.stroke();

        // Contact info
        ctx.fillStyle = "#6B7280";
        ctx.font = "11px Arial";
        ctx.textAlign = "center";
        ctx.fillText("📞 +91-9540190334   |   ✉ starindia.acc@gmail.com", 210, 396);
        ctx.fillText("Mon – Sat: 9:00 AM – 6:00 PM", 210, 414);

        // Services strip
        ctx.fillStyle = "#1E88C8";
        ctx.fillRect(0, 432, 420, 58);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 11px Arial";
        ctx.fillText("BIS · ISI . WPC · TEC · BEE · EPR · LMPC · CDSCO · ISO", 210, 452);
        ctx.font = "10px Arial";
        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.fillText("0% Failure Rate  ·  1,000+ Businesses Certified", 210, 472);

        const link = document.createElement("a");
        link.download = "SIACC-Contact-QR.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }

    function handleCopy() {
        navigator.clipboard?.writeText(QR_URL);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div style={{
            minHeight: "100vh", background: T.cream,
            fontFamily: T.font, display: "flex",
            flexDirection: "column", alignItems: "center",
            justifyContent: "center", padding: "32px 16px",
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .dl-btn:hover  { opacity: 0.88 !important; transform: translateY(-1px); }
        .sec-btn:hover { background: ${T.cream} !important; border-color: ${T.teal} !important; color: ${T.teal} !important; }
      `}</style>

            <div style={{ width: "100%", maxWidth: 460, animation: "fadeIn 0.4s ease" }}>

                {/* Page title */}
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <h1 style={{ fontFamily: T.font, fontSize: 22, fontWeight: 800, color: T.slate, marginBottom: 6 }}>
                        SIACC Contact QR Code
                    </h1>
                    <p style={{ fontFamily: T.font, fontSize: 13, color: T.muted }}>
                        Print or share — scanning opens the contact enquiry form instantly.
                    </p>
                </div>

                {/* QR Card */}
                <div style={{
                    background: T.white, borderRadius: 20,
                    border: `1px solid ${T.border}`,
                    boxShadow: "0 8px 32px rgba(14,28,58,0.10)",
                    overflow: "hidden", marginBottom: 16,
                }}>
                    {/* Header band */}
                    <div style={{
                        background: `linear-gradient(135deg, ${T.titleblue}, ${T.teal})`,
                        padding: "18px 24px", textAlign: "center",
                    }}>
                        <div style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 3 }}>
                            ⭐ Star India Accreditation (SIACC)
                        </div>
                        <div style={{ fontFamily: T.font, fontSize: 12, color: "rgba(255,255,255,0.78)" }}>
                            Scan for Free Certification Consultation
                        </div>
                    </div>

                    {/* QR image */}
                    <div style={{ padding: "28px 24px 16px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{
                            padding: 14, borderRadius: 14,
                            border: `2px solid ${T.border}`,
                            background: "#fff", marginBottom: 14,
                            position: "relative",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                        }}>
                            {!imgReady && (
                                <div style={{
                                    position: "absolute", inset: 0, display: "flex",
                                    alignItems: "center", justifyContent: "center",
                                    fontFamily: T.font, fontSize: 12, color: T.muted,
                                    background: "#fff", borderRadius: 12,
                                }}>Generating QR…</div>
                            )}
                            <img
                                ref={imgRef}
                                src={qrSrc}
                                alt="SIACC Contact QR Code"
                                width={280}
                                height={280}
                                crossOrigin="anonymous"
                                onLoad={() => setImgReady(true)}
                                style={{
                                    display: "block", borderRadius: 8,
                                    opacity: imgReady ? 1 : 0,
                                    transition: "opacity 0.3s",
                                }}
                            />
                        </div>
                    </div>

                    {/* Stats strip */}
                    <div style={{
                        borderTop: `1px solid ${T.border}`,
                        padding: "14px 24px",
                        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                        gap: 8, textAlign: "center",
                    }}>
                        {[
                            { icon: "⚡", label: "Instant Form" },
                            { icon: "🔒", label: "Secure & Private" },
                            { icon: "⏱", label: "2-Hour Response" },
                        ].map(b => (
                            <div key={b.label}>
                                <div style={{ fontSize: 18 }}>{b.icon}</div>
                                <div style={{ fontFamily: T.font, fontSize: 11, color: T.muted, marginTop: 3 }}>{b.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <button
                        onClick={handleDownload}
                        disabled={!imgReady}
                        className="dl-btn"
                        style={{
                            padding: "14px", borderRadius: 12, border: "none",
                            background: imgReady
                                ? `linear-gradient(135deg, ${T.titleblue}, ${T.teal})`
                                : "#E2E8F0",
                            color: imgReady ? "#fff" : T.muted,
                            fontFamily: T.font, fontWeight: 700, fontSize: 14,
                            cursor: imgReady ? "pointer" : "default",
                            transition: "all 0.2s",
                            boxShadow: imgReady ? "0 4px 14px rgba(30,136,200,0.28)" : "none",
                        }}
                    >
                        ⬇ Download QR Code
                    </button>
                </div>
            </div>
        </div>
    );
}