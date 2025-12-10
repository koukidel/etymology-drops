"use client";

import { expandedWords } from "@/data/expandedWords";
import { Block } from "@/data/types";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Book, Filter } from "lucide-react";

export default function DictionaryPage() {
    const [filter, setFilter] = useState<'all' | 'prefix' | 'root' | 'suffix'>('all');

    // Extract all unique blocks
    const dictionary = useMemo(() => {
        const map = new Map<string, Block>();
        expandedWords.forEach(word => {
            word.blocks.forEach(block => {
                const key = `${block.type}-${block.id}`;
                if (!map.has(key)) {
                    map.set(key, block);
                }
            });
        });
        return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
    }, []);

    const filtered = dictionary.filter(b => filter === 'all' || b.type === filter);

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 pb-20">
            <header className="px-6 py-6 border-b border-slate-200 bg-white sticky top-0 z-10 flex items-center gap-4">
                <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-slate-500" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <Book className="text-indigo-600" />
                        The Codex
                    </h1>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Filters */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    {['all', 'root', 'prefix', 'suffix'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type as any)}
                            className={`px-4 py-2 rounded-full font-bold text-sm capitalize whitespace-nowrap transition-all ${filter === type
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                }`}
                        >
                            {type}s
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filtered.map((block) => (
                        <div key={`${block.type}-${block.id}`} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-start gap-4">
                            <div className={`p-3 rounded-lg font-bold text-lg ${block.type === 'root' ? 'bg-indigo-50 text-indigo-700' :
                                block.type === 'prefix' ? 'bg-emerald-50 text-emerald-700' :
                                    'bg-amber-50 text-amber-700'
                                }`}>
                                {block.type === 'prefix' ? `${block.label}-` : block.type === 'suffix' ? `-${block.label}` : block.label}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{block.label}</h3>
                                <p className="text-slate-500 text-sm mt-1">
                                    {typeof block.meaning === 'string' ? block.meaning : block.meaning.en}
                                </p>
                                <span className="text-xs font-mono text-slate-400 mt-2 inline-block uppercase tracking-wider">{block.type}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
