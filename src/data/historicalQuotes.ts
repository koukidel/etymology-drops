export interface HistoricalQuote {
    rootId: string;
    source: string;
    quote: string;
    derivedWord: string;
    connection: string;
    year: string;
}

export const historicalQuotes: HistoricalQuote[] = [
    {
        rootId: "dict",
        source: "Patrick Henry",
        year: "1775",
        quote: "I know not what course others may take, but as for me, give me liberty or give me death!",
        derivedWord: "Prediction",
        connection: "Henry 'spoke before' (Pre-Dicted) the revolution with this speech."
        // Note: bit of a reach but matches prompt example logic roughly. 
        // Better: "Edict" (Official order). But let's stick to prompt spirit.
    },
    {
        rootId: "spect",
        source: "William Shakespeare (Hamlet)",
        year: "1603",
        quote: "The glass of fashion and the mould of form, The observed of all observers.",
        derivedWord: "Spectator",
        connection: "To be a 'Spectator' is to look (Spect) at the stage."
    },
    {
        rootId: "struct",
        source: "Abraham Lincoln (Gettysburg Address)",
        year: "1863",
        quote: "Four score and seven years ago our fathers brought forth on this continent, a new nation...",
        derivedWord: "Construct",
        connection: "Lincoln sought to re-construct a nation torn apart."
    }
];
