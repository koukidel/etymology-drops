"use client";

import { motion, useReducedMotion } from "framer-motion";

// The bird from 鳴 (Lesson 0's kanji: mouth + bird). A quiet brand flourish
// for finishing moments — drawn, not imported, so it weighs nothing.
export function Bird({ size = 28 }: { size?: number }) {
    const reduce = useReducedMotion();
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden
            initial={reduce ? false : { opacity: 0, x: -14, y: 8 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-accent"
        >
            <path
                d="M4 20 C9 12 14 10 18 11 C19 8 22 6 25 7 C24 9 24 10 25 11 L29 12 L25 14 C25 19 20 24 13 24 C10 24 6 22 4 20 Z"
                fill="currentColor"
                opacity="0.9"
            />
            <circle cx="23.2" cy="9.4" r="0.9" fill="var(--color-background)" />
            <path d="M11 24 L10 28 M15 24 L15 28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </motion.svg>
    );
}
