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
    levelId: string;
}

export const QuizEngine = ({ questions, levelId }: QuizEngineProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    // For construction, we might not need local state if we reuse CraftingTable in a smart way
    // For now, let's implement Meaning Match logic here

    const router = useRouter();
    const { addXp, unlockLevel } = useGameStore();

    const currentQuestion = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    const handleOptionSelect = (option: string) => {
        if (isAnswered) return;

        const correct = option === currentQuestion.word.meaning;
        setIsAnswered(true);
        setIsCorrect(correct);

        if (correct) {
            playSuccess();
        } else {
            playError();
        }
    };

    const handleNext = () => {
        if (isLast) {
            // Finish Lesson
            playLevelUp();
            addXp(50);
            // Check for story unlock
            const currentLevel = levels.find(l => l.id === levelId);
            if (currentLevel?.storyId) {
                router.push(`/story/${currentLevel.storyId}`);
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

    // Construction Completion Handler (from reusing CraftingTable logic manually)
    // We will render CraftingTable but we need to know when it's done.
    // The current CraftingTable handles its own state. 
    // We might need to wrap it or modify it to accept an `onComplete` prop if it doesn't have one.
    // Looking at file... it calls `unlockWord` and `incrementStreak`. 
    // We'll wrap it in a custom view later. For now, let's focus on Meaning Match or a simplified view.

    return (
        <div className="w-full max-w-md mx-auto h-full flex flex-col relative">
            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-200 rounded-full mb-8">
                <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentIndex) / questions.length) * 100}%` }}
                />
            </div>

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
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                {currentQuestion.type === 'meaning_match' ? "Choose the meaning" : "Build the word"}
                            </h2>
                            <div className="inline-block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-xl border border-indigo-100">
                                {currentQuestion.word.word}
                            </div>
                        </div>

                        {/* QUESTION BODY */}
                        {currentQuestion.type === 'meaning_match' && (
                            <div className="grid gap-4">
                                {currentQuestion.options?.map((option) => {
                                    const isSelected = isAnswered && option === currentQuestion.word.meaning;
                                    const isWrong = isAnswered && !isSelected && option !== currentQuestion.word.meaning; // Simplified logic? No used state to track selection.

                                    // Better logic: We need to know WHICH one user clicked if wrong.
                                    // For MVP, just show Correct Highlight always if Answered.

                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleOptionSelect(option)}
                                            disabled={isAnswered}
                                            className={clsx(
                                                "p-4 rounded-xl border-2 text-left transition-all font-medium",
                                                isAnswered && option === currentQuestion.word.meaning
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
                            "fixed bottom-0 left-0 right-0 p-6 border-t-2 z-50 flex items-center justify-between max-w-md mx-auto",
                            isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            {isCorrect ? <CheckCircle2 className="text-green-600" size={32} /> : <XCircle className="text-red-600" size={32} />}
                            <div>
                                <h3 className={clsx("font-bold text-lg", isCorrect ? "text-green-800" : "text-red-800")}>
                                    {isCorrect ? "Excellent!" : "Not quite..."}
                                </h3>
                                {!isCorrect && (
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
                            {isLast ? "Finish" : "Continue"} <ArrowRight size={20} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
