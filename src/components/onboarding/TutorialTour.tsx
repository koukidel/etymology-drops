"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BookOpen, Zap, Blocks, Sprout, X } from "lucide-react";
import { SlicerModule } from "@/components/lesson/SlicerModule";
import { Bird } from "@/components/ui/Bird";
import { sfx } from "@/lib/feedback";
import { allWords } from "@/data/words";
import { WordBlock } from "@/data/types";
import { useGameStore } from "@/store/useGameStore";
import { useTranslation } from "@/hooks/useTranslation";

const DEMO = allWords.find(w => w.id === "telephone")!;
const STEP_COUNT = 6;

// A tiny, self-contained build exercise for the tour: four fixed parts, two
// real words to find (unhappy / player). Scripted verdict — no store gating,
// no lexicon fetch.
const MINI_PARTS: WordBlock[] = (() => {
    const out: WordBlock[] = [];
    for (const id of ["unhappy", "player"]) {
        const w = allWords.find(x => x.id === id);
        if (w) for (const b of w.blocks) if (!out.some(o => o.id === b.id)) out.push(b);
    }
    return out; // un, happy, play, er
})();
const MINI_ANSWERS: Record<string, string> = { unhappy: "unhappy", player: "player" };

function MiniBuild({ onSolved }: { onSolved: () => void }) {
    const { t, language } = useTranslation();
    const [picked, setPicked] = useState<WordBlock[]>([]);
    const [wrong, setWrong] = useState(false);
    const [solvedWord, setSolvedWord] = useState<string | null>(null);

    const assembled = picked.map(b => b.label.replace(/-/g, "")).join("").toLowerCase();
    const loc = (s: string | { en: string; ja: string }) => (typeof s === "string" ? s : s[language]);

    const meaningOf = (wordId: string) => {
        const w = allWords.find(x => x.id === wordId);
        return w ? loc(w.meaning) : "";
    };

    const tap = (b: WordBlock) => {
        if (solvedWord) return;
        const next = [...picked, b];
        setPicked(next);
        const word = next.map(x => x.label.replace(/-/g, "")).join("").toLowerCase();
        if (MINI_ANSWERS[word]) {
            sfx.success();
            setSolvedWord(word);
            onSolved();
        } else if (next.length >= 2) {
            sfx.wrong();
            setWrong(true);
            setTimeout(() => { setWrong(false); setPicked([]); }, 700);
        }
    };

    if (solvedWord) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl px-6 py-7 text-center"
                style={{ background: "var(--plate)", boxShadow: "var(--plate-gold-ring)" }}
            >
                <p className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: "var(--plate-gold)" }}>
                    {t("tutorial.minibuild.real")}
                </p>
                <p className="font-serif text-4xl mb-2" style={{ color: "var(--plate-fg)" }}>{solvedWord}</p>
                <p className="text-sm" style={{ color: "var(--plate-body)" }}>
                    {meaningOf(solvedWord)}
                </p>
            </motion.div>
        );
    }

    return (
        <div>
            <div className="flex flex-wrap justify-center gap-2.5 mb-5">
                {MINI_PARTS.map(b => {
                    const used = picked.some(p => p.id === b.id);
                    return (
                        <button
                            key={b.id}
                            onClick={() => !used && tap(b)}
                            disabled={used}
                            className={`rounded-full px-4 py-2 font-serif text-lg transition-all duration-150 active:scale-[0.95] ${used ? "opacity-30" : ""}`}
                            style={b.type === "root"
                                ? { backgroundColor: "var(--chip-root-bg)", color: "var(--chip-root-fg)" }
                                : b.type === "suffix"
                                ? { backgroundColor: "var(--chip-suffix-bg)", color: "var(--chip-suffix-fg)" }
                                : { backgroundColor: "var(--chip-prefix-bg)", color: "var(--chip-prefix-fg)" }}
                        >
                            {b.label.replace(/-/g, "")}
                        </button>
                    );
                })}
            </div>
            <motion.div
                animate={wrong ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`min-h-[52px] rounded-xl border-2 border-dashed flex items-center justify-center px-4 transition-colors ${wrong ? "border-error" : "border-border"}`}
            >
                {picked.length === 0 ? (
                    <span className="text-sm text-muted-foreground">{t("tutorial.minibuild.hint")}</span>
                ) : (
                    <span className={`font-serif text-2xl ${wrong ? "text-error" : "text-foreground"}`}>{assembled}</span>
                )}
            </motion.div>
        </div>
    );
}

export function TutorialTour() {
    const { t } = useTranslation();
    const router = useRouter();
    const { completeTutorial } = useGameStore();
    const [step, setStep] = useState(0);
    const [miniSolved, setMiniSolved] = useState(false);

    const next = () => setStep(s => Math.min(STEP_COUNT - 1, s + 1));
    const back = () => setStep(s => Math.max(0, s - 1));
    const exit = () => router.push("/");
    const finish = () => { completeTutorial(); router.push("/"); };

    const isLast = step === STEP_COUNT - 1;
    // The two interactive steps gate Next on completion.
    const nextBlocked = step === 2 && !miniSolved;

    return (
        <div className="min-h-[100dvh] flex flex-col max-w-xl mx-auto px-6 py-8 relative">
            {/* Always escapable — X leaves without marking the tour done. */}
            <button
                onClick={exit}
                aria-label={t("practice.build.close")}
                className="absolute top-5 left-5 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
                <X size={20} />
            </button>

            {/* progress dots */}
            <div className="flex items-center justify-center gap-2 mb-8">
                {Array.from({ length: STEP_COUNT }, (_, i) => (
                    <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-accent" : "w-1.5 bg-border"}`}
                    />
                ))}
            </div>

            <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        className="text-center"
                    >
                        {step === 0 && (
                            <Panel icon={<Sprout size={26} />}>
                                <H>{t("tutorial.intro.title")}</H>
                                <P>{t("tutorial.intro.body")}</P>
                            </Panel>
                        )}

                        {step === 1 && (
                            <div>
                                <div className="flex items-center justify-center gap-2 text-accent mb-3">
                                    <Zap size={22} />
                                </div>
                                <H>{t("tutorial.decompose.title")}</H>
                                <P>{t("tutorial.decompose.body")}</P>
                                <div className="mt-4">
                                    <SlicerModule
                                        key={step}
                                        word={DEMO}
                                        autoHintMs={5000}
                                        completeLabel={t("tutorial.next")}
                                        onComplete={next}
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <div className="flex items-center justify-center gap-2 text-accent mb-3">
                                    <Blocks size={22} />
                                </div>
                                <H>{t("tutorial.build.title")}</H>
                                <P>{t("tutorial.build.body")}</P>
                                <div className="mt-6">
                                    <MiniBuild onSolved={() => setMiniSolved(true)} />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <Panel icon={<Blocks size={26} />}>
                                <H>{t("tutorial.mechanism.title")}</H>
                                <P>{t("tutorial.mechanism.body")}</P>
                            </Panel>
                        )}

                        {step === 4 && (
                            <Panel icon={<BookOpen size={26} />}>
                                <H>{t("tutorial.dict.title")}</H>
                                <P>{t("tutorial.dict.body")}</P>
                                <Link
                                    href="/dictionary"
                                    className="inline-flex items-center gap-1.5 mt-5 text-sm text-accent hover:opacity-80 underline underline-offset-4"
                                >
                                    {t("tutorial.dict.cta")}
                                </Link>
                            </Panel>
                        )}

                        {step === 5 && (
                            <Panel icon={<Bird size={26} />}>
                                <H>{t("tutorial.outcome.title")}</H>
                                <P>{t("tutorial.outcome.body")}</P>
                            </Panel>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* footer nav — the decompose step advances via the slicer's own button */}
            <div className="flex items-center justify-between pt-8">
                <button
                    onClick={back}
                    disabled={step === 0}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-0"
                >
                    <ArrowLeft size={14} /> {t("tutorial.back")}
                </button>
                {step !== 1 && (
                    isLast ? (
                        <button onClick={finish} className="px-8 py-2.5 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity active:scale-[0.98]">
                            {t("tutorial.finish")}
                        </button>
                    ) : (
                        <button
                            onClick={next}
                            disabled={nextBlocked}
                            className="px-8 py-2.5 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity active:scale-[0.98] disabled:opacity-30"
                        >
                            {t("tutorial.next")}
                        </button>
                    )
                )}
            </div>
        </div>
    );
}

function Panel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center">
            <div className="mb-5 grid place-items-center w-14 h-14 rounded-full border border-border text-accent">
                {icon}
            </div>
            {children}
        </div>
    );
}

const H = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-serif text-2xl text-foreground mb-3">{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
    <p className="text-muted-foreground leading-relaxed max-w-md mx-auto whitespace-pre-line">{children}</p>
);
