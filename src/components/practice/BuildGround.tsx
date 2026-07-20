"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, PanInfo } from "framer-motion";
import { X } from "lucide-react";
import { allWords } from "@/data/words";
import { WordBlock } from "@/data/types";
import { classifyWord, Lexicon, Classification, CATEGORY_LABEL, Category } from "@/lib/classify";
import { findNextLesson } from "@/lib/nextLesson";
import { dayHash } from "@/lib/dailyReview";
import { localDate } from "@/lib/date";
import { sfx } from "@/lib/feedback";
import { useGameStore } from "@/store/useGameStore";
import { useTranslation } from "@/hooks/useTranslation";

const TYPE_STYLE: Record<WordBlock["type"], { bg: string; fg: string }> = {
    prefix: { bg: "var(--chip-prefix-bg)", fg: "var(--chip-prefix-fg)" },
    root: { bg: "var(--chip-root-bg)", fg: "var(--chip-root-fg)" },
    suffix: { bg: "var(--chip-suffix-bg)", fg: "var(--chip-suffix-fg)" },
};

const CATEGORY_COLOR: Record<Category, string> = {
    1: "#3e6b47", // real & common — pine green
    2: "#c79433", // plausible coinage — brass
    3: "#4e6e5c", // real & rare — muted pine-teal
    4: "#a0522f", // not a word — terracotta
};

// Scatter positions filling the whole pool area — percentage-based (so they
// fill whatever space is available) and deterministic (Math.sin hash, not
// random) so server and client agree and the layout is stable across renders.
const hash = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
function scatter(count: number) {
    const cols = count <= 6 ? 3 : count <= 15 ? 4 : 5;
    const rows = Math.max(1, Math.ceil(count / cols));
    return Array.from({ length: count }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return {
            left: Math.min(90, Math.max(4, ((col + 0.5) / cols) * 100 + (hash(i) * 2 - 1) * 7)),
            top: Math.min(94, Math.max(3, ((row + 0.5) / rows) * 100 + (hash(i + 99) * 2 - 1) * 5)),
            dur: 3.5 + hash(i + 7) * 3,
            dx: (hash(i + 3) * 2 - 1) * 7,
            dy: (hash(i + 5) * 2 - 1) * 8,
            delay: hash(i + 11) * 2,
        };
    });
}

// The parts a learner has unlocked = every block from the lesson words they
// have mastered. The build ground only offers these, so it widens as the
// learner progresses ("習ったものだけを組み立てる").
function ownedParts(masteredWords: string[]): WordBlock[] {
    const m = new Map<string, WordBlock>();
    for (const id of masteredWords) {
        const w = allWords.find(x => x.id === id);
        if (!w) continue;
        for (const b of w.blocks) if (!m.has(b.id)) m.set(b.id, b);
    }
    // roots first (they carry meaning), then affixes — reads better in the field.
    return [...m.values()].sort((a, b) => (a.type === "root" ? 0 : 1) - (b.type === "root" ? 0 : 1));
}

// "Words within reach": how many real lesson words can be fully built from the
// parts the learner owns — the generative multiplier made visible.
function wordsWithinReach(ownedIds: Set<string>): number {
    let n = 0;
    for (const w of allWords) if (w.blocks.every(b => ownedIds.has(b.id))) n++;
    return n;
}

// A failed fetch used to silently fall back to "nothing is attested", which
// made every real word judge as a non-word. Surface the failure instead.
function useLexicon(): { lex: Lexicon | null; error: boolean; retry: () => void } {
    const [lex, setLex] = useState<Lexicon | null>(null);
    const [error, setError] = useState(false);
    const [attempt, setAttempt] = useState(0);
    useEffect(() => {
        let alive = true;
        fetch("/lexicon/words.txt")
            .then(r => { if (!r.ok) throw new Error(String(r.status)); return r.text(); })
            .then(text => {
                const rank = new Map<string, number>();
                text.split("\n").forEach((w, i) => { if (w && !rank.has(w)) rank.set(w, i); });
                if (alive) setLex({ rank: (w: string) => rank.get(w.toLowerCase()) });
            })
            .catch(() => { if (alive) { setLex(null); setError(true); } });
        return () => { alive = false; };
    }, [attempt]);
    return { lex, error, retry: () => { setError(false); setAttempt(a => a + 1); } };
}

export function BuildGround() {
    const { t, language } = useTranslation();
    const reduce = useReducedMotion();
    const { lex, error: lexError, retry: retryLexicon } = useLexicon();
    const { masteredWords, masteryLog } = useGameStore();
    const dropRef = useRef<HTMLDivElement>(null);
    const [assembly, setAssembly] = useState<WordBlock[]>([]);
    const [result, setResult] = useState<Classification | null>(null);

    const loc = (s: string | { en: string; ja: string }) => (typeof s === "string" ? s : s[language]);

    // Only the parts the learner has unlocked, and how many words they reach.
    const pool = useMemo(() => ownedParts(masteredWords), [masteredWords]);
    const positions = useMemo(() => scatter(pool.length), [pool.length]);
    const reach = useMemo(() => wordsWithinReach(new Set(pool.map(b => b.id))), [pool]);
    const ready = pool.length >= 2;

    // While locked: preview the parts the next lesson would unlock, so the
    // learn → build loop is concrete, and link straight to that lesson.
    const upNext = useMemo(() => {
        if (ready) return null;
        const next = findNextLesson(masteryLog, masteredWords);
        if (!next) return null;
        const word = allWords.find(w => w.id === next.lesson.id);
        return word ? { lessonId: next.lesson.id, blocks: word.blocks } : null;
    }, [ready, masteryLog, masteredWords]);

    // Daily challenge: build one real word using a specific owned part.
    // Deterministic per day, and always solvable (some fully-buildable lesson
    // word contains the part). Completion is remembered per-day locally.
    const today = localDate();
    const challenge = useMemo(() => {
        if (!ready) return null;
        const owned = new Set(pool.map(b => b.id));
        const candidates = pool.filter(p =>
            allWords.some(w => w.blocks.some(b => b.id === p.id) && w.blocks.every(b => owned.has(b.id))));
        if (candidates.length === 0) return null;
        return candidates[dayHash(today) % candidates.length];
    }, [ready, pool, today]);
    const [challengeDone, setChallengeDone] = useState(
        () => typeof window !== "undefined" && localStorage.getItem(`minamoto_challenge_${localDate()}`) === "1");
    // Consecutive challenge days (a missed *today* doesn't break it yet).
    const [challengeStreak] = useState(() => {
        if (typeof window === "undefined") return 0;
        const doneOn = (offset: number) => {
            const d = new Date();
            d.setDate(d.getDate() - offset);
            return localStorage.getItem(`minamoto_challenge_${localDate(d)}`) === "1";
        };
        let n = 0;
        for (let i = doneOn(0) ? 0 : 1; doneOn(i); i++) n++;
        return n;
    });

    const add = (b: WordBlock) => { setAssembly(a => [...a, b]); setResult(null); };
    const removeAt = (i: number) => { setAssembly(a => a.filter((_, j) => j !== i)); setResult(null); };
    const clear = () => { setAssembly([]); setResult(null); };

    const onDrop = (b: WordBlock) => (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const r = dropRef.current?.getBoundingClientRect();
        if (!r) return;
        const { x, y } = info.point;
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) add(b);
    };

    const assembled = useMemo(() => assembly.map(b => b.label.replace(/-/g, "")).join(""), [assembly]);

    const judge = () => {
        if (!lex || assembly.length === 0) return;
        const r = classifyWord(assembly, lex);
        setResult(r);
        if (r.attested) sfx.success();
        else if (r.category === 2) sfx.coinage();
        else sfx.wrong();
        if (challenge && !challengeDone && r.attested && assembly.some(b => b.id === challenge.id)) {
            localStorage.setItem(`minamoto_challenge_${today}`, "1");
            setChallengeDone(true);
        }
    };

    return (
        <div className="mx-auto w-full max-w-3xl px-4 flex flex-col" style={{ height: "calc(100dvh - 4rem - var(--tabbar-h))" }}>
            <div className="flex items-baseline justify-between py-3 shrink-0">
                <div>
                    <h1 className="font-serif text-2xl text-foreground">{t("practice.build.title")}</h1>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        {t("practice.build.reach").replace("{parts}", String(pool.length)).replace("{words}", String(reach))}
                    </p>
                    {challenge && (
                        <p className={`text-xs mt-1 ${challengeDone ? "text-ochre" : "text-accent"}`}>
                            {challengeDone
                                ? `✓ ${t("practice.build.challenge_done")}`
                                : t("practice.build.challenge").replace("{part}", challenge.label.replace(/-/g, ""))}
                            {challengeStreak >= 2 && (
                                <span className="text-muted-foreground">
                                    {" "}{t("practice.build.challenge_streak").replace("{n}", String(challengeStreak))}
                                </span>
                            )}
                        </p>
                    )}
                    {lexError && (
                        <p className="text-xs mt-1 text-error" role="alert">
                            {t("practice.build.lexicon_error")}{" "}
                            <button onClick={retryLexicon} className="underline underline-offset-2 hover:opacity-80">
                                {t("practice.build.retry")}
                            </button>
                        </p>
                    )}
                </div>
                <Link href="/practice" className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4">
                    {t("practice.study.finish")}
                </Link>
            </div>

            {!ready ? (
                <div className="flex-1 min-h-0 rounded-2xl border border-dashed border-border bg-muted/30 flex flex-col items-center justify-center text-center px-8 gap-3">
                    <p className="font-serif text-xl text-foreground">{t("practice.build.locked_title")}</p>
                    <p className="text-sm text-muted-foreground max-w-xs">{t("practice.build.locked_desc")}</p>
                    {upNext && (
                        <div className="mt-2">
                            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2.5">
                                {t("practice.build.next_parts")}
                            </p>
                            <div className="flex flex-wrap justify-center gap-2 opacity-80">
                                {upNext.blocks.map(b => {
                                    const s = TYPE_STYLE[b.type];
                                    return (
                                        <span
                                            key={b.id}
                                            className="rounded-full px-3.5 py-1.5 font-serif text-base"
                                            style={{ backgroundColor: s.bg, color: s.fg }}
                                        >
                                            {b.label.replace(/-/g, "")}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    <Link
                        href={upNext ? `/lesson/${upNext.lessonId}` : "/"}
                        className="mt-3 px-6 py-2.5 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity active:scale-[0.98]"
                    >
                        {t("practice.build.locked_cta")}
                    </Link>
                </div>
            ) : (
            <>
            {/* Bubble pool — the learner's unlocked morphemes, floating freely */}
            <div className="relative flex-1 min-h-0 rounded-2xl border border-border bg-muted/40">
                {pool.map((b, i) => {
                    const s = TYPE_STYLE[b.type];
                    const pos = positions[i];
                    return (
                        <motion.div
                            key={b.id}
                            drag
                            dragSnapToOrigin
                            dragElastic={0.25}
                            whileDrag={{ scale: 1.12, zIndex: 50 }}
                            onDragEnd={onDrop(b)}
                            className="absolute cursor-grab active:cursor-grabbing touch-none -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                        >
                            <motion.button
                                type="button"
                                onClick={() => add(b)}
                                animate={reduce ? undefined : { x: [0, pos.dx, 0], y: [0, pos.dy, 0] }}
                                transition={reduce ? undefined : { duration: pos.dur, delay: pos.delay, repeat: Infinity, ease: "easeInOut" }}
                                className="rounded-full px-3.5 py-1.5 font-serif text-base sm:text-lg shadow-sm whitespace-nowrap"
                                style={{ backgroundColor: s.bg, color: s.fg }}
                                title={loc(b.meaning)}
                            >
                                {b.label.replace(/-/g, "")}
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>

            {/* Assembly bar — always visible, pinned below the pool */}
            <div className="shrink-0 pt-3 pb-4 space-y-3">
                <div
                    ref={dropRef}
                    className="rounded-2xl border-2 border-dashed border-border px-4 py-3 min-h-[60px] flex flex-wrap items-center gap-2"
                >
                    {assembly.length === 0 ? (
                        <span className="text-sm text-muted-foreground">{t("practice.build.drop_here")}</span>
                    ) : (
                        assembly.map((b, i) => {
                            const s = TYPE_STYLE[b.type];
                            return (
                                <button
                                    key={`${b.id}-${i}`}
                                    onClick={() => removeAt(i)}
                                    className="group inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-serif text-base"
                                    style={{ backgroundColor: s.bg, color: s.fg }}
                                    title={t("practice.build.remove")}
                                >
                                    {b.label.replace(/-/g, "")}
                                    <X size={13} className="opacity-60 group-hover:opacity-100" />
                                </button>
                            );
                        })
                    )}
                </div>

                {/* Destructive action (クリア) sits far left, isolated from the
                    primary 判定する button so a thumb can't hit both. */}
                <div className="flex items-center gap-3">
                    {assembly.length > 0 && (
                        <button onClick={clear} className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 shrink-0">
                            {t("practice.build.clear")}
                        </button>
                    )}
                    <span className="font-serif text-xl text-foreground truncate flex-1 min-w-0 text-center">{assembled}</span>
                    <button
                        onClick={judge}
                        disabled={!lex || assembly.length === 0}
                        className="px-6 py-2.5 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0"
                    >
                        {lex ? t("practice.build.judge") : t("practice.build.loading")}
                    </button>
                </div>
            </div>
            </>
            )}

            {/* Verdict — popup over the screen */}
            {result && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-6"
                    onClick={() => setResult(null)}
                >
                    <div className="absolute inset-0 bg-black/50" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        onClick={e => e.stopPropagation()}
                        className="relative w-full max-w-md rounded-2xl p-7 text-center shadow-xl"
                        style={{ backgroundColor: CATEGORY_COLOR[result.category], color: "#f7f3e9" }}
                    >
                        <button
                            onClick={() => setResult(null)}
                            aria-label={t("practice.build.close")}
                            className="absolute top-3 right-3 opacity-70 hover:opacity-100"
                        >
                            <X size={20} />
                        </button>
                        <p className="text-xs uppercase tracking-[0.2em] opacity-80 mb-1">
                            {loc(CATEGORY_LABEL[result.category])}
                        </p>
                        <h2 className="font-serif text-4xl mb-3 break-all">{result.word}</h2>
                        {result.meaning && (
                            <p className="text-lg mb-3 opacity-95">{loc(result.meaning)}</p>
                        )}
                        <ul className="text-sm space-y-1 opacity-90">
                            {result.reasons.map((r, i) => <li key={i}>{loc(r)}</li>)}
                        </ul>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
