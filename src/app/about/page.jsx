import dynamic from "next/dynamic";

const AboutScreen = dynamic(() => import("../screens/AboutScreen"), { ssr: false });

export default function Page() {
  return <AboutScreen />;
}
