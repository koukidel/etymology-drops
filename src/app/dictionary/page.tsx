"use client";

import { allWords } from "@/data/words";
import { Block } from "@/data/types";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useGameStore } from "@/store/useGameStore";
import { useMounted } from "@/hooks/useMounted";
import { Header } from "@/components/layout/Header";

type Filter = 'all' | 'prefix' | 'root' | 'suffix';

export default function DictionaryPage() {
    const { t, language } = useTranslation();
    const { masteredWords } = useGameStore();
    const mounted = useMounted();
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

    // Top parts by how many words use them — the highest-leverage ones to learn.
    const ranked = dictionary.slice(0, 3);
    const maxCount = ranked.length ? ranked[0].count : 1;

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

    const masteredCount = mounted
        ? relatedWords.filter(w => masteredWords.includes(w.id)).length
        : 0;

    // あと1部品: words the learner could build if they only had this part —
    // every OTHER part is already owned. The strongest reason to learn it.
    const almostBuildable = useMemo(() => {
        if (!selectedBlock || !mounted) return [];
        const owned = new Set(
            masteredWords.flatMap(id => allWords.find(w => w.id === id)?.blocks.map(b => b.id) ?? []));
        if (owned.has(selectedBlock.id)) return [];
        return relatedWords.filter(w =>
            !masteredWords.includes(w.id) &&
            w.blocks.every(b => b.id === selectedBlock.id || owned.has(b.id)));
    }, [selectedBlock, relatedWords, masteredWords, mounted]);

    // Reverse lookup: typing a whole word (inspect, breakfast…) surfaces the
    // words themselves with their decomposition — the dictionary works both
    // directions.
    const wordHits = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (q.length < 2) return [];
        return allWords.filter(w => w.word.toLowerCase().includes(q)).slice(0, 5);
    }, [searchQuery]);

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
                <p className="text-sm text-muted-foreground mb-10">
                    {ja ? '頻出順の部品リスト。タップして詳しく。' : 'Word parts, most common first. Tap to explore.'}
                </p>

                {/* Most common parts — highest-leverage ranking */}
                <section className="mb-12">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
                        {t('codex.common_parts')}
                    </h2>
                    <ol className="space-y-2.5">
                        {ranked.map(({ block, count }, i) => (
                            <li key={`${block.type}-${block.id}`}>
                                <button
                                    onClick={() => setSelectedBlock(block)}
                                    className="w-full flex items-center gap-4 text-left group"
                                >
                                    <span className="text-sm text-muted-foreground/60 w-5 shrink-0 tabular-nums">{i + 1}</span>
                                    <span className={`font-serif text-lg shrink-0 w-28 ${block.type === 'root' ? 'text-accent' : 'text-foreground'}`}>
                                        {displayLabel(block)}
                                    </span>
                                    <span className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                                        <span className="block h-full bg-accent/70 group-hover:bg-accent transition-colors" style={{ width: `${(count / maxCount) * 100}%` }} />
                                    </span>
                                    <span className="text-sm text-muted-foreground w-16 text-right shrink-0 tabular-nums">
                                        {count}{ja ? '語' : ''}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </section>

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

                {/* Reverse lookup: whole-word matches with their decomposition */}
                {wordHits.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                            {ja ? '単語から引く' : 'Words'}
                        </h2>
                        <ul className="space-y-2">
                            {wordHits.map(w => (
                                <li key={w.id}>
                                    <Link href={`/lesson/${w.id}`} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-1.5 group">
                                        <span className="font-serif text-xl text-foreground group-hover:text-accent transition-colors">{w.word}</span>
                                        <span className="flex items-center gap-1">
                                            {w.blocks.map((b, i) => (
                                                <span key={i} className={`text-sm font-serif ${b.type === 'root' ? 'text-accent' : 'text-muted-foreground'}`}>
                                                    {i > 0 && <span className="text-muted-foreground/50 mr-1">+</span>}
                                                    {b.label.replace(/-/g, '')}
                                                </span>
                                            ))}
                                        </span>
                                        <span className="text-sm text-muted-foreground truncate">{localized(w.meaning)}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

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

                {filtered.length === 0 && wordHits.length === 0 && (
                    <div className="mt-12 text-center">
                        <p className="font-serif text-3xl text-border mb-3">源</p>
                        <p className="text-sm text-muted-foreground">
                            {ja ? `「${searchQuery}」は見つかりませんでした。` : `Nothing found for “${searchQuery}”.`}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {ja ? '部品の綴りや意味でも検索できます。' : 'Try searching by a part’s spelling or meaning.'}
                        </p>
                    </div>
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
                                {almostBuildable.length > 0 && (
                                    <div className="mb-6 rounded-lg border border-dashed border-ochre/60 px-4 py-3">
                                        <p className="text-[11px] uppercase tracking-[0.15em] text-ochre mb-1.5">
                                            {ja ? 'あと、この部品だけ' : 'Only this part missing'}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {ja
                                                ? `この部品を習うと ${almostBuildable.slice(0, 3).map(w => w.word).join('、')} が組み立てられるようになります。`
                                                : `Learn this part and you can build ${almostBuildable.slice(0, 3).map(w => w.word).join(', ')}.`}
                                        </p>
                                    </div>
                                )}

                                <h3 className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
                                    {t('codex.related_words')} ({relatedWords.length})
                                    {mounted && masteredCount > 0 && (
                                        <span className="ml-2 text-accent normal-case tracking-normal">
                                            ・{ja ? `習得 ${masteredCount} / ${relatedWords.length}` : `${masteredCount} / ${relatedWords.length} learned`}
                                        </span>
                                    )}
                                </h3>
                                <ul className="divide-y divide-border">
                                    {relatedWords.map((word) => {
                                        const done = mounted && masteredWords.includes(word.id);
                                        return (
                                            <li key={word.id} className="py-3 flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className={`font-serif text-lg ${done ? 'text-accent' : 'text-foreground'}`}>{word.word}</p>
                                                    <p className="text-sm text-muted-foreground">{localized(word.meaning)}</p>
                                                </div>
                                                {done && <Check size={16} className="text-accent shrink-0 mt-1.5" />}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
