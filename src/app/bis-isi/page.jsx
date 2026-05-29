"use client";
import dynamic from "next/dynamic";

const BISISIScreen = dynamic(() => import("../screens/BISISIScreen"), { loading: () => <div style={{minHeight:"100vh",background:"#F7FAF8"}} /> });

export default function Page() {
  return <BISISIScreen />;
}
