"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feather, Flame, Rocket, Sprout, TreeDeciduous, Mountain } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { FirstRunProgress } from "./FirstRunProgress";
import { useConfusionLog } from "@/lib/confusionLog";
import { OnboardingProfile, LearnerLevel } from "@/store/useGameStore";

interface Props {
    onComplete: (profile: OnboardingProfile) => void;
    onExit?: () => void;
    /** True while this runs as stage 2 of the first-run funnel. */
    firstRun?: boolean;
}

// Two questions only — commitment sizes the recommendations, level targets
// them. Duolingo-style: one question per screen, big tappable options with
// an icon each, and NO skip. Two taps of personalization beats a broken
// recommendation feed later (the old skip left the level unset for good).
const COMMITS = ["light", "steady", "serious"] as const;
const LEVELS: LearnerLevel[] = ["beginner", "intermediate", "advanced"];

const OPTION_ICON: Record<string, React.ReactNode> = {
    light: <Feather size={20} />,
    steady: <Flame size={20} />,
    serious: <Rocket size={20} />,
    beginner: <Sprout size={20} />,
    intermediate: <TreeDeciduous size={20} />,
    advanced: <Mountain size={20} />,
};

type Step = "commit" | "level";
const ORDER: Step[] = ["commit", "level"];

export function Intake({ onComplete, onExit, firstRun = false }: Props) {
    const { t } = useTranslation();
    const [step, setStep] = useState<Step>("commit");
    const [commitment, setCommitment] = useState<string | null>(null);
    useConfusionLog(`intake-${step}`, firstRun);

    const advance = () => {
        const i = ORDER.indexOf(step);
        if (i < ORDER.length - 1) setStep(ORDER[i + 1]);
    };

    const pickCommit = (v: string) => { setCommitment(v); advance(); };
    const pickLevel = (v: LearnerLevel) => onComplete({ goal: "", commitment: commitment ?? "", selfLevel: v });

    const stepIndex = ORDER.indexOf(step);

    const renderOptions = (items: readonly string[], prefix: string, onPick: (v: string) => void) => (
        <div className="flex flex-col gap-3 max-w-sm mx-auto">
            {items.map(v => (
                <button
                    key={v}
                    onClick={() => onPick(v)}
                    className="flex items-center gap-4 px-6 py-4 border border-border rounded-xl text-foreground hover:border-accent hover:text-accent transition-colors text-left active:scale-[0.98]"
                >
                    <span className="shrink-0 text-accent">{OPTION_ICON[v]}</span>
                    <span>
                        <span className="font-serif text-lg">{t(`${prefix}.${v}` as Parameters<typeof t>[0])}</span>
                        <span className="block text-sm text-muted-foreground">{t(`${prefix}.${v}.sub` as Parameters<typeof t>[0])}</span>
                    </span>
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
                {firstRun && <FirstRunProgress stage={2} />}

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

                        {step === "commit" && renderOptions(COMMITS, "intake.commit", pickCommit)}
                        {step === "level" && renderOptions(LEVELS, "intake.level", (v) => pickLevel(v as LearnerLevel))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
