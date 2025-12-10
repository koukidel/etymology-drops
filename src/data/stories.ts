export interface Story {
    id: string;
    title: string;
    content: string; // Plain text for now, or we can use a structured format
    interactiveWords: {
        word: string; // The word as it appears in text (e.g. "transported")
        wordId: string; // ID in wordBank
        startIndex: number; // For highlighting logic if we parse manually, or we can just search/replace
    }[];
}

export const stories: Story[] = [
    {
        id: "story-1",
        title: "The Great Delivery",
        content: "In the year 3050, the first interstellar transport arrived at Mars. The crew had to inspect every inch of the hull before landing. They could predict that the atmosphere would be harsh, but they were ready to construct a new home.",
        interactiveWords: [
            { word: "transport", wordId: "transport", startIndex: 35 },
            { word: "inspect", wordId: "inspect", startIndex: 72 },
            { word: "predict", wordId: "predict", startIndex: 110 },
            { word: "construct", wordId: "construct", startIndex: 165 }
        ]
    }
];
