"use client";

import { allWords } from "@/data/words";
import { Block } from "@/data/types";
import { useState, useMemo } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { Header } from "@/components/layout/Header";

type Filter = 'all' | 'prefix' | 'root' | 'suffix';

export default function DictionaryPage() {
    const { t, language } = useTranslation();
    const [filter, setFilter] = useState<Filter>('all');
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

    const ja = language === 'ja';
    const localized = (s: string | { en: string; ja: string }) =>
        typeof s === 'string' ? s : s[language];

    // Every part, with how many words use it, sorted most-frequent-first (頻出順).
    const dictionary = useMemo(() => {
        const map = new Map<string, Block>();
        const counts = new Map<string, number>();
        allWords.forEach(word => {
            const seen = new Set<string>();
            word.blocks.forEach(block => {
                const key = `${block.type}-${block.id}`;
                if (!map.has(key)) map.set(key, block);
                if (!seen.has(key)) { seen.add(key); counts.set(key, (counts.get(key) ?? 0) + 1); }
            });
        });
        return Array.from(map.entries())
            .map(([key, block]) => ({ block, count: counts.get(key) ?? 0 }))
            .sort((a, b) => b.count - a.count || a.block.label.localeCompare(b.block.label));
    }, []);

    const filtered = dictionary.filter(({ block: b }) => {
        const matchesFilter = filter === 'all' || b.type === filter;
        const meaning = localized(b.meaning);
        const matchesSearch = b.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meaning.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const relatedWords = useMemo(() => {
        if (!selectedBlock) return [];
        return allWords.filter(word =>
            word.blocks.some(b => b.id === selectedBlock.id && b.type === selectedBlock.type)
        );
    }, [selectedBlock]);

    const displayLabel = (block: Block) => {
        const bare = block.label.replace(/-/g, '');
        return block.type === 'prefix' ? `${bare}-` : block.type === 'suffix' ? `-${bare}` : bare;
    };

    const typeLabel = (type: string) => {
        if (language === 'ja') {
            return type === 'prefix' ? '接頭辞' : type === 'suffix' ? '接尾辞' : type === 'root' ? '語根' : 'すべて';
        }
        return type;
    };

    return (
        <div className="min-h-screen">
            <Header />

            <main className="max-w-3xl mx-auto px-6 py-12">
                <h1 className="font-serif text-4xl text-foreground mb-2">{t('codex.title')}</h1>
                <p className="text-sm text-muted-foreground mb-8">
                    {ja ? '頻出順の部品リスト。タップして詳しく。' : 'Word parts, most common first. Tap to explore.'}
                </p>

                {/* Search */}
                <input
                    type="text"
                    placeholder={t('codex.search_placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-border focus:border-foreground outline-none text-lg placeholder:text-muted-foreground/60 transition-colors mb-6"
                />

                {/* Filters */}
                <div className="flex gap-5 mb-10">
                    {(['all', 'root', 'prefix', 'suffix'] as Filter[]).map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilter(type)}
                            className={`text-sm capitalize transition-colors ${filter === type
                                ? 'text-foreground underline underline-offset-8'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {typeLabel(type)}
                        </button>
                    ))}
                </div>

                {/* List */}
                <ul className="divide-y divide-border border-y border-border">
                    {filtered.map(({ block, count }) => (
                        <li key={`${block.type}-${block.id}`}>
                            <button
                                onClick={() => setSelectedBlock(block)}
                                className="w-full flex items-baseline justify-between gap-4 py-4 text-left hover:bg-muted/40 -mx-3 px-3 transition-colors"
                            >
                                <div className="flex items-baseline gap-4 min-w-0">
                                    <span className={`font-serif text-xl shrink-0 ${block.type === 'root' ? 'text-accent' : 'text-foreground'}`}>
                                        {displayLabel(block)}
                                    </span>
                                    <span className="text-sm text-muted-foreground truncate">
                                        {localized(block.meaning)}
                                    </span>
                                </div>
                                <span className="text-sm text-muted-foreground/80 shrink-0 tabular-nums">
                                    {count}{ja ? '語' : ''}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>

                {filtered.length === 0 && (
                    <p className="text-sm text-muted-foreground mt-8 text-center">
                        {language === 'ja' ? '見つかりませんでした。' : 'Nothing found.'}
                    </p>
                )}
            </main>

            {/* Detail panel */}
            <AnimatePresence>
                {selectedBlock && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBlock(null)}
                            className="fixed inset-0 bg-foreground/20 z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-x-4 top-[12%] max-h-[76vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-card border border-border rounded-xl z-50 overflow-hidden flex flex-col"
                        >
                            <div className="p-6 border-b border-border flex justify-between items-start">
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-1">
                                        {typeLabel(selectedBlock.type)}
                                    </p>
                                    <h2 className="font-serif text-3xl text-foreground">{displayLabel(selectedBlock)}</h2>
                                    <p className="text-muted-foreground mt-1">{localized(selectedBlock.meaning)}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedBlock(null)}
                                    aria-label="Close"
                                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6">
                                <h3 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
                                    {t('codex.related_words')} ({relatedWords.length})
                                </h3>
                                <ul className="divide-y divide-border">
                                    {relatedWords.map((word) => (
                                        <li key={word.id} className="py-3">
                                            <p className="font-serif text-lg text-foreground">{word.word}</p>
                                            <p className="text-sm text-muted-foreground">{localized(word.meaning)}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
