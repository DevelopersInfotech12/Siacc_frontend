// CertificationServices.jsx
import React from "react";
// import styles from "./CertificationServices.module.css";

const services = [
  {
    icon: "🏛️",
    title: "BIS Certification",
    desc: "Mandatory certification for electronics, electrical goods & consumer products sold in India under BIS Act.",
    href: "/services/bis",
    tag: "Most Popular",
    accentColor: "#0F6E56",
    iconBg: "#E1F5EE",
  },
  {
    icon: "🧪",
    title: "CDSCO Approval",
    desc: "Medical device & drug registration with the Central Drugs Standard Control Organisation for market entry.",
    href: "/services/cdsco",
    tag: null,
    accentColor: "#F97316",
    iconBg: "#FEF3C7",
  },
  {
    icon: "📡",
    title: "WPC Type Approval",
    desc: "Wireless equipment authorization from Wireless Planning & Coordination Wing for RF devices & IoT products.",
    href: "/services/wpc",
    tag: "New",
    accentColor: "#E24B4A",
    iconBg: "#FEE2E2",
  },
  {
    icon: "⚗️",
    title: "FSSAI Registration",
    desc: "Food safety licenses and registrations for manufacturers, importers, and food business operators.",
    href: "/services/fssai",
    tag: null,
    accentColor: "#7C3AED",
    iconBg: "#EDE9FE",
  },
  {
    icon: "🌿",
    title: "EPR Compliance",
    desc: "Extended Producer Responsibility registration for e-waste, plastics & battery manufacturers.",
    href: "/services/epr",
    tag: null,
    accentColor: "#059669",
    iconBg: "#ECFDF5",
  },
  {
    icon: "🔖",
    title: "Legal Metrology",
    desc: "Mandatory labelling declarations and MRP compliance for packaged commodities sold across India.",
    href: "/services/metrology",
    tag: null,
    accentColor: "#D97706",
    iconBg: "#FFF7ED",
  },
];

export default function CertificationServicesHome({ router }) {
  return (
    <section style={{ background: "#fff", padding: "80px 0 72px" }}>
      <div className="inner">

        {/* ── Header ── */}
        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 52, flexWrap: "wrap", gap: 24,
        }}>
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#0F6E56", marginBottom: 14,
            }}>
              <span style={{ display: "block", width: 18, height: 2, background: "#0F6E56", borderRadius: 2 }}/>
              What We Offer
            </div>
            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1.9rem, 3vw, 2.7rem)",
              color: "#1a2332", fontWeight: 400,
              lineHeight: 1.12, margin: 0, letterSpacing: "-0.02em",
            }}>
              Certification<br />Services
            </h2>
          </div>
          <p style={{
            fontSize: 14, color: "#6b7280", maxWidth: 360,
            lineHeight: 1.8, margin: 0, alignSelf: "flex-end",
          }}>
            End-to-end compliance for manufacturers, importers and brand owners
            across all Indian regulatory frameworks.
          </p>
        </div>

        {/* ── Grid ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "#e5e7eb",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          overflow: "hidden",
        }}>
          {services.map((s) => (
            <a
              key={s.title}
              href={s.href}
              style={{
                background: "#fff",
                padding: "32px 28px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* Top accent bar */}
              <span style={{
                position: "absolute", top: 0, left: 28,
                width: 24, height: 3,
                background: s.accentColor,
                borderRadius: "0 0 3px 3px",
              }}/>

              {/* Icon + Tag row */}
              <div style={{
                display: "flex", alignItems: "flex-start",
                justifyContent: "space-between", marginBottom: 20,
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: s.iconBg,
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 20,
                }}>
                  {s.icon}
                </div>
                {s.tag && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    padding: "3px 9px", borderRadius: 4,
                    background: s.tag === "Most Popular" ? "#FEF3C7" : "#FEE2E2",
                    color: s.tag === "Most Popular" ? "#92400E" : "#991B1B",
                  }}>
                    {s.tag}
                  </span>
                )}
              </div>

              <h3 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 17, color: "#1a2332",
                margin: "0 0 8px", fontWeight: 400, lineHeight: 1.35,
              }}>
                {s.title}
              </h3>

              <p style={{
                fontSize: 13, color: "#6b7280",
                lineHeight: 1.75, margin: "0 0 auto", paddingBottom: 20,
              }}>
                {s.desc}
              </p>

              <span style={{
                fontSize: 12, fontWeight: 600,
                color: "#0F6E56", letterSpacing: "0.02em",
              }}>
                Learn More →
              </span>
            </a>
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "center", marginTop: 44, gap: 16,
        }}>
          <span style={{ fontSize: 13, color: "#6b7280" }}>
            <strong style={{ color: "#1a2332" }}>50+</strong> Services
          </span>
          <span style={{ width: 1, height: 20, background: "#e5e7eb" }}/>
          <span style={{ fontSize: 13, color: "#6b7280" }}>
            <strong style={{ color: "#1a2332" }}>12+</strong> Regulatory Bodies
          </span>
          <span style={{ width: 1, height: 20, background: "#e5e7eb" }}/>
          <button
            onClick={() => router.push("/services")}
            style={{
              background: "#F97316", color: "#fff",
              border: "none", borderRadius: 8,
              padding: "13px 32px", fontSize: 14,
              fontWeight: 600, cursor: "pointer",
              letterSpacing: "0.01em",
            }}
          >
            View All Services →
          </button>
        </div>

      </div>
    </section>
  );
}