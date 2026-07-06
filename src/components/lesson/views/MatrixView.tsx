"use client";

import { useState } from "react";
import { Word } from "@/data/types";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    word: Word;
    onNext: () => void;
}

export function MatrixView({ word, onNext }: Props) {
    const { t } = useTranslation();

    const [assembled, setAssembled] = useState<number[]>([]);
    const [shakeIndex, setShakeIndex] = useState<number | null>(null);

    const handleBlockClick = (blockIndex: number) => {
        if (assembled.includes(blockIndex)) return;

        // Blocks must be assembled in reading order.
        if (blockIndex !== assembled.length) {
            setShakeIndex(blockIndex);
            setTimeout(() => setShakeIndex(null), 400);
            return;
        }

        const newAssembled = [...assembled, blockIndex];
        setAssembled(newAssembled);

        if (newAssembled.length === word.blocks.length) {
            setTimeout(onNext, 900);
        }
    };

    return (
        <div className="text-center space-y-10 max-w-xl mx-auto px-4">
            <div>
                <h2 className="font-serif text-2xl text-foreground">{t('lesson.matrix.title')}</h2>
                <p className="text-sm text-muted-foreground mt-1">{t('lesson.matrix.instruction')}</p>
            </div>

            {/* Target Area */}
            <div className="h-24 rounded-lg flex items-center justify-center gap-1 border border-dashed border-border">
                {assembled.map((blockIndex) => (
                    <motion.span
                        key={blockIndex}
                        layoutId={`block-${blockIndex}`}
                        className="font-serif text-3xl text-foreground"
                    >
                        {word.blocks[blockIndex].label.replace(/-/g, '')}
                    </motion.span>
                ))}
                {assembled.length === 0 && (
                    <span className="text-sm text-muted-foreground">{t('lesson.matrix.tap_blocks')}</span>
                )}
            </div>

            {/* Source Blocks */}
            <div className="flex flex-wrap justify-center gap-3">
                {word.blocks.map((block, i) => {
                    if (assembled.includes(i)) return null;

                    return (
                        <motion.button
                            key={`${block.id}-${i}`}
                            layoutId={`block-${i}`}
                            animate={shakeIndex === i ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                            transition={{ duration: 0.4 }}
                            onClick={() => handleBlockClick(i)}
                            className={`
                                px-6 py-3 rounded-lg border bg-card transition-colors font-serif text-xl
                                ${block.type === 'root'
                                    ? "border-accent/40 text-accent hover:border-accent"
                                    : "border-border text-foreground hover:border-muted-foreground"
                                }
                            `}
                        >
                            {block.label.replace(/-/g, '')}
                        </motion.button>
                    );
                })}
            </div>

            {assembled.length > 0 && assembled.length < word.blocks.length && (
                <button
                    onClick={() => setAssembled([])}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
                >
                    {t('lesson.matrix.reset')}
                </button>
            )}
        </div>
    );
}
