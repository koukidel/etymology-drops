"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { verdictCases, VerdictCase } from "@/data/verdictData";
import { Gavel, CheckCircle, XCircle } from "lucide-react";

export function VerdictConsole() {
    const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [showOptions, setShowOptions] = useState(false);
    const [feedback, setFeedback] = useState<'IDLE' | 'SUCCESS' | 'FAIL'>('IDLE');

    const currentCase = verdictCases[currentCaseIndex];

    const words = currentCase.sentence.split(" ");

    const handleWordClick = (word: string) => {
        // Strip punctuation for comparison
        const cleanWord = word.replace(/[.,]/g, "");
        if (cleanWord === currentCase.errorWord) {
            setSelectedWord(cleanWord);
            setShowOptions(true);
            setFeedback('IDLE');
        } else {
            // Clicked wrong word
            if (feedback !== 'SUCCESS') {
                const audio = new Audio("/sounds/error.mp3"); // Placeholder
                // audio.play().catch(() => {}); 
                // Just shake effect maybe?
            }
        }
    };

    const handleObjection = (root: string) => {
        if (root === currentCase.correctRoot) {
            setFeedback('SUCCESS');
            setShowOptions(false);
            setTimeout(() => {
                if (currentCaseIndex < verdictCases.length - 1) {
                    setCurrentCaseIndex(prev => prev + 1);
                    setFeedback('IDLE');
                    setSelectedWord(null);
                }
            }, 2000);
        } else {
            setFeedback('FAIL');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-slate-50 min-h-[500px] flex flex-col items-center">

            {/* Header */}
            <div className="w-full flex justify-between items-center mb-12 border-b-2 border-slate-200 pb-4">
                <span className="font-mono text-slate-400 font-bold">CASE #{currentCase.id.toUpperCase()}</span>
                <span className="flex items-center gap-2 text-slate-800 font-bold">
                    <Gavel size={20} /> THE VERDICT
                </span>
            </div>

            {/* Sentence Display */}
            <h1 className="text-2xl md:text-3xl font-serif text-slate-800 leading-relaxed text-center mb-16">
                {words.map((word, i) => {
                    const cleanWord = word.replace(/[.,]/g, "");
                    const isErrorTarget = cleanWord === currentCase.errorWord;
                    const isFixed = feedback === 'SUCCESS' && isErrorTarget;

                    return (
                        <motion.span
                            key={i}
                            layout
                            onClick={() => handleWordClick(word)}
                            className={`inline-block mx-1.5 px-1 rounded cursor-pointer transition-colors border-b-2 border-transparent hover:bg-slate-200 ${isFixed ? "text-green-600 font-bold bg-green-50 border-green-500" : ""
                                }`}
                        >
                            {isFixed ? currentCase.correctWord + (word.endsWith(".") ? "." : "") : word}
                        </motion.span>
                    );
                })}
            </h1>

            {/* Interaction Area */}
            <AnimatePresence mode="wait">
                {showOptions && feedback !== 'SUCCESS' && (
                    <motion.div
                        key="options"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 w-full max-w-md"
                    >
                        <p className="text-sm font-bold text-slate-400 uppercase mb-4 text-center">
                            Select the Correct Root to swap into "{currentCase.errorWord}":
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => handleObjection(currentCase.correctRoot)}
                                className="p-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold rounded-xl border border-indigo-200"
                            >
                                {currentCase.correctRoot.toUpperCase()}
                            </button>
                            <button
                                onClick={() => handleObjection(currentCase.distractorRoot)}
                                className="p-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200"
                            >
                                {currentCase.distractorRoot.toUpperCase()}
                            </button>
                        </div>
                    </motion.div>
                )}

                {feedback === 'SUCCESS' && (
                    <motion.div
                        key="success"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="flex flex-col items-center gap-4 py-8"
                    >
                        <CheckCircle className="text-green-500 w-16 h-16" />
                        <p className="text-2xl font-black text-green-600 uppercase tracking-widest">Objection Sustained!</p>
                        <p className="text-slate-500">{currentCase.contextHint}</p>
                    </motion.div>
                )}

                {feedback === 'FAIL' && (
                    <motion.div
                        key="fail"
                        initial={{ x: 0 }}
                        animate={{ x: [-10, 10, -10, 10, 0] }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-2 mt-4"
                    >
                        <XCircle className="text-red-500 w-8 h-8" />
                        <p className="font-bold text-red-500">Overruled! Incorrect root.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <p className="mt-auto text-xs text-slate-400 font-mono">
                Click the word that doesn't fit the context.
            </p>
        </div>
    );
}
