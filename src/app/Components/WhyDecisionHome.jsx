"use client";
import { useEffect, useRef, useState } from "react";

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

const stats = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <circle cx="11" cy="10" r="4" fill="#fff" opacity="0.9" />
        <circle cx="21" cy="10" r="4" fill="#fff" opacity="0.55" />
        <path d="M2 26c0-5 4-8 9-8h10c5 0 9 3 9 8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      </svg>
    ),
    value: "12,000+",
    label: "Happy Clients",
    sub: "Across India & Abroad",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13" stroke="#fff" strokeWidth="2" opacity="0.4" />
        <path d="M10 16l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    value: "1,00,000+",
    label: "Projects Completed",
    sub: "Successfully Delivered",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l3.09 6.26L26 11.27l-5 4.87 1.18 6.86L16 19.77l-6.18 3.23L11 16.14 6 11.27l6.91-1.01L16 4z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" fill="none" opacity="0.9" />
      </svg>
    ),
    value: "0%",
    label: "Rejection Rate",
    sub: "Flawless Track Record",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
        <path d="M16 3C10 3 6 8 6 13c0 8 10 16 10 16s10-8 10-16c0-5-4-10-10-10z" stroke="#fff" strokeWidth="2" fill="none" opacity="0.85" />
        <circle cx="16" cy="13" r="3" fill="#fff" />
      </svg>
    ),
    value: "400+",
    label: "Locations Covered",
    sub: "Pan-India Network",
  },
];

function useCounter(target, duration = 1600, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const num = parseInt(target.replace(/[^0-9]/g, "")) || 0;
    if (num === 0) { setCount(0); return; }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * num));
      if (p < 1) requestAnimationFrame(step);
      else setCount(num);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function formatValue(original, count) {
  if (original === "0%") return "0%";
  const suffix = original.replace(/[0-9,]/g, "");
  if (original.includes(",")) return count.toLocaleString("en-IN") + suffix;
  return count + suffix;
}

function StatCard({ stat, active, delay }) {
  const count = useCounter(stat.value, 1600, active);
  return (
    <div className="wdh-stat" style={{ animationDelay: `${delay}ms` }}>
      <div className="wdh-stat-icon">{stat.icon}</div>
      <div className="wdh-stat-value">{formatValue(stat.value, count)}</div>
      <div className="wdh-stat-label">{stat.label}</div>
      <div className="wdh-stat-sub">{stat.sub}</div>
    </div>
  );
}

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'Outfit', system-ui, sans-serif";
const teal = "#1E88C8";
const tealDk = "#1567A0";
const navy = "#0D1B2A";
const orange = "#F97316";

export default function WhyDecisionHome() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ fontFamily: sans, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Outfit:wght@400;500;600;700&display=swap');

        /* ── Hero split ── */
        .wdh-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 380px;
          background: #fff;
        }
        @media(max-width:860px){ .wdh-hero { grid-template-columns:1fr; } }

        /* ── Left image ── */
        .wdh-img-side { position: relative; overflow: hidden; background: ${navy}; }
        .wdh-img-main {
          width: 100%; height: 100%; object-fit: cover; display: block;
          opacity: 0.82; transition: transform 7s ease;
        }
        .wdh-hero:hover .wdh-img-main { transform: scale(1.04); }
        .wdh-img-grad {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(13,27,42,0.52) 0%, rgba(30,136,200,0.15) 100%);
        }

        /* Floating badge */
        .wdh-img-badge {
          position: absolute; top: 20px; left: 20px;
          background: rgba(255,255,255,0.96);
          border-radius: 8px; padding: 8px 14px;
          display: flex; align-items: center; gap: 9px;
          box-shadow: 0 4px 18px rgba(0,0,0,0.16);
        }
        .wdh-badge-dot {
          width: 9px; height: 9px; border-radius: 50%; background: ${orange}; flex-shrink: 0;
          animation: wdh-pulse 1.8s ease-in-out infinite;
        }
        @keyframes wdh-pulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(249,115,22,0.2); }
          50%      { box-shadow: 0 0 0 7px rgba(249,115,22,0.06); }
        }
        .wdh-badge-text { font-size: 11.5px; font-weight: 700; color: ${navy}; }
        .wdh-badge-sub  { font-size: 10px; color: #64748b; margin-top: 1px; }

        /* Year pill */
        .wdh-year-pill {
          position: absolute; bottom: 20px; left: 20px;
          background: ${teal}; color: #fff;
          border-radius: 999px; padding: 5px 14px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.05em;
          box-shadow: 0 4px 14px rgba(30,136,200,0.35);
        }

        /* Floating mini img */
        .wdh-img-float {
          position: absolute; bottom: 20px; right: 20px;
          width: 110px; height: 78px; border-radius: 10px;
          overflow: hidden; border: 3px solid #fff;
          box-shadow: 0 6px 24px rgba(0,0,0,0.25);
        }
        .wdh-img-float img { width: 100%; height: 100%; object-fit: cover; }

        /* ── Right content ── */
        .wdh-content-side {
          padding: clamp(28px, 4vw, 48px) clamp(28px, 5vw, 56px);
          display: flex; flex-direction: column; justify-content: center;
          background: linear-gradient(160deg, #f8fbff 0%, #fff 60%);
          border-left: 1px solid rgba(30,136,200,0.08);
          position: relative; overflow: hidden;
        }
        .wdh-content-side::before {
          content: ''; position: absolute; top: -70px; right: -70px;
          width: 260px; height: 260px; border-radius: 50%;
          background: radial-gradient(circle, rgba(30,136,200,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* eyebrow */
        .wdh-eyebrow {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 4px 13px; border-radius: 999px;
          background: rgba(30,136,200,0.08);
          border: 1px solid rgba(30,136,200,0.18);
          margin-bottom: 16px; width: fit-content;
        }
        .wdh-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: ${teal}; }
        .wdh-eyebrow-text { font-size: 10.5px; font-weight: 700; color: ${teal}; letter-spacing: 0.12em; text-transform: uppercase; }

        .wdh-main-title {
          font-family: ${T.poppins};
          font-size: clamp(1.75rem, 3vw, 2.6rem);
          font-weight: 700; color: ${navy};
          line-height: 1.12; margin: 0 0 14px;
          position: relative; z-index: 1;
        }
        .wdh-main-title  { color: ${teal}; }

        .wdh-underline {
          display: flex; gap: 5px; align-items: center; margin-bottom: 16px;
        }

        .wdh-desc {
          font-size: 15px; color: T.para;
          line-height: 1.75; font-weight: 400;
          max-width: 470px; margin-bottom: 20px;
          position: relative; z-index: 1;
           font-family: ${T.poppins};
        }

        /* Features */
        .wdh-features { display: flex; flex-direction: column; gap: 9px; position: relative; z-index: 1; }
        .wdh-feat { display: flex; align-items: flex-start; gap: 10px; }
        .wdh-feat-icon {
          width: 20px; height: 20px; border-radius: 5px;
          background: rgba(30,136,200,0.1); border: 1px solid rgba(30,136,200,0.2);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 1px;
        }
        .wdh-feat-text { font-size: 15px; color: #374151; font-weight: 600; font-family: ${T.poppins}; }
        .wdh-feat-sub  { font-size: 13px; color: T.para; font-weight: 400; font-family: ${T.poppins} }

        /* ── Stats bar ── */
        .wdh-stats-bar {
          background: linear-gradient(100deg, ${navy} 0%, ${tealDk} 50%, ${teal} 100%);
          position: relative; overflow: hidden;
        }
        .wdh-stats-bar::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            radial-gradient(circle at 15% 50%, rgba(255,255,255,0.04) 0%, transparent 50%),
            radial-gradient(circle at 85% 50%, rgba(249,115,22,0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        .wdh-stats-bar::after {
          content: ''; position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none;
        }

        .wdh-stats-inner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr);
          padding: 0 32px; position: relative; z-index: 1;
        }
        @media(max-width:720px){ .wdh-stats-inner { grid-template-columns: repeat(2,1fr); } }

        .wdh-stat {
          padding: 32px 20px;
          border-right: 1px solid rgba(255,255,255,0.08);
          display: flex; flex-direction: column; align-items: center; text-align: center;
          animation: wdh-rise 0.6s cubic-bezier(.22,1,.36,1) both;
        }
        .wdh-stat:last-child { border-right: none; }
        @keyframes wdh-rise { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

        .wdh-stat-icon {
          width: 44px; height: 44px; border-radius: 11px;
          background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.14);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 14px; transition: background 0.2s, transform 0.2s;
        }
        .wdh-stat:hover .wdh-stat-icon { background: rgba(255,255,255,0.18); transform: scale(1.08); }

        .wdh-stat-value {
          font-family: ${T.poppins};
          font-size: clamp(1.8rem, 2.6vw, 2.5rem);
          font-weight: 700; color: #fff;
          line-height: 1; margin-bottom: 7px; letter-spacing: -0.02em;
          transition: color 0.2s;
        }
        .wdh-stat:hover .wdh-stat-value { color: #fbbf7e; }

        .wdh-stat-label { font-size: 15px; font-weight: 600; color: rgba(255,255,255,0.88); margin-bottom: 3px; }
        .wdh-stat-sub   { font-size: 13px; color: rgba(255, 255, 255, 0.77); font-weight: 400; letter-spacing: 0.03em; }
      `}</style>

      {/* ── Hero ── */}
      <div className="wdh-hero">

        {/* Left image */}
        <div className="wdh-img-side">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=85&fit=crop"
            alt="Certification experts"
            className="wdh-img-main"
          />
          <div className="wdh-img-grad" />

          <div className="wdh-img-badge">
            <div className="wdh-badge-dot" />
            <div>
              <div className="wdh-badge-text">India's Trusted Partner</div>
              <div className="wdh-badge-sub">BIS · WPC · EPR · ISO · TEC</div>
            </div>
          </div>

          <div className="wdh-img-float">
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&q=80&fit=crop" alt="Team" />
          </div>

          <div className="wdh-year-pill">Est. 2010 · 15+ Years of Excellence</div>
        </div>

        {/* Right content */}
        <div className="wdh-content-side">
          <div className="wdh-eyebrow">
            <span className="wdh-eyebrow-dot" />
            <span className="wdh-eyebrow-text">Why Choose Us</span>
          </div>

          <h2 className="wdh-main-title">
            Every decision counts,<br />
            <span>Every second matters.</span>
          </h2>

          <div className="wdh-underline">
            <div style={{ width: 32, height: 3, borderRadius: 99, background: orange }} />
            <div style={{ width: 9, height: 3, borderRadius: 99, background: teal }} />
            <div style={{ width: 4, height: 3, borderRadius: 99, background: "rgba(30,136,200,0.25)" }} />
          </div>

          <p className="wdh-desc">
            Speed, accuracy and deep regulatory expertise — from BIS to ISO, our zero-rejection track record speaks for itself.
          </p>

          <div className="wdh-features">
            {[
              { t: "End-to-end compliance support", s: "From documentation to approval" },
              { t: "50+ accredited lab partners", s: "Fastest turnaround across India" },
              { t: "Dedicated account managers", s: "Single point of contact, always" },
            ].map((f) => (
              <div key={f.t} className="wdh-feat">
                <div className="wdh-feat-icon">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke={teal} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="wdh-feat-text">{f.t}</div>
                  <div className="wdh-feat-sub">{f.s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="wdh-stats-bar">
        <div className="wdh-stats-inner">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} active={inView} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  );
}