"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Word } from "@/data/types";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

import { PrimingView } from "./views/PrimingView";
import { SlicerView } from "./views/SlicerView";
import { MatrixView } from "./views/MatrixView";
import { ProficiencyView } from "./views/ProficiencyView";

import { useGameStore } from "@/store/useGameStore";
import { findCourseByLesson } from "@/data/courses";
import { allWords } from "@/data/words";
import { DERIVATIVES } from "@/data/derivatives";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    word: Word;
}

interface RelatedEntry {
    word: string;
    gloss: string;
    href?: string;
}

export function LessonContainer({ word }: Props) {
    const [viewIndex, setViewIndex] = useState(0);
    const [nextLessonId, setNextLessonId] = useState<string | null>(null);
    const [courseDone, setCourseDone] = useState(false);
    const { t, language } = useTranslation();

    const { unlockWord, masterWord, recordLessonComplete } = useGameStore();

    const localized = (s: string | { en: string; ja: string }) =>
        typeof s === 'string' ? s : s[language];

    // Other words built from this word's parts: lesson words first, then curated derivatives.
    const related = useMemo<RelatedEntry[]>(() => {
        const out: RelatedEntry[] = [];
        const seen = new Set<string>([word.word.toLowerCase()]);
        for (const block of word.blocks) {
            for (const w of allWords) {
                if (w.id === word.id || seen.has(w.word.toLowerCase())) continue;
                if (w.blocks.some(b => b.id === block.id)) {
                    seen.add(w.word.toLowerCase());
                    out.push({ word: w.word, gloss: localized(w.meaning), href: `/lesson/${w.id}` });
                }
            }
            for (const d of DERIVATIVES[block.id] ?? []) {
                if (seen.has(d.word.toLowerCase())) continue;
                seen.add(d.word.toLowerCase());
                out.push({ word: d.word, gloss: localized(d.gloss) });
            }
        }
        return out.slice(0, 6);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [word, language]);

    const handleNext = () => {
        if (viewIndex < 3) {
            setViewIndex(prev => prev + 1);
            return;
        }
        // Final stage passed: record progress and open the next lesson in this course.
        masterWord(word.id);
        recordLessonComplete();

        const course = findCourseByLesson(word.id);
        if (course) {
            const index = course.lessons.findIndex(l => l.id === word.id);
            const next = course.lessons[index + 1];
            if (next) {
                unlockWord(next.id);
                setNextLessonId(next.id);
            } else {
                setCourseDone(true);
            }
        }
        setViewIndex(4);
    };

    const STEPS = [t('lesson.steps.priming'), t('lesson.steps.practice'), t('lesson.steps.synthesis'), t('lesson.steps.mastery')];

    // Completion
    if (viewIndex === 4) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 max-w-xl mx-auto">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-8 p-4 border border-border rounded-full"
                >
                    <Check size={32} className="text-foreground" />
                </motion.div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {courseDone ? t('lesson.complete.course') : t('lesson.complete.title')}
                </p>
                <h2 className="font-serif text-5xl text-foreground mb-3">{word.word}</h2>
                <p className="text-muted-foreground mb-8">{t('lesson.complete.subtitle')}</p>

                {related.length > 0 && (
                    <div className="w-full border-y border-border py-5 mb-8 text-left">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                            {t('lesson.complete.related')}
                        </p>
                        <ul className="space-y-2">
                            {related.map(r => (
                                <li key={r.word} className="flex items-baseline gap-3">
                                    {r.href ? (
                                        <Link href={r.href} className="font-serif text-lg text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors shrink-0">
                                            {r.word}
                                        </Link>
                                    ) : (
                                        <span className="font-serif text-lg text-foreground shrink-0">{r.word}</span>
                                    )}
                                    <span className="text-sm text-muted-foreground truncate">{r.gloss}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex flex-col items-center gap-4">
                    {nextLessonId && (
                        <Link
                            href={`/lesson/${nextLessonId}`}
                            className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
                        >
                            {t('lesson.complete.continue')}
                        </Link>
                    )}
                    <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                        {t('lesson.complete.back')}
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center px-4 py-8">
            {/* Progress */}
            <div className="flex items-center justify-between px-2 mb-8 w-full max-w-2xl">
                {STEPS.map((step, i) => (
                    <div key={i} className="flex flex-col items-center relative z-10">
                        <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-500
                            ${i <= viewIndex ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}
                        `}>
                            {i < viewIndex ? <Check size={14} /> : i + 1}
                        </div>
                        <span className={`text-xs mt-2 transition-opacity ${i === viewIndex ? "text-foreground" : "text-muted-foreground"}`}>
                            {step}
                        </span>
                    </div>
                ))}
            </div>

            <div className="w-full max-w-4xl flex-1 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={viewIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full h-full flex flex-col justify-center"
                    >
                        {viewIndex === 0 && <PrimingView word={word} onNext={handleNext} />}
                        {viewIndex === 1 && <SlicerView word={word} onNext={handleNext} />}
                        {viewIndex === 2 && <MatrixView word={word} onNext={handleNext} />}
                        {viewIndex === 3 && <ProficiencyView word={word} onNext={handleNext} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
