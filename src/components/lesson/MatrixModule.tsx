import Link from "next/link";
import { Word } from "@/data/types";
import { expandedWords } from "@/data/expandedWords";
import { Box, ArrowRight } from "lucide-react";

interface Props {
    word: Word;
}

export function MatrixModule({ word }: Props) {
    const rootBlock = word.blocks.find(b => b.type === 'root');

    if (!rootBlock) return null;

    // Find siblings (same root, excluding self)
    const siblings = expandedWords.filter(w =>
        w.id !== word.id &&
        w.blocks.some(b => b.id === rootBlock.id)
    );

    if (siblings.length === 0) return null;

    return (
        <section className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-indigo-600 font-bold tracking-widest uppercase text-xs">
                <Box size={14} />
                Matrix Connections
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">
                More with <span className="text-indigo-600">-{rootBlock.label}</span>
            </h3>
            <p className="text-slate-500 mb-6 text-sm">You already know the root. These words act similarly.</p>

            <div className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x">
                {siblings.map(sibling => (
                    <Link
                        key={sibling.id}
                        href={`/master/${sibling.id}`}
                        className="min-w-[200px] p-4 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all snap-start group"
                    >
                        <h4 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors">
                            {sibling.word}
                        </h4>
                        <div className="flex flex-wrap gap-1 mb-3">
                            {sibling.blocks.filter(b => b.type === 'prefix').map(b => (
                                <span key={b.id} className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                                    {b.label}
                                </span>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-2">
                            {sibling.meaning}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
