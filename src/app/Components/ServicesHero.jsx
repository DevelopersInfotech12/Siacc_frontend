"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const T = {
  teal: "#1E88C8", tealMid: "#0E8080", tealLight: "#EBF5F5",
  amber: "#C8780A", amberLight: "#FEF3DC", amberDark: "#9A5C06",
  slate: "#0D1B2A", muted: "#718096", subtle: "#A0AEC0",
  border: "#E8E3DA", white: "#FFFFFF", cream: "#FAF8F4",
  orange: "#F97316",
  serif: "'Cormorant Garamond','Georgia',serif",
  sans: "'Outfit','system-ui',sans-serif",
};

export default function ServicesHero({ services = [] }) {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef(null);

  // Guard: if no services passed or array is empty, render nothing
  if (!services || services.length === 0) return null;

  // Clamp active index so it never goes out of bounds
  const safeActive = Math.min(active, services.length - 1);
  const current = services[safeActive];

  const goTo = (i) => {
    setActive(i);
    setAnimKey(k => k + 1);
    clearInterval(timerRef.current);
    startTimer();
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setActive(a => {
        const next = (a + 1) % services.length;
        setAnimKey(k => k + 1);
        return next;
      });
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section style={{
      background: T.white,
      borderBottom: `1px solid ${T.border}`,
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Outfit:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Tab bar ── */
        .sh-tabs {
          display: flex;
          overflow-x: auto;
          border-bottom: 1px solid ${T.border};
          background: ${T.white};
          scrollbar-width: none;
          padding: 0 clamp(12px, 3vw, 40px);
        }
        .sh-tabs::-webkit-scrollbar { display: none; }
        .sh-tab {
          flex-shrink: 0;
          padding: 13px 14px;
          font-family: ${T.sans};
          font-size: 11.5px;
          font-weight: 600;
          color: ${T.subtle};
          border: none;
          background: none;
          cursor: pointer;
          border-bottom: 2.5px solid transparent;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }
        .sh-tab::before {
          content: '';
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: currentColor;
          margin-right: 6px;
          opacity: 0.4;
          vertical-align: middle;
        }
        .sh-tab:hover { color: ${T.teal}; }
        .sh-tab.active { color: ${T.teal}; border-bottom-color: ${T.teal}; }
        .sh-tab.active::before { opacity: 1; }

        /* ─────────────────────────────────────
           DESKTOP layout: two columns
        ───────────────────────────────────── */
        .sh-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 420px;
        }

        /* Desktop image pane */
        .sh-right-desktop {
          position: relative;
          overflow: hidden;
        }
        .sh-right-desktop > img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* Mobile image — hidden on desktop */
        .sh-right-mobile { display: none; }

        /* Left text */
        .sh-left {
          padding: clamp(28px, 4vw, 60px) clamp(16px, 4vw, 52px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* ─────────────────────────────────────
           MOBILE layout (≤ 768px)
           Strategy: render a SEPARATE image block
           above the text using normal block flow
           (NOT absolute positioning) so it always
           has natural height.
        ───────────────────────────────────── */
        @media (max-width: 768px) {
          .sh-hero-grid {
            display: flex;
            flex-direction: column;
          }

          /* Hide the desktop absolute-image column */
          .sh-right-desktop { display: none !important; }

          /* Show the mobile image block ABOVE text */
          .sh-right-mobile {
            display: block;
            width: 100%;
            /* padding-top % trick = reliable 16:9 on ALL browsers */
            padding-top: 56.25%;
            position: relative;
            overflow: hidden;
            background: #c8dff0; /* placeholder while img loads */
            order: -1;
          }
          .sh-right-mobile > img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
          }
          .sh-right-mobile > .sh-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(7,18,28,0.35) 0%, transparent 55%);
          }
          .sh-right-mobile > .sh-counter-badge {
            position: absolute;
            top: 10px; right: 10px;
            background: rgba(0,0,0,0.52);
            backdrop-filter: blur(4px);
            color: #fff;
            font-family: ${T.sans};
            font-size: 10px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 4px;
            z-index: 2;
          }

          .sh-left { padding: 22px 16px 30px; }

          /* Stack info-card vertically on mobile */
          .sh-info-card {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .sh-btn { width: 100%; justify-content: center; }
        }

        @media (max-width: 400px) {
          .sh-tab { padding: 10px 9px; font-size: 10px; }
          .sh-right-mobile { padding-top: 65%; }
        }

        /* ── Shared overlay on desktop image ── */
        .sh-right-desktop > .sh-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to left, rgba(7,18,28,0.02) 0%, rgba(7,18,28,0.22) 100%);
        }
        .sh-right-desktop > .sh-counter-badge {
          position: absolute;
          top: 14px; right: 14px;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          color: #fff;
          font-family: ${T.sans};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 5px 12px;
          border-radius: 4px;
          z-index: 2;
        }

        /* ── Tag pill ── */
        .sh-tag {
          display: inline-flex; align-items: center; gap: 7px;
          background: ${T.tealLight};
          border: 1px solid rgba(30,136,200,0.2);
          border-radius: 4px;
          padding: 5px 13px; margin-bottom: 16px;
          width: fit-content;
        }
        .sh-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: ${T.teal}; }
        .sh-tag-text { font-family: ${T.sans}; font-size: 10px; font-weight: 700; color: ${T.teal}; letter-spacing: 0.12em; text-transform: uppercase; }

        @keyframes sh-fadein {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sh-anim { animation: sh-fadein 0.42s ease both; }

        /* ── Info card ── */
        .sh-info-card {
          background: ${T.cream};
          border: 1px solid ${T.border};
          border-radius: 8px;
          padding: 14px 18px;
          margin-top: 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          flex-wrap: wrap;
        }

        /* ── Stats ── */
        .sh-stats { display: flex; gap: 24px; margin-top: 20px; flex-wrap: wrap; }
        .sh-stat-val { font-family: ${T.serif}; font-size: 24px; font-weight: 700; color: ${T.teal}; line-height: 1; }
        .sh-stat-label { font-family: ${T.sans}; font-size: 11px; color: ${T.muted}; margin-top: 3px; }

        /* ── Badges ── */
        .sh-badges { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 16px; }
        .sh-badge { font-family: ${T.sans}; font-size: 11px; font-weight: 600; color: ${T.teal}; background: ${T.tealLight}; border-radius: 3px; padding: 3px 9px; }

        /* ── Dots ── */
        .sh-dots { display: flex; gap: 6px; margin-top: 22px; align-items: center; }
        .sh-dot { height: 3px; border-radius: 99px; background: rgba(30,136,200,0.2); border: none; cursor: pointer; transition: background 0.25s, width 0.25s; padding: 0; }
        .sh-dot.active { background: ${T.teal}; }

        /* ── Button ── */
        .sh-btn {
          display: inline-flex; align-items: center;
          padding: 11px 24px;
          background: ${T.orange}; color: #fff;
          font-family: ${T.sans}; font-size: 13px; font-weight: 600;
          border: none; border-radius: 6px; cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 4px 14px rgba(249,115,22,0.28);
          flex-shrink: 0;
        }
        .sh-btn:hover { background: ${T.teal}; transform: translateY(-1px); }
      `}</style>

      {/* ── Tabs ── */}
      <div className="sh-tabs" role="tablist">
        {services.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={safeActive === i}
            className={`sh-tab${safeActive === i ? " active" : ""}`}
            onClick={() => goTo(i)}
          >
            {s.tabLabel || s.title}
          </button>
        ))}
      </div>

      <div className="sh-hero-grid">

        {/* ══ MOBILE-ONLY image block (normal flow, always has height) ══ */}
        <div className="sh-right-mobile">
          <img
            key={`mob-${animKey}`}
            src={current.img}
            alt={current.title}
            className="sh-anim"
          />
          <div className="sh-overlay" />
          <div className="sh-counter-badge">
            {String(safeActive + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
          </div>
        </div>

        {/* ══ Text pane ══ */}
        <div className="sh-left">
          <div key={`text-${animKey}`} className="sh-anim">

            <div className="sh-tag">
              <span className="sh-tag-dot" />
              <span className="sh-tag-text">{current.tag}</span>
            </div>

            <h1 style={{
              fontFamily: T.serif,
              fontSize: "clamp(1.55rem, 3.2vw, 2.9rem)",
              fontWeight: 700, color: T.slate,
              lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 10,
            }}>
              {current.title}
            </h1>

            <p style={{
              fontFamily: T.sans, fontSize: 11, fontWeight: 700,
              color: T.tealMid, letterSpacing: "0.1em",
              textTransform: "uppercase", marginBottom: 14,
            }}>
              {current.subtitle}
            </p>

            <p style={{
              fontFamily: T.sans,
              fontSize: "clamp(13px, 1.35vw, 15px)",
              color: T.muted, lineHeight: 1.82, maxWidth: 460,
            }}>
              {current.desc}
            </p>

            {current.stats && (
              <div className="sh-stats">
                {current.stats.map(s => (
                  <div key={s.label}>
                    <div className="sh-stat-val">{s.value}</div>
                    <div className="sh-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            )}

            {current.badges && (
              <div className="sh-badges">
                {current.badges.map(b => (
                  <span key={b} className="sh-badge">✓ {b}</span>
                ))}
              </div>
            )}

            <div className="sh-info-card">
              <div>
                <div style={{ fontFamily: T.sans, fontSize: 9, fontWeight: 700, color: T.subtle, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                  Current Service
                </div>
                <div style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 600, color: T.slate }}>
                  {current.title}
                </div>
                <div style={{ fontFamily: T.sans, fontSize: 11, color: T.teal, marginTop: 2 }}>
                  {current.subtitle}
                </div>
              </div>
              <button className="sh-btn" onClick={() => router.push(current.href)}>
                Learn More →
              </button>
            </div>

            <div className="sh-dots">
              {services.map((_, i) => (
                <button
                  key={i}
                  className={`sh-dot${safeActive === i ? " active" : ""}`}
                  style={{ width: safeActive === i ? 24 : 8 }}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${services[i].title}`}
                />
              ))}
              <span style={{ fontFamily: T.sans, fontSize: 10, color: T.subtle, marginLeft: 6, fontWeight: 600 }}>
                {String(safeActive + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
              </span>
            </div>

          </div>
        </div>

        {/* ══ DESKTOP-ONLY image column (absolute fill, hidden on mobile) ══ */}
        <div className="sh-right-desktop">
          <img
            key={`desk-${animKey}`}
            src={current.img}
            alt={current.title}
            className="sh-anim"
          />
          <div className="sh-overlay" />
          <div className="sh-counter-badge">
            {String(safeActive + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
          </div>
        </div>

      </div>
    </section>
  );
}