"use client";

import { useState, useEffect } from "react";
import { Word, Block } from "@/data/types";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { playSnap } from "@/lib/audio";
import { RotateCcw } from "lucide-react";

interface BuilderQuestionProps {
    word: Word;
    onComplete: (success: boolean) => void;
}

export const BuilderQuestion = ({ word, onComplete }: BuilderQuestionProps) => {
    // 1. Prepare scrambled blocks
    const [availableBlocks, setAvailableBlocks] = useState<Block[]>([]);
    const [placedBlocks, setPlacedBlocks] = useState<Block[]>([]);

    useEffect(() => {
        // Scramble logic
        const scrambled = [...word.blocks].sort(() => Math.random() - 0.5);
        setAvailableBlocks(scrambled);
        setPlacedBlocks([]);
    }, [word]);

    const handleBlockClick = (block: Block, from: 'available' | 'placed') => {
        playSnap();
        if (from === 'available') {
            setAvailableBlocks(prev => prev.filter(b => b.id !== block.id));
            setPlacedBlocks(prev => [...prev, block]);
        } else {
            setPlacedBlocks(prev => prev.filter(b => b.id !== block.id));
            setAvailableBlocks(prev => [...prev, block]);
        }
    };

    const handleCheck = () => {
        // Construct the ID string from placed blocks (e.g. "import" from "im" + "port")
        const constructedId = placedBlocks.map(b => b.id).join("");

        // Target ID might need normalization if word.id doesn't match perfectly (e.g. unexpected casing?)
        // But our data structure implies id matches concatenation usually. 
        // Actually, let's verify against the ORDER of blocks in the word definition, which is safer.

        const targetOrder = word.blocks.map(b => b.id).join("");
        const isCorrect = constructedId === targetOrder;

        onComplete(isCorrect);
    };

    const isFull = placedBlocks.length === word.blocks.length;

    // Auto-check when full? Or manual?
    // Let's do manual for now to allow correction, or auto-check with delay?
    // Manual "Check" button is standard if it's not drag-and-drop instant.
    // Actually, distinct button is clearer.

    return (
        <div className="flex flex-col items-center gap-8 w-full">

            {/* DROP ZONE */}
            <div className="flex gap-2 min-h-[80px] w-full justify-center items-center bg-slate-100/50 rounded-2xl p-4 border-2 border-dashed border-slate-300 transition-colors"
                style={{ borderColor: isFull ? '#6366f1' : undefined }}
            >
                <AnimatePresence mode="popLayout">
                    {placedBlocks.map((block) => (
                        <motion.button
                            key={`placed-${block.id}`}
                            layoutId={block.id}
                            onClick={() => handleBlockClick(block, 'placed')}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-indigo-600 text-white px-4 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-indigo-700 active:scale-95"
                        >
                            {block.label}
                        </motion.button>
                    ))}
                </AnimatePresence>

                {placedBlocks.length === 0 && (
                    <span className="text-slate-400 text-sm font-medium">Tap blocks to arrange</span>
                )}
            </div>

            {/* SOURCE POOL */}
            <div className="flex flex-wrap gap-3 justify-center min-h-[60px]">
                <AnimatePresence mode="popLayout">
                    {availableBlocks.map((block) => (
                        <motion.button
                            key={`available-${block.id}`}
                            layoutId={block.id}
                            onClick={() => handleBlockClick(block, 'available')}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white text-slate-700 border-2 border-slate-200 px-4 py-3 rounded-xl font-bold text-lg shadow-sm hover:border-indigo-300 hover:text-indigo-600 active:scale-95"
                        >
                            {block.label}
                        </motion.button>
                    ))}
                </AnimatePresence>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-4 w-full">
                <button
                    onClick={() => {
                        // Reset
                        setAvailableBlocks([...word.blocks].sort(() => Math.random() - 0.5));
                        setPlacedBlocks([]);
                        playSnap();
                    }}
                    className="p-4 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
                    title="Reset"
                >
                    <RotateCcw size={24} />
                </button>

                <button
                    onClick={handleCheck}
                    disabled={!isFull}
                    className={clsx(
                        "flex-1 py-4 rounded-xl font-bold text-lg shadow-lg transition-all",
                        isFull
                            ? "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02] active:scale-95"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    )}
                >
                    Check Answer
                </button>
            </div>

        </div>
    );
};
