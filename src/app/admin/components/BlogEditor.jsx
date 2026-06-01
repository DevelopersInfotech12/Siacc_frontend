"use client";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { Input, Textarea, Select, Btn, Card } from "./AdminUI";
import SectionEditor from "./SectionEditor";
import JsonImportModal from "./JsonImportModal";
import { api } from "@/lib/adminApi";
import { C, TAG_COLORS, EMPTY_BLOG } from "@/lib/adminConstants";

const TABS = [
  { id: "basic",    label: "📋 Basic" },
  { id: "content",  label: "📝 Content" },
  { id: "seo",      label: "🔍 SEO" },
  { id: "cta",      label: "📣 CTA & Sidebar" },
  { id: "related",  label: "🔗 Related" },
  { id: "settings", label: "⚙️ Settings" },
];

export default function BlogEditor({ editId, onBack, toast }) {
  const [form, setForm] = useState(EMPTY_BLOG);
  const [tab, setTab] = useState("basic");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgUploading, setImgUploading] = useState(false);
  const [heroImgUploading, setHeroImgUploading] = useState(false);
  const fileRef = useRef(null);
  const heroFileRef = useRef(null);
  const jsonRef = useRef(null);
  const [showJson, setShowJson] = useState(false);

  useEffect(() => {
    if (editId) {
      setLoading(true);
      api.getById(editId)
        .then((d) => { setForm(d.data); setLoading(false); })
        .catch((e) => { toast("error", e.message); setLoading(false); });
    }
  }, [editId]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setSeo = (key, val) => setForm((f) => ({ ...f, seo: { ...f.seo, [key]: val } }));
  const setCta = (key, val) => setForm((f) => ({ ...f, sidebarCta: { ...f.sidebarCta, [key]: val } }));

  const autoSlug = () => {
    if (!form.slug && form.title) {
      set("slug", form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    }
  };

  const handleImg = async (e, field) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = ""; // reset so same file can be re-uploaded
    const setUploading = field === "heroImg" ? setHeroImgUploading : setImgUploading;
    setUploading(true);
    try {
      const d = await api.uploadImg(file);
      const url = d.url || d.data?.url;
      if (!url) throw new Error("No URL returned from upload");
      set(field, url);
      // If heroImg was empty or same as img, auto-fill it too
      if (field === "img" && !form.heroImg) set("heroImg", url);
      toast("success", "Image uploaded");
    } catch (err) {
      toast("error", err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleJsonImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        // Merge with EMPTY_BLOG so missing keys get defaults
        const merged = {
          ...EMPTY_BLOG,
          ...parsed,
          seo: { ...EMPTY_BLOG.seo, ...(parsed.seo || {}) },
          sidebarCta: { ...EMPTY_BLOG.sidebarCta, ...(parsed.sidebarCta || {}) },
          tagStyle: parsed.tagStyle || TAG_COLORS[parsed.tag] || TAG_COLORS["BIS"],
        };
        setForm(merged);
        toast("success", `✅ "${parsed.title || "Blog"}" imported — review and publish!`);
      } catch {
        toast("error", "Invalid JSON file. Please check the format.");
      }
      // Reset input so same file can be re-imported
      e.target.value = "";
    };
    reader.readAsText(file);
  };

  const downloadSampleJson = () => {
    const sample = {
      title: "Your Blog Title Here",
      slug: "your-blog-slug",
      excerpt: "Short summary shown on listing page and SEO (150–200 chars ideal).",
      tag: "BIS",
      date: "May 21, 2025",
      readTime: "6 min read",
      author: "Compliance & Regulatory Team",
      featured: false,
      status: "draft",
      img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
      heroImg: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&q=85",
      heroGradient: "linear-gradient(135deg,rgba(13,27,42,0.97) 0%,rgba(10,109,170,0.82) 100%)",
      highlights: [
        "Key highlight point 1",
        "Key highlight point 2",
        "Key highlight point 3",
      ],
      toc: [
        { id: "introduction", label: "Introduction" },
        { id: "requirements", label: "Requirements" },
        { id: "process", label: "Step-by-Step Process" },
      ],
      meta: [
        { label: "Category", value: "BIS" },
        { label: "Published", value: "May 21, 2025" },
        { label: "Read Time", value: "6 min read" },
      ],
      tags: ["BIS", "CRS", "India Compliance"],
      sections: [
        {
          id: "introduction",
          heading: "Introduction",
          content: [
            { type: "p", text: "Your paragraph text here. HTML tags like <strong>bold</strong> and <em>italic</em> are supported." },
            { type: "ul", items: ["List item 1", "List item 2 with <strong>bold</strong>"] },
            { type: "callout", text: "<strong>💡 Tip:</strong> Your callout tip here." },
            { type: "callout-warn", text: "<strong>⚠️ Warning:</strong> Your warning here." },
          ],
        },
        {
          id: "process",
          heading: "Step-by-Step Process",
          content: [
            {
              type: "steps",
              stepItems: [
                { n: "01", title: "Step One", desc: "Description of step one.", tip: "Pro tip for step one." },
                { n: "02", title: "Step Two", desc: "Description of step two.", tip: "" },
              ],
            },
          ],
        },
      ],
      seo: {
        metaTitle: "SEO Title Under 60 Chars",
        metaDescription: "SEO description 150–160 chars for search engines.",
        metaKeywords: ["keyword1", "keyword2", "keyword3"],
        ogTitle: "Social Share Title",
        ogDescription: "Social share description shown on Facebook, LinkedIn etc.",
        ogImage: "https://yourdomain.com/og-image.jpg",
        canonicalUrl: "https://yourdomain.com/blog/your-blog-slug",
        noIndex: false,
        structuredData: "",
      },
      ctaTitle: "Need Help with BIS Certification?",
      ctaBody: "Our experts handle end-to-end BIS registration. Free consultation available.",
      sidebarCta: {
        title: "Need BIS Help?",
        body: "BIS CRS, ISI marking — free consultation.",
        btn: "Get Free Consultation →",
      },
      related: [
        {
          img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
          tag: "WPC",
          date: "April 10, 2025",
          title: "Related Blog Title",
          slug: "related-blog-slug",
        },
      ],
    };
    const blob = new Blob([JSON.stringify(sample, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "blog-template.json";
    a.click();
    URL.revokeObjectURL(url);
    toast("success", "Sample JSON downloaded!");
  };

  const save = async (status) => {
    setSaving(true);
    try {
      const data = { ...form, status: status || form.status };
      if (!data.slug) data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      if (data.seo) {
        if (!data.seo.metaTitle) data.seo.metaTitle = data.title;
        if (!data.seo.metaDescription) data.seo.metaDescription = data.excerpt?.substring(0, 160);
        if (!data.seo.ogTitle) data.seo.ogTitle = data.title;
        if (!data.seo.ogImage) data.seo.ogImage = data.img;
      }
      if (editId) await api.update(editId, data);
      else await api.create(data);
      toast("success", editId ? "Blog updated!" : "Blog created!");
      onBack();
    } catch (e) {
      toast("error", e.message);
    } finally {
      setSaving(false);
    }
  };

  const regenerateSlug = () => {
    set("slug", form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  };

  if (loading) {
    return <div style={{ padding: 60, textAlign: "center", color: C.muted, fontFamily: C.sans }}>Loading blog...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={onBack}
            style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 12px", cursor: "pointer", fontSize: 14 }}
          >
            ← Back
          </button>
          <div>
            <h2 style={{ fontFamily: C.poppins, fontSize: 18, margin: 0, color: C.text }}>{editId ? "Edit Blog" : "New Blog"}</h2>
            <span style={{ fontSize: 11, color: C.muted }}>Status: <strong>{form.status}</strong></span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {/* Hidden JSON file input */}
          <input ref={jsonRef} type="file" accept=".json,application/json" style={{ display: "none" }} onChange={handleJsonImport} />
          {/* JSON Import button — opens modal */}
          <Btn variant="ghost" onClick={() => setShowJson(true)} style={{ border: `1px solid ${C.accent}`, color: C.accent }}>📂 Import JSON</Btn>
          <Btn variant="ghost" onClick={() => save("draft")} loading={saving}>💾 Save Draft</Btn>
          <Btn variant="primary" onClick={() => save("published")} loading={saving}>🚀 Publish</Btn>
        </div>
      </div>

      {/* JSON Import Modal */}
      {showJson && (
        <JsonImportModal
          onImported={(data) => { setForm(data); toast("success", `✅ "${data.title}" imported — review and publish!`); }}
          onClose={() => setShowJson(false)}
        />
      )}

      {/* Tab bar */}
      <div style={{ display: "flex", gap: 2, background: C.bg, borderRadius: 10, padding: 4, marginBottom: 20, overflowX: "auto" }}>
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "7px 14px", borderRadius: 8, border: "none",
              background: tab === t.id ? C.white : "transparent",
              color: tab === t.id ? C.accentDark : C.muted,
              fontFamily: C.poppins, fontSize: 12.5,
              fontWeight: tab === t.id ? 700 : 500,
              cursor: "pointer", whiteSpace: "nowrap",
              boxShadow: tab === t.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── BASIC TAB ── */}
      {tab === "basic" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
          <div>
            <Card>
              <Input label="Blog Title *" value={form.title} onChange={(e) => set("title", e.target.value)} onBlur={autoSlug} placeholder="e.g. BIS CRS Registration Guide 2025" />
              <Textarea label="Excerpt *" value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} placeholder="Short summary shown on listing and SEO (150–200 chars)" style={{ minHeight: 80 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Input label="URL Slug *" value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto-generated-from-title" />
                <Input label="Date" value={form.date} onChange={(e) => set("date", e.target.value)} placeholder="April 20, 2025" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Input label="Read Time" value={form.readTime} onChange={(e) => set("readTime", e.target.value)} placeholder="5 min read" />
                <Input label="Author" value={form.author} onChange={(e) => set("author", e.target.value)} placeholder="Author name" />
              </div>
              <Select label="Category Tag" value={form.tag} onChange={(e) => { set("tag", e.target.value); set("tagStyle", TAG_COLORS[e.target.value] || {}); }}>
                {Object.keys(TAG_COLORS).map((t) => <option key={t}>{t}</option>)}
              </Select>
              <Input label="Tags (comma separated)" value={form.tags?.join(", ") || ""} onChange={(e) => set("tags", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} placeholder="BIS, CRS, Manufacturers" />
            </Card>

            {/* Highlights */}
            <Card style={{ marginTop: 16 }}>
              <h3 style={{ fontFamily: C.poppins, fontSize: 13, margin: "0 0 12px", color: C.text }}>✨ Key Highlights</h3>
              {(form.highlights || []).map((h, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input
                    value={h}
                    onChange={(e) => { const a = [...form.highlights]; a[i] = e.target.value; set("highlights", a); }}
                    style={{ flex: 1, padding: "8px 10px", border: `1px solid ${C.border}`, borderRadius: 7, fontSize: 13, fontFamily: C.sans, outline: "none" }}
                    placeholder={`Highlight ${i + 1}`}
                  />
                  <button onClick={() => set("highlights", form.highlights.filter((_, j) => j !== i))} style={{ padding: "0 10px", background: C.dangerBg, border: "none", borderRadius: 7, cursor: "pointer", color: C.danger }}>✕</button>
                </div>
              ))}
              <Btn variant="secondary" onClick={() => set("highlights", [...(form.highlights || []), ""])} style={{ fontSize: 12, padding: "6px 12px" }}>+ Add Highlight</Btn>
            </Card>
          </div>

          {/* Right column */}
          <div>
            <Card>
              <h3 style={{ fontFamily: C.poppins, fontSize: 13, margin: "0 0 12px", color: C.text }}>🖼 Listing Image</h3>
              {form.img && <Image src={form.img} alt="" height={140} width={900} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8, marginBottom: 10 }} unoptimized />}
              <Input label="Image URL" value={form.img} onChange={(e) => set("img", e.target.value)} placeholder="https://..." />
              <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImg(e, "img")} />
              <Btn variant="ghost" onClick={() => fileRef.current?.click()} loading={imgUploading} style={{ width: "100%", justifyContent: "center", fontSize: 12 }}>📤 Upload Image</Btn>
            </Card>

            <Card style={{ marginTop: 12 }}>
              <h3 style={{ fontFamily: C.poppins, fontSize: 13, margin: "0 0 12px", color: C.text }}>🦸 Hero Image</h3>
              {form.heroImg && <Image src={form.heroImg} alt="" height={120} width={900} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 10 }} unoptimized />}
              <Input label="Hero Image URL" value={form.heroImg} onChange={(e) => set("heroImg", e.target.value)} placeholder="https://... or /finalimages/..." />
              <input ref={heroFileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImg(e, "heroImg")} />
              <Btn variant="ghost" onClick={() => heroFileRef.current?.click()} loading={heroImgUploading} style={{ width: "100%", justifyContent: "center", fontSize: 12 }}>📤 Upload Hero</Btn>
              {form.img && !form.heroImg && (
                <Btn variant="secondary" onClick={() => set("heroImg", form.img)} style={{ width: "100%", justifyContent: "center", fontSize: 12, marginTop: 6 }}>📋 Copy from Thumbnail</Btn>
              )}
              <Textarea label="Hero Gradient CSS" value={form.heroGradient} onChange={(e) => set("heroGradient", e.target.value)} style={{ minHeight: 60, fontSize: 11.5 }} />
            </Card>

            <Card style={{ marginTop: 12 }}>
              <h3 style={{ fontFamily: C.poppins, fontSize: 13, margin: "0 0 12px", color: C.text }}>📋 Meta Info Strip</h3>
              {(form.meta || []).map((m, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 6, marginBottom: 6 }}>
                  <input value={m.label} onChange={(e) => { const a = [...form.meta]; a[i] = { ...a[i], label: e.target.value }; set("meta", a); }} placeholder="Label" style={{ padding: "6px 9px", border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 12, outline: "none" }} />
                  <input value={m.value} onChange={(e) => { const a = [...form.meta]; a[i] = { ...a[i], value: e.target.value }; set("meta", a); }} placeholder="Value" style={{ padding: "6px 9px", border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 12, outline: "none" }} />
                  <button onClick={() => set("meta", form.meta.filter((_, j) => j !== i))} style={{ padding: "0 8px", background: C.dangerBg, border: "none", borderRadius: 6, cursor: "pointer", color: C.danger }}>✕</button>
                </div>
              ))}
              <Btn variant="secondary" onClick={() => set("meta", [...(form.meta || []), { label: "", value: "" }])} style={{ fontSize: 11, padding: "5px 10px" }}>+ Add Row</Btn>
            </Card>
          </div>
        </div>
      )}

      {/* ── CONTENT TAB ── */}
      {tab === "content" && (
        <div>
          <Card style={{ marginBottom: 16 }}>
            <h3 style={{ fontFamily: C.poppins, fontSize: 13, margin: "0 0 12px", color: C.text }}>📑 Table of Contents</h3>
            {(form.toc || []).map((t, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: 8, marginBottom: 6 }}>
                <input value={t.id} onChange={(e) => { const a = [...form.toc]; a[i] = { ...a[i], id: e.target.value }; set("toc", a); }} placeholder="anchor-id" style={{ padding: "7px 10px", border: `1px solid ${C.border}`, borderRadius: 7, fontSize: 12, outline: "none" }} />
                <input value={t.label} onChange={(e) => { const a = [...form.toc]; a[i] = { ...a[i], label: e.target.value }; set("toc", a); }} placeholder="Display Label" style={{ padding: "7px 10px", border: `1px solid ${C.border}`, borderRadius: 7, fontSize: 12, outline: "none" }} />
                <button onClick={() => set("toc", form.toc.filter((_, j) => j !== i))} style={{ padding: "0 10px", background: C.dangerBg, border: "none", borderRadius: 7, cursor: "pointer", color: C.danger }}>✕</button>
              </div>
            ))}
            <Btn variant="secondary" onClick={() => set("toc", [...(form.toc || []), { id: "", label: "" }])} style={{ fontSize: 12, padding: "6px 12px" }}>+ Add TOC Entry</Btn>
          </Card>

          <h3 style={{ fontFamily: C.poppins, fontSize: 14, margin: "0 0 12px", color: C.text }}>📖 Blog Sections</h3>
          {(form.sections || []).map((sec, si) => (
            <SectionEditor
              key={si}
              section={sec}
              onChange={(s) => { const a = [...form.sections]; a[si] = s; set("sections", a); }}
              onDelete={() => set("sections", form.sections.filter((_, j) => j !== si))}
              index={si}
            />
          ))}
          <Btn variant="secondary" onClick={() => set("sections", [...(form.sections || []), { id: "", heading: "", content: [] }])} style={{ marginTop: 8 }}>
            + Add Section
          </Btn>
        </div>
      )}

      {/* ── SEO TAB ── */}
      {tab === "seo" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <h3 style={{ fontFamily: C.poppins, fontSize: 13, margin: "0 0 16px", color: C.text }}>🔍 Search Engine Optimization</h3>
            <Input label="Meta Title" value={form.seo?.metaTitle || ""} onChange={(e) => setSeo("metaTitle", e.target.value)} placeholder="60 chars ideal" />
            <div style={{ fontSize: 11, color: (form.seo?.metaTitle?.length || 0) > 60 ? C.danger : C.muted, marginTop: -10, marginBottom: 10 }}>
              {form.seo?.metaTitle?.length || 0}/60 characters
            </div>
            <Textarea label="Meta Description" value={form.seo?.metaDescription || ""} onChange={(e) => setSeo("metaDescription", e.target.value)} placeholder="150–160 chars ideal" style={{ minHeight: 80 }} />
            <div style={{ fontSize: 11, color: (form.seo?.metaDescription?.length || 0) > 160 ? C.danger : C.muted, marginTop: -10, marginBottom: 10 }}>
              {form.seo?.metaDescription?.length || 0}/160 characters
            </div>
            <Input label="Focus Keywords (comma separated)" value={form.seo?.metaKeywords?.join(", ") || ""} onChange={(e) => setSeo("metaKeywords", e.target.value.split(",").map((k) => k.trim()).filter(Boolean))} placeholder="BIS registration, CRS, India compliance" />
            <Input label="Canonical URL" value={form.seo?.canonicalUrl || ""} onChange={(e) => setSeo("canonicalUrl", e.target.value)} placeholder="https://yourdomain.com/blog/slug" />
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: C.dangerBg, borderRadius: 8, marginBottom: 14 }}>
              <input type="checkbox" id="noindex" checked={form.seo?.noIndex || false} onChange={(e) => setSeo("noIndex", e.target.checked)} />
              <label htmlFor="noindex" style={{ fontSize: 13, color: C.danger, fontWeight: 600, cursor: "pointer" }}>
                No Index (hide from search engines)
              </label>
            </div>
            <Textarea label="JSON-LD Structured Data" value={form.seo?.structuredData || ""} onChange={(e) => setSeo("structuredData", e.target.value)} placeholder='{"@context":"https://schema.org","@type":"Article",...}' style={{ minHeight: 100, fontSize: 11.5 }} />
          </Card>

          <Card>
            <h3 style={{ fontFamily: C.poppins, fontSize: 13, margin: "0 0 16px", color: C.text }}>📱 Open Graph (Social Preview)</h3>
            <Input label="OG Title" value={form.seo?.ogTitle || ""} onChange={(e) => setSeo("ogTitle", e.target.value)} placeholder="Title shown on social share" />
            <Textarea label="OG Description" value={form.seo?.ogDescription || ""} onChange={(e) => setSeo("ogDescription", e.target.value)} placeholder="Description shown on social share" style={{ minHeight: 80 }} />
            <Input label="OG Image URL" value={form.seo?.ogImage || ""} onChange={(e) => setSeo("ogImage", e.target.value)} placeholder="https://... (1200×630 recommended)" />
            {form.seo?.ogImage && (
              <Image src={form.seo.ogImage} alt="" height={120} width={900} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 14 }} unoptimized />
            )}
            {/* Social preview */}
            <div style={{ background: C.bg, borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <div style={{ height: 80, background: form.seo?.ogImage ? `url(${form.seo.ogImage}) center/cover` : "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontSize: 12 }}>
                {!form.seo?.ogImage && "OG Image Preview"}
              </div>
              <div style={{ padding: "8px 12px" }}>
                <div style={{ fontSize: 11, color: C.muted }}>yourdomain.com</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.text, margin: "2px 0" }}>{form.seo?.ogTitle || form.title || "Meta Title"}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{form.seo?.ogDescription || form.excerpt || "Meta description..."}</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ── CTA TAB ── */}
      {tab === "cta" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <h3 style={{ fontFamily: C.poppins, fontSize: 13, margin: "0 0 16px", color: C.text }}>📣 Bottom CTA Band</h3>
            <Input label="CTA Title" value={form.ctaTitle || ""} onChange={(e) => set("ctaTitle", e.target.value)} placeholder="Need BIS Certification?" />
            <Textarea label="CTA Body" value={form.ctaBody || ""} onChange={(e) => set("ctaBody", e.target.value)} placeholder="Our experts handle..." style={{ minHeight: 100 }} />
          </Card>
          <Card>
            <h3 style={{ fontFamily: C.poppins, fontSize: 13, margin: "0 0 16px", color: C.text }}>📌 Sidebar CTA Widget</h3>
            <Input label="Widget Title" value={form.sidebarCta?.title || ""} onChange={(e) => setCta("title", e.target.value)} placeholder="Need BIS Help?" />
            <Textarea label="Widget Body" value={form.sidebarCta?.body || ""} onChange={(e) => setCta("body", e.target.value)} placeholder="BIS CRS, ISI marking... free consultation." style={{ minHeight: 80 }} />
            <Input label="Button Text" value={form.sidebarCta?.btn || ""} onChange={(e) => setCta("btn", e.target.value)} placeholder="Get Free Consultation →" />
          </Card>
        </div>
      )}

      {/* ── RELATED TAB ── */}
      {tab === "related" && (
        <Card>
          <h3 style={{ fontFamily: C.poppins, fontSize: 13, margin: "0 0 16px", color: C.text }}>🔗 Related Posts</h3>
          {(form.related || []).map((r, i) => (
            <div key={i} style={{ border: `1px solid ${C.border}`, borderRadius: 10, padding: 14, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <strong style={{ fontFamily: C.poppins, fontSize: 12, color: C.muted }}>Related Post {i + 1}</strong>
                <button onClick={() => set("related", form.related.filter((_, j) => j !== i))} style={{ background: C.dangerBg, border: "none", borderRadius: 6, padding: "3px 10px", cursor: "pointer", color: C.danger, fontSize: 12 }}>Remove</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <Input label="Title" value={r.title || ""} onChange={(e) => { const a = [...form.related]; a[i] = { ...a[i], title: e.target.value }; set("related", a); }} />
                <Input label="Slug (blank = no link)" value={r.slug || ""} onChange={(e) => { const a = [...form.related]; a[i] = { ...a[i], slug: e.target.value || null }; set("related", a); }} />
                <Input label="Tag" value={r.tag || ""} onChange={(e) => { const a = [...form.related]; a[i] = { ...a[i], tag: e.target.value }; set("related", a); }} />
                <Input label="Date" value={r.date || ""} onChange={(e) => { const a = [...form.related]; a[i] = { ...a[i], date: e.target.value }; set("related", a); }} />
              </div>
              <Input label="Image URL" value={r.img || ""} onChange={(e) => { const a = [...form.related]; a[i] = { ...a[i], img: e.target.value }; set("related", a); }} />
            </div>
          ))}
          <Btn variant="secondary" onClick={() => set("related", [...(form.related || []), { img: "", tag: "", tagBg: "", tagColor: "", date: "", title: "", slug: null }])}>
            + Add Related Post
          </Btn>
        </Card>
      )}

      {/* ── SETTINGS TAB ── */}
      {tab === "settings" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card>
            <h3 style={{ fontFamily: C.poppins, fontSize: 13, margin: "0 0 16px", color: C.text }}>⚙️ Publish Settings</h3>
            <Select label="Status" value={form.status} onChange={(e) => set("status", e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </Select>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "#FEF3C7", borderRadius: 8, border: "1px solid #F6D992" }}>
              <input type="checkbox" id="featured" checked={form.featured || false} onChange={(e) => set("featured", e.target.checked)} style={{ width: 16, height: 16 }} />
              <label htmlFor="featured" style={{ fontFamily: C.poppins, fontSize: 13, fontWeight: 600, color: "#92400e", cursor: "pointer" }}>
                ⭐ Mark as Featured (only one at a time)
              </label>
            </div>
          </Card>
          <Card>
            <h3 style={{ fontFamily: C.poppins, fontSize: 13, margin: "0 0 16px", color: C.text }}>🔖 Slug</h3>
            <div style={{ background: C.bg, borderRadius: 8, padding: "12px 14px", fontFamily: "monospace", fontSize: 13, color: C.accentDark, wordBreak: "break-all", marginBottom: 10 }}>
              /blog/<strong>{form.slug || "auto-generated-from-title"}</strong>
            </div>
            <Btn variant="secondary" onClick={regenerateSlug} style={{ fontSize: 12, padding: "6px 12px" }}>↺ Regenerate Slug</Btn>
          </Card>
        </div>
      )}

      {/* Save bar */}
      <div style={{ marginTop: 24, padding: "14px 20px", background: C.sidebar, borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: C.poppins, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
          Status: <strong style={{ color: form.status === "published" ? "#7EFFA0" : "#FCD34D" }}>{form.status}</strong>
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="ghost" onClick={() => save("draft")} loading={saving} style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>💾 Save Draft</Btn>
          <Btn variant="primary" onClick={() => save("published")} loading={saving}>🚀 Publish</Btn>
        </div>
      </div>
    </div>
  );
}