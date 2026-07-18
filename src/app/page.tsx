"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, Check, Compass, RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CourseGrid } from "@/components/home/CourseGrid";
import { Recommended } from "@/components/home/Recommended";
import { Header } from "@/components/layout/Header";
import { useGameStore } from "@/store/useGameStore";
import { Intake } from "@/components/onboarding/Intake";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";
import { allWords } from "@/data/words";
import { findNextLesson } from "@/lib/nextLesson";
import { pickReviewWords } from "@/lib/dailyReview";

// Pulsing halo that animates OPACITY of a pre-shadowed layer (compositor
// friendly) instead of animating box-shadow itself (paint-heavy on mobile).
function GlowWrap({ glow, children }: { glow: boolean; children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (!glow) return <>{children}</>;
  return (
    <div className="relative">
      <motion.div
        aria-hidden
        className="absolute -inset-1 rounded-2xl pointer-events-none"
        style={{ boxShadow: "0 0 24px 6px rgba(227,180,79,0.5)" }}
        animate={reduce ? { opacity: 0.55 } : { opacity: [0.1, 0.65, 0.1] }}
        transition={reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

// Shared plate band for the two funnel steps (あそびかた / Lesson 0).
function FunnelBand({ href, icon, title, done }: {
  href: string; icon: React.ReactNode; title: string; done: boolean;
}) {
  const { t } = useTranslation();
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 rounded-xl px-5 py-4 transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
      style={{ background: "var(--plate)", boxShadow: "var(--plate-ring)" }}
    >
      <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full" style={{ color: "var(--plate-gold)", boxShadow: "var(--plate-gold-ring)" }}>
        {icon}
      </span>
      <span className="min-w-0 flex items-center gap-2">
        <span className="font-serif text-lg" style={{ color: "var(--plate-fg)" }}>{title}</span>
        {done && (
          <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: "var(--plate-dim)" }}>
            <Check size={12} /> {t('home.lesson0.done')}
          </span>
        )}
      </span>
      <span className="ml-auto" style={{ color: "var(--plate-gold)" }}>→</span>
    </Link>
  );
}

// One primary resume action: the next unfinished lesson in the course the
// learner touched most recently (fallback: the first unfinished course).
function ContinueCard() {
  const { t } = useTranslation();
  const { masteryLog, masteredWords } = useGameStore();

  const target = useMemo(() => findNextLesson(masteryLog, masteredWords), [masteryLog, masteredWords]);

  if (!target) return null;
  const word = allWords.find(w => w.id === target.lesson.id);
  const fresh = masteredWords.length === 0;

  return (
    <Link
      href={`/lesson/${target.lesson.id}`}
      className="group flex items-center gap-4 rounded-2xl px-6 py-5 transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
      style={{ background: "var(--plate)", boxShadow: "var(--plate-gold-ring)" }}
    >
      <span className="min-w-0">
        <span className="block text-[11px] uppercase tracking-[0.18em] mb-1" style={{ color: "var(--plate-gold)" }}>
          {fresh ? t('home.continue.start') : t('home.continue.label')}
        </span>
        <span className="block font-serif text-2xl truncate" style={{ color: "var(--plate-fg)" }}>
          {word ? word.word : target.lesson.label}
        </span>
      </span>
      <span className="ml-auto text-xl" style={{ color: "var(--plate-gold)" }}>→</span>
    </Link>
  );
}

// Daily review band: up to three words mastered on earlier days, once a day.
function ReviewBand() {
  const { t } = useTranslation();
  const { masteryLog, masteredWords, lastReviewDate } = useGameStore();

  const today = new Date().toISOString().slice(0, 10);
  const words = useMemo(
    () => pickReviewWords(masteryLog, masteredWords, today),
    [masteryLog, masteredWords, today],
  );

  if (words.length === 0 || lastReviewDate === today) return null;
  return (
    <Link
      href="/review"
      className="group flex items-center gap-4 rounded-xl px-5 py-4 transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
      style={{ background: "var(--plate)", boxShadow: "var(--plate-ring)" }}
    >
      <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full" style={{ color: "var(--plate-gold)", boxShadow: "var(--plate-gold-ring)" }}>
        <RotateCcw size={18} />
      </span>
      <span className="font-serif text-lg" style={{ color: "var(--plate-fg)" }}>
        {t('home.review.title')}
      </span>
      <span className="ml-auto flex items-center gap-3">
        <span className="text-xs tabular-nums" style={{ color: "var(--plate-dim)" }}>{words.length}</span>
        <span style={{ color: "var(--plate-gold)" }}>→</span>
      </span>
    </Link>
  );
}

// One-time celebration when Lesson 0 unlocks the catalog. Rendered only
// after mount (the page early-returns until then), so localStorage is safe.
function UnlockToast() {
  const { t } = useTranslation();
  const [show, setShow] = useState(() => !localStorage.getItem('minamoto_unlock_toast'));
  useEffect(() => {
    if (!show) return;
    localStorage.setItem('minamoto_unlock_toast', '1');
    const id = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(id);
  }, [show]);
  if (!show) return null;
  return (
    <motion.p
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-sm text-accent mb-6"
    >
      ✓ {t('home.unlocked.toast')}
    </motion.p>
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

  // First-run funnel: あそびかた glows first, then Lesson 0; everything else
  // stays visible but locked until Lesson 0 is done.
  const locked = !hasSeenOnboarding;

  const tutorialBand = (
    <FunnelBand
      href="/tutorial"
      icon={<Compass size={18} />}
      title={t('home.tutorial.title')}
      done={hasSeenTutorial}
    />
  );
  const lesson0Band = (
    <FunnelBand
      href="/guide"
      icon={<BookOpen size={18} />}
      title={t('home.lesson0.title')}
      done={hasSeenOnboarding}
    />
  );

  if (locked) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-3xl mx-auto px-6 py-12">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            {t('home.firstrun.hint')}
          </p>
          <div className="space-y-4">
            <GlowWrap glow={!hasSeenTutorial}>{tutorialBand}</GlowWrap>
            <GlowWrap glow={hasSeenTutorial}>{lesson0Band}</GlowWrap>
          </div>

          {/* The catalog stays visible but locked until Lesson 0 is done. */}
          <div className="mt-12 pointer-events-none select-none">
            <CourseGrid locked />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <UnlockToast />

        <div className="mb-8 space-y-3">
          <ContinueCard />
          <ReviewBand />
        </div>

        <Recommended />

        <CourseGrid />

        {/* Replay the intro pieces anytime — quiet, at the bottom. */}
        <div className="mt-12 space-y-3">
          {tutorialBand}
          {lesson0Band}
        </div>
      </main>
    </div>
  );
}
