"use client";
import dynamic from "next/dynamic";
const BISScreen = dynamic(() => import("../screens/BISScreen"), { loading: () => <div style={{minHeight:"100vh",background:"#F7FAF8"}} /> });
export default function Page() { return <BISScreen />; }
