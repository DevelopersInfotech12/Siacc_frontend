"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Eye, Star, PenSquare, TrendingUp, BookOpen, Clock, CheckCircle2, AlertCircle } from "lucide-react";
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
  success: "#10b981",
  warning: "#f59e0b",
  poppins: "'Poppins','system-ui',sans-serif",
};

function StatCard({ icon: Icon, label, value, sub, color, bg }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 12, padding: "20px 22px",
      border: "1px solid #E8E3DA", boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      display: "flex", alignItems: "flex-start", gap: 16,
      transition: "box-shadow 0.2s, transform 0.2s",
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.10)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = ""; }}
    >
      <div style={{ width: 46, height: 46, borderRadius: 12, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={20} color={color} />
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 700, color: T.slate, lineHeight: 1.1 }}>{value ?? "—"}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.body, marginTop: 2 }}>{label}</div>
        {sub && <div style={{ fontSize: 11.5, color: T.muted, marginTop: 3 }}>{sub}</div>}
      </div>
    </div>
  );
}

function BlogRow({ blog, onToggleStatus, onDelete }) {
  const [actLoading, setActLoading] = useState(false);
  const isPublished = blog.status === "published";

  const handleToggle = async () => {
    setActLoading(true);
    try { await onToggleStatus(blog._id); } finally { setActLoading(false); }
  };

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr auto auto auto",
      alignItems: "center", gap: 16, padding: "14px 20px",
      borderBottom: "1px solid #F0F4F8", transition: "background 0.15s",
    }}
      onMouseEnter={e => e.currentTarget.style.background = "#F8FAFC"}
      onMouseLeave={e => e.currentTarget.style.background = ""}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 13.5, color: T.slate, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{blog.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
          <span style={{
            fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 999,
            background: isPublished ? "#D1FAE5" : "#FEF3C7",
            color: isPublished ? "#065F46" : "#92400E",
          }}>{isPublished ? "Published" : "Draft"}</span>
          <span style={{ fontSize: 11.5, color: T.muted }}>{blog.tag}</span>
          <span style={{ fontSize: 11.5, color: T.muted }}>{blog.views ?? 0} views</span>
          {blog.featured && <span style={{ fontSize: 10.5, fontWeight: 600, color: "#B45309", background: "#FEF3DC", padding: "2px 8px", borderRadius: 999 }}>★ Featured</span>}
        </div>
      </div>
      <Link href={`/admin/blogs/edit/${blog._id}`} style={{
        fontSize: 12.5, fontWeight: 500, color: T.primary, background: "#E8F4FD",
        padding: "6px 14px", borderRadius: 6, textDecoration: "none", whiteSpace: "nowrap",
        transition: "background 0.15s",
      }}>Edit</Link>
      <button
        onClick={handleToggle}
        disabled={actLoading}
        style={{
          fontSize: 12.5, fontWeight: 500, padding: "6px 14px", borderRadius: 6,
          border: "1.5px solid", cursor: "pointer", whiteSpace: "nowrap",
          fontFamily: T.poppins, transition: "all 0.15s",
          borderColor: isPublished ? "#FECACA" : "#BBF7D0",
          color: isPublished ? "#DC2626" : "#059669",
          background: isPublished ? "#FEF2F2" : "#ECFDF5",
        }}
      >
        {actLoading ? "…" : isPublished ? "Unpublish" : "Publish"}
      </button>
      <button
        onClick={() => onDelete(blog._id)}
        style={{
          fontSize: 12.5, fontWeight: 500, padding: "6px 12px", borderRadius: 6,
          border: "1.5px solid #FECACA", background: "#FEF2F2", color: "#DC2626",
          cursor: "pointer", fontFamily: T.poppins, transition: "all 0.15s",
        }}
      >Delete</button>
    </div>
  );
}

export default function AdminDashboardScreen() {
  const { admin, loading: authLoading, logout } = useAdminAuth();
  const [stats, setStats] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, blogsRes] = await Promise.all([
        adminApi.getStats(),
        adminApi.getBlogs({ limit: 8, page: 1 }),
      ]);
      setStats(statsRes.data);
      setRecentBlogs(blogsRes.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (!authLoading) fetchData(); }, [authLoading]);

  const handleToggleStatus = async (id) => {
    await adminApi.toggleStatus(id);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog permanently?")) return;
    try {
      await adminApi.deleteBlog(id);
      fetchData();
    } catch (e) { alert(e.message); }
  };

  if (authLoading) return null;

  return (
    <AdminLayout admin={admin} onLogout={logout}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: T.poppins, fontSize: 22, fontWeight: 700, color: T.slate }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: T.muted, marginTop: 3 }}>Welcome back, {admin?.name}. Here's your blog overview.</p>
        </div>
        <Link href="/admin/blogs/create" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: `linear-gradient(135deg, ${T.primary}, #0d7fc4)`,
          color: "#fff", padding: "10px 20px", borderRadius: 8, fontFamily: T.poppins,
          fontSize: 13.5, fontWeight: 600, textDecoration: "none",
          boxShadow: "0 4px 12px rgba(10,109,170,0.28)", transition: "all 0.2s",
        }}>
          <PenSquare size={16} />
          New Blog
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div style={{ display: "flex", gap: 8, background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "12px 16px", marginBottom: 20 }}>
          <AlertCircle size={16} color="#EF4444" />
          <span style={{ fontSize: 13, color: "#DC2626" }}>{error}</span>
        </div>
      )}

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginBottom: 32 }}>
        <StatCard icon={FileText} label="Total Blogs" value={stats?.total} sub="All articles" color={T.primary} bg="#E8F4FD" />
        <StatCard icon={CheckCircle2} label="Published" value={stats?.published} sub="Live on website" color="#10b981" bg="#D1FAE5" />
        <StatCard icon={Clock} label="Drafts" value={stats?.drafts} sub="Not yet live" color="#F59E0B" bg="#FEF3C7" />
        <StatCard icon={Star} label="Featured" value={stats?.featured} sub="Highlighted posts" color="#B45309" bg="#FEF3DC" />
      </div>

      {/* Tags breakdown */}
      {stats?.byTag?.length > 0 && (
        <div style={{ background: "#fff", borderRadius: 12, padding: "20px 22px", border: "1px solid #E8E3DA", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", marginBottom: 28 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: T.slate, marginBottom: 16 }}>Posts by Category</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {stats.byTag.map(({ _id, count }) => (
              <div key={_id} style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#F5F7FA", borderRadius: 8, padding: "7px 14px",
                border: "1px solid #E8E3DA",
              }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: T.body }}>{_id || "Uncategorized"}</span>
                <span style={{
                  fontSize: 11.5, fontWeight: 700, background: T.primary,
                  color: "#fff", borderRadius: 999, padding: "1px 7px",
                }}>{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent blogs */}
      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E8E3DA", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #F0F4F8" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: T.slate }}>Recent Blogs</div>
          <Link href="/admin/blogs" style={{ fontSize: 12.5, color: T.primary, textDecoration: "none", fontWeight: 500 }}>View all →</Link>
        </div>

        {loading ? (
          <div style={{ padding: "40px 20px", textAlign: "center", color: T.muted, fontSize: 13 }}>Loading...</div>
        ) : recentBlogs.length === 0 ? (
          <div style={{ padding: "40px 20px", textAlign: "center" }}>
            <BookOpen size={36} color="#CBD5E0" style={{ margin: "0 auto 12px" }} />
            <div style={{ fontSize: 14, fontWeight: 600, color: T.body }}>No blogs yet</div>
            <div style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>Create your first blog to get started.</div>
          </div>
        ) : (
          recentBlogs.map((blog) => (
            <BlogRow key={blog._id} blog={blog} onToggleStatus={handleToggleStatus} onDelete={handleDelete} />
          ))
        )}
      </div>
    </AdminLayout>
  );
}
