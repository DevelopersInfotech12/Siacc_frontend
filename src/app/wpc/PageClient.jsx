"use client";
import dynamic from "next/dynamic";
const WPCScreen = dynamic(() => import("../screens/WPCScreen"), { loading: () => <div style={{minHeight:"100vh",background:"#F7FAF8"}} /> });
export default function Page() { return <WPCScreen />; }
