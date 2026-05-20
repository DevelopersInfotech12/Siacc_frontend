"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../animations.css";

const T = {
  teal: "#1E88C8", tealDark: "#074D4D", tealMid: "#0E8080", titleblue: "#0a6daa",
  para: "#080000b0", paradark: "#080000c4",
  tealLight: "#EBF5F5", amber: "#C8780A", amberLight: "#FEF3DC", amberDark: "#9A5C06",
  slate: "#0D1B2A", body: "#2D3748", muted: "#718096", subtle: "#A0AEC0",
  border: "#E8E3DA", borderLight: "#F0ECE5", white: "#FFFFFF", cream: "#FAF8F4",
  ctaBand: "#EBF5FB", ctaBandBorder: "#C8DFF0", orange: "#F97316",
  serif: "'Cormorant Garamond','Georgia',serif",
  sans: "'Outfit','system-ui',sans-serif",
  poppins: "'Poppins','system-ui',sans-serif",
};

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${open ? "rgba(30,136,200,0.45)" : T.border}`, borderRadius: 10, marginBottom: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
      <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "13px 16px", background: open ? "rgba(30,136,200,0.04)" : "transparent", border: "none", width: "100%", textAlign: "left", cursor: "pointer", transition: "background 0.18s" }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: open ? T.teal : T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: open ? "#fff" : T.teal, flexShrink: 0, fontFamily: T.poppins, transition: "background 0.2s, color 0.2s" }}>Q</div>
        <span style={{ fontFamily: T.poppins, fontSize: 13, fontWeight: 600, color: T.slate, lineHeight: 1.45, flex: 1 }}>{faq.q}</span>
        <span style={{ fontSize: 14, color: open ? T.teal : T.muted, flexShrink: 0, marginTop: 4, transition: "transform 0.25s, color 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>▾</span>
      </button>
      {open && (
        <div style={{ display: "flex", gap: 10, padding: "0 16px 14px" }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: T.amberLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: T.amber, flexShrink: 0, fontFamily: T.poppins }}>A</div>
          <p style={{ fontFamily: T.poppins, fontSize: 12.5, fontWeight: 300, color: T.paradark, lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
        </div>
      )}
    </div>
  );
}

function useReveal(opts = {}) {
  const { threshold = 0.15, stagger = false, baseDelay = 90, once = true } = opts;
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (stagger) {
        Array.from(el.children).forEach((child, i) => {
          child.style.transitionDelay = i * baseDelay + "ms";
          child.classList.add("revealed");
        });
      } else { el.classList.add("revealed"); }
      if (once) obs.unobserve(el);
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, stagger, baseDelay, once]);
  return ref;
}

// ── STATIC DATA ───────────────────────────────────────────────────────────────

const types = [
  { icon: "📡", title: "WPC-ETA Approval", tag: "Import Mandatory", desc: "Equipment Type Approval for importing wireless devices with Bluetooth, Wi-Fi, Zigbee, or RF frequency bands." },
  { icon: "📋", title: "WPC Import License", tag: "Commercial Import", desc: "Required for commercial import of wireless telecom equipment into India under WPC norms." },
  { icon: "📻", title: "DPL / NDPL License", tag: "Possession", desc: "Demonstration Purpose License and Non-Demonstration Purpose License for RF devices." },
  { icon: "🔬", title: "Equipment Type Approval", tag: "Testing", desc: "Type approval for telecom equipment submitted for testing and approval under DoT guidelines." },
];

const faqs = [
  { q: "Which devices need WPC-ETA approval?", a: "Any device using unlicensed radio frequency spectrum — including Wi-Fi, Bluetooth, Zigbee, Z-Wave, RFID, GPS modules, and wireless IoT devices — requires WPC-ETA approval before import." },
  { q: "Can I import wireless devices without WPC approval?", a: "No. Importing wireless devices without WPC-ETA is illegal and the shipment will be detained at customs. The importer can also face penalties under the Indian Wireless Telegraphy Act." },
  { q: "How long is WPC-ETA approval valid?", a: "WPC-ETA approvals are typically valid for 5 years from the date of issue and can be renewed before expiry to ensure continued compliance." },
  { q: "Do Indian-manufactured wireless devices also need WPC?", a: "WPC-ETA is primarily for imports. Indian manufacturers need a manufacturing license under WPC rules for licensed spectrum devices. We assist with both scenarios." },
  { q: "What happens if my product fails RF testing?", a: "We help identify the root cause — antenna design, power levels, or shielding issues — coordinate with your engineering team for fixes, and arrange re-testing at the earliest opportunity." },
];

const infoItems = [
  { label: "Governing Body", value: "WPC Wing, DoT" },
  { label: "Portal", value: "Saralsanchar.gov.in" },
  { label: "Validity", value: "5 Years" },
  { label: "Processing Time", value: "4–8 Weeks" },
  { label: "Applicable To", value: "Wi-Fi, BT, RF Devices" },
];

const statsStrip = [
  { value: "5 yrs", label: "Approval Validity", icon: "📅" },
  { value: "4–8", label: "Weeks Timeline", icon: "⚡" },
  { value: "Free", label: "Initial Consultation", icon: "🆓" },
  { value: "0%", label: "Failure Rate", icon: "❌" },
];

const heroChips = [
  { icon: "📡", label: "WPC-ETA Approval" },
  { icon: "📋", label: "Import License" },
  { icon: "📻", label: "DPL / NDPL" },
  { icon: "🔬", label: "Equipment Type Approval" },
  { icon: "✅", label: "0% Failure Rate" },
];

// ── SECTION 1 — BENEFITS ──────────────────────────────────────────────────────

const benefits = [
  {
    icon: "✈️",
    title: "Legal Import & Customs Clearance",
    desc: "WPC-ETA is mandatory for customs clearance of wireless devices in India. Without it, your shipment is detained at the port of entry and returned or destroyed. Approval ensures smooth, penalty-free import.",
  },
  {
    icon: "📶",
    title: "Covers All Wireless Technologies",
    desc: "WPC-ETA covers every unlicensed frequency band — Wi-Fi (2.4 GHz, 5 GHz, 6 GHz), Bluetooth, Zigbee, Z-Wave, LoRa, RFID, GPS modules, and proprietary RF devices. One approval covers the model.",
  },
  {
    icon: "🔒",
    title: "Protection Against Spectrum Interference",
    desc: "Approved devices are verified to operate within DoT-specified power limits, reducing the risk of spectrum interference — a key concern for telecom regulators, enterprise buyers, and government procurement.",
  },
  {
    icon: "🏛️",
    title: "Access to Government & Enterprise Tenders",
    desc: "Government and large enterprise procurement orders for wireless devices (routers, IoT sensors, smart meters) routinely require valid WPC-ETA as a mandatory compliance document.",
  },
  {
    icon: "🌐",
    title: "Gateway for IoT & Smart Device Imports",
    desc: "India's IoT and smart device market is one of the fastest growing globally. WPC-ETA is the essential entry ticket for any connected device — smart home, industrial IoT, wearables, or medical wireless devices.",
  },
  {
    icon: "🛡️",
    title: "Protection Against Penalties & Seizure",
    desc: "The Indian Wireless Telegraphy Act provides for heavy fines and imprisonment for possession or import of unapproved wireless equipment. WPC-ETA eliminates this legal and financial risk entirely.",
  },
  {
    icon: "⚡",
    title: "No Factory Inspection Required",
    desc: "Unlike ISI Mark, WPC-ETA does not require a factory inspection. The process is documentation and test-report driven, making it significantly faster and more accessible for both Indian importers and foreign brands.",
  },
  {
    icon: "🔁",
    title: "5-Year Validity with Simple Renewal",
    desc: "WPC-ETA certificates are valid for 5 years — one of the longer regulatory approval windows in India. Renewal is straightforward if the product specifications and frequency parameters remain unchanged.",
  },
];

// ── SECTION 2 — DETAILED STEPS ────────────────────────────────────────────────

const detailedSteps = [
  {
    step: "01",
    icon: "🔍",
    title: "Device & Frequency Assessment",
    desc: "We review your device specifications to identify all frequency bands, power levels, and modulation types used. This determines the applicable WPC approval type (ETA, Import License, DPL/NDPL) and the exact test parameters required.",
    tip: "Tip: Devices with multiple wireless technologies (e.g., Wi-Fi + Bluetooth + Zigbee) may need testing across multiple frequency bands — all covered under a single ETA application.",
  },
  {
    step: "02",
    icon: "🧪",
    title: "RF & EMC Lab Testing",
    desc: "Device samples are sent to a WPC-recognized laboratory for RF testing. Tests verify frequency accuracy, power output, spurious emissions, and band occupancy within DoT-specified limits for the applicable frequency bands.",
    tip: "Tip: Use production-representative samples — engineering prototypes with different antenna configurations may produce test results that don't match production units.",
  },
  {
    step: "03",
    icon: "📋",
    title: "Document Preparation",
    desc: "We compile the complete application package: RF test report, technical specifications, product photos (all angles), user manual, company KYC, IEC certificate, and authorization letter — formatted precisely as required by WPC.",
    tip: "Tip: Mismatched model numbers between the test report and application form are the most common cause of WPC query letters, adding 1–2 weeks to the timeline.",
  },
  {
    step: "04",
    icon: "📤",
    title: "Application on Saralsanchar Portal",
    desc: "We file the complete WPC-ETA application on the Saralsanchar portal (saralsanchar.gov.in) — the official DoT portal for all wireless equipment approvals. Government fees are paid online at this stage.",
    tip: "Tip: The Saralsanchar portal has multiple form types for different approval categories. Selecting the wrong form type requires a fresh application — a common first-timer mistake.",
  },
  {
    step: "05",
    icon: "🔎",
    title: "WPC Review & Query Resolution",
    desc: "The WPC Wing of DoT reviews the application and test reports. If clarifications or additional documents are required, WPC raises queries. Prompt and accurate responses are critical to maintaining the approval timeline.",
    tip: "Tip: WPC queries are typically raised within 2–3 weeks of application submission. Delays in responding extend the approval timeline by the same duration.",
  },
  {
    step: "06",
    icon: "🎓",
    title: "ETA Certificate Issuance",
    desc: "WPC issues the Equipment Type Approval certificate with a unique ETA reference number valid for 5 years. The certificate can be used for customs clearance for the approved model for the duration of its validity.",
    tip: "Important: The ETA certificate covers a specific model number. Any hardware change (antenna, power output, frequency band) requires a fresh application for the modified model.",
  },
];

// ── SECTION 3 — DOCUMENTS ────────────────────────────────────────────────────

const wpcDocs = [
  { icon: "📄", title: "RF Test Report", desc: "Valid RF test report from a WPC-recognized laboratory confirming compliance with DoT frequency and power specifications." },
  { icon: "📐", title: "Technical Specification Sheet", desc: "Detailed datasheet covering operating frequency bands, modulation type, transmit power, antenna gain, and all RF parameters." },
  { icon: "📸", title: "Product Photographs", desc: "Clear photographs of the device from all angles including the label showing model number, and the internal antenna if applicable." },
  { icon: "📘", title: "User Manual / Product Brochure", desc: "User manual or product brochure describing device features, operating frequencies, and safety instructions in English." },
  { icon: "🏢", title: "Company Registration Documents", desc: "Certificate of Incorporation, Partnership Deed, or equivalent business registration document for the importing entity." },
  { icon: "🔖", title: "Authorization / Appointment Letter", desc: "Letter authorizing the consultant or representative to file the WPC application on behalf of the importer or brand." },
  { icon: "🚢", title: "Import-Export Code (IEC)", desc: "IEC certificate issued by DGFT — mandatory for all importers applying for WPC-ETA in India." },
  { icon: "✅", title: "Declaration of Conformity", desc: "Self-declaration by the manufacturer confirming the device complies with applicable technical standards and DoT regulations." },
];

// ── SECTION 4 — TIMELINE, COST, VALIDITY ────────────────────────────────────

const timelineRows = [
  { phase: "Device & Frequency Assessment", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "RF & EMC Lab Testing", duration: "2–4 Weeks", owner: "WPC-Recognized Lab" },
  { phase: "Document Preparation & Review", duration: "3–5 Days", owner: "Applicant / Consultant" },
  { phase: "Saralsanchar Portal Application", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "WPC Review & Query Resolution", duration: "1–2 Weeks", owner: "WPC Wing, DoT" },
  { phase: "ETA Certificate Issuance", duration: "3–5 Days", owner: "WPC Wing, DoT" },
];

const costItems = [
  { label: "WPC Application Fee (government)", value: "₹500 – ₹2,000" },
  { label: "RF / EMC Lab Testing Charges", value: "₹10,000 – ₹60,000+" },
  { label: "Renewal Fee (every 5 years)", value: "₹500 – ₹2,000" },
  { label: "Consultant / Professional Fees", value: "Variable (contact us for quote)" },
];

const validityCards = [
  {
    icon: "📅",
    title: "Certificate Validity",
    value: "5 Years",
    desc: "WPC-ETA certificates are valid for 5 years from the date of issue — one of the longest regulatory approval windows for electronics in India.",
    color: "#1E88C8",
  },
  {
    icon: "🔄",
    title: "Renewal Window",
    value: "Before Expiry",
    desc: "Renewal must be initiated before the certificate expires. Expired certificates require a completely fresh application with new testing.",
    color: "#C8780A",
  },
  {
    icon: "📋",
    title: "Renewal Condition",
    value: "No Spec Change",
    desc: "Renewal is straightforward if frequency bands, power output, antenna configuration, and the applicable IS standard have not changed.",
    color: "#0E8080",
  },
  {
    icon: "🔖",
    title: "Per-Model Certificate",
    value: "Each Model",
    desc: "Each model number requires its own WPC-ETA certificate. Variants with different antenna types or power configurations need separate applications.",
    color: "#C84E1E",
  },
];

// ── CSS ───────────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  img{max-width:100%;display:block;} a{text-decoration:none;color:inherit;}
  .sl-row{display:flex;align-items:center;gap:12px;margin-bottom:16px;}
  .sl-line{width:28px;height:1.5px;background:#1E88C8;flex-shrink:0;}
  .sl-text{font-family:'Outfit','system-ui',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#1E88C8;}
  @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.6;transform:scale(1.3);}}
  .hero-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.09);border:1px solid rgba(255,255,255,0.16);backdrop-filter:blur(6px);border-radius:6px;padding:9px 16px;font-family:'Outfit','system-ui',sans-serif;font-size:12.5px;font-weight:500;color:rgba(255,255,255,0.90);transition:background 0.2s,border-color 0.2s,transform 0.2s;}
  .hero-chip:hover{background:rgba(255,255,255,0.18);border-color:rgba(255,255,255,0.35);transform:translateY(-2px);}
  .overview-grid{display:grid;grid-template-columns:1fr 360px;gap:48px;align-items:flex-start;}
  @media(max-width:960px){.overview-grid{grid-template-columns:1fr;}}
  .stats-strip{display:grid;grid-template-columns:repeat(4,1fr);}
  @media(max-width:640px){.stats-strip{grid-template-columns:repeat(2,1fr);}}
  .types-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;}
  @media(max-width:640px){.types-grid{grid-template-columns:1fr;}}
  .type-card{background:#fff;border-radius:10px;padding:28px;border:1px solid #E8E3DA;transition:all 0.25s;}
  .type-card:hover{border-color:#1E88C8;transform:translateY(-3px);box-shadow:0 12px 32px rgba(30,136,200,0.09);}
  .cta-split{display:grid;grid-template-columns:1fr auto;gap:40px;align-items:center;}
  @media(max-width:720px){.cta-split{grid-template-columns:1fr;gap:28px;}}
  .sec{padding:clamp(64px,8vw,104px) clamp(16px,5vw,56px);}
  .inner{max-width:1280px;margin:0 auto;}
  .faq-grid{}
  @media(max-width:760px){.faq-grid{grid-template-columns:1fr!important;}}

  /* ── SECTION 1 — BENEFITS ── */
  .benefits-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px;}
  @media(max-width:640px){.benefits-grid{grid-template-columns:1fr;}}
  .benefit-card{background:#fff;border-radius:12px;padding:26px 24px;border:1px solid #E8E3DA;transition:all 0.25s;position:relative;overflow:hidden;}
  .benefit-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:#1E88C8;opacity:0;transition:opacity 0.25s;}
  .benefit-card:hover{border-color:#1E88C8;transform:translateY(-3px);box-shadow:0 14px 36px rgba(30,136,200,0.09);}
  .benefit-card:hover::before{opacity:1;}

  /* ── SECTION 2 — DETAILED STEPS ── */
  .detailed-steps-list{display:flex;flex-direction:column;gap:0;}
  .dstep-row{display:grid;grid-template-columns:60px 1fr;gap:0;position:relative;}
  .dstep-row:not(:last-child) .dstep-line{position:absolute;left:29px;top:60px;bottom:-1px;width:2px;background:linear-gradient(to bottom,#1E88C8,rgba(30,136,200,0.15));z-index:0;}
  .dstep-left{display:flex;flex-direction:column;align-items:center;padding-top:6px;position:relative;z-index:1;}
  .dstep-num{width:42px;height:42px;border-radius:50%;background:#1E88C8;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Poppins','system-ui',sans-serif;font-size:13px;font-weight:700;flex-shrink:0;}
  .dstep-body{padding:4px 0 36px 20px;}
  @media(max-width:640px){.dstep-body{padding-bottom:24px;}}
  .dstep-side-grid{display:grid;grid-template-columns:1fr 380px;gap:48px;align-items:flex-start;}
  @media(max-width:960px){.dstep-side-grid{grid-template-columns:1fr;}}

  /* ── SECTION 3 — DOCUMENTS ── */
  .crs-docs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;}
  @media(max-width:640px){.crs-docs-grid{grid-template-columns:1fr;}}
  .doc-card{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.13);border-radius:10px;padding:20px;display:flex;gap:14px;align-items:flex-start;backdrop-filter:blur(4px);transition:background 0.2s,border-color 0.2s;}
  .doc-card:hover{background:rgba(255,255,255,0.14);border-color:rgba(255,255,255,0.28);}

  /* ── SECTION 4 — TIMELINE / COST / VALIDITY ── */
  .timeline-table{width:100%;border-collapse:collapse;}
  .timeline-table th{font-family:'Poppins','system-ui',sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1E88C8;padding:10px 16px;border-bottom:2px solid #E8E3DA;text-align:left;}
  .timeline-table td{font-family:'Outfit','system-ui',sans-serif;font-size:14px;color:#2D3748;padding:14px 16px;border-bottom:1px solid #F0ECE5;vertical-align:top;}
  .timeline-table tr:last-child td{border-bottom:none;}
  .timeline-table tr:hover td{background:rgba(30,136,200,0.03);}
  .timeline-table td:nth-child(2){font-family:'Poppins','system-ui',sans-serif;font-weight:600;color:#1E88C8;white-space:nowrap;}
  .cost-row{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid #F0ECE5;transition:background 0.15s;}
  .cost-row:last-child{border-bottom:none;}
  .cost-row:hover{background:rgba(30,136,200,0.03);}
  .validity-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px;}
@media(max-width:600px){.validity-grid{grid-template-columns:1fr;}}
  .validity-card{border-radius:12px;padding:24px 20px;border:1px solid #E8E3DA;background:#fff;transition:all 0.22s;text-align:center;}
  .validity-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,0.07);}
  .tlcv-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:flex-start;}
  @media(max-width:860px){.tlcv-grid{grid-template-columns:1fr;}}
`;

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function WPCScreen() {
  const router = useRouter();

  const heroLeftRef    = useReveal();
  const overviewRef    = useReveal();
  const infoCardRef    = useReveal();
  const statsRef       = useReveal({ stagger: true, baseDelay: 100 });
  const typesTtlRef    = useReveal();
  const typesRef       = useReveal({ stagger: true, baseDelay: 80 });

  // Section 1
  const benefitsTtlRef = useReveal();
  const benefitsRef    = useReveal({ stagger: true, baseDelay: 75 });

  // Section 2
  const dstepsTtlRef   = useReveal();
  const dstepsRef      = useReveal();

  // Section 3
  const crsDocsTtlRef  = useReveal();
  const crsDocsRef     = useReveal({ stagger: true, baseDelay: 70 });

  // Section 4
  const tlcvTtlRef     = useReveal();
  const tlcvRef        = useReveal();

  // FAQ + CTA
  const faqRef         = useReveal({ stagger: true, baseDelay: 80 });
  const ctaRef         = useReveal();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: T.white, fontFamily: T.sans, color: T.body }}>
      <style>{css}</style>
      <Navbar />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${T.border}`, minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom,${T.orange},${T.teal})`, zIndex: 3 }} />
        <img src="/finalimages/siaccwpc.png" alt="WPC Approval" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right,rgba(7,18,28,0.88) 0%,rgba(7,18,28,0.60) 50%,rgba(7,18,28,0.10) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,4vw,60px)" }}>
          <div ref={heroLeftRef} className="reveal-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", borderRadius: 4, padding: "6px 16px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Wireless Planning & Coordination Wing — Certified Consultants
              </span>
            </div>
            <h1 style={{ fontFamily: T.poppins, fontSize: "clamp(2.6rem,5.2vw,4.2rem)", fontWeight: 700, lineHeight: 1.04, marginBottom: 20, letterSpacing: "-0.01em", color: "#fff", maxWidth: 640 }}>
              WPC-ETA Approval for{" "}
              <span style={{ color: T.orange }}>Wireless Devices</span>
            </h1>
            <p style={{ fontFamily: T.poppins, fontSize: 16, color: "rgba(255,255,255,0.82)", maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>
              Mandatory Equipment Type Approval for all Wi-Fi, Bluetooth, Zigbee, RFID & RF devices imported into India. End-to-end handled by our WPC specialists.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
              {heroChips.map(chip => (
                <span key={chip.label} className="hero-chip">
                  <span style={{ fontSize: 15 }}>{chip.icon}</span>{chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: T.teal, opacity: 0.6, zIndex: 2 }} />
      </section>

      {/* ══ STATS STRIP ══ */}
      <section style={{ background: T.teal }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="stats-strip" ref={statsRef}>
            {statsStrip.map((s, i) => (
              <div key={s.label} className={`reveal d${i}`} style={{ textAlign: "center", padding: "36px 16px", borderRight: i < statsStrip.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,2.8vw,2.8rem)", color: "#fff", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.01em" }}>{s.value}</div>
                <div style={{ fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,0.80)", marginTop: 8, letterSpacing: "0.04em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OVERVIEW ══ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div className="overview-grid">
            <div className="reveal-left" ref={overviewRef}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Wireless Planning & Coordination Wing</span></div>
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 16 }}>
                End-to-End WPC Compliance, <br />Handled for You
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.tealMid, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>Wi-Fi · Bluetooth · Zigbee · RF · IoT Devices</p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 16, textAlign: "justify" }}>
                Mandatory Equipment Type Approval for all wireless, Bluetooth, Wi-Fi and RF devices imported into India. We handle the entire process — testing, filing and approval tracking.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 32, textAlign: "justify" }}>
                Our WPC specialists coordinate with recognized labs, prepare your complete application on the Saralsanchar portal, and follow up until your approval certificate is issued — typically in 4–8 weeks.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                <button onClick={() => router.push("/contact")}
                  style={{ padding: "13px 32px", fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, letterSpacing: "0.02em", border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", boxShadow: "0 4px 16px rgba(10,104,104,0.22)", transition: "all 0.22s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = T.orange; e.currentTarget.style.transform = "translateY(0)"; }}>Get Free Consultation</button>
                <button onClick={() => router.push("/contact")}
                  style={{ padding: "12px 28px", fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, borderRadius: 6, cursor: "pointer", border: `1.5px solid ${T.border}`, color: T.slate, background: "transparent", transition: "all 0.22s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.teal; e.currentTarget.style.color = T.teal; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.slate; }}>Check Applicability →</button>
              </div>
              <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", height: 220 }}>
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&q=80&fit=crop" alt="WPC compliance team" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(14,128,128,0.78) 0%,rgba(30,136,200,0.45) 60%,rgba(235,245,251,0.15) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 28px" }}>
                  <div>
                    <div style={{ fontFamily: T.poppins, fontSize: "clamp(1rem,2vw,1.3rem)", color: "#fff", fontWeight: 700, marginBottom: 4 }}>Trusted by 1,000+ Importers</div>
                    <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.80)", fontSize: 12.5 }}>WPC-ETA · Import License · DPL/NDPL · Equipment Type Approval</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right" ref={infoCardRef}>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "sticky", top: 100 }}>
                <div className="sl-row"><div className="sl-line" /><span className="sl-text">Quick Info — WPC</span></div>
                {infoItems.map((item, i) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < infoItems.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <span style={{ fontFamily: T.sans, fontSize: 13, color: T.muted }}>{item.label}</span>
                    <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.slate, fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                  </div>
                ))}
                <button onClick={() => router.push("/contact")} style={{ width: "100%", marginTop: 22, padding: 13, background: T.orange, color: "#fff", fontWeight: 600, borderRadius: 6, border: "none", fontFamily: T.poppins, fontSize: 14, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.teal}
                  onMouseLeave={e => e.currentTarget.style.background = T.orange}>Start WPC Application →</button>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${T.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: "📞", label: "Call Us", value: "+91-9891229135", href: "tel:+919891229135" },
                    { icon: "✉", label: "Email Us", value: "starindia.acc@gmail.com", href: "mailto:starindia.acc@gmail.com" },
                  ].map(item => (
                    <a key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                      <div style={{ width: 36, height: 36, borderRadius: 7, backgroundColor: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontFamily: T.sans, fontSize: 10, color: T.teal, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</div>
                        <div style={{ fontFamily: T.poppins, fontSize: 13, color: T.slate, fontWeight: 500, marginTop: 1 }}>{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TYPES ══ */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={typesTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}><div className="sl-row"><div className="sl-line" /><span className="sl-text">Types of WPC Approval</span></div></div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>Which WPC Approval Do You Need?</h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 480, margin: "0 auto", lineHeight: 1.75, fontSize: 16 }}>Different wireless devices require different WPC approvals. Here's a breakdown of what applies to your product.</p>
          </div>
          <div className="types-grid" ref={typesRef}>
            {types.map((t, i) => (
              <div key={t.title} className={`type-card reveal d${i % 6}`}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 52, height: 52, background: T.tealLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{t.icon}</div>
                  <span style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 700, background: i % 2 === 0 ? T.tealLight : T.amberLight, color: i % 2 === 0 ? T.tealMid : T.amberDark, padding: "3px 10px", borderRadius: 3, letterSpacing: "0.06em" }}>{t.tag}</span>
                </div>
                <h3 style={{ fontFamily: T.poppins, fontSize: 17, color: T.paradark, marginBottom: 10, fontWeight: 600 }}>{t.title}</h3>
                <p style={{ fontFamily: T.sans, fontSize: 15, color: T.para, lineHeight: 1.6, margin: 0, textAlign: "justify" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — IMPORTANCE & BENEFITS OF WPC-ETA APPROVAL
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={benefitsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Why It Matters</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Importance & Benefits of WPC-ETA Approval
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 580, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              WPC-ETA is not just a regulatory requirement — it is the essential entry ticket for any wireless device entering India's fast-growing connected device market, and your legal shield against customs detention and penalties.
            </p>
          </div>

          <div className="benefits-grid" ref={benefitsRef}>
            {benefits.map((b, i) => (
              <div key={b.title} className={`benefit-card reveal d${i % 6}`}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 10, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                    {b.icon}
                  </div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 15.5, color: T.titleblue, fontWeight: 700, lineHeight: 1.3 }}>{b.title}</h3>
                </div>
                <p style={{ fontFamily: T.sans, textAlign: "justify",fontSize: 14, color: T.paradark, lineHeight: 1.8, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Warning callout */}
          <div style={{ marginTop: 40, background: `linear-gradient(135deg,${T.teal} 0%,${T.tealMid} 100%)`, borderRadius: 12, padding: "28px 36px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ fontSize: 36, flexShrink: 0 }}>⚠️</div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Importing Without WPC-ETA is Illegal</div>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: 0 }}>
                Wireless devices imported without valid WPC-ETA approval are detained at Indian customs, and the shipment is returned or destroyed at the importer's cost. Penalties under the Indian Wireless Telegraphy Act, 1933 include heavy fines and up to 3 years imprisonment for repeat violations. WPC enforcement has intensified significantly since 2022.
              </p>
            </div>
            <button onClick={() => router.push("/contact")} style={{ padding: "12px 28px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
              onMouseLeave={e => e.currentTarget.style.background = T.orange}>
              Get Compliant Now →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — STEP-BY-STEP WPC-ETA APPROVAL PROCESS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={dstepsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">How It Works</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Step-by-Step WPC-ETA Approval Process
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              A clear, expert-guided roadmap from device assessment to ETA certificate in hand — typically completed in 4–8 weeks.
            </p>
          </div>

          <div className="dstep-side-grid" ref={dstepsRef}>
            {/* Timeline steps */}
            <div className="detailed-steps-list">
              {detailedSteps.map((s, i) => (
                <div key={s.step} className="dstep-row">
                  <div className="dstep-left">
                    <div className="dstep-num">{s.step}</div>
                    {i < detailedSteps.length - 1 && <div className="dstep-line" />}
                  </div>
                  <div className="dstep-body">
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <span style={{ fontSize: 20 }}>{s.icon}</span>
                      <h3 style={{ fontFamily: T.poppins, fontSize: 17, color: T.titleblue, fontWeight: 700 }}>{s.title}</h3>
                    </div>
                    <p style={{ fontFamily: T.sans,textAlign: "justify", fontSize: 14.5, color: T.paradark, lineHeight: 1.8, marginBottom: 10 }}>{s.desc}</p>
                    <div style={{ background: T.tealLight, borderLeft: `3px solid ${T.teal}`, borderRadius: "0 6px 6px 0", padding: "8px 14px" }}>
                      <span style={{ fontFamily: T.poppins, fontSize: 12.5, color: T.tealMid, fontWeight: 600 }}>{s.tip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Side info card */}
            <div style={{ position: "sticky", top: 100 }}>
              <div style={{ background: T.cream, border: `1px solid ${T.border}`, borderRadius: 12, padding: 28, marginBottom: 20 }}>
                <div className="sl-row" style={{ marginBottom: 12 }}><div className="sl-line" /><span className="sl-text">Saralsanchar Portal</span></div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🖥️</div>
                <h4 style={{ fontFamily: T.poppins, fontSize: 16, color: T.titleblue, fontWeight: 700, marginBottom: 10 }}>Official DoT Portal for WPC Applications</h4>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.paradark, lineHeight: 1.8 }}>
                  All WPC-ETA applications are filed through the Saralsanchar portal (saralsanchar.gov.in). Navigation is complex and form selection errors are common for first-time applicants. Our team handles the entire portal process — from account setup to certificate download.
                </p>
                <button onClick={() => router.push("/contact")} style={{ marginTop: 16, width: "100%", padding: "11px 20px", background: T.teal, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.orange}
                  onMouseLeave={e => e.currentTarget.style.background = T.teal}>
                  Let Us File for You →
                </button>
              </div>

              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Why Choose Us?</div>
                {[
                  "WPC-recognized lab network across India",
                  "Saralsanchar portal experts — no form errors",
                  "0% application failure rate",
                  "Real-time application status tracking",
                  "Query resolution within 24 hours",
                  "Renewal and compliance reminders",
                ].map((pt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.orange, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>✓</span>
                    </div>
                    <span style={{ fontFamily: T.sans, fontSize: 13.5, color: "rgba(255,255,255,0.87)" }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — DOCUMENTS REQUIRED FOR WPC-ETA APPROVAL
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }} className="sec">
        <img src="https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=1600&q=80&fit=crop" alt="documents" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(13,27,42,0.96) 0%,rgba(14,128,128,0.88) 100%)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={crsDocsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row">
                <div className="sl-line" style={{ background: "rgba(255,255,255,0.5)" }} />
                <span className="sl-text" style={{ color: "rgba(255,255,255,0.75)" }}>What You Need</span>
              </div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: "#fff", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Documents Required for WPC-ETA Approval
            </h2>
            <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.72)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              Complete and accurate documentation is the single biggest factor in getting a smooth, on-time WPC-ETA approval. Here is everything you will need.
            </p>
          </div>

          <div className="crs-docs-grid" ref={crsDocsRef}>
            {wpcDocs.map((doc, i) => (
              <div key={doc.title} className={`doc-card reveal d${i % 4}`}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(30,136,200,0.25)", border: "1px solid rgba(30,136,200,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  {doc.icon}
                </div>
                <div>
                  <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{doc.title}</div>
                  <p style={{ fontFamily: T.sans,textAlign: "justify", fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "20px 28px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", backdropFilter: "blur(4px)" }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>💡</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Pro Tip: Model number mismatches are the #1 cause of WPC delays</div>
              <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.70)", margin: 0, lineHeight: 1.7 }}>The model number on the RF test report must exactly match the model number in the WPC application form and on the product label. Even minor differences (e.g., "V2" vs "v2") trigger WPC query letters, adding 1–3 weeks to the process. Our team cross-checks every document before submission.</p>
            </div>
            <button onClick={() => router.push("/contact")} style={{ padding: "11px 26px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
              onMouseLeave={e => e.currentTarget.style.background = T.orange}>
              Get Free Document Checklist →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — TIMELINES, COSTS, VALIDITY & RENEWAL
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={tlcvTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Plan Your Approval</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Timelines, Costs, Validity & Renewal
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              Plan your import and product launch timeline in India with a clear picture of what WPC-ETA approval involves from start to finish.
            </p>
          </div>

          <div className="tlcv-grid" ref={tlcvRef}>
            {/* LEFT — Timeline + Cost */}
            <div>
              {/* Timeline Table */}
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
                <div style={{ padding: "20px 20px 0", borderBottom: `2px solid ${T.border}` }}>
                  <div className="sl-row" style={{ marginBottom: 10 }}><div className="sl-line" /><span className="sl-text">Typical Timeline</span></div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 14 }}>Phase-wise Duration</h3>
                </div>
                <table className="timeline-table">
                  <thead>
                    <tr>
                      <th>Phase</th>
                      <th>Duration</th>
                      <th>Handled By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timelineRows.map((row, i) => (
                      <tr key={i}>
                        <td>{row.phase}</td>
                        <td>{row.duration}</td>
                        <td style={{ color: T.muted, fontSize: 13 }}>{row.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ padding: "14px 20px", background: T.tealLight, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>⏱️</span>
                  <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.tealMid, fontWeight: 600 }}>Total estimated time: <strong>4–8 weeks</strong> (when documents are in order)</span>
                </div>
              </div>

              {/* Cost Table */}
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "20px 20px 0", borderBottom: `2px solid ${T.border}` }}>
                  <div className="sl-row" style={{ marginBottom: 10 }}><div className="sl-line" /><span className="sl-text">Cost Breakdown</span></div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 14 }}>WPC-ETA Approval Fees</h3>
                </div>
                <div>
                  {costItems.map((c, i) => (
                    <div key={i} className="cost-row">
                      <span style={{ fontFamily: T.sans, fontSize: 14, color: T.paradark, flex: 1, paddingRight: 12 }}>{c.label}</span>
                      <span style={{ fontFamily: T.poppins, fontSize: 14, color: T.teal, fontWeight: 700, flexShrink: 0 }}>{c.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "14px 20px", background: T.amberLight, display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>💬</span>
                  <span style={{ fontFamily: T.sans, fontSize: 13, color: T.amberDark, lineHeight: 1.6 }}>
                    Government fees are prescribed by DoT. RF lab charges depend on the number of frequency bands and test parameters applicable to your device. Contact us for a transparent all-in quote.
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — Validity + Renewal */}
            <div>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, padding: "28px 24px", marginBottom: 24 }}>
                <div className="sl-row" style={{ marginBottom: 12 }}><div className="sl-line" /><span className="sl-text">Validity & Renewal</span></div>
                <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 20 }}>Key Rules to Know</h3>
                <div className="validity-grid">
                  {validityCards.map((vc, i) => (
                    <div key={i} className="validity-card" style={{ borderTop: `3px solid ${vc.color}` }}>
                      <div style={{ fontSize: 28, marginBottom: 10 }}>{vc.icon}</div>
                      <div style={{ fontFamily: T.poppins, fontSize: 22, fontWeight: 800, color: vc.color, marginBottom: 4 }}>{vc.value}</div>
                      <div style={{ fontFamily: T.poppins, fontSize: 13, color: T.titleblue, fontWeight: 700, marginBottom: 8 }}>{vc.title}</div>
                      <p style={{ fontFamily: T.sans, textAlign: "justify",fontSize: 12.5, color: T.muted, lineHeight: 1.7, margin: 0 }}>{vc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Renewal checklist */}
              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>🔄 Renewal Made Simple</div>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 18 }}>
                  WPC-ETA renewal is straightforward if the product model and specifications remain unchanged. Common challenges our clients face at renewal:
                </p>
                {[
                  "Tracking expiry dates across multiple product models",
                  "Outdated RF test reports that no longer meet current DoT norms",
                  "Saralsanchar portal changes between original application and renewal",
                  "Hardware revisions requiring fresh testing before renewal",
                  "Responding to WPC renewal queries within tight deadlines",
                  "Managing renewals for product families with many SKUs",
                ].map((pt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(249,115,22,0.85)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>!</span>
                    </div>
                    <span style={{ fontFamily: T.sans, fontSize: 13.5, color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>{pt}</span>
                  </div>
                ))}
                <button onClick={() => router.push("/contact")} style={{ marginTop: 18, width: "100%", padding: "12px 20px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
                  onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                  Let Us Handle Your Renewal →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQS ══ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: 14, overflow: "hidden", border: `1px solid ${T.border}`, minHeight: 440 }} className="faq-grid">
            <div style={{ position: "relative", minHeight: 250, overflow: "hidden" }}>
              <img src="/finalimages/faq10.jpg" alt="WPC FAQ" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
            </div>
            <div style={{ background: T.white, padding: "28px 24px", borderLeft: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 1.5, background: T.teal }} />
                <span style={{ fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: T.teal, letterSpacing: "0.13em", textTransform: "uppercase" }}>Frequently Asked</span>
              </div>
              <h3 style={{ fontFamily: T.poppins, fontSize: 35, fontWeight: 600, color: T.titleblue, marginBottom: 20 }}>WPC Approval FAQs</h3>
              <div ref={faqRef}>
                {faqs.map((faq) => <FaqItem key={faq.q} faq={faq} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="reveal" ref={ctaRef} style={{ background: T.ctaBand, borderTop: `1px solid ${T.ctaBandBorder}`, borderBottom: `1px solid ${T.ctaBandBorder}`, padding: "80px clamp(16px,5vw,56px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="cta-split">
            <div>
              <div className="sl-row" style={{ marginBottom: 20 }}><div className="sl-line" /><span className="sl-text">Start Today</span></div>
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.9rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 14 }}>Import Your Wireless Device Legally</h2>
              <p style={{ fontFamily: T.sans, color: T.paradark, fontSize: 14.5, lineHeight: 1.8 }}>Don't risk customs detention. Get your WPC-ETA approval handled by experts.<br />Free consultation. Clear timeline. Transparent pricing.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
              <button onClick={() => router.push("/contact")}
                style={{ padding: "14px 36px", fontFamily: T.poppins, fontSize: 14, fontWeight: 600, border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", whiteSpace: "nowrap", transition: "all 0.22s" }}
                onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.orange; e.currentTarget.style.transform = "translateY(0)"; }}>Get Free Consultation</button>
              <a href="tel:+919891229135"
                style={{ padding: "13px 28px", border: `1.5px solid ${T.border}`, borderRadius: 6, fontFamily: T.poppins, fontSize: 14, fontWeight: 500, color: T.slate, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, whiteSpace: "nowrap", background: T.white, transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = T.teal}
                onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>📞 +91-9891229135</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}