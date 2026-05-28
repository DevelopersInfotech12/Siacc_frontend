"use client";
import dynamic from "next/dynamic";

const EPRScreen = dynamic(() => import("../screens/EPRScreen"), { ssr: false });

export default function Page() {
  return <EPRScreen />;
}
