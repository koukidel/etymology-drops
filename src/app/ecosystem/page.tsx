"use client";

import { wordBank } from "@/data/wordBank";
import { GrowthTree } from "@/components/ecosystem/GrowthTree";
import { LibraryShelf } from "@/components/ecosystem/LibraryShelf";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EcosystemPage() {
    const masterRoots = wordBank.slice(0, 14);

    return (
        <main className="relative min-h-screen bg-slate-900 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 p-6 z-50 flex justify-between items-center bg-gradient-to-b from-slate-900 via-slate-900/80 to-transparent">
                <Link href="/" className="p-2 bg-slate-800/50 rounded-full hover:bg-slate-700 transition-colors backdrop-blur-sm border border-slate-700">
                    <ArrowLeft size={24} className="text-slate-300" />
                </Link>
                <h1 className="text-xl font-bold text-white tracking-tight shadow-black drop-shadow-lg">The Ecosystem</h1>
                <div className="w-10" />
            </div>

            <GrowthTree />

            {/* User requested to hide the books for now
            <div className="relative z-10">
                <LibraryShelf words={masterRoots} />
            </div>
            */}

            <div className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none">
                <p className="text-indigo-200 text-sm font-medium opacity-60 animate-pulse">Select a book to connect to the network.</p>
            </div>
        </main>
    );
}
