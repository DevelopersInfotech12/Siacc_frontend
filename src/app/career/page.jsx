"use client";
import dynamic from "next/dynamic";

const CareerScreen = dynamic(() => import("../screens/CareerScreen"), { ssr: false });

export default function Page() {
  return <CareerScreen />;
}
