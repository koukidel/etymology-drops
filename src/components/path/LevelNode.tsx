"use client";

import { motion } from "framer-motion";
import { Level } from "@/data/levels";
import * as Icons from "lucide-react";
import { clsx } from "clsx";
import { Lock } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";

interface LevelNodeProps {
    level: Level;
    status: 'locked' | 'unlocked' | 'completed';
    onClick: () => void;
    index: number; // For staggering delay
}

export const LevelNode = ({ level, status, onClick, index }: LevelNodeProps) => {
    // Dynamically get icon
    const IconComponent = (Icons as any)[level.icon] || Icons.Circle;

    const isLocked = status === 'locked';
    const isCompleted = status === 'completed';

    // Color mapping
    const colorMap: Record<string, string> = {
        indigo: "bg-indigo-500 shadow-indigo-200 border-indigo-400",
        blue: "bg-blue-500 shadow-blue-200 border-blue-400",
        teal: "bg-teal-500 shadow-teal-200 border-teal-400",
        amber: "bg-amber-500 shadow-amber-200 border-amber-400",
        purple: "bg-purple-500 shadow-purple-200 border-purple-400",
        rose: "bg-rose-500 shadow-rose-200 border-rose-400",
    };

    const baseColor = colorMap[level.color] || colorMap.indigo;

    return (
        <div className="relative z-10 flex flex-col items-center gap-2">
            <motion.button
                onClick={onClick}
                disabled={isLocked}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                whileHover={!isLocked ? { scale: 1.1, rotate: 5 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : { x: [0, -5, 5, 0] }} // Shake if locked
                className={clsx(
                    "w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-xl transition-all",
                    isLocked
                        ? "bg-slate-200 border-slate-300 shadow-slate-100 grayscale cursor-not-allowed"
                        : `${baseColor} text-white cursor-pointer`
                )}
            >
                {isLocked ? (
                    <Lock size={28} className="text-slate-400" />
                ) : (
                    <IconComponent size={32} strokeWidth={isCompleted ? 3 : 2} />
                )}

                {/* Stars/Rating Indicator (Future) */}
                {isCompleted && (
                    <div className="absolute -bottom-2 bg-yellow-400 rounded-full p-1 border-2 border-white">
                        <Icons.Star size={12} className="text-white fill-current" />
                    </div>
                )}
            </motion.button>

            {/* Label */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className={clsx(
                    "text-center max-w-[120px]",
                    isLocked ? "opacity-50" : "opacity-100"
                )}
            >
                <h3 className="font-bold text-slate-800 leading-tight">{level.title}</h3>
                <p className="text-xs text-slate-500">{level.description}</p>
            </motion.div>
        </div>
    );
};
