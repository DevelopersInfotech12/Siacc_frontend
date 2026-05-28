"use client";
import dynamic from "next/dynamic";

const TestingScreen = dynamic(() => import("../screens/TestingScreen"), { ssr: false });

export default function Page() {
  return <TestingScreen />;
}
