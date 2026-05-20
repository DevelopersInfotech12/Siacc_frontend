"use client";
import { useRef, useEffect } from "react";

/* ══════════════════════════════════════════════
   THEME TOKENS
══════════════════════════════════════════════ */
const T = {
  teal: "#1E88C8",
  titleblue: "#0a6daa",
  tealLight: "#EBF5F5",
  tealGhost: "#F4FAFA",
  amber: "#C8780A",
  slate: "#0D1B2A",
  body: "#2D3748",
  muted: "#718096",
  border: "#E8E3DA",
  white: "#FFFFFF",
  cream: "#FAF8F4",
  orange: "#F97316",
 serif: "'Cormorant Garamond', 'Georgia', serif",
  sans: "'Outfit', 'system-ui', sans-serif",
  poppins: "'Poppins', 'system-ui', sans-serif",
};

/* ══════════════════════════════════════════════
   useReveal HOOK
══════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const testimonials = [
  {
    name: "Rajesh Mehta",
    co: "TechImport Pvt. Ltd.",
    text: "SIACC handled our BIS CRS certification end-to-end. Professional, fast and transparent from day one. Highly recommended to anyone navigating India's complex electronics regulations.",
    r: 5,
    featured: true,
    tag: "BIS CRS",
  },
  {
    name: "Priya Sharma",
    co: "EcoGoods India",
    text: "EPR registration done within the promised timeline despite the urgency. Their 24/7 availability is genuinely a game-changer for fast-moving consumer goods businesses.",
    r: 5,
    featured: false,
    tag: "EPR",
  },
  {
    name: "Arjun Kapoor",
    co: "Wireless Solutions Ltd.",
    text: "WPC-ETA was always a black box for us. SIACC made it completely simple. Now we come to them for every new product launch and they have never let us down.",
    r: 5,
    featured: false,
    tag: "WPC-ETA",
  },
  {
    name: "Sneha Verma",
    co: "MediCare Devices Pvt. Ltd.",
    text: "CDSCO licensing used to terrify us. SIACC's expertise made it completely stress-free. Outstanding team, proactive communication and superb service throughout.",
    r: 5,
    featured: true,
    tag: "CDSCO",
  },
];

const ratingBars = [
  { label: "5 ★", pct: 88 },
  { label: "4 ★", pct: 9 },
  { label: "3 ★", pct: 2 },
  { label: "2 ★", pct: 1 },
  { label: "1 ★", pct: 0 },
];

const summaryStats = [
  { n: "10K+", l: "Clients served" },
  { n: "0%",  l: "Failure rate" },
  { n: "12+",  l: "Years active" },
];

/* ══════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════ */
function SectionLabel({ children, center = false }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: center ? "center" : "flex-start",
      gap: 10,
      marginBottom: 14,
    }}>
      <div style={{ width: 24, height: 1.5, background: T.teal }} />
      <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: T.teal }}>
        {children}
      </span>
      {center && <div style={{ width: 24, height: 1.5, background: T.teal }} />}
    </div>
  );
}

function TestimonialCard({ t }) {
  return (
    <div
      className={`testi-card-cs ${t.featured ? "testi-featured-cs" : ""}`}
      style={{
        background: t.featured ? T.tealGhost : T.cream,
        border: `1px solid ${t.featured ? T.teal : T.border}`,
        borderRadius: 12,
        padding: "32px",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Decorative quote mark */}
      <div style={{
        position: "absolute",
        top: -8, right: 24,
        fontFamily: T.serif,
        fontSize: 100,
        color: T.tealLight,
        lineHeight: 1,
        pointerEvents: "none",
        userSelect: "none",
        transition: "color 0.25s",
      }} className="cs-quote">
        "
      </div>

      {/* Verified badge (featured only) */}
      {t.featured && (
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: T.tealLight,
          color: T.titleblue,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.06em",
          padding: "4px 12px",
          borderRadius: 20,
          border: `1px solid #C8DEDE`,
          marginBottom: 14,
          alignSelf: "flex-start",
          fontFamily: T.sans,
        }}>
          <span style={{ fontSize: 10 }}>✦</span> Verified client
        </div>
      )}

      {/* Stars */}
      <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
        {[...Array(t.r)].map((_, i) => (
          <span key={i} style={{ color: T.amber, fontSize: 14 }}>★</span>
        ))}
      </div>

      {/* Review text */}
      <p style={{
        fontFamily: T.poppins,
        fontSize: 14.5,
        color: "#0000009d",
        lineHeight: 1.85,
        marginBottom: 20,
        position: "relative",
        zIndex: 1,
        flex: 1,
      }}>
        {t.text}
      </p>

      {/* Service tag */}
      <div style={{
        display: "inline-block",
        background: T.tealLight,
        color: T.titleblue,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 4,
        marginBottom: 18,
        border: `1px solid #C8DEDE`,
        fontFamily: T.sans,
        alignSelf: "flex-start",
      }}>
        {t.tag}
      </div>

      {/* Author footer */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        paddingTop: 18,
        borderTop: `1px solid ${T.border}`,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: "50%",
          background: T.orange,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: T.serif, color: T.white, fontWeight: 700, fontSize: 18,
          flexShrink: 0,
        }}>
          {t.name[0]}
        </div>
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 13.5, fontWeight: 600, color: T.slate }}>
            {t.name}
          </div>
          <div style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, marginTop: 2 }}>
            {t.co}
          </div>
        </div>
      </div>
    </div>
  );
}

function RatingBar({ label, pct }) {
  const fillRef = useRef(null);
  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => { el.style.width = pct + "%"; }, 100);
        obs.unobserve(el);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pct]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <div style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, width: 32, textAlign: "right", flexShrink: 0 }}>
        {label}
      </div>
      <div style={{ flex: 1, height: 6, background: T.border, borderRadius: 3, overflow: "hidden" }}>
        <div
          ref={fillRef}
          style={{ width: "0%", height: "100%", background: T.teal, borderRadius: 3, transition: "width 1s ease" }}
        />
      </div>
      <div style={{ fontFamily: T.sans, fontSize: 12, color: T.muted, width: 32, flexShrink: 0 }}>
        {pct}%
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════ */
export default function ClientStories() {
  const headerRef = useReveal();
  const gridRef = useReveal({ stagger: true, baseDelay: 90 });
  const bottomRef = useReveal();

  return (
    <section style={{
      background: T.white,
      padding: "clamp(64px,8vw,104px) clamp(16px,5vw,56px)",
    }}>
      <style>{`
        .testi-card-cs:hover {
          border-color: ${T.teal} !important;
          box-shadow: 0 14px 36px rgba(30,136,200,0.10);
          transform: translateY(-3px);
        }
        .testi-card-cs:hover .cs-quote {
          color: rgba(30,136,200,0.10) !important;
        }
        .testi-featured-cs {
          border-color: ${T.teal} !important;
        }
        .cs-rating-bar-wrap {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .cs-divider { width: 1px; height: 80px; background: ${T.border}; flex-shrink: 0; }
        .cs-summary-stats { display: flex; gap: 32px; flex-wrap: wrap; }
        .testi-grid-cs { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; }
        @media(max-width:760px) {
          .testi-grid-cs { grid-template-columns: 1fr !important; }
          .cs-rating-bar-wrap { flex-direction: column; align-items: flex-start; }
          .cs-divider { display: none; }
        }
      `}</style>

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div className="reveal" ref={headerRef} style={{ textAlign: "center", marginBottom: 52 }}>
          <SectionLabel center>Client Stories</SectionLabel>
          <h2 style={{
            fontFamily: T.poppins,
            fontSize: 35,
            fontWeight: 700,
            color: T.titleblue,
            letterSpacing: "-0.01em",
            marginBottom: 10,
          }}>
            Why People Trust SIACC
          </h2>
          <p style={{ fontFamily: T.sans, color: T.muted, fontSize: 16, lineHeight: 1.75, maxWidth: 500, margin: "0 auto" }}>
            Over 10,000 businesses have achieved compliance with our help. Here's what they say.
          </p>
        </div>

        {/* ── Testimonial grid ── */}
        <div className="testi-grid-cs" ref={gridRef} style={{ marginBottom: 36 }}>
          {testimonials.map((t, i) => (
            <div key={t.name} className={`reveal d${i}`}>
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

        {/* ── Rating summary bar ── */}
        <div
          className="reveal"
          ref={bottomRef}
          style={{
            background: T.cream,
            border: `1px solid ${T.border}`,
            borderRadius: 12,
            padding: "28px 36px",
          }}
        >
          <div className="cs-rating-bar-wrap">

            {/* Overall score */}
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontFamily: T.poppins, fontSize: 52, fontWeight: 700, color: T.teal, lineHeight: 1 }}>4.9</div>
              <div style={{ display: "flex", gap: 4, justifyContent: "center", margin: "6px 0 4px" }}>
                {[...Array(5)].map((_, i) => <span key={i} style={{ color: T.amber, fontSize: 14 }}>★</span>)}
              </div>
              <div style={{ fontFamily: T.sans, fontSize: 14, color: T.muted }}>Overall rating</div>
            </div>

            {/* Rating bars */}
            <div style={{ flex: 1, minWidth: 180 }}>
              {ratingBars.map(rb => <RatingBar key={rb.label} label={rb.label} pct={rb.pct} />)}
            </div>

            <div className="cs-divider" />

            {/* Summary stats */}
            <div className="cs-summary-stats">
              {summaryStats.map(s => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: T.poppins, fontSize: 26, fontWeight: 700, color: "#000000ab" }}>{s.n}</div>
                  <div style={{ fontFamily: T.poppins, fontSize: 15, color: T.muted, marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}