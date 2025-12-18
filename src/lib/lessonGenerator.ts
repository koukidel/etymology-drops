import { levels } from "@/data/levels";
import { wordBank } from "@/data/wordBank";
import { Word } from "@/data/types";

export type QuestionType = 'meaning_match' | 'construction' | 'root_id';

export interface Question {
    id: string;
    type: QuestionType;
    word: Word;
    options?: string[]; // For multiple choice
    correctAnswer?: string; // For checking
}

export const generateLesson = (levelId: string): Question[] => {
    let targetWords: Word[] = [];

    if (levelId === "random") {
        targetWords = wordBank;
    } else {
        const level = levels.find(l => l.id === levelId);
        console.log(`Generating lesson for ${levelId}`, level);
        if (!level) return [];

        // 1. Filter words matching the level's topics
        // If topic is "all", allow all words
        targetWords = wordBank.filter(word => {
            if (level.topics.includes("all")) return true;
            // Check if word contains any of the level's topics (roots/prefixes)
            const hasMatch = word.blocks.some(block => level.topics.includes(block.id));
            if (hasMatch) console.log(`Matched word: ${word.word}`);
            return hasMatch;
        });
        console.log(`Found ${targetWords.length} words for topic ${level.topics}`);
    }

    // 2. Select a subset of words (e.g., 5 random words)
    const selectedWords = targetWords.sort(() => 0.5 - Math.random()).slice(0, 5);

    // 3. Generate questions for these words
    // 3. Generate questions for these words
    const questions: Question[] = selectedWords.map((word, index) => {
        // Alternate between types or random
        const types: QuestionType[] = ['meaning_match', 'construction'];
        const type = types[index % types.length];

        let options: string[] = [];
        const wordMeaning = typeof word.meaning === 'string' ? word.meaning : word.meaning.en;

        if (type === 'meaning_match') {
            // Generate distractors
            const distractors = wordBank
                .filter(w => w.id !== word.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(w => typeof w.meaning === 'string' ? w.meaning : w.meaning.en);

            options = [...distractors, wordMeaning].sort(() => 0.5 - Math.random());
        }

        return {
            id: `q_${word.id}_${index}`,
            type,
            word,
            options,
            correctAnswer: wordMeaning // mainly for logic check
        };
    });

    return questions;
};
