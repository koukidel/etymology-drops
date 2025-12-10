"use client";

import { AnimatePresence, motion } from "framer-motion";
import { InteractiveWord } from "./InteractiveWord";
import { Word } from "@/data/types";
import { useEffect, useState } from "react";

interface StoryReaderProps {
    title: string;
    content: string;
    words: Word[];
}

export const StoryReader = ({ title, content, words }: StoryReaderProps) => {
    const wordsArray = content.split(" ");

    return (
        <div className="max-w-md mx-auto bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
            <div className="text-lg leading-relaxed text-slate-600">
                {wordsArray.map((word, i) => {
                    const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
                    const wordData = words.find((w) => w.id === cleanWord);

                    if (wordData) {
                        return <InteractiveWord key={i} word={word} wordData={wordData} />;
                    }
                    return <span key={i}>{word} </span>;
                })}
            </div>
        </div>
    );
};
