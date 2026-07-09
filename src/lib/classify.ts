// The 4-way word classifier.
//
// A user assembles a word from morpheme parts (prefix/root/suffix). We place
// the result in one of four categories, along two axes:
//   • Attested?  — is it a real English word (in the frequency lexicon or the
//     app's own taught vocabulary)?
//   • If attested, common or rare? — by frequency rank.
//   • If not attested, transparent? — would a native parse it and get a
//     plausible meaning? — by an Etymological Transparency Score (ETS).
//
//   1 = attested & common      (real, everyday)
//   2 = not attested & transparent   (a coinage a native would understand)
//   3 = attested & rare        (real, seldom used)
//   4 = not attested & opaque  (not a word, and not transparently meaningful)
//
// See src/data/lexicon/morphology.ts for the research behind the ETS.

import { WordBlock, LocalizedString } from "@/data/types";
import { allWords } from "@/data/words";
import { DERIVATIVES } from "@/data/derivatives";
import { SUFFIX_RULES, NATIVE_ROOTS, NEGATORS, rootPOS, POS } from "@/data/lexicon/morphology";

export type Category = 1 | 2 | 3 | 4;

// Rank of a word in the frequency lexicon (0 = most frequent), or undefined if
// absent. Supplied by the caller: the UI loads /lexicon/words.txt; tests read
// it from disk.
export interface Lexicon {
    rank(word: string): number | undefined;
}

export interface Reason {
    en: string;
    ja: string;
}

export interface Classification {
    word: string;
    category: Category;
    attested: boolean;
    tier?: "common" | "rare";
    /** 0..1 transparency score, present only for non-attested words. */
    transparency?: number;
    /** Meaning if the word is one the app teaches. */
    meaning?: LocalizedString;
    reasons: Reason[];
}

// Words a native uses everyday sit near the top of the web-frequency list.
// Calibrated against the corpus (player ~860, breakfast ~2200, unhappy ~14500,
// discrepancy ~21600): everyday vocabulary is comfortably within the top 20k.
const COMMON_RANK = 20000;

// Words the app itself teaches are real by construction — always attested, so
// a taught word never misclassifies even if it is too rare for the lexicon.
const APP_WORDS: Map<string, LocalizedString> = (() => {
    const m = new Map<string, LocalizedString>();
    for (const w of allWords) m.set(w.word.toLowerCase(), w.meaning);
    for (const list of Object.values(DERIVATIVES)) {
        for (const d of list) if (!m.has(d.word.toLowerCase())) m.set(d.word.toLowerCase(), d.gloss);
    }
    return m;
})();

// Productivity proxy: how many attested words already build on each root id.
// More real derivatives → a novel combination on that root parses more easily.
const ROOT_USES: Map<string, number> = (() => {
    const m = new Map<string, number>();
    for (const w of allWords) {
        for (const b of w.blocks) m.set(b.id, (m.get(b.id) ?? 0) + 1);
    }
    for (const [id, list] of Object.entries(DERIVATIVES)) {
        m.set(id, (m.get(id) ?? 0) + list.length);
    }
    return m;
})();
const MAX_USES = Math.max(1, ...ROOT_USES.values());

const assemble = (parts: WordBlock[]) =>
    parts.map(p => p.label.replace(/-/g, "")).join("").toLowerCase();

// Structural well-formedness: a derived word is (prefix*)(root+)(suffix*).
// A suffix before any root, or a prefix after the last root, is ill-formed.
function isWellFormed(parts: WordBlock[]): boolean {
    const rootIdx = parts.map((p, i) => (p.type === "root" ? i : -1)).filter(i => i >= 0);
    if (rootIdx.length === 0) return false;
    const firstRoot = rootIdx[0];
    const lastRoot = rootIdx[rootIdx.length - 1];
    for (let i = 0; i < parts.length; i++) {
        if (parts[i].type === "suffix" && i < firstRoot) return false;
        if (parts[i].type === "prefix" && i > lastRoot) return false;
    }
    return true;
}

// Etymological Transparency Score in [0,1] for a non-attested combination.
function transparencyScore(parts: WordBlock[]): { score: number; reasons: Reason[] } {
    const reasons: Reason[] = [];

    if (!isWellFormed(parts)) {
        reasons.push({
            en: "The parts aren't in an order that forms a word (a root, with prefixes before and suffixes after).",
            ja: "部品の並びが単語の形になっていません（語根の前に接頭辞、後ろに接尾辞）。",
        });
        return { score: 0, reasons };
    }

    // Suffix selection: walk the suffixes after the head root, checking each
    // one's required base part-of-speech (Plag 2003).
    const roots = parts.filter(p => p.type === "root");
    const head = roots[roots.length - 1];
    let currentPOS: POS = rootPOS(head.id);
    const suffixes = parts.filter(p => p.type === "suffix");
    let ruled = 0;
    let matched = 0;
    for (const s of suffixes) {
        const rule = SUFFIX_RULES[s.id];
        if (!rule) continue;
        ruled++;
        if (rule.base.includes(currentPOS)) matched++;
        currentPOS = rule.out;
    }
    const selection = ruled > 0 ? matched / ruled : 0.6;
    if (ruled > 0 && matched < ruled) {
        reasons.push({
            en: "An ending attaches to the wrong kind of base (e.g. a verb ending on a noun).",
            ja: "接尾辞が合わない品詞に付いています（例：名詞に動詞用の語尾）。",
        });
    }

    // Productivity of the head root.
    const productivity = (ROOT_USES.get(head.id) ?? 0) / MAX_USES;

    // Native root + affix combinations are the most transparent.
    const native = NATIVE_ROOTS.has(head.id) ? 1 : 0;

    // Penalty: stacked negations contradict each other.
    const negators = parts.filter(p => p.type === "prefix" && NEGATORS.has(p.id)).length;
    const negPenalty = negators >= 2 ? 0.3 : 0;
    if (negPenalty) {
        reasons.push({
            en: "Two negating prefixes cancel each other, which reads as nonsense.",
            ja: "打ち消しの接頭辞が二重で、意味が打ち消し合っています。",
        });
    }

    const score = Math.max(0, Math.min(1,
        0.5 * selection + 0.3 * productivity + 0.2 * native - negPenalty));

    if (score >= 0.5) {
        reasons.push({
            en: "The parts combine in a familiar pattern, so the meaning comes through.",
            ja: "部品がなじみのある形で結びつき、意味が伝わります。",
        });
    }
    return { score, reasons };
}

export function classifyWord(parts: WordBlock[], lex: Lexicon): Classification {
    const word = assemble(parts);
    const appMeaning = APP_WORDS.get(word);
    const rank = lex.rank(word);
    const attested = appMeaning !== undefined || rank !== undefined;

    if (attested) {
        const common = rank !== undefined && rank < COMMON_RANK;
        const tier: "common" | "rare" = common ? "common" : "rare";
        const category: Category = common ? 1 : 3;
        const reasons: Reason[] = [
            common
                ? { en: "A real, everyday English word.", ja: "実在する、日常的な英単語です。" }
                : { en: "A real English word, but not an everyday one.", ja: "実在しますが、あまり使われない英単語です。" },
        ];
        return { word, category, attested: true, tier, meaning: appMeaning, reasons };
    }

    const { score, reasons } = transparencyScore(parts);
    const category: Category = score >= 0.5 ? 2 : 4;
    const lead: Reason = category === 2
        ? { en: "Not a dictionary word, but a native could work out what it means.", ja: "辞書にはありませんが、意味は(ネイティブに)通じます。" }
        : { en: "Not a dictionary word, and the meaning doesn't come through.", ja: "辞書になく、意味も通じません。" };
    return { word, category, attested: false, transparency: score, reasons: [lead, ...reasons] };
}

export const CATEGORY_LABEL: Record<Category, Reason> = {
    1: { en: "Real & common", ja: "実在・頻出" },
    2: { en: "Plausible coinage", ja: "通じる造語" },
    3: { en: "Real & rare", ja: "実在・まれ" },
    4: { en: "Not a word", ja: "非単語" },
};
