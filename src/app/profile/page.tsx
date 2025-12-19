"use client";

import { useGameStore } from "@/store/useGameStore";
import { User, Settings, Award, Clock } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const { xp, unlockedWords, masteredWords } = useGameStore();

    return (
        <main className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
            <header className="w-full max-w-md mb-8">
                <Link href="/path" className="text-sm font-bold text-slate-400 hover:text-indigo-600 mb-4 inline-block">
                    &larr; Back to Path
                </Link>
                <h1 className="text-3xl font-black text-slate-900">Agent Profile</h1>
            </header>

            <div className="w-full max-w-md space-y-6">
                {/* ID Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 flex flex-col items-center">
                    <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                        <User size={48} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Etymologist</h2>
                    <div className="flex gap-2 mt-2">
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 font-bold rounded-full text-xs uppercase tracking-wider">
                            Level {Math.floor(xp / 1000) + 1}
                        </span>
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 font-bold rounded-full text-xs uppercase tracking-wider">
                            {xp} XP
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <Award className="text-emerald-500 mb-2" />
                        <div className="text-2xl font-black text-slate-900">{masteredWords.length}</div>
                        <div className="text-xs text-slate-500 font-bold uppercase">Mastered Roots</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <Clock className="text-blue-500 mb-2" />
                        <div className="text-2xl font-black text-slate-900">{unlockedWords.length}</div>
                        <div className="text-xs text-slate-500 font-bold uppercase">Unlocked</div>
                    </div>
                </div>

                {/* Settings Link */}
                <Link href="/settings" className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <Settings size={20} className="text-slate-400" />
                        <span className="font-bold text-slate-700">Settings</span>
                    </div>
                    <span className="text-slate-400">&rarr;</span>
                </Link>

                {/* Reset Progress Button */}
                <button
                    onClick={() => {
                        if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
                            useGameStore.getState().resetProgress();
                            window.location.reload();
                        }
                    }}
                    className="w-full p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 hover:bg-red-100 transition-colors font-bold text-sm flex items-center justify-center gap-2"
                >
                    Reset Progress (Start Over)
                </button>
            </div>
        </main>
    );
}
