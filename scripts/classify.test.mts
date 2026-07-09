// Gate test for the 4-way classifier. Run: npx tsx scripts/classify.test.mts
import fs from "node:fs";
import { classifyWord, Lexicon } from "../src/lib/classify";
import { WordBlock } from "../src/data/types";

// Build the lexicon from the bundled asset (same file the UI fetches).
const words = fs.readFileSync("public/lexicon/words.txt", "utf8").split("\n").filter(Boolean);
const rankMap = new Map<string, number>();
words.forEach((w, i) => { if (!rankMap.has(w)) rankMap.set(w, i); });
const lex: Lexicon = { rank: (w) => rankMap.get(w.toLowerCase()) };

const P = (id: string, label: string): WordBlock => ({ id, label, meaning: { en: "", ja: "" }, type: "prefix" });
const R = (id: string, label: string): WordBlock => ({ id, label, meaning: { en: "", ja: "" }, type: "root" });
const S = (id: string, label: string): WordBlock => ({ id, label, meaning: { en: "", ja: "" }, type: "suffix" });

const cases: { name: string; parts: WordBlock[]; expect: number }[] = [
    { name: "unhappy (un+happy)", parts: [P("un", "Un"), R("happy", "Happy")], expect: 1 },
    { name: "player (play+er)", parts: [R("play", "Play"), S("er", "Er")], expect: 1 },
    { name: "telephone (tele+phone)", parts: [P("tele", "Tele"), R("phone", "Phone")], expect: 1 },
    { name: "drinkable (drink+able)", parts: [R("drink", "Drink"), S("able", "Able")], expect: 3 },
    { name: "deform (de+form)", parts: [P("de", "De"), R("form", "Form")], expect: 3 },
    { name: "deportable (de+port+able) — coinage, transparent", parts: [P("de", "De"), R("port", "Port"), S("able", "Able")], expect: 2 },
    { name: "ablehappy (suffix before root) — ill-formed", parts: [S("able", "Able"), R("happy", "Happy")], expect: 4 },
    { name: "quarous (quar+ous) — opaque", parts: [R("quar", "Quar"), S("ous", "Ous")], expect: 4 },
    { name: "unnonhappy (un+non+happy) — double negation", parts: [P("un", "Un"), P("non", "Non"), R("happy", "Happy")], expect: 4 },
];

let pass = 0;
for (const c of cases) {
    const r = classifyWord(c.parts, lex);
    const ok = r.category === c.expect;
    if (ok) pass++;
    console.log(`${ok ? "PASS" : "FAIL"}  cat=${r.category} (exp ${c.expect})  ${r.word.padEnd(14)} ${c.name}`);
    if (!ok) console.log(`      reasons: ${r.reasons.map(x => x.en).join(" | ")}  transparency=${r.transparency ?? "-"}`);
}
console.log(`\n${pass}/${cases.length} passed`);
process.exit(pass === cases.length ? 0 : 1);
