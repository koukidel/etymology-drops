"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { ProficiencyView } from "@/components/lesson/views/ProficiencyView";
import { pickReviewWords } from "@/lib/dailyReview";
import { localDate } from "@/lib/date";
import { findNextLesson } from "@/lib/nextLesson";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";

export default function ReviewPage() {
    const { t } = useTranslation();
    const {
        masteryLog, masteredWords, lastReviewDate, srs,
        completeReview, recordReviewResult, recordMiss,
    } = useGameStore();
    const mounted = useMounted();
    const [index, setIndex] = useState(0);
    const [finished, setFinished] = useState(false);

    // SRS-due words first. Deps exclude `srs` deliberately: answering updates
    // srs mid-session, and the picked set must not reshuffle under the user.
    // masteryLog/masteredWords only change via lessons, so recomputes happen
    // exactly once — after the store rehydrates.
    const words = useMemo(
        () => pickReviewWords(masteryLog, masteredWords, localDate(), 3, srs),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [masteryLog, masteredWords],
    );

    const nextLesson = useMemo(
        () => findNextLesson(masteryLog, masteredWords),
        [masteryLog, masteredWords],
    );

    if (!mounted) return null;

    const doneToday = lastReviewDate === localDate();
    const nothingToReview = words.length === 0;

    if (finished || doneToday || nothingToReview) {
        const empty = nothingToReview && !finished && !doneToday;
        return (
            <div className="min-h-screen">
                <Header />
                <main className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-6 p-4 border border-border rounded-full"
                    >
                        <Check size={28} className="text-foreground" />
                    </motion.div>
                    <h1 className="font-serif text-3xl text-foreground mb-2">
                        {empty ? t("review.empty.title") : t("review.done.title")}
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        {empty ? t("review.empty.body") : t("review.done.body")}
                    </p>
                    <div className="flex flex-col items-center gap-4">
                        {nextLesson && (
                            <Link
                                href={`/lesson/${nextLesson.lesson.id}`}
                                className="px-8 py-2.5 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
                            >
                                {t("review.next_lesson")}
                            </Link>
                        )}
                        <Link href="/" className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4">
                            {t("speedrun.back")}
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const current = words[index];

    const handleResult = (correct: boolean) => {
        recordReviewResult(current.id, correct);
        if (!correct) {
            recordMiss(current.blocks.map(b => b.id));
        }
    };

    const next = () => {
        if (index + 1 < words.length) {
            setIndex(i => i + 1);
        } else {
            completeReview();
            setFinished(true);
        }
    };

    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-2xl mx-auto px-4 py-10">
                <div className="flex items-baseline justify-between mb-10">
                    <h1 className="font-serif text-2xl text-foreground">{t("review.title")}</h1>
                    <span className="text-sm tabular-nums text-muted-foreground">
                        {index + 1} / {words.length}
                    </span>
                </div>
                {/* key remounts the quiz per word */}
                <ProficiencyView key={current.id} word={current} onNext={next} onResult={handleResult} />
            </main>
        </div>
    );
}
