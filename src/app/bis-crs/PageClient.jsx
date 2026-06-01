"use client";
import dynamic from "next/dynamic";
const BISCRSScreen = dynamic(() => import("../screens/BISCRSScreen"), { loading: () => <div style={{minHeight:"100vh",background:"#F7FAF8"}} /> });
export default function Page() { return <BISCRSScreen />; }
