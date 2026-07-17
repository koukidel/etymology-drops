import { COURSES, findCourseByLesson, Course, CourseLesson } from "@/data/courses";
import { MasteryEntry } from "@/store/useGameStore";

export interface NextLesson {
    course: Course;
    lesson: CourseLesson;
}

/**
 * The learner's next lesson: the first unfinished lesson in the course they
 * touched most recently (per the mastery log), falling back to the first
 * unfinished course in path order.
 */
export function findNextLesson(masteryLog: MasteryEntry[], masteredWords: string[]): NextLesson | null {
    const nextIn = (courseId?: string): NextLesson | null => {
        const courses = courseId ? COURSES.filter(c => c.id === courseId) : COURSES;
        for (const course of courses) {
            const lesson = course.lessons.find(l => !masteredWords.includes(l.id));
            if (lesson) return { course, lesson };
        }
        return null;
    };
    for (let i = masteryLog.length - 1; i >= 0; i--) {
        const course = findCourseByLesson(masteryLog[i].id);
        if (!course) continue;
        const hit = nextIn(course.id);
        if (hit) return hit;
    }
    return nextIn();
}
