"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";

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

const services = [
  { id: "bis-crs", title: "BIS CRS Registration", desc: "Mandatory registration for 70+ electronic & IT product categories — mobiles, laptops, LED lights, chargers, power banks. Full end-to-end support from lab to R-number.", img: "/finalimages/siaccbis.png", href: "/bis-crs", tag: "CRS", accent: "#1E88C8" },
  { id: "bis-isi", title: "BIS ISI Mark Certification", desc: "Mandatory quality mark for 370+ categories including steel, cement, electrical goods and LPG cylinders. Lab testing, factory inspection, and full BIS license handled for you.", img: "/finalimages/siaccbis.png", href: "/bis-isi", tag: "ISI", accent: "#0a6daa" },
  { id: "wpc-eta", title: "WPC-ETA Approval", desc: "Mandatory for all wireless, Bluetooth, Wi-Fi, Zigbee and RF devices imported or sold in India. Filed via the Saralsanchar portal.", img: "/finalimages/siaccwpc.png", href: "/wpc", tag: "WPC", accent: "#1567A0" },
  { id: "testing", title: "Testing & Certification", desc: "End-to-end lab testing for product safety, EMC, RF and chemical analysis. 50+ NABL / BIS / TEC accredited partner labs across India.", img: "/finalimages/siacctesting.png", href: "/testing", tag: "Testing", accent: "hsl(203, 74%, 45%)" },
  { id: "bee", title: "BEE Certification", desc: "Mandatory BEE star labelling for ACs, refrigerators, washing machines, geysers and fans. Both voluntary and mandatory schemes covered.", img: "/finalimages/siaccbee.png", href: "/bee", tag: "BEE", accent: "#F97316" },
  { id: "iso", title: "ISO Certification", desc: "ISO 9001, 14001, 45001, 27001, 22000 and more. Globally recognized standards required for government tenders, exports and enterprise contracts.", img: "/finalimages/siacciso.png", href: "/iso", tag: "ISO", accent: "#1567A0" },
  { id: "epr", title: "EPR Registration", desc: "Mandatory for producers, importers and brand owners of e-waste, plastic, batteries and tyres under CPCB guidelines. Full compliance support.", img: "/finalimages/siaccepr.png", href: "/epr", tag: "EPR", accent: "#F97316" },
  { id: "tec-mtcte", title: "TEC / MTCTE Certification", desc: "Mandatory TEC certification for telecom equipment under MTCTE. Covers routers, switches, modems and all telecom network products.", img: "/finalimages/siacctec.png", href: "/tec", tag: "TEC", accent: "#1E88C8" },
  { id: "lmpc", title: "LMPC Registration", desc: "Legal Metrology Packaged Commodity registration for importers and manufacturers. Ensures compliance with weight, measure and labelling rules.", img: "/finalimages/siacclmpc.png", href: "/lmpc", tag: "LMPC", accent: "#1567A0" },
  { id: "cdsco", title: "CDSCO / Drug License", desc: "CDSCO registration and drug license for medical devices, pharmaceuticals and cosmetics. Covers import, manufacture and sale approvals.", img: "/finalimages/siacccdsco.png", href: "/cdsco", tag: "CDSCO", accent: "#F97316" },
];

const ARROW_W = 44;

// ─── Build infinite list: clone N cards at start & end ───────────────────────
// We prepend the last `cloneCount` items and append the first `cloneCount` items.
// The real items start at index `cloneCount` in the extended array.
const CLONE_COUNT = 3; // how many to clone on each side (≥ cardsVisible)

function buildInfiniteList(items) {
  const head = items.slice(-CLONE_COUNT);  // last N → prepended
  const tail = items.slice(0, CLONE_COUNT); // first N → appended
  return [...head, ...items, ...tail];
}

const INFINITE = buildInfiniteList(services);
const REAL_START = CLONE_COUNT; // index of first real item in INFINITE

export default function OurServicesHome() {
  const router     = useRouter();
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const autoRef    = useRef(null);
  const isJumping  = useRef(false); // guard to skip transition during teleport

  const [layout, setLayout]   = useState(null);
  const [mounted, setMounted] = useState(false);

  const computeLayout = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const sectionW = el.offsetWidth;
    if (sectionW === 0) return;

    let cardsVisible, cardGap;
    if (sectionW < 540)      { cardsVisible = 1; cardGap = 0; }
    else if (sectionW < 900) { cardsVisible = 2; cardGap = 20; }
    else                     { cardsVisible = 3; cardGap = 28; }

    const arrowSpace = ARROW_W * 2 + 16;
    const available  = sectionW - arrowSpace - cardGap * (cardsVisible - 1);
    const cardWidth  = Math.max(200, Math.floor(available / cardsVisible));
    const step       = cardWidth + cardGap;

    setLayout({ cardsVisible, cardWidth, cardGap, step });
  }, []);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(computeLayout, 0);
    const ro = new ResizeObserver(computeLayout);
    if (sectionRef.current) ro.observe(sectionRef.current);
    return () => { clearTimeout(t); ro.disconnect(); };
  }, [computeLayout]);

  // ── current tracks position inside INFINITE array ──────────────────────────
  // Start at REAL_START so the first real card is shown.
  const [current, setCurrent]   = useState(REAL_START);
  const [transitioning, setTransitioning] = useState(true); // false = no CSS transition (for teleport)
  const [hoveredCard, setHoveredCard]     = useState(null);
  const touchStartX = useRef(null);

  const step      = layout?.step      ?? 328;
  const cardWidth = layout?.cardWidth ?? 300;
  const cardGap   = layout?.cardGap   ?? 28;

  // The dot indicator should show which *real* service is active (0-based)
  const realIndex = ((current - REAL_START) % services.length + services.length) % services.length;

  // ── Teleport: jump without animation when we hit a clone ──────────────────
  // After a transition ends at a clone position, instantly jump to the
  // corresponding real position.
  const onTransitionEnd = useCallback(() => {
    if (isJumping.current) return;

    const lastCloneStart  = REAL_START + services.length; // index of first tail clone
    const firstCloneEnd   = REAL_START - 1;               // index of last head clone

    if (current >= lastCloneStart) {
      // We scrolled past the last real card → teleport to the matching real card
      const offset = current - lastCloneStart;
      isJumping.current = true;
      setTransitioning(false);
      setCurrent(REAL_START + offset);
    } else if (current <= firstCloneEnd) {
      // We scrolled before the first real card → teleport to matching real card at end
      const offset = REAL_START - 1 - current;
      isJumping.current = true;
      setTransitioning(false);
      setCurrent(REAL_START + services.length - 1 - offset);
    }
  }, [current]);

  // Re-enable transition after a teleport on the next frame
  useEffect(() => {
    if (!transitioning && isJumping.current) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitioning(true);
          isJumping.current = false;
        });
      });
    }
  }, [transitioning]);

  const goTo = useCallback((index) => {
    setCurrent(index);
  }, []);

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent(c => c + 1);
    }, 3800);
  }, []);

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, [startAuto]);

  const handlePrev = () => { goTo(current - 1); startAuto(); };
  const handleNext = () => { goTo(current + 1); startAuto(); };

  const handleDot = (realIdx) => {
    goTo(REAL_START + realIdx);
    startAuto();
  };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      startAuto();
    }
    touchStartX.current = null;
  };

  const translateX = -(current * step);
  const isReady = mounted && layout !== null;

  // ─── Shared card renderer ─────────────────────────────────────────────────
  const renderCard = (s, idx) => (
    <div
      key={`${s.id}-${idx}`}
      className="oss-card"
      style={{ width: cardWidth, animationDelay: `${(idx % services.length) * 0.06}s` }}
      onMouseEnter={() => setHoveredCard(`${s.id}-${idx}`)}
      onMouseLeave={() => setHoveredCard(null)}
      onClick={() => router.push(s.href)}
    >
      <div className="oss-card-img-wrap">
        <Image src={s.img} alt={s.title} className="oss-card-img" loading="lazy" unoptimized />
        <div className="oss-img-overlay" />
        <div className="oss-card-shine" />
        <div className="oss-tag" style={{ background: `${s.accent}cc` }}>{s.tag}</div>
        <div className="oss-logo-mark">
          <svg viewBox="0 0 20 20" fill="none">
            <polygon points="10,2 18,7 18,13 10,18 2,13 2,7" stroke="#fff" strokeWidth="1.5" fill="none" />
            <text x="10" y="13" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700">SI</text>
          </svg>
          <span>Star<br />India</span>
        </div>
      </div>
      <div className="oss-card-body">
        <h3 className="oss-card-title">{s.title}</h3>
        <p className="oss-card-desc">{s.desc}</p>
        <div className="oss-card-footer">
          <button className="oss-btn" onClick={(e) => { e.stopPropagation(); router.push(s.href); }}>
            Read More
            <svg viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="oss-link-icon">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H5M12 2v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      style={{
        background: "linear-gradient(160deg,#f0f7ff 0%,#f4f8fc 50%,#eaf3fb 100%)",
        fontFamily: "'Outfit',system-ui,sans-serif",
        padding: "80px 0 88px",
        overflow: "hidden",
        position: "relative",
        minHeight: isReady ? undefined : 400,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,600&family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');

        .oss-bg-circle1{position:absolute;top:-120px;right:-80px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(30,136,200,0.07) 0%,transparent 70%);pointer-events:none;}
        .oss-bg-circle2{position:absolute;bottom:-60px;left:-100px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(249,115,22,0.06) 0%,transparent 70%);pointer-events:none;}
        .oss-bg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(30,136,200,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(30,136,200,0.04) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;}

        .oss-eyebrow{display:inline-flex;align-items:center;gap:10px;padding:6px 18px;border-radius:999px;background:rgba(30,136,200,0.08);border:1px solid rgba(30,136,200,0.18);margin-bottom:20px;}
        .oss-eyebrow-dot{width:6px;height:6px;border-radius:50%;background:#1E88C8;flex-shrink:0;box-shadow:0 0 0 3px rgba(30,136,200,0.2);}
        .oss-eyebrow-text{font-size:11px;font-weight:700;color:#1E88C8;letter-spacing:0.14em;text-transform:uppercase;}

        .oss-card{
          flex-shrink:0;
          background:#fff;
          border-radius:20px;
          overflow:hidden;
          border:1px solid rgba(30,136,200,0.1);
          cursor:pointer;
          transition:transform 0.3s cubic-bezier(.22,1,.36,1),box-shadow 0.3s,border-color 0.3s;
          display:flex;
          flex-direction:column;
          box-shadow:0 4px 24px rgba(13,27,42,0.06),0 1px 4px rgba(13,27,42,0.04);
          position:relative;
        }
        .oss-card:hover{
          transform:translateY(-6px) scale(1.01);
          box-shadow:0 20px 56px rgba(30,136,200,0.16),0 4px 14px rgba(13,27,42,0.07);
          border-color:rgba(30,136,200,0.3);
        }

        .oss-card-img-wrap{
          position:relative;
          width:100%;
          aspect-ratio:3/2;
          min-height:0;
          flex-shrink:0;
          overflow:hidden;
          background:#dbeeff;
        }
        @supports not (aspect-ratio:3/2){
          .oss-card-img-wrap{ padding-top:66.67%; }
        }

        .oss-card-img{
          position:absolute;inset:0;width:100%;height:100%;
          object-fit:cover;object-position:center;display:block;
          transition:transform 0.5s cubic-bezier(.22,1,.36,1);
        }
        .oss-card:hover .oss-card-img{transform:scale(1.08);}

        .oss-img-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,20,45,0.82) 0%,rgba(5,20,45,0.3) 45%,rgba(5,20,45,0.05) 100%);}
        .oss-card-shine{position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.12) 0%,transparent 50%);opacity:0;transition:opacity 0.3s;pointer-events:none;}
        .oss-card:hover .oss-card-shine{opacity:1;}

        .oss-tag{position:absolute;top:14px;left:14px;padding:4px 12px;border-radius:6px;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#fff;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.25);}

        .oss-logo-mark{position:absolute;top:12px;right:14px;display:flex;align-items:center;gap:5px;opacity:0.75;transition:opacity 0.2s;}
        .oss-card:hover .oss-logo-mark{opacity:1;}
        .oss-logo-mark svg{width:18px;height:18px;}
        .oss-logo-mark span{font-size:8.5px;font-weight:700;color:#fff;letter-spacing:0.05em;line-height:1.3;text-transform:uppercase;}

        .oss-card-body{padding:18px 20px 22px;flex:1;display:flex;flex-direction:column;position:relative;}
        .oss-card-body::before{content:'';position:absolute;top:0;left:20px;right:20px;height:1px;background:linear-gradient(90deg,transparent,rgba(30,136,200,0.15),transparent);}
        .oss-card-title{font-size:17px;font-weight:600;color:${T.titleblue};margin:0 0 8px;font-family:'Poppins',system-ui,sans-serif;line-height:1.35;transition:color 0.2s;}
        .oss-card:hover .oss-card-title{color:${T.teal};}
        .oss-card-desc{font-family:'Poppins',system-ui,sans-serif;font-size:14px;color:${T.para};line-height:1.7;margin:0 0 18px;flex:1;font-weight:400;text-align:justify;}
        .oss-card-footer{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:auto;}

        .oss-btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;background:#F97316;color:#fff;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;border:none;border-radius:8px;cursor:pointer;font-family:'Outfit',system-ui,sans-serif;transition:background 0.2s,transform 0.15s,box-shadow 0.2s;box-shadow:0 4px 14px rgba(249,115,22,0.28);}
        .oss-btn:hover{background:#ea6a0a;transform:translateY(-1px);box-shadow:0 6px 20px rgba(249,115,22,0.38);}
        .oss-btn svg{width:11px;height:11px;flex-shrink:0;}

        .oss-link-icon{width:34px;height:34px;border-radius:50%;border:1.5px solid rgba(30,136,200,0.2);background:rgba(30,136,200,0.05);display:flex;align-items:center;justify-content:center;color:#1E88C8;flex-shrink:0;transition:background 0.2s,border-color 0.2s,transform 0.2s;}
        .oss-card:hover .oss-link-icon{background:#1E88C8;border-color:#1E88C8;color:#fff;transform:rotate(45deg);}

        .oss-arrow{
          width:${ARROW_W}px;height:${ARROW_W}px;
          border-radius:50%;
          border:1.5px solid rgba(30,136,200,0.3);
          background:rgba(255,255,255,0.92);
          backdrop-filter:blur(8px);
          color:#1E88C8;
          display:flex;align-items:center;justify-content:center;
          cursor:pointer;
          transition:background 0.2s,color 0.2s,border-color 0.2s,transform 0.2s,box-shadow 0.2s;
          flex-shrink:0;
          box-shadow:0 2px 10px rgba(30,136,200,0.1);
          z-index:2;
        }
        .oss-arrow:hover{background:#1E88C8;color:#fff;border-color:#1E88C8;transform:scale(1.08);box-shadow:0 6px 20px rgba(30,136,200,0.3);}

        .oss-dot{height:4px;border-radius:999px;background:rgba(30,136,200,0.2);border:none;cursor:pointer;transition:background 0.28s,width 0.28s;padding:0;}
        .oss-dot.active{background:#1E88C8;}

        @keyframes oss-rise{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        .oss-card{animation:oss-rise 0.5s cubic-bezier(.22,1,.36,1) both;}

        @media(max-width:540px){
          .oss-btn{padding:8px 14px;font-size:10.5px;}
          .oss-card-body{padding:14px 16px 18px;}
          .oss-card-title{font-size:14.5px;}
          .oss-card-desc{font-size:12.5px;}
        }
      `}</style>

      <div className="oss-bg-grid" />
      <div className="oss-bg-circle1" />
      <div className="oss-bg-circle2" />

      {/* Header */}
      <div style={{ textAlign: "center", padding: "0 24px 52px", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div className="oss-eyebrow">
            <span className="oss-eyebrow-dot" />
            <span className="oss-eyebrow-text">What We Offer</span>
          </div>
        </div>
        <h2 style={{ fontFamily: T.poppins, fontSize: 40, fontWeight: 700, color: "#0a6daa", margin: "0 0 6px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Our Services
        </h2>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, margin: "14px auto 20px" }}>
          <div style={{ width: 32, height: 3, borderRadius: 99, background: "#F97316" }} />
          <div style={{ width: 8,  height: 3, borderRadius: 99, background: "#1E88C8" }} />
          <div style={{ width: 4,  height: 3, borderRadius: 99, background: "rgba(30,136,200,0.3)" }} />
        </div>
        <p style={{ fontSize: 15, color: "rgba(0,0,0,0.6)", maxWidth: 580, margin: "0 auto", lineHeight: 1.8, fontWeight: 400, fontFamily: T.poppins }}>
          At Siacc Services, we offer a complete range of certification and compliance services tailored to meet the needs of manufacturers, importers, and brand owners.
        </p>
      </div>

      {/* Slider */}
      {isReady ? (
        <div style={{ position: "relative", padding: `0 ${ARROW_W + 8}px` }}>

          {/* Viewport */}
          <div
            style={{ overflow: "hidden", borderRadius: 12, padding: "10px 0 14px" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Track — infinite list */}
            <div
              ref={trackRef}
              style={{
                display: "flex",
                gap: cardGap,
                transform: `translateX(${translateX}px)`,
                transition: transitioning ? "transform 0.48s cubic-bezier(0.4,0,0.2,1)" : "none",
                willChange: "transform",
              }}
              onTransitionEnd={onTransitionEnd}
            >
              {INFINITE.map((s, idx) => renderCard(s, idx))}
            </div>
          </div>

          {/* Prev arrow — always enabled (infinite) */}
          <button
            className="oss-arrow"
            onClick={handlePrev}
            aria-label="Previous"
            style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Next arrow — always enabled (infinite) */}
          <button
            className="oss-arrow"
            onClick={handleNext}
            aria-label="Next"
            style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      ) : (
        /* Skeleton before layout is measured */
        <div style={{ display: "flex", gap: 28, padding: "10px 60px 14px", overflow: "hidden" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ flex: "1 1 0", minWidth: 0, borderRadius: 20, background: "rgba(30,136,200,0.07)", aspectRatio: "3/4" }} />
          ))}
        </div>
      )}

      {/* Dots — based on real index */}
      {isReady && (
        <>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, marginTop: 32 }}>
            {services.map((_, i) => (
              <button
                key={i}
                className={`oss-dot${realIndex === i ? " active" : ""}`}
                style={{ width: realIndex === i ? 28 : 10 }}
                onClick={() => handleDot(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <span style={{ fontFamily: "'Outfit',system-ui,sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(30,136,200,0.6)", letterSpacing: "0.08em" }}>
              {String(realIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </span>
          </div>
        </>
      )}
    </section>
  );
}