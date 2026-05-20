"use client";
import { useEffect, useCallback, useState, useRef } from "react";

const T = {
    teal: "#1E88C8", tealMid: "#0E8080", titleblue: "#0a6daa",
    para: "#080000b0", paradark: "#080000c4",
    tealLight: "#EBF5F5", amber: "#C8780A", amberLight: "#FEF3DC", amberDark: "#9A5C06",
    slate: "#0D1B2A", muted: "#718096",
    border: "#E8E3DA", white: "#FFFFFF", cream: "#FAF8F4",
    orange: "#F97316",
    poppins: "'Poppins','system-ui',sans-serif",
    sans: "'Outfit','system-ui',sans-serif",
};

const CATEGORY_COLORS = {
    "Audio & Video": { bg: "#EBF5F5", text: "#0E8080", dot: "#1E88C8" },
    "IT & Computing": { bg: "#EBF0FB", text: "#0a4daa", dot: "#1E45C8" },
    "Power & Energy": { bg: "#FEF3DC", text: "#9A5C06", dot: "#C8780A" },
    "LED & Lighting": { bg: "#FEFCE8", text: "#854D0E", dot: "#CA8A04" },
    "Home Appliances": { bg: "#FCE7F3", text: "#9D174D", dot: "#DB2777" },
    "Scanning & ID": { bg: "#F0FDF4", text: "#166534", dot: "#16A34A" },
    "Solar & Renewable": { bg: "#FFF7ED", text: "#9A3412", dot: "#EA580C" },
    "Commercial & Office": { bg: "#F5F3FF", text: "#5B21B6", dot: "#7C3AED" },
    "Storage": { bg: "#F0F9FF", text: "#0C4A6E", dot: "#0284C7" },
    "Switchgear": { bg: "#FFF1F2", text: "#9F1239", dot: "#E11D48" },
};

const TABS = [
    { id: "overview", label: "Overview", icon: "📖" },
    { id: "types", label: "Types", icon: "🗂️" },
    { id: "procedure", label: "Procedure", icon: "🔄" },
    { id: "air", label: "AIR Guide", icon: "🌏" },
    { id: "documents", label: "Documents", icon: "📄" },
    { id: "checklist", label: "Checklist", icon: "✅" },
    { id: "support", label: "Our Support", icon: "🤝" },
    { id: "domains", label: "Domains", icon: "🏢" },
];

const css = `
  @keyframes m-fade  { from{opacity:0} to{opacity:1} }
  @keyframes m-slide { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  .m-overlay {
    position:fixed;inset:0;z-index:9000;
    background:rgba(13,27,42,0.70);backdrop-filter:blur(5px);
    display:flex;align-items:center;justify-content:center;padding:16px;
    animation:m-fade 0.2s ease forwards;
  }
  .m-box {
    background:#fff;border-radius:16px;width:100%;max-width:860px;
    max-height:92vh;display:flex;flex-direction:column;
    box-shadow:0 28px 72px rgba(0,0,0,0.22);
    animation:m-slide 0.25s ease forwards;overflow:hidden;
    font-family:'Outfit','system-ui',sans-serif;color:#0D1B2A;
  }
  .m-header {padding:20px 24px 0;background:#fff;flex-shrink:0;border-bottom:1px solid #E8E3DA;}
  .m-header-top {display:flex;align-items:flex-start;gap:14px;margin-bottom:16px;}
  .m-close {
    width:34px;height:34px;border-radius:50%;background:#F0ECE5;border:none;cursor:pointer;
    display:flex;align-items:center;justify-content:center;font-size:16px;color:#718096;
    transition:background 0.18s,color 0.18s;margin-left:auto;flex-shrink:0;
  }
  .m-close:hover{background:#1E88C8;color:#fff;}
  .m-info-strip {
    display:flex;gap:0;border:1px solid #E8E3DA;border-radius:8px;
    overflow:hidden;margin-bottom:16px;flex-wrap:wrap;
  }
  .m-info-item {flex:1;min-width:110px;padding:8px 14px;border-right:1px solid #E8E3DA;background:#FAF8F4;}
  .m-info-item:last-child{border-right:none;}
  .m-info-label{font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#718096;margin-bottom:2px;}
  .m-info-val{font-family:'Poppins','system-ui',sans-serif;font-size:12.5px;font-weight:700;color:#0a6daa;}
  .m-tabs {display:flex;gap:0;overflow-x:auto;scrollbar-width:none;}
  .m-tabs::-webkit-scrollbar{display:none;}
  .m-tab {
    display:flex;align-items:center;gap:6px;padding:10px 16px;border:none;
    background:transparent;cursor:pointer;font-family:'Poppins','system-ui',sans-serif;
    font-size:12px;font-weight:600;color:#718096;white-space:nowrap;
    border-bottom:2px solid transparent;transition:color 0.18s,border-color 0.18s;flex-shrink:0;
  }
  .m-tab:hover{color:#0a6daa;}
  .m-tab.active{color:#1E88C8;border-bottom-color:#1E88C8;background:rgba(30,136,200,0.04);}
  .m-body {flex:1;overflow-y:auto;padding:24px;background:#FAFBFC;}
  .m-body::-webkit-scrollbar{width:5px;}
  .m-body::-webkit-scrollbar-thumb{background:#C8DFF0;border-radius:4px;}
  .m-body::-webkit-scrollbar-thumb:hover{background:#1E88C8;}
  .m-footer {
    padding:14px 24px;background:linear-gradient(135deg,#0a6daa 0%,#1E88C8 100%);
    display:flex;align-items:center;gap:16px;flex-wrap:wrap;flex-shrink:0;
  }
  .m-section-title {
    font-family:'Poppins','system-ui',sans-serif;font-size:11px;font-weight:700;
    color:#1E88C8;text-transform:uppercase;letter-spacing:0.1em;
    display:flex;align-items:center;gap:7px;margin-bottom:14px;
    padding-bottom:8px;border-bottom:1px solid #E8E3DA;
  }
  .m-card {background:#fff;border:1px solid #E8E3DA;border-radius:10px;padding:18px;margin-bottom:14px;}
  .m-pillars {display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px;}
  @media(max-width:500px){.m-pillars{grid-template-columns:1fr;}}
  .m-pillar {background:#FAF8F4;border:1px solid #E8E3DA;border-radius:8px;padding:12px 14px;display:flex;gap:10px;align-items:flex-start;}
  .m-pillar-icon {width:32px;height:32px;border-radius:8px;background:#EBF5F5;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
  .m-proc-tabs {display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;}
  .m-proc-tab {
    padding:7px 18px;border-radius:6px;font-family:'Poppins','system-ui',sans-serif;
    font-size:12px;font-weight:600;cursor:pointer;border:1.5px solid #E8E3DA;
    background:#fff;color:#718096;transition:all 0.18s;
  }
  .m-proc-tab.active{background:#1E88C8;color:#fff;border-color:#1E88C8;}
  .m-proc-tab:not(.active):hover{border-color:#1E88C8;color:#1E88C8;}
  .m-step {display:flex;gap:12px;align-items:flex-start;margin-bottom:12px;}
  .m-step-num {
    width:28px;height:28px;border-radius:50%;background:#1E88C8;color:#fff;flex-shrink:0;
    font-family:'Poppins','system-ui',sans-serif;font-size:11px;font-weight:700;
    display:flex;align-items:center;justify-content:center;margin-top:1px;
  }
  .m-step-text{font-size:13.5px;color:#080000c4;line-height:1.65;padding-top:4px;}
  .m-clause {display:flex;gap:12px;padding:12px 0;border-bottom:1px solid #F0ECE5;}
  .m-clause:last-child{border-bottom:none;}
  .m-clause-num {
    width:28px;height:28px;border-radius:6px;background:#FEF3DC;color:#C8780A;flex-shrink:0;
    font-family:'Poppins','system-ui',sans-serif;font-size:11px;font-weight:700;
    display:flex;align-items:center;justify-content:center;
  }
  .m-doc-item {
    display:flex;gap:10px;align-items:flex-start;padding:9px 12px;
    background:#FAF8F4;border:1px solid #E8E3DA;border-radius:7px;margin-bottom:7px;
  }
  .m-doc-num {
    width:22px;height:22px;border-radius:50%;background:#EBF5F5;color:#1E88C8;flex-shrink:0;
    font-family:'Poppins','system-ui',sans-serif;font-size:10px;font-weight:700;
    display:flex;align-items:center;justify-content:center;
  }
  .m-table{width:100%;border-collapse:collapse;}
  .m-table th{
    font-family:'Poppins','system-ui',sans-serif;font-size:10.5px;font-weight:700;
    text-transform:uppercase;letter-spacing:0.07em;color:#1E88C8;
    padding:9px 14px;border-bottom:2px solid #E8E3DA;text-align:left;background:#FAF8F4;
  }
  .m-table td{font-size:13px;color:#080000c4;padding:11px 14px;border-bottom:1px solid #F0ECE5;vertical-align:top;line-height:1.65;}
  .m-table tr:last-child td{border-bottom:none;}
  .m-table tr:hover td{background:rgba(30,136,200,0.02);}
  .m-table td:first-child{font-family:'Poppins','system-ui',sans-serif;font-size:11px;font-weight:700;color:#1E88C8;white-space:nowrap;width:56px;}
  .m-support-item {
    display:flex;gap:12px;align-items:flex-start;padding:10px 14px;
    background:#fff;border:1px solid #E8E3DA;border-radius:8px;margin-bottom:8px;
  }
  .m-support-num {
    width:26px;height:26px;border-radius:50%;background:#0a6daa;color:#fff;flex-shrink:0;
    font-family:'Poppins','system-ui',sans-serif;font-size:11px;font-weight:700;
    display:flex;align-items:center;justify-content:center;
  }
  .m-why-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;}
  @media(max-width:480px){.m-why-grid{grid-template-columns:1fr;}}
  .m-why-item{display:flex;gap:8px;align-items:center;background:#EBF5F5;border-radius:7px;padding:9px 12px;font-size:12.5px;color:#0E8080;font-weight:600;}
  .m-domain-row{display:flex;gap:12px;padding:10px 14px;border-bottom:1px solid #F0ECE5;align-items:flex-start;}
  .m-domain-row:last-child{border-bottom:none;}
  .m-domain-num{font-family:'Poppins','system-ui',sans-serif;font-size:11px;font-weight:700;color:#7C3AED;min-width:28px;margin-top:2px;}
  @media(max-width:600px){
    .m-header{padding:14px 16px 0;}.m-body{padding:16px;}.m-footer{padding:12px 16px;}
    .m-tab{padding:9px 12px;font-size:11px;}.m-info-item{min-width:90px;}
  }
`;

/* ── Tabs ── */
function TabOverview({ product, catColor }) {
    return (
        <div>
            <div className="m-section-title"><span>📖</span> Introduction</div>
            <div className="m-card">
                <p style={{ fontSize: 14, color: T.paradark, lineHeight: 1.85, margin: 0, textAlign: "justify" }}>{product.intro}</p>
                {product.overview && <p style={{ fontSize: 14, color: T.paradark, lineHeight: 1.85, margin: "12px 0 0", textAlign: "justify" }}>{product.overview}</p>}
            </div>
            <div className="m-section-title" style={{ marginTop: 20 }}><span>🏛️</span> 4 Pillars of BIS Registration</div>
            <div className="m-card" style={{ background: "linear-gradient(135deg,#EBF5F5 0%,#EBF0FB 100%)" }}>
                <p style={{ fontSize: 13, color: T.para, marginBottom: 12 }}>Without these 4 pillars, no applicant can apply for BIS CRS Registration:</p>
                <div className="m-pillars">
                    {[
                        { icon: "🏭", title: "Manufacturer", desc: "Licence is granted to the manufacturer only — not to importers or sellers. Importer may act as AIR but the licence is issued to the manufacturer." },
                        { icon: "📍", title: "Manufacturing Address", desc: "Each factory location requires a separate BIS licence, even for the same product and brand." },
                        { icon: "📦", title: "Product", desc: "Each product needs its own licence. Multiple models of the same product can share one licence / R-number." },
                        { icon: "™️", title: "Brand / Trademark", desc: "Each brand or trademark requires its own separate BIS licence — even if the product is identical." },
                    ].map(p => (
                        <div key={p.title} className="m-pillar">
                            <div className="m-pillar-icon">{p.icon}</div>
                            <div>
                                <div style={{ fontFamily: T.poppins, fontSize: 13, fontWeight: 700, color: T.titleblue, marginBottom: 4 }}>{p.title}</div>
                                <div style={{ fontSize: 12.5, color: T.paradark, lineHeight: 1.6 }}>{p.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="m-section-title" style={{ marginTop: 20 }}><span>📋</span> Scheme Details</div>
            <div className="m-card">
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                    {[
                        { label: "Indian Standard", value: product.standard },
                        { label: "Validity", value: product.validity },
                        { label: "Timeline", value: product.timeline },
                        { label: "Scheme", value: "Scheme II, Schedule II" },
                        { label: "Governing Body", value: "Bureau of Indian Standards" },
                        { label: "Regulation", value: "BIS (Conformity Assessment) Regulations, 2018" },
                    ].map(item => (
                        <div key={item.label} style={{ minWidth: 160, flex: 1 }}>
                            <div style={{ fontSize: 10.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: T.muted, marginBottom: 3 }}>{item.label}</div>
                            <div style={{ fontFamily: T.poppins, fontSize: 13, fontWeight: 700, color: T.titleblue }}>{item.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TabTypes({ product }) {
    const [search, setSearch] = useState("");
    const allTypes = product.types || [];
    const filtered = allTypes.filter(t => t.toLowerCase().includes(search.toLowerCase()));
    return (
        <div>
            <div style={{ background: "linear-gradient(135deg,#1E3A5F 0%,#0a6daa 60%,#1E88C8 100%)", borderRadius: 12, padding: "18px 20px", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                    <div style={{ fontFamily: T.poppins, fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>BIS CRS — ADPM</div>
                    <div style={{ fontFamily: T.poppins, fontSize: 15, fontWeight: 700, color: "#fff" }}>Approved Product Types</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.72)", marginTop: 3 }}>IS 13252 (Part 1):2010 — Scheme II, Schedule II</div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 16px", textAlign: "center", minWidth: 60 }}>
                        <div style={{ fontFamily: T.poppins, fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{allTypes.length}</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 600, marginTop: 2 }}>Total Types</div>
                    </div>
                    {search && <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 16px", textAlign: "center", minWidth: 60 }}>
                        <div style={{ fontFamily: T.poppins, fontSize: 22, fontWeight: 800, color: filtered.length > 0 ? "#7EFFA0" : "#FFB3B3", lineHeight: 1 }}>{filtered.length}</div>
                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 600, marginTop: 2 }}>Matches</div>
                    </div>}
                </div>
            </div>
            <div style={{ position: "relative", marginBottom: 14 }}>
                <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "#1E88C8" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input type="text" placeholder="Search product type..." value={search} onChange={e => setSearch(e.target.value)}
                    style={{ width: "100%", boxSizing: "border-box", padding: "10px 36px", border: "1.5px solid #C8DFF0", borderRadius: 10, fontSize: 13, fontFamily: T.sans, color: T.slate, outline: "none", background: "#fff" }}
                    onFocus={e => e.target.style.borderColor="#1E88C8"} onBlur={e => e.target.style.borderColor="#C8DFF0"} />
                {search && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "#EBF0FB", border: "none", cursor: "pointer", fontSize: 11, color: "#0a4daa", width: 20, height: 20, borderRadius: "50%", fontWeight: 700 }}>✕</button>}
            </div>
            {search && filtered.length === 0 && <div style={{ textAlign: "center", padding: "32px 16px", color: T.muted, fontSize: 13 }}><div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>No types found for "<strong>{search}</strong>"</div>}
            {filtered.length > 0 && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 8, maxHeight: 400, overflowY: "auto", paddingBottom: 4 }}>
                {filtered.map((type, i) => {
                    const hl = search && type.toLowerCase().includes(search.toLowerCase());
                    return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: hl ? "linear-gradient(135deg,#EBF0FB,#F5F3FF)" : "#FAFBFC", border: `1.5px solid ${hl ? "#A5B4FC" : "#E8E3DA"}`, borderRadius: 9, padding: "9px 13px" }}>
                            <div style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, background: hl ? "#7C3AED" : "#1E88C8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, fontFamily: T.poppins }}>{String(i+1).padStart(2,"0")}</span>
                            </div>
                            <span style={{ fontFamily: T.sans, fontSize: 12.5, color: T.paradark, lineHeight: 1.45, fontWeight: hl ? 600 : 400 }}>{type}</span>
                        </div>
                    );
                })}
            </div>}
            <div style={{ marginTop: 14, padding: "10px 14px", background: "#FEF3DC", border: "1px solid #F6D992", borderRadius: 8, display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ fontSize: 15, flexShrink: 0 }}>💡</span>
                <p style={{ margin: 0, fontSize: 12, color: "#7A5C10", lineHeight: 1.6 }}>Each type requires a <strong>separate BIS CRS licence</strong> per manufacturer, per factory, and per brand. Multiple models of the same type can share one R-number.</p>
            </div>
        </div>
    );
}

function TabProcedure({ product }) {
    const [tab, setTab] = useState("foreign");
    const steps = tab === "foreign" ? product.docsForeign : product.docsDomestic;
    return (
        <div>
            <div className="m-section-title"><span>🔄</span> Registration Procedure</div>
            <div className="m-card">
                <p style={{ fontSize: 13.5, color: T.paradark, lineHeight: 1.7, marginBottom: 16 }}>
                    The BIS CRS procedure varies based on whether the manufacturer is domestic or foreign. Select your applicable process:
                </p>
                <div className="m-proc-tabs">
                    <button className={`m-proc-tab${tab === "foreign" ? " active" : ""}`} onClick={() => setTab("foreign")}>🌏 Foreign Manufacturer</button>
                    <button className={`m-proc-tab${tab === "domestic" ? " active" : ""}`} onClick={() => setTab("domestic")}>🇮🇳 Domestic Manufacturer</button>
                </div>
                {steps.map((step, i) => (
                    <div key={i} className="m-step">
                        <div className="m-step-num">{String(i + 1).padStart(2, "0")}</div>
                        <div className="m-step-text">{step}</div>
                    </div>
                ))}
                {tab === "foreign" && (
                    <div style={{ marginTop: 16, background: T.amberLight, border: "1px solid rgba(200,120,10,0.22)", borderRadius: 8, padding: "13px 16px" }}>
                        <div style={{ fontFamily: T.poppins, fontSize: 12, fontWeight: 700, color: T.amber, marginBottom: 5 }}>⚠️ Foreign Manufacturer Note</div>
                        <p style={{ fontSize: 13, color: "#7A4804", lineHeight: 1.65, margin: 0 }}>
                            Foreign manufacturers must nominate an Authorized Indian Representative (AIR) before applying. See the <strong>AIR Guide</strong> tab for detailed guidelines.
                        </p>
                    </div>
                )}
            </div>
            <div className="m-section-title" style={{ marginTop: 20 }}><span>⚙️</span> How BIS Processes Applications</div>
            <div className="m-card">
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                        { icon: "📥", title: "Application Receipt", desc: "BIS receives the online application along with the test report from a BIS-recognized laboratory." },
                        { icon: "🔎", title: "Scrutiny", desc: "BIS officials review the test report and all supporting documents for completeness and accuracy." },
                        { icon: "📋", title: "Query Resolution", desc: "Any discrepancies result in a query raised to the applicant. Prompt and accurate responses are critical to maintaining the timeline." },
                        { icon: "🎓", title: "Grant of Licence", desc: "Upon successful verification, BIS issues the CRS Registration Certificate with a unique R-number — within 20 working days if all documents are in order." },
                    ].map(item => (
                        <div key={item.title} style={{ display: "flex", gap: 12, background: "#FAF8F4", borderRadius: 8, padding: "10px 14px", alignItems: "flex-start" }}>
                            <span style={{ fontSize: 20, flexShrink: 0 }}>{item.icon}</span>
                            <div>
                                <div style={{ fontFamily: T.poppins, fontSize: 13, fontWeight: 700, color: T.titleblue, marginBottom: 3 }}>{item.title}</div>
                                <div style={{ fontSize: 13, color: T.paradark, lineHeight: 1.6 }}>{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TabAIR() {
    return (
        <div>
            <div className="m-section-title"><span>🌏</span> Authorized Indian Representative (AIR) Guidelines</div>
            <div className="m-card">
                <p style={{ fontSize: 13.5, color: T.paradark, lineHeight: 1.75, marginBottom: 16 }}>
                    It is mandatory for foreign applicants to nominate an AIR to obtain BIS CRS certification. The AIR is responsible for submitting and managing the application and handling all BIS queries on behalf of the foreign manufacturer.
                </p>
                <div style={{ fontFamily: T.poppins, fontSize: 12, fontWeight: 700, color: T.titleblue, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.07em" }}>How to determine your AIR:</div>
                {[
                    { clause: "Clause 1", title: "Liaison / Branch Office in India", desc: "If the foreign manufacturer has a liaison office or branch office in India, that entity will be designated as the AIR." },
                    { clause: "Clause 2", title: "Brand / Trademark Owner in India", desc: "If no liaison/branch office exists in India, but the proprietor or registered user of the brand/trademark is located in India — that entity becomes the AIR." },
                    { clause: "Clause 3", title: "Any Other Indian Entity", desc: "If the manufacturer has no liaison office and no brand/trademark owner in India — any other entity in India can be nominated as the AIR." },
                ].map((item, i) => (
                    <div key={i} className="m-clause">
                        <div className="m-clause-num">{i + 1}</div>
                        <div>
                            <div style={{ fontFamily: T.poppins, fontSize: 12.5, fontWeight: 700, color: T.amber, marginBottom: 4 }}>{item.clause}: {item.title}</div>
                            <div style={{ fontSize: 13, color: T.paradark, lineHeight: 1.7 }}>{item.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="m-section-title" style={{ marginTop: 20 }}><span>📋</span> AIR Responsibilities</div>
            <div className="m-card">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {[
                        "Submit CRS application on behalf of foreign manufacturer",
                        "Receive and respond to BIS queries promptly",
                        "Coordinate sample testing at BIS-recognized lab",
                        "Sign and notarize required documents",
                        "Maintain the BIS licence during its validity",
                        "Represent the manufacturer during BIS surveillance",
                        "Ensure timely renewal of CRS registration",
                        "Act as BIS point of contact for all correspondence",
                    ].map((r, i) => (
                        <div key={i} style={{ display: "flex", gap: 8, background: "#FAF8F4", borderRadius: 7, padding: "9px 12px", alignItems: "flex-start" }}>
                            <span style={{ color: T.teal, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                            <span style={{ fontSize: 12.5, color: T.paradark, lineHeight: 1.55 }}>{r}</span>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 14, background: T.tealLight, borderRadius: 8, padding: "12px 16px", display: "flex", gap: 10 }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
                    <p style={{ fontSize: 13, color: T.tealMid, margin: 0, lineHeight: 1.65 }}>
                        <strong>We can act as your AIR.</strong> Our team is experienced in representing foreign manufacturers through the entire BIS CRS process — from application filing to licence maintenance and renewal.
                    </p>
                </div>
            </div>
        </div>
    );
}

function TabDocuments({ product }) {
    return (
        <div>
            <div className="m-section-title"><span>📄</span> Documents Required for BIS CRS Registration</div>
            <div className="m-card">
                <p style={{ fontSize: 13, color: T.paradark, lineHeight: 1.7, marginBottom: 16 }}>
                    The following documents are required for BIS CRS registration of <strong>{product.title}</strong> under <strong>{product.standard}</strong>:
                </p>
                {product.documents.map((doc, i) => (
                    <div key={i} className="m-doc-item">
                        <div className="m-doc-num">{i + 1}</div>
                        <span style={{ fontSize: 13.5, color: T.paradark, lineHeight: 1.6 }}>{doc}</span>
                    </div>
                ))}
                <div style={{ marginTop: 14, background: "#EBF0FB", borderRadius: 8, padding: "12px 16px", display: "flex", gap: 10 }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
                    <div style={{ fontSize: 12.5, color: "#0a4daa", lineHeight: 1.65 }}>
                        <strong>Important:</strong> All documents must be signed by the manufacturer, brand owner, and Indian Representative — and must be notarized and stamped before submission to BIS.
                    </div>
                </div>
            </div>
            <div className="m-section-title" style={{ marginTop: 20 }}><span>🧪</span> About Test Reports</div>
            <div className="m-card">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[
                        { icon: "⏱️", title: "90-Day Validity", desc: "Test reports are valid for 90 days from issue date. Submit to BIS before expiry — otherwise fresh samples must be sent." },
                        { icon: "🔬", title: "BIS-Recognized Lab Only", desc: "Testing must be at a BIS-recognized laboratory whose licence is valid and not suspended or under audit." },
                        { icon: "📦", title: "Sample Shipment", desc: "Ensure complete shipping arrangements before dispatching samples to the testing laboratory." },
                        { icon: "📝", title: "CDF / CCL Forms", desc: "Fill the Construction Data Form (CDF) and Critical Component List (CCL) accurately — these are the most common sources of rejection." },
                    ].map(item => (
                        <div key={item.title} style={{ background: "#FAF8F4", borderRadius: 8, padding: "12px 14px" }}>
                            <div style={{ fontSize: 18, marginBottom: 6 }}>{item.icon}</div>
                            <div style={{ fontFamily: T.poppins, fontSize: 12.5, fontWeight: 700, color: T.titleblue, marginBottom: 4 }}>{item.title}</div>
                            <div style={{ fontSize: 12.5, color: T.paradark, lineHeight: 1.6 }}>{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TabChecklist() {
    return (
        <div>
            <div className="m-section-title"><span>✅</span> Key Points & Checklist to Obtain BIS Certificate</div>
            <div className="m-card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="m-table">
                    <thead><tr><th style={{ width: 50 }}>#</th><th>Point to Consider</th></tr></thead>
                    <tbody>
                        {[
                            "Select a BIS-recognized testing organization and an experienced compliance consultant with expertise and/or office in India.",
                            "When choosing a lab, verify its licence is valid, not suspended, and not currently under audit or about to be audited.",
                            "Before shipment of samples, ensure complete shipping arrangements are made from your location to the testing laboratory.",
                            "All documents must be signed by the manufacturer, brand owner, and Indian Representative — and notarized and stamped accordingly.",
                            "In the Construction Data Form (CDF), fill product details accurately. In the Critical Component List (CCL), fill component info briefly and accurately.",
                            "Test report is valid for 90 days. Submit to BIS before expiry. If expired, resubmit the sample for fresh testing.",
                            "All documents must be ready before testing of samples begins — to avoid delays after receiving the test report.",
                            "After submission, BIS normally takes 15–20 working days to approve. In some cases, it may take 30–60 days — plan your product launch timeline accordingly.",
                        ].map((pt, i) => (
                            <tr key={i}>
                                <td>{String(i + 1).padStart(2, "0")}</td>
                                <td>{pt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ marginTop: 14, background: "linear-gradient(135deg,#1E88C8 0%,#0E8080 100%)", borderRadius: 10, padding: "16px 20px" }}>
                <div style={{ fontFamily: T.poppins, fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 10 }}>📌 Timeline at a Glance</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    {[
                        { val: "90 Days", label: "Test report validity" },
                        { val: "15–20", label: "Working days for BIS approval" },
                        { val: "2 Years", label: "Certificate validity" },
                    ].map(item => (
                        <div key={item.label} style={{ textAlign: "center", background: "rgba(255,255,255,0.12)", borderRadius: 7, padding: "10px 8px" }}>
                            <div style={{ fontFamily: T.poppins, fontSize: 18, fontWeight: 800, color: "#fff" }}>{item.val}</div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.80)", marginTop: 2 }}>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TabSupport() {
    return (
        <div>
            <div className="m-section-title"><span>🤝</span> Our Support for BIS CRS Registration</div>
            <div className="m-card">
                <p style={{ fontSize: 13.5, color: T.paradark, lineHeight: 1.75, marginBottom: 16 }}>
                    From legal compliance to product testing, from training to complete conformity assessment — we are a single-window solution for all certification needs. Here's exactly what we handle:
                </p>
                {[
                    "Complete paperwork, testing coordination, and step-by-step guidance for the entire BIS CRS registration process.",
                    "Development of product samples as per applicable Indian Standards for 100% conformity in the BIS-recognized testing laboratory.",
                    "Full liaison with BIS Bureau — detailed application preparation, submission, and responding to queries and clarifications at every stage.",
                    "Multiple visits to BIS office, agreement document signing, affidavit preparation, and all incidental work throughout the online and offline process.",
                    "Free maintenance of BIS licence for up to 2 years after certificate issuance — including tracking, renewal reminders, and compliance support.",
                ].map((s, i) => (
                    <div key={i} className="m-support-item">
                        <div className="m-support-num">{i + 1}</div>
                        <span style={{ fontSize: 13.5, color: T.paradark, lineHeight: 1.65 }}>{s}</span>
                    </div>
                ))}
            </div>
            <div className="m-section-title" style={{ marginTop: 20 }}><span>⭐</span> Why Choose Us</div>
            <div className="m-card">
                <div className="m-why-grid">
                    {[
                        "Direct consultations with Ex-BIS Officials",
                        "Direct liaison with concerned ministries",
                        "Personal project manager for every client",
                        "Single window for all regulatory compliance",
                        "Real-time updates via Encrypted CRM System",
                        "0% application failure rate",
                    ].map((w, i) => (
                        <div key={i} className="m-why-item"><span style={{ color: T.teal, fontWeight: 800 }}>✓</span>{w}</div>
                    ))}
                </div>
            </div>
            <div className="m-section-title" style={{ marginTop: 20 }}><span>💬</span> What Our Clients Say</div>
            {[
                { name: "Suresh Raja", company: "Schneider Electric Pvt. Ltd.", text: "Aleph India was impressively helpful when we were looking for BIS certification. We could completely trust them in terms of service and sincerity — one of the best BIS Consultants in India." },
                { name: "Balaji Balu Sundari", company: "Vyvo INDIA", text: "Aleph India developed a good understanding of our vision and found a way to complement our operations without any discontinuities or issues." },
                { name: "S. K. Gupta", company: "Industry Partner", text: "A great BIS consultant with a dedicated team — 100% quality results in a very quick and proper time. Consultation is cost-effective and thoroughly satisfied." },
            ].map((t, i) => (
                <div key={i} style={{ background: "#FAF8F4", border: `1px solid ${T.border}`, borderRadius: 9, padding: "14px 16px", marginBottom: 10 }}>
                    <p style={{ fontSize: 13, color: T.paradark, lineHeight: 1.7, margin: "0 0 8px", fontStyle: "italic" }}>"{t.text}"</p>
                    <div style={{ fontFamily: T.poppins, fontSize: 12, fontWeight: 700, color: T.titleblue }}>{t.name}</div>
                    <div style={{ fontSize: 11.5, color: T.muted }}>{t.company}</div>
                </div>
            ))}
        </div>
    );
}

function TabDomains() {
    return (
        <div>
            <div className="m-section-title"><span>🏢</span> Regulatory Compliance Domains We Cover</div>
            <div className="m-card" style={{ padding: 0, overflow: "hidden" }}>
                {[
                    "Complete in-house infrastructure for various certifications at single click.",
                    "Products evolution & advisory on registration under BIS Registration (CRS) Scheme & BIS Certification.",
                    "Assistance in standard formulation & scheme of testing methods.",
                    "Analysis reports for any changes in standards and regulations for compliance by company.",
                    "Advisory on representation to Ministries for NOC / Exclusion of products.",
                    "Advisory on new products to be included in BIS CRS & BIS Certification, BIS regulations, QCO and its interpretation based on draft orders from respective ministries.",
                    "Portrayal to all government departments for any clarification / query of company.",
                    "Representation on behalf of company to various government organizations as a legal compliance partner.",
                    "Strategic assistance to ensure business continuity and development.",
                    "Drafting of mails to BIS department for obtaining clarity on BIS regulations / QCO.",
                    "Arrange meetings with BIS Bureau and ministries to get clarity on inclusion / exclusion of product or any other clarifications.",
                    "Update on upcoming regulations and their compliances.",
                ].map((d, i) => (
                    <div key={i} className="m-domain-row">
                        <div className="m-domain-num">{String(i + 1).padStart(2, "0")}</div>
                        <div style={{ fontSize: 13.5, color: T.paradark, lineHeight: 1.65 }}>{d}</div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: 14, background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: 10, padding: "16px 20px", display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>🏛️</div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: T.poppins, fontSize: 13.5, fontWeight: 700, color: "#5B21B6", marginBottom: 4 }}>Full-Spectrum Compliance Partner</div>
                    <p style={{ fontSize: 13, color: "#6D28D9", lineHeight: 1.65, margin: 0 }}>
                        Beyond BIS CRS, we assist with WPC, BEE, TEC, EPR, LMPC, CDSCO, ISO, CE, UL, and all other regulatory compliance requirements for Indian and global markets.
                    </p>
                </div>
            </div>
        </div>
    );
}

/* ── Main Modal ── */
export default function BISCRSProductModal({ product, onClose }) {
    const [activeTab, setActiveTab] = useState("overview");
    const bodyRef = useRef(null);

    const handleKey = useCallback(e => { if (e.key === "Escape") onClose(); }, [onClose]);
    useEffect(() => {
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
    }, [handleKey]);

    useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = 0; }, [activeTab]);

    if (!product) return null;
    const catColor = CATEGORY_COLORS[product.category] || CATEGORY_COLORS["IT & Computing"];

    return (
        <>
            <style>{css}</style>
            <div className="m-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
                <div className="m-box" role="dialog" aria-modal="true">

                    {/* Fixed Header */}
                    <div className="m-header">
                        <div className="m-header-top">
                            <div style={{ width: 52, height: 52, borderRadius: 12, background: catColor.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                                {product.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: "flex", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
                                    <span style={{ fontFamily: T.poppins, fontSize: 9.5, fontWeight: 700, background: T.tealLight, color: T.tealMid, padding: "2px 9px", borderRadius: 3, letterSpacing: "0.05em" }}>CRS MANDATORY</span>
                                    <span style={{ fontFamily: T.poppins, fontSize: 9.5, fontWeight: 700, background: catColor.bg, color: catColor.text, padding: "2px 9px", borderRadius: 3 }}>{product.category}</span>
                                </div>
                                <h2 style={{ fontFamily: T.poppins, fontSize: "clamp(0.95rem,2vw,1.25rem)", color: T.titleblue, fontWeight: 700, lineHeight: 1.25, margin: "0 0 3px" }}>
                                    BIS CRS Registration — {product.title}
                                </h2>
                                <div style={{ fontFamily: T.sans, fontSize: 12, color: T.muted }}>{product.standard}</div>
                            </div>
                            <button className="m-close" onClick={onClose} aria-label="Close">✕</button>
                        </div>

                        {/* Quick info */}
                        <div className="m-info-strip">
                            {[
                                { label: "Validity", value: product.validity },
                                { label: "Timeline", value: product.timeline },
                                { label: "Scheme", value: "Scheme II, Sch. II" },
                                { label: "Body", value: "Bureau of Indian Standards" },
                            ].map(item => (
                                <div key={item.label} className="m-info-item">
                                    <div className="m-info-label">{item.label}</div>
                                    <div className="m-info-val">{item.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Tabs */}
                        <div className="m-tabs">
                            {TABS.filter(tab => tab.id !== "types" || product.types?.length).map(tab => (
                                <button key={tab.id} className={`m-tab${activeTab === tab.id ? " active" : ""}`} onClick={() => setActiveTab(tab.id)}>
                                    <span>{tab.icon}</span>{tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Scrollable Body */}
                    <div className="m-body" ref={bodyRef}>
                        {activeTab === "overview" && <TabOverview product={product} catColor={catColor} />}
                        {activeTab === "types" && <TabTypes product={product} />}
                        {activeTab === "procedure" && <TabProcedure product={product} />}
                        {activeTab === "air" && <TabAIR />}
                        {activeTab === "documents" && <TabDocuments product={product} />}
                        {activeTab === "checklist" && <TabChecklist />}
                        {activeTab === "support" && <TabSupport />}
                        {activeTab === "domains" && <TabDomains />}
                    </div>
                </div>
            </div>
        </>
    );
}