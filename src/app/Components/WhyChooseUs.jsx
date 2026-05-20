"use client";
import { useRef, useEffect, useState } from "react";

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

const whyUs = [
  {
    icon: "🛡️",
    title: "Trusted & Experienced",
    desc: "12+ years and 10,000+ successful certifications across every major Indian regulatory framework.",
    stat: "12+",
    statLabel: "Years",
  },
  {
    icon: "⚡",
    title: "Fast Turnaround",
    desc: "Dedicated managers and streamlined processes ensure the fastest-possible approval timelines.",
    stat: "48hr",
    statLabel: "Response",
  },
  {
    icon: "🕐",
    title: "24 / 7 Expert Support",
    desc: "Our compliance experts are available round-the-clock via call, WhatsApp, or email.",
    stat: "24/7",
    statLabel: "Available",
  },
  {
    icon: "💰",
    title: "Transparent Pricing",
    desc: "Fixed pricing, no hidden charges, clear milestones from day one.",
    stat: "0",
    statLabel: "Hidden Fees",
  },
  {
    icon: "📋",
    title: "End-to-End Service",
    desc: "From documentation and lab testing to final certificate delivery — we manage everything.",
    stat: "50+",
    statLabel: "Services",
  },
  {
    icon: "🏆",
    title: "0% Failure Rate",
    desc: "Meticulous preparation and regulatory expertise means your application succeeds first time.",
    stat: "0%",
    statLabel: "Failure",
  },
];

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Outfit', system-ui, sans-serif";
const teal = "#1E88C8";
const tealDk = "#1567A0";
const navy = "#0D1B2A";
const orange = "#F97316";
const titleblue = "#0a6daa";

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

export default function WhyChooseUs() {
  const introRef = useReveal();
  const gridRef = useReveal({ stagger: true, baseDelay: 80 });

  return (
    <section style={{ background: "#f4f8fc", fontFamily: sans, overflow: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Outfit:wght@400;500;600;700&display=swap');

        /* ── Background decoration ── */
        .wcu-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(30,136,200,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,136,200,0.035) 1px, transparent 1px);
          background-size: 52px 52px;
        }
        .wcu-bg-orb1 {
          position: absolute; top: -100px; right: -80px;
          width: 380px; height: 380px; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(30,136,200,0.07) 0%, transparent 70%);
        }
        .wcu-bg-orb2 {
          position: absolute; bottom: -80px; left: -60px;
          width: 300px; height: 300px; border-radius: 50%; pointer-events: none;
          background: radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%);
        }

        /* ── Top intro split ── */
        .wcu-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          padding: clamp(52px,7vw,88px) clamp(20px,5vw,64px) clamp(40px,5vw,64px);
          max-width: 1200px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }
        @media(max-width:860px){ .wcu-intro { grid-template-columns:1fr; gap:36px; } }

        /* ── Image panel ── */
        .wcu-img-wrap {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          height: 300px;
          box-shadow: 0 24px 64px rgba(13,27,42,0.14);
        }
        .wcu-img-wrap img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center 38%;
          transition: transform 7s ease;
        }
        .wcu-img-wrap:hover img { transform: scale(1.04); }
        .wcu-img-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(21,103,160,0.80) 0%, rgba(13,27,42,0.65) 100%);
        }

        /* Stats inside image */
        .wcu-img-stats {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center; gap: 0;
        }
        .wcu-img-stat {
          text-align: center; padding: 0 32px;
          border-right: 1px solid rgba(255,255,255,0.14);
          transition: transform 0.25s;
        }
        .wcu-img-stat:last-child { border-right: none; }
        .wcu-img-stat:hover { transform: translateY(-3px); }
        .wcu-img-stat-val {
          font-family: ${serif}; font-size: clamp(1.8rem,3vw,2.6rem);
          font-weight: 700; color: ${orange}; line-height: 1; margin-bottom: 6px;
        }
        .wcu-img-stat-lbl {
          font-size: 11.5px; font-weight: 600; color: rgba(255,255,255,0.7);
          letter-spacing: 0.06em; text-transform: uppercase;
        }

        /* Corner ribbon */
        .wcu-ribbon {
          position: absolute; top: 18px; left: 18px;
          background: ${orange}; color: #fff;
          font-size: 10px; font-weight: 800; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 5px 12px; border-radius: 4px;
          box-shadow: 0 4px 14px rgba(249,115,22,0.35);
          font-family: ${T.poppins};
        }

        /* ── Content side ── */
        .wcu-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 5px 14px; border-radius: 999px;
          background: rgba(30,136,200,0.08);
          border: 1px solid rgba(30,136,200,0.2);
          margin-bottom: 18px;
        }
        .wcu-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: ${teal}; }
        .wcu-eyebrow-text {
          font-size: 10.5px; font-weight: 700; color: ${teal};
          letter-spacing: 0.13em; text-transform: uppercase;
        }

        .wcu-title {
            font-family: ${T.poppins};
          font-size: clamp(1.9rem,3vw,2.8rem);
          font-weight: 700; color: ${titleblue};
          line-height: 1.1; margin: 0 0 14px;
          letter-spacing: -0.01em;
        }

        .wcu-underline { display: flex; gap: 5px; align-items: center; margin-bottom: 18px; }

        .wcu-desc {
          font-size: 16.5px; color: T.para;
          line-height: 1.82; font-weight: 400; max-width: 420px; text-align: justify;
        }

        /* ── Cards grid ── */
        .wcu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 0 clamp(20px,5vw,64px) clamp(52px,7vw,80px);
          max-width: 1200px;
          margin: 0 auto;
          position: relative; z-index: 1;
        }
        @media(max-width:900px){ .wcu-grid { grid-template-columns: repeat(2,1fr); } }
        @media(max-width:560px){ .wcu-grid { grid-template-columns: 1fr; } }

        /* ── Card ── */
        .wcu-card {
          background: #fff;
          border-radius: 14px;
          padding: 26px 24px 24px;
          border: 1px solid rgba(30,136,200,0.1);
          box-shadow: 0 2px 16px rgba(13,27,42,0.05);
          position: relative; overflow: hidden;
          transition: transform 0.26s cubic-bezier(.22,1,.36,1),
                      box-shadow 0.26s ease,
                      border-color 0.26s ease;
          display: flex; flex-direction: column; gap: 0;
        }
        .wcu-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 52px rgba(30,136,200,0.14);
          border-color: rgba(30,136,200,0.3);
        }

        /* Top accent bar */
        .wcu-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, ${teal}, ${orange});
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.35s cubic-bezier(.22,1,.36,1);
        }
        .wcu-card:hover::before { transform: scaleX(1); }

        /* Diagonal shine */
        .wcu-card::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(30,136,200,0.04) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.3s;
          pointer-events: none;
        }
        .wcu-card:hover::after { opacity: 1; }

        /* Card header row */
        .wcu-card-header {
          display: flex; align-items: flex-start;
          justify-content: space-between; margin-bottom: 16px;
        }

        /* Icon box */
        .wcu-icon-box {
          width: 48px; height: 48px; border-radius: 12px;
          background: rgba(30,136,200,0.08);
          border: 1px solid rgba(30,136,200,0.14);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; flex-shrink: 0;
          transition: background 0.25s, transform 0.3s cubic-bezier(.34,1.56,.64,1);
        }
        .wcu-card:hover .wcu-icon-box {
          background: ${teal}; transform: scale(1.12) rotate(-5deg);
        }

        /* Stat badge */
        .wcu-stat-badge {
          text-align: right; flex-shrink: 0;
        }
        .wcu-stat-val {
           font-family: ${T.poppins};
          font-size: 22px; font-weight: 700;
          color: ${teal}; line-height: 1;
          transition: color 0.2s;
        }
        .wcu-card:hover .wcu-stat-val { color: ${orange}; }
        .wcu-stat-lbl {
          font-size: 10px; color: rgba(0,0,0,0.38); font-weight: 500;
          letter-spacing: 0.04em; margin-top: 2px;
            font-family: ${T.poppins};
        }

        /* Card text */
        .wcu-card-title {
          font-family: ${T.poppins};
          font-size: 21px; font-weight: 700;
          color: ${T.titleblue}; margin: 0 0 8px; line-height: 1.25;
          transition: color 0.2s;
        }
        .wcu-card:hover .wcu-card-title { color: ${tealDk}; }

        .wcu-card-desc {
          font-size: 14px; color: rgba(0, 0, 0, 0.72);
           font-family: ${T.poppins};
          line-height: 1.72; font-weight: 400; flex: 1; text-align: justify;
        }

        /* Bottom divider + learn more */
        .wcu-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 18px; padding-top: 14px;
          border-top: 1px solid rgba(30,136,200,0.08);
        }
        .wcu-card-dots { display: flex; gap: 4px; }
        .wcu-card-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: rgba(30,136,200,0.2);
          transition: background 0.2s;
        }
        .wcu-card:hover .wcu-card-dot { background: ${teal}; }
        .wcu-card-dot:nth-child(2) { opacity: 0.6; }
        .wcu-card-dot:nth-child(3) { opacity: 0.3; }

        .wcu-card-arrow {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1px solid rgba(30,136,200,0.18);
          background: rgba(30,136,200,0.05);
          display: flex; align-items: center; justify-content: center;
          color: ${teal}; font-size: 12px;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .wcu-card:hover .wcu-card-arrow {
          background: ${teal}; border-color: ${teal}; color: #fff;
          transform: rotate(45deg);
        }
      `}</style>

      {/* Background */}
      <div className="wcu-bg-grid" />
      <div className="wcu-bg-orb1" />
      <div className="wcu-bg-orb2" />

      {/* ── Intro split ── */}
      <div className="wcu-intro reveal" ref={introRef}>

        {/* Left: image with overlaid stats */}
        <div className="wcu-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85&fit=crop"
            alt="SIACC team"
          />
          <div className="wcu-img-overlay" />
          <div className="wcu-ribbon">The SIACC Difference</div>
          <div className="wcu-img-stats">
            {[{ v: "100+", l: "Experts" }, { v: "1000+", l: "Domains" }, { v: "12+", l: "Years" }].map((s) => (
              <div key={s.l} className="wcu-img-stat">
                <div className="wcu-img-stat-val">{s.v}</div>
                <div className="wcu-img-stat-lbl">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: text */}
        <div>
          <div className="wcu-eyebrow">
            <span className="wcu-eyebrow-dot" />
            <span className="wcu-eyebrow-text">Our Expertise</span>
          </div>

          <h2 className="wcu-title">
            The SIACC Difference
          </h2>

          <div className="wcu-underline">
            <div style={{ width: 32, height: 3, borderRadius: 99, background: orange }} />
            <div style={{ width: 9, height: 3, borderRadius: 99, background: teal }} />
            <div style={{ width: 4, height: 3, borderRadius: 99, background: "rgba(30,136,200,0.25)" }} />
          </div>

          <p className="wcu-desc">
            We simplify even the most complex certification processes with reliable service, expert consultation,
            and dedicated client support — ensuring smooth approvals and complete peace of mind.
          </p>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div className="wcu-grid" ref={gridRef}>
        {whyUs.map((w, i) => (
          <div key={w.title} className={`wcu-card reveal d${i}`}>

            {/* Header: icon + stat */}
            <div className="wcu-card-header">
              <div className="wcu-icon-box">{w.icon}</div>
              <div className="wcu-stat-badge">
                <div className="wcu-stat-val">{w.stat}</div>
                <div className="wcu-stat-lbl">{w.statLabel}</div>
              </div>
            </div>

            {/* Text */}
            <h3 className="wcu-card-title">{w.title}</h3>
            <p className="wcu-card-desc">{w.desc}</p>

            {/* Footer */}
            <div className="wcu-card-footer">
              <div className="wcu-card-dots">
                <div className="wcu-card-dot" />
                <div className="wcu-card-dot" />
                <div className="wcu-card-dot" />
              </div>
             
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}