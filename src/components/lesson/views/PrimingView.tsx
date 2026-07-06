"use client";

import { Word } from "@/data/types";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    word: Word;
    onNext: () => void;
}

export function PrimingView({ word, onNext }: Props) {
    const { t, language } = useTranslation();

    const history = typeof word.history === 'string' ? word.history : word.history[language];
    const meaning = typeof word.meaning === 'string' ? word.meaning : word.meaning[language];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-xl mx-auto text-center space-y-10 px-4"
        >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {t('lesson.priming.origin_story')}
            </p>

            <h2 className="font-serif text-5xl sm:text-6xl text-foreground">
                {word.word}
            </h2>

            <p className="text-muted-foreground">{meaning}</p>

            <blockquote className="border-l-2 border-accent pl-6 text-left mx-auto max-w-md">
                <p className="font-serif italic text-lg text-foreground leading-relaxed">
                    {history}
                </p>
            </blockquote>

            <button
                onClick={onNext}
                className="px-10 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity"
            >
                {t('lesson.priming.i_understand')}
            </button>
        </motion.div>
    );
}
