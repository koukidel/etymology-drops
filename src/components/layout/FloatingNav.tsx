"use client";

import { Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { StatsDisplay } from "@/components/gamification/StatsDisplay";

export function FloatingNav() {
    const pathname = usePathname();
    const [showStats, setShowStats] = useState(false);

    // Hide on immersive pages (lessons, etc)
    if (pathname.startsWith("/lesson") || pathname.startsWith("/master") || pathname.startsWith("/speedrun") || pathname.startsWith("/verdict") || pathname.startsWith("/forge")) {
        return null;
    }

    return (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-4 bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-full border border-slate-700 shadow-2xl">

                {/* Home / Path */}
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                    <Home size={20} />
                </Link>

                {/* The "N" Brand Button (Center Stage) */}
                <div className="w-px h-6 bg-slate-700 mx-2" /> {/* Divider */}
                <button
                    onClick={() => setShowStats(true)}
                    className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg shadow-indigo-500/50 hover:scale-110 transition-transform"
                >
                    N
                </button>
                <div className="w-px h-6 bg-slate-700 mx-2" /> {/* Divider */}

                {/* Settings / Profile */}
                <Link href="/profile" className="text-slate-400 hover:text-white transition-colors">
                    <Settings size={20} />
                </Link>

            </div>

            <StatsDisplay isOpen={showStats} onClose={() => setShowStats(false)} />
        </div>
    );
}
