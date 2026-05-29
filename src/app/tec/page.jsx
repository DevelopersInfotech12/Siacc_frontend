"use client";
import dynamic from "next/dynamic";

const TECScreen = dynamic(() => import("../screens/TECScreen"), { loading: () => <div style={{minHeight:"100vh",background:"#F7FAF8"}} /> });

export default function Page() {
  return <TECScreen />;
}
