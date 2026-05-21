"use client";
import { useState, useEffect, useCallback } from "react";
import { Card, Btn, Badge } from "./AdminUI";
import { api } from "@/lib/adminApi";
import { C, TAG_COLORS } from "@/lib/adminConstants";

export default function BlogList({ onEdit, onNew, toast }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", tag: "", search: "" });
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [delConfirm, setDelConfirm] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const q = { page, limit: 15, ...Object.fromEntries(Object.entries(filters).filter(([, v]) => v)) };
      const d = await api.blogs(q);
      setBlogs(d.data);
      setTotal(d.pagination.total);
    } catch (e) {
      toast("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => { load(); }, [load]);

  const toggleSelect = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const selectAll = () => setSelected(selected.length === blogs.length ? [] : blogs.map((b) => b._id));

  const handleDelete = async (id) => {
    try {
      await api.delete(id);
      toast("success", "Blog deleted");
      setDelConfirm(null);
      load();
    } catch (e) {
      toast("error", e.message);
    }
  };

  const handleToggle = async (id, type) => {
    try {
      if (type === "status") await api.toggleStatus(id);
      else await api.toggleFeatured(id);
      toast("success", "Updated");
      load();
    } catch (e) {
      toast("error", e.message);
    }
  };

  const handleBulk = async (action) => {
    if (!selected.length) return;
    try {
      const d = await api.bulk(action, selected);
      toast("success", d.message);
      setSelected([]);
      load();
    } catch (e) {
      toast("error", e.message);
    }
  };

  const confirmBulkDelete = () => {
    if (window.confirm(`Delete ${selected.length} blogs? This cannot be undone.`)) {
      handleBulk("delete");
    }
  };

  const pages = Math.ceil(total / 15);

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontFamily: C.poppins, fontSize: 20, margin: 0, color: C.text }}>All Blogs</h2>
          <p style={{ fontSize: 13, color: C.muted, margin: "4px 0 0" }}>{total} total</p>
        </div>
        <Btn onClick={onNew}>✏️ New Blog</Btn>
      </div>

      {/* Filters */}
      <Card style={{ marginBottom: 16, padding: "14px 16px" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
          <input
            placeholder="🔍 Search title, excerpt, tags..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            style={{ flex: "2 1 200px", padding: "8px 12px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 13, fontFamily: C.sans, outline: "none", boxSizing: "border-box" }}
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
            style={{ flex: "1 1 130px", padding: "8px 10px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 13, outline: "none" }}
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select
            value={filters.tag}
            onChange={(e) => setFilters((f) => ({ ...f, tag: e.target.value }))}
            style={{ flex: "1 1 130px", padding: "8px 10px", border: `1.5px solid ${C.border}`, borderRadius: 8, fontSize: 13, outline: "none" }}
          >
            <option value="">All Tags</option>
            {Object.keys(TAG_COLORS).map((t) => <option key={t}>{t}</option>)}
          </select>
          <Btn variant="ghost" onClick={() => { setFilters({ status: "", tag: "", search: "" }); setPage(1); }}>Clear</Btn>
        </div>
      </Card>

      {/* Bulk actions */}
      {selected.length > 0 && (
        <div style={{ background: C.infoBg, border: "1px solid #C8DFF0", borderRadius: 8, padding: "10px 16px", marginBottom: 12, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.accentDark }}>{selected.length} selected</span>
          <Btn variant="success" style={{ padding: "5px 12px", fontSize: 12 }} onClick={() => handleBulk("publish")}>Publish</Btn>
          <Btn variant="secondary" style={{ padding: "5px 12px", fontSize: 12 }} onClick={() => handleBulk("draft")}>Draft</Btn>
          <Btn variant="danger" style={{ padding: "5px 12px", fontSize: 12 }} onClick={confirmBulkDelete}>🗑 Delete</Btn>
          <Btn variant="ghost" style={{ padding: "5px 12px", fontSize: 12 }} onClick={() => setSelected([])}>Cancel</Btn>
        </div>
      )}

      {/* Table */}
      <Card style={{ padding: 0, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 40, textAlign: "center", color: C.muted, fontFamily: C.sans }}>Loading blogs...</div>
        ) : blogs.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: C.muted }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>📭</div>
            <p style={{ fontFamily: C.sans }}>No blogs found.{" "}
              <button onClick={onNew} style={{ color: C.accent, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                Create your first blog →
              </button>
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: C.sans }}>
              <thead>
                <tr style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
                  <th style={{ padding: "10px 12px", textAlign: "left", width: 36 }}>
                    <input type="checkbox" checked={selected.length === blogs.length && blogs.length > 0} onChange={selectAll} />
                  </th>
                  {["Title", "Tag", "Status", "Date", "Views", "Actions"].map((h) => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontFamily: C.poppins, fontSize: 11, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {blogs.map((b, i) => (
                  <tr key={b._id} style={{ borderBottom: `1px solid ${C.border}`, background: selected.includes(b._id) ? "#EBF5F5" : i % 2 === 0 ? C.white : "#FAFBFC" }}>
                    <td style={{ padding: "10px 12px" }}>
                      <input type="checkbox" checked={selected.includes(b._id)} onChange={() => toggleSelect(b._id)} />
                    </td>
                    <td style={{ padding: "10px 12px", maxWidth: 280 }}>
                      <div style={{ fontWeight: 600, color: C.text, lineHeight: 1.4, marginBottom: 2 }}>{b.title}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>/{b.slug}</div>
                      {b.featured && (
                        <span style={{ fontSize: 10, background: "#FEF3C7", color: "#92400e", padding: "1px 7px", borderRadius: 10, fontWeight: 700 }}>⭐ Featured</span>
                      )}
                    </td>
                    <td style={{ padding: "10px 12px" }}><Badge tag={b.tag} /></td>
                    <td style={{ padding: "10px 12px" }}>
                      <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: b.status === "published" ? C.successBg : C.warnBg, color: b.status === "published" ? C.success : C.warn }}>
                        {b.status}
                      </span>
                    </td>
                    <td style={{ padding: "10px 12px", color: C.muted, whiteSpace: "nowrap", fontSize: 12 }}>{b.date}</td>
                    <td style={{ padding: "10px 12px", color: C.muted, fontSize: 12 }}>{b.views}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => onEdit(b._id)} title="Edit" style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${C.border}`, background: "#fff", cursor: "pointer", fontSize: 13 }}>✏️</button>
                        <button onClick={() => handleToggle(b._id, "status")} title="Toggle status" style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${C.border}`, background: "#fff", cursor: "pointer", fontSize: 13 }}>
                          {b.status === "published" ? "📤" : "🟢"}
                        </button>
                        <button onClick={() => handleToggle(b._id, "featured")} title="Toggle featured" style={{ padding: "5px 10px", borderRadius: 6, border: `1px solid ${C.border}`, background: b.featured ? "#FEF3C7" : "#fff", cursor: "pointer", fontSize: 13 }}>⭐</button>
                        <button onClick={() => setDelConfirm(b._id)} title="Delete" style={{ padding: "5px 10px", borderRadius: 6, border: "1px solid #FCA5A5", background: C.dangerBg, cursor: "pointer", fontSize: 13 }}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {total > 15 && (
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
          <Btn variant="ghost" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>← Prev</Btn>
          <span style={{ padding: "8px 14px", fontSize: 13, color: C.muted }}>Page {page} of {pages}</span>
          <Btn variant="ghost" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next →</Btn>
        </div>
      )}

      {/* Delete confirm modal */}
      {delConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Card style={{ maxWidth: 380, width: "90%", textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ fontFamily: C.poppins, margin: "0 0 8px" }}>Delete Blog?</h3>
            <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>This action cannot be undone.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <Btn variant="ghost" onClick={() => setDelConfirm(null)}>Cancel</Btn>
              <Btn variant="danger" onClick={() => handleDelete(delConfirm)}>Yes, Delete</Btn>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
