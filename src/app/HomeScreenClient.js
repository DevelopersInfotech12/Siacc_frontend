"use client";

import dynamic from "next/dynamic";

// Loading skeleton that matches the site's look — prevents blank flash
function HomeLoading() {
  return (
    <div style={{ minHeight: "100vh", background: "#F7FAF8" }}>
      {/* Navbar skeleton */}
      <div style={{
        height: 64,
        background: "#fff",
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 16,
      }}>
        <div style={{ width: 140, height: 32, borderRadius: 6, background: "#E5E7EB", animation: "shimmerSlide 1.4s infinite", backgroundSize: "600px 100%", backgroundImage: "linear-gradient(90deg,#f0f0f0 25%,#e0e8f0 50%,#f0f0f0 75%)" }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: 80, height: 20, borderRadius: 4, background: "#E5E7EB" }} />
        <div style={{ width: 80, height: 20, borderRadius: 4, background: "#E5E7EB" }} />
        <div style={{ width: 80, height: 20, borderRadius: 4, background: "#E5E7EB" }} />
        <div style={{ width: 96, height: 36, borderRadius: 6, background: "#FBDBC4" }} />
      </div>
      {/* Hero skeleton */}
      <div style={{
        height: "calc(100vh - 64px)",
        background: "linear-gradient(135deg,#0C2340 0%,#1E88C8 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        padding: "0 24px",
      }}>
        <div style={{ width: "min(480px,80%)", height: 16, borderRadius: 8, background: "rgba(255,255,255,0.2)" }} />
        <div style={{ width: "min(360px,65%)", height: 40, borderRadius: 8, background: "rgba(255,255,255,0.25)" }} />
        <div style={{ width: "min(400px,70%)", height: 40, borderRadius: 8, background: "rgba(255,255,255,0.18)" }} />
        <div style={{ width: "min(300px,55%)", height: 20, borderRadius: 8, background: "rgba(255,255,255,0.15)", marginTop: 8 }} />
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          <div style={{ width: 140, height: 44, borderRadius: 8, background: "#F97316" }} />
          <div style={{ width: 120, height: 44, borderRadius: 8, background: "rgba(255,255,255,0.2)" }} />
        </div>
      </div>
    </div>
  );
}

const HomeScreen = dynamic(() => import("./screens/HomeScreen"), {
  loading: () => <HomeLoading />,
});

export default function HomeScreenClient() {
  return <HomeScreen />;
}
