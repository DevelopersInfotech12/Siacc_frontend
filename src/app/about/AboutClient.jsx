"use client";

import dynamic from "next/dynamic";

const AboutScreen = dynamic(
  () => import("../screens/AboutScreen"),
  {
    loading: () => <div style={{ minHeight: "100vh", background: "#F7FAF8" }} />,
  }
);

export default function AboutClient() {
  return <AboutScreen />;
}
