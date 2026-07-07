"use client";

import { COURSES, COURSE_LEVEL_LABEL, CourseLevel } from "@/data/courses";
import { CourseCard } from "./CourseCard";
import { useTranslation } from "@/hooks/useTranslation";

const LEVEL_ORDER: CourseLevel[] = ["beginner", "intermediate", "advanced"];

export function CourseGrid() {
    const { language } = useTranslation();
    const localized = (s: string | { en: string; ja: string }) =>
        typeof s === "string" ? s : s[language];

    return (
        <div className="space-y-12">
            {LEVEL_ORDER.map(level => {
                const courses = COURSES.filter(c => c.level === level);
                if (courses.length === 0) return null;
                return (
                    <section key={level}>
                        <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                            {localized(COURSE_LEVEL_LABEL[level])}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
