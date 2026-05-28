// ─────────────────────────────────────────────────────────────────────────────
// LMPCScreen.jsx  — Full CDSCO-parity: Benefits, Detailed Steps, Docs, Timeline/Cost/Validity
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
  { icon: "📦", label: "Import License" },
  { icon: "🏭", label: "Manufacturer Reg." },
  { icon: "🏷️", label: "Label Compliance" },
  { icon: "⚖️", label: "Weights & Measures" },
  { icon: "✅", label: "0% Failure Rate" },
];

const types = [
  { icon: "📦", title: "LMPC Import License", tag: "Importers", desc: "Mandatory for all importers of pre-packaged goods. Required before goods can be sold in India under the Legal Metrology (Packaged Commodities) Rules." },
  { icon: "🏭", title: "LMPC Manufacturer Registration", tag: "Manufacturers", desc: "For Indian manufacturers of pre-packaged commodities under the Packaged Commodities Rules, 2011." },
  { icon: "📋", title: "Packaged Commodity Registration", tag: "Brand Owners", desc: "Registration for brand owners and dealers dealing in packaged commodities across pan-India distribution." },
  { icon: "⚖️", title: "Legal Metrology Certification", tag: "Weights & Measures", desc: "Verification and certification of weighing and measuring instruments under Legal Metrology Act, 2009." },
];

const faqs = [
  { q: "Who needs LMPC registration?", a: "All importers, manufacturers, packers, and dealers of pre-packaged goods in India are required to obtain LMPC registration under the Legal Metrology (Packaged Commodities) Rules, 2015." },
  { q: "What must be declared on packaging?", a: "Every pre-packaged product must declare: name of product, manufacturer name/address, net quantity, MRP (all-inclusive), month/year of manufacture, expiry date (if applicable), country of origin (for imports), and customer care details." },
  { q: "What is the penalty for non-compliance?", a: "Selling without LMPC registration or non-compliant packaging can attract penalties up to ₹25,000 for the first offence and ₹50,000 for subsequent offences under the Legal Metrology Act." },
  { q: "Is LMPC required for all imported goods?", a: "Yes, any imported product that is pre-packaged and sold at retail level in India requires LMPC import license before it can be commercially sold." },
  { q: "How long does LMPC registration take?", a: "Typically 2–4 weeks from the date of complete application submission. We coordinate with the Controller of Legal Metrology and track your application at every stage." },
];

const infoItems = [
  { label: "Governing Act", value: "Legal Metrology Act, 2009" },
  { label: "Authority", value: "Controller of Legal Metrology" },
  { label: "Validity", value: "Annual Renewal" },
  { label: "Processing Time", value: "2–4 Weeks" },
  { label: "Applicable To", value: "All Pre-Packaged Goods" },
];

const statsStrip = [
  { value: "Annual", label: "Renewal Cycle", icon: "📅" },
  { value: "2–4w", label: "Processing Time", icon: "⚡" },
  { value: "Free", label: "Initial Consultation", icon: "🆓" },
  { value: "0%", label: "Failure Rate", icon: "❌" },
];

// ── SECTION 1 — BENEFITS ─────────────────────────────────────────────────────

const benefits = [
  {
    icon: "⚖️",
    title: "Legal Mandatory Requirement for Market Access",
    desc: "LMPC registration is mandatory under the Legal Metrology Act, 2009 for all importers, manufacturers, and packers of pre-packaged goods sold in India. No pre-packaged product in scope can legally reach retail shelves without valid LMPC registration.",
  },
  {
    icon: "🚫",
    title: "Avoid Customs Detention & Import Rejection",
    desc: "Customs authorities verify LMPC registration for all pre-packaged imports. Shipments without valid LMPC documentation are detained, returned at importer cost, or destroyed. LMPC licensing is a prerequisite for customs clearance of all regulated packaged goods.",
  },
  {
    icon: "🏷️",
    title: "Mandatory Label Compliance for Retail",
    desc: "Every pre-packaged commodity sold in India must carry MRP, net quantity, manufacturer details, country of origin (for imports), and customer care information. Incorrect or missing declarations attract penalties and product seizures under the Legal Metrology Act.",
  },
  {
    icon: "🏪",
    title: "Retail & E-commerce Marketplace Requirement",
    desc: "Leading e-commerce platforms including Amazon, Flipkart, and Meesho require valid LMPC registration before onboarding sellers of imported packaged goods. Offline distributors and modern trade retailers also demand LMPC proof for vendor compliance.",
  },
  {
    icon: "🏛️",
    title: "Government & Institutional Procurement",
    desc: "Government tenders, CPWD supply contracts, and institutional procurement of packaged goods require valid LMPC registration as an eligibility criterion. Enterprise buyers also mandate LMPC compliance before vendor onboarding for packaged product supply.",
  },
  {
    icon: "🌍",
    title: "Authorized Representative Services for Foreign Brands",
    desc: "Foreign manufacturers and brand owners must appoint an Indian Authorized Representative for LMPC applications. We provide full authorized representative services — acting as your legal representative for filing, query responses, and certificate management across all states.",
  },
  {
    icon: "📦",
    title: "Multi-Category & Multi-SKU Compliance",
    desc: "Businesses importing multiple product categories — electronics, FMCG, food supplements, cosmetics, hardware — need LMPC registration covering all SKUs. We manage multi-product LMPC portfolios and ensure each SKU meets the declaration requirements for its specific category.",
  },
  {
    icon: "🔁",
    title: "Annual Renewal & Compliance Continuity",
    desc: "LMPC registrations require annual renewal with the Controller of Legal Metrology. Lapsed registrations result in loss of selling rights and customs clearance privileges. We manage renewal timelines proactively across your full product portfolio to ensure uninterrupted compliance.",
  },
];

// ── SECTION 2 — DETAILED STEPS ───────────────────────────────────────────────

const detailedSteps = [
  {
    step: "01",
    icon: "📌",
    title: "Product Classification & Regulatory Pathway",
    desc: "We classify your pre-packaged products under the correct Legal Metrology category — imported goods, domestically manufactured goods, or brand owner / packer — and determine whether your application goes to the Central or State Controller of Legal Metrology. Category determines applicable Packaged Commodities Rules, labelling requirements, and declaration formats.",
    tip: "Tip: Misclassification between import license and manufacturer registration is the most common cause of LMPC application rejection at the initial review stage. Our team performs a detailed classification review before every application to ensure the correct pathway from day one.",
  },
  {
    step: "02",
    icon: "🏷️",
    title: "Label Compliance Review & Declaration Audit",
    desc: "We conduct a comprehensive audit of your existing product packaging against Legal Metrology (Packaged Commodities) Rules requirements. This includes MRP declaration format, net quantity in standard units, manufacturer/importer name and address, country of origin, batch number, month/year of manufacture, and customer care contact — all mandatory for every pre-packaged commodity.",
    tip: "Tip: Label non-compliance is independently actionable by LMPC inspectors — even with a valid LMPC license. A product with an incorrect MRP declaration or missing net quantity can be seized from retail shelves. We audit every label element before application filing.",
  },
  {
    step: "03",
    icon: "📤",
    title: "Application Filing with Controller of Legal Metrology",
    desc: "We prepare and file the complete LMPC application with the Central Controller of Legal Metrology (for import licenses) or the State Controller (for manufacturer and packer registrations). Application filing includes form selection, fee payment, document upload, product list submission, and verification of all declarations against the submitted packaging samples.",
    tip: "Tip: Import LMPC applications are filed with the Central Controller in New Delhi. Manufacturer registrations are state-specific and filed with the relevant State Controller. Multi-state manufacturer operations may require separate registrations per state. Our team handles both central and state-level filings.",
  },
  {
    step: "04",
    icon: "💬",
    title: "Document Verification & Query Response",
    desc: "The Controller's office examines the submitted application for completeness of declarations, accuracy of product descriptions, and conformity of packaging samples with stated declarations. If additional information or revised packaging samples are needed, formal queries are raised. Prompt and accurate responses directly determine approval timelines.",
    tip: "Tip: Queries from the Controller's office typically arrive 7–14 days after application submission. We monitor application status daily and prepare complete query responses within 48 hours to keep your registration on track.",
  },
  {
    step: "05",
    icon: "🔎",
    title: "Physical Inspection (Category-Specific)",
    desc: "For certain product categories — particularly weighing and measuring instruments and some food/FMCG categories — the Controller may schedule a physical inspection of products, samples, or manufacturing premises. We coordinate the inspection visit, prepare the required documentation package, and accompany the inspection where permitted.",
    tip: "Tip: Physical inspections are scheduled based on product category risk classification. Importers of general packaged consumer goods typically do not require physical inspection. Manufacturers of weighing/measuring instruments always require verification. We advise upfront on whether your products will require an inspection.",
  },
  {
    step: "06",
    icon: "✅",
    title: "License Issuance & Annual Renewal Management",
    desc: "The Controller issues the LMPC registration certificate with a unique license number valid for one year. We provide the certificate, advise on correct usage in commercial documentation, customs declarations, and e-commerce onboarding. We also set up proactive renewal reminders and manage annual renewal filing across your full product portfolio.",
    tip: "Important: LMPC registrations must be renewed annually before expiry. A lapsed LMPC registration immediately voids your legal right to import or sell the registered products in India. We manage renewal timelines proactively — typically initiating renewal 60 days before expiry across all your product SKUs.",
  },
];

// ── SECTION 3 — DOCUMENTS ────────────────────────────────────────────────────

const lmpcDocsList = [
  { icon: "📄", title: "Company Registration & KYC", desc: "Certificate of Incorporation, GST registration, PAN, and KYC documents for the Indian applicant entity. For foreign brands, the Indian Authorized Representative's registration documents are required." },
  { icon: "📦", title: "Import-Export Code (IEC)", desc: "Valid IEC issued by DGFT is mandatory for LMPC import license applications. The IEC must be active and in the name of the applicant entity. Without IEC, import LMPC applications cannot be processed." },
  { icon: "🏷️", title: "Product Packaging Samples & Labels", desc: "Physical or digital samples of product packaging with all mandatory declarations visible — MRP, net quantity, manufacturer/importer details, country of origin, and customer care contact — for each product/SKU to be registered." },
  { icon: "📋", title: "Product List with HS Codes", desc: "Complete list of all products/SKUs to be covered under the LMPC registration, with HS codes, net quantity per unit, unit of measurement, and category description for each product." },
  { icon: "📜", title: "Brand Authorization Letter", desc: "For importers and distributors selling products under a foreign brand's name, a brand authorization letter from the brand owner is required, confirming the applicant's right to import and sell the products in India." },
  { icon: "🏭", title: "Manufacturing License (for Manufacturers)", desc: "For LMPC manufacturer registration, a copy of the applicable factory/manufacturing license from the relevant State authority is required, confirming licensed manufacturing operations." },
  { icon: "📊", title: "Declaration of Quantity Accuracy", desc: "A formal declaration that net quantity declarations on all products comply with Legal Metrology standards and that quantity verification processes are in place at the manufacturing or packing facility." },
  { icon: "🔖", title: "Authorized Signatory Documents", desc: "Board resolution or authorization letter designating the authorized signatory for LMPC applications, along with the signatory's KYC documents and specimen signature for the application records." },
];

// ── SECTION 4 — TIMELINE, COST, VALIDITY ─────────────────────────────────────

const timelineRows = [
  { phase: "Product Classification & Label Audit", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "Label Compliance Review & Revision", duration: "3–7 Days", owner: "Applicant / Consultant" },
  { phase: "Application Preparation & Filing", duration: "2–3 Days", owner: "Applicant / Consultant" },
  { phase: "Controller Review & Query Response", duration: "1–2 Weeks", owner: "Controller / Applicant" },
  { phase: "Physical Inspection (if applicable)", duration: "3–7 Days", owner: "Controller / Applicant" },
  { phase: "LMPC Certificate Issuance", duration: "3–5 Days", owner: "Controller of Legal Metrology" },
];

const costItems = [
  { label: "LMPC Government Application Fee", value: "₹1,000 – ₹5,000" },
  { label: "Label Compliance Review & Audit", value: "Variable by no. of SKUs" },
  { label: "Physical Inspection Fee (if applicable)", value: "As prescribed by Controller" },
  { label: "Annual Renewal License Fee", value: "₹1,000 – ₹3,000" },
  { label: "Consultant / Representative Fees", value: "Variable (contact us for quote)" },
];

const validityCards = [
  {
    icon: "📅",
    title: "LMPC Import License",
    value: "1 Year",
    desc: "Import licenses for pre-packaged goods are valid for 1 year and must be renewed annually before expiry to maintain legal import and selling rights.",
    color: "#1E88C8",
  },
  {
    icon: "🏭",
    title: "Manufacturer Registration",
    value: "1 Year",
    desc: "Manufacturer LMPC registrations are also valid for 1 year. Annual renewal is mandatory — lapsed registrations immediately void legal selling rights.",
    color: "#C8780A",
  },
  {
    icon: "📦",
    title: "Per-Product Registration",
    value: "Each SKU",
    desc: "Each product category and SKU must be explicitly listed in the LMPC registration. Adding new products post-registration requires a variation or amendment application.",
    color: "#0E8080",
  },
  {
    icon: "🔖",
    title: "State-Specific Validity",
    value: "State-wise",
    desc: "Manufacturer registrations are state-specific. Operations across multiple states may require separate LMPC registrations with each State Controller of Legal Metrology.",
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
  .lmpc-docs-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:14px; }
  @media(max-width:640px){ .lmpc-docs-grid { grid-template-columns:1fr; } }
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

export default function LMPCScreen() {
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

  const lmpcDocsTtlRef = useReveal();
  const lmpcDocsRef = useReveal({ stagger: true, baseDelay: 70 });

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
        <Image src="/finalimages/siacclmpc.png" alt="LMPC Registration" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right,rgba(7,18,28,0.88) 0%,rgba(7,18,28,0.60) 50%,rgba(7,18,28,0.10) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,4vw,60px)" }}>
          <div ref={heroLeftRef} className="reveal-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", borderRadius: 4, padding: "6px 16px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>Legal Metrology — Certified Consultants</span>
            </div>
            <h1 style={{ fontFamily: T.poppins, fontSize: "clamp(2.6rem,5.2vw,4.2rem)", fontWeight: 700, lineHeight: 1.04, marginBottom: 20, letterSpacing: "-0.01em", color: "#fff", maxWidth: 640 }}>
              LMPC Registration for{" "}<span style={{ color: T.orange }}>Packaged Goods & Imports</span>
            </h1>
            <p style={{ fontFamily: T.poppins, fontSize: 16, color: "rgba(255,255,255,0.82)", maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>
              End-to-end Legal Metrology compliance — handled by specialists from label audit to license issuance.
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
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Legal Metrology</span></div>
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 16 }}>
                End-to-End LMPC Compliance,<br />Handled for You
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.tealMid, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>Label Audit · Application Filing · Query Response · License Issuance</p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 16, textAlign: "justify" }}>
                Mandatory compliance for all importers, manufacturers, and packers of pre-packaged goods sold in India. We manage the complete LMPC registration journey — from product classification and label review to final certificate issuance.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 32, textAlign: "justify" }}>
                Our Legal Metrology specialists handle documentation, label compliance checks, application filing with the Controller of Legal Metrology, and ongoing annual renewals — so you can focus on running your business.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                <button onClick={() => window.location.href = "/contact"} style={{ padding: "13px 32px", fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, letterSpacing: "0.02em", border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", boxShadow: "0 4px 16px rgba(10,104,104,0.22)", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={e => { e.currentTarget.style.background = T.orange; e.currentTarget.style.transform = "translateY(0)"; }}>Get Free Consultation</button>
                <button onClick={() => window.location.href = "/contact"} style={{ padding: "12px 28px", fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, borderRadius: 6, cursor: "pointer", border: `1.5px solid ${T.border}`, color: T.slate, background: "transparent", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = T.teal; e.currentTarget.style.color = T.teal; }} onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.slate; }}>Check Label Compliance →</button>
              </div>
              <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", height: 220 }}>
                <Image src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80&fit=crop" alt="LMPC compliance" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} unoptimized />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(14,128,128,0.78) 0%,rgba(30,136,200,0.45) 60%,rgba(235,245,251,0.15) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 28px" }}>
                  <div>
                    <div style={{ fontFamily: T.poppins, fontSize: "clamp(1rem,2vw,1.3rem)", color: "#fff", fontWeight: 700, marginBottom: 4 }}>Trusted by Importers Across India</div>
                    <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.80)", fontSize: 12.5 }}>Import License · Manufacturer Reg. · Label Compliance · Pan-India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right" ref={infoCardRef}>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "sticky", top: 100 }}>
                <div className="sl-row"><div className="sl-line" /><span className="sl-text">Quick Info — LMPC</span></div>
                {infoItems.map((item, i) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < infoItems.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <span style={{ fontFamily: T.sans, fontSize: 13, color: T.muted }}>{item.label}</span>
                    <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.slate, fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                  </div>
                ))}
                <button onClick={() => window.location.href = "/contact"} style={{ width: "100%", marginTop: 22, padding: 13, background: T.orange, color: "#fff", fontWeight: 600, borderRadius: 6, border: "none", fontFamily: T.poppins, fontSize: 14, cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = T.teal} onMouseLeave={e => e.currentTarget.style.background = T.orange}>Start LMPC Registration →</button>
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
            <div style={{ display: "flex", justifyContent: "center" }}><div className="sl-row"><div className="sl-line" /><span className="sl-text">LMPC Services</span></div></div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>Which LMPC Registration Do You Need?</h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 480, margin: "0 auto", lineHeight: 1.75, fontSize: 16 }}>Different roles in the supply chain require different LMPC pathways. Here's what applies to your business.</p>
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
          SECTION 1 — IMPORTANCE & BENEFITS OF LMPC REGISTRATION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={benefitsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Why It Matters</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Importance & Benefits of LMPC Registration
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 580, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              LMPC registration is a legal mandate under the Legal Metrology Act, 2009 — not a voluntary exercise. It directly governs market access, customs clearance, and retail viability of every pre-packaged commodity sold in India.
            </p>
          </div>

          <div className="benefits-grid" ref={benefitsRef}>
            {benefits.map((b, i) => (
              <div key={b.title} className={`benefit-card reveal d${i % 6}`}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 10, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{b.icon}</div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 15.5, color: T.titleblue, fontWeight: 700, lineHeight: 1.3 }}>{b.title}</h3>
                </div>
                <p style={{ fontFamily: T.sans, fontSize: 14,textAlign: "justify", color: T.paradark, lineHeight: 1.8, margin: 0, textAlign: "justify" }}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Warning callout */}
          <div style={{ marginTop: 40, background: `linear-gradient(135deg,${T.teal} 0%,${T.tealMid} 100%)`, borderRadius: 12, padding: "28px 36px" }}>
            <div className="callout-row">
              <div style={{ fontSize: 36, flexShrink: 0 }}>⚠️</div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Selling Pre-Packaged Goods Without LMPC Registration is Illegal in India</div>
                <p style={{ fontFamily: T.sans, fontSize: 14, textAlign: "justify", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: 0 }}>
                  The Legal Metrology Act prescribes fines up to ₹25,000 for a first offence and ₹50,000 for subsequent offences for selling pre-packaged goods without valid LMPC registration or with non-compliant packaging declarations. Customs authorities reject shipments of unregistered packaged imports at Indian ports. LMPC enforcement by State Controllers has intensified significantly, with surprise retail inspections and e-commerce platform audits now common. Non-compliance risks not just regulatory penalties but product seizures, retail delisting, and marketplace account suspension.
                </p>
              </div>
              <button onClick={() => window.location.href = "/contact"} style={{ padding: "12px 28px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
                onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                Get Registered Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — STEP-BY-STEP LMPC REGISTRATION PROCESS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={dstepsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">How It Works</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Step-by-Step LMPC Registration Process
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              A clear, expert-guided roadmap from product classification to LMPC certificate — timeline typically 2–4 weeks from complete document submission.
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
                    <p style={{ fontFamily: T.sans, fontSize: 14.5,textAlign: "justify", color: T.paradark, lineHeight: 1.8, marginBottom: 10, textAlign: "justify" }}>{s.desc}</p>
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
                <div className="sl-row" style={{ marginBottom: 12 }}><div className="sl-line" /><span className="sl-text">Label Compliance</span></div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🏷️</div>
                <h4 style={{ fontFamily: T.poppins, fontSize: 16, color: T.titleblue, fontWeight: 700, marginBottom: 10 }}>Every Pre-Packaged Product Must Comply</h4>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.paradark, lineHeight: 1.8, textAlign: "justify" }}>
                  Legal Metrology Rules mandate specific declarations on every pre-packaged commodity sold in India — MRP (inclusive of all taxes), net quantity in standard units, manufacturer/importer name and full address, country of origin, month and year of manufacture, and customer care contact. Non-compliant labels attract penalties independently of LMPC registration status. Our team audits every label element before application filing.
                </p>
                <button onClick={() => window.location.href = "/contact"} style={{ marginTop: 16, width: "100%", padding: "11px 20px", background: T.teal, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.orange}
                  onMouseLeave={e => e.currentTarget.style.background = T.teal}>
                  Get Free Label Audit →
                </button>
              </div>

              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Why Choose Us?</div>
                {[
                  "Complete label compliance audit before filing",
                  "Central & State Controller applications handled",
                  "0% application rejection rate",
                  "Authorized representative services for foreign brands",
                  "Query responses within 48–72 hours",
                  "Multi-SKU & multi-category portfolio management",
                  "Proactive annual renewal tracking",
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
          SECTION 3 — DOCUMENTS REQUIRED FOR LMPC REGISTRATION
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden" }} className="sec">
        <Image src="https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=1600&q=80&fit=crop" alt="documents" fill style={{ objectFit: "cover" }} unoptimized />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(13,27,42,0.96) 0%,rgba(14,128,128,0.88) 100%)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={lmpcDocsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row">
                <div className="sl-line" style={{ background: "rgba(255,255,255,0.5)" }} />
                <span className="sl-text" style={{ color: "rgba(255,255,255,0.75)" }}>What You Need</span>
              </div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: "#fff", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Documents Required for LMPC Registration
            </h2>
            <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.72)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              Complete and correctly formatted documentation is the most critical factor in a smooth LMPC approval. Here is what you need to prepare before filing.
            </p>
          </div>

          <div className="lmpc-docs-grid" ref={lmpcDocsRef}>
            {lmpcDocsList.map((doc, i) => (
              <div key={doc.title} className={`doc-card reveal d${i % 4}`}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(30,136,200,0.25)", border: "1px solid rgba(30,136,200,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  {doc.icon}
                </div>
                <div>
                  <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{doc.title}</div>
                  <p style={{ fontFamily: T.sans, fontSize: 13, textAlign: "justify", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "20px 28px", backdropFilter: "blur(4px)" }}>
            <div className="pro-tip-row">
              <div style={{ fontSize: 28, flexShrink: 0 }}>💡</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Pro Tip: Label declaration mismatches are the #1 cause of LMPC query letters</div>
                <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.70)", margin: 0, lineHeight: 1.7 }}>The product name, net quantity, MRP, and manufacturer/importer details in your application must exactly match what is printed on the packaging samples submitted. Even minor discrepancies — a different address format, a missing country of origin — trigger Controller query letters that add 1–2 weeks to the registration timeline. Our team cross-checks every document against the packaging before submission.</p>
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
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Plan Your Registration</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Timelines, Costs, Validity & Renewal
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              Plan your product launch and compliance calendar with a clear picture of what LMPC registration involves from start to finish.
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
                  <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.tealMid, fontWeight: 600 }}>Total estimated time: <strong>2–4 weeks</strong> from complete document submission (varies by product category and Controller workload)</span>
                </div>
              </div>

              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "20px 20px 0", borderBottom: `2px solid ${T.border}` }}>
                  <div className="sl-row" style={{ marginBottom: 10 }}><div className="sl-line" /><span className="sl-text">Cost Breakdown</span></div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 14 }}>LMPC Registration Fees</h3>
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
                    LMPC government fees are prescribed under the Legal Metrology (Packaged Commodities) Rules and vary by product category and state. Contact us for a transparent all-in quote for your specific product mix and registration type.
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
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>🔄 Renewal & Amendment Management</div>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 18 }}>
                  LMPC renewal and amendment filing require careful management. Common challenges our clients face:
                </p>
                {[
                  "Tracking annual renewal deadlines across multi-SKU product portfolios",
                  "Adding new products mid-year requiring amendment applications",
                  "MRP changes requiring label re-approval before retail sale",
                  "Manufacturer/importer address changes requiring Controller notification",
                  "E-commerce platform audits demanding current LMPC certificates",
                  "State-specific renewal requirements for multi-state manufacturer operations",
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
              <Image src="/finalimages/faq10.jpg" alt="LMPC FAQ" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} />
            </div>
            <div style={{ background: T.white, padding: "28px 24px", borderLeft: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 1.5, background: T.teal }} />
                <span style={{ fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: T.teal, letterSpacing: "0.13em", textTransform: "uppercase" }}>Frequently Asked</span>
              </div>
              <h3 style={{ fontFamily: T.poppins, fontSize: 35, fontWeight: 600, color: T.titleblue, marginBottom: 20 }}>LMPC Registration FAQs</h3>
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
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.9rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 14 }}>Get LMPC Compliant Today</h2>
              <p style={{ fontFamily: T.sans, color: T.paradark, fontSize: 14.5, lineHeight: 1.8 }}>Avoid customs holds, retail penalties, and marketplace suspensions. Our Legal Metrology experts will get you compliant quickly.<br />Free consultation. Transparent pricing. Error-free applications.</p>
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