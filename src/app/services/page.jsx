"use client";
import dynamic from "next/dynamic";

const ServicesScreen = dynamic(() => import("../screens/ServicesScreen"), { ssr: false });

export default function Page() {
  return <ServicesScreen />;
}
