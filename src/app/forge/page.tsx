"use client";

import { ForgeTable } from "@/components/forge/ForgeTable";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgePage() {
    return (
        <main className="min-h-screen bg-slate-50 p-6 flex flex-col">
            <header className="mb-8 flex items-center gap-4">
                <Link href="/" className="p-2 bg-white rounded-xl shadow-sm hover:bg-slate-100 transition-colors">
                    <ArrowLeft size={24} className="text-slate-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Word Forge</h1>
                    <p className="text-sm text-slate-500">Combine blocks to discover new meanings.</p>
                </div>
            </header>

            {/* User requested to hide content for now
            <ForgeTable />
            */}
            <div className="flex-1 flex items-center justify-center text-slate-400 font-medium">
                Work in Progress
            </div>
        </main>
    );
}
