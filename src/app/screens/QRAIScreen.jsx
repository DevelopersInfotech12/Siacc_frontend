"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const T = {
  teal: "#1E88C8", titleblue: "#0a6daa", orange: "#F97316",
  tealLight: "#EBF5F5", cream: "#FAF8F4", white: "#FFFFFF",
  border: "#E8E3DA", slate: "#0D1B2A", muted: "#718096",
  poppins: "'Poppins','system-ui',sans-serif",
  sans: "'Outfit','system-ui',sans-serif",
};

const SYSTEM_PROMPT = `You are SIACC's expert certification advisor. A user has scanned a QR code and needs instant help.

Be warm, very concise, and helpful. Ask ONE question at a time. After 2-3 exchanges give a clear recommendation.

You help with:
- BIS CRS / ISI Mark: Electronics, IT, electrical goods
- WPC-ETA: Wi-Fi, Bluetooth, RF, IoT, wireless devices
- TEC/MTCTE: Telecom equipment, routers, mobile devices
- BEE Star Rating: ACs, refrigerators, LEDs, appliances
- EPR Registration: E-waste, plastic packaging, batteries
- LMPC: Pre-packaged imported goods
- CDSCO: Drugs, cosmetics, medical devices
- ISO: Quality, environment, safety, InfoSec

Keep every reply under 4 sentences. End with one specific question or a clear next step to contact SIACC at +91-9540190334.`;

const SCAN_WELCOME = `👋 Hi! I'm **Certify AI** from SIACC.

You've scanned our QR code — great! I can instantly tell you which Indian certifications your product needs.

**What product are you importing or selling in India?**`;

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 5, alignItems: "center", padding: "4px 0" }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: "50%", background: T.teal,
          animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  );
}

function MessageBubble({ msg, isNew }) {
  const isUser = msg.role === "user";
  const [displayed, setDisplayed] = useState(isNew && !isUser ? "" : msg.content);

  useEffect(() => {
    if (!isNew || isUser) return;
    let i = 0;
    const text = msg.content;
    const tick = setInterval(() => {
      i += 4;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { setDisplayed(text); clearInterval(tick); }
    }, 10);
    return () => clearInterval(tick);
  }, []);

  const formatted = displayed
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");

  return (
    <div style={{
      display: "flex", justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 14, animation: isNew ? "msgSlideIn 0.3s ease" : "none",
    }}>
      {!isUser && (
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: `linear-gradient(135deg, ${T.teal}, ${T.titleblue})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 15, flexShrink: 0, marginRight: 8, marginTop: 2,
        }}>🤖</div>
      )}
      <div style={{
        maxWidth: "78%", padding: "11px 15px",
        background: isUser ? `linear-gradient(135deg, ${T.orange}, #e8650a)` : T.white,
        color: isUser ? "#fff" : T.slate,
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        boxShadow: isUser ? "0 3px 12px rgba(249,115,22,0.25)" : "0 2px 10px rgba(0,0,0,0.07)",
        border: isUser ? "none" : `1px solid ${T.border}`,
        fontFamily: T.sans, fontSize: 14, lineHeight: 1.6,
      }} dangerouslySetInnerHTML={{ __html: formatted }} />
      {isUser && (
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#E8F4FD", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0, marginLeft: 8, marginTop: 2 }}>👤</div>
      )}
    </div>
  );
}

// ── QR Scanner Component ──────────────────────────────────────────────────────
function QRScannerView({ onScanSuccess }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | starting | scanning | error
  const [errorMsg, setErrorMsg] = useState("");
  const streamRef = useRef(null);

  async function startCamera() {
    setStatus("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setStatus("scanning");
      scanLoop();
    } catch (e) {
      setStatus("error");
      setErrorMsg("Camera access denied. Please allow camera permission and try again.");
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  }

  async function scanLoop() {
    const { BrowserQRCodeReader } = await import("@zxing/browser").catch(() => null);
    if (!BrowserQRCodeReader) {
      // Fallback: simulate a scan for demo after 3 seconds
      setTimeout(() => {
        stopCamera();
        onScanSuccess("I scanned a QR code and want to know about certifications for my product");
      }, 3000);
      return;
    }
    const reader = new BrowserQRCodeReader();
    try {
      const result = await reader.decodeFromVideoDevice(undefined, videoRef.current, (res) => {
        if (res) {
          stopCamera();
          onScanSuccess(res.getText());
        }
      });
    } catch {
      // keep scanning
    }
  }

  useEffect(() => { return () => stopCamera(); }, []);

  if (status === "idle") {
    return (
      <div style={{ textAlign: "center", padding: "40px 24px" }}>
        <div style={{
          width: 120, height: 120, borderRadius: "50%",
          background: `linear-gradient(135deg, ${T.tealLight}, #D1EAF8)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 52, margin: "0 auto 24px",
          boxShadow: "0 8px 32px rgba(30,136,200,0.15)",
        }}>📷</div>
        <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.slate, marginBottom: 10 }}>
          Scan to Get AI Recommendations
        </h3>
        <p style={{ color: T.muted, fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>
          Point your camera at any SIACC QR code, or tap below to start a product consultation directly.
        </p>
        <button onClick={startCamera} style={{
          background: `linear-gradient(135deg, ${T.teal}, ${T.titleblue})`,
          color: "#fff", border: "none", borderRadius: 12, padding: "14px 32px",
          fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: T.poppins,
          boxShadow: "0 4px 16px rgba(30,136,200,0.3)", marginBottom: 12,
        }}>
          📸 Open Camera & Scan QR
        </button>
        <div><button onClick={() => onScanSuccess("")} style={{
          background: "none", border: `1px solid ${T.border}`, borderRadius: 10,
          padding: "11px 24px", fontSize: 14, color: T.muted, cursor: "pointer", fontFamily: T.sans,
        }}>Skip — Ask AI Directly</button></div>
      </div>
    );
  }

  if (status === "starting") {
    return (
      <div style={{ textAlign: "center", padding: 48 }}>
        <div style={{ fontSize: 40, marginBottom: 16, animation: "spin 1s linear infinite" }}>⏳</div>
        <p style={{ color: T.muted, fontFamily: T.sans }}>Starting camera...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
        <p style={{ color: "#e53e3e", fontFamily: T.sans, marginBottom: 20 }}>{errorMsg}</p>
        <button onClick={() => onScanSuccess("")} style={{
          background: T.orange, color: "#fff", border: "none", borderRadius: 10,
          padding: "12px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: T.poppins,
        }}>Continue Without Scanning</button>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", background: "#000", borderRadius: 12, overflow: "hidden" }}>
      <video ref={videoRef} style={{ width: "100%", maxHeight: 320, objectFit: "cover", display: "block" }} muted playsInline />
      {/* Scan overlay */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{
          width: 200, height: 200, position: "relative",
        }}>
          {/* Corner marks */}
          {[
            { top: 0, left: 0, borderTop: "3px solid #4ade80", borderLeft: "3px solid #4ade80" },
            { top: 0, right: 0, borderTop: "3px solid #4ade80", borderRight: "3px solid #4ade80" },
            { bottom: 0, left: 0, borderBottom: "3px solid #4ade80", borderLeft: "3px solid #4ade80" },
            { bottom: 0, right: 0, borderBottom: "3px solid #4ade80", borderRight: "3px solid #4ade80" },
          ].map((style, i) => (
            <div key={i} style={{ position: "absolute", width: 24, height: 24, ...style }} />
          ))}
          {/* Scan line */}
          <div style={{
            position: "absolute", left: 0, right: 0, height: 2, background: "#4ade80",
            top: "50%", animation: "scanLine 2s ease-in-out infinite",
            boxShadow: "0 0 8px #4ade80",
          }} />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.6)", padding: "12px", textAlign: "center" }}>
        <p style={{ color: "#fff", fontSize: 13, margin: 0, fontFamily: T.sans }}>📷 Scanning for QR code...</p>
        <button onClick={() => { stopCamera(); onScanSuccess(""); }} style={{
          marginTop: 8, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff", borderRadius: 8, padding: "6px 16px", fontSize: 12, cursor: "pointer", fontFamily: T.sans,
        }}>Skip Scan</button>
      </div>
    </div>
  );
}

// ── Main QR AI Screen ─────────────────────────────────────────────────────────
export default function QRAIScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState("scan"); // scan | chat
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [newMsgIdx, setNewMsgIdx] = useState(-1);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function startChat(scannedText) {
    const welcomeMsg = { role: "assistant", content: SCAN_WELCOME, isNew: true };
    setMessages([welcomeMsg]);
    setNewMsgIdx(0);
    setPhase("chat");

    // If QR had a product hint, auto-send after welcome
    if (scannedText && !scannedText.startsWith("http")) {
      setTimeout(() => sendMessage(scannedText, [welcomeMsg]), 1500);
    }
  }

  async function sendMessage(text, existingMessages) {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");

    const base = existingMessages || messages;
    const userMsg = { role: "user", content: userText, isNew: true };
    const newMessages = [...base, userMsg];
    setMessages(newMessages);
    setLoading(true);

    try {
      const apiMessages = newMessages.map(({ role, content }) => ({ role, content }));
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });
      const data = await response.json();
      const aiText = data.content?.[0]?.text || "Please contact SIACC directly at +91-9540190334 for instant help.";
      const aiMsg = { role: "assistant", content: aiText, isNew: true };
      const updated = [...newMessages, aiMsg];
      setMessages(updated);
      setNewMsgIdx(updated.length - 1);
    } catch {
      const updated = [...newMessages, {
        role: "assistant",
        content: "Connectivity issue. Call us at **+91-9540190334** — we're available Mon–Sat 9AM–6PM!",
        isNew: true,
      }];
      setMessages(updated);
      setNewMsgIdx(updated.length - 1);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: T.cream, fontFamily: T.sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        @keyframes typingBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-6px)} }
        @keyframes msgSlideIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
        @keyframes scanLine { 0%{top:10%} 50%{top:85%} 100%{top:10%} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .qr-input:focus { outline:none; border-color:${T.teal} !important; box-shadow:0 0 0 3px rgba(30,136,200,0.12) !important; }
      `}</style>

      <Navbar />

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${T.titleblue}, ${T.teal})`,
        padding: "32px 24px 28px", textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "5px 14px",
          marginBottom: 14, border: "1px solid rgba(255,255,255,0.2)",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite", display: "inline-block" }} />
          <span style={{ color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {phase === "scan" ? "QR Scanner" : "AI Advisor · Active"}
          </span>
        </div>
        <h1 style={{ fontFamily: T.poppins, fontSize: "clamp(1.6rem,3.5vw,2.4rem)", color: "#fff", fontWeight: 700, marginBottom: 8 }}>
          {phase === "scan" ? "Scan QR → Get AI Advice" : "Certify AI by SIACC"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, maxWidth: 440, margin: "0 auto" }}>
          {phase === "scan"
            ? "Scan any SIACC QR code to instantly get certification recommendations"
            : "Your personal certification advisor — ask anything about Indian compliance"}
        </p>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "24px 16px 100px" }}>

        {phase === "scan" ? (
          /* ── SCAN PHASE ── */
          <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.07)", overflow: "hidden" }}>
            <div style={{ padding: 24 }}>
              <QRScannerView onScanSuccess={startChat} />
            </div>

            {/* Info strip */}
            <div style={{ borderTop: `1px solid ${T.border}`, padding: "16px 24px", background: T.cream, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, textAlign: "center" }}>
              {[
                { icon: "⚡", text: "Instant results" },
                { icon: "🎯", text: "10+ certifications" },
                { icon: "🆓", text: "Completely free" },
              ].map((i) => (
                <div key={i.text}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{i.icon}</div>
                  <div style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>{i.text}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ── CHAT PHASE ── */
          <>
            <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, boxShadow: "0 4px 20px rgba(0,0,0,0.07)", overflow: "hidden", marginBottom: 14 }}>
              {/* Chat header */}
              <div style={{ padding: "13px 18px", background: `linear-gradient(to right, ${T.titleblue}, ${T.teal})`, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🤖</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontFamily: T.poppins, fontSize: 13 }}>Certify AI · SIACC</div>
                  <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 2s infinite" }} />
                    Online
                  </div>
                </div>
                <button onClick={() => setPhase("scan")} style={{
                  marginLeft: "auto", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.28)",
                  color: "#fff", borderRadius: 8, padding: "5px 12px", fontSize: 11, cursor: "pointer", fontFamily: T.sans,
                }}>← Scan Again</button>
              </div>

              {/* Messages */}
              <div style={{ padding: "18px 14px", minHeight: 300, maxHeight: 460, overflowY: "auto" }}>
                {messages.map((msg, i) => (
                  <MessageBubble key={i} msg={msg} isNew={msg.isNew && i === newMsgIdx} />
                ))}
                {loading && (
                  <div style={{ display: "flex", alignItems: "flex-start", marginBottom: 14 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg,${T.teal},${T.titleblue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, marginRight: 8, marginTop: 2 }}>🤖</div>
                    <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: "18px 18px 18px 4px", padding: "11px 14px" }}>
                      <TypingDots />
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input */}
            <div style={{ background: T.white, borderRadius: 12, border: `1px solid ${T.border}`, boxShadow: "0 3px 12px rgba(0,0,0,0.05)", padding: "10px 12px", display: "flex", gap: 8, alignItems: "center" }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                placeholder="Type your question..."
                className="qr-input"
                style={{
                  flex: 1, border: `1px solid ${T.border}`, borderRadius: 9, padding: "9px 13px",
                  fontSize: 14, fontFamily: T.sans, color: T.slate, background: T.cream,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              />
              <button onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{
                width: 40, height: 40, borderRadius: 9, border: "none",
                background: input.trim() && !loading ? T.orange : "#E5E7EB",
                color: "#fff", cursor: input.trim() && !loading ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, flexShrink: 0, transition: "all 0.2s",
              }}>➤</button>
            </div>

            {/* Quick contact */}
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <a href="tel:+919540190334" style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "12px", borderRadius: 10, background: T.white, border: `1px solid ${T.border}`,
                color: T.slate, textDecoration: "none", fontSize: 13, fontWeight: 600, fontFamily: T.poppins,
              }}>📞 Call SIACC</a>
              <a href="https://wa.me/919540190334" target="_blank" style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "12px", borderRadius: 10, background: "#25D366", border: "none",
                color: "#fff", textDecoration: "none", fontSize: 13, fontWeight: 600, fontFamily: T.poppins,
              }}>💬 WhatsApp</a>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}