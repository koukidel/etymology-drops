import { WordGrid } from "@/components/collection/WordGrid";
import { StreakFlame } from "@/components/collection/StreakFlame";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getWords } from "@/lib/api";

export default async function CollectionPage() {
    const words = await getWords();

    return (
        <main className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
            <header className="w-full max-w-2xl mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-100 transition-colors">
                        <ArrowLeft size={24} className="text-slate-600" />
                    </Link>
                    <h1 className="text-2xl font-bold text-slate-900">Your Collection</h1>
                </div>
                {/* StreakFlame removed per user request */}
            </header>

            <WordGrid words={words} />
        </main>
    );
}
