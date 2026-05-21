"use client";
import { useState, useEffect } from "react";
import { Card, Btn, Badge } from "./AdminUI";
import { api } from "@/lib/adminApi";
import { C , TAG_COLORS} from "@/lib/adminConstants";

export default function Dashboard({ onNew }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.stats().then((d) => setStats(d.data)).catch(() => {});
  }, []);

  const StatCard = ({ label, val, icon, color }) => (
    <Card style={{ flex: 1, minWidth: 140, textAlign: "center" }}>
      <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontFamily: C.poppins, fontSize: 26, fontWeight: 800, color }}>{val ?? "—"}</div>
      <div style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{label}</div>
    </Card>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: C.poppins, fontSize: 20, margin: 0, color: C.text }}>Dashboard</h2>
          <p style={{ fontSize: 13, color: C.muted, margin: "4px 0 0" }}>Blog content overview</p>
        </div>
        <Btn onClick={onNew}>✏️ New Blog</Btn>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
        <StatCard label="Total Blogs" val={stats?.total} icon="📚" color={C.accent} />
        <StatCard label="Published" val={stats?.published} icon="🟢" color={C.success} />
        <StatCard label="Drafts" val={stats?.drafts} icon="📝" color={C.warn} />
        <StatCard label="Featured" val={stats?.featured} icon="⭐" color="#CA8A04" />
      </div>

      {stats?.byTag?.length > 0 && (
        <Card>
          <h3 style={{ fontFamily: C.poppins, fontSize: 14, margin: "0 0 14px", color: C.text }}>Blogs by Category</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {stats.byTag.map((t) => (
              <div key={t._id} style={{ background: C.bg, borderRadius: 8, padding: "8px 14px", display: "flex", gap: 8, alignItems: "center" }}>
                <Badge tag={t._id} />
                <span style={{ fontFamily: C.poppins, fontWeight: 700, fontSize: 13, color: C.text }}>{t.count}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
