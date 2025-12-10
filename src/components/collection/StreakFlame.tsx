"use client";

import { Flame } from "lucide-react";
import { useGameStore } from "@/store/useGameStore";
import { clsx } from "clsx";
import { useEffect, useState } from "react";

export const StreakFlame = () => {
    const streak = useGameStore((state) => state.streak);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 opacity-0">
                <Flame size={20} />
                <span className="font-bold text-slate-900">0</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            <Flame
                className={clsx(
                    "transition-colors",
                    streak > 0 ? "text-orange-500 fill-orange-500" : "text-slate-300"
                )}
                size={20}
            />
            <span className="font-bold text-slate-900">{streak}</span>
        </div>
    );
};
