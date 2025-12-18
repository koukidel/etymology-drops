"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Lock, Star, Play, Check, Trophy, ChevronRight, CheckCircle2 } from "lucide-react";
import { Word } from "@/data/types";

import { CAMPAIGN_LEVELS } from "@/data/campaignLevels";
import { useGameStore } from "@/store/useGameStore";
import { useMemo, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { PremiumModal } from "@/components/PremiumModal";
import { WordCard } from "@/components/campaign/WordCard";

export const CampaignPath = () => {
    const router = useRouter();
    const { unlockedWords, masteredWords, checkPaywallTrigger } = useGameStore();
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

            {/* Final Trophy */}
            <motion.button
                onClick={() => {
                    const isGameComplete = masteredWords.includes("mistranscribe");
                    if (isGameComplete) {
                        router.push("/exam");
                    }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                    relative z-10 w-32 h-32 rounded-full flex items-center justify-center border-4 shadow-2xl transition-all
                    ${masteredWords.includes("mistranscribe")
                        ? "bg-amber-100 border-amber-400 cursor-pointer animate-pulse-slow shadow-amber-200"
                        : "bg-slate-100 border-slate-300 opacity-50 grayscale cursor-not-allowed"
                    }
                `}
            >
                <Star size={48} className={masteredWords.includes("mistranscribe") ? "text-amber-500 fill-amber-500" : "text-slate-400"} />
                <div className={`absolute top-full mt-4 font-black uppercase tracking-widest text-sm ${masteredWords.includes("mistranscribe") ? "text-amber-600" : "text-slate-400"}`}>
                    Grand Master
                </div>
            </motion.button>
            {/* Premium Modal */}
            <PremiumModal />
        </div>
    );
};
