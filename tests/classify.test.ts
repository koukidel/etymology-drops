// Gate tests for the 4-way word classifier, ported from scripts/classify.test.mts.
import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { classifyWord, Lexicon } from "@/lib/classify";
import { WordBlock } from "@/data/types";

const words = fs.readFileSync(path.join(__dirname, "../public/lexicon/words.txt"), "utf8").split("\n").filter(Boolean);
const rankMap = new Map<string, number>();
words.forEach((w, i) => { if (!rankMap.has(w)) rankMap.set(w, i); });
const lex: Lexicon = { rank: (w) => rankMap.get(w.toLowerCase()) };

const P = (id: string, label: string): WordBlock => ({ id, label, meaning: { en: "", ja: "" }, type: "prefix" });
const R = (id: string, label: string): WordBlock => ({ id, label, meaning: { en: "", ja: "" }, type: "root" });
const S = (id: string, label: string): WordBlock => ({ id, label, meaning: { en: "", ja: "" }, type: "suffix" });

describe("classifyWord", () => {
    const cases: { name: string; parts: WordBlock[]; expect: number }[] = [
        { name: "unhappy → real & common", parts: [P("un", "Un"), R("happy", "Happy")], expect: 1 },
        { name: "player → real & common", parts: [R("play", "Play"), S("er", "Er")], expect: 1 },
        { name: "telephone → real & common", parts: [P("tele", "Tele"), R("phone", "Phone")], expect: 1 },
        { name: "drinkable → real & rare", parts: [R("drink", "Drink"), S("able", "Able")], expect: 3 },
        { name: "deform → real & rare", parts: [P("de", "De"), R("form", "Form")], expect: 3 },
        { name: "deportable → transparent coinage", parts: [P("de", "De"), R("port", "Port"), S("able", "Able")], expect: 2 },
        { name: "replayer → transparent coinage", parts: [P("re", "Re"), R("play", "Play"), S("er", "Er")], expect: 2 },
        { name: "ablehappy (suffix before root) → not a word", parts: [S("able", "Able"), R("happy", "Happy")], expect: 4 },
        { name: "quarous (opaque root) → not a word", parts: [R("quar", "Quar"), S("ous", "Ous")], expect: 4 },
        { name: "unnonhappy (double negation) → not a word", parts: [P("un", "Un"), P("non", "Non"), R("happy", "Happy")], expect: 4 },
    ];
    for (const c of cases) {
        it(c.name, () => {
            expect(classifyWord(c.parts, lex).category).toBe(c.expect);
        });
    }
});
