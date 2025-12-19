"use client";

import { motion } from "framer-motion";
import { Lock, Play, Check } from "lucide-react";
import Link from "next/link";
import { useGameStore } from "@/store/useGameStore";

interface WordCardProps {
    id: string;
    label: string;
    title: string;
    isUnlocked: boolean;
    isCompleted: boolean;
    isActive: boolean;
    index: number;
}

export function WordCard({ id, label, title, isUnlocked, isCompleted, isActive, index }: WordCardProps) {
    const { isPremium, setShowPaywall } = useGameStore();

    const handleClick = (e: React.MouseEvent) => {
        // Free users can only access the first 3 levels (indices 0, 1, 2)
        // If they try to access index 3 ("fer") or higher, show paywall
        if (!isPremium && index >= 3) {
            e.preventDefault();
            setShowPaywall(true, 'word_limit');
        }
    };

    return (
        <div className="relative z-10 mb-16 w-full flex justify-center">
            <Link
                href={isUnlocked ? `/lesson/${id}` : "#"}
                onClick={handleClick}
                className={`
                    relative group flex flex-col items-center justify-center
                    w-24 h-24 rounded-full border-4 shadow-xl transition-all duration-300
                    ${isActive
                        ? "bg-indigo-600 border-white ring-4 ring-indigo-200 scale-110 cursor-pointer hover:scale-115"
                        : isCompleted
                            ? "bg-emerald-500 border-white cursor-pointer"
                            : "bg-slate-200 border-slate-300 cursor-not-allowed grayscale"
                    }
                `}
            >
                {/* Icon / Number */}
                {isCompleted ? (
                    <Check size={32} className="text-white" />
                ) : isActive ? (
                    <Play size={32} className="text-white fill-white ml-1" />
                ) : (
                    <Lock size={24} className="text-slate-400" />
                )}

                {/* Floating Label */}
                <div className={`
                    absolute top-full mt-3 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-sm border whitespace-nowrap
                    ${isActive
                        ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                        : isUnlocked
                            ? "bg-white text-slate-600 border-slate-200"
                            : "bg-slate-100 text-slate-400 border-slate-200"
                    }
                `}>
                    {label}
                </div>

                {/* Pulsing Effect for Active */}
                {isActive && (
                    <span className="absolute inset-0 rounded-full animate-ping bg-indigo-500 opacity-20 duration-1000" />
                )}
            </Link>

            {/* Level Title (Side Tooltip) */}
            {isActive && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 50 }}
                    className="absolute left-1/2 bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-xl arrow-left whitespace-nowrap hidden sm:flex items-center gap-2"
                >
                    {title}
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center">
                        <Play size={12} fill="currentColor" />
                    </div>
                </motion.div>
            )}
        </div>
    );
}
