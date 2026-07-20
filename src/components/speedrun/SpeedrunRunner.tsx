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

const DURATIONS = [30, 60, 90];

// Rank by pace (words/min): reachable bronze, satisfying gold.
const rankOf = (wordsPerMin: number): "gold" | "silver" | "bronze" | null =>
    wordsPerMin >= 12 ? "gold" : wordsPerMin >= 8 ? "silver" : wordsPerMin >= 4 ? "bronze" : null;

const RANK_LABEL: Record<string, { ja: string; en: string; color: string }> = {
    gold: { ja: "金", en: "Gold", color: "#c79433" },
    silver: { ja: "銀", en: "Silver", color: "#8a8f98" },
    bronze: { ja: "銅", en: "Bronze", color: "#a0522f" },
};

const bestKey = (sec: number) => `minamoto_ta_best_${sec}`;

export function SpeedrunRunner() {
    const { t, language } = useTranslation();
    const [phase, setPhase] = useState<Phase>("ready");
    const [isNewBest, setIsNewBest] = useState(false);
    const [best, setBest] = useState(0);
    const [durationSec, setDurationSec] = useState(60);
    const [queue, setQueue] = useState<Word[]>(LESSON_WORDS);
    const [idx, setIdx] = useState(0);
    const [count, setCount] = useState(0);
    const [startMs, setStartMs] = useState(0);
    const [nowMs, setNowMs] = useState(0);
    const [endMs, setEndMs] = useState(0);

    const deadline = startMs + durationSec * 1000;

    // Live countdown while running; auto-finish when the clock runs out.
    useEffect(() => {
        if (phase !== "running") return;
        const id = setInterval(() => {
            const now = Date.now();
            setNowMs(now);
            if (now >= deadline) {
                setEndMs(deadline);
                setPhase("done");
            }
        }, 250);
        return () => clearInterval(id);
    }, [phase, deadline]);

    // Self-best per duration, updated when a run ends.
    useEffect(() => {
        if (phase !== "done") return;
        const prev = Number(localStorage.getItem(bestKey(durationSec)) ?? 0);
        if (count > prev) {
            localStorage.setItem(bestKey(durationSec), String(count));
            setBest(count);
            setIsNewBest(count > 0 && prev > 0);
        } else {
            setBest(prev);
            setIsNewBest(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phase]);

    const elapsed = phase === "done" ? endMs - startMs : nowMs - startMs;
    const remaining = Math.max(0, deadline - (phase === "done" ? endMs : nowMs));
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
                <div className="flex flex-col items-center gap-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("speedrun.time_limit")}</span>
                    <div className="inline-flex rounded-full border border-border p-1">
                        {DURATIONS.map(d => (
                            <button
                                key={d}
                                onClick={() => setDurationSec(d)}
                                className={`px-4 py-1.5 text-sm rounded-full transition-colors ${durationSec === d ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
                            >
                                {d}{t("speedrun.seconds")}
                            </button>
                        ))}
                    </div>
                </div>
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
        const rank = rankOf(wordsPerMin);
        const ja = language === "ja";
        return (
            <div className="max-w-md mx-auto text-center px-4 py-16 space-y-8">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t("speedrun.done_title")}</p>
                <div className="font-serif text-7xl text-accent">{count}</div>
                <p className="text-muted-foreground">{t("speedrun.done_count")}</p>

                {rank && (
                    <div
                        className="inline-flex items-center gap-2 rounded-full px-5 py-1.5 font-serif text-lg"
                        style={{ color: RANK_LABEL[rank].color, boxShadow: `inset 0 0 0 1px ${RANK_LABEL[rank].color}` }}
                    >
                        {ja ? `${RANK_LABEL[rank].ja}ランク` : `${RANK_LABEL[rank].en} rank`}
                    </div>
                )}

                <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                    <span>{fmt(elapsed)}</span>
                    <span>{wordsPerMin} {t("speedrun.per_min")}</span>
                    <span className={isNewBest ? "text-celebrate" : ""}>
                        {isNewBest ? t("speedrun.new_best") : `${t("speedrun.best")} ${best}`}
                    </span>
                </div>
                <div className="flex flex-col items-center gap-4 pt-2">
                    <button onClick={start} className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity active:scale-[0.98]">
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
                {/* Final 10 seconds: the clock turns red and pulses. */}
                <motion.span
                    animate={remaining <= 10000 && remaining > 0 ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                    transition={remaining <= 10000 ? { duration: 1, repeat: Infinity } : undefined}
                    className={`text-sm tabular-nums ${remaining <= 10000 ? "text-error font-semibold" : "text-muted-foreground"}`}
                >
                    {fmt(remaining)}
                </motion.span>
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
