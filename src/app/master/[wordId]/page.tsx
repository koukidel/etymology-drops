"use client";

import { use, useState } from "react";
import { expandedWords } from "@/data/expandedWords";
import { levels } from "@/data/levels";
import { ArrowLeft, BookOpen, Swords, History } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { storyBank } from "@/data/storyBank";
import { useRouter } from "next/navigation";
import { TimeTraveler } from "@/components/mastery/TimeTraveler";
import { FamilyTree } from "@/components/mastery/FamilyTree";
import { BossGauntlet } from "@/components/mastery/BossGauntlet";
import { SlicerModule } from "@/components/lesson/SlicerModule";
import { MatrixModule } from "@/components/lesson/MatrixModule";

interface PageProps {
    params: Promise<{ wordId: string }>;
}

export default function MasterWordPage({ params }: PageProps) {
    const { wordId } = use(params);
    const router = useRouter();
    const word = expandedWords.find(w => w.id === wordId);

    // Mock "Boss" State - In real app, this would be a separate Quiz component
    const [showBoss, setShowBoss] = useState(false);

    if (!word) return <div className="p-8">Word not found: {wordId}</div>;

    // Find associated story (Approximation: use level 1 story for all Cept words, etc?)
    // Actually, we linked stories to LEVELS, not WORDS.
    // Let's assume ID mapping: lvl_1 -> cept words.
    // For MVP, just show *a* story if it matches the generic topic?
    // Let's just grab the story for lvl_1 for now for all, to test.
    const story = storyBank[0];

    return (
        <main className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50 px-6 py-4 flex items-center gap-4">
                <Link href="/" className="p-2 hover:bg-slate-100 rounded-full">
                    <ArrowLeft size={24} className="text-slate-600" />
                </Link>
                <h1 className="text-lg font-bold text-slate-900">{word.word}</h1>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

                {/* 1. HERO CARD: Deconstruction */}
                <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 text-center">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-2">{word.word}</h2>
                    <p className="text-xl text-slate-500 mb-8">{word.meaning}</p>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
                        {word.blocks.map((block) => (
                            <div key={block.id} className="flex flex-col items-center gap-2">
                                <div className={`px-4 py-3 rounded-xl text-lg font-bold border-2 ${block.type === 'root'
                                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                    : 'bg-slate-50 border-slate-200 text-slate-600'
                                    }`}>
                                    {block.label}
                                </div>
                                <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">{block.meaning}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. SLICER MODULE */}
                <SlicerModule word={word} />

                {/* 3. TIME MACHINE (History) */}
                {word.timeline ? (
                    <TimeTraveler timeline={word.timeline} />
                ) : (
                    <section className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                        <div className="flex items-center gap-2 text-amber-800 font-bold mb-3">
                            <History size={20} />
                            <h3>Etymology</h3>
                        </div>
                        <p className="text-amber-900 leading-relaxed">
                            {word.history}
                        </p>
                    </section>
                )}

                {/* 4. MATRIX MODULE */}
                <MatrixModule word={word} />

                {/* 5. TREE & PRACTICE */}
                <section>
                    <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">The {word.blocks.find(b => b.type === 'root')?.label} Family</h3>
                    <div className="py-8">
                        <FamilyTree
                            rootId={word.blocks.find(b => b.type === 'root')?.id || ""}
                            currentWordId={word.id}
                        />
                    </div>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    <Link href={`/story/${story?.id || 'story_lvl_1'}`} className="flex items-center justify-center gap-3 p-4 bg-emerald-100 text-emerald-800 rounded-xl font-bold hover:bg-emerald-200 transition-colors">
                        <BookOpen size={20} />
                        Practice Story
                    </Link>

                    <button
                        onClick={() => setShowBoss(true)}
                        className="flex items-center justify-center gap-3 p-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                    >
                        <Swords size={20} />
                        Boss Battle
                    </button>
                </div>
            </div>

            {/* BOSS MODAL */}
            <AnimatePresence>
                {showBoss && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-900/90 flex items-center justify-center p-6"
                    >
                        <BossGauntlet
                            word={word}
                            onClose={() => setShowBoss(false)}
                            onComplete={() => {
                                // Add Mastery Logic here (e.g., store.addMastered(word.id))
                                setShowBoss(false);
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
