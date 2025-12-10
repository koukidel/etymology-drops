"use client";

import { useState } from "react";
import { Word } from "@/data/types";
import { motion } from "framer-motion";
import { Shield, Lightbulb } from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
    word: Word;
    onNext: () => void;
}

import { expandedWords } from "@/data/expandedWords";

import { useTranslation } from "@/hooks/useTranslation";

export function ProficiencyView({ word, onNext }: Props) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
    const [showHint, setShowHint] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [correctAnswer, setCorrectAnswer] = useState<string>("");
    const { t, language } = useTranslation();

    // Initialize Quiz Data
    useState(() => {
        const a = typeof word.meaning === 'string' ? word.meaning : word.meaning[language];

        // Get 3 random distractors from other words
        const otherWords = expandedWords.filter(w => w.id !== word.id);
        const distractors = otherWords
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(w => typeof w.meaning === 'string' ? w.meaning : w.meaning[language]);

        const opts = [a, ...distractors];
        setCorrectAnswer(a);
        setShuffledOptions(opts.sort(() => Math.random() - 0.5));
    });

    const handleSelect = (option: string) => {
        if (status !== 'idle') return;
        setSelectedOption(option);

        if (option === correctAnswer) {
            setStatus('correct');
            confetti({
                particleCount: 100,
                spread: 70,
                colors: ['#fbbf24', '#f59e0b']
            });
            setTimeout(onNext, 2000);
        } else {
            setStatus('wrong');
            setTimeout(() => {
                setStatus('idle');
                setSelectedOption(null);
            }, 1000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto text-center space-y-8 p-6">
            <div className="flex items-center justify-center gap-2 text-pink-400 font-black uppercase tracking-widest text-sm mb-4">
                <Shield size={16} />
                {t('lesson.proficiency.title')}
            </div>

            {/* The Word - Prominently Displayed */}
            <div className="mb-8">
                <p className="text-slate-400 text-sm uppercase tracking-wider mb-3">{t('lesson.proficiency.question')}</p>
                <h2 className="text-6xl font-black text-white mb-6">{word.word}</h2>

                {/* Hint Button */}
                <button
                    onClick={() => setShowHint(!showHint)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 rounded-lg font-bold text-sm transition-all"
                >
                    <Lightbulb size={16} />
                    {showHint ? t('lesson.proficiency.hide_hint') : t('lesson.proficiency.show_hint')}
                </button>
            </div>

            {/* Hint Panel - Etymological Breakdown */}
            {showHint && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-indigo-950/50 border border-indigo-500/30 rounded-xl p-6 mb-6"
                >
                    <p className="text-indigo-300 text-sm font-bold uppercase tracking-wider mb-3">{t('lesson.proficiency.etymology_breakdown')}</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {word.blocks.map((block, i) => {
                            const blockMeaning = typeof block.meaning === 'string' ? block.meaning : block.meaning[language];
                            return (
                                <div
                                    key={i}
                                    className="bg-indigo-900/50 border border-indigo-500/40 rounded-lg px-4 py-2 text-center"
                                >
                                    <div className="text-indigo-200 font-bold text-lg">{block.label}</div>
                                    <div className="text-indigo-400 text-xs mt-1">{blockMeaning}</div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            )}

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shuffledOptions.map((option, i) => {
                    const isSelected = selectedOption === option;
                    let style = "bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-400 hover:bg-slate-700";

                    if (isSelected) {
                        if (status === 'correct') style = "bg-emerald-500 border-emerald-400 text-white ring-4 ring-emerald-500/50 shadow-xl scale-105";
                        if (status === 'wrong') style = "bg-red-500 border-red-400 text-white animate-shake";
                        if (status === 'idle') style = "bg-indigo-600 border-indigo-500 text-white";
                    }

                    return (
                        <button
                            key={i}
                            onClick={() => handleSelect(option)}
                            disabled={status !== 'idle'}
                            className={`p-4 rounded-xl border-2 font-bold text-lg transition-all duration-200 active:scale-95 ${style}`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
