import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
    unlockedWords: string[]; // Legacy, kept for compatibility if needed, but masteredWords is preferred
    masteredWords: string[];
    xp: number;
    streak: number;
    gems: number;
    audioEnabled: boolean;

    unlockWord: (wordId: string) => void;
    addXp: (amount: number) => void;
    incrementStreak: () => void;
    addGems: (amount: number) => void;
    toggleAudio: () => void;
    resetProgress: () => void;
    checkStreak: () => void;
    unlockedLevels: string[];
    unlockLevel: (levelId: string) => void;
    unlockAll: () => void;
    setFromFirestore: (data: Partial<GameState>) => void;

    // The Grimoire (Word Forge)
    customWords: { id: string; word: string; definition: string; parts: string[] }[];
    addCustomWord: (word: string, definition: string, parts: string[]) => void;

    // Onboarding
    hasSeenOnboarding: boolean;
    completeOnboarding: () => void;

    // Freemium
    isPremium: boolean;
    setPremium: (status: boolean) => void;
    canUnlockWord: () => boolean;
}

export const useGameStore = create<GameState>()(
    persist(
        (set, get) => ({
            unlockedWords: [],
            masteredWords: [],
            unlockedLevels: [],
            xp: 0,
            streak: 0,
            gems: 0,
            audioEnabled: true,

            unlockLevel: (levelId) => set((state) => {
                if (!state.unlockedLevels.includes(levelId)) {
                    return { unlockedLevels: [...state.unlockedLevels, levelId] };
                }
                return {};
            }),

            customWords: [],
            addCustomWord: (word, definition, parts) => set((state) => ({
                customWords: [
                    ...state.customWords,
                    { id: Date.now().toString(), word, definition, parts }
                ]
            })),

            unlockAll: () => set({
                unlockedWords: [
                    "precept", "accept", "concept", "detain", "contain", "maintain",
                    "intermittent", "submit", "transmit", "offer", "transfer", "conifer",
                    "insist", "persist", "assist", "monograph", "autograph", "telegraph",
                    "epilogue", "dialogue", "logic", "aspect", "inspect", "spectacle",
                    "uncomplicated", "reply", "multiply", "nonextended", "extend", "attend",
                    "reproduction", "conduct", "introduce", "indisposed", "compose", "oppose",
                    "oversufficient", "fiction", "efficient", "mistranscribe", "subscribe"
                ]
            }),

            unlockWord: (wordId) => set((state) => {
                const updates: Partial<GameState> = {};
                if (!state.unlockedWords.includes(wordId)) {
                    updates.unlockedWords = [...state.unlockedWords, wordId];
                }
                if (!state.masteredWords.includes(wordId)) {
                    updates.masteredWords = [...state.masteredWords, wordId];
                }
                return updates;
            }),

            addXp: (amount) => set((state) => ({ xp: state.xp + amount })),

            incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),

            addGems: (amount) => set((state) => ({ gems: state.gems + amount })),

            toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),

            resetProgress: () => set({ unlockedWords: [], masteredWords: [], xp: 0, streak: 0, gems: 0 }),

            setFromFirestore: (data) => set((state) => ({ ...state, ...data })),

            checkStreak: () => set((state) => {
                const lastPlayed = localStorage.getItem('lastPlayed');
                const today = new Date().toDateString();

                if (lastPlayed === today) return {};

                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);

                if (lastPlayed === yesterday.toDateString()) {
                    return {};
                } else {
                    if (lastPlayed) {
                        return { streak: 0 };
                    }
                    return {};
                }
            }),

            hasSeenOnboarding: false,
            completeOnboarding: () => set({ hasSeenOnboarding: true }),

            isPremium: false,
            setPremium: (status) => set({ isPremium: status }),
            canUnlockWord: () => {
                const state = get();
                if (state.isPremium) return true;
                return state.unlockedWords.length < 25;
            },
        }),
        {
            name: 'etymology-quest-storage',
        }
    )
);
