"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import Navbar from "../Components/Navbar";
const Footer = dynamic(() => import("../Components/Footer"));
import "../animations.css";

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

const T = {
  teal: "#1E88C8", tealDark: "#074D4D", tealMid: "#0E8080", titleblue: "#0a6daa", para: "#080000b0", paradark: "#080000c4",
  tealLight: "#EBF5F5", amber: "#C8780A", amberLight: "#FEF3DC", amberDark: "#9A5C06",
  slate: "#0D1B2A", body: "#2D3748", muted: "#718096", subtle: "#A0AEC0",
  border: "#E8E3DA", borderLight: "#F0ECE5", white: "#FFFFFF", cream: "#FAF8F4",
  ctaBand: "#EBF5FB", ctaBandBorder: "#C8DFF0", orange: "#F97316",
  serif: "'Cormorant Garamond','Georgia',serif",
  sans: "'Outfit','system-ui',sans-serif",
  poppins: "'Poppins','system-ui',sans-serif",
};

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

const isiCategories = [
  { icon: "🔩", title: "Steel & Iron Products", tag: "Industrial", desc: "Reinforcement bars, mild steel tubes, galvanized steel sheets and structural steel sections all require ISI Mark certification." },
  { icon: "🏗️", title: "Cement & Building Materials", tag: "Construction", desc: "Portland cement, fly ash bricks, ceramic tiles, sanitary ware and building hardware require mandatory ISI certification." },
  { icon: "⚡", title: "Electrical Goods", tag: "Electrical", desc: "Domestic wiring cables, switches, plug sockets, MCBs, transformers and electrical motors require mandatory ISI Mark." },
  { icon: "🍳", title: "Pressure Cookers & Cookware", tag: "Consumer", desc: "Pressure cookers, cylinders, and LPG-related products must carry the ISI Mark before being sold in India." },
  { icon: "🚰", title: "Water Pipes & Fittings", tag: "Plumbing", desc: "PVC pipes, CPVC fittings, water meters, and related plumbing materials require ISI certification for quality assurance." },
  { icon: "🪖", title: "Safety Equipment", tag: "Safety", desc: "Helmets (industrial and two-wheeler), safety shoes, fire extinguishers, and protective gear require mandatory ISI Mark." },
];

const faqs = [
  { q: "Which products require mandatory ISI Mark in India?", a: "370+ product categories require mandatory ISI Mark including steel, cement, electrical goods (cables, switches, MCBs), LPG cylinders, pressure cookers, helmets, and many more as specified under the BIS Act, 2016." },
  { q: "How is ISI Mark different from BIS CRS?", a: "ISI Mark is for manufactured goods (domestic or imported) that must meet an Indian Standard — a physical mark stamped on the product. BIS CRS is a registration scheme for specific electronics/IT goods that only need a registration number (R-number), without a stamped mark." },
  { q: "How long does ISI Mark certification take?", a: "Typically 8–12 weeks depending on the product, lab test availability, and factory inspection scheduling. Our team tracks the process at every stage to avoid unnecessary delays." },
  { q: "Can a foreign manufacturer get ISI Mark?", a: "Yes. Foreign manufacturers can apply under BIS Scheme-X or the Foreign Manufacturers Certification Scheme (FMCS). An Indian Authorized Representative (IAR) is required." },
  { q: "How long is an ISI Mark license valid?", a: "ISI Mark licenses are typically valid for 1–2 years and must be renewed before expiry. Annual surveillance audits are conducted by BIS during the license period." },
];

const infoItems = [
  { label: "Products Covered", value: "370+ Categories" },
  { label: "Governing Body", value: "Bureau of Indian Standards" },
  { label: "Validity", value: "1–2 Years (Renewable)" },
  { label: "Typical Timeline", value: "8–12 Weeks" },
  { label: "Our Failure Rate", value: "0%" },
];

const statsStrip = [
  { value: "370+", label: "Product Categories", icon: "📋" },
  { value: "8–12", label: "Weeks Timeline", icon: "⚡" },
  { value: "Free", label: "Initial Consultation", icon: "🆓" },
  { value: "0%", label: "Failure Rate", icon: "❌" },
];

const heroChips = [
  { icon: "🔩", label: "Steel & Cement" },
  { icon: "⚡", label: "Electrical Goods" },
  { icon: "🏗️", label: "Building Materials" },
  { icon: "🪖", label: "Safety Equipment" },
  { icon: "✅", label: "0% Failure Rate" },
];

// ── SECTION 1 — BENEFITS ──────────────────────────────────────────────────────

const benefits = [
  {
    icon: "⚖️",
    title: "Legal Right to Manufacture & Sell",
    desc: "Only ISI Mark-certified products can be legally manufactured, imported, or sold in India for the 370+ categories under Quality Control Orders. The CM/L number stamped on the product proves BIS compliance.",
  },
  {
    icon: "🏭",
    title: "Factory Inspection Builds Process Credibility",
    desc: "Unlike CRS, the ISI Mark involves a BIS factory audit, which validates your manufacturing process and quality system — building credibility with B2B buyers, government tenders, and retailers.",
  },
  {
    icon: "🏆",
    title: "India's Most Trusted Quality Mark",
    desc: "The ISI Mark has been in use since 1955 and is the most widely recognized quality symbol in India. Consumer trust in ISI-marked products is extremely high, directly impacting sales and brand positioning.",
  },
  {
    icon: "🏛️",
    title: "Access to Government Tenders & PSU Orders",
    desc: "Most government procurement, defence, railways, and public sector orders mandate ISI-certified products. Without ISI Mark, your products are disqualified from a significant portion of India's institutional market.",
  },
  {
    icon: "🛡️",
    title: "Protection Against Market Seizure & Penalties",
    desc: "Non-ISI products are routinely seized during market surveillance by BIS and state enforcement agencies. ISI certification eliminates this risk and protects your business from heavy penalties under the BIS Act, 2016.",
  },
  {
    icon: "🌍",
    title: "Gateway for Foreign Manufacturers via FMCS",
    desc: "Foreign manufacturers can enter India's vast manufacturing supply chain through the FMCS (Foreign Manufacturers Certification Scheme). ISI Mark opens doors to long-term B2B contracts with Indian industry.",
  },
  {
    icon: "📈",
    title: "Competitive Advantage in Price-Sensitive Markets",
    desc: "In categories like steel, cement, cables, and plumbing materials, ISI certification is table stakes for B2B buyers. Certified manufacturers command better pricing and long-term supply agreements.",
  },
  {
    icon: "🔁",
    title: "Annual Surveillance Keeps Quality Consistent",
    desc: "BIS conducts annual factory surveillance visits, which incentivize manufacturers to maintain consistent product quality — reducing defect rates, customer complaints, and recall risks over time.",
  },
];

// ── SECTION 2 — DETAILED STEPS ────────────────────────────────────────────────

const detailedSteps = [
  {
    step: "01",
    icon: "🔍",
    title: "IS Standard & Scheme Identification",
    desc: "We identify the exact Indian Standard (IS number) applicable to your product and confirm whether ISI Mark certification is mandatory under the relevant Quality Control Order (QCO) or voluntary.",
    tip: "Tip: Some products have both mandatory and voluntary IS standards — choosing the right one affects the scope of testing and the audit requirements.",
  },
  {
    step: "02",
    icon: "🧪",
    title: "Product Sample Testing at BIS Lab",
    desc: "Product samples are tested at a BIS-recognized laboratory against the full test parameters of the applicable IS standard. The test report is the primary technical document for the license application.",
    tip: "Tip: Ensure samples are from actual production batches — pre-production prototypes or hand-made samples may not qualify for formal testing.",
  },
  {
    step: "03",
    icon: "📋",
    title: "Quality Manual & Factory Documentation",
    desc: "Prepare the complete application package: Quality Manual aligned to the IS standard, manufacturing process flowcharts, raw material supplier list, factory layout plan, and all company KYC documents.",
    tip: "Tip: A well-prepared Quality Manual significantly reduces the time BIS inspectors spend during factory audit — and reduces the chances of non-conformances.",
  },
  {
    step: "04",
    icon: "📤",
    title: "Application Submission on BIS Portal",
    desc: "We file the complete ISI Mark license application on the official BIS online portal, including test reports, Quality Manual, company documents, and applicable government fees.",
    tip: "Tip: The BIS portal requires very specific document formats. Incorrect uploads are a common cause of application rejection at the first stage.",
  },
  {
    step: "05",
    icon: "🔎",
    title: "BIS Factory Inspection",
    desc: "BIS assigns an inspection officer who visits your manufacturing unit to verify: facility, equipment, raw material quality, production process, testing setup, and in-process quality controls.",
    tip: "Tip: Factory inspection readiness is critical. Non-conformances raised during the audit must be resolved before the license is granted — adding weeks to the timeline.",
  },
  {
    step: "06",
    icon: "🎓",
    title: "License Grant & CM/L Stamping",
    desc: "Upon successful inspection and BIS review, the ISI Mark License is issued with a unique CM/L (Certificate of Mark/License) number. Products must be stamped with the ISI Mark and CM/L number before sale.",
    tip: "Important: Stamping products with the ISI Mark before license issuance is illegal and punishable under the BIS Act, 2016.",
  },
];

// ── SECTION 3 — DOCUMENTS ────────────────────────────────────────────────────

const isiDocs = [
  { icon: "📄", title: "Product Test Report", desc: "Valid test report from a BIS-recognized laboratory confirming compliance with the applicable IS standard for the product." },
  { icon: "🏭", title: "Factory Premises Proof", desc: "Factory lease agreement or ownership document, layout plan, and address proof of the manufacturing unit." },
  { icon: "🏢", title: "Company Registration Certificate", desc: "Certificate of Incorporation, Partnership Deed, or Proprietorship registration as applicable to the business entity." },
  { icon: "📘", title: "Quality Manual", desc: "Comprehensive Quality Manual aligned with the requirements of the applicable Indian Standard — covering production process, quality checks, and testing procedures." },
  { icon: "🔄", title: "Manufacturing Process Flowchart", desc: "Detailed flow diagram of the manufacturing process from raw material intake to finished product dispatch." },
  { icon: "🪪", title: "Authorized Signatory KYC", desc: "PAN card, Aadhaar, and authorization letter for the person signing the BIS application on behalf of the company." },
  { icon: "📦", title: "Raw Material Supplier List", desc: "List of key raw material suppliers with their names, addresses, and the IS standards their materials conform to." },
  { icon: "🛠️", title: "Testing Equipment List", desc: "Inventory of in-house testing and measuring equipment used for product quality verification, with calibration records." },
];

// ── SECTION 4 — TIMELINE, COST, VALIDITY ────────────────────────────────────

const timelineRows = [
  { phase: "IS Standard & Scheme Identification", duration: "1–3 Days", owner: "Applicant / Consultant" },
  { phase: "Lab Testing & Test Report Generation", duration: "3–5 Weeks", owner: "BIS-Recognized Lab" },
  { phase: "Quality Manual & Document Preparation", duration: "5–7 Days", owner: "Applicant / Consultant" },
  { phase: "BIS Portal Application Submission", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "BIS Factory Inspection Scheduling", duration: "1–3 Weeks", owner: "BIS Authority" },
  { phase: "Factory Inspection & Non-Conformance Resolution", duration: "1–2 Weeks", owner: "Applicant + BIS" },
  { phase: "License Grant & CM/L Number Issuance", duration: "3–7 Days", owner: "Bureau of Indian Standards" },
];

const costItems = [
  { label: "Application Fee (per product per location)", value: "₹1,000 – ₹10,000" },
  { label: "Lab Testing Charges", value: "₹20,000 – ₹1,50,000+" },
  { label: "Annual Surveillance Fee", value: "₹1,000 – ₹5,000" },
  { label: "Renewal Fee (every 1–2 years)", value: "₹1,000 – ₹10,000" },
  { label: "Consultant / Professional Fees", value: "Variable (contact us for quote)" },
];

const validityCards = [
  {
    icon: "📅",
    title: "License Validity",
    value: "1–2 Years",
    desc: "ISI Mark licenses are typically valid for 1–2 years depending on the product category and applicable IS standard.",
    color: "#1E88C8",
  },
  {
    icon: "🔍",
    title: "Annual Surveillance",
    value: "Every Year",
    desc: "BIS conducts annual factory surveillance audits during the license period to verify continued compliance with the IS standard.",
    color: "#C8780A",
  },
  {
    icon: "🔄",
    title: "Renewal Condition",
    value: "No Major Change",
    desc: "Renewal is straightforward if there is no change in product design, manufacturing location, raw material source, or applicable IS standard.",
    color: "#0E8080",
  },
  {
    icon: "📍",
    title: "Per-Location License",
    value: "Each Factory",
    desc: "Each manufacturing unit/location must hold its own ISI Mark license, even for the same product and brand owner.",
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

export default function BISISIScreen() {
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
        <Image src="/finalimages/siaccbis.png" alt="BIS ISI Mark" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right,rgba(7,18,28,0.88) 0%,rgba(7,18,28,0.60) 50%,rgba(7,18,28,0.10) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,4vw,60px)" }}>
          <div ref={heroLeftRef} className="reveal-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", borderRadius: 4, padding: "6px 16px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Bureau of Indian Standards — ISI Mark Certification
              </span>
            </div>
            <h1 style={{ fontFamily: T.poppins, fontSize: 56, fontWeight: 700, lineHeight: 1.04, marginBottom: 20, letterSpacing: "-0.01em", color: "#fff", maxWidth: 640 }}>
              BIS ISI Mark for{" "}
              <span style={{ color: T.orange }}>Manufactured Goods</span>
            </h1>
            <p style={{ fontFamily: T.poppins, fontSize: 16, color: "rgba(255,255,255,0.82)", maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>
              Mandatory quality certification for 370+ product categories including steel, cement, electrical goods, LPG cylinders and building materials.
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
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Bureau of Indian Standards — ISI Mark</span></div>
              <h2 style={{ fontFamily: T.poppins, fontSize: 40, color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 16 }}>
                ISI Mark Certification, <br /> Handled for You
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 16, textAlign: "justify" }}>
                The ISI Mark is India's most recognized quality certification mark, administered by the Bureau of Indian Standards (BIS). It is mandatory for 370+ product categories under various Quality Control Orders. Products without the ISI Mark cannot be legally manufactured or sold in India.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 32, textAlign: "justify" }}>
                Our BIS specialists coordinate with BIS-recognized labs, prepare your complete license application, guide factory inspection preparation, and follow up until your ISI Mark license is granted — typically in 8–12 weeks.
              </p>
              <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", marginBottom: 32, height: 220 }}>
                <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80&fit=crop" alt="Manufacturing quality" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} unoptimized />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(14,128,128,0.78) 0%,rgba(30,136,200,0.45) 60%,rgba(235,245,251,0.15) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 28px" }}>
                  <div>
                    <div style={{ fontFamily: T.poppins, fontSize: "clamp(1rem,2vw,1.3rem)", color: "#fff", fontWeight: 700, marginBottom: 4 }}>Trusted by 1,000+ Manufacturers</div>
                    <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.80)", fontSize: 12.5 }}>Steel · Cement · Electrical · Plumbing · Safety Equipment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right" ref={infoCardRef}>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "sticky", top: 100 }}>
                <div className="sl-row"><div className="sl-line" /><span className="sl-text">Quick Info — ISI Mark</span></div>
                {infoItems.map((item, i) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < infoItems.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <span style={{ fontFamily: T.sans, fontSize: 13, color: T.muted }}>{item.label}</span>
                    <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.slate, fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                  </div>
                ))}
                <button onClick={() => window.location.href = "/contact"} style={{ width: "100%", marginTop: 22, padding: 13, background: T.orange, color: "#fff", fontWeight: 600, borderRadius: 6, border: "none", fontFamily: T.poppins, fontSize: 14, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.teal}
                  onMouseLeave={e => e.currentTarget.style.background = T.orange}>Start ISI Application →</button>
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

      {/* ══ CATEGORIES ══ */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={typesTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}><div className="sl-row"><div className="sl-line" /><span className="sl-text">ISI Mark Product Categories</span></div></div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>Who Needs ISI Mark?</h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 480, margin: "0 auto", lineHeight: 1.75, fontSize: 16 }}>370+ categories of goods manufactured or sold in India require mandatory ISI Mark certification.</p>
          </div>
          <div className="types-grid" ref={typesRef}>
            {isiCategories.map((t, i) => (
              <div key={t.title} className={`type-card reveal d${i % 6}`}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 52, height: 52, background: T.tealLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{t.icon}</div>
                  <span style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 700, background: T.amberLight, color: T.amberDark, padding: "3px 10px", borderRadius: 3, letterSpacing: "0.06em" }}>{t.tag}</span>
                </div>
                <h3 style={{ fontFamily: T.poppins, fontSize: 17, color: T.titleblue, marginBottom: 10, fontWeight: 600 }}>{t.title}</h3>
                <p style={{ fontSize: 15, color: T.para, margin: 0, fontWeight: 500, textAlign: "justify" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — IMPORTANCE & BENEFITS OF ISI MARK CERTIFICATION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={benefitsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Why It Matters</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Importance & Benefits of ISI Mark Certification
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 580, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              The ISI Mark is far more than a compliance checkbox — it is India's gold standard for product quality, a gateway to government procurement, and a shield against market penalties and seizure.
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
                <p style={{ fontFamily: T.sans, fontSize: 14, color: T.paradark,textAlign: "justify", lineHeight: 1.8, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Warning callout */}
          <div style={{ marginTop: 40, background: `linear-gradient(135deg,${T.teal} 0%,${T.tealMid} 100%)`, borderRadius: 12, padding: "28px 36px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ fontSize: 36, flexShrink: 0 }}>⚠️</div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Manufacturing or Selling Without ISI Mark is Illegal</div>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: 0 }}>
                For products covered under mandatory Quality Control Orders, manufacturing, importing, or selling without a valid ISI Mark license is a cognizable offence under the BIS Act, 2016. Penalties include heavy fines, product seizure, and imprisonment for repeat violations. BIS and state enforcement agencies conduct regular market surveillance raids.
              </p>
            </div>
            <button onClick={() => window.location.href = "/contact"} style={{ padding: "12px 28px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
              onMouseLeave={e => e.currentTarget.style.background = T.orange}>
              Get Compliant Now →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — STEP-BY-STEP PROCESS OF ISI MARK CERTIFICATION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={dstepsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">How It Works</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Step-by-Step ISI Mark Certification Process
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              A clear, expert-guided roadmap from IS standard identification to ISI Mark license in hand — typically completed in 8–12 weeks.
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
                    <p style={{ fontFamily: T.sans, fontSize: 14.5,textAlign: "justify", color: T.paradark, lineHeight: 1.8, marginBottom: 10 }}>{s.desc}</p>
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
                <div className="sl-row" style={{ marginBottom: 12 }}><div className="sl-line" /><span className="sl-text">Foreign Manufacturers</span></div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🌏</div>
                <h4 style={{ fontFamily: T.poppins, fontSize: 16, color: T.titleblue, fontWeight: 700, marginBottom: 10 }}>FMCS & Scheme-X for Foreign Manufacturers</h4>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.paradark, lineHeight: 1.8 }}>
                  Foreign manufacturers can obtain ISI Mark through the Foreign Manufacturers Certification Scheme (FMCS) or BIS Scheme-X. An Authorized Indian Representative (AIR) is mandatory. Our team can act as your AIR or assist with the full FMCS application process.
                </p>
                <button onClick={() => window.location.href = "/contact"} style={{ marginTop: 16, width: "100%", padding: "11px 20px", background: T.teal, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.orange}
                  onMouseLeave={e => e.currentTarget.style.background = T.teal}>
                  Enquire About FMCS / Scheme-X →
                </button>
              </div>

              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Why Choose Us?</div>
                {[
                  "End-to-end lab coordination",
                  "Factory inspection preparation support",
                  "0% application failure rate",
                  "Real-time BIS portal tracking",
                  "Query & non-conformance resolution",
                  "Renewal & surveillance audit support",
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
          SECTION 3 — DOCUMENTS REQUIRED FOR ISI MARK CERTIFICATION
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
              Documents Required for ISI Mark Certification
            </h2>
            <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.72)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              ISI Mark requires more documentation than CRS — particularly around factory processes and quality systems. Getting this right the first time saves weeks of back-and-forth with BIS.
            </p>
          </div>

          <div className="crs-docs-grid" ref={crsDocsRef}>
            {isiDocs.map((doc, i) => (
              <div key={doc.title} className={`doc-card reveal d${i % 4}`}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(30,136,200,0.25)", border: "1px solid rgba(30,136,200,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  {doc.icon}
                </div>
                <div>
                  <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{doc.title}</div>
                  <p style={{ fontFamily: T.sans, fontSize: 13, textAlign: "justify",color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "20px 28px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", backdropFilter: "blur(4px)" }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>💡</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Pro Tip: Factory readiness is the #1 cause of ISI Mark delays</div>
              <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.70)", margin: 0, lineHeight: 1.7 }}>Non-conformances raised during BIS factory inspection — such as missing test equipment, inadequate quality records, or untrained staff — are the most common cause of extended ISI Mark timelines. Our team prepares your factory for inspection before BIS arrives.</p>
            </div>
            <button onClick={() => window.location.href = "/contact"} style={{ padding: "11px 26px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}
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
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Plan Your Certification</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Timelines, Costs, Validity & Renewal
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              Understand the full picture before you begin — so you can plan your product launch or manufacturing timeline in India with confidence.
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
                  <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.tealMid, fontWeight: 600 }}>Total estimated time: <strong>8–12 weeks</strong> (when documents and factory are ready)</span>
                </div>
              </div>

              {/* Cost Table */}
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "20px 20px 0", borderBottom: `2px solid ${T.border}` }}>
                  <div className="sl-row" style={{ marginBottom: 10 }}><div className="sl-line" /><span className="sl-text">Cost Breakdown</span></div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 14 }}>ISI Mark Certification Fees</h3>
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
                    Government fees are officially prescribed by BIS. Lab and factory inspection costs depend on the product category and IS standard. Contact us for a transparent, all-in cost quote for your specific product.
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
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>🔄 Renewal & Surveillance Made Simple</div>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 18 }}>
                  ISI Mark renewal involves both a BIS portal submission and an annual surveillance audit. Common challenges our clients face during renewal:
                </p>
                {[
                  "Managing multiple license expiry dates across product lines",
                  "Preparing for annual BIS surveillance audits",
                  "Handling non-conformances raised during surveillance",
                  "Updating Quality Manual for revised IS standards",
                  "Managing factory or design changes alongside renewal",
                  "Responding to BIS portal renewal queries promptly",
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
              <Image src="/finalimages/faq12.jpg" alt="BIS ISI FAQ" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} />
            </div>
            <div style={{ background: T.white, padding: "28px 24px", borderLeft: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 1.5, background: T.teal }} />
                <span style={{ fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: T.teal, letterSpacing: "0.13em", textTransform: "uppercase" }}>Frequently Asked</span>
              </div>
              <h3 style={{ fontFamily: T.poppins, fontSize: 35, fontWeight: 600, color: T.titleblue, marginBottom: 20 }}>ISI Mark FAQs</h3>
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
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.9rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 14 }}>Ready to Get ISI Mark Certified?</h2>
              <p style={{ fontFamily: T.sans, color: T.paradark, fontSize: 14.5, lineHeight: 1.8 }}>Our BIS specialists will assess your product and give you a clear roadmap — for free.<br />Free consultation. Clear timeline. Transparent pricing.</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
              <button onClick={() => window.location.href = "/contact"}
                style={{ padding: "14px 36px", fontFamily: T.poppins, fontSize: 14, fontWeight: 600, border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", whiteSpace: "nowrap", transition: "all 0.22s" }}
                onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.orange; e.currentTarget.style.transform = "translateY(0)"; }}>Get Free Consultation</button>
              <a href="tel:+919891229135" style={{ padding: "13px 28px", border: `1.5px solid ${T.border}`, borderRadius: 6, fontFamily: T.poppins, fontSize: 14, fontWeight: 500, color: T.slate, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, whiteSpace: "nowrap", background: T.white, transition: "border-color 0.2s" }}
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