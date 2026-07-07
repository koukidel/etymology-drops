import { familiarWords } from "./familiarWords";
import { familiarWordsExtra } from "./familiarWordsExtra";
import { builderWords } from "./builderWords";
import { inventionWords } from "./inventionWords";
import { toeicWords } from "./toeicWords";
import { eikenWords } from "./eikenWords";
import { expandedWords } from "./expandedWords";
import { Word } from "./types";

// Single word bank: every lesson word across all courses.
export const allWords: Word[] = [
    ...familiarWords,
    ...familiarWordsExtra,
    ...builderWords,
    ...inventionWords,
    ...expandedWords,
    ...toeicWords,
    ...eikenWords,
];
