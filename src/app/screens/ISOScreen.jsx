"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import Navbar from "../Components/Navbar";
const Footer = dynamic(() => import("../Components/Footer"));

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

const isoTypes = [
  { icon: "🏆", title: "ISO 9001:2015", tag: "Most Popular", desc: "Quality Management System — the world's most recognized quality standard applicable to all industries and organization sizes." },
  { icon: "🌿", title: "ISO 14001:2015", tag: "Environment", desc: "Environmental Management System for organizations committed to reducing environmental impact and meeting regulatory requirements." },
  { icon: "🦺", title: "ISO 45001:2018", tag: "Safety", desc: "Occupational Health & Safety Management System to proactively prevent workplace injuries, illness, and unsafe conditions." },
  { icon: "🔒", title: "ISO 27001:2022", tag: "IT Security", desc: "Information Security Management System for organizations handling sensitive data — increasingly required by enterprise clients." },
  { icon: "🍽️", title: "ISO 22000:2018", tag: "Food Safety", desc: "Food Safety Management System covering the entire food supply chain from farm to fork, recognized globally." },
  { icon: "💉", title: "ISO 13485:2016", tag: "Medical Devices", desc: "Quality Management System specifically for medical device manufacturers, suppliers, and distributors." },
];

const faqs = [
  { q: "Is ISO certification mandatory in India?", a: "ISO certification is generally voluntary but is increasingly required for government tenders, international contracts, and export compliance. Some sectors have mandatory requirements." },
  { q: "How long does ISO certification take?", a: "Typically 2–4 months depending on your organization's size, existing processes, and the standard being pursued. We help expedite the process through structured gap analysis and documentation support." },
  { q: "How long is an ISO certificate valid?", a: "ISO certificates are valid for 3 years with annual surveillance audits in year 1 and year 2, and a recertification audit in year 3. We assist with all three cycles." },
  { q: "Can a small business get ISO certified?", a: "Absolutely. ISO standards are designed to be scalable and apply to organizations of all sizes — from single-person businesses to large corporations across all industries." },
  { q: "Which ISO standard is right for my business?", a: "It depends on your industry and goals. ISO 9001 suits most businesses for quality management. ISO 14001 is for environmental compliance, ISO 45001 for workplace safety, and ISO 27001 for data security. We can help you decide." },
];

const infoItems = [
  { label: "Standards Covered", value: "ISO 9001, 14001, 45001 & more" },
  { label: "Recognition", value: "Global (170+ Countries)" },
  { label: "Validity", value: "3 Years + Annual Audit" },
  { label: "Processing Time", value: "2–4 Months" },
  { label: "Applicable To", value: "All Industries & Sizes" },
];

const statsStrip = [
  { value: "3 yrs", label: "Certificate Validity", icon: "📅" },
  { value: "2–4", label: "Months Timeline", icon: "⚡" },
  { value: "Free", label: "Initial Consultation", icon: "🆓" },
  { value: "0%", label: "Failure Rate", icon: "❌" },
];

const heroChips = [
  { icon: "🏆", label: "ISO 9001" },
  { icon: "🌿", label: "ISO 14001" },
  { icon: "🦺", label: "ISO 45001" },
  { icon: "🔒", label: "ISO 27001" },
  { icon: "✅", label: "0% Failure Rate" },
];

// ── SECTION 1 — BENEFITS ─────────────────────────────────────────────────────

const benefits = [
  {
    icon: "📜",
    title: "Mandatory for Government Tenders",
    desc: "Most central and state government procurement tenders in India require valid ISO 9001 certification as a mandatory eligibility condition. Without it, your bid is disqualified at the technical evaluation stage regardless of price.",
  },
  {
    icon: "🌍",
    title: "Gateway to International Markets",
    desc: "ISO certification is a globally recognized quality signal required by importers, distributors, and enterprise buyers in the US, EU, Middle East, and Southeast Asia. It is often a non-negotiable prerequisite for export contracts and international supply chain onboarding.",
  },
  {
    icon: "🏢",
    title: "Enterprise & Large Client Onboarding",
    desc: "Large Indian and multinational corporations routinely require ISO certification from their vendors, suppliers, and service providers. ISO certification removes a common barrier in B2B sales cycles and shortens vendor approval timelines significantly.",
  },
  {
    icon: "⚙️",
    title: "Structured Operational Processes",
    desc: "ISO implementation is not just about the certificate — it systematically documents and improves your core business processes, reducing errors, rework, and operational inefficiency. Certified businesses report measurable improvements in delivery consistency and customer satisfaction.",
  },
  {
    icon: "🛡️",
    title: "Legal & Regulatory Risk Reduction",
    desc: "ISO 14001 and ISO 45001 certifications directly address regulatory compliance for environmental and occupational safety laws in India. Certified organizations are better positioned in regulatory audits and face reduced exposure to fines and enforcement actions.",
  },
  {
    icon: "🔐",
    title: "Data Security & Client Trust (ISO 27001)",
    desc: "ISO 27001 certification signals to clients, partners, and regulators that your organization manages information security systematically. It is increasingly required by fintech, healthcare, and enterprise IT clients before signing data-sharing agreements.",
  },
  {
    icon: "📈",
    title: "Competitive Differentiation",
    desc: "In competitive markets, ISO certification is a credibility marker that differentiates your organization from uncertified competitors. It supports premium pricing, stronger client retention, and faster business development with quality-conscious buyers.",
  },
  {
    icon: "🔁",
    title: "Continuous Improvement Framework",
    desc: "The ISO management system framework — built around Plan-Do-Check-Act — embeds a continuous improvement culture into your organization. Annual surveillance audits and internal reviews create a structured cycle of measurement, review, and improvement.",
  },
];

// ── SECTION 2 — DETAILED STEPS ───────────────────────────────────────────────

const detailedSteps = [
  {
    step: "01",
    icon: "📊",
    title: "Gap Analysis & Standard Selection",
    desc: "We assess your current processes, documentation, and practices against the requirements of the applicable ISO standard. The gap analysis identifies exactly what needs to be created, modified, or implemented — giving you a clear, prioritised roadmap to certification readiness.",
    tip: "Tip: Organizations with no prior ISO implementation typically have 40–60% of required elements already in place as informal practices. The gap analysis captures this and prevents unnecessary rework.",
  },
  {
    step: "02",
    icon: "📄",
    title: "Documentation Development",
    desc: "We develop all required ISO documentation: the quality/management manual, scope statement, policies, standard operating procedures, work instructions, forms, and records. Documentation is tailored to your actual business — not generic templates — to ensure auditor acceptance.",
    tip: "Tip: Over-documentation is a common first-timer mistake. ISO standards require documented information to the extent necessary to support operations — not an exhaustive manual for every activity. We calibrate the right level for your organization.",
  },
  {
    step: "03",
    icon: "⚙️",
    title: "Implementation & Employee Training",
    desc: "We support your team in implementing the documented processes across relevant functions and levels. This includes awareness training on ISO requirements, role-specific procedure training, and guidance on completing the records that demonstrate conformance during the certification audit.",
    tip: "Tip: Certification auditors pay close attention to whether employees understand the quality/management system and can explain their role in it. Brief, practical training delivered close to the audit date is more effective than lengthy sessions months earlier.",
  },
  {
    step: "04",
    icon: "🔍",
    title: "Internal Audit",
    desc: "We conduct a structured internal audit against all clauses of the ISO standard to verify that processes are implemented as documented and that records are complete. Non-conformities identified in the internal audit are corrected before the external certification audit.",
    tip: "Tip: An effective internal audit is the single most reliable predictor of a clean certification audit. Organizations that skip or rush the internal audit almost always face major non-conformities during the external audit, extending the certification timeline by weeks.",
  },
  {
    step: "05",
    icon: "📋",
    title: "Certification Body Audit (Stage 1 & Stage 2)",
    desc: "An accredited certification body conducts a Stage 1 document review audit followed by a Stage 2 on-site implementation audit. We prepare your team for both stages, accompany the audit as observers, and manage any corrective action requests raised by the auditor.",
    tip: "Tip: Choosing the right accredited certification body matters — NABCB-accredited bodies are recognized by IAF members globally. We recommend the right body for your industry and export markets to ensure your certificate carries international credibility.",
  },
  {
    step: "06",
    icon: "🏅",
    title: "Certificate Issuance & Surveillance Management",
    desc: "The certification body issues your ISO certificate, valid for 3 years. We provide the certificate, advise on how to use the ISO mark correctly in your communications, and manage annual surveillance audits in year 1 and year 2 to maintain certification through the full 3-year cycle.",
    tip: "Important: Misuse of the ISO certification mark (e.g., implying product certification rather than management system certification) is a serious violation that can result in certificate suspension. We brief you on correct usage at every stage.",
  },
];

// ── SECTION 3 — DOCUMENTS ────────────────────────────────────────────────────

const isoDocs = [
  { icon: "🏢", title: "Company Registration Documents", desc: "Certificate of Incorporation, Partnership Deed, or equivalent business registration document establishing the legal identity of the organization applying for certification." },
  { icon: "🗺️", title: "Organizational Chart", desc: "Current organizational structure showing key functions, roles, and reporting lines — used to define the scope of the management system and identify process owners." },
  { icon: "📋", title: "Existing Process Documents", desc: "Any current SOPs, work instructions, quality plans, or procedures already in use — reviewed during gap analysis to identify what can be adapted versus what needs to be created." },
  { icon: "📊", title: "Business Scope & Activities Description", desc: "A clear description of your products, services, operations, and key processes — used to define the ISO certification scope statement accurately." },
  { icon: "🔖", title: "List of Applicable Legal Requirements", desc: "Relevant legal, regulatory, and statutory requirements applicable to your operations — mandatory for ISO 14001 (environmental) and ISO 45001 (safety) certifications." },
  { icon: "👥", title: "Employee & Function Details", desc: "List of departments, key functions, number of employees, and site locations to be covered under the ISO certification scope." },
  { icon: "📁", title: "Previous Audit Reports (if any)", desc: "Any previous internal audit reports, customer audit findings, or third-party assessment results that provide insight into existing gaps and strengths." },
  { icon: "✅", title: "Authorisation Letter", desc: "Letter authorising the consultant to develop documentation, liaise with the certification body, and represent the organization during the audit process." },
];

// ── SECTION 4 — TIMELINE, COST, VALIDITY ─────────────────────────────────────

const timelineRows = [
  { phase: "Gap Analysis & Standard Selection", duration: "1–2 Weeks", owner: "Applicant / Consultant" },
  { phase: "Documentation Development", duration: "3–5 Weeks", owner: "Applicant / Consultant" },
  { phase: "Implementation & Employee Training", duration: "2–4 Weeks", owner: "Applicant / Consultant" },
  { phase: "Internal Audit & Corrective Actions", duration: "1–2 Weeks", owner: "Applicant / Consultant" },
  { phase: "Certification Body Stage 1 & Stage 2 Audit", duration: "1–2 Weeks", owner: "Accredited Certification Body" },
  { phase: "Certificate Issuance", duration: "1–2 Weeks", owner: "Accredited Certification Body" },
];

const costItems = [
  { label: "Certification Body Audit Fees (accredited CB)", value: "₹15,000 – ₹80,000+" },
  { label: "Annual Surveillance Audit Fee (Year 1 & 2)", value: "₹10,000 – ₹50,000" },
  { label: "Recertification Audit Fee (Year 3)", value: "₹15,000 – ₹60,000" },
  { label: "Consultant / Documentation Fees", value: "Variable (contact us for quote)" },
];

const validityCards = [
  {
    icon: "📅",
    title: "Certificate Validity",
    value: "3 Years",
    desc: "ISO certificates are valid for 3 years from the date of issue, subject to satisfactory annual surveillance audits in year 1 and year 2.",
    color: "#1E88C8",
  },
  {
    icon: "🔍",
    title: "Surveillance Audits",
    value: "Year 1 & 2",
    desc: "Annual surveillance audits verify that the management system remains implemented and effective. Failing a surveillance audit can result in certificate suspension.",
    color: "#C8780A",
  },
  {
    icon: "🔄",
    title: "Recertification",
    value: "Year 3",
    desc: "A full recertification audit is conducted in year 3. This is a comprehensive re-audit equivalent in scope to the original Stage 2 certification audit.",
    color: "#0E8080",
  },
  {
    icon: "🔖",
    title: "Scope Coverage",
    value: "Per Scope",
    desc: "ISO certification covers a defined scope of activities and sites. Changes to your business scope — new products, services, or locations — may require a scope extension audit.",
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

export default function ISOScreen() {
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
        <Image src="/images/iso.png" alt="ISO Certification" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right,rgba(7,18,28,0.88) 0%,rgba(7,18,28,0.60) 50%,rgba(7,18,28,0.10) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,4vw,60px)" }}>
          <div ref={heroLeftRef} className="reveal-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", borderRadius: 4, padding: "6px 16px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>International Standards — Certified Consultants</span>
            </div>
            <h1 style={{ fontFamily: T.poppins, fontSize: "clamp(2.6rem,5.2vw,4.2rem)", fontWeight: 700, lineHeight: 1.04, marginBottom: 20, letterSpacing: "-0.01em", color: "#fff", maxWidth: 640 }}>
              ISO Certification for{" "}<span style={{ color: T.orange }}>All Industries</span>
            </h1>
            <p style={{ fontFamily: T.poppins, fontSize: 16, color: "rgba(255,255,255,0.82)", maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>
              Globally recognized quality, environment, safety, and information security certifications — handled end-to-end by our ISO specialists.
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
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">International Standards</span></div>
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 16 }}>
                End-to-End ISO Compliance,<br />Handled for You
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.tealMid, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>Gap Analysis · Documentation · Certification Audit · Surveillance</p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 16, textAlign: "justify" }}>
                Globally recognized quality, environment, safety, and information security standards. We manage the complete ISO certification journey — from gap analysis to final certification.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 32, textAlign: "justify" }}>
                Our ISO specialists handle documentation, implementation support, internal audits, and liaison with accredited certification bodies — so you can focus on running your business.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                <button onClick={() => window.location.href = "/contact"} style={{ padding: "13px 32px", fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, letterSpacing: "0.02em", border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", boxShadow: "0 4px 16px rgba(10,104,104,0.22)", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={e => { e.currentTarget.style.background = T.orange; e.currentTarget.style.transform = "translateY(0)"; }}>Get Free Consultation</button>
                <button onClick={() => window.location.href = "/contact"} style={{ padding: "12px 28px", fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, borderRadius: 6, cursor: "pointer", border: `1.5px solid ${T.border}`, color: T.slate, background: "transparent", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = T.teal; e.currentTarget.style.color = T.teal; }} onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.slate; }}>Which ISO Do I Need? →</button>
              </div>
              <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", height: 220 }}>
                <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&fit=crop" alt="ISO compliance team" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} unoptimized />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(14,128,128,0.78) 0%,rgba(30,136,200,0.45) 60%,rgba(235,245,251,0.15) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 28px" }}>
                  <div>
                    <div style={{ fontFamily: T.poppins, fontSize: "clamp(1rem,2vw,1.3rem)", color: "#fff", fontWeight: 700, marginBottom: 4 }}>Trusted by Businesses Across India</div>
                    <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.80)", fontSize: 12.5 }}>ISO 9001 · 14001 · 45001 · 27001 · 22000 · 13485</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right" ref={infoCardRef}>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "sticky", top: 100 }}>
                <div className="sl-row"><div className="sl-line" /><span className="sl-text">Quick Info — ISO</span></div>
                {infoItems.map((item, i) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < infoItems.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <span style={{ fontFamily: T.sans, fontSize: 13, color: T.muted }}>{item.label}</span>
                    <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.slate, fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                  </div>
                ))}
                <button onClick={() => window.location.href = "/contact"} style={{ width: "100%", marginTop: 22, padding: 13, background: T.orange, color: "#fff", fontWeight: 600, borderRadius: 6, border: "none", fontFamily: T.poppins, fontSize: 14, cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = T.teal} onMouseLeave={e => e.currentTarget.style.background = T.orange}>Start ISO Certification →</button>
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
            <div style={{ display: "flex", justifyContent: "center" }}><div className="sl-row"><div className="sl-line" /><span className="sl-text">ISO Standards</span></div></div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>ISO Standards We Cover</h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 480, margin: "0 auto", lineHeight: 1.75, fontSize: 16 }}>Choose the right ISO standard for your business goals and industry requirements.</p>
          </div>
          <div className="types-grid" ref={typesRef}>
            {isoTypes.map((t, i) => (
              <div key={t.title} className={`type-card reveal d${i % 6}`}>
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
          SECTION 1 — IMPORTANCE & BENEFITS OF ISO CERTIFICATION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={benefitsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Why It Matters</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Importance & Benefits of ISO Certification
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 580, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              ISO certification is far more than a wall certificate — it is a business enabler that opens markets, builds credibility, and embeds operational discipline across your organization.
            </p>
          </div>

          <div className="benefits-grid" ref={benefitsRef}>
            {benefits.map((b, i) => (
              <div key={b.title} className={`benefit-card reveal d${i % 6}`}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 10, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{b.icon}</div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 15.5, color: T.titleblue, fontWeight: 700, lineHeight: 1.3 }}>{b.title}</h3>
                </div>
                <p style={{ fontFamily: T.sans, textAlign: "justify",fontSize: 14, color: T.paradark, lineHeight: 1.8, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Callout banner */}
          <div style={{ marginTop: 40, background: `linear-gradient(135deg,${T.teal} 0%,${T.tealMid} 100%)`, borderRadius: 12, padding: "28px 36px" }}>
            <div className="callout-row">
              <div style={{ fontSize: 36, flexShrink: 0 }}>💼</div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>ISO Certification Wins Tenders & Unlocks Export Markets</div>
                <p style={{ fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: 0 }}>
                  Government tenders across India routinely disqualify bids from uncertified vendors at the technical evaluation stage. ISO 9001 certification is the single most impactful compliance step for businesses targeting public sector contracts, international buyers, or large enterprise clients. Organizations we have certified have directly attributed new tender wins and export contracts to their ISO certification within 6 months of issue.
                </p>
              </div>
              <button onClick={() => window.location.href = "/contact"} style={{ padding: "12px 28px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
                onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                Get Certified Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — STEP-BY-STEP ISO CERTIFICATION PROCESS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={dstepsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">How It Works</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Step-by-Step ISO Certification Process
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              A clear, expert-guided roadmap from gap analysis to certificate in hand — typically completed in 2–4 months.
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
                <div className="sl-row" style={{ marginBottom: 12 }}><div className="sl-line" /><span className="sl-text">Certification Bodies</span></div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🏛️</div>
                <h4 style={{ fontFamily: T.poppins, fontSize: 16, color: T.titleblue, fontWeight: 700, marginBottom: 10 }}>NABCB-Accredited Certification Bodies</h4>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.paradark, lineHeight: 1.8 }}>
                  ISO certificates must be issued by an accredited certification body to be internationally recognized. We work with NABCB-accredited (IAF member) certification bodies across India to ensure your certificate is accepted by government agencies, international buyers, and export markets — not just a paper exercise.
                </p>
                <button onClick={() => window.location.href = "/contact"} style={{ marginTop: 16, width: "100%", padding: "11px 20px", background: T.teal, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.orange}
                  onMouseLeave={e => e.currentTarget.style.background = T.teal}>
                  Start Your ISO Journey →
                </button>
              </div>

              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Why Choose Us?</div>
                {[
                  "NABCB-accredited certification body partnerships",
                  "Industry-specific documentation — not generic templates",
                  "0% certification audit failure rate",
                  "Internal audit conducted before certification audit",
                  "Surveillance audit management through 3-year cycle",
                  "Corrective action query resolution within 24 hours",
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
          SECTION 3 — DOCUMENTS REQUIRED FOR ISO CERTIFICATION
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
              Documents Required for ISO Certification
            </h2>
            <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.72)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              ISO certification is primarily a process and documentation exercise. Here is what you need to gather before we begin — most of it you already have.
            </p>
          </div>

          <div className="crs-docs-grid" ref={crsDocsRef}>
            {isoDocs.map((doc, i) => (
              <div key={doc.title} className={`doc-card reveal d${i % 4}`}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(30,136,200,0.25)", border: "1px solid rgba(30,136,200,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  {doc.icon}
                </div>
                <div>
                  <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{doc.title}</div>
                  <p style={{ fontFamily: T.sans, textAlign: "justify",fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, margin: 0 }}>{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 36, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "20px 28px", backdropFilter: "blur(4px)" }}>
            <div className="pro-tip-row">
              <div style={{ fontSize: 28, flexShrink: 0 }}>💡</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Pro Tip: Most businesses already have 40–60% of required documentation</div>
                <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.70)", margin: 0, lineHeight: 1.7 }}>Informal practices, existing procedures, and institutional knowledge in your team form a large part of what ISO requires — they just need to be documented and organized. Our gap analysis identifies exactly what already exists and what needs to be created, preventing unnecessary rework and dramatically shortening the implementation timeline.</p>
              </div>
              <button onClick={() => window.location.href = "/contact"} style={{ padding: "11px 26px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
                onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                Get Free Gap Analysis →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — TIMELINES, COSTS, VALIDITY & SURVEILLANCE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={tlcvTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Plan Your Certification</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Timelines, Costs, Validity & Surveillance
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              Plan your ISO certification journey with a clear picture of what's involved from gap analysis to the 3-year certificate lifecycle.
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
                  <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.tealMid, fontWeight: 600 }}>Total estimated time: <strong>2–4 months</strong> (varies by organization size and readiness)</span>
                </div>
              </div>

              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "20px 20px 0", borderBottom: `2px solid ${T.border}` }}>
                  <div className="sl-row" style={{ marginBottom: 10 }}><div className="sl-line" /><span className="sl-text">Cost Breakdown</span></div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 14 }}>ISO Certification Fees</h3>
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
                    Certification body fees vary based on organization size, number of employees, and scope complexity. NABCB-accredited bodies charge standard audit man-days. Contact us for a transparent all-in quote including consultant and certification body fees.
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — Validity + Surveillance */}
            <div>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, padding: "28px 24px", marginBottom: 24 }}>
                <div className="sl-row" style={{ marginBottom: 12 }}><div className="sl-line" /><span className="sl-text">Validity & Surveillance</span></div>
                <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 20 }}>Key Rules to Know</h3>
                <div className="validity-grid">
                  {validityCards.map((vc, i) => (
                    <div key={i} className="validity-card" style={{ borderTop: `3px solid ${vc.color}` }}>
                      <div style={{ fontSize: 28, marginBottom: 10 }}>{vc.icon}</div>
                      <div style={{ fontFamily: T.poppins, fontSize: 22, fontWeight: 800, color: vc.color, marginBottom: 4 }}>{vc.value}</div>
                      <div style={{ fontFamily: T.poppins, fontSize: 13, color: T.titleblue, fontWeight: 700, marginBottom: 8 }}>{vc.title}</div>
                      <p style={{ fontFamily: T.sans, fontSize: 12.5, textAlign: "justify",color: T.muted, lineHeight: 1.7, margin: 0 }}>{vc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Surveillance checklist */}
              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>🔄 3-Year Cycle — Managed for You</div>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 18 }}>
                  ISO certification doesn't end at the certificate. Common challenges our clients face during the 3-year cycle:
                </p>
                {[
                  "Maintaining records and internal audit schedule between surveillance audits",
                  "Process changes or scope expansions that require documentation updates",
                  "Preparing for surveillance audits after staff turnover or restructuring",
                  "Responding to corrective action requests from the certification body",
                  "Standard version upgrades requiring transition audits (e.g., ISO 9001:2015)",
                  "Managing multi-site or multi-standard certifications on a single renewal calendar",
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
                  Let Us Manage Your Full 3-Year Cycle →
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
              <Image src="/finalimages/faq10.jpg" alt="ISO FAQ" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} />
            </div>
            <div style={{ background: T.white, padding: "28px 24px", borderLeft: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 1.5, background: T.teal }} />
                <span style={{ fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: T.teal, letterSpacing: "0.13em", textTransform: "uppercase" }}>Frequently Asked</span>
              </div>
              <h3 style={{ fontFamily: T.poppins, fontSize: 35, fontWeight: 600, color: T.titleblue, marginBottom: 20 }}>ISO Certification FAQs</h3>
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
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.9rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 14 }}>Get ISO Certified Today</h2>
              <p style={{ fontFamily: T.sans, color: T.paradark, fontSize: 14.5, lineHeight: 1.8 }}>Join thousands of businesses across India that trust us for smooth ISO certification.<br />Free consultation. Clear timeline. Transparent pricing.</p>
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