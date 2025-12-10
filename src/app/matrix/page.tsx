"use client";

import { useState, useMemo } from "react";
import { expandedWords } from "@/data/expandedWords";
import { Block } from "@/data/types";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Box, Sparkles, RefreshCw } from "lucide-react";

export default function MatrixPage() {
    const [selectedPrefix, setSelectedPrefix] = useState<Block | null>(null);
    const [selectedRoot, setSelectedRoot] = useState<Block | null>(null);

    // Extract unique blocks
    const { prefixes, roots } = useMemo(() => {
        const pMap = new Map<string, Block>();
        const rMap = new Map<string, Block>();

        expandedWords.forEach(w => {
            w.blocks.forEach(b => {
                if (b.type === 'prefix') pMap.set(b.id, b);
                if (b.type === 'root') rMap.set(b.id, b);
            });
        });

        return {
            prefixes: Array.from(pMap.values()).sort((a, b) => a.label.localeCompare(b.label)),
            roots: Array.from(rMap.values()).sort((a, b) => a.label.localeCompare(b.label))
        };
    }, []);

    // Check for match
    const match = useMemo(() => {
        if (!selectedPrefix || !selectedRoot) return null;
        return expandedWords.find(w => {
            const hasPrefix = w.blocks.some(b => b.id === selectedPrefix.id);
            const hasRoot = w.blocks.some(b => b.id === selectedRoot.id);
            return hasPrefix && hasRoot;
        });
    }, [selectedPrefix, selectedRoot]);

    const handleReset = () => {
        setSelectedPrefix(null);
        setSelectedRoot(null);
    };

    return (
        <main className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
            <header className="px-6 py-4 flex items-center justify-between border-b border-slate-800">
                <Link href="/" className="p-2 hover:bg-slate-800 rounded-full">
                    <ArrowLeft size={24} className="text-slate-400" />
                </Link>
                <h1 className="text-xl font-bold flex items-center gap-2">
                    <Box className="text-indigo-500" />
                    The Matrix
                </h1>
                <button onClick={handleReset} className="p-2 hover:bg-slate-800 rounded-full text-slate-400">
                    <RefreshCw size={20} />
                </button>
            </header>

            <div className="flex-1 flex flex-col md:flex-row gap-6 p-6 overflow-hidden">

                {/* 1. PREFIX DOCK */}
                <div className="flex-1 overflow-y-auto bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Prefixes</h3>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                        {prefixes.map(p => (
                            <button
                                key={p.id}
                                onClick={() => setSelectedPrefix(p)}
                                className={`p-4 rounded-xl font-bold text-left transition-all ${selectedPrefix?.id === p.id
                                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105"
                                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                                    }`}
                            >
                                {p.label}-
                                <div className="text-xs font-normal opacity-70 mt-1">
                                    {typeof p.meaning === 'string' ? p.meaning : p.meaning.en}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. REVEAL ZONE */}
                <div className="flex-[2] flex flex-col items-center justify-center p-6 relative">
                    {/* Connection Lines (Visual) */}
                    <div className="absolute inset-x-0 top-1/2 h-0 border-t border-dashed border-slate-600 -z-10" />

                    <div className="flex items-center gap-4 text-4xl font-extrabold">
                        {/* Selected Prefix */}
                        <motion.div
                            layout
                            className={`p-6 rounded-2xl border-4 ${selectedPrefix ? "bg-emerald-900/40 border-emerald-500 text-emerald-400" : "border-slate-700 border-dashed text-slate-700"}`}
                        >
                            {selectedPrefix ? selectedPrefix.label : "?"}
                        </motion.div>

                        <span className="text-slate-600">+</span>

                        {/* Selected Root */}
                        <motion.div
                            layout
                            className={`p-6 rounded-2xl border-4 ${selectedRoot ? "bg-indigo-900/40 border-indigo-500 text-indigo-400" : "border-slate-700 border-dashed text-slate-700"}`}
                        >
                            {selectedRoot ? selectedRoot.label : "?"}
                        </motion.div>
                    </div>

                    {/* Result */}
                    <div className="h-40 flex items-center justify-center mt-8 w-full max-w-md">
                        <AnimatePresence mode="wait">
                            {match ? (
                                <motion.div
                                    key={match.id}
                                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    className="bg-white text-slate-900 p-8 rounded-3xl shadow-2xl text-center w-full relative overflow-hidden"
                                >
                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-indigo-500" />
                                    <h2 className="text-4xl font-black mb-2 flex items-center justify-center gap-2">
                                        <Sparkles className="text-amber-400" />
                                        {match.word}
                                    </h2>
                                    <p className="text-lg text-slate-600">
                                        {typeof match.meaning === 'string' ? match.meaning : match.meaning.en}
                                    </p>
                                    <Link href={`/master/${match.id}`} className="inline-block mt-4 text-sm font-bold text-indigo-600 underline decoration-2 underline-offset-4 hover:text-indigo-800">
                                        View Full Profile
                                    </Link>
                                </motion.div>
                            ) : (selectedPrefix && selectedRoot) ? (
                                <motion.div
                                    key="nomatch"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-slate-500 font-mono text-sm"
                                >
                                    No data for this combination yet.
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </div>

                {/* 3. ROOT DOCK */}
                <div className="flex-1 overflow-y-auto bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Roots (The 14)</h3>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                        {roots.map(r => (
                            <button
                                key={r.id}
                                onClick={() => setSelectedRoot(r)}
                                className={`p-4 rounded-xl font-bold text-left transition-all ${selectedRoot?.id === r.id
                                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 scale-105"
                                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                                    }`}
                            >
                                -{r.label}
                                <div className="text-xs font-normal opacity-70 mt-1">
                                    {typeof r.meaning === 'string' ? r.meaning : r.meaning.en}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
