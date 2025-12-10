import { storyBank } from "@/data/storyBank";
import { wordBank } from "@/data/wordBank";
import { StoryReader } from "@/components/story-stream/StoryReader";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface StoryPageProps {
    params: Promise<{
        storyId: string;
    }>;
}

export default async function StoryPage({ params }: StoryPageProps) {
    const { storyId } = await params;
    const story = storyBank.find(s => s.id === storyId);

    if (!story) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
                <div className="text-center">
                    <h1 className="text-xl font-bold mb-2">Story Not Found</h1>
                    <Link href="/path" className="text-indigo-600 font-bold hover:underline">Return to Map</Link>
                </div>
            </div>
        );
    }

    // Filter wordBank to only include relevant words for this story (optimization)
    // Or just pass the whole bank if small.
    // Ideally, we filter by story.keywords
    const storyWords = wordBank.filter(w => story.keywords.includes(w.id));

    return (
        <main className="min-h-screen bg-slate-50 p-6 flex flex-col">
            <header className="mb-6 flex justify-between items-center">
                <Link href="/path" className="inline-flex p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                    <ArrowLeft size={24} />
                </Link>
                <div className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    Story Reward
                </div>
            </header>

            <StoryReader
                title={story.title}
                content={story.content}
                words={storyWords}
            />

            <div className="mt-8 text-center pb-12">
                <Link href="/path">
                    <button className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:scale-[1.02] active:scale-95 transition-all">
                        Complete Story
                    </button>
                </Link>
            </div>
        </main>
    );
}
