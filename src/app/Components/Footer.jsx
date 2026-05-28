import Link from "next/link";
import Image from 'next/image';
import { Phone, Mail, MapPin } from "lucide-react";

const iconStyle = { width: 14, height: 14, flexShrink: 0, color: "rgba(255,255,255,0.60)" };

const T = {
  teal: "#1E88C8",
  tealDark: "#074D4D",
  tealMid: "#0E8080",
  tealLight: "#EBF5F5",
  amber: "#C8780A",
  amberLight: "#FEF3DC",
  slate: "#0D1B2A",
  slateMid: "#1C3144",
  muted: "#718096",
  subtle: "#A0AEC0",
  border: "#E8E3DA",
  white: "#FFFFFF",
  cream: "#FAF8F4",
  ctaBand: "#EBF5FB",
  ctaBandBorder: "#C8DFF0",
  orange: "#F97316",
  serif: "'Cormorant Garamond', 'Georgia', serif",
  sans: "'Outfit', 'system-ui', sans-serif",
};

const footerServices = [
  { name: "BIS Certification", href: "/bis" },
  { name: "EPR Registration", href: "/epr" },
  { name: "WPC-ETA Approval", href: "/wpc" },
  { name: "TEC / MTCTE", href: "/tec" },
  { name: "BEE Registration", href: "/bee" },
  { name: "LMPC Registration", href: "/lmpc" },
  { name: "ISO Certification", href: "/iso" },
  { name: "CDSCO / Drug License", href: "/cdsco" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "All Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Careers", href: "/career" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer style={{ fontFamily: T.sans, backgroundColor: T.slate }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }

        /* ── CTA band — matches HomeScreen CTA band exactly ── */
        .footer-cta-band {
          background: ${T.ctaBand};
          border-top: 1px solid ${T.ctaBandBorder};
          border-bottom: 1px solid ${T.ctaBandBorder};
          padding: 48px 24px;
        }
        .footer-cta-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 28px;
        }
        .footer-cta-btns {
          display: flex;
          gap: 12px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .footer-cta-band { padding: 32px 16px; }
          .footer-cta-inner { flex-direction: column; align-items: flex-start; }
          .footer-cta-btns { width: 100%; }
          .footer-cta-btns a, .footer-cta-btns button { flex: 1; text-align: center; justify-content: center; }
        }

        /* ── Main footer grid ── */
        .footer-main-grid {
          max-width: 1280px;
          margin: 0 auto;
          padding: 56px 24px 40px;
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr 1.8fr;
          gap: 48px;
        }
        @media (max-width: 1024px) {
          .footer-main-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 560px) {
          .footer-main-grid { grid-template-columns: 1fr; gap: 32px; padding: 40px 16px 32px; }
        }

        /* ── Newsletter input row ── */
        .footer-email-row { display: flex; gap: 8px; margin-bottom: 24px; }
        @media (max-width: 400px) {
          .footer-email-row { flex-direction: column; }
          .footer-email-row button { width: 100%; padding: 10px; }
        }

        /* ── Divider line between grid and bottom bar ── */
        .footer-divider {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin: 0 24px;
        }

        /* ── Bottom bar ── */
        .footer-bottom-pad { padding: 20px 24px; }
        .footer-bottom-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 8px;
          text-align: center;
        }
        @media (max-width: 560px) {
          .footer-bottom-pad { padding: 16px; }
        }

        /* ── Footer link hover ── */
        .f-link { transition: color 0.18s; }
        .f-link:hover { color: ${T.teal} !important; }
      `}</style>

      {/* ── MAIN FOOTER GRID — slate bg ── */}
      <div className="footer-main-grid">

        {/* Brand column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, }}>

            {/* logo */}
            <button
              onClick={() => go("/")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                background: "none",
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
                padding: 0,
              }}
            >
              <Image src="/finalimages/starlogo.png"
  alt="SIACC Logo"
  height={50}
  width={900}
  style={{
                  height: 50,
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  marginRight: -100,   // ← pulls title closer, adjust this value
                }}
/>
              <Image src="/finalimages/starlogotitle.png"
  alt="Star India Accreditation"
  height={20}
  width={900}
  style={{
                  height: 20,
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  marginLeft: 0,
                }}
/>
            </button>
          </div>
          <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 24, maxWidth: 260 }}>
            India's trusted compliance &amp; certification consultancy. 12+ years, 10,000+ clients, 0% failure rate.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a href="tel:+91-9891229135" className="f-link"
              style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.60)", textDecoration: "none" }}>
              <Phone style={iconStyle} />
              <span>+91-9891229135</span>
              <span style={{ opacity: 0.4 }}>|</span>
              <span>+91-9540190334</span>
            </a>
            <a href="mailto:info@siacc.co.in" className="f-link"
              style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.60)", textDecoration: "none" }}>
              <Mail style={iconStyle} />
              <span>✉ starindia.acc@gmail.com
</span>
            </a>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.55)" }}>
              <MapPin style={{ ...iconStyle, marginTop: 1 }} />
              <span>House No. 211, Ground Floor, Pocket 9,<br />North West New Delhi – 110086</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontFamily: T.serif, fontSize: 17, color: "#fff", marginBottom: 20, fontWeight: 600 }}>Our Services</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {footerServices.map(s => (
              <Link key={s.name} href={s.href} className="f-link"
                style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.58)", textDecoration: "none" }}>
                → {s.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontFamily: T.serif, fontSize: 17, color: "#fff", marginBottom: 20, fontWeight: 600 }}>Quick Links</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
            {quickLinks.map(l => (
              <Link key={l.name} href={l.href} className="f-link"
                style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.58)", textDecoration: "none" }}>
                → {l.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter + Badges */}
        <div>
          <h4 style={{ fontFamily: T.serif, fontSize: 17, color: "#fff", marginBottom: 12, fontWeight: 600 }}>Stay Updated</h4>
          <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 16, lineHeight: 1.7 }}>
            Get regulatory updates, QCO notifications &amp; compliance alerts.
          </p>

          {/* Email input — styled to match site inputs */}
          <div className="footer-email-row">
            <input
              type="email"
              placeholder="Your email"
              style={{
                flex: 1, padding: "10px 14px", fontFamily: T.sans, fontSize: 13,
                backgroundColor: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6, color: "#fff", outline: "none", minWidth: 0,
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.currentTarget.style.borderColor = T.teal}
              onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"}
            />
            <button
              style={{
                padding: "10px 16px", background: T.orange, color: "#fff",
                fontWeight: 600, borderRadius: 6, border: "none",
                cursor: "pointer", fontFamily: T.sans, fontSize: 14,
                flexShrink: 0, transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = T.teal}
              onMouseLeave={e => e.currentTarget.style.background = T.orange}>
              →
            </button>
          </div>

          {/* Badges */}
          <h4 style={{ fontFamily: T.serif, fontSize: 13, color: "#fff", marginBottom: 10, fontWeight: 600 }}>Certified &amp; Recognized By</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["BIS", "EPR", "WPC", "TEC", "ISO", "DPIIT"].map(badge => (
              <span key={badge} style={{
                padding: "4px 12px", fontFamily: T.sans, fontSize: 11, fontWeight: 700,
                border: `1px solid rgba(30,136,200,0.45)`,
                color: T.teal,
                borderRadius: 3,
                backgroundColor: "rgba(30,136,200,0.10)",
                letterSpacing: "0.04em",
              }}>
                {badge}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ── Teal accent divider ── */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(30,136,200,0.30), transparent)", margin: "0 24px" }} />

      {/* ── BOTTOM BAR ── */}
      <div className="footer-bottom-pad">
        <div className="footer-bottom-inner">
          <span style={{ fontFamily: T.sans, fontSize: 12, color: "rgba(255,255,255,0.40)" }}>
            © {new Date().getFullYear()} SIACC — Star India Accreditation. All rights reserved.
          </span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.20)" }}>|</span>
          <a
            href="https://developersinfotech.in/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: T.sans, color: T.teal, textDecoration: "none", fontWeight: 600, fontSize: 12, transition: "opacity 0.18s" }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.75"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Developed by Developers Infotech Pvt Ltd
          </a>
        </div>
      </div>

    </footer>
  );
}