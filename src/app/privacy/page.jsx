"use client";
import dynamic from "next/dynamic";

const PrivacyScreen = dynamic(() => import("../screens/PrivacyScreen"), { ssr: false });

export default function Page() {
  return <PrivacyScreen />;
}
