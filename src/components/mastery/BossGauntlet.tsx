import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Word } from "@/data/types";
import { Shield, Check, X, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
    word: Word;
    onClose: () => void;
    onComplete: () => void;
}

export function BossGauntlet({ word, onClose, onComplete }: Props) {
    const challenges = word.bossChallenges || [];
    const [index, setIndex] = useState(0);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isComplete, setIsComplete] = useState(false);

    if (challenges.length === 0) {
        return (
            <div className="bg-white p-8 rounded-3xl text-center">
                <p>No boss challenges available for this word yet!</p>
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-slate-200 rounded-lg">Close</button>
            </div>
        );
    }

    const currentChallenge = challenges[index];

    const handleAnswer = (option: string) => {
        if (option === currentChallenge.answer) {
            setIsCorrect(true);
            setTimeout(() => {
                if (index < challenges.length - 1) {
                    setIndex(i => i + 1);
                    setIsCorrect(null);
                } else {
                    setIsComplete(true);
                    confetti();
                    setTimeout(onComplete, 3000);
                }
            }, 1000);
        } else {
            setIsCorrect(false);
            setTimeout(() => setIsCorrect(null), 1000);
        }
    };

    if (isComplete) {
        return (
            <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white w-full max-w-md rounded-3xl p-8 text-center shadow-2xl"
            >
                <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trophy size={40} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-2">Root Mastered!</h2>
                <p className="text-slate-500 mb-6">You proved that Eiken Grade 1 is easy with Etymology.</p>
                <button onClick={onClose} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl">
                    Claim Victory
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            key={index} // Force re-render for animation
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative"
        >
            {/* Header */}
            <div className="bg-slate-900 p-6 flex flex-col items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500/10" />

                {/* Eiken Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 rounded-full border border-indigo-500/30 text-indigo-200 text-xs font-bold tracking-widest uppercase mb-4 relative z-10">
                    <Shield size={12} />
                    Eiken Level {currentChallenge.level}
                </div>

                <h2 className="text-3xl font-black text-white relative z-10 mb-1">{currentChallenge.word}</h2>
                <div className="h-1 w-24 bg-indigo-500 rounded-full my-2" />
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-slate-100 w-full">
                <motion.div
                    className="h-full bg-emerald-500"
                    initial={{ width: `${(index / challenges.length) * 100}%` }}
                    animate={{ width: `${((index + 1) / challenges.length) * 100}%` }}
                />
            </div>

            {/* Content */}
            <div className="p-8">
                <p className="text-lg text-slate-600 text-center font-medium mb-8 leading-relaxed">
                    {typeof currentChallenge.question === 'string' ? currentChallenge.question : currentChallenge.question.en}
                </p>

                <div className="space-y-3">
                    {currentChallenge.options.map((option) => {
                        const optionText = typeof option === 'string' ? option : (option as any).en;
                        const answerText = typeof currentChallenge.answer === 'string' ? currentChallenge.answer : (currentChallenge.answer as any).en;
                        return (
                            <button
                                key={optionText}
                                onClick={() => handleAnswer(optionText)}
                                disabled={isCorrect !== null}
                                className={`w-full p-4 rounded-xl border-2 font-bold text-left transition-all duration-200 flex items-center justify-between
                                    ${isCorrect === true && optionText === answerText
                                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                                        : isCorrect === false && optionText !== answerText
                                            ? 'bg-white border-slate-100 text-slate-300' // Fade out wrong
                                            : 'bg-white border-slate-100 hover:border-indigo-600 hover:bg-slate-50 text-slate-700'
                                    }
                                `}
                            >
                                <span>{optionText}</span>
                                {isCorrect === true && optionText === answerText && <Check className="text-emerald-500" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                <button onClick={onClose} className="text-slate-400 text-xs font-bold uppercase tracking-wider hover:text-red-500 transition-colors">
                    Forfeit Battle
                </button>
            </div>
        </motion.div>
    );
}
