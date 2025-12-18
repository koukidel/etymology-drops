"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles, X, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useGameStore } from "@/store/useGameStore";

interface PremiumModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { setPremium } = useGameStore();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            console.log("Waitlist Email:", email);
            setIsSubmitted(true);
            // For prototype, we unlock immediately after "joining waitlist"
            setTimeout(() => {
                setPremium(true);
                onClose();
            }, 2000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-x-4 top-[15%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md bg-white rounded-3xl z-[101] overflow-hidden shadow-2xl"
                    >
                        <div className="bg-indigo-600 p-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                <Sparkles size={120} className="absolute -top-4 -left-4" />
                                <Lock size={120} className="absolute -bottom-4 -right-4" />
                            </div>

                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                                    <Lock size={32} className="text-white" />
                                </div>
                                <h2 className="text-2xl font-black text-white mb-2">
                                    You're on Fire! 🔥
                                </h2>
                                <p className="text-indigo-100 font-medium">
                                    You've learned 25 words. That's amazing progress!
                                </p>
                            </div>

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8">
                            {!isSubmitted ? (
                                <>
                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                                            <p className="text-slate-600 text-sm">Unlock unlimited words and roots.</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                                            <p className="text-slate-600 text-sm">Access the full Etymo-Scanner.</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                                            <p className="text-slate-600 text-sm">Support the development of new levels.</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                                Join the Waitlist
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                placeholder="Enter your email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                        >
                                            Unlock Full Access
                                        </button>
                                        <p className="text-xs text-center text-slate-400">
                                            Limited spots available for early access.
                                        </p>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">You're on the list!</h3>
                                    <p className="text-slate-500 mb-6">
                                        We've unlocked full access for you as a thank you for being an early supporter.
                                    </p>
                                    <p className="text-xs text-slate-400">Redirecting...</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
