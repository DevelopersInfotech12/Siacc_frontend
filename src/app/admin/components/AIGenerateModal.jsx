"use client";
import { useState } from "react";
import { C, TAG_COLORS, EMPTY_BLOG } from "@/lib/adminConstants";
import { Btn } from "./AdminUI";

const SYSTEM_PROMPT = `You are an expert Indian regulatory compliance blog writer. 
Write detailed, professional blog posts about BIS, WPC, EPR, TEC, BEE, LMPC, CDSCO, ISO certifications in India.
Always respond with ONLY valid JSON — no markdown, no backticks, no explanation outside the JSON.

Generate a complete blog post with this exact structure:
{
  "title": "Full blog title",
  "slug": "url-slug-lowercase-hyphens",
  "excerpt": "2-3 sentence summary for SEO (150-160 chars)",
  "tag": "one of: BIS|BIS Update|EPR|WPC|TEC|BEE|LMPC|ISO|CDSCO",
  "date": "Month DD, YYYY",
  "readTime": "X min read",
  "author": "Compliance & Regulatory Team",
  "highlights": ["key point 1", "key point 2", "key point 3", "key point 4", "key point 5", "key point 6"],
  "toc": [{"id": "anchor-id", "label": "Section Label"}],
  "tags": ["tag1", "tag2", "tag3"],
  "ctaTitle": "CTA heading relevant to topic",
  "ctaBody": "CTA body text offering help",
  "sidebarCta": {"title": "Short CTA title", "body": "Short offer text", "btn": "Get Free Consultation →"},
  "seo": {
    "metaTitle": "SEO title under 60 chars",
    "metaDescription": "SEO description 150-160 chars",
    "metaKeywords": ["keyword1", "keyword2", "keyword3", "keyword4"],
    "ogTitle": "Social share title",
    "ogDescription": "Social share description"
  },
  "sections": [
    {
      "id": "section-anchor",
      "heading": "Full Section Heading",
      "content": [
        {"type": "p", "text": "Paragraph text here. Write 3-4 detailed sentences."},
        {"type": "ul", "items": ["<strong>Item 1</strong> — explanation", "Item 2 explanation"]},
        {"type": "callout", "text": "<strong>💡 Note:</strong> Important callout text here."}
      ]
    }
  ]
}

Write at minimum 6 detailed sections. Each section must have 2-4 content blocks. 
Use HTML tags like <strong>, <em> inside text/items strings.
Use callout-warn type for warnings, callout for tips.
Make content highly detailed, practical, and specific to Indian compliance context.`;

export default function AIGenerateModal({ onGenerated, onClose, toast }) {
  const [headline, setHeadline] = useState("");
  const [tagline, setTagline] = useState("");
  const [tag, setTag] = useState("BIS");
  const [generating, setGenerating] = useState(false);
  const [step, setStep] = useState(""); // progress message

  const STEPS = [
    "🧠 Analysing topic...",
    "📋 Planning blog structure...",
    "✍️ Writing introduction & highlights...",
    "📖 Generating content sections...",
    "🔍 Optimising SEO fields...",
    "✅ Finalising blog...",
  ];

  const generate = async () => {
    if (!headline.trim()) return;
    setGenerating(true);

    // Animate steps
    let stepIdx = 0;
    setStep(STEPS[0]);
    const stepTimer = setInterval(() => {
      stepIdx = Math.min(stepIdx + 1, STEPS.length - 1);
      setStep(STEPS[stepIdx]);
    }, 2500);

    try {
      const userPrompt = `Write a complete, detailed blog post for an Indian compliance consultancy website.

Topic/Headline: ${headline}
Tagline/Context: ${tagline || "General compliance guide for Indian businesses"}
Category: ${tag}

Requirements:
- Write at least 6 detailed sections matching the TOC
- Each section must have 3-4 content blocks (paragraphs, lists, callouts)
- Include specific Indian regulatory details, standards, timelines, penalties
- Make highlights punchy and specific
- SEO optimised for Indian compliance searches
- Professional tone, practitioner-level detail`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 8000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userPrompt }],
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "AI API error");

      const rawText = data.content?.[0]?.text || "";

      // Parse JSON from response
      let blogData;
      try {
        blogData = JSON.parse(rawText);
      } catch {
        // Try extracting JSON if wrapped
        const match = rawText.match(/\{[\s\S]*\}/);
        if (match) blogData = JSON.parse(match[0]);
        else throw new Error("AI returned invalid JSON. Please try again.");
      }

      // Merge with EMPTY_BLOG defaults
      const merged = {
        ...EMPTY_BLOG,
        ...blogData,
        tagStyle: TAG_COLORS[blogData.tag] || TAG_COLORS["BIS"],
        status: "draft",
        img: `https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&fit=crop`,
        heroImg: `https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&q=85&fit=crop`,
        heroGradient: "linear-gradient(135deg,rgba(13,27,42,0.97) 0%,rgba(10,109,170,0.82) 100%)",
        meta: [
          { label: "Category", value: blogData.tag },
          { label: "Published", value: blogData.date },
          { label: "Read Time", value: blogData.readTime },
        ],
        seo: { ...EMPTY_BLOG.seo, ...blogData.seo },
        related: [],
      };

      clearInterval(stepTimer);
      setStep("✅ Done!");
      setTimeout(() => {
        onGenerated(merged);
        onClose();
        toast("success", "Blog generated! Review and publish.");
      }, 600);

    } catch (err) {
      clearInterval(stepTimer);
      setStep("");
      toast("error", err.message);
      setGenerating(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,27,42,0.75)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 520, boxShadow: "0 24px 64px rgba(0,0,0,0.25)", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ background: `linear-gradient(135deg,${C.sidebar} 0%,${C.accentDark} 100%)`, padding: "20px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: C.poppins, fontSize: 16, fontWeight: 700, color: "#fff" }}>✨ AI Blog Generator</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 3 }}>Enter a headline — AI writes the full blog</div>
            </div>
            <button onClick={onClose} disabled={generating} style={{ width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 14 }}>✕</button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: 24 }}>
          {!generating ? (
            <>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, fontFamily: C.poppins, textTransform: "uppercase", letterSpacing: "0.05em" }}>Blog Headline *</label>
                <input
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. BIS CRS Registration Guide for LED Products 2025"
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 14, fontFamily: C.sans, outline: "none" }}
                  onFocus={(e) => (e.target.style.borderColor = C.accent)}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, fontFamily: C.poppins, textTransform: "uppercase", letterSpacing: "0.05em" }}>Context / Tagline</label>
                <textarea
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Focus on foreign manufacturers, include penalties, document checklist, and step-by-step process"
                  rows={3}
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 13, fontFamily: C.sans, outline: "none", resize: "vertical" }}
                  onFocus={(e) => (e.target.style.borderColor = C.accent)}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 6, fontFamily: C.poppins, textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${C.border}`, borderRadius: 9, fontSize: 13, fontFamily: C.sans, outline: "none", background: "#fff" }}
                >
                  {Object.keys(TAG_COLORS).map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              {/* What AI generates */}
              <div style={{ background: C.bg, borderRadius: 10, padding: "12px 14px", marginBottom: 20 }}>
                <div style={{ fontFamily: C.poppins, fontSize: 11, fontWeight: 700, color: C.accentDark, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>AI will generate</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {["Title & slug", "6+ content sections", "TOC entries", "Key highlights", "SEO meta & OG tags", "Focus keywords", "CTA text", "Sidebar widget"].map((item) => (
                    <div key={item} style={{ fontSize: 12, color: C.text, display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ color: C.success }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>

              <Btn
                variant="primary"
                onClick={generate}
                disabled={!headline.trim()}
                style={{ width: "100%", justifyContent: "center", padding: "12px 0", fontSize: 14 }}
              >
                ✨ Generate Full Blog
              </Btn>
            </>
          ) : (
            /* Generating state */
            <div style={{ padding: "20px 0", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16, animation: "spin 2s linear infinite", display: "inline-block" }}>⚙️</div>
              <div style={{ fontFamily: C.poppins, fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 8 }}>Generating your blog...</div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>{step}</div>

              {/* Progress bar */}
              <div style={{ background: C.bg, borderRadius: 20, height: 6, overflow: "hidden", margin: "0 20px" }}>
                <div style={{ height: "100%", background: `linear-gradient(90deg,${C.accentDark},${C.accent})`, borderRadius: 20, width: "100%", animation: "progress 15s linear forwards" }} />
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: C.muted }}>This usually takes 10–20 seconds</div>

              <style suppressHydrationWarning>{`
                @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                @keyframes progress { from{width:0%} to{width:95%} }
              `}</style>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}