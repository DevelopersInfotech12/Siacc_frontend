"use client";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

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
  { icon: "📶", title: "TEC/MTCTE Certification", tag: "Mandatory", desc: "Mandatory Testing & Certification of Telecom Equipment for all telecom products sold or used in India under DoT regulations." },
  { icon: "📱", title: "TAC & IMEI Registration", tag: "Mobile Devices", desc: "Type Allocation Code & IMEI registration for all mobile handsets and devices before launch or import into India." },
  { icon: "🌐", title: "IoT Device Certification", tag: "IoT", desc: "Certification for Internet of Things devices under the MTCTE framework including smart meters, asset trackers, and connected devices." },
  { icon: "📡", title: "Telecom Equipment Approval", tag: "Telecom", desc: "Approval for telecom network equipment, routers, switches, modems, and networking hardware under TEC standards." },
];

const faqs = [
  { q: "What is MTCTE?", a: "MTCTE stands for Mandatory Testing and Certification of Telecom Equipment. It is a DoT initiative requiring all telecom equipment sold or imported in India to be certified by TEC." },
  { q: "Which products fall under MTCTE?", a: "Products include mobile phones, routers, switches, modems, set-top boxes, GPS devices, IoT equipment, and other telecom/networking hardware." },
  { q: "What is the penalty for selling uncertified telecom equipment?", a: "Selling or importing uncertified telecom equipment can result in seizure, heavy penalties, and suspension of import license under the Indian Wireless Telegraphy Act and DoT regulations." },
  { q: "How long does TEC certification take?", a: "Typically 6–12 weeks depending on product complexity, lab availability, and application completeness. We actively track your application to minimise delays." },
  { q: "Can foreign companies apply for MTCTE certification?", a: "Yes. Foreign manufacturers can apply through an Indian Authorized Representative (IAR). We provide IAR services and manage the complete application process on your behalf." },
];

const infoItems = [
  { label: "Governing Body", value: "TEC, Dept. of Telecom" },
  { label: "Portal", value: "MTCTE Portal (DoT)" },
  { label: "Validity", value: "3 Years" },
  { label: "Processing Time", value: "6–12 Weeks" },
  { label: "Applicable To", value: "All Telecom Equipment" },
];

const statsStrip = [
  { value: "3 yrs", label: "Certificate Validity", icon: "📅" },
  { value: "6–12", label: "Weeks Timeline", icon: "⚡" },
  { value: "Free", label: "Initial Consultation", icon: "🆓" },
  { value: "0%", label: "Failure Rate", icon: "❌" },
];

const heroChips = [
  { icon: "📶", label: "MTCTE" },
  { icon: "📱", label: "TAC & IMEI" },
  { icon: "🌐", label: "IoT Devices" },
  { icon: "📡", label: "Telecom Equipment" },
  { icon: "✅", label: "0% Failure Rate" },
];

// ── SECTION 1 — BENEFITS ─────────────────────────────────────────────────────

const benefits = [
  {
    icon: "⚖️",
    title: "Legal Mandatory Requirement for Market Access",
    desc: "MTCTE certification is mandatory under DoT regulations for all telecom and networking equipment sold, imported, or used commercially in India. Uncertified equipment cannot legally be placed on the Indian market — making TEC certification a prerequisite for every product in scope.",
  },
  {
    icon: "🚫",
    title: "Avoid Customs Detention & Import Bans",
    desc: "Customs authorities actively check MTCTE certification status for covered product categories. Shipments of uncertified telecom equipment are detained at the port of entry, returned at the importer's cost, or destroyed. TEC certification is required before customs clearance for any covered product.",
  },
  {
    icon: "📱",
    title: "Mandatory for Mobile Device Sales in India",
    desc: "All mobile handsets — imported or locally manufactured — require TAC (Type Allocation Code) and IMEI registration before they can be sold in India. MTCTE certification is part of this process and is enforced at both the customs and retail levels.",
  },
  {
    icon: "🌐",
    title: "IoT & Smart Device Market Entry",
    desc: "India's IoT market is one of the fastest growing globally. MTCTE certification under the IoT framework is the mandatory entry ticket for smart meters, asset trackers, connected industrial devices, and all IoT products operating on telecom networks in India.",
  },
  {
    icon: "🏛️",
    title: "Government & Enterprise Procurement",
    desc: "Government tenders for networking equipment, telecom infrastructure, and IoT deployments mandate valid MTCTE certification as an eligibility condition. Enterprise IT procurement teams also require MTCTE proof for all network hardware before vendor onboarding.",
  },
  {
    icon: "🌍",
    title: "IAR Services for Foreign Manufacturers",
    desc: "Foreign manufacturers must appoint an Indian Authorized Representative (IAR) to apply for MTCTE certification. We provide IAR services — acting as your legal representative in India for the complete certification process, including application filing, query responses, and certificate custody.",
  },
  {
    icon: "🔒",
    title: "Network Security & Spectrum Compliance",
    desc: "MTCTE ensures that all telecom equipment operating on Indian networks meets DoT's technical standards for security, interoperability, and spectrum use. Certified products signal compliance to telecom operators, enterprise buyers, and government agencies.",
  },
  {
    icon: "🔁",
    title: "3-Year Validity with Simple Renewal",
    desc: "MTCTE certificates are valid for 3 years — one of the longer regulatory approval windows for electronics in India. Renewal is straightforward if the product specifications remain unchanged. We manage renewal timelines proactively across your product portfolio.",
  },
];

// ── SECTION 2 — DETAILED STEPS ───────────────────────────────────────────────

const detailedSteps = [
  {
    step: "01",
    icon: "🔍",
    title: "Product Scoping & Standard Identification",
    desc: "We review your product specifications to identify the applicable TEC standards, Essential Requirements (ERs), and test parameters for MTCTE certification. This includes identifying whether your product falls under the mandatory MTCTE product list, and which TEC-empanelled lab is required for testing.",
    tip: "Tip: The MTCTE mandatory product list is periodically expanded by DoT. A product that was not required to be certified previously may now be mandatory. Our team monitors all DoT notifications to keep your product portfolio in scope.",
  },
  {
    step: "02",
    icon: "🧪",
    title: "Testing at TEC-Empanelled Lab",
    desc: "Product samples are submitted to a TEC-designated or empanelled laboratory for conformity testing against the applicable Indian telecom standards. We coordinate sample submission, track testing progress, and follow up on any lab clarifications to ensure timely report issuance.",
    tip: "Tip: Only TEC-empanelled or DoT-designated labs are accepted for MTCTE applications. Reports from non-empanelled labs — even internationally accredited ones — are rejected at the TEC review stage. We verify lab empanelment scope before every submission.",
  },
  {
    step: "03",
    icon: "📋",
    title: "Document Preparation & Application Package",
    desc: "We compile the complete MTCTE application package: lab test report, product technical datasheet, block diagram, product photographs, user manual, company registration, KYC, and declaration of conformity — cross-checked against TEC portal requirements before submission.",
    tip: "Tip: The product model number, description, and specifications in the test report must exactly match the MTCTE application form. Discrepancies are the most common cause of TEC query letters, adding 2–4 weeks to the certification timeline.",
  },
  {
    step: "04",
    icon: "📤",
    title: "MTCTE Portal Application Filing",
    desc: "We file the complete MTCTE application on the DoT MTCTE portal — selecting the correct product category, entering all technical parameters, uploading documents, and paying government fees online. The portal has product-type-specific forms that require precise navigation.",
    tip: "Tip: The MTCTE portal has separate application flows for different product categories (mobile devices, networking equipment, IoT, etc.). Filing under the wrong product type results in rejection and requires re-filing. Our team navigates every portal form correctly from the first attempt.",
  },
  {
    step: "05",
    icon: "🔎",
    title: "TEC Technical Review & Query Resolution",
    desc: "TEC engineers review the application and test reports for technical completeness and conformance. If clarifications or additional documentation are required, TEC raises queries on the portal. Prompt, accurate query responses are critical to maintaining the certification timeline.",
    tip: "Tip: TEC queries typically arrive within 2–4 weeks of application submission. Delayed responses extend the certification timeline by exactly the delay in responding. Our team monitors the portal daily and prepares query responses within 24–48 hours.",
  },
  {
    step: "06",
    icon: "🎓",
    title: "Certificate Issuance & Renewal Management",
    desc: "TEC issues the MTCTE certificate with a unique certificate number valid for 3 years. The certificate must be referenced in product documentation, user manuals, and import documents. We provide the certificate, advise on correct usage, and manage proactive renewal reminders across your product portfolio.",
    tip: "Important: The MTCTE certificate covers a specific model number. Any hardware change — antenna design, frequency bands, power output, or radio module — requires a fresh application for the modified model. We advise on when changes trigger re-certification.",
  },
];

// ── SECTION 3 — DOCUMENTS ────────────────────────────────────────────────────

const tecDocs = [
  { icon: "📄", title: "Product Technical Datasheet", desc: "Detailed technical specification sheet covering model number, operating frequencies, power levels, modulation types, interfaces, and all parameters relevant to the applicable TEC standard." },
  { icon: "🧪", title: "Test Report from TEC-Empanelled Lab", desc: "Valid conformity test report from a TEC-designated or TEC-empanelled laboratory, testing against all Essential Requirements of the applicable Indian telecom standard." },
  { icon: "📐", title: "Block Diagram of the Device", desc: "Schematic block diagram showing the device's internal architecture, RF components, signal paths, and antenna design — required for all wireless and networking products." },
  { icon: "📸", title: "Product Photographs", desc: "Clear photographs of the device from all angles including the rating label, connectivity ports, antenna locations, and any RF-related markings on the product or packaging." },
  { icon: "🏢", title: "Company Registration & KYC", desc: "Certificate of Incorporation, GST registration, PAN, and KYC documents for the Indian applicant entity. For foreign manufacturers, the Indian Authorized Representative's registration documents are required." },
  { icon: "🔖", title: "Authorized Signatory Letter", desc: "Letter authorizing the consultant or IAR to file the MTCTE application, respond to TEC queries, and receive the certificate on behalf of the applicant or manufacturer." },
  { icon: "📘", title: "User Manual in English", desc: "User manual or product guide in English describing device features, operating parameters, RF safety information, and compliance markings as required by TEC guidelines." },
  { icon: "✅", title: "Declaration of Conformity", desc: "Self-declaration by the manufacturer confirming the device complies with all applicable TEC Essential Requirements and Indian telecom standards for the claimed product category." },
];

// ── SECTION 4 — TIMELINE, COST, VALIDITY ─────────────────────────────────────

const timelineRows = [
  { phase: "Product Scoping & Standard Identification", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "Testing at TEC-Empanelled Lab", duration: "3–6 Weeks", owner: "TEC-Empanelled Lab" },
  { phase: "Document Preparation & Application Package", duration: "3–5 Days", owner: "Applicant / Consultant" },
  { phase: "MTCTE Portal Application Filing", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "TEC Technical Review & Query Resolution", duration: "2–4 Weeks", owner: "Telecom Engineering Centre" },
  { phase: "Certificate Issuance", duration: "3–7 Days", owner: "Telecom Engineering Centre" },
];

const costItems = [
  { label: "TEC Application / Certification Fee (government)", value: "₹2,000 – ₹20,000+" },
  { label: "Lab Testing at TEC-Empanelled Lab", value: "₹15,000 – ₹80,000+" },
  { label: "Renewal Fee (every 3 years)", value: "₹2,000 – ₹10,000" },
  { label: "Consultant / IAR / Professional Fees", value: "Variable (contact us for quote)" },
];

const validityCards = [
  {
    icon: "📅",
    title: "Certificate Validity",
    value: "3 Years",
    desc: "MTCTE certificates are valid for 3 years from the date of issue. The certificate must be renewed before expiry to maintain legal market access for the product.",
    color: "#1E88C8",
  },
  {
    icon: "🔄",
    title: "Renewal Window",
    value: "Before Expiry",
    desc: "Renewal must be initiated before the certificate expires. Expired certificates require a completely fresh application and may require new testing if the standard has been updated.",
    color: "#C8780A",
  },
  {
    icon: "📋",
    title: "Renewal Condition",
    value: "No Spec Change",
    desc: "Renewal is straightforward if operating frequencies, power output, RF parameters, and applicable TEC standards remain unchanged from the original certified specification.",
    color: "#0E8080",
  },
  {
    icon: "🔖",
    title: "Per-Model Certificate",
    value: "Each Model",
    desc: "Each model number requires its own MTCTE certificate. Variants with different RF parameters, frequency bands, or internal hardware changes require separate applications.",
    color: "#C84E1E",
  },
];

// ── CSS ───────────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  img { max-width:100%; display:block; } a { text-decoration:none; color:inherit; }
  .sl-row { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
  .sl-line { width:28px; height:1.5px; background:#1E88C8; flex-shrink:0; }
  .sl-text { font-family:'Outfit','system-ui',sans-serif; font-size:11px; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; color:#1E88C8; }
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.6;transform:scale(1.3);} }

  .hero-chip { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.09); border:1px solid rgba(255,255,255,0.16); backdrop-filter:blur(6px); border-radius:6px; padding:9px 16px; font-family:'Outfit','system-ui',sans-serif; font-size:12.5px; font-weight:500; color:rgba(255,255,255,0.90); transition:background 0.2s,border-color 0.2s,transform 0.2s; }
  .hero-chip:hover { background:rgba(255,255,255,0.18); border-color:rgba(255,255,255,0.35); transform:translateY(-2px); }

  /* layout */
  .overview-grid { display:grid; grid-template-columns:1fr 360px; gap:48px; align-items:flex-start; }
  @media(max-width:960px){ .overview-grid { grid-template-columns:1fr; } }
  .stats-strip { display:grid; grid-template-columns:repeat(4,1fr); }
  @media(max-width:640px){ .stats-strip { grid-template-columns:repeat(2,1fr); } }
  .types-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; }
  @media(max-width:640px){ .types-grid { grid-template-columns:1fr; } }
  .type-card { background:#fff; border-radius:10px; padding:28px; border:1px solid #E8E3DA; transition:all 0.25s; }
  .type-card:hover { border-color:#1E88C8; transform:translateY(-3px); box-shadow:0 12px 32px rgba(30,136,200,0.09); }
  .cta-split { display:grid; grid-template-columns:1fr auto; gap:40px; align-items:center; }
  @media(max-width:720px){ .cta-split { grid-template-columns:1fr; gap:28px; } }
  .sec { padding:clamp(64px,8vw,104px) clamp(16px,5vw,56px); }
  .inner { max-width:1280px; margin:0 auto; }
  .faq-grid {}
  @media(max-width:760px){ .faq-grid { grid-template-columns:1fr !important; } }

  /* ── SECTION 1 — BENEFITS ── */
  .benefits-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:18px; }
  @media(max-width:640px){ .benefits-grid { grid-template-columns:1fr; } }
  .benefit-card { background:#fff; border-radius:12px; padding:26px 24px; border:1px solid #E8E3DA; transition:all 0.25s; position:relative; overflow:hidden; }
  .benefit-card::before { content:''; position:absolute; top:0; left:0; width:3px; height:100%; background:#1E88C8; opacity:0; transition:opacity 0.25s; }
  .benefit-card:hover { border-color:#1E88C8; transform:translateY(-3px); box-shadow:0 14px 36px rgba(30,136,200,0.09); }
  .benefit-card:hover::before { opacity:1; }

  /* ── SECTION 2 — DETAILED STEPS ── */
  .detailed-steps-list { display:flex; flex-direction:column; gap:0; }
  .dstep-row { display:grid; grid-template-columns:60px 1fr; gap:0; position:relative; }
  @media(max-width:480px){ .dstep-row { grid-template-columns:48px 1fr; } }
  .dstep-row:not(:last-child) .dstep-line { position:absolute; left:29px; top:60px; bottom:-1px; width:2px; background:linear-gradient(to bottom,#1E88C8,rgba(30,136,200,0.15)); z-index:0; }
  @media(max-width:480px){ .dstep-row:not(:last-child) .dstep-line { left:23px; } }
  .dstep-left { display:flex; flex-direction:column; align-items:center; padding-top:6px; position:relative; z-index:1; }
  .dstep-num { width:42px; height:42px; border-radius:50%; background:#1E88C8; color:#fff; display:flex; align-items:center; justify-content:center; font-family:'Poppins','system-ui',sans-serif; font-size:13px; font-weight:700; flex-shrink:0; }
  @media(max-width:480px){ .dstep-num { width:36px; height:36px; font-size:11px; } }
  .dstep-body { padding:4px 0 36px 20px; }
  @media(max-width:640px){ .dstep-body { padding-bottom:24px; } }
  .dstep-side-grid { display:grid; grid-template-columns:1fr 380px; gap:48px; align-items:flex-start; }
  @media(max-width:960px){ .dstep-side-grid { grid-template-columns:1fr; } }
  .side-sticky { position:sticky; top:100px; }
  @media(max-width:960px){ .side-sticky { position:static; } }

  /* ── SECTION 3 — DOCUMENTS ── */
  .crs-docs-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:14px; }
  @media(max-width:640px){ .crs-docs-grid { grid-template-columns:1fr; } }
  .doc-card { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.13); border-radius:10px; padding:20px; display:flex; gap:14px; align-items:flex-start; backdrop-filter:blur(4px); transition:background 0.2s,border-color 0.2s; }
  .doc-card:hover { background:rgba(255,255,255,0.14); border-color:rgba(255,255,255,0.28); }

  /* ── SECTION 4 — TIMELINE / COST / VALIDITY ── */
  .timeline-table { width:100%; border-collapse:collapse; }
  .timeline-table th { font-family:'Poppins','system-ui',sans-serif; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:#1E88C8; padding:10px 16px; border-bottom:2px solid #E8E3DA; text-align:left; }
  .timeline-table td { font-family:'Outfit','system-ui',sans-serif; font-size:14px; color:#2D3748; padding:14px 16px; border-bottom:1px solid #F0ECE5; vertical-align:top; }
  .timeline-table tr:last-child td { border-bottom:none; }
  .timeline-table tr:hover td { background:rgba(30,136,200,0.03); }
  .timeline-table td:nth-child(2) { font-family:'Poppins','system-ui',sans-serif; font-weight:600; color:#1E88C8; white-space:nowrap; }
  @media(max-width:480px){ .timeline-table th:last-child,.timeline-table td:last-child { display:none; } .timeline-table td:nth-child(2) { white-space:normal; } }
  .cost-row { display:flex; justify-content:space-between; align-items:center; padding:14px 20px; border-bottom:1px solid #F0ECE5; transition:background 0.15s; gap:12px; }
  .cost-row:last-child { border-bottom:none; }
  .cost-row:hover { background:rgba(30,136,200,0.03); }
.validity-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px;}
@media(max-width:600px){.validity-grid{grid-template-columns:1fr;}}
  .validity-card { border-radius:12px; padding:24px 20px; border:1px solid #E8E3DA; background:#fff; transition:all 0.22s; text-align:center; }
  .validity-card:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,0.07); }
  .tlcv-grid { display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:flex-start; }
  @media(max-width:860px){ .tlcv-grid { grid-template-columns:1fr; } }

  /* callout helpers */
  .callout-row { display:flex; align-items:center; gap:24px; flex-wrap:wrap; }
  @media(max-width:600px){ .callout-row { flex-direction:column; align-items:flex-start; } }
  .pro-tip-row { display:flex; align-items:center; gap:20px; flex-wrap:wrap; }
  @media(max-width:600px){ .pro-tip-row { flex-direction:column; align-items:flex-start; } }
`;

export default function TECScreen() {
  const router = useRouter();

  const heroLeftRef  = useReveal();
  const overviewRef  = useReveal();
  const infoCardRef  = useReveal();
  const statsRef     = useReveal({ stagger: true, baseDelay: 100 });
  const typesTtlRef  = useReveal();
  const typesRef     = useReveal({ stagger: true, baseDelay: 80 });

  // Section 1
  const benefitsTtlRef = useReveal();
  const benefitsRef    = useReveal({ stagger: true, baseDelay: 75 });

  // Section 2
  const dstepsTtlRef = useReveal();
  const dstepsRef    = useReveal();

  // Section 3
  const crsDocsTtlRef = useReveal();
  const crsDocsRef    = useReveal({ stagger: true, baseDelay: 70 });

  // Section 4
  const tlcvTtlRef = useReveal();
  const tlcvRef    = useReveal();

  // FAQ + CTA
  const faqRef = useReveal({ stagger: true, baseDelay: 80 });
  const ctaRef = useReveal();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: T.white, fontFamily: T.sans, color: T.body }}>
      <style>{css}</style>
      <Navbar />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${T.border}`, minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom,${T.orange},${T.teal})`, zIndex: 3 }} />
        <Image src="/images/tec.png" alt="TEC MTCTE Certification" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right,rgba(7,18,28,0.88) 0%,rgba(7,18,28,0.60) 50%,rgba(7,18,28,0.10) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,4vw,60px)" }}>
          <div ref={heroLeftRef} className="reveal-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", borderRadius: 4, padding: "6px 16px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>Telecom Engineering Centre — Certified Consultants</span>
            </div>
            <h1 style={{ fontFamily: T.poppins, fontSize: "clamp(2.6rem,5.2vw,4.2rem)", fontWeight: 700, lineHeight: 1.04, marginBottom: 20, letterSpacing: "-0.01em", color: "#fff", maxWidth: 640 }}>
              TEC / MTCTE Certification for{" "}<span style={{ color: T.orange }}>Telecom Products</span>
            </h1>
            <p style={{ fontFamily: T.poppins, fontSize: 16, color: "rgba(255,255,255,0.82)", maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>
              Mandatory certification for all telecom and networking equipment sold or imported in India — handled end-to-end by our TEC compliance specialists.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
              {heroChips.map(chip => (<span key={chip.label} className="hero-chip"><span style={{ fontSize: 15 }}>{chip.icon}</span>{chip.label}</span>))}
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
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Telecom Engineering Centre</span></div>
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 16 }}>
                Complete TEC / MTCTE Compliance,<br />Handled for You
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.tealMid, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>Lab Coordination · Application Filing · Query Resolution · Certificate Issuance</p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 16, textAlign: "justify" }}>
                Mandatory certification for all telecom and networking equipment sold or imported in India. We manage the complete process — lab coordination, filing, and tracking until your certificate is issued.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 32, textAlign: "justify" }}>
                Our TEC specialists identify the applicable standards, coordinate with TEC-empanelled labs, prepare your complete MTCTE application, and follow up with TEC until your certificate is in hand — typically in 6–12 weeks.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                <button onClick={() => router.push("/contact")} style={{ padding: "13px 32px", fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, letterSpacing: "0.02em", border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", boxShadow: "0 4px 16px rgba(10,104,104,0.22)", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={e => { e.currentTarget.style.background = T.orange; e.currentTarget.style.transform = "translateY(0)"; }}>Get Free Consultation</button>
                <button onClick={() => router.push("/contact")} style={{ padding: "12px 28px", fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, borderRadius: 6, cursor: "pointer", border: `1.5px solid ${T.border}`, color: T.slate, background: "transparent", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = T.teal; e.currentTarget.style.color = T.teal; }} onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.slate; }}>Check Applicability →</button>
              </div>
              <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", height: 220 }}>
                <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&fit=crop" alt="TEC compliance team" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} unoptimized />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(14,128,128,0.78) 0%,rgba(30,136,200,0.45) 60%,rgba(235,245,251,0.15) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 28px" }}>
                  <div>
                    <div style={{ fontFamily: T.poppins, fontSize: "clamp(1rem,2vw,1.3rem)", color: "#fff", fontWeight: 700, marginBottom: 4 }}>Trusted for MTCTE Across India</div>
                    <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.80)", fontSize: 12.5 }}>MTCTE · TAC · IMEI · IoT · Telecom Equipment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right" ref={infoCardRef}>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "sticky", top: 100 }}>
                <div className="sl-row"><div className="sl-line" /><span className="sl-text">Quick Info — TEC</span></div>
                {infoItems.map((item, i) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < infoItems.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <span style={{ fontFamily: T.sans, fontSize: 13, color: T.muted }}>{item.label}</span>
                    <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.slate, fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                  </div>
                ))}
                <button onClick={() => router.push("/contact")} style={{ width: "100%", marginTop: 22, padding: 13, background: T.orange, color: "#fff", fontWeight: 600, borderRadius: 6, border: "none", fontFamily: T.poppins, fontSize: 14, cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = T.teal} onMouseLeave={e => e.currentTarget.style.background = T.orange}>Start TEC Application →</button>
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
            <div style={{ display: "flex", justifyContent: "center" }}><div className="sl-row"><div className="sl-line" /><span className="sl-text">Certification Types</span></div></div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>Which TEC Certification Do You Need?</h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 480, margin: "0 auto", lineHeight: 1.75, fontSize: 16 }}>Different telecom products require different TEC approvals. Here's what applies to your equipment.</p>
          </div>
          <div className="types-grid" ref={typesRef}>
            {types.map((t, i) => (
              <div key={t.title} className={`type-card reveal d${i % 4}`}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 52, height: 52, background: T.tealLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{t.icon}</div>
                  <span style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 700, background: i % 2 === 0 ? T.tealLight : T.amberLight, color: i % 2 === 0 ? T.tealMid : T.amberDark, padding: "3px 10px", borderRadius: 3, letterSpacing: "0.06em" }}>{t.tag}</span>
                </div>
                <h3 style={{ fontFamily: T.poppins, fontSize: 17, color: T.titleblue, marginBottom: 10, fontWeight: 600 }}>{t.title}</h3>
                <p style={{ fontSize: 15, color: T.para, margin: 0, fontWeight: 500, textAlign: "justify" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — IMPORTANCE & BENEFITS OF TEC / MTCTE CERTIFICATION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={benefitsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Why It Matters</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Importance & Benefits of TEC / MTCTE Certification
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 580, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              MTCTE certification is a legal mandate from the Department of Telecom — not a voluntary exercise. It directly governs market access, customs clearance, and commercial viability of every telecom product in India.
            </p>
          </div>

          <div className="benefits-grid" ref={benefitsRef}>
            {benefits.map((b, i) => (
              <div key={b.title} className={`benefit-card reveal d${i % 6}`}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 10, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{b.icon}</div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 15.5, color: T.titleblue, fontWeight: 700, lineHeight: 1.3 }}>{b.title}</h3>
                </div>
                <p style={{ fontFamily: T.sans, fontSize: 14,textAlign: "justify", color: T.paradark, lineHeight: 1.8, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Warning callout */}
          <div style={{ marginTop: 40, background: `linear-gradient(135deg,${T.teal} 0%,${T.tealMid} 100%)`, borderRadius: 12, padding: "28px 36px" }}>
            <div className="callout-row">
              <div style={{ fontSize: 36, flexShrink: 0 }}>⚠️</div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Selling Uncertified Telecom Equipment is Illegal in India</div>
                <p style={{ fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: 0 }}>
                  DoT and customs authorities actively enforce MTCTE compliance across all covered product categories. Uncertified telecom equipment is detained at Indian ports, and importers face penalties, licence suspension, and legal proceedings under the Indian Wireless Telegraphy Act. MTCTE enforcement has expanded significantly since 2022, covering an increasing range of products including IoT devices, industrial networking equipment, and smart devices.
                </p>
              </div>
              <button onClick={() => router.push("/contact")} style={{ padding: "12px 28px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
                onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                Get Certified Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — STEP-BY-STEP TEC / MTCTE CERTIFICATION PROCESS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={dstepsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">How It Works</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Step-by-Step TEC / MTCTE Certification Process
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              A clear, expert-guided roadmap from product scoping to MTCTE certificate — typically completed in 6–12 weeks.
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
            <div className="side-sticky">
              <div style={{ background: T.cream, border: `1px solid ${T.border}`, borderRadius: 12, padding: 28, marginBottom: 20 }}>
                <div className="sl-row" style={{ marginBottom: 12 }}><div className="sl-line" /><span className="sl-text">MTCTE Portal</span></div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🖥️</div>
                <h4 style={{ fontFamily: T.poppins, fontSize: 16, color: T.titleblue, fontWeight: 700, marginBottom: 10 }}>Official DoT Portal for TEC Applications</h4>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.paradark, lineHeight: 1.8 }}>
                  All MTCTE applications are filed on the DoT MTCTE portal. The portal has separate application flows for mobile devices, networking equipment, IoT, and telecom infrastructure — each with different form fields, document requirements, and fee structures. Our team handles all portal navigation, form selection, and submission for every product category.
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
                  "TEC-empanelled lab network across India",
                  "MTCTE portal experts — correct form, first time",
                  "0% application rejection rate",
                  "IAR services for foreign manufacturers",
                  "TEC query resolution within 24–48 hours",
                  "Proactive renewal tracking across product portfolio",
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
          SECTION 3 — DOCUMENTS REQUIRED FOR TEC / MTCTE CERTIFICATION
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }} className="sec">
        <Image src="https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=1600&q=80&fit=crop" alt="documents" fill style={{ objectFit: "cover" }} unoptimized />
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
              Documents Required for TEC / MTCTE Certification
            </h2>
            <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.72)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              Complete and accurate documentation is the most critical factor in a smooth MTCTE approval. Here is everything you need to prepare before we file.
            </p>
          </div>

          <div className="crs-docs-grid" ref={crsDocsRef}>
            {tecDocs.map((doc, i) => (
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

          <div style={{ marginTop: 36, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "20px 28px", backdropFilter: "blur(4px)" }}>
            <div className="pro-tip-row">
              <div style={{ fontSize: 28, flexShrink: 0 }}>💡</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Pro Tip: Model number mismatches are the #1 cause of TEC query letters</div>
                <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.70)", margin: 0, lineHeight: 1.7 }}>The model number, product name, and specifications in the test report must exactly match what is entered in the MTCTE portal application. Even minor differences trigger TEC query letters that add 2–4 weeks to the certification timeline. Our team cross-checks every document against the portal entry before submission.</p>
              </div>
              <button onClick={() => router.push("/contact")} style={{ padding: "11px 26px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
                onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                Get Free Document Checklist →
              </button>
            </div>
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
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Plan Your Certification</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Timelines, Costs, Validity & Renewal
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              Plan your product launch and compliance calendar with a clear picture of what TEC / MTCTE certification involves from start to finish.
            </p>
          </div>

          <div className="tlcv-grid" ref={tlcvRef}>
            {/* LEFT — Timeline + Cost */}
            <div>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 24 }}>
                <div style={{ padding: "20px 20px 0", borderBottom: `2px solid ${T.border}` }}>
                  <div className="sl-row" style={{ marginBottom: 10 }}><div className="sl-line" /><span className="sl-text">Typical Timeline</span></div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 14 }}>Phase-wise Duration</h3>
                </div>
                <div style={{ overflowX: "auto" }}>
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
                </div>
                <div style={{ padding: "14px 20px", background: T.tealLight, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 16 }}>⏱️</span>
                  <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.tealMid, fontWeight: 600 }}>Total estimated time: <strong>6–12 weeks</strong> (when documents are in order and lab slots are available)</span>
                </div>
              </div>

              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "20px 20px 0", borderBottom: `2px solid ${T.border}` }}>
                  <div className="sl-row" style={{ marginBottom: 10 }}><div className="sl-line" /><span className="sl-text">Cost Breakdown</span></div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 14 }}>TEC / MTCTE Certification Fees</h3>
                </div>
                <div>
                  {costItems.map((c, i) => (
                    <div key={i} className="cost-row">
                      <span style={{ fontFamily: T.sans, fontSize: 14, color: T.paradark, flex: 1 }}>{c.label}</span>
                      <span style={{ fontFamily: T.poppins, fontSize: 14, color: T.teal, fontWeight: 700, flexShrink: 0, textAlign: "right" }}>{c.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "14px 20px", background: T.amberLight, display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>💬</span>
                  <span style={{ fontFamily: T.sans, fontSize: 13, color: T.amberDark, lineHeight: 1.6 }}>
                    Government fees are prescribed by DoT/TEC and vary by product category and certification type. Lab testing charges depend on the number of Essential Requirements tested. Contact us for a transparent all-in quote for your specific telecom product.
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
                      <p style={{ fontFamily: T.sans, fontSize: 12.5,textAlign: "justify", color: T.muted, lineHeight: 1.7, margin: 0 }}>{vc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Renewal checklist */}
              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>🔄 Renewal Made Simple</div>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 18 }}>
                  MTCTE renewal is straightforward if the product and standards remain unchanged. Common challenges our clients face at renewal:
                </p>
                {[
                  "Tracking certificate expiry dates across large product portfolios",
                  "TEC standard updates that require fresh testing at renewal",
                  "Hardware revisions that were not flagged as re-certification triggers",
                  "MTCTE portal interface changes between original filing and renewal",
                  "Responding to TEC renewal queries within strict deadlines",
                  "Managing multi-model renewal filings for product families",
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
              <Image src="/finalimages/faq10.jpg" alt="TEC FAQ" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} />
            </div>
            <div style={{ background: T.white, padding: "28px 24px", borderLeft: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 1.5, background: T.teal }} />
                <span style={{ fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: T.teal, letterSpacing: "0.13em", textTransform: "uppercase" }}>Frequently Asked</span>
              </div>
              <h3 style={{ fontFamily: T.poppins, fontSize: 35, fontWeight: 600, color: T.titleblue, marginBottom: 20 }}>TEC / MTCTE FAQs</h3>
              <div ref={faqRef}>
                {faqs.map((faq) => (<FaqItem key={faq.q} faq={faq} />))}
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
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.9rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 14 }}>Get Your Telecom Product Certified</h2>
              <p style={{ fontFamily: T.sans, color: T.paradark, fontSize: 14.5, lineHeight: 1.8 }}>Our TEC experts will guide you through the entire MTCTE process quickly and accurately.<br />Free consultation. Clear timeline. Transparent pricing.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
              <button onClick={() => router.push("/contact")} style={{ padding: "14px 36px", fontFamily: T.poppins, fontSize: 14, fontWeight: 600, border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", whiteSpace: "nowrap", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={e => { e.currentTarget.style.background = T.orange; e.currentTarget.style.transform = "translateY(0)"; }}>Get Free Consultation</button>
              <a href="tel:+919891229135" style={{ padding: "13px 28px", border: `1.5px solid ${T.border}`, borderRadius: 6, fontFamily: T.poppins, fontSize: 14, fontWeight: 500, color: T.slate, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: T.white, transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = T.teal} onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>📞 +91-9891229135</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}