"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

interface OnboardingProps {
    onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative">
            <div className="absolute top-6 right-6">
                <LanguageSwitcher />
            </div>
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md text-center"
            >
                <h1 className="font-serif text-4xl sm:text-5xl text-foreground mb-4 leading-tight">
                    {t('onboarding.title')}
                </h1>
                <p className="text-muted-foreground leading-relaxed mb-12">
                    {t('onboarding.intro')}
                </p>

                {/* The breakfast example */}
                <div className="border-y border-border py-10 mb-12">
                    <div className="flex items-baseline justify-center gap-3 mb-4">
                        <span className="font-serif text-3xl text-foreground">break</span>
                        <span className="text-border">·</span>
                        <span className="font-serif text-3xl text-foreground">fast</span>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                        {t('onboarding.example')}
                    </p>
                </div>

                <button
                    onClick={onComplete}
                    className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
                >
                    {t('onboarding.begin')}
                </button>
            </motion.div>
        </div>
    );
}
