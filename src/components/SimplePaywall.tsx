"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Check, Mail, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface SimplePaywallProps {
    onClose: () => void;
    trigger: 'word_limit' | 'locked_root' | 'manual';
}

export function SimplePaywall({ onClose, trigger }: SimplePaywallProps) {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const getHeadline = () => {
        switch (trigger) {
            case 'word_limit':
                return "You've mastered the free 3 words! 🎯";
            case 'locked_root':
            case 'manual':
            default:
                return "Unlock the full power of Etymology Drops";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) return;

        setIsLoading(true);

        // Simulate API call
        console.log('Email captured:', email, 'Trigger:', trigger);

        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            setTimeout(() => onClose(), 2000);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/5 hover:bg-black/10 rounded-full text-slate-500 transition-colors z-10"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20">
                        <Sparkles size={120} className="absolute -top-4 -left-4 text-white" />
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                            <Sparkles size={24} className="text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2 leading-tight">
                            {getHeadline()}
                        </h2>
                        <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                            <span>Early Bird Offer</span>
                            <span>•</span>
                            <span>50% off for email signups</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    {!isSubmitted ? (
                        <>
                            <div className="space-y-3 mb-8">
                                {[
                                    "200+ vocabulary words across 14 root families",
                                    "Unlimited boss challenges & quizzes",
                                    "Full etymology timelines (Latin → English)",
                                    "Progress tracking & achievement system",
                                    "Priority customer support",
                                    "No ads, forever"
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-0.5 bg-emerald-100 text-emerald-600 rounded-full p-0.5">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <p className="text-sm text-slate-600 font-medium">{feature}</p>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Processing..." : "Get 50% Off at Launch 🚀"}
                                </button>
                            </form>

                            <div className="mt-6 text-center space-y-2">
                                <button
                                    onClick={onClose}
                                    className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    Continue with free version
                                </button>
                                <p className="text-[10px] text-slate-400">
                                    Launching this week. No spam, unsubscribe anytime.
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle2 size={40} />
                            </motion.div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">You're on the list! 🎉</h3>
                            <p className="text-slate-500 mb-6">
                                We've secured your 50% discount. Keep an eye on your inbox!
                            </p>
                            <p className="text-xs text-slate-400">Closing automatically...</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
