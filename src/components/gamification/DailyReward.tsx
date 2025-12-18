"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Gift, Calendar, Check, X } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useState, useEffect } from "react";

export function DailyReward() {
    const { lastRewardDate, claimDailyReward, streak } = useGameStore();
    const [isOpen, setIsOpen] = useState(false);
    const [isClaimed, setIsClaimed] = useState(false);

    useEffect(() => {
        const today = new Date().toDateString();
        if (lastRewardDate !== today) {
            // Delay slightly to not overwhelm on load
            const timer = setTimeout(() => setIsOpen(true), 1000);
            return () => clearTimeout(timer);
        }
    }, [lastRewardDate]);

    const handleClaim = () => {
        setIsClaimed(true);
        setTimeout(() => {
            claimDailyReward();
            setTimeout(() => setIsOpen(false), 2000);
        }, 1000);
    };

    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    const currentDayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="fixed inset-x-4 top-[15%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-sm bg-white rounded-3xl z-[101] overflow-hidden shadow-2xl p-6 text-center"
                    >
                        <div className="absolute top-4 right-4">
                            <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-slate-500">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
                                <Gift size={40} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 mb-2">Daily Login Bonus</h2>
                            <p className="text-slate-500 text-sm">Keep your streak alive to earn more!</p>
                        </div>

                        {/* Streak Calendar */}
                        <div className="flex justify-between mb-8 px-2">
                            {days.map((day, index) => {
                                const isPast = index < currentDayIndex;
                                const isToday = index === currentDayIndex;
                                return (
                                    <div key={index} className="flex flex-col items-center gap-2">
                                        <div className="text-[10px] font-bold text-slate-400">{day}</div>
                                        <div className={`
                                            w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2
                                            ${isToday
                                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110'
                                                : isPast
                                                    ? 'bg-emerald-100 border-emerald-100 text-emerald-600'
                                                    : 'bg-slate-50 border-slate-100 text-slate-300'
                                            }
                                        `}>
                                            {isPast ? <Check size={14} /> : (index + 1)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <button
                            onClick={handleClaim}
                            disabled={isClaimed}
                            className={`
                                w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all
                                ${isClaimed
                                    ? 'bg-emerald-500 text-white shadow-emerald-200 scale-95'
                                    : 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02]'
                                }
                            `}
                        >
                            {isClaimed ? "Claimed!" : "Claim Reward"}
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
