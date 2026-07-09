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

// Scatter the morphemes so they float freely rather than sit in tidy rows.
// Positions are deterministic (Math.sin hash, not random) so server and client
// agree and the layout is stable across renders.
const COLS = 6;
const ROW_H = 68;
const hash = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const POOL_POS = POOL.map((_, i) => {
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    const left = Math.min(84, Math.max(1, (col / COLS) * 100 + 2 + (hash(i) * 2 - 1) * 4));
    const top = 14 + row * ROW_H + (hash(i + 99) * 2 - 1) * 16;
    return {
        left,
        top,
        dur: 3.5 + hash(i + 7) * 3,      // 3.5–6.5s drift
        dx: (hash(i + 3) * 2 - 1) * 7,   // ±7px
        dy: (hash(i + 5) * 2 - 1) * 8,   // ±8px
        delay: hash(i + 11) * 2,
    };
});
const POOL_HEIGHT = 14 + Math.ceil(POOL.length / COLS) * ROW_H + 30;

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
        <div className="max-w-3xl mx-auto px-6 py-10">
            <div className="flex items-baseline justify-between mb-2">
                <h1 className="font-serif text-3xl text-foreground">{t("practice.build.title")}</h1>
                <Link href="/practice" className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4">
                    {t("practice.study.finish")}
                </Link>
            </div>
            <p className="text-sm text-muted-foreground mb-8">{t("practice.build.instruction")}</p>

            {/* Bubble pool — morphemes floating freely */}
            <div className="relative rounded-2xl border border-border bg-muted/40 mb-6" style={{ height: POOL_HEIGHT }}>
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
                            className="absolute cursor-grab active:cursor-grabbing touch-none"
                            style={{ left: `${pos.left}%`, top: pos.top }}
                        >
                            <motion.button
                                type="button"
                                onClick={() => add(b)}
                                animate={reduce ? undefined : { x: [0, pos.dx, 0], y: [0, pos.dy, 0] }}
                                transition={reduce ? undefined : { duration: pos.dur, delay: pos.delay, repeat: Infinity, ease: "easeInOut" }}
                                className="rounded-full px-4 py-2 font-serif text-lg shadow-sm whitespace-nowrap"
                                style={{ backgroundColor: s.bg, color: s.fg }}
                                title={loc(b.meaning)}
                            >
                                {b.label.replace(/-/g, "")}
                            </motion.button>
                        </motion.div>
                    );
                })}
            </div>

            {/* Assembly area (drop zone) */}
            <div
                ref={dropRef}
                className="rounded-2xl border-2 border-dashed border-border p-5 mb-4 min-h-[92px] flex flex-wrap items-center gap-2"
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
                                className="group inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 font-serif text-lg"
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

            {assembled && (
                <p className="font-serif text-2xl text-foreground text-center mb-6">{assembled}</p>
            )}

            <div className="flex items-center justify-center gap-4 mb-8">
                <button
                    onClick={judge}
                    disabled={!lex || assembly.length === 0}
                    className="px-8 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                    {lex ? t("practice.build.judge") : t("practice.build.loading")}
                </button>
                {assembly.length > 0 && (
                    <button onClick={clear} className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
                        {t("practice.build.clear")}
                    </button>
                )}
            </div>

            {/* Verdict */}
            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl p-6 text-center"
                    style={{ backgroundColor: CATEGORY_COLOR[result.category], color: "#f7f3e9" }}
                >
                    <p className="text-xs uppercase tracking-[0.2em] opacity-80 mb-1">
                        {loc(CATEGORY_LABEL[result.category])}
                    </p>
                    <h2 className="font-serif text-4xl mb-3">{result.word}</h2>
                    {result.meaning && (
                        <p className="text-lg mb-3 opacity-95">{loc(result.meaning)}</p>
                    )}
                    <ul className="text-sm space-y-1 opacity-90 max-w-md mx-auto">
                        {result.reasons.map((r, i) => <li key={i}>{loc(r)}</li>)}
                    </ul>
                </motion.div>
            )}
        </div>
    );
}
