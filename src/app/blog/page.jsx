"use client";
import dynamic from "next/dynamic";

const BlogScreen = dynamic(() => import("../screens/BlogScreen"), { ssr: false });

export default function Page() {
  return <BlogScreen />;
}
