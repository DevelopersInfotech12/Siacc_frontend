"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, Filter, PenSquare, Trash2, Eye, EyeOff, Star, StarOff, RefreshCw, AlertCircle, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import AdminLayout from "../Components/admin/AdminLayout";
import { useAdminAuth } from "./lib/useAdminAuth";
import { adminApi } from "./lib/api";

const T = {
  primary: "#0a6daa",
  orange: "#F97316",
  slate: "#0D1B2A",
  body: "#2D3748",
  muted: "#718096",
  border: "#E8E3DA",
  poppins: "'Poppins','system-ui',sans-serif",
};

const STATUS_OPTS = ["all", "published", "draft"];
const tagColors = {
  "BIS": { bg: "#FEF3DC", text: "#9A5C06" },
  "EPR": { bg: "#DCFCE7", text: "#166534" },
  "WPC": { bg: "#EBF5F5", text: "#074D4D" },
  "TEC": { bg: "#EDE9FE", text: "#5b21b6" },
  "BEE": { bg: "#FEF3C7", text: "#92400e" },
  "LMPC": { bg: "#FFE4E6", text: "#9f1239" },
  "ISO": { bg: "#EBF5F5", text: "#0E8080" },
  "CDSCO": { bg: "#FDF2F8", text: "#9d174d" },
};

function TagBadge({ tag }) {
  const c = tagColors[tag] || { bg: "#F5F7FA", text: "#374151" };
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 9px", borderRadius: 999, background: c.bg, color: c.text }}>
      {tag}
    </span>
  );
}

export default function AdminBlogListScreen() {
  const { admin, loading: authLoading, logout } = useAdminAuth();
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState([]);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchBlogs = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const params = { page, limit: 15 };
      if (search) params.search = search;
      if (status !== "all") params.status = status;
      const res = await adminApi.getBlogs(params);
      setBlogs(res.data);
      setPagination(res.pagination);
      setSelected([]);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, [page, search, status]);

  useEffect(() => { if (!authLoading) fetchBlogs(); }, [authLoading, fetchBlogs]);

  const handleToggleStatus = async (id) => {
    try { await adminApi.toggleStatus(id); fetchBlogs(); } catch (e) { alert(e.message); }
  };
  const handleToggleFeatured = async (id) => {
    try { await adminApi.toggleFeatured(id); fetchBlogs(); } catch (e) { alert(e.message); }
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this blog permanently?")) return;
    try { await adminApi.deleteBlog(id); fetchBlogs(); } catch (e) { alert(e.message); }
  };
  const handleBulk = async (action) => {
    if (!selected.length) return;
    if (action === "delete" && !confirm(`Delete ${selected.length} blogs?`)) return;
    setBulkLoading(true);
    try { await adminApi.bulkAction(action, selected); fetchBlogs(); }
    catch (e) { alert(e.message); }
    finally { setBulkLoading(false); }
  };

  const toggleSelect = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const toggleAll = () => setSelected(s => s.length === blogs.length ? [] : blogs.map(b => b._id));

  if (authLoading) return null;

  return (
    <AdminLayout admin={admin} onLogout={logout}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        .blog-row { display:grid; grid-template-columns:36px 1fr auto auto auto auto; align-items:center; gap:14px; padding:13px 18px; border-bottom:1px solid #F0F4F8; transition:background 0.15s; }
        .blog-row:hover { background:#F8FAFC; }
        .act-btn { display:inline-flex; align-items:center; gap:5px; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:500; cursor:pointer; font-family:${T.poppins}; border:1.5px solid; transition:all 0.15s; background:none; white-space:nowrap; }
        .search-input { padding:9px 14px 9px 40px; border:1.5px solid ${T.border}; border-radius:8px; font-family:${T.poppins}; font-size:13px; outline:none; width:240px; transition:border-color 0.18s; }
        .search-input:focus { border-color:${T.primary}; }
        .filter-btn { padding:8px 16px; border:1.5px solid ${T.border}; border-radius:8px; font-family:${T.poppins}; font-size:12.5px; font-weight:500; cursor:pointer; background:#fff; color:${T.body}; transition:all 0.15s; }
        .filter-btn.active { background:${T.primary}; border-color:${T.primary}; color:#fff; }
        @media(max-width:700px){ .blog-row { grid-template-columns:28px 1fr; } .blog-row .hide-mobile { display:none; } }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: T.poppins, fontSize: 21, fontWeight: 700, color: T.slate }}>All Blogs</h1>
          <p style={{ fontSize: 13, color: T.muted, marginTop: 3 }}>{pagination.total} total articles</p>
        </div>
        <Link href="/admin/blogs/create" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: `linear-gradient(135deg,${T.primary},#0d7fc4)`,
          color: "#fff", padding: "10px 18px", borderRadius: 8,
          fontFamily: T.poppins, fontSize: 13.5, fontWeight: 600, textDecoration: "none",
          boxShadow: "0 4px 12px rgba(10,109,170,0.28)",
        }}>
          <PenSquare size={15} />New Blog
        </Link>
      </div>

      {/* Filters toolbar */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8E3DA", padding: "14px 18px", marginBottom: 18, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <Search size={14} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: T.muted }} />
          <input className="search-input" placeholder="Search blogs…" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
        </div>
        {/* Status filters */}
        <div style={{ display: "flex", gap: 6 }}>
          {STATUS_OPTS.map(s => (
            <button key={s} className={`filter-btn${status === s ? " active" : ""}`} onClick={() => { setStatus(s); setPage(1); }}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <button onClick={fetchBlogs} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: T.muted, padding: 6 }}>
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Bulk actions */}
      {selected.length > 0 && (
        <div style={{ background: "#EBF5FB", border: "1px solid #C8DFF0", borderRadius: 8, padding: "10px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.primary }}>{selected.length} selected</span>
          <button className="act-btn" style={{ borderColor: "#BBF7D0", color: "#065F46" }} disabled={bulkLoading} onClick={() => handleBulk("publish")}>Publish all</button>
          <button className="act-btn" style={{ borderColor: "#FDE68A", color: "#92400E" }} disabled={bulkLoading} onClick={() => handleBulk("draft")}>Move to draft</button>
          <button className="act-btn" style={{ borderColor: "#FECACA", color: "#DC2626" }} disabled={bulkLoading} onClick={() => handleBulk("delete")}>Delete all</button>
        </div>
      )}

      {error && (
        <div style={{ display: "flex", gap: 8, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "12px 16px", marginBottom: 16 }}>
          <AlertCircle size={16} color="#EF4444" />
          <span style={{ fontSize: 13, color: "#DC2626" }}>{error}</span>
        </div>
      )}

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8E3DA", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", overflow: "hidden" }}>
        {/* Header row */}
        <div className="blog-row" style={{ background: "#F8FAFC", borderBottom: "2px solid #E8E3DA" }}>
          <input type="checkbox" checked={selected.length === blogs.length && blogs.length > 0} onChange={toggleAll} style={{ cursor: "pointer" }} />
          <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Title</div>
          <div className="hide-mobile" style={{ fontSize: 12, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Tag</div>
          <div className="hide-mobile" style={{ fontSize: 12, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Status</div>
          <div className="hide-mobile" style={{ fontSize: 12, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Views</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em" }}>Actions</div>
        </div>

        {loading ? (
          <div style={{ padding: "48px 20px", textAlign: "center", color: T.muted, fontSize: 13 }}>Loading blogs…</div>
        ) : blogs.length === 0 ? (
          <div style={{ padding: "56px 20px", textAlign: "center" }}>
            <BookOpen size={40} color="#CBD5E0" style={{ margin: "0 auto 14px" }} />
            <div style={{ fontSize: 15, fontWeight: 600, color: T.body }}>No blogs found</div>
            <div style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>Try a different search or filter.</div>
          </div>
        ) : (
          blogs.map((blog) => {
            const isPublished = blog.status === "published";
            return (
              <div key={blog._id} className="blog-row">
                <input type="checkbox" checked={selected.includes(blog._id)} onChange={() => toggleSelect(blog._id)} style={{ cursor: "pointer" }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13.5, color: T.slate, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{blog.title}</div>
                  <div style={{ fontSize: 11.5, color: T.muted, marginTop: 3 }}>{blog.date} · {blog.readTime}</div>
                </div>
                <div className="hide-mobile"><TagBadge tag={blog.tag} /></div>
                <div className="hide-mobile">
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
                    background: isPublished ? "#D1FAE5" : "#FEF3C7",
                    color: isPublished ? "#065F46" : "#92400E",
                  }}>{blog.status}</span>
                </div>
                <div className="hide-mobile" style={{ fontSize: 13, color: T.muted, fontWeight: 500 }}>{blog.views ?? 0}</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <Link href={`/admin/blogs/edit/${blog._id}`} className="act-btn" style={{ borderColor: "#BFDBFE", color: T.primary, textDecoration: "none" }}>
                    Edit
                  </Link>
                  <button className="act-btn" style={{ borderColor: isPublished ? "#FECACA" : "#BBF7D0", color: isPublished ? "#DC2626" : "#065F46" }} onClick={() => handleToggleStatus(blog._id)}>
                    {isPublished ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                  <button className="act-btn" style={{ borderColor: blog.featured ? "#FDE68A" : "#E5E7EB", color: blog.featured ? "#B45309" : T.muted }} onClick={() => handleToggleFeatured(blog._id)}>
                    {blog.featured ? <Star size={13} /> : <StarOff size={13} />}
                  </button>
                  <button className="act-btn" style={{ borderColor: "#FECACA", color: "#DC2626" }} onClick={() => handleDelete(blog._id)}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 22 }}>
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 14px", border: "1.5px solid #E8E3DA", borderRadius: 8, background: "#fff", cursor: "pointer", fontFamily: T.poppins, fontSize: 13, color: T.body, transition: "all 0.15s" }}
          ><ChevronLeft size={14} />Prev</button>
          <span style={{ fontSize: 13, color: T.muted }}>Page {page} of {pagination.pages}</span>
          <button
            onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
            disabled={page === pagination.pages}
            style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 14px", border: "1.5px solid #E8E3DA", borderRadius: 8, background: "#fff", cursor: "pointer", fontFamily: T.poppins, fontSize: 13, color: T.body, transition: "all 0.15s" }}
          >Next<ChevronRight size={14} /></button>
        </div>
      )}
    </AdminLayout>
  );
}
