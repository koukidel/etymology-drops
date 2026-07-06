"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { Course, COURSE_LEVEL_LABEL, isLessonOpen } from "@/data/courses";
import { allWords } from "@/data/words";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";
import { Header } from "@/components/layout/Header";

interface Props {
    course: Course;
}

export function CoursePath({ course }: Props) {
    const { masteredWords } = useGameStore();
    const { language } = useTranslation();
    const mounted = useMounted();

    const localized = (s: string | { en: string; ja: string }) =>
        typeof s === 'string' ? s : s[language];

    const mastered = mounted ? masteredWords : [];
    const done = course.lessons.filter(l => mastered.includes(l.id)).length;
    const allDone = done === course.lessons.length;

    // The next lesson to take: first unmastered open lesson.
    const activeIndex = course.lessons.findIndex(l => !mastered.includes(l.id));

    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-xl mx-auto px-6 py-12">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    &larr; {language === 'ja' ? 'コース一覧' : 'All courses'}
                </Link>

                <div className="mt-6 mb-10">
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
                    <h1 className="font-serif text-4xl text-foreground mb-2">{localized(course.title)}</h1>
                    <p className="text-sm text-muted-foreground">{localized(course.description)}</p>
                </div>

                <ol>
                    {course.lessons.map((lesson, index) => {
                        const word = allWords.find(w => w.id === lesson.id);
                        const isCompleted = mastered.includes(lesson.id);
                        const isOpen = mounted && isLessonOpen(course, index, mastered);
                        const isActive = index === activeIndex && isOpen;

                        const inner = (
                            <div className="flex items-baseline justify-between gap-4 py-5">
                                <div className="min-w-0">
                                    <div className="flex items-baseline gap-3">
                                        <span className={`font-serif text-2xl ${isOpen ? "text-foreground" : "text-muted-foreground/60"}`}>
                                            {word?.word ?? lesson.id}
                                        </span>
                                        <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground/70 whitespace-nowrap hidden sm:inline">
                                            {lesson.label}
                                        </span>
                                    </div>
                                    <p className={`text-sm mt-0.5 ${isOpen ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                                        {localized(lesson.title)}
                                    </p>
                                </div>

                                <div className="shrink-0">
                                    {isCompleted ? (
                                        <Check size={16} className="text-muted-foreground" aria-label="completed" />
                                    ) : isActive ? (
                                        <span className="text-sm text-accent">
                                            {language === 'ja' ? '始める' : 'Start'} &rarr;
                                        </span>
                                    ) : null}
                                </div>
                            </div>
                        );

                        return (
                            <li key={lesson.id}>
                                {isOpen ? (
                                    <Link href={`/lesson/${lesson.id}`} className="block border-b border-border hover:bg-muted/40 -mx-3 px-3 transition-colors">
                                        {inner}
                                    </Link>
                                ) : (
                                    <div className="border-b border-border cursor-default">{inner}</div>
                                )}
                            </li>
                        );
                    })}
                </ol>

                {allDone && mounted && (
                    <p className="mt-12 text-sm text-muted-foreground text-center font-serif italic">
                        {language === 'ja' ? 'このコースを修了しました。' : 'You have completed this course.'}
                    </p>
                )}
            </main>
        </div>
    );
}
