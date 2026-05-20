"use client";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const T = {
  teal:      "#1E88C8",
  titleblue: "#0a6daa",
  orange:    "#F97316",
  cream:     "#F8FAFC",
  white:     "#FFFFFF",
  border:    "#E2E8F0",
  slate:     "#0D1B2A",
  body:      "#374151",
  muted:     "#94A3B8",
  green:     "#22C55E",
  font:      "'Poppins', 'system-ui', sans-serif",
};

const SERVICES = [
  "BIS CRS / ISI Certification",
  "WPC-ETA Approval",
  "TEC / MTCTE Certification",
  "BEE Star Rating",
  "EPR Registration",
  "LMPC Registration",
  "CDSCO / Drug License",
  "ISO Certification",
  "Product Testing & Lab",
  "Other / Not Sure",
];

const HEARD_FROM = [
  "Google Search",
  "LinkedIn",
  "Instagram / Facebook",
  "Friend / Colleague Referral",
  "QR Code Scan",
  "WhatsApp",
  "Other",
];

const inp = {
  width: "100%", padding: "12px 15px", borderRadius: "10px",
  border: `1.5px solid ${T.border}`, fontSize: "14px",
  fontFamily: T.font, backgroundColor: T.white, color: T.slate,
  outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

const lbl = {
  fontFamily: T.font, fontSize: "13px", fontWeight: "600",
  color: T.slate, display: "block", marginBottom: "6px",
};

function Field({ label, required, children }) {
  return (
    <div>
      <label style={lbl}>
        {label}{required && <span style={{ color: T.orange }}> *</span>}
      </label>
      {children}
    </div>
  );
}

export default function QRContactScreen() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    company: "", service: "", description: "", heard: "QR Code Scan",
  });
  const [status,   setStatus]   = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const focus = (e) => {
    e.target.style.borderColor = T.teal;
    e.target.style.boxShadow   = "0 0 0 3px rgba(30,136,200,0.1)";
  };
  const blur = (e) => {
    e.target.style.borderColor = T.border;
    e.target.style.boxShadow   = "none";
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "SIACC QR Code Contact Form",
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Submission failed");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  /* ── Success ── */
  if (status === "success") {
    return (
      <div style={{ minHeight: "100vh", background: T.cream, fontFamily: T.font }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`}</style>
        <Navbar />
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "60px 20px", textAlign: "center" }}>
          <div style={{
            background: T.white, borderRadius: 24, border: `1px solid ${T.border}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)", padding: "52px 32px",
          }}>
            <div style={{ fontSize: 68, marginBottom: 18 }}>✅</div>
            <h2 style={{ fontFamily: T.font, fontSize: 24, fontWeight: 800, color: T.slate, margin: "0 0 10px" }}>
              Enquiry Received!
            </h2>
            <p style={{ fontFamily: T.font, fontSize: 14.5, color: T.muted, lineHeight: 1.7, margin: "0 0 8px" }}>
              Our expert will call you within <strong style={{ color: T.slate }}>2 business hours</strong>.
            </p>
            <p style={{ fontFamily: T.font, fontSize: 13, color: T.muted }}>
              Need immediate help?{" "}
              <a href="tel:+919540190334" style={{ color: T.teal, fontWeight: 600 }}>
                +91-9540190334
              </a>
            </p>
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="https://wa.me/919540190334" target="_blank"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "13px 20px", borderRadius: 12, background: "#25D366",
                  color: "#fff", fontFamily: T.font, fontWeight: 700, fontSize: 14,
                  textDecoration: "none",
                }}>💬 Chat on WhatsApp</a>
              <a href="/"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "12px 20px", borderRadius: 12, border: `1.5px solid ${T.border}`,
                  color: T.slate, fontFamily: T.font, fontWeight: 600, fontSize: 14,
                  textDecoration: "none",
                }}>← Back to Home</a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div style={{ minHeight: "100vh", background: T.cream, fontFamily: T.font }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @media(max-width:560px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>

      <Navbar />

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${T.titleblue} 0%, ${T.teal} 100%)`,
        padding: "36px 24px 32px", textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.15)", borderRadius: 20,
          padding: "5px 14px", marginBottom: 14,
          border: "1px solid rgba(255,255,255,0.22)",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.green, display: "inline-block" }} />
          <span style={{ fontFamily: T.font, fontSize: 11.5, fontWeight: 600, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Quick Enquiry · Free Consultation
          </span>
        </div>
        <h1 style={{ fontFamily: T.font, fontSize: "clamp(1.5rem,3.5vw,2.2rem)", fontWeight: 800, color: "#fff", margin: "0 0 8px" }}>
          Get Your Free Certification Advice
        </h1>
        <p style={{ fontFamily: T.font, fontSize: 14, color: "rgba(255,255,255,0.82)", maxWidth: 420, margin: "0 auto" }}>
          Fill in your details below — our certification expert will call you within 2 business hours.
        </p>
      </div>

      {/* Form card */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "28px 16px 80px", animation: "fadeIn 0.4s ease" }}>
        <div style={{
          background: T.white, borderRadius: 20, border: `1px solid ${T.border}`,
          boxShadow: "0 8px 32px rgba(14,28,58,0.09)", padding: "32px 28px",
        }}>
          {/* SIACC badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            marginBottom: 24, paddingBottom: 20, borderBottom: `1px solid ${T.border}`,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: `linear-gradient(135deg, ${T.titleblue}, ${T.teal})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, flexShrink: 0,
            }}>⭐</div>
            <div>
              <div style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, color: T.slate }}>
                Star India Accreditation (SIACC)
              </div>
              <div style={{ fontFamily: T.font, fontSize: 12, color: T.muted }}>
                0% Failure Rate  ·  1,000+ Businesses Certified
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Name + Phone */}
            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Full Name" required>
                <input required style={inp} placeholder="Your full name"
                  value={form.name} onChange={set("name")} onFocus={focus} onBlur={blur} />
              </Field>
              <Field label="Phone Number" required>
                <input required type="tel" style={inp} placeholder="+91 98765 43210"
                  value={form.phone} onChange={set("phone")} onFocus={focus} onBlur={blur} />
              </Field>
            </div>

            {/* Email + Company */}
            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Email Address" required>
                <input required type="email" style={inp} placeholder="you@company.com"
                  value={form.email} onChange={set("email")} onFocus={focus} onBlur={blur} />
              </Field>
              <Field label="Company Name">
                <input style={inp} placeholder="Your company (optional)"
                  value={form.company} onChange={set("company")} onFocus={focus} onBlur={blur} />
              </Field>
            </div>

            {/* Service */}
            <Field label="Service Required">
              <select style={{ ...inp, cursor: "pointer" }}
                value={form.service} onChange={set("service")} onFocus={focus} onBlur={blur}>
                <option value="">Select a service…</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>

            {/* Description */}
            <Field label="Product / Business Description" required>
              <textarea required style={{ ...inp, minHeight: 100, resize: "vertical" }}
                placeholder="Briefly describe your product and what certification you're looking for…"
                value={form.description} onChange={set("description")} onFocus={focus} onBlur={blur} />
            </Field>

            {/* How did you hear — pre-filled with QR Code Scan */}
            <Field label="How did you hear about us?">
              <select style={{ ...inp, cursor: "pointer" }}
                value={form.heard} onChange={set("heard")} onFocus={focus} onBlur={blur}>
                {HEARD_FROM.map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </Field>

            {/* Error */}
            {status === "error" && (
              <div style={{
                background: "#FEF2F2", border: "1px solid #FCA5A5",
                borderRadius: 10, padding: "12px 16px",
                display: "flex", alignItems: "flex-start", gap: 10,
              }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
                <div>
                  <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 600, color: "#DC2626" }}>
                    Submission failed
                  </div>
                  <div style={{ fontFamily: T.font, fontSize: 12, color: "#EF4444", marginTop: 2 }}>
                    {errorMsg}&nbsp;·&nbsp;
                    <a href="tel:+919891229135" style={{ color: "#DC2626", fontWeight: 600 }}>
                      Call us directly →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={status === "loading"}
              style={{
                background: status === "loading"
                  ? T.muted
                  : `linear-gradient(135deg, ${T.titleblue}, ${T.teal})`,
                color: "#fff", padding: "15px", borderRadius: 12,
                fontFamily: T.font, fontWeight: 700, fontSize: 15,
                border: "none", cursor: status === "loading" ? "default" : "pointer",
                transition: "all 0.2s", letterSpacing: "0.2px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: status === "loading" ? "none" : "0 4px 16px rgba(30,136,200,0.3)",
              }}
              onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.opacity = "0.9"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
            >
              {status === "loading" ? (
                <>
                  <span style={{
                    width: 16, height: 16,
                    border: "2px solid rgba(255,255,255,0.35)",
                    borderTopColor: "#fff", borderRadius: "50%",
                    display: "inline-block", animation: "spin 0.75s linear infinite",
                  }} />
                  Submitting…
                </>
              ) : "Submit Enquiry →"}
            </button>

            <p style={{ fontFamily: T.font, fontSize: 12, color: T.muted, textAlign: "center", margin: 0 }}>
              We respond within 2 business hours. No spam, ever.
            </p>
          </form>
        </div>

        {/* Bottom contact strip */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
          <a href="tel:+919891229135"
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "14px 16px", borderRadius: 12,
              background: T.white, border: `1px solid ${T.border}`,
              textDecoration: "none", transition: "all 0.2s",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.teal; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; }}
          >
            <span style={{ fontSize: 20 }}>📞</span>
            <div>
              <div style={{ fontFamily: T.font, fontSize: 11, color: T.muted, fontWeight: 500 }}>CALL US</div>
              <div style={{ fontFamily: T.font, fontSize: 13, color: T.slate, fontWeight: 600 }}>+91-9891229135</div>
            </div>
          </a>
          <a href="https://wa.me/919540190334" target="_blank"
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "14px 16px", borderRadius: 12,
              background: "#25D366", border: "none",
              textDecoration: "none",
            }}
          >
            <span style={{ fontSize: 20 }}>💬</span>
            <div>
              <div style={{ fontFamily: T.font, fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>WHATSAPP</div>
              <div style={{ fontFamily: T.font, fontSize: 13, color: "#fff", fontWeight: 600 }}>Chat with us</div>
            </div>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}