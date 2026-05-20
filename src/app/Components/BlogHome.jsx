"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* ── Brand tokens (exact from your codebase) ── */
const T = {
  teal: "#1E88C8",
  titleblue: "#0a6daa",
  tealDark: "#074D4D",
  tealMid: "#0E8080",
  tealLight: "#EBF5F5",
  amber: "#C8780A",
  amberLight: "#FEF3DC",
  amberDark: "#9A5C06",
  slate: "#0D1B2A",
  body: "#2D3748",
  muted: "#718096",
  subtle: "#A0AEC0",
  border: "#E8E3DA",
  white: "#FFFFFF",
  cream: "#FAF8F4",
  ctaBand: "#EBF5FB",
  ctaBandBorder: "#C8DFF0",
  orange: "#F97316",
  para: "#080000b0",
  paradark: "#080000c4",
  poppins: "'Poppins', 'system-ui', sans-serif",
};

/* ── Static blog posts ── */
const posts = [
  {
    id: 1,
    tag: "BIS Certification",
    tagColor: T.tealLight,
    tagText: T.tealMid,
    title: "BIS CRS Registration: What Every Electronics Importer Must Know in 2025",
    excerpt:
      "Mandatory for 70+ product categories, CRS registration can make or break your India market entry. Here's the complete step-by-step guide.",
    date: "Apr 28, 2025",
    readTime: "6 min read",
    image:
      "/images/bis2.png",
    featured: true,
  },
  {
    id: 2,
    tag: "EPR",
    tagColor: T.amberLight,
    tagText: T.amberDark,
    title: "EPR Registration for E-Waste: A Complete Compliance Roadmap",
    excerpt:
      "Extended Producer Responsibility rules are tightening. Learn how to register, report, and stay compliant without disrupting your supply chain.",
    date: "Apr 15, 2025",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80&fit=crop",
    featured: false,
  },
  {
    id: 3,
    tag: "WPC / ETA",
    tagColor: T.tealLight,
    tagText: T.tealMid,
    title: "WPC ETA Approval for Wireless Devices: Timelines, Docs & Common Pitfalls",
    excerpt:
      "Bluetooth, Wi-Fi, and GPS devices all need WPC clearance before import. We break down the process so you avoid costly delays at customs.",
    date: "Mar 30, 2025",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
    featured: false,
  },
  {
    id: 4,
    tag: "ISO Certification",
    tagColor: "#F0FDF4",
    tagText: "#15803d",
    title: "ISO 9001:2015 Certification: Is Your Business Actually Ready?",
    excerpt:
      "Many companies jump into ISO certification unprepared. This checklist helps you assess gaps, set timelines, and avoid a failed audit.",
    date: "Mar 12, 2025",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&fit=crop",
    featured: false,
  },
];

/* ── Reveal hook ── */
function useReveal(opts = {}) {
  const { threshold = 0.12, stagger = false, baseDelay = 90 } = opts;
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (stagger) {
          Array.from(el.children).forEach((child, i) => {
            child.style.transitionDelay = i * baseDelay + "ms";
            child.classList.add("bh-revealed");
          });
        } else {
          el.classList.add("bh-revealed");
        }
        obs.unobserve(el);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, stagger, baseDelay]);
  return ref;
}

/* ── Small card (right column) ── */
function SmallCard({ post, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        gap: 16,
        padding: "18px 20px",
        borderRadius: 10,
        border: `1px solid ${hovered ? T.teal : T.border}`,
        background: hovered ? T.ctaBand : T.white,
        cursor: "pointer",
        transition: "all 0.22s",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        boxShadow: hovered ? "0 6px 24px rgba(30,136,200,0.09)" : "none",
        fontFamily: T.poppins,
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
          overflow: "hidden",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s",
            transform: hovered ? "scale(1.08)" : "scale(1)",
          }}
        />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Tag */}
        <span
          style={{
            display: "inline-block",
            padding: "2px 9px",
            borderRadius: 3,
            fontSize: 9.5,
            fontWeight: 700,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            background: post.tagColor,
            color: post.tagText,
            marginBottom: 7,
            fontFamily: T.poppins,
          }}
        >
          {post.tag}
        </span>

        <h4
          style={{
            fontFamily: T.poppins,
            fontSize: 13,
            fontWeight: 600,
            color: hovered ? T.titleblue : T.slate,
            lineHeight: 1.45,
            marginBottom: 8,
            transition: "color 0.2s",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {post.title}
        </h4>

        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            fontFamily: T.poppins,
            fontSize: 11,
            color: T.muted,
          }}
        >
          <span>{post.date}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: T.subtle, flexShrink: 0 }} />
          <span>{post.readTime}</span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
export default function BlogHome() {
  const router = useRouter();
  const [featHovered, setFeatHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  const headerRef = useReveal();
  const featRef = useReveal({ threshold: 0.1 });
  const cardsRef = useReveal({ stagger: true, baseDelay: 100 });

  const featured = posts.find((p) => p.featured);
  const side = posts.filter((p) => !p.featured);

  return (
    <>
      {/* ── Scoped animation styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

        .bh-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .bh-reveal.bh-revealed {
          opacity: 1;
          transform: translateY(0);
        }
        .bh-reveal-left {
          opacity: 0;
          transform: translateX(-28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .bh-reveal-left.bh-revealed {
          opacity: 1;
          transform: translateX(0);
        }

        /* stagger children */
        .bh-stagger > * {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .bh-stagger > *.bh-revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .bh-feat-img {
          transition: transform 0.5s ease;
        }
        .bh-feat-img:hover {
          transform: scale(1.04);
        }

        @media (max-width: 1024px) {
          .bh-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .bh-feat-meta { flex-wrap: wrap; }
        }
      `}</style>

      <section
        style={{
          background: T.cream,
          padding: "clamp(64px,8vw,104px) clamp(16px,5vw,56px)",
          fontFamily: T.poppins,
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {/* ── Section header ── */}
          <div
            ref={headerRef}
            className="bh-reveal"
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
              marginBottom: 48,
            }}
          >
            <div>
              {/* Eyebrow */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 28, height: 1.5, background: T.teal, flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: T.poppins,
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: T.teal,
                  }}
                >
                  Knowledge Hub
                </span>
              </div>

              <h2
                style={{
                  fontFamily: T.poppins,
                  fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)",
                  fontWeight: 700,
                  color: T.titleblue,
                  lineHeight: 1.1,
                  letterSpacing: "-0.01em",
                  marginBottom: 10,
                }}
              >
                Insights &amp; Regulatory{" "}
                <span style={{ color: T.orange }}>Guides</span>
              </h2>
              <p
                style={{
                  fontFamily: T.poppins,
                  fontSize: 14.5,
                  fontWeight: 500,
                  color: T.para,
                  maxWidth: 480,
                  lineHeight: 1.75,
                }}
              >
                Expert articles on BIS, EPR, WPC, ISO and more — written by our
                regulatory consultants to keep you informed and compliant.
              </p>
            </div>

            {/* CTA button */}
            <button
              onClick={() => router.push("/blog")}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                borderRadius: 6,
                border: `1.5px solid ${btnHovered ? T.teal : T.border}`,
                background: btnHovered ?  T.white: T.orange ,
                color: btnHovered ?  T.slate : T.white ,
                fontFamily: T.poppins,
                fontSize: 13.5,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.22s",
                whiteSpace: "nowrap",
                flexShrink: 0,
                boxShadow: btnHovered ? "0 4px 18px rgba(30,136,200,0.18)" : "none",
              }}
            >
              View All Articles
              <span
                style={{
                  display: "inline-block",
                  transition: "transform 0.2s",
                  transform: btnHovered ? "translateX(4px)" : "translateX(0)",
                }}
              >
                →
              </span>
            </button>
          </div>

          {/* ── Main grid: featured (left) + side cards (right) ── */}
          <div
            className="bh-main-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 400px",
              gap: 24,
              alignItems: "stretch",
            }}
          >

            {/* ── Featured post ── */}
            <div
              ref={featRef}
              className="bh-reveal-left"
              onClick={() => router.push("/blog")}
              onMouseEnter={() => setFeatHovered(true)}
              onMouseLeave={() => setFeatHovered(false)}
              style={{
                borderRadius: 12,
                overflow: "hidden",
                border: `1px solid ${featHovered ? T.teal : T.border}`,
                background: T.white,
                cursor: "pointer",
                transition: "all 0.28s",
                boxShadow: featHovered
                  ? "0 16px 48px rgba(30,136,200,0.12)"
                  : "0 4px 20px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: 280, overflow: "hidden", flexShrink: 0 }}>
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="bh-feat-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 40%",
                    transform: featHovered ? "scale(1.04)" : "scale(1)",
                    transition: "transform 0.5s ease",
                  }}
                />
                {/* Gradient overlay at bottom */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(13,27,42,0.55) 0%, rgba(13,27,42,0.10) 55%, transparent 100%)",
                  }}
                />
                {/* Featured badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: T.orange,
                    color: T.white,
                    borderRadius: 4,
                    padding: "4px 12px",
                    fontFamily: T.poppins,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  ★ Featured
                </div>
                {/* Tag badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: featured.tagColor,
                    color: featured.tagText,
                    borderRadius: 4,
                    padding: "4px 12px",
                    fontFamily: T.poppins,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {featured.tag}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "28px 28px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    fontFamily: T.poppins,
                    fontSize: "clamp(1.1rem, 2vw, 1.45rem)",
                    fontWeight: 700,
                    color: featHovered ? T.slate : T.titleblue,
                    lineHeight: 1.35,
                    marginBottom: 14,
                    transition: "color 0.2s",
                  }}
                >
                  {featured.title}
                </h3>
                <p
                  style={{
                    fontFamily: T.poppins,
                    fontSize: 14,
                    fontWeight: 500,
                    color: T.para,
                    lineHeight: 1.8,
                    marginBottom: 24,
                    flex: 1,
                  }}
                >
                  {featured.excerpt}
                </p>

                {/* Meta + Read more */}
                <div
                  className="bh-feat-meta"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    paddingTop: 18,
                    borderTop: `1px solid ${T.border}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "center",
                      fontFamily: T.poppins,
                      fontSize: 12,
                      color: T.muted,
                    }}
                  >
                    {/* Author avatar placeholder */}
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${T.teal}, ${T.tealMid})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: T.white,
                        fontSize: 12,
                        fontWeight: 700,
                        flexShrink: 0,
                        fontFamily: T.poppins,
                      }}
                    >
                      SI
                    </div>
                    <div>
                      <div style={{ fontFamily: T.poppins, fontSize: 12, fontWeight: 600, color: T.slate }}>SIACC Experts</div>
                      <div style={{ fontFamily: T.poppins, fontSize: 11, color: T.muted }}>
                        {featured.date} · {featured.readTime}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "9px 20px",
                      borderRadius: 6,
                      background: featHovered ? T.orange : T.tealLight,
                      color: featHovered ? T.white : T.teal,
                      fontFamily: T.poppins,
                      fontSize: 12.5,
                      fontWeight: 600,
                      transition: "all 0.22s",
                      flexShrink: 0,
                    }}
                  >
                    Read Article
                    <span
                      style={{
                        display: "inline-block",
                        transition: "transform 0.2s",
                        transform: featHovered ? "translateX(3px)" : "translateX(0)",
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Side cards ── */}
            <div
              ref={cardsRef}
              className="bh-stagger"
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {side.map((post) => (
                <SmallCard
                  key={post.id}
                  post={post}
                  onClick={() => router.push("/blog")}
                />
              ))}

              {/* ── "More articles" teaser card ── */}
              <div
                onClick={() => router.push("/blog")}
                style={{
                  borderRadius: 10,
                  border: `1.5px dashed ${T.ctaBandBorder}`,
                  background: T.ctaBand,
                  padding: "22px 20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  transition: "border-color 0.2s, background 0.2s",
                  fontFamily: T.poppins,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = T.teal;
                  e.currentTarget.style.background = T.tealLight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = T.ctaBandBorder;
                  e.currentTarget.style.background = T.ctaBand;
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: T.poppins,
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: T.titleblue,
                      marginBottom: 4,
                    }}
                  >
                    Explore All Articles
                  </div>
                  <div
                    style={{
                      fontFamily: T.poppins,
                      fontSize: 12,
                      fontWeight: 300,
                      color: T.muted,
                    }}
                  >
                    BIS · EPR · WPC · ISO · LMPC · CDSCO
                  </div>
                </div>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: T.teal,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: T.white,
                    fontSize: 16,
                    fontWeight: 700,
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  →
                </div>
              </div>
            </div>
          </div>

          {/* ── Bottom strip: topic tags ── */}
          <div
            style={{
              marginTop: 40,
              paddingTop: 28,
              borderTop: `1px solid ${T.border}`,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                fontFamily: T.poppins,
                fontSize: 11,
                fontWeight: 600,
                color: T.muted,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginRight: 4,
              }}
            >
              Browse Topics:
            </span>
            {[
              { label: "BIS Certification", color: T.tealLight, text: T.tealMid },
              { label: "EPR Registration", color: T.amberLight, text: T.amberDark },
              { label: "WPC / ETA", color: T.tealLight, text: T.tealMid },
              { label: "ISO Standards", color: "#F0FDF4", text: "#15803d" },
              { label: "LMPC", color: T.amberLight, text: T.amberDark },
              { label: "CDSCO", color: T.tealLight, text: T.tealMid },
            ].map((tag) => (
              <span
                key={tag.label}
                onClick={() => router.push("/blog")}
                style={{
                  display: "inline-block",
                  padding: "5px 14px",
                  borderRadius: 4,
                  background: tag.color,
                  color: tag.text,
                  fontFamily: T.poppins,
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  border: `1px solid transparent`,
                  transition: "border-color 0.18s, transform 0.18s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = tag.text;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}