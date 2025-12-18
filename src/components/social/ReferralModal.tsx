"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Copy, Share2, X, Gift, Check } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { useState } from "react";

interface ReferralModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
    const { referralCode, generateReferralCode, referralsCount } = useGameStore();
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        generateReferralCode();
    };

    const handleCopy = () => {
        if (referralCode) {
            navigator.clipboard.writeText(`Join me on Etymology Drops! Use code: ${referralCode}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
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
                        className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md bg-white rounded-3xl z-[101] overflow-hidden shadow-2xl"
                    >
                        <div className="bg-pink-500 p-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                <Users size={120} className="absolute -top-4 -left-4" />
                                <Gift size={120} className="absolute -bottom-4 -right-4" />
                            </div>

                            <div className="relative z-10">
                                <h2 className="text-2xl font-black text-white mb-2">Invite Friends</h2>
                                <p className="text-pink-100 font-medium">Earn gems for every friend who joins!</p>
                            </div>

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-8">
                            {/* Stats */}
                            <div className="flex justify-center gap-8 mb-8">
                                <div className="text-center">
                                    <div className="text-2xl font-black text-slate-800">{referralsCount}</div>
                                    <div className="text-xs font-bold text-slate-400 uppercase">Friends</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-black text-slate-800">{referralsCount * 100}</div>
                                    <div className="text-xs font-bold text-slate-400 uppercase">Gems Earned</div>
                                </div>
                            </div>

                            {/* Code Generation / Display */}
                            {!referralCode ? (
                                <button
                                    onClick={handleGenerate}
                                    className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
                                >
                                    Generate My Code
                                </button>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-slate-100 p-4 rounded-xl flex items-center justify-between border border-slate-200">
                                        <code className="text-xl font-mono font-bold text-slate-800 tracking-wider">
                                            {referralCode}
                                        </code>
                                        <button
                                            onClick={handleCopy}
                                            className="p-2 hover:bg-white rounded-lg transition-colors text-slate-500"
                                        >
                                            {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
                                        </button>
                                    </div>
                                    <button
                                        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Share2 size={20} />
                                        Share Link
                                    </button>
                                </div>
                            )}

                            {/* Reward Tiers */}
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <h4 className="text-xs font-bold text-slate-400 uppercase mb-4">Rewards</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 opacity-50">
                                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                                        <div className="text-sm text-slate-600">100 Gems</div>
                                    </div>
                                    <div className="flex items-center gap-3 opacity-50">
                                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold">5</div>
                                        <div className="text-sm text-slate-600">1 Month Premium</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
