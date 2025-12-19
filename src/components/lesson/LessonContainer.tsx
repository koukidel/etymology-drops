"use client";

import { useState, useEffect } from "react";
import { Word } from "@/data/types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Check } from "lucide-react";

import { PrimingView } from "./views/PrimingView";
import { SlicerView } from "./views/SlicerView";
import { MatrixView } from "./views/MatrixView";
import { ProficiencyView } from "./views/ProficiencyView";

// Phase 23 Imports
import { useGameStore } from "@/store/useGameStore";
import { wordBank } from "@/data/wordBank";
import { rollGacha as calculateLootDrop } from "@/lib/gacha";
import { GachaReveal } from "@/components/rewards/GachaReveal";
import { CliffhangerModal } from "@/components/rewards/CliffhangerModal";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    word: Word;
}

export function LessonContainer({ word }: Props) {
    const [viewIndex, setViewIndex] = useState(0);
    const [loot, setLoot] = useState<any>(null);
    const [showCliffhanger, setShowCliffhanger] = useState(false);
    const [nextLessonId, setNextLessonId] = useState<string | null>(null);
    const { t, language } = useTranslation();

    // Endowed Progress Logic (Head Start)
    const { unlockedWords, masteredWords } = useGameStore();
    const [initialProgress, setInitialProgress] = useState(0);

    useEffect(() => {
        // Check if user knows the prefix
        const prefix = word.blocks.find(b => b.type === 'prefix');
        if (prefix) {
            // Check if any Mastered word also has this prefix ID
            const hasHeadStart = wordBank.some(w =>
                masteredWords.includes(w.id) &&
                w.blocks.some(b => b.id === prefix.id)
            );

            if (hasHeadStart) {
                setInitialProgress(20);
                console.log("Endowed Progress: Head Start applied!");
            }
        }
    }, [word, masteredWords]);

    const { unlockWord } = useGameStore();

    const handleNext = () => {
        if (viewIndex < 4) {
            setViewIndex(prev => prev + 1);
        } else if (viewIndex === 4) {
            // Constellation Unlocked
            // 1. Mark current word as mastered
            unlockWord(word.id);

            // 3. Unlock Next CAMPAIGN Level (if this is a key node)
            // This ensures the Map progresses even if we have intermediate words.
            import("@/data/campaignLevels").then(({ CAMPAIGN_LEVELS }) => {
                const levelIndex = CAMPAIGN_LEVELS.findIndex(l => l.id === word.id);
                if (levelIndex !== -1 && levelIndex < CAMPAIGN_LEVELS.length - 1) {
                    const nextLevel = CAMPAIGN_LEVELS[levelIndex + 1];
                    unlockWord(nextLevel.id);
                    setNextLessonId(nextLevel.id); // Save for transition
                    console.log(`Campaign Progress: Unlocked ${nextLevel.id}`);
                } else {
                    // Fallback: try to find next in expandedWords if not a main campaign level?
                    // Or just use the one found above in expandedWords block (which I need to move state setter to)
                }
            });

            // Also try to get next from expandedWords if campaign lookup fails or matches same
            import("@/data/expandedWords").then(({ expandedWords }) => {
                const currentIndex = expandedWords.findIndex(w => w.id === word.id);
                if (currentIndex !== -1 && currentIndex < expandedWords.length - 1) {
                    const nextWord = expandedWords[currentIndex + 1];
                    unlockWord(nextWord.id);
                    // Prefer campaign level, but if not set yet, use this
                    setNextLessonId(prev => prev || nextWord.id);
                }
            });

            // 3. Unlock Next CAMPAIGN Level (if this is a key node)
            // This ensures the Map progresses even if we have intermediate words.
            import("@/data/campaignLevels").then(({ CAMPAIGN_LEVELS }) => {
                const levelIndex = CAMPAIGN_LEVELS.findIndex(l => l.id === word.id);
                if (levelIndex !== -1 && levelIndex < CAMPAIGN_LEVELS.length - 1) {
                    const nextLevel = CAMPAIGN_LEVELS[levelIndex + 1];
                    unlockWord(nextLevel.id);
                    console.log(`Campaign Progress: Unlocked ${nextLevel.id}`);
                }
            });

            const drop = calculateLootDrop();
            setLoot(drop);
            setViewIndex(5);
        }
    };

    const STEPS = [t('lesson.steps.priming'), t('lesson.steps.practice'), t('lesson.steps.synthesis'), t('lesson.steps.mastery')];

    // Gacha Phase
    if (viewIndex === 5 && loot) {
        return (
            <>
                {!showCliffhanger && (
                    <GachaReveal
                        item={loot}
                        onClose={() => {
                            setShowCliffhanger(true);
                        }}
                    />
                )}
                {showCliffhanger && (
                    <CliffhangerModal
                        currentRootId={word.id}
                        nextLessonId={nextLessonId}
                        onClose={() => {
                            window.location.href = "/";
                        }}
                    />
                )}
            </>
        );
    }

    // Reward Phase (Constellation)
    if (viewIndex === 4) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-white rounded-3xl">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mb-8 p-6 bg-indigo-500 rounded-full shadow-[0_0_50px_rgba(99,102,241,0.5)]"
                >
                    <Check size={64} className="text-white" />
                </motion.div>
                <h2 className="text-4xl font-black mb-4">{t('lesson.constellation_unlocked')}</h2>
                <p className="text-slate-400 mb-8">
                    {t('lesson.you_have_mastered')} {word.blocks.find(b => b.type === 'root')?.label}.
                </p>

                <button
                    onClick={handleNext} // Go to Gacha
                    className="px-8 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
                >
                    {t('lesson.claim_rewards')} <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center px-4 py-8">
            {/* Progress Bar */}
            <div className="flex items-center justify-between px-2 mb-8 w-full max-w-2xl">
                {STEPS.map((step, i) => (
                    <div key={i} className="flex flex-col items-center relative z-10">
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-500
                            ${i <= viewIndex ? "bg-indigo-500 text-white" : "bg-slate-700 text-slate-400"}
                        `}>
                            {i < viewIndex ? <Check size={16} /> : i + 1}
                        </div>
                        <span className={`text-xs uppercase font-bold mt-2 transition-opacity ${i === viewIndex ? "text-white opacity-100" : "text-slate-400 opacity-70"}`}>
                            {step}
                        </span>
                    </div>
                ))}
                {/* Background Line */}
                <div className="absolute left-0 right-0 top-5 h-0.5 bg-slate-700 -z-0 mx-4" />
                {/* Active Line */}
                <div
                    className="absolute left-0 top-5 h-0.5 bg-indigo-500 -z-0 mx-4 transition-all duration-500"
                    style={{ width: `${(viewIndex / (STEPS.length - 1)) * 100}%` }}
                />
            </div>

            {/* Endowed Progress Indicator */}
            {initialProgress > 0 && viewIndex === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-xs text-indigo-600 font-bold bg-indigo-50 py-2 rounded-lg mb-6 w-full max-w-2xl"
                >
                    {t('lesson.head_start')}
                </motion.div>
            )}

            {/* View Container - Now fullscreen */}
            <div className="w-full max-w-4xl flex-1 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={viewIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full h-full flex flex-col justify-center"
                    >
                        {viewIndex === 0 && <PrimingView word={word} onNext={handleNext} />}
                        {viewIndex === 1 && <SlicerView word={word} onNext={handleNext} />}
                        {viewIndex === 2 && <MatrixView word={word} onNext={handleNext} />}
                        {viewIndex === 3 && <ProficiencyView word={word} onNext={handleNext} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
