"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/store/useGameStore";
import { ArrowRight, Check, Sparkles, BookOpen, Hammer, Trophy } from "lucide-react";

const SLIDES = [
    {
        id: "welcome",
        title: "Unlock the Power of Words",
        description: "Discover the ancient roots that build the language we use today. See English in a whole new light.",
        icon: <Sparkles size={64} className="text-amber-400" />,
        color: "bg-indigo-600"
    },
    {
        id: "roots",
        title: "Collect Ancient Roots",
        description: "Every word has a history. Collect roots like 'Chron' (Time) or 'Phon' (Sound) to expand your vocabulary.",
        icon: <BookOpen size={64} className="text-emerald-400" />,
        color: "bg-slate-800"
    },
    {
        id: "crafting",
        title: "Forge New Words",
        description: "Enter the Crafting Lab to combine prefixes, roots, and suffixes. Create words like 'Re-construct-ion'.",
        icon: <Hammer size={64} className="text-indigo-400" />,
        color: "bg-slate-900"
    },
    {
        id: "mastery",
        title: "Prove Your Mastery",
        description: "Challenge Bosses, earn badges, and climb the leaderboard. Your journey to etymology mastery begins now.",
        icon: <Trophy size={64} className="text-yellow-400" />,
        color: "bg-indigo-900"
    }
];

export function OnboardingSlides() {
    const [index, setIndex] = useState(0);
    const { completeOnboarding } = useGameStore();

    const currentSlide = SLIDES[index];
    const isLast = index === SLIDES.length - 1;

    const handleNext = () => {
        if (isLast) {
            completeOnboarding();
        } else {
            setIndex(prev => prev + 1);
        }
    };

    return (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center text-white transition-colors duration-500 ${currentSlide.color}`}>
            <div className="w-full max-w-md px-8 flex flex-col items-center text-center">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide.id}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center"
                    >
                        <div className="mb-8 p-8 bg-white/10 rounded-full backdrop-blur-sm shadow-2xl ring-4 ring-white/20">
                            {currentSlide.icon}
                        </div>

                        <h2 className="text-3xl font-black mb-4 tracking-tight leading-tight">
                            {currentSlide.title}
                        </h2>

                        <p className="text-lg text-white/80 leading-relaxed mb-12">
                            {currentSlide.description}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="w-full flex flex-col items-center gap-6">
                    {/* Dots */}
                    <div className="flex gap-3">
                        {SLIDES.map((_, i) => (
                            <div
                                key={i}
                                className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-white" : "w-2 bg-white/30"}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {isLast ? "Get Started" : "Continue"}
                        {isLast ? <Check size={20} /> : <ArrowRight size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
}
