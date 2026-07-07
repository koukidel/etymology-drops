"use client";

import { useEffect, useMemo, useState } from "react";
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

const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

type Phase = "ready" | "running" | "done";

export function SpeedrunRunner() {
    const { t } = useTranslation();
    const [phase, setPhase] = useState<Phase>("ready");
    const [queue, setQueue] = useState<Word[]>(LESSON_WORDS);
    const [idx, setIdx] = useState(0);
    const [count, setCount] = useState(0);
    const [startMs, setStartMs] = useState(0);
    const [nowMs, setNowMs] = useState(0);
    const [endMs, setEndMs] = useState(0);

    // Live timer while running.
    useEffect(() => {
        if (phase !== "running") return;
        const id = setInterval(() => setNowMs(Date.now()), 250);
        return () => clearInterval(id);
    }, [phase]);

    const elapsed = phase === "done" ? endMs - startMs : nowMs - startMs;
    const current = queue[idx % queue.length];

    const start = () => {
        setQueue(shuffle(LESSON_WORDS));
        setIdx(0);
        setCount(0);
        const t0 = Date.now();
        setStartMs(t0);
        setNowMs(t0);
        setPhase("running");
    };

    const advance = () => {
        setCount(c => c + 1);
        setIdx(i => {
            const nextI = i + 1;
            // reshuffle each time we exhaust the queue
            if (nextI % queue.length === 0) setQueue(shuffle(LESSON_WORDS));
            return nextI;
        });
    };

    const finish = () => {
        setEndMs(Date.now());
        setPhase("done");
    };

    const wordsPerMin = useMemo(() => {
        if (!count || elapsed <= 0) return 0;
        return Math.round((count / (elapsed / 60000)) * 10) / 10;
    }, [count, elapsed]);

    if (phase === "ready") {
        return (
            <div className="max-w-md mx-auto text-center px-4 py-16 space-y-8">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("speedrun.eyebrow")}</p>
                <h1 className="font-serif text-4xl text-foreground">{t("speedrun.title")}</h1>
                <p className="text-muted-foreground">{t("speedrun.subtitle")}</p>
                <button onClick={start} className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity">
                    {t("speedrun.start")}
                </button>
                <div>
                    <Link href="/" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
                        {t("speedrun.back")}
                    </Link>
                </div>
            </div>
        );
    }

    if (phase === "done") {
        return (
            <div className="max-w-md mx-auto text-center px-4 py-16 space-y-8">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("speedrun.done_title")}</p>
                <div className="font-serif text-7xl text-accent">{count}</div>
                <p className="text-muted-foreground">{t("speedrun.done_count")}</p>
                <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                    <span>{fmt(elapsed)}</span>
                    <span>{wordsPerMin} {t("speedrun.per_min")}</span>
                </div>
                <div className="flex flex-col items-center gap-4 pt-2">
                    <button onClick={start} className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity">
                        {t("speedrun.again")}
                    </button>
                    <Link href="/" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
                        {t("speedrun.back")}
                    </Link>
                </div>
            </div>
        );
    }

    // running
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl text-accent tabular-nums">{count}</span>
                    <span className="text-xs text-muted-foreground">{t("speedrun.decomposed")}</span>
                </div>
                <span className="text-sm text-muted-foreground tabular-nums">{fmt(elapsed)}</span>
                <button onClick={finish} className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4">
                    {t("speedrun.finish")}
                </button>
            </div>

            <motion.div key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <SlicerModule
                    key={idx}
                    word={current}
                    onComplete={advance}
                    autoHintMs={7000}
                    completeLabel={t("speedrun.next")}
                />
            </motion.div>
        </div>
    );
}
