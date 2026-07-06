"use client";

import { useState } from "react";
import Link from "next/link";
import { Word } from "@/data/types";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

import { PrimingView } from "./views/PrimingView";
import { SlicerView } from "./views/SlicerView";
import { MatrixView } from "./views/MatrixView";
import { ProficiencyView } from "./views/ProficiencyView";

import { useGameStore } from "@/store/useGameStore";
import { CAMPAIGN_LEVELS } from "@/data/campaignLevels";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    word: Word;
}

export function LessonContainer({ word }: Props) {
    const [viewIndex, setViewIndex] = useState(0);
    const [nextLessonId, setNextLessonId] = useState<string | null>(null);
    const { t } = useTranslation();

    const { unlockWord, masterWord, recordLessonComplete } = useGameStore();

    const handleNext = () => {
        if (viewIndex < 3) {
            setViewIndex(prev => prev + 1);
            return;
        }
        // Final stage passed: record progress and unlock the next campaign level.
        masterWord(word.id);
        recordLessonComplete();

        const levelIndex = CAMPAIGN_LEVELS.findIndex(l => l.id === word.id);
        if (levelIndex !== -1 && levelIndex < CAMPAIGN_LEVELS.length - 1) {
            const nextLevel = CAMPAIGN_LEVELS[levelIndex + 1];
            unlockWord(nextLevel.id);
            setNextLessonId(nextLevel.id);
        }
        setViewIndex(4);
    };

    const STEPS = [t('lesson.steps.priming'), t('lesson.steps.practice'), t('lesson.steps.synthesis'), t('lesson.steps.mastery')];

    // Completion
    if (viewIndex === 4) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mb-8 p-4 border border-border rounded-full"
                >
                    <Check size={32} className="text-foreground" />
                </motion.div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{t('lesson.complete.title')}</p>
                <h2 className="font-serif text-5xl text-foreground mb-3">{word.word}</h2>
                <p className="text-muted-foreground mb-10">{t('lesson.complete.subtitle')}</p>

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
