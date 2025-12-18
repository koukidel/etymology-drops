"use client";

import { useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { rollGacha, GachaItem } from "@/lib/gacha";
import { GachaReveal } from "@/components/rewards/GachaReveal";
import { BottomNav } from "@/components/layout/BottomNav";
import { Store, Gem, Shield, Puzzle, BookOpen, Sparkles } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function ShopPage() {
    const { gems, spendGems, addItem, inventory } = useGameStore();
    const [revealedItem, setRevealedItem] = useState<GachaItem | null>(null);

    const handlePull = () => {
        if (spendGems(50)) {
            const item = rollGacha();
            addItem(item.type, item.id);
            setRevealedItem(item);
        } else {
            alert("Not enough gems!");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                        <Store size={20} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Market</h1>
                        <p className="text-xs text-slate-500 font-medium">Spend your gems</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                    <Gem size={16} className="text-blue-500" />
                    <span className="text-sm font-black text-slate-700">{gems}</span>
                </div>
            </header>

            <main className="p-6 space-y-8">
                {/* Gacha Banner */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4">
                            <Sparkles size={12} />
                            <span>Mystery Box</span>
                        </div>
                        <h2 className="text-2xl font-black mb-2">Unlock Rare Loot</h2>
                        <p className="text-indigo-100 text-sm mb-6 max-w-[80%]">
                            Get exclusive word parts, streak shields, and legendary stories.
                        </p>

                        <button
                            onClick={handlePull}
                            disabled={gems < 50}
                            className="w-full bg-white text-indigo-600 py-3 rounded-xl font-black shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <span>Pull for 50</span>
                            <Gem size={16} />
                        </button>
                    </div>
                </div>

                {/* Inventory */}
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        Your Inventory
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Shields */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                                <Shield size={24} />
                            </div>
                            <div className="text-2xl font-black text-slate-900">{inventory.shields}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase">Shields</div>
                        </div>

                        {/* Parts */}
                        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                                <Puzzle size={24} />
                            </div>
                            <div className="text-2xl font-black text-slate-900">{inventory.customParts.length}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase">Parts</div>
                        </div>

                        {/* Stories */}
                        <div className="col-span-2 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <div className="text-lg font-black text-slate-900">{inventory.stories.length} Stories</div>
                                <div className="text-xs text-slate-500">Unlocked from the archives</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <AnimatePresence>
                {revealedItem && (
                    <GachaReveal
                        item={revealedItem}
                        onClose={() => setRevealedItem(null)}
                    />
                )}
            </AnimatePresence>

            <BottomNav />
        </div>
    );
}
