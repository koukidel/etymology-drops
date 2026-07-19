"use client";

import Link from "next/link";
import { allWords } from "@/data/words";
import { Word } from "@/data/types";
import { Header } from "@/components/layout/Header";
import { Seal } from "@/components/ui/Seal";
import { useTranslation } from "@/hooks/useTranslation";

// 語源の読み物: the best origin stories, magazine-style. This is the page
// people forward to friends — every entry links back into its lesson.
const CURATED: string[] = [
    "breakfast", "goodbye", "muscle", "salary", "disaster", "window",
    "companion", "nightmare", "quarantine", "denim", "hippopotamus",
    "passport", "supermarket", "remote",
];

export default function StoriesPage() {
    const { language } = useTranslation();
    const ja = language === "ja";
    const loc = (s: string | { en: string; ja: string }) => (typeof s === "string" ? s : s[language]);

    const stories = CURATED
        .map(id => allWords.find(w => w.id === id))
        .filter((w): w is Word => Boolean(w));

    return (
        <div className="min-h-screen">
            <Header />
            <main className="max-w-xl mx-auto px-6 py-12">
                <header className="mb-12">
                    <h1 className="font-serif text-4xl text-foreground mb-2">
                        {ja ? "語源の読み物" : "Origin Stories"}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {ja
                            ? "毎日の英単語に隠れた、本当にあった物語。"
                            : "The true stories hiding inside everyday English."}
                    </p>
                </header>

                <div className="space-y-12">
                    {stories.map((w, i) => (
                        <article key={w.id} className={i > 0 ? "pt-12 border-t border-border" : undefined}>
                            <div className="flex items-baseline gap-3 mb-1.5">
                                <h2 className="font-serif text-3xl text-foreground">{w.word}</h2>
                                <span className="font-serif text-sm text-accent">
                                    {w.blocks.map(b => b.label.replace(/-/g, "")).join(" + ")}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">{loc(w.meaning)}</p>
                            <p className="font-serif text-lg text-foreground leading-relaxed mb-4">
                                {loc(w.history)}
                            </p>
                            <Link
                                href={`/lesson/${w.id}`}
                                className="text-sm text-accent hover:opacity-80 underline underline-offset-4"
                            >
                                {ja ? "この言葉を習う" : "Learn this word"} →
                            </Link>
                        </article>
                    ))}
                </div>

                <footer className="mt-16 pt-8 border-t border-border flex items-center gap-3 text-sm text-muted-foreground">
                    <Seal size={22} />
                    {ja ? "すべての言葉に、物語がある。" : "Every word has a story."}
                </footer>
            </main>
        </div>
    );
}
