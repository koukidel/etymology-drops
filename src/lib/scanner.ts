export interface ScanResult {
    original: string;
    stats: {
        totalWords: number;
        rootMatches: number;
        coverage: number; // percentage
    };
    elements: { text: string; isMatch: boolean; root?: string }[];
}

const ROOT_PATTERNS: Record<string, RegExp> = {
    // 1. CEPT (Take) - accept, concept, precept, deceive (ceiv/cept)
    cept: /\b(ac|con|de|ex|in|inter|per|pre|re|sus)cept[a-z]*\b/i,

    // 2. TAIN (Hold) - detain, contain, maintain
    tain: /\b(abs|at|con|de|enter|main|obs|re|sus)tain[a-z]*\b/i,

    // 3. MIT (Send) - transmit, submit
    mit: /\b(ad|com|e|inter|o|per|re|sub|trans)mit[a-z]*\b|mission/i,

    // 4. FER (Carry) - transfer, offer, confer
    fer: /\b(con|de|dif|in|of|pre|pro|re|suf|trans)fer[a-z]*\b/i,

    // 5. SIST (Stand) - insist, persist
    sist: /\b(as|con|de|ex|in|per|re|sub)sist[a-z]*\b/i,

    // 6. GRAPH (Write) - monograph, telegraph
    graph: /\b[a-z]*(graph)[a-z]*\b/i, // Suffix style usually

    // 7. LOG (Word) - dialogue, logic
    log: /\b(dia|epi|pro|mono)log[a-z]*\b|logic/i,

    // 8. SPECT (Look) - inspect, aspect
    spect: /\b(a|circum|ex|in|pro|re|su)spect[a-z]*\b/i,

    // 9. PLY (Fold) - reply, multiply, complicate (plic/ply)
    ply: /\b(ap|com|im|multi|re|sup)ply[a-z]*\b|plic/i,

    // 10. TEND (Stretch) - extend, attend
    tend: /\b(at|con|dis|ex|in|pre|super)tend[a-z]*\b|tens/i,

    // 11. DUCT (Lead) - conduct, product
    duct: /\b(ab|con|de|in|pro|re)duct[a-z]*\b|duce/i,

    // 12. POSE (Put) - compose, expose
    pose: /\b(com|de|dis|ex|im|op|pro|pur|sup|trans)pose[a-z]*\b|position/i,

    // 13. FIC (Make) - efficient, factory (fic/fac)
    fic: /\b[a-z]*fic(ient|e)?\b|fact/i,

    // 14. SCRIBE (Write) - describe, script
    scribe: /\b(de|in|pre|pro|sub|trans)scribe[a-z]*\b|script/i
};

export const scanText = (text: string): ScanResult => {
    // Split by non-word chars but keep delimiters for reconstruction
    // Actually simpler: split by whitespace and map
    const words = text.split(/(\s+)/);

    const elements = words.map(word => {
        // Clean word for checking
        const clean = word.replace(/[^a-zA-Z]/g, "");
        if (!clean) return { text: word, isMatch: false };

        // Check against patterns
        let matchRoot: string | undefined;
        for (const [root, regex] of Object.entries(ROOT_PATTERNS)) {
            if (regex.test(clean)) {
                matchRoot = root;
                break;
            }
        }

        return {
            text: word,
            isMatch: !!matchRoot,
            root: matchRoot
        };
    });

    const totalWords = elements.filter(e => e.text.trim().length > 0).length;
    const rootMatches = elements.filter(e => e.isMatch).length;

    return {
        original: text,
        stats: {
            totalWords,
            rootMatches,
            coverage: totalWords > 0 ? Math.round((rootMatches / totalWords) * 100) : 0
        },
        elements
    };
};
