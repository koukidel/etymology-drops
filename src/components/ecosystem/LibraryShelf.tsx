"use client";

import { motion } from "framer-motion";
import { MaterializingBook } from "./MaterializingBook";
import { Word } from "@/data/types";
import { useGameStore } from "@/store/useGameStore";
import { useRouter } from "next/navigation";

interface Props {
    words: Word[]; // The 14 Roots
}

export function LibraryShelf({ words }: Props) {
    const { unlockedWords, masteredWords } = useGameStore();
    const router = useRouter();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-10 h-64 pointer-events-none flex flex-col justify-end">
            {/* Wooden Shelf Texture */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#5d4037] border-t-4 border-[#8d6e63] shadow-2xl z-20 pointer-events-auto" />

            {/* Books Container */}
            <div className="relative w-full overflow-x-auto pb-8 pointer-events-auto no-scrollbar flex items-end justify-center gap-1 px-4 md:gap-2">
                {words.map((word, i) => {
                    const isUnlocked = unlockedWords.includes(word.id);
                    const isCompleted = masteredWords.includes(word.id);

                    // Calculate progress: 0 if locked, 10-90 if unlocked but not done, 100 if done.
                    let progress = 0;
                    if (isCompleted) progress = 100;
                    else if (isUnlocked) progress = 50;

                    // Alternating Colors for visual variety
                    const colors = ["bg-red-600", "bg-blue-600", "bg-green-600", "bg-amber-600", "bg-indigo-600", "bg-purple-600", "bg-pink-600"];
                    const color = colors[i % colors.length];

                    if (!isUnlocked) return null; // Or render ghost placeholder? Prompt implies materializing. 
                    // Let's render ghost book with 0 progress if unlocked?
                    // Prompt: "The Ghost Book... If progress=50..."
                    // If locked, maybe invisible or gray. 
                    // Let's render ALL words, but if locked, progress 0 and locked opacity.

                    return (
                        <div key={word.id} className="relative">
                            <MaterializingBook
                                title={word.word}
                                progress={progress}
                                color={color}
                                isActive={isUnlocked && !isCompleted}
                                onClick={() => router.push(`/master/${word.id}`)}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
