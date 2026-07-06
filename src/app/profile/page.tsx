"use client";

import { useGameStore, currentStreak } from "@/store/useGameStore";
import { useTranslation } from "@/hooks/useTranslation";
import { useMounted } from "@/hooks/useMounted";
import { COURSES } from "@/data/courses";
import { Header } from "@/components/layout/Header";

export default function ProfilePage() {
    const { unlockedWords, masteredWords, streak, lastActiveDate, resetProgress } = useGameStore();
    const { language } = useTranslation();
    const mounted = useMounted();

    if (!mounted) return null;

    const coursesDone = COURSES.filter(c => c.lessons.every(l => masteredWords.includes(l.id))).length;
    const activeStreak = currentStreak(streak, lastActiveDate);
    const ja = language === 'ja';

    return (
        <div className="min-h-screen">
            <Header />
            <main className="p-6 flex flex-col items-center">
            <header className="w-full max-w-md mb-10 mt-6">
                <h1 className="font-serif text-4xl text-foreground">{ja ? '学習の記録' : 'Progress'}</h1>
            </header>

            <div className="w-full max-w-md space-y-10">
                <dl className="divide-y divide-border border-y border-border">
                    <div className="flex items-baseline justify-between py-4">
                        <dt className="text-sm text-muted-foreground">{ja ? '学んだ単語' : 'Words learned'}</dt>
                        <dd className="font-serif text-3xl text-foreground">{masteredWords.length}</dd>
                    </div>
                    <div className="flex items-baseline justify-between py-4">
                        <dt className="text-sm text-muted-foreground">{ja ? '修了したコース' : 'Courses completed'}</dt>
                        <dd className="font-serif text-3xl text-foreground">{coursesDone} / {COURSES.length}</dd>
                    </div>
                    <div className="flex items-baseline justify-between py-4">
                        <dt className="text-sm text-muted-foreground">{ja ? '連続学習日数' : 'Day streak'}</dt>
                        <dd className="font-serif text-3xl text-foreground">{activeStreak}</dd>
                    </div>
                    <div className="flex items-baseline justify-between py-4">
                        <dt className="text-sm text-muted-foreground">{ja ? '開放済みの単語' : 'Words unlocked'}</dt>
                        <dd className="font-serif text-3xl text-foreground">{unlockedWords.length}</dd>
                    </div>
                </dl>

                <button
                    onClick={() => {
                        if (confirm(ja ? '本当にすべての進捗をリセットしますか？この操作は取り消せません。' : 'Reset all progress? This cannot be undone.')) {
                            resetProgress();
                            window.location.reload();
                        }
                    }}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors underline underline-offset-4"
                >
                    {ja ? '進捗をリセット' : 'Reset progress'}
                </button>
            </div>
            </main>
        </div>
    );
}
