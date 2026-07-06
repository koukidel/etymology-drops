import { allWords } from "@/data/words";
import { LessonContainer } from "@/components/lesson/LessonContainer";
import Link from "next/link";
import { X } from "lucide-react";

interface PageProps {
    params: Promise<{ wordId: string }>;
}

export default async function LessonPage({ params }: PageProps) {
    const { wordId } = await params;
    const word = allWords.find((w) => w.id === wordId);

    if (!word) {
        return <div className="p-8">Word not found</div>;
    }

    return (
        <main className="min-h-screen flex items-center justify-center relative">
            <Link
                href="/"
                aria-label="Exit lesson"
                className="absolute top-6 left-6 z-50 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
                <X size={22} />
            </Link>

            <LessonContainer word={word} />
        </main>
    );
}
