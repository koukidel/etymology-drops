"use client";

import { useRef, useState } from "react";
import { Word } from "@/data/types";
import { motion } from "framer-motion";
import { allWords } from "@/data/words";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    word: Word;
    onNext: () => void;
    /** Reports the FIRST answer only: true if it was correct on the first try. */
    onResult?: (firstTryCorrect: boolean) => void;
}

const shuffle = <T,>(a: T[]): T[] => [...a].sort(() => Math.random() - 0.5);

export function ProficiencyView({ word, onNext, onResult }: Props) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
    const [showHint, setShowHint] = useState(false);
    const answered = useRef(false);
    const { t, language } = useTranslation();

    const [{ options, correctAnswer }] = useState(() => {
        const meaningOf = (w: Word) => (typeof w.meaning === 'string' ? w.meaning : w.meaning[language]);
        const answer = meaningOf(word);

        // Distractors prefer words sharing a part with the target, so telling
        // them apart requires reading the parts — the quiz itself trains the
        // etymological habit instead of rewarding surface guessing.
        const partIds = new Set(word.blocks.map(b => b.id));
        const related = allWords.filter(w => w.id !== word.id && w.blocks.some(b => partIds.has(b.id)));
        const unrelated = allWords.filter(w => w.id !== word.id && !w.blocks.some(b => partIds.has(b.id)));

        const distractors: string[] = [];
        for (const w of [...shuffle(related), ...shuffle(unrelated)]) {
            const m = meaningOf(w);
            if (m !== answer && !distractors.includes(m)) distractors.push(m);
            if (distractors.length === 3) break;
        }

        return {
            options: shuffle([answer, ...distractors]),
            correctAnswer: answer,
        };
    });

    const handleSelect = (option: string) => {
        if (status !== 'idle') return;
        setSelectedOption(option);

        const correct = option === correctAnswer;
        if (!answered.current) {
            answered.current = true;
            onResult?.(correct);
        }

        if (correct) {
            setStatus('correct');
            setTimeout(onNext, 1200);
        } else {
            setStatus('wrong');
            // Open the part hints: the recovery path is "read the parts",
            // not "guess again".
            setShowHint(true);
            setTimeout(() => {
                setStatus('idle');
                setSelectedOption(null);
            }, 900);
        }
    };

    return (
        <div className="max-w-xl mx-auto text-center space-y-10 px-4">
            <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    {t('lesson.proficiency.question')}
                </p>
                <h2 className="font-serif text-5xl text-foreground mb-6">{word.word}</h2>

                <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-sm text-accent hover:opacity-80 transition-opacity underline underline-offset-4"
                >
                    {showHint ? t('lesson.proficiency.hide_hint') : t('lesson.proficiency.show_hint')}
                </button>
            </div>

            {showHint && (
                <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap gap-3 justify-center"
                >
                    {word.blocks.map((block, i) => {
                        const blockMeaning = typeof block.meaning === 'string' ? block.meaning : block.meaning[language];
                        return (
                            <div key={i} className="border border-border bg-card rounded-lg px-4 py-2">
                                <div className="font-serif text-lg text-foreground">{block.label}</div>
                                <div className="text-xs text-muted-foreground mt-0.5">{blockMeaning}</div>
                            </div>
                        );
                    })}
                </motion.div>
            )}

            <motion.div
                animate={status === 'wrong' ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 gap-3 text-left"
            >
                {options.map((option, i) => {
                    const isSelected = selectedOption === option;
                    let style = "border-border bg-card text-foreground hover:border-muted-foreground";

                    if (isSelected) {
                        if (status === 'correct') style = "border-foreground bg-foreground text-background";
                        if (status === 'wrong') style = "border-error text-error";
                        if (status === 'idle') style = "border-foreground";
                    }

                    return (
                        <button
                            key={i}
                            onClick={() => handleSelect(option)}
                            disabled={status !== 'idle'}
                            className={`px-5 py-4 rounded-lg border transition-colors ${style}`}
                        >
                            {option}
                        </button>
                    );
                })}
            </motion.div>
        </div>
    );
}
