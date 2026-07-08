"use client";

import { COURSES, COURSE_LEVEL_LABEL, CourseLevel } from "@/data/courses";
import { CourseCard } from "./CourseCard";
import { useTranslation } from "@/hooks/useTranslation";

const LEVEL_ORDER: CourseLevel[] = ["beginner", "intermediate", "advanced"];

// A colour per level — sage / ochre / terracotta — for the level bars,
// so the path is easy to scan at a glance. Uses theme tokens so it
// adapts if the palette is swapped.
const LEVEL_STYLE: Record<CourseLevel, { text: string; bar: string }> = {
    beginner: { text: "text-sage", bar: "border-l-sage bg-sage/[0.08]" },
    intermediate: { text: "text-ochre", bar: "border-l-ochre bg-ochre/[0.08]" },
    advanced: { text: "text-accent", bar: "border-l-accent bg-accent/[0.07]" },
};

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
                const style = LEVEL_STYLE[level];
                return (
                    <section key={level}>
                        {/* level bar */}
                        <div className={`rounded-lg border border-border border-l-4 ${style.bar} px-5 py-3 mb-4`}>
                            <h2 className={`font-serif text-xl ${style.text}`}>
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
