"use client";
import dynamic from "next/dynamic";

const ContactScreen = dynamic(() => import("../screens/ContactScreen"), { ssr: false });

export default function Page() {
  return <ContactScreen />;
}
