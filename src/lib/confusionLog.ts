"use client";

import { useEffect } from "react";

// Local-only 戸惑いログ: during the first-run flow, record screens where the
// user went 10+ seconds without touching anything. No network — the data
// stays in localStorage so real confusion points can be found later.
const KEY = "minamoto_confusion_log";
const IDLE_MS = 10_000;
const CAP = 50;

export interface ConfusionEntry {
    screen: string;
    at: string; // ISO timestamp
}

export function readConfusionLog(): ConfusionEntry[] {
    try {
        const raw = localStorage.getItem(KEY);
        return raw ? (JSON.parse(raw) as ConfusionEntry[]) : [];
    } catch {
        return [];
    }
}

function append(screen: string) {
    try {
        const log = readConfusionLog();
        log.push({ screen, at: new Date().toISOString() });
        localStorage.setItem(KEY, JSON.stringify(log.slice(-CAP)));
    } catch {
        // storage full or unavailable — logging is best-effort only
    }
}

/** Arms a one-shot idle timer for the given screen while `enabled`. */
export function useConfusionLog(screen: string, enabled: boolean = true) {
    useEffect(() => {
        if (!enabled) return;
        let fired = false;
        let timer = setTimeout(() => { fired = true; append(screen); }, IDLE_MS);
        const reset = () => {
            if (fired) return;
            clearTimeout(timer);
            timer = setTimeout(() => { fired = true; append(screen); }, IDLE_MS);
        };
        window.addEventListener("pointerdown", reset);
        window.addEventListener("keydown", reset);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("pointerdown", reset);
            window.removeEventListener("keydown", reset);
        };
    }, [screen, enabled]);
}
