"use client";
import { useState } from "react";
import Image from 'next/image';

const T = {
  teal:"#1E88C8",tealDark:"#074D4D",tealMid:"#0E8080",
  tealLight:"#EBF5F5",amber:"#C8780A",amberLight:"#FEF3DC",
  slate:"#0D1B2A",body:"#2D3748",muted:"#718096",
  border:"#E8E3DA",white:"#FFFFFF",cream:"#FAF8F4",
  orange:"#F97316",
  serif:"'Cormorant Garamond','Georgia',serif",
  sans:"'Outfit','system-ui',sans-serif",
};

const REVIEW_URL  = "https://siacc.vercel.app/review";
const QR_IMG      = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(REVIEW_URL)}&color=074D4D&bgcolor=FAF8F4&margin=14&qzone=2`;

export default function QRPage() {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard?.writeText(REVIEW_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{minHeight:"100vh",background:T.cream,fontFamily:T.sans,padding:"40px 16px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

        @keyframes fadeUp  {from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer {0%{background-position:-300% 0}100%{background-position:300% 0}}
        @keyframes pulse   {0%,100%{transform:scale(1);opacity:0.7}50%{transform:scale(1.5);opacity:0}}

        .card {
          background:${T.white};
          border-radius:28px;
          max-width:400px;width:100%;
          box-shadow:0 24px 64px rgba(13,27,42,0.10),0 4px 16px rgba(30,136,200,0.06);
          border:1px solid ${T.border};
          overflow:hidden;
          animation:fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
          position:relative;
        }

        /* shimmer top bar */
        .top-bar{
          height:4px;
          background:linear-gradient(90deg,${T.teal},${T.tealMid},${T.amber},${T.teal});
          background-size:300% 100%;
          animation:shimmer 3s linear infinite;
        }

        /* QR wrapper */
        .qr-wrap{
          position:relative;
          display:inline-block;
          padding:12px;
          background:${T.cream};
          border-radius:20px;
          border:2px solid ${T.border};
        }
        .qr-wrap img{
          width:220px;height:220px;
          border-radius:12px;display:block;
        }

        /* Corner markers */
        .corner{position:absolute;width:20px;height:20px;border-style:solid;}
        .corner.tl{top:4px;left:4px;border-width:3px 0 0 3px;border-radius:5px 0 0 0;border-color:${T.teal};}
        .corner.tr{top:4px;right:4px;border-width:3px 3px 0 0;border-radius:0 5px 0 0;border-color:${T.teal};}
        .corner.bl{bottom:4px;left:4px;border-width:0 0 3px 3px;border-radius:0 0 0 5px;border-color:${T.teal};}
        .corner.br{bottom:4px;right:4px;border-width:0 3px 3px 0;border-radius:0 0 5px 0;border-color:${T.teal};}

        /* Pulse ring */
        .pulse-ring{
          position:absolute;top:50%;left:50%;
          width:24px;height:24px;
          border-radius:50%;
          border:2px solid ${T.teal};
          transform:translate(-50%,-50%);
          animation:pulse 1.6s ease-out infinite;
        }

        /* Link box */
        .link-box{
          display:flex;align-items:center;gap:10px;
          background:${T.cream};border:1.5px solid ${T.border};
          border-radius:10px;padding:11px 14px;
          cursor:pointer;transition:border-color 0.2s;
        }
        .link-box:hover{border-color:${T.teal};}

        /* How it works steps */
        .step{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-bottom:1px solid ${T.border};}
        .step:last-child{border-bottom:none;}
        .step-num{width:28px;height:28px;border-radius:8px;background:${T.teal};color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;}

        /* Print button */
        .btn-print{
          width:100%;padding:14px;background:${T.orange};color:#fff;
          border:none;border-radius:12px;font-size:14px;font-weight:700;
          cursor:pointer;font-family:${T.sans};
          transition:all 0.2s;
          display:flex;align-items:center;justify-content:center;gap:8px;
        }
        .btn-print:hover{background:#EA6A0A;transform:translateY(-1px);box-shadow:0 6px 20px rgba(249,115,22,0.30);}

        /* Feature badges */
        .badge{
          display:inline-flex;align-items:center;gap:5px;
          background:${T.tealLight};border:1px solid #B2DADA;
          border-radius:999px;padding:4px 12px;
          font-size:11px;font-weight:600;color:${T.teal};
        }

        @media print {
          body{background:white;}
          .no-print{display:none!important;}
          .card{box-shadow:none;border:2px solid ${T.border};}
        }
      `}</style>

      <div className="card">
        {/* Shimmer top bar */}
        <div className="top-bar"/>

        {/* Header */}
        <div style={{padding:"28px 28px 0",textAlign:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:T.tealLight,border:`1px solid #B2DADA`,borderRadius:999,padding:"5px 14px",marginBottom:16}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:T.teal,display:"inline-block"}}/>
            <span style={{fontSize:11,fontWeight:700,color:T.teal,letterSpacing:"0.1em",textTransform:"uppercase"}}>Star India Accreditation</span>
          </div>
          <h1 style={{fontFamily:T.serif,fontSize:24,color:T.slate,fontWeight:700,marginBottom:6,lineHeight:1.2}}>
            Share Your Experience ⭐
          </h1>
          <p style={{fontSize:13,color:T.muted,lineHeight:1.6,marginBottom:20}}>
            Scan the QR code — our AI will help you write the perfect review in seconds
          </p>

          {/* Feature badges */}
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:6,marginBottom:24}}>
            {["✨ AI Suggestions","⭐ Rate 1–5","📋 Auto-copy","🚀 30 seconds"].map(b=>(
              <span key={b} className="badge">{b}</span>
            ))}
          </div>
        </div>

        {/* QR Code — centrepiece */}
        <div style={{display:"flex",justifyContent:"center",padding:"0 28px 24px"}}>
          <div className="qr-wrap">
            <span className="corner tl"/><span className="corner tr"/>
            <span className="corner bl"/><span className="corner br"/>
            <div className="pulse-ring"/>
            <Image src={QR_IMG} alt="Scan to leave a review" unoptimized />
          </div>
        </div>

        {/* Stars display */}
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:4}}>
            {[1,2,3,4,5].map(s=><span key={s} style={{fontSize:20,color:"#F59E0B"}}>★</span>)}
          </div>
          <p style={{fontSize:12,color:T.muted}}>10,000+ Happy Clients · 5.0 on Google</p>
        </div>

        <div style={{padding:"0 24px 28px",display:"flex",flexDirection:"column",gap:16}}>

          {/* How it works */}
          <div style={{background:T.cream,border:`1px solid ${T.border}`,borderRadius:14,padding:"16px 18px"}}>
            <div style={{fontSize:11,fontWeight:700,color:T.slate,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>How it works</div>
            {[
              {icon:"📱",text:"Scan QR code → Review page opens on your phone"},
              {icon:"⭐",text:"Tap your star rating (1–5)"},
              {icon:"✨",text:"AI generates 9 personalised review suggestions"},
              {icon:"✏️",text:"Pick one, edit if you like, tap Post on Google"},
            ].map((s,i,arr)=>(
              <div key={i} className="step">
                <div className="step-num">{i+1}</div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  <span style={{fontSize:16}}>{s.icon}</span>
                  <span style={{fontSize:13,color:T.body,lineHeight:1.55}}>{s.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Copy link */}
          <div className="link-box" onClick={copyLink}>
            <span style={{fontSize:16}}>🔗</span>
            <span style={{fontSize:12,color:T.muted,flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
              siacc.vercel.app/review
            </span>
            <span style={{fontSize:12,fontWeight:700,color:copied ? "#10B981" : T.teal,flexShrink:0}}>
              {copied ? "✓ Copied!" : "Copy Link"}
            </span>
          </div>

          {/* Print */}
          <button className="btn-print no-print" onClick={()=>window.print()}>
            🖨️ Print This QR Card
          </button>

          {/* Footer */}
          <p style={{textAlign:"center",fontSize:11,color:T.muted}}>
            siacc.vercel.app · info@siacc.co.in · +91-9540190334
          </p>
        </div>
      </div>
    </div>
  );
}