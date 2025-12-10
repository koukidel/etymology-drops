import { expandedWords } from "@/data/expandedWords";
import { Word } from "@/data/types";

export interface LogicOption {
    id: string;
    text: string;
    isCorrect?: boolean;
}

export interface Question {
    id: string;
    type: 'root_id' | 'meaning' | 'synthesis';
    text: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    logicCheck: {
        question: string;
        options: LogicOption[];
    };
}

export function generateExam(questionCount: number = 10): Question[] {
    const questions: Question[] = [];
    const pool = [...expandedWords].sort(() => 0.5 - Math.random());
    const selectedWords = pool.slice(0, questionCount);

    selectedWords.forEach((word, index) => {
        const typeRoll = Math.random();
        let q: Question;

        // Generate Logic Options first (shared across types for now, or specific?)
        // The user wants "Trace the roots" for the correct answer.
        const logicCheck = generateLogicOptions(word, expandedWords);

        if (typeRoll < 0.4) {
            // 1. Root Identification
            const root = word.blocks.find(b => b.type === 'root');
            q = {
                id: `q_${index}`,
                type: 'root_id',
                text: `What is the specific ROOT of the word "${word.word}"?`,
                options: generateDistractors(root?.label || "", expandedWords.map(w => w.blocks.find(b => b.type === 'root')?.label || "").filter(Boolean)),
                correctAnswer: root?.label || "",
                explanation: `${word.word} comes from ${root?.label} (${root?.meaning}).`,
                logicCheck
            };
        } else if (typeRoll < 0.7) {
            // 2. Meaning Match
            q = {
                id: `q_${index}`,
                type: 'meaning',
                text: `Which word means: "${word.meaning}"?`,
                options: generateDistractors(word.word, expandedWords.map(w => w.word)),
                correctAnswer: word.word,
                explanation: `Correct. ${word.word} means "${word.meaning}".`,
                logicCheck
            };
        } else {
            // 3. Synthesis (Prefix + Root)
            const prefix = word.blocks.find(b => b.type === 'prefix');
            const root = word.blocks.find(b => b.type === 'root');
            q = {
                id: `q_${index}`,
                type: 'synthesis',
                text: `Which word is formed by ${prefix?.label} (${prefix?.meaning}) + ${root?.label} (${root?.meaning})?`,
                options: generateDistractors(word.word, expandedWords.map(w => w.word)),
                correctAnswer: word.word,
                explanation: `${prefix?.label} + ${root?.label} = ${word.word}`,
                logicCheck
            };
        }
        questions.push(q);
    });

    return questions;
}

function generateLogicOptions(correctWord: Word, allWords: Word[]): { question: string, options: LogicOption[] } {
    const blocks = correctWord.blocks;

    // 1. Correct Logic
    // e.g., "Pre (Before) + Cept (Take)"
    const correctText = blocks.map(b => `${b.label} (${b.meaning})`).join(" + ");

    // 2. Distractor A: Correct Labels, Wrong Meanings
    // e.g., "Pre (After) + Cept (Give)"
    const distractorRef = allWords.filter(w => w.id !== correctWord.id).sort(() => 0.5 - Math.random())[0];
    const badMeanings = blocks.map(b => {
        // Try to find a random meaning from another block type, or just random words
        // Simple hack: reverse meaning? or just grab random meanings?
        const randomBlock = distractorRef?.blocks[Math.floor(Math.random() * distractorRef.blocks.length)];
        return `${b.label} (${randomBlock?.meaning || "Unknown"})`;
    }).join(" + ");

    // 3. Distractor B: Completely Wrong Roots
    // e.g., "Con (Together) + Spect (Look)" (if word is Precept)
    const randomWord = allWords.filter(w => w.id !== correctWord.id).sort(() => 0.5 - Math.random())[0];
    const badRoots = randomWord.blocks.map(b => `${b.label} (${b.meaning})`).join(" + ");

    const options: LogicOption[] = [
        { id: "correct", text: correctText, isCorrect: true },
        { id: "wrong_meaning", text: badMeanings },
        { id: "wrong_roots", text: badRoots }
    ];

    return {
        question: "Trace the logic:",
        options: options.sort(() => 0.5 - Math.random())
    };
}

function generateDistractors(correct: string, pool: string[]): string[] {
    const uniquePool = Array.from(new Set(pool)).filter(w => w !== correct);
    const shuffled = uniquePool.sort(() => 0.5 - Math.random());
    const distractors = shuffled.slice(0, 3);
    return [...distractors, correct].sort(() => 0.5 - Math.random());
}
