"use client";

import { useEffect, useState } from "react";
import { Volume2 } from "lucide-react";

// Pronounce an English word via the browser's speech synthesis. No assets,
// no network; hidden where the platform doesn't support it.
export function Speak({ word, size = 18, className = "" }: { word: string; size?: number; className?: string }) {
    const [supported, setSupported] = useState(false);
    useEffect(() => {
        const id = requestAnimationFrame(() =>
            setSupported(typeof window !== "undefined" && "speechSynthesis" in window));
        return () => cancelAnimationFrame(id);
    }, []);

    if (!supported) return null;

    const speak = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const u = new SpeechSynthesisUtterance(word);
        u.lang = "en-US";
        u.rate = 0.9;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
    };

    return (
        <button
            onClick={speak}
            aria-label={`Pronounce ${word}`}
            className={`text-muted-foreground hover:text-accent transition-colors align-middle ${className}`}
        >
            <Volume2 size={size} />
        </button>
    );
}
