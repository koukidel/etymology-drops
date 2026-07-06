"use client";

import { CourseGrid } from "@/components/home/CourseGrid";
import { Header } from "@/components/layout/Header";
import { useGameStore } from "@/store/useGameStore";
import { GuidedOnboarding } from "@/components/onboarding/GuidedOnboarding";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";

export default function Home() {
  const { hasSeenOnboarding, completeOnboarding } = useGameStore();
  const { t } = useTranslation();

  const isMounted = useMounted();

  if (!isMounted) return null; // Prevent hydration mismatch

  if (!hasSeenOnboarding) {
    return <GuidedOnboarding onComplete={completeOnboarding} />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="font-serif text-3xl text-foreground mb-8">{t('home.courses')}</h1>
        <CourseGrid />
      </main>
    </div>
  );
}
