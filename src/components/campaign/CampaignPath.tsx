"use client";

import { Star } from "lucide-react";

import { CAMPAIGN_LEVELS } from "@/data/campaignLevels";
import { useGameStore } from "@/store/useGameStore";
import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { WordCard } from "@/components/campaign/WordCard";

export const CampaignPath = () => {
    const { unlockedWords, masteredWords } = useGameStore();
    const { language } = useTranslation();

    // Calculate current level index based on last unlocked word in the sequence
    // or simply find the highest index that is unlocked.
    // Since unlockedWords is an array of IDs, finding the highest index in CAMPAIGN_LEVELS matching explicit unlock.

    // NOTE: This runs on client. Hydration mismatch risk if server renders locked.
    // For MVP we just use client side calculation.
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const currentLevelIndex = useMemo(() => {
        if (!mounted) return 0; // Default to 0 on server/initial
        let maxIndex = 0;
        CAMPAIGN_LEVELS.forEach((level, index) => {
            if (unlockedWords.includes(level.id)) {
                if (index > maxIndex) maxIndex = index;
            }
        });
        return maxIndex;
    }, [unlockedWords, mounted]);

    return (
        <div className="flex flex-col items-center py-12 relative max-w-md mx-auto">
            {/* Background Path Line */}
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-slate-200 -translate-x-1/2 rounded-full" />

            {CAMPAIGN_LEVELS.map((level, index) => {
                const isUnlocked = index <= currentLevelIndex;
                const isCompleted = masteredWords.includes(level.id);
                const isActive = index === currentLevelIndex && !isCompleted;

                const title = typeof level.title === 'string' ? level.title : level.title[language];

                return (
                    <WordCard
                        key={level.id}
                        id={level.id}
                        label={level.label}
                        title={title}
                        isUnlocked={isUnlocked}
                        isCompleted={isCompleted}
                        isActive={isActive}
                        index={index}
                    />
                );
            })}

            {/* Completion marker */}
            <div className="relative z-10 flex flex-col items-center gap-3 pt-4">
                <Star
                    size={32}
                    className={masteredWords.includes("mistranscribe") ? "text-slate-900 fill-slate-900" : "text-slate-300"}
                />
                {masteredWords.includes("mistranscribe") && (
                    <p className="text-sm text-slate-500">
                        {language === 'ja' ? 'すべての章を修了しました' : 'You have completed every chapter.'}
                    </p>
                )}
            </div>
        </div>
    );
};
