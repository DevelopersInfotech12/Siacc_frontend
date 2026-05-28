"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
const Footer = dynamic(() => import("../Components/Footer"));
import "../animations.css";

const T = {
  teal: "#1E88C8",
  titleblue: "#0a6daa",
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
  ctaBand: "#EBF5FB",
  ctaBandBorder: "#C8DFF0",
  orange: "#F97316",
  orangeDark: "#EA6A0A",
  poppins: "'Cormorant Garamond', 'Georgia', poppins",
  poppins: "'Outfit', 'system-ui', poppins-poppins",
  poppins: "'Poppins', 'system-ui', poppins-poppins",
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

const openings = [
  { title: "Senior BIS Certification Consultant", dept: "BIS Division", location: "New Delhi", type: "Full-time", exp: "5+ Years", desc: "Lead client engagements for BIS ISI Mark and CRS certification projects. Coordinate with labs, manage applications and mentor junior consultants." },
  { title: "EPR Compliance Analyst", dept: "Environment Division", location: "New Delhi / Remote", type: "Full-time", exp: "2–4 Years", desc: "Handle EPR registration and annual compliance for E-Waste, Plastic, Battery and Tyre clients. Coordinate with CPCB and PRO partners." },
  { title: "Regulatory Affairs Executive", dept: "International Affairs", location: "Mumbai", type: "Full-time", exp: "1–3 Years", desc: "Assist overseas clients with market entry compliance — BIS, LMPC, TEC and WPC certifications for foreign manufacturers." },
  { title: "Business Development Manager", dept: "Sales & Growth", location: "Bengaluru / Remote", type: "Full-time", exp: "3–6 Years", desc: "Identify and acquire new clients in electronics, pharma and consumer goods sectors. Build long-term relationships with manufacturers and importers." },
  { title: "Technical Documentation Specialist", dept: "Operations", location: "New Delhi", type: "Full-time", exp: "2–4 Years", desc: "Prepare technical dossiers, compliance documents, and application files for various certifications. Strong writing and research skills required." },
  { title: "Legal & Regulatory Intern", dept: "Legal Team", location: "New Delhi", type: "Internship", exp: "Freshers / Final Year", desc: "Assist the legal team with regulatory research, draft legal notices, and support ongoing certification applications." },
];

const perks = [
  { icon: "🌿", title: "Meaningful Work", desc: "Help businesses navigate India's regulatory landscape. Your work directly enables market access for hundreds of brands." },
  { icon: "📈", title: "Fast Growth", desc: "Performance-based promotions with a clear career ladder. Many of our senior leaders started as junior analysts." },
  { icon: "🧠", title: "Deep Learning", desc: "Work across 50+ regulatory domains. Become a sought-after expert in India's compliance ecosystem." },
  { icon: "🏡", title: "Flexible Work", desc: "Hybrid and remote options for eligible roles. Work-life balance is built into our culture, not just a policy." },
  { icon: "💰", title: "Competitive Pay", desc: "Market-leading salaries, performance bonuses, health insurance, and employee benefits from day one." },
  { icon: "🤝", title: "Great Team", desc: "100+ colleagues who are passionate, collaborative, and recognised experts in their regulatory fields." },
];

const typeColors = {
  "Full-time": { bg: T.tealLight, text: T.tealDark },
  "Internship": { bg: T.amberLight, text: T.amberDark },
};

const stats = [
  { value: "100+", label: "Team Members", icon: "👥" },
  { value: "4", label: "Office Locations", icon: "🏢" },
  { value: "6", label: "Open Positions", icon: "📋" },
  { value: "12+", label: "Years Building", icon: "🏆" },
];

const heroChips = [
  { icon: "✓", label: "Fast Growth" },
  { icon: "🏡", label: "Hybrid Work" },
  { icon: "💰", label: "Competitive Pay" },
  { icon: "👥", label: "100+ Experts" },
  { icon: "📋", label: "6 Open Positions" },
];

export default function CareerScreen() {
  const router = useRouter();

  const heroLeftRef = useReveal();
  const statsRef = useReveal({ stagger: true, baseDelay: 100 });
  const lifeImgRef = useReveal();
  const lifeTxtRef = useReveal();
  const miniStatsRef = useReveal({ stagger: true, baseDelay: 80 });
  const perksBannerRef = useReveal();
  const perksGridRef = useReveal({ stagger: true, baseDelay: 80 });
  const openingsTtlRef = useReveal();
  const openingsRef = useReveal({ stagger: true, baseDelay: 90 });
  const ctaRef = useReveal();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: T.white, fontFamily: T.poppins, color: T.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        img { max-width:100%; display:block; }
        a { text-decoration:none; color:inherit; }

        .sl-row { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
        .sl-line { width:28px; height:1.5px; background:${T.teal}; flex-shrink:0; }
        .sl-text { font-family:${T.poppins}; font-size:11px; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; color:${T.teal}; }

        @keyframes pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.6; transform:scale(1.3); }
        }

        .hero-chip {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.09);
          border:1px solid rgba(255,255,255,0.16);
          backdrop-filter:blur(6px);
          border-radius:6px; padding:9px 16px;
          font-family:${T.poppins}; font-size:12.5px; font-weight:500;
          color:rgba(255,255,255,0.90);
          transition:background 0.2s, border-color 0.2s, transform 0.2s;
        }
        .hero-chip:hover {
          background:rgba(255,255,255,0.18);
          border-color:rgba(255,255,255,0.35);
          transform:translateY(-2px);
        }

        .stats-strip { display:grid; grid-template-columns:repeat(4,1fr); }
        @media(max-width:640px){ .stats-strip { grid-template-columns:repeat(2,1fr); } }

        .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:72px; align-items:center; }
        @media(max-width:860px){ .about-grid { grid-template-columns:1fr; gap:40px; } }
        .mini-stats-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:32px; }
        @media(max-width:420px){ .mini-stats-grid { grid-template-columns:1fr; } }

        .perks-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        @media(max-width:900px){ .perks-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:540px){ .perks-grid { grid-template-columns:1fr; } }
        .perk-card {
          background:${T.white}; border-radius:10px; padding:28px;
          border:1px solid ${T.border}; transition:all 0.25s; position:relative; overflow:hidden;
        }
        .perk-card:hover { border-color:${T.teal}; box-shadow:0 10px 28px rgba(30,136,200,0.09); transform:translateY(-3px); }

        .job-card {
          background:${T.white}; border-radius:10px; padding:24px 28px;
          border:1px solid ${T.border};
          display:grid; grid-template-columns:1fr auto; gap:20px; align-items:center;
          transition:all 0.25s ease;
        }
        .job-card:hover { border-color:${T.teal}; box-shadow:0 8px 28px rgba(30,136,200,0.09); transform:translateY(-2px); }
        @media(max-width:640px){ .job-card { grid-template-columns:1fr; gap:16px; padding:20px; } }

        .cta-split { display:grid; grid-template-columns:1fr auto; gap:40px; align-items:center; }
        @media(max-width:720px){ .cta-split { grid-template-columns:1fr; gap:28px; } }

        .sec { padding:clamp(64px,8vw,104px) clamp(16px,5vw,56px); }
        .inner { max-width:1280px; margin:0 auto; }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section style={{
        position: "relative", overflow: "hidden",
        borderBottom: `1px solid ${T.border}`,
        minHeight: 420,
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom,${T.orange},${T.teal})`, zIndex: 3 }} />
        <Image src="/images/career.jpg" alt="Careers background" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right, rgba(7,18,28,0.88) 0%, rgba(7,18,28,0.60) 50%, rgba(7,18,28,0.10) 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,4vw,60px)" }}>
          <div ref={heroLeftRef} className="reveal-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", borderRadius: 4, padding: "6px 16px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: T.poppins, fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                We're Hiring — Join Our Team
              </span>
            </div>

            <h1 style={{
              fontFamily: T.poppins,
              fontSize: 56,
              fontWeight: 700, lineHeight: 1.04,
              marginBottom: 20, letterSpacing: "-0.01em",
              color: "#fff", maxWidth: 640,
            }}>
              Build Your Career in{" "}
              <span style={{ color: T.orange }}>India's Compliance</span>{" "}
              Industry
            </h1>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: T.teal, opacity: 0.6, zIndex: 2 }} />
      </section>

      {/* STATS STRIP */}
      <section style={{ background: T.teal }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="stats-strip" ref={statsRef}>
            {stats.map((s, i) => (
              <div key={s.label} className={`reveal d${i}`} style={{ textAlign: "center", padding: "36px 16px", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,2.8vw,2.8rem)", color: "#fff", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.01em" }}>{s.value}</div>
                <div style={{ fontFamily: T.poppins, fontSize: 14, color: "rgba(255,255,255,0.80)", marginTop: 8, letterSpacing: "0.04em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFE AT SIACC */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div className="about-grid">
            <div className="reveal-left" ref={lifeImgRef} style={{ position: "relative" }}>
              <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80&fit=crop" alt="Team collaborating" style={{ width: "100%", borderRadius: 10, height: "clamp(280px,42vw,440px)", objectFit: "cover", boxShadow: "0 24px 64px rgba(0,0,0,0.09)" }} unoptimized />
              <div style={{ position: "absolute", bottom: -16, right: -12, background: T.white, borderRadius: 8, padding: "20px 26px", boxShadow: "0 16px 48px rgba(0,0,0,0.11)", border: `1px solid ${T.tealLight}` }}>
                <div style={{ fontFamily: T.poppins, fontSize: 36, color: T.teal, fontWeight: 700, lineHeight: 1 }}>100+</div>
                <div style={{ fontFamily: T.poppins, fontSize: 12, color: T.muted, marginTop: 4 }}>Experts on the Team</div>
              </div>
            </div>

            <div className="reveal-right" ref={lifeTxtRef}>
              <div className="sl-row"><div className="sl-line" /><span className="sl-text">Life at SIACC</span></div>
              <h2 style={{ fontFamily: T.poppins, fontSize: 40, color: T.titleblue, fontWeight: 700, marginBottom: 20, lineHeight: 1.12, letterSpacing: "-0.01em" }}>
                A Place Where Experts Grow
              </h2>
              <p style={{ fontFamily: T.poppins, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 16, textAlign: "justify" }}>
                At SIACC, every team member works on real, high-impact client mandates from day one. You're not a cog in a machine — you're a trusted advisor to manufacturers and importers navigating India's regulatory system.
              </p>
              <p style={{ fontFamily: T.poppins, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 32, textAlign: "justify" }}>
                We invest in our people through training, mentorship, and clear career progression. Many of our division heads started here as freshers and analysts.
              </p>

              <div className="mini-stats-grid" ref={miniStatsRef}>
                {[
                  { n: "12+", l: "Years in Business" },
                  { n: "50+", l: "Regulatory Domains" },
                  { n: "4", l: "Office Locations" },
                  { n: "0%", l: "Client Failure Rate" },
                ].map((s, i) => (
                  <div key={s.l} className={`reveal d${i}`} style={{ padding: "16px 20px", background: T.white, borderRadius: 8, border: `1px solid ${T.border}`, borderLeft: `3px solid ${i % 2 === 0 ? T.teal : T.amber}` }}>
                    <div style={{ fontFamily: T.poppins, fontSize: 26, color: i % 2 === 0 ? T.teal : T.amber, fontWeight: 700, lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontFamily: T.poppins, fontSize: 14, color: T.muted, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div className="reveal perks-banner" ref={perksBannerRef}>
            <Image src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80&fit=crop" alt="Office culture" fill style={{ objectFit: "cover", objectPosition: "center 50%" }} unoptimized />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(14,128,128,0.82) 0%, rgba(30,136,200,0.55) 55%, rgba(235,245,251,0.30) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 36px" }}>
              <div>
                <div className="sl-row" style={{ marginBottom: 10 }}>
                  <div className="sl-line" style={{ background: "rgba(255,255,255,0.7)" }} />
                  <span className="sl-text" style={{ color: "rgba(255,255,255,0.85)" }}>Why You'll Love Working Here</span>
                </div>
                <div style={{ fontFamily: T.poppins, fontSize: "clamp(1.2rem,2.5vw,2rem)", color: "#fff", fontWeight: 700, marginBottom: 4 }}>
                  Benefits Built Around You
                </div>
                <p style={{ fontFamily: T.poppins, color: "rgba(255,255,255,0.78)", fontSize: 14 }}>Flexible, rewarding, and meaningful work — from day one.</p>
              </div>
            </div>
          </div>

          <div className="perks-grid" ref={perksGridRef}>
            {perks.map((p, i) => (
              <div key={p.title} className={`perk-card reveal d${i}`}>
                <div style={{ width: 46, height: 46, borderRadius: 9, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 16 }}>{p.icon}</div>
                <h3 style={{ fontFamily: T.poppins, fontSize: 17.5, color: T.slate, marginBottom: 8, fontWeight: 600 }}>{p.title}</h3>
                <p style={{ fontFamily: T.poppins, fontSize: 14.5, color: T.muted, lineHeight: 1.75 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section id="openings" className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={openingsTtlRef}>
            <div style={{ display: "flex", justifyContent: "center" }}><div className="sl-row"><div className="sl-line" /><span className="sl-text">We're Hiring</span></div></div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.8rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 14 }}>Open Positions</h2>
            <p style={{ fontFamily: T.poppins, color: T.para, maxWidth: 460, margin: "0 auto", lineHeight: 1.75, fontSize: 15.5 }}>
              Explore current openings across our divisions. All roles come with mentorship, growth paths, and a collaborative team culture.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }} ref={openingsRef}>
            {openings.map((job, i) => {
              const tc = typeColors[job.type] || { bg: T.tealLight, text: T.tealDark };
              return (
                <div key={job.title} className={`job-card reveal d${Math.min(i, 5)}`}>
                  <div>
                    <div className="job-meta">
                      <span style={{ fontFamily: T.poppins, fontSize: 10, fontWeight: 700, backgroundColor: tc.bg, color: tc.text, padding: "3px 10px", borderRadius: 3, letterSpacing: "0.06em" }}>{job.type}</span>
                      <span style={{ fontFamily: T.poppins, fontSize: 11, color: T.muted, backgroundColor: T.white, padding: "3px 10px", borderRadius: 3, border: `1px solid ${T.border}` }}>{job.dept}</span>
                      <span style={{ fontFamily: T.poppins, fontSize: 11, color: T.muted }}>📍 {job.location}</span>
                      <span style={{ fontFamily: T.poppins, fontSize: 11, color: T.muted }}>💼 {job.exp}</span>
                    </div>
                    <h3 style={{ fontFamily: T.poppins, fontSize: 18, color: T.para, marginBottom: 10, fontWeight: 600 }}>{job.title}</h3>
                    <p style={{ fontFamily: T.poppins, fontSize: 15, color: T.paradark, lineHeight: 1.7 }}>{job.desc}</p>
                  </div>
                  <button onClick={() => router.push("/contact")} style={{ padding: "12px 26px", background: T.orange, color: "#fff", fontWeight: 600, borderRadius: 6, border: "none", fontFamily: T.poppins, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s", boxShadow: "0 4px 14px rgba(249,115,22,0.28)" }} onMouseEnter={e => e.currentTarget.style.background = T.teal} onMouseLeave={e => e.currentTarget.style.background = T.orange}>Apply Now →</button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="reveal" ref={ctaRef} style={{ background: T.ctaBand, borderTop: `1px solid ${T.ctaBandBorder}`, borderBottom: `1px solid ${T.ctaBandBorder}`, padding: "80px clamp(16px,5vw,56px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="cta-split">
            <div>
              <div className="sl-row" style={{ marginBottom: 20 }}><div className="sl-line" /><span className="sl-text">Don't See the Right Role?</span></div>
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.9rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 14 }}>
                Send Us Your Resume Anytime
              </h2>
              <p style={{ fontFamily: T.poppins, color: T.paradark, fontSize: 14.5, lineHeight: 1.8, maxWidth: 500 }}>
                We're always looking for talented people. Send your resume and we'll reach out when there's a fit — across any of our divisions.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
              <button onClick={() => router.push("/contact")} style={{ padding: "14px 36px", fontFamily: T.poppins, fontSize: 14, fontWeight: 600, border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", whiteSpace: "nowrap", transition: "all 0.22s" }} onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }} onMouseLeave={e => { e.currentTarget.style.background = T.orange; e.currentTarget.style.transform = "translateY(0)"; }}>Send Spontaneous Application</button>

              <a href="mailto:starindia.acc@gmail.com" style={{ padding: "13px 28px", border: `1.5px solid ${T.border}`, borderRadius: 6, fontFamily: T.poppins, fontSize: 14, fontWeight: 500, color: T.slate, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, whiteSpace: "nowrap", background: T.white, transition: "border-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = T.teal} onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>✉️ starindia.acc@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}