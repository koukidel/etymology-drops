"use client";

import { CampaignPath } from "@/components/campaign/CampaignPath";
import { Header } from "@/components/layout/Header";
import { useGameStore } from "@/store/useGameStore";
import { Onboarding } from "@/components/onboarding/Onboarding";
import { useMounted } from "@/hooks/useMounted";
import { useRouter } from "next/navigation";

export default function Home() {
  const { hasSeenOnboarding, completeOnboarding } = useGameStore();

  const isMounted = useMounted();
  const router = useRouter();

  if (!isMounted) return null; // Prevent hydration mismatch

  if (!hasSeenOnboarding) {
    return <Onboarding onComplete={() => {
      completeOnboarding();
      router.push('/lesson/breakfast');
    }} />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <CampaignPath />
      </main>
    </div>
  );
}
