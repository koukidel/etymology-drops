"use client";

import Link from "next/link";
import { Course, COURSE_LEVEL_LABEL } from "@/data/courses";
import { useTranslation } from "@/hooks/useTranslation";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";

interface Props {
    course: Course;
    className?: string;
}

export function CourseCard({ course, className = "" }: Props) {
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
            className={`group flex flex-col justify-between border border-border bg-card rounded-xl p-6 hover:border-muted-foreground transition-colors ${className}`}
        >
            <div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
                        {localized(COURSE_LEVEL_LABEL[course.level])}
                    </span>
                    {course.exam && (
                        <span className="text-[11px] uppercase tracking-[0.15em] text-accent border border-accent/40 rounded-full px-2.5 py-0.5">
                            {localized(course.exam)}
                        </span>
                    )}
                </div>
                <h2 className="font-serif text-2xl text-foreground mb-1">{localized(course.title)}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{localized(course.description)}</p>
            </div>

            <div className="flex items-baseline justify-between mt-6">
                <span className="text-sm text-muted-foreground">
                    {done} / {total}
                </span>
                <span className={`text-sm transition-colors ${complete ? "text-muted-foreground" : "text-accent"}`}>
                    {complete
                        ? (language === 'ja' ? '修了' : 'Complete')
                        : <>{language === 'ja' ? (done > 0 ? '続きから' : '始める') : (done > 0 ? 'Continue' : 'Start')} &rarr;</>}
                </span>
            </div>
        </Link>
    );
}
