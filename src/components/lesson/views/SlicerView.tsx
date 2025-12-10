"use client";

import { Word } from "@/data/types";
import { SlicerModule } from "../SlicerModule";

interface Props {
    word: Word;
    onNext: () => void;
}

import { useTranslation } from "@/hooks/useTranslation";

export function SlicerView({ word, onNext }: Props) {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-slate-900">{t('lesson.slicer.title')}</h2>
                <p className="text-slate-500">{t('lesson.slicer.instruction')}</p>
            </div>

            <SlicerModule word={word} onComplete={onNext} />
        </div>
    );
}
