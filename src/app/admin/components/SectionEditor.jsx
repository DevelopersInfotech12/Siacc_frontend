"use client";
import { useState } from "react";
import BlockEditor from "./BlockEditor";
import { C } from "@/lib/adminConstants";

const BLOCK_TYPES = ["p", "h3", "ul", "ol", "callout", "callout-warn", "steps"];

export default function SectionEditor({ section, onChange, onDelete, index }) {
  const [open, setOpen] = useState(index === 0);

  const set = (key, val) => onChange({ ...section, [key]: val });

  const addBlock = (type) => {
    const block =
      type === "steps" ? { type, stepItems: [{ n: "01", title: "", desc: "", tip: "" }] }
      : type === "ul" || type === "ol" ? { type, items: [""] }
      : { type, text: "" };
    onChange({ ...section, content: [...(section.content || []), block] });
  };

  const updateBlock = (i, b) => {
    const a = [...section.content];
    a[i] = b;
    set("content", a);
  };

  const removeBlock = (i) => set("content", section.content.filter((_, j) => j !== i));

  const inputStyle = {
    padding: "7px 10px", border: `1px solid ${C.border}`, borderRadius: 7,
    fontSize: 12, fontFamily: C.sans, outline: "none", width: "100%", boxSizing: "border-box",
  };

  return (
    <div style={{ border: `1px solid ${C.border}`, borderRadius: 12, marginBottom: 12, overflow: "hidden" }}>
      {/* Section header */}
      <div
        onClick={() => setOpen(!open)}
        style={{ padding: "12px 16px", background: C.bg, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontFamily: C.poppins, fontSize: 11, fontWeight: 700, background: C.accent, color: "#fff", padding: "2px 8px", borderRadius: 20 }}>
            §{index + 1}
          </span>
          <span style={{ fontFamily: C.poppins, fontSize: 13, fontWeight: 600, color: C.text }}>
            {section.heading || `Section ${index + 1}`}
          </span>
          <span style={{ fontSize: 11, color: C.muted }}>({section.content?.length || 0} blocks)</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            style={{ padding: "3px 10px", background: C.dangerBg, border: "none", borderRadius: 6, cursor: "pointer", color: C.danger, fontSize: 12 }}
          >🗑</button>
          <span style={{ fontSize: 14, color: C.muted }}>{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Section body */}
      {open && (
        <div style={{ padding: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 10, marginBottom: 14 }}>
            <input
              value={section.id}
              onChange={(e) => set("id", e.target.value)}
              placeholder="anchor-id (e.g. background)"
              style={inputStyle}
            />
            <input
              value={section.heading}
              onChange={(e) => set("heading", e.target.value)}
              placeholder="Section Heading"
              style={inputStyle}
            />
          </div>

          {(section.content || []).map((block, bi) => (
            <BlockEditor
              key={bi}
              block={block}
              onChange={(b) => updateBlock(bi, b)}
              onDelete={() => removeBlock(bi)}
              index={bi}
            />
          ))}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
            {BLOCK_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => addBlock(type)}
                style={{ padding: "5px 12px", borderRadius: 7, border: `1px solid ${C.border}`, background: "#fff", cursor: "pointer", fontSize: 12, fontFamily: C.poppins, color: C.accentDark }}
              >
                + {type}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
