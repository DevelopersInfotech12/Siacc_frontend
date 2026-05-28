"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
const Footer = dynamic(() => import("../Components/Footer"));
import "../animations.css";

const T = {
  teal:"#1E88C8",tealDark:"#074D4D",tealMid:"#0E8080",titleblue:"#0a6daa", para:"#080000b0", paradark:"#080000c4",
  tealLight:"#EBF5F5",amber:"#C8780A",amberLight:"#FEF3DC",amberDark:"#9A5C06",
  slate:"#0D1B2A",body:"#2D3748",muted:"#718096",subtle:"#A0AEC0",
  border:"#E8E3DA",borderLight:"#F0ECE5",white:"#FFFFFF",cream:"#FAF8F4",
  ctaBand:"#EBF5FB",ctaBandBorder:"#C8DFF0",orange:"#F97316",
  serif:"'Cormorant Garamond','Georgia',serif",sans:"'Outfit','system-ui',sans-serif",
  poppins:"'Poppins','system-ui',sans-serif",
};

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1px solid ${open ? "rgba(30,136,200,0.45)" : T.border}`,
      borderRadius: 10, marginBottom: 10, overflow: "hidden", transition: "border-color 0.2s",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", alignItems: "flex-start", gap: 10, padding: "13px 16px",
        background: open ? "rgba(30,136,200,0.04)" : "transparent",
        border: "none", width: "100%", textAlign: "left", cursor: "pointer", transition: "background 0.18s",
      }}>
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

function useReveal(opts={}) {
  const {threshold=0.15,stagger=false,baseDelay=90,once=true}=opts;
  const ref=useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting) return;
      if(stagger){
        Array.from(el.children).forEach((child,i)=>{
          child.style.transitionDelay=i*baseDelay+"ms";
          child.classList.add("revealed");
        });
      } else { el.classList.add("revealed"); }
      if(once) obs.unobserve(el);
    },{threshold});
    obs.observe(el);
    return ()=>obs.disconnect();
  },[threshold,stagger,baseDelay,once]);
  return ref;
}

// ── STATIC DATA ───────────────────────────────────────────────────────────────

const types=[
  {icon:"⭐",title:"Mandatory Star Rating",tag:"Mandatory",desc:"Compulsory BEE star labelling for ACs, refrigerators, washing machines, TVs, geysers, and more under the Energy Conservation Act."},
  {icon:"🌟",title:"Voluntary Star Rating",tag:"Optional",desc:"Optional BEE star label for products not yet under mandatory scheme — builds consumer trust and supports premium positioning."},
  {icon:"🔌",title:"Energy Efficiency Certification",tag:"All Products",desc:"BEE certification for energy-efficient products for public procurement under government schemes and green procurement policies."},
  {icon:"🏭",title:"BEE Act Compliance",tag:"Compliance",desc:"Complete BEE Act compliance management for manufacturers including annual submissions, audit support, and timely renewals."}
];

const faqs=[
  {q:"Which appliances need mandatory BEE star labels?",a:"Air conditioners, refrigerators, ceiling fans, washing machines, LED lamps, distribution transformers, water heaters, and several other categories are under mandatory BEE labelling."},
  {q:"Can I sell appliances without BEE star rating?",a:"For mandatory categories, selling without a BEE star label is illegal and can result in seizure and penalties under the Energy Conservation Act."},
  {q:"How often must BEE registration be renewed?",a:"BEE registrations must be renewed annually. The star rating may change as energy efficiency norms are upgraded periodically by the Bureau of Energy Efficiency."},
  {q:"Does BEE apply to imported products?",a:"Yes, imported products in mandatory categories must also carry the BEE star label before being sold in India. We handle BEE compliance for both manufacturers and importers."},
  {q:"What is the timeline for getting BEE registration?",a:"Typically 4–8 weeks from the time lab testing is complete and all documents are in order. We actively track and follow up with BEE to avoid unnecessary delays."},
];

const infoItems=[
  {label:"Governing Body",value:"Bureau of Energy Efficiency"},
  {label:"Ministry",value:"Power, Govt. of India"},
  {label:"Validity",value:"Annual"},
  {label:"Processing Time",value:"4–8 Weeks"},
  {label:"Applicable To",value:"Home & Commercial Appliances"}
];

const statsStrip=[
  {value:"20+",label:"Product Categories",icon:"📋"},
  {value:"4–8",label:"Weeks Timeline",icon:"⚡"},
  {value:"Free",label:"Initial Consultation",icon:"🆓"},
  {value:"0%",label:"Failure Rate",icon:"❌"}
];

const heroChips=[
  {icon:"⭐",label:"Mandatory Star Rating"},
  {icon:"🌟",label:"Voluntary Star Rating"},
  {icon:"🔌",label:"Energy Certification"},
  {icon:"🏭",label:"BEE Act Compliance"},
  {icon:"✅",label:"0% Failure Rate"},
];

// ── SECTION 1 — BENEFITS ─────────────────────────────────────────────────────

const benefits = [
  {
    icon: "⚖️",
    title: "Legal Compliance for Mandatory Categories",
    desc: "For appliances under BEE's mandatory scheme — ACs, refrigerators, washing machines, fans, LEDs, geysers, and more — selling without a valid BEE star label is a direct violation of the Energy Conservation Act, 2001. Our team ensures your product is fully compliant before it reaches the market.",
  },
  {
    icon: "🏪",
    title: "Access to Retail & E-Commerce Channels",
    desc: "Major retail chains and e-commerce platforms (Amazon, Flipkart) require mandatory products to carry a valid BEE star label before listing. Without registration, your product cannot be legally listed or sold through these channels — BEE compliance is a market access prerequisite.",
  },
  {
    icon: "🏛️",
    title: "Mandatory for Government Procurement",
    desc: "All government tenders and public procurement orders for covered appliance categories require valid BEE star-rated products. A BEE registration number is a non-negotiable eligibility condition for government supply contracts across central and state agencies.",
  },
  {
    icon: "📈",
    title: "Consumer Trust & Premium Positioning",
    desc: "The BEE star label is one of the most widely recognised energy efficiency marks in Indian households. Higher star ratings directly influence purchase decisions for cost-conscious consumers and are increasingly used as a quality signal for premium appliance positioning.",
  },
  {
    icon: "🌱",
    title: "Support for Sustainability & ESG Goals",
    desc: "BEE star rating is India's primary framework for energy efficiency compliance and aligns directly with corporate sustainability, ESG reporting, and green procurement goals. Certified products contribute measurably to India's national energy conservation targets.",
  },
  {
    icon: "🔄",
    title: "Simplified Annual Renewal Management",
    desc: "BEE registrations require annual renewal and may be affected by periodic upgrades to energy efficiency norms. Our team proactively monitors norm changes, tracks your renewal deadlines, and ensures your label remains valid — across your entire product portfolio.",
  },
  {
    icon: "🧪",
    title: "Right Lab, Right Parameters, First Time",
    desc: "BEE energy testing must be performed at a BEE-accredited laboratory using the exact test method prescribed for your product category. Using the wrong lab or test method results in rejected applications. We match your product to the correct accredited lab from the start.",
  },
  {
    icon: "🎨",
    title: "Accurate Label Design & Compliance Artwork",
    desc: "The BEE star label has strict design specifications — star count, energy consumption value, registration number placement, and font size must meet BEE requirements exactly. We design compliant label artwork and review it against BEE guidelines before submission.",
  },
];

// ── SECTION 2 — DETAILED STEPS ────────────────────────────────────────────────

const detailedSteps = [
  {
    step: "01",
    icon: "🔍",
    title: "Product Eligibility & Scheme Assessment",
    desc: "We review your product category and specifications to determine whether it falls under BEE's mandatory or voluntary labelling scheme, identify the applicable energy efficiency standard and test method, and confirm the BEE accredited lab required for testing.",
    tip: "Tip: BEE periodically adds new product categories to the mandatory scheme and upgrades efficiency norms for existing ones. A product that was voluntary last year may now be mandatory — our team monitors all BEE notifications to keep you informed.",
  },
  {
    step: "02",
    icon: "🧪",
    title: "Energy Testing at BEE-Accredited Lab",
    desc: "Product samples are submitted to the correct BEE-accredited laboratory for energy consumption and efficiency testing under the applicable Indian Standard. We coordinate sample submission, track testing progress, and follow up on any lab queries to ensure timely report issuance.",
    tip: "Tip: Use final production samples — prototype or engineering samples with different components or firmware may produce energy readings that differ from production units, causing star rating discrepancies that require costly retesting.",
  },
  {
    step: "03",
    icon: "📋",
    title: "Document Preparation & Review",
    desc: "We compile the complete BEE application package: energy test report, product technical specifications, brand and model details, manufacturing unit information, company KYC, and authorisation documents — cross-checked against BEE requirements before submission.",
    tip: "Tip: The model number on the energy test report must exactly match the model number in the BEE application and on the product label. Any discrepancy triggers a BEE query letter, adding 2–3 weeks to the registration timeline.",
  },
  {
    step: "04",
    icon: "📤",
    title: "BEE Portal Application Filing",
    desc: "We file the complete BEE registration application on the BEE portal with all required documents, energy consumption data, and the correct star rating claim based on the test report results. Government fees are paid online at this stage.",
    tip: "Tip: The BEE portal form has product-category-specific fields. Selecting the wrong product sub-category results in a rejected application requiring a fresh filing. Our team handles portal navigation for every product category.",
  },
  {
    step: "05",
    icon: "🎨",
    title: "Star Label Design & BEE Review",
    desc: "We design the compliant BEE star label artwork with the correct star rating, annual energy consumption value, registration number, and all mandatory design elements as per BEE specifications. The label is submitted with the application for BEE review and approval.",
    tip: "Tip: The energy consumption value printed on the label must correspond exactly to the figure in the test report. Rounding or conversion errors in label artwork are a common cause of BEE objections at the review stage.",
  },
  {
    step: "06",
    icon: "🎓",
    title: "Registration Number Issuance & Annual Renewal",
    desc: "BEE issues the registration number, which must appear on the star label affixed to every unit sold. We provide the registration certificate, advise on labelling requirements, and set up proactive reminders for your annual renewal to ensure uninterrupted compliance.",
    tip: "Important: BEE registration is valid for one year and must be renewed before expiry. Selling with an expired registration has the same legal consequences as selling without one.",
  },
];

// ── SECTION 3 — DOCUMENTS ────────────────────────────────────────────────────

const beeDocs = [
  { icon: "🧪", title: "Energy Test Report", desc: "Valid energy consumption and efficiency test report from a BEE-accredited laboratory, tested as per the applicable Indian Standard for your product category." },
  { icon: "📐", title: "Product Technical Specifications", desc: "Detailed technical datasheet covering model number, energy input/output ratings, capacity, operating conditions, and all parameters tested in the lab report." },
  { icon: "🏷️", title: "Brand & Model Details", desc: "Complete brand name, model name, model number, and any variant-specific information. The model number must exactly match the test report and the BEE application form." },
  { icon: "🏭", title: "Manufacturing Unit Details", desc: "Name, address, and registration details of the manufacturing or assembly unit. For imports, the foreign manufacturer's details and the Indian importer's details are both required." },
  { icon: "🏢", title: "Company KYC & Registration", desc: "Certificate of Incorporation, Partnership Deed, or equivalent business registration document along with PAN, GST registration, and KYC of the authorised signatory." },
  { icon: "📊", title: "Annual Energy Sales Data", desc: "Historical or projected annual sales data for the product model — required by BEE for certain mandatory categories as part of the registration and renewal process." },
  { icon: "🖼️", title: "Label Artwork Proof", desc: "Proposed BEE star label artwork showing star rating, annual energy consumption value, and registration number placement — designed to meet BEE's prescribed format and specifications." },
  { icon: "✅", title: "BIS Certificate (if applicable)", desc: "For products that also require BIS certification (e.g., ACs, refrigerators under IS standards), a valid BIS licence number is required alongside the BEE registration application." },
];

// ── SECTION 4 — TIMELINE, COST, VALIDITY ────────────────────────────────────

const timelineRows = [
  { phase: "Product Eligibility & Scheme Assessment", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "Energy Testing at BEE-Accredited Lab", duration: "2–4 Weeks", owner: "BEE-Accredited Lab" },
  { phase: "Document Preparation & Label Design", duration: "3–5 Days", owner: "Applicant / Consultant" },
  { phase: "BEE Portal Application Filing", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "BEE Review & Query Resolution", duration: "1–2 Weeks", owner: "Bureau of Energy Efficiency" },
  { phase: "Registration Number Issuance", duration: "3–5 Days", owner: "Bureau of Energy Efficiency" },
];

const costItems = [
  { label: "BEE Application / Registration Fee (government)", value: "₹1,000 – ₹5,000" },
  { label: "Energy Testing at BEE-Accredited Lab", value: "₹8,000 – ₹50,000+" },
  { label: "Annual Renewal Fee", value: "₹1,000 – ₹5,000" },
  { label: "Consultant / Professional Fees", value: "Variable (contact us for quote)" },
];

const validityCards = [
  {
    icon: "📅",
    title: "Registration Validity",
    value: "1 Year",
    desc: "BEE registrations are valid for one year from the date of issue. Selling with an expired registration carries the same legal consequences as having no registration.",
    color: "#1E88C8",
  },
  {
    icon: "🔄",
    title: "Renewal Window",
    value: "Before Expiry",
    desc: "Renewal must be initiated before the registration expires. Lapsed registrations require a completely fresh application with new energy testing in most cases.",
    color: "#C8780A",
  },
  {
    icon: "📋",
    title: "Norm Upgrades",
    value: "Periodic",
    desc: "BEE periodically upgrades energy efficiency norms. Your product may need retesting and a revised star rating when norms are upgraded — even without any product change.",
    color: "#0E8080",
  },
  {
    icon: "🔖",
    title: "Per-Model Registration",
    value: "Each Model",
    desc: "Each model number requires its own BEE registration. Variants with different capacities, energy ratings, or configurations each need a separate application and test report.",
    color: "#C84E1E",
  },
];

// ── CSS ───────────────────────────────────────────────────────────────────────

const css=`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  img{max-width:100%;display:block;} a{text-decoration:none;color:inherit;}
  .sl-row{display:flex;align-items:center;gap:12px;margin-bottom:16px;}
  .sl-line{width:28px;height:1.5px;background:#1E88C8;flex-shrink:0;}
  .sl-text{font-family:'Outfit','system-ui',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#1E88C8;}
  @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.6;transform:scale(1.3);}}

  .hero-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.09);border:1px solid rgba(255,255,255,0.16);backdrop-filter:blur(6px);border-radius:6px;padding:9px 16px;font-family:'Outfit','system-ui',sans-serif;font-size:12.5px;font-weight:500;color:rgba(255,255,255,0.90);transition:background 0.2s,border-color 0.2s,transform 0.2s;}
  .hero-chip:hover{background:rgba(255,255,255,0.18);border-color:rgba(255,255,255,0.35);transform:translateY(-2px);}

  /* layout */
  .overview-grid{display:grid;grid-template-columns:1fr 360px;gap:48px;align-items:flex-start;}
  @media(max-width:960px){.overview-grid{grid-template-columns:1fr;}}
  .stats-strip{display:grid;grid-template-columns:repeat(4,1fr);}
  @media(max-width:640px){.stats-strip{grid-template-columns:repeat(2,1fr);}}
  .types-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;}
  @media(max-width:640px){.types-grid{grid-template-columns:1fr;}}
  .type-card{background:#fff;border-radius:10px;padding:28px;border:1px solid #E8E3DA;transition:all 0.25s;}
  .type-card:hover{border-color:#1E88C8;transform:translateY(-3px);box-shadow:0 12px 32px rgba(30,136,200,0.09);}
  .cta-split{display:grid;grid-template-columns:1fr auto;gap:40px;align-items:center;}
  @media(max-width:720px){.cta-split{grid-template-columns:1fr;gap:28px;}}
  .sec{padding:clamp(64px,8vw,104px) clamp(16px,5vw,56px);}
  .inner{max-width:1280px;margin:0 auto;}
  .faq-grid{}
  @media(max-width:760px){.faq-grid{grid-template-columns:1fr !important;}}

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
  @media(max-width:640px){.dstep-body{padding-bottom:24px;} .dstep-row{grid-template-columns:48px 1fr;}}
  .dstep-side-grid{display:grid;grid-template-columns:1fr 380px;gap:48px;align-items:flex-start;}
  @media(max-width:960px){.dstep-side-grid{grid-template-columns:1fr;}}
  .side-sticky{position:sticky;top:100px;}
  @media(max-width:960px){.side-sticky{position:static;}}

  /* ── SECTION 3 — DOCUMENTS ── */
  .crs-docs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;}
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
  @media(max-width:480px){
    .timeline-table th:last-child,.timeline-table td:last-child{display:none;}
    .timeline-table td:nth-child(2){white-space:normal;}
  }
  .cost-row{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid #F0ECE5;transition:background 0.15s;gap:12px;}
  .cost-row:last-child{border-bottom:none;}
  .cost-row:hover{background:rgba(30,136,200,0.03);}
.validity-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:16px;}
@media(max-width:600px){.validity-grid{grid-template-columns:1fr;}}
  .validity-card{border-radius:12px;padding:24px 20px;border:1px solid #E8E3DA;background:#fff;transition:all 0.22s;text-align:center;}
  .validity-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(0,0,0,0.07);}
  .tlcv-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:flex-start;}
  @media(max-width:860px){.tlcv-grid{grid-template-columns:1fr;}}

  /* callout flex wrap */
  .callout-row{display:flex;align-items:center;gap:24px;flex-wrap:wrap;}
  @media(max-width:600px){.callout-row{flex-direction:column;align-items:flex-start;}}
  .pro-tip-row{display:flex;align-items:center;gap:20px;flex-wrap:wrap;}
  @media(max-width:600px){.pro-tip-row{flex-direction:column;align-items:flex-start;}}
`;

export default function BEEScreen() {
  const router=useRouter();
  const heroLeftRef  = useReveal();
  const overviewRef  = useReveal();
  const infoCardRef  = useReveal();
  const statsRef     = useReveal({stagger:true,baseDelay:100});
  const typesTtlRef  = useReveal();
  const typesRef     = useReveal({stagger:true,baseDelay:80});

  // Section 1
  const benefitsTtlRef = useReveal();
  const benefitsRef    = useReveal({stagger:true,baseDelay:75});

  // Section 2
  const dstepsTtlRef = useReveal();
  const dstepsRef    = useReveal();

  // Section 3
  const crsDocsTtlRef = useReveal();
  const crsDocsRef    = useReveal({stagger:true,baseDelay:70});

  // Section 4
  const tlcvTtlRef = useReveal();
  const tlcvRef    = useReveal();

  // FAQ + CTA
  const faqRef = useReveal({stagger:true,baseDelay:80});
  const ctaRef = useReveal();

  return (
    <div style={{minHeight:"100vh",backgroundColor:T.white,fontFamily:T.sans,color:T.body}}>
      <style>{css}</style>
      <Navbar />

      {/* ══ HERO ══ */}
      <section style={{position:"relative",overflow:"hidden",borderBottom:`1px solid ${T.border}`,minHeight:420,display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:`linear-gradient(to bottom,${T.orange},${T.teal})`,zIndex:3}}/>
        <Image src="/images/bee1.png" alt="BEE Star Rating" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{position:"absolute",inset:0,zIndex:1,background:"linear-gradient(to right,rgba(7,18,28,0.88) 0%,rgba(7,18,28,0.60) 50%,rgba(7,18,28,0.10) 100%)"}}/>
        <div style={{position:"relative",zIndex:2,maxWidth:1280,margin:"0 auto",width:"100%",padding:"clamp(48px,7vw,88px) clamp(20px,4vw,60px)"}}>
          <div ref={heroLeftRef} className="reveal-left">
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.10)",border:"1px solid rgba(255,255,255,0.20)",backdropFilter:"blur(8px)",borderRadius:4,padding:"6px 16px",marginBottom:22}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 6px rgba(74,222,128,0.8)",display:"inline-block",animation:"pulse-dot 2s ease-in-out infinite"}}/>
              <span style={{fontFamily:T.sans,fontSize:10.5,fontWeight:700,color:"#fff",letterSpacing:"0.14em",textTransform:"uppercase"}}>Bureau of Energy Efficiency — Certified Consultants</span>
            </div>
            <h1 style={{fontFamily:T.poppins,fontSize:"clamp(2.6rem,5.2vw,4.2rem)",fontWeight:700,lineHeight:1.04,marginBottom:20,letterSpacing:"-0.01em",color:"#fff",maxWidth:640}}>
              BEE Star Rating &amp;{" "}<span style={{color:T.orange}}>Energy Labelling</span>
            </h1>
            <p style={{fontFamily:T.poppins,fontSize:16,color:"rgba(255,255,255,0.82)",maxWidth:520,lineHeight:1.7,marginBottom:28}}>
              Mandatory energy efficiency labelling for appliances sold in India — handled end-to-end by our BEE compliance specialists.
            </p>
            <div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:8}}>
              {heroChips.map(chip=>(<span key={chip.label} className="hero-chip"><span style={{fontSize:15}}>{chip.icon}</span>{chip.label}</span>))}
            </div>
          </div>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:3,background:T.teal,opacity:0.6,zIndex:2}}/>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section style={{background:T.teal}}>
        <div style={{maxWidth:1280,margin:"0 auto"}}>
          <div className="stats-strip" ref={statsRef}>
            {statsStrip.map((s,i)=>(
              <div key={s.label} className={`reveal d${i}`} style={{textAlign:"center",padding:"36px 16px",borderRight:i<statsStrip.length-1?"1px solid rgba(255,255,255,0.07)":"none"}}>
                <div style={{fontSize:20,marginBottom:6}}>{s.icon}</div>
                <div style={{fontFamily:T.poppins,fontSize:"clamp(2rem,2.8vw,2.8rem)",color:"#fff",fontWeight:700,lineHeight:1,letterSpacing:"-0.01em"}}>{s.value}</div>
                <div style={{fontFamily:T.sans,fontSize:14,color:"rgba(255,255,255,0.80)",marginTop:8,letterSpacing:"0.04em"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OVERVIEW ══ */}
      <section className="sec" style={{background:T.cream}}>
        <div className="inner">
          <div className="overview-grid">
            <div className="reveal-left" ref={overviewRef}>
              <div className="sl-row"><div className="sl-line"/><span className="sl-text">Bureau of Energy Efficiency</span></div>
              <h2 style={{fontFamily:T.poppins,fontSize:"clamp(2rem,3.2vw,2.9rem)",color:T.titleblue,fontWeight:700,lineHeight:1.1,letterSpacing:"-0.01em",marginBottom:16}}>
                End-to-End BEE Compliance,<br/>Handled for You
              </h2>
              <p style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.tealMid,marginBottom:16,letterSpacing:"0.05em",textTransform:"uppercase"}}>Mandatory &amp; Voluntary · Annual Renewal · Lab Coordination</p>
              <p style={{fontFamily:T.sans,fontSize:15.5,color:T.para,lineHeight:1.9,marginBottom:16,textAlign:"justify"}}>
                Mandatory energy efficiency star labelling for appliances sold in India. We handle BEE registration, lab coordination, and annual compliance end-to-end.
              </p>
              <p style={{fontFamily:T.sans,fontSize:15.5,color:T.para,lineHeight:1.9,marginBottom:32,textAlign:"justify"}}>
                Our BEE specialists coordinate with BEE-accredited labs, prepare your complete application and label artwork, and follow up until your registration number is issued — typically in 4–8 weeks.
              </p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:28}}>
                <button onClick={()=>router.push("/contact")} style={{padding:"13px 32px",fontFamily:T.poppins,fontSize:13.5,fontWeight:600,letterSpacing:"0.02em",border:"none",borderRadius:6,cursor:"pointer",background:T.orange,color:"#fff",boxShadow:"0 4px 16px rgba(10,104,104,0.22)",transition:"all 0.22s"}} onMouseEnter={e=>{e.currentTarget.style.background=T.teal;e.currentTarget.style.transform="translateY(-1px)";}} onMouseLeave={e=>{e.currentTarget.style.background=T.orange;e.currentTarget.style.transform="translateY(0)";}}>Get Free Consultation</button>
                <button onClick={()=>router.push("/contact")} style={{padding:"12px 28px",fontFamily:T.poppins,fontSize:13.5,fontWeight:600,borderRadius:6,cursor:"pointer",border:`1.5px solid ${T.border}`,color:T.slate,background:"transparent",transition:"all 0.22s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor=T.teal;e.currentTarget.style.color=T.teal;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.slate;}}>Check If Mandatory →</button>
              </div>
              <div style={{position:"relative",borderRadius:10,overflow:"hidden",height:220}}>
                <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&fit=crop" alt="BEE compliance" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} unoptimized />
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(14,128,128,0.78) 0%,rgba(30,136,200,0.45) 60%,rgba(235,245,251,0.15) 100%)"}}/>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 28px"}}>
                  <div>
                    <div style={{fontFamily:T.poppins,fontSize:"clamp(1rem,2vw,1.3rem)",color:"#fff",fontWeight:700,marginBottom:4}}>Trusted by 500+ Appliance Brands</div>
                    <p style={{fontFamily:T.sans,color:"rgba(255,255,255,0.80)",fontSize:12.5}}>Mandatory Star Rating · Voluntary · Annual Renewal · Label Design</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right" ref={infoCardRef}>
              <div style={{background:T.white,border:`1px solid ${T.border}`,borderRadius:10,padding:28,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",position:"sticky",top:100}}>
                <div className="sl-row"><div className="sl-line"/><span className="sl-text">Quick Info — BEE</span></div>
                {infoItems.map((item,i)=>(
                  <div key={item.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:i<infoItems.length-1?`1px solid ${T.border}`:"none"}}>
                    <span style={{fontFamily:T.sans,fontSize:13,color:T.muted}}>{item.label}</span>
                    <span style={{fontFamily:T.poppins,fontSize:13,color:T.slate,fontWeight:600,textAlign:"right",maxWidth:"55%"}}>{item.value}</span>
                  </div>
                ))}
                <button onClick={()=>router.push("/contact")} style={{width:"100%",marginTop:22,padding:13,background:T.orange,color:"#fff",fontWeight:600,borderRadius:6,border:"none",fontFamily:T.poppins,fontSize:14,cursor:"pointer",transition:"background 0.2s"}} onMouseEnter={e=>e.currentTarget.style.background=T.teal} onMouseLeave={e=>e.currentTarget.style.background=T.orange}>Start BEE Application →</button>
                <div style={{marginTop:16,paddingTop:16,borderTop:`1px solid ${T.border}`,display:"flex",flexDirection:"column",gap:10}}>
                  {[
                    {icon:"📞",label:"Call Us",value:"+91-9891229135",href:"tel:+919891229135"},
                    {icon:"✉",label:"Email Us",value:"starindia.acc@gmail.com",href:"mailto:starindia.acc@gmail.com"},
                  ].map(item=>(
                    <a key={item.label} href={item.href} style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
                      <div style={{width:36,height:36,borderRadius:7,backgroundColor:T.tealLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0}}>{item.icon}</div>
                      <div>
                        <div style={{fontFamily:T.sans,fontSize:10,color:T.teal,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em"}}>{item.label}</div>
                        <div style={{fontFamily:T.poppins,fontSize:13,color:T.slate,fontWeight:500,marginTop:1}}>{item.value}</div>
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
      <section className="sec" style={{background:T.white}}>
        <div className="inner">
          <div style={{textAlign:"center",marginBottom:52}} className="reveal" ref={typesTtlRef}>
            <div style={{display:"flex",justifyContent:"center"}}><div className="sl-row"><div className="sl-line"/><span className="sl-text">Registration Types</span></div></div>
            <h2 style={{fontFamily:T.poppins,fontSize:"clamp(2rem,3.2vw,2.9rem)",color:T.titleblue,fontWeight:700,letterSpacing:"-0.01em",marginBottom:14}}>Which BEE Scheme Applies to Your Product?</h2>
            <p style={{fontFamily:T.sans,color:T.para,maxWidth:480,margin:"0 auto",lineHeight:1.75,fontSize:16}}>Different appliances fall under different BEE schemes. Here's a breakdown of what applies to your product.</p>
          </div>
          <div className="types-grid" ref={typesRef}>
            {types.map((t,i)=>(
              <div key={t.title} className={`type-card reveal d${i%6}`}>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
                  <div style={{width:52,height:52,background:T.tealLight,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{t.icon}</div>
                  <span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,background:i%2===0?T.tealLight:T.amberLight,color:i%2===0?T.tealMid:T.amberDark,padding:"3px 10px",borderRadius:3,letterSpacing:"0.06em"}}>{t.tag}</span>
                </div>
                <h3 style={{fontFamily:T.poppins,fontSize:17,color:T.titleblue,marginBottom:10,fontWeight:600}}>{t.title}</h3>
                <p style={{fontSize:15,color:T.para,margin:0,fontWeight:500,textAlign:"justify"}}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — IMPORTANCE & BENEFITS OF BEE STAR RATING
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{background:T.cream}}>
        <div className="inner">
          <div style={{textAlign:"center",marginBottom:52}} className="reveal" ref={benefitsTtlRef}>
            <div style={{display:"flex",justifyContent:"center"}}>
              <div className="sl-row"><div className="sl-line"/><span className="sl-text">Why It Matters</span></div>
            </div>
            <h2 style={{fontFamily:T.poppins,fontSize:"clamp(2rem,3.2vw,2.9rem)",color:T.titleblue,fontWeight:700,letterSpacing:"-0.01em",marginBottom:14}}>
              Importance & Benefits of BEE Star Rating
            </h2>
            <p style={{fontFamily:T.sans,color:T.para,maxWidth:580,margin:"0 auto",lineHeight:1.8,fontSize:15.5}}>
              BEE star rating is not just a compliance box to tick — it is a market access requirement, a consumer trust signal, and a legal obligation for every covered appliance category sold in India.
            </p>
          </div>

          <div className="benefits-grid" ref={benefitsRef}>
            {benefits.map((b,i)=>(
              <div key={b.title} className={`benefit-card reveal d${i%6}`}>
                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
                  <div style={{width:50,height:50,borderRadius:10,background:T.tealLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>
                    {b.icon}
                  </div>
                  <h3 style={{fontFamily:T.poppins,fontSize:15.5,color:T.titleblue,fontWeight:700,lineHeight:1.3}}>{b.title}</h3>
                </div>
                <p style={{fontFamily:T.sans,fontSize:14,textAlign: "justify",color:T.paradark,lineHeight:1.8,margin:0}}>{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Warning callout */}
          <div style={{marginTop:40,background:`linear-gradient(135deg,${T.teal} 0%,${T.tealMid} 100%)`,borderRadius:12,padding:"28px 36px"}}>
            <div className="callout-row">
              <div style={{fontSize:36,flexShrink:0}}>⚠️</div>
              <div style={{flex:1,minWidth:220}}>
                <div style={{fontFamily:T.poppins,fontSize:16,fontWeight:700,color:"#fff",marginBottom:6}}>Selling Without BEE Registration is Illegal</div>
                <p style={{fontFamily:T.sans,fontSize:14,color:"rgba(255,255,255,0.85)",lineHeight:1.7,margin:0}}>
                  Appliances in mandatory BEE categories sold without a valid star label are subject to seizure and heavy penalties under the Energy Conservation Act, 2001. Enforcement has significantly intensified since 2022, with BEE conducting regular market surveillance across retail and e-commerce channels. An expired registration carries the same legal risk as no registration at all.
                </p>
              </div>
              <button onClick={()=>router.push("/contact")} style={{padding:"12px 28px",background:T.orange,color:"#fff",border:"none",borderRadius:7,fontFamily:T.poppins,fontSize:14,fontWeight:600,cursor:"pointer",flexShrink:0,transition:"background 0.2s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>e.currentTarget.style.background="#e06010"}
                onMouseLeave={e=>e.currentTarget.style.background=T.orange}>
                Get Compliant Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — STEP-BY-STEP BEE REGISTRATION PROCESS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{background:T.white}}>
        <div className="inner">
          <div style={{textAlign:"center",marginBottom:52}} className="reveal" ref={dstepsTtlRef}>
            <div style={{display:"flex",justifyContent:"center"}}>
              <div className="sl-row"><div className="sl-line"/><span className="sl-text">How It Works</span></div>
            </div>
            <h2 style={{fontFamily:T.poppins,fontSize:"clamp(2rem,3.2vw,2.9rem)",color:T.titleblue,fontWeight:700,letterSpacing:"-0.01em",marginBottom:14}}>
              Step-by-Step BEE Registration Process
            </h2>
            <p style={{fontFamily:T.sans,color:T.para,maxWidth:520,margin:"0 auto",lineHeight:1.8,fontSize:15.5}}>
              A clear, expert-guided roadmap from eligibility assessment to registration number in hand — typically completed in 4–8 weeks.
            </p>
          </div>

          <div className="dstep-side-grid" ref={dstepsRef}>
            {/* Timeline steps */}
            <div className="detailed-steps-list">
              {detailedSteps.map((s,i)=>(
                <div key={s.step} className="dstep-row">
                  <div className="dstep-left">
                    <div className="dstep-num">{s.step}</div>
                    {i < detailedSteps.length - 1 && <div className="dstep-line"/>}
                  </div>
                  <div className="dstep-body">
                    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                      <span style={{fontSize:20}}>{s.icon}</span>
                      <h3 style={{fontFamily:T.poppins,fontSize:17,color:T.titleblue,fontWeight:700}}>{s.title}</h3>
                    </div>
                    <p style={{fontFamily:T.sans,fontSize:14.5,color:T.paradark, textAlign: "justify",lineHeight:1.8,marginBottom:10}}>{s.desc}</p>
                    <div style={{background:T.tealLight,borderLeft:`3px solid ${T.teal}`,borderRadius:"0 6px 6px 0",padding:"8px 14px"}}>
                      <span style={{fontFamily:T.poppins,fontSize:12.5,color:T.tealMid,fontWeight:600}}>{s.tip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Side info card */}
            <div className="side-sticky">
              <div style={{background:T.cream,border:`1px solid ${T.border}`,borderRadius:12,padding:28,marginBottom:20}}>
                <div className="sl-row" style={{marginBottom:12}}><div className="sl-line"/><span className="sl-text">BEE Portal</span></div>
                <div style={{fontSize:28,marginBottom:12}}>🖥️</div>
                <h4 style={{fontFamily:T.poppins,fontSize:16,color:T.titleblue,fontWeight:700,marginBottom:10}}>Official Government Portal for BEE Applications</h4>
                <p style={{fontFamily:T.sans,fontSize:13.5,color:T.paradark,lineHeight:1.8}}>
                  All BEE star rating registrations are filed through the BEE online portal. The portal has product-category-specific forms, and selecting the wrong sub-category results in a rejected application. Our team handles the entire portal process — from account setup and form selection to document upload and fee payment.
                </p>
                <button onClick={()=>router.push("/contact")} style={{marginTop:16,width:"100%",padding:"11px 20px",background:T.teal,color:"#fff",border:"none",borderRadius:7,fontFamily:T.poppins,fontSize:13,fontWeight:600,cursor:"pointer",transition:"background 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.background=T.orange}
                  onMouseLeave={e=>e.currentTarget.style.background=T.teal}>
                  Let Us File for You →
                </button>
              </div>

              <div style={{background:T.titleblue,borderRadius:12,padding:28}}>
                <div style={{fontFamily:T.poppins,fontSize:15,fontWeight:700,color:"#fff",marginBottom:14}}>Why Choose Us?</div>
                {[
                  "BEE-accredited lab network across India",
                  "Category-specific portal experts — no form errors",
                  "0% application rejection rate",
                  "Label artwork design included",
                  "Proactive annual renewal tracking",
                  "BEE query resolution within 24 hours",
                ].map((pt,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:T.orange,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <span style={{color:"#fff",fontSize:10,fontWeight:800}}>✓</span>
                    </div>
                    <span style={{fontFamily:T.sans,fontSize:13.5,color:"rgba(255,255,255,0.87)"}}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — DOCUMENTS REQUIRED FOR BEE REGISTRATION
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{position:"relative",overflow:"hidden"}} className="sec">
        <Image src="https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=1600&q=80&fit=crop" alt="documents" fill style={{ objectFit: "cover" }} unoptimized />
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(13,27,42,0.96) 0%,rgba(14,128,128,0.88) 100%)"}}/>
        <div style={{maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1}}>
          <div style={{textAlign:"center",marginBottom:52}} className="reveal" ref={crsDocsTtlRef}>
            <div style={{display:"flex",justifyContent:"center"}}>
              <div className="sl-row">
                <div className="sl-line" style={{background:"rgba(255,255,255,0.5)"}}/>
                <span className="sl-text" style={{color:"rgba(255,255,255,0.75)"}}>What You Need</span>
              </div>
            </div>
            <h2 style={{fontFamily:T.poppins,fontSize:"clamp(2rem,3.2vw,2.9rem)",color:"#fff",fontWeight:700,letterSpacing:"-0.01em",marginBottom:14}}>
              Documents Required for BEE Registration
            </h2>
            <p style={{fontFamily:T.sans,color:"rgba(255,255,255,0.72)",maxWidth:520,margin:"0 auto",lineHeight:1.8,fontSize:15}}>
              Complete and accurate documentation is the single biggest factor in getting a smooth, on-time BEE registration. Here is everything you will need to prepare.
            </p>
          </div>

          <div className="crs-docs-grid" ref={crsDocsRef}>
            {beeDocs.map((doc,i)=>(
              <div key={doc.title} className={`doc-card reveal d${i%4}`}>
                <div style={{width:44,height:44,borderRadius:10,background:"rgba(30,136,200,0.25)",border:"1px solid rgba(30,136,200,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>
                  {doc.icon}
                </div>
                <div>
                  <div style={{fontFamily:T.poppins,fontSize:14,fontWeight:700,color:"#fff",marginBottom:5}}>{doc.title}</div>
                  <p style={{fontFamily:T.sans,fontSize:13,textAlign: "justify",color:"rgba(255,255,255,0.75)",lineHeight:1.7,margin:0}}>{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:36,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,padding:"20px 28px",backdropFilter:"blur(4px)"}}>
            <div className="pro-tip-row">
              <div style={{fontSize:28,flexShrink:0}}>💡</div>
              <div style={{flex:1,minWidth:200}}>
                <div style={{fontFamily:T.poppins,fontSize:14,fontWeight:700,color:"#fff",marginBottom:4}}>Pro Tip: Model number mismatches are the #1 cause of BEE delays</div>
                <p style={{fontFamily:T.sans,fontSize:13,color:"rgba(255,255,255,0.70)",margin:0,lineHeight:1.7}}>The model number on the energy test report must exactly match the model number in the BEE application form and on the product label. Even minor differences trigger BEE query letters, adding 2–4 weeks to the registration process. Our team cross-checks every document before submission.</p>
              </div>
              <button onClick={()=>router.push("/contact")} style={{padding:"11px 26px",background:T.orange,color:"#fff",border:"none",borderRadius:7,fontFamily:T.poppins,fontSize:13,fontWeight:600,cursor:"pointer",flexShrink:0,transition:"background 0.2s",whiteSpace:"nowrap"}}
                onMouseEnter={e=>e.currentTarget.style.background="#e06010"}
                onMouseLeave={e=>e.currentTarget.style.background=T.orange}>
                Get Free Document Checklist →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — TIMELINES, COSTS, VALIDITY & RENEWAL
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{background:T.cream}}>
        <div className="inner">
          <div style={{textAlign:"center",marginBottom:52}} className="reveal" ref={tlcvTtlRef}>
            <div style={{display:"flex",justifyContent:"center"}}>
              <div className="sl-row"><div className="sl-line"/><span className="sl-text">Plan Your Registration</span></div>
            </div>
            <h2 style={{fontFamily:T.poppins,fontSize:"clamp(2rem,3.2vw,2.9rem)",color:T.titleblue,fontWeight:700,letterSpacing:"-0.01em",marginBottom:14}}>
              Timelines, Costs, Validity & Renewal
            </h2>
            <p style={{fontFamily:T.sans,color:T.para,maxWidth:520,margin:"0 auto",lineHeight:1.8,fontSize:15.5}}>
              Plan your product launch and compliance calendar in India with a clear picture of what BEE registration involves from start to finish.
            </p>
          </div>

          <div className="tlcv-grid" ref={tlcvRef}>
            {/* LEFT — Timeline + Cost */}
            <div>
              {/* Timeline Table */}
              <div style={{background:T.white,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden",marginBottom:24}}>
                <div style={{padding:"20px 20px 0",borderBottom:`2px solid ${T.border}`}}>
                  <div className="sl-row" style={{marginBottom:10}}><div className="sl-line"/><span className="sl-text">Typical Timeline</span></div>
                  <h3 style={{fontFamily:T.poppins,fontSize:20,color:T.titleblue,fontWeight:700,marginBottom:14}}>Phase-wise Duration</h3>
                </div>
                <div style={{overflowX:"auto"}}>
                  <table className="timeline-table">
                    <thead>
                      <tr>
                        <th>Phase</th>
                        <th>Duration</th>
                        <th>Handled By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {timelineRows.map((row,i)=>(
                        <tr key={i}>
                          <td>{row.phase}</td>
                          <td>{row.duration}</td>
                          <td style={{color:T.muted,fontSize:13}}>{row.owner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{padding:"14px 20px",background:T.tealLight,display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
                  <span style={{fontSize:16}}>⏱️</span>
                  <span style={{fontFamily:T.poppins,fontSize:13,color:T.tealMid,fontWeight:600}}>Total estimated time: <strong>4–8 weeks</strong> (when documents and samples are in order)</span>
                </div>
              </div>

              {/* Cost Table */}
              <div style={{background:T.white,border:`1px solid ${T.border}`,borderRadius:12,overflow:"hidden"}}>
                <div style={{padding:"20px 20px 0",borderBottom:`2px solid ${T.border}`}}>
                  <div className="sl-row" style={{marginBottom:10}}><div className="sl-line"/><span className="sl-text">Cost Breakdown</span></div>
                  <h3 style={{fontFamily:T.poppins,fontSize:20,color:T.titleblue,fontWeight:700,marginBottom:14}}>BEE Registration Fees</h3>
                </div>
                <div>
                  {costItems.map((c,i)=>(
                    <div key={i} className="cost-row">
                      <span style={{fontFamily:T.sans,fontSize:14,color:T.paradark,flex:1}}>{c.label}</span>
                      <span style={{fontFamily:T.poppins,fontSize:14,color:T.teal,fontWeight:700,flexShrink:0,textAlign:"right"}}>{c.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{padding:"14px 20px",background:T.amberLight,display:"flex",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
                  <span style={{fontSize:16,flexShrink:0}}>💬</span>
                  <span style={{fontFamily:T.sans,fontSize:13,color:T.amberDark,lineHeight:1.6}}>
                    Government fees are prescribed by BEE and vary by product category. Energy testing charges depend on the product type and number of test parameters. Contact us for a transparent all-in quote for your specific appliance.
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT — Validity + Renewal */}
            <div>
              <div style={{background:T.white,border:`1px solid ${T.border}`,borderRadius:12,padding:"28px 24px",marginBottom:24}}>
                <div className="sl-row" style={{marginBottom:12}}><div className="sl-line"/><span className="sl-text">Validity & Renewal</span></div>
                <h3 style={{fontFamily:T.poppins,fontSize:20,color:T.titleblue,fontWeight:700,marginBottom:20}}>Key Rules to Know</h3>
                <div className="validity-grid">
                  {validityCards.map((vc,i)=>(
                    <div key={i} className="validity-card" style={{borderTop:`3px solid ${vc.color}`}}>
                      <div style={{fontSize:28,marginBottom:10}}>{vc.icon}</div>
                      <div style={{fontFamily:T.poppins,fontSize:22,fontWeight:800,color:vc.color,marginBottom:4}}>{vc.value}</div>
                      <div style={{fontFamily:T.poppins,fontSize:13,color:T.titleblue,fontWeight:700,marginBottom:8}}>{vc.title}</div>
                      <p style={{fontFamily:T.sans,textAlign: "justify",fontSize:12.5,color:T.muted,lineHeight:1.7,margin:0}}>{vc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Renewal checklist */}
              <div style={{background:T.titleblue,borderRadius:12,padding:28}}>
                <div style={{fontFamily:T.poppins,fontSize:16,fontWeight:700,color:"#fff",marginBottom:6}}>🔄 Annual Renewal Made Simple</div>
                <p style={{fontFamily:T.sans,fontSize:13.5,color:"rgba(255,255,255,0.78)",lineHeight:1.7,marginBottom:18}}>
                  BEE registration must be renewed every year. Common challenges our clients face at renewal time:
                </p>
                {[
                  "Tracking renewal deadlines across multiple models and brands",
                  "BEE efficiency norm upgrades that require retesting at renewal",
                  "Updated energy consumption values requiring revised label artwork",
                  "Annual sales data compilation and submission to BEE",
                  "Portal changes between original application and renewal year",
                  "Managing renewals for large portfolios with dozens of SKUs",
                ].map((pt,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:10}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:"rgba(249,115,22,0.85)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                      <span style={{color:"#fff",fontSize:10,fontWeight:800}}>!</span>
                    </div>
                    <span style={{fontFamily:T.sans,fontSize:13.5,color:"rgba(255,255,255,0.82)",lineHeight:1.6}}>{pt}</span>
                  </div>
                ))}
                <button onClick={()=>router.push("/contact")} style={{marginTop:18,width:"100%",padding:"12px 20px",background:T.orange,color:"#fff",border:"none",borderRadius:7,fontFamily:T.poppins,fontSize:14,fontWeight:600,cursor:"pointer",transition:"background 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#e06010"}
                  onMouseLeave={e=>e.currentTarget.style.background=T.orange}>
                  Let Us Handle Your Annual Renewal →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQS ══ */}
      <section className="sec" style={{background:T.cream}}>
        <div className="inner">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderRadius:14,overflow:"hidden",border:`1px solid ${T.border}`,minHeight:440}} className="faq-grid">
            <div style={{position:"relative",minHeight:250,overflow:"hidden"}}>
              <Image src="/finalimages/faq10.jpg" alt="BEE FAQ" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} />
            </div>
            <div style={{background:T.white,padding:"28px 24px",borderLeft:`1px solid ${T.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <div style={{width:22,height:1.5,background:T.teal}}/>
                <span style={{fontFamily:T.poppins,fontSize:10.5,fontWeight:600,color:T.teal,letterSpacing:"0.13em",textTransform:"uppercase"}}>Frequently Asked</span>
              </div>
              <h3 style={{fontFamily:T.poppins,fontSize:35,fontWeight:600,color:T.titleblue,marginBottom:20}}>BEE Certification FAQs</h3>
              <div ref={faqRef}>
                {faqs.map((faq)=>(<FaqItem key={faq.q} faq={faq}/>))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="reveal" ref={ctaRef} style={{background:T.ctaBand,borderTop:`1px solid ${T.ctaBandBorder}`,borderBottom:`1px solid ${T.ctaBandBorder}`,padding:"80px clamp(16px,5vw,56px)"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div className="cta-split">
            <div>
              <div className="sl-row" style={{marginBottom:20}}><div className="sl-line"/><span className="sl-text">Start Today</span></div>
              <h2 style={{fontFamily:T.poppins,fontSize:"clamp(1.9rem,3.2vw,2.9rem)",color:T.titleblue,fontWeight:700,lineHeight:1.1,letterSpacing:"-0.01em",marginBottom:14}}>Get BEE Star Rating for Your Product</h2>
              <p style={{fontFamily:T.sans,color:T.paradark,fontSize:14.5,lineHeight:1.8}}>Our energy compliance team will handle your BEE registration from start to finish.<br/>Free consultation. Clear timeline. Transparent pricing.</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12,flexShrink:0}}>
              <button onClick={()=>router.push("/contact")} style={{padding:"14px 36px",fontFamily:T.poppins,fontSize:14,fontWeight:600,border:"none",borderRadius:6,cursor:"pointer",background:T.orange,color:"#fff",whiteSpace:"nowrap",transition:"all 0.22s"}} onMouseEnter={e=>{e.currentTarget.style.background=T.teal;e.currentTarget.style.transform="translateY(-1px)";}} onMouseLeave={e=>{e.currentTarget.style.background=T.orange;e.currentTarget.style.transform="translateY(0)";}}>Get Free Consultation</button>
              <a href="tel:+919891229135" style={{padding:"13px 28px",border:`1.5px solid ${T.border}`,borderRadius:6,fontFamily:T.poppins,fontSize:14,fontWeight:500,color:T.slate,display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:T.white,transition:"border-color 0.2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=T.teal} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>📞 +91-9891229135</a>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}