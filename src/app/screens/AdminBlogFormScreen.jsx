"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save, ArrowLeft, Plus, Trash2, Eye, EyeOff, Star, Upload, FileJson, X, ClipboardPaste, FolderOpen,
  ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Image as ImageIcon
} from "lucide-react";
import AdminLayout from "../Components/admin/AdminLayout";
import { useAdminAuth } from "./lib/useAdminAuth";
import { adminApi } from "./lib/api";

const T = {
  primary: "#0a6daa",
  primaryDark: "#085a8e",
  primaryLight: "#E8F4FD",
  orange: "#F97316",
  slate: "#0D1B2A",
  body: "#2D3748",
  muted: "#718096",
  border: "#E8E3DA",
  poppins: "'Poppins','system-ui',sans-serif",
};

const TAGS = ["BIS", "BIS Update", "EPR", "WPC", "TEC", "BEE", "LMPC", "ISO", "CDSCO"];
const tagColors = {
  "BIS": { bg: "#FEF3DC", text: "#9A5C06" }, "BIS Update": { bg: "#FEF3DC", text: "#9A5C06" },
  "EPR": { bg: "#DCFCE7", text: "#166534" }, "WPC": { bg: "#EBF5F5", text: "#074D4D" },
  "TEC": { bg: "#EDE9FE", text: "#5b21b6" }, "BEE": { bg: "#FEF3C7", text: "#92400e" },
  "LMPC": { bg: "#FFE4E6", text: "#9f1239" }, "ISO": { bg: "#EBF5F5", text: "#0E8080" },
  "CDSCO": { bg: "#FDF2F8", text: "#9d174d" },
};

const BLOCK_TYPES = ["p", "h3", "ul", "ol", "callout", "callout-warn", "steps", "img"];

const emptyBlog = {
  title: "", slug: "", excerpt: "", tag: "BIS", date: "", readTime: "5 min read",
  author: "Compliance & Regulatory Team", featured: false, status: "draft",
  img: "", heroImg: "",
  heroGradient: "linear-gradient(135deg,rgba(13,27,42,0.97) 0%,rgba(10,109,170,0.82) 100%)",
  tagStyle: { bg: "#FEF3DC", text: "#9A5C06" },
  highlights: [""],
  toc: [{ id: "", label: "" }],
  meta: [{ label: "", value: "" }],
  sections: [{ id: "", heading: "", content: [{ type: "p", text: "" }] }],
  tags: [""],
  sidebarCta: { title: "", body: "", btn: "" },
  ctaTitle: "", ctaBody: "",
  related: [],
  seo: { metaTitle: "", metaDescription: "", metaKeywords: [], ogTitle: "", ogDescription: "", ogImage: "", canonicalUrl: "", noIndex: false },
};

// ── Small helpers ──────────────────────────────────────────────
function Label({ children, required }) {
  return (
    <label style={{ fontSize: 12.5, fontWeight: 600, color: T.body, display: "block", marginBottom: 5 }}>
      {children}{required && <span style={{ color: "#EF4444", marginLeft: 3 }}>*</span>}
    </label>
  );
}
function Input({ style, ...props }) {
  return (
    <input style={{
      width: "100%", padding: "9px 12px", border: `1.5px solid ${T.border}`,
      borderRadius: 8, fontFamily: T.poppins, fontSize: 13, color: T.slate,
      outline: "none", transition: "border-color 0.18s",
      ...style,
    }}
      onFocus={e => e.target.style.borderColor = T.primary}
      onBlur={e => e.target.style.borderColor = T.border}
      {...props}
    />
  );
}
function Textarea({ style, ...props }) {
  return (
    <textarea style={{
      width: "100%", padding: "9px 12px", border: `1.5px solid ${T.border}`,
      borderRadius: 8, fontFamily: T.poppins, fontSize: 13, color: T.slate,
      outline: "none", resize: "vertical", minHeight: 80, transition: "border-color 0.18s",
      ...style,
    }}
      onFocus={e => e.target.style.borderColor = T.primary}
      onBlur={e => e.target.style.borderColor = T.border}
      {...props}
    />
  );
}
function SectionCard({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${T.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)", overflow: "hidden", marginBottom: 18 }}>
      <button type="button" onClick={() => setOpen(o => !o)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 20px", background: "none", border: "none", cursor: "pointer", fontFamily: T.poppins,
      }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: T.slate }}>{title}</span>
        {open ? <ChevronUp size={16} color={T.muted} /> : <ChevronDown size={16} color={T.muted} />}
      </button>
      {open && <div style={{ padding: "0 20px 20px", borderTop: `1px solid #F0F4F8` }}>{children}</div>}
    </div>
  );
}

// ── Content block editor ──────────────────────────────────────
function BlockEditor({ block, onChange, onRemove }) {
  const update = (key, val) => onChange({ ...block, [key]: val });
  const updateItem = (i, val) => {
    const items = [...(block.items || [])];
    items[i] = val;
    update("items", items);
  };
  const addItem = () => update("items", [...(block.items || []), ""]);
  const removeItem = (i) => update("items", (block.items || []).filter((_, j) => j !== i));

  const updateStep = (i, key, val) => {
    const steps = [...(block.stepItems || [])];
    steps[i] = { ...steps[i], [key]: val };
    update("stepItems", steps);
  };
  const addStep = () => update("stepItems", [...(block.stepItems || []), { n: "", title: "", desc: "", tip: "" }]);
  const removeStep = (i) => update("stepItems", (block.stepItems || []).filter((_, j) => j !== i));

  return (
    <div style={{ border: `1.5px solid #E8E3DA`, borderRadius: 8, padding: 14, marginBottom: 10, background: "#FAFAFA" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <select value={block.type} onChange={e => update("type", e.target.value)} style={{ padding: "6px 10px", borderRadius: 6, border: `1.5px solid ${T.border}`, fontFamily: T.poppins, fontSize: 12.5, color: T.body, outline: "none" }}>
          {BLOCK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button type="button" onClick={onRemove} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#EF4444", padding: 4 }}>
          <Trash2 size={14} />
        </button>
      </div>

      {["p", "h3", "callout", "callout-warn"].includes(block.type) && (
        <Textarea value={block.text || ""} onChange={e => update("text", e.target.value)} placeholder={`Enter ${block.type} text…`} style={{ minHeight: block.type === "p" ? 90 : 60 }} />
      )}

      {["ul", "ol"].includes(block.type) && (
        <div>
          {(block.items || []).map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
              <Input value={item} onChange={e => updateItem(i, e.target.value)} placeholder={`Item ${i + 1}`} />
              <button type="button" onClick={() => removeItem(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", flexShrink: 0 }}><Trash2 size={13} /></button>
            </div>
          ))}
          <button type="button" onClick={addItem} style={{ fontSize: 12.5, color: T.primary, background: "none", border: "none", cursor: "pointer", padding: "4px 0", fontFamily: T.poppins }}>+ Add item</button>
        </div>
      )}

      {block.type === "img" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Input value={block.src || ""} onChange={e => update("src", e.target.value)} placeholder="Image URL" />
          <Input value={block.alt || ""} onChange={e => update("alt", e.target.value)} placeholder="Alt text" />
        </div>
      )}

      {block.type === "steps" && (
        <div>
          {(block.stepItems || []).map((step, i) => (
            <div key={i} style={{ border: "1px solid #E8E3DA", borderRadius: 6, padding: 10, marginBottom: 8, background: "#fff" }}>
              <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                <Input value={step.n || ""} onChange={e => updateStep(i, "n", e.target.value)} placeholder="Step #" style={{ width: 60 }} />
                <Input value={step.title || ""} onChange={e => updateStep(i, "title", e.target.value)} placeholder="Step title" />
                <button type="button" onClick={() => removeStep(i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", flexShrink: 0 }}><Trash2 size={13} /></button>
              </div>
              <Textarea value={step.desc || ""} onChange={e => updateStep(i, "desc", e.target.value)} placeholder="Description" style={{ minHeight: 56, marginBottom: 6 }} />
              <Input value={step.tip || ""} onChange={e => updateStep(i, "tip", e.target.value)} placeholder="Tip (optional)" />
            </div>
          ))}
          <button type="button" onClick={addStep} style={{ fontSize: 12.5, color: T.primary, background: "none", border: "none", cursor: "pointer", fontFamily: T.poppins }}>+ Add step</button>
        </div>
      )}
    </div>
  );
}

// ── Main form component ───────────────────────────────────────
export default function AdminBlogFormScreen({ blogId }) {
  const router = useRouter();
  const { admin, loading: authLoading, logout } = useAdminAuth();
  const [form, setForm] = useState(emptyBlog);
  const [fetchLoading, setFetchLoading] = useState(!!blogId);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [imgUploading, setImgUploading] = useState({});

  const isEdit = !!blogId;

  useEffect(() => {
    if (!isEdit || authLoading) return;
    (async () => {
      try {
        const res = await adminApi.getBlog(blogId);
        const b = res.data;
        // Ensure arrays are never null
        setForm({
          ...emptyBlog, ...b,
          highlights: b.highlights?.length ? b.highlights : [""],
          toc: b.toc?.length ? b.toc : [{ id: "", label: "" }],
          meta: b.meta?.length ? b.meta : [{ label: "", value: "" }],
          sections: b.sections?.length ? b.sections : [{ id: "", heading: "", content: [{ type: "p", text: "" }] }],
          tags: b.tags?.length ? b.tags : [""],
          related: b.related || [],
          seo: { ...emptyBlog.seo, ...b.seo },
          sidebarCta: { ...emptyBlog.sidebarCta, ...b.sidebarCta },
          tagStyle: b.tagStyle || tagColors[b.tag] || emptyBlog.tagStyle,
        });
      } catch (e) { showToast("error", "Failed to load blog: " + e.message); }
      finally { setFetchLoading(false); }
    })();
  }, [blogId, isEdit, authLoading]);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const setNested = (parent, key, val) => setForm(f => ({ ...f, [parent]: { ...f[parent], [key]: val } }));

  // Array helpers
  const arrAdd = (key, item) => set(key, [...form[key], item]);
  const arrUpdate = (key, i, val) => { const a = [...form[key]]; a[i] = val; set(key, a); };
  const arrRemove = (key, i) => set(key, form[key].filter((_, j) => j !== i));

  // Section helpers
  const sectionUpdate = (si, key, val) => {
    const s = form.sections.map((sec, i) => i === si ? { ...sec, [key]: val } : sec);
    set("sections", s);
  };
  const sectionAddBlock = (si) => {
    const s = form.sections.map((sec, i) => i === si ? { ...sec, content: [...sec.content, { type: "p", text: "" }] } : sec);
    set("sections", s);
  };
  const sectionUpdateBlock = (si, bi, block) => {
    const s = form.sections.map((sec, i) => {
      if (i !== si) return sec;
      const content = sec.content.map((b, j) => j === bi ? block : b);
      return { ...sec, content };
    });
    set("sections", s);
  };
  const sectionRemoveBlock = (si, bi) => {
    const s = form.sections.map((sec, i) => i !== si ? sec : { ...sec, content: sec.content.filter((_, j) => j !== bi) });
    set("sections", s);
  };

  // Image upload
  const handleImgUpload = async (field, file) => {
    if (!file) return;
    setImgUploading(u => ({ ...u, [field]: true }));
    try {
      const res = await adminApi.uploadImage(file);
      const url = res.url || res.data?.url || "";
      if (field.includes(".")) {
        const [parent, key] = field.split(".");
        setNested(parent, key, url);
      } else { set(field, url); }
    } catch (e) { showToast("error", "Upload failed: " + e.message); }
    finally { setImgUploading(u => ({ ...u, [field]: false })); }
  };

  // Auto-generate slug from title
  const autoSlug = (title) =>
    title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  // ── JSON Upload ──────────────────────────────────────────────
  const [jsonPanel, setJsonPanel] = useState(false);
  const [jsonTab, setJsonTab] = useState("paste"); // "paste" | "file"
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState("");

  const loadJson = (raw) => {
    setJsonError("");
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed !== "object" || Array.isArray(parsed)) {
        setJsonError("JSON must be an object matching the blog schema."); return;
      }
      setForm(prev => ({
        ...emptyBlog, ...prev, ...parsed,
        highlights: parsed.highlights?.length ? parsed.highlights : prev.highlights,
        toc: parsed.toc?.length ? parsed.toc : prev.toc,
        meta: parsed.meta?.length ? parsed.meta : prev.meta,
        sections: parsed.sections?.length ? parsed.sections : prev.sections,
        tags: parsed.tags?.length ? parsed.tags : prev.tags,
        related: parsed.related || prev.related,
        seo: { ...emptyBlog.seo, ...prev.seo, ...parsed.seo },
        sidebarCta: { ...emptyBlog.sidebarCta, ...prev.sidebarCta, ...parsed.sidebarCta },
        tagStyle: parsed.tagStyle || tagColors[parsed.tag] || prev.tagStyle,
      }));
      setJsonPanel(false);
      setJsonText("");
      showToast("success", "JSON loaded — form fields populated!");
    } catch (e) {
      setJsonError("Invalid JSON: " + e.message);
    }
  };

  const handleJsonFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setJsonText(ev.target.result); setJsonTab("paste"); };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Save
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.tag || !form.excerpt || !form.date || !form.img) {
      showToast("error", "Title, Tag, Excerpt, Date and Image are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        highlights: form.highlights.filter(Boolean),
        toc: form.toc.filter(t => t.id && t.label),
        meta: form.meta.filter(m => m.label && m.value),
        tags: form.tags.filter(Boolean),
        sections: form.sections.filter(s => s.heading).map(s => ({
          ...s,
          content: s.content.filter(b => b.type),
        })),
      };
      if (isEdit) {
        await adminApi.updateBlog(blogId, payload);
        showToast("success", "Blog updated successfully!");
      } else {
        await adminApi.createBlog(payload);
        showToast("success", "Blog created successfully!");
        setTimeout(() => router.push("/admin/blogs"), 1200);
      }
    } catch (e) { showToast("error", e.message); }
    finally { setSaving(false); }
  };

  if (authLoading || fetchLoading) return null;

  return (
    <AdminLayout admin={admin} onLogout={logout}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        .img-upload-btn { display:inline-flex; align-items:center; gap:6px; padding:7px 14px; border:1.5px dashed ${T.border}; border-radius:8px; font-family:${T.poppins}; font-size:12.5px; color:${T.muted}; cursor:pointer; transition:all 0.15s; background:#FAFAFA; }
        .img-upload-btn:hover { border-color:${T.primary}; color:${T.primary}; }
        .save-btn { display:inline-flex; align-items:center; gap:8px; padding:11px 24px; border:none; border-radius:8px; font-family:${T.poppins}; font-size:14px; font-weight:600; cursor:pointer; background:linear-gradient(135deg,${T.primary},#0d7fc4); color:#fff; transition:all 0.2s; }
        .save-btn:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 6px 20px rgba(10,109,170,0.3); }
        .save-btn:disabled { opacity:0.65; cursor:not-allowed; }
        .add-btn { font-size:12.5px; color:${T.primary}; background:none; border:none; cursor:pointer; fontFamily:${T.poppins}; padding:4px 0; }
        input[type=checkbox] { width:16px; height:16px; cursor:pointer; }
      `}</style>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 24, zIndex: 1000,
          display: "flex", alignItems: "center", gap: 10,
          background: toast.type === "success" ? "#ECFDF5" : "#FEF2F2",
          border: `1px solid ${toast.type === "success" ? "#A7F3D0" : "#FECACA"}`,
          borderRadius: 10, padding: "12px 18px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          animation: "fadeIn 0.25s ease",
          fontFamily: T.poppins, fontSize: 13, fontWeight: 500,
          color: toast.type === "success" ? "#065F46" : "#DC2626", maxWidth: 360,
        }}>
          {toast.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        <Link href="/admin/blogs" style={{ display: "flex", alignItems: "center", gap: 6, color: T.muted, textDecoration: "none", fontSize: 13 }}>
          <ArrowLeft size={15} />Back
        </Link>
        <h1 style={{ fontFamily: T.poppins, fontSize: 21, fontWeight: 700, color: T.slate }}>
          {isEdit ? "Edit Blog" : "Create New Blog"}
        </h1>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button type="button" onClick={() => { setJsonPanel(o => !o); setJsonError(""); }} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
            border: `1.5px solid ${jsonPanel ? T.primary : T.border}`,
            borderRadius: 8, background: jsonPanel ? "#E8F4FD" : "#fff",
            cursor: "pointer", fontFamily: T.poppins, fontSize: 12.5, fontWeight: 600,
            color: jsonPanel ? T.primary : T.body, transition: "all 0.18s",
          }}>
            <FileJson size={15} />
            Load JSON
          </button>
          <button type="button" onClick={() => set("status", form.status === "published" ? "draft" : "published")} style={{
            display: "flex", alignItems: "center", gap: 6, padding: "9px 16px",
            border: `1.5px solid ${form.status === "published" ? "#FECACA" : "#BBF7D0"}`,
            borderRadius: 8, background: "none", cursor: "pointer", fontFamily: T.poppins,
            fontSize: 12.5, fontWeight: 500,
            color: form.status === "published" ? "#DC2626" : "#065F46",
          }}>
            {form.status === "published" ? <><EyeOff size={14} />Unpublish</> : <><Eye size={14} />Publish</>}
          </button>
          <button className="save-btn" onClick={handleSave} disabled={saving}>
            <Save size={15} />
            {saving ? "Saving…" : isEdit ? "Update Blog" : "Create Blog"}
          </button>
        </div>
      </div>

      {/* ── JSON Upload Panel ── */}
      {jsonPanel && (
        <div style={{
          background: "#F0F7FF", border: `1.5px solid ${T.primary}33`,
          borderRadius: 14, padding: "22px 24px", marginBottom: 22,
          boxShadow: "0 4px 16px rgba(10,109,170,0.08)",
        }}>
          {/* Panel header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <div>
              <div style={{ fontFamily: T.poppins, fontSize: 15, fontWeight: 700, color: T.slate, display: "flex", alignItems: "center", gap: 8 }}>
                <FileJson size={18} color={T.primary} /> Upload Blog Data (JSON)
              </div>
              <div style={{ fontSize: 12.5, color: T.muted, marginTop: 3 }}>
                Paste JSON directly or upload a .json file — all form fields will be auto-populated.
              </div>
            </div>
            <button type="button" onClick={() => { setJsonPanel(false); setJsonText(""); setJsonError(""); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: T.muted, padding: 4 }}>
              <X size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 0, marginBottom: 14, border: `1.5px solid ${T.border}`, borderRadius: 9, overflow: "hidden", background: "#fff", marginTop: 14 }}>
            {[
              { key: "paste", icon: ClipboardPaste, label: "Paste JSON" },
              { key: "file", icon: FolderOpen, label: "Upload File" },
            ].map(({ key, icon: Icon, label }) => (
              <button
                key={key} type="button"
                onClick={() => setJsonTab(key)}
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "11px 0", border: "none", cursor: "pointer", fontFamily: T.poppins,
                  fontSize: 13, fontWeight: 600, transition: "all 0.18s",
                  background: jsonTab === key ? T.primary : "#fff",
                  color: jsonTab === key ? "#fff" : T.muted,
                }}
              >
                <Icon size={15} />{label}
              </button>
            ))}
          </div>

          {/* Paste tab */}
          {jsonTab === "paste" && (
            <textarea
              value={jsonText}
              onChange={e => { setJsonText(e.target.value); setJsonError(""); }}
              placeholder="Paste your JSON data here..."
              style={{
                width: "100%", minHeight: 220, padding: "12px 14px",
                border: `1.5px solid ${jsonError ? "#FECACA" : T.border}`,
                borderRadius: 9, fontFamily: "'Courier New', monospace", fontSize: 12.5,
                color: T.slate, outline: "none", resize: "vertical", background: "#fff",
                lineHeight: 1.6,
              }}
              onFocus={e => e.target.style.borderColor = T.primary}
              onBlur={e => e.target.style.borderColor = jsonError ? "#FECACA" : T.border}
            />
          )}

          {/* File upload tab */}
          {jsonTab === "file" && (
            <label style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              minHeight: 160, border: `2px dashed ${T.border}`, borderRadius: 10,
              background: "#fff", cursor: "pointer", transition: "all 0.18s", gap: 10,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = T.primary; e.currentTarget.style.background = "#F0F7FF"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = "#fff"; }}
            >
              <FolderOpen size={32} color={T.muted} />
              <div style={{ fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, color: T.body }}>Click to upload .json file</div>
              <div style={{ fontSize: 12, color: T.muted }}>Only .json files are supported</div>
              {jsonText && <div style={{ fontSize: 12, color: T.primary, fontWeight: 500 }}>✓ File loaded — click "Load JSON Data" below</div>}
              <input type="file" accept=".json,application/json" style={{ display: "none" }} onChange={handleJsonFile} />
            </label>
          )}

          {/* Error */}
          {jsonError && (
            <div style={{ display: "flex", gap: 8, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginTop: 10 }}>
              <AlertCircle size={15} color="#EF4444" style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 12.5, color: "#DC2626" }}>{jsonError}</span>
            </div>
          )}

          {/* Load button */}
          <button
            type="button"
            onClick={() => loadJson(jsonText)}
            disabled={!jsonText.trim()}
            style={{
              width: "100%", marginTop: 14, padding: "12px",
              background: jsonText.trim() ? `linear-gradient(135deg,${T.primary},#0d7fc4)` : "#CBD5E0",
              color: "#fff", border: "none", borderRadius: 9,
              fontFamily: T.poppins, fontSize: 14, fontWeight: 600,
              cursor: jsonText.trim() ? "pointer" : "not-allowed",
              transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            <FileJson size={16} /> Load JSON Data
          </button>
        </div>
      )}

      <form onSubmit={handleSave} onKeyDown={e => e.key === "Enter" && e.target.tagName !== "TEXTAREA" && e.preventDefault()}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, alignItems: "start" }}>

          {/* ── LEFT COLUMN ─── */}
          <div>
            {/* Core info */}
            <SectionCard title="Core Information">
              <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
                <div>
                  <Label required>Title</Label>
                  <Input value={form.title} onChange={e => { set("title", e.target.value); if (!isEdit) set("slug", autoSlug(e.target.value)); }} placeholder="Blog title…" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <Label required>Slug</Label>
                    <Input value={form.slug} onChange={e => set("slug", e.target.value)} placeholder="blog-slug" />
                  </div>
                  <div>
                    <Label required>Tag / Category</Label>
                    <select value={form.tag} onChange={e => { set("tag", e.target.value); set("tagStyle", tagColors[e.target.value] || emptyBlog.tagStyle); }} style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${T.border}`, borderRadius: 8, fontFamily: T.poppins, fontSize: 13, color: T.slate, outline: "none" }}>
                      {TAGS.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <Label required>Excerpt</Label>
                  <Textarea value={form.excerpt} onChange={e => set("excerpt", e.target.value)} placeholder="Short summary shown in listing cards (1–2 sentences)…" style={{ minHeight: 72 }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  <div>
                    <Label required>Date</Label>
                    <Input value={form.date} onChange={e => set("date", e.target.value)} placeholder="April 20, 2025" />
                  </div>
                  <div>
                    <Label>Read Time</Label>
                    <Input value={form.readTime} onChange={e => set("readTime", e.target.value)} placeholder="5 min read" />
                  </div>
                  <div>
                    <Label>Author</Label>
                    <Input value={form.author} onChange={e => set("author", e.target.value)} />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Images */}
            <SectionCard title="Images">
              <div style={{ display: "grid", gap: 14, marginTop: 14 }}>
                {[["img", "Card Thumbnail (required)", true], ["heroImg", "Hero / Detail Page Image", false]].map(([field, label, req]) => (
                  <div key={field}>
                    <Label required={req}>{label}</Label>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <Input value={form[field]} onChange={e => set(field, e.target.value)} placeholder="https://… or upload →" style={{ flex: 1 }} />
                      <label className="img-upload-btn" title="Upload image">
                        {imgUploading[field] ? "…" : <><Upload size={13} />Upload</>}
                        <input type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleImgUpload(field, e.target.files[0])} />
                      </label>
                    </div>
                    {form[field] && (
                      <div style={{ marginTop: 8, width: 120, height: 72, borderRadius: 8, overflow: "hidden", border: `1px solid ${T.border}`, background: "#f5f5f5" }}>
                        <img
                          src={form[field]}
                          alt="preview"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          onError={e => { e.target.style.display = "none"; }}
                        />
                      </div>
                    )}
                  </div>
                ))}
                <div>
                  <Label>Hero Gradient</Label>
                  <Input value={form.heroGradient} onChange={e => set("heroGradient", e.target.value)} placeholder="linear-gradient(…)" />
                </div>
              </div>
            </SectionCard>

            {/* Highlights */}
            <SectionCard title="Highlights (Key Takeaways)">
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
                {form.highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", gap: 8 }}>
                    <Input value={h} onChange={e => arrUpdate("highlights", i, e.target.value)} placeholder={`Highlight ${i + 1}`} />
                    <button type="button" onClick={() => arrRemove("highlights", i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", flexShrink: 0 }}><Trash2 size={14} /></button>
                  </div>
                ))}
                <button type="button" className="add-btn" onClick={() => arrAdd("highlights", "")}>+ Add highlight</button>
              </div>
            </SectionCard>

            {/* TOC */}
            <SectionCard title="Table of Contents" defaultOpen={false}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
                {form.toc.map((t, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8 }}>
                    <Input value={t.id} onChange={e => arrUpdate("toc", i, { ...t, id: e.target.value })} placeholder="section-id" />
                    <Input value={t.label} onChange={e => arrUpdate("toc", i, { ...t, label: e.target.value })} placeholder="Label" />
                    <button type="button" onClick={() => arrRemove("toc", i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}><Trash2 size={14} /></button>
                  </div>
                ))}
                <button type="button" className="add-btn" onClick={() => arrAdd("toc", { id: "", label: "" })}>+ Add TOC entry</button>
              </div>
            </SectionCard>

            {/* Meta info */}
            <SectionCard title="Meta Info (Sidebar)" defaultOpen={false}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
                {form.meta.map((m, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8 }}>
                    <Input value={m.label} onChange={e => arrUpdate("meta", i, { ...m, label: e.target.value })} placeholder="Label" />
                    <Input value={m.value} onChange={e => arrUpdate("meta", i, { ...m, value: e.target.value })} placeholder="Value" />
                    <button type="button" onClick={() => arrRemove("meta", i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}><Trash2 size={14} /></button>
                  </div>
                ))}
                <button type="button" className="add-btn" onClick={() => arrAdd("meta", { label: "", value: "" })}>+ Add meta row</button>
              </div>
            </SectionCard>

            {/* Sections (main content) */}
            <SectionCard title="Content Sections">
              <div style={{ marginTop: 14 }}>
                {form.sections.map((sec, si) => (
                  <div key={si} style={{ border: `1.5px solid ${T.border}`, borderRadius: 10, padding: 14, marginBottom: 14, background: "#FAFAFA" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: 10, marginBottom: 12 }}>
                      <Input value={sec.id} onChange={e => sectionUpdate(si, "id", e.target.value)} placeholder="section-id" />
                      <Input value={sec.heading} onChange={e => sectionUpdate(si, "heading", e.target.value)} placeholder="Section heading" />
                      <button type="button" onClick={() => set("sections", form.sections.filter((_, j) => j !== si))} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444" }}><Trash2 size={15} /></button>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Content Blocks</div>
                    {sec.content.map((block, bi) => (
                      <BlockEditor
                        key={bi}
                        block={block}
                        onChange={b => sectionUpdateBlock(si, bi, b)}
                        onRemove={() => sectionRemoveBlock(si, bi)}
                      />
                    ))}
                    <button type="button" className="add-btn" onClick={() => sectionAddBlock(si)}>+ Add content block</button>
                  </div>
                ))}
                <button type="button" onClick={() => arrAdd("sections", { id: "", heading: "", content: [{ type: "p", text: "" }] })}
                  style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: `1.5px dashed ${T.border}`, borderRadius: 8, background: "none", cursor: "pointer", fontFamily: T.poppins, fontSize: 13, color: T.muted, width: "100%", justifyContent: "center" }}>
                  <Plus size={14} />Add Section
                </button>
              </div>
            </SectionCard>

            {/* CTA */}
            <SectionCard title="CTA Band" defaultOpen={false}>
              <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
                <div><Label>CTA Title</Label><Input value={form.ctaTitle} onChange={e => set("ctaTitle", e.target.value)} placeholder="Ready to get certified?" /></div>
                <div><Label>CTA Body</Label><Textarea value={form.ctaBody} onChange={e => set("ctaBody", e.target.value)} /></div>
              </div>
            </SectionCard>

            {/* SEO */}
            <SectionCard title="SEO Settings" defaultOpen={false}>
              <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
                <div><Label>Meta Title</Label><Input value={form.seo.metaTitle} onChange={e => setNested("seo", "metaTitle", e.target.value)} placeholder="Defaults to blog title" /></div>
                <div><Label>Meta Description</Label><Textarea value={form.seo.metaDescription} onChange={e => setNested("seo", "metaDescription", e.target.value)} placeholder="Max 160 chars…" style={{ minHeight: 60 }} /></div>
                <div><Label>Meta Keywords (comma-separated)</Label><Input value={(form.seo.metaKeywords || []).join(", ")} onChange={e => setNested("seo", "metaKeywords", e.target.value.split(",").map(s => s.trim()))} placeholder="BIS, certification, compliance…" /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><Label>OG Title</Label><Input value={form.seo.ogTitle} onChange={e => setNested("seo", "ogTitle", e.target.value)} /></div>
                  <div><Label>OG Image URL</Label><Input value={form.seo.ogImage} onChange={e => setNested("seo", "ogImage", e.target.value)} /></div>
                </div>
                <div><Label>OG Description</Label><Textarea value={form.seo.ogDescription} onChange={e => setNested("seo", "ogDescription", e.target.value)} style={{ minHeight: 56 }} /></div>
                <div><Label>Canonical URL</Label><Input value={form.seo.canonicalUrl} onChange={e => setNested("seo", "canonicalUrl", e.target.value)} placeholder="https://siacc.in/blog/…" /></div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="checkbox" checked={form.seo.noIndex} onChange={e => setNested("seo", "noIndex", e.target.checked)} />
                  <span style={{ fontSize: 13, color: T.body }}>No-index (hide from search engines)</span>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* ── RIGHT COLUMN ─── */}
          <div>
            {/* Status & settings */}
            <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${T.border}`, padding: "18px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.slate, marginBottom: 14 }}>Publish Settings</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <Label>Status</Label>
                  <select value={form.status} onChange={e => set("status", e.target.value)} style={{ width: "100%", padding: "9px 12px", border: `1.5px solid ${T.border}`, borderRadius: 8, fontFamily: T.poppins, fontSize: 13, color: T.slate, outline: "none" }}>
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "#FEF3DC", borderRadius: 8, border: "1px solid #FDE68A" }}>
                  <input type="checkbox" checked={form.featured} onChange={e => set("featured", e.target.checked)} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#92400E" }}>★ Featured Post</div>
                    <div style={{ fontSize: 11.5, color: "#B45309", marginTop: 1 }}>Only 1 blog can be featured at a time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${T.border}`, padding: "18px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.slate, marginBottom: 12 }}>Tags</div>
              {form.tags.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <Input value={t} onChange={e => arrUpdate("tags", i, e.target.value)} placeholder="Tag" />
                  <button type="button" onClick={() => arrRemove("tags", i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", flexShrink: 0 }}><Trash2 size={14} /></button>
                </div>
              ))}
              <button type="button" className="add-btn" onClick={() => arrAdd("tags", "")}>+ Add tag</button>
            </div>

            {/* Sidebar CTA */}
            <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${T.border}`, padding: "18px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.slate, marginBottom: 12 }}>Sidebar CTA</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div><Label>Title</Label><Input value={form.sidebarCta.title} onChange={e => setNested("sidebarCta", "title", e.target.value)} placeholder="Need help?" /></div>
                <div><Label>Body</Label><Textarea value={form.sidebarCta.body} onChange={e => setNested("sidebarCta", "body", e.target.value)} style={{ minHeight: 60 }} /></div>
                <div><Label>Button text</Label><Input value={form.sidebarCta.btn} onChange={e => setNested("sidebarCta", "btn", e.target.value)} placeholder="Get Free Consultation →" /></div>
              </div>
            </div>

            {/* Tag style */}
            <div style={{ background: "#fff", borderRadius: 12, border: `1px solid ${T.border}`, padding: "18px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.slate, marginBottom: 12 }}>Tag Style</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <Label>Background</Label>
                  <div style={{ display: "flex", gap: 6 }}>
                    <input type="color" value={form.tagStyle.bg} onChange={e => set("tagStyle", { ...form.tagStyle, bg: e.target.value })} style={{ width: 36, height: 36, padding: 2, border: `1.5px solid ${T.border}`, borderRadius: 6, cursor: "pointer" }} />
                    <Input value={form.tagStyle.bg} onChange={e => set("tagStyle", { ...form.tagStyle, bg: e.target.value })} style={{ flex: 1 }} />
                  </div>
                </div>
                <div>
                  <Label>Text color</Label>
                  <div style={{ display: "flex", gap: 6 }}>
                    <input type="color" value={form.tagStyle.text} onChange={e => set("tagStyle", { ...form.tagStyle, text: e.target.value })} style={{ width: 36, height: 36, padding: 2, border: `1.5px solid ${T.border}`, borderRadius: 6, cursor: "pointer" }} />
                    <Input value={form.tagStyle.text} onChange={e => set("tagStyle", { ...form.tagStyle, text: e.target.value })} style={{ flex: 1 }} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 10, padding: "6px 14px", borderRadius: 6, display: "inline-flex", background: form.tagStyle.bg, color: form.tagStyle.text, fontSize: 12, fontWeight: 600 }}>{form.tag}</div>
            </div>

            {/* Save button */}
            <button className="save-btn" type="button" onClick={handleSave} disabled={saving} style={{ width: "100%", justifyContent: "center" }}>
              <Save size={15} />
              {saving ? "Saving…" : isEdit ? "Update Blog" : "Create Blog"}
            </button>
          </div>
        </div>
      </form>

      <style>{`
        @media(max-width:900px){ form > div { grid-template-columns:1fr !important; } }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-8px);} to{opacity:1;transform:translateY(0);} }
      `}</style>
    </AdminLayout>
  );
}
