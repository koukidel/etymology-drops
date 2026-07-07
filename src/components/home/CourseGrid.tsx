"use client";

import { COURSES, COURSE_LEVEL_LABEL, CourseLevel } from "@/data/courses";
import { CourseCard } from "./CourseCard";
import { useTranslation } from "@/hooks/useTranslation";

const LEVEL_ORDER: CourseLevel[] = ["beginner", "intermediate", "advanced"];

// Full-width, stacked level sections: a level "bar" header, then that level's
// courses as full-width rows (no bento grid).
export function CourseGrid() {
    const { language } = useTranslation();
    const localized = (s: string | { en: string; ja: string }) =>
        typeof s === "string" ? s : s[language];

    return (
        <div className="space-y-10">
            {LEVEL_ORDER.map(level => {
                const courses = COURSES.filter(c => c.level === level);
                if (courses.length === 0) return null;
                return (
                    <section key={level}>
                        {/* level bar */}
                        <div className="rounded-lg bg-foreground/[0.04] border border-border px-5 py-3 mb-4">
                            <h2 className="font-serif text-xl text-foreground">
                                {localized(COURSE_LEVEL_LABEL[level])}
                            </h2>
                        </div>
                        <div className="space-y-3">
                            {courses.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
