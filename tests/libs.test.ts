import { describe, it, expect } from "vitest";
import { localDate, localYesterday } from "@/lib/date";
import { dayHash, pickReviewWords } from "@/lib/dailyReview";
import { findNextLesson } from "@/lib/nextLesson";
import { COURSES } from "@/data/courses";

describe("date helpers", () => {
    it("localDate formats local time, not UTC", () => {
        // 00:30 local on Jan 2 — UTC formatting in JST would say Jan 1.
        const d = new Date(2026, 0, 2, 0, 30);
        expect(localDate(d)).toBe("2026-01-02");
    });
    it("localYesterday crosses month boundaries", () => {
        expect(localYesterday(new Date(2026, 2, 1, 12, 0))).toBe("2026-02-28");
    });
    it("pads month and day", () => {
        expect(localDate(new Date(2026, 8, 5))).toBe("2026-09-05");
    });
});

describe("dailyReview", () => {
    const log = [
        { id: "unhappy", date: "2026-07-01" },
        { id: "player", date: "2026-07-02" },
        { id: "breakfast", date: null },
        { id: "goodbye", date: "2026-07-19" },
    ];
    const mastered = ["unhappy", "player", "breakfast", "goodbye"];

    it("excludes words mastered today", () => {
        const picks = pickReviewWords(log, mastered, "2026-07-19");
        expect(picks.map(w => w.id)).not.toContain("goodbye");
    });
    it("includes undated (migrated) words", () => {
        const picks = pickReviewWords(log, mastered, "2026-07-19", 10);
        expect(picks.map(w => w.id)).toContain("breakfast");
    });
    it("is deterministic within a day", () => {
        const a = pickReviewWords(log, mastered, "2026-07-19").map(w => w.id);
        const b = pickReviewWords(log, mastered, "2026-07-19").map(w => w.id);
        expect(a).toEqual(b);
    });
    it("dayHash is stable", () => {
        expect(dayHash("abc")).toBe(dayHash("abc"));
        expect(dayHash("abc")).not.toBe(dayHash("abd"));
    });
});

describe("findNextLesson", () => {
    it("returns the first lesson for a fresh user", () => {
        const next = findNextLesson([], []);
        expect(next?.lesson.id).toBe(COURSES[0].lessons[0].id);
    });
    it("continues the most recently touched course", () => {
        const course = COURSES[1];
        const first = course.lessons[0].id;
        const next = findNextLesson([{ id: first, date: "2026-07-01" }], [first]);
        expect(next?.course.id).toBe(course.id);
        expect(next?.lesson.id).toBe(course.lessons[1].id);
    });
    it("returns null when everything is mastered", () => {
        const all = COURSES.flatMap(c => c.lessons.map(l => l.id));
        expect(findNextLesson([], all)).toBeNull();
    });
});
