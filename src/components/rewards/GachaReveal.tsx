"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GachaItem } from "@/lib/gacha";
import { Sparkles, X } from "lucide-react";

interface GachaRevealProps {
    item: GachaItem | null;
    onClose: () => void;
}

export function GachaReveal({ item, onClose }: GachaRevealProps) {
    if (!item) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Reveal Container */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="relative z-10 flex flex-col items-center"
            >
                {/* Light Burst Background */}
                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 animate-pulse" />

                {/* Item Card */}
                <div className="bg-white p-1 rounded-3xl shadow-2xl overflow-hidden w-64 relative">
                    {/* Rarity Glow */}
                    <div className={`absolute inset-0 opacity-20 ${item.rarity === 'legendary' ? 'bg-amber-500' :
                        item.rarity === 'epic' ? 'bg-purple-500' :
                            item.rarity === 'rare' ? 'bg-blue-500' :
                                'bg-slate-500'
                        }`} />

                    <div className="bg-white rounded-[20px] p-6 flex flex-col items-center text-center relative z-10 h-full">
                        {/* Icon */}
                        <div className="text-6xl mb-4 animate-bounce">
                            {item.icon}
                        </div>

                        {/* Rarity Badge */}
                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 ${item.rarity === 'legendary' ? 'bg-amber-100 text-amber-600' :
                            item.rarity === 'epic' ? 'bg-purple-100 text-purple-600' :
                                item.rarity === 'rare' ? 'bg-blue-100 text-blue-600' :
                                    'bg-slate-100 text-slate-600'
                            }`}>
                            {item.rarity}
                        </div>

                        {/* Name */}
                        <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">
                            {item.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            {item.description}
                        </p>
                    </div>
                </div>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="mt-8 bg-white text-slate-900 px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                    Collect <Sparkles size={16} />
                </button>
            </motion.div>
        </div>
    );
}
