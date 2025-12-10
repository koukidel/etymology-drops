"use client";

import { Word } from "@/data/types";
import { ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
    word: Word;
    onNext: () => void;
}

import { useTranslation } from "@/hooks/useTranslation";

export function PrimingView({ word, onNext }: Props) {
    const { t, language } = useTranslation();

    const history = typeof word.history === 'string' ? word.history : word.history[language];
    const meaning = typeof word.meaning === 'string' ? word.meaning : word.meaning[language];

    return (
        <div className="max-w-xl mx-auto space-y-8 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4">
                <BookOpen size={14} />
                {t('lesson.priming.origin_story')}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-none">
                {t('lesson.priming.legend_of')} <span className="text-indigo-400">{word.word}</span>
            </h2>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 shadow-sm text-left">
                <p className="text-lg text-slate-800 leading-relaxed font-serif italic">
                    "{history}"
                </p>
                <div className="mt-4 pt-4 border-t border-amber-200/50 text-sm text-amber-800/80">
                    <p>{t('lesson.priming.current_meaning')}: <span className="font-bold">{meaning}</span></p>
                </div>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed">
                {t('lesson.priming.intro')}
            </p>

            <button
                onClick={onNext}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
                {t('lesson.priming.i_understand')}
                <ArrowRight size={20} />
            </button>
        </div>
    );
}
