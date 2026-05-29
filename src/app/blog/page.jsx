"use client";
import dynamic from "next/dynamic";

const BlogScreen = dynamic(() => import("../screens/BlogScreen"), { loading: () => <div style={{minHeight:"100vh",background:"#F7FAF8"}} /> });

export default function Page() {
  return <BlogScreen />;
}
