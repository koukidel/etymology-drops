import { Word } from "@/data/types";
import { allWords } from "@/data/words";
import { MasteryEntry, SrsEntry } from "@/store/useGameStore";

// Deterministic small hash (djb2) so the daily picks are stable within a day
// but rotate across days.
export const dayHash = (s: string): number => {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return h;
};

/**
 * Words to review today. Spaced-repetition first: words whose SRS due date
 * has arrived, most overdue first. Remaining slots fill with a deterministic
 * daily rotation over everything mastered on an earlier day, so the review
 * never sits empty while material exists.
 */
export function pickReviewWords(
    masteryLog: MasteryEntry[],
    masteredWords: string[],
    todayIso: string,
    n = 3,
    srs: Record<string, SrsEntry> = {},
): Word[] {
    const eligibleIds = [...new Set(
        masteryLog
            .filter(e => (e.date === null || e.date < todayIso) && masteredWords.includes(e.id))
            .map(e => e.id),
    )];

    const due = eligibleIds
        .filter(id => srs[id] && srs[id].due <= todayIso)
        .sort((a, b) => srs[a].due.localeCompare(srs[b].due) || dayHash(a + todayIso) - dayHash(b + todayIso));
    const rest = eligibleIds
        .filter(id => !due.includes(id))
        .sort((a, b) => dayHash(a + todayIso) - dayHash(b + todayIso));

    return [...due, ...rest]
        .slice(0, n)
        .map(id => allWords.find(w => w.id === id))
        .filter((w): w is Word => Boolean(w));
}
