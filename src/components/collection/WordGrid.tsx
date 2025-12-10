"use client";

import { useGameStore } from "@/store/useGameStore";
import { Word } from "@/data/types";
import { WordCard } from "./WordCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface WordGridProps {
    words: Word[];
}

export const WordGrid = ({ words }: WordGridProps) => {
    const unlockedWords = useGameStore((state) => state.unlockedWords);
    const [mounted, setMounted] = useState(false);

    // Deduplicate words by ID in case source has dupes
    const uniqueWords = Array.from(new Map(words.map(w => [w.id, w])).values());

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    // Filter words that are unlocked
    const unlockedWordObjects = words.filter(word => unlockedWords.includes(word.id));

    // Also show locked words as placeholders? Or just unlocked?
    // Let's show all, but locked ones are greyed out/hidden.

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
            {uniqueWords.map((word) => {
                const isUnlocked = unlockedWords.includes(word.id);

                if (!isUnlocked) {
                    return (
                        <div
                            key={word.id}
                            className="aspect-square bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center opacity-50"
                        >
                            <span className="text-3xl text-slate-300">?</span>
                        </div>
                    );
                }

                return (
                    <motion.div
                        key={word.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <WordCard word={word} />
                    </motion.div>
                );
            })}
        </div>
    );
};
