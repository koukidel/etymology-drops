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
    showPaywall: boolean;
    paywallTrigger: 'word_limit' | 'locked_root' | 'manual' | null;

    setPremium: (status: boolean) => void;
    setShowPaywall: (show: boolean, trigger?: 'word_limit' | 'locked_root' | 'manual') => void;
    checkPaywallTrigger: () => boolean;

    // Gamification & Social
    achievements: import('@/data/types').Achievement[];
    unlockAchievement: (id: string) => void;

    notifications: import('@/data/types').Notification[];
    addNotification: (notification: Omit<import('@/data/types').Notification, 'id'>) => void;
    removeNotification: (id: string) => void;

    lastRewardDate: string | null;
    claimDailyReward: () => void;

    referralCode: string | null;
    referralsCount: number;
    generateReferralCode: () => void;

    // Gacha & Inventory
    inventory: {
        shields: number;
        customParts: string[];
        stories: string[];
    };
    spendGems: (amount: number) => boolean;
    addItem: (type: 'shield' | 'part' | 'story', id?: string) => void;
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
            showPaywall: false,
            paywallTrigger: null,

            setPremium: (status) => set({ isPremium: status }),
            setShowPaywall: (show, trigger) => set({ showPaywall: show, paywallTrigger: trigger || null }),

            checkPaywallTrigger: () => {
                const state = get();
                if (state.isPremium) return false;

                if (state.unlockedWords.length >= 25) {
                    set({ showPaywall: true, paywallTrigger: 'word_limit' });
                    return true;
                }
                return false;
            },

            // Gamification Implementation
            achievements: [],
            unlockAchievement: (id) => set((state) => {
                if (state.achievements.find(a => a.id === id)) return {};
                // In a real app, we'd look up achievement details from a static list
                const newAchievement = {
                    id,
                    title: "Achievement Unlocked",
                    description: "You did something cool!",
                    icon: "🏆",
                    unlockedAt: new Date().toISOString()
                };
                return {
                    achievements: [...state.achievements, newAchievement],
                    notifications: [...state.notifications, {
                        id: Date.now().toString(),
                        title: "Achievement Unlocked!",
                        message: newAchievement.description,
                        type: 'achievement',
                        icon: newAchievement.icon
                    }]
                };
            }),

            notifications: [],
            addNotification: (notification) => set((state) => ({
                notifications: [...state.notifications, { ...notification, id: Date.now().toString() }]
            })),
            removeNotification: (id) => set((state) => ({
                notifications: state.notifications.filter(n => n.id !== id)
            })),

            lastRewardDate: null,
            claimDailyReward: () => set((state) => {
                const today = new Date().toDateString();
                if (state.lastRewardDate === today) return {};
                return {
                    lastRewardDate: today,
                    gems: state.gems + 50 + (state.streak * 10), // Simple reward logic
                    xp: state.xp + 100
                };
            }),

            referralCode: null,
            referralsCount: 0,
            generateReferralCode: () => set((state) => {
                if (state.referralCode) return {};
                return { referralCode: `ETYMO-${Math.random().toString(36).substring(2, 8).toUpperCase()}` };
            }),

            inventory: { shields: 0, customParts: [], stories: [] },

            spendGems: (amount) => {
                const state = get();
                if (state.gems >= amount) {
                    set({ gems: state.gems - amount });
                    return true;
                }
                return false;
            },

            addItem: (type, id) => set((state) => {
                const newInventory = { ...state.inventory };
                if (type === 'shield') {
                    newInventory.shields += 1;
                } else if (type === 'part' && id) {
                    if (!newInventory.customParts.includes(id)) {
                        newInventory.customParts.push(id);
                    }
                } else if (type === 'story' && id) {
                    if (!newInventory.stories.includes(id)) {
                        newInventory.stories.push(id);
                    }
                }
                return { inventory: newInventory };
            }),
        }),
        {
            name: 'etymology-quest-storage',
        }
    )
);
