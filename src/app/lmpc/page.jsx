"use client";
import dynamic from "next/dynamic";

const LMPCScreen = dynamic(() => import("../screens/LMPCScreen"), { loading: () => <div style={{minHeight:"100vh",background:"#F7FAF8"}} /> });

export default function Page() {
  return <LMPCScreen />;
}
