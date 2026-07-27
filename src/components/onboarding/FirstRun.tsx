"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Seal } from "@/components/ui/Seal";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { FirstRunProgress } from "./FirstRunProgress";
import { sfx } from "@/lib/feedback";
import { useConfusionLog } from "@/lib/confusionLog";
import { useGameStore } from "@/store/useGameStore";
import { useTranslation } from "@/hooks/useTranslation";

// The very first thing a new user sees: a full-screen takeover with exactly
// one thing to do per screen. Screen 1 states the value and the time cost;
// screen 2 has them split a real word within seconds. No home, no catalog,
// no competing choices — those come after the first success.
export function FirstRun() {
    const { t } = useTranslation();
    const router = useRouter();
    const reduce = useReducedMotion();
    const { completeWelcome } = useGameStore();
    const [screen, setScreen] = useState<"welcome" | "split">("welcome");
    const [split, setSplit] = useState(false);
    const [nudge, setNudge] = useState(false);

    useConfusionLog(`firstrun-${screen}`);

    // Idle nudge: if nothing is tapped for a beat, a pulsing ring shows
    // exactly where to tap. Combined with the forgiving hit target below,
    // the first success cannot be missed.
    useEffect(() => {
        if (screen !== "split" || split) return;
        const id = setTimeout(() => setNudge(true), 3000);
        return () => clearTimeout(id);
    }, [screen, split]);

    const doSplit = () => {
        if (split) return;
        setSplit(true);
        sfx.success();
    };

    const go = () => {
        completeWelcome();
        router.push("/tutorial");
    };

    return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-10 relative">
            {/* The only meta control in the first run: the language escape hatch. */}
            <div className="absolute top-6 right-6">
                <LanguageSwitcher />
            </div>

            <AnimatePresence mode="wait">
                {screen === "welcome" ? (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="w-full max-w-md text-center"
                    >
                        <FirstRunProgress stage={1} />

                        <div className="flex flex-col items-center mb-8">
                            <Seal size={44} />
                            {/* The seal speaks: a guide, not a splash screen. */}
                            <p className="mt-4 text-sm text-muted-foreground">
                                {t("firstrun.greeting")}
                            </p>
                        </div>

                        <h1 className="font-serif text-3xl leading-snug text-foreground mb-8 whitespace-pre-line">
                            {t("firstrun.value")}
                        </h1>

                        <button
                            onClick={() => setScreen("split")}
                            className="px-12 py-3.5 bg-foreground text-background rounded-full text-lg hover:opacity-90 transition-opacity active:scale-[0.98]"
                        >
                            {t("firstrun.start")}
                        </button>
                        <p className="mt-3 text-xs text-muted-foreground">{t("firstrun.time")}</p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="split"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-md text-center"
                    >
                        <FirstRunProgress stage={1} />

                        {!split ? (
                            <>
                                <p className="text-lg text-foreground mb-8">{t("firstrun.tap")}</p>
                                <div className="relative inline-block">
                                    {nudge && !reduce && (
                                        <motion.span
                                            aria-hidden
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-accent pointer-events-none"
                                            animate={{ scale: [0.6, 1.5], opacity: [0.8, 0] }}
                                            transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                                        />
                                    )}
                                    {/* Forgiving on purpose: the whole word is the target,
                                        and any tap splits it. The first try always wins. */}
                                    <button
                                        onClick={doSplit}
                                        className="font-serif text-5xl text-foreground px-6 py-4 active:scale-[0.97] transition-transform"
                                    >
                                        breakfast
                                    </button>
                                </div>
                                <p className="mt-8 text-sm text-muted-foreground">{t("firstrun.safe")}</p>
                            </>
                        ) : (
                            <motion.div
                                initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <p className="text-lg text-celebrate mb-6">{t("firstrun.split_praise")}</p>
                                <div className="flex items-center justify-center gap-3 mb-8">
                                    <motion.span
                                        initial={reduce ? false : { x: 26 }}
                                        animate={{ x: 0 }}
                                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                                        className="rounded-full px-5 py-2.5 font-serif text-3xl"
                                        style={{ backgroundColor: "var(--chip-root-bg)", color: "var(--chip-root-fg)" }}
                                    >
                                        break
                                    </motion.span>
                                    <motion.span
                                        initial={reduce ? false : { x: -26 }}
                                        animate={{ x: 0 }}
                                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                                        className="rounded-full px-5 py-2.5 font-serif text-3xl"
                                        style={{ backgroundColor: "var(--chip-root-bg)", color: "var(--chip-root-fg)" }}
                                    >
                                        fast
                                    </motion.span>
                                </div>
                                <p className="text-muted-foreground mb-10 whitespace-pre-line">
                                    {t("firstrun.split_done")}
                                </p>
                                <button
                                    onClick={go}
                                    className="px-12 py-3.5 bg-foreground text-background rounded-full text-lg hover:opacity-90 transition-opacity active:scale-[0.98]"
                                >
                                    {t("firstrun.continue")}
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
