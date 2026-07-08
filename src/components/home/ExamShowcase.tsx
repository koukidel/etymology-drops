"use client";

import Link from "next/link";
import { COURSES } from "@/data/courses";
import { useGameStore } from "@/store/useGameStore";
import { useTranslation } from "@/hooks/useTranslation";
import { useMounted } from "@/hooks/useMounted";

// A "browse by exam goal" showcase: rounded-square tiles for the exam-targeted
// courses (英検・TOEIC), separate from the by-level bars above.
export function ExamShowcase() {
    const { masteredWords } = useGameStore();
    const { language } = useTranslation();
    const mounted = useMounted();

    const ja = language === "ja";
    const localized = (s: string | { en: string; ja: string }) =>
        typeof s === "string" ? s : s[language];

    const exams = COURSES.filter(c => c.exam);
    if (exams.length === 0) return null;

    return (
        <section className="mt-12">
            <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                {ja ? "資格対策" : "Exam prep"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {exams.map(course => {
                    const done = mounted ? course.lessons.filter(l => masteredWords.includes(l.id)).length : 0;
                    const total = course.lessons.length;
                    return (
                        <Link
                            key={course.id}
                            href={`/course/${course.id}`}
                            className="group aspect-square flex flex-col justify-between rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
                            style={{ backgroundColor: "#3c4a34", boxShadow: "inset 0 0 0 1px #cba24c33" }}
                        >
                            <div>
                                <span className="block font-serif text-xl leading-snug" style={{ color: "#d4a94a" }}>
                                    {localized(course.exam!)}
                                </span>
                                <span className="block text-sm mt-0.5" style={{ color: "#c6c1a4" }}>
                                    {ja ? "対策単語" : "vocabulary"}
                                </span>
                            </div>
                            <span className="text-xs tabular-nums" style={{ color: "#a9ac8e" }}>
                                {done} / {total}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
