"use client";

import { useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { motion } from "framer-motion";
import { Check, X, Shield, BookOpen } from "lucide-react";

interface Props {
    onComplete: () => void;
}

export function PlacementQuiz({ onComplete }: Props) {
    const { unlockAll, unlockWord } = useGameStore(); // unlockWord logic might need update to support batch, but we can just use default (start at 0, unlock others progressively)
    // Actually, we want to unlock Level 1 only for beginners.
    // We need to ensure lock logic works.

    const [mode, setMode] = useState<'selection' | 'quiz'>('selection');
    const [quizIndex, setQuizIndex] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        {
            q: "What is the root of 'Invisible'?",
            options: ["In (Not)", "Vis (See)", "Ible (Able)"],
            answer: "Vis (See)"
        },
        {
            q: "Which word shares a root with 'Receive'?",
            options: ["Concept (Cept)", "Sist (Stand)", "Graph (Write)"],
            answer: "Concept (Cept)" // Cept/Ceive are related
        },
        {
            q: "What does 'Spect' mean in 'Inspect'?",
            options: ["To Build", "To Look", "To Speak"],
            answer: "To Look"
        }
    ];

    const handleBeginner = () => {
        // Beginner: Unlock ONLY the first word
        unlockWord("precept");
        onComplete();
    };

    const handleAnswer = (option: string) => {
        if (option === questions[quizIndex].answer) setScore(s => s + 1);

        if (quizIndex < questions.length - 1) {
            setQuizIndex(i => i + 1);
        } else {
            // Finished
            if (score >= 2) { // 2 or 3 correct (since state update is one step behind? No, score update happens next render. Logic needs fix.)
                // Wait, score update is async.
                // Simple fix: check option match here.
                const finalScore = score + (option === questions[quizIndex].answer ? 1 : 0);
                if (finalScore >= 3) {
                    unlockAll();
                } else {
                    // Start basic
                    unlockWord("precept");
                }
                onComplete();
            } else {
                unlockWord("precept");
                onComplete();
            }
        }
    };

    if (mode === 'selection') {
        return (
            <div className="text-center w-full max-w-md">
                <h2 className="text-3xl font-black mb-6">Where should we start?</h2>
                <div className="space-y-4">
                    <button
                        onClick={handleBeginner}
                        className="w-full p-6 bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-2xl text-left transition-all"
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-emerald-500 rounded-full text-white"><BookOpen size={24} /></div>
                            <span className="text-xl font-bold">I am a Beginner</span>
                        </div>
                        <p className="text-sm text-slate-300 pl-[4.5rem]">Start from the beginning. Guide me step-by-step.</p>
                    </button>

                    <button
                        onClick={() => setMode('quiz')}
                        className="w-full p-6 bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-2xl text-left transition-all"
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-indigo-500 rounded-full text-white"><Shield size={24} /></div>
                            <span className="text-xl font-bold">I know my roots</span>
                        </div>
                        <p className="text-sm text-slate-300 pl-[4.5rem]">Take a quick test to unlock all content.</p>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center w-full max-w-md">
            <h2 className="text-2xl font-bold mb-8">Question {quizIndex + 1}/{questions.length}</h2>
            <div className="bg-white text-slate-900 rounded-2xl p-6 mb-6 shadow-lg">
                <p className="text-xl font-medium">{questions[quizIndex].q}</p>
            </div>
            <div className="space-y-3">
                {questions[quizIndex].options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="w-full p-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl font-bold transition-all"
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
