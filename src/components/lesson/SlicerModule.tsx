"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Word } from "@/data/types";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    word: Word;
    onComplete?: () => void;
    /** If set, the hint blink runs automatically after this many ms of inactivity, repeating until cut. */
    autoHintMs?: number;
    /** Overrides the continue-button label on the completion view. */
    completeLabel?: string;
}

export function SlicerModule({ word, onComplete, autoHintMs, completeLabel }: Props) {
    const [foundCuts, setFoundCuts] = useState<number[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [hintActive, setHintActive] = useState(false);
    const [wrongCut, setWrongCut] = useState<number | null>(null);
    const { t, language } = useTranslation();

    useEffect(() => {
        if (!autoHintMs || isComplete) return;
        const timer = setInterval(() => {
            setHintActive(true);
            setTimeout(() => setHintActive(false), 1400);
        }, autoHintMs);
        return () => clearInterval(timer);
    }, [autoHintMs, isComplete, foundCuts]);

    // Valid cut positions fall between blocks; labels spell the word.
    const cuts = useMemo(() => {
        let currentLen = 0;
        const validCuts: number[] = [];
        for (let i = 0; i < word.blocks.length - 1; i++) {
            currentLen += word.blocks[i].label.replace(/-/g, '').length;
            validCuts.push(currentLen);
        }
        return validCuts;
    }, [word]);

    const handleCut = (index: number) => {
        if (foundCuts.includes(index)) return;
        // Not a seam: flash the tapped gap red so the mistake is felt.
        if (!cuts.includes(index)) {
            setWrongCut(index);
            setTimeout(() => setWrongCut(null), 450);
            return;
        }

        const newFound = [...foundCuts, index];
        setFoundCuts(newFound);
        if (newFound.length === cuts.length) {
            setIsComplete(true);
        }
    };

    const showHint = () => {
        setHintActive(true);
        setTimeout(() => setHintActive(false), 1200);
    };

    if (isComplete) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 flex flex-col items-center"
            >
                <div className="flex flex-wrap items-stretch justify-center gap-3 mb-10">
                    {word.blocks.map((b, i) => {
                        const blockMeaning = typeof b.meaning === 'string' ? b.meaning : b.meaning[language];
                        return (
                            <div key={i} className="border border-border bg-card rounded-lg px-5 py-3 min-w-24">
                                <div className={`font-serif text-2xl ${b.type === 'root' ? 'text-accent' : 'text-foreground'}`}>
                                    {b.label.replace(/-/g, '')}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">{blockMeaning}</div>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={() => onComplete && onComplete()}
                    className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
                >
                    {completeLabel ?? t('lesson.slicer.continue')}
                </button>
            </motion.div>
        );
    }

    return (
        <section className="text-center py-8">
            <motion.div
                animate={wrongCut !== null ? { x: [0, -5, 5, -3, 3, 0] } : {}}
                transition={{ duration: 0.35 }}
                className="flex flex-wrap items-center justify-center gap-y-8 select-none py-10"
            >
                {word.word.split('').map((char, i) => {
                    const cutIndex = i + 1;
                    const isLast = i === word.word.length - 1;
                    const isFound = foundCuts.includes(cutIndex);
                    const isHinted = hintActive && cuts.includes(cutIndex) && !isFound;

                    return (
                        <div key={i} className="flex items-center">
                            <span className="font-serif text-5xl sm:text-6xl text-foreground">
                                {char}
                            </span>

                            {!isLast && (
                                <button
                                    onClick={() => handleCut(cutIndex)}
                                    aria-label={`Cut after letter ${i + 1}`}
                                    className="w-6 h-16 mx-0.5 cursor-pointer flex items-center justify-center group relative"
                                >
                                    {isFound ? (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: '100%' }}
                                            className="w-px bg-accent"
                                        />
                                    ) : (
                                        <div className={`w-1 h-1 rounded-full transition-all ${
                                            wrongCut === cutIndex
                                                ? "bg-error scale-[2.5]"
                                                : isHinted ? "bg-accent scale-150" : "bg-border group-hover:bg-accent/50"
                                        }`} />
                                    )}
                                </button>
                            )}
                        </div>
                    );
                })}
            </motion.div>

            <div className="flex items-center justify-center gap-6 mt-6">
                <p className="text-sm text-muted-foreground">{t('lesson.slicer.tap_gaps')}</p>
                <button
                    onClick={showHint}
                    className="text-sm text-accent hover:opacity-80 transition-opacity underline underline-offset-4"
                >
                    {t('lesson.slicer.hint')}
                </button>
            </div>
        </section>
    );
}
