"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, PenSquare, LogOut,
  Menu, X, ChevronRight, BookOpen, Bell, Settings
} from "lucide-react";

const T = {
  primary: "#0a6daa",
  primaryDark: "#085a8e",
  primaryLight: "#e8f4fd",
  orange: "#F97316",
  sidebarBg: "#0D1B2A",
  sidebarText: "rgba(255,255,255,0.70)",
  sidebarActive: "rgba(10,109,170,0.30)",
  sidebarHover: "rgba(255,255,255,0.06)",
  border: "#E8E3DA",
  white: "#FFFFFF",
  bg: "#F5F7FA",
  poppins: "'Poppins','system-ui',sans-serif",
};

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/blogs", icon: FileText, label: "All Blogs" },
  { href: "/admin/blogs/create", icon: PenSquare, label: "Create Blog" },
];

export default function AdminLayout({ children, admin, onLogout }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: T.poppins, background: T.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .admin-nav-item { display:flex; align-items:center; gap:11px; padding:10px 16px; border-radius:8px; cursor:pointer; transition:all 0.18s; color:${T.sidebarText}; font-size:13.5px; font-weight:500; text-decoration:none; position:relative; }
        .admin-nav-item:hover { background:${T.sidebarHover}; color:#fff; }
        .admin-nav-item.active { background:${T.sidebarActive}; color:#fff; border-left:3px solid ${T.primary}; }
        .admin-nav-item .chevron { margin-left:auto; opacity:0; transition:opacity 0.15s; }
        .admin-nav-item:hover .chevron, .admin-nav-item.active .chevron { opacity:1; }
        .admin-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.5); z-index:40; display:none; }
        @media(max-width:768px){ .admin-sidebar { transform:translateX(-100%); transition:transform 0.3s ease; }
          .admin-sidebar.open { transform:translateX(0); }
          .admin-overlay { display:block; } }
        .admin-main { flex:1; min-width:0; display:flex; flex-direction:column; }
        .admin-topbar { height:60px; background:#fff; border-bottom:1px solid ${T.border}; display:flex; align-items:center; padding:0 24px; gap:16px; position:sticky; top:0; z-index:20; box-shadow:0 1px 4px rgba(0,0,0,0.06); }
        .admin-content { flex:1; padding:28px 24px; }
        @media(max-width:600px){ .admin-content { padding:18px 14px; } }
        .logout-btn { display:flex; align-items:center; gap:8px; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.12); border-radius:8px; padding:8px 12px; color:rgba(255,255,255,0.65); font-size:12.5px; font-weight:500; cursor:pointer; width:100%; font-family:${T.poppins}; transition:all 0.18s; }
        .logout-btn:hover { background:rgba(239,68,68,0.15); border-color:rgba(239,68,68,0.3); color:#fca5a5; }
      `}</style>

      {/* Overlay */}
      {open && <div className="admin-overlay" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`admin-sidebar${open ? " open" : ""}`} style={{
        width: 256, background: T.sidebarBg, display: "flex", flexDirection: "column",
        position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50, padding: "0 12px",
        boxShadow: "4px 0 20px rgba(0,0,0,0.15)",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 8px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: `linear-gradient(135deg, ${T.primary}, #0d7fc4)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, boxShadow: `0 4px 12px rgba(10,109,170,0.35)`,
            }}>
              <BookOpen size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontFamily: T.poppins, fontWeight: 700, fontSize: 14, color: "#fff", letterSpacing: "-0.01em" }}>
                Blog Admin
              </div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.45)", fontWeight: 400, marginTop: 1 }}>
                Siacc India
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, paddingTop: 4 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", padding: "8px 16px 6px", marginTop: 4 }}>
            Navigation
          </div>
          {navItems.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));
            return (
              <Link key={href} href={href} className={`admin-nav-item${active ? " active" : ""}`} onClick={() => setOpen(false)}>
                <Icon size={17} />
                <span>{label}</span>
                <ChevronRight size={13} className="chevron" />
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", padding: "14px 8px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 8px 12px" }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: `linear-gradient(135deg, ${T.primary}, ${T.orange})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: T.poppins, fontWeight: 700, fontSize: 13, color: "#fff", flexShrink: 0,
            }}>
              {admin?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontFamily: T.poppins, fontSize: 13, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {admin?.name || "Admin"}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "capitalize" }}>
                {admin?.role || "admin"}
              </div>
            </div>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main" style={{ marginLeft: 256 }}>
        {/* Topbar */}
        <div className="admin-topbar">
          <button
            onClick={() => setOpen(true)}
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4, color: "#374151" }}
            className="mobile-menu-btn"
          >
            <Menu size={22} />
          </button>
          <div style={{ flex: 1 }} />
          <div style={{
            fontSize: 12.5, fontWeight: 500, color: "#6B7280",
            background: "#F3F4F6", padding: "6px 14px", borderRadius: 6,
          }}>
            {admin?.email}
          </div>
        </div>

        {/* Page content */}
        <div className="admin-content">
          {children}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          .admin-main { margin-left:0 !important; }
          .mobile-menu-btn { display:flex !important; }
        }
      `}</style>
    </div>
  );
}
