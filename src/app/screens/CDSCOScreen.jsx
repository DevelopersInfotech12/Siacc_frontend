// ─────────────────────────────────────────────────────────────────────────────
// CDSCOScreen.jsx  — Full TEC-parity: Benefits, Detailed Steps, Docs, Timeline/Cost/Validity
// ─────────────────────────────────────────────────────────────────────────────
"use client";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
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

const heroChips = [
  { icon: "💊", label: "Drug License" },
  { icon: "💄", label: "Cosmetic License" },
  { icon: "🔬", label: "Medical Devices" },
  { icon: "🏥", label: "DCGI Approval" },
  { icon: "✅", label: "0% Failure Rate" },
];

const types = [
  { icon: "💊", title: "Drug License", tag: "Pharma", desc: "Manufacturing or import license for pharmaceutical drugs and formulations under Drugs & Cosmetics Act." },
  { icon: "💄", title: "Cosmetic License", tag: "Cosmetics", desc: "Import or manufacturing license for cosmetic products sold in India under CDSCO regulations." },
  { icon: "🔬", title: "Medical Device Registration", tag: "Medical", desc: "Registration for medical devices including Class A, B, C & D devices under MDR 2017." },
  { icon: "📋", title: "CDSCO Import License", tag: "Imports", desc: "Import license for drugs, cosmetics and medical devices under Form 10 / Form 8 procedures." },
  { icon: "🏥", title: "DCGI Approval", tag: "New Drugs", desc: "Approval from Drug Controller General of India for new drugs, biologicals and clinical trials." },
  { icon: "🧪", title: "Clinical Trial Approval", tag: "Research", desc: "CDSCO approval for conducting clinical trials in India for new drugs and medical devices." },
];

const faqs = [
  { q: "Is CDSCO approval required for all drugs imported into India?", a: "Yes, all drugs imported into India require either a registration certificate or import license from CDSCO/DCGI. The requirement varies by drug category and whether it's already approved in India." },
  { q: "What is the difference between CDSCO and DCGI?", a: "CDSCO (Central Drugs Standard Control Organization) is the regulatory body. DCGI (Drug Controller General of India) is its head. Approvals for new drugs, clinical trials, and certain imports require DCGI approval." },
  { q: "How long does medical device registration take?", a: "Class A and B devices typically take 30–90 days. Class C and D devices take 3–6 months. We help prepare error-free dossiers to avoid rejection or delays." },
  { q: "Do cosmetics need CDSCO approval?", a: "Yes, cosmetics imported into India require a CDSCO import license. Products like hair dyes, sunscreens, and anti-dandruff shampoos are treated as drugs and need drug license." },
  { q: "Can a foreign manufacturer apply directly for CDSCO approval?", a: "Foreign manufacturers must appoint an Indian Authorized Agent (IAA) to apply on their behalf. We provide authorized agent services and manage the complete regulatory process end-to-end." },
];

const infoItems = [
  { label: "Governing Body", value: "CDSCO / DCGI" },
  { label: "Governing Act", value: "Drugs & Cosmetics Act, 1940" },
  { label: "Device Rules", value: "Medical Devices Rules 2017" },
  { label: "Processing Time", value: "30 Days – 6 Months" },
  { label: "Applicable To", value: "Drugs, Cosmetics & Devices" },
];

const statsStrip = [
  { value: "30d–6m", label: "Processing Time", icon: "⚡" },
  { value: "3", label: "Device Classes (B–D)", icon: "🔬" },
  { value: "Free", label: "Initial Consultation", icon: "🆓" },
  { value: "0%", label: "Failure Rate", icon: "❌" },
];

// ── SECTION 1 — BENEFITS ─────────────────────────────────────────────────────

const benefits = [
  {
    icon: "⚖️",
    title: "Legal Mandatory Requirement for Market Access",
    desc: "CDSCO approval is mandatory under the Drugs & Cosmetics Act for all drugs, cosmetics, and medical devices sold, imported, or manufactured in India. No product in scope can legally reach the Indian market without valid CDSCO registration or license.",
  },
  {
    icon: "🚫",
    title: "Avoid Customs Detention & Import Rejection",
    desc: "Customs authorities actively verify CDSCO registration for drug and device imports. Shipments without valid CDSCO documentation are detained, returned at importer cost, or destroyed. CDSCO licensing is a prerequisite for customs clearance of all regulated healthcare products.",
  },
  {
    icon: "🔬",
    title: "Medical Device Market Entry",
    desc: "India's medical device market is among the fastest growing in Asia. CDSCO registration under MDR 2017 is the mandatory gateway for Class A, B, C, and D devices — from diagnostics and surgical instruments to implants and in-vitro diagnostics.",
  },
  {
    icon: "💊",
    title: "Pharmaceutical Drug Approvals",
    desc: "All new drugs, generics, biosimilars, and combination products require DCGI approval before they can be manufactured or imported in India. We manage the complete CTD dossier preparation, Sugam portal filing, and DCGI liaison for drug approvals of all categories.",
  },
  {
    icon: "🏛️",
    title: "Government & Institutional Procurement",
    desc: "Government hospital tenders, CGHS empanelment, and institutional procurement of drugs and medical devices mandatorily require valid CDSCO registration as an eligibility criterion. Enterprise healthcare buyers also require CDSCO proof before vendor onboarding.",
  },
  {
    icon: "🌍",
    title: "IAA Services for Foreign Manufacturers",
    desc: "Foreign manufacturers must appoint an Indian Authorized Agent (IAA) to apply for CDSCO approvals. We provide full IAA services — acting as your legal representative for dossier filing, query responses, DCGI liaison, and certificate management.",
  },
  {
    icon: "💄",
    title: "Cosmetic Import Compliance",
    desc: "All cosmetics imported into India require a CDSCO import license. Certain products — hair dyes, sunscreens, anti-dandruff shampoos — are classified as drugs and require drug-level approval. We identify the correct classification and manage the complete licensing process.",
  },
  {
    icon: "🔁",
    title: "Structured Renewal & Lifecycle Management",
    desc: "CDSCO licenses and registrations have defined validity periods and renewal cycles. Expired licenses result in loss of market access and customs clearance rights. We manage renewal timelines proactively across your entire product portfolio to ensure uninterrupted compliance.",
  },
];

// ── SECTION 2 — DETAILED STEPS ───────────────────────────────────────────────

const detailedSteps = [
  {
    step: "01",
    icon: "📌",
    title: "Product Classification & Regulatory Pathway",
    desc: "We classify your product under the appropriate CDSCO regulatory category — drug, cosmetic, or medical device — and identify the correct application type, applicable rules, and CDSCO department handling your approval. This determines whether your application goes to CDSCO Central Licensing Authority, State Licensing Authority, or DCGI directly.",
    tip: "Tip: Misclassification is the most common cause of CDSCO application rejection at the initial review stage. A product submitted under the wrong category results in rejection and delays of 4–8 weeks. Our regulatory team performs a detailed classification review before every application.",
  },
  {
    step: "02",
    icon: "📑",
    title: "Technical Dossier Preparation",
    desc: "We prepare your complete regulatory dossier as per CDSCO requirements — in CTD format for drugs, and as per MDR 2017 format for medical devices. This includes clinical/safety data compilation, GMP certificates, stability data, manufacturing process documentation, and all supporting technical evidence required for your product category.",
    tip: "Tip: CDSCO dossier requirements differ significantly by product category, device class, and whether the product is a new drug, approved drug, or generic. Submitting an incomplete or incorrectly formatted dossier is the #1 cause of CDSCO query letters. We build dossiers to specification the first time.",
  },
  {
    step: "03",
    icon: "📤",
    title: "Sugam Portal / Physical Application Filing",
    desc: "We file the complete CDSCO application on the Sugam portal (for most drug and device applications) or physically with the appropriate licensing authority for categories not yet on the portal. Application filing includes correct form selection, fee payment, document upload, and verification of all portal entry fields against the dossier.",
    tip: "Tip: The Sugam portal has separate application flows for new drugs, medical devices, cosmetics, and import licenses — each with different form structures and document requirements. Incorrect portal navigation results in filing under the wrong sub-category. Our team handles every portal type with precision.",
  },
  {
    step: "04",
    icon: "💬",
    title: "CDSCO Technical Review & Query Response",
    desc: "CDSCO technical reviewers examine the dossier for completeness and scientific adequacy. If additional information or clarification is needed, CDSCO raises formal queries on the Sugam portal or via official communication. Prompt, accurate, and complete query responses are critical — delayed responses directly extend the approval timeline.",
    tip: "Tip: CDSCO queries typically arrive 4–8 weeks after application submission for devices, and 2–6 months for new drugs. We monitor the Sugam portal daily and prepare technically rigorous query responses within 48–72 hours to keep your approval on track.",
  },
  {
    step: "05",
    icon: "🔎",
    title: "DCGI Review / Expert Committee (for New Drugs)",
    desc: "New drugs and certain biological products require review by the Subject Expert Committee (SEC) or Technical Expert Committee (TEC) convened by DCGI. We prepare the SEC presentation package, coordinate the pre-submission meeting where available, and manage all DCGI correspondence through this review phase.",
    tip: "Tip: SEC/TEC review is required for new chemical entities, biosimilars, and new drug combinations. The review timeline depends on meeting schedules, which are typically quarterly. Early engagement with the DCGI review process — which we manage — can significantly reduce the overall approval timeline.",
  },
  {
    step: "06",
    icon: "✅",
    title: "License Issuance & Renewal Management",
    desc: "CDSCO issues the drug license, device registration certificate, or import license with a unique registration number. We provide the certificate, advise on correct usage in commercial documentation, and manage proactive renewal reminders. Any product specification change — formulation, indication, manufacturing site — may require a variation application, which we handle.",
    tip: "Important: CDSCO registrations are product and manufacturer specific. A change in manufacturing site, formulation, or labelling requires a formal variation or amendment application. We advise on when changes trigger re-filing obligations and manage the variation process proactively.",
  },
];

// ── SECTION 3 — DOCUMENTS ────────────────────────────────────────────────────

const cdscoDocsList = [
  { icon: "📄", title: "Company Registration & KYC", desc: "Certificate of Incorporation, GST registration, PAN, and KYC documents for the Indian applicant entity. For foreign manufacturers, the Indian Authorized Agent's registration documents are required." },
  { icon: "📑", title: "Product Technical Dossier (CTD Format)", desc: "Complete Common Technical Document dossier for drugs — covering quality (Module 3), non-clinical (Module 4), and clinical data (Module 5) as applicable to the drug category and regulatory pathway." },
  { icon: "🏭", title: "GMP Certificate / Manufacturing License", desc: "Valid GMP certificate issued by the national regulatory authority of the manufacturing country, confirming that the manufacturing facility meets WHO-GMP or equivalent standards." },
  { icon: "📜", title: "Certificate of Pharmaceutical Product (CoPP)", desc: "CoPP issued by the competent authority of the country of manufacture, confirming the product is authorized for sale in that country — required for all drug import applications." },
  { icon: "🔬", title: "Clinical / Safety Data", desc: "Clinical trial data, published clinical evidence, or bridging study data as required by CDSCO for new drugs, new drug combinations, and biological products seeking marketing authorization." },
  { icon: "📐", title: "Site Master File (SMF)", desc: "Comprehensive document describing the manufacturing facility's operations, quality systems, production processes, and regulatory compliance — required for manufacturing site approvals and new drug dossiers." },
  { icon: "📊", title: "Stability Data & Shelf Life Documentation", desc: "Stability study data demonstrating the product's quality, safety, and efficacy throughout its claimed shelf life under storage conditions relevant to the Indian climate zones." },
  { icon: "🔖", title: "Authorized Signatory & IAA Letter", desc: "Letter authorizing the Indian Authorized Agent (IAA) or consultant to file the CDSCO application, respond to queries, and receive the license on behalf of the foreign manufacturer." },
];

// ── SECTION 4 — TIMELINE, COST, VALIDITY ─────────────────────────────────────

const timelineRows = [
  { phase: "Product Classification & Regulatory Pathway", duration: "1–3 Days", owner: "Applicant / Consultant" },
  { phase: "Technical Dossier Preparation", duration: "2–6 Weeks", owner: "Applicant / Consultant" },
  { phase: "Sugam Portal / Physical Filing", duration: "2–4 Days", owner: "Applicant / Consultant" },
  { phase: "CDSCO Technical Review & Query Response", duration: "4–12 Weeks", owner: "CDSCO / Applicant" },
  { phase: "SEC / Expert Committee Review (New Drugs)", duration: "3–6 Months", owner: "DCGI / Expert Committee" },
  { phase: "License / Registration Certificate Issuance", duration: "7–14 Days", owner: "CDSCO / DCGI" },
];

const costItems = [
  { label: "CDSCO Government Application Fee", value: "₹1,000 – ₹5,00,000+" },
  { label: "Dossier Preparation (CTD / MDR format)", value: "Variable by product category" },
  { label: "GMP Inspection Fee (if applicable)", value: "As prescribed by CDSCO" },
  { label: "Annual / Renewal License Fee", value: "₹2,000 – ₹50,000" },
  { label: "Consultant / IAA / Professional Fees", value: "Variable (contact us for quote)" },
];

const validityCards = [
  {
    icon: "📅",
    title: "Drug Import License",
    value: "3 Years",
    desc: "Import licenses for drugs are typically valid for 3 years and must be renewed before expiry to maintain uninterrupted customs clearance rights.",
    color: "#1E88C8",
  },
  {
    icon: "🔬",
    title: "Medical Device Registration",
    value: "5 Years",
    desc: "Medical device registrations under MDR 2017 are valid for 5 years. Renewal requires a fresh application if any technical specification has changed.",
    color: "#C8780A",
  },
  {
    icon: "💊",
    title: "Drug Manufacturing License",
    value: "Annual Renewal",
    desc: "State-level drug manufacturing licenses require annual renewal. Lapsed manufacturing licenses result in immediate halt of production and export activities.",
    color: "#0E8080",
  },
  {
    icon: "🔖",
    title: "Per-Product Registration",
    value: "Each SKU",
    desc: "Each drug formulation, strength, and dosage form requires separate CDSCO registration. Device variants with different intended uses may also require separate registration.",
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

  .callout-row { display:flex; align-items:center; gap:24px; flex-wrap:wrap; }
  @media(max-width:600px){ .callout-row { flex-direction:column; align-items:flex-start; } }
  .pro-tip-row { display:flex; align-items:center; gap:20px; flex-wrap:wrap; }
  @media(max-width:600px){ .pro-tip-row { flex-direction:column; align-items:flex-start; } }
`;

export default function CDSCOScreen() {
  const heroLeftRef = useReveal();
  const overviewRef = useReveal();
  const infoCardRef = useReveal();
  const statsRef = useReveal({ stagger: true, baseDelay: 100 });
  const typesTtlRef = useReveal();
  const typesRef = useReveal({ stagger: true, baseDelay: 80 });

  const benefitsTtlRef = useReveal();
  const benefitsRef = useReveal({ stagger: true, baseDelay: 75 });

  const dstepsTtlRef = useReveal();
  const dstepsRef = useReveal();

  const crsDocsTtlRef = useReveal();
  const crsDocsRef = useReveal({ stagger: true, baseDelay: 70 });

  const tlcvTtlRef = useReveal();
  const tlcvRef = useReveal();

  const faqRef = useReveal({ stagger: true, baseDelay: 80 });
  const ctaRef = useReveal();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: T.white, fontFamily: T.sans, color: T.body }}>
      <style>{css}</style>
      <Navbar />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${T.border}`, minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom,${T.orange},${T.teal})`, zIndex: 3 }} />
        <Image src="/finalimages/siacccdsco.png" alt="CDSCO Licensing" fill style={{ objectFit: "cover", objectPosition: "center 35%" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right,rgba(7,18,28,0.88) 0%,rgba(7,18,28,0.60) 50%,rgba(7,18,28,0.10) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,4vw,60px)" }}>
          <div ref={heroLeftRef} className="reveal-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", borderRadius: 4, padding: "6px 16px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>CDSCO / DCGI — Regulatory Consultants</span>
            </div>
            <h1 style={{ fontFamily: T.poppins, fontSize: "clamp(2.6rem,5.2vw,4.2rem)", fontWeight: 700, lineHeight: 1.04, marginBottom: 20, letterSpacing: "-0.01em", color: "#fff", maxWidth: 640 }}>
              CDSCO Licensing for{" "}<span style={{ color: T.orange }}>Drugs, Devices & Cosmetics</span>
            </h1>
            <p style={{ fontFamily: T.poppins, fontSize: 16, color: "rgba(255,255,255,0.82)", maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>
              End-to-end CDSCO / DCGI regulatory approvals — handled by specialists from dossier to license.
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
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">CDSCO / DCGI</span></div>
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 16 }}>
                End-to-End CDSCO Compliance,<br />Handled for You
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.tealMid, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>Dossier Preparation · Sugam Portal Filing · Query Response · License Issuance</p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 16, textAlign: "justify" }}>
                Regulatory approvals for pharmaceutical drugs, cosmetics, and medical devices under CDSCO / DCGI. We manage the complete licensing journey — from product classification to final approval.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 32, textAlign: "justify" }}>
                Our CDSCO specialists handle technical dossier preparation, Sugam portal filing, query response management, and liaison with the Drug Controller — so you can focus on bringing your products to market.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                <button onClick={() => window.location.href = "/contact"} style={{ padding: "13px 32px", fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, letterSpacing: "0.02em", border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", boxShadow: "0 4px 16px rgba(10,104,104,0.22)", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={e => { e.currentTarget.style.background = T.orange; e.currentTarget.style.transform = "translateY(0)"; }}>Get Free Consultation</button>
                <button onClick={() => window.location.href = "/contact"} style={{ padding: "12px 28px", fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, borderRadius: 6, cursor: "pointer", border: `1.5px solid ${T.border}`, color: T.slate, background: "transparent", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = T.teal; e.currentTarget.style.color = T.teal; }} onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.slate; }}>Check Requirements →</button>
              </div>
              <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", height: 220 }}>
                <Image src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80&fit=crop" alt="CDSCO compliance lab" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} unoptimized />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(14,128,128,0.78) 0%,rgba(30,136,200,0.45) 60%,rgba(235,245,251,0.15) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 28px" }}>
                  <div>
                    <div style={{ fontFamily: T.poppins, fontSize: "clamp(1rem,2vw,1.3rem)", color: "#fff", fontWeight: 700, marginBottom: 4 }}>Trusted by Pharma & MedTech Companies</div>
                    <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.80)", fontSize: 12.5 }}>Drug License · Cosmetic License · Medical Devices · DCGI Approval</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right" ref={infoCardRef}>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "sticky", top: 100 }}>
                <div className="sl-row"><div className="sl-line" /><span className="sl-text">Quick Info — CDSCO</span></div>
                {infoItems.map((item, i) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < infoItems.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <span style={{ fontFamily: T.sans, fontSize: 13, color: T.muted }}>{item.label}</span>
                    <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.slate, fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                  </div>
                ))}
                <button onClick={() => window.location.href = "/contact"} style={{ width: "100%", marginTop: 22, padding: 13, background: T.orange, color: "#fff", fontWeight: 600, borderRadius: 6, border: "none", fontFamily: T.poppins, fontSize: 14, cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = T.teal} onMouseLeave={e => e.currentTarget.style.background = T.orange}>Start CDSCO Application →</button>
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
            <div style={{ display: "flex", justifyContent: "center" }}><div className="sl-row"><div className="sl-line" /><span className="sl-text">CDSCO Services</span></div></div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>Which CDSCO Approval Do You Need?</h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 480, margin: "0 auto", lineHeight: 1.75, fontSize: 16 }}>Different products require different CDSCO pathways. Here's what applies to your product.</p>
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
          SECTION 1 — IMPORTANCE & BENEFITS OF CDSCO LICENSING
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={benefitsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Why It Matters</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Importance & Benefits of CDSCO Licensing
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 580, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              CDSCO approval is a legal mandate under the Drugs & Cosmetics Act — not a voluntary exercise. It directly governs market access, customs clearance, and commercial viability of every drug, device, and cosmetic in India.
            </p>
          </div>

          <div className="benefits-grid" ref={benefitsRef}>
            {benefits.map((b, i) => (
              <div key={b.title} className={`benefit-card reveal d${i % 6}`}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 10, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{b.icon}</div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 15.5, color: T.titleblue, fontWeight: 700, lineHeight: 1.3 }}>{b.title}</h3>
                </div>
                <p style={{ fontFamily: T.sans, fontSize: 14, color: T.paradark, textAlign: "justify",lineHeight: 1.8, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Warning callout */}
          <div style={{ marginTop: 40, background: `linear-gradient(135deg,${T.teal} 0%,${T.tealMid} 100%)`, borderRadius: 12, padding: "28px 36px" }}>
            <div className="callout-row">
              <div style={{ fontSize: 36, flexShrink: 0 }}>⚠️</div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Selling Unapproved Drugs or Devices is a Criminal Offence in India</div>
                <p style={{ fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: 0 }}>
                  The Drugs & Cosmetics Act prescribes imprisonment of up to 3 years and fines for manufacturing, importing, or selling drugs or devices without valid CDSCO approval. Customs authorities reject shipments of unapproved products at Indian ports. CDSCO enforcement has intensified significantly since 2020, with increasing scrutiny of medical device imports and cosmetics classified as drugs. Non-compliance risks not just regulatory penalties but irreversible reputational damage in the Indian market.
                </p>
              </div>
              <button onClick={() => window.location.href = "/contact"} style={{ padding: "12px 28px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
                onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                Get Licensed Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — STEP-BY-STEP CDSCO LICENSING PROCESS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={dstepsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">How It Works</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Step-by-Step CDSCO Licensing Process
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              A clear, expert-guided roadmap from product classification to CDSCO license — timeline varies by product category and regulatory pathway.
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
                    <p style={{ fontFamily: T.sans, fontSize: 14.5, textAlign: "justify",color: T.paradark, lineHeight: 1.8, marginBottom: 10 }}>{s.desc}</p>
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
                <div className="sl-row" style={{ marginBottom: 12 }}><div className="sl-line" /><span className="sl-text">Sugam Portal</span></div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🖥️</div>
                <h4 style={{ fontFamily: T.poppins, fontSize: 16, color: T.titleblue, fontWeight: 700, marginBottom: 10 }}>Official CDSCO Portal for All Applications</h4>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.paradark, lineHeight: 1.8 }}>
                  All CDSCO drug, device, and cosmetic applications are filed on the Sugam portal. The portal has separate application flows for new drugs, medical devices (by class), import licenses, and clinical trials — each with distinct document requirements. Our team handles all Sugam portal navigation, form selection, and submission for every product category.
                </p>
                <button onClick={() => window.location.href = "/contact"} style={{ marginTop: 16, width: "100%", padding: "11px 20px", background: T.teal, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.orange}
                  onMouseLeave={e => e.currentTarget.style.background = T.teal}>
                  Let Us File for You →
                </button>
              </div>

              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Why Choose Us?</div>
                {[
                  "CTD-compliant dossiers prepared by regulatory scientists",
                  "Sugam portal experts — correct form, first time",
                  "0% application rejection rate",
                  "IAA services for all foreign manufacturers",
                  "CDSCO query responses within 48–72 hours",
                  "Expert committee (SEC/TEC) preparation support",
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
          SECTION 3 — DOCUMENTS REQUIRED FOR CDSCO LICENSING
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
              Documents Required for CDSCO Licensing
            </h2>
            <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.72)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              Complete and correctly formatted documentation is the most critical factor in a smooth CDSCO approval. Here is what you need to prepare before filing.
            </p>
          </div>

          <div className="crs-docs-grid" ref={crsDocsRef}>
            {cdscoDocsList.map((doc, i) => (
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
                <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Pro Tip: Dossier format mismatches are the #1 cause of CDSCO query letters</div>
                <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.70)", margin: 0, lineHeight: 1.7 }}>The product name, composition, manufacturer details, and specifications in the dossier must exactly match what is entered in the Sugam portal application. Even minor discrepancies trigger CDSCO query letters that add 4–8 weeks to the licensing timeline. Our regulatory team cross-checks every document against the portal entry before submission.</p>
              </div>
              <button onClick={() => window.location.href = "/contact"} style={{ padding: "11px 26px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s", whiteSpace: "nowrap" }}
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
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Plan Your Approval</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Timelines, Costs, Validity & Renewal
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              Plan your product launch and compliance calendar with a clear picture of what CDSCO licensing involves from start to finish.
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
                  <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.tealMid, fontWeight: 600 }}>Total estimated time: <strong>30 days – 6 months</strong> (varies significantly by product category, device class, and CDSCO workload)</span>
                </div>
              </div>

              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "20px 20px 0", borderBottom: `2px solid ${T.border}` }}>
                  <div className="sl-row" style={{ marginBottom: 10 }}><div className="sl-line" /><span className="sl-text">Cost Breakdown</span></div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 14 }}>CDSCO Licensing Fees</h3>
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
                    CDSCO government fees are prescribed under the Drugs & Cosmetics (Amendment) Rules and vary by product category, device class, and application type. Contact us for a transparent all-in quote for your specific product and regulatory pathway.
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

              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>🔄 Renewal & Variation Management</div>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 18 }}>
                  CDSCO renewal and variation filing require careful management. Common challenges our clients face:
                </p>
                {[
                  "Tracking expiry dates across multi-product pharmaceutical portfolios",
                  "Standard updates under MDR 2017 requiring fresh device testing at renewal",
                  "Formulation changes triggering variation applications rather than renewals",
                  "Manufacturing site changes requiring fresh CDSCO/DCGI approval",
                  "Labelling updates for regulatory compliance requiring variation filing",
                  "Managing multi-SKU renewal filings for drug product families",
                ].map((pt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(249,115,22,0.85)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>!</span>
                    </div>
                    <span style={{ fontFamily: T.sans, fontSize: 13.5, color: "rgba(255,255,255,0.82)", lineHeight: 1.6 }}>{pt}</span>
                  </div>
                ))}
                <button onClick={() => window.location.href = "/contact"} style={{ marginTop: 18, width: "100%", padding: "12px 20px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
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
              <Image src="/finalimages/faq10.jpg" alt="CDSCO FAQ" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} />
            </div>
            <div style={{ background: T.white, padding: "28px 24px", borderLeft: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 1.5, background: T.teal }} />
                <span style={{ fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: T.teal, letterSpacing: "0.13em", textTransform: "uppercase" }}>Frequently Asked</span>
              </div>
              <h3 style={{ fontFamily: T.poppins, fontSize: 35, fontWeight: 600, color: T.titleblue, marginBottom: 20 }}>CDSCO Licensing FAQs</h3>
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
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.9rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 14 }}>Navigate CDSCO with Confidence</h2>
              <p style={{ fontFamily: T.sans, color: T.paradark, fontSize: 14.5, lineHeight: 1.8 }}>Our regulatory experts will guide you through every step of the CDSCO approval process.<br />Free consultation. Transparent pricing. Error-free dossiers.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
              <button onClick={() => window.location.href = "/contact"} style={{ padding: "14px 36px", fontFamily: T.poppins, fontSize: 14, fontWeight: 600, border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", whiteSpace: "nowrap", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={e => { e.currentTarget.style.background = T.orange; e.currentTarget.style.transform = "translateY(0)"; }}>Get Free Consultation</button>
              <a href="tel:+919891229135" style={{ padding: "13px 28px", border: `1.5px solid ${T.border}`, borderRadius: 6, fontFamily: T.poppins, fontSize: 14, fontWeight: 500, color: T.slate, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: T.white, transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = T.teal} onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>📞 +91-9891229135</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}