"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Scissors, CheckCircle } from "lucide-react";
import { Word } from "@/data/types";
import confetti from "canvas-confetti";

interface Props {
    word: Word;
    onComplete?: () => void;
}

import { useTranslation } from "@/hooks/useTranslation";

export function SlicerModule({ word, onComplete }: Props) {
    const [cuts, setCuts] = useState<number[]>([]);
    const [foundCuts, setFoundCuts] = useState<number[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const { language } = useTranslation();

    useEffect(() => {
        // Calculate valid cut indices based on blocks
        let currentLen = 0;
        const validCuts: number[] = [];
        for (let i = 0; i < word.blocks.length - 1; i++) {
            currentLen += word.blocks[i].label.replace(/-/g, '').length;
            validCuts.push(currentLen);
        }
        setCuts(validCuts);
    }, [word]);

    const handleCut = (index: number) => {
        if (foundCuts.includes(index)) return;

        // Re-calculate target cuts for validation
        let runningIndex = 0;
        const targetCuts: number[] = [];
        word.blocks.forEach((b, i) => {
            if (i === word.blocks.length - 1) return;
            const pureLabel = b.label.replace(/-/g, '');
            runningIndex += pureLabel.length;
            targetCuts.push(runningIndex);
        });

        if (targetCuts.includes(index)) {
            const newFound = [...foundCuts, index];
            setFoundCuts(newFound);

            // Check if all needed cuts are found
            // Logic: we need to find ALL unique cuts? 
            // `targetCuts` might be [3] for "Precept" (Pre|cept).
            if (newFound.length === targetCuts.length) {
                setIsComplete(true);
                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { y: 0.7 },
                    colors: ['#6366f1', '#ec4899']
                });

                // Removed auto-advance timeout
            }
        } else {
            // Invalid cut logic could go here (shake animation)
        }
    };

    if (isComplete) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-900 rounded-3xl p-8 text-center text-white shadow-xl relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-slate-900 z-0" />
                <div className="relative z-10 w-full flex flex-col items-center">
                    <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Deconstructed!</h3>
                    <div className="flex flex-wrap justify-center gap-2 mt-4 mb-8">
                        <div className="flex flex-wrap justify-center gap-2 mt-4 mb-8">
                            {word.blocks.map((b, i) => {
                                const blockMeaning = typeof b.meaning === 'string' ? b.meaning : b.meaning[language];
                                return (
                                    <div key={i} className="bg-white/10 border border-white/20 px-3 py-2 rounded-lg">
                                        <span className={`font-bold ${b.type === 'root' ? 'text-indigo-400' : 'text-pink-400'}`}>
                                            {b.label.replace(/-/g, '')}
                                        </span>
                                        <span className="text-xs text-slate-400 block">{blockMeaning}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        onClick={() => onComplete && onComplete()}
                        className="px-8 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:scale-105 transition-transform shadow-lg"
                    >
                        Continue to Synthesis
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <section className="bg-slate-900 rounded-3xl p-8 text-center text-white shadow-xl relative overflow-hidden min-h-[400px] flex flex-col">
            <div className="flex items-center justify-center gap-2 mb-8 text-pink-400 font-bold tracking-widest uppercase text-xs">
                <Scissors size={14} />
                Slicer Mode
            </div>

            <div className="flex-1 flex flex-wrap items-center justify-center gap-y-8 select-none py-8">
                {word.word.split('').map((char, i) => {
                    const cutIndex = i + 1;
                    const isLast = i === word.word.length - 1;
                    const isFound = foundCuts.includes(cutIndex);

                    return (
                        <div key={i} className="flex items-center">
                            <motion.span className="text-4xl sm:text-6xl font-black">
                                {char}
                            </motion.span>

                            {!isLast && (
                                <div
                                    onClick={() => handleCut(cutIndex)}
                                    className={`slicer-gap w-6 h-16 mx-1 cursor-pointer transition-all duration-300 flex items-center justify-center group relative`}
                                >
                                    <div className="absolute inset-0 bg-transparent hover:bg-white/5 rounded-full" />
                                    {isFound ? (
                                        <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} className="w-1 bg-pink-500 shadow-[0_0_10px_#ec4899]" />
                                    ) : (
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-pink-500/50 transition-colors" />
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex items-center justify-between gap-4 mb-4 mt-4 px-4">
                <p className="text-slate-500 text-sm">Tap the gaps to isolate the root.</p>
                <button
                    onClick={() => {
                        // Reveal all cuts temporarily or highlight them
                        const allCuts = cuts; // valid cuts
                        // Just create a "hint mode" that highlights the correct gaps?
                        // For now, let's just "flash" the answer visually by turning the correct gaps yellow
                        const gaps = document.querySelectorAll('.slicer-gap');
                        gaps.forEach((gap, index) => {
                            if (cuts.includes(index + 1)) {
                                (gap as HTMLElement).style.backgroundColor = '#fbbf24'; // Amber
                                setTimeout(() => {
                                    (gap as HTMLElement).style.backgroundColor = '';
                                }, 1000);
                            }
                        });
                    }}
                    className="text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-widest border border-indigo-900 bg-indigo-950 px-3 py-1 rounded"
                >
                    Hint
                </button>
            </div>
        </section>
    );
}
