"use client";
import { C, TAG_COLORS } from "@/lib/adminConstants";

export function Input({ label, error, ...props }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5, fontFamily: C.poppins, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          width: "100%", boxSizing: "border-box", padding: "9px 12px",
          border: `1.5px solid ${error ? C.danger : C.border}`, borderRadius: 8,
          fontSize: 13.5, fontFamily: C.sans, color: C.text,
          outline: "none", background: C.white, transition: "border-color 0.2s",
          ...props.style,
        }}
        onFocus={(e) => (e.target.style.borderColor = C.accent)}
        onBlur={(e) => (e.target.style.borderColor = error ? C.danger : C.border)}
      />
      {error && <p style={{ margin: "4px 0 0", fontSize: 11.5, color: C.danger }}>{error}</p>}
    </div>
  );
}

export function Textarea({ label, ...props }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5, fontFamily: C.poppins, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </label>
      )}
      <textarea
        {...props}
        style={{
          width: "100%", boxSizing: "border-box", padding: "9px 12px",
          border: `1.5px solid ${C.border}`, borderRadius: 8,
          fontSize: 13.5, fontFamily: C.sans, color: C.text,
          outline: "none", background: C.white, resize: "vertical", minHeight: 90,
          ...props.style,
        }}
        onFocus={(e) => (e.target.style.borderColor = C.accent)}
        onBlur={(e) => (e.target.style.borderColor = C.border)}
      />
    </div>
  );
}

export function Select({ label, children, ...props }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5, fontFamily: C.poppins, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          {label}
        </label>
      )}
      <select
        {...props}
        style={{
          width: "100%", padding: "9px 12px",
          border: `1.5px solid ${C.border}`, borderRadius: 8,
          fontSize: 13.5, fontFamily: C.sans, color: C.text,
          outline: "none", background: C.white, cursor: "pointer",
          ...props.style,
        }}
      >
        {children}
      </select>
    </div>
  );
}

export function Btn({ variant = "primary", children, loading, ...props }) {
  const styles = {
    primary:   { background: C.accent, color: "#fff", border: "none" },
    secondary: { background: "#EBF0FB", color: C.accentDark, border: "none" },
    danger:    { background: C.dangerBg, color: C.danger, border: "none" },
    success:   { background: C.successBg, color: C.success, border: "none" },
    ghost:     { background: "transparent", color: C.muted, border: `1px solid ${C.border}` },
  };
  return (
    <button
      disabled={loading || props.disabled}
      {...props}
      style={{
        padding: "8px 16px", borderRadius: 8, fontSize: 13,
        fontWeight: 600, fontFamily: C.poppins,
        cursor: loading ? "wait" : "pointer",
        display: "inline-flex", alignItems: "center", gap: 6,
        transition: "opacity 0.2s", opacity: loading ? 0.7 : 1,
        ...styles[variant], ...props.style,
      }}
    >
      {loading ? "⏳" : null}
      {children}
    </button>
  );
}

export function Card({ children, style }) {
  return (
    <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 20, ...style }}>
      {children}
    </div>
  );
}

export function Badge({ tag }) {
  const c = TAG_COLORS[tag] || { bg: "#E2E8F0", text: "#4A5568" };
  return (
    <span style={{ background: c.bg, color: c.text, padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 700, fontFamily: C.poppins }}>
      {tag}
    </span>
  );
}

export function Toast({ msg, type, onClose }) {
  if (type === "none") return null;
  const bg = type === "success" ? C.success : type === "error" ? C.danger : C.accent;
  const icon = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, background: bg, color: "#fff", padding: "12px 20px", borderRadius: 10, fontFamily: C.poppins, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", display: "flex", alignItems: "center", gap: 10, maxWidth: 360 }}>
      <span>{icon}</span>
      <span style={{ flex: 1 }}>{msg}</span>
      <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", width: 22, height: 22, borderRadius: "50%", cursor: "pointer", fontSize: 12 }}>✕</button>
    </div>
  );
}
