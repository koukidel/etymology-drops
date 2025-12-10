import { CraftingTable } from "@/components/crafting-lab/CraftingTable";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getWords } from "@/lib/api";

export default async function CraftingPage() {
    const words = await getWords();

    return (
        <main className="min-h-screen bg-slate-50 p-6 flex flex-col">
            <header className="mb-8 flex items-center gap-4">
                <Link href="/" className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={24} className="text-slate-600" />
                </Link>
                <h1 className="text-2xl font-bold text-slate-900">Crafting Lab</h1>
            </header>

            <div className="flex-1 flex items-center justify-center">
                <CraftingTable words={words} />
            </div>
        </main>
    );
}
