"use client";

import { COURSES } from "@/data/courses";
import { CourseCard } from "./CourseCard";

// Bento layout: span classes per course id; anything unlisted gets a plain cell.
const SPANS: Record<string, string> = {
    familiar: "sm:col-span-2",
    builder: "",
    inventions: "",
    "latin-roots": "sm:col-span-2",
};

export function CourseGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {COURSES.map(course => (
                <CourseCard key={course.id} course={course} className={SPANS[course.id] ?? ""} />
            ))}
        </div>
    );
}
