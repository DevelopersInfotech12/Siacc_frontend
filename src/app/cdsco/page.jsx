"use client";
import dynamic from "next/dynamic";

const CDSCOScreen = dynamic(() => import("../screens/CDSCOScreen"), { loading: () => <div style={{minHeight:"100vh",background:"#F7FAF8"}} /> });

export default function Page() {
  return <CDSCOScreen />;
}
