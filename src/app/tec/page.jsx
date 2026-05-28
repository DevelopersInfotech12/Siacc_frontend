"use client";
import dynamic from "next/dynamic";

const TECScreen = dynamic(() => import("../screens/TECScreen"), { ssr: false });

export default function Page() {
  return <TECScreen />;
}
