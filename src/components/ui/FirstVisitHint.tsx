"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

// One sentence, shown once, on the first visit to a screen. Tooltips that
// arrive in a bundle get forgotten; one line in context sticks.
// Appears after mount (rAF) so prerendered pages hydrate cleanly.
export function FirstVisitHint({ id, text }: { id: string; text: string }) {
    const key = `minamoto_hint_${id}`;
    const [show, setShow] = useState(false);
    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            if (!localStorage.getItem(key)) setShow(true);
        });
        return () => cancelAnimationFrame(raf);
    }, [key]);
    if (!show) return null;
    const dismiss = () => {
        localStorage.setItem(key, "1");
        setShow(false);
    };
    return (
        <div className="flex items-start gap-2 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3 mb-6 text-sm text-foreground" role="note">
            <span className="flex-1">{text}</span>
            <button onClick={dismiss} aria-label="OK" className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                <X size={15} />
            </button>
        </div>
    );
}
