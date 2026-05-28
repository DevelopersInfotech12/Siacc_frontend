"use client";
import dynamic from "next/dynamic";

const BISISIScreen = dynamic(() => import("../screens/BISISIScreen"), { ssr: false });

export default function Page() {
  return <BISISIScreen />;
}
