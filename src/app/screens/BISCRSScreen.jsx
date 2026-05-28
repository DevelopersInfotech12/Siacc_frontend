"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import Navbar from "../Components/Navbar";
const Footer = dynamic(() => import("../Components/Footer"));
import "../animations.css";
import BISCRSProductList from "../Components/BISCRSProductList";
import BISCRSProductModal from "../Components/BISCRSProductModal";

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

const crsProducts = [
  { icon: "📱", title: "Mobile Phones & Tablets", tag: "Mandatory", desc: "All mobile phones, smartphones, and tablets sold in India require BIS CRS registration before import or sale." },
  { icon: "💻", title: "Laptops & Notebooks", tag: "Mandatory", desc: "Laptops, notebooks, and portable computers require CRS registration under the Electronics & IT goods category." },
  { icon: "💡", title: "LED Lights & Luminaires", tag: "Mandatory", desc: "LED lamps, LED light engines and LED luminaires must be CRS registered before they enter the Indian market." },
  { icon: "🔌", title: "Chargers & Power Adapters", tag: "Mandatory", desc: "Mobile chargers, laptop adapters and USB power adapters all require mandatory CRS registration." },
  { icon: "🔋", title: "Power Banks", tag: "Mandatory", desc: "Portable rechargeable battery packs (power banks) are covered under the mandatory CRS scheme." },
  { icon: "📺", title: "Set-Top Boxes & Smart TVs", tag: "Mandatory", desc: "Set-top boxes, smart televisions and display panels fall under the mandatory CRS electronics category." },
];

const documents = [
  "Product Test Report from BIS-recognized lab",
  "Importer / Manufacturer company registration documents",
  "Import-Export Code (IEC certificate)",
  "Authorized Indian Representative (AIR) details",
  "Product technical specification sheet",
  "Applicant's KYC and authorized signatory details",
  "Product photographs (from all angles)",
  "Brand authorization letter (if applicable)",
];

const steps = [
  { step: "01", title: "Product Identification", desc: "We confirm if your product falls under the mandatory CRS list and identify the applicable IS standard.", icon: "🔍" },
  { step: "02", title: "Lab Testing", desc: "Product samples are tested at a BIS-recognized lab. We coordinate with labs to minimize turnaround time.", icon: "🧪" },
  { step: "03", title: "BIS Portal Application", desc: "We prepare and file the complete CRS application on the BIS portal with test reports and all required documents.", icon: "📤" },
  { step: "04", title: "BIS Review", desc: "BIS reviews the application and test reports. We track the status and respond to any queries from BIS.", icon: "🔎" },
  { step: "05", title: "Registration Certificate", desc: "BIS grants the CRS Registration Certificate. The R-number can be used on product packaging immediately.", icon: "🎓" },
  { step: "06", title: "Renewal & Compliance", desc: "CRS registrations are valid for 2 years. We assist with timely renewals and ongoing compliance.", icon: "🛡️" },
];

const faqs = [
  { q: "Which products require BIS CRS registration?", a: "70+ products including mobile phones, laptops, tablets, LED lights, power banks, chargers, set-top boxes, smart watches, and more require mandatory CRS registration under the Electronics & IT Goods Order." },
  { q: "How long does BIS CRS registration take?", a: "Typically 4–8 weeks if all documents are in order and lab test reports are available. We help expedite the process with our lab network." },
  { q: "Can a foreign company apply for BIS CRS directly?", a: "Yes. Foreign manufacturers can apply through an Authorized Indian Representative (AIR). Our team can act as your AIR or guide you through the appointment process." },
  { q: "What is the validity of a BIS CRS registration?", a: "BIS CRS registrations are valid for 2 years and must be renewed before expiry to continue selling in India legally." },
  { q: "What happens if I sell products without CRS registration?", a: "Products sold without mandatory BIS CRS registration can be seized at customs or in the market. The company faces heavy penalties under the BIS Act, 2016 and the product import may be banned." },
];

const infoItems = [
  { label: "Products Covered", value: "70+ Electronics Categories" },
  { label: "Governing Body", value: "Bureau of Indian Standards" },
  { label: "Validity", value: "2 Years (Renewable)" },
  { label: "Typical Timeline", value: "4–8 Weeks" },
  { label: "Our Failure Rate", value: "0%" },
];

const statsStrip = [
  { value: "70+", label: "Product Categories", icon: "📋" },
  { value: "4–8", label: "Weeks Timeline", icon: "⚡" },
  { value: "Free", label: "Initial Consultation", icon: "🆓" },
  { value: "0%", label: "Failure Rate", icon: "❌" },
];

const heroChips = [
  { icon: "📱", label: "Mobiles & Tablets" },
  { icon: "💻", label: "Laptops" },
  { icon: "💡", label: "LED Lights" },
  { icon: "🔌", label: "Chargers" },
  { icon: "✅", label: "0% Failure Rate" },
];

const benefits = [
  {
    icon: "⚖️",
    title: "Legal Right to Import & Sell",
    desc: "Only CRS-registered products can be legally imported, marketed, or sold in India. The R-number on packaging proves compliance to customs and market regulators.",
  },
  {
    icon: "🚀",
    title: "No Factory Inspection Required",
    desc: "Unlike ISI Mark, BIS CRS does not mandate a factory inspection, which significantly reduces the approval timeline and makes the process faster for both Indian and foreign brands.",
  },
  {
    icon: "🏆",
    title: "Brand Credibility & Consumer Trust",
    desc: "A BIS CRS-registered product signals reliability and quality to Indian consumers, especially in the highly competitive electronics and IT market.",
  },
  {
    icon: "🌏",
    title: "Gateway to India's Growing Market",
    desc: "For foreign manufacturers, BIS CRS registration is the essential key to legally entering India's rapidly expanding electronics sector — one of the largest and fastest-growing globally.",
  },
  {
    icon: "🛡️",
    title: "Protection Against Penalties",
    desc: "Without valid CRS registration, products can be seized at customs, business operations halted, and heavy fines imposed under the BIS Act, 2016. Registration eliminates this risk.",
  },
  {
    icon: "♻️",
    title: "E-Waste & RoHS Alignment",
    desc: "BIS CRS-certified products are aligned with India's E-Waste (Management) Rules 2022 and RoHS regulations, ensuring your products stay compliant with all current environmental mandates.",
  },
  {
    icon: "🔍",
    title: "QR Code Traceability (2025+)",
    desc: "As of 2025, BIS has proposed QR code-based labeling for CRS-certified products, enabling consumer verification of registration numbers and enhancing market transparency.",
  },
  {
    icon: "📦",
    title: "Covers Multiple Models",
    desc: "Similar models with minor differences (e.g., color or branding) can be covered under a single CRS certificate as series models, reducing registration costs for product families.",
  },
];

const detailedSteps = [
  {
    step: "01",
    icon: "🔍",
    title: "Product Classification",
    desc: "Identify if your product is covered under the CRS notified list (Electronics & IT Goods Order by MeitY). Determine the applicable Indian Standard (IS) number for testing.",
    tip: "Tip: Each brand name, product category, and manufacturing location requires a separate registration.",
  },
  {
    step: "02",
    icon: "🧪",
    title: "Sample Testing at BIS Lab",
    desc: "Send product samples to a BIS-recognized laboratory in India. Testing confirms the product meets the applicable IS standard. Manufacturers do not need to own a lab.",
    tip: "Tip: Ensure samples are production-representative — pre-production prototypes may not qualify.",
  },
  {
    step: "03",
    icon: "📋",
    title: "Document Preparation",
    desc: "Compile all required documents: company registration, IEC code, AIR details (for foreign brands), test reports, product specifications, KYC, and authorization letters.",
    tip: "Tip: Document errors are the #1 reason for delays. Double-check every detail before submission.",
  },
  {
    step: "04",
    icon: "📤",
    title: "Application on BIS Portal",
    desc: "Submit the complete CRS application with test reports and documents on the official BIS online portal. Pay the applicable government registration fees.",
    tip: "Tip: Portal navigation can be complex — incorrect form selection is a common mistake for first-time applicants.",
  },
  {
    step: "05",
    icon: "🔎",
    title: "BIS Review & Query Resolution",
    desc: "BIS scrutinizes the application and test reports. If clarifications are needed, BIS raises queries. Prompt and accurate responses are critical to maintaining the approval timeline.",
    tip: "Tip: Delays in responding to BIS queries are the most common cause of extended timelines.",
  },
  {
    step: "06",
    icon: "🎓",
    title: "Certificate Issuance",
    desc: "Upon approval, BIS issues the CRS Registration Certificate with a unique R-number. This number must be marked on the product and packaging before import or sale.",
    tip: "Important: Pre-marking products before certificate issuance is prohibited and punishable under the BIS Act.",
  },
];

const crsDocs = [
  { icon: "📄", title: "Test Report", desc: "Valid test report from a BIS-recognized laboratory confirming compliance with the applicable IS standard." },
  { icon: "🏢", title: "Company Registration", desc: "Importer or manufacturer's certificate of incorporation, partnership deed, or proprietorship proof." },
  { icon: "🚢", title: "Import-Export Code (IEC)", desc: "IEC certificate issued by DGFT — mandatory for all importers applying for CRS registration." },
  { icon: "👤", title: "AIR Details (Foreign Brands)", desc: "Authorized Indian Representative (AIR) appointment letter and KYC documents. Required for all foreign manufacturers." },
  { icon: "📐", title: "Product Specification Sheet", desc: "Detailed technical datasheet describing product specifications, model numbers, and electrical parameters." },
  { icon: "🪪", title: "KYC & Signatory Details", desc: "Applicant's PAN, Aadhaar, and details of the authorized signatory for the company." },
  { icon: "📸", title: "Product Photographs", desc: "Clear photographs of the product from all angles including the label, markings, and packaging." },
  { icon: "🔖", title: "Brand Authorization Letter", desc: "If the applicant is not the original brand owner, a brand authorization letter from the brand holder is required." },
];

const timelineRows = [
  { phase: "Product & Standard Identification", duration: "1–3 Days", owner: "Applicant / Consultant" },
  { phase: "Lab Testing & Report Generation", duration: "2–4 Weeks", owner: "BIS-Recognized Lab" },
  { phase: "Document Preparation & Review", duration: "3–5 Days", owner: "Applicant / Consultant" },
  { phase: "BIS Portal Application Submission", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "BIS Review & Query Resolution", duration: "1–2 Weeks", owner: "BIS Authority" },
  { phase: "Certificate Issuance", duration: "2–5 Days", owner: "Bureau of Indian Standards" },
];

const costItems = [
  { label: "Application Fee (per product per location)", value: "₹1,000 – ₹5,000" },
  { label: "Lab Testing Charges", value: "₹15,000 – ₹80,000+" },
  { label: "Renewal Fee (every 2 years)", value: "₹1,000 – ₹5,000" },
  { label: "Consultant / Professional Fees", value: "Variable (contact us for quote)" },
];

const validityCards = [
  {
    icon: "📅",
    title: "Certificate Validity",
    value: "2 Years",
    desc: "CRS Registration Certificates are valid for 2 years from the date of issuance by BIS.",
    color: T.teal,
  },
  {
    icon: "🔄",
    title: "Renewal Window",
    value: "Before Expiry",
    desc: "Renewal must be initiated before the certificate expires to avoid a lapse in authorization. Expired certificates require fresh application.",
    color: T.amber,
  },
  {
    icon: "📋",
    title: "Renewal Condition",
    value: "No Design Change",
    desc: "Renewal is straightforward if there is no change in product design, construction, manufacturing site, or applicable IS standard.",
    color: T.tealMid,
  },
  {
    icon: "⚠️",
    title: "Separate Certificate Needed",
    value: "Per Location",
    desc: "Each manufacturing location must hold its own CRS certificate, even for the same product and brand.",
    color: "#C84E1E",
  },
];

// ── CSS ─────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  img{max-width:100%;display:block;} a{text-decoration:none;color:inherit;}
  .sl-row{display:flex;align-items:center;gap:12px;margin-bottom:16px;}
  .sl-line{width:28px;height:1.5px;background:#1E88C8;flex-shrink:0;}
  .sl-text{font-family:'Outfit','system-ui',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#1E88C8;}
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.6;transform:scale(1.3);} }
  .hero-chip{ display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.09);border:1px solid rgba(255,255,255,0.16);backdrop-filter:blur(6px);border-radius:6px;padding:9px 16px;font-family:'Outfit','system-ui',sans-serif;font-size:12.5px;font-weight:500;color:rgba(255,255,255,0.90);transition:background 0.2s,border-color 0.2s,transform 0.2s;}
  .hero-chip:hover{background:rgba(255,255,255,0.18);border-color:rgba(255,255,255,0.35);transform:translateY(-2px);}
  .overview-grid{display:grid;grid-template-columns:1fr 360px;gap:48px;align-items:flex-start;}
  @media(max-width:960px){.overview-grid{grid-template-columns:1fr;}}
  .stats-strip{display:grid;grid-template-columns:repeat(4,1fr);}
  @media(max-width:640px){.stats-strip{grid-template-columns:repeat(2,1fr);}}
  .types-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;}
  @media(max-width:640px){.types-grid{grid-template-columns:1fr;}}
  .type-card{background:#fff;border-radius:10px;padding:28px;border:1px solid #E8E3DA;transition:all 0.25s;}
  .type-card:hover{border-color:#1E88C8;transform:translateY(-3px);box-shadow:0 12px 32px rgba(30,136,200,0.09);}
  .steps-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;}
  @media(max-width:600px){.steps-grid{grid-template-columns:1fr;}}
  .step-card{background:#fff;border-radius:10px;padding:24px;border:1px solid #E8E3DA;display:flex;gap:16px;align-items:flex-start;transition:all 0.2s;}
  .step-card:hover{border-color:#1E88C8;box-shadow:0 8px 24px rgba(30,136,200,0.08);}
  .docs-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
  @media(max-width:640px){.docs-grid{grid-template-columns:1fr;}}
  .cta-split{display:grid;grid-template-columns:1fr auto;gap:40px;align-items:center;}
  @media(max-width:720px){.cta-split{grid-template-columns:1fr;gap:28px;}}
  .sec{padding:clamp(64px,8vw,104px) clamp(16px,5vw,56px);}
  .inner{max-width:1280px;margin:0 auto;}
  .faq-grid{}
  @media(max-width:760px){.faq-grid{grid-template-columns:1fr!important;}}

  /* ── BENEFITS ── */
  .benefits-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px;}
  @media(max-width:640px){.benefits-grid{grid-template-columns:1fr;}}
  .benefit-card{background:#fff;border-radius:12px;padding:26px 24px;border:1px solid #E8E3DA;transition:all 0.25s;position:relative;overflow:hidden;}
  .benefit-card::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:#1E88C8;opacity:0;transition:opacity 0.25s;}
  .benefit-card:hover{border-color:#1E88C8;transform:translateY(-3px);box-shadow:0 14px 36px rgba(30,136,200,0.09);}
  .benefit-card:hover::before{opacity:1;}

  /* ── STEP-BY-STEP — FIXED ── */
  .dsteps-outer{display:grid;grid-template-columns:1fr 380px;gap:48px;align-items:flex-start;}
  @media(max-width:860px){.dsteps-outer{grid-template-columns:1fr;gap:32px;}}
  .dsteps-sticky{position:sticky;top:100px;}
  @media(max-width:860px){.dsteps-sticky{position:static;}}

  .detailed-steps-list{display:flex;flex-direction:column;gap:0;}
  .dstep-row{display:grid;grid-template-columns:60px 1fr;gap:0;position:relative;}
  .dstep-row:not(:last-child) .dstep-line{position:absolute;left:29px;top:60px;bottom:-1px;width:2px;background:linear-gradient(to bottom,#1E88C8,rgba(30,136,200,0.15));z-index:0;}
  .dstep-left{display:flex;flex-direction:column;align-items:center;padding-top:6px;position:relative;z-index:1;}
  .dstep-num{width:42px;height:42px;border-radius:50%;background:#1E88C8;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Poppins','system-ui',sans-serif;font-size:13px;font-weight:700;flex-shrink:0;}
  .dstep-body{padding:4px 0 36px 20px;}
  @media(max-width:480px){.dstep-body{padding-bottom:24px;} .dstep-row{grid-template-columns:50px 1fr;}}

  /* ── DOCS ── */
  .crs-docs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:14px;}
  @media(max-width:640px){.crs-docs-grid{grid-template-columns:1fr;}}
  .doc-card{background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.13);border-radius:10px;padding:20px;display:flex;gap:14px;align-items:flex-start;backdrop-filter:blur(4px);transition:background 0.2s,border-color 0.2s;}
  .doc-card:hover{background:rgba(255,255,255,0.14);border-color:rgba(255,255,255,0.28);}

  /* ── TIMELINE/COST/VALIDITY — FIXED ── */
  .tlcv-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:flex-start;}
  @media(max-width:860px){.tlcv-grid{grid-template-columns:1fr;}}

  .timeline-table{width:100%;border-collapse:collapse;}
  .timeline-table th{font-family:'Poppins','system-ui',sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#1E88C8;padding:10px 16px;border-bottom:2px solid #E8E3DA;text-align:left;}
  .timeline-table td{font-family:'Outfit','system-ui',sans-serif;font-size:14px;color:#2D3748;padding:14px 16px;border-bottom:1px solid #F0ECE5;vertical-align:top;}
  .timeline-table tr:last-child td{border-bottom:none;}
  .timeline-table tr:hover td{background:rgba(30,136,200,0.03);}
  .timeline-table td:nth-child(2){font-family:'Poppins','system-ui',sans-serif;font-weight:600;color:#1E88C8;white-space:nowrap;}
  @media(max-width:500px){
    .timeline-table th,.timeline-table td{padding:9px 10px;font-size:12px;}
    .timeline-table td:nth-child(3){display:none;}
    .timeline-table th:nth-child(3){display:none;}
  }

  .cost-row{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid #F0ECE5;transition:background 0.15s;gap:12px;}
  .cost-row:last-child{border-bottom:none;}
  .cost-row:hover{background:rgba(30,136,200,0.03);}
  @media(max-width:500px){
    .cost-row{flex-direction:column;align-items:flex-start;gap:4px;padding:12px 14px;}
  }

  /* ── VALIDITY CARDS — FIXED: always 1-col on mobile ── */
  .validity-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px;}
  @media(max-width:600px){.validity-grid{grid-template-columns:1fr;}}

  .validity-card{border-radius:12px;padding:24px 20px;border:1px solid #E8E3DA;background:#fff;transition:all 0.22s;text-align:center;}
  .validity-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,0.07);}
`;

export default function BISCRSScreen() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const heroLeftRef  = useReveal();
  const overviewRef  = useReveal();
  const infoCardRef  = useReveal();
  const statsRef     = useReveal({ stagger: true, baseDelay: 100 });
  const typesTtlRef  = useReveal();
  const typesRef     = useReveal({ stagger: true, baseDelay: 80 });

  const benefitsTtlRef  = useReveal();
  const benefitsRef     = useReveal({ stagger: true, baseDelay: 75 });
  const dstepsTtlRef    = useReveal();
  const dstepsRef       = useReveal();
  const crsDocsTtlRef   = useReveal();
  const crsDocsRef      = useReveal({ stagger: true, baseDelay: 70 });
  const tlcvTtlRef      = useReveal();
  const tlcvRef         = useReveal();

  const procTtlRef   = useReveal();
  const bannerRef    = useReveal({ threshold: 0.1 });
  const stepsRef     = useReveal({ stagger: true, baseDelay: 80 });
  const docsTtlRef   = useReveal();
  const docsRef      = useReveal({ stagger: true, baseDelay: 70 });
  const faqRef       = useReveal({ stagger: true, baseDelay: 80 });
  const ctaRef       = useReveal();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: T.white, fontFamily: T.sans, color: T.body }}>
      <style>{css}</style>
      <Navbar />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${T.border}`, minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom,${T.orange},${T.teal})`, zIndex: 3 }} />
        <Image src="/finalimages/siaccbis.png" alt="BIS CRS Registration" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right,rgba(7,18,28,0.88) 0%,rgba(7,18,28,0.60) 50%,rgba(7,18,28,0.10) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,4vw,60px)" }}>
          <div ref={heroLeftRef} className="reveal-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", borderRadius: 4, padding: "6px 16px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Bureau of Indian Standards — CRS Registration
              </span>
            </div>
            <h1 style={{ fontFamily: T.poppins, fontSize: 56, fontWeight: 700, lineHeight: 1.04, marginBottom: 20, letterSpacing: "-0.01em", color: "#fff", maxWidth: 640 }}>
              BIS CRS Registration for{" "}
              <span style={{ color: T.orange }}>Electronics</span>
            </h1>
            <p style={{ fontFamily: T.poppins, fontSize: 16, color: "rgba(255,255,255,0.82)", maxWidth: 520, lineHeight: 1.7, marginBottom: 28 }}>
              Compulsory Registration Scheme for 70+ electronic & IT products. Mandatory before import or sale in India.
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
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Compulsory Registration Scheme</span></div>
              <h2 style={{ fontFamily: T.poppins, fontSize: 40, color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 16 }}>
                BIS CRS Registration, <br /> Done End-to-End
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 16, textAlign: "justify" }}>
                The BIS Compulsory Registration Scheme (CRS) mandates that 70+ electronic and IT products must be registered with BIS before they can be imported or sold in India. Products without a valid R-number can be seized and the importer penalized under the BIS Act, 2016.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 32, textAlign: "justify" }}>
                Our BIS specialists coordinate with BIS-recognized labs, prepare your complete application, and follow up until your CRS Registration Certificate and R-number are in hand — typically in 4–8 weeks.
              </p>
              <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", marginBottom: 32, height: 220 }}>
                <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80&fit=crop" alt="Electronics testing" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} unoptimized />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(14,128,128,0.78) 0%,rgba(30,136,200,0.45) 60%,rgba(235,245,251,0.15) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 28px" }}>
                  <div>
                    <div style={{ fontFamily: T.poppins, fontSize: "clamp(1rem,2vw,1.3rem)", color: "#fff", fontWeight: 700, marginBottom: 4 }}>Trusted by 1,000+ Importers & Brands</div>
                    <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.80)", fontSize: 12.5 }}>Mobiles · Laptops · LED · Chargers · Power Banks · STBs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right" ref={infoCardRef}>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "sticky", top: 100 }}>
                <div className="sl-row"><div className="sl-line" /><span className="sl-text">Quick Info — CRS</span></div>
                {infoItems.map((item, i) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < infoItems.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <span style={{ fontFamily: T.sans, fontSize: 13, color: T.muted }}>{item.label}</span>
                    <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.slate, fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                  </div>
                ))}
                <button onClick={() => window.location.href = "/contact"} style={{ width: "100%", marginTop: 22, padding: 13, background: T.orange, color: "#fff", fontWeight: 600, borderRadius: 6, border: "none", fontFamily: T.poppins, fontSize: 14, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.teal}
                  onMouseLeave={e => e.currentTarget.style.background = T.orange}>Start CRS Application →</button>
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

      {/* ══ PRODUCTS UNDER BIS REGISTRATION SCHEME ══ */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={typesTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Complete CRS Product List</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Products Under BIS Registration Scheme
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              79+ product categories require mandatory BIS CRS registration. <strong>Click any product</strong> to view detailed registration requirements, documents, and process.
            </p>
          </div>
          <BISCRSProductList onProductClick={setSelectedProduct} />
        </div>
      </section>

      {/* ══ PRODUCT DETAIL MODAL ══ */}
      {selectedProduct && (
        <BISCRSProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* ══ BENEFITS ══ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={benefitsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Why It Matters</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Importance & Benefits of BIS CRS Certification
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 580, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              BIS CRS is not just a regulatory hurdle — it is a strategic asset that unlocks India's electronics market, builds brand trust, and shields your business from penalties.
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
                <p style={{ fontFamily: T.sans, fontSize: 14,textAlign: "justify", color: T.paradark, lineHeight: 1.8, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 40, background: `linear-gradient(135deg,${T.teal} 0%,${T.tealMid} 100%)`, borderRadius: 12, padding: "28px 36px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ fontSize: 36, flexShrink: 0 }}>⚠️</div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Selling Without CRS Registration is Illegal</div>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: 0 }}>
                Products sold or imported without valid BIS CRS registration can be seized at Indian customs ports, recalled from the market, and the business faces heavy fines under the BIS Act, 2016. The import can be banned permanently for repeat violations.
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

      {/* ══ STEP-BY-STEP — FIXED ══ */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={dstepsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">How It Works</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Step-by-Step BIS CRS Registration Process
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              A clear, expert-guided roadmap from product classification to certificate in hand — typically completed in 4–8 weeks.
            </p>
          </div>

          {/* ↓ was inline style grid — now uses CSS class for responsive collapse */}
          <div className="dsteps-outer reveal" ref={dstepsRef}>
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

            {/* Side info card — ↓ was inline position:sticky, now CSS class */}
            <div className="dsteps-sticky">
              <div style={{ background: T.cream, border: `1px solid ${T.border}`, borderRadius: 12, padding: 28, marginBottom: 20 }}>
                <div className="sl-row" style={{ marginBottom: 12 }}><div className="sl-line" /><span className="sl-text">Foreign Manufacturers</span></div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🌏</div>
                <h4 style={{ fontFamily: T.poppins, fontSize: 16, color: T.titleblue, fontWeight: 700, marginBottom: 10 }}>Authorized Indian Representative (AIR)</h4>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.paradark, lineHeight: 1.8 }}>
                  Foreign manufacturers must appoint an AIR based in India to apply for CRS on their behalf. Our team can act as your AIR or assist with the appointment process — keeping your registration fully compliant.
                </p>
                <button onClick={() => window.location.href = "/contact"} style={{ marginTop: 16, width: "100%", padding: "11px 20px", background: T.teal, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.orange}
                  onMouseLeave={e => e.currentTarget.style.background = T.teal}>
                  Enquire About AIR Services →
                </button>
              </div>

              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Why Choose Us?</div>
                {[
                  "End-to-end lab coordination",
                  "0% application failure rate",
                  "Real-time BIS portal tracking",
                  "Query resolution within 24 hrs",
                  "Renewal reminders & support",
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

      {/* ══ DOCUMENTS ══ */}
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
              Documents Required for BIS CRS Registration
            </h2>
            <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.72)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              Having complete and accurate documentation is the single biggest factor in a smooth, on-time CRS registration. Here is everything you will need.
            </p>
          </div>

          <div className="crs-docs-grid" ref={crsDocsRef}>
            {crsDocs.map((doc, i) => (
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
              <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Pro Tip: Document errors are the #1 cause of delays</div>
              <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.70)", margin: 0, lineHeight: 1.7 }}>Mismatched company names, expired IEC certificates, or incorrect product model numbers in test reports can set your application back by weeks. Our team reviews every document before submission.</p>
            </div>
            <button onClick={() => window.location.href = "/contact"} style={{ padding: "11px 26px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
              onMouseLeave={e => e.currentTarget.style.background = T.orange}>
              Get Free Document Checklist →
            </button>
          </div>
        </div>
      </section>

      {/* ══ TIMELINES, COSTS, VALIDITY & RENEWAL — FIXED ══ */}
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
              Understand the full picture before you begin — so you can plan your product launch in India with confidence.
            </p>
          </div>

          <div className="tlcv-grid reveal" ref={tlcvRef}>
            {/* LEFT — Timeline + Cost */}
            <div>
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

              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "20px 20px 0", borderBottom: `2px solid ${T.border}` }}>
                  <div className="sl-row" style={{ marginBottom: 10 }}><div className="sl-line" /><span className="sl-text">Cost Breakdown</span></div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 14 }}>BIS CRS Registration Fees</h3>
                </div>
                <div>
                  {costItems.map((c, i) => (
                    <div key={i} className="cost-row">
                      <span style={{ fontFamily: T.sans, fontSize: 14, color: T.paradark, flex: 1 }}>{c.label}</span>
                      <span style={{ fontFamily: T.poppins, fontSize: 14, color: T.teal, fontWeight: 700, flexShrink: 0 }}>{c.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "14px 20px", background: T.amberLight, display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>💬</span>
                  <span style={{ fontFamily: T.sans, fontSize: 13, color: T.amberDark, lineHeight: 1.6 }}>
                    Government fees are officially prescribed. Lab charges depend on the product type and test parameters. Contact us for a free, transparent quote including all-in costs.
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — Validity + Renewal */}
            <div>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, padding: "28px 24px", marginBottom: 24 }}>
                <div className="sl-row" style={{ marginBottom: 12 }}><div className="sl-line" /><span className="sl-text">Validity & Renewal</span></div>
                <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 20 }}>Key Rules to Know</h3>
                {/* ↓ FIXED: 1-col on mobile via CSS class */}
                <div className="validity-grid">
                  {validityCards.map((vc, i) => (
                    <div key={i} className="validity-card" style={{ borderTop: `3px solid ${vc.color}` }}>
                      <div style={{ fontSize: 28, marginBottom: 10 }}>{vc.icon}</div>
                      <div style={{ fontFamily: T.poppins, fontSize: 22, fontWeight: 800, color: vc.color, marginBottom: 4 }}>{vc.value}</div>
                      <div style={{ fontFamily: T.poppins, fontSize: 13, color: T.titleblue, fontWeight: 700, marginBottom: 8 }}>{vc.title}</div>
                      <p style={{ fontFamily: T.sans,textAlign: "justify", fontSize: 12.5, color: T.muted, lineHeight: 1.7, margin: 0 }}>{vc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>🔄 Renewal Made Simple</div>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 18 }}>
                  Renewal is straightforward if the product, design, manufacturing location, and applicable IS standard have not changed. Common renewal challenges include:
                </p>
                {[
                  "Tracking multiple certificate expiry dates",
                  "Managing document errors on renewal forms",
                  "Navigating BIS portal for renewal submissions",
                  "Responding to BIS clarifications promptly",
                  "Handling design/location changes alongside renewal",
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
              <Image src="/finalimages/faq10.jpg" alt="BIS CRS FAQ" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} />
            </div>
            <div style={{ background: T.white, padding: "28px 24px", borderLeft: `1px solid ${T.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 22, height: 1.5, background: T.teal }} />
                <span style={{ fontFamily: T.poppins, fontSize: 10.5, fontWeight: 600, color: T.teal, letterSpacing: "0.13em", textTransform: "uppercase" }}>Frequently Asked</span>
              </div>
              <h3 style={{ fontFamily: T.poppins, fontSize: 35, fontWeight: 600, color: T.titleblue, marginBottom: 20 }}>BIS CRS FAQs</h3>
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
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.9rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 14 }}>Ready to Get BIS CRS Registered?</h2>
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