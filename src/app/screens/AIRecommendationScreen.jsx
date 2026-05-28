"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
const Footer = dynamic(() => import("../Components/Footer"));

const T = {
    teal: "#1E88C8",
    titleblue: "#0a6daa",
    orange: "#F97316",
    orangeDark: "#e8650a",
    tealLight: "#EBF5F5",
    cream: "#F8FAFC",
    white: "#FFFFFF",
    border: "#E2E8F0",
    slate: "#0D1B2A",
    body: "#374151",
    muted: "#94A3B8",
    green: "#22C55E",
    font: "'Poppins', 'system-ui', sans-serif",
};

const QUESTIONS = [
    {
        id: "product_type",
        text: "What type of product are you dealing with?",
        subtitle: "Select the category that best describes your product",
        icon: "📦",
        options: [
            "Electronics / IT Products",
            "Wireless / Bluetooth / Wi-Fi Device",
            "Telecom Equipment",
            "Home Appliance (AC, Fridge, Washing Machine…)",
            "Pre-Packaged Food / Consumer Goods",
            "Cosmetics / Personal Care",
            "Medical Device / Drug / Pharma",
            "IoT / Smart Home Device",
            "Industrial / Construction Material",
            "Other",
        ],
        freeText: true,
        placeholder: "Or type your product name here…",
    },
    {
        id: "activity",
        text: "What is your business activity?",
        subtitle: "Tell us your role in the supply chain",
        icon: "🏭",
        options: [
            "Importing into India",
            "Manufacturing in India",
            "Both Importing & Manufacturing",
            "Brand Owner / Reseller",
            "Exporting from India",
        ],
    },
    {
        id: "sell_channel",
        text: "Where will you sell your product?",
        subtitle: "Choose your primary sales channel",
        icon: "🛒",
        options: [
            "Retail stores (offline)",
            "E-commerce (Amazon, Flipkart etc.)",
            "B2B / Corporate clients",
            "Government tenders / PSUs",
            "All of the above",
        ],
    },
    {
        id: "wireless",
        text: "Does your product use any wireless technology?",
        subtitle: "This determines WPC-ETA and TEC requirements",
        icon: "📡",
        options: [
            "Yes — Wi-Fi",
            "Yes — Bluetooth",
            "Yes — RF / Zigbee / Z-Wave",
            "Yes — Multiple wireless technologies",
            "No wireless technology",
            "Not sure",
        ],
    },
    {
        id: "packaging",
        text: "Is your product sold in pre-packaged form with an MRP label?",
        subtitle: "Required to check LMPC / Legal Metrology compliance",
        icon: "🏷️",
        options: [
            "Yes — it has MRP / retail packaging",
            "No — sold in bulk or B2B",
            "It's a service or software",
            "Not sure",
        ],
    },
    {
        id: "origin",
        text: "Where is your product manufactured?",
        subtitle: "Country of origin affects certification pathways",
        icon: "🌍",
        options: [
            "India",
            "China",
            "USA / Europe",
            "South Korea / Japan",
            "Southeast Asia",
            "Other country",
        ],
    },
    {
        id: "urgency",
        text: "What is your target timeline to launch in India?",
        subtitle: "Helps us prioritise the most critical certifications",
        icon: "⏱️",
        options: [
            "Within 1 month (urgent!)",
            "1–3 months",
            "3–6 months",
            "6+ months / planning stage",
            "Already selling — need compliance now",
        ],
    },
];

// ─── Fetch from our own Next.js API route (no CORS, no browser restrictions) ──
async function getRecommendations(answers) {
    const res = await fetch("/api/ai-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
    });
    if (!res.ok) throw new Error(`API error ${res.status}`);
    return res.json();
}

// ─── CertCard ─────────────────────────────────────────────────────────────────
function CertCard({ cert, type }) {
    const isMand = type === "mandatory";
    const [hov, setHov] = useState(false);
    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: T.white, borderRadius: 14,
                border: `1.5px solid ${hov ? (isMand ? "#F59E0B" : T.teal) : (isMand ? "#FCD34D" : T.border)}`,
                padding: "16px 18px", marginBottom: 10,
                boxShadow: hov
                    ? (isMand ? "0 6px 20px rgba(245,158,11,0.18)" : "0 6px 20px rgba(30,136,200,0.12)")
                    : (isMand ? "0 2px 8px rgba(245,158,11,0.08)" : "0 2px 8px rgba(0,0,0,0.04)"),
                transition: "all 0.2s",
            }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{cert.icon}</span>
                    <div>
                        <div style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, color: T.slate, marginBottom: 3 }}>{cert.name}</div>
                        <span style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase",
                            padding: "2px 9px", borderRadius: 4,
                            background: isMand ? "#FEF3C7" : T.tealLight,
                            color: isMand ? "#92400E" : T.teal, fontFamily: T.font,
                        }}>{isMand ? "⚠ Mandatory" : "✦ Recommended"}</span>
                    </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 10, color: T.muted, fontFamily: T.font }}>Timeline</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.teal, fontFamily: T.font }}>{cert.timeline}</div>
                </div>
            </div>
            <p style={{ fontFamily: T.font, fontSize: 13, color: T.body, lineHeight: 1.6, margin: "0 0 8px" }}>{cert.reason}</p>
            <a href={cert.href} style={{ fontSize: 12, fontWeight: 600, color: T.teal, textDecoration: "none", fontFamily: T.font }}>
                Learn more →
            </a>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AIRecommendationScreen() {
    const router = useRouter();

    const [answered, setAnswered] = useState([]);
    const [curQ, setCurQ] = useState(0);
    const [phase, setPhase] = useState("questions"); // questions | loading | result
    const [result, setResult] = useState(null);
    const [animState, setAnimState] = useState("in");        // "in" | "out"
    const [displayedQ, setDisplayedQ] = useState(0);
    const [hovered, setHovered] = useState(null);
    const [freeVal, setFreeVal] = useState("");
    const [busy, setBusy] = useState(false);

    function advance(answer) {
        if (busy) return;
        setBusy(true);

        const rec = [...answered, { answer }];
        setAnimState("out");

        setTimeout(() => {
            setAnswered(rec);
            setFreeVal("");
            setHovered(null);

            const nextQ = curQ + 1;

            if (nextQ < QUESTIONS.length) {
                setCurQ(nextQ);
                setDisplayedQ(nextQ);
                setAnimState("in");
                setBusy(false);
            } else {
                // Build answers map
                const map = {};
                rec.forEach((r, i) => {
                    if (r.answer !== "⏭ Skipped") map[QUESTIONS[i].id] = r.answer;
                });

                setDisplayedQ(nextQ);
                setPhase("loading");
                setAnimState("in");
                setBusy(false);

                // Call our API route — always succeeds (falls back to rule engine if Gemini is down)
                getRecommendations(map)
                    .then(data => {
                        setResult(data);
                        setPhase("result");
                    })
                    .catch(() => {
                        // Even if our own API route fails, show a graceful result using client-side rules
                        const fallback = clientFallback(map);
                        setResult(fallback);
                        setPhase("result");
                    });
            }
        }, 260);
    }

    // ── Ultra-lightweight client-side fallback (last resort) ──────────────────
    function clientFallback(map) {
        const pt = (map.product_type || "").toLowerCase();
        const act = (map.activity || "").toLowerCase();
        const wl = (map.wireless || "").toLowerCase();

        const mandatory = [];
        if (pt.match(/electronic|led|iot|smart|appliance/))
            mandatory.push({
                name: "BIS CRS / ISI Mark", icon: "🔖", timeline: "4–8 weeks", href: "/bis",
                reason: "Mandatory for electronics and electrical products sold in India."
            });
        if (wl.match(/wi-fi|bluetooth|rf|wireless/) || pt.match(/wireless|iot|smart/))
            mandatory.push({
                name: "WPC-ETA Approval", icon: "📡", timeline: "4–8 weeks", href: "/wpc",
                reason: "Required for any wireless or Bluetooth device imported into India."
            });
        if (act.match(/import/) || pt.match(/packaged|food/))
            mandatory.push({
                name: "LMPC Registration", icon: "⚖️", timeline: "2–4 weeks", href: "/lmpc",
                reason: "Required for all importers of pre-packaged goods in India."
            });
        if (!mandatory.length)
            mandatory.push({
                name: "LMPC Registration", icon: "⚖️", timeline: "2–4 weeks", href: "/lmpc",
                reason: "Most goods sold in India require LMPC registration for legal compliance."
            });

        return {
            mandatory,
            recommended: [],
            totalTimeline: "4–12 weeks",
            aiSummary: `Based on your answers, here are the key certifications your product needs to enter the Indian market legally. SIACC handles everything end-to-end.`,
            source: "client",
        };
    }

    function restart() {
        setAnimState("out");
        setTimeout(() => {
            setAnswered([]);
            setCurQ(0);
            setDisplayedQ(0);
            setPhase("questions");
            setResult(null);
            setFreeVal("");
            setHovered(null);
            setAnimState("in");
        }, 260);
    }

    const progress = phase === "result" || phase === "loading"
        ? (phase === "result" ? 100 : 95)
        : Math.round((curQ / QUESTIONS.length) * 100);

    const q = QUESTIONS[displayedQ] || QUESTIONS[QUESTIONS.length - 1];

    return (
        <div style={{ minHeight: "100vh", background: T.cream, fontFamily: T.font }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        body { font-family:'Poppins','system-ui',sans-serif !important; }

        .q-card-in  { opacity:1; transform:translateY(0);    transition:opacity 0.26s ease, transform 0.26s ease; }
        .q-card-out { opacity:0; transform:translateY(-10px); transition:opacity 0.26s ease, transform 0.26s ease; pointer-events:none; }

        .opt-chip { transition:border-color 0.15s, background 0.15s, color 0.15s, box-shadow 0.15s, transform 0.12s; }
        .opt-chip:active { transform:scale(0.97); }

        @keyframes slideUp       { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse         { 0%,100%{opacity:1} 50%{opacity:0.45} }
        @keyframes spin          { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes typingBounce  { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-7px)} }
        @keyframes fadeIn        { from{opacity:0} to{opacity:1} }

        .result-in  { animation:slideUp 0.4s ease forwards; }
        .cta-btn:hover  { transform:translateY(-1px); box-shadow:0 6px 20px rgba(249,115,22,0.35) !important; }
        .wa-btn:hover   { transform:translateY(-1px); filter:brightness(1.06); }
        .skip-btn:hover { color:${T.teal} !important; border-color:${T.teal} !important; }
        .free-input:focus { border-color:${T.teal} !important; outline:none; box-shadow:0 0 0 3px rgba(30,136,200,0.12) !important; }
        .contact-card:hover { border-color:${T.teal} !important; box-shadow:0 4px 16px rgba(30,136,200,0.12) !important; }
        .restart-btn:hover  { color:${T.teal} !important; border-color:${T.teal} !important; }
      `}</style>

            <Navbar />

            {/* ── Sticky progress header ── */}
            <div style={{
                position: "sticky", top: 0, zIndex: 200,
                background: `linear-gradient(135deg,${T.titleblue} 0%,${T.teal} 100%)`,
                padding: "13px 24px 11px",
                boxShadow: "0 4px 20px rgba(10,109,170,0.22)",
            }}>
                <div style={{ maxWidth: 680, margin: "0 auto" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                                width: 33, height: 33, borderRadius: "50%",
                                background: "rgba(255,255,255,0.18)",
                                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                            }}>🤖</div>
                            <div>
                                <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                                    Certify AI · SIACC
                                </div>
                                <div style={{ fontFamily: T.font, fontSize: 10.5, color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 5 }}>
                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.green, display: "inline-block", animation: "pulse 2s infinite" }} />
                                    {phase === "result" ? "Analysis complete ✓" :
                                        phase === "loading" ? "AI is analysing…" :
                                            `Question ${curQ + 1} of ${QUESTIONS.length}`}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => router.push("/contact")} style={{
                            background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.28)",
                            color: "#fff", borderRadius: 8, padding: "6px 14px",
                            fontFamily: T.font, fontSize: 11.5, fontWeight: 600, cursor: "pointer",
                        }}>Talk to Human →</button>
                    </div>

                    <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 6, height: 5, overflow: "hidden" }}>
                        <div style={{
                            height: "100%", borderRadius: 6, background: T.green,
                            width: `${progress}%`, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
                        }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                        <span style={{ fontFamily: T.font, fontSize: 10, color: "rgba(255,255,255,0.6)" }}>
                            {progress === 0 ? "Let's get started" : phase === "result" ? "All done!" : `${progress}% complete`}
                        </span>
                        <span style={{ fontFamily: T.font, fontSize: 10, color: "rgba(255,255,255,0.6)" }}>
                            {phase === "result" ? "✓ Complete" : phase === "loading" ? "Analysing…" : `${QUESTIONS.length - curQ} left`}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div style={{ maxWidth: 680, margin: "0 auto", padding: "22px 16px 80px" }}>

                {/* Answers saved in memory — not shown on screen */}

                {/* ── Animated card wrapper (single div, no remount) ── */}
                <div className={animState === "in" ? "q-card-in" : "q-card-out"}>

                    {/* Question card */}
                    {phase === "questions" && q && (
                        <div style={{
                            background: T.white, borderRadius: 20,
                            border: `1px solid ${T.border}`,
                            boxShadow: "0 8px 32px rgba(14,28,58,0.09)",
                            overflow: "hidden",
                        }}>
                            <div style={{
                                background: `linear-gradient(135deg,${T.titleblue} 0%,${T.teal} 100%)`,
                                padding: "22px 24px 20px",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                    <span style={{
                                        background: "rgba(255,255,255,0.18)", color: "#fff",
                                        fontFamily: T.font, fontSize: 10.5, fontWeight: 600,
                                        padding: "3px 11px", borderRadius: 20, letterSpacing: "0.05em",
                                    }}>QUESTION {curQ + 1} OF {QUESTIONS.length}</span>
                                    <span style={{ fontSize: 24 }}>{q.icon}</span>
                                </div>
                                <h2 style={{
                                    fontFamily: T.font, fontSize: "clamp(1rem,2.4vw,1.18rem)",
                                    fontWeight: 700, color: "#fff", lineHeight: 1.4, margin: "0 0 6px",
                                }}>{q.text}</h2>
                                <p style={{ fontFamily: T.font, fontSize: 12.5, fontWeight: 500, color: "rgba(255,255,255,0.72)", margin: 0 }}>
                                    {q.subtitle}
                                </p>
                            </div>

                            <div style={{ padding: "20px 22px 22px" }}>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: q.freeText ? 14 : 0 }}>
                                    {q.options.map(opt => (
                                        <button
                                            key={opt} disabled={busy}
                                            onClick={() => advance(opt)}
                                            onMouseEnter={() => setHovered(opt)}
                                            onMouseLeave={() => setHovered(null)}
                                            className="opt-chip"
                                            style={{
                                                padding: "10px 18px", borderRadius: 24,
                                                border: `1.5px solid ${hovered === opt ? T.teal : T.border}`,
                                                background: hovered === opt ? T.tealLight : T.white,
                                                color: hovered === opt ? T.teal : T.body,
                                                fontFamily: T.font, fontSize: 13.5, fontWeight: 500,
                                                cursor: busy ? "default" : "pointer",
                                                boxShadow: hovered === opt ? "0 2px 10px rgba(30,136,200,0.18)" : "none",
                                            }}
                                        >{opt}</button>
                                    ))}
                                </div>

                                {q.freeText && (
                                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                        <input
                                            value={freeVal}
                                            onChange={e => setFreeVal(e.target.value)}
                                            onKeyDown={e => { if (e.key === "Enter" && freeVal.trim() && !busy) advance(freeVal.trim()); }}
                                            placeholder={q.placeholder}
                                            className="free-input"
                                            style={{
                                                flex: 1, border: `1.5px solid ${T.border}`, borderRadius: 12,
                                                padding: "11px 16px", fontSize: 13.5, fontFamily: T.font,
                                                color: T.slate, background: T.cream, transition: "border-color 0.18s",
                                            }}
                                        />
                                        <button
                                            disabled={!freeVal.trim() || busy}
                                            onClick={() => { if (freeVal.trim() && !busy) advance(freeVal.trim()); }}
                                            style={{
                                                width: 44, height: 44, borderRadius: 12, border: "none",
                                                background: freeVal.trim() ? T.orange : "#E2E8F0",
                                                color: "#fff", fontSize: 17, flexShrink: 0,
                                                cursor: freeVal.trim() ? "pointer" : "default", transition: "background 0.18s",
                                            }}
                                        >➤</button>
                                    </div>
                                )}

                                <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px dashed ${T.border}` }}>
                                    <button
                                        disabled={busy}
                                        onClick={() => !busy && advance("⏭ Skipped")}
                                        className="skip-btn"
                                        style={{
                                            background: "none", border: `1px solid ${T.border}`,
                                            borderRadius: 10, padding: "7px 18px", fontSize: 12.5, fontWeight:400, color: "#000000b6",
                                            cursor: busy ? "default" : "pointer",
                                            fontFamily: T.font, transition: "all 0.18s",
                                        }}
                                    >⏭ Skip this question</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Loading */}
                    {phase === "loading" && (
                        <div style={{
                            background: T.white, borderRadius: 20, border: `1px solid ${T.border}`,
                            boxShadow: "0 8px 32px rgba(14,28,58,0.09)",
                            padding: "52px 24px", textAlign: "center",
                            animation: "slideUp 0.35s ease",
                        }}>
                            <div style={{
                                width: 68, height: 68, borderRadius: "50%", margin: "0 auto 18px",
                                background: `linear-gradient(135deg,${T.titleblue},${T.teal})`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 30, animation: "spin 2s linear infinite",
                            }}>🤖</div>
                            <h3 style={{ fontFamily: T.font, fontSize: 18, fontWeight: 700, color: T.slate, margin: "0 0 8px" }}>
                                Analysing your answers…
                            </h3>
                            <p style={{ fontFamily: T.font, fontSize: 13.5, color: T.muted, margin: "0 0 24px", lineHeight: 1.6 }}>
                                Finding the exact Indian certifications your product needs.
                            </p>
                            <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                                {[0, 1, 2].map(i => (
                                    <div key={i} style={{
                                        width: 10, height: 10, borderRadius: "50%", background: T.teal,
                                        animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                                    }} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Results */}
                    {phase === "result" && result && (
                        <div className="result-in">

                            {/* Header */}
                            <div style={{
                                background: `linear-gradient(135deg,${T.titleblue},${T.teal})`,
                                borderRadius: 20, padding: "24px", marginBottom: 16, textAlign: "center",
                            }}>
                                <div style={{ fontSize: 36, marginBottom: 10 }}>🎉</div>
                                <h2 style={{ fontFamily: T.font, fontSize: "clamp(1.05rem,3vw,1.4rem)", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>
                                    Your Personalised Recommendations
                                </h2>
                                <p style={{ fontFamily: T.font, fontSize: 13, color: "rgba(255,255,255,0.82)", margin: 0, lineHeight: 1.65 }}>
                                    {result.aiSummary}
                                </p>
                            </div>

                            {/* Mandatory */}
                            {result.mandatory?.length > 0 && (
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{
                                        display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
                                        padding: "9px 14px", background: "#FEF3C7", borderRadius: 10, border: "1px solid #F59E0B",
                                    }}>
                                        <span>⚠️</span>
                                        <span style={{ fontFamily: T.font, fontSize: 12.5, fontWeight: 700, color: "#92400E" }}>
                                            Mandatory — {result.mandatory.length} certification{result.mandatory.length > 1 ? "s" : ""} required
                                        </span>
                                    </div>
                                    {result.mandatory.map(c => <CertCard key={c.name} cert={c} type="mandatory" />)}
                                </div>
                            )}

                            {/* Recommended */}
                            {result.recommended?.length > 0 && (
                                <div style={{ marginBottom: 16 }}>
                                    <div style={{
                                        display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
                                        padding: "9px 14px", background: T.tealLight, borderRadius: 10, border: `1px solid ${T.teal}`,
                                    }}>
                                        <span>✦</span>
                                        <span style={{ fontFamily: T.font, fontSize: 12.5, fontWeight: 700, color: T.titleblue }}>
                                            Also Recommended — {result.recommended.length} certification{result.recommended.length > 1 ? "s" : ""}
                                        </span>
                                    </div>
                                    {result.recommended.map(c => <CertCard key={c.name} cert={c} type="recommended" />)}
                                </div>
                            )}

                            {/* Timeline */}
                            <div style={{
                                background: `linear-gradient(135deg,${T.titleblue},${T.teal})`,
                                borderRadius: 14, padding: "20px 22px", marginBottom: 14,
                            }}>
                                <div style={{ fontFamily: T.font, fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,0.78)", marginBottom: 4 }}>
                                    ⏱ Estimated Total Timeline
                                </div>
                                <div style={{ fontFamily: T.font, fontSize: 30, fontWeight: 800, color: "#fff", marginBottom: 6 }}>
                                    {result.totalTimeline}
                                </div>
                                <p style={{ fontFamily: T.font, fontSize: 13, color: "rgba(255,255,255,0.78)", margin: 0 }}>
                                    SIACC manages everything end-to-end — lab coordination, filing, follow-up, and tracking.
                                </p>
                            </div>

                            {/* Badge + CTAs in one row */}
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 10,
                                    flexWrap: "wrap",
                                    marginBottom: 14,
                                }}
                            >
                                {/* Powered-by badge */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 6,
                                        padding: "10px 14px",
                                        background: result.source === "gemini" ? "#F0F9FF" : "#F0FDF4",
                                        borderRadius: 12,
                                        border:
                                            result.source === "gemini"
                                                ? "1px solid #BAE6FD"
                                                : "1px solid #86EFAC",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    <span style={{ fontSize: 14 }}>
                                        {result.source === "gemini" ? "✨" : "🧠"}
                                    </span>

                                    <span
                                        style={{
                                            fontFamily: T.font,
                                            fontSize: 11.5,
                                            fontWeight: 600,
                                            color: result.source === "gemini" ? "#0369A1" : "#15803D",
                                        }}
                                    >
                                        {result.source === "gemini"
                                            ? "Powered by Google Gemini AI"
                                            : "Smart Recommendations by SIACC Engine"}
                                    </span>
                                </div>

                                {/* Free Consultation */}
                                <button
                                    onClick={() => router.push("/contact")}
                                    className="cta-btn"
                                    style={{
                                        padding: "12px 18px",
                                        borderRadius: 12,
                                        border: "none",
                                        background: T.orange,
                                        color: "#fff",
                                        fontWeight: 700,
                                        fontSize: 14,
                                        cursor: "pointer",
                                        fontFamily: T.font,
                                        boxShadow: "0 4px 14px rgba(249,115,22,0.28)",
                                        transition: "all 0.2s",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    📋 Free Consultation
                                </button>

                                {/* WhatsApp */}
                                <a
                                    href="https://wa.me/919540190334"
                                    target="_blank"
                                    className="wa-btn"
                                    style={{
                                        padding: "12px 18px",
                                        borderRadius: 12,
                                        border: "none",
                                        background: "#25D366",
                                        color: "#fff",
                                        fontWeight: 700,
                                        fontSize: 14,
                                        fontFamily: T.font,
                                        textDecoration: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 6,
                                        transition: "all 0.2s",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    💬 WhatsApp SIACC
                                </a>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <button onClick={restart} className="restart-btn"
                                    style={{
                                        background: T.white, border: `1.5px solid ${T.border}`,
                                        borderRadius: 10, padding: "10px 26px", fontSize: 15, fontWeight: 600,
                                        color: "#000000b6", cursor: "pointer", fontFamily: T.font, transition: "all 0.2s",
                                    }}>↺ Start Over</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Contact strip */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 22 }}>
                    {[
                        { icon: "📞", title: "Call an Expert", desc: "+91-9891229135", href: "tel:+919891229135" },
                        { icon: "✉️", title: "Email Us", desc: "starindia.acc@gmail.com", href: "starindia.acc@gmail.com" },
                    ].map(c => (
                        <a key={c.title} href={c.href} className="contact-card"
                            style={{
                                padding: "14px 16px", borderRadius: 12, border: `1px solid ${T.border}`,
                                background: T.white, textDecoration: "none", display: "block",
                                transition: "all 0.2s", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            }}>
                            <div style={{ fontSize: 20, marginBottom: 4 }}>{c.icon}</div>
                            <div style={{ fontFamily: T.font, fontWeight: 600, color: T.slate, fontSize: 13 }}>{c.title}</div>
                            <div style={{ fontFamily: T.font, color: "#00000088", fontWeight: 700, fontSize: 12, marginTop: 1 }}>{c.desc}</div>
                        </a>
                    ))}
                </div>

                <p style={{ textAlign: "center", fontFamily: T.font, fontSize: 11, color: T.muted, marginTop: 12 }}>
                    Recommendations are for guidance only. Always verify with SIACC experts before filing.
                </p>
            </div>

            <Footer />
        </div>
    );
}