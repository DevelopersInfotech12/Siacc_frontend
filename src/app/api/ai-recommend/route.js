// src/app/api/ai-recommend/route.js
// Place this file at: src/app/api/ai-recommend/route.js
//
// Add your FREE Gemini key to .env.local:
//   GEMINI_API_KEY=your_key_here
// Get a free key at: https://aistudio.google.com/app/apikey

import { NextResponse } from "next/server";

// ─── Rule-based fallback engine ───────────────────────────────────────────────
function computeFallback(answers) {
  const mandatory   = [];
  const recommended = [];
  const weeks       = [];

  const pt  = (answers.product_type  || "").toLowerCase();
  const act = (answers.activity      || "").toLowerCase();
  const wl  = (answers.wireless      || "").toLowerCase();
  const pkg = (answers.packaging     || "").toLowerCase();
  const sc  = (answers.sell_channel  || "").toLowerCase();

  if (pt.match(/electronic|it product|appliance|led|iot|smart|telecom|networking/)) {
    mandatory.push({ name:"BIS CRS / ISI Mark", icon:"🔖", timeline:"4–8 weeks", href:"/bis",
      reason:"Mandatory for electronic & IT products under India's BIS Compulsory Registration Scheme." });
    weeks.push(8);
  }
  if (wl.match(/wi-fi|bluetooth|rf|zigbee|multiple/) || pt.match(/wireless|bluetooth|earbuds|headphone|router|iot|smart/)) {
    mandatory.push({ name:"WPC-ETA Approval", icon:"📡", timeline:"4–8 weeks", href:"/wpc",
      reason:"Required before importing or selling any wireless device (Wi-Fi, Bluetooth, RF, IoT) in India." });
    weeks.push(8);
  }
  if (pt.match(/telecom|router|modem|mobile|handset|switch|networking/)) {
    mandatory.push({ name:"TEC / MTCTE Certification", icon:"📶", timeline:"6–12 weeks", href:"/tec",
      reason:"Mandatory for all telecom equipment under DoT's MTCTE framework before sale or import." });
    weeks.push(12);
  }
  if (pt.match(/appliance|ac|air condition|refrigerator|washing|geyser|fan|led|lamp|tv|television/)) {
    mandatory.push({ name:"BEE Star Rating", icon:"⭐", timeline:"4–8 weeks", href:"/bee",
      reason:"Mandatory energy efficiency labelling for home appliances under the Bureau of Energy Efficiency." });
    weeks.push(8);
  }
  if (pkg.match(/yes|mrp/) || pt.match(/food|consumer goods|packaged/) || act.match(/import/)) {
    mandatory.push({ name:"LMPC Registration", icon:"⚖️", timeline:"2–4 weeks", href:"/lmpc",
      reason:"Required for all importers/manufacturers of pre-packaged goods under the Legal Metrology Act." });
    weeks.push(4);
  }
  if (pt.match(/medical|drug|pharma|cosmetic|personal care|surgical/)) {
    mandatory.push({ name:"CDSCO License", icon:"💊", timeline:"1–6 months", href:"/cdsco",
      reason:"Mandatory for drugs, cosmetics, and medical devices under India's Drugs & Cosmetics Act, 1940." });
    weeks.push(24);
  }
  if (pt.match(/electronic|battery|plastic|tyre|packaging/) || act.match(/import/)) {
    recommended.push({ name:"EPR Registration", icon:"♻️", timeline:"3–6 weeks", href:"/epr",
      reason:"Mandatory if your product generates e-waste, plastic packaging, or battery waste in India." });
  }
  if (sc.match(/government|b2b|corporate|tender/)) {
    recommended.push({ name:"ISO 9001 Certification", icon:"🏆", timeline:"2–4 months", href:"/iso",
      reason:"Strongly recommended for government tenders and B2B contracts — often required in RFQs." });
  }
  if (mandatory.length === 0) {
    mandatory.push({ name:"LMPC Registration", icon:"⚖️", timeline:"2–4 weeks", href:"/lmpc",
      reason:"Most imported or manufactured goods require LMPC registration for legal retail sale in India." });
    weeks.push(4);
  }

  const max = Math.max(...weeks, 4);
  const productName = answers.product_type || "your product";
  const activityStr = answers.activity     || "selling";
  return {
    mandatory,
    recommended,
    totalTimeline: `${max}–${max + 4} weeks`,
    aiSummary: `Based on your answers, ${productName} (${activityStr}) requires ${mandatory.length} mandatory certification${mandatory.length > 1 ? "s" : ""} before it can legally enter the Indian market. SIACC can handle the entire process end-to-end — from lab testing to final approval.`,
    source: "rules",
  };
}

// ─── Gemini call ──────────────────────────────────────────────────────────────
async function callGemini(answers) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set in .env.local");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const prompt = `You are an expert Indian regulatory compliance advisor for SIACC.

USER ANSWERS:
- Product Type: ${answers.product_type || "Not specified"}
- Business Activity: ${answers.activity || "Not specified"}
- Sales Channel: ${answers.sell_channel || "Not specified"}
- Wireless Technology: ${answers.wireless || "Not specified"}
- Pre-packaged with MRP: ${answers.packaging || "Not specified"}
- Country of Manufacture: ${answers.origin || "Not specified"}
- Launch Timeline: ${answers.urgency || "Not specified"}

AVAILABLE CERTIFICATIONS:
- BIS CRS / ISI Mark: Electronics, IT products, electrical goods, LEDs, appliances
- WPC-ETA Approval: Wi-Fi, Bluetooth, RF, Zigbee, IoT, any wireless device
- TEC / MTCTE Certification: Telecom equipment, routers, modems, mobile devices
- BEE Star Rating: ACs, refrigerators, washing machines, LEDs, geysers, fans, TVs
- LMPC Registration: All pre-packaged goods imported or manufactured in India
- CDSCO License: Drugs, cosmetics, medical devices
- EPR Registration: Electronics, batteries, plastic packaging importers
- ISO 9001 Certification: Quality management, government/B2B sales

Return ONLY valid JSON, no markdown:
{"mandatory":[{"name":"","icon":"","timeline":"","href":"","reason":""}],"recommended":[{"name":"","icon":"","timeline":"","href":"","reason":""}],"totalTimeline":"","aiSummary":""}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 900 },
    }),
  });

  if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);

  const data = await res.json();
  const raw  = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const clean = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  return JSON.parse(clean);
}

const HREF_MAP = {
  "BIS CRS / ISI Mark":       "/bis",
  "WPC-ETA Approval":          "/wpc",
  "TEC / MTCTE Certification": "/tec",
  "BEE Star Rating":           "/bee",
  "LMPC Registration":         "/lmpc",
  "CDSCO License":             "/cdsco",
  "EPR Registration":          "/epr",
  "ISO 9001 Certification":    "/iso",
  "ISO Certification":         "/iso",
};

function enrich(list = []) {
  return list.map(c => ({
    ...c,
    href: c.href || HREF_MAP[c.name] || "/services",
    icon: c.icon || "📋",
  }));
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const answers = await request.json();

    // Try Gemini first; silently fall back to rules if it fails
    try {
      const parsed = await callGemini(answers);
      return NextResponse.json({
        mandatory:     enrich(parsed.mandatory),
        recommended:   enrich(parsed.recommended),
        totalTimeline: parsed.totalTimeline || "4–12 weeks",
        aiSummary:     parsed.aiSummary     || "",
        source:        "gemini",
      });
    } catch (geminiErr) {
      console.warn("Gemini unavailable, using rule engine:", geminiErr.message);
      // Fall through to rule engine
    }

    // Rule-based fallback — always works, no external dependency
    const fallback = computeFallback(answers);
    return NextResponse.json(fallback);

  } catch (err) {
    console.error("ai-recommend route error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}