"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SlicerModule } from "@/components/lesson/SlicerModule";
import { COURSES } from "@/data/courses";
import { allWords } from "@/data/words";
import { Word } from "@/data/types";
import { useTranslation } from "@/hooks/useTranslation";

// Fisher–Yates; client-only so Math.random is fine here.
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Only lesson words are guaranteed sliceable (their labels spell the word).
const LESSON_WORDS: Word[] = COURSES.flatMap(c => c.lessons)
    .map(l => allWords.find(w => w.id === l.id))
    .filter((w): w is Word => Boolean(w));

// Endless, untimed: slice a word, then read its meaning, then move on.
export function DecomposeStudy() {
    const { t, language } = useTranslation();
    const [queue, setQueue] = useState<Word[]>(() => shuffle(LESSON_WORDS));
    const [idx, setIdx] = useState(0);
    const [revealed, setRevealed] = useState(false);
    const [count, setCount] = useState(0);

    const current = queue[idx % queue.length];
    const localized = (s: string | { en: string; ja: string }) =>
        typeof s === "string" ? s : s[language];

    const next = () => {
        setRevealed(false);
        setCount(c => c + 1);
        setIdx(i => {
            const nextI = i + 1;
            if (nextI % queue.length === 0) setQueue(shuffle(LESSON_WORDS));
            return nextI;
        });
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl text-accent tabular-nums">{count}</span>
                    <span className="text-xs text-muted-foreground">{t("speedrun.decomposed")}</span>
                </div>
                <Link href="/practice" className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4">
                    {t("practice.study.finish")}
                </Link>
            </div>

            {!revealed ? (
                <motion.div key={`slice-${idx}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <SlicerModule
                        key={idx}
                        word={current}
                        onComplete={() => setRevealed(true)}
                        autoHintMs={7000}
                        completeLabel={t("practice.study.reveal")}
                    />
                </motion.div>
            ) : (
                <motion.div
                    key={`meaning-${idx}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-10 flex flex-col items-center"
                >
                    <h2 className="font-serif text-5xl text-foreground mb-3">{current.word}</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-xl">{localized(current.meaning)}</p>

                    <div className="flex flex-wrap items-stretch justify-center gap-3 mb-10">
                        {current.blocks.map((b, i) => (
                            <div key={i} className="border border-border bg-card rounded-lg px-5 py-3 min-w-24">
                                <div className={`font-serif text-2xl ${b.type === "root" ? "text-accent" : "text-foreground"}`}>
                                    {b.label.replace(/-/g, "")}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">{localized(b.meaning)}</div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={next}
                        className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
                    >
                        {t("practice.study.next")}
                    </button>
                </motion.div>
            )}
        </div>
    );
}
