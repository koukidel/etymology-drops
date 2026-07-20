"use client";

import Link from "next/link";
import { COURSES } from "@/data/courses";
import { useGameStore } from "@/store/useGameStore";
import { useTranslation } from "@/hooks/useTranslation";
import { useMounted } from "@/hooks/useMounted";

// A "browse by exam goal" showcase: rounded-square tiles for the exam-targeted
// courses (英検・TOEIC), separate from the by-level bars above.
export function ExamShowcase({ locked = false, bare = false }: { locked?: boolean; bare?: boolean }) {
    const { masteredWords } = useGameStore();
    const { language } = useTranslation();
    const mounted = useMounted();

    const ja = language === "ja";
    const localized = (s: string | { en: string; ja: string }) =>
        typeof s === "string" ? s : s[language];

    // Completed courses sink to the end so the next thing to do stays first.
    const isDone = (c: (typeof COURSES)[number]) =>
        c.lessons.every(l => masteredWords.includes(l.id));
    const all = COURSES.filter(c => c.exam);
    const exams = mounted ? [...all.filter(c => !isDone(c)), ...all.filter(isDone)] : all;
    if (exams.length === 0) return null;

    return (
        <section className={bare ? undefined : "mt-12"}>
            {!bare && (
                <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    {ja ? "資格対策" : "Exam prep"}
                </h2>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {exams.map(course => {
                    const done = mounted ? course.lessons.filter(l => masteredWords.includes(l.id)).length : 0;
                    const total = course.lessons.length;
                    const complete = done === total;
                    return (
                        <Link
                            key={course.id}
                            href={`/course/${course.id}`}
                            aria-disabled={locked}
                            tabIndex={locked ? -1 : undefined}
                            className={`group flex flex-col rounded-2xl p-4 border border-border bg-card transition-all duration-150 ${locked ? "pointer-events-none opacity-50" : "hover:-translate-y-0.5 hover:border-accent/50 active:scale-[0.98]"} ${complete && !locked ? "opacity-70" : ""}`}
                        >
                            <span className="block font-serif text-xl leading-snug text-ochre">
                                {localized(course.exam!)}
                            </span>
                            <span className="block text-sm mt-0.5 text-muted-foreground">
                                {ja ? "対策単語" : "vocabulary"}
                            </span>
                            <span className="block h-0.5 rounded-full overflow-hidden mt-3 bg-muted">
                                <span className="block h-full bg-accent" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
                            </span>
                            <span className="text-xs tabular-nums mt-1.5 text-muted-foreground">
                                {done} / {total}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
