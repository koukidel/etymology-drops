"use client";

import { expandedWords } from "@/data/expandedWords";
import { Block, Word } from "@/data/types";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Book, Search, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function DictionaryPage() {
    const { t } = useTranslation();
    const [filter, setFilter] = useState<'all' | 'prefix' | 'root' | 'suffix'>('all');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

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

    const filtered = dictionary.filter(b => {
        const matchesFilter = filter === 'all' || b.type === filter;
        const matchesSearch = b.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (typeof b.meaning === 'string' ? b.meaning : b.meaning.en).toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    // Find words related to the selected block
    const relatedWords = useMemo(() => {
        if (!selectedBlock) return [];
        return expandedWords.filter(word =>
            word.blocks.some(b => b.id === selectedBlock.id && b.type === selectedBlock.type)
        );
    }, [selectedBlock]);

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 pb-24">
            <header className="px-6 py-6 border-b border-slate-200 bg-white sticky top-0 z-10 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft size={24} className="text-slate-500" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold flex items-center gap-2">
                            <Book className="text-indigo-600" />
                            {t('codex.title')}
                        </h1>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder={t('codex.search_placeholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                    />
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-6">
                {/* Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
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
                        <motion.button
                            key={`${block.type}-${block.id}`}
                            layoutId={`${block.type}-${block.id}`}
                            onClick={() => setSelectedBlock(block)}
                            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex items-start gap-4 text-left w-full"
                        >
                            <div className={`p-3 rounded-lg font-bold text-lg shrink-0 ${block.type === 'root' ? 'bg-indigo-50 text-indigo-700' :
                                block.type === 'prefix' ? 'bg-emerald-50 text-emerald-700' :
                                    'bg-amber-50 text-amber-700'
                                }`}>
                                {block.type === 'prefix' ? `${block.label}-` : block.type === 'suffix' ? `-${block.label}` : block.label}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{block.label}</h3>
                                <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                                    {typeof block.meaning === 'string' ? block.meaning : block.meaning.en}
                                </p>
                                <span className="text-[10px] font-bold text-slate-400 mt-2 inline-block uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-full">
                                    {block.type}
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Detailed View Modal */}
            <AnimatePresence>
                {selectedBlock && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBlock(null)}
                            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                        />
                        <motion.div
                            layoutId={`${selectedBlock.type}-${selectedBlock.id}`}
                            className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-3xl z-50 overflow-hidden flex flex-col shadow-2xl"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                                <div className="flex gap-4">
                                    <div className={`p-4 rounded-2xl font-black text-3xl shadow-sm ${selectedBlock.type === 'root' ? 'bg-indigo-100 text-indigo-700' :
                                        selectedBlock.type === 'prefix' ? 'bg-emerald-100 text-emerald-700' :
                                            'bg-amber-100 text-amber-700'
                                        }`}>
                                        {selectedBlock.type === 'prefix' ? `${selectedBlock.label}-` : selectedBlock.type === 'suffix' ? `-${selectedBlock.label}` : selectedBlock.label}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">{selectedBlock.label}</h2>
                                        <p className="text-slate-500 font-medium">
                                            {typeof selectedBlock.meaning === 'string' ? selectedBlock.meaning : selectedBlock.meaning.en}
                                        </p>
                                        <span className="text-xs font-bold text-slate-400 mt-2 inline-block uppercase tracking-wider bg-white border border-slate-200 px-2 py-1 rounded-full">
                                            {selectedBlock.type}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedBlock(null)}
                                    className="p-2 bg-slate-200 hover:bg-slate-300 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-slate-600" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                                    {t('codex.related_words')} ({relatedWords.length})
                                </h3>
                                <div className="space-y-3">
                                    {relatedWords.map((word) => (
                                        <div key={word.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors group">
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-lg">{word.word}</h4>
                                                <p className="text-slate-500 text-sm">
                                                    {typeof word.meaning === 'string' ? word.meaning : word.meaning.en}
                                                </p>
                                            </div>
                                            <ChevronRight size={20} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
}
