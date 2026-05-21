"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../animations.css";

const API_URL = "http://localhost:5000/api";

const T = {
  teal: "#1E88C8", titleblue: "#0a6daa", tealDark: "#074D4D",
  tealMid: "#0E8080", tealLight: "#EBF5F5", tealGhost: "#F4FAFA",
  amber: "#C8780A", amberLight: "#FEF3DC", amberDark: "#9A5C06",
  slate: "#0D1B2A", body: "#2D3748", muted: "#718096", subtle: "#A0AEC0",
  border: "#E8E3DA", white: "#FFFFFF", cream: "#FAF8F4",
  ctaBand: "#EBF5FB", ctaBandBorder: "#C8DFF0", orange: "#F97316",
  poppins: "'Poppins','system-ui',sans-serif",
  sans: "'Outfit','system-ui',sans-serif",
};

const tagColors = {
  "BIS": { bg: "#FEF3DC", text: "#9A5C06" },
  "BIS Update": { bg: "#FEF3DC", text: "#dda65a" },
  "EPR": { bg: "#DCFCE7", text: "#166534" },
  "WPC": { bg: "#EBF5F5", text: "#074D4D" },
  "TEC": { bg: "#EDE9FE", text: "#5b21b6" },
  "BEE": { bg: "#FEF3C7", text: "#92400e" },
  "LMPC": { bg: "#FFE4E6", text: "#9f1239" },
  "ISO": { bg: "#EBF5F5", text: "#0E8080" },
  "CDSCO": { bg: "#FDF2F8", text: "#9d174d" },
};

const categories = ["All", "BIS", "EPR", "WPC", "TEC", "BEE", "LMPC", "ISO", "CDSCO"];

const heroChips = [
  { icon: "📝", label: "Latest Articles" },
  { icon: "📅", label: "Weekly Updates" },
  { icon: "🔍", label: "BIS · EPR · WPC · TEC" },
  { icon: "🎁", label: "Always Free" },
];

function useReveal(opts = {}) {
  const { threshold = 0.15, stagger = false, baseDelay = 90, once = true } = opts;
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (stagger) {
        Array.from(el.children).forEach((child, i) => {
          child.style.transitionDelay = i * baseDelay + "ms";
          child.classList.add("revealed");
        });
      } else { el.classList.add("revealed"); }
      if (once) obs.unobserve(el);
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, stagger, baseDelay, once]);
  return ref;
}

export default function BlogScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      console.log("FETCHING BLOGS FROM:", API_URL); // add this line
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/blogs/published`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        const data = await res.json();
        if (data.success) {
          console.log("BLOGS COUNT:", data.data.length);
          setAllBlogs(data.data || []);
        }
        else setError("Failed to load blogs.");
      } catch {
        setError("Could not connect to server.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featured = allBlogs.find(b => b.featured) || allBlogs[0] || null;
  const gridPosts = allBlogs.filter(b => !b.featured);

  const filtered = activeCategory === "All"
    ? gridPosts
    : gridPosts.filter(p => p.tag === activeCategory || (p.tag || "").startsWith(activeCategory));

  const heroLeftRef = useReveal();
  const featuredRef = useReveal();
  const postsTitleRef = useReveal();
  const postsGridRef = useReveal({ stagger: true, baseDelay: 70 });
  const newsletterRef = useReveal();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: T.white, fontFamily: T.sans, color: T.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        img { max-width:100%; display:block; } a { text-decoration:none; color:inherit; }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.6;transform:scale(1.3);} }
        @keyframes spin { to { transform:rotate(360deg); } }
        .hero-chip { display:inline-flex; align-items:center; gap:8px; background:rgba(255,255,255,0.09); border:1px solid rgba(255,255,255,0.16); backdrop-filter:blur(6px); border-radius:6px; padding:9px 16px; font-family:${T.poppins}; font-size:12.5px; font-weight:500; color:rgba(255,255,255,0.90); transition:background 0.2s,border-color 0.2s,transform 0.2s; }
        .hero-chip:hover { background:rgba(255,255,255,0.18); border-color:rgba(255,255,255,0.35); transform:translateY(-2px); }
        .cat-filter-bar { background:${T.white}; border-bottom:1px solid ${T.border}; padding:0 24px; position:sticky; top:68px; z-index:10; box-shadow:0 2px 8px rgba(0,0,0,0.04); }
        .cat-filter-inner { max-width:1280px; margin:0 auto; display:flex; gap:8px; overflow-x:auto; padding:14px 0; scrollbar-width:none; }
        .cat-filter-inner::-webkit-scrollbar { display:none; }
        @media(max-width:480px){ .cat-filter-bar { padding:0 12px; top:60px; } }
        .cat-btn { padding:7px 16px; border-radius:999px; font-size:13px; font-weight:500; border:1.5px solid ${T.border}; background:transparent; color:${T.muted}; cursor:pointer; white-space:nowrap; font-family:${T.poppins}; transition:all 0.2s; flex-shrink:0; }
        .cat-btn:hover { border-color:${T.teal}; color:${T.teal}; }
        .cat-btn.active { background:${T.teal}; border-color:${T.teal}; color:#fff; }
        .featured-card { border-radius:12px; overflow:hidden; margin-bottom:48px; display:grid; grid-template-columns:1fr 1fr; min-height:300px; border:1px solid #C8DFF0; box-shadow:0 8px 32px rgba(30,136,200,0.10); transition:box-shadow 0.25s,transform 0.25s; cursor:pointer; }
        .featured-card:hover { transform:translateY(-3px); box-shadow:0 16px 48px rgba(30,136,200,0.14); }
        @media(max-width:768px){ .featured-card { grid-template-columns:1fr; } .featured-img { min-height:200px; } }
        .featured-content { padding:32px 36px; background:#EBF5FB; display:flex; flex-direction:column; justify-content:center; }
        @media(max-width:480px){ .featured-content { padding:22px 20px; } }
        .posts-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:20px; }
        @media(max-width:640px){ .posts-grid { grid-template-columns:1fr; } }
        .post-card { background:${T.white}; border-radius:10px; border:1px solid ${T.border}; overflow:hidden; cursor:pointer; transition:all 0.25s ease; display:flex; flex-direction:column; }
        .post-card:hover { border-color:${T.teal}; transform:translateY(-4px); box-shadow:0 14px 36px rgba(30,136,200,0.12); }
        .post-card:hover .post-img { transform:scale(1.05); }
        .post-img { transition:transform 0.35s ease; }
        .newsletter-input-row { display:flex; gap:10px; max-width:460px; margin:0 auto; }
        @media(max-width:480px){ .newsletter-input-row { flex-direction:column; } .newsletter-input-row button { width:100%; } }
        .section-label-row { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
        .section-label-line { width:28px; height:1.5px; background:${T.teal}; }
        .section-label-text { font-family:${T.poppins}; font-size:11px; font-weight:600; letter-spacing:0.15em; text-transform:uppercase; color:${T.teal}; }
        .sec-pad { padding:80px 24px; }
        @media(max-width:768px){ .sec-pad { padding:52px 16px !important; } }
        .spinner { width:36px; height:36px; border:3px solid #E8E3DA; border-top-color:${T.teal}; border-radius:50%; animation:spin 0.75s linear infinite; margin:0 auto; }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${T.border}`, minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom,${T.orange},${T.teal})`, zIndex: 3 }} />
        <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=85&fit=crop" alt="Blog background" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right,rgba(7,18,28,0.88) 0%,rgba(7,18,28,0.60) 50%,rgba(7,18,28,0.10) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,4vw,60px)" }}>
          <div ref={heroLeftRef} className="reveal-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", borderRadius: 4, padding: "6px 16px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>Compliance Insights — Updated Weekly</span>
            </div>
            <h1 style={{ fontFamily: T.poppins, fontSize: "clamp(2.4rem,5vw,3.6rem)", fontWeight: 700, lineHeight: 1.04, marginBottom: 20, letterSpacing: "-0.01em", color: "#fff", maxWidth: 640 }}>
              Regulatory Updates &{" "}<span style={{ color: T.orange }}>Certification</span> Guides
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 }}>
              {heroChips.map(chip => (
                <span key={chip.label} className="hero-chip"><span style={{ fontSize: 15 }}>{chip.icon}</span>{chip.label}</span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: T.teal, opacity: 0.6, zIndex: 2 }} />
      </section>

      {/* CATEGORY FILTERS */}
      <div className="cat-filter-bar">
        <div className="cat-filter-inner">
          {categories.map(cat => (
            <button key={cat} className={`cat-btn ${activeCategory === cat ? "active" : ""}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
          ))}
        </div>
      </div>

      {/* POSTS */}
      <section id="posts-section" className="sec-pad" style={{ background: T.cream }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>

          {loading && (
            <div style={{ textAlign: "center", padding: "80px 24px" }}>
              <div className="spinner" />
              <p style={{ fontFamily: T.poppins, fontSize: 14, color: T.muted, marginTop: 16 }}>Loading articles…</p>
            </div>
          )}

          {!loading && error && (
            <div style={{ textAlign: "center", padding: "80px 24px" }}>
              <div style={{ fontSize: 40, marginBottom: 14 }}>⚠️</div>
              <p style={{ fontFamily: T.poppins, fontSize: 15, color: T.muted }}>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              {/* Featured */}
              {activeCategory === "All" && featured && (
                <div className="featured-card" ref={featuredRef} onClick={() => router.push(`/blog/${featured.slug}`)}>
                  <div className="featured-img" style={{ position: "relative", minHeight: 240 }}>
                    <img src={featured.img} alt={featured.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent,rgba(13,27,42,0.3))" }} />
                    <div style={{ position: "absolute", top: 16, left: 16 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, backgroundColor: T.amber, color: "#fff", padding: "4px 14px", borderRadius: 3, letterSpacing: "0.06em", fontFamily: T.poppins }}>FEATURED</span>
                    </div>
                  </div>
                  <div className="featured-content">
                    <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: T.poppins, fontSize: 10, fontWeight: 700, backgroundColor: featured.tagStyle?.bg || T.amberLight, color: featured.tagStyle?.text || T.amberDark, padding: "3px 12px", borderRadius: 3 }}>{featured.tag}</span>
                      <span style={{ fontSize: 12, color: T.muted, fontFamily: T.sans }}>{featured.date}</span>
                    </div>
                    <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.1rem,2vw,1.6rem)", color: T.slate, marginBottom: 12, fontWeight: 700, lineHeight: 1.3 }}>{featured.title}</h2>
                    <p style={{ fontFamily: T.sans, fontSize: 15, color: "#070707c0", lineHeight: 1.75, marginBottom: 20, textAlign: "justify" }}>{featured.excerpt}</p>
                    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                      <button style={{ padding: "10px 22px", backgroundColor: T.orange, color: "#fff", fontWeight: 600, borderRadius: 6, border: "none", fontSize: 13, cursor: "pointer", fontFamily: T.poppins, boxShadow: "0 4px 12px rgba(249,115,22,0.35)", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = T.teal}
                        onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                        Read Full Article →
                      </button>
                      <span style={{ fontSize: 12, color: T.subtle, fontFamily: T.sans }}>⏱ {featured.readTime}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Section heading */}
              <div style={{ marginBottom: 32 }} ref={postsTitleRef}>
                <div className="section-label-row">
                  <div className="section-label-line" />
                  <span className="section-label-text">{activeCategory === "All" ? "Latest Articles" : `${activeCategory} Articles`}</span>
                </div>
                <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.3rem,2.5vw,2rem)", color: T.titleblue, fontWeight: 700, letterSpacing: "-0.01em" }}>
                  {activeCategory === "All" ? "All Compliance Guides" : `${activeCategory} Compliance Guides`}
                </h2>
              </div>

              <div className="posts-grid" ref={postsGridRef}>
                {filtered.length === 0 ? (
                  <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 24px" }}>
                    <div style={{ fontSize: 40, marginBottom: 14 }}>📭</div>
                    <p style={{ fontFamily: T.poppins, fontSize: 16, color: T.muted }}>No articles yet in this category. Check back soon.</p>
                  </div>
                ) : filtered.map((post, i) => {
                  const tc = tagColors[post.tag] || { bg: T.tealLight, text: T.teal };
                  return (
                    <div key={post.slug} className={`post-card revealed d${Math.min(i, 7)}`}
                      onClick={() => post.slug && router.push(`/blog/${post.slug}`)}>
                      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                        <img src={post.img} alt={post.title} className="post-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(235,245,251,0.18) 0%,rgba(235,245,251,0.42) 100%)", pointerEvents: "none" }} />
                        <div style={{ position: "absolute", top: 14, left: 14 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, backgroundColor: tc.bg, color: tc.text, padding: "4px 12px", borderRadius: 3, fontFamily: T.poppins, letterSpacing: "0.06em" }}>{post.tag}</span>
                        </div>
                      </div>
                      <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ fontFamily: T.sans, fontSize: 11, color: T.subtle, marginBottom: 8 }}>{post.date}</div>
                        <h3 style={{ fontFamily: T.poppins, fontSize: 16, color: T.slate, marginBottom: 8, fontWeight: 600, lineHeight: 1.35, flex: 1 ,  }}>{post.title}</h3>
                        <p style={{ fontFamily: T.sans, fontSize: 14, color: "#000000b7", lineHeight: 1.7, marginBottom: 14, textAlign: "justify" }}>{post.excerpt}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
                          <span style={{ fontFamily: T.sans, fontSize: 12, color: T.subtle }}>⏱ {post.readTime}</span>
                          <button style={{ fontFamily: T.poppins, fontSize: 12.5, color: T.orange, fontWeight: 600, background: "none", border: "none", cursor: "pointer", letterSpacing: "0.02em" }}>Read More →</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="newsletter-section" className="reveal" ref={newsletterRef} style={{ background: T.ctaBand, borderTop: `1px solid ${T.ctaBandBorder}`, borderBottom: `1px solid ${T.ctaBandBorder}`, padding: "80px clamp(16px,5vw,56px)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 28, height: 1.5, background: T.teal }} />
              <span style={{ fontFamily: T.poppins, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: T.teal }}>Stay Informed</span>
              <div style={{ width: 28, height: 1.5, background: T.teal }} />
            </div>
          </div>
          <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.4rem,3vw,2.2rem)", color: T.titleblue, marginBottom: 12, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            Get Regulatory Updates<br />in Your Inbox
          </h2>
          <p style={{ fontFamily: T.sans, fontSize: "clamp(13px,2vw,14.5px)", color: T.muted, marginBottom: 32, lineHeight: 1.8 }}>
            New QCO notifications, BIS updates, EPR changes — delivered weekly.<br />No spam, ever.
          </p>
          <div className="newsletter-input-row">
            <input type="email" placeholder="Your email address" style={{ flex: 1, padding: "13px 16px", border: `1.5px solid ${T.border}`, borderRadius: 6, fontFamily: T.sans, fontSize: 14, outline: "none", background: T.white, color: T.body, minWidth: 0, transition: "border-color 0.2s" }}
              onFocus={e => e.currentTarget.style.borderColor = T.teal}
              onBlur={e => e.currentTarget.style.borderColor = T.border} />
            <button style={{ padding: "13px 22px", backgroundColor: T.orange, color: "#fff", fontWeight: 600, borderRadius: 6, border: "none", fontFamily: T.poppins, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s", boxShadow: "0 4px 14px rgba(249,115,22,0.30)" }}
              onMouseEnter={e => e.currentTarget.style.background = T.teal}
              onMouseLeave={e => e.currentTarget.style.background = T.orange}>
              Subscribe →
            </button>
          </div>
          <p style={{ fontFamily: T.sans, fontSize: 12, color: T.subtle, marginTop: 14 }}>Join 5,000+ professionals. Unsubscribe anytime.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}