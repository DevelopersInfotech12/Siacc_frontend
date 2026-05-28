"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from 'next/image';
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
const Footer = dynamic(() => import("../Components/Footer"));
import "../animations.css";

const T = {
  teal: "#1E88C8", titleblue: "#0a6daa", tealDark: "#074D4D", tealMid: "#0E8080",
  tealLight: "#EBF5F5", tealGhost: "#F4FAFA",
  amber: "#C8780A", amberLight: "#FEF3DC", amberDark: "#9A5C06",
  slate: "#0D1B2A", slateMid: "#1C3144", body: "#2D3748", muted: "#718096", subtle: "#A0AEC0",
  border: "#E8E3DA", borderLight: "#F0ECE5",
  white: "#FFFFFF", cream: "#FAF8F4", creamMid: "#F3EFE8",
  ctaBand: "#EBF5FB", ctaBandBorder: "#C8DFF0",
  orange: "#F97316", orangeDark: "#EA6A0A",
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

const stats = [
  { value: "2015", label: "Year Founded", icon: "📅" },
  { value: "12+", label: "Years of Experience", icon: "🏆" },
  { value: "10,000+", label: "Clients Served", icon: "🤝" },
  { value: "0%", label: "Failure Rate", icon: "✅" },
];

const timeline = [
  { year: "2015", title: "Founded in New Delhi", desc: "Siacc India was established with a mission to simplify Indian regulatory compliance for businesses of all sizes." },
  { year: "2014", title: "Expanded to BIS Services", desc: "Launched dedicated BIS ISI Mark & CRS certification services, becoming one of India's first specialized consultancies." },
  { year: "2017", title: "10,000 Clients Milestone", desc: "Crossed the 10,000 client mark and expanded our team to 80+ certification experts across India." },
  { year: "2020", title: "EPR & Environment Division", desc: "Launched a dedicated EPR division covering E-Waste, Plastic, Battery and Tyre compliance under CPCB norms." },
  { year: "2023", title: "Pan-India Presence", desc: "Opened offices in Mumbai, Bengaluru & Chennai. Now serving clients in 25+ countries for India market entry." },
];

const values = [
  { icon: "🎯", title: "Accuracy First", desc: "Every application we file is meticulously reviewed. We don't cut corners — ever." },
  { icon: "🤝", title: "Client Partnership", desc: "We treat your business as our own. Your compliance success is our reputation." },
  { icon: "🔍", title: "Transparency", desc: "Clear timelines, honest pricing, and regular updates at every stage of your certification." },
  { icon: "⚡", title: "Speed Without Compromise", desc: "Fast doesn't mean sloppy. We move quickly while maintaining the highest quality standards." },
];

const heroChips = [
  { icon: "🏆", label: "Est. 2015" },
  { icon: "🤝", label: "10,000+ Clients" },
  { icon: "🌍", label: "25+ Countries" },
  { icon: "✅", label: "0% Failure Rate" },
  { icon: "🔖", label: "BIS · WPC · ISO · EPR" },
];

function SectionLabel({ children, center = false, light = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, justifyContent: center ? "center" : "flex-start" }}>
      <div style={{ width: 28, height: 1.5, background: light ? "rgba(255,255,255,0.5)" : T.teal }} />
      <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: light ? "rgba(255,255,255,0.75)" : T.teal }}>{children}</span>
    </div>
  );
}

export default function AboutScreen() {
  const router = useRouter();

  const heroLeftRef = useReveal();
  const statsRef = useReveal({ stagger: true, baseDelay: 100 });
  const overviewRef = useReveal();
  const infoCardRef = useReveal();
  const storyImgRef = useReveal();
  const storyTxtRef = useReveal();
  const missionRef = useReveal({ stagger: true, baseDelay: 100 });
  const valuesRef = useReveal({ stagger: true, baseDelay: 80 });
  const timelineRef = useReveal({ stagger: true, baseDelay: 110 });
  const ctaRef = useReveal();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: T.white, fontFamily: T.sans, color: T.body }}>
      <style>{`
        /* ── Poppins added to font import ── */
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        img { max-width:100%; display:block; }
        a { text-decoration:none; color:inherit; }

        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.6;transform:scale(1.3);} }
        .hero-chip {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(255,255,255,0.09); border:1px solid rgba(255,255,255,0.16);
          backdrop-filter:blur(6px); border-radius:6px; padding:9px 16px;
          font-family:'Outfit','system-ui',sans-serif; font-size:12.5px; font-weight:500;
          color:rgba(255,255,255,0.90); transition:background 0.2s,border-color 0.2s,transform 0.2s;
        }
        .hero-chip:hover { background:rgba(255,255,255,0.18); border-color:rgba(255,255,255,0.35); transform:translateY(-2px); }

        .stats-grid { display:grid; grid-template-columns:repeat(4,1fr); }
        @media(max-width:640px){ .stats-grid { grid-template-columns:repeat(2,1fr); } }

        .story-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
        @media(max-width:900px){ .story-grid { grid-template-columns:1fr; gap:40px; } }

        .values-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:16px; }
        .value-card { background:${T.white}; border-radius:10px; padding:28px; border:1px solid ${T.border}; transition:all 0.25s cubic-bezier(0.4,0,0.2,1); position:relative; overflow:hidden; }
        .value-card::before { content:''; position:absolute; inset:0; background:${T.tealGhost}; opacity:0; transition:opacity 0.25s; }
        .value-card:hover { border-color:${T.teal}; transform:translateY(-3px); box-shadow:0 12px 32px rgba(10,104,104,0.09); }
        .value-card:hover::before { opacity:1; }
        .value-card > * { position:relative; }
        .value-icon { width:50px; height:50px; border-radius:10px; background:${T.tealLight}; display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:16px; transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .value-card:hover .value-icon { transform:scale(1.2) rotate(6deg); background:${T.teal}; }

        .mission-card { background:${T.white}; border-radius:10px; padding:20px 24px; border:1px solid ${T.border}; display:flex; gap:16px; align-items:flex-start; transition:all 0.2s; }
        .mission-card:hover { border-color:${T.teal}; box-shadow:0 6px 20px rgba(30,136,200,0.08); }
        .mission-icon { width:40px; height:40px; border-radius:9px; background:${T.tealLight}; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .mission-card:hover .mission-icon { transform:scale(1.18) rotate(-4deg); background:${T.teal}; }

        .overview-grid { display:grid; grid-template-columns:1fr 360px; gap:48px; align-items:flex-start; }
        @media(max-width:960px){ .overview-grid { grid-template-columns:1fr; } }

        .cta-split { display:grid; grid-template-columns:1fr auto; gap:40px; align-items:center; }
        @media(max-width:720px){ .cta-split { grid-template-columns:1fr; gap:28px; } }

        .sec { padding:clamp(64px,8vw,104px) clamp(16px,5vw,56px); }
        .inner { max-width:1280px; margin:0 auto; }
      `}</style>

      <Navbar />

      {/* ══ HERO ══ */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${T.border}`, minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom, ${T.orange}, ${T.teal})`, zIndex: 3 }} />
        <Image src="/images/aboutbanner3.jpg" alt="SIACC India" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right,rgba(7,18,28,0.88) 0%,rgba(7,18,28,0.60) 50%,rgba(7,18,28,0.10) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,4vw,60px)" }}>
          <div ref={heroLeftRef} className="reveal-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", borderRadius: 4, padding: "6px 16px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>India's Most Trusted Certification Consultancy</span>
            </div>
            <h1 style={{ fontFamily: T.poppins, fontSize: 50, fontWeight: 700, lineHeight: 1.04, marginBottom: 20, letterSpacing: "-0.01em", color: "#fff", maxWidth: 640 }}>
              12 Years of Simplifying{" "}<span style={{ color: T.orange }}>Indian Compliance</span>
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 }}>
              {heroChips.map(chip => (
                <span key={chip.label} className="hero-chip">
                  <span style={{ fontSize: 15 }}>{chip.icon}</span>{chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: T.teal, opacity: 0.6, zIndex: 2 }} />
      </section>

      {/* ══ STATS STRIP ══ */}
      <section style={{ background: T.teal }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="stats-grid" ref={statsRef}>
            {stats.map((s, i) => (
              <div key={s.label} className={`reveal d${i}`} style={{ textAlign: "center", padding: "36px 16px", borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                <div className="anim-count-up" style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,2.8vw,2.8rem)", color: "#fff", fontWeight: 700, lineHeight: 1, letterSpacing: "-0.01em" }}>{s.value}</div>
                <div style={{ fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,0.90)", marginTop: 8, letterSpacing: "0.04em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OVERVIEW ══ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div className="overview-grid">

            {/* Left */}
            <div className="reveal-left" ref={overviewRef}>
              <SectionLabel>About SIACC India</SectionLabel>
              <h2 style={{
                fontFamily: T.poppins,
                fontSize: "clamp(2rem,3.2vw,2.9rem)",
                color: T.titleblue,
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                marginBottom: 16,
              }}>
                India's Most Trusted<br />Compliance Partner
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 16, textAlign: "justify" }}>
                We started SIACC with one belief — no business should lose market access due to complex regulatory paperwork. Today we are India's most trusted certification consultancy, having guided 10,000+ clients across BIS, WPC, EPR, ISO and more.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 32, textAlign: "justify" }}>
                Our team of 100+ regulatory experts, lawyers, and certification specialists handle everything end-to-end — from lab coordination and document filing to government follow-ups and post-certification support — so you can focus on your business.
              </p>

              <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", height: 220 }}>
                <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80&fit=crop" alt="SIACC team" fill style={{ objectFit: "cover", objectPosition: "center 40%" }} unoptimized />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(14,128,128,0.88) 0%,rgba(30,136,200,0.60) 55%,rgba(235,245,251,0.25) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 28px" }}>
                  <div>
                    <div style={{ fontFamily: T.poppins, fontSize: "clamp(1rem,2vw,1.3rem)", color: "#fff", fontWeight: 700, marginBottom: 4 }}>Trusted by 10,000+ Businesses</div>
                    <p style={{ fontFamily: T.sans, color: "rgba(255,255,255,0.80)", fontSize: 12.5 }}>BIS · WPC · EPR · ISO · Testing & More</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — sticky Quick Info */}
            <div className="reveal-right" ref={infoCardRef}>
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", position: "sticky", top: 100 }}>
                <SectionLabel>Quick Info</SectionLabel>
                {[
                  { label: "Founded", value: "2015, New Delhi" },
                  { label: "Team Size", value: "100+ Experts" },
                  { label: "Clients Served", value: "10,000+" },
                  { label: "Countries Covered", value: "25+ Countries" },
                  { label: "Our Failure Rate", value: "0%" },
                ].map((item, i, arr) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < arr.length - 1 ? `1px solid ${T.border}` : "none" }}>
                    <span style={{ fontFamily: T.sans, fontSize: 13, color: T.muted }}>{item.label}</span>
                    <span style={{ fontFamily: T.poppins, fontSize: 13, color: T.slate, fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                  </div>
                ))}
                <button onClick={() => router.push("/contact")}
                  style={{ width: "100%", marginTop: 22, padding: 13, background: T.orange, color: "#fff", fontWeight: 600, borderRadius: 6, border: "none", fontFamily: T.poppins, fontSize: 14, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = T.teal}
                  onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                  Get Free Consultation →
                </button>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${T.border}`, display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { icon: "📞", label: "Call Us", value: "+91-9891229135", href: "tel:+919891229135" },
                    { icon: "✉", label: "Email Us", value: "starindia.acc@gmail.com", href: "mailto:starindia.acc@gmail.com" },
                  ].map(item => (
                    <a key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 7, backgroundColor: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{item.icon}</div>
                      <div>
                        <div style={{ fontFamily: T.sans, fontSize: 10, color: T.teal, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</div>
                        <div style={{ fontFamily: T.poppins, fontSize: 13, color: T.slate, fontWeight: 500, marginTop: 1 }}>{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══ STORY + MISSION ══ */}
      <section className="sec" style={{ background: T.white }}>
        <div className="inner">
          <div className="story-grid">
            <div className="reveal-left" ref={storyImgRef} style={{ position: "relative" }}>
              <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80&fit=crop" alt="Compliance experts" height={460} width={900} style={{ width: "100%", borderRadius: 10, height: 460, objectFit: "cover", boxShadow: "0 24px 64px rgba(0,0,0,0.10)" }} unoptimized />
              <div className="float-card" style={{ position: "absolute", bottom: -16, right: -12, background: T.white, borderRadius: 8, padding: "20px 26px", boxShadow: "0 16px 48px rgba(0,0,0,0.11)", border: `1px solid ${T.tealLight}` }}>
                <div style={{ fontFamily: T.poppins, fontSize: 36, color: T.teal, fontWeight: 700, lineHeight: 1 }}>10K+</div>
                <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.muted, marginTop: 4 }}>Happy Clients Served</div>
              </div>
              <div style={{ position: "absolute", top: 20, left: 20, background: T.teal, borderRadius: 4, padding: "7px 16px" }}>
                <span style={{ fontFamily: T.poppins, fontSize: 11, fontWeight: 700, color: "#fff", letterSpacing: "0.1em" }}>EST. 2015</span>
              </div>
            </div>
            <div className="reveal-right" ref={storyTxtRef}>
              <SectionLabel>Our Story</SectionLabel>
              <h2 style={{ fontFamily: T.poppins, fontSize: 40, color: T.titleblue, marginBottom: 20, fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.01em" }}>
                Built by Compliance Experts,<br />for Businesses
              </h2>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 16, textAlign: "justify" }}>
                In 2015, our founder Mahesh Kumar — after spending over a decade navigating India's complex regulatory maze — saw how countless manufacturers and importers were losing months and lakhs of rupees due to the lack of reliable certification guidance.
              </p>
              <p style={{ fontFamily: T.sans, fontSize: 15.5, color: T.para, lineHeight: 1.9, marginBottom: 16, textAlign: "justify" }}>
                He founded SIACC to bridge that gap. What started as a three-person office in North West Delhi has grown into a 100+ strong team of regulatory experts, lawyers, and certification specialists serving clients from startups to Fortune 500 companies.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }} ref={missionRef}>
                {[
                  { icon: "🎯", title: "Our Mission", text: "To make Indian regulatory compliance accessible, affordable, and stress-free for every business — from local startups to global enterprises entering India." },
                  { icon: "🔭", title: "Our Vision", text: "To be Asia's most trusted compliance partner, known for speed, accuracy, and the genuine care we bring to every client relationship." },
                  { icon: "⭐", title: "Our Promise", text: "No hidden fees. No unnecessary delays. No failed applications. If we take your case, we see it through — guaranteed." },
                ].map((card, i) => (
                  <div key={card.title} className={`mission-card reveal d${i}`}>
                    <div className="mission-icon">{card.icon}</div>
                    <div>
                      <h3 style={{ fontFamily: T.poppins, fontSize: 18, color: T.slate, marginBottom: 5, fontWeight: 600 }}>{card.title}</h3>
                      <p style={{ fontFamily: T.sans, fontSize: 15, color: T.para, lineHeight: 1.75, margin: 0, textAlign: "justify" }}>{card.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section className="sec" style={{ background: T.cream }}>
        <div className="inner">
          <div style={{ textAlign: "center", marginBottom: 35 }} className="reveal" ref={useReveal()}>
            <div style={{ display: "flex", justifyContent: "center" }}><SectionLabel>What We Stand For</SectionLabel></div>
            <h2 style={{ fontFamily: T.poppins, fontSize: 43, color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em" }}>Our Core Values</h2>
          </div>
          <div className="values-grid" ref={valuesRef}>
            {values.map((v, i) => (
              <div key={v.title} className={`value-card reveal d${i}`}>
                <div className="value-icon">{v.icon}</div>
                <h3 style={{ fontFamily: T.poppins, fontSize: 19, color: T.titleblue, marginBottom: 8, fontWeight: 600 }}>{v.title}</h3>
                <p style={{ fontFamily: T.sans, fontSize: 15, color: T.para, lineHeight: 1.75, margin: 0, textAlign: "justify" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section style={{ position: "relative", overflow: "hidden" }} className="sec">
        <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80&fit=crop" alt="Company growth" fill style={{ objectFit: "cover" }} unoptimized />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,27,42,0.95) 0%, rgba(14,128,128,0.88) 100%)" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 52 }} className="reveal" ref={useReveal({ threshold: 0.1 })}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><SectionLabel light>Our Journey</SectionLabel></div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,3.2vw,2.9rem)", color: "#fff", fontWeight: 700, letterSpacing: "-0.01em" }}>Milestones That Define Us</h2>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: 88, top: 0, bottom: 0, width: 1.5, background: "rgba(30,136,200,0.40)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }} ref={timelineRef}>
              {timeline.map((item, i) => (
                <div key={item.year} className={`reveal d${Math.min(i, 5)}`} style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
                  <div style={{ width: 80, flexShrink: 0, textAlign: "right" }}>
                    <span style={{ display: "inline-block", padding: "4px 12px", background: T.teal, color: "#fff", fontSize: 11, fontWeight: 700, borderRadius: 4, fontFamily: T.poppins, letterSpacing: "0.04em" }}>{item.year}</span>
                  </div>
                  <div style={{ width: 14, height: 14, borderRadius: "50%", background: T.teal, border: "2.5px solid #fff", flexShrink: 0, marginTop: 5, position: "relative", zIndex: 1 }} />
                  <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "20px 24px", border: "1px solid rgba(30,136,200,0.22)", flex: 1, backdropFilter: "blur(6px)" }}>
                    <h3 style={{ fontFamily: T.poppins, fontSize: 17, color: "#fff", marginBottom: 8, fontWeight: 600 }}>{item.title}</h3>
                    <p style={{ fontFamily: T.sans, fontSize: 15, color: "rgba(255,255,255,0.68)", lineHeight: 1.75, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CTA BAND ══ */}
      <section className="reveal" ref={ctaRef} style={{ background: T.ctaBand, borderTop: `1px solid ${T.ctaBandBorder}`, borderBottom: `1px solid ${T.ctaBandBorder}`, padding: "80px clamp(16px,5vw,56px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="cta-split">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 28, height: 1.5, background: T.teal }} />
                <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: T.teal }}>Start Today</span>
              </div>
              <h2 style={{ fontFamily: T.poppins, fontSize: 43, color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 14 }}>
                Ready to Work With<br />India's Best?
              </h2>
              <p style={{ fontFamily: T.sans, color: T.para, fontSize: 16, lineHeight: 1.8 }}>
                Join 10,000+ businesses who trust SIACC for their compliance needs.<br />Free consultation. Clear timeline. Transparent pricing.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
              <button onClick={() => router.push("/contact")}
                style={{ padding: "14px 36px", fontFamily: T.poppins, fontSize: 14, fontWeight: 600, letterSpacing: "0.02em", border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", whiteSpace: "nowrap", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = T.teal}
                onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                Get Free Consultation
              </button>
              <button onClick={() => router.push("/services")}
                style={{ padding: "13px 28px", border: `1.5px solid ${T.border}`, borderRadius: 6, fontFamily: T.poppins, fontSize: 14, fontWeight: 500, color: T.slate, background: T.white, whiteSpace: "nowrap", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = T.teal}
                onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                View Our Services →
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}