"use client";
import dynamic from "next/dynamic";

const CareerScreen = dynamic(() => import("../screens/CareerScreen"), { loading: () => <div style={{minHeight:"100vh",background:"#F7FAF8"}} /> });

export default function Page() {
  return <CareerScreen />;
}
