"use client";
import dynamic from "next/dynamic";

const ServicesScreen = dynamic(() => import("../screens/ServicesScreen"), { loading: () => <div style={{minHeight:"100vh",background:"#F7FAF8"}} /> });

export default function Page() {
  return <ServicesScreen />;
}
