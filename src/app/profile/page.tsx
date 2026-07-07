"use client";

import { useGameStore, currentStreak } from "@/store/useGameStore";
import { useTranslation } from "@/hooks/useTranslation";
import { useMounted } from "@/hooks/useMounted";
import { COURSES } from "@/data/courses";
import { allWords } from "@/data/words";
import { Header } from "@/components/layout/Header";

export default function ProfilePage() {
    const { masteredWords, masteryLog, streak, lastActiveDate, resetProgress } = useGameStore();
    const { language } = useTranslation();
    const mounted = useMounted();

    if (!mounted) return null;

    const coursesDone = COURSES.filter(c => c.lessons.every(l => masteredWords.includes(l.id))).length;
    const activeStreak = currentStreak(streak, lastActiveDate);
    const ja = language === 'ja';

    const wordLabel = (id: string) => allWords.find(w => w.id === id)?.word ?? id;

    const tiles = [
        { label: ja ? '学んだ単語' : 'Words learned', value: `${masteredWords.length}` },
        { label: ja ? '連続学習日数' : 'Day streak', value: `${activeStreak}` },
        { label: ja ? '修了コース' : 'Courses done', value: `${coursesDone} / ${COURSES.length}` },
    ];

    // Most recent masteries first; undated (migrated) entries sort last.
    const recent = [...masteryLog]
        .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
        .slice(0, 8);

    return (
        <div className="min-h-screen">
            <Header />
            <main className="p-6 flex flex-col items-center">
                <header className="w-full max-w-xl mb-10 mt-6">
                    <h1 className="font-serif text-4xl text-foreground">Progress</h1>
                </header>

                <div className="w-full max-w-xl space-y-12">
                    {/* Stat tiles */}
                    <div className="grid grid-cols-3 gap-4">
                        {tiles.map(t => (
                            <div key={t.label} className="border border-border rounded-xl bg-card p-5">
                                <div className="font-serif text-3xl text-foreground">{t.value}</div>
                                <div className="text-xs text-muted-foreground mt-1">{t.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Per-course progress */}
                    <section>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                            {ja ? 'コース' : 'Courses'}
                        </h2>
                        <div className="space-y-4">
                            {COURSES.map(course => {
                                const done = course.lessons.filter(l => masteredWords.includes(l.id)).length;
                                const total = course.lessons.length;
                                const pct = Math.round((done / total) * 100);
                                return (
                                    <div key={course.id}>
                                        <div className="flex items-baseline justify-between mb-1.5">
                                            <span className="font-serif text-lg text-foreground">
                                                {typeof course.title === 'string' ? course.title : course.title[language]}
                                            </span>
                                            <span className="text-sm text-muted-foreground">{done} / {total}</span>
                                        </div>
                                        <div className="h-1 rounded-full bg-muted overflow-hidden">
                                            <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Recent history */}
                    {recent.length > 0 && (
                        <section>
                            <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                                {ja ? '最近学んだ言葉' : 'Recently learned'}
                            </h2>
                            <ul className="divide-y divide-border border-y border-border">
                                {recent.map(entry => (
                                    <li key={entry.id} className="flex items-baseline justify-between py-3">
                                        <span className="font-serif text-lg text-foreground">{wordLabel(entry.id)}</span>
                                        <span className="text-sm text-muted-foreground">
                                            {entry.date ?? (ja ? '以前' : 'earlier')}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

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
