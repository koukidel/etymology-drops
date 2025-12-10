import { expandedWords } from "@/data/expandedWords";
import { LessonContainer } from "@/components/lesson/LessonContainer";
import Link from "next/link";
import { X } from "lucide-react";

interface PageProps {
    params: Promise<{ wordId: string }>;
}

export default async function LessonPage({ params }: PageProps) {
    const { wordId } = await params;
    const word = expandedWords.find((w) => w.id === wordId);

    if (!word) {
        return <div className="p-8">Word not found</div>;
    }

    return (
        <main className="min-h-screen h-screen w-screen bg-slate-900 flex items-center justify-center overflow-hidden relative">
            {/* Exit Button */}
            <Link
                href="/"
                className="absolute top-6 left-6 z-50 p-3 bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-all backdrop-blur-sm"
            >
                <X size={24} />
            </Link>

            <LessonContainer word={word} />
        </main>
    );
}
