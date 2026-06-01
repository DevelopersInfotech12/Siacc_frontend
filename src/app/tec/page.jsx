import dynamic from "next/dynamic";

export const metadata = {
  title: "TEC / MTCTE Certification for Telecom Products - Siacc India",
  description: "Get TEC MTCTE certification for telecom and networking products in India. Fast approval by expert consultants.",
  alternates: { canonical: "/tec" },
};

const TECScreen = dynamic(() => import("../screens/TECScreen"), {
  loading: () => <div style={{ minHeight: "100vh", background: "#F7FAF8" }} />,
});

export default function Page() { return <TECScreen />; }
