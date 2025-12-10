"use client";

import { useState } from "react";
import { scanText, ScanResult } from "@/lib/scanner";
import { ArrowLeft, ScanSearch, Sparkles, Clipboard } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

const DEMO_TEXT = `The concept of universal perception is often difficult to maintain. 
However, if we inspect the facts, we see it is uncomplicated. 
We must not submit to confusion, but rather extend our understanding through logic. 
I propose we transfer our focus to the essential aspects of the problem.`;

export default function ScannerPage() {
    const [input, setInput] = useState("");
    const [result, setResult] = useState<ScanResult | null>(null);

    const handleScan = () => {
        if (!input.trim()) return;
        const res = scanText(input);
        setResult(res);
    };

    return (
        <main className="min-h-screen bg-slate-900 text-slate-100 pb-20">
            {/* Header */}
            <header className="px-6 py-6 border-b border-slate-800 flex items-center gap-4">
                <Link href="/" className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-slate-400" />
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <ScanSearch className="text-indigo-400" />
                        DNA Scanner
                    </h1>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* INPUT */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Target Text</label>
                        <button
                            onClick={() => setInput(DEMO_TEXT)}
                            className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                        >
                            <Sparkles size={12} /> Load Sample
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste an article, email, or essay here..."
                        className="w-full h-80 bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 text-slate-200 focus:border-indigo-500 focus:outline-none resize-none font-mono"
                    />
                    <button
                        onClick={handleScan}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-900/20 transition-all active:scale-[0.98]"
                    >
                        Scan for 14 Genes
                    </button>
                </div>

                {/* RESULTS */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Analysis</label>
                        {result && (
                            <span className="px-3 py-1 rounded-full bg-emerald-900/50 text-emerald-400 font-mono text-xs border border-emerald-800">
                                {result.stats.coverage}% Match Rate
                            </span>
                        )}
                    </div>

                    <div className="relative w-full h-80 bg-white rounded-2xl p-6 overflow-y-auto text-slate-800 leading-relaxed font-serif text-lg shadow-inner shadow-slate-200">
                        {!result ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50">
                                <ScanSearch size={48} className="mb-4" />
                                <p>Ready to scan...</p>
                            </div>
                        ) : (
                            <div>
                                {result.elements.map((el, i) => (
                                    <span
                                        key={i}
                                        className={clsx(
                                            el.isMatch
                                                ? "bg-indigo-100 text-indigo-800 font-bold border-b-2 border-indigo-200 px-0.5 rounded cursor-help"
                                                : "text-slate-600",
                                            "transition-colors"
                                        )}
                                        title={el.root ? `Root: ${el.root.toUpperCase()}` : undefined}
                                    >
                                        {el.text}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {result && (
                        <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 text-sm text-slate-400">
                            Found <strong className="text-white">{result.stats.rootMatches}</strong> matches out of {result.stats.totalWords} words.
                            <br />
                            Each match links back to one of your 14 Master Keys.
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
}
