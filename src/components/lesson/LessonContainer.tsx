"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Word } from "@/data/types";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowLeft } from "lucide-react";

import { PrimingView } from "./views/PrimingView";
import { SlicerView } from "./views/SlicerView";
import { ProficiencyView } from "./views/ProficiencyView";

import { useGameStore, currentStreak } from "@/store/useGameStore";
import { findCourseByLesson } from "@/data/courses";
import { allWords } from "@/data/words";
import { DERIVATIVES } from "@/data/derivatives";
import { useTranslation } from "@/hooks/useTranslation";
import { dayHash } from "@/lib/dailyReview";
import { localDate } from "@/lib/date";
import { Bird } from "@/components/ui/Bird";

// Praise rotates deterministically per word so the reward moment doesn't
// wear out. (Duolingo's lesson: repetition kills celebration.)
const PRAISE = {
    ja: ["習得しました", "お見事", "その調子", "また一歩、語源に近づきました", "いい切れ味です"],
    en: ["Word learned", "Well done", "Keep it up", "One step deeper into etymology", "A clean slice"],
} as const;

const MILESTONES = [10, 50, 100, 200];

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

    const { unlockWord, masterWord, recordLessonComplete, masteredWords, masteryLog, streak, lastActiveDate, recordMiss } = useGameStore();

    const localized = (s: string | { en: string; ja: string }) =>
        typeof s === 'string' ? s : s[language];

    // Other words built from this word's parts: lesson words first, then curated derivatives.
    const related = useMemo<RelatedEntry[]>(() => {
        const out: RelatedEntry[] = [];
        const seen = new Set<string>([word.word.toLowerCase()]);
        // Roots carry the meaning, so surface root-family words before the
        // (often very common) prefix/suffix siblings.
        const orderedBlocks = [...word.blocks].sort((a, b) =>
            (a.type === 'root' ? 0 : 1) - (b.type === 'root' ? 0 : 1));
        for (const block of orderedBlocks) {
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

    // Lesson words that became fully buildable thanks to THIS lesson's parts:
    // buildable with the parts owned after it, but not with the parts before.
    // Whole words only; their decompositions stay hidden (no spoilers).
    const newlyBuildable = useMemo(() => {
        const partsOf = (ids: string[]) => {
            const s = new Set<string>();
            for (const id of ids) {
                const w = allWords.find(x => x.id === id);
                if (w) for (const b of w.blocks) s.add(b.id);
            }
            return s;
        };
        const withThis = masteredWords.includes(word.id) ? masteredWords : [...masteredWords, word.id];
        const after = partsOf(withThis);
        const before = partsOf(withThis.filter(id => id !== word.id));
        return allWords
            .filter(w =>
                w.id !== word.id &&
                w.blocks.every(b => after.has(b.id)) &&
                !w.blocks.every(b => before.has(b.id)))
            .slice(0, 4);
    }, [masteredWords, word]);

    const handleNext = () => {
        if (viewIndex < 2) {
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
        setViewIndex(3);
    };

    // Learning order: decompose → predict meaning → story reveal.
    const STEPS = [t('lesson.steps.practice'), t('lesson.steps.mastery'), t('lesson.steps.priming')];

    // Completion
    if (viewIndex === 3) {
        const lang = language === 'ja' ? 'ja' : 'en';
        const praise = PRAISE[lang][dayHash(word.id) % PRAISE[lang].length];
        const milestone = MILESTONES.includes(masteredWords.length) ? masteredWords.length : null;
        const todayCount = masteryLog.filter(e => e.date === localDate()).length;
        const activeStreak = currentStreak(streak, lastActiveDate);
        // Parts first met in this word (in none of the other mastered words).
        const otherParts = new Set(
            masteredWords.filter(id => id !== word.id)
                .flatMap(id => allWords.find(w => w.id === id)?.blocks.map(b => b.id) ?? []));
        const newParts = word.blocks.filter(b => !otherParts.has(b.id));

        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 max-w-xl mx-auto">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-8 p-4 border border-border rounded-full"
                >
                    {courseDone ? <Bird size={32} /> : <Check size={32} className="text-foreground" />}
                </motion.div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {courseDone ? t('lesson.complete.course') : praise}
                </p>
                <h2 className="font-serif text-5xl text-foreground mb-3">{word.word}</h2>
                <p className="text-muted-foreground mb-2">{t('lesson.complete.subtitle')}</p>

                {milestone && (
                    <p className="text-sm text-ochre mb-2">
                        {t('lesson.complete.milestone').replace('{n}', String(milestone))}
                    </p>
                )}

                {newParts.length > 0 && (
                    <p className="flex items-center flex-wrap justify-center gap-1.5 text-sm text-muted-foreground mb-2">
                        <span>{t('lesson.complete.new_parts')}</span>
                        {newParts.map(b => (
                            <span
                                key={b.id}
                                className="rounded-full px-2.5 py-0.5 font-serif"
                                style={b.type === 'root'
                                    ? { backgroundColor: 'var(--chip-root-bg)', color: 'var(--chip-root-fg)' }
                                    : { backgroundColor: 'var(--chip-prefix-bg)', color: 'var(--chip-prefix-fg)' }}
                            >
                                {b.label.replace(/-/g, '')}
                            </span>
                        ))}
                    </p>
                )}

                <p className="text-xs text-muted-foreground mb-8">
                    {t('lesson.complete.today')
                        .replace('{words}', String(todayCount))
                        .replace('{days}', String(Math.max(1, activeStreak)))}
                </p>

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

                {newlyBuildable.length > 0 && (
                    <div className="w-full pb-5 mb-8 border-b border-border text-left">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-3">
                            {t('lesson.complete.buildable')}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            {newlyBuildable.map(w => (
                                <span key={w.id} className="rounded-full border border-border px-3 py-1 font-serif text-lg text-foreground">
                                    {w.word}
                                </span>
                            ))}
                            <Link
                                href="/practice/build"
                                className="text-sm text-accent hover:opacity-80 underline underline-offset-4 ml-1"
                            >
                                {t('lesson.complete.try_build')}
                            </Link>
                        </div>
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
            {/* Progress — visited steps are tappable to go back */}
            <div className="flex items-center justify-between px-2 mb-8 w-full max-w-2xl">
                {STEPS.map((step, i) => {
                    const visited = i < viewIndex;
                    return (
                        <button
                            key={i}
                            type="button"
                            onClick={() => visited && setViewIndex(i)}
                            disabled={!visited}
                            aria-label={step}
                            className={`flex flex-col items-center relative z-10 ${visited ? "cursor-pointer" : "cursor-default"}`}
                        >
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors duration-500
                                ${i <= viewIndex ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}
                            `}>
                                {i < viewIndex ? <Check size={14} /> : i + 1}
                            </div>
                            <span className={`text-xs mt-2 transition-opacity ${i === viewIndex ? "text-foreground" : "text-muted-foreground"}`}>
                                {step}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Back to the previous stage */}
            <div className="w-full max-w-2xl mb-2 h-6">
                {viewIndex > 0 && (
                    <button
                        type="button"
                        onClick={() => setViewIndex(prev => Math.max(0, prev - 1))}
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={14} /> {t('lesson.back')}
                    </button>
                )}
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
                        {viewIndex === 0 && <SlicerView word={word} onNext={handleNext} />}
                        {viewIndex === 1 && (
                            <ProficiencyView
                                word={word}
                                onNext={handleNext}
                                onResult={correct => { if (!correct) recordMiss(word.blocks.map(b => b.id)); }}
                            />
                        )}
                        {viewIndex === 2 && <PrimingView word={word} onNext={handleNext} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
