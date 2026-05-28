"use client";

import dynamic from "next/dynamic";

const HomeScreen = dynamic(() => import("./screens/HomeScreen"), { ssr: false });

export default function HomeScreenClient() {
  return <HomeScreen />;
}