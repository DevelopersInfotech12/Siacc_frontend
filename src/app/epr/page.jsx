"use client";
import dynamic from "next/dynamic";

const EPRScreen = dynamic(() => import("../screens/EPRScreen"), { loading: () => <div style={{minHeight:"100vh",background:"#F7FAF8"}} /> });

export default function Page() {
  return <EPRScreen />;
}
