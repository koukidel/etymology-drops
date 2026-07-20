"use client";

import Link from "next/link";
import { Course } from "@/data/courses";
import { useTranslation } from "@/hooks/useTranslation";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

interface Props {
    course: Course;
    className?: string;
    locked?: boolean;
}

export function CourseCard({ course, className = "", locked = false }: Props) {
    const { language } = useTranslation();
    const { masteredWords } = useGameStore();
    const mounted = useMounted();

    const localized = (s: string | { en: string; ja: string }) =>
        typeof s === 'string' ? s : s[language];

    const done = mounted ? course.lessons.filter(l => masteredWords.includes(l.id)).length : 0;
    const total = course.lessons.length;
    const complete = done === total;

    return (
        <Link
            href={`/course/${course.id}`}
            aria-disabled={locked}
            tabIndex={locked ? -1 : undefined}
            className={`group flex flex-col justify-between rounded-xl p-6 border border-border bg-card transition-all duration-150 ${locked ? "pointer-events-none opacity-50" : "hover:-translate-y-0.5 hover:border-accent/50 active:scale-[0.98]"} ${complete && !locked ? "opacity-70" : ""} ${className}`}
        >
            <div>
                {course.exam && (
                    <div className="mb-3">
                        <span className="text-[11px] uppercase tracking-[0.15em] rounded-full px-2.5 py-0.5 text-ochre border border-ochre/40">
                            {localized(course.exam)}
                        </span>
                    </div>
                )}
                <h2 className="font-serif text-2xl text-foreground">{localized(course.title)}</h2>
            </div>

            <div className="h-0.5 rounded-full overflow-hidden mt-4 bg-muted">
                <div className="h-full bg-accent" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
            </div>
            <div className="flex items-baseline justify-between mt-2">
                <span className="text-sm tabular-nums text-muted-foreground">
                    {done} / {total}
                </span>
                <span className={`text-sm ${complete ? "text-celebrate" : "text-accent"}`}>
                    {complete
                        ? (language === 'ja' ? '修了' : 'Complete')
                        : <>{language === 'ja' ? (done > 0 ? '続きから' : '始める') : (done > 0 ? 'Continue' : 'Start')} &rarr;</>}
                </span>
            </div>
        </Link>
    );
}
