"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function GlobalNavigation() {
    const pathname = usePathname();

    // Hide on immersive pages (lessons, etc)
    if (pathname.startsWith("/lesson") || pathname.startsWith("/master") || pathname.startsWith("/speedrun") || pathname.startsWith("/verdict") || pathname.startsWith("/forge")) {
        return null;
    }

    return (
        // fixed: Sticks to screen even when scrolling
        // top-6 right-6: Puts it in the safe "HUD" zone
        // z-[9999]: The "Nuclear" Z-Index. It will sit on top of EVERYTHING.
        <div className="fixed top-6 right-6 z-[9999]">
            <Link href="/profile">
                <button
                    className="
                        group relative 
                        bg-slate-900 text-white 
                        w-12 h-12 rounded-full 
                        flex items-center justify-center 
                        shadow-2xl shadow-slate-900/20
                        border border-slate-700 
                        hover:scale-110 hover:border-indigo-500 hover:bg-slate-800
                        transition-all duration-300
                    "
                >
                    {/* Icon */}
                    <span className="font-bold text-lg">N</span>

                    {/* Notification Dot (Optional - Green Pulse) */}
                    <span className="absolute top-0 right-0 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>

                    {/* Hover Tooltip (Safe positioning) */}
                    <span className="absolute top-full mt-2 right-0 px-3 py-1 bg-slate-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Profile & Settings
                    </span>
                </button>
            </Link>
        </div>
    );
}
