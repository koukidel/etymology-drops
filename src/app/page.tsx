"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
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

        <Link
          href="/speedrun"
          className="group flex items-center gap-4 mb-8 rounded-xl border border-border bg-card px-5 py-4 hover:border-accent transition-colors"
        >
          <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full border border-border text-accent group-hover:border-accent transition-colors">
            <Zap size={18} />
          </span>
          <span className="min-w-0">
            <span className="block font-serif text-lg text-foreground">{t('home.speedrun.title')}</span>
            <span className="block text-sm text-muted-foreground truncate">{t('home.speedrun.desc')}</span>
          </span>
          <span className="ml-auto text-accent">→</span>
        </Link>

        <CourseGrid />
      </main>
    </div>
  );
}
