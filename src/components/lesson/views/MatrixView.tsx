"use client";

import { useState } from "react";
import { Word } from "@/data/types";
// import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Props {
    word: Word;
    onNext: () => void;
}

import { useTranslation } from "@/hooks/useTranslation";

// For MVP, we "Fake" the matrix logic to just be a simple "Assemble the Root" task.
// Or we ask them to assemble the prefix + root.
export function MatrixView({ word, onNext }: Props) {
    const rootBlock = word.blocks.find(b => b.type === 'root');
    const prefixes = word.blocks.filter(b => b.type === 'prefix');
    const { t } = useTranslation();

    // Initial State: Blocks are scattered
    const [assembled, setAssembled] = useState<string[]>([]);

    // We want the user to click or drag the blocks in order: Prefix -> Root.
    // Let's use simple Click-to-add for mobile friendliness instead of full DnD for this specific "Mini-Matrix".
    // "Tap the blocks in order to build the word."

    const handleBlockClick = (blockLabel: string) => {
        if (assembled.includes(blockLabel)) return;

        const newAssembled = [...assembled, blockLabel];
        setAssembled(newAssembled);

        // Check completion
        const fullWordFromBlocks = word.blocks.map(b => b.label).join('');
        const currentWord = newAssembled.join('');

        // Simple check: length match? (Order matters?)
        // Let's just auto-complete if they picked all blocks.
        if (newAssembled.length === word.blocks.length) {
            setTimeout(onNext, 1000);
        }
    };

    return (
        <div className="text-center space-y-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">{t('lesson.matrix.title')}</h2>
                <p className="text-slate-500">{t('lesson.matrix.instruction')}</p>
            </div>

            {/* Target Area */}
            <div className="h-24 bg-slate-100 rounded-2xl flex items-center justify-center gap-2 border-2 border-dashed border-slate-300">
                {assembled.map((label, i) => (
                    <motion.div
                        key={i}
                        layoutId={label}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-lg shadow-[0_4px_0_theme(colors.indigo.800)] active:shadow-none active:translate-y-1 transition-all"
                    >
                        {label}
                    </motion.div>
                ))}
                {assembled.length === 0 && (
                    <span className="text-slate-400 text-sm">{t('lesson.matrix.tap_blocks')}</span>
                )}
            </div>

            {/* Source Blocks */}
            <div className="flex flex-wrap justify-center gap-4">
                {word.blocks.map((block, i) => {
                    const isUsed = assembled.includes(block.label);
                    if (isUsed) return null;

                    return (
                        <motion.button
                            key={block.id}
                            layoutId={block.label}
                            whileHover={{ scale: 1.05, rotate: [-1, 1, 0] }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleBlockClick(block.label)}
                            className={`
                                px-6 py-3 rounded-xl font-bold shadow-[0_4px_0_rgba(0,0,0,0.1)] border-2 transition-all
                                ${block.type === 'root'
                                    ? "bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200"
                                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                }
                            `}
                        >
                            {block.label}
                            {/* Removed cluttery meaning subtitle for cleaner look */}
                        </motion.button>
                    );
                })}
            </div>

            {assembled.length > 0 && (
                <button onClick={() => setAssembled([])} className="text-sm text-slate-400 hover:text-red-500">{t('lesson.matrix.reset')}</button>
            )}
        </div>
    );
}
