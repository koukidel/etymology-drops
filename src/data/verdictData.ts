export interface VerdictCase {
    id: string;
    sentence: string;
    errorWord: string; // The word as it appears incorrectly
    errorWordIndex: number; // For highlighting logic if needed, or we just string match
    correctRoot: string;
    distractorRoot: string;
    correctWord: string; // The Fixed word
    contextHint: string;
}

export const verdictCases: VerdictCase[] = [
    {
        id: "v1",
        sentence: "The politician was known for his circumscribed behavior.",
        errorWord: "circumscribed",
        errorWordIndex: 6,
        correctRoot: "spect",
        distractorRoot: "scrib",
        correctWord: "circumspect",
        contextHint: "The context implies caution (looking around), not being drawn/restricted."
    },
    {
        id: "v2",
        sentence: "She needed to transmit her luggage to the airport.",
        errorWord: "transmit",
        errorWordIndex: 4,
        correctRoot: "port",
        distractorRoot: "mit",
        correctWord: "transport",
        contextHint: "Luggage is physical items carried, not a signal sent."
    },
    {
        id: "v3",
        sentence: "Please predict the document to the manager.",
        errorWord: "predict",
        errorWordIndex: 1,
        correctRoot: "mit",
        distractorRoot: "dict",
        correctWord: "submit",
        contextHint: "You give documents to a boss, you don't foretell them."
    }
];
