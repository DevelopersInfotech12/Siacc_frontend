"use client";
import { useState, useRef } from "react";
import { C, EMPTY_BLOG, TAG_COLORS } from "@/lib/adminConstants";

export default function JsonImportModal({ onImported, onClose }) {
  const [activeTab, setActiveTab] = useState("paste"); // paste | upload
  const [pasteText, setPasteText] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileData, setFileData] = useState(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);

  const parseAndPreview = (jsonStr) => {
    setError("");
    try {
      const parsed = JSON.parse(jsonStr);
      if (!parsed.title) throw new Error("JSON must have a 'title' field.");
      setPreview(parsed);
    } catch (e) {
      setError(e.message);
      setPreview(null);
    }
  };

  const handlePasteChange = (val) => {
    setPasteText(val);
    if (val.trim()) parseAndPreview(val);
    else { setPreview(null); setError(""); }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result;
      setFileData(text);
      parseAndPreview(text);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleLoad = () => {
    const jsonStr = activeTab === "paste" ? pasteText : fileData;
    if (!jsonStr) { setError("No JSON data to load."); return; }
    try {
      const parsed = JSON.parse(jsonStr);
      const merged = {
        ...EMPTY_BLOG,
        ...parsed,
        seo: { ...EMPTY_BLOG.seo, ...(parsed.seo || {}) },
        sidebarCta: { ...EMPTY_BLOG.sidebarCta, ...(parsed.sidebarCta || {}) },
        tagStyle: parsed.tagStyle || TAG_COLORS[parsed.tag] || TAG_COLORS["BIS"],
      };
      onImported(merged);
      onClose();
    } catch (e) {
      setError("Invalid JSON: " + e.message);
    }
  };

  const downloadSample = () => {
    const sample = {
      title: "BIS CRS Registration Guide for LED Products 2025",
      slug: "bis-crs-led-products-2025",
      excerpt: "A complete guide to BIS CRS registration for LED lights and fixtures in India. Covers documents, timelines, and step-by-step process.",
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
        "Mandatory BIS CRS registration for all LED products sold in India",
        "IS 16102 standard applies to LED drivers and modules",
        "Foreign manufacturers must appoint an Indian Authorized Representative",
        "Registration valid for 2 years — renewable before expiry",
        "Penalty up to ₹2 lakh for non-compliance",
      ],
      toc: [
        { id: "background", label: "Background" },
        { id: "scope", label: "Products Under Scope" },
        { id: "documents", label: "Documents Required" },
        { id: "process", label: "Step-by-Step Process" },
        { id: "timeline", label: "Timeline & Fees" },
        { id: "faq", label: "FAQs" },
      ],
      meta: [
        { label: "Category", value: "BIS" },
        { label: "Published", value: "May 21, 2025" },
        { label: "Read Time", value: "6 min read" },
        { label: "Standard", value: "IS 16102" },
      ],
      tags: ["BIS", "CRS", "LED", "IS 16102", "India Compliance"],
      sections: [
        {
          id: "background",
          heading: "Background — Why BIS CRS for LEDs?",
          content: [
            { type: "p", text: "The Bureau of Indian Standards (BIS) mandates CRS registration for LED products under IS 16102 to ensure <strong>electrical safety</strong> and <strong>energy efficiency</strong> compliance." },
            { type: "callout", text: "<strong>💡 Note:</strong> CRS registration is mandatory — products without it cannot legally be sold in India." },
            { type: "ul", items: ["LED lights and luminaires", "LED drivers and power supplies", "LED modules and arrays"] },
          ],
        },
        {
          id: "process",
          heading: "Step-by-Step Registration Process",
          content: [
            {
              type: "steps",
              stepItems: [
                { n: "01", title: "Appoint AIR", desc: "Foreign manufacturers must appoint an Indian Authorized Representative (AIR) registered with BIS.", tip: "AIR appointment letter must be notarized." },
                { n: "02", title: "Lab Testing", desc: "Submit product samples to a BIS-recognized lab for testing against IS 16102.", tip: "Testing typically takes 3–4 weeks." },
                { n: "03", title: "Apply on BIS Portal", desc: "Submit the application on the BIS online portal with all documents and test reports.", tip: "" },
                { n: "04", title: "BIS Review & Grant", desc: "BIS reviews the application. Once approved, the R-number licence is granted.", tip: "Keep track of portal status weekly." },
              ],
            },
          ],
        },
      ],
      seo: {
        metaTitle: "BIS CRS Registration for LED Products 2025 — Complete Guide",
        metaDescription: "Step-by-step guide to BIS CRS registration for LED lights in India. Documents, timeline, fees and process explained.",
        metaKeywords: ["BIS CRS LED", "IS 16102 registration", "LED BIS certification India", "BIS LED compliance"],
        ogTitle: "BIS CRS Registration for LED Products — 2025 Guide",
        ogDescription: "Everything you need to know about mandatory BIS CRS registration for LED products in India.",
        ogImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=85",
        canonicalUrl: "https://yourdomain.com/blog/bis-crs-led-products-2025",
        noIndex: false,
        structuredData: "",
      },
      ctaTitle: "Need BIS CRS Registration for Your LED Products?",
      ctaBody: "Our BIS experts handle end-to-end CRS registration — lab coordination, AIR appointment, portal filing. Free consultation.",
      sidebarCta: {
        title: "Need BIS Help?",
        body: "BIS CRS, ISI marking, lab coordination — free consultation.",
        btn: "Get Free Consultation →",
      },
      related: [
        {
          img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
          tag: "BIS Update",
          date: "April 20, 2025",
          title: "BIS Conformity Assessment Amendment 2026",
          slug: "bis-conformity-assessment-amendment-2026",
        },
      ],
    };
    const blob = new Blob([JSON.stringify(sample, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "blog-sample.json"; a.click();
    URL.revokeObjectURL(url);
  };

  const canLoad = (activeTab === "paste" ? pasteText.trim() : fileData) && !error && preview;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,27,42,0.7)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 680, maxHeight: "90vh", display: "flex", flexDirection: "column", boxShadow: "0 24px 64px rgba(0,0,0,0.25)", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ background: `linear-gradient(135deg,${C.sidebar} 0%,${C.accentDark} 100%)`, padding: "20px 24px", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: C.poppins, fontSize: 16, fontWeight: 700, color: "#fff" }}>📂 Import Blog from JSON</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 3 }}>Paste JSON or upload a .json file — all fields will auto-fill</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button onClick={downloadSample} style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.25)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 12, fontFamily: C.poppins, fontWeight: 600 }}>⬇️ Sample JSON</button>
              <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 16 }}>✕</button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
          {[
            { id: "paste", icon: "📋", label: "Paste JSON" },
            { id: "upload", icon: "📁", label: "Upload File" },
          ].map((t) => (
            <button key={t.id} onClick={() => { setActiveTab(t.id); setError(""); setPreview(null); }}
              style={{ flex: 1, padding: "14px 0", border: "none", borderBottom: `3px solid ${activeTab === t.id ? C.accent : "transparent"}`, background: activeTab === t.id ? "#EBF5FF" : "#fff", color: activeTab === t.id ? C.accentDark : C.muted, fontFamily: C.poppins, fontSize: 13.5, fontWeight: activeTab === t.id ? 700 : 500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.15s" }}>
              <span style={{ fontSize: 18 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>

          {/* Paste tab */}
          {activeTab === "paste" && (
            <div>
              <p style={{ fontSize: 13, color: C.muted, margin: "0 0 12px", fontFamily: C.sans }}>Paste your blog JSON data below. The data will populate all form fields for review before publishing.</p>
              <textarea
                value={pasteText}
                onChange={(e) => handlePasteChange(e.target.value)}
                placeholder={`{\n  "title": "Your Blog Title",\n  "slug": "your-blog-slug",\n  "excerpt": "Short description...",\n  "tag": "BIS",\n  ...\n}`}
                style={{ width: "100%", boxSizing: "border-box", height: 280, padding: "12px 14px", border: `1.5px solid ${error ? C.danger : pasteText && !error ? C.success : C.border}`, borderRadius: 10, fontSize: 12.5, fontFamily: "monospace", resize: "vertical", outline: "none", color: C.text, lineHeight: 1.6 }}
              />
            </div>
          )}

          {/* Upload tab */}
          {activeTab === "upload" && (
            <div>
              <p style={{ fontSize: 13, color: C.muted, margin: "0 0 16px", fontFamily: C.sans }}>Upload a <strong>.json</strong> file. All blog fields will be auto-filled from the file data.</p>
              <input ref={fileRef} type="file" accept=".json,application/json" style={{ display: "none" }} onChange={handleFileUpload} />
              <div
                onClick={() => fileRef.current?.click()}
                style={{ border: `2px dashed ${fileName ? C.accent : C.border}`, borderRadius: 12, padding: "40px 24px", textAlign: "center", cursor: "pointer", background: fileName ? "#EBF5FF" : C.bg, transition: "all 0.2s" }}
              >
                <div style={{ fontSize: 48, marginBottom: 12 }}>{fileName ? "✅" : "📁"}</div>
                {fileName ? (
                  <>
                    <div style={{ fontFamily: C.poppins, fontSize: 14, fontWeight: 700, color: C.accentDark, marginBottom: 4 }}>{fileName}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>Click to change file</div>
                  </>
                ) : (
                  <>
                    <div style={{ fontFamily: C.poppins, fontSize: 14, fontWeight: 600, color: C.text, marginBottom: 6 }}>Click to upload JSON file</div>
                    <div style={{ fontSize: 12, color: C.muted }}>or drag and drop your .json file here</div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ marginTop: 12, padding: "10px 14px", background: "#FEE2E2", border: "1px solid #FCA5A5", borderRadius: 8, display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>❌</span>
              <div>
                <div style={{ fontFamily: C.poppins, fontSize: 12, fontWeight: 700, color: C.danger, marginBottom: 2 }}>Invalid JSON</div>
                <div style={{ fontSize: 12, color: C.danger, fontFamily: "monospace" }}>{error}</div>
              </div>
            </div>
          )}

          {/* Preview */}
          {preview && !error && (
            <div style={{ marginTop: 14, padding: "14px 16px", background: "#DCFCE7", border: "1px solid #86EFAC", borderRadius: 10 }}>
              <div style={{ fontFamily: C.poppins, fontSize: 12, fontWeight: 700, color: "#166534", marginBottom: 10 }}>✅ Valid JSON — Preview</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  ["Title", preview.title],
                  ["Slug", preview.slug || "auto-generate"],
                  ["Tag", preview.tag],
                  ["Date", preview.date],
                  ["Author", preview.author],
                  ["Status", preview.status || "draft"],
                  ["Sections", `${preview.sections?.length || 0} sections`],
                  ["TOC entries", `${preview.toc?.length || 0} entries`],
                  ["Highlights", `${preview.highlights?.length || 0} items`],
                  ["Tags", preview.tags?.join(", ") || "—"],
                  ["SEO Title", preview.seo?.metaTitle || "—"],
                  ["Featured", preview.featured ? "Yes ⭐" : "No"],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: "flex", gap: 6, fontSize: 12, fontFamily: C.sans }}>
                    <span style={{ color: "#166534", fontWeight: 600, minWidth: 90, flexShrink: 0 }}>{label}:</span>
                    <span style={{ color: "#14532d", wordBreak: "break-word" }}>{val || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 10, justifyContent: "flex-end", background: C.bg, flexShrink: 0 }}>
          <button onClick={onClose} style={{ padding: "9px 18px", borderRadius: 8, border: `1px solid ${C.border}`, background: "#fff", cursor: "pointer", fontFamily: C.poppins, fontSize: 13, fontWeight: 600, color: C.muted }}>Cancel</button>
          <button
            onClick={handleLoad}
            disabled={!canLoad}
            style={{ padding: "9px 24px", borderRadius: 8, border: "none", background: canLoad ? C.accent : "#C8DFF0", color: "#fff", cursor: canLoad ? "pointer" : "not-allowed", fontFamily: C.poppins, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}
          >
            📥 Load JSON Data
          </button>
        </div>
      </div>
    </div>
  );
}
