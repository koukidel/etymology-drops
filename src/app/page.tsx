"use client";

import Link from "next/link";
import { Zap, BookOpen, Check, Compass } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CourseGrid } from "@/components/home/CourseGrid";
import { ExamShowcase } from "@/components/home/ExamShowcase";
import { Recommended } from "@/components/home/Recommended";
import { Header } from "@/components/layout/Header";
import { useGameStore } from "@/store/useGameStore";
import { Intake } from "@/components/onboarding/Intake";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";

// Time Attack quick-play card. Dimmed + non-interactive while locked.
function TimeAttackCard({ disabled = false }: { disabled?: boolean }) {
  const { t } = useTranslation();
  return (
    <Link
      href="/speedrun"
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      className={`group flex items-center gap-4 rounded-xl px-5 py-4 transition-transform ${disabled ? "pointer-events-none opacity-50" : "hover:-translate-y-0.5"}`}
      style={{ background: "var(--plate)", boxShadow: "var(--plate-ring)" }}
    >
      <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full" style={{ color: "var(--plate-gold)", boxShadow: "var(--plate-gold-ring)" }}>
        <Zap size={18} />
      </span>
      <span className="min-w-0">
        <span className="block font-serif text-lg" style={{ color: "var(--plate-fg)" }}>{t('home.speedrun.title')}</span>
        <span className="block text-sm truncate" style={{ color: "var(--plate-body)" }}>{t('home.speedrun.desc')}</span>
      </span>
      <span className="ml-auto" style={{ color: "var(--plate-gold)" }}>→</span>
    </Link>
  );
}

// Lesson 0 — the guided walkthrough, always replayable. Glows to draw the
// eye on first run, when it is the only thing the user can open.
function Lesson0Band({ glow = false, done = false }: { glow?: boolean; done?: boolean }) {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const card = (
    <Link
      href="/guide"
      className="group flex items-center gap-4 rounded-xl px-5 py-4 transition-transform hover:-translate-y-0.5"
      style={{ background: "var(--plate)", boxShadow: "var(--plate-ring)" }}
    >
      <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full" style={{ color: "var(--plate-gold)", boxShadow: "var(--plate-gold-ring)" }}>
        <BookOpen size={18} />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="font-serif text-lg" style={{ color: "var(--plate-fg)" }}>{t('home.lesson0.title')}</span>
          {done && (
            <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: "var(--plate-dim)" }}>
              <Check size={12} /> {t('home.lesson0.done')}
            </span>
          )}
        </span>
        <span className="block text-sm truncate" style={{ color: "var(--plate-body)" }}>{t('home.lesson0.desc')}</span>
      </span>
      <span className="ml-auto" style={{ color: "var(--plate-gold)" }}>→</span>
    </Link>
  );

  if (!glow) return card;

  // A pulsing gold halo (static ring when reduced motion is preferred).
  return (
    <motion.div
      className="rounded-xl"
      animate={reduce ? undefined : {
        boxShadow: [
          "0 0 0 0 rgba(227,180,79,0.0)",
          "0 0 26px 5px rgba(227,180,79,0.5)",
          "0 0 0 0 rgba(227,180,79,0.0)",
        ],
      }}
      transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      style={reduce ? { boxShadow: "0 0 18px 3px rgba(227,180,79,0.45)" } : undefined}
    >
      {card}
    </motion.div>
  );
}

// The guided section tour. Glows to draw the eye until it's been taken.
function TutorialBand({ glow = false, done = false }: { glow?: boolean; done?: boolean }) {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const card = (
    <Link
      href="/tutorial"
      className="group flex items-center gap-4 rounded-xl px-5 py-4 transition-transform hover:-translate-y-0.5"
      style={{ background: "var(--plate)", boxShadow: "var(--plate-ring)" }}
    >
      <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full" style={{ color: "var(--plate-gold)", boxShadow: "var(--plate-gold-ring)" }}>
        <Compass size={18} />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="font-serif text-lg" style={{ color: "var(--plate-fg)" }}>{t('home.tutorial.title')}</span>
          {done && (
            <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: "var(--plate-dim)" }}>
              <Check size={12} /> {t('home.tutorial.done')}
            </span>
          )}
        </span>
        <span className="block text-sm truncate" style={{ color: "var(--plate-body)" }}>{t('home.tutorial.desc')}</span>
      </span>
      <span className="ml-auto" style={{ color: "var(--plate-gold)" }}>→</span>
    </Link>
  );

  if (!glow) return card;

  return (
    <motion.div
      className="rounded-xl"
      animate={reduce ? undefined : {
        boxShadow: [
          "0 0 0 0 rgba(227,180,79,0.0)",
          "0 0 26px 5px rgba(227,180,79,0.5)",
          "0 0 0 0 rgba(227,180,79,0.0)",
        ],
      }}
      transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      style={reduce ? { boxShadow: "0 0 18px 3px rgba(227,180,79,0.45)" } : undefined}
    >
      {card}
    </motion.div>
  );
}

export default function Home() {
  const { hasCompletedIntake, completeIntake, hasSeenOnboarding, hasSeenTutorial } = useGameStore();
  const { t } = useTranslation();

  const isMounted = useMounted();

  if (!isMounted) return null; // Prevent hydration mismatch

  if (!hasCompletedIntake) {
    return <Intake onComplete={completeIntake} />;
  }

  // Until Lesson 0 is done, it is the only thing the user can open.
  const locked = !hasSeenOnboarding;

  if (locked) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-3xl mx-auto px-6 py-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            {t('home.firstrun.hint')}
          </p>
          <Lesson0Band glow />

          {/* Everything else stays visible but locked until Lesson 0 is done. */}
          <div className="mt-12 pointer-events-none select-none space-y-8">
            <TimeAttackCard disabled />
            <div>
              <h1 className="font-serif text-3xl text-foreground mb-8">{t('home.courses')}</h1>
              <CourseGrid locked />
            </div>
            <ExamShowcase locked />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10">
          <TimeAttackCard />
        </div>

        <h1 className="font-serif text-3xl text-foreground mb-8">{t('home.courses')}</h1>

        <div className="mb-4">
          <Lesson0Band done={hasSeenOnboarding} />
        </div>

        <div className="mb-4">
          <TutorialBand glow={!hasSeenTutorial} done={hasSeenTutorial} />
        </div>

        <Recommended />

        <CourseGrid />

        <ExamShowcase />
      </main>
    </div>
  );
}
