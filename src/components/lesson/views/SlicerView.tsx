"use client";

import { Word } from "@/data/types";
import { SlicerModule } from "../SlicerModule";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    word: Word;
    onNext: () => void;
}

export function SlicerView({ word, onNext }: Props) {
    const { t } = useTranslation();

    return (
        <div className="w-full">
            <div className="mb-2 text-center">
                <h2 className="font-serif text-2xl text-foreground">{t('lesson.slicer.title')}</h2>
                <p className="text-sm text-muted-foreground mt-1">{t('lesson.slicer.instruction')}</p>
            </div>

            <SlicerModule word={word} onComplete={onNext} />
        </div>
    );
}
