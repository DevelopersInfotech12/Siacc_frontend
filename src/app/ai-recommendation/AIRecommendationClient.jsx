"use client";

import dynamic from "next/dynamic";

const AIRecommendationScreen = dynamic(
  () => import("../screens/AIRecommendationScreen"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function AIRecommendationClient() {
  return <AIRecommendationScreen />;
}