"use client";
import dynamic from "next/dynamic";

const ISOScreen = dynamic(() => import("../screens/ISOScreen"), { ssr: false });

export default function Page() {
  return <ISOScreen />;
}
