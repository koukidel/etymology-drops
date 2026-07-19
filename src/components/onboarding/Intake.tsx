"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { OnboardingProfile, LearnerLevel } from "@/store/useGameStore";

interface Props {
    onComplete: (profile: OnboardingProfile) => void;
    onExit?: () => void;
    onSkip?: () => void;
}

// Each question: a translation-key prefix for the prompt and its option values.
const GOALS = ["exam", "work", "culture", "travel"] as const;
const COMMITS = ["light", "steady", "serious"] as const;
const LEVELS: LearnerLevel[] = ["beginner", "intermediate", "advanced"];

type Step = "goal" | "commit" | "level";
const ORDER: Step[] = ["goal", "commit", "level"];

export function Intake({ onComplete, onExit, onSkip }: Props) {
    const { t } = useTranslation();
    const [step, setStep] = useState<Step>("goal");
    const [goal, setGoal] = useState<string | null>(null);
    const [commitment, setCommitment] = useState<string | null>(null);

    const advance = () => {
        const i = ORDER.indexOf(step);
        if (i < ORDER.length - 1) setStep(ORDER[i + 1]);
    };

    const pickGoal = (v: string) => { setGoal(v); advance(); };
    const pickCommit = (v: string) => { setCommitment(v); advance(); };
    const pickLevel = (v: LearnerLevel) => onComplete({ goal: goal ?? "", commitment: commitment ?? "", selfLevel: v });

    const stepIndex = ORDER.indexOf(step);

    const renderOptions = (items: readonly string[], prefix: string, onPick: (v: string) => void) => (
        <div className="flex flex-col gap-3 max-w-sm mx-auto">
            {items.map(v => (
                <button
                    key={v}
                    onClick={() => onPick(v)}
                    className="px-6 py-4 border border-border rounded-xl text-foreground hover:border-accent hover:text-accent transition-colors text-left"
                >
                    <span className="font-serif text-lg">{t(`${prefix}.${v}` as Parameters<typeof t>[0])}</span>
                    <span className="block text-sm text-muted-foreground">{t(`${prefix}.${v}.sub` as Parameters<typeof t>[0])}</span>
                </button>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative">
            {onExit && (
                <button onClick={onExit} aria-label="Close" className="absolute top-6 left-6 p-2 text-muted-foreground hover:text-foreground transition-colors">
                    ✕
                </button>
            )}
            <div className="absolute top-6 right-6">
                <LanguageSwitcher />
            </div>

            <div className="w-full max-w-2xl">
                {/* progress dots */}
                <div className="flex justify-center gap-2 mb-12">
                    {ORDER.map((s, i) => (
                        <span key={s} className={`h-1.5 rounded-full transition-all ${i === stepIndex ? "w-8 bg-foreground" : "w-1.5 bg-muted"}`} />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-center text-foreground text-lg mb-10">
                            {t(`intake.${step}` as Parameters<typeof t>[0])}
                        </p>

                        {step === "goal" && renderOptions(GOALS, "intake.goal", pickGoal)}
                        {step === "commit" && renderOptions(COMMITS, "intake.commit", pickCommit)}
                        {step === "level" && renderOptions(LEVELS, "intake.level", (v) => pickLevel(v as LearnerLevel))}
                    </motion.div>
                </AnimatePresence>

                {/* First-run friction valve: straight to the app; settings can
                    come later via /intake. */}
                {onSkip && (
                    <p className="text-center mt-10">
                        <button
                            onClick={onSkip}
                            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                        >
                            {t('intake.skip')}
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}
