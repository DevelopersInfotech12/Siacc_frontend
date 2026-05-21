"use client";
import { useState } from "react";
import { Input, Btn } from "./AdminUI";
import { api } from "@/lib/adminApi";
import { C } from "@/lib/adminConstants";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const d = await api.login(email, pass);
      localStorage.setItem("blog_admin_token", d.token);
      onLogin(d.admin);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg,${C.sidebar} 0%,${C.accentDark} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: C.sans }}>
      <div style={{ background: C.white, borderRadius: 16, padding: 40, width: "100%", maxWidth: 400, boxShadow: "0 24px 64px rgba(0,0,0,0.25)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg,${C.accentDark},${C.accent})`, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📝</div>
          <h1 style={{ fontFamily: C.poppins, fontSize: 20, fontWeight: 700, color: C.text, margin: 0 }}>Blog Admin</h1>
          <p style={{ fontSize: 13, color: C.muted, margin: "4px 0 0" }}>Sign in to manage blog content</p>
        </div>
        <form onSubmit={submit}>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@yourdomain.com" required />
          <Input label="Password" type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" required />
          {err && (
            <div style={{ background: C.dangerBg, color: C.danger, padding: "8px 12px", borderRadius: 8, fontSize: 13, marginBottom: 14 }}>
              {err}
            </div>
          )}
          <Btn variant="primary" loading={loading} style={{ width: "100%", justifyContent: "center", padding: "11px 0", fontSize: 14 }}>
            Sign In
          </Btn>
        </form>
      </div>
    </div>
  );
}
