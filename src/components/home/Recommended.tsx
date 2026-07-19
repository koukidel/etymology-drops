"use client";

import Link from "next/link";
import { COURSES } from "@/data/courses";
import { allWords } from "@/data/words";
import { useGameStore, LearnerLevel } from "@/store/useGameStore";
import { useTranslation } from "@/hooks/useTranslation";
import { useMounted } from "@/hooks/useMounted";

interface Pick {
    lessonId: string;
    lessonTitle: string;
    courseTitle: string;
}

export function Recommended() {
    const { profile, masteredWords } = useGameStore();
    const { language } = useTranslation();
    const mounted = useMounted();
    if (!mounted) return null;

    const ja = language === "ja";
    const localized = (s: string | { en: string; ja: string }) =>
        typeof s === "string" ? s : s[language];

    const level: LearnerLevel = profile?.selfLevel ?? "beginner";

    // Respect the intake commitment: a light learner gets one clear pick, a
    // serious one gets a wider spread. (light=1 / steady=3 / serious=5)
    const cap = profile?.commitment === "light" ? 1 : profile?.commitment === "serious" ? 5 : 3;

    // The next lesson to do in each course at the chosen level: first lesson
    // not yet mastered. Skip fully-completed courses.
    const picks: Pick[] = [];
    for (const course of COURSES.filter(c => c.level === level)) {
        const next = course.lessons.find(l => !masteredWords.includes(l.id));
        if (!next) continue;
        const wd = allWords.find(w => w.id === next.id);
        picks.push({
            lessonId: next.id,
            lessonTitle: wd ? wd.word : localized(next.title),
            courseTitle: localized(course.title),
        });
        if (picks.length >= cap) break;
    }

    if (picks.length === 0) return null;

    return (
        <section className="mb-12">
            <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {ja ? "あなたへのおすすめ" : "Recommended for you"}
                </h2>
                {!profile && (
                    <Link href="/intake" className="text-xs text-muted-foreground hover:text-accent underline underline-offset-4">
                        {ja ? "レベルを設定" : "Set your level"}
                    </Link>
                )}
            </div>

            {/* Light cards: the dark plate is reserved for the hero and the
                funnel so "special" stays special. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {picks.map(p => (
                    <Link key={p.lessonId} href={`/lesson/${p.lessonId}`} className="group flex items-center gap-3 rounded-xl px-4 py-3 border border-border bg-card transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/50 active:scale-[0.98]">
                        <span className="min-w-0">
                            <span className="block font-serif text-lg truncate text-foreground">{p.lessonTitle}</span>
                        </span>
                        <span className="ml-auto text-accent">→</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
