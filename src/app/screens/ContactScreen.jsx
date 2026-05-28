"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import Navbar from "../Components/Navbar";
const Footer = dynamic(() => import("../Components/Footer"));

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
  "BIS-CRS Certification",
   "BIS-ISI Certification",
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
  "QR Code",
  "WhatsApp",
  "Other",
];

const inp = {
  width: "100%", padding: "12px 15px", borderRadius: "10px",
  border: `1.5px solid ${T.border}`, fontSize: "14px",
  fontFamily: T.font, backgroundColor: T.white,
  color: T.slate, outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

const lbl = {
  fontFamily: T.font, fontSize: "13px", fontWeight: "600",
  color: T.slate, display: "block", marginBottom: "6px",
};

function Field({ label, required, children }) {
  return (
    <div>
      <label style={lbl}>{label}{required && <span style={{ color: T.orange }}> *</span>}</label>
      {children}
    </div>
  );
}

async function submitToSheet(data) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error || "Submission failed");
  return json;
}

function ContactFormBlock() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    company: "", service: "", description: "", heard: "",
  });
  const [status,   setStatus]   = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const focus = (e) => { e.target.style.borderColor = T.teal; e.target.style.boxShadow = `0 0 0 3px rgba(30,136,200,0.1)`; };
  const blur  = (e) => { e.target.style.borderColor = T.border; e.target.style.boxShadow = "none"; };

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitToSheet({ ...form, source: "SIACC Contact Page" });
      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please call us directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "52px 24px" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
        <h3 style={{ fontFamily: T.font, fontWeight: 800, fontSize: 24, color: T.slate, marginBottom: 10 }}>
          Enquiry Received!
        </h3>
        <p style={{ fontFamily: T.font, fontSize: 15, color: T.muted, marginBottom: 6 }}>
          Our expert will call you within <strong>2 business hours</strong>.
        </p>
        <p style={{ fontFamily: T.font, fontSize: 13, color: T.muted }}>
          Need help now?{" "}
          <a href="tel:+919540190334" style={{ color: T.teal, fontWeight: 600 }}>
            +91-9540190334
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* Name + Phone */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
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
        <textarea required style={{ ...inp, minHeight: 110, resize: "vertical" }}
          placeholder="Briefly describe your product and what certification you're looking for…"
          value={form.description} onChange={set("description")} onFocus={focus} onBlur={blur} />
      </Field>

      {/* How did you hear */}
      <Field label="How did you hear about us?">
        <select style={{ ...inp, cursor: "pointer" }}
          value={form.heard} onChange={set("heard")} onFocus={focus} onBlur={blur}>
          <option value="">Select an option…</option>
          {HEARD_FROM.map(h => <option key={h} value={h}>{h}</option>)}
        </select>
      </Field>

      {/* Error */}
      {status === "error" && (
        <div style={{
          background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 10,
          padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 10,
        }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
          <div>
            <div style={{ fontFamily: T.font, fontSize: 13, fontWeight: 600, color: "#DC2626" }}>
              Submission failed
            </div>
            <div style={{ fontFamily: T.font, fontSize: 12, color: "#EF4444", marginTop: 2 }}>
              {errorMsg}&nbsp;·&nbsp;
              <a href="tel:+919540190334" style={{ color: "#DC2626", fontWeight: 600 }}>
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
          transition: "all 0.2s", letterSpacing: "0.3px",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: status === "loading" ? "none" : "0 4px 16px rgba(30,136,200,0.3)",
        }}
        onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.opacity = "0.9"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
      >
        {status === "loading" ? (
          <>
            <span style={{
              width: 16, height: 16, border: "2px solid rgba(255,255,255,0.35)",
              borderTopColor: "#fff", borderRadius: "50%",
              display: "inline-block", animation: "spin 0.75s linear infinite",
            }} />
            Submitting…
          </>
        ) : "Submit Enquiry →"}
      </button>

      <style>{`@keyframes spin { to { transform:rotate(360deg) } }`}</style>
      <p style={{ fontFamily: T.font, fontSize: 12, color: T.muted, textAlign: "center" }}>
        We respond within 2 business hours. No spam, ever.
      </p>
    </form>
  );
}

export default function ContactScreen() {
  return (
    <div style={{ minHeight: "100vh", background: T.cream, fontFamily: T.font }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @media(max-width:640px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media(max-width:600px) { .form-row { grid-template-columns: 1fr !important; } }
      `}</style>

      <Navbar />

      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${T.titleblue} 0%, ${T.teal} 100%)`,
        padding: "44px 24px 36px", textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.15)", borderRadius: 20,
          padding: "5px 14px", marginBottom: 14, border: "1px solid rgba(255,255,255,0.2)",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.green, display: "inline-block" }} />
          <span style={{ fontFamily: T.font, fontSize: 11.5, fontWeight: 600, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Free Consultation · No Commitment
          </span>
        </div>
        <h1 style={{ fontFamily: T.font, fontSize: "clamp(1.7rem,3.5vw,2.6rem)", fontWeight: 800, color: "#fff", margin: "0 0 10px" }}>
          Get in Touch with SIACC
        </h1>
        <p style={{ fontFamily: T.font, fontSize: 15, color: "rgba(255,255,255,0.82)", maxWidth: 500, margin: "0 auto" }}>
          Tell us about your product — we'll tell you exactly what certifications you need and handle everything end-to-end.
        </p>
      </div>

      {/* Main grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 16px 80px" }}>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 28, alignItems: "flex-start" }}>

          {/* Form card */}
          <div style={{
            background: T.white, borderRadius: 20, border: `1px solid ${T.border}`,
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)", padding: "32px 28px",
          }}>
            <h2 style={{ fontFamily: T.font, fontSize: 20, fontWeight: 700, color: T.slate, margin: "0 0 6px" }}>
              Send Your Enquiry
            </h2>
            <p style={{ fontFamily: T.font, fontSize: 13.5, color: T.muted, margin: "0 0 24px" }}>
              Fill in the form below and our experts will get back to you within 2 hours.
            </p>
            <ContactFormBlock />
          </div>

          {/* Right info panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Contact details */}
            <div style={{
              background: T.white, borderRadius: 16, border: `1px solid ${T.border}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)", padding: "24px",
            }}>
              <h3 style={{ fontFamily: T.font, fontSize: 15, fontWeight: 700, color: T.slate, margin: "0 0 18px" }}>
                Contact Details
              </h3>
              {[
                { icon: "📞", label: "Call Us", value: "+91-9891229135", href: "tel:+919891229135" },
                { icon: "📞", label: "Alternate", value: "+91-9540190334", href: "tel:+919540190334" },
                { icon: "✉️", label: "Email", value: "starindia.acc@gmail.com", href: "mailto:starindia.acc@gmail.com" },
                { icon: "✉️", label: "Alternate", value: "info@siacc.co.in", href: "mailto:info@siacc.co.in" },
                { icon: "🕐", label: "Hours", value: "Mon–Sat: 9:00 AM – 6:00 PM", href: null },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  paddingBottom: i < 4 ? 14 : 0, marginBottom: i < 4 ? 14 : 0,
                  borderBottom: i < 4 ? `1px solid ${T.border}` : "none",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 9,
                    background: T.cream, border: `1px solid ${T.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, flexShrink: 0,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily: T.font, fontSize: 11, color: T.muted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.label}</div>
                    {item.href
                      ? <a href={item.href} style={{ fontFamily: T.font, fontSize: 13.5, color: T.slate, fontWeight: 600, textDecoration: "none" }}>{item.value}</a>
                      : <div style={{ fontFamily: T.font, fontSize: 13.5, color: T.slate, fontWeight: 600 }}>{item.value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/919540190334" target="_blank"
              style={{
                display: "flex", alignItems: "center", gap: 12,
                background: "#25D366", borderRadius: 14, padding: "16px 20px",
                textDecoration: "none", transition: "all 0.2s",
                boxShadow: "0 4px 14px rgba(37,211,102,0.28)",
              }}
              onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.07)"}
              onMouseLeave={e => e.currentTarget.style.filter = "brightness(1)"}
            >
              <span style={{ fontSize: 28 }}>💬</span>
              <div>
                <div style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, color: "#fff" }}>Chat on WhatsApp</div>
                <div style={{ fontFamily: T.font, fontSize: 12, color: "rgba(255,255,255,0.82)" }}>We reply instantly during business hours</div>
              </div>
            </a>

            {/* Services quick list */}
            <div style={{
              background: T.white, borderRadius: 16, border: `1px solid ${T.border}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)", padding: "22px 24px",
            }}>
              <h3 style={{ fontFamily: T.font, fontSize: 14, fontWeight: 700, color: T.slate, margin: "0 0 14px" }}>
                Our Services
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["BIS/CRS", "WPC-ETA", "TEC/MTCTE", "BEE", "EPR", "LMPC", "CDSCO", "ISO"].map(s => (
                  <span key={s} style={{
                    fontFamily: T.font, fontSize: 11.5, fontWeight: 600,
                    padding: "4px 11px", borderRadius: 20,
                    background: T.cream, border: `1px solid ${T.border}`, color: T.teal,
                  }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div style={{
              background: `linear-gradient(135deg,${T.titleblue},${T.teal})`,
              borderRadius: 14, padding: "18px 20px",
            }}>
              {[
                { icon: "✅", text: "0% Failure Rate" },
                { icon: "⚡", text: "Free Initial Consultation" },
                { icon: "🔒", text: "100% Confidential" },
                { icon: "🎯", text: "End-to-End Service" },
              ].map(b => (
                <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 16 }}>{b.icon}</span>
                  <span style={{ fontFamily: T.font, fontSize: 13, fontWeight: 500, color: "#fff" }}>{b.text}</span>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 12, marginTop: 4 }}>
                <div style={{ fontFamily: T.font, fontSize: 11, color: "rgba(255,255,255,0.65)", textAlign: "center" }}>
                  Trusted by 1,000+ businesses across India
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}