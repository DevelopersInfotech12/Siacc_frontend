"use client";
// /app/blog/[slug]/BlogDetailClient.jsx
// ✅ CLIENT COMPONENT — handles animations, interactivity, router navigation
// Data comes as props from page.jsx (server-fetched) — no useEffect fetch needed

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "../../Components/Navbar";
const Footer = dynamic(() => import("../../Components/Footer"));
import "../../animations.css";

const T = {
  teal: "#1E88C8", titleblue: "#0a6daa", tealDark: "#074D4D",
  tealMid: "#0E8080", tealLight: "#EBF5F5",
  amber: "#C8780A", amberLight: "#FEF3DC", amberDark: "#9A5C06",
  slate: "#0D1B2A", body: "#2D3748", muted: "#718096", subtle: "#A0AEC0",
  border: "#E8E3DA", white: "#FFFFFF", cream: "#FAF8F4",
  ctaBand: "#EBF5FB", ctaBandBorder: "#C8DFF0", orange: "#F97316",
  poppins: "'Poppins','system-ui',sans-serif",
  sans: "'Outfit','system-ui',sans-serif",
};

function useReveal(opts = {}) {
  const { threshold = 0.01, stagger = false, baseDelay = 80, once = true } = opts;
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

function ContentBlock({ block }) {
  if (block.type === "p")
    return <p dangerouslySetInnerHTML={{ __html: block.text }} />;
  if (block.type === "h3")
    return <h3>{block.text}</h3>;
  if (block.type === "ul")
    return <ul>{block.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}</ul>;
  if (block.type === "ol")
    return <ol>{block.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: item }} />)}</ol>;
  if (block.type === "callout")
    return <div className="callout"><p dangerouslySetInnerHTML={{ __html: block.text }} /></div>;
  if (block.type === "callout-warn")
    return <div className="callout-warn"><p dangerouslySetInnerHTML={{ __html: block.text }} /></div>;
  if (block.type === "steps")
    return (
      <div>
        {(block.stepItems || block.items || []).map((s, i) => (
          <div key={i} className="step-row">
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: T.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.poppins, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.poppins, fontSize: 15, fontWeight: 700, color: T.titleblue, marginBottom: 5 }}>{s.title}</div>
              <p style={{ marginBottom: 8 }}>{s.desc}</p>
              {s.tip && (
                <div className="step-tip">
                  <span style={{ fontFamily: T.poppins, fontSize: 12, color: T.tealMid, fontWeight: 600 }}>💡 {s.tip}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  if (block.type === "img")
    return <Image src={block.src} alt={block.alt || ""} style={{ borderRadius: 8, margin: "20px 0", width: "100%" }} unoptimized />;
  return null;
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  img { max-width:100%; display:block; } a { text-decoration:none; color:inherit; }

  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.6;transform:scale(1.3);} }
  @keyframes spin { to { transform:rotate(360deg); } }
  .spinner { width:36px; height:36px; border:3px solid #E8E3DA; border-top-color:#1E88C8; border-radius:50%; animation:spin 0.75s linear infinite; margin:0 auto; }

  .hero-chip {
    display:inline-flex; align-items:center; gap:8px;
    background:rgba(255,255,255,0.09);
    border:1px solid rgba(255,255,255,0.16);
    backdrop-filter:blur(6px);
    border-radius:6px; padding:9px 16px;
    font-family:'Outfit','system-ui',sans-serif; font-size:12.5px; font-weight:500;
    color:rgba(255,255,255,0.90);
    transition:background 0.2s, border-color 0.2s, transform 0.2s;
    cursor:default;
  }
  .hero-chip:hover { background:rgba(255,255,255,0.18); border-color:rgba(255,255,255,0.35); transform:translateY(-2px); }

  .article-body h2 {
    font-family:'Poppins','system-ui',sans-serif;
    font-size:clamp(1.2rem,2.2vw,1.5rem); color:#0a6daa;
    font-weight:700; margin:40px 0 14px;
    padding-bottom:10px; border-bottom:2px solid #EBF5FB;
  }
  .article-body h3 {
    font-family:'Poppins','system-ui',sans-serif;
    font-size:clamp(1rem,1.8vw,1.15rem); color:#0D1B2A;
    font-weight:600; margin:28px 0 10px;
  }
  .article-body p {
    font-family:'Outfit','system-ui',sans-serif;
    font-size:16px; color:#2D3748; line-height:1.9;
    margin-bottom:18px; text-align:justify;
  }
  .article-body ul, .article-body ol {
    font-family:'Outfit','system-ui',sans-serif;
    font-size:15.5px; color:#2D3748; line-height:1.85;
    margin:0 0 18px 22px;
  }
  .article-body li { margin-bottom:8px; }
  .article-body strong { color:#0D1B2A; font-weight:600; }

  .callout { background:#EBF5FB; border-left:4px solid #1E88C8; border-radius:0 8px 8px 0; padding:18px 22px; margin:28px 0; }
  .callout-warn { background:#FEF3DC; border-left:4px solid #C8780A; border-radius:0 8px 8px 0; padding:18px 22px; margin:28px 0; }
  .callout p, .callout-warn p { margin-bottom:0 !important; text-align:left !important; }

  .step-row { display:flex; gap:16px; align-items:flex-start; padding:18px 20px; background:#fff; border-radius:10px; border:1px solid #E8E3DA; margin-bottom:12px; transition:border-color 0.2s, box-shadow 0.2s; }
  .step-row:hover { border-color:#1E88C8; box-shadow:0 6px 20px rgba(30,136,200,0.08); }
  .step-tip { background:#EBF5F5; border-left:3px solid #1E88C8; border-radius:0 5px 5px 0; padding:7px 12px; }

  .toc-link { display:block; padding:7px 12px; border-radius:5px; font-family:'Outfit','system-ui',sans-serif; font-size:13.5px; color:#2D3748; transition:all 0.18s; text-decoration:none; }
  .toc-link:hover { background:#EBF5FB; color:#1E88C8; padding-left:16px; }

  .related-card { background:#fff; border:1px solid #E8E3DA; border-radius:10px; overflow:hidden; transition:all 0.25s; cursor:pointer; }
  .related-card:hover { border-color:#1E88C8; transform:translateY(-3px); box-shadow:0 12px 32px rgba(30,136,200,0.10); }
  .related-img { transition:transform 0.35s; }
  .related-card:hover .related-img { transform:scale(1.05); }

  .share-btn { display:inline-flex; align-items:center; gap:6px; padding:8px 18px; border-radius:6px; font-family:'Poppins','system-ui',sans-serif; font-size:12.5px; font-weight:600; cursor:pointer; border:1.5px solid #E8E3DA; background:transparent; color:#2D3748; transition:all 0.2s; }
  .share-btn:hover { border-color:#1E88C8; color:#1E88C8; }

  .cta-split { display:grid; grid-template-columns:1fr auto; gap:40px; align-items:center; }
  @media(max-width:720px){ .cta-split { grid-template-columns:1fr; gap:24px; } }
  @media(max-width:900px){ .article-layout { grid-template-columns:1fr !important; } .sidebar { display:none; } }
  @media(max-width:600px){ .article-body p, .article-body li { font-size:15px; } .step-row { flex-direction:column; } }
  @media(max-width:640px){
    .hero-overlay { background: rgba(7,18,28,0.84) !important; }
    .hero-chip { padding:7px 12px; font-size:11.5px; }
  }
`;

function getHeroChips(blog) {
  return [
    { icon: "🏷️", label: blog.tag },
    { icon: "📅", label: blog.date },
    { icon: "⏱️", label: blog.readTime },
    { icon: "✍️", label: blog.author },
  ];
}

function HeroTitle({ title }) {
  if (title.includes(" — ")) {
    const [left, right] = title.split(" — ");
    return (
      <>
        {left} —{" "}
        <span style={{ color: T.orange }}>{right}</span>
      </>
    );
  }
  if (title.includes(": ")) {
    const idx = title.indexOf(": ");
    const left = title.slice(0, idx);
    const right = title.slice(idx + 2);
    return (
      <>
        {left}:{" "}
        <span style={{ color: T.orange }}>{right}</span>
      </>
    );
  }
  return <>{title}</>;
}

// -------------------------------------------------------
// Props: blog (object | null), notFound (boolean)
// Both come from server — no fetch needed here
// -------------------------------------------------------
export default function BlogDetailClient({ blog, notFound }) {
  const router = useRouter();

  const heroRef = useReveal();
  const bodyRef = useReveal();
  const relRef = useReveal({ stagger: true, baseDelay: 80 });

  // 404 state
  if (notFound || !blog) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: T.sans }}>
        <style>{css}</style>
        <Navbar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>📄</div>
          <h1 style={{ fontFamily: T.poppins, fontSize: "2rem", color: T.titleblue, marginBottom: 12 }}>Article Not Found</h1>
          <p style={{ fontFamily: T.sans, color: T.muted, marginBottom: 28 }}>This blog post doesn&apos;t exist or has been removed.</p>
          <button
            onClick={() => router.push("/blog")}
            style={{ padding: "12px 28px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            ← Back to Blog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const heroChips = getHeroChips(blog);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: T.white, fontFamily: T.sans, color: T.body }}>
      <style>{css}</style>
      <Navbar />

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", borderBottom: `1px solid ${T.border}`, minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: `linear-gradient(to bottom, ${T.orange}, ${T.teal})`, zIndex: 3 }} />
        <Image src={blog.heroImg || blog.img} alt={blog.title} fill style={{ objectFit: "cover", objectPosition: "center 30%" }} unoptimized priority />
        <div className="hero-overlay" style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to right, rgba(7,18,28,0.88) 0%, rgba(7,18,28,0.72) 60%, rgba(7,18,28,0.30) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", width: "100%", padding: "clamp(48px,7vw,88px) clamp(20px,4vw,60px)" }}>
          <div ref={heroRef} className="revealed reveal-left">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.20)", backdropFilter: "blur(8px)", borderRadius: 4, padding: "6px 16px", marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px rgba(74,222,128,0.8)", display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                {blog.tag} &nbsp;·&nbsp; {blog.date} &nbsp;·&nbsp; {blog.readTime}
              </span>
            </div>
            <h1 style={{ fontFamily: T.poppins, fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 700, lineHeight: 1.08, marginBottom: 20, letterSpacing: "-0.01em", color: "#fff", maxWidth: 760 }}>
              <HeroTitle title={blog.title} />
            </h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {heroChips.map(chip => (
                <span key={chip.label} className="hero-chip">
                  <span style={{ fontSize: 15 }}>{chip.icon}</span>
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: T.teal, opacity: 0.6, zIndex: 2 }} />
      </section>

      {/* ARTICLE BODY */}
      <section style={{ padding: "clamp(48px,6vw,80px) clamp(16px,4vw,48px)", background: T.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="article-layout" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 48, alignItems: "flex-start" }}>

            {/* Main content */}
            <div ref={bodyRef} className="reveal revealed article-body">

              {/* Highlights */}
              {blog.highlights?.length > 0 && (
                <div style={{ background: T.white, border: `1px solid ${T.ctaBandBorder}`, borderRadius: 10, padding: "24px 28px", marginBottom: 36 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 22, height: 1.5, background: T.teal }} />
                    <span style={{ fontFamily: T.poppins, fontSize: 10.5, fontWeight: 700, color: T.teal, letterSpacing: "0.13em", textTransform: "uppercase" }}>Key Highlights</span>
                  </div>
                  <ul style={{ marginLeft: 0, listStyle: "none", padding: 0 }}>
                    {blog.highlights.map((pt, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10, fontFamily: T.sans, fontSize: 14.5, color: T.body }}>
                        <span style={{ width: 20, height: 20, borderRadius: "50%", background: T.teal, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>✓</span>
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sections */}
              {blog.sections?.map((section) => (
                <div key={section.id} id={section.id}>
                  <h2>{section.heading}</h2>
                  {section.content?.map((block, i) => (
                    <ContentBlock key={i} block={block} />
                  ))}
                </div>
              ))}

              {/* Inline CTA banner */}
              {blog.ctaTitle && (
                <div style={{ marginTop: 40, background: `linear-gradient(135deg,${T.teal} 0%,${T.tealMid} 100%)`, borderRadius: 12, padding: "28px 32px" }}>
                  <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{blog.ctaTitle}</div>
                  <p style={{ fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: "0 0 18px" }}>{blog.ctaBody}</p>
                  <button
                    onClick={() => router.push("/contact")}
                    style={{ padding: "11px 26px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
                    onMouseLeave={e => e.currentTarget.style.background = T.orange}
                  >
                    Talk to an Expert →
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="sidebar" style={{ position: "sticky", top: 100 }}>
              {blog.toc?.length > 0 && (
                <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: 22, marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{ width: 20, height: 1.5, background: T.teal }} />
                    <span style={{ fontFamily: T.poppins, fontSize: 10.5, fontWeight: 700, color: T.teal, letterSpacing: "0.12em", textTransform: "uppercase" }}>Contents</span>
                  </div>
                  {blog.toc.map(({ id, label }) => (
                    <a key={id} href={`#${id}`} className="toc-link">{label}</a>
                  ))}
                </div>
              )}

              {blog.meta?.length > 0 && (
                <div style={{ background: T.ctaBand, border: `1px solid ${T.ctaBandBorder}`, borderRadius: 10, padding: 22, marginBottom: 20 }}>
                  <div style={{ fontFamily: T.poppins, fontSize: 13, fontWeight: 700, color: T.titleblue, marginBottom: 14 }}>Article Info</div>
                  {blog.meta.map((item, i) => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < blog.meta.length - 1 ? `1px solid ${T.ctaBandBorder}` : "none" }}>
                      <span style={{ fontFamily: T.sans, fontSize: 12.5, color: T.muted }}>{item.label}</span>
                      <span style={{ fontFamily: T.poppins, fontSize: 12.5, color: T.slate, fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {blog.sidebarCta?.title && (
                <div style={{ background: T.titleblue, borderRadius: 10, padding: 22 }}>
                  <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{blog.sidebarCta.title}</div>
                  <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 16 }}>{blog.sidebarCta.body}</p>
                  <button
                    onClick={() => router.push("/contact")}
                    style={{ width: "100%", padding: "11px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
                    onMouseLeave={e => e.currentTarget.style.background = T.orange}
                  >
                    {blog.sidebarCta.btn}
                  </button>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      {blog.related?.length > 0 && (
        <section style={{ background: T.white, padding: "clamp(32px,4vw,56px) clamp(16px,4vw,48px)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 28, height: 2, background: T.teal }} />
                <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, color: T.teal, letterSpacing: "0.14em", textTransform: "uppercase" }}>Keep Reading</span>
              </div>
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: T.titleblue, fontWeight: 700, margin: 0 }}>Related Articles</h2>
            </div>

            <div ref={relRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
              {blog.related.map((article, i) => (
                <div
                  key={i}
                  className={`related-card reveal d${i}`}
                  onClick={() => article.slug && router.push(`/blog/${article.slug}`)}
                  style={{
                    background: T.white, border: `1px solid ${T.border}`, borderRadius: 14,
                    overflow: "hidden", cursor: article.slug ? "pointer" : "default",
                    opacity: article.slug ? 1 : 0.72, transition: "all 0.25s", position: "relative",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = T.teal;
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 16px 40px rgba(30,136,200,0.13)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = T.border;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ height: 172, overflow: "hidden", position: "relative" }}>
                    <Image src={article.img} alt={article.title} fill style={{ objectFit: "cover" }} unoptimized />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,18,28,0.45) 0%, transparent 55%)" }} />
                    <div style={{ position: "absolute", top: 12, left: 12 }}>
                      <span style={{ fontFamily: T.poppins, fontSize: 10, fontWeight: 700, background: article.tagBg || T.tealLight, color: article.tagColor || T.teal, padding: "4px 10px", borderRadius: 4, letterSpacing: "0.07em", textTransform: "uppercase", backdropFilter: "blur(4px)" }}>
                        {article.tag}
                      </span>
                    </div>
                    <div style={{ position: "absolute", bottom: 10, left: 14 }}>
                      <span style={{ fontFamily: T.sans, fontSize: 11, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{article.date}</span>
                    </div>
                    {!article.slug && (
                      <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.55)", borderRadius: 4, padding: "3px 9px" }}>
                        <span style={{ fontFamily: T.sans, fontSize: 10, color: "#fff", fontWeight: 500 }}>Coming soon</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: "16px 18px 18px" }}>
                    <h3 style={{ fontFamily: T.poppins, fontSize: 14.5, color: T.slate, fontWeight: 600, lineHeight: 1.45, margin: "0 0 12px" }}>
                      {article.title}
                    </h3>
                    {article.slug && (
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <span style={{ fontFamily: T.sans, fontSize: 12.5, color: T.teal, fontWeight: 600 }}>Read article</span>
                        <span style={{ color: T.teal, fontSize: 14, lineHeight: 1 }}>→</span>
                      </div>
                    )}
                  </div>
                  <div
                    style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${T.teal}, ${T.orange})`, transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.3s ease" }}
                    ref={el => {
                      if (!el) return;
                      const card = el.closest(".related-card");
                      if (card) {
                        card.addEventListener("mouseenter", () => el.style.transform = "scaleX(1)");
                        card.addEventListener("mouseleave", () => el.style.transform = "scaleX(0)");
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SIACC CTA BAND */}
      <section style={{ background: "#EBF5FB", borderTop: "1px solid #C8DFF0", borderBottom: "1px solid #C8DFF0", padding: "80px clamp(16px,5vw,56px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="cta-split">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 28, height: 1.5, background: T.teal }} />
                <span style={{ fontFamily: T.sans, fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: T.teal }}>Start Today</span>
              </div>
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.9rem,3.2vw,2.9rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.01em", marginBottom: 14 }}>
                Begin Your Certification<br />Journey with SIACC
              </h2>
              <p style={{ fontFamily: T.sans, color: T.body, fontSize: 16, lineHeight: 1.8 }}>
                Free consultation. Clear timeline. Transparent pricing.<br />Our experts respond within 2 hours.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
              <button
                onClick={() => router.push("/contact")}
                style={{ padding: "14px 36px", fontFamily: T.sans, fontSize: 14, fontWeight: 600, letterSpacing: "0.02em", border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", whiteSpace: "nowrap", transition: "background 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = T.teal}
                onMouseLeave={e => e.currentTarget.style.background = T.orange}
              >
                Get Free Consultation
              </button>
              <a
                href="tel:+919891229135"
                style={{ padding: "13px 28px", border: `1.5px solid ${T.border}`, borderRadius: 6, fontFamily: T.sans, fontSize: 14, fontWeight: 500, color: T.slate, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, whiteSpace: "nowrap", background: T.white, transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = T.teal}
                onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
              >
                📞 +91-9891229135
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}