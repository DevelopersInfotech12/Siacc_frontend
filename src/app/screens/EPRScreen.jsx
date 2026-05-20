"use client";
import { useEffect, useRef, useState } from "react";
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

const eprTypes = [
  { icon: "💻", title: "EPR for E-Waste", tag: "Mandatory", authority: "CPCB", desc: "For producers, importers & brand owners of electrical & electronic equipment under E-Waste Management Rules, 2022." },
  { icon: "🧴", title: "EPR for Plastic Waste", tag: "Mandatory", authority: "CPCB / SPCB", desc: "For producers, importers & brand owners using plastic packaging under Plastic Waste Management Rules." },
  { icon: "🔋", title: "EPR for Battery Waste", tag: "Mandatory", authority: "CPCB", desc: "For manufacturers and importers of batteries — lithium-ion, lead acid, and all battery types under Battery Waste Management Rules, 2022." },
  { icon: "🚗", title: "EPR for Tyre Waste", tag: "Mandatory", authority: "MoEFCC / CPCB", desc: "For tyre manufacturers and importers under the Hazardous & Other Wastes Management Rules." },
  { icon: "🛢️", title: "EPR for Used Oil", tag: "Mandatory", authority: "CPCB", desc: "For producers and importers of lubricating oils and other petroleum-based products under Hazardous Waste Rules." },
  { icon: "📄", title: "CPCB Authorization", tag: "Compliance", authority: "CPCB", desc: "General CPCB authorization and No Objection Certificate for waste-related compliance and storage facilities." },
];

const faqs = [
  { q: "Who needs EPR Registration?", a: "Any producer, importer, or brand owner (PIBOs) dealing in electronics, plastic packaging, batteries, tyres, or used oil in India must register under EPR. Non-compliance can result in heavy CPCB penalties." },
  { q: "What is the penalty for non-compliance?", a: "CPCB can impose penalties, cancel import licenses, and initiate legal proceedings. Penalties can go up to ₹1 lakh per day of non-compliance — making timely registration essential." },
  { q: "What is a PRO and do I need one?", a: "A Producer Responsibility Organization (PRO) helps you fulfill your EPR collection targets. Most businesses need to tie up with a CPCB-empanelled PRO. We connect you with the right partners." },
  { q: "How often do I need to file EPR returns?", a: "Annual returns are mandatory. You must report your collection, recycling and disposal data to CPCB every financial year. We assist with all annual filings and compliance tracking." },
  { q: "How long does EPR registration take?", a: "Typically 3–6 weeks from the time all documents are submitted to CPCB. We actively track and follow up to ensure your registration is issued without delays." },
];

const infoItems = [
  { label: "Governing Body", value: "CPCB / MoEFCC" },
  { label: "Applicable To", value: "Producers, Importers, Brand Owners" },
  { label: "Validity", value: "Annual (Renewable)" },
  { label: "Processing Time", value: "3–6 Weeks" },
  { label: "Penalty for Default", value: "Up to ₹1L / day" },
];

const statsStrip = [
  { value: "Annual", label: "Renewal Cycle", icon: "📅" },
  { value: "3–6", label: "Weeks Timeline", icon: "⚡" },
  { value: "Free", label: "Initial Consultation", icon: "🆓" },
  { value: "0%", label: "Failure Rate", icon: "❌" },
];

const heroChips = [
  { icon: "💻", label: "E-Waste" },
  { icon: "🧴", label: "Plastic Waste" },
  { icon: "🔋", label: "Battery Waste" },
  { icon: "🚗", label: "Tyre Waste" },
  { icon: "✅", label: "0% Failure Rate" },
];

// ── SECTION 1 — BENEFITS ─────────────────────────────────────────────────────

const benefits = [
  {
    icon: "⚖️",
    title: "Legal Obligation — Not Optional",
    desc: "EPR registration is mandatory under the Environment Protection Act, 1986 and its subsidiary rules. Producers, importers, and brand owners (PIBOs) operating without EPR registration are in direct violation of Indian environmental law — regardless of company size or annual turnover.",
  },
  {
    icon: "🚫",
    title: "Avoid CPCB Penalties Up to ₹1 Lakh Per Day",
    desc: "CPCB has significantly intensified enforcement since 2022. Unregistered PIBOs face penalties of up to ₹1 lakh per day of non-compliance, suspension of import licences, and legal proceedings under the Environment Protection Act. Proactive registration is the only protection.",
  },
  {
    icon: "📦",
    title: "Uninterrupted Import & Business Operations",
    desc: "CPCB and customs authorities cross-check EPR registration status for covered product categories. Importers without valid EPR registration face shipment detention at ports, suspension of IEC, and refusal of customs clearance — directly disrupting business operations.",
  },
  {
    icon: "🏛️",
    title: "Government & Large Enterprise Contracts",
    desc: "Central and state government procurement tenders for electronics, batteries, and packaged goods increasingly require valid EPR registration as a mandatory compliance document. Large enterprise buyers in FMCG, electronics, and automotive sectors also request EPR proof from vendors.",
  },
  {
    icon: "🌱",
    title: "ESG & Sustainability Reporting Compliance",
    desc: "EPR compliance is a core component of India's environmental regulatory framework and is increasingly tracked in ESG ratings, sustainability reports, and green supply chain assessments by institutional investors and international buyers.",
  },
  {
    icon: "🤝",
    title: "PRO Tie-Up for Waste Collection Targets",
    desc: "EPR registration comes with mandatory annual collection and recycling targets. We connect you with CPCB-empanelled Producer Responsibility Organizations (PROs) who manage physical waste collection and recycling — so your targets are met without building your own collection infrastructure.",
  },
  {
    icon: "🔄",
    title: "Streamlined Annual Return Filing",
    desc: "Every registered PIBO must file annual EPR returns with CPCB reporting collection volumes, recycling data, and target fulfilment. Our team manages the complete annual filing cycle — data compilation, PRO coordination, portal submission, and compliance tracking.",
  },
  {
    icon: "📊",
    title: "EPR Credit Certificate Management",
    desc: "The CPCB EPR portal operates a credit-based system where recyclers issue EPR certificates to PIBOs against verified recycling. Managing credit balances, expiry, and reconciliation against annual targets is complex — our team handles this end-to-end.",
  },
];

// ── SECTION 2 — DETAILED STEPS ───────────────────────────────────────────────

const detailedSteps = [
  {
    step: "01",
    icon: "🔍",
    title: "Eligibility Check & Category Identification",
    desc: "We review your products, packaging, and import volumes to determine exactly which EPR categories apply to your business — E-Waste, Plastic, Battery, Tyre, or Used Oil. Many businesses are surprised to find they fall under multiple categories. We identify all obligations upfront so there are no compliance gaps.",
    tip: "Tip: PIBOs dealing in branded packaged goods, electronics, or batteries almost always fall under EPR obligations — but the specific rules (collection targets, reporting formats, credit mechanisms) differ significantly by category. Getting category identification right from the start prevents costly re-registration.",
  },
  {
    step: "02",
    icon: "🎯",
    title: "Annual Target Calculation",
    desc: "We calculate your mandatory EPR collection and recycling targets based on your annual sales volumes and the applicable rules for each product category. Targets are expressed as a percentage of your previous year's production or import volume and increase progressively each year.",
    tip: "Tip: Underreporting sales volumes to reduce targets is a common mistake that triggers CPCB audits. Accurate target setting — matched to your actual business data — is the foundation of defensible EPR compliance.",
  },
  {
    step: "03",
    icon: "📋",
    title: "Document Preparation & Verification",
    desc: "We compile the complete EPR application package — company registration, GST certificate, IEC (for importers), product details with HS codes, authorized signatory KYC, and category-specific declarations. Every document is cross-verified for consistency before portal submission.",
    tip: "Tip: Mismatch between the company name in the GST certificate and the CPCB portal registration is the most common cause of application rejection. We verify all document consistency before submission.",
  },
  {
    step: "04",
    icon: "📤",
    title: "CPCB Portal Application Filing",
    desc: "We file the complete EPR registration application on the CPCB EPR portal — selecting the correct product category, entering production/import data, setting collection targets, and uploading all required documents. Government fees are paid online at this stage.",
    tip: "Tip: The CPCB EPR portal has category-specific forms for E-Waste, Plastic, Battery, Tyre, and Used Oil — and the forms are updated regularly. Filing on the wrong form version or in the wrong category requires a fresh application.",
  },
  {
    step: "05",
    icon: "🤝",
    title: "PRO Empanelment & Target Tie-Up",
    desc: "We connect you with CPCB-empanelled Producer Responsibility Organizations (PROs) suited to your product category, geography, and collection volumes. The PRO agreement formalizes your waste collection and recycling arrangement and is required for annual target fulfilment reporting.",
    tip: "Tip: Not all PROs are empanelled for all categories. A PRO empanelled for plastic waste cannot fulfill E-Waste targets. We match you with PROs that are correctly empanelled and operationally active in your target regions.",
  },
  {
    step: "06",
    icon: "🎓",
    title: "Certificate Issuance & Annual Compliance",
    desc: "CPCB reviews and issues your EPR registration certificate. We then manage your complete annual compliance cycle — PRO coordination for target fulfilment, EPR credit reconciliation, annual return filing on the CPCB portal, and proactive renewal before certificate expiry.",
    tip: "Important: EPR registration is valid for one year and must be renewed annually. Lapsed registrations have the same legal consequence as unregistered status — CPCB penalties apply from the date of expiry.",
  },
];

// ── SECTION 3 — DOCUMENTS ────────────────────────────────────────────────────

const eprDocs = [
  { icon: "🏢", title: "Company Registration Certificate", desc: "Certificate of Incorporation (CIN), LLP registration (LLPIN), or equivalent business registration document. The company name must exactly match all other submitted documents." },
  { icon: "🔖", title: "GST Registration Certificate", desc: "Valid GST registration certificate — mandatory for all applicants. The GST-registered business name and address must match the CPCB portal registration details." },
  { icon: "👤", title: "Authorized Signatory KYC", desc: "PAN card, Aadhaar, and photograph of the authorized signatory, along with a board resolution (for companies) or partnership authorization authorizing them to file the EPR application." },
  { icon: "📦", title: "Product Details & Annual Sales Volume", desc: "Category-wise list of products, annual production or import volumes for the previous financial year, and projected volumes for the current year — used to calculate mandatory EPR collection targets." },
  { icon: "🏷️", title: "HS Codes for All Products", desc: "Harmonized System (HS) codes for each product category covered under EPR — particularly important for importers to accurately identify EPR obligations at the product level." },
  { icon: "🚢", title: "Import-Export Code (IEC)", desc: "Valid IEC issued by DGFT — mandatory for all importers filing EPR registration under any category. IEC details must match the customs import records." },
  { icon: "♻️", title: "Existing Waste Management Arrangements", desc: "Details of any existing waste collection, recycling, or disposal arrangements already in place — including existing PRO agreements, recycler contracts, or collection centre tie-ups." },
  { icon: "📜", title: "Board Resolution (for Companies)", desc: "Board resolution authorizing the company to apply for EPR registration and designating the authorized signatory — required for all companies registered under the Companies Act." },
];

// ── SECTION 4 — TIMELINE, COST, VALIDITY ─────────────────────────────────────

const timelineRows = [
  { phase: "Eligibility Check & Category Identification", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "Annual Target Calculation", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "Document Preparation & Verification", duration: "3–5 Days", owner: "Applicant / Consultant" },
  { phase: "CPCB Portal Application Filing", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "CPCB Review & Query Resolution", duration: "2–4 Weeks", owner: "CPCB / MoEFCC" },
  { phase: "Certificate Issuance", duration: "3–5 Days", owner: "CPCB" },
];

const costItems = [
  { label: "CPCB Registration Fee (government)", value: "₹5,000 – ₹20,000+" },
  { label: "PRO Tie-Up / Collection Target Charges", value: "Variable (based on target volume)" },
  { label: "Annual Return Filing Charges", value: "Included in our annual plan" },
  { label: "Consultant / Professional Fees", value: "Variable (contact us for quote)" },
];

const validityCards = [
  {
    icon: "📅",
    title: "Registration Validity",
    value: "1 Year",
    desc: "EPR registrations are valid for one financial year and must be renewed annually. An expired registration carries the same legal consequences as having no registration.",
    color: "#1E88C8",
  },
  {
    icon: "📊",
    title: "Annual Targets",
    value: "Increase Yearly",
    desc: "CPCB mandated collection and recycling targets increase progressively each year. Targets not met in one year are carried forward and must be fulfilled in addition to the next year's targets.",
    color: "#C8780A",
  },
  {
    icon: "♻️",
    title: "EPR Credits",
    value: "1-Year Validity",
    desc: "EPR credit certificates issued by recyclers are valid for one year from issue date. Unused credits cannot be carried forward — unused credits represent a compliance gap.",
    color: "#0E8080",
  },
  {
    icon: "📋",
    title: "Annual Returns",
    value: "Mandatory",
    desc: "Annual EPR returns must be filed with CPCB reporting collection volumes, recycling data, PRO performance, and credit reconciliation against targets for the financial year.",
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

export default function EPRScreen() {
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
        <img src="/images/epr.png" alt="EPR Registration" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right,rgba(7,18,28,0.88) 0%,rgba(7,18,28,0.60) 50%,rgba(7,18,28,0.10) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,4vw,60px)" }}>
          <div ref={heroLeftRef} className="reveal-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", borderRadius: 4, padding: "6px 16px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>Extended Producer Responsibility — CPCB Certified Consultants</span>
            </div>
            <h1 style={{ fontFamily: T.poppins, fontSize: "clamp(2.6rem,5.2vw,4.2rem)", fontWeight: 700, lineHeight: 1.04, marginBottom: 20, letterSpacing: "-0.01em", color: "#fff", maxWidth: 640 }}>
              EPR Registration{" "}<span style={{ color: T.orange }}>under CPCB</span>{" "}Norms
            </h1>
            <p style={{ fontFamily: T.poppins, fontSize: 16, color: "rgba(255,255,255,0.82)", maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>
              Mandatory for producers, importers and brand owners of electronics, plastic packaging, batteries, tyres and oils — handled end-to-end by our EPR compliance specialists.
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
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Extended Producer Responsibility</span></div>
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 16 }}>
                Complete EPR Compliance,<br />Handled for You
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, color: T.tealMid, marginBottom: 16, letterSpacing: "0.05em", textTransform: "uppercase" }}>Registration · PRO Tie-Up · Annual Returns · Credit Management</p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 16, textAlign: "justify" }}>
                Mandatory for producers, importers and brand owners of electronics, plastic packaging, batteries, tyres and oils. We handle your complete EPR compliance — from registration to annual returns.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 32, textAlign: "justify" }}>
                Our EPR specialists prepare and file your CPCB registration, connect you with empanelled PROs for waste collection targets, and manage all annual return filings and credit reconciliation — so you stay compliant without the operational burden.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
                <button onClick={() => router.push("/contact")} style={{ padding: "13px 32px", fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, letterSpacing: "0.02em", border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", boxShadow: "0 4px 16px rgba(10,104,104,0.22)", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={e => { e.currentTarget.style.background = T.orange; e.currentTarget.style.transform = "translateY(0)"; }}>Get Free Consultation</button>
                <button onClick={() => router.push("/contact")} style={{ padding: "12px 28px", fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, borderRadius: 6, cursor: "pointer", border: `1.5px solid ${T.border}`, color: T.slate, background: "transparent", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = T.teal; e.currentTarget.style.color = T.teal; }} onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.slate; }}>Check EPR Applicability →</button>
              </div>
              <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", height: 220 }}>
                <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80&fit=crop" alt="EPR compliance" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 40%" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(14,128,128,0.78) 0%,rgba(30,136,200,0.45) 60%,rgba(235,245,251,0.15) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 28px" }}>
                  <div>
                    <div style={{ fontFamily: T.poppins, fontSize: "clamp(1rem,2vw,1.3rem)", color: "#fff", fontWeight: 700, marginBottom: 4 }}>Avoid CPCB Penalties Up to ₹1L / Day</div>
                    <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.80)", fontSize: 12.5 }}>E-Waste · Plastic · Battery · Tyres · Used Oil</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right" ref={infoCardRef}>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "sticky", top: 100 }}>
                <div className="sl-row"><div className="sl-line" /><span className="sl-text">Quick Info — EPR</span></div>
                {infoItems.map((item, i) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < infoItems.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <span style={{ fontFamily: T.sans, fontSize: 13, color: T.muted }}>{item.label}</span>
                    <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.slate, fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                  </div>
                ))}
                <button onClick={() => router.push("/contact")} style={{ width: "100%", marginTop: 22, padding: 13, background: T.orange, color: "#fff", fontWeight: 600, borderRadius: 6, border: "none", fontFamily: T.poppins, fontSize: 14, cursor: "pointer", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = T.teal} onMouseLeave={e => e.currentTarget.style.background = T.orange}>Start EPR Registration →</button>
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
            <div style={{ display: "flex", justifyContent: "center" }}><div className="sl-row"><div className="sl-line" /><span className="sl-text">EPR Categories</span></div></div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>Which EPR Registration Do You Need?</h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 480, margin: "0 auto", lineHeight: 1.75, fontSize: 16 }}>Different waste categories require different EPR registrations. Here's what applies to your product.</p>
          </div>
          <div className="types-grid" ref={typesRef}>
            {eprTypes.map((t, i) => (
              <div key={t.title} className={`type-card reveal d${i % 6}`}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 52, height: 52, background: T.tealLight, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{t.icon}</div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <span style={{ fontFamily: T.sans, fontSize: 10, fontWeight: 700, background: i % 2 === 0 ? T.tealLight : T.amberLight, color: i % 2 === 0 ? T.tealMid : T.amberDark, padding: "3px 10px", borderRadius: 3, letterSpacing: "0.06em" }}>{t.tag}</span>
                    <span style={{ fontFamily: T.sans, fontSize: 10, color: T.subtle, fontWeight: 600 }}>{t.authority}</span>
                  </div>
                </div>
                <h3 style={{ fontFamily: T.poppins, fontSize: 17, color: T.titleblue, marginBottom: 10, fontWeight: 600 }}>{t.title}</h3>
                <p style={{ fontSize: 15, color: T.para, margin: 0, fontWeight: 500, textAlign: "justify" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — IMPORTANCE & BENEFITS OF EPR REGISTRATION
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={benefitsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Why It Matters</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Importance & Benefits of EPR Registration
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 580, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              EPR registration is a legal mandate under Indian environmental law — not a voluntary compliance exercise. The consequences of non-compliance extend far beyond fines, directly impacting import licences, business operations, and market access.
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

          {/* Penalty callout */}
          <div style={{ marginTop: 40, background: `linear-gradient(135deg,${T.teal} 0%,${T.tealMid} 100%)`, borderRadius: 12, padding: "28px 36px" }}>
            <div className="callout-row">
              <div style={{ fontSize: 36, flexShrink: 0 }}>⚠️</div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>CPCB Enforcement Has Intensified — Penalties Are Real</div>
                <p style={{ fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: 0 }}>
                  Since 2022, CPCB has significantly scaled up EPR enforcement — issuing show-cause notices, suspending import licences, and imposing financial penalties on unregistered PIBOs across e-waste, plastic, and battery categories. Penalties of ₹1 lakh per day accumulate rapidly. Several large importers have had consignments held at customs due to EPR non-compliance. Registration is the only legal protection — and the process takes 3–6 weeks, so starting now is critical.
                </p>
              </div>
              <button onClick={() => router.push("/contact")} style={{ padding: "12px 28px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
                onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                Get Compliant Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — STEP-BY-STEP EPR REGISTRATION PROCESS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={dstepsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">How It Works</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Step-by-Step EPR Registration Process
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              A clear, expert-guided roadmap from eligibility check to CPCB certificate — and ongoing annual compliance management thereafter.
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
                    <p style={{ fontFamily: T.sans, textAlign: "justify", fontSize: 14.5, color: T.paradark, lineHeight: 1.8, marginBottom: 10 }}>{s.desc}</p>
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
                <div className="sl-row" style={{ marginBottom: 12 }}><div className="sl-line" /><span className="sl-text">CPCB EPR Portal</span></div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🖥️</div>
                <h4 style={{ fontFamily: T.poppins, fontSize: 16, color: T.titleblue, fontWeight: 700, marginBottom: 10 }}>Official CPCB Portal for EPR Applications</h4>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.paradark, lineHeight: 1.8 }}>
                  All EPR registrations are filed on the CPCB EPR portal. The portal has separate modules for E-Waste, Plastic, Battery, Tyre, and Used Oil — each with different forms, data requirements, and target calculation formats. Portal navigation errors and wrong category selection are the most common causes of application delays and rejections. Our team manages the complete portal process.
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
                  "Multi-category EPR expertise — all 5 waste streams",
                  "CPCB-empanelled PRO network across India",
                  "0% application rejection rate",
                  "Annual return filing included",
                  "EPR credit reconciliation management",
                  "CPCB query resolution within 24 hours",
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
          SECTION 3 — DOCUMENTS REQUIRED FOR EPR REGISTRATION
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
              Documents Required for EPR Registration
            </h2>
            <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.72)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              Accurate and complete documentation is the most critical factor in getting a smooth CPCB EPR registration. Here is everything you need to prepare before we file.
            </p>
          </div>

          <div className="crs-docs-grid" ref={crsDocsRef}>
            {eprDocs.map((doc, i) => (
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
                <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Pro Tip: GST name mismatch is the #1 cause of CPCB portal rejections</div>
                <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.70)", margin: 0, lineHeight: 1.7 }}>The company name and address in the GST certificate must exactly match what is entered in the CPCB EPR portal. Even minor differences — abbreviations, punctuation, or address format variations — trigger automatic rejections that require re-submission. Our team verifies all document consistency before portal entry, eliminating this common and avoidable delay.</p>
              </div>
              <button onClick={() => router.push("/contact")} style={{ padding: "11px 26px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
                onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                Get Free Checklist →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — TIMELINES, COSTS, VALIDITY & ANNUAL COMPLIANCE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={tlcvTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Plan Your Registration</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Timelines, Costs, Validity & Annual Compliance
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              Plan your EPR compliance calendar with a clear picture of the registration process, ongoing obligations, and annual renewal requirements.
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
                  <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.tealMid, fontWeight: 600 }}>Total estimated time: <strong>3–6 weeks</strong> (when documents are in order and CPCB review is undelayed)</span>
                </div>
              </div>

              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "20px 20px 0", borderBottom: `2px solid ${T.border}` }}>
                  <div className="sl-row" style={{ marginBottom: 10 }}><div className="sl-line" /><span className="sl-text">Cost Breakdown</span></div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 14 }}>EPR Registration Fees</h3>
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
                    Government registration fees are prescribed by CPCB and vary by category and scale. PRO charges depend on your collection targets and the geographies covered. Contact us for a transparent all-in quote for your specific product categories and volumes.
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — Validity + Annual Compliance */}
            <div>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, padding: "28px 24px", marginBottom: 24 }}>
                <div className="sl-row" style={{ marginBottom: 12 }}><div className="sl-line" /><span className="sl-text">Validity & Annual Obligations</span></div>
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

              {/* Annual compliance checklist */}
              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>🔄 Annual Compliance — Managed for You</div>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 18 }}>
                  EPR compliance is an ongoing annual obligation, not a one-time registration. Common challenges our clients face each year:
                </p>
                {[
                  "Tracking EPR registration expiry across multiple product categories",
                  "Coordinating with PROs to ensure collection targets are met before return deadline",
                  "EPR credit certificate collection and reconciliation against annual targets",
                  "Annual return data compilation — production volumes, collection data, recycling proofs",
                  "CPCB portal submission of annual returns before the financial year deadline",
                  "Managing shortfall targets carried forward from the previous year",
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
                  Let Us Manage Your Annual Compliance →
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
              <img src="/finalimages/faq10.jpg" alt="EPR FAQ" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }} />
            </div>
            <div style={{ background: T.white, padding: "28px 24px", borderLeft: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 1.5, background: T.teal }} />
                <span style={{ fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: T.teal, letterSpacing: "0.13em", textTransform: "uppercase" }}>Frequently Asked</span>
              </div>
              <h3 style={{ fontFamily: T.poppins, fontSize: 35, fontWeight: 600, color: T.titleblue, marginBottom: 20 }}>EPR Registration FAQs</h3>
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
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.9rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 14 }}>Stay Compliant with EPR Norms</h2>
              <p style={{ fontFamily: T.sans, color: T.paradark, fontSize: 14.5, lineHeight: 1.8 }}>Get your EPR registration done before facing CPCB penalties. Talk to our experts for free.<br />Clear timeline. Transparent pricing.</p>
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