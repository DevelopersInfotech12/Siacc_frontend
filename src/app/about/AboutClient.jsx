"use client";

import dynamic from "next/dynamic";

const AboutScreen = dynamic(
  () => import("../screens/AboutScreen"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function AboutClient() {
  return <AboutScreen />;
}