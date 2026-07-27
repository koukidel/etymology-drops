"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Zap } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { FirstRunProgress } from "./FirstRunProgress";
import { useConfusionLog } from "@/lib/confusionLog";
import { useGameStore } from "@/store/useGameStore";
import { useTranslation } from "@/hooks/useTranslation";

// Final funnel screen: the user chooses how to begin — the 種明かし
// (Lesson 0, recommended) or straight into the first lesson. Either way
// the app unlocks; Lesson 0 stays replayable from the home. Duolingo's
// lesson: never hold the product hostage to your own intro.
export function PathChoice() {
    const { t } = useTranslation();
    const router = useRouter();
    const { completeOnboarding } = useGameStore();
    useConfusionLog("path-choice");

    const startNow = () => {
        completeOnboarding();
        router.push("/today");
    };

    return (
        <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-10 relative">
            <div className="absolute top-6 right-6">
                <LanguageSwitcher />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md text-center"
            >
                <FirstRunProgress stage={3} />

                <h1 className="font-serif text-2xl text-foreground mb-8">{t("choice.title")}</h1>

                <div className="space-y-3 text-left">
                    {/* Recommended: the reveal — the app's own aha, 3 minutes. */}
                    <button
                        onClick={() => router.push("/guide")}
                        className="group w-full flex items-center gap-4 rounded-2xl px-6 py-5 text-left transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
                        style={{ background: "var(--plate)", boxShadow: "var(--plate-gold-ring)" }}
                    >
                        <span className="shrink-0 grid place-items-center w-11 h-11 rounded-full" style={{ color: "var(--plate-gold)", boxShadow: "var(--plate-gold-ring)" }}>
                            <BookOpen size={20} />
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="inline-block text-[10px] uppercase tracking-[0.15em] rounded-full px-2 py-0.5 mb-1.5"
                                style={{ color: "var(--plate-gold)", boxShadow: "var(--plate-gold-ring)" }}>
                                {t("choice.badge")}
                            </span>
                            <span className="block font-serif text-xl" style={{ color: "var(--plate-fg)" }}>
                                {t("choice.guide.title")}
                            </span>
                            <span className="block text-sm mt-0.5" style={{ color: "var(--plate-body)" }}>
                                {t("choice.guide.sub")}
                            </span>
                        </span>
                    </button>

                    <button
                        onClick={startNow}
                        className="group w-full flex items-center gap-4 rounded-2xl px-6 py-5 border border-border bg-card transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/50 active:scale-[0.98] text-left"
                    >
                        <span className="shrink-0 grid place-items-center w-11 h-11 rounded-full border border-border text-accent">
                            <Zap size={20} />
                        </span>
                        <span className="min-w-0">
                            <span className="block font-serif text-xl text-foreground">{t("choice.start.title")}</span>
                            <span className="block text-sm text-muted-foreground mt-0.5">{t("choice.start.sub")}</span>
                        </span>
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
