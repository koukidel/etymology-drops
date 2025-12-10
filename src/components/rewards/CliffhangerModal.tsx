"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import cliffhangers from "@/data/cliffhangers.json";

interface Props {
    currentRootId: string;
    nextLessonId?: string | null;
    onClose: () => void;
}

import { useTranslation } from "@/hooks/useTranslation";

export function CliffhangerModal({ currentRootId, nextLessonId, onClose }: Props) {
    const [isDecrypted, setIsDecrypted] = useState(false);
    const { t } = useTranslation();

    // Find the teaser. Does the prompt say "Next Root" is determined by list? 
    // Yes. For now, let's just grab a random one or specific if mapped.
    // The currentRootId is what we JUST finished. The teaser is for the NEXT one.
    // Let's assume cliffhangers.json keys are the CURRENT root, pointing to NEXT.
    const teaser = (cliffhangers as any)[currentRootId] || {
        nextRoot: "Unknown",
        sampleWords: ["???", "???"],
        hint: "The connection is hidden in the shadows...",
        caseId: "XXX"
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsDecrypted(true), 2000); // 2s lock
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ y: 100, opacity: 0, rotate: -2 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                className="max-w-md w-full bg-[#f0e6d2] p-8 rounded-sm shadow-2xl relative overflow-hidden"
                style={{
                    backgroundImage: "url('https://www.transparenttextures.com/patterns/aged-paper.png')",
                    fontFamily: "Courier Prime, monospace" // Fallback if font not loaded
                }}
            >
                {/* Stamp */}
                <motion.div
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.05 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-0 right-0 p-4 text-6xl font-black text-red-900 rotate-12 pointer-events-none select-none z-0"
                >
                    TOP SECRET
                </motion.div>

                <div className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest border-b border-slate-400 pb-2">
                    {t('cliffhanger.case_file')} #{teaser.caseId} // {t('cliffhanger.encrypted')}
                </div>

                <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-600">{t('cliffhanger.subject_a')}:</span>
                        <div className="bg-black text-white px-2 py-1 font-mono">{teaser.sampleWords[0]}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-600">{t('cliffhanger.subject_b')}:</span>
                        <div className="bg-black text-white px-2 py-1 font-mono">{teaser.sampleWords[1]}</div>
                    </div>
                </div>

                <div className="bg-white/50 p-4 border-l-4 border-red-800 mb-8 italic text-slate-800 text-sm">
                    "{teaser.hint}"
                </div>

                {!isDecrypted ? (
                    <button
                        className="w-full py-4 font-black uppercase tracking-widest bg-slate-400 text-slate-200 cursor-not-allowed"
                    >
                        {t('cliffhanger.decrypting')}
                    </button>
                ) : (
                    <div className="flex flex-col gap-3">
                        {nextLessonId ? (
                            <button
                                onClick={() => window.location.href = `/lesson/${nextLessonId}`}
                                className="w-full py-4 font-black uppercase tracking-widest bg-red-800 text-white hover:bg-red-900 shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                            >
                                {t('cliffhanger.investigate_now')}
                            </button>
                        ) : (
                            <button
                                onClick={onClose}
                                className="w-full py-4 font-black uppercase tracking-widest bg-slate-800 text-white hover:bg-slate-900 shadow-lg"
                            >
                                {t('cliffhanger.mission_complete')}
                            </button>
                        )}

                        <button
                            onClick={onClose}
                            className="w-full py-3 font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 transition-colors text-xs"
                        >
                            {t('cliffhanger.file_report')}
                        </button>
                    </div>
                )}

                <p className="text-[10px] text-center mt-4 text-slate-500">
                    {t('cliffhanger.connection_recommended')}
                </p>
            </motion.div>
        </div>
    );
}
