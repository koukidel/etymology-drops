import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { localDate, localYesterday } from '@/lib/date';

export interface MasteryEntry {
    id: string;
    date: string | null; // ISO date (YYYY-MM-DD); null for progress migrated from before logging
}

/** Spaced-repetition state for one mastered word. */
export interface SrsEntry {
    interval: number; // days until the next review after a correct answer
    due: string;      // ISO date (local) the word is next due
}

export type LearnerLevel = 'beginner' | 'intermediate' | 'advanced';

export interface OnboardingProfile {
    goal: string;         // why they're learning (exam / work / culture / travel)
    commitment: string;   // how much they want to do (light / steady / serious)
    selfLevel: LearnerLevel;
}

interface GameState {
    unlockedWords: string[];
    masteredWords: string[];
    masteryLog: MasteryEntry[];

    streak: number;
    lastActiveDate: string | null; // ISO date (YYYY-MM-DD) of last completed lesson

    hasCompletedIntake: boolean;   // finished the first-run intake (goal/commitment/level)
    profile: OnboardingProfile | null;
    hasSeenOnboarding: boolean;    // has played Lesson 0 (the 鳴→breakfast walkthrough)
    hasSeenTutorial: boolean;      // has taken the guided tour of the app's sections
    lastReviewDate: string | null; // ISO date the daily review was last completed
    srs: Record<string, SrsEntry>; // spaced repetition per mastered word
    missedParts: Record<string, number>; // quiz misses per part id (weak-part detection)

    unlockWord: (wordId: string) => void;
    masterWord: (wordId: string) => void;
    recordLessonComplete: () => void;
    completeIntake: (profile: OnboardingProfile | null) => void;
    completeOnboarding: () => void;
    completeTutorial: () => void;
    completeReview: () => void;
    /** SRS update after a review answer: wrong → due tomorrow, right → interval doubles. */
    recordReviewResult: (wordId: string, correct: boolean) => void;
    recordMiss: (partIds: string[]) => void;
    resetProgress: () => void;
}

const addDays = (iso: string, days: number): string => {
    const [y, m, d] = iso.split('-').map(Number);
    const dt = new Date(y, m - 1, d + days);
    return localDate(dt);
};

/** Streak counts only if the last lesson was today or yesterday (local time). */
export const currentStreak = (streak: number, lastActiveDate: string | null): number => {
    if (!lastActiveDate) return 0;
    return lastActiveDate === localDate() || lastActiveDate === localYesterday()
        ? streak
        : 0;
};

export const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            unlockedWords: [],
            masteredWords: [],
            masteryLog: [],
            streak: 0,
            lastActiveDate: null,
            hasCompletedIntake: false,
            profile: null,
            hasSeenOnboarding: false,
            hasSeenTutorial: false,
            lastReviewDate: null,
            srs: {},
            missedParts: {},

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
                    updates.masteryLog = [...state.masteryLog, { id: wordId, date: localDate() }];
                    // First review comes tomorrow.
                    updates.srs = { ...state.srs, [wordId]: { interval: 1, due: addDays(localDate(), 1) } };
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

                if (state.lastActiveDate === localDate(today)) return {};
                return {
                    streak: state.lastActiveDate === localDate(yesterday) ? state.streak + 1 : 1,
                    lastActiveDate: localDate(today),
                };
            }),

            completeIntake: (profile) => set({ profile, hasCompletedIntake: true }),

            completeOnboarding: () => set({ hasSeenOnboarding: true }),

            completeTutorial: () => set({ hasSeenTutorial: true }),

            completeReview: () => set({ lastReviewDate: localDate() }),

            recordReviewResult: (wordId, correct) => set((state) => {
                const prev = state.srs[wordId] ?? { interval: 1, due: localDate() };
                const interval = correct ? Math.min(prev.interval * 2, 60) : 1;
                return { srs: { ...state.srs, [wordId]: { interval, due: addDays(localDate(), interval) } } };
            }),

            recordMiss: (partIds) => set((state) => {
                const next = { ...state.missedParts };
                for (const id of partIds) next[id] = (next[id] ?? 0) + 1;
                return { missedParts: next };
            }),

            resetProgress: () => set({
                unlockedWords: [],
                masteredWords: [],
                masteryLog: [],
                streak: 0,
                lastActiveDate: null,
                lastReviewDate: null,
                srs: {},
                missedParts: {},
            }),
        }),
        {
            name: 'etymology-quest-storage',
            version: 6,
            migrate: (persisted, version) => {
                const old = (persisted ?? {}) as Record<string, unknown>;

                // v0 stored gems, xp, inventory, paywall flags, etc. — keep only what survives.
                let state = version >= 1
                    ? {
                        unlockedWords: Array.isArray(old.unlockedWords) ? old.unlockedWords as string[] : [],
                        masteredWords: Array.isArray(old.masteredWords) ? old.masteredWords as string[] : [],
                        masteryLog: Array.isArray(old.masteryLog) ? old.masteryLog as MasteryEntry[] : [],
                        streak: typeof old.streak === 'number' ? old.streak : 0,
                        lastActiveDate: typeof old.lastActiveDate === 'string' ? old.lastActiveDate : null,
                        hasSeenOnboarding: old.hasSeenOnboarding === true,
                    }
                    : {
                        unlockedWords: Array.isArray(old.unlockedWords) ? old.unlockedWords as string[] : [],
                        masteredWords: Array.isArray(old.masteredWords) ? old.masteredWords as string[] : [],
                        masteryLog: [] as MasteryEntry[],
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

                // v3: introduce the mastery log. Seed it from any mastered words we
                // don't yet have a dated entry for (undated = learned "earlier").
                const logged = new Set(state.masteryLog.map(e => e.id));
                const seeded: MasteryEntry[] = [
                    ...state.masteryLog,
                    ...state.masteredWords.filter(id => !logged.has(id)).map(id => ({ id, date: null })),
                ];
                state = { ...state, masteryLog: seeded };

                // v4: onboarding intake profile. Users who already saw the old
                // forced onboarding skip the intake; brand-new users see it.
                const withIntake = {
                    ...state,
                    profile: (old.profile as OnboardingProfile) ?? null,
                    hasCompletedIntake: typeof old.hasCompletedIntake === 'boolean'
                        ? old.hasCompletedIntake
                        : state.hasSeenOnboarding,
                };

                // v5: the guided section tour. Everyone gets it offered once
                // (dismissible band on the home), so default false unless set.
                // v5: the guided section tour flag.
                const withTutorial = { ...withIntake, hasSeenTutorial: old.hasSeenTutorial === true };

                // v6: spaced repetition + weak-part tracking. Seed the SRS queue
                // from the mastery log (everything already learned is due now).
                const srs: Record<string, SrsEntry> = (old.srs as Record<string, SrsEntry>) ?? {};
                for (const e of withTutorial.masteryLog) {
                    if (!srs[e.id]) srs[e.id] = { interval: 1, due: localDate() };
                }
                return {
                    ...withTutorial,
                    lastReviewDate: typeof old.lastReviewDate === 'string' ? old.lastReviewDate : null,
                    srs,
                    missedParts: (old.missedParts as Record<string, number>) ?? {},
                };
            },
        }
    )
);
