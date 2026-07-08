"use client";

import Link from "next/link";
import { Zap, BookOpen, Check } from "lucide-react";
import { CourseGrid } from "@/components/home/CourseGrid";
import { ExamShowcase } from "@/components/home/ExamShowcase";
import { Recommended } from "@/components/home/Recommended";
import { Header } from "@/components/layout/Header";
import { useGameStore } from "@/store/useGameStore";
import { Intake } from "@/components/onboarding/Intake";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";

export default function Home() {
  const { hasCompletedIntake, completeIntake, hasSeenOnboarding } = useGameStore();
  const { t } = useTranslation();

  const isMounted = useMounted();

  if (!isMounted) return null; // Prevent hydration mismatch

  if (!hasCompletedIntake) {
    return <Intake onComplete={completeIntake} />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Time Attack — quick-play, above everything */}
        <Link
          href="/speedrun"
          className="group flex items-center gap-4 mb-10 rounded-xl px-5 py-4 transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: "#3c4a34", boxShadow: "inset 0 0 0 1px #cba24c33" }}
        >
          <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full" style={{ color: "#d4a94a", boxShadow: "inset 0 0 0 1px #d4a94a66" }}>
            <Zap size={18} />
          </span>
          <span className="min-w-0">
            <span className="block font-serif text-lg" style={{ color: "#e8e0cc" }}>{t('home.speedrun.title')}</span>
            <span className="block text-sm truncate" style={{ color: "#b9b59a" }}>{t('home.speedrun.desc')}</span>
          </span>
          <span className="ml-auto" style={{ color: "#d4a94a" }}>→</span>
        </Link>

        <h1 className="font-serif text-3xl text-foreground mb-8">{t('home.courses')}</h1>

        {/* Lesson 0 — the guided walkthrough, always replayable */}
        <Link
          href="/guide"
          className="group flex items-center gap-4 mb-4 rounded-xl px-5 py-4 transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: "#3c4a34", boxShadow: "inset 0 0 0 1px #cba24c33" }}
        >
          <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full" style={{ color: "#d4a94a", boxShadow: "inset 0 0 0 1px #d4a94a66" }}>
            <BookOpen size={18} />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-2">
              <span className="font-serif text-lg" style={{ color: "#e8e0cc" }}>{t('home.lesson0.title')}</span>
              {hasSeenOnboarding && (
                <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: "#a9ac8e" }}>
                  <Check size={12} /> {t('home.lesson0.done')}
                </span>
              )}
            </span>
            <span className="block text-sm truncate" style={{ color: "#b9b59a" }}>{t('home.lesson0.desc')}</span>
          </span>
          <span className="ml-auto" style={{ color: "#d4a94a" }}>→</span>
        </Link>

        <Recommended />

        <CourseGrid />

        <ExamShowcase />
      </main>
    </div>
  );
}
