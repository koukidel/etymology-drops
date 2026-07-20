"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { ProficiencyView } from "@/components/lesson/views/ProficiencyView";
import { LessonContainer } from "@/components/lesson/LessonContainer";
import { Bird } from "@/components/ui/Bird";
import { pickReviewWords } from "@/lib/dailyReview";
import { findNextLesson } from "@/lib/nextLesson";
import { localDate } from "@/lib/date";
import { allWords } from "@/data/words";
import { useGameStore, currentStreak } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";

// 今日の一歩: the one-button daily session. Due reviews (up to 3), then one
// new lesson, on a single progress bar. About three minutes, then done.
// The user never chooses what to study; the app carries the plan.

export default function TodayPage() {
    const { t } = useTranslation();
    const {
        masteryLog, masteredWords, lastReviewDate, srs, streak, lastActiveDate,
        completeReview, recordReviewResult, recordMiss,
    } = useGameStore();
    const mounted = useMounted();
    const [reviewIndex, setReviewIndex] = useState(0);
    const [reviewsDone, setReviewsDone] = useState(false);
    const [finished, setFinished] = useState(false);

    // The plan is FROZEN at session start. It must not react to store
    // changes: finishing the lesson updates masteredWords, and a reactive
    // plan would swap the completion screen for the next lesson mid-view.
    type Plan = { reviews: ReturnType<typeof pickReviewWords>; lessonWord: (typeof allWords)[number] | null };
    const [plan, setPlan] = useState<Plan | null>(null);

    useEffect(() => {
        if (!mounted || plan) return;
        // rAF defers past the persist rehydration microtask and keeps the
        // set out of the effect's synchronous body (lint rule).
        const id = requestAnimationFrame(() => {
            const reviews = lastReviewDate === localDate()
                ? []
                : pickReviewWords(masteryLog, masteredWords, localDate(), 3, srs);
            const next = findNextLesson(masteryLog, masteredWords);
            const lessonWord = next ? allWords.find(w => w.id === next.lesson.id) ?? null : null;
            setPlan({ reviews, lessonWord });
        });
        return () => cancelAnimationFrame(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted, plan]);

    if (!mounted || !plan) return null;

    // もう一歩: after finishing, run one more lesson-only round.
    const oneMore = () => {
        const next = findNextLesson(masteryLog, masteredWords);
        const lessonWord = next ? allWords.find(w => w.id === next.lesson.id) ?? null : null;
        setPlan({ reviews: [], lessonWord });
        setReviewIndex(0);
        setReviewsDone(true);
        setFinished(false);
    };

    const totalSteps = plan.reviews.length + (plan.lessonWord ? 1 : 0);
    const currentStep = finished
        ? totalSteps
        : reviewsDone || plan.reviews.length === 0
            ? plan.reviews.length
            : reviewIndex;

    // Nothing to do at all (everything mastered, nothing due).
    const empty = totalSteps === 0;

    if (finished || empty) {
        const activeStreak = currentStreak(streak, lastActiveDate);
        const todayCount = masteryLog.filter(e => e.date === localDate()).length;
        return (
            <div className="min-h-screen">
                <Header />
                <main className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
                    <div className="mb-6"><Bird size={40} /></div>
                    <h1 className="font-serif text-3xl text-foreground mb-2">{t("today.done_title")}</h1>
                    <p className="text-muted-foreground mb-2">{t("today.done_body")}</p>
                    <p className="text-xs text-muted-foreground mb-8">
                        {t('lesson.complete.today')
                            .replace('{words}', String(todayCount))
                            .replace('{days}', String(Math.max(1, activeStreak)))}
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        <Link href="/" className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity">
                            {t("speedrun.back")}
                        </Link>
                        <div className="flex items-center gap-6 text-sm">
                            <button onClick={oneMore} className="text-accent hover:opacity-80 underline underline-offset-4">
                                {t("today.one_more")}
                            </button>
                            <Link href="/practice/build" className="text-muted-foreground hover:text-accent underline underline-offset-4">
                                {t("today.challenge_link")}
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    const inReviews = !reviewsDone && plan.reviews.length > 0 && reviewIndex < plan.reviews.length;
    const current = inReviews ? plan.reviews[reviewIndex] : null;

    const handleReviewResult = (correct: boolean) => {
        if (!current) return;
        recordReviewResult(current.id, correct);
        if (!correct) recordMiss(current.blocks.map(b => b.id));
    };

    const nextReview = () => {
        if (reviewIndex + 1 < plan.reviews.length) {
            setReviewIndex(i => i + 1);
        } else {
            completeReview();
            setReviewsDone(true);
            if (!plan.lessonWord) setFinished(true);
        }
    };

    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-2xl mx-auto px-4 py-8">
                {/* One session, one progress bar. */}
                <div className="flex items-center gap-3 mb-8">
                    <span className="font-serif text-lg text-foreground whitespace-nowrap">{t("today.title")}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                            className="h-full bg-accent"
                            animate={{ width: `${(currentStep / Math.max(1, totalSteps)) * 100}%` }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>
                    <span className="text-xs tabular-nums text-muted-foreground whitespace-nowrap">
                        {Math.min(currentStep + 1, totalSteps)} / {totalSteps}
                    </span>
                </div>

                {inReviews && current ? (
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center mb-6">
                            {t("review.title")}
                        </p>
                        <ProficiencyView
                            key={current.id}
                            word={current}
                            onNext={nextReview}
                            onResult={handleReviewResult}
                        />
                    </div>
                ) : plan.lessonWord ? (
                    <LessonContainer
                        key={plan.lessonWord.id}
                        word={plan.lessonWord}
                        onFinished={() => setFinished(true)}
                    />
                ) : null}
            </main>
        </div>
    );
}
