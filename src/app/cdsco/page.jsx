"use client";
import dynamic from "next/dynamic";

const CDSCOScreen = dynamic(() => import("../screens/CDSCOScreen"), { ssr: false });

export default function Page() {
  return <CDSCOScreen />;
}
