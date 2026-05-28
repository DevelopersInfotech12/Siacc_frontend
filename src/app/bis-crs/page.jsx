"use client";
import dynamic from "next/dynamic";

const BISCRSScreen = dynamic(() => import("../screens/BISCRSScreen"), { ssr: false });

export default function Page() {
  return <BISCRSScreen />;
}
