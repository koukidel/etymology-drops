import Link from "next/link";
import { ArrowRight, Trophy, Lock, Star } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { expandedWords } from "@/data/expandedWords";
import { motion } from "framer-motion";

// Defined order of progression
const MASTER_IDS = [
    "precept", "detain", "intermittent", "offer", "insist",
    "monograph", "epilogue", "aspect", "uncomplicated",
    "nonextended", "reproduction", "indisposed",
    "oversufficient", "mistranscribe"
];

export function HeroMission() {
    const { unlockedWords, masteredWords } = useGameStore();

    // 1. Find the first word that is UNLOCKED but NOT MASTERED
    const currentMissionId = MASTER_IDS.find(id =>
        unlockedWords.includes(id) && !masteredWords.includes(id)
    );

    const missionWord = expandedWords.find(w => w.id === currentMissionId);

    // 2. Fallback: If all unlocked are mastered, find the NEXT LOCKED word
    // (In a real app, this might trigger a "Level Up" event)
    const nextLockedId = !missionWord
        ? MASTER_IDS.find(id => !unlockedWords.includes(id))
        : null;

    if (missionWord) {
        return (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 relative overflow-hidden rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-200"
            >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-200 font-bold tracking-widest text-xs uppercase mb-2">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            Current Objective
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black mb-2">Master "{missionWord.word}"</h2>
                        <p className="text-indigo-100 max-w-md text-lg leading-relaxed">
                            {missionWord.meaning} proving you command the root <strong>-{missionWord.blocks.find(b => b.type === 'root')?.label}</strong>.
                        </p>
                    </div>

                    <Link
                        href={`/master/${missionWord.id}`}
                        className="group whitespace-nowrap bg-white text-indigo-600 px-8 py-4 rounded-xl font-black text-lg shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all flex items-center gap-3"
                    >
                        Start Mission
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        );
    }

    if (nextLockedId) {
        return (
            <div className="mb-8 p-8 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-300 text-center">
                <h3 className="text-xl font-bold text-slate-500 mb-2">All Current Missions Complete!</h3>
                <p className="text-slate-400">Visit the Game Store or finish a Quiz to unlock <strong>Next Level</strong>.</p>
            </div>
        );
    }

    return null; // All words mastered?
}
