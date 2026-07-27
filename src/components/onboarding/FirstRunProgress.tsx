"use client";

import { useTranslation } from "@/hooks/useTranslation";

// One progress bar across the whole first-run funnel:
// 1 最初のひと割り → 2 あそびかた → 3 種明かし (Lesson 0).
// Seeing "2/3" keeps people moving and never lost.
export function FirstRunProgress({ stage }: { stage: 1 | 2 | 3 }) {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center gap-1.5 mb-6">
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {t("firstrun.progress").replace("{n}", String(stage))}
            </span>
            <div className="flex gap-1.5" aria-hidden>
                {[1, 2, 3].map(i => (
                    <span
                        key={i}
                        className={`h-1 w-8 rounded-full transition-colors ${i <= stage ? "bg-accent" : "bg-border"}`}
                    />
                ))}
            </div>
        </div>
    );
}
