"use client";

import { useState } from "react";
import { Question } from "@/lib/lessonGenerator";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import { useGameStore } from "@/store/useGameStore";
import { playSnap, playSuccess, playError, playLevelUp } from "@/lib/audio";
import { useRouter } from "next/navigation";
import { levels } from "@/data/levels";
import { CraftingTable } from "@/components/crafting-lab/CraftingTable";
import { BuilderQuestion } from "./BuilderQuestion";
// Reusing for construction!

interface QuizEngineProps {
    questions: Question[];
    levelId?: string;
    isPracticeMode?: boolean;
    onPracticeNext?: () => void;
}

export const QuizEngine = ({ questions, levelId, isPracticeMode = false, onPracticeNext }: QuizEngineProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showHint, setShowHint] = useState(false);
    // For construction, we might not need local state if we reuse CraftingTable in a smart way
    // For now, let's implement Meaning Match logic here

    const router = useRouter();
    const { addXp, unlockLevel } = useGameStore();

    const currentQuestion = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    const handleOptionSelect = (option: string) => {
        if (isAnswered && isCorrect) return; // Prevent changing after correct

        const correctMeaning = typeof currentQuestion.word.meaning === 'string'
            ? currentQuestion.word.meaning
            : currentQuestion.word.meaning.en;

        const correct = option === correctMeaning;

        if (isPracticeMode) {
            if (correct) {
                setIsAnswered(true);
                setIsCorrect(true);
                playSuccess();
            } else {
                playError();
                // Optional: Shake animation or toast
            }
            return;
        }

        // Normal Mode
        if (isAnswered) return;
        setIsAnswered(true);
        setIsCorrect(correct);

        if (correct) {
            playSuccess();
        } else {
            playError();
        }
    };

    const handleNext = () => {
        if (isPracticeMode) {
            // Check for Paywall Limit (3 questions for free users)
            const { isPremium, setShowPaywall } = useGameStore.getState();
            // currentIndex is 0-indexed. So 0, 1, 2 are free. Index 2 is the 3rd question.
            // When user clicks "Next" on index 2, they are trying to go to index 3 (4th question).
            if (!isPremium && currentIndex >= 2) {
                setShowPaywall(true, 'manual'); // Using 'manual' as a generic trigger for now, or add 'drill_limit'
                return;
            }

            if (onPracticeNext) {
                onPracticeNext();
            } else {
                // Infinite loop within provided questions?
                setCurrentIndex(prev => (prev + 1) % questions.length);
            }
            setIsAnswered(false);
            setIsCorrect(false);
            setShowHint(false);
            playSnap();
            return;
        }

        if (isLast) {
            // Finish Lesson
            playLevelUp();
            addXp(50);
            // Check for story unlock
            if (levelId) {
                const currentLevel = levels.find(l => l.id === levelId);
                if (currentLevel?.storyId) {
                    router.push(`/story/${currentLevel.storyId}`);
                } else {
                    router.push('/path');
                }
            } else {
                router.push('/path');
            }
        } else {
            setCurrentIndex(prev => prev + 1);
            setIsAnswered(false);
            setIsCorrect(false);
            playSnap();
        }
    };

    return (
        <div className="w-full max-w-md mx-auto h-full flex flex-col relative">
            {/* Progress Bar - Hide in Practice Mode or show infinite? */}
            {!isPracticeMode && (
                <div className="w-full h-2 bg-slate-200 rounded-full mb-8">
                    <motion.div
                        className="h-full bg-indigo-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex) / questions.length) * 100}%` }}
                    />
                </div>
            )}

            {/* Content Switcher */}
            <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full"
                    >
                        {/* HEADER */}
                        <div className="text-center mb-8 relative">
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                {currentQuestion.type === 'meaning_match' ? "Choose the meaning" : "Build the word"}
                            </h2>
                            <div className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-xl border border-indigo-100 mb-4">
                                {currentQuestion.word.word}
                            </div>

                            {/* Hint Button */}
                            {isPracticeMode && (
                                <div className="mt-2">
                                    <button
                                        onClick={() => setShowHint(!showHint)}
                                        className="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center justify-center gap-1 mx-auto transition-colors"
                                    >
                                        <span className="bg-slate-100 px-2 py-1 rounded-md">?</span>
                                        {showHint ? "Hide Hint" : "Show Hint"}
                                    </button>
                                    <AnimatePresence>
                                        {showHint && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-sm text-slate-600 mt-2 bg-yellow-50 p-3 rounded-lg border border-yellow-100 max-w-xs mx-auto"
                                            >
                                                <span className="font-bold">Etymology:</span> {typeof currentQuestion.word.history === 'string' ? currentQuestion.word.history : currentQuestion.word.history.en}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* QUESTION BODY */}
                        {currentQuestion.type === 'meaning_match' && (
                            <div className="grid gap-4">
                                {currentQuestion.options?.map((option) => {
                                    const isSelected = isAnswered && option === currentQuestion.word.meaning;

                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleOptionSelect(option)}
                                            disabled={isAnswered && isCorrect} // Only disable if correctly answered
                                            className={clsx(
                                                "p-4 rounded-xl border-2 text-left transition-all font-medium",
                                                isSelected
                                                    ? "bg-green-100 border-green-500 text-green-800"
                                                    : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
                                            )}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {currentQuestion.type === 'construction' && (
                            <BuilderQuestion
                                word={currentQuestion.word}
                                onComplete={(success) => {
                                    if (isPracticeMode) {
                                        if (success) {
                                            setIsAnswered(true);
                                            setIsCorrect(true);
                                            playSuccess();
                                        } else {
                                            playError();
                                        }
                                        return;
                                    }

                                    if (isAnswered) return;
                                    setIsAnswered(true);
                                    setIsCorrect(success);
                                    if (success) {
                                        playSuccess();
                                    } else {
                                        playError();
                                    }
                                }}
                            />
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>

            {/* FEEDBACK FOOTER */}
            <AnimatePresence>
                {isAnswered && (
                    <motion.div
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        className={clsx(
                            "fixed left-0 right-0 p-6 border-t-2 z-50 flex items-center justify-between max-w-md mx-auto transition-all",
                            isPracticeMode ? "bottom-[88px] rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.1)]" : "bottom-0",
                            isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            {isCorrect ? <CheckCircle2 className="text-green-600" size={32} /> : <XCircle className="text-red-600" size={32} />}
                            <div>
                                <h3 className={clsx("font-bold text-lg", isCorrect ? "text-green-800" : "text-red-800")}>
                                    {isCorrect ? "Excellent!" : "Not quite..."}
                                </h3>
                                {!isCorrect && !isPracticeMode && (
                                    <p className="text-sm text-red-600">
                                        Correct: {typeof currentQuestion.word.meaning === 'string' ? currentQuestion.word.meaning : currentQuestion.word.meaning.en}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleNext}
                            className={clsx(
                                "px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 transition-transform active:scale-95",
                                isCorrect ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                            )}
                        >
                            {isLast && !isPracticeMode ? "Finish" : "Continue"} <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
