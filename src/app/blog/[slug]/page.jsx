"use client";
import { useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import { getBlogBySlug, T } from "../blogData";
import "../../animations.css";

/* ─── Reveal hook ─────────────────────────────────────────── */
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

/* ─── Content block renderer ──────────────────────────────── */
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
        {block.items.map((s, i) => (
          <div key={i} className="step-row">
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: T.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: T.poppins, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.poppins, fontSize: 15, fontWeight: 700, color: T.titleblue, marginBottom: 5 }}>{s.title}</div>
              <p style={{ marginBottom: 8 }}>{s.desc}</p>
              <div className="step-tip">
                <span style={{ fontFamily: T.poppins, fontSize: 12, color: T.tealMid, fontWeight: 600 }}>💡 {s.tip}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  return null;
}

/* ─── CSS ─────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
  img { max-width:100%; display:block; } a { text-decoration:none; color:inherit; }

  /* ── Hero chip (same as BlogScreen) ── */
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.6;transform:scale(1.3);} }
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

  /* ── Article body ── */
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

  /* mobile hero overlay — make dark across full width */
  @media(max-width:640px){
    .hero-overlay { background: rgba(7,18,28,0.84) !important; }
    .hero-chip { padding:7px 12px; font-size:11.5px; }
  }
`;

/* ─── Helpers ─────────────────────────────────────────────── */
// Build chips from blog metadata for the hero
function getHeroChips(blog) {
  return [
    { icon: "🏷️", label: blog.tag },
    { icon: "📅", label: blog.date },
    { icon: "⏱️", label: blog.readTime },
    { icon: "✍️", label: blog.author },
  ];
}

// Split title for orange highlight — handles both "—" and ":" separators
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

/* ─── Component ───────────────────────────────────────────── */
export default function BlogDetailPage() {
  const router = useRouter();
  const { slug } = useParams();
  const blog = getBlogBySlug(slug);

  const heroRef = useReveal();
  const bodyRef = useReveal();
  const relRef  = useReveal({ stagger: true, baseDelay: 80 });
  const ctaRef  = useReveal();

  /* 404 state */
  if (!blog) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: T.sans }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Outfit:wght@400&display=swap');`}</style>
        <Navbar />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>📄</div>
          <h1 style={{ fontFamily: T.poppins, fontSize: "2rem", color: T.titleblue, marginBottom: 12 }}>Article Not Found</h1>
          <p style={{ fontFamily: T.sans, color: T.muted, marginBottom: 28 }}>This blog post doesn't exist or has been removed.</p>
          <button onClick={() => router.push("/blog")} style={{ padding: "12px 28px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>← Back to Blog</button>
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

      {/* ══════════════════════════════════════════════════════
          HERO — matches BlogScreen style exactly
      ══════════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        borderBottom: `1px solid ${T.border}`,
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        {/* Left orange-to-teal accent bar */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
          background: `linear-gradient(to bottom, ${T.orange}, ${T.teal})`,
          zIndex: 3,
        }} />

        {/* Background image */}
        <img
          src={blog.heroImg}
          alt={blog.title}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center 30%",
            zIndex: 0,
          }}
        />

        {/* Dark overlay */}
        <div
          className="hero-overlay"
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(to right, rgba(7,18,28,0.88) 0%, rgba(7,18,28,0.72) 60%, rgba(7,18,28,0.30) 100%)",
          }}
        />

        {/* Content — full 1280 max-width, same padding as BlogScreen */}
        <div style={{
          position: "relative", zIndex: 2,
          maxWidth: 1280, margin: "0 auto", width: "100%",
          padding: "clamp(48px,7vw,88px) clamp(20px,4vw,60px)",
        }}>
          <div ref={heroRef} className="revealed reveal-left">

            {/* Breadcrumb pill — same style as blog hero badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.20)",
              backdropFilter: "blur(8px)",
              borderRadius: 4, padding: "6px 16px", marginBottom: 22,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 6px rgba(74,222,128,0.8)",
                display: "inline-block",
                animation: "pulse-dot 2s ease-in-out infinite",
              }} />
              <span style={{ fontFamily: T.sans, fontSize: 10.5, fontWeight: 700, color: "#fff", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                {blog.tag} &nbsp;·&nbsp; {blog.date} &nbsp;·&nbsp; {blog.readTime}
              </span>
            </div>

            {/* Big bold heading — same size as BlogScreen h1 */}
            <h1 style={{
              fontFamily: T.poppins,
              fontSize: "clamp(2rem,5vw,3.4rem)",
              fontWeight: 700, lineHeight: 1.08,
              marginBottom: 20, letterSpacing: "-0.01em",
              color: "#fff", maxWidth: 760,
            }}>
              <HeroTitle title={blog.title} />
            </h1>

            {/* Excerpt */}
            <p style={{
              fontFamily: T.sans, fontSize: "clamp(14px,1.6vw,16px)",
              color: "rgba(255,255,255,0.78)", lineHeight: 1.8,
              maxWidth: 600, marginBottom: 32,
            }}>
              {blog.excerpt}
            </p>

            {/* Chips row — same style as BlogScreen hero chips */}
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

        {/* Bottom teal accent line */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 3, background: T.teal, opacity: 0.6, zIndex: 2,
        }} />
      </section>

      {/* ══ ARTICLE BODY ══ */}
      <section style={{ padding: "clamp(48px,6vw,80px) clamp(16px,4vw,48px)", background: T.cream }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="article-layout" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 48, alignItems: "flex-start" }}>

            {/* ── Main content ── */}
            <div ref={bodyRef} className="reveal revealed article-body">

              {/* Highlights box */}
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

              {/* Sections */}
              {blog.sections.map((section) => (
                <div key={section.id} id={section.id}>
                  <h2>{section.heading}</h2>
                  {section.content.map((block, i) => (
                    <ContentBlock key={i} block={block} />
                  ))}
                </div>
              ))}

              {/* Inline CTA banner */}
              <div style={{ marginTop: 40, background: `linear-gradient(135deg,${T.teal} 0%,${T.tealMid} 100%)`, borderRadius: 12, padding: "28px 32px" }}>
                <div style={{ fontFamily: T.poppins, fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{blog.ctaTitle}</div>
                <p style={{ fontFamily: T.sans, fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.7, margin: "0 0 18px" }}>{blog.ctaBody}</p>
                <button
                  onClick={() => router.push("/contact")}
                  style={{ padding: "11px 26px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
                  onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                  Talk to an Expert →
                </button>
              </div>

              {/* Tags + share row */}
              <div style={{ marginTop: 40, paddingTop: 28, borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {blog.tags.map(tag => (
                    <span key={tag} style={{ fontFamily: T.sans, fontSize: 12, color: T.teal, background: T.tealLight, padding: "4px 12px", borderRadius: 3, fontWeight: 500 }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="share-btn">🔗 Copy Link</button>
                  <button className="share-btn" onClick={() => router.push("/blog")}>← Back to Blog</button>
                </div>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <aside className="sidebar" style={{ position: "sticky", top: 100 }}>
              {/* Table of contents */}
              <div style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 10, padding: 22, marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <div style={{ width: 20, height: 1.5, background: T.teal }} />
                  <span style={{ fontFamily: T.poppins, fontSize: 10.5, fontWeight: 700, color: T.teal, letterSpacing: "0.12em", textTransform: "uppercase" }}>Contents</span>
                </div>
                {blog.toc.map(({ id, label }) => (
                  <a key={id} href={`#${id}`} className="toc-link">{label}</a>
                ))}
              </div>

              {/* Article meta */}
              <div style={{ background: T.ctaBand, border: `1px solid ${T.ctaBandBorder}`, borderRadius: 10, padding: 22, marginBottom: 20 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 13, fontWeight: 700, color: T.titleblue, marginBottom: 14 }}>Article Info</div>
                {blog.meta.map((item, i) => (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: i < blog.meta.length - 1 ? `1px solid ${T.ctaBandBorder}` : "none" }}>
                    <span style={{ fontFamily: T.sans, fontSize: 12.5, color: T.muted }}>{item.label}</span>
                    <span style={{ fontFamily: T.poppins, fontSize: 12.5, color: T.slate, fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Sidebar CTA */}
              <div style={{ background: T.titleblue, borderRadius: 10, padding: 22 }}>
                <div style={{ fontFamily: T.poppins, fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{blog.sidebarCta.title}</div>
                <p style={{ fontFamily: T.sans, fontSize: 13, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, marginBottom: 16 }}>{blog.sidebarCta.body}</p>
                <button
                  onClick={() => router.push("/contact")}
                  style={{ width: "100%", padding: "11px", background: T.orange, color: "#fff", border: "none", borderRadius: 7, fontFamily: T.poppins, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#e06010"}
                  onMouseLeave={e => e.currentTarget.style.background = T.orange}>
                  {blog.sidebarCta.btn}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══ RELATED ARTICLES ══ */}
      <section style={{ background: T.white, padding: "clamp(48px,6vw,80px) clamp(16px,4vw,48px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <div style={{ width: 28, height: 1.5, background: T.teal }} />
              <span style={{ fontFamily: T.poppins, fontSize: 11, fontWeight: 600, color: T.teal, letterSpacing: "0.14em", textTransform: "uppercase" }}>Keep Reading</span>
            </div>
            <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.3rem,2.5vw,1.8rem)", color: T.titleblue, fontWeight: 700 }}>Related Articles</h2>
          </div>
          <div ref={relRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
            {blog.related.map((article, i) => (
              <div
                key={i}
                className={`related-card reveal d${i}`}
                onClick={() => article.slug && router.push(`/blog/${article.slug}`)}
                style={{ opacity: article.slug ? 1 : 0.72, cursor: article.slug ? "pointer" : "default" }}
              >
                <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
                  <img src={article.img} alt={article.title} className="related-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <span style={{ fontFamily: T.poppins, fontSize: 10, fontWeight: 700, background: article.tagBg, color: article.tagColor, padding: "3px 10px", borderRadius: 3, letterSpacing: "0.06em" }}>{article.tag}</span>
                  </div>
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ fontFamily: T.sans, fontSize: 11.5, color: T.subtle, marginBottom: 6 }}>{article.date}</div>
                  <h3 style={{ fontFamily: T.poppins, fontSize: 15, color: T.slate, fontWeight: 600, lineHeight: 1.4 }}>{article.title}</h3>
                  {!article.slug && <div style={{ fontFamily: T.sans, fontSize: 11, color: T.subtle, marginTop: 8 }}>Coming soon</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BOTTOM CTA ══ */}
      <section
        className="reveal"
        ref={ctaRef}
        style={{ background: T.ctaBand, borderTop: `1px solid ${T.ctaBandBorder}`, borderBottom: `1px solid ${T.ctaBandBorder}`, padding: "72px clamp(16px,5vw,56px)" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="cta-split">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 28, height: 1.5, background: T.teal }} />
                <span style={{ fontFamily: T.poppins, fontSize: 11, fontWeight: 600, color: T.teal, letterSpacing: "0.14em", textTransform: "uppercase" }}>Start Today</span>
              </div>
              <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(1.5rem,2.8vw,2.2rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.15, marginBottom: 10 }}>{blog.ctaTitle}</h2>
              <p style={{ fontFamily: T.sans, fontSize: 14.5, color: T.body, lineHeight: 1.75 }}>{blog.ctaBody}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
              <button
                onClick={() => router.push("/contact")}
                style={{ padding: "14px 36px", fontFamily: T.poppins, fontSize: 14, fontWeight: 600, border: "none", borderRadius: 6, cursor: "pointer", background: T.orange, color: "#fff", whiteSpace: "nowrap", transition: "all 0.22s" }}
                onMouseEnter={e => { e.currentTarget.style.background = T.teal; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.orange; e.currentTarget.style.transform = "translateY(0)"; }}>
                Get Free Consultation
              </button>
              <button
                onClick={() => router.push("/blog")}
                style={{ padding: "12px 28px", border: `1.5px solid ${T.border}`, borderRadius: 6, fontFamily: T.poppins, fontSize: 13.5, fontWeight: 500, color: T.slate, background: T.white, cursor: "pointer", whiteSpace: "nowrap", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = T.teal}
                onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                ← Back to Blog
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}