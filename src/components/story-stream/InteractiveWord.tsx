"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Word } from "@/data/types";
import { playPop } from "@/lib/audio";
import { clsx } from "clsx";

interface InteractiveWordProps {
    word: string;
    wordData?: Word;
}

export const InteractiveWord = ({ word, wordData }: InteractiveWordProps) => {
    const [isSplit, setIsSplit] = useState(false);

    const handleTap = () => {
        playPop();
        setIsSplit(!isSplit);
        if (navigator.vibrate) navigator.vibrate(10);
    };

    if (!wordData) {
        return <span className="text-slate-800">{word} </span>;
    }

    return (
        <span className="inline-block mx-1 align-middle h-8">
            <AnimatePresence mode="wait">
                {!isSplit ? (
                    <motion.button
                        key="word"
                        layoutId={`word-${wordData.id}`}
                        onClick={handleTap}
                        className="font-bold text-indigo-600 hover:text-indigo-700 active:scale-95 transition-transform"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        {wordData.id}
                    </motion.button>
                ) : (
                    <motion.div
                        key="split"
                        layoutId={`word-${wordData.id}`}
                        className="flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-100 cursor-pointer"
                        onClick={handleTap}
                        initial={{ opacity: 0, width: "auto" }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                    >
                        {wordData.blocks.map((block, i) => (
                            <span key={i} className={clsx(
                                "text-xs font-bold px-1 rounded",
                                block.type === 'prefix' && "text-blue-600 bg-blue-100",
                                block.type === 'root' && "text-amber-600 bg-amber-100",
                                block.type === 'suffix' && "text-pink-600 bg-pink-100"
                            )}>
                                {block.label}
                            </span>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
};
