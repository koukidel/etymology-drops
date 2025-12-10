"use client";

import { LevelNode } from "@/components/path/LevelNode";
import { levels } from "@/data/levels";
import { useGameStore } from "@/store/useGameStore";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Settings } from "lucide-react";
import * as Icons from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";

export default function PathPage() {
    const { xp } = useGameStore();
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <main className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col">
            {/* Background Pattern */}
            <div className="fixed inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(#6366f1 1px, transparent 1px)",
                    backgroundSize: "24px 24px"
                }}
            />

            {/* Top Bar */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-indigo-600 w-6 h-6" />
                    <span className="font-bold text-slate-900">{t('app.title')}</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                        <Trophy size={16} className="text-amber-500" />
                        <span className="font-bold text-amber-700">{xp} XP</span>
                    </div>
                    {/* N badge will appear here via BadgeFixer (bottom-left positioning removed, now top-right near XP) */}
                </div>
            </header>

            {/* The Path Map */}
            <div className="flex-1 pt-32 pb-40 flex flex-col items-center relative select-none w-full max-w-md mx-auto">
                {levels.map((level, index) => {
                    const isUnlocked = xp >= level.requiredXp;
                    const isCompleted = xp >= (levels[index + 1]?.requiredXp || 9999);
                    const status = isCompleted ? 'completed' : isUnlocked ? 'unlocked' : 'locked';

                    // Only show line if there is a next level
                    const hasNext = index < levels.length - 1;

                    return (
                        <div key={level.id} className="w-full flex flex-col items-center gap-2">
                            <LevelNode
                                level={level}
                                status={status}
                                index={index}
                                onClick={() => {
                                    if (isUnlocked) {
                                        router.push(`/lesson/${level.id}`)
                                    }
                                }}
                            />

                            {/* Connecting Line to next node - very short */}
                            {hasNext && (
                                <div className={`w-0.5 h-3 ${isCompleted ? 'bg-indigo-400' : 'bg-slate-300'}`} />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Dev Helper: Quick XP */}
            <div className="fixed bottom-4 right-4 z-50 opacity-50 hover:opacity-100 transition-opacity">
                <button
                    onClick={() => useGameStore.getState().addXp(100)}
                    className="bg-slate-800 text-white text-xs px-2 py-1 rounded shadow"
                >
                    +100 XP (Dev)
                </button>
            </div>

            {/* Mock Nav Bar Removed - Use Global BottomNav */}

        </main>
    );
}

// Simple internal NavButton component
import { clsx } from 'clsx';
const NavButton = ({ icon, label, active }: any) => {
    const Icon = (Icons as any)[icon] || Icons.Circle;
    return (
        <div className={clsx(
            "flex flex-col items-center gap-1 cursor-pointer transition-colors",
            active ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
        )}>
            <Icon size={24} />
            <span className="text-[10px] font-bold uppercase tracking-wide">{label}</span>
        </div>
    );
}
