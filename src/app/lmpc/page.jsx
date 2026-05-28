"use client";
import dynamic from "next/dynamic";

const LMPCScreen = dynamic(() => import("../screens/LMPCScreen"), { ssr: false });

export default function Page() {
  return <LMPCScreen />;
}
