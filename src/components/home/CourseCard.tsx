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
            className={`group flex flex-col justify-between rounded-xl p-6 transition-transform ${locked ? "pointer-events-none opacity-50" : "hover:-translate-y-0.5"} ${className}`}
            style={{ backgroundColor: "#3c4a34", boxShadow: "inset 0 0 0 1px #cba24c33" }}
        >
            <div>
                {course.exam && (
                    <div className="mb-3">
                        <span
                            className="text-[11px] uppercase tracking-[0.15em] rounded-full px-2.5 py-0.5"
                            style={{ color: "#d4a94a", boxShadow: "inset 0 0 0 1px #d4a94a66" }}
                        >
                            {localized(course.exam)}
                        </span>
                    </div>
                )}
                <h2 className="font-serif text-2xl mb-1" style={{ color: "#e8e0cc" }}>{localized(course.title)}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "#b9b59a" }}>{localized(course.description)}</p>
            </div>

            <div className="flex items-baseline justify-between mt-6">
                <span className="text-sm tabular-nums" style={{ color: "#a9ac8e" }}>
                    {done} / {total}
                </span>
                <span className="text-sm" style={{ color: "#d4a94a" }}>
                    {complete
                        ? (language === 'ja' ? '修了' : 'Complete')
                        : <>{language === 'ja' ? (done > 0 ? '続きから' : '始める') : (done > 0 ? 'Continue' : 'Start')} &rarr;</>}
                </span>
            </div>
        </Link>
    );
}
