import { useState } from "react";
import { Word } from "@/data/types";
import { useGameStore } from "@/store/useGameStore";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface WordCardProps {
    word: Word;
}

import { useTranslation } from "@/hooks/useTranslation";
import { resolveLocalizedString } from "@/lib/i18n";

export const WordCard = ({ word }: WordCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const { audioEnabled } = useGameStore();
    const { language } = useTranslation();

    // Dynamically get icon
    const IconComponent = (word.icon && (Icons as any)[word.icon]) || Icons.HelpCircle;

    const handleFlip = () => {
        if (audioEnabled) {
            import("@/lib/audio").then(mod => mod.playSnap());
        }
        setIsFlipped(!isFlipped);
    };

    const meaning = resolveLocalizedString(word.meaning, language);
    const history = resolveLocalizedString(word.history, language);

    return (
        <div className="relative aspect-square cursor-pointer" onClick={handleFlip}>
            <motion.div
                className="w-full h-full"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100 gap-3"
                    style={{ backfaceVisibility: "hidden" }}>
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                        <IconComponent size={32} />
                    </div>
                    <div className="text-center">
                        <h3 className="font-bold text-slate-900">{word.word}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2">{meaning}</p>
                    </div>
                    <div className="absolute bottom-4 right-4">
                        <Icons.Info size={16} className="text-slate-300" />
                    </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden p-6 bg-indigo-600 rounded-2xl shadow-sm text-white flex flex-col overflow-y-auto"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                    <h3 className="font-bold text-sm mb-2 opacity-80">Etymology</h3>
                    <p className="text-xs leading-relaxed">{history || "History unrecorded."}</p>
                </div>
            </motion.div>
        </div>
    );
};
