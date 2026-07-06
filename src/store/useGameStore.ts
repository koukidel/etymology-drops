import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
    unlockedWords: string[];
    masteredWords: string[];

    streak: number;
    lastActiveDate: string | null; // ISO date (YYYY-MM-DD) of last completed lesson

    hasSeenOnboarding: boolean;

    unlockWord: (wordId: string) => void;
    masterWord: (wordId: string) => void;
    recordLessonComplete: () => void;
    completeOnboarding: () => void;
    resetProgress: () => void;
}

const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** Streak counts only if the last lesson was today or yesterday. */
export const currentStreak = (streak: number, lastActiveDate: string | null): number => {
    if (!lastActiveDate) return 0;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return lastActiveDate === isoDate(today) || lastActiveDate === isoDate(yesterday)
        ? streak
        : 0;
};

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            unlockedWords: [],
            masteredWords: [],
            streak: 0,
            lastActiveDate: null,
            hasSeenOnboarding: false,

            unlockWord: (wordId) => set((state) => {
                if (!state.unlockedWords.includes(wordId)) {
                    return { unlockedWords: [...state.unlockedWords, wordId] };
                }
                return {};
            }),

            masterWord: (wordId) => set((state) => {
                const updates: Partial<GameState> = {};
                if (!state.masteredWords.includes(wordId)) {
                    updates.masteredWords = [...state.masteredWords, wordId];
                }
                if (!state.unlockedWords.includes(wordId)) {
                    updates.unlockedWords = [...state.unlockedWords, wordId];
                }
                return updates;
            }),

            recordLessonComplete: () => set((state) => {
                const today = new Date();
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);

                if (state.lastActiveDate === isoDate(today)) return {};
                return {
                    streak: state.lastActiveDate === isoDate(yesterday) ? state.streak + 1 : 1,
                    lastActiveDate: isoDate(today),
                };
            }),

            completeOnboarding: () => set({ hasSeenOnboarding: true }),

            resetProgress: () => set({
                unlockedWords: [],
                masteredWords: [],
                streak: 0,
                lastActiveDate: null,
            }),
        }),
        {
            name: 'etymology-quest-storage',
            version: 2,
            migrate: (persisted, version) => {
                const old = (persisted ?? {}) as Record<string, unknown>;

                // v0 stored gems, xp, inventory, paywall flags, etc. — keep only what survives.
                let state = version >= 1
                    ? {
                        unlockedWords: Array.isArray(old.unlockedWords) ? old.unlockedWords as string[] : [],
                        masteredWords: Array.isArray(old.masteredWords) ? old.masteredWords as string[] : [],
                        streak: typeof old.streak === 'number' ? old.streak : 0,
                        lastActiveDate: typeof old.lastActiveDate === 'string' ? old.lastActiveDate : null,
                        hasSeenOnboarding: old.hasSeenOnboarding === true,
                    }
                    : {
                        unlockedWords: Array.isArray(old.unlockedWords) ? old.unlockedWords as string[] : [],
                        masteredWords: Array.isArray(old.masteredWords) ? old.masteredWords as string[] : [],
                        streak: 0,
                        lastActiveDate: null,
                        hasSeenOnboarding: old.hasSeenOnboarding === true,
                    };

                // v2: the Latin campaign now leads with familiar words. Carry progress
                // earned on the old hero lessons over to the new lead lessons
                // (keeping the old ids — those words stay learned).
                const HERO_TO_LEAD: Record<string, string> = {
                    precept: 'accept', detain: 'contain', intermittent: 'submit',
                    offer: 'offer', insist: 'assist', monograph: 'autograph',
                    epilogue: 'logic', aspect: 'inspect', uncomplicated: 'reply',
                    nonextended: 'extend', reproduction: 'conduct', indisposed: 'compose',
                    oversufficient: 'fiction', mistranscribe: 'subscribe',
                };
                const carryOver = (ids: string[]) => {
                    const out = [...ids];
                    for (const id of ids) {
                        const lead = HERO_TO_LEAD[id];
                        if (lead && !out.includes(lead)) out.push(lead);
                    }
                    return out;
                };
                state = {
                    ...state,
                    unlockedWords: carryOver(state.unlockedWords),
                    masteredWords: carryOver(state.masteredWords),
                };
                return state;
            },
        }
    )
);
