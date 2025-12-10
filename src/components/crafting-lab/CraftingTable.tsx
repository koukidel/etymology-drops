"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Word, Block as BlockType } from "@/data/types";
import { Block } from "./Block";
import { DropZone } from "./DropZone";
import { playSnap, playSuccess, playError, playLevelUp } from "@/lib/audio";
import { useGameStore } from "@/store/useGameStore";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { clsx } from "clsx";

interface CraftingTableProps {
    words: Word[];
}

export const CraftingTable = ({ words }: CraftingTableProps) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [placedBlocks, setPlacedBlocks] = useState<(BlockType | null)[]>([]);
    const [availableBlocks, setAvailableBlocks] = useState<BlockType[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [errorCount, setErrorCount] = useState(0);

    const slotRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { unlockWord, incrementStreak, addXp, addGems } = useGameStore();

    const currentWord = words[currentWordIndex];

    useEffect(() => {
        // Initialize level
        setPlacedBlocks(new Array(currentWord.blocks.length).fill(null));
        // Shuffle blocks for the pool
        const shuffled = [...currentWord.blocks].sort(() => Math.random() - 0.5);
        setAvailableBlocks(shuffled);
        setIsComplete(false);
        setErrorCount(0); // Reset error count for new word
        slotRefs.current = new Array(currentWord.blocks.length).fill(null);
    }, [currentWordIndex, currentWord]); // Added currentWord to dependencies for safety, though currentWordIndex should trigger it

    const handleDragEnd = (block: BlockType, info: any) => {
        const dropPoint = {
            x: info.point.x,
            y: info.point.y,
        };

        let droppedInSlot = -1;

        // Check if dropped in any slot
        slotRefs.current.forEach((ref, index) => {
            if (ref && !placedBlocks[index]) {
                const rect = ref.getBoundingClientRect();
                if (
                    dropPoint.x >= rect.left &&
                    dropPoint.x <= rect.right &&
                    dropPoint.y >= rect.top &&
                    dropPoint.y <= rect.bottom
                ) {
                    droppedInSlot = index;
                }
            }
        });

        if (droppedInSlot !== -1) {
            // Check if it's the CORRECT block for this slot
            // For this prototype, we enforce strict order? Or just correct type?
            // Let's enforce that the block ID matches the target block ID at that index.
            // Actually, the word.blocks array defines the order.
            const targetBlock = currentWord.blocks[droppedInSlot];

            if (block.id === targetBlock.id) {
                // Correct placement
                const newPlaced = [...placedBlocks];
                newPlaced[droppedInSlot] = block;
                setPlacedBlocks(newPlaced);
                setAvailableBlocks(prev => prev.filter(b => b.id !== block.id));

                playSnap().catch(e => console.error("Audio error:", e));
                if (navigator.vibrate) navigator.vibrate(10); // Light haptic

                // Check completion
                if (newPlaced.every(b => b !== null)) {
                    handleCompletion();
                }
            } else {
                // Wrong placement
                playError().catch(e => console.error("Audio error:", e));
                if (navigator.vibrate) navigator.vibrate(50); // Heavy haptic
                setErrorCount(prev => prev + 1);
            }
        }
    };

    const handleCompletion = async () => {
        setIsComplete(true);
        unlockWord(currentWord.id);
        incrementStreak();

        // XP Logic
        const baseXp = 10;
        const perfectBonus = errorCount === 0 ? 50 : 0;
        addXp(baseXp + perfectBonus);

        if (perfectBonus > 0) {
            playLevelUp().catch(e => console.error("Audio error:", e));
        } else {
            playSuccess().catch(e => console.error("Audio error:", e));
        }
    };

    const nextWord = () => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto h-full">
            {/* Header / Meaning */}
            <div className="mb-12 text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={currentWord.id}
                    className="p-6 bg-white rounded-3xl shadow-sm border border-slate-100"
                >
                    <h2 className="text-xl font-medium text-slate-500 mb-2">Build the word for:</h2>
                    <p className="text-2xl font-bold text-slate-900">{currentWord.meaning}</p>
                </motion.div>
            </div>

            {/* Construction Zone */}
            <div className="flex gap-4 mb-16">
                {currentWord.blocks.map((block, index) => (
                    <DropZone
                        key={`${currentWord.id}-slot-${index}`}
                        label={block.type}
                        isFilled={!!placedBlocks[index]}
                        ref={(el) => { slotRefs.current[index] = el; }}
                    >
                        {placedBlocks[index] && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                layoutId={placedBlocks[index]!.id}
                            >
                                <Block block={placedBlocks[index]!} isPlaced />
                            </motion.div>
                        )}
                    </DropZone>
                ))}
            </div>

            {/* Available Blocks Pool */}
            <div className="flex flex-wrap justify-center gap-6 min-h-[120px]">
                <AnimatePresence>
                    {availableBlocks.map((block) => (
                        <motion.div
                            key={block.id}
                            layoutId={block.id}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileDrag={{ scale: 1.1, zIndex: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Block block={block} onDragEnd={(info) => handleDragEnd(block, info)} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Success Overlay / Next Button */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-10 left-0 right-0 mx-auto w-full max-w-xs p-4"
                    >
                        <div className="bg-green-500 text-white p-6 rounded-3xl shadow-xl flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 text-2xl font-bold">
                                <CheckCircle2 size={32} />
                                <span>{currentWord.word}</span>
                            </div>
                            <p className="text-green-100">Crafted successfully!</p>
                            <button
                                onClick={nextWord}
                                className="w-full py-3 bg-white text-green-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-50 transition-colors"
                            >
                                Next Word <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
