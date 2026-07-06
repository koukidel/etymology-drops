"use client";

import { CampaignPath } from "@/components/campaign/CampaignPath";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useTranslation } from "@/hooks/useTranslation";
import { useGameStore, currentStreak } from "@/store/useGameStore";
import { Onboarding } from "@/components/onboarding/Onboarding";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { t } = useTranslation();
  const { hasSeenOnboarding, completeOnboarding, streak, lastActiveDate } = useGameStore();

  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevent hydration mismatch

  if (!hasSeenOnboarding) {
    return <Onboarding onComplete={() => {
      completeOnboarding();
      router.push('/lesson/breakfast');
    }} />;
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="px-6 py-6 flex items-center justify-between sticky top-0 z-50 bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-2xl font-black text-white">E</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">{t('app.title')}</h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide">{t('app.subtitle')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {currentStreak(streak, lastActiveDate) > 0 && (
            <span className="text-sm text-slate-500">
              {currentStreak(streak, lastActiveDate)}
            </span>
          )}
        </div>
      </header>

      {/* Campaign Path */}
      <div className="px-4 mt-8 pb-24">
        <CampaignPath />
      </div>
    </main>
  );
}
