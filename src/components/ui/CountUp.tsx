"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Animates 0 → value once on mount (~450ms, eased). Numbers that arrive
// feel earned; numbers that are just there feel like furniture.
export function CountUp({ value, duration = 450 }: { value: number; duration?: number }) {
    const reduce = useReducedMotion();
    const [display, setDisplay] = useState(reduce ? value : 0);
    const raf = useRef<number | undefined>(undefined);

    useEffect(() => {
        if (reduce) return; // initial state already shows the final value
        const t0 = performance.now();
        const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(Math.round(value * eased));
            if (p < 1) raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);
        return () => { if (raf.current) cancelAnimationFrame(raf.current); };
    }, [value, duration, reduce]);

    return <>{display}</>;
}
