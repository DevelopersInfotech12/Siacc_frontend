"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, X, Instagram, Linkedin, Facebook, Sparkles } from "lucide-react";

const C = {
  primary: "#F97316",
  primaryDark: "#EA6A0A",
  primaryLight: "#FFF3E8",
  navy: "#0C2340",
  bodyText: "#374151",
  mutedText: "#6B7280",
  border: "#E5E7EB",
  white: "#FFFFFF",
  offWhite: "#F9FAFB",
  teal: "#1E88C8",
  tealLight: "#EBF5F5",
  serif: "'Playfair Display', Georgia, serif",
  sans: "'DM Sans', system-ui, sans-serif",
};

const serviceDropdown = [
  { name: "BIS-CRS Registration", href: "/bis-crs" },
  { name: "BIS-ISI Mark Certification", href: "/bis-isi" },
  { name: "WPC-ETA Approval", href: "/wpc" },
  { name: "Testing & Certification", href: "/testing&certification" },
  { name: "BEE Certification", href: "/bee" },
  { name: "ISO Certification", href: "/iso" },
  { name: "EPR Registration", href: "/epr" },
  { name: "TEC / MTCTE", href: "/tec" },
  { name: "LMPC Registration", href: "/lmpc" },
  { name: "CDSCO / Drug License", href: "/cdsco" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services", hasDropdown: true },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/career" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "Instagram", href: "https://instagram.com/siacc", icon: Instagram },
  { name: "LinkedIn", href: "https://linkedin.com/company/siacc", icon: Linkedin },
  { name: "Facebook", href: "https://facebook.com/siacc", icon: Facebook },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [mobileServices, setMobileServices] = useState(false);
  const [aiPulse, setAiPulse] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdown(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setAiPulse(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const go = (href) => { setDropdown(null); setMobileOpen(false); router.push(href); };

  return (
    <div style={{ fontFamily: C.sans, position: "sticky", top: 0, zIndex: 1000, margin: 0, padding: 0, lineHeight: 0 }}>
      <style>{`
        .mobile-burger { display: none !important; }
        .social-icon { transition: color 0.2s, opacity 0.2s; }
        .social-icon:hover { opacity: 0.7; }

        /* ── Fixed AI FAB: mobile only ── */
        .ai-fab-mobile {
          display: none;
          position: fixed;
          bottom: 88px;
          right: 24px;
          z-index: 9999;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1E88C8, #0a6daa);
          border: none;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 18px rgba(30,136,200,0.5);
          font-size: 22px;
          animation: aiFloat 3s ease-in-out infinite;
        }
        .ai-fab-mobile:active {
          transform: scale(0.93);
        }

        @keyframes aiFloat {
          0%, 100% { transform: translateY(0); box-shadow: 0 4px 18px rgba(30,136,200,0.5); }
          50%       { transform: translateY(-5px); box-shadow: 0 10px 28px rgba(30,136,200,0.65); }
        }
        @keyframes aiGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(30,136,200,0.4); }
          50%       { box-shadow: 0 0 0 6px rgba(30,136,200,0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .ai-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.25s !important;
        }
        .ai-btn:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 20px rgba(30,136,200,0.35) !important;
        }
        .ai-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2.5s ease-in-out infinite;
        }

        @media (max-width: 1024px) {
          .desktop-top-bar { display: none !important; }
          .desktop-nav     { display: none !important; }
          .desktop-cta     { display: none !important; }
          .mobile-burger   { display: flex !important; }
          .ai-fab-mobile   { display: flex !important; }
        }
      `}</style>

      {/* ── Fixed AI FAB (mobile only, above WhatsApp) ── */}
      <button
        className="ai-fab-mobile"
        onClick={() => go("/ai-recommendation")}
        aria-label="AI Recommendation"
        title="AI Recommendation"
      >
        ✨
      </button>

      {/* Top info bar */}
      <div className="desktop-top-bar" style={{ backgroundColor: "#EBF4FF", borderBottom: "1px solid #BFD7F5", fontSize: 13, padding: "7px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 24 }}>
          <span style={{ color: "#1E3A5F" }}>📞 +91- 9891229135</span>
          <span style={{ color: "#1E3A5F" }}>✉ starindia.acc@gmail.com</span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span style={{ color: "#4A6FA5" }}>Mon–Sat: 9:00 AM – 6:00 PM</span>
          <div style={{ display: "flex", gap: 14, alignItems: "center", borderLeft: "1px solid #BFD7F5", paddingLeft: 20 }}>
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="social-icon" style={{ color: C.primary, display: "flex", alignItems: "center" }}>
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav style={{ backgroundColor: C.white, borderBottom: `1px solid ${C.border}`, boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.08)" : "none", transition: "box-shadow 0.3s ease" }}>
        <div style={{ margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>

          {/* Logo */}
          <button onClick={() => go("/")} style={{ display: "flex", alignItems: "center", gap: 0, background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 0 }}>
            <img src="/finalimages/starlogo.png" alt="SIACC Logo" style={{ height: 50, width: "auto", objectFit: "contain", display: "block", marginRight: -100 }} />
            <img src="/finalimages/starlogotitle.png" alt="Star India Accreditation" style={{ height: 20, width: "auto", objectFit: "contain", display: "block", marginLeft: 0 }} />
          </button>

          {/* Desktop nav links */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} ref={dropdownRef} style={{ position: "relative" }}>
                  <button
                    onClick={(e) => { e.preventDefault(); setDropdown(dropdown === link.name ? null : link.name); }}
                    style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 14px", fontSize: 16, fontWeight: 500, color: C.bodyText, background: "none", border: "none", cursor: "pointer", borderRadius: 8, fontFamily: C.sans }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.primaryLight; e.currentTarget.style.color = C.primary; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = C.bodyText; }}
                  >
                    {link.name}
                    <ChevronDown size={14} style={{ color: C.primary, transform: dropdown === link.name ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
                  </button>
                  {dropdown === link.name && (
                    <div style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 8, width: 220, backgroundColor: C.white, borderRadius: 14, boxShadow: "0 16px 48px rgba(0,0,0,0.12)", border: `1px solid ${C.border}`, borderTop: `3px solid ${C.primary}`, padding: "8px 0", zIndex: 200 }}>
                      {serviceDropdown.map((d) => (
                        <button key={d.name} onClick={() => go(d.href)}
                          style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 20px", fontSize: 13, color: C.bodyText, background: "transparent", border: "none", cursor: "pointer", fontFamily: C.sans }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.primaryLight; e.currentTarget.style.color = C.primary; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = C.bodyText; }}
                        >{d.name}</button>
                      ))}
                      <div style={{ borderTop: `1px solid ${C.border}`, margin: "6px 0", padding: "8px 20px 4px" }}>
                        <button onClick={() => go("/services")} style={{ fontSize: 12, color: C.primary, fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontFamily: C.sans }}>
                          View All Services →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button key={link.name} onClick={() => go(link.href)}
                  style={{ padding: "8px 14px", fontSize: 16, fontWeight: 500, color: "#000000", background: "none", border: "none", cursor: "pointer", borderRadius: 8, fontFamily: C.sans }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.primaryLight; e.currentTarget.style.color = C.primary; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = C.bodyText; }}
                >{link.name}</button>
              )
            )}
          </div>

          {/* Desktop CTAs */}
          <div className="desktop-cta" style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
            <button
              onClick={() => go("/ai-recommendation")}
              className="ai-btn"
              style={{
                display: "flex", alignItems: "center", gap: 7,
                fontSize: 13, fontWeight: 700,
                color: "#fff",
                background: `linear-gradient(135deg, ${C.teal}, #0a6daa)`,
                padding: "9px 18px", borderRadius: 10, border: "none",
                cursor: "pointer", fontFamily: C.sans,
                animation: aiPulse ? "aiGlow 1.5s ease-in-out infinite" : "none",
              }}
            >
              ✨ AI Recommendation
            </button>

            <button onClick={() => go("/contact")}
              style={{ fontSize: 13, fontWeight: 700, color: "#fff", backgroundColor: C.primary, padding: "9px 18px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: C.sans, boxShadow: "0 4px 12px rgba(249,115,22,0.3)" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.primaryDark}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = C.primary}
            >Free Consultation</button>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="mobile-burger"
            style={{ padding: 8, background: "none", border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", alignItems: "center", justifyContent: "center" }}>
            {mobileOpen ? <X size={20} color={C.navy} /> : <Menu size={20} color={C.navy} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ backgroundColor: C.white, borderTop: `3px solid ${C.primary}`, padding: "16px 24px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>

          {/* AI Recommendation (Mobile menu) */}
          <button onClick={() => go("/ai-recommendation")}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              width: "100%", marginBottom: 12, padding: "13px 16px",
              fontSize: 14, fontWeight: 700, color: "#fff",
              background: `linear-gradient(135deg, ${C.teal}, #0a6daa)`,
              border: "none", borderRadius: 10, cursor: "pointer", fontFamily: C.sans,
              boxShadow: "0 4px 12px rgba(30,136,200,0.3)",
            }}>
            <Sparkles size={15} />
            ✨ AI Recommendation
          </button>

          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div key={link.name} style={{ marginBottom: 4 }}>
                <button
                  onClick={() => setMobileServices(!mobileServices)}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 16px", fontSize: 14, fontWeight: 500, color: C.navy,
                    background: mobileServices ? C.primaryLight : "transparent",
                    border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer",
                    fontFamily: C.sans, marginBottom: 4,
                  }}>
                  {link.name}
                  <ChevronDown size={14} style={{ color: C.primary, transform: mobileServices ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
                </button>
                {mobileServices && (
                  <div style={{ paddingLeft: 12, marginBottom: 4, background: C.offWhite, borderRadius: 8, border: `1px solid ${C.border}` }}>
                    {serviceDropdown.map((d) => (
                      <button key={d.name} onClick={() => go(d.href)}
                        style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", fontSize: 13, color: C.primary, background: "transparent", border: "none", borderBottom: `1px solid ${C.border}`, cursor: "pointer", fontFamily: C.sans }}
                        onMouseEnter={(e) => e.currentTarget.style.color = C.primaryDark}
                        onMouseLeave={(e) => e.currentTarget.style.color = C.primary}
                      >
                        → {d.name}
                      </button>
                    ))}
                    <button onClick={() => go("/services")}
                      style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 16px", fontSize: 12, fontWeight: 700, color: C.teal, background: "transparent", border: "none", cursor: "pointer", fontFamily: C.sans }}>
                      View All Services →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button key={link.name} onClick={() => go(link.href)}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 16px", fontSize: 14, fontWeight: 500, color: C.navy, background: "transparent", border: `1px solid ${C.border}`, borderRadius: 8, cursor: "pointer", fontFamily: C.sans, marginBottom: 4 }}>
                {link.name}
              </button>
            )
          )}

          <button onClick={() => go("/contact")}
            style={{ display: "block", width: "100%", marginTop: 12, padding: 13, fontSize: 14, fontWeight: 700, color: "#fff", backgroundColor: C.primary, borderRadius: 10, border: "none", cursor: "pointer", fontFamily: C.sans }}>
            Free Consultation
          </button>
        </div>
      )}
    </div>
  );
}