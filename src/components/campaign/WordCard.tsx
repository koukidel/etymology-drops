"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

interface WordCardProps {
    id: string;
    word: string;
    label: string;
    title: string;
    isUnlocked: boolean;
    isCompleted: boolean;
    isActive: boolean;
}

export function WordCard({ id, word, label, title, isUnlocked, isCompleted, isActive }: WordCardProps) {
    const { language } = useTranslation();

    const inner = (
        <div className="flex items-baseline justify-between gap-4 py-5">
            <div className="min-w-0">
                <div className="flex items-baseline gap-3">
                    <span className={`font-serif text-2xl ${isUnlocked ? "text-foreground" : "text-muted-foreground/60"}`}>
                        {word}
                    </span>
                    <span className="text-[11px] tracking-[0.15em] uppercase text-muted-foreground/70 whitespace-nowrap hidden sm:inline">
                        {label}
                    </span>
                </div>
                <p className={`text-sm mt-0.5 ${isUnlocked ? "text-muted-foreground" : "text-muted-foreground/50"}`}>
                    {title}
                </p>
            </div>

            <div className="shrink-0">
                {isCompleted ? (
                    <Check size={16} className="text-muted-foreground" aria-label="completed" />
                ) : isActive ? (
                    <span className="text-sm text-accent">
                        {language === 'ja' ? '始める' : 'Start'} &rarr;
                    </span>
                ) : null}
            </div>
        </div>
    );

    if (!isUnlocked) {
        return <div className="border-b border-border cursor-default">{inner}</div>;
    }

    return (
        <Link href={`/lesson/${id}`} className="block border-b border-border group hover:bg-muted/40 -mx-3 px-3 transition-colors">
            {inner}
        </Link>
    );
}
