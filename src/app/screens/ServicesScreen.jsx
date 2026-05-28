"use client";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const C = {
  primary: "#F97316", primaryDark: "#EA6A0A", primaryLight: "#FFF3E8",
  blue: "#0891B2", blueLight: "#ECFEFF", navy: "#0C2340",
  bodyText: "#374151", mutedText: "#6B7280", border: "#E5E7EB",
  white: "#FFFFFF", offWhite: "#F9FAFB",
  serif: "'Playfair Display', Georgia, serif", sans: "'DM Sans', system-ui, sans-serif",
};

const categories = [
  {
    id: "bis", icon: "🏅", title: "BIS Certification",
    subtitle: "Bureau of Indian Standards",
    href: "/bis",
    desc: "Mandatory quality certification for electronics, consumer goods, and industrial products sold in India.",
    accentBg: "#FFF3E8", accentBorder: "#FED7AA", accentText: "#EA6A0A",
    services: [
      { name: "BIS ISI Mark Certification", tag: "Mandatory" },
      { name: "BIS CRS Registration", tag: "Electronics" },
      { name: "BIS Scheme-X Certification", tag: "Foreign Mfr" },
      { name: "BIS Hallmarking for Gold", tag: "Jewellery" },
      { name: "FMCS Mark Certification", tag: "" },
      { name: "ECO Mark Certification", tag: "" },
      { name: "Laboratory Accreditation", tag: "" },
      { name: "WMI Registration", tag: "" },
    ],
  },
  {
    id: "epr", icon: "♻️", title: "EPR Registration",
    subtitle: "Extended Producer Responsibility",
    href: "/epr",
    desc: "Mandatory registration under CPCB for producers, importers & brand owners managing waste.",
    accentBg: "#ECFEFF", accentBorder: "#A5F3FC", accentText: "#0891B2",
    services: [
      { name: "EPR for E-Waste", tag: "Mandatory" },
      { name: "EPR for Plastic Waste", tag: "Mandatory" },
      { name: "EPR for Battery Waste", tag: "Mandatory" },
      { name: "EPR for Tyre Waste", tag: "" },
      { name: "EPR for Used Oil", tag: "" },
      { name: "CPCB Authorization", tag: "" },
      { name: "No Objection Certificate", tag: "" },
    ],
  },
  {
    id: "wpc", icon: "📡", title: "WPC Approval",
    subtitle: "Wireless Planning & Coordination",
    href: "/wpc",
    desc: "Essential approval for all wireless, Bluetooth, Wi-Fi, and RF devices imported or sold in India.",
    accentBg: "#EFF6FF", accentBorder: "#BFDBFE", accentText: "#1d4ed8",
    services: [
      { name: "WPC-ETA Approval", tag: "Import" },
      { name: "WPC Import License", tag: "" },
      { name: "DPL / NDPL License", tag: "" },
      { name: "Equipment Type Approval", tag: "" },
    ],
  },
  {
    id: "tec", icon: "📶", title: "TEC / MTCTE",
    subtitle: "Telecom Engineering Centre",
    href: "/tec",
    desc: "Mandatory certification under DoT for all telecom equipment and IoT devices in India.",
    accentBg: "#F5F3FF", accentBorder: "#DDD6FE", accentText: "#6d28d9",
    services: [
      { name: "TEC / MTCTE Certification", tag: "Mandatory" },
      { name: "TAC & IMEI Registration", tag: "Mobiles" },
      { name: "IoT Device Certification", tag: "" },
      { name: "Telecom Equipment Approval", tag: "" },
    ],
  },
  {
    id: "bee", icon: "⚡", title: "BEE Registration",
    subtitle: "Bureau of Energy Efficiency",
    href: "/bee",
    desc: "Mandatory star labelling for energy-consuming appliances sold in India under BEE norms.",
    accentBg: "#FFFBEB", accentBorder: "#FDE68A", accentText: "#b45309",
    services: [
      { name: "BEE Star Label Registration", tag: "Mandatory" },
      { name: "Energy Efficiency Certification", tag: "" },
      { name: "Mandatory Star Rating", tag: "" },
      { name: "Voluntary Star Rating", tag: "" },
    ],
  },
  {
    id: "lmpc", icon: "⚖️", title: "LMPC Registration",
    subtitle: "Legal Metrology Packaged Commodities",
    href: "/lmpc",
    desc: "Mandatory compliance for all pre-packaged goods sold in India under Legal Metrology Act.",
    accentBg: "#FFF1F2", accentBorder: "#FECDD3", accentText: "#be123c",
    services: [
      { name: "LMPC Import License", tag: "Mandatory" },
      { name: "LMPC Manufacturer Registration", tag: "" },
      { name: "Packaged Commodity Registration", tag: "" },
      { name: "Legal Metrology Certification", tag: "" },
    ],
  },
  {
    id: "iso", icon: "🌐", title: "ISO Certification",
    subtitle: "International Standards Organization",
    href: "/iso",
    desc: "Globally recognized quality management and environmental standards for all industries.",
    accentBg: "#F0FDF4", accentBorder: "#BBF7D0", accentText: "#15803d",
    services: [
      { name: "ISO 9001 – Quality Management", tag: "Most Popular" },
      { name: "ISO 14001 – Environment", tag: "" },
      { name: "ISO 45001 – Health & Safety", tag: "" },
      { name: "ISO 27001 – Information Security", tag: "" },
      { name: "ISO 22000 – Food Safety", tag: "" },
      { name: "ISO 13485 – Medical Devices", tag: "" },
    ],
  },
  {
    id: "cdsco", icon: "💊", title: "CDSCO Licensing",
    subtitle: "Central Drugs Standard Control Organization",
    href: "/cdsco",
    desc: "Regulatory approvals for drugs, cosmetics, and medical devices under CDSCO / DCGI.",
    accentBg: "#FDF4FF", accentBorder: "#F0ABFC", accentText: "#86198f",
    services: [
      { name: "Drug License", tag: "" },
      { name: "Cosmetic License", tag: "" },
      { name: "Medical Device Registration", tag: "" },
      { name: "CDSCO Import License", tag: "" },
      { name: "DCGI Approval", tag: "" },
    ],
  },
];

const process = [
  { step: "01", title: "Consultation", desc: "Free assessment of your product and applicable certification requirements.", icon: "💬" },
  { step: "02", title: "Documentation", desc: "Our experts prepare and verify every document needed for your application.", icon: "📄" },
  { step: "03", title: "Application", desc: "We file the complete, error-free application with the regulatory body.", icon: "📤" },
  { step: "04", title: "Follow-up", desc: "We actively track and respond to queries until your certificate is issued.", icon: "🎓" },
];

export default function ServicesScreen() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: C.white, fontFamily: C.sans, color: C.bodyText }}>
      <style>{`
        * { box-sizing: border-box; }

        /* ── Hero ── */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .hero-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hero-section {
          position: relative;
          min-height: 72vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .hero-section { min-height: auto; }
        }

        .hero-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 40px;
          width: 100%;
          position: relative;
          z-index: 2;
        }
        @media (max-width: 768px) {
          .hero-inner { padding: 64px 20px; }
        }
        @media (max-width: 480px) {
          .hero-inner { padding: 48px 16px; }
        }

        /* ── Category cards ── */
        .cat-header {
          background-color: var(--accent-bg);
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          border-bottom: 1.5px solid var(--accent-border);
        }
        @media (max-width: 768px) {
          .cat-header { padding: 20px 20px; flex-direction: column; align-items: flex-start; }
        }

        .cat-header-right {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .cat-header-right { width: 100%; flex-direction: column; align-items: flex-start; gap: 12px; }
          .cat-header-right button { width: 100%; }
        }

        .svc-items {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          padding: 24px 32px;
        }
        @media (max-width: 768px) {
          .svc-items { padding: 16px 20px; grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .svc-items { grid-template-columns: 1fr; }
        }

        /* ── Steps ── */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 24px;
        }
        @media (max-width: 600px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (max-width: 380px) {
          .steps-grid { grid-template-columns: 1fr; }
        }

        /* ── Process banner ── */
        .process-banner {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 40px;
          height: 200px;
        }
        @media (max-width: 600px) {
          .process-banner { height: 150px; border-radius: 14px; }
        }

        .process-banner-text {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          padding: 0 48px;
        }
        @media (max-width: 600px) {
          .process-banner-text { padding: 0 24px; }
        }

        /* ── Shared section padding ── */
        .sec-pad { padding: 88px 24px; }
        @media (max-width: 768px) { .sec-pad { padding: 56px 16px; } }
        @media (max-width: 480px) { .sec-pad { padding: 40px 12px; } }

        /* ── Shared ── */
        .section-label {
          font-size: 11px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: #F97316;
          margin-bottom: 12px; display: block;
        }

        .cat-card {
          background: #fff; border-radius: 20px;
          border: 1.5px solid #E5E7EB; overflow: hidden;
          transition: box-shadow 0.25s;
        }
        .cat-card:hover { box-shadow: 0 12px 40px rgba(249,115,22,0.10); border-color: #F97316; }

        .svc-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 10px 14px; border-radius: 10px;
          border: 1.5px solid #F3F4F6; background: #F9FAFB;
          text-decoration: none; cursor: pointer; transition: all 0.2s;
          width: 100%; font-family: inherit; text-align: left;
        }
        .svc-item:hover { border-color: #F97316; background: #FFF3E8; }

        .step-card {
          background: #fff; border-radius: 16px; padding: 28px 24px;
          border: 1.5px solid #E5E7EB; text-align: center; transition: all 0.2s;
          position: relative;
        }
        .step-card:hover { border-color: #F97316; box-shadow: 0 8px 24px rgba(249,115,22,0.10); }
        @media (max-width: 600px) {
          .step-card { padding: 20px 16px; }
        }

        /* Step connector lines — hide on small screens */
        .step-connector {
          position: absolute; top: 44px; right: -12px;
          width: 24px; height: 2px; background: #F97316; z-index: 1;
        }
        @media (max-width: 600px) { .step-connector { display: none; } }

        /* ── CTA ── */
        .cta-buttons {
          display: flex; flex-wrap: wrap;
          justify-content: center; gap: 16px;
        }
        @media (max-width: 480px) {
          .cta-buttons { flex-direction: column; align-items: stretch; }
          .cta-buttons > * { text-align: center; justify-content: center; }
        }

        /* ── Frosted info card ── */
        .info-card {
          background: rgba(255,255,255,0.07);
          border-radius: 20px; padding: 28px;
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
        }
        @media (max-width: 900px) {
          .info-card { padding: 24px 20px; }
        }

        /* ── Cat title area ── */
        .cat-title-group {
          display: flex; align-items: center; gap: 16px;
        }
        @media (max-width: 480px) {
          .cat-title-group { gap: 12px; }
        }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section className="hero-section">
        <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1800&q=85&fit=crop" alt="Compliance services India" fill style={{ objectFit: "cover", objectPosition: "center 35%" }} unoptimized />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(12,35,64,0.90) 55%, rgba(12,35,64,0.55) 100%)" }} />

        <div className="hero-inner">
          <div className="hero-grid">
            {/* Left */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.2)", border: "1px solid rgba(249,115,22,0.4)", borderRadius: 999, padding: "6px 16px", marginBottom: 20 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: C.primary, display: "inline-block" }} />
                <span style={{ color: C.primary, fontSize: 11, fontWeight: 600, letterSpacing: "0.06em" }}>What We Offer</span>
              </div>
              <h1 style={{ fontFamily: C.serif, fontSize: "clamp(1.75rem,4vw,3.4rem)", color: "#fff", margin: "0 0 20px", fontWeight: 800, lineHeight: 1.15 }}>
                9 Certification &<br />Compliance Services
              </h1>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(14px,1.6vw,16px)", lineHeight: 1.8, maxWidth: 520, marginBottom: 32 }}>
                End-to-end regulatory compliance solutions for manufacturers, importers, and brand owners. From BIS and EPR to ISO and CDSCO — we've got every certification covered.
              </p>
              <div className="hero-badges">
                {categories.map(cat => (
                  <button key={cat.id} onClick={() => router.push(cat.href)}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 999, color: "#fff", fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: C.sans, backdropFilter: "blur(4px)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(249,115,22,0.25)"; e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                  >
                    <span>{cat.icon}</span> {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right — frosted info card */}
            <div className="info-card">
              <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Why Choose SIACC</div>
              {[
                { label: "Services Offered", value: "50+" },
                { label: "Regulatory Bodies", value: "15+" },
                { label: "Clients Served", value: "10,000+" },
                { label: "Failure Rate", value: "0%" },
                { label: "Years of Experience", value: "12+" },
              ].map((item, i, arr) => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{item.label}</span>
                  <span style={{ fontSize: 15, color: "#fff", fontWeight: 800, fontFamily: C.serif }}>{item.value}</span>
                </div>
              ))}
              <button onClick={() => router.push("/contact")}
                style={{ width: "100%", marginTop: 24, padding: 13, backgroundColor: C.primary, color: "#fff", fontWeight: 700, borderRadius: 10, border: "none", fontSize: 14, cursor: "pointer", fontFamily: C.sans, boxShadow: "0 4px 12px rgba(249,115,22,0.35)" }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryDark}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = C.primary}
              >
                Get Free Consultation →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES LIST ── */}
      <section className="sec-pad" style={{ background: C.offWhite }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">All Services</span>
            <h2 style={{ fontFamily: C.serif, fontSize: "clamp(1.5rem,3vw,2.4rem)", color: C.navy, fontWeight: 800, marginBottom: 14 }}>Browse by Category</h2>
            <p style={{ color: C.mutedText, maxWidth: 480, margin: "0 auto", lineHeight: 1.7, fontSize: 15 }}>Click any service to learn more about requirements, process, and timelines.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {categories.map(cat => (
              <div key={cat.id} className="cat-card"
                style={{ "--accent-bg": cat.accentBg, "--accent-border": cat.accentBorder }}>
                {/* Header */}
                <div className="cat-header"
                  style={{ backgroundColor: cat.accentBg, borderBottom: `1.5px solid ${cat.accentBorder}` }}>
                  <div className="cat-title-group">
                    <div style={{ width: 56, height: 56, borderRadius: 14, backgroundColor: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", flexShrink: 0 }}>
                      {cat.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: cat.accentText, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{cat.subtitle}</div>
                      <h3 style={{ fontFamily: C.serif, fontSize: "clamp(16px,2vw,21px)", color: C.navy, fontWeight: 800, margin: 0 }}>{cat.title}</h3>
                    </div>
                  </div>

                  <div className="cat-header-right">
                    <p style={{ fontSize: 13, color: C.mutedText, lineHeight: 1.65, margin: 0, maxWidth: 380 }}>{cat.desc}</p>
                    <button onClick={() => router.push(cat.href)}
                      style={{ display: "inline-block", padding: "10px 22px", backgroundColor: C.primary, color: C.white, borderRadius: 10, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: C.sans, whiteSpace: "nowrap", boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = C.primaryDark}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = C.primary}
                    >
                      Learn More →
                    </button>
                  </div>
                </div>

                {/* Service items */}
                <div className="svc-items">
                  {cat.services.map(svc => (
                    <button key={svc.name} onClick={() => router.push(cat.href)} className="svc-item">
                      <span style={{ fontSize: 13, color: C.bodyText, fontWeight: 500, textAlign: "left" }}>{svc.name}</span>
                      {svc.tag && (
                        <span style={{ fontSize: 10, fontWeight: 700, backgroundColor: cat.accentBg, color: cat.accentText, padding: "2px 8px", borderRadius: 999, marginLeft: 8, flexShrink: 0, border: `1px solid ${cat.accentBorder}` }}>
                          {svc.tag}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="sec-pad" style={{ background: C.white }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span className="section-label">How We Work</span>
            <h2 style={{ fontFamily: C.serif, fontSize: "clamp(1.5rem,3vw,2.4rem)", color: C.navy, fontWeight: 800, marginBottom: 14 }}>Simple 4-Step Process</h2>
            <p style={{ color: C.mutedText, maxWidth: 420, margin: "0 auto", lineHeight: 1.7, fontSize: 15 }}>From first enquiry to certificate delivery — we handle everything.</p>
          </div>

          <div className="process-banner">
            <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80&fit=crop" alt="Process" fill style={{ objectFit: "cover", objectPosition: "center 35%" }} unoptimized />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(12,35,64,0.88) 0%, rgba(12,35,64,0.4) 60%, transparent 100%)" }} />
            <div className="process-banner-text">
              <div>
                <div style={{ fontFamily: C.serif, fontSize: "clamp(1.1rem,2.5vw,1.8rem)", color: "#fff", fontWeight: 800, marginBottom: 8 }}>Your Certificate. Our Responsibility.</div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(12px,1.4vw,14px)", margin: 0 }}>10,000+ certifications delivered across 50+ regulatory frameworks in India.</p>
              </div>
            </div>
          </div>

          <div className="steps-grid">
            {process.map((p, i) => (
              <div key={p.step} className="step-card">
                {i < process.length - 1 && <div className="step-connector" />}
                <div style={{ width: 56, height: 56, margin: "0 auto 16px", borderRadius: 16, backgroundColor: C.primaryLight, border: "2px solid #FED7AA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{p.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.primary, letterSpacing: "0.1em", marginBottom: 8 }}>STEP {p.step}</div>
                <h3 style={{ fontFamily: C.serif, fontSize: 17, color: C.navy, marginBottom: 10, fontWeight: 700 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: C.mutedText, lineHeight: 1.7, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: "relative", padding: "80px 24px", overflow: "hidden" }}>
        <Image src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=80&fit=crop" alt="CTA" fill style={{ objectFit: "cover" }} unoptimized />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(249,115,22,0.93) 0%, rgba(234,88,12,0.88) 100%)" }} />
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: C.serif, fontSize: "clamp(1.5rem,3vw,2.6rem)", color: "#fff", marginBottom: 16, fontWeight: 800 }}>Not Sure Which Certification You Need?</h2>
          <p style={{ color: "rgba(255,255,255,0.88)", marginBottom: 36, lineHeight: 1.7, fontSize: 15 }}>Talk to our experts for free — we'll tell you exactly what's required for your product.</p>
          <div className="cta-buttons">
            <button onClick={() => router.push("/contact")}
              style={{ padding: "14px 36px", backgroundColor: "#fff", color: C.primary, fontWeight: 800, borderRadius: 12, border: "none", fontSize: 14, cursor: "pointer", fontFamily: C.sans, boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}>
              Get Free Consultation
            </button>
            <a href="tel:+919876543210"
              style={{ padding: "14px 28px", border: "2px solid rgba(255,255,255,0.6)", color: "#fff", borderRadius: 12, textDecoration: "none", fontSize: 14, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              📞 +91- 9540190334
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}