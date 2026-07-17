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
            className={`group flex flex-col justify-between rounded-xl p-6 transition-transform duration-150 ${locked ? "pointer-events-none opacity-50" : "hover:-translate-y-0.5 active:scale-[0.98]"} ${className}`}
            style={{ background: "var(--plate)", boxShadow: "var(--plate-ring)" }}
        >
            <div>
                {course.exam && (
                    <div className="mb-3">
                        <span
                            className="text-[11px] uppercase tracking-[0.15em] rounded-full px-2.5 py-0.5"
                            style={{ color: "var(--plate-gold)", boxShadow: "var(--plate-gold-ring)" }}
                        >
                            {localized(course.exam)}
                        </span>
                    </div>
                )}
                <h2 className="font-serif text-2xl mb-1" style={{ color: "var(--plate-fg)" }}>{localized(course.title)}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--plate-body)" }}>{localized(course.description)}</p>
            </div>

            <div className="flex items-baseline justify-between mt-6">
                <span className="text-sm tabular-nums" style={{ color: "var(--plate-dim)" }}>
                    {done} / {total}
                </span>
                <span className="text-sm" style={{ color: "var(--plate-gold)" }}>
                    {complete
                        ? (language === 'ja' ? '修了' : 'Complete')
                        : <>{language === 'ja' ? (done > 0 ? '続きから' : '始める') : (done > 0 ? 'Continue' : 'Start')} &rarr;</>}
                </span>
            </div>
        </Link>
    );
}
