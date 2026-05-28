"use client";
import dynamic from "next/dynamic";

const BISScreen = dynamic(() => import("../screens/BISScreen"), { ssr: false });

export default function Page() {
  return <BISScreen />;
}
