"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { LootResult } from "@/lib/gacha";
import { Sparkles, Gift } from "lucide-react";

interface Props {
    loot: LootResult;
    onComplete: () => void;
}

export function GachaReveal({ loot, onComplete }: Props) {
    const [reveal, setReveal] = useState(false);

    useEffect(() => {
        // Auto reveal after animation
        const timer = setTimeout(() => {
            setReveal(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    const isLegendary = loot.tier === 'LEGENDARY';
    const isRare = loot.tier === 'RARE';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full">
            {!reveal ? (
                <motion.div
                    animate={{
                        rotate: [0, -5, 5, -5, 5, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 0.5, repeat: 3 }}
                    className="relative cursor-pointer"
                    onClick={() => setReveal(true)}
                >
                    <div className="w-40 h-40 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/50">
                        <Gift className="text-white w-20 h-20" />
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center mt-6 font-bold text-slate-300 text-lg"
                    >
                        Opening...
                    </motion.p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="text-center"
                >
                    {/* Glow Effect */}
                    <div className="relative mb-8 mx-auto w-40 h-40 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className={`absolute inset-0 rounded-full blur-xl opacity-50 ${isLegendary ? "bg-purple-500" : isRare ? "bg-yellow-400" : "bg-blue-400"}`}
                        />
                        <div className={`relative z-10 w-32 h-32 rounded-2xl flex items-center justify-center border-4 ${isLegendary ? "bg-slate-900 border-purple-500" : isRare ? "bg-yellow-100 border-yellow-500" : "bg-white border-blue-500"}`}>
                            {isLegendary ? <span className="text-6xl">🔮</span> : isRare ? <span className="text-6xl">👑</span> : <span className="text-6xl">🌱</span>}
                        </div>
                    </div>

                    <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-wide">
                        {loot.tier} DROP
                    </h2>
                    <p className="text-2xl font-medium text-indigo-400 mb-12">
                        {loot.reward} (+{loot.xp} XP)
                    </p>

                    <button
                        onClick={onComplete}
                        className="px-12 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                    >
                        Collect & Continue
                    </button>
                </motion.div>
            )}
        </div>
    );
}
