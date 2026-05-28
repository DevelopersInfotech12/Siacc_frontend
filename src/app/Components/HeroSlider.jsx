"use client";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const T = {
  teal: "#1E88C8",
  tealDark: "#1567A0",
  titleblue: "#0a6daa",
  para: "#080000b0",
  tealLight: "#EBF5FB",
  tealBorder: "#B5D4F4",
  orange: "#F97316",
  orangeDark: "#EA6A0A",
  navy: "#0D1B2A",
  body: "#2D3748",
  muted: "#718096",
  subtle: "#A0AEC0",
  border: "#E8E3DA",
  borderLight: "#F0ECE5",
  white: "#FFFFFF",
  offWhite: "#F9FAFB",
  serif: "'Cormorant Garamond', 'Georgia', serif",
  sans: "'Outfit', 'system-ui', sans-serif",
  poppins: "'Poppins', 'system-ui', sans-serif",
};

const slides = [
  {
    id: "bis-crs", tag: "BIS — CRS", shortTag: "CRS",
    title: "BIS CRS Registration",
    sub: "Compulsory Registration Scheme for Electronics",
    desc: "Mandatory registration for 70+ electronic & IT product categories including mobiles, laptops, LED lights, chargers, and power banks. We handle lab coordination, BIS portal filing, and follow-up until your R-number is issued.",
    s1: { v: "70+", l: "Product categories" }, s2: { v: "4–8 wk", l: "Typical timeline" },
    href: "/bis-crs", img: "/images/bis2.png",
  },
  {
    id: "bis-isi", tag: "BIS — ISI", shortTag: "ISI",
    title: "BIS ISI Mark Certification",
    sub: "Quality Mark for Manufactured Goods",
    desc: "Mandatory for 370+ product categories including steel, cement, electrical goods, LPG cylinders and building materials. We manage lab testing, factory inspection preparation, and full BIS license application end-to-end.",
    s1: { v: "370+", l: "Product categories" }, s2: { v: "8–12 wk", l: "Typical timeline" },
    href: "/bis-isi", img: "/finalimages/siaccbis.png",
  },
  {
    id: "wpc", tag: "WPC — ETA", shortTag: "WPC",
    title: "WPC-ETA Approval",
    sub: "Wireless Planning & Coordination",
    desc: "Mandatory for all wireless, Bluetooth, Wi-Fi, Zigbee and RF devices imported or sold in India. Filed via the Saralsanchar portal. We handle documentation, testing coordination and end-to-end follow-up with WPC authorities.",
    s1: { v: "5 yrs", l: "Approval validity" }, s2: { v: "4–8 wk", l: "Typical timeline" },
    href: "/wpc", img: "/images/WPC.png",
  },
  {
    id: "testing", tag: "Testing", shortTag: "Testing",
    title: "Testing & Certification",
    sub: "NABL / BIS / TEC Accredited Labs",
    desc: "End-to-end lab testing for all certifications — product safety, EMC, RF and chemical analysis. 50+ partner labs across India ensure the fastest turnaround for electronics, textiles, chemicals and food products.",
    s1: { v: "50+", l: "Lab partners" }, s2: { v: "1–8 wk", l: "Turnaround time" },
    href: "/testing", img: "/images/testing.png",
  },
  {
    id: "bee", tag: "BEE", shortTag: "BEE",
    title: "BEE Star Rating",
    sub: "Bureau of Energy Efficiency",
    desc: "Mandatory star labelling for ACs, refrigerators, washing machines, geysers and fans. Both voluntary and mandatory BEE schemes covered. We manage lab coordination, filing, and certificate renewal end-to-end.",
    s1: { v: "20+", l: "Product categories" }, s2: { v: "4–6 wk", l: "Typical timeline" },
    href: "/bee", img: "/images/bee1.png",
  },
  {
    id: "iso", tag: "ISO", shortTag: "ISO",
    title: "ISO Certification",
    sub: "International Organization for Standardization",
    desc: "ISO 9001, 14001, 45001, 27001, 22000 and more. Globally recognized standards required for government tenders, exports and enterprise contracts. We handle gap analysis, documentation, audits and certificate issuance.",
    s1: { v: "3 yrs", l: "Certificate validity" }, s2: { v: "2–4 mo", l: "Typical timeline" },
    href: "/iso", img: "/finalimages/siacciso.png",
  },
  {
    id: "epr", tag: "EPR", shortTag: "EPR",
    title: "EPR Registration",
    sub: "Extended Producer Responsibility",
    desc: "Mandatory for producers, importers and brand owners of e-waste, plastic packaging, batteries and tyres under CPCB guidelines. We handle portal registration, PRO empanelment, annual filing and compliance reporting.",
    s1: { v: "4 categories", l: "Waste streams covered" }, s2: { v: "3–6 wk", l: "Typical timeline" },
    href: "/epr", img: "/images/epr.png",
  },
];

const DURATION = 5500;

export default function HeroSlider() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isXS, setIsXS] = useState(false);

  useEffect(() => {
    function measure() {
      setIsMobile(window.innerWidth <= 860);
      setIsXS(window.innerWidth <= 480);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const goTo = (idx) => {
    const next = (idx + slides.length) % slides.length;
    if (next === active) return;
    setFading(true);
    setTimeout(() => { setActive(next); setFading(false); }, 320);
  };
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (!paused) timerRef.current = setInterval(() => goTo(active + 1), DURATION);
    return () => clearInterval(timerRef.current);
  }, [active, paused]);

  const s = slides[active];
  const IMG_H = isXS ? 200 : 240;

  return (
    <section
      style={{ background: T.white, borderBottom: `1px solid ${T.border}`, fontFamily: T.poppins, margin: 0, padding: 0, display: "block" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@300;400;500;600&family=Poppins:wght@300;400;500;600;700&display=swap');

        /* ── Tabs ── */
        .hs2-tabs {
          display: flex;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          background: ${T.offWhite};
          border-bottom: 1px solid ${T.border};
          margin: 0; padding: 0;
  
        }
        .hs2-tabs::-webkit-scrollbar { display: none; }
        .hs2-tab {
          padding: 12px 16px;
          font-family: ${T.poppins};
          font-size: 12px;
          font-weight: 500;
          border: none;
          border-bottom: 2px solid transparent;
          background: transparent;
          cursor: pointer;
          white-space: nowrap;
          color: ${T.muted};
          display: flex; align-items: center; gap: 6px;
          transition: color 0.2s, border-color 0.2s;
          flex-shrink: 0;
        }
        .hs2-tab.active { color: ${T.teal}; border-bottom: 2px solid ${T.teal}; font-weight: 600; }
        .hs2-tab:hover:not(.active) { color: ${T.body}; background: ${T.white}; }
        .hs2-tab-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; opacity: 0.5; flex-shrink: 0; }
        .hs2-tab.active .hs2-tab-dot { opacity: 1; background: ${T.teal}; }

        /* ── Title ── */
        .hs2-title {
          font-family: ${T.poppins};
          font-size: clamp(1.3rem, 3.5vw, 2.6rem);
          font-weight: 600;
          color: ${T.titleblue};
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin: 0 0 6px;
        }

        /* ── Subtitle ── */
        .hs2-sub {
          font-family: ${T.poppins};
          font-size: 11px;
          font-weight: 500;
          color: ${T.teal};
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0 0 12px;
        }

        /* ── Desc ── */
        .hs2-desc {
          font-family: ${T.poppins};
          font-size: 15px;
          font-weight: 500;
          color: ${T.para};
          line-height: 1.8;
          max-width: 540px;
          margin: 0;
          text-align: justify;
        }

        /* ── Pill ── */
        .hs2-pill { display:inline-flex; align-items:center; gap:7px; padding:5px 13px; border-radius:999px; border:1px solid ${T.tealBorder}; background:${T.tealLight}; margin-bottom:14px; width:fit-content; }
        .hs2-pill-dot { width:6px; height:6px; border-radius:50%; background:${T.teal}; flex-shrink:0; }
        .hs2-pill-text { font-family:${T.poppins}; font-size:10.5px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:${T.teal}; }

        /* ── Info panel ── */
        .hs2-info-panel { display:flex; flex-direction:column; gap:10px; border-top:1px solid ${T.border}; }
        .hs2-service-card { background:${T.white}; border:1px solid ${T.border}; border-left:3px solid ${T.teal}; border-radius:8px; padding:10px 14px; display:flex; align-items:center; justify-content:space-between; gap:10px; flex-wrap:wrap; }

        /* ── Stat cards ── */
        .hs2-stat-cards { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .hs2-stat-card { background:${T.white}; border:1px solid ${T.border}; border-radius:8px; padding:10px 14px; }
        .hs2-stat-val { font-family:${T.poppins}; font-size:23px; font-weight:700; line-height:1; }
        .hs2-stat-lbl { font-family:${T.poppins}; font-size:13px; font-weight:400; color:${T.muted}; margin-top:3px; }

        /* ── Trust badges ── */
        .hs2-trust-row { display:flex; gap:6px; flex-wrap:wrap; }
        .hs2-trust-badge { font-family:${T.poppins}; font-size:10px; font-weight:600; color:${T.teal}; background:${T.tealLight}; border:1px solid ${T.tealBorder}; border-radius:4px; padding:3px 9px; }

        /* ── Current service label ── */
        .hs2-svc-label { font-family:${T.poppins}; font-size:12px; font-weight:700; color:${T.subtle}; text-transform:uppercase; letter-spacing:0.1em; margin-bottom:3px; }
        .hs2-svc-title { font-family:${T.poppins}; font-size:15px; font-weight:600; color:${T.navy}; }
        .hs2-svc-sub   { font-family:${T.poppins}; font-size:13px; font-weight:500; color:${T.teal}; margin-top:2px; }

        /* ── Button ── */
        .hs2-btn { padding:10px 20px; font-family:${T.poppins}; font-size:13px; font-weight:600; border:none; border-radius:8px; cursor:pointer; color:#fff; background:${T.orange}; transition:background 0.2s; white-space:nowrap; }
        .hs2-btn:hover { background:${T.orangeDark}; }

        /* ── Image overlay ── */
        .hs2-img-overlay { position:absolute; inset:0; background:linear-gradient(to right,rgba(249,250,251,0.18) 0%,transparent 40%); pointer-events:none; }

        /* ── Counter ── */
        .hs2-counter { position:absolute; top:12px; right:12px; background:rgba(255,255,255,0.95); border:1px solid ${T.border}; border-radius:8px; padding:5px 10px; font-family:${T.poppins}; font-size:11px; font-weight:600; color:${T.navy}; letter-spacing:0.08em; z-index:2; }

        /* ── Bottom nav ── */
        .hs2-nav { display:flex; align-items:center; gap:10px; padding:10px 14px; border-top:1px solid ${T.border}; background:${T.offWhite}; flex-wrap:nowrap; overflow:hidden; }
        .hs2-dots { display:flex; gap:4px; flex:1; min-width:0; }
        .hs2-dot { height:3px; border-radius:999px; border:none; cursor:pointer; transition:all 0.32s; padding:0; flex-shrink:0; }
        .hs2-dot.active { background:${T.teal}; }
        .hs2-dot:not(.active) { background:${T.border}; }
        .hs2-nav-label { font-family:${T.poppins}; font-size:10.5px; color:${T.subtle}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:160px; flex-shrink:1; }
        .hs2-arrow { width:30px; height:30px; border-radius:7px; border:1px solid ${T.border}; background:${T.white}; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:13px; color:${T.navy}; transition:all 0.18s; flex-shrink:0; }
        .hs2-arrow:hover { border-color:${T.teal}; color:${T.teal}; background:${T.tealLight}; }

        /* ── Progress ── */
        .hs2-progress { height:2.5px; background:${T.borderLight}; overflow:hidden; }
        @keyframes hs2-fill { from{width:0%} to{width:100%} }
        .hs2-progress-fill { height:100%; background:${T.teal}; animation:hs2-fill ${DURATION}ms linear; }

        /* ── Slide animation ── */
        @keyframes hs2-rise { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        .hs2-animated { animation:hs2-rise 0.42s cubic-bezier(0.22,1,0.36,1) both; }

        /* ── Mobile: hide nav label below 400px ── */
        @media(max-width:400px) { .hs2-nav-label { display:none; } }
      `}</style>

      {/* ── Tabs ── */}
      <div className="hs2-tabs">
        {slides.map((sl, i) => (
          <button key={sl.id} className={`hs2-tab${i === active ? " active" : ""}`} onClick={() => goTo(i)}>
            <span className="hs2-tab-dot" />
            {isMobile ? sl.shortTag : sl.tag}
          </button>
        ))}
      </div>

      {/* ── Main grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        minHeight: isMobile ? "unset" : "500px",
        gap: 0,
      }}>

        {/* Content panel */}
        <div style={{
          order: isMobile ? 2 : 1,
          display: "flex", flexDirection: "column", justifyContent: "flex-start",
          padding: isXS ? "14px 14px 18px" : isMobile ? "18px 16px 22px" : "28px 28px 24px 28px",
          borderRight: isMobile ? "none" : `1px solid ${T.border}`,
          borderTop: isMobile ? `1px solid ${T.border}` : "none",
        }}>
          <div key={active} className="hs2-animated">
            {/* Pill */}
            <div className="hs2-pill">
              <span className="hs2-pill-dot" />
              <span className="hs2-pill-text">{s.tag}</span>
            </div>

            {/* Title */}
            <h1 className="hs2-title">{s.title}</h1>

            {/* Subtitle */}
            <p className="hs2-sub">{s.sub}</p>

            {/* Description */}
            <p className="hs2-desc" style={{ marginBottom: isMobile ? 14 : 22 }}>
              {s.desc}
            </p>

            {/* Info panel */}
            <div className="hs2-info-panel" style={{ marginTop: isMobile ? 14 : 22, paddingTop: isMobile ? 12 : 18 }}>

              {/* Current service card */}
              <div className="hs2-service-card" style={{ flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center" }}>
                <div>
                  <div className="hs2-svc-label">Current Service</div>
                  <div className="hs2-svc-title">{s.title}</div>
                  <div className="hs2-svc-sub">{s.sub}</div>
                </div>
                <button className="hs2-btn" style={{ width: isMobile ? "100%" : "auto", marginTop: isMobile ? 8 : 0 }} onClick={() => router.push(s.href)}>
                  Learn More →
                </button>
              </div>

              {/* Stat chips */}
              <div className="hs2-stat-cards">
                {[s.s1, s.s2].map((st, i) => (
                  <div key={i} className="hs2-stat-card" style={{ borderTop: `3px solid ${i === 0 ? T.teal : T.orange}` }}>
                    <div className="hs2-stat-val" style={{ color: i === 0 ? T.teal : T.orange }}>{st.v}</div>
                    <div className="hs2-stat-lbl">{st.l}</div>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="hs2-trust-row">
                {["✓ BIS Approved", "✓ NABL Accredited", "✓ Govt. Recognized"].map(b => (
                  <span key={b} className="c">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Image panel */}
        <div style={{
          order: isMobile ? 1 : 2,
          position: "relative", overflow: "hidden",
          height: isMobile ? `${IMG_H}px` : "auto",
          minHeight: isMobile ? `${IMG_H}px` : "400px",
          lineHeight: 0,
        }}>
          <Image src={s.img}
  alt={s.title}
  fill
  style={{ objectFit: "cover", objectPosition: "center" }}
  unoptimized
/>
          <div className="hs2-img-overlay" />
          <div className="hs2-counter">
            {String(active + 1).padStart(2, "0")}
            <span style={{ color: T.subtle, margin: "0 3px" }}>/</span>
            {String(slides.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* ── Bottom nav ── */}
      <div className="hs2-nav">
        <div className="hs2-dots">
          {slides.map((_, i) => (
            <button key={i} className={`hs2-dot${i === active ? " active" : ""}`} style={{ width: i === active ? 24 : 10 }} onClick={() => goTo(i)} />
          ))}
        </div>
        <span className="hs2-nav-label">{s.tag} — {s.sub.split(" ").slice(0, 3).join(" ")}</span>
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          <button className="hs2-arrow" onClick={prev}>←</button>
          <button className="hs2-arrow" onClick={next}>→</button>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="hs2-progress">
        {!paused && <div key={`${active}-${paused}`} className="hs2-progress-fill" />}
      </div>
    </section>
  );
}