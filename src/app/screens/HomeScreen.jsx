"use client";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "../animations.css";

// Critical above-fold — load immediately
import Navbar from "../Components/Navbar";
import HeroSlider from "../Components/HeroSlider";

// Below-fold — lazy loaded
const Footer = dynamic(() => import("../Components/Footer"));
const WhyDecisionHome = dynamic(() => import("../Components/WhyDecisionHome"));
const OurServicesHome = dynamic(() => import("../Components/OurServicesHome"));
const HowItWorks = dynamic(() => import("../Components/HowItWorks"));
const IndustriesWeServe = dynamic(() => import("../Components/IndustriesWeServe"));
const ClientStories = dynamic(() => import("../Components/ClientStories"));
const WhyChooseUs = dynamic(() => import("../Components/WhyChooseUs"));
const BlogHome = dynamic(() => import("../Components/BlogHome"));

const T = {
  teal: "#1E88C8",
  titleblue: "#0a6daa",
  para: "#080000b0", paradark: "#080000c4",
  tealDark: "#074D4D",
  tealMid: "#0E8080",
  tealLight: "#EBF5F5",
  tealGhost: "#F4FAFA",
  amber: "#C8780A",
  amberLight: "#FEF3DC",
  amberDark: "#9A5C06",
  slate: "#0D1B2A",
  slateMid: "#1C3144",
  body: "#2D3748",
  muted: "#718096",
  subtle: "#A0AEC0",
  border: "#E8E3DA",
  borderLight: "#F0ECE5",
  white: "#FFFFFF",
  cream: "#FAF8F4",
  creamMid: "#F3EFE8",
  serif: "'Cormorant Garamond', 'Georgia', serif",
  sans: "'Outfit', 'system-ui', sans-serif",
  poppins: "'Poppins', 'system-ui', sans-serif",
};

function useReveal(opts = {}) {
  const { threshold = 0.15, stagger = false, baseDelay = 90, once = true } = opts;
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (stagger) {
        Array.from(el.children).forEach((child, i) => {
          child.style.transitionDelay = i * baseDelay + "ms";
          child.classList.add("revealed");
        });
      } else {
        el.classList.add("revealed");
      }
      if (once) obs.unobserve(el);
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, stagger, baseDelay, once]);
  return ref;
}

const ticker = [
  {
    text: "Guidelines for Implementation of Revised Standards for LED Luminaires",
    url: "https://www.crsbis.in/BIS/app_srv/tdc/gl/docs/Guidelines_for_Implementation_of_Revised_Standards_for_LED_Luminaires.pdf"
  },
  {
    text: "Guidelines for Implementation of Extended Reality Products (Augmented Reality, Virtual Reality, Mixed Reality etc.) as per IS/IEC 62368-1:2023",
    url: "https://www.crsbis.in/BIS/app_srv/tdc/gl/docs/Guidelines_for_Implementation_of_Extended_Reality_Products_(AugmentedReality_VirtualReality_MixedReality_etc).pdf"
  },
  {
    text: "Guidelines for Implementation of Migration to IS/IEC 62368-1:2023",
    url: "https://www.crsbis.in/BIS/app_srv/tdc/gl/docs/Guidelines_for_Implementation_of_Migration_to_62368_1_2023.pdf"
  },
  {
    text: "Guidelines for implementation of IS 16102 (Part 1):2026",
    url: "https://www.crsbis.in/BIS/app_srv/tdc/gl/docs/IS_16102_Part_1_guidelines.pdf"
  },
  {
    text: "Guidelines for verification of rated capacity for portable sealed secondary Lithium Cells and Batteries",
    url: "https://www.crsbis.in/BIS/app_srv/tdc/gl/docs/guidelines_for_rated_capacity.pdf"
  },
];

const stats = [
  { v: "12+", l: "Years of Excellence" },
  { v: "10,000+", l: "Certifications Issued" },
  { v: "50+", l: "Services & Domains" },
  { v: "0%", l: "Failure Rate" },
];

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <div style={{ width: 28, height: 1.5, background: T.teal }} />
      <span style={{ fontFamily: T.sans, fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: T.teal }}>
        {children}
      </span>
    </div>
  );
}

function PrimaryBtn({ children, onClick, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "13px 32px", fontFamily: T.sans, fontSize: 13.5, fontWeight: 600,
        letterSpacing: "0.02em", border: "none", borderRadius: 6, cursor: "pointer",
        background: hov ? T.teal : "#F97316", color: "#fff",
        boxShadow: hov ? `0 8px 28px rgba(10,104,104,0.38)` : `0 4px 16px rgba(10,104,104,0.22)`,
        transform: hov ? "translateY(-1px)" : "translateY(0)",
        transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

function OutlineBtnTransparent({ children, onClick, style = {} }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "12px 28px", fontFamily: T.sans, fontSize: 13.5, fontWeight: 600,
        letterSpacing: "0.02em", borderRadius: 6, cursor: "pointer",
        border: `1.5px solid ${hov ? T.teal : T.border}`,
        color: "#383737",
        background: hov ? "#F97316" : "transparent",
        transition: "all 0.22s cubic-bezier(0.4,0,0.2,1)",
        display: "inline-flex", alignItems: "center",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  const statsRef = useReveal({ stagger: true, baseDelay: 100 });
  const aboutImgRef = useReveal();
  const aboutTxtRef = useReveal();
  const miniStatsRef = useReveal({ stagger: true, baseDelay: 80 });
  const ctaRef = useReveal();

  return (
    <div style={{ minHeight: "100vh", background: T.white, fontFamily: T.sans, color: T.body, paddingTop: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        html, body { margin: 0; padding: 0; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        img { max-width: 100%; display: block; }
        a { text-decoration: none; color: inherit; }
        .sec   { padding: clamp(64px,8vw,104px) clamp(16px,5vw,56px); }
        .inner { max-width: 1280px; margin: 0 auto; }
        .stats-band  { display: grid; grid-template-columns: repeat(4,1fr); }
        .about-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .mini-stats  { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 32px; }
        .cta-split   { display: grid; grid-template-columns: 1fr auto; gap: 40px; align-items: center; }
        .about-img-wrap { position: relative; }
        @media(max-width:640px)  { .stats-band { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:860px)  { .about-grid { grid-template-columns: 1fr; gap: 48px; } }
        @media(max-width:480px)  { .mini-stats { grid-template-columns: 1fr; } }
        @media(max-width:720px)  { .cta-split  { grid-template-columns: 1fr; gap: 28px; } }
      `}</style>

      <Navbar />

      {/* ══ NEWS TICKER ══ */}
      <div
        style={{
          background: T.teal,
          overflow: "hidden",
          padding: "9px 0",
          display: "flex",
          alignItems: "center",
          margin: 0,
        }}
      >
        <div style={{
          flexShrink: 0, background: "#F97316", color: "#fff", fontSize: 10,
          fontWeight: 800, letterSpacing: "0.12em", padding: "4px 14px",
          margin: "0 14px 0 16px", borderRadius: 3, whiteSpace: "nowrap", fontFamily: T.sans,
        }}>
          LIVE UPDATES
        </div>
        <div style={{ overflow: "hidden", flex: 1 }}>
          <div className="anim-ticker" style={{ display: "inline-flex", whiteSpace: "nowrap" }}>
            {[...ticker, ...ticker].map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 500, color: "#fff", padding: "0 48px", display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none", cursor: "pointer", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#FDE68A"} onMouseLeave={e => e.currentTarget.style.color = "#fff"}>
                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 9 }}>◆</span>
                {item.text}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══ HERO SLIDER ══ */}
      <HeroSlider />

      {/* ══ STATS BAND ══ */}
      <div style={{ background: T.teal }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="stats-band" ref={statsRef}>
            {stats.map((s, i) => (
              <div key={s.l} className={`stat-cell reveal d${i}`} style={{
                textAlign: "center", padding: "36px 16px",
                borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}>
                <div className="anim-count-up" style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,2.8vw,2.8rem)", color: "#fff", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.01em" }}>
                  {s.v}
                </div>
                <div style={{ fontFamily: T.poppins, fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 8, letterSpacing: "0.04em" }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ABOUT ══ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div className="about-grid">
            <div className="about-img-wrap reveal-left" ref={aboutImgRef}>
              <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=720&q=85&fit=crop"
                alt="SIACC consultants at work"
                width={720}
                height={480}
                style={{ width: "100%", height: "clamp(300px,42vw,480px)", objectFit: "cover", borderRadius: 10, boxShadow: "0 24px 64px rgba(0,0,0,0.10)" }}
                unoptimized
              />
              <div className="float-card" style={{
                position: "absolute", bottom: -16, right: -12,
                background: T.white, borderRadius: 8, padding: "20px 26px",
                boxShadow: "0 16px 48px rgba(0,0,0,0.11)", border: `1px solid ${T.tealLight}`,
              }}>
                <div style={{ fontFamily: T.poppins, fontSize: 30, color: T.teal, fontWeight: 700, lineHeight: 1 }}>10K+</div>
                <div style={{ fontFamily: T.poppins, fontSize: 13, color: "#000000d7", marginTop: 4 }}>Clients Served</div>
              </div>
              <div style={{ position: "absolute", top: 20, left: 20, background: T.teal, borderRadius: 4, padding: "7px 16px" }}>
                <span style={{ fontFamily: T.poppins, fontWeight: 700, fontSize: 13, color: "#000000d7", letterSpacing: "0.1em" }}>SINCE 2015</span>
              </div>
            </div>

            <div className="reveal-right" ref={aboutTxtRef}>
              <SectionLabel>About SIACC</SectionLabel>
              <h2 style={{ fontFamily: T.poppins, fontSize: 38, color: T.titleblue, fontWeight: 700, marginBottom: 20, lineHeight: 1.22, letterSpacing: "-0.01em" }}>
                India's Leading<br />Compliance Consultants
              </h2>
              <p style={{ fontFamily: T.poppins, fontWeight: 500, fontSize: 15, color: T.para, lineHeight: 1.9, marginBottom: 14, textAlign: "justify" }}>
                Star India Accreditation (SIACC) is a trusted name with over 12+ years of experience in BIS, EPR, WPC, TEC, BEE and ISO certifications. We deliver fast, reliable, and cost-effective regulatory approvals for Indian and foreign manufacturers and importers.
              </p>
              <p style={{ fontFamily: T.poppins, fontWeight: 500, fontSize: 15, color: T.para, lineHeight: 1.9, marginBottom: 32, textAlign: "justify" }}>
                With a deep understanding of Indian regulatory standards, we help businesses achieve full compliance — reducing delays, avoiding penalties, and speeding up market entry.
              </p>
              <div className="mini-stats" ref={miniStatsRef}>
                {[
                  { n: "12+", l: "Years Experience" },
                  { n: "100+", l: "Expert Team" },
                  { n: "25+", l: "Countries Served" },
                  { n: "50+", l: "Services Covered" },
                ].map((s, i) => (
                  <div key={s.l} className={`reveal d${i}`} style={{ padding: "16px 20px", background: T.white, borderRadius: 8, border: `1px solid ${T.border}`, borderLeft: `3px solid ${T.teal}` }}>
                    <div style={{ fontFamily: T.poppins, fontSize: 26, color: T.teal, fontWeight: 700, lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontFamily: T.poppins, fontSize: 14, color: T.para, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <PrimaryBtn onClick={() => router.push("/about")}>Our Story →</PrimaryBtn>
                <OutlineBtnTransparent onClick={() => router.push("/contact")}>Free Consultation</OutlineBtnTransparent>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <OurServicesHome />

      {/* ══ WHY DECISION ══ */}
      <WhyDecisionHome />

      {/* ══ WHY CHOOSE US ══ */}
      <WhyChooseUs />

      {/* ══ HOW IT WORKS ══ */}
      <HowItWorks />

      {/* ══ INDUSTRIES WE SERVE ══ */}
      <IndustriesWeServe />

      {/* ══ CLIENT STORIES ══ */}
      <ClientStories />

      {/* ══ BLOG ══ */}
      <BlogHome />

      {/* ══ CTA BAND ══ */}
      <section
        className="reveal"
        ref={ctaRef}
        style={{ background: "#EBF5FB", borderTop: "1px solid #C8DFF0", borderBottom: "1px solid #C8DFF0", padding: "80px clamp(16px,5vw,56px)" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="cta-split">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 28, height: 1.5, background: T.teal }} />
                <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: T.teal }}>Start Today</span>
              </div>
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.9rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 14 }}>
                Begin Your Certification<br />Journey with SIACC
              </h2>
              <p style={{ fontFamily: T.sans, color: T.para, fontSize: 16, lineHeight: 1.8 }}>
                Free consultation. Clear timeline. Transparent pricing.<br />Our experts respond within 2 hours.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
              <button
                onClick={() => router.push("/contact")}
                style={{ padding: "14px 36px", fontFamily: T.sans, fontSize: 14, fontWeight: 600, letterSpacing: "0.02em", border: "none", borderRadius: 6, cursor: "pointer", background: "#F97316", color: "#fff", whiteSpace: "nowrap", transition: "background 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = T.teal; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#F97316"; }}
              >
                Get Free Consultation
              </button>
              <a
                href="tel:+919891229135"
                style={{ padding: "13px 28px", border: `1.5px solid ${T.border}`, borderRadius: 6, fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.slate, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, whiteSpace: "nowrap", background: T.white, transition: "border-color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.teal; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.border; }}
              >
                📞 +91-9891229135
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div >
  );
}