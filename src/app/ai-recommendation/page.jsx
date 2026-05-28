import dynamic from "next/dynamic";

const AIRecommendationScreen = dynamic(() => import("../screens/AIRecommendationScreen"), { ssr: false });

export const metadata = { title: "AI Certification Advisor | SIACC", description: "Get instant AI-powered certification recommendations for your product in India." };

export default function AIRecommendation() {
  return <AIRecommendationScreen />;
}
