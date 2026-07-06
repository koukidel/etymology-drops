"use client";

import { useEffect, useState } from "react";
import { useGameStore, currentStreak } from "@/store/useGameStore";
import { useTranslation } from "@/hooks/useTranslation";
import { CAMPAIGN_LEVELS } from "@/data/campaignLevels";
import Link from "next/link";

export default function ProfilePage() {
    const { unlockedWords, masteredWords, streak, lastActiveDate, resetProgress } = useGameStore();
    const { language } = useTranslation();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const chaptersDone = CAMPAIGN_LEVELS.filter(l => masteredWords.includes(l.id)).length;
    const activeStreak = currentStreak(streak, lastActiveDate);
    const ja = language === 'ja';

    return (
        <main className="min-h-screen p-6 flex flex-col items-center">
            <header className="w-full max-w-md mb-10">
                <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 mb-6 inline-block">
                    &larr; {ja ? 'パスに戻る' : 'Back to the path'}
                </Link>
                <h1 className="font-serif text-4xl text-slate-900">{ja ? '学習の記録' : 'Progress'}</h1>
            </header>

            <div className="w-full max-w-md space-y-10">
                <dl className="divide-y divide-slate-200 border-y border-slate-200">
                    <div className="flex items-baseline justify-between py-4">
                        <dt className="text-sm text-slate-500">{ja ? '学んだ単語' : 'Words learned'}</dt>
                        <dd className="font-serif text-3xl text-slate-900">{masteredWords.length}</dd>
                    </div>
                    <div className="flex items-baseline justify-between py-4">
                        <dt className="text-sm text-slate-500">{ja ? '完了した章' : 'Chapters completed'}</dt>
                        <dd className="font-serif text-3xl text-slate-900">{chaptersDone} / {CAMPAIGN_LEVELS.length}</dd>
                    </div>
                    <div className="flex items-baseline justify-between py-4">
                        <dt className="text-sm text-slate-500">{ja ? '連続学習日数' : 'Day streak'}</dt>
                        <dd className="font-serif text-3xl text-slate-900">{activeStreak}</dd>
                    </div>
                    <div className="flex items-baseline justify-between py-4">
                        <dt className="text-sm text-slate-500">{ja ? '開放済みの単語' : 'Words unlocked'}</dt>
                        <dd className="font-serif text-3xl text-slate-900">{unlockedWords.length}</dd>
                    </div>
                </dl>

                <button
                    onClick={() => {
                        if (confirm(ja ? '本当にすべての進捗をリセットしますか？この操作は取り消せません。' : 'Reset all progress? This cannot be undone.')) {
                            resetProgress();
                            window.location.reload();
                        }
                    }}
                    className="text-sm text-slate-400 hover:text-red-600 transition-colors underline underline-offset-4"
                >
                    {ja ? '進捗をリセット' : 'Reset progress'}
                </button>
            </div>
        </main>
    );
}
