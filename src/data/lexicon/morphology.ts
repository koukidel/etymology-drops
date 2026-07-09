// Morphological knowledge used by the word classifier (src/lib/classify.ts).
//
// The transparency judgment ("would a native parse this coinage and get a
// plausible meaning?") is grounded in derivational-morphology research:
//   • Plag, Word-Formation in English (2003) — derivational affixes impose
//     SELECTIONAL RESTRICTIONS: each suffix selects a base of a given
//     part-of-speech and yields a fixed output part-of-speech. A coinage that
//     honours those restrictions reads as well-formed; one that violates them
//     (e.g. a verb-forming suffix on an adjective base) reads as ill-formed.
//   • Baayen, morphological productivity (1992, 2009); Hay & Baayen (2002) —
//     the more real words a morpheme already yields, the more readily a novel
//     combination built on it is parsed and understood. We proxy productivity
//     by how many attested words in the app already use each root.
//   • White, Sowell & Yanagihara (1989) — a small set of affixes covers the
//     great majority of prefixed/suffixed English words; those high-coverage
//     affixes are exactly the transparent, recombinable ones below.

export type POS = "N" | "V" | "Adj" | "Adv";

// Derivational suffixes: the base part-of-speech they attach to, and the
// part-of-speech they produce. Keyed by the block `id` used in the word data.
// Suffixes not listed (obscure or non-productive: -acle, -cle, -ain, -antine,
// -asm, -edy, -ow, -ented) are treated as neutral — no selectional check.
export const SUFFIX_RULES: Record<string, { base: POS[]; out: POS }> = {
    able: { base: ["V"], out: "Adj" },
    ible: { base: ["V"], out: "Adj" },
    ive: { base: ["V"], out: "Adj" },
    ent: { base: ["V"], out: "Adj" },
    ient: { base: ["V"], out: "Adj" },
    al: { base: ["N"], out: "Adj" },
    ary: { base: ["N"], out: "Adj" },
    ic: { base: ["N"], out: "Adj" },
    ous: { base: ["N"], out: "Adj" },
    ful: { base: ["N"], out: "Adj" },
    ate: { base: ["N", "Adj"], out: "V" },
    ion: { base: ["V"], out: "N" },
    ation: { base: ["V"], out: "N" },
    ment: { base: ["V"], out: "N" },
    ure: { base: ["V"], out: "N" },
    iture: { base: ["V"], out: "N" },
    ance: { base: ["V", "Adj"], out: "N" },
    ancy: { base: ["V", "Adj"], out: "N" },
    ence: { base: ["V", "Adj"], out: "N" },
    er: { base: ["V"], out: "N" },
    ee: { base: ["V"], out: "N" },
};

// Roots that are also free-standing English words: native + affix combinations
// (unhappy, player, readable) are the most transparent of all, so a free root
// earns a transparency bonus. Everything else defaults to a bound classical
// root, POS 'V' (most Latin/Greek roots in the corpus are verbal).
export const NATIVE_ROOTS = new Set<string>([
    "happy", "good", "few", "play", "drink", "break", "move", "come", "turn",
    "view", "mind", "night", "way", "wind", "come", "count", "cover",
]);

// Part-of-speech of a root, where it differs from the default 'V'. Only the
// roots whose base POS matters for suffix selection are listed.
// Only concrete nominal roots are tagged N. Bound Latin/Greek verbal roots
// (port "carry", form "shape", ject "throw", …) default to V so that
// verb-selecting endings like -able and -ion attach transparently.
export const ROOT_POS: Record<string, POS> = {
    happy: "Adj", good: "Adj", few: "Adj",
    night: "N", way: "N", wind: "N", mare: "N", mus: "N", hippo: "N",
    potamus: "N", aster: "N", sal: "N", sarc: "N", pan: "N",
    cycle: "N", bet: "N", alpha: "N",
};

// Negating prefixes — two or more stacked is a contradiction, and reads as
// ill-formed rather than as a transparent coinage.
export const NEGATORS = new Set<string>(["un", "non", "in", "im", "ir", "dis"]);

export const rootPOS = (id: string): POS => ROOT_POS[id] ?? "V";
