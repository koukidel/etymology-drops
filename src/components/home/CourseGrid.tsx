"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { COURSES, COURSE_LEVEL_LABEL, CourseLevel } from "@/data/courses";
import { CourseCard } from "./CourseCard";
import { ExamShowcase } from "./ExamShowcase";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";

type SectionKey = CourseLevel | "exams";

const SECTION_ORDER: SectionKey[] = ["beginner", "intermediate", "advanced", "exams"];

// A colour per section — leaf / brass / pine / brass — so the path scans
// at a glance. Uses theme tokens so it adapts if the palette is swapped.
const SECTION_STYLE: Record<SectionKey, { text: string; bar: string }> = {
    beginner: { text: "text-sage", bar: "border-l-sage bg-sage/[0.08]" },
    intermediate: { text: "text-ochre", bar: "border-l-ochre bg-ochre/[0.08]" },
    advanced: { text: "text-accent", bar: "border-l-accent bg-accent/[0.07]" },
    exams: { text: "text-ochre", bar: "border-l-ochre bg-ochre/[0.08]" },
};

// Collapsible sections: 初級 / 中級 / 上級 / 資格対策. Each bar shows the
// aggregate progress so the whole path scans without opening anything.
export function CourseGrid({ locked = false }: { locked?: boolean }) {
    const { language } = useTranslation();
    const { masteredWords } = useGameStore();
    const mounted = useMounted();
    const reduce = useReducedMotion();
    const [open, setOpen] = useState<Record<SectionKey, boolean>>({
        beginner: true, intermediate: false, advanced: false, exams: false,
    });

    const localized = (s: string | { en: string; ja: string }) =>
        typeof s === "string" ? s : s[language];
    const ja = language === "ja";

    const toggle = (key: SectionKey) =>
        setOpen(o => ({ ...o, [key]: !o[key] }));

    const sectionCourses = (key: SectionKey) =>
        key === "exams" ? COURSES.filter(c => c.exam) : COURSES.filter(c => c.level === key);

    const progress = (key: SectionKey) => {
        const courses = sectionCourses(key);
        const total = courses.reduce((n, c) => n + c.lessons.length, 0);
        const done = mounted
            ? courses.reduce((n, c) => n + c.lessons.filter(l => masteredWords.includes(l.id)).length, 0)
            : 0;
        return { done, total };
    };

    return (
        <div className="space-y-4">
            {SECTION_ORDER.map(key => {
                const courses = sectionCourses(key);
                if (courses.length === 0) return null;
                const style = SECTION_STYLE[key];
                const { done, total } = progress(key);
                const label = key === "exams"
                    ? (ja ? "資格対策" : "Exam prep")
                    : localized(COURSE_LEVEL_LABEL[key]);
                const isOpen = open[key];
                return (
                    <section key={key}>
                        <button
                            type="button"
                            onClick={() => toggle(key)}
                            aria-expanded={isOpen}
                            className={`w-full flex items-center justify-between rounded-lg border border-border border-l-4 ${style.bar} px-5 py-3 transition-transform active:scale-[0.99]`}
                        >
                            <h2 className={`font-serif text-xl ${style.text}`}>{label}</h2>
                            <span className="flex items-center gap-3">
                                <span className="text-xs tabular-nums text-muted-foreground">{done} / {total}</span>
                                <motion.span
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: reduce ? 0 : 0.2 }}
                                    className="text-muted-foreground"
                                >
                                    <ChevronDown size={18} />
                                </motion.span>
                            </span>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={reduce ? false : { height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-3">
                                        {key === "exams" ? (
                                            <ExamShowcase locked={locked} bare />
                                        ) : (
                                            <div className="space-y-3">
                                                {courses.map(course => (
                                                    <CourseCard key={course.id} course={course} locked={locked} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </section>
                );
            })}
        </div>
    );
}
