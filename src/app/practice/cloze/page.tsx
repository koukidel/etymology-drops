"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { allWords } from "@/data/words";
import { Word, WordBlock } from "@/data/types";
import { dayHash } from "@/lib/dailyReview";
import { useGameStore } from "@/store/useGameStore";
import { sfx } from "@/lib/feedback";
import { useMounted } from "@/hooks/useMounted";
import { useTranslation } from "@/hooks/useTranslation";

// 穴埋め: one part of a mastered word is blanked; pick the missing part.
// Generative recall — harder (and stickier) than recognizing a meaning.

interface Round {
    word: Word;
    hiddenIndex: number;
    options: WordBlock[]; // 4 candidate parts, one correct
}

const shuffle = <T,>(a: T[]): T[] => [...a].sort(() => Math.random() - 0.5);

function makeRound(word: Word, pool: WordBlock[]): Round {
    // Prefer hiding the root (it carries the meaning); fall back to any part.
    const rootIdx = word.blocks.findIndex(b => b.type === "root");
    const hiddenIndex = rootIdx >= 0 && Math.random() < 0.7
        ? rootIdx
        : Math.floor(Math.random() * word.blocks.length);
    const hidden = word.blocks[hiddenIndex];

    const distractors = shuffle(
        pool.filter(b => b.type === hidden.type && b.id !== hidden.id),
    ).slice(0, 3);
    return { word, hiddenIndex, options: shuffle([hidden, ...distractors]) };
}

export default function ClozePage() {
    const { t, language } = useTranslation();
    const { masteredWords, recordMiss } = useGameStore();
    const mounted = useMounted();
    const [solved, setSolved] = useState(0);
    const [roundKey, setRoundKey] = useState(0);
    const [picked, setPicked] = useState<string | null>(null);
    const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

    const eligible = useMemo(
        () => allWords.filter(w => masteredWords.includes(w.id) && w.blocks.length >= 2),
        [masteredWords],
    );
    const pool = useMemo(() => {
        const m = new Map<string, WordBlock>();
        for (const w of eligible) for (const b of w.blocks) if (!m.has(b.id)) m.set(b.id, b);
        return [...m.values()];
    }, [eligible]);

    const round = useMemo(() => {
        if (eligible.length === 0) return null;
        const word = eligible[dayHash(String(roundKey) + Date.now()) % eligible.length];
        return makeRound(word, pool);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roundKey, eligible.length]);

    if (!mounted) return null;

    const loc = (s: string | { en: string; ja: string }) => (typeof s === "string" ? s : s[language]);

    if (!round) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
                    <h1 className="font-serif text-2xl text-foreground mb-2">{t("practice.cloze.empty_title")}</h1>
                    <p className="text-muted-foreground mb-8">{t("practice.cloze.empty_body")}</p>
                    <Link href="/" className="px-8 py-2.5 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity">
                        {t("speedrun.back")}
                    </Link>
                </main>
            </div>
        );
    }

    const hidden = round.word.blocks[round.hiddenIndex];

    const pick = (b: WordBlock) => {
        if (status !== "idle") return;
        setPicked(b.id);
        if (b.id === hidden.id) {
            sfx.success();
            setStatus("correct");
            setTimeout(() => {
                setSolved(s => s + 1);
                setPicked(null);
                setStatus("idle");
                setRoundKey(k => k + 1);
            }, 1000);
        } else {
            sfx.wrong();
            setStatus("wrong");
            recordMiss([hidden.id]);
            setTimeout(() => { setPicked(null); setStatus("idle"); }, 800);
        }
    };

    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-2xl mx-auto px-4 py-10">
                <div className="flex items-baseline justify-between mb-12">
                    <h1 className="font-serif text-2xl text-foreground">{t("practice.cloze.title")}</h1>
                    <span className="flex items-baseline gap-4">
                        <span className="text-sm tabular-nums text-muted-foreground">{solved} {t("practice.cloze.solved")}</span>
                        <Link href="/practice" className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4">
                            {t("practice.study.finish")}
                        </Link>
                    </span>
                </div>

                <div className="text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                        {t("practice.cloze.instruction")}
                    </p>

                    {/* The word with one part blanked */}
                    <motion.div
                        key={roundKey}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap items-center justify-center gap-1.5 mb-3"
                    >
                        {round.word.blocks.map((b, i) => (
                            i === round.hiddenIndex ? (
                                <span
                                    key={i}
                                    className={`inline-block min-w-20 border-b-2 font-serif text-4xl px-2 pb-1 transition-colors ${
                                        status === "correct" ? "border-accent text-accent"
                                        : status === "wrong" ? "border-error text-error"
                                        : "border-border text-muted-foreground"}`}
                                >
                                    {status === "correct" ? b.label.replace(/-/g, "") : "？"}
                                </span>
                            ) : (
                                <span key={i} className="font-serif text-4xl text-foreground">
                                    {b.label.replace(/-/g, "")}
                                </span>
                            )
                        ))}
                    </motion.div>
                    <p className="text-sm text-muted-foreground mb-10">{loc(round.word.meaning)}</p>

                    <motion.div
                        animate={status === "wrong" ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                        transition={{ duration: 0.35 }}
                        className="flex flex-wrap justify-center gap-3"
                    >
                        {round.options.map(b => {
                            const isPicked = picked === b.id;
                            return (
                                <button
                                    key={b.id}
                                    onClick={() => pick(b)}
                                    disabled={status !== "idle"}
                                    className={`rounded-full px-5 py-2.5 font-serif text-xl transition-all active:scale-[0.96] ${
                                        isPicked && status === "wrong" ? "outline outline-2 outline-error" : ""}`}
                                    style={b.type === "root"
                                        ? { backgroundColor: "var(--chip-root-bg)", color: "var(--chip-root-fg)" }
                                        : { backgroundColor: "var(--chip-prefix-bg)", color: "var(--chip-prefix-fg)" }}
                                >
                                    {b.label.replace(/-/g, "")}
                                </button>
                            );
                        })}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
