"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, Check, Compass } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { CourseGrid } from "@/components/home/CourseGrid";
import { Recommended } from "@/components/home/Recommended";
import { Header } from "@/components/layout/Header";
import { useGameStore, graceAvailable } from "@/store/useGameStore";
import { Intake } from "@/components/onboarding/Intake";
import { FirstRun } from "@/components/onboarding/FirstRun";
import { PathChoice } from "@/components/onboarding/PathChoice";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";
import { allWords } from "@/data/words";
import { findNextLesson } from "@/lib/nextLesson";
import { pickReviewWords } from "@/lib/dailyReview";
import { localDate, localYesterday } from "@/lib/date";

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

// 今日の一歩: the single decision-free entry point. Due reviews + one new
// lesson behind one button; when done, it closes for the day.
function TodayCard() {
  const { t, language } = useTranslation();
  const { masteryLog, masteredWords, lastReviewDate, lastActiveDate, srs, profile } = useGameStore();
  const ja = language === 'ja';
  const today = localDate();

  // Duolingo-style daily goal, sized by the intake commitment. The visible
  // target is what turns "done for today" into "one more".
  const goal = profile?.commitment === 'serious' ? 5 : profile?.commitment === 'steady' ? 3 : 1;
  const todayCount = masteryLog.filter(e => e.date === today).length;
  const goalDots = (
    <span className="inline-flex items-center gap-1" aria-label={`${t('today.goal')} ${todayCount}/${goal}`}>
      {Array.from({ length: goal }, (_, i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: i < todayCount ? 'var(--plate-gold)' : 'color-mix(in srgb, var(--plate-dim) 45%, transparent)' }}
        />
      ))}
    </span>
  );

  const reviews = useMemo(
    () => (lastReviewDate === today ? [] : pickReviewWords(masteryLog, masteredWords, today, 3, srs)),
    [masteryLog, masteredWords, lastReviewDate, today, srs],
  );
  const next = useMemo(() => findNextLesson(masteryLog, masteredWords), [masteryLog, masteredWords]);
  const nextWord = next ? allWords.find(w => w.id === next.lesson.id) : null;

  const done = lastActiveDate === today && reviews.length === 0;
  const fresh = masteredWords.length === 0;

  // Word of the day rides inside the done state, so the card stays the
  // page's single top element.
  const wotd = useMemo(() => {
    const candidates = allWords.filter(w => !masteredWords.includes(w.id));
    if (candidates.length === 0) return null;
    let h = 5381;
    const str = today + 'wotd';
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return candidates[h % candidates.length];
  }, [masteredWords, today]);

  if (done) {
    return (
      <div className="rounded-2xl px-6 py-5" style={{ background: 'var(--plate)', boxShadow: 'var(--plate-ring)' }}>
        <p className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] mb-1" style={{ color: 'var(--plate-gold)' }}>
          {t('today.title')} {goalDots}
        </p>
        <p className="font-serif text-xl mb-3" style={{ color: 'var(--plate-fg)' }}>
          ✓ {t('today.card_done')}
        </p>
        <p className="text-sm mb-3" style={{ color: todayCount >= goal ? 'var(--plate-gold)' : 'var(--plate-body)' }}>
          {todayCount >= goal
            ? `🌸 ${t('today.goal_met')}`
            : t('today.goal_left').replace('{n}', String(goal - todayCount))}
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm">
          {wotd && (
            <Link href={`/lesson/${wotd.id}`} className="hover:opacity-80" style={{ color: 'var(--plate-body)' }}>
              {t('home.wotd')}：<span className="font-serif" style={{ color: 'var(--plate-gold)' }}>{wotd.word}</span>
            </Link>
          )}
          <Link href="/today" className="hover:opacity-80 underline underline-offset-4" style={{ color: 'var(--plate-body)' }}>
            {t('today.one_more')}
          </Link>
        </div>
      </div>
    );
  }

  const contents = [
    reviews.length > 0 ? (ja ? `復習 ${reviews.length}問` : `${reviews.length} reviews`) : null,
    nextWord ? (ja ? `新しい単語「${nextWord.word}」` : `new word “${nextWord.word}”`) : null,
  ].filter(Boolean).join(ja ? ' と ' : ' + ');

  // Came back the day after playing → greet the return, don't re-pitch.
  const cameYesterday = lastActiveDate === localYesterday();

  return (
    <Link
      href="/today"
      className="group flex items-center gap-4 rounded-2xl px-6 py-6 transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
      style={{ background: 'var(--plate)', boxShadow: 'var(--plate-gold-ring)' }}
    >
      <span className="min-w-0">
        <span className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] mb-1" style={{ color: 'var(--plate-gold)' }}>
          {t('today.title')} ・ {t('today.minutes')} {goal > 1 && goalDots}
        </span>
        <span className="block font-serif text-2xl" style={{ color: 'var(--plate-fg)' }}>
          {fresh ? t('today.card_start') : contents}
        </span>
        <span className="block text-sm mt-1" style={{ color: 'var(--plate-body)' }}>
          {cameYesterday ? t('today.yesterday') : t('today.tagline')}
        </span>
      </span>
      <span className="ml-auto text-2xl" style={{ color: 'var(--plate-gold)' }}>→</span>
    </Link>
  );
}

// Evening nudge when the streak is alive but today has no lesson yet:
// lighter than a push notification, sharper than nothing.
function StreakWarning() {
  const { streak, lastActiveDate, graceUsedOn } = useGameStore();
  const { language } = useTranslation();
  const hour = new Date().getHours();
  const yesterday = (() => { const d = new Date(); d.setDate(d.getDate() - 1); return localDate(d); })();

  if (hour < 17 || streak < 1 || lastActiveDate !== yesterday) return null;
  // お休み札 softens the threat honestly: with it in hand tonight is safe,
  // so the nudge invites instead of alarms.
  const hasGrace = graceAvailable(graceUsedOn);
  return (
    <p className="text-sm text-ochre mb-6" role="status">
      {language === 'ja'
        ? (hasGrace
          ? `今日はまだレッスンがありません。休んでもお休み札が連続${streak}日を守りますが、1語だけどうですか？`
          : `連続${streak}日が今夜リセットされます。1レッスンで継続！`)
        : (hasGrace
          ? `No lesson yet today. Your rest ticket will protect the ${streak}-day streak, but how about just one word?`
          : `Your ${streak}-day streak resets tonight. One lesson keeps it alive!`)}
    </p>
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
      className="text-sm text-celebrate mb-6"
    >
      ✓ {t('home.unlocked.toast')}
    </motion.p>
  );
}

export default function Home() {
  const { hasSeenWelcome, hasCompletedIntake, completeIntake, hasSeenOnboarding, hasSeenTutorial } = useGameStore();
  const { t } = useTranslation();

  const isMounted = useMounted();
  const locked = !hasSeenOnboarding;
  // One-time glow handoff onto 今日の一歩 right after the catalog unlocks
  // (same first-visit signal the UnlockToast uses; both read before it writes).
  const [firstUnlockVisit] = useState(
    () => typeof window !== 'undefined' && !localStorage.getItem('minamoto_unlock_toast'));
  // Lesson 0 is chosen, not imposed — its ✓ tracks actual completion, which
  // is no longer the same thing as "funnel finished" (hasSeenOnboarding).
  const [guideDone] = useState(
    () => typeof window !== 'undefined' && !!localStorage.getItem('minamoto_guide_done'));

  if (!isMounted) return null; // Prevent hydration mismatch

  // Duolingo-shaped funnel, one screen at a time, ~6 taps total:
  // 1. FirstRun — value line + the first split (the aha).
  // 2. Intake — two required taps of personalization (no skip: an unset
  //    level silently breaks recommendations forever).
  // 3. PathChoice — the user decides: 種明かし (Lesson 0) or straight in.
  if (!hasSeenWelcome) {
    return <FirstRun />;
  }
  if (!hasCompletedIntake) {
    return <Intake firstRun={locked} onComplete={completeIntake} />;
  }
  if (locked) {
    return <PathChoice />;
  }

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
      done={guideDone}
    />
  );

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <UnlockToast />
        <StreakWarning />

        <div className="mb-8">
          <GlowWrap glow={firstUnlockVisit}>
            <TodayCard />
          </GlowWrap>
        </div>

        <Recommended />

        <CourseGrid />

        {/* Replay the intro pieces anytime — quiet, at the bottom. */}
        <div className="mt-12 space-y-3">
          {tutorialBand}
          {lesson0Band}
          <Link
            href="/stories"
            className="group flex items-center gap-4 rounded-xl px-5 py-4 border border-border bg-card transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/50 active:scale-[0.98]"
          >
            <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full border border-border text-accent">
              <BookOpen size={18} />
            </span>
            <span className="font-serif text-lg text-foreground">{t('home.stories.title')}</span>
            <span className="ml-auto text-accent">→</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
