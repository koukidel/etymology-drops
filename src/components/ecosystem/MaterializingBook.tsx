"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

interface Props {
    title: string;
    progress: number; // 0-100
    color: string; // e.g. "bg-indigo-500"
    isActive?: boolean;
    onClick?: () => void;
}

export function MaterializingBook({ title, progress, color, isActive, onClick }: Props) {
    // Ensure progress is clamped
    const safeProgress = Math.min(100, Math.max(0, progress));

    return (
        <div
            className="relative w-12 h-40 cursor-pointer group transition-transform hover:-translate-y-2"
            onClick={onClick}
        >
            {/* Layer 1: The Ghost (Wireframe/Hologram) */}
            <div className="absolute inset-0 border-2 border-slate-300 bg-slate-100/30 rounded-r-lg opacity-50 z-0 flex items-center justify-center">
                {/* Vertical Text Ghost */}
                <span className="writing-vertical-rl text-xs font-bold text-slate-300 uppercase tracking-widest opacity-50 select-none">
                    {title}
                </span>
            </div>

            {/* Layer 2: The Materialization (Solid Fill) */}
            <motion.div
                initial={{ clipPath: `inset(100% 0 0 0)` }}
                animate={{ clipPath: `inset(${100 - safeProgress}% 0 0 0)` }}
                transition={{ duration: 1.5, ease: "easeOut", type: "spring", stiffness: 50 }}
                className={clsx(
                    "absolute inset-0 rounded-r-lg z-10 shadow-lg flex items-center justify-center overflow-hidden border-l-4 border-black/10",
                    color, // Background color class
                    isActive && "ring-2 ring-white ring-offset-2 ring-offset-slate-900"
                )}
            >
                {/* Spine Texture / Detail */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20" />
                <div className="absolute right-1 top-2 bottom-2 w-[1px] bg-black/10" />

                {/* Vertical Text Solid */}
                <span className="writing-vertical-rl text-xs font-black text-white uppercase tracking-widest drop-shadow-md whitespace-nowrap overflow-hidden text-ellipsis px-1">
                    {title}
                </span>
            </motion.div>

            {/* Active Glow Connection Point (Top) */}
            {isActive && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] z-20"
                />
            )}
        </div>
    );
}
