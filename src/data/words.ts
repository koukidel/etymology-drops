import { familiarWords } from "./familiarWords";
import { builderWords } from "./builderWords";
import { inventionWords } from "./inventionWords";
import { expandedWords } from "./expandedWords";
import { Word } from "./types";

// Single word bank, in campaign order: familiar opener, word-building,
// invention compounds, then the Latin root families.
export const allWords: Word[] = [
    ...familiarWords,
    ...builderWords,
    ...inventionWords,
    ...expandedWords,
];
