"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Medal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/useGameStore";

const BADGES = [
    { id: "rookie", name: "Root Rookie", description: "Master 10 words", condition: (state: any) => state.masteredWords.length >= 10 },
    { id: "streak", name: "Streak Master", description: "Reach a 7 day streak", condition: (state: any) => state.streak >= 7 },
    { id: "rich", name: "Gem Hoarder", description: "Collect 100 gems", condition: (state: any) => state.gems >= 100 },
];

export const Achievements = () => {
    const state = useGameStore();
    const [newBadge, setNewBadge] = useState<typeof BADGES[0] | null>(null);

    // Check for new badges
    useEffect(() => {
        // In a real app, we'd track which badges are already unlocked to avoid spamming
        // For this demo, we'll just check if a condition is met and maybe show it if it's "new" in this session
        // Simplified: Just show the first one met for demo purposes if not seen
    }, [state.masteredWords.length, state.streak, state.gems]);

    return (
        <AnimatePresence>
            {newBadge && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                >
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-50 to-transparent opacity-50" />

                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="inline-flex p-4 bg-amber-100 text-amber-600 rounded-full mb-4 relative z-10"
                        >
                            <Medal size={48} />
                        </motion.div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-2 relative z-10">New Badge Unlocked!</h3>
                        <p className="text-lg font-bold text-amber-600 mb-1 relative z-10">{newBadge.name}</p>
                        <p className="text-slate-500 mb-6 relative z-10">{newBadge.description}</p>

                        <button
                            onClick={() => setNewBadge(null)}
                            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors relative z-10"
                        >
                            Awesome!
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
