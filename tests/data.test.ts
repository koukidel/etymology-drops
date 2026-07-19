// Content validation: every lesson word must be internally consistent.
// Catches typos in the hand-written data files at CI time instead of runtime.
import { describe, it, expect } from "vitest";
import { allWords } from "@/data/words";
import { COURSES } from "@/data/courses";
import { DERIVATIVES } from "@/data/derivatives";

describe("word data", () => {
    it("has unique ids", () => {
        const seen = new Map<string, number>();
        for (const w of allWords) seen.set(w.id, (seen.get(w.id) ?? 0) + 1);
        const dupes = [...seen].filter(([, n]) => n > 1).map(([id]) => id);
        expect(dupes).toEqual([]);
    });

    it("blocks join to spell the word", () => {
        const broken = allWords
            .filter(w => w.blocks.map(b => b.label.replace(/-/g, "")).join("").toLowerCase() !== w.word.toLowerCase())
            .map(w => w.id);
        expect(broken).toEqual([]);
    });

    it("every word and block has ja + en meanings", () => {
        const missing: string[] = [];
        const ok = (m: unknown) =>
            typeof m === "string" ||
            (typeof m === "object" && m !== null &&
                typeof (m as Record<string, unknown>).en === "string" &&
                typeof (m as Record<string, unknown>).ja === "string");
        for (const w of allWords) {
            if (!ok(w.meaning)) missing.push(`${w.id}.meaning`);
            for (const b of w.blocks) if (!ok(b.meaning)) missing.push(`${w.id}.${b.id}.meaning`);
        }
        expect(missing).toEqual([]);
    });

    it("every word has at least one root", () => {
        const rootless = allWords.filter(w => !w.blocks.some(b => b.type === "root")).map(w => w.id);
        expect(rootless).toEqual([]);
    });
});

describe("courses", () => {
    it("reference only real word ids", () => {
        const ids = new Set(allWords.map(w => w.id));
        const dangling = COURSES.flatMap(c => c.lessons.filter(l => !ids.has(l.id)).map(l => `${c.id}:${l.id}`));
        expect(dangling).toEqual([]);
    });

    it("no lesson appears in two courses", () => {
        const seen = new Map<string, string>();
        const dupes: string[] = [];
        for (const c of COURSES) for (const l of c.lessons) {
            if (seen.has(l.id)) dupes.push(`${l.id} (${seen.get(l.id)} + ${c.id})`);
            seen.set(l.id, c.id);
        }
        expect(dupes).toEqual([]);
    });
});

describe("derivatives", () => {
    it("have ja + en glosses", () => {
        const missing: string[] = [];
        for (const [part, list] of Object.entries(DERIVATIVES)) {
            for (const d of list) {
                const g: unknown = d.gloss;
                const ok = typeof g === "string" ||
                    (typeof g === "object" && g !== null &&
                        typeof (g as Record<string, unknown>).en === "string" &&
                        typeof (g as Record<string, unknown>).ja === "string");
                if (!ok) missing.push(`${part}:${d.word}`);
            }
        }
        expect(missing).toEqual([]);
    });
});
