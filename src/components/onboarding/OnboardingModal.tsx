"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles, Key, Box, Scissors } from "lucide-react";

import { PlacementQuiz } from "./PlacementQuiz";

export function OnboardingModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);

    useEffect(() => {
        // Check local storage
        const hasSeen = localStorage.getItem("has_onboarded_v2"); // Bump version to force re-onboard for dev
        if (!hasSeen) {
            setIsOpen(true);
        }
    }, []);

    const handleNext = () => {
        if (step < 3) {
            setStep(s => s + 1);
        } else {
            // Show Quiz instead of closing
            setShowQuiz(true);
        }
    };

    const handleComplete = () => {
        localStorage.setItem("has_onboarded_v2", "true");
        setIsOpen(false);
    };

    if (!isOpen) return null;

    if (showQuiz) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 w-full flex justify-center text-white"
                >
                    <PlacementQuiz onComplete={handleComplete} />
                </motion.div>
            </div>
        );
    }

    const slides = [
        {
            icon: <Sparkles size={48} className="text-yellow-400" />,
            title: "Stop Memorizing.",
            text: "English has 200,000+ words. Trying to memorize them all is impossible. There is a better way.",
            bg: "bg-slate-900"
        },
        {
            icon: <Key size={48} className="text-emerald-400" />,
            title: "14 Keys.",
            text: "Research shows that just 14 Master Roots unlock over 14,000 words. Master these keys, and you master the language.",
            bg: "bg-indigo-950"
        },
        {
            icon: <Box size={48} className="text-pink-400" />,
            title: "Decode & Construct.",
            text: "Use 'The Matrix' to build words like Lego blocks. Use 'The Slicer' to break down complex monsters. Don't study—play.",
            bg: "bg-slate-900"
        },
        {
            icon: <Check size={48} className="text-white" />,
            title: "Your Journey Begins.",
            text: "The Constellation Map shows your path. Start with 'Cept' and unlocking your potential.",
            bg: "bg-emerald-900"
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* Content Card */}
            <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl ${slides[step].bg} text-white p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center text-center`}
            >
                <div className="mb-6 p-4 bg-white/10 rounded-full backdrop-blur-md">
                    {slides[step].icon}
                </div>

                <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
                    {slides[step].title}
                </h2>

                <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
                    {slides[step].text}
                </p>

                {/* Progress Dots */}
                <div className="flex gap-2 mb-8">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-colors ${i === step ? "bg-white" : "bg-white/20"}`}
                        />
                    ))}
                </div>

                <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-transform active:scale-95 shadow-xl"
                >
                    {step === slides.length - 1 ? "Get Started" : "Next"}
                    {step < slides.length - 1 && <ArrowRight size={20} />}
                </button>
            </motion.div>
        </div>
    );
}
