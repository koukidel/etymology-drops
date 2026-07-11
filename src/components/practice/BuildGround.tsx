"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, PanInfo } from "framer-motion";
import { X } from "lucide-react";
import { allWords } from "@/data/words";
import { WordBlock } from "@/data/types";
import { classifyWord, Lexicon, Classification, CATEGORY_LABEL, Category } from "@/lib/classify";
import { useTranslation } from "@/hooks/useTranslation";

// One representative block per id, drawn from the real word data.
const BLOCK_BY_ID: Map<string, WordBlock> = (() => {
    const m = new Map<string, WordBlock>();
    for (const w of allWords) for (const b of w.blocks) if (!m.has(b.id)) m.set(b.id, b);
    return m;
})();

// A curated, playable pool of morphemes (productive + recognizable).
const POOL_IDS = [
    "un", "re", "de", "pre", "pro", "in", "ex", "dis", "sub", "com", "trans", "inter",
    "port", "form", "ject", "spect", "duct", "tract", "scribe", "struct", "vent", "cept",
    "pose", "dict", "mit", "play", "drink", "break", "happy", "view", "move", "part",
    "able", "er", "ion", "ive", "ful", "ment", "ous", "al", "ate", "ary",
];
const POOL: WordBlock[] = POOL_IDS.map(id => BLOCK_BY_ID.get(id)).filter((b): b is WordBlock => Boolean(b));

const TYPE_STYLE: Record<WordBlock["type"], { bg: string; fg: string }> = {
    prefix: { bg: "#4a5a3e", fg: "#e8e0cc" },
    root: { bg: "#d4a94a", fg: "#33301f" },
    suffix: { bg: "#3c4a34", fg: "#c6c1a4" },
};

const CATEGORY_COLOR: Record<Category, string> = {
    1: "#4c7a3f", // real & common — green
    2: "#c8963a", // plausible coinage — gold
    3: "#5f7d90", // real & rare — indigo
    4: "#9c5a4a", // not a word — muted red
};

// Scatter the morphemes so they float freely across the whole area rather than
// sit in tidy rows. Positions are percentage-based (so they fill whatever space
// the pool has) and deterministic (Math.sin hash, not random) so server and
// client agree and the layout is stable across renders.
const COLS = 5;
const ROWS = Math.ceil(POOL.length / COLS);
const hash = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const POOL_POS = POOL.map((_, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const left = Math.min(90, Math.max(4, ((col + 0.5) / COLS) * 100 + (hash(i) * 2 - 1) * 7));
    const top = Math.min(94, Math.max(3, ((row + 0.5) / ROWS) * 100 + (hash(i + 99) * 2 - 1) * 5));
    return {
        left,
        top,
        dur: 3.5 + hash(i + 7) * 3,      // 3.5–6.5s drift
        dx: (hash(i + 3) * 2 - 1) * 7,   // ±7px
        dy: (hash(i + 5) * 2 - 1) * 8,   // ±8px
        delay: hash(i + 11) * 2,
    };
});

function useLexicon(): Lexicon | null {
    const [lex, setLex] = useState<Lexicon | null>(null);
    useEffect(() => {
        let alive = true;
        fetch("/lexicon/words.txt")
            .then(r => r.text())
            .then(text => {
                const rank = new Map<string, number>();
                text.split("\n").forEach((w, i) => { if (w && !rank.has(w)) rank.set(w, i); });
                if (alive) setLex({ rank: (w: string) => rank.get(w.toLowerCase()) });
            })
            .catch(() => { if (alive) setLex({ rank: () => undefined }); });
        return () => { alive = false; };
    }, []);
    return lex;
}

export function BuildGround() {
    const { t, language } = useTranslation();
    const reduce = useReducedMotion();
    const lex = useLexicon();
    const dropRef = useRef<HTMLDivElement>(null);
    const [assembly, setAssembly] = useState<WordBlock[]>([]);
    const [result, setResult] = useState<Classification | null>(null);

    const loc = (s: string | { en: string; ja: string }) => (typeof s === "string" ? s : s[language]);

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
        setResult(classifyWord(assembly, lex));
    };

    return (
        <div className="mx-auto w-full max-w-3xl px-4 flex flex-col" style={{ height: "calc(100dvh - 4rem)" }}>
            <div className="flex items-baseline justify-between py-3 shrink-0">
                <h1 className="font-serif text-2xl text-foreground">{t("practice.build.title")}</h1>
                <Link href="/practice" className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4">
                    {t("practice.study.finish")}
                </Link>
            </div>

            {/* Bubble pool — morphemes floating across nearly the whole screen */}
            <div className="relative flex-1 min-h-0 rounded-2xl border border-border bg-muted/40">
                {POOL.map((b, i) => {
                    const s = TYPE_STYLE[b.type];
                    const pos = POOL_POS[i];
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

                <div className="flex items-center gap-3">
                    <span className="font-serif text-xl text-foreground truncate flex-1 min-w-0">{assembled}</span>
                    {assembly.length > 0 && (
                        <button onClick={clear} className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
                            {t("practice.build.clear")}
                        </button>
                    )}
                    <button
                        onClick={judge}
                        disabled={!lex || assembly.length === 0}
                        className="px-6 py-2.5 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0"
                    >
                        {lex ? t("practice.build.judge") : t("practice.build.loading")}
                    </button>
                </div>
            </div>

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
