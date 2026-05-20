"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
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
  {icon:"🔬",title:"Product Safety Testing",tag:"Mandatory",desc:"Safety and performance testing for consumer electronics, electrical appliances, and industrial products as per Indian standards."},
  {icon:"📡",title:"EMC / RF Testing",tag:"Wireless Devices",desc:"Electromagnetic Compatibility and Radio Frequency testing for wireless, Bluetooth, Wi-Fi, and IoT devices."},
  {icon:"⚗️",title:"Chemical & Material Testing",tag:"FMCG / Pharma",desc:"Lab testing for chemicals, raw materials, food products, and pharmaceutical formulations for compliance and safety."},
  {icon:"🏗️",title:"Mechanical & Structural Testing",tag:"Industrial",desc:"Strength, durability, and structural integrity testing for construction materials, industrial components, and machinery."},
  {icon:"🌿",title:"Environmental Testing",tag:"Sustainability",desc:"RoHS, REACH, and environmental compliance testing for electronics, plastics, and consumer goods."},
  {icon:"🧴",title:"Consumer Product Testing",tag:"Retail",desc:"Comprehensive testing for toys, cosmetics, textiles, footwear, and packaged food products."}
];

const faqs=[
  {q:"Which lab should I use for BIS CRS certification?",a:"You must use a BIS-recognized lab for CRS registration. We maintain partnerships with multiple BIS-recognized labs across India and help coordinate the fastest turnaround for your product category."},
  {q:"How many product samples are needed for testing?",a:"The number of samples varies by product and standard — typically 3 to 10 units. We advise you on exact requirements based on your specific product and applicable Indian Standard."},
  {q:"Can I use a foreign test report for Indian certifications?",a:"In some cases, yes. BIS CRS and certain TEC/WPC approvals accept test reports from internationally accredited labs (ILAC-MRA members). We can assess if your existing report qualifies and saves you retesting costs."},
  {q:"How long does product testing take?",a:"Testing timelines vary: 1–2 weeks for simple consumer products, 3–6 weeks for electronics with EMC testing, and up to 8–12 weeks for complex telecom equipment. We work to minimize delays at every step."},
  {q:"What happens if my product fails the test?",a:"We help identify the root cause of failure, recommend design or compliance fixes, and coordinate re-testing. Our team has extensive experience guiding products through failure remediation efficiently."},
];

const infoItems=[{label:"Lab Type",value:"NABL / BIS / TEC / WPC"},{label:"Standards",value:"IS, IEC, EN, IEEE & more"},{label:"Turnaround",value:"1–12 Weeks (product-based)"},{label:"Reports Valid For",value:"BIS, WPC, TEC, BEE filings"},{label:"Our Failure Rate",value:"0%"}];
const statsStrip=[{value:"50+",label:"Accredited Labs",icon:"🏛️"},{value:"1–12",label:"Weeks Turnaround",icon:"⚡"},{value:"Free",label:"Initial Consultation",icon:"🆓"},{value:"0%",label:"Failure Rate",icon:"✅"}];

const heroChips=[
  {icon:"🔬",label:"Product Safety Testing"},
  {icon:"📡",label:"EMC / RF Testing"},
  {icon:"⚗️",label:"Chemical Testing"},
  {icon:"🌿",label:"Environmental Testing"},
  {icon:"✅",label:"0% Failure Rate"},
];

// ── SECTION 1 — BENEFITS ──────────────────────────────────────────────────────

const benefits = [
  {
    icon: "⚡",
    title: "Fast-Track Certification Approvals",
    desc: "Lab coordination delays are the #1 cause of certification timelines slipping. Our direct partnerships with 50+ NABL and BIS accredited labs across India ensure your test slots are booked, samples tracked, and reports issued without unnecessary waiting.",
  },
  {
    icon: "🎯",
    title: "Right Lab, Right Standard, First Time",
    desc: "Not every lab is accredited for every product or standard. Using the wrong lab results in rejected test reports and costly retesting. We match your product to the exact accredited lab required by BIS, WPC, TEC, or BEE — first time, every time.",
  },
  {
    icon: "📋",
    title: "Zero Report Rejection Risk",
    desc: "Test reports rejected due to format errors, incomplete parameters, or accreditation scope mismatches are a hidden source of costly delays. We review every report before submission to ensure it meets the exact requirements of the certification authority.",
  },
  {
    icon: "🏛️",
    title: "Access to Government Procurement Markets",
    desc: "Government and large enterprise tenders for electronics, industrial equipment, and consumer goods require valid NABL-accredited test reports and BIS certification. Our testing coordination ensures your compliance documentation is procurement-ready.",
  },
  {
    icon: "🌐",
    title: "One Partner for All Product Categories",
    desc: "Whether you need safety testing for electronics, EMC testing for wireless devices, chemical testing for FMCG, or environmental testing for plastics — we coordinate across every product category and regulatory framework from a single point of contact.",
  },
  {
    icon: "🔍",
    title: "Proactive Failure Detection",
    desc: "Our pre-testing review identifies likely non-conformities before your samples enter the lab — giving your engineering team time to correct issues before formal testing begins. This dramatically reduces the risk of test failure and costly sample rework.",
  },
  {
    icon: "💰",
    title: "Cost-Optimised Lab Selection",
    desc: "Testing fees vary significantly between labs for the same product. We benchmark labs for your specific product and recommend the most cost-effective accredited option — without compromising turnaround time or report quality.",
  },
  {
    icon: "🔁",
    title: "Ongoing Compliance Support",
    desc: "As Indian standards evolve, previously tested products may require retesting or recertification. We monitor standard updates relevant to your product portfolio and proactively advise on compliance obligations before regulatory deadlines.",
  },
];

// ── SECTION 2 — DETAILED STEPS ────────────────────────────────────────────────

const detailedSteps = [
  {
    step: "01",
    icon: "🔍",
    title: "Product Scoping & Standard Identification",
    desc: "We review your product specifications to identify applicable Indian Standards (IS), IEC, or EN norms and determine the exact test parameters required. This includes identifying the correct certification authority — BIS, WPC, TEC, or BEE — and the type of accredited lab required.",
    tip: "Tip: Products with multiple functions (e.g., a smart appliance with wireless connectivity) may need testing under multiple standards. All are covered in a single coordinated engagement.",
  },
  {
    step: "02",
    icon: "🏛️",
    title: "Lab Selection & Sample Planning",
    desc: "We recommend and coordinate with the right NABL, BIS, TEC, or WPC accredited lab based on your product category and certification requirement. We also advise on the exact number of samples, sample preparation guidelines, and any special packaging or labelling needed before submission.",
    tip: "Tip: Using a lab that is accredited for your specific IS number — not just your product category — is essential. Scope mismatches are a common and avoidable cause of report rejection.",
  },
  {
    step: "03",
    icon: "📦",
    title: "Sample Submission & Lab Coordination",
    desc: "We coordinate the physical submission of samples to the laboratory, prepare the necessary covering documents, and register your test job with the lab. We establish a direct point of contact with the lab engineer responsible for your product to ensure smooth communication throughout.",
    tip: "Tip: Production-representative samples are mandatory — engineering prototypes with different component configurations may produce test results that do not reflect production units.",
  },
  {
    step: "04",
    icon: "⏱️",
    title: "Active Testing Monitoring",
    desc: "We actively track your test job progress, coordinate with lab engineers on any clarifications required during testing, and flag any interim non-conformities that can be resolved before the final test report is issued. You receive regular status updates throughout.",
    tip: "Tip: Unresolved lab queries during testing are the most common cause of report delays. Our active monitoring ensures queries are escalated and resolved within 24 hours.",
  },
  {
    step: "05",
    icon: "📋",
    title: "Test Report Review & Validation",
    desc: "We review the completed test report for accuracy, completeness, and compliance with the exact format required by the certification authority. Common issues — parameter omissions, incorrect IS references, scope statement errors — are caught and corrected before the report is used for filing.",
    tip: "Tip: A test report that is technically sound but incorrectly formatted for BIS or WPC submission will still be rejected. Our review adds a critical quality gate before the report reaches the certification authority.",
  },
  {
    step: "06",
    icon: "🎓",
    title: "Certification Filing & Closure",
    desc: "Validated test reports are used to file for the required certification — BIS CRS, WPC-ETA, TEC approval, or BEE star rating. We prepare and submit the complete certification application, follow up on queries, and track approval through to certificate issuance.",
    tip: "Important: The test report model number, product description, and applicant details must exactly match the certification application. We cross-check every field before submission.",
  },
];

// ── SECTION 3 — DOCUMENTS ────────────────────────────────────────────────────

const testingDocs = [
  { icon: "📄", title: "Product Technical Datasheet", desc: "Detailed technical specification sheet covering product category, model number, electrical ratings, materials, and intended use case." },
  { icon: "📦", title: "Product Samples", desc: "Production-representative samples as specified by the applicable lab and standard — typically 3 to 10 units depending on the product and test scope." },
  { icon: "📘", title: "User Manual / Product Brochure", desc: "User manual or product brochure describing product features, operating parameters, safety instructions, and compliance markings in English." },
  { icon: "📐", title: "Circuit Diagram / Block Diagram", desc: "Schematic or block diagram of the product's electrical or electronic design — mandatory for electronics, appliances, and wireless devices." },
  { icon: "🏢", title: "Company Registration & KYC Documents", desc: "Certificate of Incorporation, Partnership Deed, or equivalent business registration document for the applicant entity, along with KYC of the authorized signatory." },
  { icon: "📋", title: "Previous Test Reports (if any)", desc: "Any existing test reports from ILAC-MRA accredited labs that may reduce retesting requirements, particularly for BIS CRS and TEC approvals." },
  { icon: "🔖", title: "Applicable IS / Standard Number", desc: "The specific Indian Standard (IS) or international standard number applicable to your product — used to define the exact test scope and lab accreditation requirement." },
  { icon: "✅", title: "Authorized Signatory Letter", desc: "Letter authorizing the consultant or representative to coordinate testing, submit samples, and receive test reports on behalf of the company." },
];

// ── SECTION 4 — TIMELINE, COST, VALIDITY ────────────────────────────────────

const timelineRows = [
  { phase: "Product Scoping & Standard Identification", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "Lab Selection & Sample Planning", duration: "1–2 Days", owner: "Applicant / Consultant" },
  { phase: "Sample Submission & Lab Registration", duration: "2–3 Days", owner: "Applicant / Consultant" },
  { phase: "Lab Testing (varies by product)", duration: "1–12 Weeks", owner: "NABL / BIS / TEC Lab" },
  { phase: "Test Report Review & Validation", duration: "2–3 Days", owner: "Applicant / Consultant" },
  { phase: "Certification Filing & Approval", duration: "1–4 Weeks", owner: "BIS / WPC / TEC / BEE" },
];

const costItems = [
  { label: "Lab Testing Charges (product-dependent)", value: "₹5,000 – ₹1,50,000+" },
  { label: "Certification Application Fee (government)", value: "₹500 – ₹10,000" },
  { label: "Sample Courier & Logistics", value: "₹500 – ₹5,000" },
  { label: "Consultant / Professional Fees", value: "Variable (contact us for quote)" },
];

const validityCards = [
  {
    icon: "📅",
    title: "Test Report Validity",
    value: "3–5 Years",
    desc: "Most accredited lab test reports are valid for 3–5 years and can be used for certification renewals if the product specifications remain unchanged.",
    color: "#1E88C8",
  },
  {
    icon: "🔄",
    title: "Retesting Trigger",
    value: "On Change",
    desc: "Any change to the product's materials, electrical design, components, or applicable Indian Standard requires fresh testing before certification renewal.",
    color: "#C8780A",
  },
  {
    icon: "📋",
    title: "Certification Validity",
    value: "1–5 Years",
    desc: "Certification validity varies by authority: BIS CRS licences are valid for 2 years, WPC-ETA for 5 years, and TEC approvals for 2–3 years.",
    color: "#0E8080",
  },
  {
    icon: "🔖",
    title: "Per-Model Scope",
    value: "Each Model",
    desc: "Test reports and certifications are issued per model. Variants with different specifications, power ratings, or materials need separate testing and certification.",
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

  @keyframes pulse-dot {
    0%,100%{opacity:1;transform:scale(1);}
    50%{opacity:0.6;transform:scale(1.3);}
  }

  .hero-chip{
    display:inline-flex;align-items:center;gap:8px;
    background:rgba(255,255,255,0.09);
    border:1px solid rgba(255,255,255,0.16);
    backdrop-filter:blur(6px);
    border-radius:6px;padding:9px 16px;
    font-family:'Outfit','system-ui',sans-serif;font-size:12.5px;font-weight:500;
    color:rgba(255,255,255,0.90);
    transition:background 0.2s,border-color 0.2s,transform 0.2s;
  }
  .hero-chip:hover{
    background:rgba(255,255,255,0.18);
    border-color:rgba(255,255,255,0.35);
    transform:translateY(-2px);
  }

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

export default function TestingScreen() {
  const router=useRouter();
  const heroLeftRef =useReveal();
  const overviewRef =useReveal();
  const infoCardRef =useReveal();
  const statsRef    =useReveal({stagger:true,baseDelay:100});
  const typesTtlRef =useReveal();
  const typesRef    =useReveal({stagger:true,baseDelay:80});

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
  const faqRef      = useReveal({stagger:true,baseDelay:80});
  const ctaRef      = useReveal();

  return (
    <div style={{minHeight:"100vh",backgroundColor:T.white,fontFamily:T.sans,color:T.body}}>
      <style>{css}</style>
      <Navbar />

      {/* ══ HERO ══ */}
      <section style={{
        position:"relative",overflow:"hidden",
        borderBottom:`1px solid ${T.border}`,
        minHeight:420,
        display:"flex",flexDirection:"column",justifyContent:"center",
      }}>
        <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:`linear-gradient(to bottom,${T.orange},${T.teal})`,zIndex:3}}/>
        <img src="/images/testing.png" alt="Product Testing" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 40%",zIndex:0}}/>
        <div style={{position:"absolute",inset:0,zIndex:1,background:"linear-gradient(to right,rgba(7,18,28,0.88) 0%,rgba(7,18,28,0.60) 50%,rgba(7,18,28,0.10) 100%)"}}/>
        <div style={{position:"relative",zIndex:2,maxWidth:1280,margin:"0 auto",width:"100%",padding:"clamp(48px,7vw,88px) clamp(20px,4vw,60px)"}}>
          <div ref={heroLeftRef} className="reveal-left">
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.10)",border:"1px solid rgba(255,255,255,0.20)",backdropFilter:"blur(8px)",borderRadius:4,padding:"6px 16px",marginBottom:22}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 6px rgba(74,222,128,0.8)",display:"inline-block",animation:"pulse-dot 2s ease-in-out infinite"}}/>
              <span style={{fontFamily:T.sans,fontSize:10.5,fontWeight:700,color:"#fff",letterSpacing:"0.14em",textTransform:"uppercase"}}>
                NABL / BIS / TEC / WPC Accredited Labs — Certified Consultants
              </span>
            </div>
            <h1 style={{
              fontFamily:T.poppins,
              fontSize:"clamp(2.6rem,5.2vw,4.2rem)",
              fontWeight:700,lineHeight:1.04,
              marginBottom:20,letterSpacing:"-0.01em",
              color:"#fff",maxWidth:640,
            }}>
              Product Testing &amp;{" "}
              <span style={{color:T.orange}}>Certification Support</span>
            </h1>
            <p style={{fontFamily:T.poppins,fontSize:16,color:"rgba(255,255,255,0.82)",maxWidth:520,lineHeight:1.7,marginBottom:28}}>
              End-to-end lab testing coordination for all Indian regulatory certifications — BIS, WPC, TEC, BEE and more. Handled by our testing specialists.
            </p>
            <div style={{display:"flex",flexWrap:"wrap",gap:10,marginTop:8}}>
              {heroChips.map(chip=>(
                <span key={chip.label} className="hero-chip">
                  <span style={{fontSize:15}}>{chip.icon}</span>{chip.label}
                </span>
              ))}
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
              <div className="sl-row"><div className="sl-line"/><span className="sl-text">NABL / BIS / TEC / WPC Accredited Labs</span></div>
              <h2 style={{fontFamily:T.poppins,fontSize:"clamp(2rem,3.2vw,2.9rem)",color:T.titleblue,fontWeight:700,lineHeight:1.1,letterSpacing:"-0.01em",marginBottom:16}}>
                End-to-End Lab Testing Coordination
              </h2>
              <p style={{fontFamily:T.sans,fontSize:12,fontWeight:600,color:T.tealMid,marginBottom:16,letterSpacing:"0.05em",textTransform:"uppercase"}}>Lab Coordination · Report Review · Certification Filing</p>
              <p style={{fontFamily:T.sans,fontSize:15.5,color:T.para,lineHeight:1.9,marginBottom:16,textAlign:"justify"}}>
                End-to-end lab testing coordination for all Indian regulatory certifications. We identify the right lab, manage sample submission, track progress, and review reports — so your certification isn't delayed by testing.
              </p>
              <p style={{fontFamily:T.sans,fontSize:15.5,color:T.para,lineHeight:1.9,marginBottom:32,textAlign:"justify"}}>
                Our testing specialists work with 50+ NABL, BIS, TEC, and WPC accredited labs across India, ensuring your test reports meet every certification requirement.
              </p>
              <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:28}}>
                <button onClick={()=>router.push("/contact")}
                  style={{padding:"13px 32px",fontFamily:T.poppins,fontSize:13.5,fontWeight:600,letterSpacing:"0.02em",border:"none",borderRadius:6,cursor:"pointer",background:T.orange,color:"#fff",boxShadow:"0 4px 16px rgba(10,104,104,0.22)",transition:"all 0.22s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background=T.teal;e.currentTarget.style.transform="translateY(-1px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background=T.orange;e.currentTarget.style.transform="translateY(0)";}}>Get Free Consultation</button>
                <button onClick={()=>router.push("/contact")}
                  style={{padding:"12px 28px",fontFamily:T.poppins,fontSize:13.5,fontWeight:600,borderRadius:6,cursor:"pointer",border:`1.5px solid ${T.border}`,color:T.slate,background:"transparent",transition:"all 0.22s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=T.teal;e.currentTarget.style.color=T.teal;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.color=T.slate;}}>Check Testing Requirements →</button>
              </div>
              <div style={{position:"relative",borderRadius:10,overflow:"hidden",height:220}}>
                <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80&fit=crop" alt="Testing lab" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 40%"}}/>
                <div style={{position:"absolute",inset:0,background:"linear-gradient(to right,rgba(14,128,128,0.78) 0%,rgba(30,136,200,0.45) 60%,rgba(235,245,251,0.15) 100%)"}}/>
                <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",padding:"0 28px"}}>
                  <div>
                    <div style={{fontFamily:T.poppins,fontSize:"clamp(1rem,2vw,1.3rem)",color:"#fff",fontWeight:700,marginBottom:4}}>50+ Accredited Lab Partners</div>
                    <p style={{fontFamily:T.sans,color:"rgba(255,255,255,0.80)",fontSize:12.5}}>NABL · BIS · TEC · WPC · BEE Accredited Labs Pan-India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-right" ref={infoCardRef}>
              <div style={{background:T.white,border:`1px solid ${T.border}`,borderRadius:10,padding:28,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",position:"sticky",top:100}}>
                <div className="sl-row"><div className="sl-line"/><span className="sl-text">Quick Info</span></div>
                {infoItems.map((item,i)=>(
                  <div key={item.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:i<infoItems.length-1?`1px solid ${T.border}`:"none"}}>
                    <span style={{fontFamily:T.sans,fontSize:13,color:T.muted}}>{item.label}</span>
                    <span style={{fontFamily:T.poppins,fontSize:13,color:T.slate,fontWeight:600,textAlign:"right",maxWidth:"55%"}}>{item.value}</span>
                  </div>
                ))}
                <button
                  onClick={()=>router.push("/contact")}
                  style={{width:"100%",marginTop:22,padding:13,background:T.orange,color:"#fff",fontWeight:600,borderRadius:6,border:"none",fontFamily:T.poppins,fontSize:14,cursor:"pointer",transition:"background 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.background=T.teal}
                  onMouseLeave={e=>e.currentTarget.style.background=T.orange}>Start Application →</button>
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
            <div style={{display:"flex",justifyContent:"center"}}><div className="sl-row"><div className="sl-line"/><span className="sl-text">Testing Categories</span></div></div>
            <h2 style={{fontFamily:T.poppins,fontSize:"clamp(2rem,3.2vw,2.9rem)",color:T.titleblue,fontWeight:700,letterSpacing:"-0.01em",marginBottom:14}}>What Type of Testing Do You Need?</h2>
            <p style={{fontFamily:T.sans,color:T.para,maxWidth:480,margin:"0 auto",lineHeight:1.75,fontSize:16}}>We coordinate with accredited labs across India for all product categories and regulatory frameworks.</p>
          </div>
          <div className="types-grid" ref={typesRef}>
            {types.map((t,i)=>(
              <div key={t.title} className={`type-card reveal d${i%6}`}>
                <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16}}>
                  <div style={{width:52,height:52,background:T.tealLight,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>{t.icon}</div>
                  <span style={{fontFamily:T.sans,fontSize:10,fontWeight:700,background:i%2===0?T.tealLight:T.amberLight,color:i%2===0?T.tealMid:T.amberDark,padding:"3px 10px",borderRadius:3,letterSpacing:"0.06em"}}>{t.tag}</span>
                </div>
                <h3 style={{fontFamily:T.poppins,fontSize:17,color:T.titleblue,marginBottom:10,fontWeight:600}}>{t.title}</h3>
                <p style={{fontSize:15,textAlign: "justify",color:T.para,margin:0,fontWeight:500,textAlign:"justify"}}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — IMPORTANCE & BENEFITS OF LAB TESTING
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={benefitsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Why It Matters</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Importance & Benefits of Expert Testing Coordination
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 580, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              Lab coordination is not just a formality — it is the most operationally complex and delay-prone part of any Indian certification process. Getting it right from the start is the single biggest factor in achieving on-time certification.
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
              <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Wrong Lab = Rejected Report = Delayed Certification</div>
              <p style={{ fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: 0 }}>
                Test reports from labs that are not accredited for the specific Indian Standard applicable to your product are rejected outright by BIS, WPC, and TEC. This means starting the entire testing process over — costing weeks of delay and full retesting fees. Lab accreditation scope verification is a mandatory first step that many first-time applicants miss entirely.
              </p>
            </div>
            <button onClick={() => router.push("/contact")} style={{ padding: "12px 28px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 14, fontWeight: 600, cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
              onMouseLeave={e => e.currentTarget.style.background = T.orange}>
              Get Expert Coordination →
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — STEP-BY-STEP TESTING COORDINATION PROCESS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={dstepsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">How It Works</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Step-by-Step Testing Coordination Process
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              A clear, expert-guided roadmap from product scoping to certified test report in hand — minimising delays at every step.
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
                    <p style={{ fontFamily: T.sans, textAlign: "justify",fontSize: 14.5, color: T.paradark, lineHeight: 1.8, marginBottom: 10 }}>{s.desc}</p>
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
                <div className="sl-row" style={{ marginBottom: 12 }}><div className="sl-line" /><span className="sl-text">Lab Network</span></div>
                <div style={{ fontSize: 28, marginBottom: 12 }}>🏛️</div>
                <h4 style={{ fontFamily: T.poppins, fontSize: 16, color: T.titleblue, fontWeight: 700, marginBottom: 10 }}>50+ Accredited Lab Partners Pan-India</h4>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: T.paradark, lineHeight: 1.8 }}>
                  We maintain active partnerships with NABL, BIS, TEC, WPC, and BEE accredited labs across India. Our direct relationships with lab engineers mean faster slot allocation, priority tracking, and quicker resolution of testing queries — translating into shorter overall timelines for your certification.
                </p>
                <button onClick={() => router.push("/contact")} style={{ marginTop: 16, width: "100%", padding: "11px 20px", background: T.teal, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.orange}
                  onMouseLeave={e => e.currentTarget.style.background = T.teal}>
                  Let Us Coordinate Your Testing →
                </button>
              </div>

              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Why Choose Us?</div>
                {[
                  "50+ NABL, BIS, TEC, WPC accredited lab partners",
                  "Accreditation scope verified before every submission",
                  "0% test report rejection rate",
                  "Active testing progress tracking",
                  "Lab query resolution within 24 hours",
                  "Report reviewed before certification filing",
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
          SECTION 3 — DOCUMENTS REQUIRED FOR TESTING
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
              Documents Required for Lab Testing
            </h2>
            <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.72)", maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              Complete and accurate documentation is the single biggest factor in getting a smooth, on-time test report. Here is everything you will need to prepare before sample submission.
            </p>
          </div>

          <div className="crs-docs-grid" ref={crsDocsRef}>
            {testingDocs.map((doc, i) => (
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

          <div style={{ marginTop: 36, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "20px 28px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap", backdropFilter: "blur(4px)" }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>💡</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Pro Tip: Model number mismatches are the #1 cause of testing delays</div>
              <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.70)", margin: 0, lineHeight: 1.7 }}>The model number on the test report must exactly match the model number on the product, the product label, and the certification application form. Even minor differences trigger lab query letters and certification authority rejections, adding 2–4 weeks to the overall process. Our team cross-checks every document before sample submission.</p>
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
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Plan Your Testing</span></div>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>
              Timelines, Costs, Validity & Renewal
            </h2>
            <p style={{ fontFamily: T.sans, color: T.para, maxWidth: 520, margin: "0 auto", lineHeight: 1.8, fontSize: 15.5 }}>
              Plan your certification and product launch timeline in India with a clear picture of what the testing coordination process involves from start to finish.
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
                  <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.tealMid, fontWeight: 600 }}>Total estimated time: <strong>3–16 weeks</strong> (varies by product complexity and standard)</span>
                </div>
              </div>

              {/* Cost Table */}
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
                <div style={{ padding: "20px 20px 0", borderBottom: `2px solid ${T.border}` }}>
                  <div className="sl-row" style={{ marginBottom: 10 }}><div className="sl-line" /><span className="sl-text">Cost Breakdown</span></div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 20, color: T.titleblue, fontWeight: 700, marginBottom: 14 }}>Testing & Certification Fees</h3>
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
                    Lab testing charges depend on the product category, number of test parameters, and applicable standard. Government certification fees are prescribed by BIS, WPC, TEC, or BEE. Contact us for a transparent all-in quote for your specific product.
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
                      <p style={{ fontFamily: T.sans,textAlign: "justify", fontSize: 12.5, color: T.muted, lineHeight: 1.7, margin: 0 }}>{vc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Renewal checklist */}
              <div style={{ background: T.titleblue, borderRadius: 12, padding: 28 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 6 }}>🔄 Certification Renewal Made Simple</div>
                <p style={{ fontFamily: T.sans, fontSize: 13.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 18 }}>
                  Certification renewal requires a valid, current test report. Common challenges our clients face at renewal time:
                </p>
                {[
                  "Tracking test report and certification expiry dates across multiple models",
                  "Standard updates requiring fresh testing even with unchanged products",
                  "Lab accreditation scope changes affecting report validity at renewal",
                  "Hardware revisions that were not flagged as requiring retesting",
                  "Certification authority query responses within tight renewal deadlines",
                  "Managing renewals for large product portfolios with many SKUs",
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
      <section className="sec" style={{background:T.cream}}>
        <div className="inner">
          <div style={{
            display:"grid",
            gridTemplateColumns:"1fr 1fr",
            borderRadius:14,
            overflow:"hidden",
            border:`1px solid ${T.border}`,
            minHeight:440,
          }} className="faq-grid">
            <div style={{position:"relative",minHeight:250,overflow:"hidden"}}>
              <img
                src="/finalimages/faq10.jpg"
                alt="Testing FAQ"
                style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center 30%"}}
              />
            </div>
            <div style={{background:T.white,padding:"28px 24px",borderLeft:`1px solid ${T.border}`}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <div style={{width:22,height:1.5,background:T.teal}}/>
                <span style={{fontFamily:T.poppins,fontSize:10.5,fontWeight:600,color:T.teal,letterSpacing:"0.13em",textTransform:"uppercase"}}>Frequently Asked</span>
              </div>
              <h3 style={{fontFamily:T.poppins,fontSize:35,fontWeight:600,color:T.titleblue,marginBottom:20}}>Testing FAQs</h3>
              <div ref={faqRef}>
                {faqs.map((faq)=>(
                  <FaqItem key={faq.q} faq={faq}/>
                ))}
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
              <h2 style={{fontFamily:T.poppins,fontSize:"clamp(1.9rem,3.2vw,2.9rem)",color:T.titleblue,fontWeight:700,lineHeight:1.1,letterSpacing:"-0.01em",marginBottom:14}}>Start Your Product Testing Today</h2>
              <p style={{fontFamily:T.sans,color:T.paradark,fontSize:14.5,lineHeight:1.8}}>Don't let lab delays slow down your certification. Let our experts coordinate the entire testing process.<br/>Free consultation. Clear timeline. Transparent pricing.</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12,flexShrink:0}}>
              <button onClick={()=>router.push("/contact")}
                style={{padding:"14px 36px",fontFamily:T.poppins,fontSize:14,fontWeight:600,border:"none",borderRadius:6,cursor:"pointer",background:T.orange,color:"#fff",whiteSpace:"nowrap",transition:"all 0.22s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=T.teal;e.currentTarget.style.transform="translateY(-1px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background=T.orange;e.currentTarget.style.transform="translateY(0)";}}>Get Free Consultation</button>
              <a href="tel:+919891229135"
                style={{padding:"13px 28px",border:`1.5px solid ${T.border}`,borderRadius:6,fontFamily:T.poppins,fontSize:14,fontWeight:500,color:T.slate,display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:T.white,transition:"border-color 0.2s"}}
                onMouseEnter={e=>e.currentTarget.style.borderColor=T.teal}
                onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>📞 +91-9891229135</a>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}