import { familiarWords } from "./familiarWords";
import { familiarWordsExtra } from "./familiarWordsExtra";
import { katakanaWords } from "./katakanaWords";
import { builderWords } from "./builderWords";
import { inventionWords } from "./inventionWords";
import { eikenPre2Words } from "./eikenPre2Words";
import { eiken2Words } from "./eiken2Words";
import { toeicWords } from "./toeicWords";
import { toeic600Extra } from "./toeic600Extra";
import { toeic800Words } from "./toeic800Words";
import { eikenWords } from "./eikenWords";
import { eikenPre1Words } from "./eikenPre1Words";
import { expandedWords } from "./expandedWords";
import { Word } from "./types";

// Single word bank: every lesson word across all courses.
export const allWords: Word[] = [
    ...familiarWords,
    ...familiarWordsExtra,
    ...katakanaWords,
    ...builderWords,
    ...inventionWords,
    ...expandedWords,
    ...eikenPre2Words,
    ...eiken2Words,
    ...toeicWords,
    ...toeic600Extra,
    ...toeic800Words,
    ...eikenPre1Words,
    ...eikenWords,
];
