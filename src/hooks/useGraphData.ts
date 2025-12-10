import { useMemo } from 'react';
import { wordBank } from '@/data/wordBank';
import { Word } from '@/data/types';

export interface GraphNode {
    id: string;
    label: string;
    type: 'root' | 'word';
    data?: Word;
    x?: number; // For manual layout or sim caching
    y?: number;
}

export interface GraphLink {
    source: string;
    target: string;
}

export const useGraphData = () => {
    return useMemo(() => {
        const nodes: GraphNode[] = [];
        const links: GraphLink[] = [];
        const registeredIds = new Set<string>();

        // 1. Identify all unique roots from the wordBank
        // We'll iterate through all words and their blocks.
        wordBank.forEach(word => {
            // Add the WORD node
            if (!registeredIds.has(word.id)) {
                nodes.push({
                    id: word.id,
                    label: word.word,
                    type: 'word',
                    data: word
                });
                registeredIds.add(word.id);
            }

            // Find blocks that are roots
            word.blocks.forEach(block => {
                if (block.type === 'root') {
                    // Add ROOT node if not exists
                    if (!registeredIds.has(block.id)) {
                        nodes.push({
                            id: block.id,
                            label: block.label, // e.g. "Spect"
                            type: 'root'
                        });
                        registeredIds.add(block.id);
                    }

                    // Link ROOT -> WORD
                    // Check if link already exists? No, source/target is unique pair usually
                    links.push({
                        source: block.id,
                        target: word.id
                    });
                }
            });
        });

        return { nodes, links };
    }, []);
};
