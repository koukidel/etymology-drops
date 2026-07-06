import { familiarWords } from "./familiarWords";
import { expandedWords } from "./expandedWords";
import { Word } from "./types";

// Single word bank: the familiar-words opener followed by the root families.
export const allWords: Word[] = [...familiarWords, ...expandedWords];
