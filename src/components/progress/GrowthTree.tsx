"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { allWords } from "@/data/words";
import { useTranslation } from "@/hooks/useTranslation";

// Art Nouveau plate palette (deep olive ground, gold ornament, red flower hearts).
const GREEN = "#414F3A";
const GREEN_DEEP = "#37432F";
const GOLD = "#CBA24C";
const GOLD_LEAF = "#D9C37E";
const GOLD_DARK = "#9A7A33";
const CREAM = "#E8E0CC";
const RED = "#A5301C";

// Five growth stages keyed to how many words have been mastered. Tuned to the
// full ~230-word corpus so the tree keeps growing across a long study run.
const THRESHOLDS = [0, 5, 15, 35, 70];
const stageFor = (n: number) =>
    THRESHOLDS.reduce((s, t, i) => (n >= t ? i : s), 0);

const STAGE_LABEL: Record<number, { en: string; ja: string }> = {
    0: { en: "A seed", ja: "種" },
    1: { en: "A sprout", ja: "芽生え" },
    2: { en: "A sapling", ja: "若木" },
    3: { en: "A young tree", ja: "生長した木" },
    4: { en: "In full leaf", ja: "生い茂る" },
};

/**
 * A hand-drawn Art-Nouveau tree that grows with mastered words — an illuminated
 * plate set into the paper page. Learned words sit as serif chips below it;
 * tapping one sends a growth pulse into the crown.
 */
export function GrowthTree() {
    const { masteredWords, masteryLog } = useGameStore();
    const { language } = useTranslation();
    const reduce = useReducedMotion();
    const ja = language === "ja";

    const stage = stageFor(masteredWords.length);
    const [planted, setPlanted] = useState<Set<string>>(new Set());
    const [pulse, setPulse] = useState(0);

    const chips = useMemo(() => {
        const ordered = masteryLog.length
            ? [...masteryLog].reverse().map(e => e.id)
            : [...masteredWords].reverse();
        const seen = new Set<string>();
        const out: { id: string; word: string }[] = [];
        for (const id of ordered) {
            if (seen.has(id)) continue;
            seen.add(id);
            const wd = allWords.find(w => w.id === id);
            if (wd) out.push({ id, word: wd.word });
            if (out.length >= 24) break;
        }
        return out;
    }, [masteryLog, masteredWords]);

    const shown = (min: number) => stage >= min;
    const grow = reduce
        ? {}
        : { initial: { opacity: 0, scale: 0.6 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.9, ease: "easeOut" as const } };

    const plant = (id: string) => {
        setPlanted(prev => new Set(prev).add(id));
        setPulse(p => p + 1);
    };

    return (
        <section>
            <div className="flex items-baseline justify-between mb-4">
                <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {ja ? "語彙の樹" : "Your vocabulary tree"}
                </h2>
                <span className="text-xs text-muted-foreground/80">
                    {ja ? STAGE_LABEL[stage].ja : STAGE_LABEL[stage].en} · {masteredWords.length}
                </span>
            </div>

            {/* Illuminated Art Nouveau plate */}
            <div className="rounded-xl overflow-hidden p-2.5" style={{ backgroundColor: GREEN }}>
                <div className="rounded-lg" style={{ border: `1px solid ${GOLD}`, boxShadow: `inset 0 0 0 3px ${GREEN}, inset 0 0 0 4px ${GOLD}33` }}>
                    {/* The tree */}
                    <div className="px-5 pt-5">
                        <svg viewBox="0 0 440 300" className="w-full h-auto max-h-[300px]"
                            fill="none" stroke={GOLD} strokeWidth={3}
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            {/* ground line */}
                            <line x1="70" y1="284" x2="370" y2="284" stroke={CREAM} strokeOpacity={0.4} strokeWidth={2} />

                            {/* seed / sprout (only before the trunk arrives) */}
                            {!shown(1) && (
                                <motion.g {...grow}>
                                    <path d="M220,284 C220,268 220,260 220,250" />
                                    <Leaf x={206} y={244} r={-40} />
                                    <Leaf x={234} y={244} r={40} />
                                </motion.g>
                            )}

                            {/* trunk */}
                            {shown(1) && (
                                <motion.path {...grow} d="M220,284 C214,250 214,232 219,208 C221,198 223,190 224,180" strokeWidth={4} />
                            )}

                            {/* lower boughs + acanthus curls (stage 2) */}
                            {shown(2) && (
                                <motion.g {...grow}>
                                    <path d="M219,236 C188,232 162,228 138,214 C126,207 120,198 122,186" />
                                    <path d="M221,236 C252,232 278,228 302,214 C314,207 320,198 318,186" />
                                    <path d="M122,186 C112,182 108,174 114,168 C119,164 124,168 122,174" />
                                    <path d="M318,186 C328,182 332,174 326,168 C321,164 316,168 318,174" />
                                    <Leaf x={150} y={220} r={-20} />
                                    <Leaf x={178} y={230} r={-8} />
                                    <Leaf x={290} y={220} r={20} />
                                    <Leaf x={262} y={230} r={8} />
                                </motion.g>
                            )}

                            {/* upper boughs (stage 3) */}
                            {shown(3) && (
                                <motion.g {...grow}>
                                    <path d="M222,196 C200,188 178,180 160,164 C150,155 146,146 150,136" />
                                    <path d="M224,196 C246,188 268,180 286,164 C296,155 300,146 296,136" />
                                    <path d="M150,136 C142,132 140,124 146,120 C151,117 155,121 153,127" />
                                    <path d="M296,136 C304,132 306,124 300,120 C295,117 291,121 293,127" />
                                    <Leaf x={172} y={172} r={-30} />
                                    <Leaf x={198} y={182} r={-14} />
                                    <Leaf x={274} y={172} r={30} />
                                    <Leaf x={248} y={182} r={14} />
                                    <Leaf x={224} y={172} r={0} />
                                    <Blossom x={153} y={124} />
                                    <Blossom x={293} y={124} />
                                </motion.g>
                            )}

                            {/* flourishing crown + blossoms (stage 4) */}
                            {shown(4) && (
                                <motion.g {...grow}>
                                    <path d="M224,150 C210,138 196,128 190,110 C186,98 190,88 200,84" />
                                    <path d="M224,150 C238,138 252,128 258,110 C262,98 258,88 248,84" />
                                    <Leaf x={196} y={128} r={-40} />
                                    <Leaf x={252} y={128} r={40} />
                                    <Leaf x={224} y={126} r={0} />
                                    <Blossom x={200} y={80} big />
                                    <Blossom x={248} y={80} big />
                                    <Blossom x={224} y={150} />
                                </motion.g>
                            )}

                            {/* growth pulse rings, emitted when a chip is planted */}
                            <AnimatePresence>
                                {!reduce && pulse > 0 && (
                                    <motion.circle key={pulse} cx="224" cy={shown(4) ? 100 : shown(3) ? 150 : shown(2) ? 196 : 230}
                                        r="10" stroke={CREAM} strokeWidth={2} fill="none"
                                        initial={{ opacity: 0.8, scale: 0.4 }}
                                        animate={{ opacity: 0, scale: 3 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1.1, ease: "easeOut" }}
                                        style={{ transformOrigin: "224px 100px" }} />
                                )}
                            </AnimatePresence>
                        </svg>
                    </div>

                    {/* Learned-word chips */}
                    {chips.length > 0 && (
                        <div className="px-5 pb-5 pt-2 mt-1" style={{ borderTop: `1px solid ${GOLD}33` }}>
                            <p className="text-[11px] mb-3" style={{ color: `${CREAM}99` }}>
                                {ja ? "言葉に触れて、樹を育てましょう。" : "Tap a word to feed the tree."}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {chips.map(c => (
                                    <motion.button
                                        key={c.id}
                                        onClick={() => plant(c.id)}
                                        animate={reduce
                                            ? { opacity: planted.has(c.id) ? 0.45 : 1 }
                                            : { opacity: planted.has(c.id) ? 0.45 : 1, y: planted.has(c.id) ? -4 : 0 }}
                                        transition={{ duration: 0.4 }}
                                        whileHover={{ color: CREAM, borderColor: GOLD }}
                                        className="font-serif text-sm px-3 py-1 rounded-full transition-colors"
                                        style={{ color: GOLD_LEAF, border: `1px solid ${GOLD}66` }}
                                    >
                                        {c.word}
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

// A small almond leaf in gold, placed and rotated around (x, y).
function Leaf({ x, y, r }: { x: number; y: number; r: number }) {
    return (
        <path
            d="M0,0 C6,-9 15,-9 20,0 C15,9 6,9 0,0 Z"
            fill={GOLD_LEAF} stroke={GOLD_DARK} strokeWidth={1.2}
            transform={`translate(${x} ${y}) rotate(${r}) translate(-10 0)`}
        />
    );
}

// A five-petal blossom: gold petals around a red heart — the plate's warm accent.
function Blossom({ x, y, big = false }: { x: number; y: number; big?: boolean }) {
    const R = big ? 7 : 5.5;
    const petals = [0, 72, 144, 216, 288];
    return (
        <g transform={`translate(${x} ${y})`} stroke={GOLD_DARK} strokeWidth={1}>
            {petals.map(a => {
                const rad = (a * Math.PI) / 180;
                return (
                    <ellipse key={a} cx={Math.sin(rad) * R} cy={-Math.cos(rad) * R}
                        rx={R * 0.62} ry={R} fill={GOLD_LEAF}
                        transform={`rotate(${a} ${Math.sin(rad) * R} ${-Math.cos(rad) * R})`} />
                );
            })}
            <circle cx={0} cy={0} r={big ? 3.4 : 2.6} fill={RED} stroke="none" />
        </g>
    );
}
