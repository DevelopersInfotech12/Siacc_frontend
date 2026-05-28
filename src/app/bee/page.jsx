"use client";
import dynamic from "next/dynamic";

const BEEScreen = dynamic(() => import("../screens/BEEScreen"), { ssr: false });

export default function Page() {
  return <BEEScreen />;
}
