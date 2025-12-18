"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Zap, Gem, Flame, X, Star } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useState, useEffect } from "react";
import { CAMPAIGN_LEVELS } from "@/data/campaignLevels";

interface StatsDisplayProps {
    isOpen: boolean;
    onClose: () => void;
}

export function StatsDisplay({ isOpen, onClose }: StatsDisplayProps) {
    const { xp, gems, streak, masteredWords, achievements } = useGameStore();
    const [masteryPercentage, setMasteryPercentage] = useState(0);

    useEffect(() => {
        const total = CAMPAIGN_LEVELS.length;
        const mastered = masteredWords.length;
        setMasteryPercentage(Math.round((mastered / total) * 100));
    }, [masteredWords]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-3xl z-[101] overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Trophy size={120} />
                            </div>
                            <h2 className="text-2xl font-black mb-1 relative z-10">Your Legend</h2>
                            <p className="text-indigo-100 relative z-10">Keep growing your etymological power!</p>

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-20"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Main Stats Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* XP Card */}
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative overflow-hidden group">
                                    <div className="absolute -right-4 -bottom-4 text-amber-100 group-hover:scale-110 transition-transform z-0">
                                        <Zap size={80} />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 text-amber-500 mb-1">
                                            <Zap size={18} fill="currentColor" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Total XP</span>
                                        </div>
                                        <div className="text-3xl font-black text-slate-800">
                                            {xp.toLocaleString()}
                                        </div>
                                    </div>
                                    {/* Progress Bar (Visual only for now) */}
                                    <div className="mt-3 h-1.5 bg-slate-200 rounded-full overflow-hidden relative z-10">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(xp % 1000) / 10}%` }}
                                            className="h-full bg-amber-400 rounded-full"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-1 text-right relative z-10">
                                        {1000 - (xp % 1000)} to next rank
                                    </p>
                                </div>

                                {/* Gems Card */}
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative overflow-hidden group">
                                    <div className="absolute -right-4 -bottom-4 text-cyan-100 group-hover:scale-110 transition-transform z-0">
                                        <Gem size={80} />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 text-cyan-500 mb-1">
                                            <Gem size={18} fill="currentColor" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Gems</span>
                                        </div>
                                        <div className="text-3xl font-black text-slate-800">
                                            {gems.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Streak & Mastery Row */}
                            <div className="grid grid-cols-3 gap-4">
                                {/* Streak */}
                                <div className="col-span-1 bg-orange-50 p-4 rounded-2xl border border-orange-100 flex flex-col items-center justify-center text-center">
                                    <div className="mb-2 relative">
                                        <Flame size={32} className={`${streak > 0 ? 'text-orange-500 fill-orange-500 animate-pulse' : 'text-slate-300'}`} />
                                        {streak > 7 && (
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className="absolute -top-1 -right-1"
                                            >
                                                <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                                            </motion.div>
                                        )}
                                    </div>
                                    <div className="text-xl font-black text-slate-800">{streak}</div>
                                    <div className="text-[10px] font-bold text-orange-600 uppercase">Day Streak</div>
                                </div>

                                {/* Mastery Progress */}
                                <div className="col-span-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                                    <div className="relative w-16 h-16 shrink-0">
                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                            <path
                                                className="text-slate-200"
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                            />
                                            <motion.path
                                                className="text-indigo-600"
                                                initial={{ strokeDasharray: "0, 100" }}
                                                animate={{ strokeDasharray: `${masteryPercentage}, 100` }}
                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">
                                            {masteryPercentage}%
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-800">Mastery</div>
                                        <div className="text-xs text-slate-500">
                                            {masteredWords.length} / {CAMPAIGN_LEVELS.length} Words Mastered
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Achievements */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Recent Achievements</h3>
                                {achievements.length > 0 ? (
                                    <div className="space-y-2">
                                        {achievements.slice(-3).reverse().map((achievement) => (
                                            <div key={achievement.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                <div className="text-2xl">{achievement.icon}</div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-800">{achievement.title}</div>
                                                    <div className="text-xs text-slate-500">{achievement.description}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-4 text-slate-400 text-sm bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                                        No achievements yet. Keep playing!
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
