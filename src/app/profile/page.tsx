"use client";

import Link from "next/link";
import { useGameStore, currentStreak } from "@/store/useGameStore";
import { useTranslation } from "@/hooks/useTranslation";
import { useMounted } from "@/hooks/useMounted";
import { COURSES } from "@/data/courses";
import { allWords } from "@/data/words";
import { Header } from "@/components/layout/Header";
import { GrowthTree } from "@/components/progress/GrowthTree";
import { CountUp } from "@/components/ui/CountUp";
import { localDate } from "@/lib/date";

export default function ProfilePage() {
    const { masteredWords, masteryLog, streak, lastActiveDate, missedParts, resetProgress } = useGameStore();
    const { t, language } = useTranslation();
    const mounted = useMounted();

    if (!mounted) return null;

    const coursesDone = COURSES.filter(c => c.lessons.every(l => masteredWords.includes(l.id))).length;
    const activeStreak = currentStreak(streak, lastActiveDate);
    const ja = language === 'ja';

    const wordLabel = (id: string) => allWords.find(w => w.id === id)?.word ?? id;

    const tiles = [
        { label: ja ? '学んだ単語' : 'Words learned', value: masteredWords.length, suffix: '' },
        { label: ja ? '連続学習日数' : 'Day streak', value: activeStreak, suffix: '' },
        { label: ja ? '修了コース' : 'Courses done', value: coursesDone, suffix: ` / ${COURSES.length}` },
    ];

    // Last 7 days as habit dots: filled = at least one word mastered that day.
    const activeDays = new Set(masteryLog.map(e => e.date).filter(Boolean));
    const week = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return { iso: localDate(d), active: activeDays.has(localDate(d)) };
    });

    // Most recent masteries first; undated (migrated) entries sort last.
    const recent = [...masteryLog]
        .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
        .slice(0, 8);

    // Weak parts: most-missed quiz parts (2+ misses), with a lesson to revisit.
    const weakParts = Object.entries(missedParts)
        .filter(([, n]) => n >= 2)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([partId, misses]) => {
            const carrier = allWords.find(w => w.blocks.some(b => b.id === partId));
            const block = carrier?.blocks.find(b => b.id === partId);
            return block && carrier ? { partId, misses, label: block.label.replace(/-/g, ''), lessonId: carrier.id } : null;
        })
        .filter((x): x is NonNullable<typeof x> => x !== null);

    return (
        <div className="min-h-screen">
            <Header />
            <main className="p-6 flex flex-col items-center">
                <header className="w-full max-w-xl mb-10 mt-6">
                    <h1 className="font-serif text-4xl text-foreground">Progress</h1>
                </header>

                <div className="w-full max-w-xl space-y-12">
                    {/* Growth tree */}
                    <GrowthTree />

                    {/* Stat tiles */}
                    <div className="grid grid-cols-3 gap-4">
                        {tiles.map(tile => (
                            <div key={tile.label} className="border border-border rounded-xl bg-card p-5">
                                <div className="font-serif text-3xl text-foreground tabular-nums">
                                    <CountUp value={tile.value} />{tile.suffix}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">{tile.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* 7-day habit dots: gaps are visible, which is the point. */}
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{ja ? '直近7日' : 'Last 7 days'}</span>
                        <span className="flex items-center gap-2">
                            {week.map(d => (
                                <span
                                    key={d.iso}
                                    title={d.iso}
                                    className={`inline-block w-2.5 h-2.5 rounded-full ${d.active ? 'bg-accent' : 'border border-border'}`}
                                />
                            ))}
                        </span>
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

                    {/* Weak parts */}
                    {weakParts.length > 0 && (
                        <section>
                            <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
                                {t('progress.weak_parts')}
                            </h2>
                            <p className="text-xs text-muted-foreground mb-4">{t('progress.weak_parts.hint')}</p>
                            <div className="flex flex-wrap gap-2.5">
                                {weakParts.map(p => (
                                    <Link
                                        key={p.partId}
                                        href={`/lesson/${p.lessonId}`}
                                        className="inline-flex items-baseline gap-2 rounded-full border border-border px-4 py-1.5 hover:border-accent transition-colors"
                                    >
                                        <span className="font-serif text-lg text-foreground">{p.label}</span>
                                        <span className="text-xs text-error tabular-nums">×{p.misses}</span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

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

                    <div className="flex items-center gap-6">
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

                        {/* DEV ONLY — remove before sharing. Wipes everything including
                            the intake/tutorial/Lesson-0 flags so the whole first-run
                            funnel can be replayed from scratch. */}
                        <button
                            onClick={() => {
                                if (confirm(ja ? '【開発用】オンボーディングを含む全データを消去して最初からやり直しますか？' : '[DEV] Wipe everything (incl. onboarding) and start over?')) {
                                    localStorage.removeItem('etymology-quest-storage');
                                    localStorage.removeItem('minamoto_unlock_toast');
                                    window.location.href = '/';
                                }
                            }}
                            className="text-sm text-muted-foreground/60 hover:text-accent transition-colors underline underline-offset-4"
                        >
                            {ja ? '完全リセット（開発用）' : 'Full reset (dev)'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
