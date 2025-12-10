"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Scissors, Trophy } from "lucide-react";
import confetti from "canvas-confetti";

interface Challenge {
    id: string;
    word: string;
    cuts: number[]; // Index after which a cut is valid (0-indexed)
    chunks: { text: string; meaning: string }[];
}

const CHALLENGES: Challenge[] = [
    {
        id: "lvl1",
        word: "MISTRANSCRIBE",
        cuts: [3, 8], // MIS(3) TRANS(8) SCRIBE
        chunks: [
            { text: "MIS", meaning: "Wrongly" },
            { text: "TRANS", meaning: "Across" },
            { text: "SCRIBE", meaning: "Write" }
        ]
    },
    {
        id: "lvl2",
        word: "REPRODUCTION",
        cuts: [2, 5, 9], // RE(2) PRO(5) DUCT(9) ION
        chunks: [
            { text: "RE", meaning: "Again" },
            { text: "PRO", meaning: "Forward" },
            { text: "DUCT", meaning: "Lead" },
            { text: "ION", meaning: "Act/State" }
        ]
    },
    {
        id: "lvl3",
        word: "INCOMPREHENSIBILITY",
        cuts: [2, 5, 12, 16], // IN(2) COM(5) PREHENS(12) IBIL(16) ITY
        chunks: [
            { text: "IN", meaning: "Not" },
            { text: "COM", meaning: "Together" },
            { text: "PREHENS", meaning: "Grasp/Take" },
            { text: "IBIL", meaning: "Able to be" },
            { text: "ITY", meaning: "State of" }
        ]
    }
];

export default function SlicerPage() {
    const [level, setLevel] = useState(0);
    const [foundCuts, setFoundCuts] = useState<number[]>([]);

    // Derived state
    const challenge = CHALLENGES[level];
    const isComplete = challenge.cuts.every(cut => foundCuts.includes(cut));

    const handleCut = (index: number) => {
        if (foundCuts.includes(index)) return;

        if (challenge.cuts.includes(index)) {
            // Valid Cut!
            setFoundCuts(prev => [...prev, index]);

            // Check win
            const newCuts = [...foundCuts, index];
            if (challenge.cuts.every(c => newCuts.includes(c))) {
                confetti({
                    particleCount: 150,
                    spread: 60,
                    origin: { y: 0.6 }
                });
            }
        } else {
            // Invalid cut visual feedback (shake?)
            // For MVP just ignore
        }
    };

    const nextLevel = () => {
        if (level < CHALLENGES.length - 1) {
            setLevel(l => l + 1);
            setFoundCuts([]);
        }
    };

    return (
        <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center">
            {/* Header */}
            <header className="w-full px-6 py-4 flex items-center justify-between">
                <Link href="/" className="p-2 hover:bg-slate-800 rounded-full">
                    <ArrowLeft size={24} className="text-slate-400" />
                </Link>
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <Scissors className="text-pink-500" />
                    Word Slicer <span className="text-slate-600 text-sm">Lvl {level + 1}</span>
                </h1>
                <div className="w-8" />
            </header>

            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl px-4">

                {isComplete ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center"
                    >
                        <Trophy size={64} className="text-yellow-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">Deconstruction Complete!</h2>
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {challenge.chunks.map((chunk, i) => (
                                <div key={i} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                    <div className="text-xl font-black text-pink-400">{chunk.text}</div>
                                    <div className="text-sm text-slate-400">{chunk.meaning}</div>
                                </div>
                            ))}
                        </div>
                        {level < CHALLENGES.length - 1 ? (
                            <button
                                onClick={nextLevel}
                                className="px-8 py-4 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-full shadow-lg shadow-pink-900/40 text-lg"
                            >
                                Next Challenge
                            </button>
                        ) : (
                            <div className="text-xl text-emerald-400 font-bold">
                                You have sliced them all!
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <div className="relative">
                        <p className="text-center text-slate-500 mb-12 uppercase tracking-[0.2em] font-bold text-sm">
                            Tap gaps to slice
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-y-8 select-none">
                            {challenge.word.split('').map((char, i) => {
                                // The gap is AFTER index i (so index+1 is the cut point)
                                // Wait, if word is "MIS...", M is 0. I want to cut after M? No, usually cuts are between.
                                // Let's say cut index 1 means after char 0?
                                // simpler: Loop loops through chars. We render Char, then Gap.
                                // Gap index = i + 1.
                                const cutIndex = i + 1;
                                const isLast = i === challenge.word.length - 1;
                                const isCut = foundCuts.includes(cutIndex);

                                return (
                                    <div key={i} className="flex items-center">
                                        <motion.div
                                            layout
                                            className="text-5xl sm:text-7xl font-black text-white relative z-10"
                                        >
                                            {char}
                                        </motion.div>

                                        {!isLast && (
                                            <div
                                                onClick={() => handleCut(cutIndex)}
                                                className={`w-4 h-20 sm:h-32 mx-1 cursor-pointer transition-all duration-300 flex items-center justify-center group ${isCut ? "w-8" : "hover:scale-110"
                                                    }`}
                                            >
                                                {isCut ? (
                                                    <div className="w-1 h-full bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
                                                ) : (
                                                    <div className="w-2 h-2 rounded-full bg-slate-800 group-hover:bg-slate-600" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}
