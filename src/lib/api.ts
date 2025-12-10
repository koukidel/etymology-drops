import { expandedWords } from '@/data/expandedWords';
import { Word } from '@/data/types';

export async function getWords(): Promise<Word[]> {
    // Return expandedWords for the full 14-root set
    return expandedWords;
}
