export type LocalizedString = string | { en: string; ja: string };

export type BlockType = 'prefix' | 'root' | 'suffix';

export interface Block {
    id: string;
    label: string;
    meaning: LocalizedString;
    type: BlockType;
}

export interface WordBlock {
    id: string;
    label: string;
    meaning: LocalizedString;
    type: "root" | "prefix" | "suffix";
}

export interface BossChallenge {
    level: "Pre-2" | "2" | "Pre-1" | "1";
    word: string;
    question: LocalizedString;
    options: LocalizedString[];
    answer: string;
}

export interface TimelineEvent {
    year: string;
    language: string;
    word: string;
    meaning: LocalizedString;
    description: LocalizedString;
}

export interface Word {
    id: string;
    word: string;
    meaning: LocalizedString;
    history: LocalizedString;
    timeline?: TimelineEvent[]; // New rich history mapping
    blocks: WordBlock[];
    icon?: string; // Lucide icon name
    bossChallenges?: BossChallenge[];
}
