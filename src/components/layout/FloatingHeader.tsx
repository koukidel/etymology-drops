"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function FloatingHeader() {
    const pathname = usePathname();

    // Hide on immersive pages (lessons, etc)
    if (pathname.startsWith("/lesson") || pathname.startsWith("/master") || pathname.startsWith("/speedrun") || pathname.startsWith("/verdict") || pathname.startsWith("/forge")) {
        return null;
    }

    return (
        // "fixed top-0" ensures it sticks to the top
        // "z-[100]" ensures it is ALWAYS on top of everything (Tree, Books, Modals)
        <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-[100]">

            {/* Left Side: Brand or Back Button (If needed) */}
            <div className="pointer-events-auto">
                {/* You can put a logo here if you want, or leave empty */}
            </div>

            {/* Right Side: The "N" Icon Area */}
            <div className="pointer-events-auto flex items-center gap-3">

                {/* Optional: Streak Counter / Stats could go here */}

                {/* The "N" Profile Button */}
                <Link href="/profile">
                    <button className="group relative bg-slate-900 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl border border-slate-700 hover:scale-110 hover:border-indigo-500 transition-all duration-300">
                        <span className="font-bold text-lg">N</span>

                        {/* Optional: Glowing Status Dot */}
                        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>

                        {/* Tooltip on Hover */}
                        <span className="absolute top-full mt-2 right-0 bg-slate-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Profile & Settings
                        </span>
                    </button>
                </Link>
            </div>

        </header>
    );
}
