import { Word } from "@/data/types";
import { allWords } from "@/data/words";
import { MasteryEntry } from "@/store/useGameStore";

// Deterministic small hash (djb2) so the daily picks are stable within a day
// but rotate across days.
export const dayHash = (s: string): number => {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return h;
};

/**
 * Words to review today: mastered on an earlier day (or migrated undated),
 * rotated deterministically by date so every day surfaces a different trio.
 */
export function pickReviewWords(
    masteryLog: MasteryEntry[],
    masteredWords: string[],
    todayIso: string,
    n = 3,
): Word[] {
    const eligibleIds = masteryLog
        .filter(e => (e.date === null || e.date < todayIso) && masteredWords.includes(e.id))
        .map(e => e.id);
    const unique = [...new Set(eligibleIds)];
    return unique
        .map(id => allWords.find(w => w.id === id))
        .filter((w): w is Word => Boolean(w))
        .sort((a, b) => dayHash(a.id + todayIso) - dayHash(b.id + todayIso))
        .slice(0, n);
}
