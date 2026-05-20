"use client";
import { useState, useEffect, useRef } from "react";

const T = {
  teal: "#1E88C8", tealDark: "#074D4D", tealMid: "#0E8080", titleblue: "#0a6daa",
  tealLight: "#EBF5F5", amber: "#C8780A", amberLight: "#FEF3DC",
  slate: "#0D1B2A", body: "#2D3748", muted: "#718096", subtle: "#A0AEC0",
  border: "#E8E3DA", white: "#FFFFFF", cream: "#FAF8F4",
  orange: "#F97316",
  serif: "'Cormorant Garamond','Georgia',serif",
  sans: "'Outfit','system-ui',sans-serif",
};

// ✅ This is the OFFICIAL Google URL — opens Write Review box directly
// ─────────────────────────────────────────────────────────
// ✅ PERMANENT FIX — Get YOUR official short link:
// 1. Go to: business.google.com
// 2. Click "Star India Accreditation"
// 3. Click "Ask for reviews"
// 4. Copy the short link (looks like: https://g.page/r/XXXX/review)
// 5. Replace the URL below with that link — it NEVER breaks!
// ─────────────────────────────────────────────────────────
const GOOGLE_REVIEW_URL = "https://www.google.com/search?num=10&sca_esv=80761c0e6fc726f0&rlz=1C1VDKB_en-GBIN1071IN1071&sxsrf=ANbL-n5omEyQWMfR8cyWK3557VQvfZUa-g:1778143851303&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOea6Q1GLOTE49aXFrDAJQXl2VVm7IrwQK4sKxNnlG0o-EFfdSObSoZ7OH5uIeaCjHCpomDAz1xIyuB6bq6i-PuFcTSFdQPrIy7QxNExuHr4-f1R6Yw%3D%3D&q=Star+India+Accreditation+Reviews&sa=X&ved=2ahUKEwi08PaE5qaUAxXq1jgGHfKzICwQ0bkNegQIJxAI&biw=1517&bih=665&dpr=0.9";

const ratingLabels = { 1: "Poor", 2: "Fair", 3: "Good", 4: "Very Good", 5: "Excellent" };
const ratingEmoji = { 1: "😞", 2: "😐", 3: "🙂", 4: "😊", 5: "🤩" };
const ratingColor = { 1: "#EF4444", 2: "#F97316", 3: "#F59E0B", 4: "#10B981", 5: "#1E88C8" };

async function fetchAISuggestions(rating) {
  const prompt = `You are a review assistant for SIACC (Star India Accreditation), India's leading compliance and certification consultancy. A customer rated their experience ${rating}/5 stars (${ratingLabels[rating]}).

Generate exactly 9 short, genuine-sounding Google review suggestions for this ${rating}-star rating. Each review must:
- Be 2-3 sentences only
- Sound completely natural and human, not robotic
- Vary in tone and focus — no two should feel the same
- Mention different aspects: speed, expertise, documentation help, communication, professionalism, successful certification, cost transparency, team support, follow-up
- Match the ${rating}-star sentiment perfectly
- Reference SIACC's work: BIS, WPC, EPR, ISO, TEC, BEE certifications, compliance, regulatory approvals

${rating >= 4
      ? "Focus on: positive outcomes, quick approvals, expert guidance, smooth process, great communication, saved time/money, trustworthy team"
      : rating === 3
        ? "Focus on: decent service, mostly helpful but some delays or communication gaps, room for improvement"
        : "Focus on: delays, poor communication, unmet expectations, lack of follow-up — constructive criticism"
    }

Return ONLY a valid JSON array of exactly 9 strings. No markdown, no explanation, no extra text.
["review 1", "review 2", ..., "review 9"]`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    const data = await res.json();
    const text = data.content?.[0]?.text || "[]";
    const clean = text.replace(/```json|```/g, "").trim();
    const arr = JSON.parse(clean);
    return Array.isArray(arr) ? arr.slice(0, 9) : fallback(rating);
  } catch {
    return fallback(rating);
  }
}

function fallback(r) {
  if (r >= 4) return [
    "SIACC made our BIS CRS certification incredibly smooth. Their team handled everything from documentation to final approval.",
    "Got our WPC-ETA approval in record time. The team at SIACC is extremely knowledgeable and responsive throughout.",
    "Very professional service. They guided us step by step through the entire EPR registration process without any hassle.",
    "Excellent consultancy for compliance needs. SIACC delivered exactly what they promised — on time and within budget.",
    "Outstanding support from the SIACC team. Our ISO certification was handled efficiently with zero delays.",
    "Highly recommend SIACC for any BIS or regulatory compliance work. Their expertise saved us weeks of time.",
    "Transparent pricing, quick responses, and successful certification — SIACC delivered on all fronts.",
    "The team went above and beyond to ensure our BEE registration was completed on schedule. Great experience.",
    "SIACC's expertise in Indian compliance is unmatched. They made a complex TEC certification feel simple.",
  ];
  if (r === 3) return [
    "Decent service overall. SIACC handled our certification but communication could have been more proactive.",
    "The team is knowledgeable but timelines were slightly longer than expected. Overall satisfactory.",
    "Good guidance on compliance requirements. There were minor delays but the end result was positive.",
    "Helpful consultants who know the regulations well. A bit more follow-up would make the experience excellent.",
    "Reasonable service for BIS certification. Documentation support was good but could improve on updates.",
    "Competent team with solid knowledge. The process took longer than quoted but they delivered in the end.",
    "Average experience — the team is skilled but client communication needs improvement during the process.",
    "SIACC got us our certification, though the journey had some hiccups. Would give them another chance.",
    "Satisfactory service. Would benefit from a more structured project update system for clients.",
  ];
  return [
    "Service did not meet expectations. Our certification application had unexplained delays.",
    "Communication was lacking during the process. Had to follow up multiple times for basic updates.",
    "Response time needs significant improvement. Queries went unanswered for days at a time.",
    "The process took much longer than the quoted timeline with little explanation provided.",
    "Documents were submitted incorrectly initially, causing delays in our BIS application.",
    "Expected more proactive guidance. Had to push for information that should have been shared automatically.",
    "Pricing was not transparent. Additional charges came up after the agreement was made.",
    "The team seemed overloaded and our project did not get enough attention.",
    "Overall disappointing experience. The final result was delivered but the journey was frustrating.",
  ];
}

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editText, setEditText] = useState("");
  const [done, setDone] = useState(false);
  const [thinkDots, setThinkDots] = useState(1);
  const [showPastePopup, setShowPastePopup] = useState(false);
  const textRef = useRef(null);
  const sugRef = useRef(null);

  // Thinking dots
  useEffect(() => {
    if (!loading) return;
    const id = setInterval(() => setThinkDots(d => d === 3 ? 1 : d + 1), 450);
    return () => clearInterval(id);
  }, [loading]);

  // When rating changes → fetch new suggestions
  useEffect(() => {
    if (!rating) return;
    setSuggestions([]);
    setSelected(null);
    setEditText("");
    setLoading(true);
    fetchAISuggestions(rating).then(sugs => {
      setSuggestions(sugs);
      setLoading(false);
      // Smooth scroll to suggestions
      setTimeout(() => sugRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    });
  }, [rating]);

  const handleSelectSuggestion = (text, idx) => {
    setSelected(idx);
    setEditText(text);
    setTimeout(() => textRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
    setTimeout(() => textRef.current?.focus(), 200);
  };

  const handlePost = async () => {
    // Always copy to clipboard first
    try { await navigator.clipboard.writeText(editText); } catch { }

    // Try Web Share API first (Android/iOS native)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My review for Star India Accreditation",
          text: editText,
          url: GOOGLE_REVIEW_URL,
        });
        setDone(true);
        return;
      } catch { }
    }

    // Show popup overlay → user taps "Go to Google" from popup
    setShowPastePopup(true);
  };

  const goToGoogle = () => {
    setShowPastePopup(false);
    window.open(GOOGLE_REVIEW_URL, "_blank");
    setDone(true);
  };

  const reset = () => {
    setRating(0); setHovered(0); setSuggestions([]); setLoading(false);
    setSelected(null); setEditText(""); setDone(false); setThinkDots(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const displayRating = hovered || rating;
  const starColor = displayRating ? ratingColor[displayRating] : T.border;

  if (done) return <DoneScreen rating={rating} reset={reset} />;

  return (
    <div style={{ minHeight: "100vh", background: T.slate, fontFamily: T.sans }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        img{max-width:100%;display:block;}

        @keyframes fadeUp  {from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes popIn   {0%{opacity:0;transform:scale(0.8)}70%{transform:scale(1.06)}100%{opacity:1;transform:scale(1)}}
        @keyframes slideIn {from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}}
        @keyframes spin    {to{transform:rotate(360deg)}}
        @keyframes shimmer {0%{background-position:-300% 0}100%{background-position:300% 0}}
        @keyframes starBounce{0%{transform:scale(1)}40%{transform:scale(1.4)}100%{transform:scale(1)}}
        @keyframes pulse   {0%,100%{opacity:1}50%{opacity:0.5}}
        @keyframes glow    {0%,100%{box-shadow:0 0 16px rgba(30,136,200,0.4)}50%{box-shadow:0 0 32px rgba(30,136,200,0.7)}}
        @keyframes slideUp {from{transform:translateY(100%)}to{transform:translateY(0)}}

        .page-wrap{width:100%;max-width:460px;margin:0 auto;display:flex;flex-direction:column;}

        /* Header */
        .rev-header{
          background:linear-gradient(160deg,${T.tealDark} 0%,${T.tealMid} 55%,${T.teal} 100%);
          padding:36px 24px 28px;position:relative;overflow:hidden;flex-shrink:0;
        }
        .rev-header::before{
          content:'';position:absolute;top:-80px;right:-80px;width:220px;height:220px;
          background:radial-gradient(circle,rgba(255,255,255,0.07) 0%,transparent 70%);
          border-radius:50%;
        }
        .rev-header::after{
          content:'';position:absolute;bottom:0;left:0;right:0;height:1px;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent);
        }

        /* Body */
        .rev-body{
          background:${T.cream};
          border-radius:28px 28px 0 0;
          margin-top:-20px;
          padding:28px 20px 48px;
          position:relative;z-index:1;
          flex:1;
        }

        /* ── Stars ── */
        .star-row{display:flex;gap:6px;justify-content:center;margin-bottom:14px;}
        .star-btn{
          background:none;border:none;cursor:pointer;padding:2px;
          transition:transform 0.15s;line-height:1;
        }
        .star-btn:active{transform:scale(0.9);}
        .star-filled{animation:starBounce 0.3s ease both;}

        /* Rating label */
        .rating-label{
          display:inline-flex;align-items:center;gap:8px;
          padding:8px 20px;border-radius:999px;
          font-size:14px;font-weight:600;font-family:${T.sans};
          transition:all 0.25s;
        }

        /* ── Suggestions ── */
        .sug-grid{display:flex;flex-direction:column;gap:10px;}

        .sug-card{
          background:${T.white};
          border:2px solid ${T.border};
          border-radius:14px;
          padding:16px 18px;
          cursor:pointer;
          transition:all 0.2s;
          position:relative;
          overflow:hidden;
          animation:slideIn 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .sug-card:hover{
          border-color:${T.teal};
          transform:translateX(4px);
          box-shadow:0 4px 16px rgba(30,136,200,0.10);
        }
        .sug-card.selected{
          border-color:${T.teal};
          background:${T.tealLight};
          box-shadow:0 4px 20px rgba(30,136,200,0.15);
        }
        .sug-card::before{
          content:'';position:absolute;left:0;top:0;bottom:0;width:3px;
          background:linear-gradient(to bottom,${T.teal},${T.tealMid});
          border-radius:3px 0 0 3px;opacity:0;transition:opacity 0.2s;
        }
        .sug-card:hover::before,.sug-card.selected::before{opacity:1;}

        .sug-num{
          display:inline-flex;align-items:center;justify-content:center;
          width:22px;height:22px;border-radius:6px;
          background:${T.tealLight};color:${T.teal};
          font-size:10px;font-weight:800;flex-shrink:0;margin-top:1px;
          transition:all 0.2s;
        }
        .sug-card.selected .sug-num{background:${T.teal};color:#fff;}
        .sug-card.selected .sug-check{display:flex;}
        .sug-check{
          display:none;width:20px;height:20px;border-radius:50%;
          background:${T.teal};color:#fff;
          align-items:center;justify-content:center;
          font-size:11px;font-weight:800;flex-shrink:0;
        }

        /* Shimmer bar */
        .shimmer-bar{
          height:13px;border-radius:6px;
          background:linear-gradient(90deg,${T.tealLight} 25%,#fff 50%,${T.tealLight} 75%);
          background-size:300% 100%;
          animation:shimmer 1.4s linear infinite;
        }

        /* Edit area */
        .edit-wrap{
          background:${T.white};
          border:2px solid ${T.teal};
          border-radius:16px;
          padding:2px;
          box-shadow:0 0 0 4px rgba(30,136,200,0.08);
          animation:fadeUp 0.4s ease both;
        }
        .review-textarea{
          width:100%;background:transparent;border:none;
          border-radius:14px;padding:14px 16px;
          font-size:14px;color:${T.slate};font-family:${T.sans};
          line-height:1.75;resize:none;outline:none;
          min-height:120px;
        }

        /* Buttons */
        .btn-google{
          width:100%;padding:16px;
          background:linear-gradient(135deg,#4285F4,#1a73e8);
          color:#fff;border:none;border-radius:14px;
          font-size:15px;font-weight:700;cursor:pointer;
          font-family:${T.sans};letter-spacing:0.02em;
          transition:all 0.22s;
          display:flex;align-items:center;justify-content:center;gap:10px;
          box-shadow:0 4px 16px rgba(66,133,244,0.35);
        }
        .btn-google:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(66,133,244,0.45);}
        .btn-google:disabled{opacity:0.45;pointer-events:none;}

        .btn-ghost{
          width:100%;padding:13px;background:transparent;
          color:${T.muted};border:1.5px solid ${T.border};
          border-radius:12px;font-size:13px;font-weight:500;
          cursor:pointer;font-family:${T.sans};transition:all 0.2s;
        }
        .btn-ghost:hover{border-color:${T.teal};color:${T.teal};}

        /* Section header */
        .sec-head{
          display:flex;align-items:center;gap:10px;
          margin-bottom:14px;
        }
        .sec-num{
          width:24px;height:24px;border-radius:8px;
          background:${T.teal};color:#fff;
          display:flex;align-items:center;justify-content:center;
          font-size:12px;font-weight:800;flex-shrink:0;
        }

        /* AI badge */
        .ai-badge{
          display:inline-flex;align-items:center;gap:5px;
          background:linear-gradient(135deg,${T.teal},${T.tealMid});
          color:#fff;border-radius:999px;
          padding:3px 10px;font-size:10px;font-weight:700;
          letter-spacing:0.06em;
        }

        .divider{height:1px;background:${T.border};margin:24px 0;}

        /* Clipboard tip */
        .clip-tip{
          background:${T.tealLight};border:1px solid #B2DADA;
          border-radius:12px;padding:12px 14px;
          display:flex;gap:10px;align-items:flex-start;
          margin-bottom:16px;
        }
      `}</style>

      <div className="page-wrap">

        {/* ── HEADER ── */}
        <div className="rev-header">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, border: "1px solid rgba(255,255,255,0.2)" }}>🏅</div>
              <div>
                <div style={{ fontFamily: T.serif, fontSize: 15, color: "#fff", fontWeight: 700, lineHeight: 1 }}>SIACC</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", letterSpacing: "0.06em" }}>Star India Accreditation</div>
              </div>
              <div className="ai-badge" style={{ marginLeft: "auto" }}>✨ AI Powered</div>
            </div>
            <h1 style={{ fontFamily: T.serif, fontSize: "clamp(20px,5vw,26px)", color: "#fff", fontWeight: 700, lineHeight: 1.2, marginBottom: 6 }}>
              Share Your Experience
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.68)", lineHeight: 1.55 }}>
              Rate below — AI suggestions appear instantly on the same page
            </p>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="rev-body">

          {/* ── SECTION 1: RATING ── */}
          <div style={{ marginBottom: 28 }}>
            <div className="sec-head">
              <div className="sec-num">1</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.slate }}>Tap to rate your experience</div>
            </div>

            {/* Stars */}
            <div className="star-row">
              {[1, 2, 3, 4, 5].map(star => {
                const active = star <= displayRating;
                return (
                  <button
                    key={star}
                    className="star-btn"
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    aria-label={`${star} star`}
                  >
                    <span style={{
                      fontSize: 46,
                      display: "block",
                      color: active ? ratingColor[displayRating] : "#D1D5DB",
                      filter: active ? `drop-shadow(0 2px 8px ${ratingColor[displayRating]}55)` : "none",
                      transition: "color 0.15s,filter 0.15s",
                      lineHeight: 1,
                    }}>★</span>
                  </button>
                );
              })}
            </div>

            {/* Rating label */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              {displayRating > 0 ? (
                <div className="rating-label" style={{ background: `${ratingColor[displayRating]}18`, color: ratingColor[displayRating], border: `1.5px solid ${ratingColor[displayRating]}40`, animation: "popIn 0.3s ease both" }}>
                  <span style={{ fontSize: 20 }}>{ratingEmoji[displayRating]}</span>
                  <span>{ratingLabels[displayRating]}</span>
                  <span style={{ fontSize: 12, opacity: 0.7 }}>— {displayRating}/5</span>
                </div>
              ) : (
                <div style={{ fontSize: 13, color: T.subtle }}>← Tap a star to get started</div>
              )}
            </div>
          </div>

          <div className="divider" />

          {/* ── SECTION 2: AI SUGGESTIONS ── */}
          <div ref={sugRef} style={{ marginBottom: 24 }}>
            <div className="sec-head">
              <div className="sec-num" style={{ background: suggestions.length ? T.teal : T.subtle }}>2</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: T.slate }}>Choose a suggestion</div>
              {suggestions.length > 0 && <div className="ai-badge" style={{ marginLeft: "auto" }}>✨ AI</div>}
            </div>

            {/* Not rated yet */}
            {!rating && !loading && (
              <div style={{ textAlign: "center", padding: "28px 16px", background: T.white, borderRadius: 14, border: `1.5px dashed ${T.border}` }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>⭐</div>
                <div style={{ fontSize: 14, color: T.muted, lineHeight: 1.65 }}>Rate your experience above and<br />AI suggestions will appear here instantly</div>
              </div>
            )}

            {/* Loading shimmer */}
            {loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10, animation: "fadeUp 0.3s ease both" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 20, height: 20, border: `2px solid ${T.tealLight}`, borderTopColor: T.teal, borderRadius: "50%", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: T.teal, fontWeight: 600 }}>AI is crafting suggestions{".".repeat(thinkDots)}</span>
                </div>
                {[100, 88, 95, 80, 92, 85, 90, 78, 96].map((w, i) => (
                  <div key={i} style={{ background: T.white, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 7 }}>
                    <div className="shimmer-bar" style={{ width: `${w}%` }} />
                    <div className="shimmer-bar" style={{ width: `${w - 18}%` }} />
                  </div>
                ))}
              </div>
            )}

            {/* Suggestions */}
            {!loading && suggestions.length > 0 && (
              <div className="sug-grid">
                {suggestions.map((sug, i) => (
                  <div
                    key={i}
                    className={`sug-card ${selected === i ? "selected" : ""}`}
                    style={{ animationDelay: `${i * 0.06}s` }}
                    onClick={() => handleSelectSuggestion(sug, i)}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div className="sug-num">{selected === i ? "✓" : i + 1}</div>
                      <p style={{ fontSize: 13.5, color: T.body, lineHeight: 1.7, margin: 0, flex: 1 }}>{sug}</p>
                      {selected === i && (
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: T.teal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>✓</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── SECTION 3: EDIT & POST ── */}
          {selected !== null && (
            <div style={{ animation: "fadeUp 0.4s ease both" }}>
              <div className="divider" />

              <div className="sec-head" ref={textRef}>
                <div className="sec-num">3</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.slate }}>Edit if needed, then post</div>
              </div>

              {/* Textarea */}
              <div className="edit-wrap" style={{ marginBottom: 14 }}>
                <textarea
                  className="review-textarea"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  placeholder="Edit your review here..."
                  maxLength={500}
                  rows={5}
                />
                <div style={{ padding: "6px 16px 10px", textAlign: "right", fontSize: 11, color: T.muted }}>{editText.length}/500</div>
              </div>

              {/* Clipboard tip */}
              <div className="clip-tip">
                <span style={{ fontSize: 18, flexShrink: 0 }}>📋</span>
                <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65, margin: 0 }}>
                  Review will be <strong style={{ color: T.slate }}>auto-copied</strong>. A step-by-step guide pops up to help you paste it on Google in seconds.
                </p>
              </div>

              {/* Post button */}
              <button
                className="btn-google"
                onClick={handlePost}
                disabled={!editText.trim()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff" opacity="0.9" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" opacity="0.9" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" opacity="0.9" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" opacity="0.9" />
                </svg>
                Post Review on Google
              </button>

              <button className="btn-ghost" style={{ marginTop: 10 }} onClick={() => { setSelected(null); setEditText(""); }}>
                ← Back to suggestions
              </button>

              <button
                style={{ width: "100%", padding: "10px", background: "transparent", color: T.muted, border: "none", fontSize: 12, cursor: "pointer", fontFamily: T.sans, marginTop: 6 }}
                onClick={() => window.open(GOOGLE_REVIEW_URL, "_blank")}
              >
                Skip and review directly on Google →
              </button>
            </div>
          )}

          {/* Write own — shows when suggestions loaded but none selected */}
          {!loading && suggestions.length > 0 && selected === null && (
            <div>
              <div className="divider" />
              <button
                className="btn-ghost"
                onClick={() => { setSelected(-1); setEditText(""); setTimeout(() => textRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 80); }}
              >
                ✏️ Write my own review instead
              </button>
              <button
                style={{ width: "100%", padding: "10px", background: "transparent", color: T.muted, border: "none", fontSize: 12, cursor: "pointer", fontFamily: T.sans, marginTop: 6 }}
                onClick={() => window.open(GOOGLE_REVIEW_URL, "_blank")}
              >
                Skip and review directly on Google →
              </button>
            </div>
          )}

          {/* Custom write own section */}
          {selected === -1 && (
            <div style={{ animation: "fadeUp 0.4s ease both" }}>
              <div className="divider" />
              <div className="sec-head" ref={textRef}>
                <div className="sec-num">3</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.slate }}>Write your review</div>
              </div>
              <div className="edit-wrap" style={{ marginBottom: 14 }}>
                <textarea
                  className="review-textarea"
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  placeholder="Share your experience with SIACC..."
                  maxLength={500}
                  rows={5}
                  autoFocus
                />
                <div style={{ padding: "6px 16px 10px", textAlign: "right", fontSize: 11, color: T.muted }}>{editText.length}/500</div>
              </div>
              <div className="clip-tip">
                <span style={{ fontSize: 18, flexShrink: 0 }}>📋</span>
                <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65, margin: 0 }}>
                  Review will be <strong style={{ color: T.slate }}>auto-copied</strong>. A guide pops up to help you paste it on Google.
                </p>
              </div>
              <button className="btn-google" onClick={handlePost} disabled={!editText.trim()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff" opacity="0.9" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" opacity="0.9" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" opacity="0.9" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" opacity="0.9" />
                </svg>
                Post Review on Google
              </button>
              <button className="btn-ghost" style={{ marginTop: 10 }} onClick={() => setSelected(null)}>
                ← Back to suggestions
              </button>
            </div>
          )}

        </div>
      </div>

      {/* ── PASTE POPUP OVERLAY ── */}
      {showPastePopup && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "flex-end", justifyContent: "center", background: "rgba(13,27,42,0.82)", backdropFilter: "blur(5px)" }}>
          <div style={{ width: "100%", maxWidth: 460, background: T.white, borderRadius: "24px 24px 0 0", padding: "20px 20px 36px", animation: "slideUp 0.35s cubic-bezier(0.22,1,0.36,1) both" }}>

            {/* Handle */}
            <div style={{ width: 36, height: 4, background: T.border, borderRadius: 999, margin: "0 auto 18px" }} />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "linear-gradient(135deg,#10B981,#059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>✅</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.slate }}>Review Copied!</div>
                <div style={{ fontSize: 12, color: T.muted }}>Open Google → Long press text box → Paste</div>
              </div>
            </div>

            {/* Review text — shown clearly so user can also type it */}
            <div style={{ background: T.tealLight, border: `2px solid ${T.teal}`, borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.teal, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <span>📋</span> Your Review — Copied & Ready to Paste
              </div>
              <p style={{ fontSize: 14, color: T.slate, lineHeight: 1.75, margin: 0, fontStyle: "italic" }}>
                "{editText}"
              </p>
            </div>

            {/* One clear instruction */}
            <div style={{ background: "#FEF3DC", border: "1.5px solid #F5C94E", borderRadius: 12, padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>👆</span>
              <div style={{ fontSize: 13, color: "#92400E", fontWeight: 600, lineHeight: 1.5 }}>
                On Google: <strong>Long press</strong> the text box → tap <strong>"Paste"</strong> → tap <strong>"Post"</strong>
              </div>
            </div>

            {/* Open Google button */}
            <button onClick={goToGoogle}
              style={{ width: "100%", padding: 15, background: "linear-gradient(135deg,#4285F4,#1a73e8)", color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: T.sans, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 4px 20px rgba(66,133,244,0.40)", marginBottom: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" />
              </svg>
              Open Google Review Box →
            </button>

            <button onClick={() => setShowPastePopup(false)}
              style={{ width: "100%", padding: 12, background: "transparent", color: T.muted, border: `1.5px solid ${T.border}`, borderRadius: 12, fontSize: 13, cursor: "pointer", fontFamily: T.sans }}>
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

/* ── DONE SCREEN ── */
function DoneScreen({ rating, reset }) {
  const T2 = {
    teal: "#1E88C8", tealDark: "#074D4D", tealMid: "#0E8080",
    tealLight: "#EBF5F5", slate: "#0D1B2A", muted: "#718096",
    border: "#E8E3DA", white: "#FFFFFF", cream: "#FAF8F4", orange: "#F97316",
    serif: "'Cormorant Garamond','Georgia',serif",
    sans: "'Outfit','system-ui',sans-serif",
  };
  return (
    <div style={{ minHeight: "100vh", background: T2.slate, fontFamily: T2.sans, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ background: `linear-gradient(160deg,${T2.tealDark},${T2.tealMid},${T2.teal})`, padding: "36px 24px 28px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏅</div>
              <div>
                <div style={{ fontFamily: T2.serif, fontSize: 15, color: "#fff", fontWeight: 700 }}>SIACC</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}>Star India Accreditation</div>
              </div>
            </div>
            <h1 style={{ fontFamily: T2.serif, fontSize: 24, color: "#fff", fontWeight: 700 }}>Thank You! 🎉</h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.68)", marginTop: 6 }}>Your review helps others trust SIACC</p>
          </div>
        </div>
        <div style={{ background: T2.cream, borderRadius: "28px 28px 0 0", marginTop: -20, padding: "32px 20px 48px" }}>
          <div style={{ width: 80, height: 80, background: `linear-gradient(135deg,${T2.teal},${T2.tealMid})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 20px", boxShadow: `0 0 0 6px ${T2.tealLight}`, animation: "glow 2s ease-in-out infinite" }}>
            🎉
          </div>
          <h2 style={{ fontFamily: T2.serif, fontSize: 24, color: T2.slate, textAlign: "center", marginBottom: 8 }}>Review Submitted!</h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 4, marginBottom: 20 }}>
            {[1, 2, 3, 4, 5].map(s => <span key={s} style={{ fontSize: 24, color: s <= rating ? "#F59E0B" : "#E5E7EB" }}>★</span>)}
          </div>
          <div style={{ background: T2.white, border: `1.5px solid ${T2.border}`, borderRadius: 14, padding: "18px 20px", marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: T2.teal, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Your Impact</div>
            {[
              { icon: "🤝", text: "Helps businesses find trusted compliance partners" },
              { icon: "🌟", text: "Builds community trust in regulatory guidance" },
              { icon: "📈", text: "Supports SIACC's mission to simplify compliance" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "9px 0", borderBottom: i < 2 ? `1px solid ${T2.border}` : "none" }}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                <span style={{ fontSize: 13, color: T2.slate }}>{item.text}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#FEF3DC", border: "1px solid #F5C94E", borderRadius: 12, padding: "14px 16px", display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 24 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>📋</span>
            <div>
              <p style={{ fontSize: 13, color: "#92400E", fontWeight: 700, margin: "0 0 4px" }}>Review text copied to clipboard!</p>
              <p style={{ fontSize: 12, color: "#92400E", lineHeight: 1.65, margin: 0 }}>
                If Google Maps opened — paste your review in the box and tap <strong>Post</strong>. That's it! ✅
              </p>
            </div>
          </div>
          <button onClick={reset} style={{ width: "100%", padding: 15, background: T2.orange, color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: T2.sans }}>
            ⭐ Leave Another Review
          </button>
          <p style={{ textAlign: "center", fontSize: 11, color: T2.muted, marginTop: 16 }}>siacc.vercel.app · +91-9540190334</p>
        </div>
      </div>
    </div>
  );
}