"use client";

import { motion } from "framer-motion";
import { Sparkles, Brain, Zap, Target, ArrowRight } from "lucide-react";

interface OnboardingProps {
    onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-600 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-50 to-white pointer-events-none" />

                <div className="relative z-10 p-8 flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm rotate-3">
                        <Sparkles size={32} />
                    </div>

                    {/* Headline */}
                    <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                        Learn Words Like Legos
                    </h1>
                    <p className="text-slate-500 text-lg leading-relaxed mb-8">
                        Build vocabulary by understanding word parts. One root = <span className="font-bold text-indigo-600">20+ words</span> instantly.
                    </p>

                    {/* Visual Example */}
                    <div className="w-full bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-100 relative overflow-hidden">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-indigo-200"
                            >
                                PRE
                            </motion.div>
                            <span className="text-slate-300 font-black">+</span>
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-blue-200"
                            >
                                CEPT
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="text-slate-800 font-black text-xl tracking-widest"
                        >
                            = PRECEPT
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.0 }}
                            className="text-xs text-slate-400 mt-1 font-medium"
                        >
                            (before) + (take)
                        </motion.div>
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-3 gap-4 w-full mb-8">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                                <Brain size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-600">Smart</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                                <Zap size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-600">Fast</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                <Target size={20} />
                            </div>
                            <span className="text-xs font-bold text-slate-600">Effective</span>
                        </div>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={onComplete}
                        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                    >
                        Start Building Words
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="text-xs text-slate-400 mt-4 font-medium">
                        Free for 25 words • No credit card required
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
