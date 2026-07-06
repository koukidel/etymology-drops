"use client";

import { CAMPAIGN_LEVELS } from "@/data/campaignLevels";
import { allWords } from "@/data/words";
import { useGameStore } from "@/store/useGameStore";
import { useMemo, Fragment } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useMounted } from "@/hooks/useMounted";
import { WordCard } from "@/components/campaign/WordCard";

export const CampaignPath = () => {
    const { unlockedWords, masteredWords } = useGameStore();
    const { language } = useTranslation();

    // Client-only progress calculation; server renders everything locked.
    const mounted = useMounted();

    const currentLevelIndex = useMemo(() => {
        if (!mounted) return 0;
        let maxIndex = 0;
        CAMPAIGN_LEVELS.forEach((level, index) => {
            if (unlockedWords.includes(level.id)) {
                if (index > maxIndex) maxIndex = index;
            }
        });
        return maxIndex;
    }, [unlockedWords, mounted]);

    const localized = (s: string | { en: string; ja: string }) =>
        typeof s === 'string' ? s : s[language];

    const allDone = masteredWords.includes(CAMPAIGN_LEVELS[CAMPAIGN_LEVELS.length - 1].id);

    return (
        <div className="max-w-xl mx-auto">
            {CAMPAIGN_LEVELS.map((level, index) => {
                const isUnlocked = index <= currentLevelIndex;
                const isCompleted = masteredWords.includes(level.id);
                const isActive = index === currentLevelIndex && !isCompleted;

                const word = allWords.find(w => w.id === level.id);
                const prevChapter = index > 0 ? localized(CAMPAIGN_LEVELS[index - 1].chapter) : null;
                const chapter = localized(level.chapter);
                const showChapter = chapter !== prevChapter;

                return (
                    <Fragment key={level.id}>
                        {showChapter && (
                            <h2 className={`text-xs uppercase tracking-[0.2em] text-muted-foreground ${index === 0 ? 'mb-2' : 'mt-14 mb-2'}`}>
                                {chapter}
                            </h2>
                        )}
                        <WordCard
                            id={level.id}
                            word={word?.word ?? level.id}
                            label={level.label}
                            title={localized(level.title)}
                            isUnlocked={isUnlocked}
                            isCompleted={isCompleted}
                            isActive={isActive}
                        />
                    </Fragment>
                );
            })}

            {allDone && (
                <p className="mt-14 text-sm text-muted-foreground text-center font-serif italic">
                    {language === 'ja' ? 'すべての章を読み終えました。' : 'You have read every chapter.'}
                </p>
            )}
        </div>
    );
};
