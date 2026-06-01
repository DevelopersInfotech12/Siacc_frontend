"use client";
import dynamic from "next/dynamic";
const BEEScreen = dynamic(() => import("../screens/BEEScreen"), { loading: () => <div style={{minHeight:"100vh",background:"#F7FAF8"}} /> });
export default function Page() { return <BEEScreen />; }
