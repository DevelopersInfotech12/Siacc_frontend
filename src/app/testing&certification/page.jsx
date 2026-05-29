"use client";
import dynamic from "next/dynamic";

const TestingScreen = dynamic(() => import("../screens/TestingScreen"), { loading: () => <div style={{minHeight:"100vh",background:"#F7FAF8"}} /> });

export default function Page() {
  return <TestingScreen />;
}
