"use client";
import dynamic from "next/dynamic";

const WPCScreen = dynamic(() => import("../screens/WPCScreen"), { ssr: false });

export default function Page() {
  return <WPCScreen />;
}
