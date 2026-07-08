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
        if (picks.length >= 5) break;
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {picks.map(p => (
                    <Link key={p.lessonId} href={`/lesson/${p.lessonId}`} className="group flex items-center gap-3 rounded-xl px-4 py-3 transition-transform hover:-translate-y-0.5" style={{ backgroundColor: "#3c4a34", boxShadow: "inset 0 0 0 1px #cba24c33" }}>
                        <span className="min-w-0">
                            <span className="block font-serif text-lg truncate" style={{ color: "#e8e0cc" }}>{p.lessonTitle}</span>
                            <span className="block text-xs truncate" style={{ color: "#b9b59a" }}>{p.courseTitle}</span>
                        </span>
                        <span className="ml-auto" style={{ color: "#d4a94a" }}>→</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
