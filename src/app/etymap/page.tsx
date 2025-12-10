"use client";

import { useGraphData } from "@/hooks/useGraphData";
import { EtymoGraph } from "@/components/etymap/EtymoGraph";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EtymapPage() {
    const { nodes, links } = useGraphData();

    return (
        <main className="w-full h-screen relative bg-slate-900">
            <header className="absolute top-6 left-6 z-50 flex items-center gap-4">
                <Link href="/path" className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-sm">
                    <ArrowLeft size={24} />
                </Link>
                <div className="bg-indigo-500/20 text-indigo-200 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md border border-indigo-500/30">
                    Constellation Map
                </div>
            </header>

            <EtymoGraph nodes={nodes} links={links} />
        </main>
    );
}
